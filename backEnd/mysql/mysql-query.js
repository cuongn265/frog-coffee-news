var SQLconnection = require('./mysql-connector');
var mysql = require('mysql2');
var Q = require('q');

var db;

module.exports = {
    //
    getUserAccount: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    getUserAccountByRole: function (role, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount, role WHERE useraccount.role = role.idRole AND role.roleName = ?', [role], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        })
    },

    getAPISource: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM apisource', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },
    getCategoryList: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM category', function (err, rows) {
            if (err) throw err;
            //return rows
            return callback(null, rows);
        });
    },
    getTagList: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM tag', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },
    // get Article
    getArticle: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },
    getArticleInCategory: function (category, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article,category WHERE category.categoryName = ? AND article.Category = category.idCategory', [category], function (err, rows) {
            if (err) throw err;
            //return rows
            return callback(null, rows);
        });
    },

    getArticleFigures: function (articleId, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM articlefigure WHERE articlefigure.idArticle = ?', [articleId], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    // testing
    getUpvoterListInArticle: function (articleID, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();

        db.query('SELECT * FROM article WHERE article.idArticle = ?', [articleID], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    indexOfUserInVotingList: function (voteType, articleID, userID) {
        var deferred = Q.defer();
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let userIndex;
        switch (voteType) {
            case "upvote":
                db.query('SELECT upVoters FROM article WHERE article.idArticle = ?', [articleID], function (err, rows) {
                    if (err) {
                        deferred.reject(new Error(err));
                        //throw err;
                    } else {
                        let upvoterArray = rows[0].upVoters;
                        userIndex = upvoterArray.indexOf(userID);
                        console.log(userIndex);
                        deferred.resolve(userIndex);
                    }
                });
                break;
            case "downvote":
                db.query('SELECT downVoters FROM article WHERE article.idArticle = ?', [articleID], function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        let downvoterArray = rows[0].downVoters;
                        userIndex = downvoterArray.indexOf(userID);
                    }
                });
                break;
            default:
                break;
        }
        return deferred.promise;
    },

    upvoteInArticleFromUser: function (articleID, userID, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let foundUser = false;
        // check if the user exist in upvoters array

        let userIndex = this.indexOfUserInVotingList('upvote', articleID, userID).then(function(userIndex));
        console.log("User index: " + userIndex);
        /*
        db.query('SELECT upVoters FROM article WHERE article.idArticle = ?', [articleID], function (err, rows) {
            if (err) throw err;
            else {
                let upvoterArray = rows[0].upVoters;
                if (upvoterArray.indexOf(userID) != -1)
                    foundUser = true;
                if (foundUser) {
                    //this user has already voted, do nothing
                    return callback(true, null);
                } else {
                    //update vote count in database
                    db.query("UPDATE article SET upVoters = JSON_ARRAY_APPEND(upVoters, '$' , ?) WHERE article.idArticle = ?", [userID, articleID],
                        function (err, rows) {
                            if (err) throw err;
                            else
                                return callback(null, rows);
                        });
                }
            }
        });
        */
    },
    downvoteInArticleFromUser: function (articleID, userID, callback) {
        /*
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let foundUser = false;
        // check if the user exist in upvoters array
        db.query('SELECT downVoters FROM article WHERE article.idArticle = ?', [articleID], function (err, rows) {
            if (err) throw err;
            else {
                let downvoterArray = rows[0].downVoters;
                if (downvoterArray.indexOf(userID) != -1)
                    foundUser = true;
                if (foundUser) {
                    //this user has already voted, do nothing
                    return callback(true, null);
                } else {
                    //update vote count in database
                    db.query("UPDATE article SET downVoters = JSON_ARRAY_APPEND(downVoters, '$' , ?) WHERE article.idArticle = ?", [userID, articleID],
                        function (err, rows) {
                            if (err) throw err;
                            else
                                return callback(null, rows);
                        });
                }
            }
        });
        */
    }
}