let express = require('express');
let router = express.Router();

let categoryService = require('../mongoose/services/category-service');
let articleService = require('../mongoose/services/article-service');

/**
 *  Category Router
 */

router.route('/')
    /*GET: Get all categories */
    .get(function (req, res) {
        categoryService.findAll(function (err, docs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(docs);
            }
        });
    })
    /** POST: Submit new category to server */
    .post(function (req, res) {
        let category = req.body;
        categoryService.save(category, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send();
            }
        })
    });


/**
 * ROUTE: with category_id
 */

router.route('/:categoryId')
    /**GET: Get category with _id */
    .get(function (req, res) {
        let categoryId = req.params.categoryId;
        categoryService.findOne(categoryId, function (err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(doc);
            }
        });
    })
    /** PUT: Update document */
    .put(function (req, res) {
        let categoryId = req.params.categoryId;
        let category = req.body;
        categoryService.update(categoryId, category, function (err) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(202).send();
            }
        })
    })
    /** DELETE: Remove document */
    .delete(function (req, res) {
        let categoryId = req.params.categoryId;
        categoryService.remove(categoryId, function (err) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(202).send();
            }
        })
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

module.exports = router;