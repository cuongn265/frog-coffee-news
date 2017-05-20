module.exports = {
    getCurrentDay: function () {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        return time;
    },

    getMinutesSinceRelease: function(date){
        let currentTimestamp = new Date().getTime();
        let distance = currentTimestamp - date.getTime();
        let distance_minutes = distance / (1000 * 60);
        return distance_minutes;
    }
}