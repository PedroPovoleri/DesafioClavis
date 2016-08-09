var express = require('express');
var router = express.Router();
var fileUp = require('../model/fileModel');
var cveUp = require('../model/cveModel');
var http = require('https');
var jsdom = require('jsdom');
var pth = require('path');

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

        if(pth.extname(req.files.arq.name.toString()) == '.txt'){
            var nwFl = new fileUp();
            nwFl.name = req.files.arq.name;


        var outUrl = [];

        var host = 'https://web.nvd.nist.gov/view/vuln/detail?vulnId=';

        var arry = req.files.arq.data.toString().split(';');

        for(var i= 0; i< arry.length; i++) {

            var url = host + arry[i];
            outUrl.push(url);
        }

        for(var i = 0 ; i < outUrl.length ; i++) {
                http.get(outUrl[i], function(res) {
                        var steam ='';
                    res.on('data', function (chunk) {
                        steam += chunk;
                    });

                    res.on('end', function () {
                            jsdom.env({
                                html: steam,
                                scripts: ['http://code.jquery.com/jquery-1.6.min.js']
                                , done: function(err, window) {
                                    //Use jQuery just as in a regular HTML page
                                    var $ = window.jQuery;
                                    var spans;

                                    $('.cvss-detail').each(function () {
                                        spans +=  $(this).text();
                                    });
                                    var cveName = $('h3').text();

                                    if(spans != undefined)
                                        var jsonCve = spans.toString('UTF-8').split(':');
                                    else
                                        res.end();

                                    jsonCve = jsonCve.toString().replace(/ /g,'');
                                    jsonCve = jsonCve.toString().replace(/\n/g,'');
console.log(jsonCve);
                                    if(jsonCve.toString().match(/(ExploitabilityScore,\w?[0-9]*\.?[0-9])/g) != null){
                                        nwFl.save();
                                        var nwcve = new cveUp();
                                        nwcve.name =cveName.match(/CVE-\d{4}-\d{4,7}/g)[0];
                                        nwcve.exploitLvl = jsonCve.toString().match(/(ExploitabilityScore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.exploitLvl = nwcve.exploitLvl.replace('ExploitabilityScore,','');
                                        nwcve.impact =jsonCve.toString().match(/(ImpactScore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.impact = nwcve.impact.replace('ImpactScore,','');
                                        nwcve.base = jsonCve.toString().match(/(CVSSv3BaseScore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.base = nwcve.base.replace('CVSSv3BaseScore,','');
                                        nwcve.flFrom = nwFl._id;
                                        nwcve.CVSS2 = false;
                                        nwcve.save();
                                    }
                                    if (jsonCve.toString().match(/(ExploitabilitySubscore,\w?[0-9]*\.?[0-9])/g) != null) {
                                        nwFl.save();
                                        var nwcve = new cveUp();
                                        nwcve.name =cveName.match(/CVE-\d{4}-\d{4,7}/g)[0];;
                                        nwcve.exploitLvl = jsonCve.toString().match(/(ExploitabilitySubscore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.exploitLvl = nwcve.exploitLvl.replace('ExploitabilitySubscore,','');
                                        nwcve.impact =  jsonCve.toString().match(/(ImpactSubscore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.impact = nwcve.impact.replace('ImpactSubscore,','');
                                        nwcve.base = jsonCve.toString().match(/(CVSSv2BaseScore,\w?[0-9]*\.?[0-9])/g)[0];
                                        nwcve.base = nwcve.base.replace('CVSSv2BaseScore,','');
                                        nwcve.flFrom = nwFl._id;
                                        nwcve.CVSS2 = true;
                                        nwcve.save();
                                    }
                                }});
                        })
                        .on('error', function (e) {
                            console.log("Got an error: ", e);
                        });
                })}
            res.redirect('/');
            }
        else{
            res.redirect('https://http.cat/500');
        }
    }

    });

module.exports = router;
