var mongoose = require("mongoose");

//activity schema
var activitySchema = new mongoose.Schema({
    name:String, 
    date:String,
    time:String
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

var activity = mongoose.model("Activity",activitySchema);

module.exports = activity;