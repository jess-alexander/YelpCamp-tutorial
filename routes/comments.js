var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/"); //automatically require index.js


// /////////////////////// // 
//  COMMENT NEW  ROUTE     // 
// /////////////////////// //
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log("COMMENTS ROUTE   /campgrounds/:id/comments/new");
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
});


// /////////////////////// // 
//  COMMENT CREATE ROUTE   // 
// /////////////////////// //
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campgroundReturned) { //lookup campground using ID
        if (err) {
            console.log("error in comment create route, campground returned: " + campgroundReturned);
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, commentCreated) { //create new comment
                if (err) {
                    console.log("Err in creating Comment. commentCreated:" + commentCreated);
                    console.log(err);
                    req.flash("error", "Something went wrong...");
                    res.redirect("back");
                } else {
                    //add username and id to comment
                    commentCreated.author.username = req.user.username; //grab the username from the isLoggedIn middleware
                    commentCreated.author.id = req.user._id;
                    commentCreated.save();

                    campgroundReturned.comments.push(commentCreated); //connect new comment to campground
                    campgroundReturned.save();
                    req.flash("success", "New Comment Added!");
                    res.redirect("/campgrounds/" + campgroundReturned._id); //redirect back to show page of current campground
                }
            });
        }
    });
});



// /////////////////////// // 
//  COMMENT EDIT ROUTE   // 
// /////////////////////// //
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log("error in comment edit route");
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});


// /////////////////////// // 
//  COMMENT UPDATE ROUTE   // 
// /////////////////////// // 
router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment) {
        if (err) {
            console.log("error in comment update route");
            req.flash("error", "Something went wrong...");
            res.redirect("back")
        } else {
            req.flash("success", "Comment Updated Successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


// /////////////////////// // 
//  COMMENT DESTROY ROUTE  // 
// /////////////////////// //
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log("error in comment destroy route");
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }

    });
});


// //////////////////////////// //
//  Authentication Middleware   // 
// //////////////////////////// //


module.exports = router;
