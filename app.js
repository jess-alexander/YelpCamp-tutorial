/*  ISSUES
 *  Create & fill price per campground
 *  finish up the campground show page
 *  Create & fill googlemaps field, then populate on show page
 *  
 */

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    // models    
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    User = require("./models/user.js"),
    port = process.env.PORT;
/////////////////////////////////////////////////////////////////////////
//  start new databse, create a new user, THEN seed with campgrounds   //
// var    seedDB      = require("./seeds.js");  // seed the database   //
// seedDB();                                                           //
/////////////////////////////////////////////////////////////////////////

//modulate routes    
var commentRoutes = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");

//passport config
app.use(require("express-session")({
    secret: "I'm gonna nail this programming thing",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // User.authenticate comes with the passport plugin inside user.js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash()); //requires sessions, place below passport config
//end passport config

mongoose.connect(process.env.DATABASEURL); //create/connect local DB

// app.use will call these functions on every route
app.use(bodyParser.urlencoded({ extended: true })); //parse form data
app.set("view engine", "ejs"); //pages will all have .ejs
app.use(express.static(__dirname + "/public")); //serve the contents in the public directory (mandatory for styling)
app.use(methodOverride("_method"));
app.use(function(req, res, next) { //middleware for every route
    res.locals.currentUser = req.user; // whatever we put inside res.locals is available on every template
    res.locals.error = req.flash("error"); //error message needs to be available from the header on every template
    res.locals.success = req.flash("success");
    next();
});


//set up RESTFUL Routing shortcut
app.use('/', indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// ///////////////////
//  APP LISTENER    // -- Binds and listens for connections on the specified host and port
// ///////////////////
app.listen(port, function() {
    console.log("Jess's YelpCamp app started on port: " + port);
});
