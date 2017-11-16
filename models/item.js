var mongoose = require("mongoose");

//checklist schema
var itemSchema = new mongoose.Schema({
    name:String, 
    crossed:Boolean
})

var Item = mongoose.model("Item",itemSchema);

module.exports = Item;