var idleconfig = [
    { image: "idle_png" }
];
var PlayerIdleState = (function () {
    function PlayerIdleState(player) {
        this.animeInterval = 200;
        this.player = player;
        this.idleTimer = new egret.Timer(this.animeInterval, 0);
        this.idleAnime = new egret.Bitmap();
    }
    var d = __define,c=PlayerIdleState,p=c.prototype;
    p.onEnter = function () {
        this.idleAnimeIndex = 0;
        this.idleAnime.texture = RES.getRes(idleconfig[0].image);
        this.player.playerStage.addChild(this.idleAnime);
        this.idleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerComFunc, this);
        this.idleTimer.start();
        console.log("Enter Idle State");
    };
    p.onExit = function () {
        this.player.playerStage.removeChild(this.idleAnime);
        this.idleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerComFunc, this);
        this.idleTimer.stop();
        console.log("Exit Idle State");
    };
    p.timerComFunc = function () {
        if (this.idleAnimeIndex < (idleconfig.length - 1)) {
            this.idleAnimeIndex++;
            this.idleAnime.texture = RES.getRes(idleconfig[this.idleAnimeIndex].image);
        }
        else {
            this.idleAnimeIndex = 0;
        }
    };
    return PlayerIdleState;
}());
egret.registerClass(PlayerIdleState,'PlayerIdleState',["State"]);
var moveconfig = [
    { image: "walk01_png" },
    { image: "walk02_png" },
    { image: "walk03_png" }
];
var PlayerMoveState = (function () {
    function PlayerMoveState(player) {
        this.animeInterval = 200;
        this.speed = 1;
        this.player = player;
        this.moveTimer = new egret.Timer(this.animeInterval, 0);
        this.moveAnime = new egret.Bitmap();
    }
    var d = __define,c=PlayerMoveState,p=c.prototype;
    p.onEnter = function () {
        this.moveAnimeIndex = 0;
        this.moveAnime.texture = RES.getRes(moveconfig[0].image);
        this.player.playerStage.addChild(this.moveAnime);
        this.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.timerComFunc, this);
        this.moveTimer.start();
        console.log("Enter Move State");
    };
    p.onExit = function () {
        this.player.playerStage.removeChild(this.moveAnime);
        this.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerComFunc, this);
        this.moveTimer.stop();
        console.log("Exit Move State");
    };
    p.timerComFunc = function () {
        if (this.moveAnimeIndex < (moveconfig.length - 1)) {
            this.moveAnimeIndex++;
            this.moveAnime.texture = RES.getRes(moveconfig[this.moveAnimeIndex].image);
        }
        else {
            this.moveAnimeIndex = 0;
        }
    };
    p.startMove = function (touchX, touchY) {
        this.pathIndex = 0;
        var startx = Math.floor(this.player.playerStage.x / this.player.tileSize);
        var starty = Math.floor(this.player.playerStage.y / this.player.tileSize);
        var endx = Math.floor(touchX / this.player.tileSize);
        var endy = Math.floor(touchY / this.player.tileSize);
        egret.Tween.removeTweens(this.player.playerStage);
        this.player.grid.setStartNode(startx, starty);
        this.player.grid.setEndNode(endx, endy);
        this.astar = new AStar();
        this.astar._path = [];
        this.astar.findPath(this.player.grid);
        if (startx != endx || starty != endy) {
            if (this.astar._path.length != 0) {
                this.player.playerStateMachine.changeState(this.player.playerMovestate);
                this.move();
            }
        }
    };
    p.move = function () {
        var anime01 = egret.Tween.get(this.player.playerStage); //开始移动
        var anime02 = egret.Tween.get(this.player.playerStage);
        var distance = Math.sqrt(Math.pow(((this.astar._path[this.pathIndex].x -
            this.astar._path[this.pathIndex + 1].x)) *
            this.player.tileSize, 2) + Math.pow(((this.astar._path[this.pathIndex].y -
            this.astar._path[this.pathIndex + 1].y)) *
            this.player.tileSize, 2));
        var time = distance / this.speed * 2;
        anime01.to({ "x": this.astar._path[this.pathIndex + 1].x * this.player.tileSize }, time);
        anime02.to({ "y": this.astar._path[this.pathIndex + 1].y * this.player.tileSize }, time);
        anime01.call(this.changeTarget, this);
    };
    p.changeTarget = function () {
        if (this.pathIndex < (this.astar._path.length - 2)) {
            this.pathIndex++;
            console.log("Target change");
            this.move();
        }
        else {
            this.pathIndex = 0;
            console.log("Move end");
            this.player.stateSign = stateconfig.idleState;
            this.player.checkstate();
        }
    };
    return PlayerMoveState;
}());
egret.registerClass(PlayerMoveState,'PlayerMoveState',["State"]);
//# sourceMappingURL=PlayerState.js.map