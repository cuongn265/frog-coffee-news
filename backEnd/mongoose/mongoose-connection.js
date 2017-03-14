var mongoose = require('mongoose');

module.exports = {
    connectToMongo: function(){
        mongoose.connect("mongodb://localhost/frogcoffeedb");
        console.log('MongoDB connected : Ready to Rock !');
    },
    disconnect: function(){
        mongoose.disconnect();
    }
}




