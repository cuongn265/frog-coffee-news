let express = require('express');
let router = express.Router();

let categoryService = require('../mongoose/services/category-service');
let articleService = require('../mongoose/services/article-service');

/**
 *  Category Router
 */


/*GET: Get all categories */
router.get('/', function (req, res) {
    categoryService.findAll(function (err, docs) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
});

/**GET: Get category with _id */
router.get('/:categoryId', function (req, res) {
    let categoryId = req.params.categoryId;
    categoryService.findOne(categoryId, function (err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
});

/**GET: get articles of category */
router.get('/:categoryId/articles', function (req, res) {
    let categoryId = req.params.categoryId;
    articleService.findByCategory(categoryId, function (err, docs) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
});


/** POST: Submit new category to server */
router.post('/', function (req, res) {
    let category = req.body;
    categoryService.save(category, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    })
});

/** PUT: Update document */
router.put('/:categoryId', function (req, res) {
    let categoryId = req.params.categoryId;
    let category = req.body;
    categoryService.update(categoryId, category, function (err) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(202).send();
        }
    })
});

/** DELETE: Remove document */
router.delete('/:categoryId', function (req, res) {
    let categoryId = req.params.categoryId;
    categoryService.remove(categoryId, function (err) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(202).send();
        }
    })
});

module.exports = router;