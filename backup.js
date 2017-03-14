const indexData = function (err, newIndex) {
    if (!err) {
        index = newIndex;
        request(allArticlesRequestURL)
      .pipe(JSONStream.parse())
      .pipe(index.defaultPipeline())
      .pipe(index.add())

        ////
        /*
        request(allArticlesRequestURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the Google homepage.
                let articleJSON = JSON.parse(body);
                s.push({
                    id: '4',
                    body: 'this doc has a much great body'
                });
                 s.push({
                    id: '3',
                    body: 'this doc has a cool great body'
                });
                 s.push({
                    id: '5',
                    body: 'this doc has a great body'
                });
                
                for (let key in articleJSON) {
                    if (articleJSON.hasOwnProperty(key)) {
                        // push object into stream
                        //s.push(articleJSON[key]);
                       

                    }
                }
                
                s.push(null);
                s.pipe(index.defaultPipeline()).pipe(index.add())
            }
            console.log('Ready to search');
        })
        */

    }
}

require('search-index')(ops, indexData)
//////////////////////////////////////////////////////////////////////////////////////
