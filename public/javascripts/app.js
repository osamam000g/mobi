var app = angular.module("mobi", ["ngRoute" , 'ui.bootstrap']);

app.run(function($rootScope , $window , $location){
    $rootScope.$on('$routeChangeStart', function (event ,  next, current) {
        
        
        if(next.$$route.auth == false){
            if(!$window.localStorage.getItem('token')){
               event.preventDefault(); 
                $location.path('/');
            }
            
        }
    });
    $rootScope.$on('$routeChangeStart', function(next, current) { 
       //console.log(current.params.text.slice(1));
            if( current.$$route.templateUrl == '/view/search.html'){
                $rootScope.ASDASD = $location.$$url.slice(9) ;            
            }
 });
});



app.config(function($routeProvider , $locationProvider){
    
   $routeProvider.when('/',{
       templateUrl:'/view/home.html',
        controller:'homeCTRL',
       auth:true
   });
    $routeProvider.when('/ar',{
       templateUrl:'/view/ar/home.html',
        controller:'homeCTRL',
       auth:true
   });
    
   
     
     $routeProvider.when('/mobiles/:mob',{
        templateUrl:'/view/mobiles.html',
        controller:'mobilesCTRL',
        auth:true
   });
      $routeProvider.when('/ar/mobiles/:mob',{
        templateUrl:'/view/ar/mobiles.html',
        controller:'mobilesCTRL',
        auth:true
   });
    
    
      $routeProvider.when('/search/:text',{
        templateUrl:'/view/search.html',
//        controller:'searchCTRL',
        auth:true
   });
     $routeProvider.when('/ar/search/:text',{
        templateUrl:'/view/ar/search.html',
//        controller:'searchCTRL',
        auth:true
   });
    
    
     $routeProvider.when('/tablets/:tab',{
        templateUrl:'/view/tablets.html',
        controller:'tabletsCTRL',
        auth:true
   });
     $routeProvider.when('/ar/tablets/:tab',{
        templateUrl:'/view/ar/tablets.html',
        controller:'tabletsCTRL',
        auth:true
   });
    
    
    
      $routeProvider.when('/access',{
        templateUrl:'/view/access.html',
        controller:'accessCTRL',
        auth:true
   });
      $routeProvider.when('/ar/access',{
        templateUrl:'/view/ar/access.html',
        controller:'accessCTRL',
        auth:true
   });
    
    
     $routeProvider.when('/productDetails/:id',{
       templateUrl:'/view/mobileDetails.html',
        controller:'productDetailsCTRL',
        auth:true
   });
        $routeProvider.when('/ar/productDetails/:id',{
       templateUrl:'/view/ar/mobileDetails.html',
        controller:'productDetailsCTRL',
        auth:true
   });
    
    
      $routeProvider.when('/profileView',{
       templateUrl:'/view/profileView.html',
        controller:'profileViewCTRL',
        auth:false
   });
    $routeProvider.when('/ar/profileView',{
       templateUrl:'/view/ar/profileView.html',
        controller:'profileViewCTRL',
        auth:false
   });
    
    
      $routeProvider.when('/logView',{
       templateUrl:'/view/logView.html',
       controller:'loginViewCTRL',
       auth:true
   });
     $routeProvider.when('/ar/logView',{
       templateUrl:'/view/ar/logView.html',
       controller:'loginViewCTRL',
       auth:true
   });
    
      $routeProvider.when('/signView',{
       templateUrl:'/view/signView.html',
          controller:'signViewCTRL',
          auth:true
   });
    $routeProvider.when('/ar/signView',{
       templateUrl:'/view/ar/signView.html',
          controller:'signViewCTRL',
          auth:true
   });
    
//    $routeProvider.when('/mobileDetails',{
//        templateUrl:'/view/mobileDetails.html',
//                         auth:true
//
//    });
    
    $routeProvider.when('/contact',{
        templateUrl:'/view/contact.html',
        auth:true

    });
    $routeProvider.when('/ar/contact',{
        templateUrl:'/view/ar/contact.html',
        auth:true

    });
    
     $routeProvider.when('/editProfile',{
        templateUrl:'/view/editProfile.html',
        controller:'editProfileCTRL',
         auth:false

    });
     $routeProvider.when('/ar/editProfile',{
        templateUrl:'/view/ar/editProfile.html',
        controller:'editProfileCTRL',
         auth:false

    });
     
    $routeProvider.otherwise({
        redirectTo:'/'
    });
    $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
    });
});



//app.controller('mobiCTRL',function($rootScope){
//    
//});


//==========================================
//              APP CONFIG
//==========================================

app.config(function($httpProvider) {
         $httpProvider.interceptors.push(function($rootScope , $window) {
        return {
            request: function(config) {
//                config.headers.xAccessToken = $rootScope.token ; 
                config.headers.xtoken = $window.localStorage.getItem('token') ; 
                return config;
            }
        };
    });
 
});


