import { MODE, Property } from "./Property";
export const GameName = "Bubble_LocalData";
export const GameBundle = {};

export class GameData {
    public static oneToGame: number = 0;
    public static sceneName: string = null;
    public static isPause: number = 0;
    public static audioSwitch: number = 1;
    public static propBomb: number = 0;
    public static propRainBow: number = 0;
    public static xmxx_Hammer: number = 0;
    public static xmxx_Refresh: number = 0;
    public static xmxx_Pen: number = 0;
    public static teachingXS: number = 0;
    public static teaching: number = 0;
    public static curScore: number = 0;
    public static blockData: any[] = [];
    public static bestScore: { [key: string]: any } = {};
    public static level: { [key: string]: any } = {};
    public static modeLock: { [key: string]: any } = {};
    public static canShowPush: boolean = true;
    public static pushChangeCount: number = 0;
    public static isTouch: number = 0;
    public static pushChange_Time: number = 60;
    public static pushZJD_autoShow: number = 60;
    public static isGetBestScore: number = 0;
    public static isWin: boolean = false;
    public static isFail: boolean = false;
    public static push_BlockArr: any[] = [];
    public static blockIndex: number = 0;
    public static zjd_Score: number = 0;
    public static gameDataBind : any;

    public static localData: any = {
        propBomb: 0,
        propRainBow: 0,
        xmxx_Hammer: 0,
        xmxx_Refresh: 0,
        xmxx_Pen: 0,
        teachingXS: 0,
        teaching: 0,
        curScore: 0,
        blockData: [],
        bestScore: {},
        level: {},
        modeLock: {}
    };

    public static initialData(): void {
        this.pushChangeCount = 0;
        this.canShowPush = true;
        this.isTouch = 0;
        this.pushChange_Time = Property.PUSH_TIME;
        this.pushZJD_autoShow = Property.PUSH_ZJD_TIME;
        this.isGetBestScore = 0;
        this.isWin = false;
        this.isFail = false;
        this.push_BlockArr = [];
        this.zjd_Score = 0;
        this.blockIndex = 0;
        this.saveData();
        this.resume();
    }

    public static saveData(): void {
        for (const key in this.localData) {
            this.localData[key] = this[key];
        }
        const dataStr = JSON.stringify(this.localData);
        cc.sys.localStorage.setItem(GameName, dataStr);
    }

    public static loadData(callback?: (success: boolean) => void): void {
        const dataStr = cc.sys.localStorage.getItem(GameName);
        if (dataStr === "" || dataStr === null) {
            GameData.saveData();
            callback && callback(false);
            return;
        }

        const data = JSON.parse(dataStr);
        let needUpdate = false;

        for (const key in data) {
            this[key] = data[key];
        }

        if (data.propBomb === null) {
            this.propBomb = 0;
            needUpdate = true;
        }
        if (data.propRainBow === null) {
            this.propRainBow = 0;
            needUpdate = true;
        }
        if (data.xmxx_Hammer === null) {
            this.xmxx_Hammer = 0;
            needUpdate = true;
        }
        if (data.xmxx_Refresh === null) {
            this.xmxx_Refresh = 0;
            needUpdate = true;
        }
        if (data.xmxx_Pen === null) {
            this.xmxx_Pen = 0;
            needUpdate = true;
        }

        if (data.modeLock && data.modeLock[MODE.KILL] === null) {
            this.modeLock[MODE.KILL] = 1;
            needUpdate = true;
        }
        if (data.modeLock && data.modeLock[MODE.JIUJIU2] === null) {
            this.modeLock[MODE.JIUJIU2] = 1;
            needUpdate = true;
        }
        if (data.modeLock && data.modeLock[MODE.STAR2] === null) {
            this.modeLock[MODE.STAR2] = 1;
            needUpdate = true;
        }

        if (!this.level[MODE.JIUJIU2]) {
            this.level[MODE.JIUJIU2] = 1;
            this.bestScore[MODE.JIUJIU2] = {};
            const level = this.level[MODE.JIUJIU2];
            this.bestScore[MODE.JIUJIU2][level] = 0;
            needUpdate = true;
        }

        if (needUpdate) {
            this.saveData();
        }

        callback && callback(true);
    }

    public static setBestScore(mode: string, score: number): void {
        const currentLevel = this.level[mode];
        this.bestScore[mode][currentLevel] = score;
        this.saveData();
    }

    public static getBestScore(mode: string): number {
        const currentLevel = this.level[mode];
        return this.bestScore[mode][currentLevel] || 0;
    }

    public static pause(): void {
        this.isPause = 1;
    }

    public static resume(): void {
        this.isPause = 0;
    }
}