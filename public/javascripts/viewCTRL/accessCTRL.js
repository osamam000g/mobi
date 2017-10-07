

//===================================================
//                  Mobile CTRL 
//====================================================
app.controller('accessCTRL', function($scope , $http , $rootScope , $timeout و $filter){
    $scope.showNotFound = false ;
                 $rootScope.loaderShow = true ;
     // console.log('accessCTRL');
    $scope.getMobiles = function(){
         $http.post('/view/getaccess').then(function(response){
           if(!response){ 
             }else{
                    $scope.mobileData = response.data.message.reverse() ; 
                    $scope.totalItems = response.data.message.length ;
                    $scope.itemsPerPage = 20;
                    $scope.currentPage= 1 ;
                 
                 $scope.mobileData1 = $filter('filter')($scope.mobileData1, $routeParams.tab.slice(1));
                 
         if( $scope.mobileData1.length == 0){
                       // console.log('$scope.mobileData111');
                       // console.log($scope.mobileDataLenght);
                         $rootScope.showNotFound = true ;

                 }else{
                       // console.log('$scope.mobileData');
                       // console.log($scope.mobileData123.length);
                         $rootScope.showNotFound = false ;

                 }
                 
                   $timeout(function(){
                     
                   $rootScope.showIndex = true ;
                 $rootScope.loaderShow = false ;
                 },1000);
               
             }
   
         });
    }
    $scope.getMobiles();

    
});


//pagination
//-------------------------

app.filter('accessPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });

