var idleconfig = [
    { image: "idle_png" }
];
var walkconfig = [
    { image: "walk01_png" },
    { image: "walk02_png" },
    { image: "walk03_png" }
];
var stateconfig = {
    idleState: 0,
    moveState: 1
};
var Player = (function () {
    function Player(grid, tileSize) {
        //人物相关
        this.self = this;
        this.grid = grid;
        this.tileSize = tileSize;
        this.playerStage = new egret.DisplayObjectContainer();
        this.playerIdleState = new PlayerIdleState(this);
        this.playerMovestate = new PlayerMoveState(this);
        this.playerStateMachine = new StateMachine(this.playerIdleState);
        this.stateSign = stateconfig.idleState;
    }
    var d = __define,c=Player,p=c.prototype;
    p.onTouch = function (e) {
        this.touchX = e.stageX;
        this.touchY = e.stageY;
        this.stateSign = stateconfig.moveState;
        this.checkstate();
    };
    p.checkstate = function () {
        switch (this.stateSign) {
            case 0:
                this.playerStateMachine.changeState(this.playerIdleState);
                break;
            case 1:
                this.playerMovestate.startMove(this.touchX, this.touchY);
                break;
        }
    };
    return Player;
}());
egret.registerClass(Player,'Player');
var StateMachine = (function () {
    function StateMachine(currentState) {
        this.currentState = currentState;
        this.currentState.onEnter();
        console.log("State Init");
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.changeState = function (nextState) {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        console.log("State change");
    };
    p.getState = function () {
        return this.currentState;
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
//# sourceMappingURL=Player.js.map