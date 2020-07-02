var express = require("express");
var app = express();
var request = require("request");
const { response } = require("express");
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/",function(req,res){
    res.render('homenew.ejs');
});

app.get("/search", function(req, res) {
    res.render("search");
});

app.get("/watchlist", function(req,res){
    res.render("watchlist");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var type = req.query.type;

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
    console.log(type);
    var url = "https://www.alphavantage.co/query?function=" + type + "&symbol=" + query + "&interval=5min&apikey=WTVA4J04YDV2HJKM";
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(Object.keys(data[x])[0]);
            console.log(data[x][Object.keys(data[x])[0]]);
            res.render("results",{query:query, data:data[x][Object.keys(data[x])[0]], y:y });
        } else {
            showErr(error);
        }
    });
});



app.listen(3000,function()
{
    console.log("Severed Started");
});
