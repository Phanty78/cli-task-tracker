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

function updateTaskStatus(taskId: number, command: string): void{
    const taskExist = tasks.some(item => item.id === taskId)
    console.log(taskExist)
    if (taskExist){
        //TODO -  Le bug est ici : l'ID ne correspond pas à l'index, La méthode solide est d'attribuer la variable task Directement en fonction de l'ID et non pas en fonction de l'index.
        let task = tasks[taskId]
        if (command === "mark-in-progress"){
            if (task !== null && task !== undefined) {
               task.status = Status.InProgress 
            }    
        }else{
            if (task !== null && task !== undefined) {
               task.status = Status.Done
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
    let id: number = Number(splitedUserInput[1])
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
            console.log(tasks)
    }
}