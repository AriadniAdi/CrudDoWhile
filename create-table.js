const Promise = require('promise');
const databaseService = require('./database_service');

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
  databaseService.connect(),
  databaseService.executeQuery(sqlDropDatabase),
  databaseService.executeQuery(sqlCreateDatabase),
  databaseService.executeQuery(sqlUseDatabase),
  databaseService.executeQuery(sqlCreateTable)
).then(databaseService.disconnect());