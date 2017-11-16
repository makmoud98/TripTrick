var mongoose = require("mongoose");

//memo schema
var memoSchema = new mongoose.Schema({
    desc:String,
})

var Memo = mongoose.model("Memo",memoSchema);

module.exports = Memo;