var querystring = require('querystring');
var http = require('http');


var host = 'http://cve.circl.lu/api/cve/';



var request = function performRequest() {

    this.findCve = function findCve(endpoint){
        var  url = host + endpoint;
        http.get(host+endpoint, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
               // var fbResponse = JSON.parse(body);
                return body;
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });

    }
};


module.exports = request;