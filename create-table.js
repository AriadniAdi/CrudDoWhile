const mysql = require('mysql');
const Promise = require('promise');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'adininja'
});

const sqlDropDatabase = 'drop database doWhile;';
const sqlCreateDatabase = 'create database doWhile;';
const sqlUseDatabase = 'use doWhile;';
const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS User ('+
                      'firstname varchar(30) NOT NULL,'+
                      'lastname varchar(50) NOT NULL,'+
                      'cpf varchar(11) NOT NULL,'+
                      'email varchar(254) NOT NULL UNIQUE,'+
                      'phone int(9),'+
                      'birth_date date,'+
                      'status tinyint(1) NOT NULL,'+
                      'PRIMARY KEY (cpf));';

Promise.all(
  connect(),
  executeQuery(sqlDropDatabase),
  executeQuery(sqlCreateDatabase),
  executeQuery(sqlUseDatabase),
  executeQuery(sqlCreateTable)
).then(disconnect());

function connect() {
  return new Promise(function (resolve, reject) {
    connection.connect(function(error) {
      if(error) {
        reject(error);
        console.log(error)
      } else {
        resolve();
      }
    });
  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    connection.end();
    resolve();
  });
}

function executeQuery(sql) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (error, results) {
      if(error) {
        reject(error);
        console.log(error)
      } else {
        resolve();
      }
    });
  });
}