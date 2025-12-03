const { ccclass, property } = cc._decorator;
import AudioManager, { AudioID } from "./AudioManager";
import clientEvent from "./clientEvent";
import ExtendScript from "./ExtendScript";
import { MODE, GameMode, BlockConfig } from "./Property";
import ResourceUtil from "./resourceUtil";
import { GameData } from "./GameData";

@ccclass
export default class kuaiM extends ExtendScript {
    @property
    private _colorType: number = -1;
    
    @property
    private _shapeType: number = -1;
    
    @property
    private _width: number = 0;
    
    @property
    private _height: number = 0;
    
    private touchDate: number = -1;
    private blockPos: any[] = [];
    private index: number = 0;
    private checkFrameList: any[] = [];
    private checkFKlist: any[] = [];
    private checkIndex: number[] = [];
    private checkIndexClone: number[] = [];
    private ox: number = 0;
    private oy: number = 0;

    onLoad() {
        this.touchDate = -1;
        this.blockPos = [];
    }

    init(e: number, t: number, o?: boolean, n?: number) {
        if (o === undefined) o = true;
        
        this.index = n;
        this.checkFrameList = [];
        this.checkFKlist = [];
        this.checkIndex = [];
        this.checkIndexClone = [];
        this._colorType = e;
        this._shapeType = t;
        cc.tween(this.node)
            .set({ scale: 0 })
            .to(0.2, { scale: BlockConfig.scaleParam })
            .call(() => {
                if (o) this.addTouchEvent();
            })
            .start();

        const children = this.node.children;
        for (let r = 0; r < children.length; r++) {
            const block = children[r].getComponent("block");
            block._move = 1;
            block.initial(this._colorType);
        }

        this.ox = this.node.x;
        this.oy = this.node.y;
        this._width = this.node.width;
        this._height = this.node.height;
        this.node.width = 380;
        this.node.height = 380;
    }

    scaleChildren(e: boolean) {
        const children = this.node.children;
        
        if (e) {
            this.checkFrameList = [];
            this.node.x = this.ox;
            this.node.y = this.oy;
            this.node.scale = BlockConfig.scaleParam;
            
            for (let o = 0; o < children.length; o++) {
                children[o].scale = 1;
            }
        } else {
            AudioManager.instance.playSound(AudioID.BSelect);
            this.node.scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
            
            for (let n = 0; n < children.length; n++) {
                children[n].scale = GameMode == MODE.JINGDIAN ? 
                    BlockConfig.blockScale : 
                    BlockConfig[GameMode].wh / BlockConfig.normalWH;
            }
        }
    }

    addTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            if (GameData.isTouch == 0) {
                this.touchDate = new Date().getTime();
                GameData.isTouch = this.touchDate;
                GameData.blockIndex = this.index;
                this.node.y += BlockConfig.upH;
                this.scaleChildren(false);
                clientEvent.dispatchEvent("curCickKuaiM", this);
                
                if (this.blockPos.length == 1) {
                    for (let t = 0; t < this.blockPos[0].length; t++) {
                        this.blockPos[0][t].getComponent(ExtendScript).showOpacity();
                    }
                }
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (t: cc.Event.EventTouch) => {
            if (GameData.isTouch == this.touchDate) {
                const delta = t.touch.getDelta();
                this.node.x += delta.x;
                this.node.y += delta.y;
                this.collisionFunc();
                
                if (this.checkIsCanDrop()) {
                    this.changeColorDeal();
                } else {
                    this.cleanFrameAll();
                }
                
                GameData.gameDataBind.boardFrame.checkXC();
            }
        }, this);

