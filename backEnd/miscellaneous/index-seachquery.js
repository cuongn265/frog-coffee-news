
// for searching...
let articleJSON;
const Readable = require('stream').Readable
const s = new Readable({
    objectMode: true
})
let q = new Object;
//

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


const allArticlesRequestURL = 'https://heroku-node-angular2.herokuapp.com/api/mobiles/articles';

const ops = {
    indexPath: 'IndexStorage',
    logLevel: 'error'
}

let index;
const indexData = function (err, newIndex) {
    if (!err) {
        index = newIndex
        request(allArticlesRequestURL, function (error, response, body) {
            if (!error) {
                let articleJSON = JSON.parse(body);
                for (let key in articleJSON) {
                    if (articleJSON.hasOwnProperty(key)) {
                        s.push(articleJSON[key]);
                    }
                }
                s.push(null)
                articleJSON = JSONStream.parse(response.body);
                s.pipe(index.defaultPipeline())
                    .pipe(index.add())
                    .on('data', function (data) {})
                    .on('end', function () {

                    })

            }
        })
    }
}


require('search-index')(ops, indexData)

router.get('/search', function (req, res) {
    let titleRequest = (req.query.title).split(" ");
    console.log(titleRequest);

    let result = [];
    q.query = {
        AND: {
            'articleHeaderDescription': ['you']
        }
    }
    
    index.search(q).on('data', function (doc) {
        result.push(doc);
        //res.status(200).send(doc);
    })

    .on('end', function () {
         res.send(result);
    })
})