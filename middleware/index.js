var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // the above line doesn't display anything. It will be displayed on the next page (the page we redirect to). 
    // the values passed in will not persist; once they have been displayed once they go away. 
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) { //is user logged in?
        Campground.findById(req.params.id, function(err, foundCampground) { //get ALL CAMPGROUND from DB
            if (err) {
                console.log("error within checkCommentOwnership middleware");
                console.log(err);
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user.id)) { // does user own the campground
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back"); //take user to the previous page
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    console.log("inside checkCommentOwnership");
    if (req.isAuthenticated()) { //is user logged in?
        Comment.findById(req.params.comment_id, function(err, foundComment) { //get ALL comment from DB
            if (err) {
                console.log("Error: checkCommentOwnership middleware");
                console.log(err);
            } else {
                console.log("no error in finding comment");
                console.log("foundComment.author.id: " + foundComment.author.id);
                console.log("req.user.id: " + req.user.id);

                if (foundComment.author.id.equals(req.user.id)) { // does user own the comment
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back"); //take user to the previous page
    }
};


module.exports = middlewareObj;
