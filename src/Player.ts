var idleconfig = [
    {image:"idle_png"}
];

var walkconfig = [
    {image:"walk01_png"},
    {image:"walk02_png"},
    {image:"walk03_png"}
];


var stateconfig = {
    idleState:0,
    moveState:1

}


class Player {

    //人物相关
    self = this;
    playerStage:egret.DisplayObjectContainer;
    playerIdleState:PlayerIdleState;
    playerMovestate:PlayerMoveState;
    playerStateMachine:StateMachine;
    stateSign:number;

    touchX:number;
    touchY:number;

    grid:Grid;
    tileSize:number;

    public constructor(grid:Grid,tileSize:number) {
        this.grid = grid;
        this.tileSize = tileSize;
        this.playerStage = new egret.DisplayObjectContainer();
        this.playerIdleState = new PlayerIdleState(this);
        this.playerMovestate = new PlayerMoveState(this);
        this.playerStateMachine = new StateMachine(this.playerIdleState);
        this.stateSign = stateconfig.idleState;

    }



    public onTouch(e: egret.TouchEvent):void {
        this.touchX = e.stageX;
        this.touchY = e.stageY;
        this.stateSign = stateconfig.moveState;
        this.checkstate();

    }


    public checkstate() {
        switch(this.stateSign) {
            case 0:
                this.playerStateMachine.changeState(this.playerIdleState);
                break;

            case 1:
                this.playerMovestate.checkMove(this.touchX,this.touchY);
                break;

        }
    }



}


class StateMachine {

    private currentState:State;

    public constructor(currentState:State) {
        this.currentState = currentState;
        this.currentState.onEnter();
        console.log("State Init");
    }
    
    public changeState(nextState:State):void {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        console.log("State change");

    }

    public getState():State {
        return this.currentState;

    }

}
