const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const databaseService = require('./database_service');
databaseService.database = 'dowhile';

app.get('/users', function (req, res) {
    const sql = 'SELECT * FROM USER;';
    databaseService.executeQuery(sql)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.status(400);
        res.send('Ocorreu um erro');
    });
});

app.post('/user', function(req, res) {
    const sql = 'INSERT INTO USER VALUES(' +
    '"' + req.body.firstname + '",' +
    '"' + req.body.lastname + '",' +
    '"' + req.body.cpf + '",' +
    '"' + req.body.email + '",' +
    '"' + req.body.phone + '",' +
    '"' + req.body.birth_date + '",' +
    '"' + req.body.status + '"' +
    ');';
    databaseService.executeQuery(sql)
    .then(function(result) {
        res.json({message: 'usuário incluído com sucesso.'});
    })
    .catch(function(error) {
        res.status(400);
        res.json({ message: 'Ocorreu um erro' } );
    });
});

app.delete('/user/:cpf', function(req, res) {
    const sql = 'DELETE FROM USER WHERE CPF = "' + req.params.cpf + '";';
    databaseService.executeQuery(sql)
    .then(function(result) {
        if(result.affectedRows > 0) {
            res.json({message: 'usuário deletado com sucesso.'});
        } else {
            res.status(404);
            res.json({ message: 'Usuário não encontrado.' });
        }
    })
    .catch(function(error) {
        res.status(400);
        res.json({ message: 'Ocorreu um erro.' });
    });
});

app.put('/user/:cpf', function(req, res) {
    const fields = [
        { key: 'firstname', value: req.body.firstname, useQuotes: true },
        { key: 'lastname', value: req.body.lastname, useQuotes: true },
        { key: 'phone', value: req.body.phone, useQuotes: true },
        { key: 'email', value: req.body.email, useQuotes: true },
        { key: 'cpf', value: req.body.cpf, useQuotes: true },
        { key: 'status', value: req.body.status, useQuotes: false },
        { key: 'birth_date', value: req.body.birth_date, useQuotes: true }
    ]
    .filter(function(element) { return element.value })
    .map(function(element) {
        const quotes = element.useQuotes ? '"' : '';
        return element.key + ' = ' + quotes + element.value + quotes;
    }).join(',');
    
    const sql = 'UPDATE USER SET ' + fields + ' WHERE cpf = "' + req.params.cpf + '";';
    databaseService.executeQuery(sql)
    .then(function(result) {
        if(result.affectedRows > 0) {
            res.json({message: 'usuário alterado com sucesso.'});
        } else {
            res.status(404);
            res.json({message: 'Usuário não encontrado.'});
        }
    })
    .catch(function(error) {
        res.status(400);
        res.json({ message: 'Ocorreu um erro' });
    });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});