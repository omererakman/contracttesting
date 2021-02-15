const Item = require("../models/Item");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../utils/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


function ItemSchema(data) {
	this.id = data._id;
	this.name= data.name;
	this.description = data.description;
}


exports.listItems = [
	function (req, res) {
		try {
			Item.find({},"_id name description").then((items)=>{
				items = items.map(i => new ItemSchema(i));
				if(items.length > 0){
					return apiResponse.successResponseWithData(res, "Success", items);
				}else{
					return apiResponse.successResponseWithData(res, "Success", []);
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.createItem = [
	/*body("name", "Name must not be empty.").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Item.findOne({name : value}).then(item => {
			if (item) {
				return Promise.reject("Item already exist with this name.");
			}
		});
	}),*/
	//sanitizeBody("*").escape(),
	(req, res) => {
		try {
			
			const errors = validationResult(req);
			var item = new Item(
				{ 
					name: req.body.name == undefined ? "": req.body.name,
					description: req.body.description == undefined ? "": req.body.description
				});
			if (!errors.isEmpty()) {
				console.log(errors);
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				item.save(function (err) {
					if (err) {
						console.log('error saving to db: ' + err); 
						return apiResponse.ErrorResponse(res, err); 
					}
					let itemData = new ItemSchema(item);
					return apiResponse.createdResponseWithData(res,"Item add Success.", itemData);
				});
			}
		} catch (err) {
			console.log('error on create: ' + JSON.stringify(err));
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.deleteItem = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Item.findById(req.params.id, function (err, foundItem) {
				if(foundItem === null){
					return apiResponse.notFoundResponse(res,"Item not exists with this id");
				}else{
					Item.findByIdAndRemove(req.params.id,function (err) {
						if (err) { 
							return apiResponse.ErrorResponse(res, err); 
						}else{
							return apiResponse.successResponse(res,"Item delete Success.");
						}
					});
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];