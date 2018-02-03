

module.exports = function(app, passport) {

	require('./login_signup-routes.js')(app, passport)

	require('./tech_db_routes.js')(app)

}



