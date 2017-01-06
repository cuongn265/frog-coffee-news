var mysql = require('mysql2');


//create connection instance
var connection = mysql.createConnection({
    host: 'qbct6vwi8q648mrn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'j0n1tj386lzypj5u',
    password: 'xuo1yhoezolyqxa6',
    database: 'j4belkhjqjsppg8e'
});

module.exports = {
    connectToServer: function () {
        connection.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        }); 
    },
    disconnectFromServer: function () {
        connection.end(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    },
    getConnectionInstance: function(){
        return connection;
    }
};

