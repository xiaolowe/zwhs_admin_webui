/*服务列表 公共*/
app.controller("service",function($scope,$http,$state,API){
    $scope.add=false;
    $scope.list=true;
    $scope.detail=false;

    $scope.detailshow=function(id){
        $scope.add=false;
        $scope.list=false;
        $scope.detail=true;
       $http({ method:'GET',url:API.bast_path+'/serviceinfo/detail?service_id='+id})
        .success(function(data){
             $scope.serviceinfo=data; console.log(data);
             
         })
    }
    

    $scope.check=function(id){
        if(confirm("确认审核通过?")){
             $http({ method:'PUT',data:{"service_verify":1},url:API.bast_path+'serviceinfo/check/'+id})
            .success(function(data){
                alert('已审核通过');
                $state.go("serve.service",{},{reload:true});
                console.log(data);
            })
         }
    }

    $scope.serviceBan=function(id){
        if(confirm("确认禁售该服务?")){
             $http({ method:'PUT',url:API.bast_path+'serviceinfo/forbid/'+id})
            .success(function(data){
                alert('该服务已禁售。');
                $state.go("serve.service",{},{reload: true});
                console.log(data);
            })
         }
    }

    $scope.uncheck=function(id){
        if(confirm("确认驳回申请?")){
             $http({ method:'PUT',data:{"service_verify":2},url:API.bast_path+'serviceinfo/check/'+id})
            .success(function(data){
                 alert('申请已驳回');
                $state.go("serve.service",{},{reload: true});
                console.log(data);
            })
         }   
    }

    $scope.serviceOpen=function(id){
        if(confirm("确认解除禁售?")){
            $http({ method:'PUT',data:{"service_verify":2},url:API.bast_path+'serviceinfo/check/'+id})
            .success(function(data){
                 alert('已解除禁售');
                $state.go("serve.service",{},{reload: true});
                console.log(data);
            })
         }   
    }


    $scope.listshow=function(){
        $scope.list=true;
        $scope.detail=false;
        $scope.add=false;
    }
  
    $scope.saveservice=function(id){
       // alert(id);
       $http({ method:'PUT',
               data:{
                    "providerRates" :$scope.serviceinfo.providerRates,
                    "storeRates":$scope.serviceinfo.storeRates,
                    "commisRates":$scope.serviceinfo.commisRates,
                    "remark":$scope.serviceinfo.remark,
                },
             url:API.bast_path+'/serviceinfo/modify/'+id})
            .success(function(data){
                console.log(data);
                alert('保存成功');
          }).error(function(data){
              alert(data.msg);
        });
    }
})

