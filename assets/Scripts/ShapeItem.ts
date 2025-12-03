const { ccclass, property } = cc._decorator;
import GameMain from "./GameMain";
import { Utils3 } from "./Utils3";
@ccclass
export default class ShapeItem extends cc.Component {
    @property(cc.SpriteAtlas)
    m_spa_blocklist: cc.SpriteAtlas = null;

    @property(GameMain)
    GameLayer: any = null;

    private _bg_color: string = "";
    private _type_index: number = 0;
    private _colorindex: number = 1;
    private _blockcount: number = 0;
    private _next: number = null;
    private _data: any = null;
    private _checkFrameList: cc.Node[] = [];
    private _checkFKlist: cc.Node[] = [];

    private static readonly COLORS: string[] = ["#ffffff", "#f9bd1d", "#003DFF", "#85d546", "#D6309A"];

    start() {
        this._bg_color = "";
        this._type_index = 0;
        this._colorindex = 1;
        
        if (window['INIT_GAME_SAVE_DATA'].top_level < 1 && !window['GUIDE_LEVEL']) {
            this.resetBlock(22);
            this.GameLayer.showGuide();
        } else {
            this.resetBlock();
        }
        
        this.addTouchEvent();
        this._blockcount = 0;
    }

    updateIndex(updateSprite: boolean): number {
        const skinData = window['INIT_GAME_SAVE_DATA'].skin;
        
        for (let i = 0; i < skinData.length; i++) {
            if (skinData[i] >= 2) {
                this._type_index = i;
                break;
            }
        }

        this._data = window['SKIN_CONFIG'][this._type_index];

        if (updateSprite) {
            const shapeNode = this.node.getChildByName("n_shape");
            if (shapeNode) {
                for (let i = 0; i < shapeNode.childrenCount; i++) {
                    const sprite = shapeNode.children[i].getComponent(cc.Sprite);
                    sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + this._colorindex);
                }
            }
        }

