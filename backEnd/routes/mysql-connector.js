var mysql = require('mysql2');


//create connection instance
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsdb'
});

module.exports = {
    connectToServer: function () {
        console.log("Attemp to connect");
        connection.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("Connection Established");
            }
        }); 
    },
    disconnectFromServer: function () {
        connection.end(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("Disconnected");
            }
        });
    },
    getConnectionInstance: function(){
        return connection;
    }
};

