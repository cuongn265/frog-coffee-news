var mongoose = require('mongoose');
const chalk = require('chalk');
module.exports = {
    connectToMongo: function (host, option) {
        mongoose.connect(host, option, function (err) {
            if (err) {
                console.log('Unable to establish connection to server');
                console.log(chalk.yellow('Trace: '));
                console.log(chalk.red(err));
            }
            else {
                console.log('-------------');
                console.log(chalk.green('MongoDB connected: Ready to Rock !'));
            }
        });
    },
    disconnect: function () {
        mongoose.disconnect();
        
    }
}