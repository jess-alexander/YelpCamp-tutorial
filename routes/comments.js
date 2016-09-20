var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");



// /////////////////////// // 
//  COMMENT NEW  ROUTE     // 
// /////////////////////// //
router.get("/new", isLoggedIn, function(req, res) { //following RESTful naming convention 
    Campground.findById(req.params.id, function(err, campground) {
        console.log(req.params.id);
        if (err) {
            console.log("COMMENTS ROUTE   /campgrounds/:id/comments/new");
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
});


// /////////////////////// // 
//  COMMENT CREATE ROUTE   // 
// /////////////////////// //
router.post("/", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campgroundReturned) { //lookup campground using ID
        if (err) {
            console.log("COMMENTS ROUTE   /campgrounds/:id/comments");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, commentCreated) { //create new comment
                if (err) {
                    console.log("Err in creating Comment");
                    console.log(err);
                } else {
                    //add username and id to comment
                    commentCreated.author.username = req.user.username; //grab the username from the isLoggedIn middleware
                    commentCreated.author.id = req.user._id;
                    commentCreated.save();

                    campgroundReturned.comments.push(commentCreated); //connect new comment to campground
                    campgroundReturned.save();
                    res.redirect("/campgrounds/" + campgroundReturned._id); //redirect back to show page of current campground
                }
            });
        }
    });
});



// /////////////////////// // 
//  COMMENT EDIT ROUTE   // 
// /////////////////////// //
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log("ERR IN COMMENT EDIT ROUTE");
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});


// /////////////////////// // 
//  COMMENT UPDATE ROUTE   // 
// /////////////////////// // 
router.put("/:comment_id/", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


// /////////////////////// // 
//  COMMENT DESTROY ROUTE  // 
// /////////////////////// //
router.delete("/:comment_id", function(req, res) {
    res.send("you have reached the delete route");
});


// ///////////////////
//  Authentication Middleware      // 
// ///////////////////
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
