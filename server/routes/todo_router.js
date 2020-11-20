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
})


























module.exports = router;