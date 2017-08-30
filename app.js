/*
-Get request
-Parse into JSON
-Output into index.liquid using liquid, duh
*/

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var Liquid = require('shopify-liquid');
var engine = Liquid();
var moment = require('moment');
// register liquid engine

app.engine('liquid', engine.express()); 
app.set('views', './views'); // specify the views directory 
app.set('view engine', 'liquid'); // set to default 
//get request and response
app.get('/', function(req,res){
    res.render('index');
});
app.get('/:date',function(req,res){
    if(parseInt(req.params.date)){
        //change unix to natural
       var t = new Date(parseInt(req.params.date));
       var format = moment(t).format('LL');
        res.json({date:format});
    }else{
        //change natural to unix
        res.json({date:Date.parse(req.params.date)});
    }
});
app.listen(port);