/** Role Service */
let Role = require('../models/role-model');
let User = require('../models/user-model');
let ObjectId = require('mongoose').Types.ObjectId;

let Q = require('q');
let deffered = Q.defer();

/** Only Adminstrator user can perform query on roles */
module.exports = {
    /** Validate if the user is administrator */
    isAdministrator: function(userId, callback){       
        // let queries = {
        //     _id: userId,
        //     role: ""
        // }
        console.log(userId);
        User.findById(userId, function(err,doc){
            if(err) return calback(err);
            else {
                console.log(doc);
                return callback(null);
            }
        });
    },
    

    /**Get administrator ObjectId */
    getAdminObjectId: function(callback){
        if(err) return deffered.reject(err);
        else {
            Role.findOne({name: 'Adminstrator'}, function(err,doc){
                if(err) return deffered.reject(err);
                return deffered.resolve(doc._id);
            });
            return deffered.promise();
        }
    },

    /** Find one role */
    findOne: function (documentId, callback) {
        let check = this.isAdministrator()
        if (ObjectId.isValid(documentId)) {
            Role.findById(documentId, function (err, doc) {
                if (err) return callback(doc);
                return callback(null, doc);
            });
        }
    },

    /**  */

    findAll: function (callback) {
        Role.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
    },

    /** Sava new role */
    save: function (document, callback) {
        let role = new Role(document);
        role.save(function (err) {
            if (err) return callback(err);
            else {
                return callback(null);
            }
        });
    },

    /** Update role */
    update: function (documentId, document, callback) {
        if (ObjectId.isValid(documentId)) {
            Role.findByIdAndUpdate(documentId, document, function (err) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null);
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** remove article*/
    remove: function(documentId, callback){
        if(ObjectId.isValid(documentId)){
            Role.findByIdAndRemove(documentId, function(err){
                if(err) return callback(err);
                else{
                    return callback(null);
                }
            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    }
}