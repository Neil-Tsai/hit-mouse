
import Common from "./Common";
import { Level } from "./model/LevelModel";
import StorageUtil from "./storage/StorageUtil";

declare var require: any
const cfg = require('Global')

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.JsonAsset)
    jsonData: cc.JsonAsset = null;

    @property(cc.Node)
    selectItems: cc.Node[] = [];

    levels: Level[];

    onLoad () {
        this.levels = this.jsonData.json
        this.checkLevel();
    }

    start () {

    }

    checkLevel() {
        for(var i= 0 ; i < this.selectItems.length; i++) {
            var item = StorageUtil.prototype.getLevelState(i)
            if(i == 0 || (item != undefined && item)) {
                Common.prototype.loadPrefab('prefab/'+ (i+1) ,this.selectItems[i])
            } else {
                Common.prototype.loadPrefab('prefab/lock',this.selectItems[i])
            }
        }
    }

    // update (dt) {},

    playGame(event, customEventData) {
        var data = this.levels[customEventData]
        cfg.config = data
        /** 判斷按鈕是否lock */
        var item = StorageUtil.prototype.getLevelState(customEventData)
        if(customEventData == 0 || (item != undefined && item)) {
            cc.director.loadScene('playGame', (success) => {

            })
        }
    }
}
