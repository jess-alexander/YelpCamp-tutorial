var mongoose    = require("mongoose");


//SCHEME SETUP // TO BE REFRACTERED!!! 
var campgroundScehema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
    	{ //reference to comment model
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "Comment"
    	}
    ],
    author: {  //reference to user model
		id:{
			type: mongoose.Schema.Types.ObjectId, 
			ref:"User"
		},
		username: String
	}
});

module.exports = mongoose.model("Campground", campgroundScehema); //compile the Schema "blueprint" into a model - code we can use that has methods
