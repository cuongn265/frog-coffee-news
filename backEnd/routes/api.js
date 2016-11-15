var express = require('express');
var router = express.Router();
var SQLquery = require('./mysql-query');

/* GET API request. */
router.get('/articles', function (req, res) {
    SQLquery.getArticle(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    });
});
router.get('/category', function (req, res) {
    SQLquery.getCategoryList(function (err, data) {
        if (err) return;
        else
            res.status(200).send(data);
    })
});
module.exports = router;