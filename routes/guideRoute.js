var express = require("express");
var router  = express.Router();
var Location= require("../models/location");
var Users   = require("../models/user");
var Activity= require("../models/activity");

router.get("/guide_page",isLoggedIn,function(req,res){
    //query map url info from the user here
    //query activity info from the user here
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err);}
        if(users.length > 0){
            if(!users[0].location){
                var newloc = {lat:41.8336479,long:-87.8722368, zoom:5.0};
                Location.create(newloc,function(err, loc){
                    if(err){console.log(err);}
                    users[0].location = loc._id;
                    users[0].save(function(err,product,numaffected){
                        if(err){console.log(err);}
                    });
                });
                res.render("guide_page",{location:newloc,currentUser:req.user.username});
            }
            else{
                Location.findById(users[0].location,function(err,found){
                    if(!err && found){
                        res.render("guide_page",{location:found,currentUser:req.user.username});
                    }
                    else{
                        res.render("guide_page",{location:{},currentUser:req.user.username});
                    }
                })
            }
        }
    });
});

router.post("/guide_page",function(req,res){
    if(req.body.type){
        var type = req.body.type;
        if(type == "map"){
            var newlocation = JSON.parse(req.body.location);
            Users.find({username:req.user.username},function(err,users){
                if(err){console.log(err);}
                if(users.length > 0){
                    if(users[0].location){
                        Location.findByIdAndRemove(users[0].location, function(err){if(err){console.log(err);}
                            Location.create(newlocation,function(err, loc){
                                if(err){console.log(err);}
                                users[0].location = loc._id;
                                users[0].save(function(err,product,numaffected){
                                    if(err){console.log(err);}
                                    res.render("guide_page",{location:newlocation,currentUser:req.user.username});
                                });
                            });
                        });
                    }
                }
            });
        }
        else if(type == "flight"){
            var departing = req.body.departing;
            var returning = req.body.returning;
            
            Users.find({username:req.user.username},function(err, users){
                if(err){
                    console.log(err);
                }
                if(users.length > 0){
                    if(departing && departing != ""){
                        users[0].departing = departing;
                    }
                    if(returning && returning != ""){
                        users[0].returning = returning;
                    }
                    users[0].save(function(err,product,numaffected){
                        if(err){console.log(err);}
                    });
                }
            });
        }
        else if(type == "activity"){
            var name = req.body.name;
            var date = req.body.date;
            var time = req.body.time;
            if(name && name != "" && date && date != "" && time && time != ""){
                var newactivity = {name:name,date:date,time:time};
                Users.find({username:req.user.username},function(err, users){
                    if(err){
                        console.log(err);
                    }
                    if(users.length > 0){
                        Activity.create(newactivity,function(err, act) {
                            if(err){console.log(err);}
                            users[0].activities.push(act._id);
                            users[0].save(function(err,product,numaffected){
                                if(err){console.log(err);}
                            });
                        })
                    }
                });
            }
        }
    }
    
    res.redirect("/guide_page");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;