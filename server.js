const databaseService = require('./database_service');
const express = require('express');
const app = express();

app.get('/users', function (req, res) {
    const sql = 'select * from user;'
    databaseService.connect()
    .then(databaseService.executeQuery(sql))
    .then(function(result) { 
        res.send(result[0].firstname);
        databaseService.disconnect();
    }).catch(databaseService.disconnect());
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});