var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that."); //"error" is the key, the second argument is the error message
    // the above line doesn't display anything. It will be displayed on the next page (the page we redirect to). 
    // the values passed in will not persist; once they have been displayed once they go away. 
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) { //is user logged in?
        Campground.findById(req.params.id, function(err, foundCampground) { //get ALL CAMPGROUND from DB
            if (err) { //error from databse - possibly couldn't find campground, or database error
                console.log("Error: checkCampgroundOwnership");
                console.log(err);
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user.id)) { // if user owns the campground, proceed. ;) 
                    next();
                } else {
                    req.flash("error", "You don't have permission to edit");
                    res.redirect("back");
                }
            }
        });
    } else { // user not logged in
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back"); //take user to the previous page
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    console.log("inside checkCommentOwnership");
    if (req.isAuthenticated()) { //is user logged in?
        Comment.findById(req.params.comment_id, function(err, foundComment) { //get comment from DB
            if (err) {
                console.log("Error: checkCommentOwnership middleware");
                console.log(err);
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            } else { //found the comment, check ownership
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to edit");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back"); //take user to the previous page
    }
};


module.exports = middlewareObj;
