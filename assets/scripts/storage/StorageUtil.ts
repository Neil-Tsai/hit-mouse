const {ccclass, property} = cc._decorator;

@ccclass
export default class StorageUtil extends cc.Component {

    // onLoad () {}

    // start () {}

    // update (dt) {}

    saveLevelState(num: number, isPass: boolean) {
        cc.sys.localStorage.setItem(`Level${num}`, isPass);
    }

    getLevelState(num: number) {
        var item = cc.sys.localStorage.getItem(`Level${num}`);
        return item
    }
}
