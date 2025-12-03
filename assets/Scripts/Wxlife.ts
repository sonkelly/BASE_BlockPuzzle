const { ccclass, property } = cc._decorator;
import EventListener from "./event_listener";
import { Utils3 } from "./Utils3";
@ccclass
export default class Wxlife extends cc.Component {

    private static _instance: Wxlife = null;
    private isHidden: boolean = false;
    private hideTime: number = 0;

    public static get instance(): Wxlife {
        return this._instance;
    }

    onLoad() {
        if (Wxlife._instance === null) {
            Wxlife._instance = this;
        } else {
            this.destroy();
            return;
        }

        cc.view.enableRetina(true);
        
        // 初始化全局变量
        window['firstGame'] = true;
        window['firststart'] = false;
        window['getdata'] = false;
        window['need_add'] = false;
        window['firstshare'] = false;
        window['SHOW_RES'] = null;

        // 初始化事件监听器

        this.initWxEvents();
    }

    private initWxEvents(): void {
        if (typeof wx !== 'undefined') {
            // 微信隐藏事件
            wx.onHide(() => {
                this.isHidden = true;
                
                if (window['getdata']) {
                    Utils3.setSaveData();
                }
                
                this.hideTime = new Date().getTime();
            });

            // 微信显示事件
            wx.onShow((res: any) => {
                if (this.isHidden) {
                    Utils3.resumBgmMusic();
                    
                    const currentTime = new Date().getTime();
                    EventListener.instance.fire(window['ON_SHOW_BACK'], currentTime - this.hideTime);
                }

                if (res.query && res.query.group) {
                    window['SHOW_RES'] = res;
                    EventListener.instance.fire(window['GAME_RANK_LISTENER']);
                }
            });
        }
    }

    onDestroy() {
        if (Wxlife._instance === this) {
            Wxlife._instance = null;
        }
    }
}