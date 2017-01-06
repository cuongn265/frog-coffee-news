var SQLconnection = require('./mysql-connector');
var mysql = require('mysql2');
var Q = require('q');

var db;

let getCurrentDay = function () {
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

module.exports = {
    //
    getUserAccounts: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    getUserAccountByRole: function (role, callback) {
        console.log('get useraccount by role' + role);
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount, role WHERE useraccount.role = role.idRole AND role.roleName = ?', [role], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        })
    },

    getUserAccount: function (userId, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount WHERE useraccount.idUser = ?', [userId], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    lockUserAccount: function (userId, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('UPDATE useraccount SET useraccount.enable = 0 WHERE useraccount.idUser = ?', [userId], function (err) {
            if (err) throw err;
            return callback(null);
        });
    },
    unlockUserAccount: function (userId, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('UPDATE useraccount SET useraccount.enable = 1 WHERE useraccount.idUser = ?', [userId], function (err) {
            if (err) throw err;
            return callback(null);
        });
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
        db.query('SELECT * FROM article WHERE article.deletedAt IS NULL', function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },
    getArticleInCategory: function (category, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article,category WHERE category.categoryName = ? AND article.Category = category.idCategory AND article.deletedAt IS NULL', [category], function (err, rows) {
            if (err) throw err;
            //return rows
            return callback(null, rows);
        });
    },
    getArticleDetail: function (articleID, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article WHERE article.idArticle = ? ', [articleID], function (err, rows) {
            if (err) throw err;
            // return rows
            return callback(null, rows);
        });
    },
    // post article
    postArticle: function (article, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();

        let newArticle = {
            articleHeaderTitle: article.articleHeaderTitle,
            articleHeaderDescription: article.articleHeaderDescription,
            category: article.category,
            articleEditor: article.articleEditor,
            date: article.date,
            headerImagePath: article.headerImagePath,
            published: article.published,
            articleContent: article.articleContent,
            articleKeyword: article.articleKeyword,
            author: article.author,
            source: article.source
        };
        db.query('INSERT INTO article SET ?', newArticle, function (err) {
            if (err) throw err;
            return callback(null);
        });
    },
    modifyArticle: function (article, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let condition = {
            idArticle: article.idArticle
        };
        let modifiedArticle = {
            articleHeaderTitle: article.articleHeaderTitle,
            articleHeaderDescription: article.articleHeaderDescription,
            category: article.category,
            articleEditor: article.articleEditor,
            date: article.date,
            headerImagePath: article.headerImagePath,
            published: article.published,
            articleContent: article.articleContent,
            articleKeyword: article.articleKeyword,
            author: article.author,
            source: article.source
        };
        db.query('UPDATE article SET ? WHERE ?', [modifiedArticle, condition], function (err) {
            if (err) throw err;
            return callback(null);
        });
    },
    removeArticle: function (article, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let condition = {
            idArticle: article.idArticle
        };
        let removedArticle = {
            deletedAt: getCurrentDay()
        }
        db.query('UPDATE article SET ? WHERE ?', [removedArticle, condition], function (err) {
            if (err) throw err;
            return callback(null);
        })
    },

    getComments: function (articleID, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT comment.idComment, comment.idArticle, useraccount.idUser ,useraccount.firstName, useraccount.lastName, useraccount.email ,comment.content, comment.time FROM comment,useraccount WHERE comment.idArticle = ? AND comment.idUser = useraccount.idUser ORDER BY time DESC', [articleID], function (err, rows) {
            if (err) throw err;
            return callback(null, rows);
        });
    },

    postComment: function (comment, callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        let submitTime = getCurrentDay();
        let newComment = {
            idArticle: comment.idArticle,
            idUser: comment.idUser,
            content: comment.content,
            time: submitTime
        }
        db.query('INSERT INTO comment SET ?', newComment, function (err) {
            if (err) throw err;
            return callback(null);
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

        let userIndex = this.indexOfUserInVotingList('upvote', articleID, userID).then(function (userIndex) {});
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