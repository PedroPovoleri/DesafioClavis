var express = require('express');
var router = express.Router();
var reader = require('../utils/cveReader');
var fileUp = require('../model/fileModel');
var pth = require('path');
var cveUp = require('../model/cveModel');


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
}).post('/', function(req,res){
    if (req.files != null || req.files != undefined) {
            var nwFl = new fileUp();
            nwFl.name = req.files.arq.name;
            var outUrl = [];
            var host = 'https://web.nvd.nist.gov/view/vuln/detail?vulnId=';
            var arry = req.files.arq.data.toString().split(/(?=CVE-\d{4}-\d{4,7})/g) ;

            for(var i= 0; i < arry.length; i++) {
                    var url = host + arry[i].toString().match(/(CVE-\d{4}-\d{4,7})/g);
                    outUrl.push(url);
            }
            reader(outUrl,nwFl);
            res.redirect('/');

    }
    res.redirect('https://http.cat/500');
});
module.exports = router;
