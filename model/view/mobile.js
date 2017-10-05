var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');


var mobileSchema = new mongoose.Schema({
    
    name:{type: String , required: true } , 
    type:{type: String , required: true } , 
    productState: {type: String , required: true },
    priceBefore: {type: String , required: true },
    priceAfter: {type: String , required: true },
    desc: {type: String , required: true },
    brand: {type: String , required: true },
    weight: {type: String , required: true },
    dimention: {type: String , required: true },
    sim: {type: String , required: true },
    camera: {type: String , required: true },
    battery: {type: String , required: true },
    colorAvaliable: {type: String , required: true },
    url: {type: String , required: true },
    cat:{type: String , required: true}
    
});

mobileSchema.plugin(titlize, {
  paths: [ 'name']
});

mobileSchema.plugin(titlize, {
  paths: [ 'colorAvaliable']
});


module.exports = mongoose.model('mobile' , mobileSchema);