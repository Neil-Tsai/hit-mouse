const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomPageView extends cc.PageView {

    start () {
        //**也可以直接呼叫pageView 使用 */
        this.horizontal = false;
        this.vertical = false;
    }

    pervious() {
        var index = this.getCurrentPageIndex();
        if(index - 1 >= 0 ) {
            this.horizontal = true
            this.scrollToPage(index-1, 0);
            this.horizontal = false
        }
    }

    next() {
        var index = this.getCurrentPageIndex();
        var count =  this.content.childrenCount;
        if( index  <= count-1 ) {
            this.horizontal = true
            this.scrollToPage(index+1, 0);
            this.horizontal = false
        }
    }

    // update (dt) {}
}
