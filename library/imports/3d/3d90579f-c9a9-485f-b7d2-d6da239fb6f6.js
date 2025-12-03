"use strict";
cc._RF.push(module, '3d905efyalIX7fS1tojn7b2', 'ShareSdk');
// Scripts/ShareSdk.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSdk = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShareSdk = /** @class */ (function () {
    function ShareSdk() {
    }
    ShareSdk_1 = ShareSdk;
    ShareSdk.setShareMenuEnabled = function (enable, withShareTicket) {
        if (!ShareSdk_1.isWeChatGame)
            return;
        var shareTicket = !!withShareTicket;
        if (enable) {
            wx.showShareMenu({
                withShareTicket: shareTicket
            });
        }
        else {
            wx.hideShareMenu({});
        }
    };
    ShareSdk.onShareAppMessage = function (callback) {
        if (ShareSdk_1.isWeChatGame) {
            wx.onShareAppMessage(callback);
        }
    };
    ShareSdk.shareAppMessage = function (shareData) {
        if (!ShareSdk_1.isWeChatGame)
            return;
        if (typeof shareData !== 'object') {
            console.log("param 'object' is not a js object");
            return;
        }
        if (shareData.title === undefined) {
            console.log("param 'object' property title is undefined!");
            return;
        }
        wx.shareAppMessage(shareData);
    };
    ShareSdk.openReliveView = function (prefab, data, parent) {
        var node = cc.instantiate(prefab);
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        }
        else {
            var canvas = cc.find("Canvas");
            node.parent = canvas;
        }
        var reliveViewCtrl = node.getComponent("ReliveViewCtrl");
        if (reliveViewCtrl) {
            reliveViewCtrl.setCallBackObj(data);
            if (data.cost_num) {
                reliveViewCtrl.setCostNumLabel(data.cost_num);
            }
            reliveViewCtrl.setScoreLabel(data.score);
            reliveViewCtrl.ShowView(true);
        }
    };
    ShareSdk.shareScoreMessage = function (score, title, imageUrl) {
        if (!ShareSdk_1.isWeChatGame)
            return;
        var shareTitle = title || "\u672C\u5C40\u5F97\u4E86" + score + "\u5206\uFF0C\u6CA1\u6709\u529E\u6CD5\uFF0C\u6211\u5C31\u662F\u8FD9\u4E48\u5F3A\u5927\uFF01";
        wx.shareAppMessage({
            title: shareTitle,
            imageUrl: cc.url.raw(imageUrl)
        });
    };
    ShareSdk.addRqCodeView = function (prefab, parent, posX, posY) {
        var x = posX || 0;
        var y = posY || 0;
        var node = cc.instantiate(prefab);
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        }
        else {
            var canvas = cc.find("Canvas");
            node.parent = canvas;
        }
        node.setPosition(x, y);
    };
    ShareSdk.showFriendRankView = function () {
        // Implementation for friend rank view
    };
    ShareSdk.showGroupRankView = function () {
        // Implementation for group rank view
    };
    var ShareSdk_1;
    ShareSdk.isWeChatGame = cc.sys.platform === cc.sys.WECHAT_GAME;
    ShareSdk = ShareSdk_1 = __decorate([
        ccclass('ShareSdk')
    ], ShareSdk);
    return ShareSdk;
}());
exports.ShareSdk = ShareSdk;

cc._RF.pop();