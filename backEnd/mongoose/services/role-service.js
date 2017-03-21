/** Role Service */
let Role = require('../models/role-model');
let User = require('../models/user-model');
let ObjectId = require('mongoose').Types.ObjectId;

let Q = require('q');
let deffered = Q.defer();

module.exports = {
    /** Find one role */
    findOne: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Role.findById(documentId, function(err,doc){
                if(err) return callback(err);
                return callback(null,doc);
            })
        }
    },

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