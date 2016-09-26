app.controller('MainCtrl', function($rootScope,$scope,$modal,$state,$stateParams,authService,API,UserInterceptor,$location) {
   $rootScope.$on('userIntercepted',function(data){
        $scope.islogin = false;
        $state.go("login");
    });
    $rootScope.$state = $state;
	$scope.islogin = false;
	$scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){ 
         //debugger;
		if(toState.name=='login')return;
		$scope.islogin=authService.isLoggedIn();
		if(!$scope.islogin){
			//event.preventDefault();
			//$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
            $location.url('/login');
		}
	});
	$scope.excel=API.bast_path;
    $scope.role_id=authService.getRole_id();
    $scope.User_name=authService.getUser_name();
    $scope.token=authService.getToken();
    $scope.logout = function(){
         if(confirm("是否确认退出?")){
    		authService.logout();
    		$scope.islogin=authService.isLoggedIn();
             window.location.href="/";
    		//$state.go("login",{from:"logout"});
         }
	}
    $scope.openImage= function (img) {
            var modalInstance = $modal.open({
                template: "<div style='text-align:center'><img src='"+API.upload+img+"' style='max-width:600px' /></div>",
                size: 'lg',
            });
     }
});



/*login*/
app.controller("loginCtrl",function($state,$scope,$http,authService,API){
	$scope.login = function(isvalid){
		if(isvalid){
          var jsonobj={ "user_name":$scope.user.loginName,"user_pwd":$scope.user.password};
    
           $.ajax( {    
                url:API.bast_path+'/authentication/login',// 跳转到 action 
                contentType:"application/json;charset=UTF-8",
                dataType:'json', 
                type:'post', 
                data:JSON.stringify(jsonobj),
                success:function(data) {    
                    console.log(data);
                   // alert(data);
                    authService.setUser_name(data.user_name);
                    authService.setRole_id(data.role_id);
                    authService.setUserToken(data.zwhs_token);

                    window.location.href="/";
                   // $state.go("index",{from:"login".name});
                 },
                 error:function(data){ 
                         console.log(data);
                         alert(data.responseJSON.msg);
                        var obj=JSON.stringify(data);
                        var obj1=eval('(' + obj + ')');
                       // console.log(obj1);
                    }   
            });/**/
		}else{

            alert('用户名密码不能为空');
        }
	}
});

app.controller("common.uploadFile",function($scope,MyAlbum,API,$modalInstance,$sce,data){
   
    /*$('#fileupload').change(function(){
        debugger;
        var file=this.files[0];
        var reader=new FileReader();
        reader.onload=function(){
            // 通过 reader.result 来访问生成的 DataURL
            var url=reader.result;
            setImageURL(url);
        };
        reader.readAsDataURL(file);
    });

    var image=new Image();
    function setImageURL(url){
        image.src=url;
    }*/
    $scope.ratio = data.ratio;
    $scope.hideMy = data.hideMy;

    $scope.selectedPhoto = false;
    $scope.selectImage = function(photo){
        $scope.selectedPhoto = photo;
    }
    $scope.choseThis = function(){
        if(!$scope.selectedPhoto){
            alert("请选择一个图片！");
            return false;
        }else{
            $modalInstance.close($scope.selectedPhoto);
        }
    }
   
    $scope.loading = false;
    $scope.crop = function(){
        $scope.loading = true;
        $("#crop").cropper('getCroppedCanvas').toBlob(function (blob) {
            var formData = new FormData();
            filename = blob.type.replace("/",".");
            formData.append('files', blob,filename);
            var size = parseFloat(blob.size / 1024 / 1024);
            if(size > 3){
                $scope.loading = false;
            }else{
                MyAlbum.upload(formData,$scope.hideMy).then(function(data){
                    $scope.loading = false;
                    $modalInstance.close(data);
                });
            }
        });
    }
});

app.controller("common.myAlbum",function($scope,MyAlbum){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.searchValue = "";
    $scope.pageChanged = function(){
        MyAlbum.getMyPhotoes({
            currentPage:$scope.currentPage,
            totalItem:$scope.pageSize,
            searchValue:$scope.searchValue
        }).then(function(photoes){
            $scope.photo_list = photoes;
        });
    }
    $scope.pageChanged();
});


app.controller("index",function($scope,$http,$state,API,authService){
    $scope.excel=API.bast_path;
    $scope.role_id=authService.getRole_id();
    $scope.User_name=authService.getUser_name();
   
      $http({ method:'GET',url:API.bast_path+'/data/msg'})
    .success(function(data){ console.log(data);$scope.indexcount=data;})
 
  

})

app.controller("orderslist",function($scope,$http,$state,API){
    $scope.detai=false;
    $scope.list=true;

    $scope.goDetails = function(id){
     $http({ method:'GET',url:API.bast_path+'/order/detail?order_id='+id})
        .success(function(data){ console.log(data);$scope.orders=data;})
        $scope.detai=true;
        $scope.list=false;

     }
     
     $scope.listshow=function(){
        $scope.detai=false;
        $scope.list=true;
     }
     $scope.gotab=function(id){

        $state.go("orders.orderslist"+id);
        
     }
     $scope.gotab_fenxiao=function(id){

        $state.go("orders.orderslist_fenxiao"+id);
        
     }


})
app.controller("fx_orderslist",function($scope,$http,$state,API){
    $scope.detai=false;
    $scope.list=true;
    $scope.goDetails = function(id){
     $http({ method:'GET',url:API.bast_path+'/order/detail?order_id='+id})
        .success(function(data){ console.log(data);$scope.orders=data;})
        $scope.detai=true;
        $scope.list=false;

     }
     
     $scope.listshow=function(){
        $scope.detai=false;
        $scope.list=true;
     }
     $scope.gotab=function(id){

        $state.go("orders.orderslist"+id);
        
     }
     $scope.gotab_fenxiao=function(id){

        $state.go("orders.orderslist_fenxiao"+id);
        
     }


})





/* orsdersList 订单列表>全部*/
app.controller('orderslistAll', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                }
            }).success(function(data){
                 console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?pageNo='+$scope.currentPage);
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
         $scope.show();
    }
}); 

/* orsdersList 订单列表>未支付*/
app.controller('orderslist10', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1&order_status=10'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?order_status=10&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        //alert('a');
         $scope.show();
    }
}); 


/* orsdersList 订单列表>已支付*/
app.controller('orderslist20', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1&order_status=20'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?order_status=20&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){

     $scope.show();
    }
}); 



/* orsdersList 订单列表>已收货*/
app.controller('orderslist30', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1&order_status=30'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?order_status=30&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
         $scope.show();
    }
}); 



/* orsdersList 订单列表>已评价*/
app.controller('orderslist40', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1&order_status=40'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?order_status=40&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
      
         $scope.show();
    }
}); 

/* orsdersList 订单列表>已取消*/
app.controller('orderslist0', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?pageNo=1&order_status=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?order_status=0&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
      
         $scope.show();
    }



})

/*分销订单列表>全部*/
app.controller('fx_orderslistAll', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                }
            }).success(function(data){
                 console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&pageNo='+$scope.currentPage);
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
         $scope.show();
    }
}); 

/* orsdersList 订单列表>未支付*/
app.controller('fx_orderslist10', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1&order_status=10'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&order_status=10&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        //alert('a');
         $scope.show();
    }
}); 


/* orsdersList 订单列表>已支付*/
app.controller('fx_orderslist20', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1&order_status=20'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&order_status=20&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){

     $scope.show();
    }
}); 



/* orsdersList 订单列表>已收货*/
app.controller('fx_orderslist30', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1&order_status=30'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&order_status=30&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
         $scope.show();
    }
}); 



/* orsdersList 订单列表>已评价*/
app.controller('fx_orderslist40', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1&order_status=40'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&order_status=40&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
      
         $scope.show();
    }
}); 

/* orsdersList 订单列表>已取消*/
app.controller('fx_orderslist0', function($scope,$http,$state,API,$stateParams,$modal) {
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/order/list?is_retail=1&pageNo=1&order_status=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.start_time,
                    "end_time":$scope.end_time,
                    "order_id":$scope.order_id,
                    //"order_status":$scope.order_status
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/order/list?is_retail=1&order_status=0&pageNo='+$scope.currentPage);
                };
                
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
      
         $scope.show();
    }



})



/*订单详情 模态框*/
app.controller("ordersDetails",function($scope,$http,$state,API,$modalInstance,items){
    $http({ method:'GET',url:API.bast_path+'/order/detail?order_id='+items})
    .success(function(data){ console.log(data);$scope.orders=data;})

   
})

