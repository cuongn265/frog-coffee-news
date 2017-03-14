let express = require('express');
let router = express.Router();
let userService = require('../mongoose/services/user-service');
let articleService = require('../mongoose/services/article-service');

/**
 * User Router
 */

/**GET: Get all users */
router.get('/', function (req, res) {
    console.log('Get all user request');
    userService.findAll(function (err, docs) {
        if (err) {
            res.send(500).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
});

/** GET: Get user with _id */
router.get('/:userId', function (req, res) {
    let userId = req.params.userId;
    userService.findOne(userId, function (err, doc) {
        if (err) {
            res.send(404).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
});

/** POST: Submit new user to server */
router.post('/', function (req, res) {
    let user = req.body;
    userService.save(user, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send();
        }
    });
});

/** PUT: Update document */
router.put('/:userId', function (req, res) {
    let user = req.body;
    let userId = req.params.userId;
    userService.update(userId, user, function (err) {
        if (err) {
            res.send(404).send(err);
        } else {
            res.status(202).send();
        }
    });
});

/** DELETE: Remove document */
router.delete('/', function (req, res) {
    let user = req.body;
    userService.remove(user, function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(202).send();
        }
    });
});

/** GET: Get articles created by this user */
router.get('/:userId/articles', function(req,res){
    let userId = req.params.userId;
    articleService.findByCreator(userId, function(err,docs){
        if(err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(docs);
        }
    });
});


module.exports = router;
