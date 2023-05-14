The code creates a list of tasks using an array called todoTasks to store the task objects. The program allows the user to add, edit, and delete tasks from the list. The application uses Local Storage to store the task data so that it persists between page reloads.

The code starts by hiding the Create List section and displaying the Main Section. It adds an event listener to the toggleArrow element that toggles between the two sections. The code then checks if there is any task data stored in Local Storage and loads it into the todoTasks array if present.

The displayTask() function takes a task object and renders it on the page by creating an li element with a checkbox, task text, edit and delete buttons. It sets the class of the li element to .done if the todo.checked property is true.

The addTask() function creates a new task object and pushes it into the todoTasks array. It then calls the displayTask() function to render the task on the page.

The program listens for a form submission event, and when the user submits the form, it prevents the page from refreshing, gets the input value, creates a task object with the input value, and calls the addTask() function to add it to the todoTasks array and render it on the page.

The program also allows the user to edit tasks by clicking on the pencil icon, which opens a modal that allows them to edit the task text. The updated task text is then saved to Local Storage.

Finally, the program allows the user to delete tasks by clicking on the trash icon, which removes the task object from the todoTasks array and removes it from the page. If there are no tasks left in the todoTasks array, the welcome message is displayed.




