var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User    = require("../models/user");
//=========
//ROUTES
//=========
router.get("/guide_page",isLoggedIn,function(req, res) {
    res.render("guide_page",{currentUser:req.user.username});
});

//Auth routes
router.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/guide_page");
        });
    });
});
// LOGIN ROUTES
//render login form
router.get("/", function(req, res){
   res.render("home"); 
});
//login logic
//middleware
router.post("/", passport.authenticate("local", {
    successRedirect: "/guide_page",
    failureRedirect: "/"
}) ,function(req, res){
});
//log out
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});
//preventing access to /secret when logged out
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}
 module.exports = router;
 
 function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); 
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // need direction to guide_page
}
