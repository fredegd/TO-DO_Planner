window.addEventListener('load', () => {
    todotasks = JSON.parse(localStorage.getItem('todotasks')) || [];
    const newTaskForm = document.querySelector('#new-task-form');

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            done: false,
        }

        todotasks.push(todo);

        localStorage.setItem('todotasks', JSON.stringify(todotasks));

        e.target.reset();

        DisplayTodos()
    })
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todotasks.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('checkmark');



        input.classList.add('check');
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        const editicon = `
        <i class="bi-pencil-fill"></i>`;
        const deleteicon = `
        <i class="bi-trash-fill"></i>`;

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = editicon;
        deleteButton.innerHTML = deleteicon;

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }


        input.addEventListener('change', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todotasks', JSON.stringify(todotasks));

            if (todo.done) {
                todoItem.classList.add('done');

            }
            else {
                todoItem.classList.remove('done');
            }

            DisplayTodos()
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todotasks', JSON.stringify(todotasks));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', (e) => {
            todotasks = todotasks.filter(t => t != todo);
            localStorage.setItem('todotasks', JSON.stringify(todotasks));
            DisplayTodos();
        })

    })
}

