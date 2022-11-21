import { MyModule } from "./model/LevelModel";
import MyEvent from "./model/MyEvent";
import Common from "./Common";

declare var require: any
const cfg = require('Global')
const {ccclass, property} = cc._decorator;

enum Role {
    gopher = "gopher",
    workerGropher = "workerGropher",
    racerGopher = "racerGopher",
    doctorGopher = "doctorGopher",
    ninjaGopher = "ninjaGopher",
    smallNinjaGopher = "smallNinjaGopher",
    CrossDressedRabbitGopher = "CrossDressedRabbitGopher",
    armoredGopher = "armoredGopher",
    wood = "wood",
    stone = "stone",
    bomb = "bomb",
    coffeeRabbit = "coffeeRabbit",
    pinkRabbit = "pinkRabbit",
    corn = "corn",
    empty = "empty",
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    hand: cc.Node = null

    @property(cc.Node)
    body: cc.Node = null

    @property(cc.Node)
    touch: cc.Node = null

    isRole: boolean
    showAnimation: cc.Tween

    speed = 1;

    @property(MyModule)
    public showRole: MyModule = null;

    onLoad () {
        this.hand.on('showAnimation', this.appear , this)

        this.body.on(cc.Node.EventType.TOUCH_START, function(event){
            if(this.showRole != null) {
                switch(this.showRole.type) {
                    /**加分 */
                    case 1:
                        this.showRole.hp = this.showRole.hp - 1
                        this.showTouchAnimation()
                        if(this.showRole.hp <= 0 ) {
                            this.showAnimation.stop()
                            this.node.dispatchEvent( new MyEvent('score', true, this.showRole.score))
                            if (this.showRole.name == Role.doctorGopher) {
                                this.showCorn(2)
                            } else {
                                this.showCorn(1)
                            }
                            // this.showRole = null
                       
                        }
                        break;
                    /**扣命 */    
                    case 2:
                        this.node.dispatchEvent( new MyEvent('score', true, null, 1))
                        this.showRole = null
                        break;
                }
            }
        }, this)
    }

    showTouchAnimation() {
        let parent = this.body.parent.parent;
        this.touch.position = parent.position;
        this.touch.active = true;
        cc.tween(this.touch)
            .to(0, {opacity:150})
            .to(0.1, {opacity:75})
            // .to(0.1, {opacity:50})
            .to(0.1, {opacity:0})
            .call( () => {
                this.touch.active = false
            })
            .start()
    }

    showCorn(type: number) {
        this.body.y = -40;
        this.hand.y = -120;
        if(type == 1)
            this.getRolu(Role.corn)
        else
            this.getRolu(Role.bomb)    

        // cc.tween(this.body).to(0.1,{ position: cc.v3(0, -40)}).start()
        this.scheduleOnce(function(){
            this.hand.y = -120;
            this.body.y = -140;
            this.hand.emit('showAnimation', true);
        },0.6)
        //移動後面做
    }

    getPrefab(handUrl: string, bodyUrl: string) {
        this.hand.removeAllChildren()
        this.body.removeAllChildren()
        if(handUrl != "") {
            Common.prototype.loadPrefab(handUrl, this.hand)
        }
        if(bodyUrl != "") {
            Common.prototype.loadPrefab(bodyUrl, this.body)
        }
    }

    /**依機率產生角色 */
    probability() {
        var select = this.random(1,100)
        var probability = 0;
        for(var i = 0 ; i < cfg.config.roleConfig.length; i++) {
            probability += cfg.config.roleConfig[i].probability
            if(select <= probability) {
                this.getRolu(cfg.config.roleConfig[i].name)
                return
            }
        }
    }

