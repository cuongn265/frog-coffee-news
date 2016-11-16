var SQLconnection = require('./mysql-connector');
var mysql = require('mysql2');
var db;
module.exports = {
    //
    getUserAccount: function(callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount', function(err,rows){
            if(err) throw err;
            return callback(null,rows);
        });
    },
    getUserAccountByRole: function(role,callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM useraccount, role WHERE useraccount.role = role.idRole AND role.roleName = ?',
            [role],function(err,rows){
                if(err) throw err;
                return callback(null,rows);
        })
    },

    getAPISource:function(callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM apisource',function(err,rows){
            if(err) throw err;
            return callback(null,rows);
        });
    },
    getCategoryList: function(callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM category', function(err,rows){
            if(err) throw err;
            //return rows
            return callback(null,rows);
        });
    },
    getTagList: function(callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM tag', function(err,rows){
            if(err) throw err;
            return callback(null,rows);
        });
    },



    // get Article
    getArticle: function (callback) {
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article', function (err, rows) {
            if (err) throw err;
            //return rows;
            return callback(null,rows);
        });
        //
    },
    getArticleInCategory: function(category, callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM article,category WHERE category.categoryName = ? AND article.Category = category.idCategory',
                [category],function(err,rows){
                    if(err) throw err;
                    //return rows
                    return callback(null,rows);
                });
    },

    getArticleFigures: function(articleId, callback){
        SQLconnection.connectToServer();
        db = SQLconnection.getConnectionInstance();
        db.query('SELECT * FROM articlefigure WHERE articlefigure.idArticle = ?',
                [articleId],function(err,rows){
                    if(err) throw err;
                    return callback(null,rows);
                });
    }
}