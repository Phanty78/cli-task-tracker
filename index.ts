enum Status {
    Todo = "TODO",
    InProgress = "IN-PROGRESS",
    Done = "DONE"
}
interface Task {
    id : number,
    description : string,
    status : Status,
    createAt : Date,
    updatesAt : Date
}

let tasks: Task[] = []
let taskId: number = 1


function addTask(taskDescription : string): void{
    const timestamp: number = Date.now()
    const date: Date = new Date(timestamp)
    let newTask: Task = {
        id : taskId,
        description : taskDescription,
        status : Status.InProgress,
        createAt : date,
        updatesAt : date
    }
    tasks.push(newTask)
    taskId++
}