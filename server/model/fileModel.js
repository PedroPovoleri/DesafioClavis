var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var fileSchema = new  Schema({
    name:String,
    dtUpld:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('file', fileSchema);