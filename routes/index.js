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
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect('/register');
        }

        passport.authenticate('local')(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
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
router.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            req.flash("error", err);
            return next(err);
        }
        if (!user) {
            req.flash("error", "Authentication Failed, please check your username or password");
            return res.redirect('/login');
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome Back " + user.username);
            return res.redirect('/campgrounds');
        });
    })(req, res, next);
});


//--------------------//
// // logout Route // //
//--------------------//
router.get("/logout", function(req, res) {
    if (req.user) { req.flash("success", "Logout Succesful"); }
    req.logout();
    res.redirect("/campgrounds");
})


module.exports = router;
