enum Status {
	Todo = "TODO",
	InProgress = "IN-PROGRESS",
	Done = "DONE",
}
interface Task {
	id: number;
	description: string;
	status: Status;
	createAt: Date;
	updatesAt: Date;
}

let tasks: Task[] = [];
let taskId: number;

// Loading existant data
const tasksFile = Bun.file("tasks.json");
if (await tasksFile.exists()) {
	tasks = await tasksFile.json();
} else {
	await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
}

// determinate next taskId available
if (tasks.length >= 1) {
	taskId = Math.max(...tasks.map((obj) => obj.id)) + 1;
} else {
	taskId = 1;
}

function updateDateAtNow(): Date {
	const timestamp: number = Date.now();
	const date: Date = new Date(timestamp);
	return date;
}

async function addTask(taskDescription: string): Promise<void> {
	const newTask: Task = {
		id: taskId,
		description: taskDescription,
		status: Status.Todo,
		createAt: updateDateAtNow(),
		updatesAt: updateDateAtNow(),
	};
	tasks.push(newTask);
	await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
	taskId++;
}

async function updateTaskStatus(
	taskId: number,
	command: string,
): Promise<void> {
	const task = tasks.find((item) => item.id === taskId);
	if (task) {
		if (command === "mark-in-progress") {
			task.status = Status.InProgress;
			task.updatesAt = updateDateAtNow();
			await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
		}
		if (command === "mark-done") {
			task.status = Status.Done;
			task.updatesAt = updateDateAtNow();
			await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
		}
	} else {
		console.log("This task don't exist.");
	}
}

async function deleteTask(id: number): Promise<void> {
	const task = tasks.find((item) => item.id === id);
	if (task) {
		const index = tasks.findIndex((item) => item.id === id);
		if (index > -1) {
			tasks.splice(index, 1);
			await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
			console.log(`Task ${id} delete successfully.`);
		}
	} else {
		console.log("This task don't exist.");
	}
}

async function updateTask(id: number, taskDescription: string) {
	const task = tasks.find((item) => item.id === id);
	console.log(task);
	if (task) {
		task.description = taskDescription;
		task.updatesAt = updateDateAtNow();
		await Bun.write("tasks.json", JSON.stringify(tasks, null, 2));
	} else {
		console.log("This task don't exist.");
	}
}

function listTasks(): void {
	if (tasks.length < 1) {
		console.log("There aren't any tasks—create one with “add”!");
	} else {
		console.log(tasks);
	}
}

console.log("Welcome to my task management app");
console.log("Type add 'table description' to add a new task.");
console.log(
	"Type mark-in progress or mark-done follow by the id to update task status.",
);
console.log("Type delete follow by the id to delete a task");
console.log("Type list to display all tasks.");

for await (const line of console) {
	const splitedUserInput = line.split(" ");
	const command = splitedUserInput[0];
	let id: number = 0;
	if (command === "add") {
		const descriptionArray = splitedUserInput.slice(1);
		if (descriptionArray[0] !== undefined) {
			let description = descriptionArray.join(" ");
			if (description[0] === '"') {
				description = description.slice(1);
			}
			if (description[description.length - 1] === '"') {
				description = description.slice(0, -1);
			}
			description = description.trim();
			if (description === "") {
				console.log("description can't be empty.");
			} else {
				if (description === '""') {
					console.log("description can't be empty.");
				} else {
					await addTask(description);
				}
			}
		} else {
			console.log("The add command does not include a description");
		}
	}
	if (command === "mark-in-progress" || command === "mark-done") {
		if (splitedUserInput[1]) {
			id = Number(splitedUserInput[1]);
		}
		if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
			if (Number.isNaN(id)) {
				console.log("Id should be a valid number.");
			}
			if (!Number.isInteger(id)) {
				console.log("Id should be an integer.");
			}
			if (id < 1) {
				console.log("Id should be stricly superior or egal to 1.");
			}
		} else {
			await updateTaskStatus(id, command);
		}
	}
	if (command === "delete") {
		if (splitedUserInput[1]) {
			id = Number(splitedUserInput[1]);
		}
		if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
			if (Number.isNaN(id)) {
				console.log("Id should be a valid number.");
			}
			if (!Number.isInteger(id)) {
				console.log("Id should be an integer.");
			}
			if (id < 1) {
				console.log("Id should be stricly superior or egal to 1.");
			}
		} else {
			await deleteTask(id);
		}
	}
	if (command === "list") {
		listTasks();
	}
	if (command === "update") {
		if (splitedUserInput[1]) {
			id = Number(splitedUserInput[1]);
		}
		if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
			if (Number.isNaN(id)) {
				console.log("Id should be a valid number.");
			}
			if (!Number.isInteger(id)) {
				console.log("Id should be an integer.");
			}
			if (id < 1) {
				console.log("Id should be stricly superior or egal to 1.");
			}
		} else {
			const descriptionArray = splitedUserInput.slice(2);
			console.log(descriptionArray);
			if (descriptionArray[0] !== undefined) {
				let description = descriptionArray.join(" ");
				if (description[0] === '"') {
					description = description.slice(1);
				}
				if (description[description.length - 1] === '"') {
					description = description.slice(0, -1);
				}
				description = description.trim();
				if (description === "") {
					console.log("description can't be empty.");
				} else {
					if (description === '""') {
						console.log("description can't be empty.");
					} else {
						await updateTask(id, description);
					}
				}
			} else {
				console.log("The add command does not include a description");
			}
		}
	}
}
