/*
class Task{

    private id:string;
    private name:string;
    private  state:TaskState;
    private desc:string;


    public constructor(id:string,name:string,desc:string){
        this.id = id;
        this.name = name;
        this.desc =desc;
    }


    public get Id():string{

        return this.id;
    }

    public get State():TaskState{

        return this.state;
    }


    public finishTask(){
        
    }

}

class TaskState{

}

var taskState = {

    TASK_UNQUIRE:0,
    TASK_VALUABLE:1,
    TASK_DURING:2,
    TASK_FINISH:3,
    TASK_END:4,

}

var taskErrrorCode = {
 
    TASK_ERROR_NULL:0,
    TASK_ERROR_UNFIND:1

}


class TaskService{

    private taskList:Task[]=[];

    public returnTaskByRule(rule:Function): Task{
        var clone = Object.({},this.taskList);
        return rule(this.taskList);
    }

    public addTask(id:string){

        switch(id){

            case "001":
                var task = new Task("001","Task 1","FIRST Task");
                this.taskList.push(task);
                break;

            

        }

    }

    public removeTask(id:string){

    }

}
*/
//# sourceMappingURL=Task.js.map