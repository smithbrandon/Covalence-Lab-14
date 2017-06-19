var path = require('path');
var fs = require('fs');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;
var serverUrl = "localhost";

console.log("Starting web server at " + serverUrl + ":" + port);

// var urlData = url.parse(req.url, true);
var clientPath = path.join(__dirname, '..','client' );
app.use(express.static(clientPath));

app.use(bodyParser.json());
//api routes for get and post
app.route('/api/chirps')
    .get(function(req, res){
        res.sendFile(path.join(__dirname,'data.json'));
    })
    .post(function(req, res){
        fs.readFile('server/data.json','utf8', 
        function(err, data){
            if(err){
                console.log(err);
            }else{
                var inputData = JSON.parse(data);
                inputData.push(req.body);
                json = JSON.stringify(inputData);
                fs.writeFile('server/data.json', json, 'utf8',function(err,data){
                    if(err){
                        console.log(err);
                    }else{
                        res.status(201).end(data);      
                    }
                });
            }
        });
    });

app.listen(3000);