/*店铺管理列表(公共)*/
app.controller("store",function($scope,$http,$state,API,$cookieStore,$modal){
     $http({ method:'GET',url:API.bast_path+'/storesg/list'}) //取店铺等级表
        .success(function(data){ console.log(data);$scope.Divide=data});
    $scope.list=true;
    $scope.detail=false;
    $scope.listshow=function(){$scope.list=true;$scope.detail=false;}
    $scope.detailshow=function(id){
        $scope.list=false;$scope.detail=true;
        $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})//取省级表
        .success(function(data){
          $scope.regionInfo=data;
          console.log(data);
          })
        $http({ method:'GET',url:API.bast_path+'/store/detail?store_id='+id})//取店铺详细信息
        .success(function(data){ 

            $http({ method:'GET',url:API.bast_path+'/regionInfo/getArea?region_code='+data.regionCity})
            .success(function(data){
                $scope.getAreas=data; 
            })
            $scope.ordersDetail=data;console.log(data);
            $scope.pregioning=parseInt(data.regionProv);
            $scope.getCity();
            $scope.pcitying=parseInt(data.regionCity);
            $scope.pareaing=parseInt(data.areaName.regionCode);
           

            


            $http({ method:'GET',url:API.bast_path+'/storesg/getStoreSg/'+data.sgId})//取店铺等级信息
             .success(function(data){
                console.log(data);
                $scope.dengji=data; 
                $scope.newdengji=null;
             }).error(function(data){
               $scope.ordersDetail.sgId=0;
               $scope.dengji={sgId:0, commisRates: 0, insDate: 0, sgName: "0", updDate: null};
               $scope.newdengji=null;
        });
        

        })
        $scope.saveordersDetail=function(id){
            $http({ method:'PUT',
                data:{
                        "store_id":parseInt(id),
                        "store_state":parseInt($scope.ordersDetail.storeState),
                        "sg_id" :parseInt($scope.ordersDetail.sgId),
                        "province_id":$scope.pregioning,
                        "city_id":$scope.pcitying,
                        "area_id":$scope.pareaing,

                    },
                url:API.bast_path+'/store/edit/'})
             .success(function(data){ console.log(data); alert('修改成功');$state.go("store.list",null,{reload:true});})
        }
        $scope.passordersDetail=function(id){
            if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("是否审核通过?")){
               $http({ method:'PUT',
                data:{
                        "store_id":parseInt(id),
                        "store_state":1,
                        "sg_id" :$scope.ordersDetail.sgId,
                        "province_id":$scope.pregioning,
                        "city_id":$scope.pcitying,
                        "area_id":$scope.pareaing,

                    },
                url:API.bast_path+'/store/edit/'})
                .success(function(data){ console.log(data); alert('已审核通过'); $state.go("store.list",null,{reload:true});})
             }
          
        }

        
        $scope.turnordersDetail=function(id){
             if(confirm("是否确认驳回?")){
                $http({ method:'PUT',
                    data:{
                            "store_state":2,
                           
                        },
                    url:API.bast_path+'/store/check/'+id})
                 .success(function(data){ console.log(data); alert('驳回成功'); $state.go("store.list",null,{reload:true});})
             }
        }

        

        $scope.getCity=function(){
              $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.pregioning})
            .success(function(data){$scope.citys=data;}) 
            if (!$scope.regioning) {$scope.citying=undefined;$scope.regioning=undefined;$scope.getAreas=undefined;};
        }
        $scope.getArea=function(){
              $http({ method:'GET',url:API.bast_path+'/regionInfo/getArea?region_code='+$scope.pcitying})
            .success(function(data){$scope.getAreas=data;}) 
            if (!$scope.regioning) {$scope.citying=undefined;$scope.regioning=undefined;$scope.getAreas=undefined;};
        }
    }
    
    $scope.ptshow=function(obj){
    	$state.go("store.add",{
	                            data: obj,
		                        });
    };
    $scope.getnewdj=function(obj){
       // alert(obj);
        for (var i = $scope.Divide.length - 1; i >= 0; i--) {
           
           if ($scope.Divide[i].sgId==obj) { 
                $scope.dengji.commisRates=$scope.Divide[i].commisRates;
               $scope.newdengji=$scope.Divide[i].commisRates;
           };
        };
    }

})

/*店铺列表 >全部*/
app.controller("storelistall",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");

    $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
    $scope.getCity=function(){ //alert($scope.regioing);
        if ($scope.regioning) {
            if ($scope.regioning!="所有省") {
                $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
              .success(function(data){$scope.citys=data;}) 
          }else{
            $scope.citying=undefined;$scope.citys="";
          }
        };
    }
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/store/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'province_id':$scope.regioning,
                    'city_id':$scope.citying,
                    'company_name':$scope.company_name,
                }

            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/store/list?pageNo='+$scope.currentPage);
                };
               
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
     $scope.regioning=$scope.regioning=='所有省'? undefined:$scope.regioning;
     $scope.citying=$scope.citying=='所有市'? undefined:$scope.citying;
         $scope.show();
    }

  

})


/*店铺列表 >待审核*/
app.controller("storelist0",function($scope,$http,$state,API){
    $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
    $scope.getCity=function(){
         if ($scope.regioning) {
            if ($scope.regioning!="所有省") {
                $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
              .success(function(data){$scope.citys=data;}) 
          }else{
            $scope.citying=undefined;$scope.citys="";
          }
        };
    }
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/store/list?pageNo=1&store_state=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'province_id':$scope.regioning,
                    'city_id':$scope.citying,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/store/list?pageNo='+$scope.currentPage+'&store_state=0');
                };
                $scope.goodsDetails = function(id){
                    $state.go(
                        "store.detail",{
                            currentPage: $scope.currentPage,
                            id: id
                        }
                    );
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        $scope.regioning=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.citying=$scope.citying=='所有市'? undefined:$scope.citying;
        $scope.show();
    }
})


/*店铺列表 >正常*/
app.controller("storelist1",function($scope,$http,$state,API){
    $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
    $scope.getCity=function(){
          if ($scope.regioning) {
            if ($scope.regioning!="所有省") {
                $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
              .success(function(data){$scope.citys=data;}) 
          }else{
            $scope.citying=undefined;$scope.citys="";
          }
        };
    }
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/store/list?pageNo=1&store_state=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    
                    'province_id':$scope.regioning,
                    'city_id':$scope.citying,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                       $scope.show(API.bast_path+'/store/list?pageNo='+$scope.currentPage+'&store_state=1');
                };
                $scope.goodsDetails = function(id){
                   /* $state.go(
                        "store.detail",{
                            currentPage: $scope.currentPage,
                            id: id
                        }
                    );*/
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        $scope.regioning=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.citying=$scope.citying=='所有市'? undefined:$scope.citying;
         $scope.show();
    }
})


/*店铺列表 >冻结*/
app.controller("storelist2",function($scope,$http,$state,API){
    $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
    $scope.getCity=function(){
          if ($scope.regioning) {
            if ($scope.regioning!="所有省") {
                $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
              .success(function(data){$scope.citys=data;}) 
          }else{
            $scope.citying=undefined;$scope.citys="";
          }
        };
    }
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/store/list?pageNo=1&store_state=3'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'province_id':$scope.regioning,
                    'city_id':$scope.citying,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/store/list?pageNo='+$scope.currentPage+'&store_state=3');
                };
                $scope.goodsDetails = function(id){
                    $state.go(
                        "store.detail",{
                            currentPage: $scope.currentPage,
                            id: id
                        }
                    );
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        $scope.regioning=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.citying=$scope.citying=='所有市'? undefined:$scope.citying;
         $scope.show();
    }
})

/*店铺详情*/
app.controller("ordersDetail",function($scope,$http,$state,API,$stateParams){
     $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
    $scope.getCity=function(){
           if ($scope.regioning) {
            if ($scope.regioning!="所有省") {
                $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
              .success(function(data){$scope.citys=data;}) 
          }else{
            $scope.citying=undefined;$scope.citys="";
          }
        };
    }
    $scope.getArea=function(){
          $http({ method:'GET',url:API.bast_path+'/regionInfo/getArea?region_code='+$scope.citying})
        .success(function(data){$scope.getAreas=data;}) 
        if (!$scope.regioning) {$scope.citying=undefined;$scope.regioning=undefined;$scope.getAreas=undefined;};
    }
    $http({ method:'GET',url:API.bast_path+'/store/detail?store_id='+$stateParams.id})
    .success(function(data){ console.log(data);$scope.ordersDetail=data;})

    $scope.saveordersDetail=function(){}
    $scope.passordersDetail=function(){}
    $scope.turnordersDetail=function(){}




})

