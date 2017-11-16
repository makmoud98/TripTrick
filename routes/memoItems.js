// this script is mostly a copy of the checklist.js
var express = require("express"); 
var router  = express.Router();
var Memo    = require("../models/memo");
var Users    = require("../models/user");

router.get("/memos",isLoggedIn,function(req,res){
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err);}
        if(users.length > 0){
            if(!users[0].memos){
                res.render("checklist",{memos:{},currentUser:req.user.username});//then send it to the guide pageit 
            }
            else{
                res.render("checklist",{memos:users[0].memos,currentUser:req.user.username});
            }
        }
    });
});

router.post("/memos",function(req,res){
    var newmemos = JSON.parse(req.body.memos);
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err);}
        if(users.length > 0){
            users[0].memos = newmemos;
        }
    });
    res.redirect("/memos");
});
//preventing access to /secret when logged out
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;