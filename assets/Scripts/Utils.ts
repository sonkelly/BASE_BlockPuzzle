import AudioManager from "./AudioManager";

export default class Utils {
    private static TAG: string = "Utils===>>>";

    public static nodePlayAnimation(node: cc.Node, animName?: string): void {
        const anim = node.getComponent(cc.Animation);
        if (anim) {
            animName ? anim.play(animName) : anim.play();
        }
    }

    public static nodePlayAnimationCall(node: cc.Node, animName?: string, callback?: Function): void {
        const anim = node.getComponent(cc.Animation);
        if (anim) {
            node.stopAllActions();
            animName ? anim.play(animName) : anim.play();
            anim.once("finished", () => {
                callback && callback();
            });
        }
    }

    public static addSoundEvent(armature: any): void {
        armature.on(dragonBones.EventObject.SOUND_EVENT, (event: any) => {
            // Assuming AudioManager is available globally
            AudioManager.instance.playAniSound(event.name);
        });
    }

    public static playAni(armature: any, animName: string, playTimes: number = -1): void {
        armature.playAnimation(animName, playTimes);
    }

    public static playAniCall(armature: any, animName: string, callback?: Function): void {
        armature.once(dragonBones.EventObject.COMPLETE, (event: any) => {
            callback && callback(event.animationState.name);
        }, this);
        armature.playAnimation(animName, 1);
    }

    public static setSolt(armatureDisplay: dragonBones.ArmatureDisplay, slotName: string, displayIndex: number): void {
        armatureDisplay.armature().getSlot(slotName).displayIndex = displayIndex;
    }

    public static loadDragonBones(armatureDisplay: dragonBones.ArmatureDisplay, path: string, armatureName: string, animName: string, completeCallback?: Function, loadCallback?: Function): void {
        cc.resources.loadDir(path, (err: Error, assets: cc.Asset[]) => {
            if (err || assets.length <= 0) {
                console.error(err);
            } else {
                assets.forEach((asset: cc.Asset) => {
                    if (asset instanceof dragonBones.DragonBonesAsset) {
                        armatureDisplay.dragonAsset = asset;
                    } else if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                        armatureDisplay.dragonAtlasAsset = asset;
                    }
                });
                armatureDisplay.armatureName = armatureName;
                armatureDisplay.playAnimation(animName, -1);
                if (completeCallback) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
                }
                loadCallback && loadCallback();
            }
        });
    }

    public static getAngle(pos1: cc.Vec2, pos2: cc.Vec2): number {
        return Math.atan(pos2.y - pos1.y / pos2.x - pos1.x);
    }

    public static getDistance(pos1: cc.Vec2, pos2: cc.Vec2): number {
        return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
    }

    public static getProbability(percent: number): boolean {
        return 100 * Math.random() < percent;
    }

    public static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    public static replaceString(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(find, "g"), replace);
    }

    public static getArrayMax(arr: number[]): number {
        const max = Math.max.apply(Math, arr);
        return arr.indexOf(max);
    }

    public static getArrayMin(arr: number[]): number {
        const min = Math.min.apply(Math, arr);
        return arr.indexOf(min);
    }

    public static strToJson(str: string): any {
        const obj: any = {};
        const pairs = str.split(",");
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split(":");
            obj[pair[0]] = pair[1];
        }
        return obj;
    }

    public static getJsonCount(obj: any): number {
        return Object.keys(obj).length;
    }

    public static equalItemNum(arr: any[], target: any): number {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (target === arr[i]) {
                count++;
            }
        }
        return count;
    }

    public static uniqueArray(arr: any[]): any[] {
        return Array.from(new Set(arr));
    }

    public static getArrRandomIndex(arr: any[], count: number): number[] {
        const indices: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            indices.push(i);
        }
        const result: number[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = this.getRandom(0, indices.length);
            result.push(indices[randomIndex]);
            indices.splice(randomIndex, 1);
        }
        return result;
    }

    public static get2AryIntersect(arr1: any[], arr2: any[]): any[] {
        const result: any[] = [];
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr2[j] === arr1[i]) {
                    result.push(arr2[j]);
                }
            }
        }
        return result;
    }

    public static check2AryIsEqual(arr1: any[], arr2: any[]): boolean {
        for (let i = 0; i < arr1.length; i++) {
            if (arr2[i] !== arr1[i]) {
                return false;
            }
        }
        return true;
    }

    public static check4AryIsEqual(arr1: any[][], arr2: any[][]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr2[i][0] !== arr1[i][0]) {
                return false;
            }
        }
        return true;
    }

    public static angleToVectos(angle: number, vector: cc.Vec2): cc.Vec2 {
        const rad = cc.misc.degreesToRadians(angle);
        const rotated = vector.rotate(-rad);
        return cc.v2(rotated.x, rotated.y);
    }

    public static vectosToAngle(vec1: cc.Vec2, vec2: cc.Vec2): number {
        const angle = vec1.signAngle(vec2);
        return cc.misc.radiansToDegrees(angle);
    }

    public static exchangePosition(node1: cc.Node, node2: cc.Node): void {
        const tempPos = cc.v2(node1.x, node1.y);
        node1.position = cc.v2(node2.x, node2.y);
        node2.position = tempPos;
    }

    public static loadPrefab(path: string, name: string, autoAddToCanvas: boolean = true): void {
        cc.resources.load(path + "/" + name, (err: Error, prefab: cc.Prefab) => {
            if (err) {
                console.error(this.TAG, "加载预制资源失败, 原因:" + err);
            } else if (prefab instanceof cc.Prefab) {
                if (autoAddToCanvas) {
                    const node = cc.instantiate(prefab);
                    node.name = name;
                    cc.find("Canvas").addChild(node);
                }
            } else {
                console.error(this.TAG, "你加载的不是预制资源!");
            }
        });
    }

    public static ShowAsk(message: string): void {
        const node = new cc.Node();
        node.parent = cc.director.getScene();
        
        const sprite = node.addComponent(cc.Sprite);
        cc.resources.load("public/fj_tishidi", cc.SpriteFrame, (err: Error, spriteFrame: cc.SpriteFrame) => {
            sprite.spriteFrame = spriteFrame;
        });

        cc.tween(node)
            .set({
                scale: 0.6,
                x: cc.winSize.width / 2,
                y: cc.winSize.height / 2 - 200,
                zIndex: cc.macro.MAX_ZINDEX
            })
            .to(0.5, {
                x: cc.winSize.width / 2,
                y: cc.winSize.height / 2
            }, { easing: "backOut" })
            .delay(0.5)
            .call(() => {
                node.destroy();
            })
            .start();

        const labelNode = new cc.Node();
        labelNode.parent = node;
        const label = labelNode.addComponent(cc.Label);
        const formattedMsg = cc.js.formatStr("%s", message);
        label.string = formattedMsg;
        label.fontSize = 50;
        label.lineHeight = 60;
    }
}