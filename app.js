var  express               =      require("express");
var  app                   =      express();
var  request               =      require("request");
var  bodyParser            =      require("body-parser");
var  mongoose              =      require("mongoose");

var  methodOverride        =      require('method-override');
var  passport              =      require("passport");
var  LocalStrategy         =      require("passport-local");
var  passportLocalMongoose =      require("passport-local-mongoose");
const { Passport } = require("passport");




mongoose.connect("mongodb+srv://stockbenefit:stockbenefit@cluster0.gl7nr.mongodb.net/<dbname>?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true});
//mongoose.connect("mongodb://localhost:27017/newwatchlist", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));


//WATCHLIST MODEL
var watchlistSchema = new mongoose.Schema({
    name: String
});

var Watchlist = mongoose.model("Watchlist", watchlistSchema);
var  User =  require("./models/user");

//PASSPORT
app.use(require("express-session")({
    secret : "Once again Rusty wins cutest dog",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Watchlist.create({
//     name: "GOOG"
// }, function(err, watchlist){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("NEWLY ADDED STOCK: ");
//         console.log(watchlist);
//     }
// });

//=================================================================================================================
//AUTH ROUTES

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/search");
        })
    })
});


app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",
    {
        successRedirect:"/search",
        failureRedirect: "/login"
    }), function(req, res){
});
//=================================================================================================================
app.get("/",function(req,res){
    currentUser = req.user;
    res.render('homenew.ejs', {currentUser: currentUser});
});

app.get("/search", function(req, res) {
    // console.log(req.user["username"]);
    currentUser = req.user;
    res.render("search", {currentUser: currentUser});
});

app.get("/watchlist",isLoggedIn, function(req,res){
    // Watchlist.find({}, function(err, watchlist){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render("watchlist", {watchlist:watchlist});
    //     }
    // })
    currentUser = req.user["username"];
    User.findOne({username:currentUser}).populate("stocks").exec(function(err, user){
        if(err){
            console.log(err);
        } else {
            
            watchlist = user["stocks"];
            res.render("watchlist", {watchlist:watchlist});
        }
    });
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var type = req.query.type;
    currentUser = req.user;
    if (type=="TIME_SERIES_DAILY") {
        var x ="Time Series (Daily)"
        var y ="Today"
    } else if (type == "TIME_SERIES_WEEKLY") {
        var x ="Weekly Time Series"
        var y ="Week"
    } else {
        var y = "Month"
        var x ="Monthly Time Series"
    }
    var url = "https://www.alphavantage.co/query?function=" + type + "&symbol=" + query + "&interval=5min&apikey=WTVA4J04YDV2HJKM";
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);

            if (typeof data["Error Message"] !== "undefined" ){
                // Error
                res.render("notfound",{currentUser:currentUser});
            }
            else {
                // correct API
                res.render("results",{query:query, data:data[x][Object.keys(data[x])[0]], y:y, currentUser:currentUser });
            }


        } else {
            // showErr(error);
            res.render("notfound",{currentUser:currentUser});
        }
    });
});

//POST ROUTE FOR ADDING THE SHARE TO WATCHLIST
app.post("/addtowatchlist",isLoggedIn,function(req,res){
    var name = Object.keys(req.body)[0];
    currentUser = req.user["username"];
    // console.log(currentUser);
    // console.log(name);
    var newStock = {name:name};
    Watchlist.create(newStock, function(err, newlyCreated){
        User.findOne({username:currentUser}, function(err, foundUser){
            if(err){
                console.log(err);
            } else{
                foundUser.stocks.push(newlyCreated);
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else{
                        res.redirect("/watchlist");
                    }
                });
            }
        }); 
    });
});


//DELETE ROUTE FOR DELETING THE WATCHLIST
app.delete("/watchlist", function(req,res){
    currentUser = req.user["username"];
    var name = Object.keys(req.body)[0];
    User.findOne({username:currentUser}).populate("stocks").exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.updateOne(
                { $pull: { stocks: name } },function(err){
                    if(err){
                        res.redirect("/watchlist");
                    }
                    else{
                        res.redirect("/watchlist");
                    }
                }
              );
        }
    });


});

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// app.listen(3000,function()
// {
//     console.log("Severed Started");
// });

app.listen(process.env.PORT,process.env.IP);