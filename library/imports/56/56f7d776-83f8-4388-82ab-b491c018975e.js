"use strict";
cc._RF.push(module, '56f7dd2g/hDiIKrtJHAGJde', 'PureMVC');
// Scripts/PureMVC.ts

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var puremvc;
(function (puremvc) {
    var Observer = /** @class */ (function () {
        function Observer() {
            this.priority = 1;
        }
        return Observer;
    }());
    puremvc.Observer = Observer;
    var Notifier = /** @class */ (function () {
        function Notifier() {
            this.facade = Facade.getInstance();
        }
        Notifier.prototype.sendNotification = function (notificationName, body) {
            this.facade.sendNotification(notificationName, body);
        };
        return Notifier;
    }());
    puremvc.Notifier = Notifier;
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
            var _this = _super.call(this) || this;
            if (proxyName === undefined) {
                throw new Error("Invalid Proxy Name");
            }
            _this.proxyName = proxyName;
            if (data !== undefined) {
                _this.data = data;
            }
            return _this;
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName || null;
        };
        Proxy.prototype.onRegister = function () { };
        Proxy.prototype.onRemove = function () { };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        return Proxy;
    }(Notifier));
    puremvc.Proxy = Proxy;
    var Controller = /** @class */ (function () {
        function Controller() {
            this.commands = {};
            if (Controller.inst !== null) {
                throw new Error(Controller.SINGLETON_MSG);
            }
            Controller.inst = this;
        }
        Controller.prototype.executeCommand = function (notificationName, body) {
            var commandClass = this.commands[notificationName];
            var command = new commandClass();
            if (body === undefined) {
                command.execute.call(command);
            }
            else if (Array.isArray(body)) {
                command.execute.apply(command, body);
            }
            else {
                command.execute.call(command, body);
            }
        };
        Controller.prototype.registerCommand = function (notificationName, commandClass) {
            if (this.hasCommand(notificationName)) {
                throw new Error("Register Duplicate Command " + notificationName);
            }
            this.commands[notificationName] = commandClass;
            View.getInstance().registerObserver(notificationName, this.executeCommand, this);
        };
        Controller.prototype.removeCommand = function (notificationName) {
            if (!this.hasCommand(notificationName)) {
                throw new Error("Remove Non-Existent Command " + notificationName);
            }
            delete this.commands[notificationName];
            View.getInstance().removeObserver(notificationName, this.executeCommand, this);
        };
        Controller.prototype.retrieveCommand = function (notificationName) {
            return this.commands[notificationName] || null;
        };
        Controller.prototype.hasCommand = function (notificationName) {
            return this.retrieveCommand(notificationName) != null;
        };
        Controller.getInstance = function () {
            if (Controller.inst === null) {
                Controller.inst = new Controller();
            }
            return Controller.inst;
        };
        Controller.inst = null;
        Controller.SINGLETON_MSG = "Controller singleton already constructed!";
        return Controller;
    }());
    puremvc.Controller = Controller;
    var Model = /** @class */ (function () {
        function Model() {
            this.proxies = {};
            if (Model.inst !== null) {
                throw new Error(Model.SINGLETON_MSG);
            }
            Model.inst = this;
        }
        Model.prototype.registerProxy = function (proxy) {
            var proxyName = proxy.getProxyName();
            if (proxyName === null) {
                throw new Error("Register Invalid Proxy");
            }
            if (this.hasProxy(proxyName)) {
                throw new Error("Register Duplicate Proxy " + proxyName);
            }
            this.proxies[proxyName] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (proxyName) {
            if (proxyName === undefined) {
                throw new Error("Remove Invalid Proxy");
            }
            var proxy = this.retrieveProxy(proxyName);
            if (proxy === null) {
                throw new Error("Remove Non-Existent Proxy " + proxyName);
            }
            delete this.proxies[proxyName];
            proxy.onRemove();
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxies[proxyName] || null;
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.retrieveProxy(proxyName) != null;
        };
        Model.getInstance = function () {
            if (Model.inst === null) {
                Model.inst = new Model();
            }
            return Model.inst;
        };
        Model.inst = null;
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        return Model;
    }());
    puremvc.Model = Model;
    var View = /** @class */ (function () {
        function View() {
            this.mediators = {};
            this.observers = {};
            this.isCanceled = false;
            this.onceObservers = [];
            if (View.inst !== null) {
                throw new Error(View.SINGLETON_MSG);
            }
            View.inst = this;
        }
        View.prototype.registerObserver = function (notificationName, method, caller, priority) {
            if (priority === void 0) { priority = 1; }
            if (notificationName === undefined) {
                throw new Error("Register Invalid Observer");
            }
            if (method === undefined) {
                throw new Error("Register Invalid Observer Method");
            }
            var observerList = this.observers[notificationName];
            if (observerList === undefined) {
                observerList = this.observers[notificationName] = [false];
            }
            else if (observerList[0] === true) {
                observerList = this.observers[notificationName] = observerList.concat();
                observerList[0] = false;
            }
            var insertIndex = -1;
            for (var i = 1; i < observerList.length; i++) {
                var observer = observerList[i];
                if (observer.method === method && observer.caller === caller) {
                    return null;
                }
                if (insertIndex === -1 && observer.priority < priority) {
                    insertIndex = i;
                }
            }
            var newObserver = new Observer();
            newObserver.name = notificationName;
            newObserver.caller = caller;
            newObserver.method = method;
            newObserver.priority = priority;
            if (insertIndex < 0) {
                observerList.push(newObserver);
            }
            else {
                observerList.splice(insertIndex, 0, newObserver);
            }
            return newObserver;
        };
        View.prototype.removeObserver = function (notificationName, method, caller) {
            if (notificationName === undefined) {
                throw new Error("Remove Invalid Observer");
            }
            if (method === undefined) {
                throw new Error("Remove Invalid Observer Method");
            }
            var observerList = this.observers[notificationName];
            if (observerList !== undefined) {
                if (observerList[0] === true) {
                    observerList = this.observers[notificationName] = observerList.concat();
                    observerList[0] = false;
                }
                for (var i = 1; i < observerList.length; i++) {
                    var observer = observerList[i];
                    if (observer.method === method && observer.caller === caller) {
                        observerList.splice(i, 1);
                        break;
                    }
                }
                if (observerList.length === 1) {
                    delete this.observers[notificationName];
                }
            }
        };
        View.prototype.notifyCancel = function () {
            this.isCanceled = true;
        };
        View.prototype.notifyObservers = function (notificationName, body) {
            if (notificationName === undefined) {
                throw new Error("Notify Invalid Command");
            }
            var observerList = this.observers[notificationName];
            if (observerList !== undefined) {
                observerList[0] = true;
                for (var i = 1; i < observerList.length; i++) {
                    var observer = observerList[i];
                    if (observer.caller === Controller.getInstance()) {
                        observer.method.call(observer.caller, notificationName, body);
                    }
                    else if (body === undefined) {
                        observer.method.call(observer.caller);
                    }
                    else if (Array.isArray(body)) {
                        observer.method.apply(observer.caller, body);
                    }
                    else {
                        observer.method.call(observer.caller, body);
                    }
                }
                observerList[0] = false;
            }
        };
        View.prototype.registerMediator = function (mediator) {
            var mediatorName = mediator.getMediatorName();
            if (mediatorName === null) {
                throw new Error("Register Invalid Mediator");
            }
            if (this.hasMediator(mediatorName)) {
                throw new Error("Register Duplicate Mediator " + mediatorName);
            }
            this.mediators[mediatorName] = mediator;
            mediator.listNotificationInterests();
            mediator.onRegister();
        };
        View.prototype.removeMediator = function (mediatorName) {
            if (mediatorName === undefined) {
                throw new Error("Remove Invalid Mediator");
            }
            var mediator = this.retrieveMediator(mediatorName);
            if (mediator === null) {
                throw new Error("Remove Non-Existent Mediator " + mediatorName);
            }
            delete this.mediators[mediatorName];
            mediator.removeNotificationInterests();
            mediator.onRemove();
        };
        View.prototype.retrieveMediator = function (mediatorName) {
            return this.mediators[mediatorName] || null;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.retrieveMediator(mediatorName) != null;
        };
        View.getInstance = function () {
            if (View.inst === null) {
                View.inst = new View();
            }
            return View.inst;
        };
        View.inst = null;
        View.SINGLETON_MSG = "View singleton already constructed!";
        return View;
    }());
    puremvc.View = View;
    var Mediator = /** @class */ (function (_super) {
        __extends(Mediator, _super);
        function Mediator(mediatorName, viewComponent) {
            var _this = _super.call(this) || this;
            _this.notificationInterests = [];
            if (mediatorName === undefined) {
                throw new Error("Invalid Mediator Name");
            }
            if (viewComponent === undefined) {
                throw new Error("Invalid View Component");
            }
            _this.mediatorName = mediatorName;
            if (viewComponent !== undefined) {
                _this.viewComponent = viewComponent;
            }
            return _this;
        }
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName || null;
        };
        Mediator.prototype.getViewComponent = function () {
            return this.viewComponent;
        };
        Mediator.prototype.listNotificationInterests = function () { };
        Mediator.prototype.removeNotificationInterests = function () {
            for (var i = 0; i < this.notificationInterests.length; i++) {
                var interest = this.notificationInterests[i];
                View.getInstance().removeObserver(interest.name, interest.method, interest.caller);
            }
        };
        Mediator.prototype.handleNotification = function (notificationName, method) {
            var observer = View.getInstance().registerObserver(notificationName, method, this);
            if (observer) {
                this.notificationInterests.push(observer);
            }
        };
        Mediator.prototype.onRegister = function () { };
        Mediator.prototype.onRemove = function () { };
        return Mediator;
    }(Notifier));
    puremvc.Mediator = Mediator;
    var Facade = /** @class */ (function () {
        function Facade() {
            this.view = new View();
            this.model = new Model();
            this.controller = new Controller();
            if (Facade.inst !== null) {
                throw new Error(Facade.SINGLETON_MSG);
            }
            Facade.inst = this;
            this.initializeFacade();
        }
        Facade.getInstance = function () {
            if (Facade.inst === null) {
                Facade.inst = new Facade();
            }
            return Facade.inst;
        };
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeView();
            this.initializeController();
        };
        Facade.prototype.initializeModel = function () { };
        Facade.prototype.initializeView = function () { };
        Facade.prototype.initializeController = function () { };
        Facade.prototype.registerObserver = function (notificationName, method, caller, priority) {
            this.view.registerObserver(notificationName, method, caller, priority);
        };
        Facade.prototype.removeObserver = function (notificationName, method, caller) {
            this.view.removeObserver(notificationName, method, caller);
        };
        Facade.prototype.registerCommand = function (notificationName, commandClass) {
            this.controller.registerCommand(notificationName, commandClass);
        };
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.removeProxy = function (proxyName) {
            this.model.removeProxy(proxyName);
        };
        Facade.prototype.retrieveProxy = function (proxyName) {
            return this.model.retrieveProxy(proxyName);
        };
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function (mediator) {
            this.view.registerMediator(mediator);
        };
        Facade.prototype.removeMediator = function (mediatorName) {
            this.view.removeMediator(mediatorName);
        };
        Facade.prototype.retrieveMediator = function (mediatorName) {
            return this.view.retrieveMediator(mediatorName);
        };
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.sendNotification = function (notificationName, body) {
            this.view.notifyObservers(notificationName, body);
        };
        Facade.prototype.notifyCancel = function () {
            this.view.notifyCancel();
        };
        Facade.inst = null;
        Facade.SINGLETON_MSG = "Facade singleton already constructed!";
        return Facade;
    }());
    puremvc.Facade = Facade;
    var MacroCommand = /** @class */ (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
            var _this = _super.call(this) || this;
            _this.commands = [];
            _this.initializeMacroCommand();
            return _this;
        }
        MacroCommand.prototype.initializeMacroCommand = function () { };
        MacroCommand.prototype.addSubCommand = function (commandClass) {
            this.commands.push(commandClass);
        };
        MacroCommand.prototype.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var i = 0; i < this.commands.length; i++) {
                var commandClass = this.commands[i];
                var command = new commandClass();
                command.execute.apply(command, args);
            }
        };
        return MacroCommand;
    }(Notifier));
    puremvc.MacroCommand = MacroCommand;
    var SimpleCommand = /** @class */ (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleCommand.prototype.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return SimpleCommand;
    }(Notifier));
    puremvc.SimpleCommand = SimpleCommand;
})(puremvc || (puremvc = {}));

cc._RF.pop();