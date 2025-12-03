export default class EventListener {
    static instance : EventListener = new EventListener();
    
    private _eventMap: { [key: string]: Array<{ func: Function, target: any }> } = {};

    public on(eventType: string, callback: Function, target?: any): void {
        if (!this._eventMap.hasOwnProperty(eventType)) {
            this._eventMap[eventType] = [];
        }
        
        const eventObj = {
            func: callback,
            target: target
        };
        this._eventMap[eventType].push(eventObj);
    }

    public fire(eventType: string, ...args: any[]): void {
        if (this._eventMap.hasOwnProperty(eventType)) {
            const events = this._eventMap[eventType];
            for (let i = 0; i < events.length; i++) {
                const eventObj = events[i];
                if (eventObj.func) {
                    eventObj.func.apply(eventObj.target, args);
                } else {
                    cc.warn(`[Warn] 没有对应的回调事件类型 - ${eventType}`);
                }
            }
        }
    }

    public off(eventType: string, target: any): void {
        if (this._eventMap.hasOwnProperty(eventType)) {
            const events = this._eventMap[eventType];
            for (let i = 0; i < events.length; i++) {
                if (events[i].target === target) {
                    events.splice(i, 1);
                    i--;
                }
            }
        }
    }
}