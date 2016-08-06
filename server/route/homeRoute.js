var express = require('express');
var router = express.Router();
var fs  = require('fs');
var fileUp = require('../model/fileModel');



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

    if (req.files != null || req.files != undefined)
    {


        fs.writeFile(filePath, req.files.lst.data, function(err) {
            if(err) {
                return console.log(err);
            }

        });

        fs.readFile(filePath, 'utf8', function(err, contents) {
            var rePattern = new RegExp(/CVE-\d{4}-\d{4,7}/);
            var out = [];

            var result = contents.toString().split(rePattern);

            console.log(result.length);

            for(var i =0 ; result.length; i++) {
                //var nwCve = new fileUp();
                //nwCve.flLst =
                //nwCve.save();
                // Fazer o request no site e montar o layout.
                out.push(contents.toString().match(rePattern)[0]);
            }



        });

        res.sendStatus(200);
    }


    else{
        res.send('err');
    }

});

module.exports = router;



