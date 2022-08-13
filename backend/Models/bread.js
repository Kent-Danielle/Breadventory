const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
	bread: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
	},
	orderHistory: [mongoose.ObjectId],
});

module.exports = mongoose.model("bread", breadSchema);
