import { GameBundle } from "./GameData";

export class Utils3 {
    public static setDesignResolution(): void {
        const canvas = cc.find("Canvas").getComponent(cc.Canvas);
        const winSize = cc.winSize;
        
        if (winSize.width / winSize.height > 9 / 16) {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        } else {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        }
    }

    public static setKVUserData(key: string, value: string): void {
        cc.sys.localStorage.setItem(key, value);
    }

    public static getKVUserData(key: string): string {
        return cc.sys.localStorage.getItem(key);
    }

    public static loadRes(path: string, type: typeof cc.Asset, callback?: Function): void {
        GameBundle[3].load("GameRes3/" + path, type, (err: Error, asset: cc.Asset) => {
            if (err) {
                cc.error(err.message || err);
            } else if (typeof callback === "function") {
                callback(asset);
            }
        });
    }

    public static fadeIn(node: cc.Node, duration: number = 1): void {
        node.opacity = 0;
        node.runAction(cc.fadeIn(duration));
    }

    public static getSaveData(callback?: Function): void {
        let saveData = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);
        
        if (saveData) {
            window.INIT_GAME_SAVE_DATA = JSON.parse(saveData);
        } else {
            cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
            saveData = window.INIT_GAME_SAVE_DATA;
        }
        
        if (callback) {
            callback(saveData);
        }
    }

    public static setSaveData(): void {
        console.log("本地数据设置成功", JSON.stringify(window.INIT_GAME_SAVE_DATA));
        cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
    }

    public static random(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min));
    }

    public static getAngle(x1: number, y1: number, x2: number, y2: number): number {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        const sinValue = dy / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const angle = Math.acos(sinValue);
        return 180 / (Math.PI / angle);
    }

    public static getRandomSDiff(min: number, max: number, count: number): number[] {
        if (max - min + 1 < count) {
            return [];
        }

        const arr: number[] = new Array(max - min + 1);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = min + i;
        }

        const result: number[] = new Array(count);
        for (let i = 0; i < count; i++) {
            const randomIndex = this.random(0, arr.length - 1 - i);
            result[i] = arr[randomIndex];
            
            const lastIndex = arr.length - 1 - i;
            const temp = arr[lastIndex];
            arr[lastIndex] = arr[randomIndex];
            arr[randomIndex] = temp;
        }

        return result;
    }

    public static showGetItem(count: number, type: number, parent: cc.Node, x?: number, y?: number): void {
        this.loadRes("prefabs/textbg", cc.Prefab, (prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.zIndex = 1000;
            
            const labelNode = node.getChildByName("l_num");
            const goldSprite = node.getChildByName("sp_gold");
            const boomSprite = node.getChildByName("sp_boom");
            
            if (type === 0) {
                labelNode.getComponent(cc.Label).string = cc.js.formatStr("Ultimate Bombingx%d", count);
                goldSprite.active = false;
                boomSprite.active = true;
            } else {
                labelNode.getComponent(cc.Label).string = cc.js.formatStr("gold%d", count);
                goldSprite.active = true;
                boomSprite.active = false;
            }
            
            const posX = x || 0;
            const posY = y || 0;
            
            if (parent && cc.isValid(parent)) {
                node.parent = parent;
            } else {
                node.parent = cc.find("Canvas");
            }
            
            node.setPosition(posX, posY);
            
            const moveAction = cc.moveBy(1.5, cc.v2(0, 70));
            const fadeAction = cc.fadeOut(1);
            
            node.runAction(cc.sequence(
                moveAction,
                fadeAction,
                cc.callFunc(() => {
                    node.destroy();
                })
            ));
        });
    }

    public static showTipsText(text: string, parent: cc.Node, x?: number, y?: number, fontSize?: number, color?: cc.Color, duration?: number, moveDistance?: number): void {
        const node = new cc.Node("tipstext");
        node.zIndex = 1000;
        
        const label = node.addComponent(cc.Label);
        label.fontFamily = "黑体";
        label.string = text;
        
        const posX = x || 0;
        const posY = y || 0;
        label.fontSize = fontSize || 40;
        label.lineHeight = fontSize ? fontSize + 10 : 50;
        node.color = color || cc.Color.WHITE;
        
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        } else {
            node.parent = cc.find("Canvas");
        }
        
        const moveDuration = duration || 0.5;
        const distance = moveDistance || 70;
        
        node.setPosition(posX, posY);
        
        const moveAction = cc.moveBy(moveDuration, cc.v2(0, distance));
        const fadeAction = cc.fadeOut(1);
        
        node.runAction(cc.sequence(
            moveAction,
            fadeAction,
            cc.callFunc(() => {
                node.destroy();
            })
        ));
    }

    public static showHurtText(text: string, parent: cc.Node, x?: number, y?: number, fontSize?: number, color?: cc.Color, duration?: number, scale?: number, isStatic?: boolean): void {
        this.loadRes("prefabs/l_hurt", cc.Prefab, (prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.zIndex = 1000;
            
            const label = node.getComponent(cc.Label);
            label.string = text;
            
            const posX = x || 0;
            const posY = y || 0;
            label.fontSize = fontSize || 40;
            label.lineHeight = 80;
            node.color = color || cc.Color.WHITE;
            
            if (parent && cc.isValid(parent)) {
                node.parent = parent;
            } else {
                node.parent = cc.find("Canvas");
            }
            
            const moveDuration = duration || 0.5;
            const jumpScale = scale || 1;
            
            node.setPosition(posX, posY);
            
            if (!this.dir) {
                this.dir = false;
            }
            this.dir = !this.dir;
            const direction = this.dir ? -1 : 1;
            
            if (isStatic) {
                jumpScale = 0;
            }
            
            const jumpAction = cc.jumpBy(moveDuration, 100 * jumpScale * direction, -30, 100, 1);
            const fadeAction = cc.fadeOut(0.8);
            
            node.runAction(cc.sequence(
                jumpAction,
                fadeAction,
                cc.callFunc(() => {
                    node.destroy();
                    node = null;
                })
            ));
        });
    }

    public static moveIcon(spriteFrame: cc.SpriteFrame, parent: cc.Node, startPos: cc.Vec2, endPos: cc.Vec2, callback?: Function, duration?: number, jumpDistance?: number): void {
        const moveDuration = duration || 1;
        const node = new cc.Node("iconmove");
        
        node.addComponent(cc.Sprite).spriteFrame = spriteFrame;
        
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        } else {
            node.parent = cc.find("Canvas");
        }
        
        const randomValue = this.random(0, 1000);
        node.anchorY = 0;
        node.position = startPos;
        node.zIndex = 1000;
        
        if (jumpDistance && jumpDistance > 0) {
            if (randomValue > 500) {
                jumpDistance *= -1;
            }
            
            node.runAction(cc.sequence(
                cc.jumpBy(0.5, jumpDistance, 0, 100, 1),
                cc.delayTime(0.5),
                cc.moveTo(moveDuration, endPos).easing(cc.easeIn(3)),
                cc.callFunc(() => {
                    if (callback) {
                        callback();
                    }
                    node.destroy();
                })
            ));
        } else {
            node.runAction(cc.sequence(
                cc.moveTo(moveDuration, endPos).easing(cc.easeIn(3)),
                cc.callFunc(() => {
                    if (callback) {
                        callback();
                    }
                    node.destroy();
                })
            ));
        }
    }

    public static SetSoundEffect(path: string): void {
        GameBundle[3].load("GameRes3/" + path, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
            window.bgmAudioID = cc.audioEngine.playEffect(clip, false);
        });
    }

    public static playBgmMusic(path?: string, loop?: boolean): void {
        this.resumBgmMusic(path, loop);
    }

    public static resumBgmMusic(path?: string, loop?: boolean): void {
        const bgmPath = path || window.BGM;
        
        try {
            if (window.bgmAudioID >= 0) {
                cc.audioEngine.resume(window.bgmAudioID);
            } else {
                setTimeout(() => {
                    GameBundle[3].load("GameRes3/" + bgmPath, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
                        window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
                    });
                }, 500);
            }
        } catch (err) {
            console.error(err);
            setTimeout(() => {
                GameBundle[3].load("GameRes3/" + bgmPath, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
                    window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
                });
            }, 500);
        }
    }

    public static stopBgmMusic(): void {
        try {
            if (window.bgmAudioID !== undefined) {
                cc.audioEngine.pause(window.bgmAudioID);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    public static formatSecToTime(seconds: number): string {
        let timeString = "";
        
        if (seconds > -1) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60) % 60;
            const secs = seconds % 60;
            
            timeString = hours < 10 ? "0" + hours + ":" : hours + ":";
            if (minutes < 10) {
                timeString += "0";
            }
            timeString += minutes + ":";
            if (secs < 10) {
                timeString += "0";
            }
            timeString += secs;
        }
        
        return timeString;
    }

    public static getMin(a: number, b: number): number {
        return a > b ? b : a;
    }

    public static getMax(a: number, b: number): number {
        return a > b ? a : b;
    }

    public static getMiddleIndex(start: number, end: number, useCeil?: boolean): number {
        const range = end - start;
        
        if (range % 2 === 0) {
            return range / 2 + start;
        } else {
            return useCeil ? Math.ceil(range / 2) + start : Math.floor(range / 2) + start;
        }
    }

    private static dir: boolean = false;
}