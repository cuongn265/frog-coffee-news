/** Tracker Service : provide method for Tracking */
const chalk = require('chalk');
let userService = require('./user-service');
let articleService = require('./article-service');

let ObjectId = require('mongoose').Types.ObjectId;

let self = module.exports = {

        
    isValidUser: function (userId) {
        if (ObjectId.isValid(userId))
            return true;
        return false;
    },

    /** trackUser */
    trackUserCategory: function (data) {
        let userId = data.user_id;
        let category = data.category;
        if (self.isValidUser(userId)) {
            userService.updateCategoryVisitCount(userId, category);
        }
    },

    /** track article view */
    increaseArticleView: function (article_id) {
        articleService.increaseView(article_id).then((doc) => {
            articleService.updateScore(article_id).then((doc) => {});
        });
    }
}