module.exports = function(app) {
	var url = require('url');
	queryString = require('querystring');

	var mongodb     = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var dburl = "mongodb://localhost:27017/db";


	// for getting topic's description, search mongo's db database
	app.get('/read_description', (request, response) => {
    	response.set({'Content-Type' : 'text/json'})

	    console.log('get description')
    	//var jobj = JSON.parse(request.query.data);
	    //var topic = decodeURIComponent(jobj.topic);
	    var topic = decodeURIComponent(request.query.topic);
	    //var technology = decodeURIComponent(jobj.technology);
	    var technology = decodeURIComponent(request.query.technology);
	    console.log(technology)

	    console.log('topic: ' + topic)
    	MongoClient.connect(dburl, function(err, db) {
	    if(err) { throw err;  }
    	var collection = db.collection(technology);

		collection.findOne({'topic': topic}, function(err, item) {
			//console.log(item.description)
            response.json({description : [item.description, item.program]});
    	})

    	});
	});

	app.get('/create_collection', (request, response) => {

	    var col_name = decodeURIComponent(request.query.col_name);
		console.log(col_name);

    	MongoClient.connect(dburl, function(err, db) {
	    	if(err) { throw err;  }

    		db.listCollections({name: col_name}).toArray(function(err, items) {
      			if(! items.length) {
					console.log('collection to be created');

					db.createCollection(col_name, function(err, results) {
      					console.log("Collection created.");
        				db.close();
		    		});

           			response.json({created : [1]});
				}
				else {
					console.log('collection already exists');
            		response.json({created : [0]});
				}

			});

    	})

	});

    app.get('/delete_collection', (request, response) => {

        var col_name = decodeURIComponent(request.query.col_name);
        console.log(col_name);

        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }

            db.listCollections({name: col_name}).toArray(function(err, items) {
                if(items.length) {
                    console.log('collection to be deleted');

                    db.collection(col_name).drop(function(err, delOK) {
                        if (err) throw err;
                        if (delOK) console.log("Collection deleted");
                    });

                    response.json({deleted : [1]});
                }
                else {
                    console.log("collection doesn't exists");
                    response.json({deleted : [0]});
                }

            });

        })

    });


    app.post('/run_program', (request, response) => {

        var encoding = require("encoding");

        response.set({'Content-Type' : 'text/html'})
        console.log(request.body.data)
        var jobj = JSON.parse(request.body.data)
        var prog = decodeURIComponent(jobj.program)
        prog = prog.replace(/<br>/g, "\n")
        prog = encoding.convert(prog, 'ASCII', 'UTF-8');
        console.log(prog.toString());

        var prog_input = decodeURIComponent(jobj.prog_input)
        prog_input = prog_input.replace(/<br>/g, "\n")
        prog_input = prog_input.replace(/<br>/g, "\n")
        prog_input = encoding.convert(prog_input, 'ASCII', 'UTF-8');
        console.log(prog_input.toString());

        var fs = require('fs');
        fs.writeFileSync("/tmp/test.cpp", prog);

        console.log("The file was saved!");

        var cp = require('child_process');

        var command = 'g++';
        var args = ['/tmp/test.cpp', '-o', '/tmp/test', '-std=c++11', '-lpthread' ];

        var childProcess = cp.spawnSync(command, args, {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8'
        });


        if(childProcess.status) {
            response.send(childProcess.stderr);
        }
        else {
            var command = '/tmp/test';
            var args = [''];

        var input = prog_input
        console.log('prog_input: ' + prog_input);
            var childProcess = cp.spawnSync(command, args, {
                cwd: process.cwd(),
                env: process.env,
                stdio: 'pipe',
                input: input,
                encoding: 'utf-8'
            });

            if(!childProcess.status) {
                response.send(childProcess.stdout);
            }
            else {
                response.send('Some error occured');
            }
        }
    });


    // for getting topic's description search mongo's db database
    // search specifically in collection whose name is given by topic param
    // of GET request
    app.get('/list_topics', (request, response) => {
        // set http header content type
        response.set({'Content-Type' : 'text/html'})

        var jsonObj;
        var topics_represent_file; // html content (which forms table of topics at client side) to be sent to client
        var technology = request.query.technology; // database collection name
        console.log('technology: ' + technology)
        var leave_function; // used for closure

        // connect to mongo database with name 'db'
        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }
            var collection = db.collection(technology);

            db.listCollections({name: technology})
                        .next(function(err, collection_info) {
                    if(!collection_info)
                    {
                        response.end('no_collection')
                        leave_function = true;
                    }
            });

            db.collection(technology).find({}, { _id: false, topic: true }).toArray(function(err, result) {

                if(leave_function)
                {
                    console.log('leaving...');
                    return;
                }

                response.setHeader('Content-Type', 'application/json');
                response.send({ list : result });

            });
        });
    });

    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


    app.delete('/delete_topic', (request, response) => {
        response.set({'Content-Type' : 'text/html'})

        //var jobj = JSON.parse(request.body.data)
        //console.log('selected: ' + jobj.topic)

        var topic = request.body.topic
        var technology = request.body.technology

        console.log(topic)
        console.log(technology)

        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }
            var collection = db.collection(technology);
            //var product = { topic: jobj.topic,  description: jobj.description };

            //var topic = decodeURIComponent(jobj.topic);
            console.log('topic: ' + topic);
            try {
                collection.remove({topic: topic}, function(err, obj) {
                    if (err) {
                        console.log('remove error: ' + err)
                        return;
                    }

                    console.log('deletion succeeded');
                    response.end('deleted');
                });
            }
            catch(excep) {
                console.log('remove: ' + excep)
            }


        });
    });



    // create a new topic with its description
    app.post('/create_topic', (request, response) => {
        response.set({'Content-Type' : 'text/html'})

        console.log(request.body.data)
        var jobj = JSON.parse(request.body.data)

        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }
            var entry = { topic: jobj.topic,  description: jobj.description };
            var technology = jobj.technology
            var collection = db.collection(technology);

            collection.findOne({'topic': jobj.topic}, function(err, item) {

                if(item == null) {
                    collection.insert(entry, function(err, result) {
                        if(err) {
                            throw err;
                        }

                        response.end('created')
                    });
                }
            })
        });

    });


    // update topic's description
    app.post('/update_description', (request, response) => {
        response.set({'Content-Type' : 'text/html'})

        console.log(request.body.data)
        var jobj = JSON.parse(request.body.data)

        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }
            var technology = jobj.technology
            var collection = db.collection(technology);
            var description = jobj.description
            var program = jobj.program

            collection.update({topic: jobj.topic}, {topic:jobj.topic, description:jobj.description, program:jobj.program }, () => {
                response.end('overwritten')
            });
        });

    });


    app.get('/tech_collections', (request, response) => {

        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }

            //console.log(db.listCollections())
            db.listCollections().toArray(function(err, collInfos) {
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }

                var collections_jobj = {}
                var coll_key = 'collections'
                collections_jobj[coll_key] = []
                collInfos.forEach(function(col) {
                    //console.log(col.name);
                    collections_jobj[coll_key].push(col.name)
                });

                //console.log(JSON.stringify(collections_jobj))
                db.close();
                response.json(collections_jobj);
            });
        });
    });


}
