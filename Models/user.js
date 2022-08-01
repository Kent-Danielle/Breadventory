const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: [3, "Username length must exceed 3 characters"],
		maxLength: [50, "Username length cannot exceed 50 characters"],
	},
	password: {
		type: String,
		required: true,
	},
	isApproved: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("user", userSchema);
