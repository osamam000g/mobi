var express = require('express');
var jwt = require('jsonwebtoken');

var createUser = require('./../model/view/user');
var createMobile = require('./../model/view/mobile');
var createAccess = require('./../model/view/access');

var secret = 'mohamedOsamaFatouhAbdElaty5lifaAhmedelSh7at';
var router = express.Router();

//=======================================       
//             REGISTER
//=======================================



router.post('/signin', function(req, res, next) {
 
    if(req.body.username == null || req.body.username == "" || req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" || req.body.rePassword == null || req.body.rePassword == "" || req.body.phone == null || req.body.phone == "" ){
        
         res.json({success:false , message:"username or email or password don't exist1"});
    }else  {
        if(req.body.password != req.body.rePassword ){
             res.json({success:false , message:"password dosen't match"});
        }else{
            
            var CreateUser = new createUser();
    
            CreateUser.email =  req.body.email;
            CreateUser.password =  req.body.password;
            CreateUser.phone =  req.body.phone;
            CreateUser.username =  req.body.username;
            if(!req.body.point){
                
            CreateUser.point =  '0'  ;
            }else{
            CreateUser.point =  req.body.point  ;
                
            }
            
            CreateUser.save(function(err,data){
                  if(err){
//                       res.json({success:false , message: err });
                      if(!err.errors){
                           res.json({success:false , message: 'username or email or phone already exist2' , data:req.body });
                      }else{
                          if(err.errors.email ){
                             res.json({success:false , message: err.errors.email.message });
                          }else if(err.errors.username){
                             res.json({success:false , message: err.errors.username.message });
                          }else if(err.errors.password){
                             res.json({success:false , message: err.errors.password.message });
                          }else if(err.errors.phone){
                             res.json({success:false , message: 'please enter a valid phone number' });
                          }else{

                             res.json({success:false , message: 'username or email or phone already exist' });
                          }
                      }
                     
                      

            }else{
             
               res.json({success:true , message: 'user created successfully' , data : data });

            }
            });
        }
    }
    
 
});
//=======================================       
//             get number of users
//=======================================

router.post('/userno', function(req, res, next) {
    createUser.find().exec(function(err , users){
        var count = users.length;
        if(err){
            throw res.json({success:false , message:err});
        }else{
            
        res.json({success:true , message : count});
        }
    });
});

//=======================================       
//            update user
//=======================================

router.post('/updateUser', function(req, res, next) {
    createUser.findOne({email: req.body.email}).select('username email password phone').exec(function(err , user){
        if(err){
            throw res.json({success:false , message:err});
        }else{
            if(user){
                if(req.body.password == null || req.body.password == "" || req.body.rePassword == null || req.body.rePassword == ""){
                    res.json({success:false , message:'empty filed'});
                    
                }else{
                    if(req.body.newPassword != req.body.rePassword){
                          res.json({success:false , message:'password donot match'});
                    }
                    else{
                        var passwordResualt1 = user.comparePassword(req.body.password);
                        if(!passwordResualt1){
                                res.json({success:false , message:'wrong password'});
                        }
                    else{
//                                res.json({success:false , message:'wrong password111'});
                        user.password =  req.body.password;
                        user.username =  req.body.username;
                        user.email =  req.body.email;
                        user.phone =  req.body.phone;
                         if(!req.body.point){
                
            user.point =  '0'  ;
            }else{
            user.point =  req.body.point  ;
                
            }
                        user.save(function(err , data){

                            if(err){

                                res.json({success:false , message: err.errors.password.message})

                            }else{

                                res.json({success:true , message : 'user updated successfully' ,    data:user})

                            }

                        });
                        
                        }
                    }
                
           
                
                  }
                
            }
            
        }
    });
});
//=======================================       
//             get number of users
//=======================================

router.post('/getallusers', function(req, res, next) {
    createUser.find().select('username email phone').exec(function(err , users){
      
        if(err){
            throw res.json({success:false , message:err});
        }else{
            
        res.send(users);
        }
    });
});

//=======================================       
//             LogIn
//=======================================

router.post('/login', function(req, res, next) {
    createUser.findOne({email: req.body.email}).select('username password email phone point').exec(function(err , user){
        if(err) throw err ;
        if(user){
             if(req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" ){
                 res.json({success:false , message:"email or password don't exist"});
              }else{

              var passwordResualt = user.comparePassword(req.body.password);
                if(passwordResualt){
                   var token =  jwt.sign({
                        email: user.email  ,
                        username: user.username  ,
                        phone: user.phone ,
                       point:user.point
                       
                    } ,secret , {expiresIn : '24h'} );

                         res.json({success:true , message:"Login success" , token: token});
                }else{
                         res.json({success:false , message:"wrong password or email"});
                }



            }
               
        }else{
           res.json({success:false , message:"wrong password or email"});

        }
    });
 
   
    
 
});


 
//=======================================       
//             add mobile 
//=======================================

router.post('/addmobile', function(req, res, next) {
    if( req.body.name == null || req.body.name == "" ||
        req.body.productState == null || req.body.productState == "" ||
        req.body.priceBefore == null || req.body.priceBefore == "" ||
        req.body.priceAfter == null || req.body.email == "" ||
        req.body.desc == null || req.body.desc == "" ||
        req.body.brand == null || req.body.brand == "" ||
        req.body.weight == null || req.body.weight == "" ||
        req.body.dimention == null || req.body.dimention == "" ||
        req.body.sim == null || req.body.sim == "" ||
        req.body.camera == null || req.body.camera == "" ||
        req.body.battery == null || req.body.battery == "" ||
        req.body.colorAvaliable == null || req.body.colorAvaliable == ""   ||
        req.body.cat == null || req.body.cat == ""   ||
        req.body.url == null || req.body.url == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var mobile = new createMobile();
        
            mobile.name =   req.body.name;
            mobile.type =   'mobile';
            mobile.productState =   req.body.productState;
            mobile.priceBefore =   req.body.priceBefore ;
            mobile.priceAfter =   req.body.priceAfter ;
            mobile.desc =   req.body.desc ;
            mobile.brand =    req.body.brand ;
            mobile.weight =   req.body.weight ;
            mobile.dimention =   req.body.dimention;
            mobile.sim =   req.body.sim ;
            mobile.camera =   req.body.camera ;
            mobile.battery =   req.body.battery ;
            mobile.colorAvaliable =  req.body.colorAvaliable ;
            mobile.cat =  req.body.cat ;
            mobile.url =  req.body.url ;

        
        mobile.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'product Created Successfully'});
            }
        });
   
        
    }
   
    
 
});

//=======================================       
//             GET ALL MOBILES
//=======================================

router.post('/getmobiles', function(req, res, next) {
   createMobile.find({type:'mobile'}).exec(function(err , mobiles){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.send(mobiles);
       }
   });
   
    
 
});

//=======================================       
//             update MOBILES AND tablet
//=======================================

router.post('/updateMobile', function(req, res, next) {
    if(req.body.id == '' || req.body.id == null ||
        req.body.name == null || req.body.name == "" ||
        req.body.productState == null || req.body.productState == "" ||
        req.body.priceBefore == null || req.body.priceBefore == "" ||
        req.body.priceAfter == null || req.body.email == "" ||
        req.body.desc == null || req.body.desc == "" ||
        req.body.brand == null || req.body.brand == "" ||
        req.body.weight == null || req.body.weight == "" ||
        req.body.dimention == null || req.body.dimention == "" ||
        req.body.sim == null || req.body.sim == "" ||
        req.body.camera == null || req.body.camera == "" ||
        req.body.battery == null || req.body.battery == "" ||
        req.body.colorAvaliable == null || req.body.colorAvaliable == "" ||
       req.body.type == '' || req.body.type == null   ||
       req.body.cat == '' || req.body.cat == null   ||
        req.body.url == null || req.body.url == "" 
      ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createMobile.findById(req.body.id).exec(function(err , mobiles){
       if(err){
        res.json({success:false , message : 'wrong product id '})
           
       }else{
            mobiles.name =   req.body.name;
           
           if(req.body.type == 'mobile'){
               mobiles.type =   'mobile';
           }else{
              mobiles.type =   'tablet';
               
           }
            
            mobiles.productState =   req.body.productState;
            mobiles.priceBefore =   req.body.priceBefore ;
            mobiles.priceAfter =   req.body.priceAfter ;
            mobiles.desc =   req.body.desc ;
            mobiles.brand =    req.body.brand ;
            mobiles.weight =   req.body.weight ;
            mobiles.dimention =   req.body.dimention;
            mobiles.sim =   req.body.sim ;
            mobiles.camera =   req.body.camera ;
            mobiles.battery =   req.body.battery ;
            mobiles.colorAvaliable =  req.body.colorAvaliable ;
            mobiles.cat =  req.body.cat ;
            mobiles.url =  req.body.url  ;
           
           mobiles.save(function(err , data){
               if(err){
                   res.json({success:false , message : err})

               }else{
                       if(req.body.type == 'mobile'){
                    res.json({success:true , message : 'mobile updated successfully' , data:mobiles})
                       }else{
                    res.json({success:true , message : 'tablet updated successfully' , data:mobiles})

                       }
               }
           });
           
       }
   });
        
        
    }
 
   
    
 
});

//==========================================================    
//             Delet tablet or mobile 
//==========================================================

router.post('/deletproduct', function(req, res, next) {
    if(req.body.id == '' || req.body.id == null ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createMobile.findByIdAndRemove(req.body.id).exec(function(err , mobiles){
       if(err){
        res.json({success:false , message : 'wrong product id '})
           
       }else{
           
           res.json({success:true , message : 'product deleted successfully' , data:mobiles});
           
       }
   });
        
        
    }
 
   
    
 
});

//=======================================       
//             add tablet 
//=======================================

router.post('/addtablet', function(req, res, next) {
    if( req.body.name == null || req.body.name == "" ||
        req.body.productState == null || req.body.productState == "" ||
        req.body.priceBefore == null || req.body.priceBefore == "" ||
        req.body.priceAfter == null || req.body.email == "" ||
        req.body.desc == null || req.body.desc == "" ||
        req.body.brand == null || req.body.brand == "" ||
        req.body.weight == null || req.body.weight == "" ||
        req.body.dimention == null || req.body.dimention == "" ||
        req.body.sim == null || req.body.sim == "" ||
        req.body.camera == null || req.body.camera == "" ||
        req.body.battery == null || req.body.battery == "" ||
        req.body.colorAvaliable == null || req.body.colorAvaliable == "" ||
        req.body.cat == null || req.body.cat == "" ||
        req.body.url == null || req.body.url == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var mobile = new createMobile();
        
            mobile.name =   req.body.name;
            mobile.type =   'tablet';
            mobile.productState =   req.body.productState;
            mobile.priceBefore =   req.body.priceBefore ;
            mobile.priceAfter =   req.body.priceAfter ;
            mobile.desc =   req.body.desc ;
            mobile.brand =    req.body.brand ;
            mobile.weight =   req.body.weight ;
            mobile.dimention =   req.body.dimention;
            mobile.sim =   req.body.sim ;
            mobile.camera =   req.body.camera ;
            mobile.battery =   req.body.battery ;
            mobile.colorAvaliable =  req.body.colorAvaliable ;
            mobile.cat =  req.body.cat ;
            mobile.url =  req.body.url ;

        
        mobile.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'product Created Successfully' , data: data});
            }
        });
   
        
    }
   
    
 
});
//=======================================       
//             GET ALL tablets
//=======================================

router.post('/gettablet', function(req, res, next) {
   createMobile.find({type:'tablet'}).exec(function(err , mobiles){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.json({success:true , message:mobiles});
       }
   });
   
    
 
});

//=======================================       
//             add access 
//=======================================

router.post('/addaccess', function(req, res, next) {

    if( req.body.name == null || req.body.name == "" ||
        req.body.productState == null || req.body.productState == "" ||
        req.body.priceBefore == null || req.body.priceBefore == "" ||
        req.body.priceAfter == null || req.body.priceAfter == "" ||
        req.body.desc == null || req.body.desc == "" ||
        req.body.brand == null || req.body.brand == "" ||
        req.body.url == null || req.body.url == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var access = new createAccess();
        
            access.name =   req.body.name;
            access.type =   'access';
            access.productState =   req.body.productState;
            access.priceBefore =   req.body.priceBefore ;
            access.priceAfter =   req.body.priceAfter ;
            access.desc =   req.body.desc ;
            access.brand =    req.body.brand ;
            access.url =    req.body.url ;
    

        
        access.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'Accessory Created Successfully' , data: data});
            }
        });
   
        
    }
});

