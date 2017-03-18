let express = require('express');
let router = express.Router();

let articleService = require('../mongoose/services/article-service');

/** Article Router */


/** GET: Get all articles */
router.get('/', function (req, res) {
    let searchQuery = req.query.search;
    
    /** If no search query is specified , find all documents */
    if (searchQuery === undefined || searchQuery === '') {
        articleService.findAll(function (err, docs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(docs);
            }
        });
    } else {
        articleService.findByContent(searchQuery, function (err, docs) {
            if (err) res.status(404).send(err);
            else {
                res.status(200).send(docs);
            }
        });
    }

});

/** GET: Get article with _id */
router.get('/:articleId', function (req, res) {
    let articleId = req.params.articleId;
    articleService.findOne(articleId, function (err, doc) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
});


/** POST: Submit new article to server*/
router.post('/', function (req, res) {
    let article = req.body;
    articleService.save(article, function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send();
        }
    });
});

/** PUT: Update document */
router.put('/:articleId', function (req, res) {
    let articleId = req.params.articleId;
    let article = req.body;
    articleService.update(articleId, article, function (err) {
        if (err) {
            res.send(404).send(err);
        } else {
            res.status(202).send();
        }
    });
});

/** DELETE: Remove document */
router.delete('/:articleId', function (req, res) {
    let articleId = req.params.articleId;
    articleService.remove(articleId, function (err) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(202).send();
        }
    });
});

module.exports = router;