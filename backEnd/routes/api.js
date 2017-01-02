var express = require('express');
var router = express.Router();
var SQLquery = require('../mysql/mysql-query');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/all/users', function (req, res) {
    SQLquery.getUserAccounts(function (err, data) {
        if (err) throw err;
        else
            res.status(200).send(data);
    });
});


router.get('/role/:role/users', function (req, res) {
    let role = req.params.role;
    SQLquery.getUserAccountByRole(role, function (err, data) {
        if (err) throw err;
        else
            res.status(200).send(data);
    });
});

router.get('/users/:userId', function(req,res){
    let userId = req.params.userId;
    SQLquery.getUserAccount(userId, function(err,data){
        if(err) return;
        else
            res.status(200).send(data);
    });
});

// lock useraccount
router.put('/users/:userId/lock', function(req,res){
    let userId = req.params.userId;
    SQLquery.lockUserAccount(userId, function(err){
        if(err) return;
        else
            res.status(202).send('Lock user successfully');
    });
});


// unlock useraccount
router.put('/users/:userId/unlock', function(req,res){
    let userId = req.params.userId;
    SQLquery.unlockUserAccount(userId, function(err){
        if(err) return;
        else
            res.status(202).send('Lock user successfully');
    });
})
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

// post article
router.post('/:category/articles/post', function(req,res){
    let articleJSON = req.body;
    SQLquery.postArticle(articleJSON, function(err){
        if(err) return err;
        else
            res.status(201).send('Article created successfully');
    });
});

router.put('/:category/articles/modify', function(req,res){
    let articleJSON = req.body;
    SQLquery.modifyArticle(articleJSON, function(err){
        if(err) return err;
        else
            res.status(202).send('Article modified successfully');
    })
});

router.delete('/:category/articles/remove', function(req,res){
    let articleJSON = req.body;
    SQLquery.removeArticle(articleJSON, function(err){
        if(err) throw err;
        else
            res.status(202).send('Article removed successfully');
    })
});
// get article detail 
router.get('/:category/:articleID', function(req,res){
    let articleID = req.params.articleID;
    SQLquery.getArticleDetail(articleID, function(err, article){
        if(err)
            res.status(404).send("Not found");
        else
        {
            let articleJSON = article;
            SQLquery.getComments(articleID, function(err, comments){
                if(err) 
                    res.status(404).send('Not Found');
                else
                {
                    articleJSON[0].comments = comments;
                    return res.status(200).send(articleJSON);
                }
            });
        }
    });
});

router.get('/figures/:articleid', function (req, res) {
    let articleID = req.params.articleid;
    SQLquery.getArticleFigures(articleID, function (err, data) {
        if (err) return err;
        else
            res.status(200).send(data);
    })
});


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


router.get('/:articleID/:userID/find', function (req, res) {
    let articleID = req.params.articleID;
    let userID = req.params.userID;
    SQLquery.findUserInUpvotingList(articleID, userID, function (err, data) {

    });
});


router.get('/:articleID/:userID/upvote', function (req, res) {
    let articleID = req.params.articleID;
    let userID = req.params.userID;
});

router.get('/voting', function (req, res) {
    let voteType = req.query.votetype;
    let articleID = req.query.articleid;
    let userID = req.query.userid;
    // no parameter for query
    if (typeof (voteType) == 'undefined' || typeof (articleID) == 'undefined' || typeof (userID) == 'undefined') {
        res.status(204).send({
            "Message": "No parameter found for query"
        });
    } else {
        switch (voteType) {
            case "upvote":
                SQLquery.upvoteInArticleFromUser(articleID, userID, function (err, data) {
                    if (err)
                        res.status(406).send({
                            "Message": "Already Upvoted !"
                        });
                    else {
                        res.status(202).send({
                            "Message": "Upvoting Accepted !"
                        });
                    }
                });
                break;
            case "downvote":
                SQLquery.downvoteInArticleFromUser(articleID, userID, function (err, data) {
                    if (err)
                        res.status(406).send({
                            "Message": "Already Downvoted !"
                        });
                    else {
                        res.status(202).send({
                            "Message": "Downvoting Accepted !"
                        });
                    }       
                });
                break;
            default:
                res.status(400).send({
                    "Message": "No parameter found for query"
                });
                break;
        }
    }
});


router.get('/:category/:articleID/comments', function(req,res){
    let articleID = req.params.articleID;
    SQLquery.getComments(articleID, function(err,data){
        if(err) throw err;
        res.status(200).send(data);
    })
});

// POST request to save comment of user (specify by ID) to article (specify by ID)
router.post('/article/:articleID/user/:userID/comment', function(req,res){

    // get current time;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let articleID = req.params.articleID;
    let userID = req.params.userID;
    let timeOfPost = year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
    let content = req.body.content;

    // call to save comment function in server
    SQLquery.postComment(articleID, userID, content,timeOfPost, function(err){
        if(err) return;
        else
            res.status(201).send('Comment submitted !');
    });
    
});


module.exports = router;