/* 分销*/
app.controller("fxList",function($scope,$http,$state,API,servicelist){
     $scope.de=false;
     $scope.list=true;
     $scope.memberState="-1";
     var obj='pageNo='+1+'&pageSize=10';
     $scope.init=function(obj){
     	var promise = servicelist.get(API.bast_path+'retail/?'+obj);
		promise.then(function(data) {
			$scope.fxlist = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = 1;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = 1;
			console.log(data);
		}, function(data) {

		});
     }
     
      $scope.pageChanged = function() {
    	var obj='pageNo='+$scope.currentPage+'&pageSize=10&startTime='+$scope.start_time+'&endTime='+$scope.end_time+'&memberState='+$scope.memberState+'&memberTruename='+$scope.memberTruename+'&memberId='+$scope.memberId;
       var promise = servicelist.get(API.bast_path+'retail/?'+obj);
		promise.then(function(data) {
			$scope.fxlist = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = $scope.currentPage;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = $scope.currentPage;
			console.log(data);
		}, function(data) {

		});
    };
    
     $scope.init('pageNo='+1+'&pageSize=10');
     $scope.search=function(){
     	obj='pageNo='+1+'&pageSize=10&startTime='+$scope.start_time+'&endTime='+$scope.end_time+'&memberState='+$scope.memberState+'&memberTruename='+$scope.memberTruename+'&memberId='+$scope.memberId;
        $scope.init(obj);
    }
    $scope.listshow=function(){
       $scope.de=false;
       $scope.list=true;
    }
    $scope.details=function(obj){
    	$scope.de=true;
        $scope.list=false;
        $scope.getprov();
     	var promise = servicelist.get(API.bast_path+'retail/'+obj);
		promise.then(function(data) {
			$scope.fx_detail = data;
			console.log(data);
			$scope.selectProvince=data.regionProv+"-"+data.regionProvName;
			$scope.getcity($scope.selectProvince);
			$scope.selectCity=data.regionCity+"-"+data.regionCityName;
		}, function(data) {

		});
    }
    
    $scope.failed=function(obj){
    	var promise = servicelist.put(API.bast_path+'retail/'+obj+'/rejected');
		promise.then(function(data) {
			console.log(data);
			$scope.fx_detail=data;
			alert("审核驳回");
		}, function(data) {

		});
    }
    $scope.pass=function(obj){
	var promise = servicelist.put(API.bast_path+'retail/'+obj+'/pass');
		promise.then(function(data) {
			$scope.fx_detail=data;
			console.log(data);
			alert("审核通过");
		}, function(data) {

		});
    }
    $scope.getprov=function(obj){
     	var promise = servicelist.get(API.bast_path+'/regionInfo/getProvince');
		promise.then(function(data) {
			console.log(data);
			$scope.Province=data;
			console.log($scope.selectProvince);
		}, function(data) {

		});
    }
    
    $scope.getArea=function(obj){
    	 $scope.getcity(obj);
    }
    $scope.getcity=function(obj){
     	var promise = servicelist.get(API.bast_path+'/regionInfo/getCity?region_code='+obj.split("-")[0]);
		promise.then(function(data) {
			console.log(data);
			$scope.City=data;
			console.log( $scope.selectProvince.split("-")[0]);
			console.log( $scope.selectProvince.split("-")[1]);
		}, function(data) {

		});
    }
	 $scope.save=function(obj,valid){
	 	if(valid){
	 		if($scope.fx_detail.identityImage==undefined){
	 			alert("请上传图片");
	 		}else{
		 		var objdata={
				  "accountBank": $scope.fx_detail.accountBank,
				  "accountOwner": $scope.fx_detail.accountOwner,
				  "cardNo": $scope.fx_detail.cardNo,
				  "identityImage": $scope.fx_detail.identityImage,
				  "identityNo": $scope.fx_detail.identityNo,
				  "memberPhone": $scope.fx_detail.memberPhone,
				  "regionCity": $scope.selectCity.split("-")[0],
				  "regionCityName": $scope.selectCity.split("-")[1],
				  "regionProv":$scope.selectProvince.split("-")[0],
				  "regionProvName": $scope.selectProvince.split("-")[1],
			 	};
		     	var promise = servicelist.put(API.bast_path+'retail/'+obj,objdata);
				promise.then(function(data) {
					$scope.fx_detail = data;
					console.log(data);
					$scope.selectProvince=data.regionProv+"-"+data.regionProvName;
					$scope.getcity($scope.selectProvince);
					$scope.selectCity=data.regionCity+"-"+data.regionCityName;
					$scope.listshow();
					
				}, function(data) {
		
				});
			}
	 	}else{
	 		alert("请检查是否有未填写的信息");
	 	}
	 	
    }
})


/* 分销会员店铺*/
app.controller("fx_store",function($scope,$http,$state,$stateParams,API,servicelist){
	var obj= $stateParams.data;
	$scope.wechatAliasname=$stateParams.wechatAliasname;
	console.log(obj);
	$scope.init=function(obj){
		var promise = servicelist.get(API.bast_path+'retail/'+obj+"/shop");
		promise.then(function(data) {
			$scope.fx_store = data;
			console.log(data);
		}, function(data) {

		});
	}
	$scope.init(obj);
	$scope.gofxlist=function(){
		$state.go('fx.list');
	}
	$scope.save=function(obj,valid){
		if(valid){
			if(($scope.fx_store.bannerImage==undefined)||($scope.fx_store.logoImage==undefined)){
				alert("请上传图片");
			}else{
				var objdata={
				  "bannerImage": $scope.fx_store.bannerImage,
				  "logoImage": $scope.fx_store.logoImage,
				  "retailShop": $scope.fx_store.retailShop,
				};
				var promise = servicelist.put(API.bast_path+'retail/shop/'+obj,objdata);
				promise.then(function(data) {
					$scope.fx_store = data;
					console.log(data);
					alert("店铺信息保存成功");
					$scope.gofxlist();
				}, function(data) {
		
				});
			}
			
		}else{
			alert("请检查是否有未填写的信息");
		}
		
	}
	
 	
})
/* 分销会员商品*/
app.controller("fx_goods",function($scope,$http,$state,$stateParams,API,servicelist){
	 $scope.de=false;
     $scope.list=true;
     var memberId=$stateParams.data;
     var obj='pageNo='+1+'&pageSize=10';
     $scope.init=function(obj){
     	var promise = servicelist.get(API.bast_path+'retail/shop/goods?memberId='+memberId+"&"+obj);
		promise.then(function(data) {
			$scope.fx_goodslist = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = 1;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = 1;
			console.log(data);
		}, function(data) {

		});
     }
     
      $scope.pageChanged = function() {
      	var obj='pageNo='+1+'&pageSize=10&goodsName='+$scope.goodsName;
    	var promise = servicelist.get(API.bast_path+'retail/shop/goods?memberId='+memberId+"&"+obj);
		promise.then(function(data) {
			$scope.fx_goodslist = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = $scope.currentPage;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = $scope.currentPage;
			console.log(data);
		}, function(data) {

		});
    };
    
     $scope.init(obj);
     $scope.search=function(){
     	obj='pageNo='+1+'&pageSize=10&goodsName='+$scope.goodsName;
        $scope.init(obj);
    }
     
     $scope.downGoods=function(obj,index){
     	console.log(obj);
		var promise = servicelist.put(API.bast_path+'retail/'+obj+'/unshelved');
		promise.then(function(data) {
			$scope.fx_goodslist[index]=data;
			console.log(data);
		}, function(data) {

		});
     }
     
})



/* 会员管理*/
app.controller("usrsList",function($scope,$http,$state,API){
     $scope.de=false;
     $scope.list=true;
     $http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})
        .success(function(data){
         $scope.regionInfo=data; })
     $scope.getCity=function(){
          $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+$scope.regioning})
        .success(function(data){$scope.citys=data;}) 
        if (!$scope.regioning) {$scope.citying=undefined,$scope.regioning=undefined};
    }
     $scope.show = function(url){
        if(!url){url=API.bast_path+'/wechatmember/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'wechat_aliasname':$scope.wechat_aliasname,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    $scope.show(API.bast_path+'/wechatmember/list?pageNo='+$scope.currentPage);
                };
                $scope.userDetails = function(id){
                   
                    $http({ method:'GET',url:API.bast_path+'/wechatmember/detail?member_id='+id})
                     .success(function(data){ console.log(data);$scope.userDetail=data; $scope.de=true;
                    $scope.list=false; })

                    
                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
     $scope.search=function(){
         $scope.show();
    }
    $scope.listshow=function(){
       $scope.de=false;
       $scope.list=true;
    }

})

/*会员详情*/
app.controller("userDetail",function($scope,$http,$state,API,$stateParams){
    $http({ method:'GET',url:API.bast_path+'/wechatmember/detail?member_id='+$stateParams.id})
    .success(function(data){ console.log(data);$scope.userDetail=data;})

})


/*商品列表 公共*/
app.controller("goodslist",function($scope,$http,$state,API){
    $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id=0'})
        .success(function(data){
         $scope.goodsclass=data; })
    $http({ method:'GET',url:API.bast_path+'/brand/listall'})
        .success(function(data){
         $scope.brand=data; console.log(data);
      })
    $scope.add=false;
    $scope.list=true;
    $scope.detail=false;

    $scope.detailshow=function(id){
        $scope.add=false;
        $scope.list=false;
        $scope.detail=true;
        $http({ method:'GET',url:API.bast_path+'/goodscommon/detail?goods_id='+id})
        .success(function(data){
             $scope.goodsetail=data; console.log(data);
             $scope.pclass=$scope.goodsetail.gcNo;
              $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id='+$scope.goodsetail.gcNo})
               .success(function(data){
                     $scope.sgoodsclass=data; console.log(data); 
                })
            $scope.sclass=data.gcLitId;
         })
    }
    $scope.getsbclass=function(){
        $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id='+$scope.pclass})
               .success(function(data){
                     $scope.sgoodsclass=data; 
         })

    }

    $scope.check=function(id){
        if(confirm("确认审核通过?")){
             $http({ method:'PUT',url:API.bast_path+'/goodscommon/check/'+id})
            .success(function(data){
                alert('已审核通过');
                $state.go("goods.list",null,{reload:true});
                console.log(data);
            })
         }

    }
    $scope.uncheck=function(id){
        if(confirm("确认驳回申请?")){
             $http({ method:'PUT',url:API.bast_path+'/goodscommon/uncheck/'+id})
            .success(function(data){
                 alert('申请已驳回');
                $state.go("goods.list",null,{reload:true});
                console.log(data);
            })
         }   
    }

    $scope.listshow=function(){
        $scope.list=true;
        $scope.detail=false;
        $scope.add=false;
    }
    $scope.addshow=function(){
        $scope.list=false;
        $scope.detail=false;
        $scope.add=true;
    }


     $scope.postgoods=function(){
       $http({ method:'POST',
               data:{
                    "brand_no" :parseInt($scope.addbrand_no),
                    "goods_name":$scope.addgoods_name,
                    "goods_sn":$scope.addgoods_sn,
                    "gc_no":parseInt($scope.pclass),
                    "gc_lit_id":parseInt($scope.sclass),
                    "goods_spec":$scope.addgoods_spec,
                    "goods_image":$scope.addimg,
                    
                    "goods_body":$scope.addgoodbody,
                },
             url:API.bast_path+'/goodscommon/add'})
            .success(function(data){
               alert('新增成功');
                $state.go("goods.list",null,{reload:true});

          }).error(function(data){
              alert(data.msg);
        });
    }

    $scope.savegoods=function(id){
        //alert(id);
       $http({ method:'PUT',
               data:{
                    "brand_no" :parseInt($scope.goodsetail.brandNo),
                    "goods_name":$scope.goodsetail.goodsName,
                    "goods_sn":$scope.goodsetail.goodsSn,
                     
                    "gc_no":parseInt($scope.pclass),
                    "gc_lit_id":parseInt($scope.sclass),
                    "goods_spec":$scope.goodsetail.goodsSpec,
                    "goods_image":$scope.goodsetail.goodsImage,
                    "goods_image_small":$scope.goodsetail.goodsImageSmall,
                    "goods_body":$scope.goodsetail.goodsBody,
                },
             url:API.bast_path+'/goodscommon/edit/'+id})
            .success(function(data){
                console.log(data);
                 //if(data.message=='操作成功'){
                        alert('修改成功');

                // }
          }).error(function(data){
              alert(data.msg);
        });
    }

})

