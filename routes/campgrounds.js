var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
//var Comment = require("../models/comment");


// ///////////////////
//  INDEX ROUTE     //  -- SHOW ALL CAMPGROUNDS
// ///////////////////
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) { //get ALL CAMPGROUND from DB
        if (err) {
            console.log("INDEX ROUTE   /campgrounds");
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });

});



// ///////////////////
//  CREATE ROUTE    //  -- ADD NEW CAMPGROUND TO DATABSE 
// ///////////////////
router.post("/", isLoggedIn, function(req, res) {
    //this is the route to create a new campground
    // get form data (from new.ejs) and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var author = {
        id: req.user.id,
        username: req.user.username
    };

    var newCampground = { name: name, image: image, description: desc, author: author }

    //Create a new campground and save to databse
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            //send user back to the form and show a message
            console.log("CREATE ROUTE   /campgrounds");
            console.log(err);
        } else {
            console.log("newly created campground: " + newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});


// ///////////////////
//    NEW ROUTE     // -- SHOW FORM TO CREATE NEW CAMPGROUND
// ///////////////////
router.get("/new", isLoggedIn, function(req, res) { //following RESTful naming convention 
    //show the form that will send the data to the post route
    res.render("campgrounds/new");
});


// ///////////////////
//    SHOW ROUTE     // -- SHOW MORE INFO ABOUT ONE CAMPGROUND
// ///////////////////
//must be defined AFTER new route - the syntax for new and id are the same
router.get("/:id", function(req, res) {

    //find campground with provided ID
    Campground.findById(req.params.id, req.body.campground).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log("Error at SHOW ROUTE   /campgrounds:id");
            console.log(err);
        } else {
            //render show template with that campground

            res.render("campgrounds/show", { campground: foundCampground });
        }
    })

});



// ///////////////////
//  EDIT ROUTE    //  -- ADD NEW CAMPGROUND TO DATABaSE 
// ///////////////////
router.get("/:id/edit", function(req, res) {

    if (req.isAuthenticated()) { //is user logged in?
        Campground.findById(req.params.id, function(err, foundCampground) { //get ALL CAMPGROUND from DB
            if (err) {
                console.log("EDIT ROUTE   /campgrounds");
                console.log(err);
            } else {
                // does user own the campground
                //if(campground.author._id === req.user._id){}
                console.log("campground.auth.id: " + campground.author.id);
                console.log("req.user._id: " + req.user._id);

                res.render("campgrounds/edit", { campground: foundCampground });
            }
        });
    } else {
        console.log("YOU NEED TO BE LOGGED IN TO DO THAT");
        res.send("YOU NEED TO BE LOGGED IN TO DO THAT"); // if not, redirect

    }
});



// } else {
//         }

//         // otherwise redirect



// ///////////////////
//  UPDATE ROUTE    //  -- ADD NEW CAMPGROUND TO DATABaSE 
// ///////////////////
router.put("/:id", function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) { //get ALL CAMPGROUND from DB
        if (err) {
            console.log("UPDATE ROUTE   /campgrounds");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id); //display updated
        }
    });

});


// ///////////////////
//  DESTROY ROUTE    //  -- REMOVE CAMPGROUND FROMT DATABaSE 
// ///////////////////
router.delete("/:id", function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("DELETE CAMPGROUND ERROR");
            res.send("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        };
    });
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


// ///////////////////
module.exports = router;
