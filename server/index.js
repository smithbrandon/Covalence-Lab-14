var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

console.log("Starting web server at localhost:3000");

var clientPath = path.join(__dirname, '..','client' );
var dataPath = path.join(__dirname, 'data.json');

app.use(express.static(clientPath));
app.use(bodyParser.json());

//api routes for get and post
app.route('/api/chirps')
    .get(function(req, res){
        res.sendFile(dataPath);
    }).post(function(req, res){
        fs.readFile(dataPath,'utf8', function(err, data){
            if(err){
                console.log(err);
            }else{
                var inputData = JSON.parse(data);
                inputData.push(req.body);
                json = JSON.stringify(inputData);
                fs.writeFile(dataPath, json, 'utf8',function(err, data){
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