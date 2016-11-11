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

    private player:Player;
    private idleAnime:egret.Bitmap;
    private idleTimer:egret.Timer;
    private animeInterval:number = 200;
    private idleAnimeIndex:number;


    constructor(player:Player) {
        this.player = player;
        this.idleTimer = new egret.Timer(this.animeInterval,0);
        this.idleAnime = new egret.Bitmap();
        
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
                this.startUpAnime();
                break;
            
            case directionconfig.downState:
                this.startDownAnime();
                break;

            case directionconfig.leftState:
                this.startLeftAnime();
                break;

            case directionconfig.rightState:
                this.startRightAnime();
                break;

        }

    }

    private stopIdleAnime() {
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.stopUpAnime();
                break;

            case directionconfig.downState:
                this.stopDownAnime();
                break;
            
            case directionconfig.leftState:
                this.stopLeftAnime();
                break;

            case directionconfig.rightState:
                this.stopRightAnime();
                break;

        }

    }

    private timerFunc() {
        switch(this.player.playerdirection){
            case directionconfig.upState: 
                this.startUpAnime();
                break;

            case directionconfig.downState:
                this.startDownAnime();
                break;

            case directionconfig.leftState:
                this.startLeftAnime();
                break;

            case directionconfig.rightState:
                this.startRightAnime();
                break;
        }        
    
    }

//动画部分
    //向上
    private startUpAnime() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idleupconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.start();

    }

    private stopUpAnime() {
        this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.stop();

    }

    private upTimerFunc() {
        if(this.idleAnimeIndex < (idleupconfig.length -1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idleupconfig[this.idleAnimeIndex].image);
            console.log("up timer: "+ this.idleAnimeIndex);
        }else {
            this.idleAnimeIndex = 0;
                    
        } 

    }


    //向下
    private startDownAnime() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idledownconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.start();

    }

    private stopDownAnime() {
        this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.stop();

    }

    private downTimerFunc() {
        if(this.idleAnimeIndex < (idledownconfig.length -1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idledownconfig[this.idleAnimeIndex].image);
            console.log("down timer: "+ this.idleAnimeIndex);
        }else {
            this.idleAnimeIndex = 0;
                    
        } 

    }

    //向左
    private startLeftAnime() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idleleftconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.start();

    }

    private stopLeftAnime() {
        this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.stop();

    }

    private leftTimerFunc() {
        if(this.idleAnimeIndex < (idleleftconfig.length -1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idleleftconfig[this.idleAnimeIndex].image);
            console.log("left timer: "+ this.idleAnimeIndex);
        }else {
            this.idleAnimeIndex = 0;
                    
        } 

    }

    //向右
    private startRightAnime() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idlerightconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.start();

    }

    private stopRightAnime() {
        this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.stop();

    }

    private rightTimerFunc() {
        if(this.idleAnimeIndex < (idlerightconfig.length -1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idlerightconfig[this.idleAnimeIndex].image);
            console.log("right timer: "+ this.idleAnimeIndex);
        }else {
            this.idleAnimeIndex = 0;
                    
        } 

    }    

//动画部分结束


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

    private moveAnime:egret.Bitmap;
    private moveTimer:egret.Timer;
    private animeInterval:number = 200;
    private moveAnimeIndex:number;

    private astar:AStar;
    private player:Player;
    private pathIndex:number;
    private speed:number = 1;
    
    constructor(player:Player) {
        this.player = player;
        this.moveTimer = new egret.Timer(this.animeInterval,0);
        this.moveAnime = new egret.Bitmap();

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
    

//动画部分
    //向上
    private startUpAnime() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(moveupconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.start();

    }

    private stopUpAnime() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.stop();

    }

    private upTimerFunc() {
        if(this.moveAnimeIndex < (moveupconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moveupconfig[this.moveAnimeIndex].image);
            console.log("up timer: "+ this.moveAnimeIndex);
        }else {
            this.moveAnimeIndex = 0;
                    
        } 

    }


    //向下
    private startDownAnime() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(movedownconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.start();

    }

    private stopDownAnime() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.stop();

    }

    private downTimerFunc() {
        if(this.moveAnimeIndex < (movedownconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(movedownconfig[this.moveAnimeIndex].image);
            console.log("down timer: "+ this.moveAnimeIndex);
        }else {
            this.moveAnimeIndex = 0;
                    
        } 

    }

    //向左
    private startLeftAnime() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(moveleftconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.start();

    }

    private stopLeftAnime() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.stop();

    }

    private leftTimerFunc() {
        if(this.moveAnimeIndex < (moveleftconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moveleftconfig[this.moveAnimeIndex].image);
            console.log("left timer: "+ this.moveAnimeIndex);
        }else {
            this.moveAnimeIndex = 0;
                    
        } 

    }

    //向右
    private startRightAnime() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(moverightconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.start();

    }

    private stopRightAnime() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.stop();

    }

    private rightTimerFunc() {
        if(this.moveAnimeIndex < (moverightconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moverightconfig[this.moveAnimeIndex].image);
            console.log("right timer: "+ this.moveAnimeIndex);
        }else {
            this.moveAnimeIndex = 0;
                    
        } 

    }    

//动画部分结束


    private startMoveAnime() {
        switch(this.player.playerdirection) {
            case directionconfig.upState:
                this.startUpAnime();
                console.log("start Up");
                break;

            case directionconfig.downState:
                this.startDownAnime();
                console.log("start down");
                break;
            
            case directionconfig.leftState:
                this.startLeftAnime();
                console.log("start Left");
                break;
            
            case directionconfig.rightState:
                this.startRightAnime();
                console.log("start Right");
                break;
            
        }

    }

    private stopMoveAnime() {
        switch(this.player.playerdirection) {
            case directionconfig.upState:
                this.stopUpAnime();
                break;

            case directionconfig.downState:
                this.stopDownAnime();
                break;
            
            case directionconfig.leftState:
                this.stopLeftAnime();
                break;
            
            case directionconfig.rightState:
                this.stopRightAnime();
                break;

        }

    }



    timerFunc() { 
        switch(this.player.playerdirection){
            case directionconfig.upState:
                this.upTimerFunc();
                break;

            case directionconfig.downState:
                this.downTimerFunc();
                break;

            case directionconfig.leftState:
                this.leftTimerFunc();
                break;

            case directionconfig.rightState:
                this.rightTimerFunc();
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
                for(var i=0; i< this.astar._path.length; i++) {
                    console.log("[" + i + "]" + " x: " + this.astar._path[i].x + " y: " + this.astar._path[i].y);
                }
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