const { ccclass, property } = cc._decorator;
import RankList from "./RankList";
import { ShareSdk } from "./ShareSdk";
import { Utils3 } from "./Utils3";

@ccclass
export default class GameResult extends cc.Component {
    @property(cc.Node)
    m_n_fail: cc.Node = null;

    @property(cc.Node)
    m_sp_titlef: cc.Node = null;

    @property(cc.Node)
    m_btn_again: cc.Node = null;

    @property(cc.Node)
    m_btn_share: cc.Node = null;

    private _score: number = 0;
    private _monster_num: number = 0;

    start(): void {}

    showVictory(): void {}

    showFail(t: any, e: number, n: number): void {
        this._score = e;
        this._monster_num = n;
        this.node.active = true;
        this.m_n_fail.active = true;
        this.m_n_fail.y = -cc.winSize.height / 2;
        
        this.m_n_fail.runAction(cc.sequence(
            cc.moveTo(0.5, 0, 0).easing(cc.easeIn(3)),
            cc.callFunc(() => {})
        ));

        this.m_sp_titlef.stopAllActions();
        this.m_sp_titlef.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(0.5, 0, 10),
                cc.moveBy(0.5, 0, -10)
            )
        ));

        this.m_btn_again.active = true;

        RankList.showGameResultList();        
    }

    onBackToMenu(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.HALL_SCENE_NAME);
    }

    onAgainPlay(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.GAME_SCENE_NAME);
    }

    onResultShare(): void {
        if (ShareSdk) {
            // ShareSdk.shareAppMessage({
            //     title: "Come and help it!",
            //     imageUrl: window.tempFileURL[2],
            //     success: () => {},
            //     fail: () => {},
            //     complate: () => {}
            // });
        }
    }
}