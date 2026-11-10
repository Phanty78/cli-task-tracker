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
        status : Status.Todo,
        createAt : date,
        updatesAt : date
    }
    tasks.push(newTask)
    taskId++
}

console.log("Welcome to my task management app")
console.log ("Type add 'table description' to add a new task.")

for await (const line of console) {
    let splitedUserInput = line.split(" ")
    let command = splitedUserInput[0]
    if (command === "add"){
        let descriptionArray = splitedUserInput.slice(1)
        if (descriptionArray[0] !== undefined){
            let description = descriptionArray.join(" ")
            if (description[0] === '"') {
                description = description.slice(1)
            }
            if (description[description.length -1] === '"') {
                description = description.slice(0, -1)
            }
            description = description.trim()
            if (description === "") {
                console.log("description can't be empty.")
            }else{
                if (description === '""') {
                    console.log("description can't be empty.")
                } else {
                    addTask(description)
                    console.log(tasks)
                }
            }
        }else {
            console.log("The add command does not include a description")
        }
    }
}