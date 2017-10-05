var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');

 var createAccess = new mongoose.Schema({
     name:{type : String , required :true},
     type:{type : String , required :true},
     productState:{type : String , required :true},
     priceBefore:{type : String , required :true},
     priceAfter:{type : String , required :true},
     desc:{type : String , required :true},
     brand:{type : String , required :true},
     url:{type : String , required :true},
         cat:{type: String , required: true}

     
 });



createAccess.plugin(titlize, {
  paths: [ 'name']
});

module.exports = mongoose.model('access', createAccess);