/*商品管理>入库商品*/
app.controller("goodsverify",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/goodscommon/list?pageNo=1&goods_verify=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'goods_name':$scope.goods_name,
                    'gc_no':$scope.gc_no,
                    'brand_no':$scope.brand_no,
                }
            }).success(function(data){
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                    
                        $scope.show(API.bast_path+'/goodscommon/list?goods_verify=1&pageNo='+$scope.currentPage);
                        //console.log(API.bast_path+'/goodscommon/list?pageNo='+$scope.currentPage);
                };
                $scope.goodsDetails = function(id){
                    


                };
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
       //alert($scope.gc_no);
      $scope.show();

    }

    
});

/*商品管理>待审核商品*/
app.controller("goodsstorage",function($scope,$http,$state,API){
    var show = function(url){
        if(!url){url=API.bast_path+'/goodscommon/list?pageNo=1&goods_verify=0'};
        $http({
                method:'GET',
                  params:{
                    'goods_name':$scope.goods_name,
                    'gc_no':$scope.gc_no,
                    'brand_no':$scope.brand_no,
                },
                url:url
            }).success(function(data){
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        show(API.bast_path+'/goodscommon/list?pageNo='+$scope.currentPage+'&goods_verify=0');
                };
                $scope.goodsDetails = function(id){
                  


                };
        }).error(function(data){
            console.log(data);
        });
    }
    show();
    $scope.search=function(){
       //alert($scope.gc_no);
     show();

    }
});


/*商品详情*/
app.controller("goodsDetails",function($scope,$http,$state,API,$stateParams){
       // alert($stateParams.id+'--'+$stateParams.page);
    $http({ method:'GET',url:API.bast_path+'/goodscommon/detail?brand_no='+$stateParams.id})
    .success(function(data){ console.log(data);$scope.brandDetail=data;})


})

/*商品品牌*/
app.controller("brandList",function($scope,$http,$state,API){
      $scope.show=function(url){
        if(!url){url=API.bast_path+'/brand/list?pageNo=1'};
        $http({ method:'GET',
            params:{
                
                "brand_name":$scope.brand_name,
            },
                 url:url})
            .success(function(data){
                  $scope.rows = data.content;
                  console.log($scope.rows);
                    $scope.totalItems = data.totalElements;
                    if(!$scope.currentPage){
                        $scope.currentPage = 1
                    }
                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };
                    $scope.pageChanged = function() {
                       // console.log(API.bast_path+'/brand/list?pageNo='+$scope.currentPage);
                            $scope.show(API.bast_path+'/brand/list?pageNo='+$scope.currentPage);
                    };
                    $scope.adminDetails = function(id){
            
                        $state.go("goods.brandDetail",{ id: id,page:$scope.currentPage});
                };

            })
    }
    $http({ method:'GET',url:API.bast_path+'/roleinfo/list'})
        .success(function(data){ $scope.role=data;})
    $scope.show();
    $scope.search=function(){
       // alert($scope.user_truename);
       $scope.show();
    }
})


/*品牌详情 更新*/
app.controller("brandDetail",function($scope,$http,$state,API,$stateParams){
  $http({ method:'GET',url:API.bast_path+'/brand/detail?brand_no='+$stateParams.id})
    .success(function(data){ console.log(data);$scope.brandDetail=data;})
  $scope.updateBrand=function(){
    alert($scope.User_name);
        /*$http({ method:'POST',
               data:{
                    "user_name" :$scope.admin.userName,
                    "user_pwd":$scope.userName,
                    "user_truename":$scope.userTruename,
                    "user_phone":$scope.userPhone,
                    "role_id":parseInt($scope.role_id),
                },
             url:API.bast_path+'/userinfo/add'})
            .success(function(data){
                 if(data.message=='操作成功'){
                        alert('新增成功');

                 }
          })*/
  }
})


/*品牌详情 新增*/
app.controller("addBrand",function($scope,$http,$state,API,$stateParams){
   $scope.goods_source=1;

   $http({ method:'GET',url:API.bast_path+'/brand/listall'})
    .success(function(data){ console.log(data);$scope.brandDetail=data;})

  $scope.postBrand=function(){
    if ($scope.form.$valid) {
        for (var i = $scope.brandDetail.length - 1; i >= 0; i--) {
              if ($scope.brand_name == $scope.brandDetail[i].brandName) {
                    $scope.repeatadd=true;
                    return ;
              } 
         };
         $scope.repeatadd=false;
         $http({ method:'POST',
               data:{
                    "brand_name" :$scope.brand_name,
                    "contacts_name":$scope.User_name,
                    "goods_source":parseInt($scope.goods_source),
                    "brand_pic":$scope.brand_pic
                },
             url:API.bast_path+'/brand/add'})
            .success(function(data){
                alert('新增成功');
                $state.go("goods.brand");
          }).error(function(data){
                  alert(data.msg);
        });
        
    }else{
        $scope.chenkerror=true;
    }
    
  }
})



/* 上架商品*/
app.controller("upGoodsList",function($scope,$http,$state,$stateParams,API,servicelist){
	 $scope.de=false;
     $scope.list=true;
     var memberId=$stateParams.data;
//   http://10.0.60.5:8088/zwhs_syl_api/storegood/list?pageNo=1&pageSize=1&gc_no=1&goods_state=1&goods_verify=1&goods_name=1&store_name=1&start_time=1&end_time=1
     
     $scope.init=function(){
     	var obj='pageNo='+1+'&pageSize=10';
     	$scope.pageone=1;
     	var promise = servicelist.get(API.bast_path+'storegood/list?'+obj);
		promise.then(function(data) {
			$scope.goodsList = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = 1;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = 1;
			console.log(data);
		}, function(data) {

		});
     }
      $scope.listshow=function(){
        $scope.de=false;
        $scope.list=true;
    }
     $scope.getGoodsClass=function(){
	var promise = servicelist.get(API.bast_path+'goodsclass/list?parent_id=0');
			promise.then(function(data) {
				$scope.goodsclass = data;
				console.log(data);
			}, function(data) {
	
		});
     }
     
      $scope.pageChanged = function() {
      	if($scope.pageone==1){
      		var obj='pageNo='+$scope.currentPage+'&pageSize=10';
      		
      	}else if($scope.pageone==2){
      		var obj='pageNo='+$scope.currentPage+'&pageSize=10&gc_no='+$scope.gc_no+'&goods_state='+$scope.goods_state+'&goods_verify='+$scope.goods_verify+'&goods_name='+$scope.goods_name+'&store_name='+$scope.store_name+'&start_time='+$scope.start_time+'&end_time='+$scope.end_time;
    	
		}
      	var promise = servicelist.get(API.bast_path+'storegood/list?'+obj);
		promise.then(function(data) {
			$scope.goodsList = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = $scope.currentPage;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = $scope.currentPage;
			console.log(data);
		}, function(data) {

		});
    };
    
     $scope.init();
     $scope.getGoodsClass();
     $scope.search=function(){
     	$scope.pageone=2;
     	var obj='pageNo=1&pageSize=10&gc_no='+$scope.gc_no+'&goods_state='+$scope.goods_state+'&goods_name='+$scope.goods_name+'&goods_verify='+$scope.goods_verify+'&store_name='+$scope.store_name+'&start_time='+$scope.start_time+'&end_time='+$scope.end_time;
       var promise = servicelist.get(API.bast_path+'storegood/list?'+obj);
		promise.then(function(data) {
			$scope.goodsList = data.content;
			$scope.maxSize = 5;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = 1;
			$scope.bigTotalItems = data.totalElements;
			$scope.bigCurrentPage = 1;
			console.log(data);
		}, function(data) {

		});
    }
     
     $scope.down=function(obj,index){
     	console.log(index);
	var promise = servicelist.put(API.bast_path+'storegood/'+obj+'/unshelved');
		promise.then(function(data) {
			$scope.goodsList[index] = data;
			console.log(data);
		}, function(data) {

		});
     }
    $scope.failed=function(obj,index){
	var promise = servicelist.put(API.bast_path+'storegood/'+obj+'/rejected');
		promise.then(function(data) {
			console.log(data);
			$scope.goodsList[index] = data;
		}, function(data) {

		});
     }
      $scope.pass=function(obj,index){
	var promise = servicelist.put(API.bast_path+'storegood/'+obj+'/passed');
		promise.then(function(data) {
			$scope.goodsList[index] = data;
			console.log(data);
		}, function(data) {

		});
     }
      
      
      

    $scope.getsbclass=function(){
        $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id='+$scope.pclass})
               .success(function(data){
                     $scope.sgoodsclass=data; 
         })

    }
      $scope.details=function(obj){
      	 $scope.de=true;
        $scope.list=false;
    	var promise = servicelist.get(API.bast_path+'/brand/listall');
		promise.then(function(data) {
			$scope.brand=data;
			console.log(data);
		}, function(data) {

		});
		
		var promise = servicelist.get(API.bast_path+'/goodsclass/list?parent_id=0');
		promise.then(function(data) {
			$scope.goodsclass=data;
			console.log(data);
		}, function(data) {

		});
      	var promise = servicelist.get(API.bast_path+'storegood/detail?goods_id='+obj);
		promise.then(function(data) {
			$scope.goodsetail=data;
			console.log(data);
		}, function(data) {

		});
      }
})


