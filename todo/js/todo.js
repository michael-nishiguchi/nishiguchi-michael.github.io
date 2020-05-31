export default class Todo {
	constructor(task, completed, timestamp) {
		this.task = task;
		this.completed = completed;
		this.timestamp = timestamp;
	}
}

export function printTask(todo) {
	console.log('Task is ' + todo.task);
}

export function printCompleted(todo) {
	console.log('Task is ${todo.completed}');
}

export function addToList(todoList) {
	console.log('here');
	let toAdd = document.getElementById('toAdd').value;
	let completed = false;
	let timestamp = Date.now();

	var newTask = new Todo(toAdd, completed, timestamp);

	todoList.push(newTask);
	console.log('todo list' + todoList);
	/*
	console.log(JSON.stringify(newTask));
    window.localStorage.setItem('todo', JSON.stringify(newTask));
    */
}
