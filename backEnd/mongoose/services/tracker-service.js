/** Tracker Service : provide method for Tracking */

let userService = require('./user-service');

let self = module.exports = {


    /** trackUser */
    trackUserCategory: function(data){
        let userId = data.user_id;
        let category = data.category;
        userService.updateCategoryVisitCount(userId, category);
    }
}