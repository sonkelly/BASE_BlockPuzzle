const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourceUtil extends cc.Component {
    static instance : ResourceUtil = new ResourceUtil();
    onLoad(): void {
        // Initialization code can be added here if needed
    }

    setGray(node: cc.Node, isGray: boolean): void {
        const sprites = node.getComponentsInChildren(cc.Sprite);
        for (let i = 0; i < sprites.length; ++i) {
            const sprite = sprites[i];
            if (isGray) {
                sprite.setState(cc.Sprite.State.GRAY);
            } else {
                sprite.setState(cc.Sprite.State.NORMAL);
            }
        }
    }

    loadRes(path: string, type: typeof cc.Asset, callback: (error: Error, asset: any) => void): void {
        cc.resources.load(path, type, (error: Error, asset: any) => {
            if (error) {
                cc.error(error.message || error);
                callback(error, asset);
                return;
            }
            callback(null, asset);
        });
    }

    setSpriteFrame(path: string, sprite: cc.Sprite, callback?: (error: Error) => void): void {
        this.loadRes(path, cc.SpriteFrame, (error: Error, spriteFrame: cc.SpriteFrame) => {
            if (error) {
                console.error("set sprite frame failed! err:", path, error);
                if (callback) {
                    callback(error);
                }
                return;
            }
            
            if (sprite && cc.isValid(sprite)) {
                sprite.spriteFrame = spriteFrame;
                if (callback) {
                    callback(null);
                }
            }
        });
    }
}