        return this._type_index;
    }

    getTheConfig(): cc.Vec2[][] {
        const t = 109.77249200050075;
        const e = 110;
        const i = Math.cos(60 * Math.PI / 180);
        const n = Math.sin(60 * Math.PI / 180);
        const o = Math.cos(120 * Math.PI / 180);
        const c = Math.sin(120 * Math.PI / 180);
        const s = Math.cos(300 * Math.PI / 180);
        const a = Math.sin(300 * Math.PI / 180);

        return [
            [cc.v2(0, 0)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(330, 0)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(e + i * t, n * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(e + s * t, a * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(i * t, n * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(s * t, a * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(o * t, c * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(o * t + i * t, c * t + n * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(e, 0)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(i * t + e, n * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(i * t * 3, n * t * 3)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t * 2 + e, c * t * 2)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t - e, c * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t + e, c * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(-e, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t * 3, c * t * 3)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t + e, n * t), cc.v2(220, 0)],
            [cc.v2(0, 0), cc.v2(s * t, a * t), cc.v2(s * t + e, a * t), cc.v2(220, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(e, 190)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(0, 190), cc.v2(-e, 190)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(e, 0)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(0, 190), cc.v2(-e, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(s * t, 190 + a * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(e, 0), cc.v2(i * t + e, n * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(-e, 0), cc.v2(o * t - e, c * t)]
        ];
    }

    newOneK(colorIndex: number): cc.Node {
        const node = new cc.Node("colorSpr");
        node['colorIndex'] = colorIndex;
        node['colorName'] = this._data.name;
        
        const sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + colorIndex);
        
        return node;
    }

    getCurColorIndex(): number {
        return this._colorindex;
    }

    createItem(typeIndex?: number): cc.Node {
        this._blockcount++;
        if (this._blockcount >= 5) {
            this._next = 0;
            this._blockcount = 0;
        }

        if (typeof this._next === 'number' && !typeIndex) {
            typeIndex = this._next;
            this._next = null;
            if (typeIndex === 0) {
                this._blockcount = 0;
            }
        }

        const shapeNode = new cc.Node("n_shape");
        const configs = this.getTheConfig();
        let configIndex = Utils3.random(0, configs.length);

        if (typeof typeIndex === 'number' && typeIndex >= 0) {
            configIndex = typeIndex;
        }

        if (configIndex === 0) {
            this._blockcount = 0;
        }

        const shapeConfig = configs[configIndex];
        const colorIndex = Utils3.random(1, 5);
        
        this._bg_color = ShapeItem.COLORS[colorIndex];
        this._colorindex = colorIndex;

        let totalX = 0;
        let countX = 0;
        let totalY = 0;
        let countY = 0;

        for (let i = 0; i < shapeConfig.length; i++) {
            const pos = shapeConfig[i];
            const blockNode = this.newOneK(colorIndex);
            
            blockNode.x = pos.x;
            totalX += blockNode.x;
            countX++;
            
            blockNode.y = pos.y;
            totalY += blockNode.y;
            countY++;
            
            shapeNode.addChild(blockNode);
        }

        shapeNode.setScale(0.5);
        shapeNode.x = -totalX / countX * 0.5;
        shapeNode.y = -totalY / countY * 0.5;

        return shapeNode;
    }

    addTouchEvent() {
        const self = this;
        
        this.node['ox'] = this.node.x;
        this.node['oy'] = this.node.y;

        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            this.node.y += 130;
            Utils3.SetSoundEffect(window['BUTTON_CLICK_MUSIC'], false, 0.8);
            this.node.getChildByName("n_shape").setScale(1);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event: cc.Event.EventTouch) {
            const delta = event.touch.getDelta();
            this.node.x += delta.x;
            this.node.y += delta.y;
            
            self.collisionFunc();
            
            if (self.checkIsCanDrop()) {
                self.changeColorDeal();
            } else {
                self.changeColorDeal(true);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
            this.dropDownFunc();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function() {
            this.dropDownFunc();
        }, this);
    }

    checkIsCanDrop(): boolean {
        if (!this._checkFrameList || this._checkFrameList.length === 0 || 
            this._checkFrameList.length !== this.node.children[0].children.length) {
            return false;
        }

        for (let i = 0; i < this._checkFrameList.length; i++) {
            if (this._checkFrameList[i]['isHaveFK']) {
                return false;
            }
        }

        return true;
    }

    changeColorDeal(reset: boolean = false) {
        const mapArray = this.GameLayer.m_maparray;
        
        for (let i = 0; i < mapArray.length; i++) {
            mapArray[i].getComponent("BlockBGItem").setBrightVisible(false);
        }

        if (!reset) {
            for (let i = 0; i < this._checkFrameList.length; i++) {
                this._checkFrameList[i].getComponent("BlockBGItem").setBrightVisible(true, this._bg_color);
            }
        }
    }

    collisionFunc() {
        this._checkFrameList = [];
        this._checkFKlist = [];
        
        const shapeChildren = this.node.children[0].children;
        
        for (let i = 0; i < shapeChildren.length; i++) {
            const childPos = cc.v2(this.node.children[0].x, this.node.children[0].y)
                .add(cc.v2(shapeChildren[i].x, shapeChildren[i].y));
            
            const worldPos = this.node.position.add(childPos);
            const frameNode = this.checkPosFunc(worldPos);
            
            if (frameNode) {
                this._checkFKlist.push(shapeChildren[i]);
                this._checkFrameList.push(frameNode);
            }
        }
    }

    checkPosFunc(position: cc.Vec2): cc.Node {
        const mapArray = this.GameLayer.m_maparray;
        
        for (let i = 0; i < mapArray.length; i++) {
            const node = mapArray[i];
            if (cc.v2(node.x, node.y).sub(position).mag() <= 52) {
                return node;
            }
        }
        
        return null;
    }

    dropDownFunc() {
        if (this.checkIsCanDrop()) {
            for (let i = 0; i < this._checkFKlist.length; i++) {
                this._checkFKlist[i].x = 0;
                this._checkFKlist[i].y = 0;
                this._checkFKlist[i].parent = this._checkFrameList[i];
                this._checkFrameList[i]['isHaveFK'] = true;
                
                this._checkFKlist[i].runAction(cc.sequence(
                    cc.scaleTo(0.1, 1.1, 0.8),
                    cc.scaleTo(0.15, 0.9, 1.1),
                    cc.scaleTo(0.015, 1.1, 0.9),
                    cc.scaleTo(0.2, 1, 1)
                ));
            }

            this.GameLayer.hideGuide();
            this.node.removeAllChildren();
            
            const newShape = this.createItem();
            this.node.addChild(newShape);
            
            Utils3.SetSoundEffect(window['BUTTON_CLICK_MUSIC'], false, 0.8);
            this.GameLayer.addScore(this._checkFKlist.length, true);
            this.GameLayer.checkClearUp();
            this.takeBack();
            this.GameLayer.checkIsLose();
        } else {
            this.takeBack();
        }
    }

    takeBack() {
        this._checkFrameList = [];
        this.changeColorDeal(true);
        this.node.getChildByName("n_shape").setScale(0.5);
        this.node.x = this.node['ox'];
        this.node.y = this.node['oy'];
    }

    checkIsLose(): boolean {
        let validPositions = 0;
        const shapeChildren = this.node.children[0].children;
        
        for (let i = 0; i < this.GameLayer.m_maparray.length; i++) {
            const mapNode = this.GameLayer.m_maparray[i];
            const mapPos = cc.v2(mapNode.x, mapNode.y);
            let validCount = 1;
            
            if (!mapNode['isHaveFK']) {
                for (let j = 1; j < shapeChildren.length; j++) {
                    const childWorldPos = mapPos.add(cc.v2(shapeChildren[j].x, shapeChildren[j].y));
                    
                    for (let k = 0; k < this.GameLayer.m_maparray.length; k++) {
                        const checkNode = this.GameLayer.m_maparray[k];
                        if (cc.v2(checkNode.x, checkNode.y).sub(childWorldPos).mag() <= 52 && 
                            !checkNode['isHaveFK']) {
                            validCount++;
                        }
                    }
                }
                
                if (validCount === shapeChildren.length) {
                    validPositions++;
                }
            }
        }
        
        return validPositions === 0;
    }

    resetBlock(typeIndex?: number) {
        this.node.removeAllChildren();
        this.updateIndex(false);
        
        const newShape = this.createItem(typeIndex);
        this.node.addChild(newShape);
    }

    setNextBlock(nextIndex: number) {
        this._next = nextIndex;
    }
}