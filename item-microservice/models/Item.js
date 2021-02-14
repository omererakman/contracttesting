var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: {type: String},
	description: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("items", ItemSchema);