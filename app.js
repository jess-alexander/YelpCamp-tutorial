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
    // models    
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    User = require("./models/user.js");

//var    seedDB      = require("./seeds.js");  // seed the database
//modulate routes    
var commentRoutes = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");


// app.use will call these functions on every route
mongoose.connect("mongodb://localhost/yelp_camp_v9"); //create/connect DB
app.use(bodyParser.urlencoded({ extended: true })); //parse form data
app.set("view engine", "ejs"); //pages will all have .ejs 
app.use(express.static(__dirname + "/public")); //serve the contents in the public directory (mandatory for styling)
// seedDB();  //seed database
app.use(methodOverride("_method"));

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


app.use(function(req, res, next) { //middleware for every route
    res.locals.currentUser = req.user; // whatever we put inside res.locals is available on every template
    next();
});


app.use('/', indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// ///////////////////
//  APP LISTENER    // -- Binds and listens for connections on the specified host and port
// ///////////////////
app.listen(3000, function() {
    console.log("YelpCamp app started");
});
