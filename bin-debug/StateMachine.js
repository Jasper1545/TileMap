/*interface State {

    player: any;
    onIn();
    onExit();
    onRun(passtime:number);
    onCheck():State;
    statename:string;

}


class StateMachine {

    curState: State;
    context: any;
    time = 0;

    public constructor(lastState: State) {

        this.curState = lastState;
        this.curState.onIn();
    }

    public runMachine(timeStamp:number):boolean {

        var nowtime = timeStamp;
        let time = this.time;
        let passtime = nowtime - time;
        this.time = nowtime;
        this.curState.onRun(passtime);
        var newState:State = this.curState.onCheck();

        if(newState != this.curState) {

            this.curState.onExit();
            this.curState = newState;
            this.curState.onIn();
        }

        return false;
    }

    public switchState(nextState:State) {

        this.curState.onExit();
        nextState.onIn;
        this.curState = nextState;
    }

}*/ 
//# sourceMappingURL=StateMachine.js.map