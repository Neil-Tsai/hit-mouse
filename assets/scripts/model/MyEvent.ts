const {ccclass, property} = cc._decorator;
 
@ccclass
export default class MyEvent extends cc.Event {

    constructor(name: string, bubbles?: boolean, score?: number, die?: number) {
        super(name, bubbles);
        this.score = score;
        this.die = die;
    }
    public score: number = null;
    public die: number = null;
}
