var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var CveSchema = new  Schema({
    name:String,
    impact:String,
    exploitLvl: String,
    CVSS2: Boolean,
    flFrom: [{type: mongoose.Schema.Types.ObjectId, ref: 'file'}]
});

module.exports = mongoose.model('Cve', CveSchema);