var idleconfig = [
    {image:"idle_png"}
];

class PlayerIdleState implements State {

    player:Player;
    idleAnime:egret.Bitmap;
    idleTimer:egret.Timer;
    animeInterval:number = 200;
    idleAnimeIndex:number;


    constructor(player:Player) {
        this.player = player;
        this.idleTimer = new egret.Timer(this.animeInterval,0);
        this.idleAnime = new egret.Bitmap();
        
    }

    onEnter() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idleconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
        this.idleTimer.start();

        console.log("Enter Idle State");

    }

    onExit() {
        this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
        this.idleTimer.stop();

        console.log("Exit Idle State");

    }

    timerComFunc() { 
        if(this.idleAnimeIndex < (idleconfig.length -1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idleconfig[this.idleAnimeIndex].image);
        }else {
            this.idleAnimeIndex = 0;
    
        }        
    
    }


}




var moveconfig = [
    {image:"walk01_png"},
    {image:"walk02_png"},
    {image:"walk03_png"}
];

class PlayerMoveState implements State {

    moveAnime:egret.Bitmap;
    moveTimer:egret.Timer;
    animeInterval:number = 200;
    moveAnimeIndex:number;

    astar:AStar;
    player:Player;
    pathIndex:number;
    speed:number = 1;
    
    constructor(player:Player) {
        this.player = player;
        this.moveTimer = new egret.Timer(this.animeInterval,0);
        this.moveAnime = new egret.Bitmap();
    }

    public onEnter() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(moveconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
        this.moveTimer.start();

        console.log("Enter Move State");

    }

    public onExit() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerComFunc,this);
        this.moveTimer.stop();

        console.log("Exit Move State");

    }

    timerComFunc() { 
        if(this.moveAnimeIndex < (moveconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moveconfig[this.moveAnimeIndex].image);
        }else {
            this.moveAnimeIndex = 0;
    
        }        
    
    }

    public startMove(touchX:number, touchY:number) {
        this.pathIndex = 0;

        var startx = Math.floor(this.player.playerStage.x/this.player.tileSize);
        var starty = Math.floor(this.player.playerStage.y/this.player.tileSize);

        var endx = Math.floor(touchX/this.player.tileSize);
        var endy = Math.floor(touchY/this.player.tileSize);

        egret.Tween.removeTweens(this.player.playerStage);

        this.player.grid.setStartNode(startx,starty);
        this.player.grid.setEndNode(endx,endy);

        this.astar = new AStar();
        this.astar._path = [];
        this.astar.findPath(this.player.grid);

        if(startx != endx || starty != endy) {
            if(this.astar._path.length != 0) {
                this.player.playerStateMachine.changeState(this.player.playerMovestate);
                this.move();
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
            this.move();

        }else {
            this.pathIndex = 0;
            console.log("Move end");
            this.player.stateSign = stateconfig.idleState;
            this.player.checkstate();

        }

    }

    

}