var express = require('express');
var http = require('https');
var jsDom = require('../utils/jsDom');

var cveReader = function reader(outUrl,nwFl) {

    for(var i = 0 ; i < outUrl.length ; i++) {
        http.get(outUrl[i], function(res) {
            var steam ='';
            res.on('data', function (chunk) {
                steam += chunk;
            });

            res.on('end', function () {
                    jsDom(outUrl,nwFl,steam)
                })
                .on('error', function (e) {
                    console.log("Got an error: ", e);
                });
        })}

};


module.exports = cveReader;