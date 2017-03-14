// insert new document
db.articles.insertOne({
    "title": "National Geographic’s Mars imagines the planet first colonists",
    "description": "New miniseries mixes present-day documentary with a fictional mission.",
    "created_by": "(userID)",
    "date": "2016-11-13 02:48:50",
    "header_image": "http://assets1.ignimgs.com/2016/04/13/gearsofwar41280jpg-6847d9_1280w.jpg",
    "content": "",
    "author": "Alex Roth",
    "source": "IGN",
    "upvoters": [
        0,
        1,
        2
    ],
    "downvoters": [
        3,
        4,
        5
    ],
    "deleted_at": "",
    "category": ObjectId("58bbd641dad21c772e298d44")
})

// remove document with condition
db.categories.remove({})

// insert new field to document (set to insert key-value pair, push: insert array)
db.articles.update({ _id: ObjectId("58bbd3fba984466cd23bb656")}, {$set: { category2: ObjectId("58bbd641dad21c772e298d44") } })

// remove a field in document ($unset)
db.articles.update({_id: ObjectId("58bbd3fba984466cd23bb656")}, {$unset: {category:""}})

// rename key name in document (two condition: upsert - multi)
db.articles.update({},{$rename:{"category2":"category"}}, false, true)

