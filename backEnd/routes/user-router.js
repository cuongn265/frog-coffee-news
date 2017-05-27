let express = require('express');
let router = express.Router();
let userService = require('../mongoose/services/user-service');
let articleService = require('../mongoose/services/article-service');
let roleService = require('../mongoose/services/role-service');
let notificationService = require('../mongoose/services/notification/notification-service');

const chalk = require('chalk');
/**
 * User Router
 */

/**
 * ------------BEGIN OF ROLE REQUEST-------------------------------------------------------------------------------- 
 */

router.route('/roles')
    /**
     * GET: Get all roles
     */
    .get(function (req, res) {
        roleService.findAll(function (err, docs) {
            if (err) res.status(404).send(err);
            res.status(200).send(docs);
        });
    })
    /**
     * POST: Save new roles
     */
    .post(function (req, res) {
        let role = req.body;
        roleService.save(role, function (err) {
            if (err) res.status(400).send(err);
            res.status(201).send();
        });
    });

router.route('/roles/:roleId')
    /**
     * GET: Get role with id
     */
    .get(function (req, res) {
        let roleId = req.params.roleId;
        roleService.findOne(roleId, function (err, doc) {
            if (err) res.status(404).send(err);
            else {
                res.status(200).send(doc);
            }
        });
    })
    /**
     * PUT: Update Role with id
     */
    .put(function (req, res) {
        let roleId = req.params.roleId;
        let role = req.body;
        roleService.update(roleId, role, function (err) {
            if (err) res.status(400).send(err);
            else {
                res.status(202).send();
            }
        })
    })
    /**
     * DELETE: Remove Role with id
     */
    .delete(function (req, res) {
        let roleId = req.params.roleId;
        roleService.remove(roleId, function (err) {
            if (err) res.status(400).send();
            res.status(202).send();
        });
    });

/**
 * ------------END OF ROLE REQUEST--------------------------------------------------------------------------------
 * 
 */


/**
 * ------------ BEGIN OF INFORMATIONAL USER REQUEST  ---------------------------------------------------
 */
router.route('/')
    /**GET: Get all users */
    .get(function (req, res) {
        userService.findAll(function (err, docs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(docs);
            }
        });
    })
    /** POST: Submit new user to server */
    .post(function (req, res) {
        let user = req.body;
        userService.save(user, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send();
            }
        });
    });

router.route('/:userId')
    /** GET: Get user with _id */
    .get(function (req, res) {
        let userId = req.params.userId;
        userService.findOne(userId, function (err, doc) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(doc);
            }
        });
    })
    /** PUT: Update user info */
    .put(function (req, res) {
        let user = req.body;
        let userId = req.params.userId;
        userService.update(userId, user, function (err) {
            if (err) {
                res.send(404).send(err);
            } else {
                res.status(202).send();
            }
        });
    })
    /** DELETE: Remove user */
    .delete(function (req, res) {
        let user = req.body;
        userService.remove(user, function (err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(202).send();
            }
        });
    })

/**
 * ------------ END OF INFORMATIONAL USER REQUEST  ---------------------------------------------------
 */

router.route('/:userId/togglestatus')
    .put(function (req, res) {
        let userId = req.params.userId;
        userService.toggleEnable(userId, function (err) {
            if (err) res.status(404).send(err);
            res.status(202).send();
        });
    });

/** GET: Get articles created by this user */
router.get('/:userId/articles', function (req, res) {
    let userId = req.params.userId;
    articleService.findByCreator(userId, function (err, docs) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
});


/**GET: Get notification from this user */
/**TODO: To be replaced by socket io emitter-receiver soon */
router.route('/:userId/notifications')
    .get(function (req, res) {
        let userId = req.params.userId;
        userService.findOne(userId, function (err, doc) {
            if (err) res.status(400).send(err);
            res.status(200).send(doc.notifications);
        });
    })
    .post(function (req, res) {
        let userId = req.params.userId;
        let notification = req.body;

        notificationService.pushNotification(userId, notification).then(notification => {
            res.status(200).send(notification);
        })

    })

router.route('/:userId/notification/:notificationId')
    .get(function (req, res) {

    })
    .put(function (req, res) {

    })
    .delete(function (req, res) {

    })







module.exports = router;