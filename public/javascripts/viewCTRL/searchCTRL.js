
//===================================================
//                  Mobile CTRL 
//====================================================
app.controller('searchCTRL', function($scope , $http , $timeout , $rootScope , $routeParams , $location){
                             $scope.showNotFound = false ;

//                 $rootScope.loaderShow = true ;
    // console.log('searchCTRL');
   // console.log("hhi"+$routeParams.param1.slice(1));
    $scope.getMobiles = function(){
         $http.post('/view/gettablet').then(function(response){
           if(!response){ 
                      // console.log( $rootScope.showIndex);
             }else{
                    $scope.mobileData = response.data.message.reverse() ; 
                    $scope.totalItems = response.data.message.length ;
                    $scope.itemsPerPage = 20;
                    $scope.currentPage= 1 ;
                 
            
                   // console.log($scope.mobileData);
                   // console.log(response.data);
                   // console.log($scope.totalItems);
                   // console.log($scope.itemsPerPage);
                   // console.log($scope.currentPage);
                   $timeout(function(){
                     
//                       $rootScope.showIndex = true ;
//                       $rootScope.loaderShow = false ;
                      // console.log( $rootScope.showIndex);
                 },1000);
               
             }
   
         });
    }
    $scope.getMobiles();

    
});


//pagination
//-------------------------

app.filter('searchPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });

