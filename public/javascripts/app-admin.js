var app = angular.module('adminMobi', ['ngRoute' , 'ui.bootstrap']);


//check user auth
app.run(function($rootScope , $window , $location){
    $rootScope.$on('$routeChangeStart', function (event ,  next, current) {
        
        
        if(next.$$route.auth == false){
            ////console.log(next.$$route.auth);
            if(!$window.localStorage.getItem('tokenAd')){
               event.preventDefault(); 
                $location.path('/');
            }
            
        }
    });
});

//upload file directive
app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);


//routes
app.config(function($routeProvider , $locationProvider){
       $routeProvider.when('/',{
        templateUrl:'/admin/signin.html',
        controller:'signinCTRL',
           auth :true
    });
   $routeProvider.when('/user',{
       templateUrl:'/admin/user.html',
       controller:'userCTRL',
       auth:true
   });
      $routeProvider.when('/mobile',{
       templateUrl:'/admin/mobile.html',
       controller:'mobileCTRL',
          auth:true
   });
      $routeProvider.when('/accessories',{
       templateUrl:'/admin/accessories.html',
       controller:'accessCTRL',
          auth:true
   });
      $routeProvider.when('/tablets',{
       templateUrl:'/admin/tablets.html',
       controller:'tabletCTRL',
          auth:true
   });
        $routeProvider.when('/editHomePage',{
        templateUrl:'/admin/editHomePage.html',
        controller:'editHomeCTRL',
        auth:true
   });
         $routeProvider.when('/editContactPage',{
       templateUrl:'/admin/editContactPage.html',
             auth:true
   });
        $routeProvider.when('/tablets',{
       templateUrl:'/admin/tablets.html',
            auth:true
   });
      $routeProvider.when('/signup',{
       templateUrl:'/admin/signup.html',
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


//===============================================
//  config app send token in every req 
//================================================
app.config(function($httpProvider) {
         $httpProvider.interceptors.push(function($rootScope , $window) {
        return {
            request: function(config) {
                config.headers.adToken =$window.localStorage.getItem('tokenAd') ; 
                return config;
            }
        };
    });
 
});


//=========================================
//      index controller
//========================================

app.controller('mobiCTRL',function($window , $rootScope, $http , $scope , $location){
  //----------------------------------
//    check token in every route 
//-----------------------------------
 if ($window.localStorage.getItem('tokenAd')) {
     
     $rootScope.$on('$routeChangeStart', function (next, current) {
         
         $http.post('/admin/me').then(function (response) {
             if (response.data) {
                 
                 $scope.loginBtn = false ;
                 $scope.profileBtn = true ;
                 
                 ////console.log(response.data);
//                 $scope.username = response.data.username;
                 $scope.email = response.data.email;
//                 $scope.phone = response.data.phone;
             }
             else {
                 $scope.loginBtn = true ;
                 $scope.profileBtn = false ;
                 //console.log('request denied');
             }
         });
     });
  
     
 } else {
     
     //console.log('user is not logged in');
      $scope.loginBtn = true ;
     $scope.profileBtn = false ;
 }  
//========================================
//              logout function
//=========================================
    $scope.logout = function(){
        
    if ($window.localStorage.getItem('tokenAd')) {
         $window.localStorage.removeItem('tokenAd');
         $window.location.reload();
     }
    }
    
    
});



 













