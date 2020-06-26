import Todo, { printTask, printCompleted, addToList } from './todo.js';

let timestamp = Date.now();
const todo = new Todo('my task', false, timestamp);
var todoList = [];

//document.getElementById('add').addEventListener('onclick', addToList(todoList));
document.getElementById('add').onclick = function() {
	let toAdd = document.getElementById('toAdd').value;
	let completed = false;
	let timestamp = Date.now();

	var newTask = new Todo(toAdd, completed, timestamp);

	todoList.push(newTask);
	console.log(todoList);
	window.localStorage.setItem('todoList', JSON.stringify(todoList));

	// refresh page
	document.getElementById('tasks').innerHTML = '';
	var i;
	for (i = 0; i < todoList.length; i++) {
		document.getElementById('tasks').innerHTML +=
			'<li><span class="check">X</span><span class="item">' +
			todoList[i].task +
			'</span><span class="X">X</span></li>';
	}
};

document.getElementById('getTodos').onclick = function getTodos() {
	if (todoList.length == 0) {
		var data = JSON.parse(localStorage.getItem('todoList' || '[]'));
		var i;
		for (i = 0; i < data.length; i++) {
			todoList.push(data[i]);
		}
		console.log(todoList);
	}
};

document.getElementById('render').onclick = function renderTodo() {
	document.getElementById('tasks').innerHTML = '';
	var i;
	for (i = 0; i < todoList.length; i++) {
		document.getElementById('tasks').innerHTML +=
			'<li><span class="check">X</span><span class="item" id="' +
			i +
			'">' +
			todoList[i].task +
			'</span><span class="X">X</span></li>';
	}
};
