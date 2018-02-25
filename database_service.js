const mysql = require('mysql');
const Promise = require('promise');

module.exports.database = null;
module.exports.executeQuery = function(sql) {
  const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'adininja',
      database: this.database
    });
    
    return new Promise(function (resolve, reject) {
      connection.query(sql, function (error, results) {
        connection.end();
        if(error) {
            console.log(error);
            reject(error);
        } else {
            resolve(results);
        }
      });
    });
}
