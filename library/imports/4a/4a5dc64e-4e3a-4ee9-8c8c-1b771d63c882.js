"use strict";
cc._RF.push(module, '4a5dcZOTjpO6YyMG3cdY8iC', 'eventListener');
// Scripts/eventListener.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerManager = exports.MultiEventListener = exports.SingleEventListener = void 0;
var SingleEventListener = /** @class */ (function () {
    function SingleEventListener() {
        this.supportEvent = null;
        this.supportEvent = null;
    }
    SingleEventListener.prototype.on = function (eventName, handler, target) {
        this[eventName] = {
            handler: handler,
            target: target
        };
    };
    SingleEventListener.prototype.off = function (eventName, handler) {
        var event = this[eventName];
        if (event && event.handler && event.handler === handler) {
            this[eventName] = null;
        }
    };
    SingleEventListener.prototype.dispatchEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.supportEvent === null || this.supportEvent.hasOwnProperty(eventName)) {
            var event = this[eventName];
            if (event && event.handler) {
                event.handler.apply(event.target, args);
            }
            else {
                cc.log("not register " + eventName + " callback func");
            }
        }
        else {
            cc.error("please add the event into clientEvent.js");
        }
    };
    SingleEventListener.prototype.setSupportEventList = function (events) {
        if (!(events instanceof Array)) {
            cc.error("supportEvent was not array");
            return false;
        }
        this.supportEvent = {};
        for (var i = 0; i < events.length; i++) {
            var eventName = events[i];
            this.supportEvent[eventName] = i;
        }
        return true;
    };
    return SingleEventListener;
}());
exports.SingleEventListener = SingleEventListener;
var MultiEventListener = /** @class */ (function () {
    function MultiEventListener() {
        this.handlers = {};
        this.supportEvent = null;
        this.handlers = {};
        this.supportEvent = null;
    }
    MultiEventListener.prototype.on = function (eventName, handler, target) {
        var eventHandler = {
            handler: handler,
            target: target
        };
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        var handlers = this.handlers[eventName];
        for (var i = 0; i < handlers.length; i++) {
            if (!handlers[i]) {
                handlers[i] = eventHandler;
                return i;
            }
        }
        handlers.push(eventHandler);
        return handlers.length;
    };
    MultiEventListener.prototype.off = function (eventName, handler, target) {
        var handlers = this.handlers[eventName];
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                var eventHandler = handlers[i];
                if (eventHandler.handler === handler && (!target || target === eventHandler.target)) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    };
    MultiEventListener.prototype.dispatchEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.supportEvent === null || this.supportEvent.hasOwnProperty(eventName)) {
            var handlers = this.handlers[eventName];
            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    var eventHandler = handlers[i];
                    if (eventHandler.handler) {
                        eventHandler.handler.apply(eventHandler.target, args);
                    }
                }
            }
        }
        else {
            cc.error("please add the event into clientEvent.js");
        }
    };
    MultiEventListener.prototype.setSupportEventList = function (events) {
        if (!(events instanceof Array)) {
            cc.error("supportEvent was not array");
            return false;
        }
        this.supportEvent = {};
        for (var i = 0; i < events.length; i++) {
            var eventName = events[i];
            this.supportEvent[eventName] = i;
        }
        return true;
    };
    return MultiEventListener;
}());
exports.MultiEventListener = MultiEventListener;
exports.EventListenerManager = {
    getBaseClass: function (type) {
        return type === "multi" ? MultiEventListener : SingleEventListener;
    }
};

cc._RF.pop();