/*已上架服务*/
app.controller("serviceNormal",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceinfo/list?service_verify=1&service_state=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "service_name":$scope.service_name,
                    "type":$scope.type,
                }
            }).success(function(data){
                $scope.rows = data.content;
              //  console.log($scope.rows);
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/serviceinfo/list?service_verify=1&service_state=1&pageNo='+$scope.currentPage);
                };
                $scope.goodsDetails = function(id){
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

/*已下架服务*/
app.controller("serviceRecovery",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceinfo/list?service_verify=1&service_state=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "service_name":$scope.service_name,
                    "type":$scope.type,
                }
            }).success(function(data){
                $scope.rows = data.content;
              //  console.log($scope.rows);
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/serviceinfo/list?service_verify=1&service_state=0&pageNo='+$scope.currentPage);
                };
                $scope.goodsDetails = function(id){
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

/*已禁止服务*/
app.controller("serviceBan",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceinfo/list?service_verify=1&service_state=10'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "service_name":$scope.service_name,
                    "type":$scope.type,
                }
            }).success(function(data){
                $scope.rows = data.content;
              //  console.log($scope.rows);
                $scope.totalItems = data.totalElements;
                if(!$scope.currentPage){
                    $scope.currentPage = 1
                }
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.pageChanged = function() {
                        $scope.show(API.bast_path+'/serviceinfo/list?service_verify=1&service_state=10&pageNo='+$scope.currentPage);
                };
                $scope.goodsDetails = function(id){
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



/*待审核服务*/
app.controller("service0",function($scope,$http,$state,API){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceinfo/list?service_verify=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    "service_name":$scope.service_name,
                    "type":$scope.type,
                }
            }).success(function(data){
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
                    
                        $scope.show(API.bast_path+'/serviceinfo/list?service_verify=0&pageNo='+$scope.currentPage);
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
     
      $scope.show();
    }
});






/*服务商管理(公共)*/
app.controller("serviceProvider",function($scope,$http,$state,API,$cookieStore,$modal){
   
    $scope.list=true;
    $scope.detail=false;
    $scope.listshow=function(){$scope.list=true;$scope.detail=false;}
    $scope.detailshow=function(id){
        $scope.list=false;$scope.detail=true;

        $http({ method:'GET',url:API.bast_path+'/serviceprovider/detail?provider_id='+id})//取店铺详细信息
        .success(function(data){ 

          
            $scope.ProviderDetail=data;console.log(data);
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
             .success(function(data){ console.log(data); alert('修改成功');$state.go("serve.provider",null,{reload:true});})
        }
        $scope.passordersDetail=function(id){
          //  if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("是否审核通过?")){
               $http({ method:'PUT',
                data:{
                        "provider_state":1,
                    },
                url:API.bast_path+'/serviceprovider/check/'+id})
                .success(function(data){ console.log(data); alert('已审核通过'); $state.go("serve.provider",null,{reload:true});})
             }
          
        }

         $scope.freezeDetail=function(id){
          //  if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("确认冻结该店铺?")){
               $http({ method:'PUT',
                data:{
                        "provider_state":3,
                    },
                url:API.bast_path+'/serviceprovider/check/'+id})
                .success(function(data){ console.log(data); alert('已经冻结该店铺'); $state.go("serve.provider",null,{reload:true});})
             }
          
        }

         $scope.unFreeze=function(id){
          //  if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("确认解冻该店铺?")){
               $http({ method:'PUT',
                data:{
                        "provider_state":1,
                    },
                url:API.bast_path+'/serviceprovider/check/'+id})
                .success(function(data){ console.log(data); alert('该店铺已恢复正常'); $state.go("serve.provider",null,{reload:true});})
             }
          
        }

        
        $scope.turnordersDetail=function(id){
             if(confirm("是否确认驳回?")){
                $http({ method:'PUT',
                    data:{
                            "provider_state":2, 
                        },
                    url:API.bast_path+'/serviceprovider/check/'+id})
                 .success(function(data){ console.log(data); alert('驳回成功'); $state.go("serve.provider",null,{reload:true});})
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

/*服务商列表 >全部*/
app.controller("serviceProviderlistall",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceprovider/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   companyName:$scope.provider_alias_name,
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
                        $scope.show(API.bast_path+'/serviceprovider/list?pageNo='+$scope.currentPage);
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


/*服务商列表 >待审核*/
app.controller("serviceProviderlist0",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceprovider/list?provider_state=0&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    companyName:$scope.provider_alias_name,
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
                        $scope.show(API.bast_path+'/serviceprovider/list?provider_state=0&pageNo='+$scope.currentPage);
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



/*服务商列表 >已审核*/
app.controller("serviceProviderlist1",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceprovider/list?provider_state=1&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    companyName:$scope.provider_alias_name,
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
                        $scope.show(API.bast_path+'/serviceprovider/list?provider_state=1&pageNo='+$scope.currentPage);
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


/*服务商列表 >已冻结*/
app.controller("serviceProviderlist3",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceprovider/list?provider_state=3&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    companyName:$scope.provider_alias_name,
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
                        $scope.show(API.bast_path+'/serviceprovider/list?provider_state=3&pageNo='+$scope.currentPage);
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

/*服务商列表 >驳回*/
app.controller("serviceProviderlist2",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/serviceprovider/list?provider_state=2&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    companyName:$scope.provider_alias_name,
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
                        $scope.show(API.bast_path+'/serviceprovider/list?provider_state=2&pageNo='+$scope.currentPage);
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





/*母婴店服务管理(公共)*/
app.controller("serviceStore",function($scope,$http,$state,API,$cookieStore,$modal){
    $scope.list=true;
    $scope.detail=false;
    $scope.listshow=function(){$scope.list=true;$scope.detail=false;}
    $scope.detailshow=function(id){
        $scope.list=false;$scope.detail=true;
        $http({ method:'GET',url:API.bast_path+'/servicestore/detail?service_store_id='+id})//取店铺详细信息
        .success(function(data){ 
            $scope.Store=data;console.log(data);
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
          //  if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("是否审核通过?")){
               $http({ method:'PUT',
                data:{
                        "service_verify":1,
                    },
                url:API.bast_path+'/servicestore/check/'+id})
                .success(function(data){ console.log(data); alert('已审核通过'); $state.go("serve.store",null,{reload:true});})
             }
        }

         $scope.freezeDetail=function(id){
          //  if ($scope.ordersDetail.sgId==0) {alert('请选择店铺等级');return ;};
            if(confirm("确认冻结该店铺?")){
               $http({ method:'PUT',
                data:{
                        "service_verify":3,
                    },
                url:API.bast_path+'servicestore/check/'+id})
                .success(function(data){ console.log(data); alert('已经冻结该店铺'); $state.go("serve.store",null,{reload:true});})
             }
          
        }

        
        $scope.turnordersDetail=function(id){
             if(confirm("是否确认驳回?")){
                $http({ method:'PUT',
                    data:{
                            "service_verify":2, 
                        },
                    url:API.bast_path+'servicestore/check/'+id})
                 .success(function(data){ console.log(data); alert('驳回成功'); $state.go("serve.store",null,{reload:true});})
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



/*服务母婴店列表 >全部*/
app.controller("serviceStorelistall",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/servicestore/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   company_name:$scope.company_name,
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
                        $scope.show(API.bast_path+'/servicestore/list?pageNo='+$scope.currentPage);
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


/*服务母婴店列表 >待审核*/
app.controller("serviceStorelist0",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/servicestore/list?service_verify=0&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   company_name:$scope.company_name,
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
                        $scope.show(API.bast_path+'/servicestore/list?service_verify=0&pageNo='+$scope.currentPage);
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



/*服务母婴店列表 >已审核*/
app.controller("serviceStorelist1",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){
        if(!url){url=API.bast_path+'/servicestore/list?service_verify=1&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   company_name:$scope.company_name,
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
                        $scope.show(API.bast_path+'/servicestore/list?service_verify=1&pageNo='+$scope.currentPage);
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


/*服务母婴店列表 >已冻结*/
app.controller("serviceStorelist3",function($scope,$http,$state,API,$cookieStore){
  $scope.token= $cookieStore.get("user_token");
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/servicestore/list?service_verify=3&pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                   company_name:$scope.company_name,
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
                        $scope.show(API.bast_path+'/servicestore/list?service_verify=3&pageNo='+$scope.currentPage);
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



/*服务订单(公共)*/
app.controller("serviceOrders",function($scope,$http,$state,API,$cookieStore,$modal){
   
    $scope.list=true;
    $scope.detail=false;
    $scope.listshow=function(){$scope.list=true;$scope.detail=false;}
    $scope.goDetails=function(id){
          $http({
                method:'GET',
                 url:API.bast_path+'/serviceorder/detail?order_id='+id,
                }).success(function(data){
                    $scope.orders=data;
                console.log(data);
                
      
        })

        $scope.list=false;
        $scope.detail=true;
    }

})

/*服务商订单 >全部*/
app.controller("serviceOrderAll",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?pageNo='+$scope.currentPage);
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


/*服务商订单 >全部*/
app.controller("serviceOrderAll",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?pageNo='+$scope.currentPage);
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



/*服务商订单 >已取消*/
app.controller("serviceOrder0",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=0'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=0&pageNo='+$scope.currentPage);
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


/*服务商订单 >未付款*/
app.controller("serviceOrder10",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=10'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=10&pageNo='+$scope.currentPage);
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

/*服务商订单 >已付款*/
app.controller("serviceOrder20",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=20'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=20&pageNo='+$scope.currentPage);
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


/*服务商订单 >已接单*/
app.controller("serviceOrder30",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=30'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=30&pageNo='+$scope.currentPage);
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


/*服务商订单 >已使用*/
app.controller("serviceOrder40",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=40'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=40&pageNo='+$scope.currentPage);
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


/*服务商订单 > 已评价*/
app.controller("serviceOrder50",function($scope,$http,$state,API,$cookieStore){
    $scope.show = function(url){

        if(!url){url=API.bast_path+'/serviceorder/list?pageNo=1&order_status=50'};
        $http({
                method:'GET',
                url:url,
                params:{
                    service_name:$scope.service_name,
                    member_truename:$scope.member_truename,
                    service_type:$scope.service_type,
                    order_id:$scope.order_id,
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
                        $scope.show(API.bast_path+'/serviceorder/list?&order_status=50&pageNo='+$scope.currentPage);
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
