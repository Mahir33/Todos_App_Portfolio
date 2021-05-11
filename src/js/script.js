// Global variables
let $todoInput; // content that user type in input
let $alertInfo; // info about 'no text' / 'add text'
let $addBtn; // add button - adds a new elements to list
let $ulList; // tasks list, tags <ul></ul>
let $newTask; // new added li
let $popup; // downloaded popup
let $popupInfo; // alert inside popup, when there is no text
let $editedTodo; // edited Todo
let $popupInput;  // text typed inside input
let $addPopupBtn; // confirm button in popup
let $cancelTodoBtn; // button to close popup
let $idNumber = 0;
let $allTasks;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}


// download Elements
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $cancelTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
}


// add events
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick)
    $cancelTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck)
}

// add new element to the list
const addNewTask = () => {
    if($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $ulList.appendChild($newTask);

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Describe your task';
    }
}

// check (KeyboardEvent) if user did use enter for validiation
const enterCheck = () => {
    if(event.key === 'Enter'){
        addNewTask();
    } 
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');

    $newTask.appendChild(toolsPanel);
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    editBtn.innerHTML = 'EDIT';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}

// 
const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('complete')
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }

}

// Task edition
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
}

// Check if popup is not empty and change the task
const changeTodo = () => {
    if($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
        $popupInput.innerText= '';
    } else {
        $popupInfo.innerText = 'Type something first';
    }
}

// close popup
const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

// delete task
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if($allTasks.length === 0) {
        $alertInfo.innerText = 'No tasks at the moment...';
    }
}

document.addEventListener('DOMContentLoaded', main);