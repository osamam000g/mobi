
//=============================================
//                  User CTRL 
//==============================================


app.controller('userCTRL',function($scope , $http , $timeout){
//    signup function 
//------------------------------------
          $scope.show ={
            successMessageShow: false,
            errMessageShow:false,
            loading:false
        };
 
    $scope.signup = function(data){
//         console.log(data);   
  
        if (data.username == undefined || data.username == "" || data.password == undefined || data.password == "" || data.rePassword == undefined || data.rePassword == "" || data.email == undefined || data.email == "" || data.phone == undefined || data.phone == "") {
//             console.log("error");
        }
        else {
             $scope.show.loading = true ; 
              $http.post('/view/signin' , data ).then(function(response){
                
                    $scope.show.loading = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage = response.data.message; 
                     $scope.show.successMessageShow = true ; 
                     $scope.show.errMessageShow = false ; 
                      $scope.getAllUsers();
                     $timeout(function(){
                         $scope.show.successMessageShow = false ; 

                     },5000);
//                     console.log(response);
                    $scope.show.loading = true ; 
                 }else{
                     $scope.show.successMessageShow = false ; 

                       $scope.errMessage = response.data.message ; 
                       $scope.show.errMessageShow = true ; 

                 }
              });
        }
    }
    
    
//    get all users and pagination 
//------------------------------------
    
    
    $scope.getAllUsers = function(){
        
    $http.post('/view/getallusers').then(function(response1){
        if(!response1){
        }else{
            
            $scope.users = response1.data.reverse() ;
//            console.log($scope.users);
            
             $scope.totalItems =   response1.data.length;
             $scope.itemsPerPage= 3;
             $scope.currentPage= 1;
    
            
        }
    });
    }
    $scope.getAllUsers();
    
    
    
    //    count function 
//------------------------------------
    $scope.countUsers = function(){
        
    
    $http.post('/view/userno').then(function(response){
//        console.log(response.data.message);
        if(!response.data.message){
            $scope.count = 1 ;
        }else{
           $scope.count = response.data.message ;
            
        }
    });
    
    }
       $scope.countUsers();
    
  


    
    
});

    app.filter('userPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });