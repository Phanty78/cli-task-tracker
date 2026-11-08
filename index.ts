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
    let description = descriptionArray.join(" ")
    if (description !== null && description !== undefined) {
        if (typeof description !== "string") {
        console.log("description must be a string.")
    } else {
        description = description.replaceAll('"', '')
        description = description.replaceAll("'", "")
        addTask(description)
    }
    }else {
        console.log("The add command does not include a description")
    }
  }
}