var express = require('express');
var router = express.Router();
var fs  = require('fs');
var fileUp = require('../model/fileModel');
var cveUp = require('../model/cveModel');
var rq = require('../utils/reqServices');
var http = require('https');
var jsdom = require('jsdom');

// define the home page route
router.get('/', function(req, res) {
    home.find(function (err, home) {
        res.send(home);
    });
}).get('/:id', function(req, res) {
    home.findById(req.params.id, function(err, p) {
        if (!p)
            return next(new Error('File unkow pleas try agin.'));
        else {
            res.send(p);
        }
    });
}).post('/', function(req,res){


    var filePath = __dirname + '\\..\\..\\public\\files\\' + req.files.lst.name;
    var cb;
    fs.writeFile(filePath,req.files.lst.data,'utf8',function(err){
        if (err)
            return err;
    });

    if (req.files != null || req.files != undefined)
    {
            var nwFl = new fileUp();
            nwFl.name = req.files.lst.name;
            nwFl.save();
            var scss;
            var rePattern = new RegExp(/CVE-\d{4}-\d{4,7}/);
            var outUrl =  [];
            var out =  [];
            var host = 'https://web.nvd.nist.gov/view/vuln/detail?vulnId=';
            var result = req.files.lst.data.toString();

            var size = result.length -1 ;
            var body = '';
            console.log(result);
            fs.readFile(filePath, function (err1, data) {
                if (err1) {
                    console.error(err1);
                } else {
                    //var myData = JSON.parse(data);
                    console.log(data.toString().split(rePattern).length);
                    var cve = data.toString().match(rePattern);
                    console.log(data.toString().match(rePattern));
                    var  url = host + cve;
                    //req.files.lst.data.toString().repalce(cve,'');
                    outUrl.push(url);
                }
            });


        console.log(outUrl);
        for(var i = 0 ; i < outUrl.size ; i++) {
                http.get(url, function(res) {
                        var steam ='';
                    res.on('data', function (chunk) {
                        steam += chunk;
                    });

                    res.on('end', function () {
                        //console.log(steam);
                         minner(steam);
                        })
                        .on('error', function (e) {
                            console.log("Got an error: ", e);
                        });
                })}
            console.log(body);



            var minner = function mining (html){

                jsdom.env({
                    html: html,
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

                        console.log(jsonCve);

                        var obj = {
                            name:String,
                            lvl:String,
                            impact:String
                        };


                        obj.name = jsonCve.toString().match(/CVE-\d{4}-\d{4,7}/g)[0];
                        obj.lvl = jsonCve.toString().match(/(ExploitabilitySubscore,\w?[0-9]*\.?[0-9])/g)[0];
                        obj.impact = jsonCve.toString().match(/(ImpactSubscore,\w?[0-9]*\.?[0-9])/g)[0];


                        var nwcve = new cveUp();
                        nwcve.name = obj.name;
                        nwcve.exploitLvl = obj.lvl.replace('ExploitabilitySubscore,','');
                        nwcve.impact = obj.impact.replace('ImpactSubscore,','');
                        nwcve.flFrom = nwFl._id;
                        nwcve.save();
                        console.log(nwFl._id);



                    }});
                };





            }





        res.sendStatus(200);

});

module.exports = router;



