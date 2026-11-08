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

