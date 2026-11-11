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

async function addTask(taskDescription : string): Promise<void>{
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
    await Bun.write("tasks..json", JSON.stringify(tasks, null, 2));
    taskId++
}

async function updateTaskStatus(taskId: number, command: string): Promise<void>{
    let task = tasks.find(item => item.id === taskId)
    if (task){
        if (command === "mark-in-progress"){
            if (task !== null && task !== undefined) {
               task.status = Status.InProgress 
               await Bun.write("output.json", JSON.stringify(tasks, null, 2));
            }    
        }
        if (command === "mark-done"){
            if (task !== null && task !== undefined) {
               task.status = Status.Done
               await Bun.write("output.json", JSON.stringify(tasks, null, 2));
            }
        }
    }else{
        console.log("This Id don't exist.")
    }
}

console.log("Welcome to my task management app")
console.log ("Type add 'table description' to add a new task.")
console.log("Type mark-in progress or mark-done follow by the id.")

for await (const line of console) {
    let splitedUserInput = line.split(" ")
    let command = splitedUserInput[0]
    let id: number = 1
    if (splitedUserInput[2]){
        console.log(splitedUserInput[2])
        id = Number(splitedUserInput[2])
    }
    if (Number.isNaN(id)){
        console.log("Id should be a valid number.")
    }else{
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
                }
            }
        }else {
            console.log("The add command does not include a description")
        }
    }
    if (command === "mark-in-progress" || command === "mark-done"){
            updateTaskStatus(id,command)
    }
    }
}