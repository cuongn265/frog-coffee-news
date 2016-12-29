var express = require('express');
var router = express.Router();
var SQLquery = require('../mysql/mysql-query');

router.get('/all/users', function (req, res) {
    SQLquery.getUserAccount(function (err, data) {
        if (err) throw err;
        else
            res.status(200).send(data);
    });
});

router.get('/:role/users', function (req, res) {
    let role = req.params.role;
    SQLquery.getUserAccountByRole(role, function (err, data) {
        if (err) throw err;
        else
            res.status(200).send(data);
    });
});


/* Begin article query */

// get all articles
router.get('/all/articles', function (req, res) {
    SQLquery.getArticle(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    });
});

// get articles in a category
router.get('/:category/articles', function (req, res) {
    let category = req.params.category;
    SQLquery.getArticleInCategory(category, function (err, data) {
        if (err) return err;
        else
            res.status(200).send(data);
    });
});

/*
router.get('/articles/:category/:keyword', function (req, res) {
    let category = req.params.category;
    let keyword = req.param(keyword);
    if (keyword) {
        console.log(keyword);
    } else {
        console.log(category);
    }
})
*/
router.get('/figures/:articleid',function(req,res){
    let articleID = req.params.articleid;
    SQLquery.getArticleFigures(articleID,function(err,data){
        if(err) return err;
        else
            res.status(200).send(data);
    })
})

// get all category
router.get('/categories', function (req, res) {
    SQLquery.getCategoryList(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    })
});

// get a list of tag
router.get('/taglist', function (req, res) {
    SQLquery.getTagList(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    });
});

// get all api source
router.get('/apisource', function (req, res) {
    SQLquery.getAPISource(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    })
});

module.exports = router;