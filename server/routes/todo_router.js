const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 

// Creat GET response to client side
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "todo" ORDER BY "complete" ASC;`
    pool.query(sqlText)
        .then((result) => {
            console.log('Got back', result.rows);
            // Send back a result so GET function can have a variable
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('ERROR from db', error);
            res.sendStatus(500);
        })
}) // End GET response

// Create POST response to client side
router.post('/', (req, res) => {
    let todoTask = req.body;
    console.log('req.body =', req.body);
    let sqlText = `INSERT INTO "todo" ("task")
                    VALUES ($1);`
    // Make sure pool.query obj key matches POST obj key
    pool.query(sqlText, [todoTask.taskIn])
    // Use .then with OK status to tell client side POST
    // that the value was inserted into the table
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('ERROR from db', error);
        res.sendStatus(500);
    })
}) // end POST response

// Create DELETE response to client side
router.delete('/:taskId', (req, res) => {
    // create id for taskId to be used from client
    let id = req.params.taskId;
    console.log(`Using ${id} to delete task...`);
    let sqlText = `DELETE FROM todo WHERE id=$1;`
    pool.query(sqlText, [id])
        .then((result) => {
            // Send OK status to tell client side DELETE
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('ERROR from db', error);
            res.sendStatus(500);
        })
}) // End DELETE response

// Create PUT response to client side
router.put('/:taskId', (req, res) => {
    // create id for taskId to be used from client
    let id = req.params.taskId;
    console.log(`Using ${id} to update complete task...`);
    let sqlText = `UPDATE todo SET complete='true' WHERE id=$1;`
    pool.query(sqlText, [id])
        .then((result) => {
            // Send OK status to tell client side PUT
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('ERROR from db', error);
            res.sendStatus(500);
        })
}) // End PUT response


























module.exports = router;