var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var CveSchema = new  Schema({
    name:String,
    impact:String,
    exploitLvl: String,
    flFrom: [{type: mongoose.Schema.Types.ObjectId, ref: 'file'}]
});

module.exports = mongoose.model('Cve', CveSchema);