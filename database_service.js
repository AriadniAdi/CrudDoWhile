const mysql = require('mysql');
const Promise = require('promise');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'adininja'
});

module.exports.connect = function() {
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
  
module.exports.disconnect = function() {
    return new Promise(function (resolve, reject) {
        connection.end();
        resolve();
    });
  }
  
module.exports.executeQuery = function(sql) {
    return new Promise(function (resolve, reject) {
      connection.query(sql, function (error, results) {
        connection.release();
        if(error) {
            reject(error);
        } else {
            resolve(results);
        }
      });
    });
  }
