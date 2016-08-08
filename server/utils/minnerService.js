var jsdom = require('jsdom');
var http = require('http');




module.exports = function minner (html){

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

