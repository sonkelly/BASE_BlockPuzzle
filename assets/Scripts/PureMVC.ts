namespace puremvc {
    export class Observer {
        public name: string;
        public caller: any;
        public method: Function;
        public priority: number = 1;
    }

    export class Notifier {
        protected facade: Facade = Facade.getInstance();

        public sendNotification(notificationName: string, body?: any): void {
            this.facade.sendNotification(notificationName, body);
        }
    }

    export class Proxy extends Notifier {
        protected proxyName: string;
        protected data: any;

        constructor(proxyName: string, data?: any) {
            super();
            if (proxyName === undefined) {
                throw new Error("Invalid Proxy Name");
            }
            this.proxyName = proxyName;
            if (data !== undefined) {
                this.data = data;
            }
        }

        public getProxyName(): string {
            return this.proxyName || null;
        }

        public onRegister(): void {}

        public onRemove(): void {}

        public setData(data: any): void {
            this.data = data;
        }

        public getData(): any {
            return this.data;
        }
    }

    export class Controller {
        private commands: { [key: string]: any } = {};
        private static inst: Controller = null;
        private static SINGLETON_MSG: string = "Controller singleton already constructed!";

        constructor() {
            if (Controller.inst !== null) {
                throw new Error(Controller.SINGLETON_MSG);
            }
            Controller.inst = this;
        }

        public executeCommand(notificationName: string, body?: any): void {
            const commandClass = this.commands[notificationName];
            const command = new commandClass();
            if (body === undefined) {
                command.execute.call(command);
            } else if (Array.isArray(body)) {
                command.execute.apply(command, body);
            } else {
                command.execute.call(command, body);
            }
        }

        public registerCommand(notificationName: string, commandClass: any): void {
            if (this.hasCommand(notificationName)) {
                throw new Error("Register Duplicate Command " + notificationName);
            }
            this.commands[notificationName] = commandClass;
            View.getInstance().registerObserver(notificationName, this.executeCommand, this);
        }

        public removeCommand(notificationName: string): void {
            if (!this.hasCommand(notificationName)) {
                throw new Error("Remove Non-Existent Command " + notificationName);
            }
            delete this.commands[notificationName];
            View.getInstance().removeObserver(notificationName, this.executeCommand, this);
        }

        public retrieveCommand(notificationName: string): any {
            return this.commands[notificationName] || null;
        }

        public hasCommand(notificationName: string): boolean {
            return this.retrieveCommand(notificationName) != null;
        }

        public static getInstance(): Controller {
            if (Controller.inst === null) {
                Controller.inst = new Controller();
            }
            return Controller.inst;
        }
    }

    export class Model {
        private proxies: { [key: string]: Proxy } = {};
        private static inst: Model = null;
        private static SINGLETON_MSG: string = "Model singleton already constructed!";

        constructor() {
            if (Model.inst !== null) {
                throw new Error(Model.SINGLETON_MSG);
            }
            Model.inst = this;
        }

        public registerProxy(proxy: Proxy): void {
            const proxyName = proxy.getProxyName();
            if (proxyName === null) {
                throw new Error("Register Invalid Proxy");
            }
            if (this.hasProxy(proxyName)) {
                throw new Error("Register Duplicate Proxy " + proxyName);
            }
            this.proxies[proxyName] = proxy;
            proxy.onRegister();
        }

        public removeProxy(proxyName: string): void {
            if (proxyName === undefined) {
                throw new Error("Remove Invalid Proxy");
            }
            const proxy = this.retrieveProxy(proxyName);
            if (proxy === null) {
                throw new Error("Remove Non-Existent Proxy " + proxyName);
            }
            delete this.proxies[proxyName];
            proxy.onRemove();
        }

        public retrieveProxy(proxyName: string): Proxy {
            return this.proxies[proxyName] || null;
        }

        public hasProxy(proxyName: string): boolean {
            return this.retrieveProxy(proxyName) != null;
        }

        public static getInstance(): Model {
            if (Model.inst === null) {
                Model.inst = new Model();
            }
            return Model.inst;
        }
    }

    export class View {
        private mediators: { [key: string]: Mediator } = {};
        private observers: { [key: string]: any[] } = {};
        private isCanceled: boolean = false;
        private onceObservers: Observer[] = [];
        private static inst: View = null;
        private static SINGLETON_MSG: string = "View singleton already constructed!";

        constructor() {
            if (View.inst !== null) {
                throw new Error(View.SINGLETON_MSG);
            }
            View.inst = this;
        }

        public registerObserver(notificationName: string, method: Function, caller: any, priority: number = 1): Observer {
            if (notificationName === undefined) {
                throw new Error("Register Invalid Observer");
            }
            if (method === undefined) {
                throw new Error("Register Invalid Observer Method");
            }

            let observerList = this.observers[notificationName];
            if (observerList === undefined) {
                observerList = this.observers[notificationName] = [false];
            } else if (observerList[0] === true) {
                observerList = this.observers[notificationName] = observerList.concat();
                observerList[0] = false;
            }

            let insertIndex = -1;
            for (let i = 1; i < observerList.length; i++) {
                const observer = observerList[i];
                if (observer.method === method && observer.caller === caller) {
                    return null;
                }
                if (insertIndex === -1 && observer.priority < priority) {
                    insertIndex = i;
                }
            }

            const newObserver = new Observer();
            newObserver.name = notificationName;
            newObserver.caller = caller;
            newObserver.method = method;
            newObserver.priority = priority;

            if (insertIndex < 0) {
                observerList.push(newObserver);
            } else {
                observerList.splice(insertIndex, 0, newObserver);
            }

            return newObserver;
        }

        public removeObserver(notificationName: string, method: Function, caller: any): void {
            if (notificationName === undefined) {
                throw new Error("Remove Invalid Observer");
            }
            if (method === undefined) {
                throw new Error("Remove Invalid Observer Method");
            }

            let observerList = this.observers[notificationName];
            if (observerList !== undefined) {
                if (observerList[0] === true) {
                    observerList = this.observers[notificationName] = observerList.concat();
                    observerList[0] = false;
                }

                for (let i = 1; i < observerList.length; i++) {
                    const observer = observerList[i];
                    if (observer.method === method && observer.caller === caller) {
                        observerList.splice(i, 1);
                        break;
                    }
                }

                if (observerList.length === 1) {
                    delete this.observers[notificationName];
                }
            }
        }

        public notifyCancel(): void {
            this.isCanceled = true;
        }

        public notifyObservers(notificationName: string, body?: any): void {
            if (notificationName === undefined) {
                throw new Error("Notify Invalid Command");
            }

            let observerList = this.observers[notificationName];
            if (observerList !== undefined) {
                observerList[0] = true;

                for (let i = 1; i < observerList.length; i++) {
                    const observer = observerList[i];
                    if (observer.caller === Controller.getInstance()) {
                        observer.method.call(observer.caller, notificationName, body);
                    } else if (body === undefined) {
                        observer.method.call(observer.caller);
                    } else if (Array.isArray(body)) {
                        observer.method.apply(observer.caller, body);
                    } else {
                        observer.method.call(observer.caller, body);
                    }
                }

                observerList[0] = false;
            }
        }

        public registerMediator(mediator: Mediator): void {
            const mediatorName = mediator.getMediatorName();
            if (mediatorName === null) {
                throw new Error("Register Invalid Mediator");
            }
            if (this.hasMediator(mediatorName)) {
                throw new Error("Register Duplicate Mediator " + mediatorName);
            }
            this.mediators[mediatorName] = mediator;
            mediator.listNotificationInterests();
            mediator.onRegister();
        }

        public removeMediator(mediatorName: string): void {
            if (mediatorName === undefined) {
                throw new Error("Remove Invalid Mediator");
            }
            const mediator = this.retrieveMediator(mediatorName);
            if (mediator === null) {
                throw new Error("Remove Non-Existent Mediator " + mediatorName);
            }
            delete this.mediators[mediatorName];
            mediator.removeNotificationInterests();
            mediator.onRemove();
        }

        public retrieveMediator(mediatorName: string): Mediator {
            return this.mediators[mediatorName] || null;
        }

        public hasMediator(mediatorName: string): boolean {
            return this.retrieveMediator(mediatorName) != null;
        }

        public static getInstance(): View {
            if (View.inst === null) {
                View.inst = new View();
            }
            return View.inst;
        }
    }

    export class Mediator extends Notifier {
        protected mediatorName: string;
        protected viewComponent: any;
        protected notificationInterests: Observer[] = [];

        constructor(mediatorName: string, viewComponent?: any) {
            super();
            if (mediatorName === undefined) {
                throw new Error("Invalid Mediator Name");
            }
            if (viewComponent === undefined) {
                throw new Error("Invalid View Component");
            }
            this.mediatorName = mediatorName;
            if (viewComponent !== undefined) {
                this.viewComponent = viewComponent;
            }
        }

        public getMediatorName(): string {
            return this.mediatorName || null;
        }

        public getViewComponent(): any {
            return this.viewComponent;
        }

        public listNotificationInterests(): void {}

        public removeNotificationInterests(): void {
            for (let i = 0; i < this.notificationInterests.length; i++) {
                const interest = this.notificationInterests[i];
                View.getInstance().removeObserver(interest.name, interest.method, interest.caller);
            }
        }

        public handleNotification(notificationName: string, method: Function): void {
            const observer = View.getInstance().registerObserver(notificationName, method, this);
            if (observer) {
                this.notificationInterests.push(observer);
            }
        }

        public onRegister(): void {}

        public onRemove(): void {}
    }

    export class Facade {
        protected view: View = new View();
        protected model: Model = new Model();
        protected controller: Controller = new Controller();
        private static inst: Facade = null;
        private static SINGLETON_MSG: string = "Facade singleton already constructed!";

        constructor() {
            if (Facade.inst !== null) {
                throw new Error(Facade.SINGLETON_MSG);
            }
            Facade.inst = this;
            this.initializeFacade();
        }

        public static getInstance(): Facade {
            if (Facade.inst === null) {
                Facade.inst = new Facade();
            }
            return Facade.inst;
        }

        protected initializeFacade(): void {
            this.initializeModel();
            this.initializeView();
            this.initializeController();
        }

        protected initializeModel(): void {}

        protected initializeView(): void {}

        protected initializeController(): void {}

        public registerObserver(notificationName: string, method: Function, caller: any, priority?: number): void {
            this.view.registerObserver(notificationName, method, caller, priority);
        }

        public removeObserver(notificationName: string, method: Function, caller: any): void {
            this.view.removeObserver(notificationName, method, caller);
        }

        public registerCommand(notificationName: string, commandClass: any): void {
            this.controller.registerCommand(notificationName, commandClass);
        }

        public removeCommand(notificationName: string): void {
            this.controller.removeCommand(notificationName);
        }

        public hasCommand(notificationName: string): boolean {
            return this.controller.hasCommand(notificationName);
        }

        public registerProxy(proxy: Proxy): void {
            this.model.registerProxy(proxy);
        }

        public removeProxy(proxyName: string): void {
            this.model.removeProxy(proxyName);
        }

        public retrieveProxy(proxyName: string): Proxy {
            return this.model.retrieveProxy(proxyName);
        }

        public hasProxy(proxyName: string): boolean {
            return this.model.hasProxy(proxyName);
        }

        public registerMediator(mediator: Mediator): void {
            this.view.registerMediator(mediator);
        }

        public removeMediator(mediatorName: string): void {
            this.view.removeMediator(mediatorName);
        }

        public retrieveMediator(mediatorName: string): Mediator {
            return this.view.retrieveMediator(mediatorName);
        }

        public hasMediator(mediatorName: string): boolean {
            return this.view.hasMediator(mediatorName);
        }

        public sendNotification(notificationName: string, body?: any): void {
            this.view.notifyObservers(notificationName, body);
        }

        public notifyCancel(): void {
            this.view.notifyCancel();
        }
    }

    export class MacroCommand extends Notifier {
        protected commands: any[] = [];

        constructor() {
            super();
            this.initializeMacroCommand();
        }

        protected initializeMacroCommand(): void {}

        public addSubCommand(commandClass: any): void {
            this.commands.push(commandClass);
        }

        public execute(...args: any[]): void {
            for (let i = 0; i < this.commands.length; i++) {
                const commandClass = this.commands[i];
                const command = new commandClass();
                command.execute.apply(command, args);
            }
        }
    }

    export class SimpleCommand extends Notifier {
        public execute(...args: any[]): void {}
    }
}