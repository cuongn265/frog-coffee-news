var mysql = require('mysql2');


//create connection instance
var connection = mysql.createConnection({
    host: '104.199.215.230',
    user: 'root',
    password: 'root',
    database: 'newsdb'
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

