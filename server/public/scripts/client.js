$(document).ready(onReady);


// Make onReady function to check if jquery is working
function onReady() {
    console.log('jquery ready');

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