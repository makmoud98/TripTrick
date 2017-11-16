var express = require("express");
var router  = express.Router();
var Users   = require("../models/user");
var Activity= require("../models/activity");

router.get("/calendar",isLoggedIn,function(req,res){
    //query departing/arriving dates
    //query activity info from the user here
    var events = [];
    Users.find({username:req.user.username}, function(err,user){
        if(err){console.log(err);}
        if(user.length > 0){
            if(user[0].departing){
                //console.log(user[0].departing);
                events.push({title:"Departure",start:(user[0].departing + "T00:00:00")});
            }
            if(user[0].returning){
                //console.log(user[0].returning);
                events.push({title:"Returning",start:(user[0].returning + "T00:00:00")});
            }
            var currentlen = events.length;
            if(user[0].activities){
                for(var i = 0; i < user[0].activities.length; i++){
                    Activity.findById(user[0].activities[i], function(err, found){
                        if(!err && found){
                            events.push({title:found.name,start:(found.date + "T" + found.time + ":00")});
                        }
                    });
                }
            }
            setTimeout(function(){
                if(user[0].activities.length != events.length-currentlen){
                    console.log("didnt have enough time to query all date");
                }
                res.render("calendar",{events:events,currentUser:req.user.username});
            },50);
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;