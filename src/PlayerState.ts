var idleupconfig = [
    {image:"player01_idle_up_png"}
];

var idledownconfig = [
    {image:"player01_idle_down_png"}
];

var idleleftconfig = [
    {image:"player01_idle_left_png"}
];

var idlerightconfig = [
    {image:"player01_idle_right_png"}
];

class PlayerIdleState implements State {

    public player:Player;
    public idleAnime:egret.Bitmap;
    public idleTimer:egret.Timer;
    public animeInterval:number = 200;
    public idleAnimeIndex:number;

    public idleNullState:PlayerNullstate;
    public idleUpState:IdleUpState;
    public idleDownState:IdleDownState;
    public idleLeftState:IdleLeftState;
    public idleRightState:IdleRightState;
    public idleStateMachine:StateMachine;


    constructor(player:Player) {
        this.player = player;
        this.idleTimer = new egret.Timer(this.animeInterval,0);
        this.idleAnime = new egret.Bitmap();
        
        this.idleNullState = new PlayerNullstate();
        this.idleUpState = new IdleUpState(this);
        this.idleDownState = new IdleDownState(this);
        this.idleLeftState = new IdleDownState(this);
        this.idleRightState = new IdleRightState(this);
        this.idleStateMachine = new StateMachine(this.idleDownState);

    }

    public onEnter() {   
        this.startIdleAnime();
        console.log("Enter Idle State");

    }

    public onExit() {
        this.stopIdleAnime();
        console.log("Exit Idle State");

    }


    private startIdleAnime() {
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.idleStateMachine.changeState(this.idleUpState);
                break;
            
            case directionconfig.downState:
                this.idleStateMachine.changeState(this.idleDownState);
                break;

            case directionconfig.leftState:
                this.idleStateMachine.changeState(this.idleLeftState);
                break;

            case directionconfig.rightState:
                this.idleStateMachine.changeState(this.idleRightState);
                break;

        }

    }

    private stopIdleAnime() {
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.idleStateMachine.changeState(this.idleNullState);
                break;

            case directionconfig.downState:
                this.idleStateMachine.changeState(this.idleNullState);
                break;
            
            case directionconfig.leftState:
                this.idleStateMachine.changeState(this.idleNullState);
                break;

            case directionconfig.rightState:
                this.idleStateMachine.changeState(this.idleNullState);
                break;

        }

    }

    private timerFunc() {
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.idleStateMachine.changeState(this.idleUpState);
                break;

            case directionconfig.downState:
                this.idleStateMachine.changeState(this.idleDownState);
                break;

            case directionconfig.leftState:
                this.idleStateMachine.changeState(this.idleLeftState);
                break;

            case directionconfig.rightState:
                this.idleStateMachine.changeState(this.idleRightState);
                break;
        }        
    
    }



}


var moveupconfig = [
    {image:"player01_walk_up_01_png"},
    {image:"player01_walk_up_02_png"},
    {image:"player01_walk_up_03_png"}
];

var movedownconfig = [
    {image:"player01_walk_down_01_png"},
    {image:"player01_walk_down_02_png"},
    {image:"player01_walk_down_03_png"}
];

var moveleftconfig = [
    {image:"player01_walk_left_01_png"},
    {image:"player01_walk_left_02_png"},
    {image:"player01_walk_left_03_png"}
];

var moverightconfig = [
    {image:"player01_walk_right_01_png"},
    {image:"player01_walk_right_02_png"},
    {image:"player01_walk_right_03_png"}
];


class PlayerMoveState implements State {

    public moveAnime:egret.Bitmap;
    public moveTimer:egret.Timer;
    public animeInterval:number = 200;
    public moveAnimeIndex:number;

    public moveNullState:PlayerNullstate;
    public moveUpState:MoveUpState;
    public moveDownState:MoveDownState;
    public moveLeftState:MoveLeftState;
    public moveRightState:MoveRightState;
    public moveStateMachine:StateMachine;

    public astar:AStar;
    public player:Player;
    public pathIndex:number;
    public speed:number = 1;
    
    constructor(player:Player) {
        this.player = player;
        this.moveTimer = new egret.Timer(this.animeInterval,0);
        this.moveAnime = new egret.Bitmap();

        this.moveNullState = new PlayerNullstate();
        this.moveUpState = new MoveUpState(this);
        this.moveDownState = new MoveDownState(this);
        this.moveLeftState = new MoveLeftState(this);
        this.moveRightState = new MoveRightState(this);
        this.moveStateMachine = new StateMachine(this.moveNullState);

    }

    public onEnter() {
        this.startMoveAnime();   
        this.move();
        console.log("Enter Move State");

    }

    public onExit() {
        this.stopMoveAnime();
        egret.Tween.removeTweens(this.player.playerStage);//停止移动
        console.log("Exit Move State");

    }
    
