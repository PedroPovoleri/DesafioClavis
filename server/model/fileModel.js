var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var fileSchema = new  Schema({
    name:String,
    dtUpld:{ type: Date, default: Date.now },
    exploitLvl: Number


});

module.exports = mongoose.model('file', fileSchema);