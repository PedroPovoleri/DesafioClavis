var express = require('express');
var router = express.Router();
var fileUp = require('../model/fileModel');
var cveUp = require('../model/cveModel');
var http = require('https');
var jsdom = require('jsdom');

// define the home page route
router.get('/', function(req, res) {
    fileUp.find(function (err, home) {
        res.send(home);
    });
}).get('/:id', function(req, res) {
        cveUp.find({flFrom: req.params.id}, function(err, p) {
        if (!p)
            return next(new Error('File unkow pleas try agin.'));
        else {
            res.send(p);
        }
    });
})
    .post('/', function(req,res){


    if (req.files != null || req.files != undefined) {
        var nwFl = new fileUp();
        nwFl.name = req.files.lst.name;
        nwFl.save();

        var outUrl = [];

        var host = 'https://web.nvd.nist.gov/view/vuln/detail?vulnId=';
        var result = req.files.lst.data.toString();



        var arry = req.files.lst.data.toString().split(';');

        for(var i= 0; i< arry.length; i++) {
            console.log(arry[i]);
            var url = host + arry[i];

            outUrl.push(url);

        }

        console.log(outUrl);

        for(var i = 0 ; i < outUrl.length ; i++) {
                http.get(outUrl[i], function(res) {
                        var steam ='';
                    res.on('data', function (chunk) {
                        steam += chunk;
                    });

                    res.on('end', function () {
                       // console.log(steam);

                            jsdom.env({
                                html: steam,
                                scripts: ['http://code.jquery.com/jquery-1.6.min.js']
                                , done: function(err, window) {
                                    //Use jQuery just as in a regular HTML page
                                    var $ = window.jQuery;
                                    var spans;

                                    $('div:contains("Exploitability Subscore")').each(function () {
                                        spans +=  $(this).text();
                                    });


                                    var jsonCve = spans.toString('UTF-8').split(':');
                                    jsonCve = jsonCve.toString().replace(/ /g,'');

                                    var obj = {
                                        name:String,
                                        lvl:String,
                                        impact:String
                                    };

                                    obj.name = jsonCve.toString().match(/CVE-\d{4}-\d{4,7}/g)[0];
                                    obj.lvl = jsonCve.toString().match(/(ExploitabilitySubscore,\w?[0-9]*\.?[0-9])/g)[0];
                                    obj.impact = jsonCve.toString().match(/(ImpactSubscore,\w?[0-9]*\.?[0-9])/g)[0];

                                    obj.lvl= obj.lvl.replace('ExploitabilitySubscore,','');
                                    obj.impact  = obj.impact.replace('ImpactSubscore,','');


                                    var nwcve = new cveUp();
                                    nwcve.name = obj.name;
                                    nwcve.exploitLvl = obj.lvl;
                                    nwcve.impact = obj.impact;
                                    nwcve.flFrom = nwFl._id;
                                    nwcve.save();


                                }});
                        })
                        .on('error', function (e) {
                            console.log("Got an error: ", e);
                        });
                })}









            }





        res.sendStatus(200);

});

module.exports = router;



