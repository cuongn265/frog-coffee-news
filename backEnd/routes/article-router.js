let express = require('express');
let router = express.Router();

let articleService = require('../mongoose/services/article-service');
let tagService = require('../mongoose/services/tag-service');
let discussionService = require('../mongoose/services/discussion-service');
/** Article Router */

router.route('/')
    /** GET: Get all articles */
    .get(function (req, res) {
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
    })
    /** POST: Submit new article to server*/
    .post(function (req, res) {
        let article = req.body;
        articleService.save(article, function (err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send();
            }
        });
    });

/**
 * --------Begin of TAG Request -----------------------------------------------------
 */

router.route('/tags')
    .get(function (req, res) {
        tagService.findAll(function (err, docs) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(docs);
            }
        })
    })
    .post(function (req, res) {
        let tag = req.body;
        tagService.save(tag, function (err) {
            if (err) res.status(400).send(err);
            else {
                res.status(201).send();
            }
        })
    });

router.route('/tags/:tagId')
    .get(function (req, res) {
        let tagId = req.params.tagId;
        tagService.findOne(tagId, function (err, doc) {
            if (err) res.status(400).send(err);
            else {
                res.status(200).send(doc);
            }
        });
    })
    .put(function (req, res) {
        let tagId = req.params.tagId;
        let body = req.body;
        tagService.update(tagId, body, function (err) {
            if (err) res.status(400).send();
            else {
                res.status(202).send();
            }
        });
    })
    .delete(function (req, res) {
        let tagId = req.params.tagId;
        tagService.remove(tagId, function (err) {
            if (err) res.status(400).send(err);
            else {
                res.status(202).send();
            }
        });
    });

/**
 * ----End of TAG Request-----------------------------------------------------
 */




/**
 * Route with Article Id
 */

router.route('/:articleId')
    /** GET: Get article with _id */
    .get(function (req, res) {
        let articleId = req.params.articleId;
        articleService.findOne(articleId, function (err, doc) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(doc);
            }
        });
    })
    /** PUT: Update document */
    .put(function (req, res) {
        let articleId = req.params.articleId;
        let article = req.body;
        articleService.update(articleId, article, function (err) {
            if (err) {
                res.send(404).send(err);
            } else {
                res.status(202).send();
            }
        });
    })
    /** DELETE: Remove document */
    .delete(function (req, res) {
        let articleId = req.params.articleId;
        articleService.remove(articleId, function (err) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(202).send();
            }
        });
    });

router.route('/:articleId/comments')
    .get(function(req, res) {
      let articleId = req.params.articleId;
      discussionService.findOne(articleId, function(err, doc) {
        if (err) res.status(404).send();
        res.status(200).send(doc);
      })
    })
    .post(function(req, res) {
      let comment = req.body;
      comment.article_id = req.params.articleId;
      discussionService.addComment(comment, function(err) {
        if (err) res.status(400).send();
        res.status(201).send();
      })
    });

module.exports = router;