    private startMoveAnime() {
        switch(this.player.playerdirection) {
            case directionconfig.upState:
                this.moveStateMachine.changeState(this.moveUpState);
                console.log("start Up");
                break;

            case directionconfig.downState:
                this.moveStateMachine.changeState(this.moveDownState);
                console.log("start down");
                break;
            
            case directionconfig.leftState:
                this.moveStateMachine.changeState(this.moveLeftState);
                console.log("start Left");
                break;
            
            case directionconfig.rightState:
                this.moveStateMachine.changeState(this.moveRightState);
                console.log("start Right");
                break;
            
        }

    }

    private stopMoveAnime() {
        switch(this.player.playerdirection) {
            case directionconfig.upState:
                this.moveStateMachine.changeState(this.moveNullState);
                break;

            case directionconfig.downState:
                this.moveStateMachine.changeState(this.moveNullState);
                break;
            
            case directionconfig.leftState:
                this.moveStateMachine.changeState(this.moveNullState);
                break;
            
            case directionconfig.rightState:
                this.moveStateMachine.changeState(this.moveNullState);
                break;

        }

    }

    private timerFunc() { 
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.moveUpState.timerFunc();
                break;

            case directionconfig.downState:
                this.moveDownState.timerFunc();
                break;

            case directionconfig.leftState:
                this.moveLeftState.timerFunc();
                break;

            case directionconfig.rightState:
                this.moveRightState.timerFunc();
                break;
        }       
    
    }

    public checkMove(touchX:number, touchY:number) {
        this.pathIndex = 0;

        var startx = Math.floor(this.player.playerStage.x/this.player.tileSize);
        var starty = Math.floor(this.player.playerStage.y/this.player.tileSize);

        var endx = Math.floor(touchX/this.player.tileSize);
        var endy = Math.floor(touchY/this.player.tileSize);

        //egret.Tween.removeTweens(this.player.playerStage);

        this.player.grid.setStartNode(startx,starty);
        this.player.grid.setEndNode(endx,endy);

        this.astar = new AStar();
        this.astar._path = [];
        this.astar.findPath(this.player.grid);

        if(startx != endx || starty != endy) { //满足条件 进入move状态
            if(this.astar._path.length != 0) {
                this.player.playerStateMachine.changeState(this.player.playerMovestate);
                
            }
        }
    
    }

    private move() {
        var anime01 = egret.Tween.get(this.player.playerStage);     //开始移动
        var anime02 = egret.Tween.get(this.player.playerStage);

        var distance  = Math.sqrt(Math.pow(((this.astar._path[this.pathIndex].x - 
                                             this.astar._path[this.pathIndex + 1].x)) * 
                                             this.player.tileSize,2)+Math.pow(((this.astar._path[this.pathIndex].y - 
                                             this.astar._path[this.pathIndex + 1].y)) * 
                                             this.player.tileSize,2));

        var time = distance/this.speed*2;
        
        
        anime01.to({"x": this.astar._path[this.pathIndex + 1].x * this.player.tileSize}, time);
        anime02.to({"y": this.astar._path[this.pathIndex + 1].y * this.player.tileSize}, time);

        anime01.call(this.changeTarget,this);
    }

    private changeTarget() {
        if(this.pathIndex < (this.astar._path.length - 2)) {
            this.pathIndex++;
            console.log("Target change");
            this.changeDirection();
            this.move();

        }else {
            this.pathIndex = 0;
            console.log("Move end");
            this.player.stateSign = stateconfig.idleState; //移动结束 切换状态
            this.player.checkstate();

        }

    }

    private changeDirection() {
        var nextdirection:number;

        if(this.astar._path[this.pathIndex].y < this.astar._path[this.pathIndex + 1].y){
            nextdirection = directionconfig.downState;
            console.log("Down");
        }else if(this.astar._path[this.pathIndex].y > this.astar._path[this.pathIndex + 1].y) {
            nextdirection = directionconfig.upState;
            console.log("up");
        }else if(this.astar._path[this.pathIndex].x < this.astar._path[this.pathIndex + 1].x) {
            nextdirection = directionconfig.rightState;
            console.log("right");
        }else if(this.astar._path[this.pathIndex].x > this.astar._path[this.pathIndex + 1].x) {
            nextdirection = directionconfig.leftState;
            console.log("left");
        }

        if(this.player.playerdirection != nextdirection){
            this.stopMoveAnime();
            this.player.playerdirection = nextdirection;
            this.startMoveAnime();
        }

    }

    

}


class PlayerNullstate implements State {

    onEnter(){
        console.log("Enter Null State");

    }

    onExit(){
        console.log("Exit Null State");

    }

}