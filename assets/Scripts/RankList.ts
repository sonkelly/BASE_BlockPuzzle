export default class RankList {
    
    public static setScore(score: number, success?: Function, fail?: Function, complete?: Function): void {
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
    }

    public static showFriendList(): void {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 1
            });
        }
    }

    public static showGroupList(shareTicket: string): void {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                shareTicket: shareTicket,
                rankType: 0
            });
        }
    }

    public static showGameResultList(): void {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 2
            });
        }
    }

    public static checkSurpassFriend(score: number, x?: number, y?: number): void {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 3,
                score: score,
                x: x || 0,
                y: y || 0
            });
        }
    }

    public static checkWillSurpass(score: number, y?: number): void {
        if (typeof wx !== 'undefined') {
            wx.postMessage({
                rankType: 4,
                score: score,
                y: y || 500
            });
        }
    }
}