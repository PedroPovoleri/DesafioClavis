var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var CveSchema = new  Schema({
    name:String,
    impact:Number,
    exploitLvl: Number,
    flLst: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cve'}]
});

module.exports = mongoose.model('Cve', CveSchema);