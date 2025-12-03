export class SingleEventListener {
    private supportEvent: { [key: string]: any } | null = null;
    
    constructor() {
        this.supportEvent = null;
    }

    public on(eventName: string, handler: Function, target: any): void {
        (this as any)[eventName] = {
            handler: handler,
            target: target
        };
    }

    public off(eventName: string, handler: Function): void {
        const event = (this as any)[eventName];
        if (event && event.handler && event.handler === handler) {
            (this as any)[eventName] = null;
        }
    }

    public dispatchEvent(eventName: string, ...args: any[]): void {
        if (this.supportEvent === null || this.supportEvent.hasOwnProperty(eventName)) {
            const event = (this as any)[eventName];
            if (event && event.handler) {
                event.handler.apply(event.target, args);
            } else {
                cc.log(`not register ${eventName} callback func`);
            }
        } else {
            cc.error("please add the event into clientEvent.js");
        }
    }

    public setSupportEventList(events: string[]): boolean {
        if (!(events instanceof Array)) {
            cc.error("supportEvent was not array");
            return false;
        }
        
        this.supportEvent = {};
        for (let i = 0; i < events.length; i++) {
            const eventName = events[i];
            this.supportEvent[eventName] = i;
        }
        return true;
    }
}

export class MultiEventListener {
    private handlers: { [key: string]: Array<{ handler: Function, target: any }> } = {};
    private supportEvent: { [key: string]: any } | null = null;
    
    constructor() {
        this.handlers = {};
        this.supportEvent = null;
    }

    public on(eventName: string, handler: Function, target: any): number {
        const eventHandler = {
            handler: handler,
            target: target
        };
        
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        
        const handlers = this.handlers[eventName];
        for (let i = 0; i < handlers.length; i++) {
            if (!handlers[i]) {
                handlers[i] = eventHandler;
                return i;
            }
        }
        
        handlers.push(eventHandler);
        return handlers.length;
    }

    public off(eventName: string, handler: Function, target?: any): void {
        const handlers = this.handlers[eventName];
        if (handlers) {
            for (let i = 0; i < handlers.length; i++) {
                const eventHandler = handlers[i];
                if (eventHandler.handler === handler && (!target || target === eventHandler.target)) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }

    public dispatchEvent(eventName: string, ...args: any[]): void {
        if (this.supportEvent === null || this.supportEvent.hasOwnProperty(eventName)) {
            const handlers = this.handlers[eventName];
            if (handlers) {
                for (let i = 0; i < handlers.length; i++) {
                    const eventHandler = handlers[i];
                    if (eventHandler.handler) {
                        eventHandler.handler.apply(eventHandler.target, args);
                    }
                }
            }
        } else {
            cc.error("please add the event into clientEvent.js");
        }
    }

    public setSupportEventList(events: string[]): boolean {
        if (!(events instanceof Array)) {
            cc.error("supportEvent was not array");
            return false;
        }
        
        this.supportEvent = {};
        for (let i = 0; i < events.length; i++) {
            const eventName = events[i];
            this.supportEvent[eventName] = i;
        }
        return true;
    }
}

export const EventListenerManager = {
    getBaseClass: function(type: string): any {
        return type === "multi" ? MultiEventListener : SingleEventListener;
    }
};