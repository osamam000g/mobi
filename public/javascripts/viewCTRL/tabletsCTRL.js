

//===================================================
//                  Mobile CTRL 
//====================================================
app.controller('tabletsCTRL', function($scope , $http , $rootScope , $timeout , $routeParams , $filter){
    
     // console.log($routeParams.tab.slice(1));
    
                 $rootScope.loaderShow = true ;
     // console.log('tabletsCTRL');
    $scope.getMobiles = function(){
         $http.post('/view/gettablet').then(function(response){
           if(!response){ 
             }else{
                    $scope.mobileData1 = response.data.message.reverse() ; 
                 
 $scope.mobileData = $filter('filter')($scope.mobileData1, $routeParams.tab.slice(1));
                 
                 
                  if( $scope.mobileData.length == 0){
                       // console.log('$scope.mobileData111');
                       // console.log($scope.mobileDataLenght);
                         $rootScope.showNotFound = true ;

                 }else{
                       // console.log('$scope.mobileData');
                       // console.log($scope.mobileData123.length);
                         $rootScope.showNotFound = false ;

                 }
                 
                 
                    $scope.totalItems = response.data.message.length ;
                    $scope.itemsPerPage = 20;
                    $scope.currentPage= 1 ;
             
                    // // console.log($scope.mobileData);
                    // //console.log(response.data);
                    // //console.log($scope.totalItems);
                    // //console.log($scope.itemsPerPage);
                    // //console.log($scope.currentPage);
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

app.filter('tabletsPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });

