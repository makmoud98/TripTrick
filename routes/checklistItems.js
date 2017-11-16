var express = require("express");
var router  = express.Router();
var Item    = require("../models/item");
var Users    = require("../models/user");

router.get("/checklist",isLoggedIn,function(req,res){
    //get checklist items from DB
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err);}
        if(users.length > 0){
            if(users[0].items){
                console.log("items " + users[0].items);
                var items = [];
                for(var i = 0; i < users[0].items.length; i++){
                    Item.findById(users[0].items[i],function(err,found){
                        if(!err && found){
                            items.push(found);
                        }
                        else if(err){
                            console.log(err);
                        }
                    })
                }
                setTimeout(function(){
                    res.render("checklist",{items:items,currentUser:req.user.username});//then send it to the guide pageit 
                },50);
            }
            else{
                res.render("checklist",{items:[],currentUser:req.user.username});//then send it to the guide pageit 
            }
        }
    });
});

// add new checklist item to db when click SaveChecklist

router.post("/checklist",function(req,res){
    var newitems = JSON.parse(req.body.items);
    console.log(newitems);
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err)}
        if(users.length > 0 && newitems){
            for(var i = 0; i < users[0].items.length; i++){
                Item.deleteOne({_id:users[0].items[i]},function(err){if(err){console.log(err);}
                    console.log("delete ");
                });
            }
            users[0].items = [];
            users[0].save(function(err,product,numaffected){
                if(err){console.log(err);}
                console.log(product);
                console.log("saved!");
            });
            for(var j = 0; j < newitems.length; j++){
                Item.create(newitems[j],function(err,newitem){if(err){console.log(err);}
                    users[0].items.push(newitem._id);
                        users[0].save(function(err,product,numaffected){
                        if(err){console.log(err);}
                        console.log(product);
                        console.log("saved!");
                    });
                    console.log("create");
                });
            }
            setTimeout(function(){
                console.log("render!!!");
                res.redirect("/checklist");
            },100);
        }
    });
    /*
    Users.find({username:req.user.username},function(err,users){
        if(err){console.log(err);}
        if(users.length > 0 && newitems){
            var items2 = users[0].items;
            for(var i = 0; i < newitems.length; i++){
                var found = false;
                for(var j = 0; j < users[0].items.length; j++){
                    console.log("j=" + j);
                    var id = users[0].items[j];
                    if(id == newitems[i]._id){
                        items2.splice(j,1);
                        console.log("id == id");
                        found = true;
                        Item.findByIdAndUpdate(id,newitems[i],function(err,newitem){
                            if(err){console.log(err);}
                            console.log("findandupdate");
                        });
                        break;
                    }
                }
                if(!found){
                    Item.create(newitems[i],function(err,newitem){
                       if(err){console.log(err);}
                       users[0].items.push(newitem._id);
                       users[0].save(function(err){if(err){console.log(err);}});
                       console.log("create");
                    });
                }
            }
            console.log(items2);
            for(var k = 0; k < items2.length; k++){
                Item.deleteOne({_id:items2[k]},function(err){if(err){console.log(err);}console.log("delete");});
                for(var j = 0; j<users[0].items.length;j++){
                    if(items2[k] == users[0].items[j]){
                        console.log("splice");
                        users[0].items.splice(j,1);
                        users[0].save(function(err){if(err){console.log(err);}});
                        break;
                    }
                }
            }
            setTimeout(function(){
                console.log(items2);
                console.log(users[0].items);
                console.log("render!!!");
                res.redirect("/checklist");
            },1000);
        }
    });*/
});
//preventing access to /secret when logged out
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;