let express = require('express');
let Router = express.Router();


let roleService = require('../mongoose/services/role-service');

/** NOT IMPLEMENTED !!! */
Router.route('/')
    .get(function(req,res){
        let userId = req.query.queryby;
        roleService.findAll
    })

    .post(function(req,res){
        let userId = req.query.queryby;
    })
    .put(function(req,res){
        let userId = req.query.queryby;
    })
    .delete(function(req,res){
        let userId = req.query.queryby;
    })


module.exports = Router;