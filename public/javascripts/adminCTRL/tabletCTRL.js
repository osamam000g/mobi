//tablet CTRL
//=====================================================================
app.controller('tabletCTRL' , function($scope , $http , $timeout , $window , $location){

    
//upload image
//=----------------------------------------
    $scope.show = {
            spin:false ,
            errMessage:false,
            errText : '',
            check:false
            
    };
    
   $scope.uploadFile = function(){
       
       $scope.show.spin = true;
       $scope.show.errMessage = false;
       $scope.show.errText = '';
       $scope.show.check = false;
      
       
        var file = $scope.myFile;
        var uploadUrl = "/multer";
        var fd = new FormData();
        fd.append('file', file);
       
       if(!file){
            $scope.show.spin = false;
            $scope.show.errMessage = true;
           $scope.show.errText = 'please select image';
           // console.log('please upload image');
       }else{
           
           $http.post(uploadUrl,fd, {transformRequest: angular.identity,headers: {'Content-Type': undefined}}).then(function(res){
               
            if(!res.data.success){
                $scope.show.spin = false;
                $scope.show.errMessage = true;
                $scope.show.errText = res.data.message;
                  // console.log(res.data.message);  
            }else{
           // console.log($scope.show);
                
                    $scope.show.spin = false;
                    $scope.show.check = true;
                
                  // console.log(res.data.req.path);  
                $scope.data.url = res.data.req.path;
            }
        
        })   
       }

     
      
    };
    
//-------------------------------------------------------------
    
    
    
//save mobile reqest
//--------------------------------------------------------
    $scope.addMobile = function(data){
         // console.log(data); 
       
          $scope.show ={
            successMessageShow: false,
            errMessageShow:false,
            loading:false
        };
  
        if (
            data.name == undefined || data.name == "" ||
            data.productState == undefined || data.productState == "" ||
            data.priceBefore == undefined || data.priceBefore == "" ||
            data.priceAfter == undefined || data.priceAfter == "" ||
            data.desc == undefined || data.desc == "" ||
            data.brand == undefined || data.brand == "" ||
            data.weight == undefined || data.weight == "" ||
            data.dimention == undefined || data.dimention == ""||
            data.sim == undefined || data.sim == "" ||
            data.camera == undefined || data.camera == ""||
            data.battery == undefined || data.battery == ""||
            data.colorAvaliable == undefined || data.colorAvaliable == ""||
            data.url == undefined || data.url == ""
        ) {
                $scope.show.successMessageShow = false ; 
                $scope.errMessage = 'please select image' ; 
                $scope.show.errMessageShow = true ; 
             // console.log("error");
        }
        else {
             $scope.show.loading = true ; 
              $http.post('/view/addtablet' , data ).then(function(response){
                
                    $scope.show.loading = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage = response.data.message; 
                     $scope.show.successMessageShow = true ; 
                     $scope.show.errMessageShow = false ; 
                     $timeout(function(){
                         $scope.show.successMessageShow = false ; 
                         $scope.getAllMobile();
                     },5000);
                     // console.log(response);
                 }else{
                     $scope.show.successMessageShow = false ; 

                       $scope.errMessage = response.data.message ; 
                       $scope.show.errMessageShow = true ; 

                 }
              });
        }
    }
    
//    delete mobile
//--------------------------------------------------------

    $scope.getId = function(id){
//        $scope.thisProductId = id ;
        $window.localStorage.setItem('id', id);
        // console.log(id);
        
    }
    
    
    
    $scope.deletMobile = function(){
        // console.log('enter fun');
         $scope.show1 ={
            successMessageShow1: false,
            errMessageShow1:false,
            loading1:false
        };
    
//        if($scope.thisProductId){
            $scope.thisProductId = $window.localStorage.getItem('id');
        // console.log($scope.thisProductId);
             $http.post('/view/deletproduct' , {id:$scope.thisProductId} ).then(function(response){
                
                    $scope.show1.loading1 = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage1 = response.data.message; 
                     $scope.show1.successMessageShow1 = true ; 
                     $scope.show1.errMessageShow1 = false ; 
                      $scope.getAllMobile();
                     $timeout(function(){
                         $scope.show1.successMessageShow1 = false ; 
                   
                     },5000);
                     // console.log(response);
                 }else{
                     $scope.show1.successMessageShow1 = false ; 

                       $scope.errMessage1 = response.data.message ; 
                       $scope.show1.errMessageShow1 = true ; 

                 }
              });
//        }else{
//            // console.log('err');
//        }
    }
    
    
    // get all tablet
//--------------------------------=-------------
    
    $scope.getAllMobile = function(){
         $http.post('/view/gettablet').then(function(response){
                 
                    if(!response){ 
             }else{
                    $scope.mobiles = response.data.message.reverse() ; 
                    $scope.totalItems = response.data.message.length ;
                    $scope.itemsPerPage = 3 ;
                    $scope.currentPage= 1 ; 


                        // console.log($scope.mobiles);
                    // console.log($scope.totalItems);
                    // console.log($scope.itemsPerPage);
                    // console.log($scope.currentPage);
               
             }
             
        
             
               
              });
    }
    $scope.getAllMobile();
    
    
});
//end tablet CTRL----------------------------------------------------->

//pagination
//----------------------

app.filter('tabletPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });