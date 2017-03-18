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
    }
}