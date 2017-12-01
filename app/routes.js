module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
    	if (req.isAuthenticated()) {
			render_landing_page(req, res)
	        //res.render('landingpage.ejs', { user: req.user }); // load the landing page
		}
		else {
	        res.render('index.ejs', { message: req.flash('loginMessage') }); // load the index.ejs file
		}
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

	function render_landing_page(req, res) {
        MongoClient.connect(dburl, function(err, db) {
            if(err) { throw err;  }

			//console.log(db.listCollections())
            db.listCollections().toArray(function(err, collInfos) {
                // collInfos is an array of collection info objects that look like:
                // { name: 'test', options: {} }

                var technology_collections_jobj = {}
                var coll_key = 'collections'
                technology_collections_jobj[coll_key] = []
                collInfos.forEach(function(col) {
                    //console.log(col.name);
                    technology_collections_jobj[coll_key].push(col.name)
                });

                //console.log(JSON.stringify(collections_jobj))
                db.close();

				// data sent while rendering landing page is different for admin and 
				// non admin users

				var editsaveDisabled;
				var deleteDisabled;
				var topic_description_tableDisabled;
				if(req.user.local.email == 'admin@gmail.com') {
					editsaveDisabled = true
					deleteDisabled = true
					topic_description_tableDisabled = true
				}
				else {
					editsaveDisabled = false
					deleteDisabled = false
					topic_description_tableDisabled = false
				}

		        res.render('landingpage.ejs', {
        		    user : req.user.local.email, // get the user out of session and pass to template
					technology_collection : technology_collections_jobj,
					editsaveDisabled : editsaveDisabled,
					deleteDisabled : deleteDisabled,
					topic_description_tableDisabled : topic_description_tableDisabled
        		});
            });
		});
}


    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // LANDING PAGE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/landingpage', isLoggedIn, function(req, res) {
	
		render_landing_page(req, res)
/*
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

		        res.render('landingpage.ejs', {
        		    user : req.user, // get the user out of session and pass to template
					collection : collections_jobj
        		});
            });
		});
*/
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/landingpage', // redirect to the landing page which lists various technologies
        failureRedirect : '/', // redirect back to the home page if there is an error
        failureFlash : true // allow flash messages
    }));

 // process the login form
    app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/landingpage', // redirect to the landing page which lists various technologies
       failureRedirect : '/', // redirect back to the home page if there is an error
       failureFlash : true // allow flash messages
    }));




	var url = require('url');
	queryString = require('querystring');

	var mongodb     = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var dburl = "mongodb://localhost:27017/db";


	// for getting topic's description search mongo's db database
	app.get('/read_description', (request, response) => {
    	response.set({'Content-Type' : 'text/html'})

	    console.log('get description')
    	//var jobj = JSON.parse(request.query.data);
	    //var topic = decodeURIComponent(jobj.topic);
	    var topic = decodeURIComponent(request.query.topic);
	    //var technology = decodeURIComponent(jobj.technology);
	    var technology = decodeURIComponent(request.query.technology);
	    console.log(technology)

	    //console.log('topic: ' + topic)
    	MongoClient.connect(dburl, function(err, db) {
	    if(err) { throw err;  }
    	var collection = db.collection(technology);

		collection.findOne({'topic': topic}, function(err, item) {
			//console.log(item.description)
            response.end(item.description);
    	})

    	});
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
            	response.send({ rows: result });

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

			collection.insert(entry, function(err, result) {
				if(err) {
					throw err;
				}

				response.end('created')
			});
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

			collection.update({topic: jobj.topic}, {topic:jobj.topic, description:jobj.description }, () => {
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


