// This is the array that will hold the todo list items
let todoItems = [];
//
//
//
//
function renderTodo(todo) {
  // Select the first element with a class of `js-todo-list`
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  //if deleted remove the todo-item
  if (todo.deleted) {
    item.remove();
    // add this line to clear whitespace from the list container
  // when `todoItems` is empty
  if (todoItems.length === 0) list.innerHTML = '';
    return
  }

  // Use the ternary operator to check if `todo.checked` is true
  // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
  const isChecked = todo.checked ? "done" : "";

  // Create an `li` element and assign it to `node`
  const node = document.createElement("li");

  // Set the class attribute
  node.setAttribute("class", `todo-item  shadow rounded-4 d-flex-row align-items-center my-2 ${isChecked}`);

  // Set the data-key attribute to the id of the todo
  node.setAttribute("data-key", todo.id);

  // Set the contents of the `li` element created above
  node.innerHTML = `
      
  <input class="form-check-input fs-1 rounded-5 mx-2 mb-2 fw-1    js-tick" id="${todo.id}"   type="checkbox"/>             
  <label for="${todo.id}" class="js-tick"></label>
  <span class="text-start  overflow-hidden mx-0">${todo.text}</span>
  <i class=" trash-icon bi bi-trash fs-1 mx-3  delete-todo js-delete-todo" href="#delete-icon"></i>
    `;

  // 
  // Append the element to the DOM as the last child of
  // the element referenced by the `list` variable
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}
//
//
//
//
//
// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  //console.log(todo);
  renderTodo(todo);
}
//
//
//
//
//
//
function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
//
//
//
//
//
//
//
//


function deleteTodo(key) {
   // find the corresponding todo object in the todoItems array
  const index = todoItems.findIndex(item => item.id === Number(key));

  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...todoItems[index]
  };

    // remove the todo item from the array by filtering it out
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}
//
//
//
//
//
//
//
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
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});
//
//
//
//
//
//
//
// Add a click event listener to the list and its children
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});

