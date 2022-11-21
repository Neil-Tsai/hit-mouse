
const {ccclass, property} = cc._decorator;

@ccclass
export default class Common extends cc.Component {

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}

    public loadPrefab(url: string, tagNode: cc.Node) {
        tagNode.removeAllChildren()
        
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            if( err ) {
                cc.log(' Prefab error:' + err);
                return;
            }
            if( !( prefab instanceof cc.Prefab) ){
                cc.log('Prefab error');
                return;
            }
            const newNode = cc.instantiate(prefab);
            newNode.position = cc.v3(0, 0);
            tagNode.addChild(newNode);
        });
    }
}
