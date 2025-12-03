const { ccclass, property } = cc._decorator;
import { MultiEventListener } from './eventListener';
@ccclass
export class ClientEvent extends MultiEventListener {
    private _EVENT_TYPE: string[] = [];

    onLoad() {
        this._EVENT_TYPE = [
            "testEvent", 
            "blockPut", 
            "curCickKuaiM", 
            "setGray", 
            "reviveEvent", 
            "useProp"
        ];
        this.setSupportEventList(this._EVENT_TYPE);
    }
}
const clientEvent = new ClientEvent();
export default clientEvent;