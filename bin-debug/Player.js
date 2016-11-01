/*var PLAYER_SPEED = 0.2;

class Player extends egret.DisplayObjectContainer {

    stateMachine: StateMachine;
    behavior: egret.Bitmap;
    curAnimation : Animation;
    isLeftFacing = true;
    animationList;
    playerSM;
    speed :number;

    public createBitmapByName(name:string):egret.Bitmap {

        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public constructor() {

        super();
        this.speed = PLAYER_SPEED;
        this.behavior = this.createBitmapByName("player01_idle_left_pgn");

        this.animationList = {

            //"idle_front":["player01_idle_front.pgn"],
            "idle_left":["player01_idle_left_pgn"],
            "idle_right":["player01_idle_right_pgn"],
            //"idle_back":["player01_idle_back.pgn"],
            //"walk_front":["player01_walk_front_01.pgn","player01_walk_front_02.pgn","player01_walk_front_03.pgn"],
            "walk_left":["player01_walk_left_01_pgn","player01_walk_left_02_pgn","player01_walk_left_03_pgn"],
            "walk_right":["player01_walk_right_01_pgn","player01_walk_right_02_pgn","player01_walk_right_03_pgn"],
            //"walk_back":["player01_walk_back_01.pgn","player01_walk_back_02.pgn","player01_walk_back_03.pgn"]

        };

        this.playerSM = new StateMachine(new IdleState(this));
        
    }

    public Move(targetPos: Vector2D) {

        this.playerSM.switch(new WalkState(this,targetPos));
    }

}


class IdleState implements State {

    player:Player;
    playerfps = 24;
    statename = "Idle";

    public constructor(player:Player) {

        this.player = player;
    }

    public onIn() {

        this.player.curAnimation = new Animation(this.player.animationList[this.player.isLeftFacing ? "idle_left" : "idle_right"],this.player.behavior,this.playerfps);
    }

    public onRun(passtime:number) {

        this.player.curAnimation.playCur(passtime);
    }

    public onCheck():State {

        return this;
    }

    public onExit() {

        console.log("IdleState Exit");
    }

}

class WalkState implements State {

    player:Player;
    playerfps = 3;
    targetPos: Vector2D;
    statename = "walk";

    public constructor(player:Player, targetPos: Vector2D) {

        this.player = player;
        this.targetPos = targetPos;
        this.player.isLeftFacing = ((targetPos.x - this.player.x) > 0 ? false :true);
    }

    public onIn() {

        this.player.curAnimation = new Animation(this.player.animationList[this.player.isLeftFacing ? "walk_left" : "walk_right"],this.player.behavior,this.playerfps);
        var tw = egret.Tween.get(this.player);

        tw.to({
            x: this.targetPos.x,
            y: this.targetPos.y
        },Math.sqrt(
            Math.pow((this.targetPos.x - this.player.x),2) +
            Math.pow((this.targetPos.y - this.player.y),2)
        ) / this.player.speed);

    }

    public onRun(passtime:number) {

        this.player.curAnimation.playCur(passtime);
    }

    public onCheck():State {

        if(Math.abs(this.player.x - this.targetPos.x) < 1) {

            return new IdleState(this.player);
        } else {

            return this;
        }
    }

    public onExit() {

        egret.Tween.removeTweens(this.player);
    }


}*/ 
//# sourceMappingURL=Player.js.map