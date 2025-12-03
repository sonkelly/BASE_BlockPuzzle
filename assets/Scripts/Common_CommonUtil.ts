const { ccclass, property } = cc._decorator;
import { GameBundle } from "./GameData";

@ccclass
export default class Common_CommonUtil {
    
    public static isWeChat(): boolean {
        return cc.sys.platform === cc.sys.WECHAT_GAME;
    }

    public static showTips(text: string, duration?: number): void {
        GameBundle[3].load("GameRes3/common/prefabs/h5game_Tips", (err: Error, prefab: cc.Prefab) => {
            if (err) {
                cc.error(err);
                return;
            }
            const tipsNode = cc.instantiate(prefab);
            tipsNode.getComponent("h5game_Tips").setText(text, duration);
            tipsNode.parent = cc.director.getScene();
        });
    }

    public static showShareFailTips(): void {
        this.getPrefab("prefabs/n_sharebubble", (node: cc.Node) => {
            node.parent = cc.find("Canvas") || cc.director.getScene().children[0];
            node.zIndex = 2048;
        });
    }

    public static shakeScreen(target: cc.Node, duration: number = 0.02, intensity: number = 10): void {
        target.stopAllActions();
        target.runAction(cc.sequence(
            cc.moveBy(duration, cc.v2(2 * intensity, 0)),
            cc.moveBy(2 * duration, cc.v2(4 * -intensity, 0)),
            cc.moveBy(duration, cc.v2(2 * intensity, 0)),
            cc.moveBy(duration, cc.v2(0, 2 * intensity)),
            cc.moveBy(2 * duration, cc.v2(0, 4 * -intensity)),
            cc.moveBy(duration, cc.v2(0, 2 * intensity)),
            cc.moveBy(duration, cc.v2(intensity, 0)),
            cc.moveBy(2 * duration, cc.v2(2 * -intensity, 0)),
            cc.moveBy(duration, cc.v2(intensity, 0)),
            cc.moveBy(duration, cc.v2(0, intensity)),
            cc.moveBy(2 * duration, cc.v2(0, 2 * -intensity)),
            cc.moveBy(duration, cc.v2(0, intensity))
        ));
    }

    public static fitScreen(): void {
        const canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        const visibleSize = cc.view.getVisibleSize();
        
        if (visibleSize.width / visibleSize.height < 9 / 16) {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        } else {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        }
    }

    public static resetScale(node: cc.Node): void {
        const visibleSize = cc.view.getVisibleSize();
        if (visibleSize.width / visibleSize.height < 9 / 16) {
            node.scale = visibleSize.width / 1080;
        } else {
            node.scale = visibleSize.height / 1920;
        }
    }

    public static imgStr(str: string): string {
        return str;
    }

    public static txtStr(str: string): string {
        return str;
    }

    public static setSprite(target: cc.Sprite | cc.Node | string, path: string = "", callback?: Function): void {
        if (!target) {
            throw new Error("请传入正确的节点名称");
        }
        if (!path) {
            throw new Error("请传入正确的资源路径");
        }

        let sprite: cc.Sprite;
        
        if (target instanceof cc.Sprite) {
            sprite = target;
        } else if (target instanceof cc.Node) {
            sprite = target.getComponent(cc.Sprite);
        } else if (typeof target === "string") {
            sprite = cc.find(target).getComponent(cc.Sprite);
        } else {
            throw new Error("传入节点资源类型不正确");
        }

        if (!sprite) {
            throw new Error("未找到正确的Sprite");
        }

        if (sprite && sprite.spriteFrame) {
            const originalOpacity = sprite.node.opacity;
            sprite.node.opacity = 0;

            const loadMethod = path.indexOf("http") !== 0 ? "loadRes" : "load";
            
            cc.loader[loadMethod](path, (err: Error, texture: cc.Texture2D) => {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                sprite.node.opacity = originalOpacity;
                callback && callback();
            });
        }
    }

    public static getPrefab(path: string, callback: (node: cc.Node) => void): void {
        GameBundle[3].load("GameRes3/" + path, (err: Error, prefab: cc.Prefab) => {
            if (err) {
                throw err;
            }
            callback(cc.instantiate(prefab));
        });
    }

    public static setAvatarSprite(target: cc.Sprite | cc.Node, avatarUrl: string): void {
        let sprite: cc.Sprite = null;
        
        if (target instanceof cc.Sprite) {
            sprite = target;
        } else if (target instanceof cc.Node) {
            sprite = target.getComponent(cc.Sprite);
        }

        if (!sprite) {
            throw new Error("CommonUtil.setSprite: 无法找到正确的Sprite");
        }

        const image = wx.createImage();
        image.onload = () => {
            const texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = avatarUrl;
    }
}