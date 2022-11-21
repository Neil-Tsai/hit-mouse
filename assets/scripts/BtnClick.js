
cc.Class({
    extends: cc.Component,

    properties: {

    },

    changeScence:function(event, customEventData) {
        cc.director.loadScene(customEventData);
    },

    backScence:function(event, customEventData) {
        cc.director.loadScene(customEventData);
    },

    onStart(){},
});
