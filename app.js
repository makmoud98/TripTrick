var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Item                    = require("./models/item"),
    Memo                    = require("./models/memo"),
    User                    = require("./models/user"),
    checklistRoutes         = require("./routes/checklistItems"),
    memoRoutes              = require("./routes/memoItems"),
    guideRoutes             = require("./routes/guideRoute"),
    calendarRoutes             = require("./routes/calendarRoute"),
    //will eventually need a final itinerary route to move the info over
    indexRoutes             = require("./routes/index");


mongoose.Promise = require('bluebird');
//connect to db 
mongoose.connect("mongodb://localhost/auth_app");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Elephants can fly",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(checklistRoutes);
app.use(memoRoutes);
app.use(guideRoutes);
app.use(indexRoutes);
app.use(calendarRoutes);


app.get("/final_itinerary",function(req, res) {
    res.render("final_itinerary",{currentUser:req.user.username});
});

app.get("/calendar",function(req, res) {
    res.render("calendar");
});


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server is running!");
});

