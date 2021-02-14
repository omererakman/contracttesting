var express = require("express");
const ItemController = require("../controllers/ItemController");

var router = express.Router();

router.get("/", ItemController.listItems);
router.post("/", ItemController.createItem);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;