/* 评论管理列表*/
app.controller("commentList",function($scope,$http,$state,API){
   
    $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id=0'})
        .success(function(data){
         $scope.goodsclass=data; 
         console.log(data);})

     $scope.show = function(url){
        if(!url){url=API.bast_path+'/storegood/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   // "start_time":$scope.start_time,
                    //"end_time":$scope.end_time,
                    "gc_no":$scope.pclass,
                    "store_name":$scope.store_name,
                    "goods_name":$scope.good_name,
                    
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                     $scope.show(API.bast_path+'/storegood/list?pageNo='+$scope.currentPage);
                };
              
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
     $scope.search=function(){
         $scope.show();
    }


})



/*评论详情*/
app.controller("commentDetail",function($scope,$http,$state,API,$stateParams){
    $scope.de=false;
    $scope.list=true;
    $scope.listshow=function(){
        $scope.de=false;
        $scope.list=true;
    }
    

      $scope.userDetails = function(id){
        $scope.de=true;
        $scope.list=false;
        $scope.store_goods_id=id;
        $http({ method:'GET',url:API.bast_path+'/storegood/detail?goods_id='+$scope.store_goods_id})
         .success(function(data){
            console.log(data);
         $scope.detailsing=data; })

        $scope.show = function(url){
           // alert($scope.store_goods_id);
            if(!url){url=API.bast_path+'/evaluategood/list?store_goods_id='+$scope.store_goods_id};
            $http({
                    method:'GET',
                    url:url,
                  
                }).success(function(data){
                    console.log(data);
                    $scope.rows = data.content;
                    $scope.totalItems = data.totalPages;
                    if(!$scope.currentPage){
                        $scope.currentPage = 1
                    }
                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };
                    $scope.pageChanged = function() {
                            $scope.show(API.bast_path+'/evaluategood/list?store_goods_id'+$scope.store_goods_id);
                    };
                    
            }).error(function(data){
                console.log(data);
            }); 

        } 
        $scope.show();
    }

    $scope.evaluategood=function(obj,type){
      $http({ method:'PUT',
              params:{
                    'geval_state':type,
                },
             url:API.bast_path+'/evaluategood/block/'+obj.gevalId})
            .success(function(data){
               alert('修改成功');
               obj.gevalState=type;
             
          })
    }


})

/*分类管理*/
app.controller("goodsClassify",function($scope,$http,$state,API){
    $scope.show=function(){
         $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id=0'})
        .success(function(data){ console.log(data);$scope.todos=data;})
    }
    $scope.show();
        $scope.todospar=([]);
        $scope.todossub=([]);
    $scope.saveClassify=function(obj){ //更新分类
       if (obj.gcName== undefined) {alert('请填写分类信息后保存')}else{
        if (obj.gcName.length>20) {alert('分类名不能超过20位');return;};
         $http({ method:'PUT',
            data:{
                    "gc_name" :obj.gcName,
                    "gc_title":obj.gcName,

                },
            url:API.bast_path+'/goodsclass/edit/'+parseInt(obj.gcNo)})
         .success(function(data){ console.log(data); alert('修改成功');$scope.show();})
      };
    }
    $scope.removeClassify=function(obj){//删除一级分类
         $http({ method:'DELETE',
            url:API.bast_path+'/goodsclass/delete/'+parseInt(obj.gcNo)})
         .success(function(data){ 
             $scope.show();alert('删除成功');
         })
         .error(function(data){
             alert('存在二级分类或分类下存在商品,删除失败');});
    }
    $scope.removesubClassify=function(obj){//删除二级分类
         $http({ method:'DELETE',
           
            url:API.bast_path+'/goodsclass/delete/'+parseInt(obj.gcNo)})
         .success(function(data){ 
            $scope.subclass($scope.subclassobj);alert('删除成功');
         })
         .error(function(data){
             alert('存在二级分类或分类下存在商品,删除失败');});
    }
     $scope.addparClassify=function(){  //一级分类新增临时
      $scope.todospar.push([{"new":123}]);
    }
    $scope.addsubClassify=function(){  //二级分类新增临时
      $scope.todossub.push([{"new":123}]);
    }
    $scope.subclass=function(obj){ //选择二级分类AJAX查询
        $scope.subclassobj=obj;
        $scope.subclasstitle=obj.gcName;
        $http({ method:'GET',url:API.bast_path+'/goodsclass/list?parent_id='+obj.gcNo})
        .success(function(data){ console.log(data);$scope.subtodos=data;})
        $scope.subselect=true;
    }
    $scope.clear=function(){ //隐藏二级分类框
        $scope.subselect=false;
    }
    $scope.addclass=function(obj){//新增一级分类
      if (obj.gcName== undefined) {alert('请填写分类信息后保存')}else{
        if (obj.gcName.length>20) {alert('分类名不能超过20位');return;};
         $http({ method:'POST',
            data:{
                    "gc_name" :obj.gcName,
                    "gc_parent_id":0,
                    "gc_sort":0,
                    "gc_title":obj.gcName,
                },
            url:API.bast_path+'/goodsclass/add'})
         .success(function(data){ console.log(data);$scope.todospar.splice(obj,1);$scope.show();alert('新增成功');})
      };
    }
    $scope.subaddclass=function(obj){//新增二级分类
      if (obj.gcName== undefined) {alert('请填写分类信息后保存')}else{
        if (obj.gcName.length>20) {alert('分类名不能超过20位');return;};
         $http({ method:'POST',
            data:{
                    "gc_name" :obj.gcName,
                    "gc_parent_id":$scope.subclassobj.gcNo,
                    "gc_sort":0,
                    "gc_title":obj.gcName,
                },
            url:API.bast_path+'/goodsclass/add'})
         .success(function(data){ console.log(data);$scope.todossub.splice(obj,1);$scope.subclass($scope.subclassobj);alert('新增成功');})
       
      };
    }
    $scope.unsetaddclass=function(obj){//删除临时一级临时分类
            $scope.todospar.splice(obj,1);
    }
    $scope.unsetasubddclass=function(obj){//删除二级临时分类
            $scope.todossub.splice(obj,1);
    }

})

