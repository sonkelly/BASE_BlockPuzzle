"use strict";
cc._RF.push(module, '25bbcw0N29BDLQ+qw0O/pxo', 'event_listener');
// Scripts/event_listener.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventListener = /** @class */ (function () {
    function EventListener() {
        this._eventMap = {};
    }
    EventListener.prototype.on = function (eventType, callback, target) {
        if (!this._eventMap.hasOwnProperty(eventType)) {
            this._eventMap[eventType] = [];
        }
        var eventObj = {
            func: callback,
            target: target
        };
        this._eventMap[eventType].push(eventObj);
    };
    EventListener.prototype.fire = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._eventMap.hasOwnProperty(eventType)) {
            var events = this._eventMap[eventType];
            for (var i = 0; i < events.length; i++) {
                var eventObj = events[i];
                if (eventObj.func) {
                    eventObj.func.apply(eventObj.target, args);
                }
                else {
                    cc.warn("[Warn] \u6CA1\u6709\u5BF9\u5E94\u7684\u56DE\u8C03\u4E8B\u4EF6\u7C7B\u578B - " + eventType);
                }
            }
        }
    };
    EventListener.prototype.off = function (eventType, target) {
        if (this._eventMap.hasOwnProperty(eventType)) {
            var events = this._eventMap[eventType];
            for (var i = 0; i < events.length; i++) {
                if (events[i].target === target) {
                    events.splice(i, 1);
                    i--;
                }
            }
        }
    };
    EventListener.instance = new EventListener();
    return EventListener;
}());
exports.default = EventListener;

cc._RF.pop();