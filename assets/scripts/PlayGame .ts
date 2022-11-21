import { Level, RoleType, RootObject } from "./model/LevelModel";
import MyEvent from "./model/MyEvent";
import Common from "./Common";
import StorageUtil from "./storage/StorageUtil";

declare var require: any
const cfg = require('Global')

const {ccclass, property} = cc._decorator;

enum GameState {
    ready,
    go,
    pass,
    fail,
    pasue,
    hurry,
    default
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    message: cc.Node = null;

    @property([cc.Node])
    hole: cc.Node[] = [];

    @property()
    score: number = 0;

    @property([cc.Node])
    life: cc.Node[] = [];

    @property(cc.Node)
    pauseView: cc.Node;

    @property(cc.Node)
    pauseBgView: cc.Node;

    @property(cc.ProgressBar)
    scoreProgress: cc.ProgressBar;

    config: Level;
    /**遊戲時間120秒 */
    gameTime:number = 120;

    @property(cc.JsonAsset)
    jsonData: cc.JsonAsset = null;
    // roleObj: RootObject;

    onLoad () {
        if( cfg.config != null) {
            this.config = cfg.config;
        }

        cfg.roleObj = this.jsonData.json
        this.scoreProgress.progress = 0

        /**監聽分數 */
        this.node.on('score', (event: MyEvent) => {
     
            if (event.score as number) {
                this.score += event.score
                this.scoreProgress.progress = this.score/this.config.passScore
                if(this.score >= this.config.passScore) {
                    this.overGame(GameState.pass)
                }
            } 
            if (event.die as number) {
                this.life[this.life.length-1].active = false
                this.life.pop()
                if (this.life.length <= 0) {
                    this.overGame(GameState.fail)
                }
            }
            event.stopPropagation();
        }, this)
    }

    start () {
        this.readyGo()
    }

    readyGo() {
        /**到數3秒 */
        var time = 3;
        var timeCallback = function(){
            time -= 1; 
            switch(time) {
                case 2:
                    this.setMessage(GameState.ready)
                    break;
                case 1:
                    this.setMessage(GameState.go)
                    break;
                case　0: {
                    this.setMessage(GameState.default)
                    this.unschedule(timeCallback);
                    this.countDownGameTime();
                }

            }
        };
        this.schedule(timeCallback, 1.0);
    }

    setMessage(state: GameState) {
        this.message.removeAllChildren();
        switch(state) {
            case GameState.go:
                Common.prototype.loadPrefab('prefab/go', this.message);
                break;
            case GameState.ready:
                Common.prototype.loadPrefab('prefab/ready', this.message);
                break;
            case GameState.pasue:
                break;
            case GameState.hurry:
                Common.prototype.loadPrefab('prefab/hurry', this.message);
                break;
            case GameState.fail:
                Common.prototype.loadPrefab('prefab/fail', this.message);
                break;
            case GameState.pass:
                Common.prototype.loadPrefab('prefab/clear', this.message);
                break;
            case GameState.default:
                // this.loadPrefab('', this.message);
                break
        }
    }

    playGame() {
        for(var i = 0; i < this.hole.length; i++) {
            this.hole[i].getComponent('Hole').appear();
        }
    }

    pauseGame() {
        cc.director.pause();
        this.isShowPauseView(true)
    }

    retryGame() {
        cc.director.resume()
        cc.director.loadScene('playGame')
        this.isShowPauseView(false)
    }

    continueGame() {
        cc.director.resume()
        this.isShowPauseView(false)
    }

    goBackMenu() {
        cc.director.resume()
        cc.director.loadScene('chooseLevel')
        this.isShowPauseView(false)
    }

    isShowPauseView(isShow: boolean) {
        this.pauseBgView.active = isShow
        this.pauseView.active = isShow
    }

    overGame(state: GameState) {
        console.log("game over")
        //儲存過關
        if (state == GameState.pass) {
            // cc.sys.localStorage.setItem('Level' + this.config.level, true);
            StorageUtil.prototype.saveLevelState(this.config.level, true)
        }
        this.setMessage(state)
        for(var i = 0; i < this.hole.length; i++) {
            this.hole[i].getComponent('Hole').disappear();
        }
        // 2秒後返回選擇畫面
        this.schedule(function() {
            cc.director.loadScene('chooseLevel');
        }, 2); 
    }

    countDownGameTime() {
        var timeCallback = function(){
            this.gameTime -= 1; 
            if(this.gameTime <= 0){
                this.overGame(GameState.fail)
                this.unschedule(this.timeCallback);
            }
        };
        this.schedule(timeCallback, 1.0); 
        this.playGame();
    }

   
}
