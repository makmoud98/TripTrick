var mongoose = require("mongoose");

//checklist schema
var itemSchema = new mongoose.Schema({
    lat:Number, 
    long:Number,
    zoom:Number
})

var Item = mongoose.model("Location",itemSchema);

module.exports = Item;