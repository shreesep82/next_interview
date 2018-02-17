module.exports = function(app, passport) {

var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017/db";
var url = require('url');
queryString = require('querystring');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        if (req.isAuthenticated()) { 
            render_landing_page(req, res)
            //res.render('landingpage.ejs', { user: req.user }); // load the landing page
        }
        else {
            //res.render('index.ejs', { message: req.flash('loginMessage') }); // load the index.ejs file
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
                var add_topic_tableDisabled;
                if(req.user.local.email == 'admin@gmail.com') {
                    editsaveDisabled = true
                    deleteDisabled = true
                    add_topic_tableDisabled = true
                }
                else {
                    editsaveDisabled = false
                    deleteDisabled = false
                    add_topic_tableDisabled = false
                }
                res.render('landingpage.ejs', {
                    user : req.user.local.email, // get the user out of session and pass to template
                    technology_collection : technology_collections_jobj,
                    editsaveDisabled : editsaveDisabled,
                    deleteDisabled : deleteDisabled,
                    add_topic_tableDisabled : add_topic_tableDisabled
                });
            });
        });
    }

	require('../vars')

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // LANDING PAGE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/landingpage', isLoggedIn, function(req, res) {
		//console.log('user: ' + req.user.local.email)
		if(term[req.user.local.email] != undefined) {
			console.log('closing term for ' + req.user.local.email)
			term[req.user.local.email].write('exit\n');
		}
        render_landing_page(req, res)
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
		//console.log('user: ' + socket[req.user.local.email])
		if(term[req.user.local.email] != undefined) {
			console.log('closing term for ' + req.user.local.email)
			term[req.user.local.email].write('exit\n');
		}
		//console.log('user: ' + socket)
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

}