/*店铺分成管理*/
app.controller("storeDivide",function($scope,$http,$state,API){
    $scope.show=function(){
        $http({ method:'GET',url:API.bast_path+'/storesg/list'})
        .success(function(data){ console.log(data);$scope.Divide=data})
    }
    $scope.show();

    $scope.list=[];
    $scope.addDivide=function(list){//新增临时分成
        list.push({"id": 1,});
    }
    $scope.unsetDetails=function(obj){//删除临时分成
             $scope.list.splice(obj,1);
    }

    $scope.postDivide=function(obj,chenk){//新增分成

        for (var i = $scope.Divide.length - 1; i >= 0; i--) {
            if (obj.sgName==$scope.Divide[i].sgName) {
                alert("店铺分成等级名重复");
                 return;
            };
        };

        if (!chenk){   alert('店铺等级和分成比例不能为空'); return;};
        var userreg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
        if(!userreg.test(obj.commisRates)){
            alert("店铺提成比例,必须为非负数或小数[小数最多精确到小数点后两位]!");
            return;
        }
        if(obj.commisRates > 98){
            alert('分成比例不能超过99');
            return ;
        }
        if(obj.commisRates<0){
            alert('分成比例小于0');
            return ;
        }
    
         $http({ method:'POST',
            data:{
                    "sg_name" :obj.sgName,
                    "commis_rates":parseFloat(obj.commisRates),
                },
            url:API.bast_path+'/storesg/add'})
         .success(function(data){ console.log(data);$scope.list.splice(obj,1);$scope.show();alert('新增成功');})
       
      
    }
    $scope.saveDivide=function(obj){

        var userreg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
        if(!userreg.test(obj.commisRates)){
            alert("店铺提成比例,必须为非负数或小数[小数最多精确到小数点后两位]!");
            return;
        }


         if(obj.commisRates > 98){
            alert('分成比例不能超过99');
            return ;
        }
        if(obj.commisRates<0){
            alert('分成比例小于0');
            return ;
        }


        for (var i = $scope.Divide.length - 1; i >= 0; i--) {
            if (obj.sgName==$scope.Divide[i].sgName && obj.sgId!=$scope.Divide[i].sgId) {
                
                alert("店铺分成等级名重复");
                 return;
            };
        };


        if (obj.sgName == undefined && obj.commisRates == undefined) {alert('请填分成信息后保存')}else{
         $http({ method:'PUT',
            data:{
                    "sg_name" :obj.sgName,
                    "commis_rates":obj.commisRates,
                },
            url:API.bast_path+'/storesg/edit/'+obj.sgId})
         .success(function(data){ console.log(data);$scope.show();alert('修改成功');})
         .error(function(data){
             alert(data.msg);})

        }
    }
    $scope.removeDetails=function(obj){//删除二级分类
      /*   $http({ method:'DELETE',
            url:API.bast_path+'/storesg/delete/'+parseInt(obj.sgId)})
         .success(function(data){ 
           $scope.show();alert('删除成功');
         })
         .error(function(data){
             alert('存在二级分类或分类下存在商品,删除失败');});*/
    }



})
/*店铺分成管理*/
app.controller("storeadd",function($scope,$http,$state,API,$modal,$stateParams){
	$scope.getLevel=function(){
			$http({ method:'GET',url:API.bast_path+'/store/sgs'})//取等级
	        	.success(function(data){
			        $scope.Level=data;
			        console.log(data);
			        
          		})
		}
		$scope.getLevel();
	$scope.id=$stateParams.data;
	if($scope.id!=undefined){
		$http({ method:'GET',url:API.bast_path+'/store/detail?store_id='+$scope.id})
	        	.success(function(data){
			        console.log(data);
			        $scope.detail=data;
			        $scope.isdetail=true;
          		})
			}
		
		$scope.getProvince=function(){
		 	$http({ method:'GET',url:API.bast_path+'/regionInfo/getProvince'})//取省级表
	        	.success(function(data){
			        $scope.Province=data;
			        console.log(data);
          		})
		 }
		$scope.getProvince();
	    $scope.getCity=function(obj){//取市级表
	    	var objcode=obj.split('-')[0];
              $http({ method:'GET',url:API.bast_path+'/regionInfo/getCity?region_code='+objcode})
            .success(function(data){$scope.City=data;}) 
        }
        $scope.getArea=function(obj){//取区级表
        	var objcode=obj.split('-')[0];
              $http({ method:'GET',url:API.bast_path+'/regionInfo/getArea?region_code='+obj})
            .success(function(data){$scope.Area=data;}) 
        }
		$scope.getCommisRates=function(obj){
        for (var i = $scope.Level.length - 1; i >= 0; i--) {
           if ($scope.Level[i].sgId==obj) { 
                $scope.detail.commisRates=$scope.Level[i].commisRates;
           };
        };
    }

  $scope.add=function(valid){//保存
  		
  		if(valid){
			if($scope.detail.ownerCardFront==undefined){
				alert("请上传身份证正面照片");
				return;
			}else if($scope.detail.ownerCardBack==undefined){
				alert("请上传身份证反面照片");
				return;
			}else if($scope.detail.storeImage==undefined){
				alert("请上传经营地点照片");
				return;
			}else if($scope.detail.businessLicence==undefined){
				alert("请上传营业执照");
				return;
			}else{
				if(!$scope.isdetail){
					$scope.detail.regionProv=$scope.detail.regionProv.split("-")[0];
					$scope.detail.regionCity=$scope.detail.regionCity.split("-")[0];
					$scope.detail.companyRegion=$scope.detail.companyRegion.split("-")[0];
					$scope.detail.regionProvName=$scope.detail.regionProv.split("-")[1];
					$scope.detail.regionCityName=$scope.detail.regionCity.split("-")[1];
					$scope.detail.companyRegionName=$scope.detail.companyRegion.split("-")[1];
				}
	  			var objdata={
	  				'companyName':$scope.detail.companyName,
	  				'companyAddress':$scope.detail.companyAddress,
	  				'userPhone':$scope.detail.userPhone,
	  				'sgId':$scope.detail.sgId,
	  				'commisRates':$scope.detail.commisRates,
	  				'regionProv':$scope.detail.regionProv,
	  				'regionCity':$scope.detail.regionCity,
	  				'companyRegion':$scope.detail.companyRegion,
	  				'regionProvName':$scope.detail.regionProvName,
	  				'regionCityName':$scope.detail.regionCityName,
	  				'regionAreaName':$scope.detail.companyRegionName,
	  				'storeOwner':$scope.detail.storeOwner,
	  				'companyFax':$scope.detail.companyFax,
	  				'companyPostcode':$scope.detail.companyPostcode,
	  				'storeOwnerCard':$scope.detail.storeOwnerCard,
	  				'bankAccNumber':$scope.detail.bankAccNumber,
	  				'bankAccName':$scope.detail.bankAccName,
	  				'bankName':$scope.detail.bankName,
	  				'businessLicence':$scope.detail.businessLicence,
	  				'ownerCardFront':$scope.detail.ownerCardFront,
	  				'ownerCardBack':$scope.detail.ownerCardBack,
	  				'storeImage':$scope.detail.storeImage,
	  			}
	  			console.log(objdata);
	  			$http({ method:'post',url:API.bast_path+'store/add',data:objdata}).success(function(data){
           		 	console.log(data);
           		 	$state.go("store.list");
           		 })
	  			
			}
  		}else{
  			alert("请检查是否有未填写的信息");
  		}
  	
  	
    }


})


/*财务》支出列表*/
app.controller("financelist",function($scope,$http,$state,API,$modal){
        $scope.listing=true;
        $scope.Details=false;    
        $scope.listshow=function(show){
           $scope.listing=true;
           $scope.Details=false;
         }

        $scope.show = function(url){
        if(!url){url=API.bast_path+'/cashrecoder/list?pageNo=1&confirm_stat=2'};
        $http({
                method:'GET',
                url:url,
                params:{
                   'start_time':$scope.stime,
                    'end_time':$scope.etime,
                    'cash_no':$scope.pay_id,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/cashrecoder/list?pageNo='+$scope.currentPage+'&confirm_stat=2');
                };
                $scope.financeDetails = function(id){

                    var modalInstance = $modal.open({
                        templateUrl: 'views/finance/detail.html',
                        controller: 'financeitem',
                        size:'lg',
                         resolve: {
                                items: function () {
                                  return id;
                                }
                              }
                        });
              
                    $scope.listing=false;
                    $scope.Details=true;
                };
        }).error(function(data){
            console.log(data);
        });
    }


    $scope.show();
        $scope.search=function(){
          //  $scope.start_time=$scope.stime? $scope.stime:undefined;
          //  $scope.end_time=$scope.etime? $scope.etime:undefined;
          //  $scope.cash_no=$scope.cno? $scope.cno:undefined;
         //   $scope.company_name=$scope.cname? $scope.cname:undefined;
            $scope.show();
    }
    
})
/*财务》驳回列表*/
app.controller("financeturn",function($scope,$http,$state,API,$modal){
        $scope.listing=true;
        $scope.Details=false;    
        $scope.listshow=function(show){
           $scope.listing=true;
           $scope.Details=false;
         }

        $scope.show = function(url){
        if(!url){url=API.bast_path+'/cashrecoder/list?pageNo=1&confirm_stat=3'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'start_time':$scope.stime,
                    'end_time':$scope.etime,
                    'cash_no':$scope.cash_no,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalPages;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/cashrecoder/list?pageNo='+$scope.currentPage+'&confirm_stat=3');
                };
                $scope.financeDetails = function(id){
                     var modalInstance = $modal.open({
                        templateUrl: 'views/finance/detail.html',
                        controller: 'financeitem',
                        size:'lg',
                         resolve: {
                                items: function () {
                                  return id;
                                }
                              }
                        });
                    $scope.listing=false;
                    $scope.Details=true;
                };
        }).error(function(data){
            console.log(data);
        });
    }

    
    $scope.show();
        $scope.search=function(){
           // $scope.start_time=$scope.stime? $scope.stime:undefined;
          //  $scope.end_time=$scope.etime? $scope.etime:undefined;
          //  $scope.cash_no=$scope.cno? $scope.cno:undefined;
           // $scope.company_name=$scope.cname? $scope.cname:undefined;
            $scope.show();
    }
    
})


app.controller("financeitem",function($scope,$modalInstance,items){
    $scope.items=items;
    
   
})

app.controller("financemodal",function($scope,$http,API){
    $http({ method:'GET',url:API.bast_path+'/cashrecoder/detail?cash_no='+$scope.items})
    .success(function(data){ console.log(data);$scope.financemodal=data;})

   
})



/*财务》未审核*/
app.controller("financeAudit",function($scope,$http,$state,API){
         $scope.listing=true;
          $scope.Details=false;    
        $scope.listshow=function(show){
           $scope.listing=true;
           $scope.Details=false;
         }

        $scope.show = function(url){
        if(!url){url=API.bast_path+'/cashrecoder/list?pageNo=1&confirm_stat=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'start_time':$scope.stime,
                    'end_time':$scope.etime,
                    'cash_no':$scope.cash_no,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/cashrecoder/list?pageNo='+$scope.currentPage+'&confirm_stat=0');
                };
                $scope.financeDetails = function(id){
                    $http({ method:'GET',url:API.bast_path+'/cashrecoder/detail?cash_no='+id})
                    .success(function(data){ console.log(data);$scope.AuditDetails=data;})
                    $scope.listing=false;
                    $scope.Details=true;
                };
        }).error(function(data){
            console.log(data);
        });
    }

    $scope.Auditorder=function(id){
      
        if (confirm("确认审核通过?")) {
             $http({ method:'PUT',
                   data:{"confirm_stat" :1},
                 url:API.bast_path+'/cashrecoder/check/'+parseInt(id)})
                .success(function(data){
                    alert('审核成功');
                  
                    $scope.listing=true;
                    $scope.Details=false;  
                    $scope.show();  
              })
        }
    }
    $scope.rejectedorder=function(id){
       
        if (confirm("确认审核驳回?")) {
             $http({ method:'PUT',
                   data:{"confirm_stat" :3},
                 url:API.bast_path+'/cashrecoder/reject/'+parseInt(id)})
                .success(function(data){
                 
                    alert('驳回成功');
                    $scope.listing=true;
                    $scope.Details=false;  
                    $scope.show();  
              })
        }
    }


    $scope.show();
        $scope.search=function(){
        
            $scope.show();
    }
    
})


