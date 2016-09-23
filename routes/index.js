var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");



// ///////////////////
//  Landing ROUTE     //  
// ///////////////////
router.get("/", function(req, res) {
    res.render("landing");
});


// ///////////////////
//  Auth routes     // 
// ///////////////////


//--------------------------//
// // show register form // //
//--------------------------//
router.get("/register", function(req, res) {
    res.render("register");
});


//----------------------------//
// // handle sign-up logic // //
//----------------------------//
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) { //storing the Username, not the password. The register method will instead store HASH in password's place. 
        if (err) {
            console.log("sign-up logic " + err);
            req.flash("error", err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


//-----------------------//
// // show login form // //
//-----------------------//
router.get("/login", function(req, res) {
    res.render("login");
});


//--------------------------//
// // handle login logic // //
//--------------------------//
router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login" }), function(req, res) {
    //router.post("/something", middleware, callback)
});


//--------------------//
// // logout Route // //
//--------------------//
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})


module.exports = router;
