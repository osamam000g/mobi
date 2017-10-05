app.controller('editProfileCTRL',function($rootScope , $scope , $http ,$window){
    //  console.log($rootScope.userData);
    $scope.data = {
        phone:$rootScope.userData.phone ,
        username:$rootScope.userData.username ,
        email:$rootScope.userData.email 
        
    };
$scope.show ={
            successMessageShow: false,
            errMessageShow:false,
            loading:false
        };
    
    $scope.updateUser = function(data){

             $scope.show.loading = true ; 
            
        $http.post('/view/updateUser' , data ).then(function(response){
            
             $scope.show.loading = false ; 
             $scope.show.errMessageShow = false ; 
             $scope.show.successMessageShow = false ; 
            
           if(!response){ 
       //  console.log('eror');
             }else{
                 if(response.data.success == false){
                       $scope.errMessage = response.data.message ; 
                       $scope.show.errMessageShow = true ; 
                     
                 }else{
                     
                    $scope.successMessage = response.data.message ; 
                     $scope.show.successMessageShow = true ; 
                     $window.location.reload();
                   // //  console.log(response);
                 }
             }
   
         });
            
            

    }
});

   