/*财务》待打款(出纳凭证)*/
app.controller("financeCashier",function($scope,$http,$state,API){
         $scope.listing=true;
          $scope.Details=false;    
        $scope.listshow=function(show){
           $scope.listing=true;
           $scope.Details=false;
         }

        $scope.show = function(url){
        if(!url){url=API.bast_path+'/cashrecoder/list?pageNo=1&confirm_stat=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   'start_time':$scope.stime,
                    'end_time':$scope.etime,
                    'cash_no':$scope.cash_no,
                    'company_name':$scope.company_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalPages;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/cashrecoder/list?pageNo='+$scope.currentPage+'&confirm_stat=1');
                };
                $scope.financeDetails = function(id){
                  // $scope.brandDetail.brandPic=undefined;
                    $http({ method:'GET',url:API.bast_path+'/cashrecoder/detail?cash_no='+id})
                    .success(function(data){ console.log(data);$scope.AuditDetails=data;})
                    $scope.listing=false;
                    $scope.Details=true;
                };
        }).error(function(data){
            console.log(data);
        });
    }

   $scope.Auditorder=function(id){
        if(!$scope.AuditDetails.payingCertificate){ alert('请上传打款凭证后点击确认打款');return;}
        if (confirm("请确认您已正确上传该笔提款订单的打款凭证,确认打款后申请人将能够对该支付单据及凭证进行查询")) {
            $http({ method:'PUT',
                   data:{"confirm_stat" :2,
                   "paying_user_name":$scope.User_name,
                    "paying_certificate":$scope.AuditDetails.payingCertificate},
            url:API.bast_path+'/cashrecoder/paymoney/'+parseInt(id)})
                .success(function(data){
                   alert('打款成功');
                   $scope.listing=true;
                   $scope.Details=false;  
                   $scope.show();  
              }).error(function(data){
                alert("请上传凭证");
            });
        }
    }
    $scope.show();
        $scope.search=function(){
          
            $scope.show();
    }
    
})


/* 支出明细 */
app.controller("financeIncome",function($scope,$http,$state,API){
     $scope.detailing=false;
     $scope.list=true;
     $scope.detailshow=function(id){

       $http({ method:'GET',url:API.bast_path+'/storepay/detail?pay_id='+id})
    .success(function(data){ console.log(data);$scope.storepayDetail=data;})
       $scope.detailing=true;
       $scope.list=false;

     }
     $scope.listshow=function(show){
       $scope.detailing=false;
        $scope.list=true;
     }/**/
})

/*财务收入 */
app.controller("financeIncomeall",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/storepay/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "start_time":$scope.stime,
                    "end_time":$scope.etime,
                  
                    "pay_id":$scope.pay_id,
                    "company_name":$scope.company_name,
                    'pay_member_name':$scope.pay_member_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                }
                $scope.pageChanged = function(){
                  $scope.show(API.bast_path+'/storepay/list?pageNo='+$scope.currentPage);
                }
               
        })
    }

     $scope.search=function(){
         
            $scope.show();
    }
    $scope.show();/**/

})

/* 平台账户列表 */
app.controller("adminList",function($scope,$http,$state,API){
 
    $scope.show=function(url){
        if(!url){url=API.bast_path+'/userinfo/list?pageNo=1'};
        $http({ method:'GET',
            params:{
                'role_id':$scope.role_ids,
                'user_state':$scope.user_state,
                'user_truename':$scope.user_truename,
            },
                 url:url})
            .success(function(data){
                    console.log(data);
                  $scope.rows = data.content;
                    $scope.totalItems = data.totalElements;
                    if(!$scope.currentPage){
                        $scope.currentPage = 1
                    }
                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };
                    $scope.pageChanged = function() {
                        console.log(API.bast_path+'/userinfo/list?pageNo='+$scope.currentPage);
                            $scope.show(API.bast_path+'/userinfo/list?pageNo='+$scope.currentPage);
                    };
                    $scope.adminDetails = function(id){
                       
                        $state.go("admin.detail",{ id: id,key:"key"});
                };

            })
    }
    $http({ method:'GET',url:API.bast_path+'/roleinfo/list'})
        .success(function(data){ 
            console.log(data);
          data.splice(data[0], 1);
           $scope.role=data;  })
    $scope.show();
    $scope.search=function(){
       // alert($scope.user_truename);
       $scope.show();
    }
})

/* 平台账户详情 */
app.controller("adminDetails",function($scope,$http,$state,API,$stateParams,API){
    $http({ method:'GET',url:API.bast_path+'/roleinfo/list'})
        .success(function(data){
              data.splice(data[0], 1);
             $scope.role=data;  
        })

    $http({ method:'GET',url:API.bast_path+'/userinfo/detail?user_id='+$stateParams.id})
            .success(function(data){
                console.log(data);
                $scope.details=data; 
                $scope.roleId=data.roleId;
                $scope.userState=data.userState;    
            })
   
     $scope.updatedamin=function(){
          if($scope.form.$valid){
               if ($scope.roleId==1) {alert('超级管理员账户已存在,请重新选择');return;};
                var userreg=/^[0-9]{1,11}$/;
                if(!userreg.test($scope.details.userPhone)){
                    alert("手机号码不合法,请输入11位数字号码。");
                    return;
                }
           
               $http({ method:'PUT',
                       data:{
                            "user_id" :parseInt($stateParams.id),
                            "user_name":$scope.details.userName,
                            "user_pwd":$scope.details.userPwd,  
                            "user_truename":$scope.details.userTruename,
                            "user_phone":$scope.details.userPhone,
                            "role_id":parseInt($scope.roleId),
                            "user_state":parseInt($scope.userState),
                        },
                     url:API.bast_path+'/userinfo/modify'})
                    .success(function(data){
                        alert('修改成功');
                       $state.go("admin.list");
                  })
            }else{ $scope.chenkerror=true;}
     }
});

/* 平台账户新增 */
app.controller("adminAdd",function($scope,$http,$state,API,$stateParams,API){

     $scope.userState=1;
     $http({ method:'GET',url:API.bast_path+'/roleinfo/list'})
        .success(function(data){ 
           data.splice(data[0], 1);
           $scope.role=data;  
  　     　$scope.role_id=4;
     })

    $scope.addadmin=function(){ 
            if($scope.form.$valid){
                 var userreg=/^[0-9]{1,11}$/;
                if(!userreg.test($scope.userPhone)){
                    alert("手机号码不合法,请输入11位数字号码。");
                    return;
                }
                 
                $http({ method:'POST',
                   data:{
                        "user_name" :$scope.admin.userName,
                        "user_pwd":$scope.userPwd,
                        "user_truename":$scope.userTruename,
                        "user_phone":$scope.userPhone,
                        "role_id":parseInt($scope.role_id),
                        "user_state":parseInt($scope.userState),
                    },
                 url:API.bast_path+'/userinfo/add'})
                .success(function(data){
                     alert('新增成功');
                     $state.go("admin.list");})
                .error(function(data){
                      alert(data.msg);});

            }else{
                $scope.chenkerror=true;
            }
    }
    //$scope.$apply($scope.role_id=3);
     //默认选中
      //　$scope.$apply(function () {
     　//　 $scope.role_id='3';
    //  });


})


/*上门服务管理*/
app.controller("openservice",function($scope,$http,$state,API){
    $scope.show=function(){
        $http({ method:'GET',url:API.bast_path+'/serviceWhiteLists'})
        .success(function(data){ console.log(data);$scope.Divide=data})
    }
    $scope.show();

    $scope.list=[];
    $scope.addDivide=function(list){//新增临时分成
        list.push({"id": 1,});
    }
    $scope.unsetDetails=function(obj){//删除临时分成
             $scope.list.splice(obj,1);
    }

    $scope.postDivide=function(obj){//新增分成
          if(obj.sgName==undefined) {alert('请输入母婴店编号');return;};
        if(obj.sgName==null) {alert('请输入母婴店编号');return;};
        if(obj.sgName=='') {alert('请输入母婴店编号');return;};
         $http({ method:'POST',
            url:API.bast_path+'/serviceWhiteLists/store/'+obj.sgName})
         .success(function(data){ console.log(data);$scope.list.splice(obj,1);$scope.show();alert('新增成功');})
         .error(function(data){
             alert(data.msg);});
      
    }
   
    $scope.removesubClassify=function(obj){//
         $http({ method:'DELETE',
            url:API.bast_path+'/serviceWhiteLists/'+parseInt(obj.id)})
         .success(function(data){ 
           $scope.show();alert('删除成功');
         })
         .error(function(data){
             alert('删除失败');});
    }
})



