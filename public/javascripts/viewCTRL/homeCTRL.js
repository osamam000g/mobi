//============================================
//              Home Controller
//=============================================

app.controller('homeCTRL', function($window , $rootScope  , $http , $scope ,$location , $rootScope ,$timeout ){
  
//    show home page after it load
    $rootScope.showClass = 'hide' ;
    $rootScope.showIndex = false ;
    $rootScope.loaderShow = true ;
    if(window.location.pathname.slice(0 , 3) == '/ar'){// this is ar condtion
//                       $location.path('/ar'+window.location.pathname);
         $rootScope.nav = {
                        home:'الرئيسيه',
                        mobiles:'موبيلات',
                        tablets:'تابلت',
                        access:'اكسسوارات',
                        contact:'تواصل معنا',
                        lang:'اللغه',
                        sign:'تسجيل الدخول',
                        touch: 'تواصل معنا  ',
                        phone : 'الهاتف' ,
                        phonenom : '2944 424 2010' ,
                        work : 'مواعيد العمل ',
                        workInfo : 'كل ايام الاسبوع من 10 صباحا حتي 1 ليلا', 
                        adress : 'العنوان' ,
                        adressInfo : 'شارع مسجد حاتم بجوار ماركت فتح الله سموحة',
                        search:'ابحث عن ',
                        logout :'تسجيل الخروج',
                        profile :'الصفحه الشخصيه'
                       
              };
         $rootScope.href = {
                        home:'/ar',
                        mobiles:'/ar/mobiles/:',
                        tablets:'/ar/tablets/:',
                        access:'/ar/access',
                        contact:'/ar/contact',
                        logView: '/ar/logView',
                        signView: '/ar/signView ',
                        search:'/ar/search/',
                        productDetails : '/ar/productDetails/',
                        profileView: '/ar/profileView' ,
                        logView: '/ar/logView',
                        signView: '/ar/signView ',
                        contact:'/ar/contact',
                        editProfile:'/ar/editProfile'
                        
              };
    }else{
        //console.log('en ' + window.location.pathname.slice(0,3));
//        $location.path(window.location.pathname.slice(3));

            $rootScope.nav = {
                        home:'Home',
                        mobiles:'Mobiles',
                        tablets:'Tablets',
                        access:'Accesories',
                        contact:'Contact',
                        lang:'Lang',
                        sign:'Account',
                        touch: 'GET IN TOUCH',
                        phone : 'Phone' ,
                        phonenom : '0102 424 4492 ' ,
                        work : 'work time ',
                        workInfo : 'ALL Days From 10:00 - 01:00', 
                        adress : 'Adress' ,
                        adressInfo : 'Hatem mosque st , Next to Fathallah market ',
                        search:'Search For ..... ',
                  logout :'Logout',
                        profile :'Profile'
                
              };
         $rootScope.href = {
                        home:'/',
                        mobiles:'/mobiles/:',
                        tablets:'/tablets/:',
                        access:'/access',
                        contact:'/contact',
                        logView: '/logView',
                        signView: '/signView ',
                        search:'/search/',
                        productDetails : '/productDetails/',
                        profileView: '/profileView' ,
                        logView: '/logView',
                        signView: '/signView ',
                        contact:'/contact',
                        editProfile:'/editProfile'
                        
              };

    }
     
    
//    language landeling
//--------------------------------------------
    
       $rootScope.langEn = true ; 
    
       $rootScope.langChange = function(boolean){

            $rootScope.langEn = boolean ; 
            //console.log($rootScope.langEn);
            //console.log(window.location.pathname);
           
           if(!boolean){ //if not true arabic
                
               //console.log('/ar'+window.location.pathname);
               $location.path('/ar'+window.location.pathname);
               
                $rootScope.nav = {
                        home:'الرئيسيه',
                        mobiles:'موبيلات',
                        tablets:'تابلت',
                        access:'اكسسوارات',
                        contact:'تواصل معنا',
                        lang:'اللغه',
                        sign:'تسجيل الدخول',
                        touch: 'تواصل معنا  ',
                        phone : 'الهاتف' ,
                        phonenom : '2944 424 2010' ,
                        work : 'مواعيد العمل ',
                        workInfo : 'كل ايام الاسبوع من 10 صباحا حتي 1 ليلا', 
                        adress : 'العنوان' ,
                        adressInfo : 'شارع مسجد حاتم بجوار ماركت فتح الله سموحة',
                        search:'ابحث عن ',
                        logout :'تسجيل الخروج',
                        profile: 'الصفحه الشخصيه'
                       
              };
               $rootScope.href = {
                        home:'/ar',
                        mobiles:'/ar/mobiles/:',
                        tablets:'/ar/tablets/:',
                        access:'/ar/access',
                        contact:'/ar/contact',
                        logView: '/ar/logView',
                        signView: '/ar/signView ',
                        search:'/ar/search/',
                        productDetails : '/ar/productDetails/',
                        profileView: '/ar/profileView' ,
                        logView: '/ar/logView',
                        signView: '/ar/signView ',
                        contact:'/ar/contact',
                        editProfile:'/ar/editProfile'
                        
              };
    
           }else{//if boolean is english false 
               //console.log(window.location.pathname);
               $location.path(window.location.pathname.slice(3));

                $rootScope.nav = {
                        home:'Home',
                        mobiles:'Mobiles',
                        tablets:'Tablets',
                        access:'Accesories',
                        contact:'Contact',
                        lang:'Lang',
                        sign:'Account',
                        touch: 'GET IN TOUCH',
                        phone : 'Phone' ,
                        phonenom : '0102 424 4492 ' ,
                        work : 'work time ',
                        workInfo : 'ALL Days From 10:00 - 01:00', 
                        adress : 'Adress' ,
                        adressInfo : 'Hatem mosque st , Next to Fathallah market ',
                        search:'Search For ..... ',
                    logout :'Logout ',
                        profile : 'profile'

              };
              $rootScope.href = {
                        home:'/',
                        mobiles:'/mobiles/:',
                        tablets:'/tablets/:',
                        access:'/access',
                        contact:'/contact',
                        logView: '/logView',
                        signView: '/signView ',
                        search:'/search/',
                        productDetails : '/productDetails/',
                        profileView: '/profileView' ,
                        logView: '/logView',
                        signView: '/signView ',
                        contact:'/contact',
                        editProfile:'/editProfile'
                        
              };
               $window.location.reload();


           }
          
       }
    
      
     
       
       
       
       

//reload func
//---------------------------------------------
    $rootScope.reload = function(){
        $window.location.reload();
    }
    
//---------------------
//    Logout FUN
//----------------------
    $scope.logout = function(){
        if ($window.localStorage.getItem('token')){
            $window.localStorage.removeItem('token');
            $window.location.reload();
            $location.path('/');
        }else{
            $window.location.reload();
            //console.log('there is no tokne ');
        }
    }
    
    
    
    
    
//----------------------------------
//    check token in every route 
//-----------------------------------
 if ($window.localStorage.getItem('token')) {
     
     $rootScope.$on('$routeChangeStart', function (next, current) {
         $http.post('/view/me').then(function (response) {
             
             if(response.data.success == false){//if token is expired

                 if(!$window.localStorage.getItem('token')){
                     
                 }else{
                     $window.localStorage.removeItem('token')
                     $window.location.reload();
                 }
                 
             }
             
             
             if (response.data) {
 
                 $scope.loginBtn = false ;
                 $scope.profileBtn = true ;
                 
                 //console.log(response.data);
                 $rootScope.userData = response.data ;
                 $scope.username = response.data.username;
                 $scope.email = response.data.email;
                 $scope.phone = response.data.phone;
                 $scope.point = response.data.point;
             }
             else {
                 $scope.loginBtn = true ;
                 $scope.profileBtn = false ;
                 //console.log('request denied');
             }
         });
     });
  
     
 } else {
     
     //console.log('user is not logged in' + $scope.loginBtn);
      $scope.loginBtn = true ;
     $scope.profileBtn = false ;
 }  
    
    
//===================================================
//                  get product fun 
//===================================================
    $http.post('/view/getaccess').then(function(response){
        $scope.accessData = response.data.message ; 
        
         $http.post('/view/gettablet').then(function(response1){
          $scope.tabData = response1.data.message ;
             
                                                  
            $http.post('/view/getmobiles').then(function(response2){
              $scope.mobileData = response2.data ;
                if(response2.data){
                    $timeout(function(){
                    $rootScope.showIndex = true;
                            $rootScope.loaderShow = false ;

                        
                    },2000);
                }
                //console.log($scope.mobileData);
              $scope.productData();

            });
        });
        
    });
                                      
                                      
    
        var pro = [] ;
    $scope.productData = function(){  
        var i = 0;
         pro.push( $scope.mobileData[3]);
        
//        //console.log($scope.mobileData[4]);
        
        for(i = 0 ; i < 3 ; i++){
                var mobiArray = $scope.mobileData;
                var accessArray = $scope.accessData;
                var tabArray = $scope.tabData;

                pro.push( $scope.mobileData[i]);
                pro.push($scope.accessData[i]);
                pro.push($scope.tabData[i]);

                mobiArray.slice(i);
                accessArray.slice(i);
                tabArray.slice(i);
            
           $scope.todata(pro);
            
        }
        
            
    }
     $scope.todata = function(pro){
         if(pro.length == 10){
             $scope.pro1 = [];
             $scope.pro2 = [];
             var i = 0 ;
             var x = 5 ;
               for(i = 0; i < 5 ; i++){
                   $scope.pro1.push(pro[i]);
               }
             for(x = 5 ; x < 10 ; x++){
                   $scope.pro2.push(pro[x]);
               }
             
                //console.log($scope.pro1);
                //console.log($scope.pro2);
         }
            }
//    function to go to any location
//    --------------------------------------
     $rootScope.locationPath = function(path){
         //console.log(path);
         $location.path(path);
     }
    
});
               
