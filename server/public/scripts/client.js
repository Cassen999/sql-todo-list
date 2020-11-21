$(document).ready(onReady);


// Make onReady function to check if jquery is working
function onReady() {
    console.log('jquery ready');

    // Click handler for POST request
    $('#add-btn').on('click', postTaskList);

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