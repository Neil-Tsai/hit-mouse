import CustomPageView from "../view/CustomPageView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Explanation extends cc.Component {

    @property(CustomPageView)
    pageView: CustomPageView = null;

    @property(cc.Button)
    nextBtn: cc.Button = null;

    @property(cc.Button)
    previous: cc.Button = null;


    // onLoad () {}

    // start () {}

    pervious() {
        this.pageView.pervious()
    }

    next() {
        this.pageView.next()
    }

    // update (dt) {}
}
