

//===================================================
//                  Mobile CTRL 
//====================================================
app.controller('accessCTRL', function($scope , $http , $rootScope , $timeout){
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
                 
                 if($scope.totalItems == 0){
                         $scope.showNotFound = true ;

                 }else{
                         $scope.showNotFound = false ;

                 }
             
                    // // console.log($scope.mobileData);
                    // console.log(response.data);
                    // console.log($scope.totalItems);
                    // console.log($scope.itemsPerPage);
                    // console.log($scope.currentPage);
                 
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