//=======================================       
//             GET ALL access
//=======================================

router.post('/getaccess', function(req, res, next) {
   createAccess.find({type:'access'}).exec(function(err , mobiles){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.json({success:true , message:mobiles});
       }
   });
   
    
 
});
//==========================================================    
//             Delet tablet or mobile 
//==========================================================

router.post('/delectaccess', function(req, res, next) {
    if(req.body.id == '' || req.body.id == null ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createAccess.findByIdAndRemove(req.body.id).exec(function(err , mobiles){
       if(err){
        res.json({success:false , message : 'wrong product id '})
           
       }else{
           
           res.json({success:true , message : 'product deleted successfully' , data:mobiles});
           
       }
   });
        
        
    }
 
   
    
 
});



//==================================================    
//            updateaccess
//==================================================

router.post('/updateaccess', function(req, res, next) {
    if(req.body.id == '' || req.body.id == null ||
        req.body.name == null || req.body.name == "" ||
        req.body.productState == null || req.body.productState == "" ||
        req.body.priceBefore == null || req.body.priceBefore == "" ||
        req.body.priceAfter == null || req.body.email == "" ||
        req.body.desc == null || req.body.desc == "" ||
        req.body.brand == null || req.body.brand == "" ||
        req.body.url == null || req.body.url == "" 
       ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createAccess.findById(req.body.id).exec(function(err , mobiles){
       if(err){
        res.json({success:false , message : 'wrong product id '})
           
       }else{
            mobiles.name =   req.body.name;
           
               mobiles.type =   'access';
            
            mobiles.productState =   req.body.productState;
            mobiles.priceBefore =   req.body.priceBefore ;
            mobiles.priceAfter =   req.body.priceAfter ;
            mobiles.desc =   req.body.desc ;
            mobiles.brand =    req.body.brand ;
            mobiles.url =    req.body.url ;
           
           
           mobiles.save(function(err , data){
               if(err){
                   res.json({success:false , message : err})

               }else{
                    res.json({success:true , message : 'access updated successfully' , data:mobiles})

               }
           });
           
       }
   });
        
        
    }
 
   
    
 
});

//==========================================================    
//             Delet tablet or mobile 
//==========================================================
//
//router.post('/searchMobile', function(req, res, next) {
//    if(req.body.searchText == '' || req.body.searchText == null ){
//        
//        res.json({success:false , message : 'empty filed is required'})
//    }else{
//        
//    createMobile.find(req.body.searchText).exec(function(err , mobiles){
//       if(err){
//        res.json({success:false , message : 'wrong product searchText ' , err: err})
//           
//       }else{
//           
//           res.json({success:true , message : 'search successfully' , data:mobiles});
//           
//       }
//   });
//        
//        
//    }
// 
//   
//    
// 
//});


//=======================================       
//             GET product by ID
//=======================================

router.post('/getAccessById', function(req, res, next) {
   createAccess.find({_id:req.body.id}).exec(function(err , mobiles){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.json({success:true , message:mobiles});
       }
   });
   
    
 
});
//=======================================       
//             GET mobiles by ID
//=======================================

router.post('/getProductById', function(req, res, next) {
   createMobile.find({_id:req.body.id}).exec(function(err , mobiles){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.json({success:true , message:mobiles});
       }
   });
   
    
 
});

//=======================================       
//             verify token
//=======================================

router.use(function(req, res, next) {
  var token =  req.body.token || req.body.query || req.headers['xtoken'];
    
    if(token){
        jwt.verify(token , secret , function(err , decoded){
            if(err){
                res.json({success:false , message:'incorrect token '});
            }else{
                req.decoded = decoded ;

                next();
            }
        });
        
        
        
    }else{
       res.json({success:false , message:'no token provided'}) 
    }
});
            
//=======================================       
//             getUser with token 
//=======================================

router.post('/me', function(req, res, next) {
    res.send(req.decoded);
    
});


module.exports = router;

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            