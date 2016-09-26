app.factory('authService', function ($http,$cookieStore) {
    var _user = {
        info:null,
        store:0,
        token:0,
        role_id:0,
        user_name:0,
    }

        //设置cookie
    var setCookie = function (c_name, value, expiredays){
　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
　　}



    _user.token = $cookieStore.get('user_token');
    _user.role_id = $cookieStore.get('role_id');
    _user.user_name = $cookieStore.get('user_name');
   
    


    var setUserToken = function(token) {
        _user.token = token;
        setCookie('user_token', '"'+token+'"',1);
       
    };

    var setRole_id = function(role_id) {
        _user.role_id = role_id;
        setCookie('role_id', '"'+role_id+'"',1);
       
    };
    var setUser_name = function(user_name) {
        _user.user_name = user_name;
        setCookie('user_name', '"'+user_name+'"',1);
       
    };
    
    return {

        setUserToken: setUserToken,
        setRole_id: setRole_id,
        setUser_name: setUser_name,
        isLoggedIn: function() {
            return _user.token ? true : false;
        },

        getId: function() {
            return _user ? _user._id : null;
        },
        getToken: function() {
            return _user ? _user.token : '';
        },

        getRole_id: function() {
            return _user ? _user.role_id : null;
        },
        getUser_name: function() {
            return _user ? _user.user_name : '';
        },
        logout: function() {
           
            $cookieStore.remove('role_id');
            $cookieStore.remove('user_name');
            //$cookieStore.remove('user_store');
            $cookieStore.remove('user_token');
            setCookie('role_id', "", -1);
            setCookie('user_name', "", -1);
            setCookie('user_token', "", -1);
            _user.info=null;
            _user.token = 0;
        },
        
    }
});

app.factory('ProductService', ['$q', '$resource',"API", function ($q, $resource,API) {
    var productResource = $resource(API.bast_path + API.products + ":id",{id:"@id"});
    return {
        list:function(){
            return productResource.query();
        },
        save:function(product){
            return product.$save();
        }
    };
}]);

app.factory('UsersService', ['$q', '$resource',"API", function ($q, $resource,API) {
    var productResource = $resource(API.bast_path + API.users + ":id",{id:"@id"},{
        'update': { method:'PUT' }
    });
    
    return {
        list:function(){
            return productResource.query();
        },
        save:function(product){
            return product.$update();
        }
    };
}]);


app.factory('MyAlbum', function ($q,$http,API) {
    var photoList = false;
    return {
        addToMyPhotoes:function(image_link){
            photoList.push(image_link);
        },
        getMyPhotoes:function(page){
            var deferred = $q.defer();
            $http.get(API.base_path + API.myAlbum + "?page="+page.currentPage+"&pageSize="+page.totalItem)
            .success(function(data){
                photoList = data;
                deferred.resolve(data);
            })
            .error(function(reason){
                deferred.reject(reason);
            })
            return deferred.promise;
        },
        upload:function(formData,hideMy){
            var deferred = $q.defer();
            $.ajax(API.upload+'upload', {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if(hideMy){
                        deferred.resolve(data);
                    }else{
                        $http.post(API.base_path + API.myAlbum,{
                            image:data
                        }).success(function(){
                            deferred.resolve(data);
                        }).error(function(reason){
                            deferred.reject('保存到相册错误');
                        })
                    }
                    
                },
                error: function () {
                    deferred.reject("上传错误");
                }
            });
            return deferred.promise;
        }
    };
});


app.factory('UserInterceptor', ["$q","$rootScope","$cookieStore",function ($q,$rootScope,$cookieStore) {
    return {
        request:function(config){
            config.headers["Authorization"] = $cookieStore.get("user_token");
            return config;
        },
        responseError: function (response) {
            var data = response.data;
            // 判断错误码，如果是未登录
            if(data["code"] == "001"){
                // 清空用户本地token存储的信息，如果
                //$rootScope.user = {token:""};
                // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                $rootScope.$emit("userIntercepted","notLogin",response);
            }
            // 如果是登录超时
            // if(data["errorCode"] == "500998"){
            //     $rootScope.$emit("userIntercepted","sessionOut",response);
            // }
            return $q.reject(response);
        }
    };
}]);

app.service("servicelist", function($http, $q, $cookieStore,$location,API) {
	return {
		get: function(objurl, obj) {
			var deferred = $q.defer();
			var url = objurl;
			$http.get(url).success(function(data) {
					deferred.resolve(data);
				})
				.error(function(reason) {
					deferred.reject(reason);
				})
			return deferred.promise;
		},
		post: function(objurl,obj) {
			var deferred = $q.defer();
			var url = objurl;
			$http.post(url,obj).success(function(data) {
					deferred.resolve(data);
				})
				.error(function(reason) {
					deferred.reject(reason);
				})
			return deferred.promise;
		},
		delete:function(objurl){
	    	var deferred = $q.defer();
	      	 $http({ method:'DELETE',url:objurl})
	            .success(function(data){
	                deferred.resolve(data);
	          }).error(function(data){
	              deferred.reject(data);
	        });
    		 return deferred.promise;
		},
		put:function(objurl,objdata){
		    	var deferred = $q.defer();
		      	 $http({ method:'PUT',data:objdata,url:objurl})
		            .success(function(data){
		                deferred.resolve(data);
		          }).error(function(data){
		              deferred.reject(data);
		        });
	    		 return deferred.promise;
			}

	}
})