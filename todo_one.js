console.clear();

const createList = document.querySelector(".create-list");
createList.style.display = "none";
const taskEditor = document.querySelector(".main-section");

// toggle between wiews
const toggleArrow = document.querySelector(".js-left-arrow");
toggleArrow.addEventListener("click", () => {
  taskEditor.style.display = "none";
  createList.style.display = "block";
});

let todoTasks = [];
//this function checks the todoTasks array,
//if it is empty, shows the welcome message.
const emptyState = document.querySelector(".empty-state");
const checkEmptyState = () => {
  //console.log(emptyState,todoTasks)
  if (todoTasks.length > 0) {
    emptyState.style.display = "none";
  } else {
    emptyState.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const localStoragetodoTasks = localStorage.getItem("todos");
  if (localStoragetodoTasks) {
    todoTasks = JSON.parse(localStoragetodoTasks);
    sortTasks(todoTasks);
    todoTasks.forEach((t) => {
      displayTask(t);
      console.log(t, "content is beig loaded");
    });
  } else {
    todoTasks = [];
  }
});

//const localStoragetodoTasks = JSON.parse(localStorage.getItem("todos"));
const localStorageTitle = JSON.parse(localStorage.getItem("titleStored"));

// This is the array that will hold the todo list items
//let todoTasks = localStoragetodoTasks ? localStoragetodoTasks : [];
// displayTask(todoTasks);

//localStorageTitle;
document.querySelector("#list-title").innerHTML = localStorageTitle;
console.log(localStorageTitle, " is the title");
//
//
//
//____----–*******************------_______
//____-----Edit the list title------_______
//____-----*******************------_______
//
//address the edit icon
const editTitleIcon = document.querySelector("#edit-list-title");
// a variable to store the title element
const title = document.querySelector("#list-title"); //the <h1> elmnt

//create a new  div
const formContainer = document.createElement("div");
formContainer.setAttribute("class", "container-fluid w-100 ");
// inside of the div add a form tag
const titleForm = document.createElement("form");
// inside of the form add a input tag
const titleInput = document.createElement("input");
//and set the attributes
titleInput.setAttribute("type", "text");
titleInput.setAttribute("class", "form-control rounded-4 title-input");
titleInput.setAttribute("id", "new-list-title");
titleInput.setAttribute("value", localStorageTitle? localStorageTitle : "");
titleInput.setAttribute("placeholder", "Enter new title");
titleInput.setAttribute("required", "");

titleForm.append(titleInput);
formContainer.append(titleForm);
formContainer.style.display = "none";
title.parentNode.insertBefore(formContainer, title.nextSibling);

if (localStorageTitle === null) {
  title.style.display = "none";
  formContainer.style.display = "block";
}

//add an event Listener wich toggles between the title or the form
editTitleIcon.addEventListener("click", () => {
  title.style.display = "none";
  formContainer.style.display = "block";
});

titleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTitle = document.querySelector("#new-list-title").value;
  localStorage.setItem("titleStored", JSON.stringify(newTitle));
  if (newTitle) {
    title.textContent = newTitle;
    form.reset();
  }
  title.style.display = "block";
  formContainer.style.display = "none";
});
//
//
//
//____----–*******************------_______
//____-----Display the tasks  ------_______
//____-----*******************------_______
//
//
function displayTask(todo) {
  // Select the first element with a class of `js-todo-list`
  const list = document.querySelector(".js-todo-list"); // the <ul> element
  const item = document.querySelector(`[data-key='${todo.id}']`); // select every task by their id

  //if deleted remove the todo-item
  if (todo.deleted) {
    item.remove();
    // added this line to clear whitespace from the list container
    // when `todoTasks` is empty
    if (todoTasks.length === 0) list.innerHTML = "";
    return;
  }

  // Create an `li` element and assign it to `taskItem`
  const taskItem = document.createElement("li");

  //  check if `todo.checked` is true
  // if so, assign the  class '.done'  Otherwise, assign an empty string
  const isChecked = todo.checked ? "done" : "";

  // Set the class attribute for the li
  taskItem.setAttribute(
    "class",
    `todo-item  shadow rounded-4 d-flex-row  align-items-center my-2 ${isChecked}`
  );

  // Set the data-key attribute to be the id of the todo
  taskItem.setAttribute("data-key", todo.id);

  // Set the html contents of the `li` element created above
  taskItem.innerHTML = `
  <input class="form-check-input fs-1 rounded-5 mx-2 mb-2 fw-1   js-tick" id="${todo.id}"   type="checkbox"/>             
  <span class="text-start  overflow-hidden mx-0 task-text">${todo.text}</span>
  <i class="bi bi-pencil fs-6 text-left edit-task"></i>
  <i class=" trash-icon bi bi-trash fs-1 mx-3  delete-todo js-delete-todo" href="#"></i>
    `;
  //
  // Append the element to the DOM as the last child of
  // the element referenced by the `list` variable
  if (item) {
    list.insertBefore(taskItem, item);
  } else {
    list.append(taskItem);
  }
  //setting the value of text to an external variable

  //
  //if some Tasks are added, unshow the welcome message
  checkEmptyState();
  //
}
//
//
//
//
//____----–*************************------_______
//____-----Listen for new task Input------_______
//____-----*************************------_______
//
// Select the form element with the class .js-form
const form = document.querySelector(".js-form");
// Add a submit event listener
form.addEventListener("submit", (event) => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector(".js-todo-input");
  // Get the value of the input and remove whitespace
  // only if the input is not '' empty
  // cal to the .trim method --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  //const text = ;
  if (input.value !== "") {
    addTask(input.value.trim());
    input.value = "";
    input.focus();
  } else {
    alert("empty name is not allowed");
  }
});
//
//
// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoTasks` array
function addTask(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoTasks.push(todo);
  sortTasks(todoTasks);
  displayTask(todo);
  localStorage.setItem("todos", JSON.stringify(todoTasks));
  location = location; //this will reload the page

}
//
//
//
//____----–****************************--------_______
//____-----Toggle between Done / undone--------_______
//____-----****************************--------_______
//
function toggleDone(key) {
  const index = todoTasks.findIndex((item) => item.id === Number(key));
  todoTasks[index].checked = !todoTasks[index].checked;
  console.log(
    todoTasks[index].text,
    todoTasks[index].checked ? "is done" : "still working on it"
  );
  sortTasks(todoTasks);
  localStorage.setItem("todos", JSON.stringify(todoTasks));
  // displayTask(todoTasks[index]);
  location = location; //this will reload the page
}
//
//
//
//
//
// a sorting algorithm between done and undone
// tasks wich are done, goes to the boottom, undone tasks goes to the top
//
function sortTasks(arr) {
  const uncheckedTasks = [];
  const checkedTasks = [];

  for (const task of arr) {
    if (task.checked === false) {
      uncheckedTasks.push(task);
    } else {
      checkedTasks.push(task);
    }
  }
  arr = [...uncheckedTasks, ...checkedTasks];
  todoTasks = arr;
}
//
//
//____----–**************--------_______
//____-----Edit Task Name--------_______
//____-----**************--------_______


function editTaskName(key) {
  const index = todoTasks.findIndex((item) => item.id === Number(key));

  const taskNameElement = document.querySelector(`[data-key="${key}"] .task-text`);
  const taskNameInput = document.createElement("input");
  const taskNameForm = document.createElement("form");

  taskNameInput.setAttribute('type', 'text');
  taskNameInput.setAttribute('value', taskNameElement.innerText);
  taskNameInput.setAttribute('class', "task-name-editor");
  taskNameForm.append(taskNameInput)
  taskNameElement.replaceWith(taskNameForm);
  

  taskNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTaskName = taskNameInput.value;

    if (newTaskName.trim() !== '') {
      taskNameElement.innerText = newTaskName;
      taskNameForm.replaceWith(taskNameElement);
      todoTasks[index].text = newTaskName;
    }
          // Update the task name in localStorage
    localStorage.setItem('todos', JSON.stringify(todoTasks));
  });
}


//
//
//
//
//____----–************--------_______
//____-----Delete  Task--------_______
//____-----************--------_______
//
//
function deleteTodo(key) {
  // find the corresponding todo object in the todoTasks array
  const index = todoTasks.findIndex((item) => item.id === Number(key));

  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...todoTasks[index],
  };
  //check if the task is really done

  if (todoTasks[index].checked === false) {
    alert(
      `          Are you sure? \n complete the task "${todoTasks[index].text}" first.`
    );
    return;
  } else {
    // remove the todo item from the array by filtering it out
    todoTasks = todoTasks.filter((item) => item.id !== Number(key));

    // remove the item from the local storage
    localStorage.setItem("todos", JSON.stringify(todoTasks));
    displayTask(todo);
    checkEmptyState();
  }
}
//
//
//
//
//
//____----–****************************--------_______
//____-----Task Button Event Listener  --------_______
//____-----****************************--------_______
//
//
// Add a click event listener to the list and its children
const listen = document.querySelector(".js-todo-list");

listen.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("edit-task")) {
    const itemKey = event.target.parentElement.dataset.key;
    editTaskName(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