//==================================
//      sign View CTRL 
//==================================
app.controller('signViewCTRL', function ($scope , $http , $location , $timeout , $rootScope) {
    $scope.signView = function (data) {
        
        $scope.show ={
            successMessageShow: false,
            errMessageShow:false,
            loading:false
        };
 
        
    if (data.username == undefined || data.username == "" || data.password == undefined || data.password == "" || data.rePassword == undefined || data.rePassword == "" || data.email == undefined || data.email == "" || data.phone == undefined || data.phone == "") {
             //console.log("error");
        }
        else {
             $scope.show.loading = true ; 
              $http.post('/view/signin' , data ).then(function(response){
                
                    $scope.show.loading = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage = response.data.message ; 
                     $scope.show.successMessageShow = true ; 
                     
                     //console.log(response);
                    $scope.show.loading = true ; 

                     $timeout(function(){
                            $scope.show.loading = false ; 

                        $location.path($rootScope.href.logView);
                     },1000);
                 }else{
                       $scope.errMessage = response.data.message ; 
                       $scope.show.errMessageShow = true ; 

                 }
              });
        }
    }
});

//========================================
//          Log in View CTRL
//========================================
app.controller('loginViewCTRL', function($scope , $http , $location , $timeout , $window , $rootScope){
    $scope.loginView = function(logdata){ 
     
        $scope.show= {
            messageSuccessShow : false ,
            errSuccessShow : false ,
            loading:true 
        }
        
        $http.post('/view/login', logdata).then(function(data){
            $scope.show.loading = false;
             //console.log(data.data.success);
             //console.log(data.data.message);
            if(data.data.success){
                $scope.show.messageSuccessShow = true ;
                $scope.show.messageSuccess = data.data.message ;
                $timeout(function(){
                    if(data.data.token){
                         $window.localStorage.setItem('token' , data.data.token);
                           $rootScope.localToken = $window.localStorage.getItem('token');
                        $window.location.reload();
                        $location.path($rootScope.href.home);
                    }else{
                        $location.path($rootScope.href.home);
                    }
                   
                },1000);
            }else{
                 $scope.show.errSuccessShow = true ;
                $scope.show.errSuccess = data.data.message ;
            }
        });
      
    }
});


//=================================
//    search
//==================================
app.controller('searchCTRL',function( $scope , $location , $http , $filter  , $rootScope , $timeout , $routeParams, $route , $window , $filter){

    
//    //console.log('search');

    
    
        
    $rootScope.search = function(searchText){
    $rootScope.searchText1 = searchText;
        //console.log('$scope.searchText1');
        //console.log($rootScope.searchText1);
        
        if($rootScope.searchText1 == undefined){
            $rootScope.searchText1 = ''; 
//             $location.path('/search/:'+$scope.searchText1);
             $location.path($rootScope.href.search+':'+$rootScope.searchText1);
        }else{
            
             $location.path($rootScope.href.search+':'+$rootScope.searchText1);
        }
              $scope.getMobiles();

    
    }

        
     $scope.getMobiles = function(){
            
         $scope.mobileData = [];
         $http.post('/view/getmobiles').then(function(response){
           if(!response){ 
             }else{
                    $scope.mobileData1 = response.data.reverse() ; 
                    $scope.totalItems1 = response.data.length ;
                    $scope.currentPage= 1 ;
                 
                  for(var i = 0 ; i < $scope.totalItems1 ; i++){
                     $scope.mobileData.push($scope.mobileData1[i]);
                   
                 }
            
             }
   
         });
         
         $http.post('/view/gettablet').then(function(response){
           if(!response){ 
             }else{
                    $scope.mobileData2 = response.data.message.reverse() ; 
                    $scope.totalItems2 = response.data.message.length ;
                    $scope.currentPage= 1 ;
                 
                 for(var i = 0 ; i < $scope.totalItems2 ; i++){
                     $scope.mobileData.push($scope.mobileData2[i]);
                 }
                 
               
             }
   
         });
         
         $http.post('/view/getaccess').then(function(response){
           if(!response){ 
             }else{
                    $scope.mobileData3 = response.data.message.reverse() ; 
                    $scope.totalItems3 = response.data.message.length ;
    $scope.totalItems =  $scope.totalItems3 + $scope.totalItems2 + $scope.totalItems1 ;
                    $scope.itemsPerPage = 20 ; 
                    $scope.currentPage= 1 ;
                 
                 for(var i = 0 ; i < $scope.totalItems3 ; i++){
                     $scope.mobileData.push($scope.mobileData3[i]);
                 }
                        $rootScope.mobileData123 = $scope.mobileData ;
                 
//                     $rootScope.mobileData123 = $filter('filter')($rootScope.mobileData12, {type: $rootScope.searchTypeProduct});
                     //console.log('$scope.mobileData123');
                     //console.log($scope.mobileData123);
              
$timeout(function(){
    
             $rootScope.loaderShow = false ;
             $rootScope.showIndex = true ;
},1000);
             }
             $rootScope.ASDAS = $location.$$url.slice(9) ;
             
             
              $scope.mobileDataLenght = $filter('filter')($rootScope.mobileData123, $rootScope.ASDASD).length;
                 
                   if( $scope.mobileDataLenght == 0){
                       ////console.log('$scope.mobileData111');
                       ////console.log($scope.mobileDataLenght);
                         $rootScope.showNotFound = true ;

                 }else{
                       ////console.log('$scope.mobileData');
                       ////console.log($scope.mobileData123.length);
                         $rootScope.showNotFound = false ;

                 }
                 
             
         });
         
    }
                 $scope.searchtitl =   $rootScope.ASDASD  ; 
                   $scope.getMobiles();

   
    
});




//pagination
//-------------------------

app.filter('searchPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });


















