$(document).ready(onReady);


// Make onReady function to check if jquery is working
function onReady() {
    console.log('jquery ready');

    // Click handler for POST request
    $('#add-btn').on('click', postTaskList);

    // Click handler for DELETE request
    // Call getDeleteId to get ID for DELETE request
    $('#task-table').on('click', '.delete-btn', getDeleteId);

    // Click handler for Complete Task
    // Call getPutId for PUT request
    $('#task-table').on('click', '.complete-btn', getPutId);

    getTask();
}

function getTask() {
    // Empty where the tasks will get appended
    $('#task-table').empty();

    // Make ajax request
    $.ajax({
        type: 'GET',
        url: '/todoList'
    })
    .then(function(response) {
        // Log to make sure response is working
        console.log('GET response', response);

        // Loop through response to append table data
        for (let i = 0; i < response.length; i++) {
            $('#task-table').append(`
                <tr data-id="${response[i].id}">
                    <td>${response[i].task}</td>
                    <td>${response[i].complete}</td>
                    <td>
                        <button class="complete-btn">Task Complete</button>
                        <button class="delete-btn">Delete Task</button>
                    </td>
                </tr>
            `);
        }
    });
} // end GET ROUTE

// POST route to send user entered values to server
// and have them added to the database
function postTaskList() {
    // Create object to send new data in
    let newTask = {
        taskIn: $('#task-in').val()
    }
    // ajax request
    $.ajax({
        type: 'POST',
        url: '/todoList',
        data: newTask
    })
    .then(function(response) {
        // Clear input
        $('#task-in').val('');
        // Call GET route to refresh DOM
        getTask();
    })
    .catch(function(error) {
        console.log('ERROR, try again',error);
        alert('ERROR, try again' )
    })
} // End POST request

// Get the Id of the task for DELETE function
function getDeleteId() {
    console.log('Getting task id for delete');
    // Make taskId target the db task id
    taskId = $(this).closest('tr').data('id');
    // Call delete function
    deleteTask(taskId);
} // End getDeleteId function

// Create DELETE function using taskId
function deleteTask(taskId) {
    // ajax request
    $.ajax({
        method: 'DELETE',
        url: `/todoList/${taskId}`
    })
    .then(function(response) {
        // After OK status, getTask to refresh list
        getTask();
    })
    .catch(function(error) {
        console.log('ERROR, try again',error);
        alert('ERROR, try again' )
    })
} // End DELETE function

// Get the Id of the task for PUT function
function getPutId() {
    console.log('Getting task id for PUT');
    // Make taskId target the db task id
    taskId = $(this).closest('tr').data('id');
    // Call completeTask function
    completeTask(taskId);
} // End getPutId function

function completeTask(taskId) {
    // ajax request
    $.ajax({
        method: 'PUT',
        url: `/todoList/${taskId}`
    })
    .then(function(response) {
        // After OK status, getTask to refresh list
        getTask();
    })
    .catch(function(error) {
        console.log('ERROR, try again',error);
        alert('ERROR, try again' )
    })
} // End PUT function