/*母婴知识分类管理*/
app.controller("knowledgetype",function($scope,$http,$state,API){
    $scope.show=function(){
        $http({ method:'GET',url:API.bast_path+'/articleClasses'})
        .success(function(data){ console.log(data);$scope.Divide=data})
    }
    $scope.show();

    $scope.list=[];
    $scope.addDivide=function(list){//新增临时分成
        list.push({"id": 1,});
    }
    $scope.unsetDetails=function(obj){//删除临时分成
             $scope.list.splice(obj,1);
    }

    $scope.postDivide=function(obj){//新增

        if(obj.sgName==undefined) {alert('母婴知识请填写分类名');return;};
        if(obj.sgName==null) {alert('母婴知识请填写分类名');return;};
        if(obj.sgName=='') {alert('母婴知识请填写分类名');return;};
    
        $http({ method:'POST',
               data:{"articleClassName" :obj.sgName},
             url:API.bast_path+'/articleClasses'})
            .success(function(data){
                 $scope.list.splice(obj,1);$scope.show();alert('新增成功')
          })
    }
   
    $scope.removesubClassify=function(obj){//
         $http({ method:'DELETE',
            url:API.bast_path+'/articleClasses/'+parseInt(obj.articleClassId)})
         .success(function(data){ 
           $scope.show();alert('删除成功');
         })
         .error(function(data){
             alert('删除失败,请检查分类中是否存在文章');});
    }
})



/*母婴知识文章管理*/
app.controller("knowledgelist",function($scope,$http,$state,API){

    $http({ method:'GET',url:API.bast_path+'/articleClasses'})
     .success(function(data){ console.log(data);$scope.Divide=data});

    $scope.show=function(url){
        if(!url){url=API.bast_path+'/knowledgeInfo?pageNo=1'};
        $http({ method:'GET',
            params:{
               'keyword':$scope.keyword,
                'articleClassId':$scope.articleClassId,
            },
                 url:url})
            .success(function(data){
                console.log(data);
                  $scope.listing=data;
                    $scope.totalItems = data.totalElements;
                    if(!$scope.currentPage){
                        $scope.currentPage = 1
                    }
                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };
                    $scope.pageChanged = function() {
                             $scope.show(API.bast_path+'/knowledgeInfo?pageNo='+$scope.currentPage);
                    };
            })
    }    
     $scope.show();
    $scope.detailshow=function(id){
        $scope.add=false;
        $scope.list=false;
        $scope.detail=true;
        $http({ method:'GET',url:API.bast_path+'/knowledgeInfo/detail/'+id})
        .success(function(data){

             $scope.goodsetail=data; console.log(data);
            
        
         })
    }

    $scope.add=false;
    $scope.list=true;
    $scope.detail=false;

    
    $scope.listshow=function(){
        $scope.list=true;
        $scope.detail=false;
        $scope.add=false;
    }

    $scope.addshow=function(){
        $scope.list=false;
        $scope.detail=false;
        $scope.add=true;
    }


     $scope.postgoods=function(){
       $http({ method:'POST',
               data:{
                    "articleTitle" :$scope.addarticleTitle,
                    "articleClassId":$scope.addarticleClassId,
                    "articleState":$scope.addarticleState,
                    "coverPic":$scope.addcoverPic,
                    "thumbnailPic":$scope.addthumbnailPic,
                    "articleComments":$scope.addarticleComments,
                },
             url:API.bast_path+'/knowledgeInfo'})
            .success(function(data){
             alert('新增成功');
        $state.go("knowledge.list",null,{reload:true});//跳转到登录界面
                
                 
          }).error(function(data){
             alert('新增失败,请填写完整信息');});
    }

    $scope.savegoods=function(){
       $http({ method:'PUT',
               data:{
                    "articleTitle" :$scope.goodsetail.articleTitle,
                    "articleClassId":$scope.goodsetail.articleClassId,
                    "articleState":$scope.goodsetail.articleState,
                    "coverPic":$scope.goodsetail.coverPic,
                    "thumbnailPic":$scope.goodsetail.thumbnailPic,
                    "articleComments":$scope.goodsetail.articleComments,
                },
             url:API.bast_path+'/knowledgeInfo/'+$scope.goodsetail.id})
            .success(function(data){
                console.log(data);
                 //if(data.message=='操作成功'){
                        alert('修改成功');
                        $state.go("knowledge.list",null,{reload:true});//跳转到知识首页
                // }
          })/**/
    }
     $scope.search=function(){
        $scope.show();
     }



})





/*优惠券(公共)*/
app.controller("coupon",function($scope,$http,$state,API,$stateParams){
     $scope.coupon_limit=1;
     $http({ method:'GET',url:API.bast_path+'/storesg/list'}) //取店铺等级表
        .success(function(data){ console.log(data);$scope.Divide=data});
    $scope.list=true;
    $scope.detail=false;
    $scope.adding=false;
    $scope.listshow=function(){
        $scope.list=true;
        $scope.detail=false;
         $scope.adding=false;
    }
    $scope.detailshow=function(id){
        $scope.list=false;
        $scope.detail=true;
        $scope.adding=false;
    }

     $scope.addshow=function(){
        $scope.adding=true;
        $scope.list=false;
        $scope.detail=false;
    }

    $scope.add=function(){ 
        if($scope.form.$valid){ 
            if($scope.effective_time>$scope.expiration_time){
                alert( "优惠券生效日期不能晚于过期日期");
                return false;
            }
            if($scope.coupon_condition<=$scope.coupon_money){
               alert("优惠券金额应该小于订单金额，不能大于等于订单金额");
               return false;   
            }

            $http({ method:'POST',
               data:{
                    "coupon_name" :$scope.coupon_name,
                    "coupon_money":$scope.coupon_money,
                    "coupon_condition":$scope.coupon_condition,
                    "coupon_number":parseInt($scope.coupon_number),
                    "coupon_limit":parseInt($scope.coupon_limit),
                    "effective_time":$scope.effective_time,
                    "expiration_time":$scope.expiration_time,
                    "coupon_desc":$scope.coupon_desc, 
                },
             url:API.bast_path+'/storecoupon/add'})
            .success(function(data){
                 alert('新增成功');
                 $state.go("coupon.list",null,{reload:true});
           })
            .error(function(data){
                  alert(data.msg);});

        }else{
           alert('请先完成优惠券信息填写！');
        }
    }
})




/*优惠券 >全部*/
app.controller("couponlist1",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/storecoupon/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'coupon_name':$scope.searchcoupon_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/storecoupon/list?pageNo='+$scope.currentPage);
                };
              
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
        $scope.show();
    }

     $scope.invalid=function(id){
        if(confirm("失效后将暂停所有店铺的优惠券活动,确认活动失效?")){
            $http({ method:'PUT',
                     url:API.bast_path+'/storecoupon/invalid/'+id})
                    .success(function(data){
                        console.log(data);
                            alert('修改成功');
                             $scope.show();
                  }).error(function(data){
                     console.log(data);
            });
        }    
    }
})



/*优惠券 > 未开始*/
app.controller("couponlist2",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/storecoupon/list?pageNo=1&status=2'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'coupon_name':$scope.searchcoupon_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/storecoupon/list?pageNo='+$scope.currentPage+'&status=2');
                };
              
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
    // $scope.coupon_name=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.show();
    }

     $scope.invalid=function(id){
        if(confirm("失效后将暂停所有店铺的优惠券活动,确认活动失效?")){
            $http({ method:'PUT',
                     url:API.bast_path+'/storecoupon/invalid/'+id})
                    .success(function(data){
                        console.log(data);
                            alert('修改成功');
                             $scope.show();
                  }).error(function(data){
                     console.log(data);
            });
        }    
    }
})



/*优惠券 > 进行中*/
app.controller("couponlist3",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/storecoupon/list?pageNo=1&status=3'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'coupon_name':$scope.searchcoupon_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/storecoupon/list?pageNo='+$scope.currentPage+'&status=3');
                };
              
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
    // $scope.coupon_name=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.show();
    }

     $scope.invalid=function(id){
        if(confirm("失效后将暂停所有店铺的优惠券活动,确认活动失效?")){
            $http({ method:'PUT',
                     url:API.bast_path+'/storecoupon/invalid/'+id})
                    .success(function(data){
                        console.log(data);
                            alert('修改成功');
                             $scope.show();
                  }).error(function(data){
                     console.log(data);
            });
        }    
    }
})



/*优惠券 > 已结束*/
app.controller("couponlist4",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/storecoupon/list?pageNo=1&status=4'};
        $http({
                method:'GET',
                url:url,
                params:{
                    'coupon_name':$scope.searchcoupon_name,
                }
            }).success(function(data){
                console.log(data);
                $scope.rows = data.content;
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/storecoupon/list?pageNo='+$scope.currentPage+'&status=4');
                };
              
        }).error(function(data){
            console.log(data);
        });
    }
    $scope.show();
    $scope.search=function(){
    // $scope.coupon_name=$scope.regioning=='所有省'? undefined:$scope.regioning;
        $scope.show();
    }

     $scope.invalid=function(id){
        if(confirm("失效后将暂停所有店铺的优惠券活动,确认活动失效?")){
            $http({ method:'PUT',
                     url:API.bast_path+'/storecoupon/invalid/'+id})
                    .success(function(data){
                        console.log(data);
                            alert('修改成功');
                             $scope.show();
                  }).error(function(data){
                     console.log(data);
            });
        }    
    }
})