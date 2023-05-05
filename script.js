const todos = [];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
      const newTodo = {
        id: Date.now(),
        text,
        done: false,
        link: '', // add an empty string link property to the todo object
      };
      if (todoList.children.length < 3) { // add new links for the first three items
        if (todoList.children.length === 0) {
          newTodo.link = 'http://yahoo.com';
        } else if (todoList.children.length === 1) {
          newTodo.link = 'http://time.mk';
        } else if (todoList.children.length === 2) {
          newTodo.link = 'http://bild.de';
        }
      } else {
        newTodo.link = 'http://google.com'; // default link for additional items
      }
      todos.push(newTodo); // add the new todo to the todos array
      renderTodos(); // render the updated list of todos
    }
  }
  
  
  

function deleteTodo(id) {
    todos.splice(todos.findIndex(todo => todo.id === id), 1);
    renderTodos();
}

function editTodo(id, newText) {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex >= 0) {
    todos[todoIndex].text = newText;
    renderTodos();
  }
}

function toggleDone(id) {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex >= 0) {
    todos[todoIndex].done = !todos[todoIndex].done;
    renderTodos();
  }
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.innerText = todo.text;
      li.classList.add(`list-${index + 1}`);
      if (todo.done) {
        li.classList.add('done');
      }
  
      // Add a link for each list item
      const openButton = document.createElement('a');
      openButton.innerText = 'Open';
      openButton.href = todo.link;
      openButton.target = '_blank';
      openButton.classList.add('open');
      li.appendChild(openButton);
  
      const editInput = document.createElement('input');
      editInput.className = 'edit-input';
      editInput.value = todo.text;
      editInput.style.display = 'none';
  
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () => {
        editInput.style.display = 'inline-block';
        editInput.focus();
      });
  
      const saveButton = document.createElement('button');
      saveButton.innerText = 'Save';
      saveButton.style.display = 'none';
      saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText) {
          editTodo(todo.id, newText);
          li.innerText = newText;
          editInput.value = newText;
        } else {
          deleteTodo(todo.id);
        }
        editInput.style.display = 'none';
        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
        li.style.display = 'block';
      });
  
      editInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          saveButton.click();
        }
      });
  
      const doneButton = document.createElement('button');
      doneButton.innerText = 'Done';
      doneButton.addEventListener('click', () => {
        toggleDone(todo.id);
        if (todo.done) {
          li.classList.add('done');
        } else {
          li.classList.remove('done');
        }
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
  
      const buttonsContainer = document.createElement('div');
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(saveButton);
      buttonsContainer.appendChild(doneButton);
      buttonsContainer.appendChild(deleteButton);
      buttonsContainer.appendChild(openButton);
      li.appendChild(buttonsContainer);
      li.appendChild(editInput);
      todoList.appendChild(li);
    });
  }
  
  

  todoForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(); // add the new todo to the todos array and update the list on screen
      todoInput.value = ''; // clear the input field
    }
  });
  
renderTodos();
