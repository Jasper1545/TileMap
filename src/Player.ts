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

var directionconfig = {
    downState:0,
    upState:1,
    leftState:2,
    rightState:3

}


class Player {

    //人物相关
    playerStage:egret.DisplayObjectContainer;
    playerIdleState:PlayerIdleState;
    playerMovestate:PlayerMoveState;
    playerStateMachine:StateMachine;
    stateSign:number;

    touchX:number;
    touchY:number;

    grid:Grid;
    tileSize:number;

    playerdirection:number;

    public constructor(grid:Grid,tileSize:number) {
        this.grid = grid;
        this.tileSize = tileSize;

        this.playerStage = new egret.DisplayObjectContainer();
        
        this.playerdirection = directionconfig.downState;
        this.playerIdleState = new PlayerIdleState(this);
        this.playerMovestate = new PlayerMoveState(this);
        this.stateSign = stateconfig.idleState; 
        this.playerStateMachine = new StateMachine(this.playerIdleState);

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



