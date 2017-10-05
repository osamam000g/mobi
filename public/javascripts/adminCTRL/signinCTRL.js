//===========================
//          signin  CTRL
//============================


app.controller('signinCTRL',function($scope , $http , $window , $location){
    $scope.login = function(data){
        $scope.email = data.email;
        $scope.password = data.password;
        var reqData = {
          email : $scope.email , 
          password : $scope.password
        };
        
        // console.log($scope.email);
        // console.log($scope.password);
        
        $http.post('/admin/login', reqData  ).then(function(response){
            
            if(response.data.success){
                $window.localStorage.setItem('tokenAd' , response.data.token );
                $location.path('/user');
                
            }else{
                
                // console.log(response);
                
            }
        });
    }
});