    getRolu(role: String) {

        this.isRole = true;
        switch(role) {
            case Role.gopher:
                this.showRole = new MyModule(
                    cfg.roleObj.gopher.type,
                    cfg.roleObj.gopher.hp,
                    cfg.roleObj.gopher.score,
                    Role.gopher
                );
                this.getPrefab('prefab/土撥鼠手手', 'prefab/土撥鼠身體')
                break;
            case Role.workerGropher:
                this.showRole = new MyModule(
                    cfg.roleObj.workerGropher.type,
                    cfg.roleObj.workerGropher.hp,
                    cfg.roleObj.workerGropher.score,
                    Role.workerGropher
                );
                this.getPrefab('prefab/土撥鼠工程帽手手', 'prefab/土撥鼠工程帽身體')
                break;
            case Role.racerGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.racerGopher.type,
                    cfg.roleObj.racerGopher.hp,
                    cfg.roleObj.racerGopher.score,
                    Role.racerGopher
                );
                this.getPrefab('prefab/土撥鼠安全帽手手', 'prefab/土撥鼠安全帽身體')
                break;
            case Role.doctorGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.doctorGopher.type,
                    cfg.roleObj.doctorGopher.hp,
                    cfg.roleObj.doctorGopher.score,
                    Role.doctorGopher
                );
                 this.getPrefab('prefab/土撥鼠博士手手', 'prefab/土撥鼠博士身體')
                break;  
            case Role.ninjaGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.ninjaGopher.type,
                    cfg.roleObj.ninjaGopher.hp,
                    cfg.roleObj.ninjaGopher.score,
                    Role.ninjaGopher
                );
                this.getPrefab('prefab/土撥鼠忍者手手', 'prefab/土撥鼠忍者身體')
                break;
            case Role.smallNinjaGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.smallNinjaGopher.type,
                    cfg.roleObj.smallNinjaGopher.hp,
                    cfg.roleObj.smallNinjaGopher.score,
                    Role.smallNinjaGopher
                );
                this.getPrefab('prefab/土撥鼠小忍者手手', 'prefab/土撥鼠小忍者身體')
                break;    
            case Role.CrossDressedRabbitGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.CrossDressedRabbitGopher.type,
                    cfg.roleObj.CrossDressedRabbitGopher.hp,
                    cfg.roleObj.CrossDressedRabbitGopher.score,
                    Role.CrossDressedRabbitGopher
                );
                this.getPrefab('prefab/土撥鼠兔兔手手', 'prefab/土撥鼠兔兔身體')
                break;
            case Role.armoredGopher:
                this.showRole = new MyModule(
                    cfg.roleObj.armoredGopher.type,
                    cfg.roleObj.armoredGopher.hp,
                    cfg.roleObj.armoredGopher.score,
                    Role.armoredGopher
                );
                this.getPrefab('prefab/土撥鼠盔甲手手', 'prefab/土撥鼠盔甲身體')
                break;
            case Role.wood:
                this.showRole = new MyModule(
                    cfg.roleObj.wood.type,
                    cfg.roleObj.wood.hp,
                    cfg.roleObj.wood.score,
                    Role.wood
                );
                this.getPrefab('', 'prefab/石頭')
                break;
            case Role.stone:
                this.showRole = new MyModule(
                    cfg.roleObj.Stone.type,
                    cfg.roleObj.Stone.hp,
                    cfg.roleObj.Stone.score,
                    Role.stone
                );
                this.getPrefab('', 'prefab/石頭')
                break;   
            case Role.bomb:
                this.showRole = new MyModule(
                    cfg.roleObj.bomb.type,
                    cfg.roleObj.bomb.hp,
                    cfg.roleObj.bomb.score,
                    Role.bomb
                );
                this.getPrefab('', 'prefab/石頭')
                break;   
            case Role.coffeeRabbit:
                this.showRole = new MyModule(
                    cfg.roleObj.coffeeRabbit.type,
                    cfg.roleObj.coffeeRabbit.hp,
                    cfg.roleObj.coffeeRabbit.score,
                    Role.coffeeRabbit
                );
                this.getPrefab('prefab/咖啡兔兔手手', 'prefab/咖啡兔兔身體')
                break;   
            case Role.pinkRabbit:
                this.showRole = new MyModule(
                    cfg.roleObj.pinkRabbit.type,
                    cfg.roleObj.pinkRabbit.hp,
                    cfg.roleObj.pinkRabbit.score,
                    Role.pinkRabbit
                );
                this.getPrefab('prefab/粉紅兔兔手手', 'prefab/粉紅兔兔身體')
                break;   
            case Role.corn:
                // this.showRole = new MyModule(
                //     cfg.roleObj.other.type,
                //     cfg.roleObj.other.hp,
                //     cfg.roleObj.other.score,
                // );
                this.getPrefab('', 'prefab/玉米')
                break;
            case Role.empty:
                this.showRole = null
                this.isRole = false
                this.getPrefab('', '')
                break;   
        }
    }

    /** 
    * 生成范围随机数 
    * @min 最小值 
    * @max 最大值 
    */  
    random(min: number, max: number): Number {
        var Range = max - min
        var Rand = Math.random()
        return (min + Math.round(Rand * Range))
    }
    // update (dt) { }
    	
    appear(){
        this.probability()
        //**空的不做移動，才不會影響點擊事件 */
        if(this.isRole) {
           
            this.showAnimation = cc.tween(this.hand)
            .to(0.1, { position: cc.v3(0, -60)})
            .call( () => {
                cc.tween(this.body).to(0.3,{ position: cc.v3(0, -20)}, {easing: 'quartIn'} ).start()
            })
            .delay(2) //中間停留時間
            .call( () => {
                cc.tween(this.body).to(0.3,{ position: cc.v3(0, -140)}, {easing: 'quartOut'}).start()
            })
            .to(0.3, { position: cc.v3(0, -120)})
            .delay(0.1)
            // .call( () => {
            //     cc.tween(this.body).to(0.1,{ position: cc.v3(0, -20)}).start()
            // })
            .call( () => {
                this.hand.emit('showAnimation', true);
            })
            .start()
        } else {
            this.scheduleOnce(function(){
                this.hand.emit('showAnimation', true);
            },1.5)
        }
    }

    show() {
        let showHand = cc.moveTo(0.1, cc.v2(0, -60))
        var speed = cc.speed(showHand, this.speed)
        this.hand.runAction(speed);

        let showbody = cc.moveTo(0.3, cc.v2(0, -20))
        var speed = cc.speed(showbody, this.speed)
        this.body.runAction(speed)
    }

    hide() {
        let showbody = cc.moveTo(0.3, cc.v2(0, -140))
        var speed = cc.speed(showbody, this.speed)
        this.body.runAction(speed)

        let showHand = cc.moveTo(0.6, cc.v2(0, -120))
        var speed = cc.speed(showHand, this.speed)
        this.hand.runAction(speed)
    }
 
    disappear(){
        if( this.showAnimation != null) {
            this.showAnimation.removeSelf;
        }
     
        this.hand.off('showAnimation', this.appear , this);
        this.hand.removeAllChildren()
        this.body.removeAllChildren()
  
        this.hand.y = -120;
        this.body.y = -140;
    }
}
