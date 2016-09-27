var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
/////////////////////////////////////////////////////////////////////////
//  start new databse, create a new user, THEN seed with campgrounds   //
/////////////////////////////////////////////////////////////////////////
var seedData = [{
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { id: , username: },
    comments: []
}, {
    name: "Semore Pine",
    image: "https://farm9.staticflickr.com/8618/16684264666_159e352cc0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { id: , username: },
    comments: []
}, {
    name: "Grassy Pasture",
    image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { id: , username: },
    comments: []
}, {
    name: "Shady Rays",
    image: "https://farm8.staticflickr.com/7029/6765419675_9f605132bf.jpg",
    description: "",
    author: { id: , username: },
    comments: []
}, {
    name: "Brambleberry Brier",
    image: "https://farm3.staticflickr.com/2721/4491422202_46d8c1ca7a.jpg",
    description: "",
    author: { id: , username: },
    comments: []
}, ];

function seedDB() {
    console.log("Wipe, then Seed Database")
        //remove all campgrounds
    Campground.remove({}, function(err) {
        // if(err){
        // 	console.log(err);
        // }else{
        // 	//console.log("Removed Campgrounds");
        // 	//add a few campgrounds AFTER deleting campgrounds
        // 	seedData.forEach(function(seed){
        // 		Campground.create(seed, function(err, campgroundCreated){
        // 			if(err){
        // 				console.log(err);
        // 			} else {
        // 				//console.log("Added a campground");
        // 				//create a comment on each campground (same comment on each)
        // 				Comment.create({
        // 					text: "I've been here, it was amazing. I received one night of camping in exchange for this review. This review reflects my own unbiased thoughts. (believe me?)",
        // 					author: "MoneyTalks"
        // 				}, function(err, commentCreated){
        // 					if (err){
        // 						console.log(err);
        // 					} else { //associate comment to the campground, push it into the array, then save the campground
        // 						campgroundCreated.comments.push(commentCreated);
        // 						campgroundCreated.save();
        // 						//console.log("created new comment");
        // 					}
        // 				})
        // 			}
        // 		});
        // 	});
        // }
    });
}

module.exports = seedDB;
