var express = require('express');
var adminUser = require('./../model/admin/user');
var jwt = require('jsonwebtoken');
var secret ='mohamedOsamaFatouhAbdElAty5alifa';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//for register 

router.post('/signin', function(req, res, next) {
    
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == '' || req.body.email == null) {
        
          res.json({success:false , message: 'user name or password is not exist'});

    }else{
          var AdminUser = new adminUser();
        
        AdminUser.username = req.body.username;
        AdminUser.password = req.body.password;
        AdminUser.email = req.body.email;
        
        AdminUser.save(function(err , data){
            if(err){
               res.json({success:false , message: 'username or email already exist'});

            }else{
               res.json({success:true , message: 'user created successfully' , data : data});

            }
        });

    }
    
});


//--------------------------------
//              login
//--------------------------------
router.post('/login', function(req, res, next) {

      if (req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '' ) {
        
          res.json({success:false , message: 'user name or password is not exist'});

    }else{
        adminUser.findOne({'email': req.body.email }).select('email password').exec(function(err , user)
         {    
            if(err){
                        return   res.json({success:false , message: 'wrong user or password'});  
                    }else if(!user){
                                    res.json({success:false , message: 'wrong user or password' });  
                                    }else{

                                      var passwordResualt = user.comparePassword(req.body.password);
                                        if(passwordResualt){
                                           var token =  jwt.sign({
                                                email: user.email  ,
                                                username: user.username 

                                            } ,secret , {expiresIn : '24h'} );

                                                 res.json({success:true , message:"Login success" , token: token});
                                            }else{
                                                     res.json({success:false , message:"wrong password or email"});
                                            }

                                        }

        });
      

    }

});
//===================================
//           verify token 
//====================================

router.use( function(req, res, next) {
    var token =  req.body.query || req.headers['adtoken'] || req.body.token ;
    
    if(token){
       jwt.verify(token , secret , function(err , decoded){
           if(err){
               res.json({success:false , message:'incorrect token'});
           }else{
               req.decoded = decoded ;
               next();
           }
       });
    }else{
        res.json({success:false , message:'no token provided'});
    }
    
    
});
//--------------------------------
//              me
//--------------------------------
router.post('/me', function(req, res, next) {

   res.send(req.decoded);  

});

module.exports = router;
