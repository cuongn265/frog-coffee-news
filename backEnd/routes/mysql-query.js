var SQLconnection = require('./mysql-connector');
var mysql = require('mysql2');
var db;
module.exports = {
    //
    getCategoryList: function(callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM category', function(err,rows){
            if(err) throw err;
            //return rows
            return callback(null,rows);
        });
    },
    // get Article
    getArticle: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article', function (err, rows) {
            if (err) throw err;
            //return rows;
            return callback(null,rows);
        });
        //
    }
}