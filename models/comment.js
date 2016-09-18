var mongoose    = require("mongoose");

var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId, //see campground, comments object 
			ref:"User"
		},
		username: String
	} //will eventually be a reference to a user model. Can only do this with a non-relational database

});


module.exports = mongoose.model("Comment", commentSchema);
