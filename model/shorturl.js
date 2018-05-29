var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var urlschema=new Schema({
OriginalUrl:String,
 ShortUrl:String 
});
var ModelClass=mongoose.model('shorturl',urlschema);
module.exports = ModelClass;