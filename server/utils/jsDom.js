var express = require('express');
var jsdom = require('jsdom');
var cveUp = require('../model/cveModel');


var jsDom = function DomReader(outUrl,nwFl, steam) {
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
                return res.end();

            jsonCve = jsonCve.toString().replace(/ /g,'');
            jsonCve = jsonCve.toString().replace(/\n/g,'');

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

};


module.exports = jsDom;