        const touchEndHandler = () => {
            if (GameData.isTouch == this.touchDate) {
                if (this.blockPos.length == 1) {
                    for (let t = 0; t < this.blockPos[0].length; t++) {
                        this.blockPos[0][t].getComponent(ExtendScript).hideOpacity();
                    }
                }
                
                GameData.isTouch = 0;
                this.dropDownFunc();
            }
        };

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, touchEndHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, touchEndHandler, this);
    }

    checkIsLose(): boolean {
        this.blockPos = [];
        const e = cc.instantiate(this.node);
        const children = e.children;
        
        e.opacity = 0;
        e.scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
        e.parent = this.node.parent;

        const firstChild = children[0];
        const offsetX = firstChild.x > 0 ? -firstChild.x : firstChild.x;
        const offsetY = firstChild.y > 0 ? -firstChild.y : firstChild.y;
        
        for (let a = 0; a < children.length; a++) {
            children[a].x += offsetX;
            children[a].y += offsetY;
        }

        for (let i = 0; i < GameData.gameDataBind.boardFrame.frameList.length; i++) {
            const worldPos = GameData.gameDataBind.boardFrame.node.convertToWorldSpaceAR(
                GameData.gameDataBind.boardFrame.frameList[i].position
            );
            const localPos = this.node.parent.convertToNodeSpaceAR(worldPos);
            e.setPosition(localPos);

            const c: any[] = [];
            for (let l = 0; l < children.length; l++) {
                const childWorldPos = e.convertToWorldSpaceAR(cc.v2(children[l].x, children[l].y));
                const frameLocalPos = GameData.gameDataBind.boardFrame.node.convertToNodeSpaceAR(childWorldPos);
                const frame = this.checkPosFuncAAA(frameLocalPos);
                
                if (frame) {
                    c.push(frame);
                }
            }

            if (c.length >= children.length) {
                this.blockPos.push(c);
            }
        }

        e.parent = null;
        e.destroy();

        return this.blockPos.length > 0 ? false : (this.blockPos = [], true);
    }

    collisionFunc() {
        if (this.checkIndex.length != 0) {
            this.checkIndexClone = this.checkIndex.concat();
        }
        
        this.checkFrameList = [];
        this.checkFKlist = [];
        this.checkIndex = [];

        const children = this.node.children;
        for (let t = 0; t < children.length; t++) {
            const worldPos = this.node.convertToWorldSpaceAR(cc.v2(children[t].x, children[t].y));
            const localPos = GameData.gameDataBind.boardFrame.node.convertToNodeSpaceAR(worldPos);
            const frame = this.checkPosFunc(localPos);
            
            if (frame) {
                this.checkFKlist.push(children[t]);
                this.checkFrameList.push(frame);
                children[t].getComponent("block").index = frame.getComponent("kuaiFrame").index;
                this.checkIndex.push(frame.getComponent("kuaiFrame").index);
            }
        }
    }

    checkPosFunc(e: cc.Vec2): any {
        const threshold = BlockConfig[GameMode].wh / 2 - 0.1;
        
        for (let o = 0; o < GameData.gameDataBind.boardFrame.frameList.length; o++) {
            const frame = GameData.gameDataBind.boardFrame.frameList[o];
            if (!frame.getComponent("kuaiFrame").isHaveFK) {
                const dx = Math.abs(frame.x - e.x);
                const dy = Math.abs(frame.y - e.y);
                
                if ((dx <= threshold && dy < threshold) || (dy <= threshold && dx < threshold)) {
                    return frame;
                }
            }
        }
        return null;
    }

    checkPosFuncAAA(e: cc.Vec2): any {
        const threshold = BlockConfig[GameMode].wh / 2;
        
        for (let o = 0; o < GameData.gameDataBind.boardFrame.frameList.length; o++) {
            const frame = GameData.gameDataBind.boardFrame.frameList[o];
            if (!frame.getComponent("kuaiFrame").isHaveFK) {
                const dx = Math.abs(frame.x - e.x);
                const dy = Math.abs(frame.y - e.y);
                
                if ((dx <= threshold && dy < threshold) || (dy <= threshold && dx < threshold)) {
                    return frame;
                }
            }
        }
        return null;
    }

    checkIsCanDrop(): boolean {
        if (this.checkFrameList.length == 0 || 
            this.checkFrameList.length != this.node.children.length) {
            return false;
        }
        
        for (let e = 0; e < this.checkFrameList.length; e++) {
            if (this.checkFrameList[e].getComponent("kuaiFrame").isHaveFK) {
                return false;
            }
        }
        
        return true;
    }

    dropDownFunc() {
        this.cleanFrameAll();
        
        if (!this.checkIsCanDrop()) {
            this.scaleChildren(true);
            
            if (GameMode == MODE.JINGDIAN && GameData.teaching < 3) {
                GameData.gameDataBind.boardFrame.showTeaching(true);
            } else if (GameMode == MODE.TEACH && GameData.teachingXS < 3) {
                GameData.gameDataBind.boardFrame.showTeaching(true);
            }
            return;
        }

        AudioManager.instance.playSound(AudioID.BDown);
        
        const blockData = {
            x: 0,
            y: 0,
            zIndex: -1,
            scale: 1
        };

        for (let t = 0; t < this.checkFKlist.length; t++) {
            const block = this.checkFKlist[t];
            block.x = blockData.x;
            block.y = blockData.y;
            block.scale = blockData.scale;
            block.zIndex = blockData.zIndex;
            block.parent = this.checkFrameList[t];
            
            blockData.type = block.getComponent("block")._cType;
            
            const frame = this.checkFrameList[t].getComponent("kuaiFrame");
            frame.isHaveFK = true;
            frame.simulateFK = true;
            frame.putState = true;
            
            if (GameMode == MODE.JINGDIAN) {
                const frameInfo = frame.getInfo();
                GameData.blockData[frameInfo.index] = frameInfo;
                GameData.blockData[frameInfo.index].knData = blockData;
                GameData.saveData();
            }
        }

        this.node.parent = null;
        
        if (GameMode == MODE.JIEMI) {
            let blockNum = GameData.gameDataBind.kuaiManager.getBlockNum();
            blockNum--;
            GameData.gameDataBind.kuaiManager.setBlockNum(blockNum);
        }

        clientEvent.dispatchEvent("blockPut");
        this.clean();
    }

    changeColorDeal() {
        if (this.checkIndexClone.length > 0 && 
            Utils.check2AryIsEqual(this.checkIndexClone, this.checkIndex)) {
            return;
        }

        this.cleanFrameAll();

        for (let e = 0; e < this.checkFrameList.length; e++) {
            const frame = this.checkFrameList[e].getComponent("kuaiFrame");
            frame.showColor(this._colorType);
            frame.simulateFK = true;
        }

        for (let o = 0; o < this.checkIndexClone.length; o++) {
            let shouldHide = true;
            
            for (let a = 0; a < this.checkIndex.length; a++) {
                if (this.checkIndexClone[o] === this.checkIndex[a]) {
                    shouldHide = false;
                    break;
                }
            }
            
            if (shouldHide) {
                const frameIndex = this.checkIndexClone[o] - 1;
                const frame = GameData.gameDataBind.boardFrame.frameList[frameIndex].getComponent("kuaiFrame");
                frame.hideColor();
                frame.simulateFK = null;
            }
        }
    }

    cleanFrameAll() {
        this.checkIndexClone = [];
        this.checkIndex = [];
        
        for (let e = 0; e < GameData.gameDataBind.boardFrame.frameList.length; e++) {
            const frame = GameData.gameDataBind.boardFrame.frameList[e].getComponent("kuaiFrame");
            frame.simulateFK = frame.isHaveFK;
            frame.hideColor();
            frame.putState = false;
        }
    }

    setGrayKuai() {
        const children = this.node.children;
        for (let t = 0; t < children.length; t++) {
            ResourceUtil.instance.setSpriteFrame("kuai/huiKuai", children[t].getComponent(cc.Sprite));
        }
    }

    recoveryKuai() {
        const children = this.node.children;
        for (let t = 0; t < children.length; t++) {
            ResourceUtil.instance.setSpriteFrame("kuai/k" + this._colorType, children[t].getComponent(cc.Sprite));
        }
    }

    clean() {
        this.node.destroy();
    }
}