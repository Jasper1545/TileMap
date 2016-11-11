var idleconfig = [
    {image:"idle_png"}
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
        this.stopAnime();
        console.log("Exit Idle State");

    }

    private startIdleAnime() {
        this.idleAnimeIndex = 0;   
        this.idleAnime.texture = RES.getRes(idleconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);

        this.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.start();

    }

    private stopAnime() {
         this.player.playerStage.removeChild(this.idleAnime);

        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleTimer.stop();

    }

    private timerFunc() { 
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
        console.log("Exit Move State");

    }

    private startMoveAnime() {
        this.moveAnimeIndex = 0;   
        this.moveAnime.texture = RES.getRes(moveconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);

        this.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.start();

    }

    private stopMoveAnime() {
        this.player.playerStage.removeChild(this.moveAnime);

        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveTimer.stop();

    }

    timerFunc() { 
        if(this.moveAnimeIndex < (moveconfig.length -1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moveconfig[this.moveAnimeIndex].image);
        }else {
            this.moveAnimeIndex = 0;
    
        }        
    
    }

    public checkMove(touchX:number, touchY:number) {
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
            this.move();

        }else {
            this.pathIndex = 0;
            console.log("Move end");
            this.player.stateSign = stateconfig.idleState;
            this.player.checkstate();

        }

    }

    

}