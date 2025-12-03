"use strict";
cc._RF.push(module, '500cfDHoAhId5btyFxla87/', 'PDef');
// Scripts/PDef.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var PDef = /** @class */ (function () {
    function PDef() {
    }
    PDef.prototype.init = function () { };
    PDef.prototype.initAD = function () { };
    PDef.prototype.release = function () { };
    PDef.prototype.loadBanner = function () { };
    PDef.prototype.showBanner = function () { };
    PDef.prototype.hideBanner = function () { };
    PDef.prototype.loadInterstitial = function () { };
    PDef.prototype.showInterstitial = function () { };
    PDef.prototype.hideInterstitial = function () { };
    PDef.prototype.createRewardedVideo = function () { };
    PDef.prototype.loadRewardedVideo = function () { };
    PDef.prototype.showRewardedVideo = function (callback) {
        callback && callback(true);
    };
    PDef.prototype.hideRewardedVideo = function () { };
    PDef.prototype.shareAppMessage = function () { };
    PDef.prototype.canRecord = function () {
        return false;
    };
    PDef.prototype.canShareRecord = function () {
        return false;
    };
    PDef.prototype.startRecord = function () { };
    PDef.prototype.pauseRecord = function () { };
    PDef.prototype.stopRecord = function () { };
    PDef.prototype.shareRecord = function () { };
    PDef.prototype.resetRecord = function () { };
    PDef.prototype.shareInnerRecord = function () { };
    PDef.prototype.createMoreGameButton = function () { };
    PDef.prototype.createMoreGameBanner = function () { };
    PDef.prototype.createMoreGamePortal = function () { };
    PDef.prototype.goToGameOrGameList = function () { };
    PDef.prototype.showFavoriteGuide = function () { };
    PDef.prototype.followAccount = function () { };
    PDef.prototype.openAwemeUserProfile = function () { };
    PDef.prototype.analytics = function () { };
    PDef.prototype.showLoading = function () {
        this.hideLoading();
    };
    PDef.prototype.hideLoading = function () { };
    PDef.prototype.createGameClub = function () { };
    PDef.prototype.navigateToMiniProgram = function () { };
    PDef.prototype.shareMessageToFriend = function () { };
    PDef.prototype.sendMsgToOpenDataProject = function () { };
    PDef.prototype.makeShareUI = function (callback, param1, param2, param3, param4) {
        if (param3 === void 0) { param3 = 0; }
        if (param4 === void 0) { param4 = false; }
        void 0 === param3 && (param3 = 0);
        void 0 === param4 && (param4 = false);
        callback && callback();
    };
    PDef = __decorate([
        ccclass
    ], PDef);
    return PDef;
}());
exports.default = PDef;

cc._RF.pop();