//===================================================
//                  Mobile CTRL 
//====================================================
app.controller('productDetailsCTRL', function($scope , $http , $routeParams){
    
    // console.log('mobilesDetailsCTRL');
    $scope.getMobileData = function(){
        $scope.id = $routeParams.id.slice(1) ;
        
        $http.post('/view/getProductById' , {id:$scope.id} ).then(function(response){
            // console.log(response.data);
            if(response.data.message == "" ){
               $http.post('/view/getAccessById' , {id:$scope.id} ).then(function(response){
                   $scope.brand = response.data.message[0].brand ;
            $scope.camera = response.data.message[0].camera ;
            $scope.desc = response.data.message[0].desc ;
            $scope.dimention = response.data.message[0].dimention ;
            $scope.name = response.data.message[0].name ;
            $scope.priceAfter = response.data.message[0].priceAfter ;
            $scope.priceBefore = response.data.message[0].priceBefore ;
            $scope.productState = response.data.message[0].productState ;
            $scope.sim = response.data.message[0].sim ;
            $scope.type = response.data.message[0].type ;
            $scope.url = response.data.message[0].url ;
            $scope.weight = response.data.message[0].weight ;
            $scope.colorAvaliable = response.data.message[0].colorAvaliable ;
                   $scope.hideShow = false ;
                   $scope.tabTitle = "Description" ;
               });
                
            }else{
                if(!response.data.message){
                   // console.log('1');
        }else{
                   //// console.log('2');
            // console.log(response.data.message[0]);
            $scope.brand = response.data.message[0].brand ;
            $scope.camera = response.data.message[0].camera ;
            $scope.desc = response.data.message[0].desc ;
            $scope.dimention = response.data.message[0].dimention ;
            $scope.name = response.data.message[0].name ;
            $scope.priceAfter = response.data.message[0].priceAfter ;
            $scope.priceBefore = response.data.message[0].priceBefore ;
            $scope.productState = response.data.message[0].productState ;
            $scope.sim = response.data.message[0].sim ;
            $scope.type = response.data.message[0].type ;
            $scope.url = response.data.message[0].url ;
            $scope.weight = response.data.message[0].weight ;
            $scope.colorAvaliable = response.data.message[0].colorAvaliable ;
                   $scope.tabTitle = "Specification" ;
                   $scope.hideShow = true ;
        }
            }
        
           
        });
        
    }
    $scope.getMobileData();

    
});


//pagination
//-------------------------

app.filter('productDetailsPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });

