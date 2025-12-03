"use strict";
cc._RF.push(module, '3ee55L4d4VBM6ZgCxozAIF5', 'RankList');
// Scripts/RankList.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RankList = /** @class */ (function () {
    function RankList() {
    }
    RankList.setScore = function (score, success, fail, complete) {
        if (typeof wx !== 'undefined') {
            wx.setUserCloudStorage({
                KVDataList: [{
                        key: "score",
                        value: score.toString()
                    }],
                success: success || null,
                fail: fail || null,
                complete: complete || null
            });
        }
    };
    RankList.showFriendList = function () {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 1
            });
        }
    };
    RankList.showGroupList = function (shareTicket) {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                shareTicket: shareTicket,
                rankType: 0
            });
        }
    };
    RankList.showGameResultList = function () {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 2
            });
        }
    };
    RankList.checkSurpassFriend = function (score, x, y) {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 3,
                score: score,
                x: x || 0,
                y: y || 0
            });
        }
    };
    RankList.checkWillSurpass = function (score, y) {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 4,
                score: score,
                y: y || 500
            });
        }
    };
    return RankList;
}());
exports.default = RankList;

cc._RF.pop();