function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "views/index.html",
            data: { pageTitle: 'index' }
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/user/login.html",
        })
        
        .state('user', {
            abstract: true,
            url: "/user",
            templateUrl: "views/layout/common.html",
        })
        .state('user.list', {
            url: "/list/",
            templateUrl: "views/user/list.html",
        })
        
        
        .state('fx', {
            abstract: true,
            url: "/fx",
            templateUrl: "views/layout/common.html",
        })
        .state('fx.list', {
            url: "/list/",
            templateUrl: "views/fx/list_fx.html",
        })
        .state('fx.store', {
            url: "/store/",
            templateUrl: "views/fx/store_fx.html",
            params: {'data': null,'wechatAliasname':null},
        })
        .state('fx.goods', {
            url: "/goods/",
            templateUrl: "views/fx/goods_fx.html",
            params: {'data': null},
        })
       
        
        
        
        .state('user.profile', {
            url: "/profile",
            templateUrl: "views/user/profile.html",
        })
         .state('user.detail', {
            url: "/detail/:id/:page",
            templateUrl: "views/user/detail.html",
        })


        .state('crud', {
            url: "/crud",
            templateUrl: "views/crud/list.html",
        })

        .state('orders', {
            abstract: true,
            url: "/orders",
            templateUrl: "views/layout/common.html",
        })

        .state('orders.orderslistall', {//订单列表全部
            url: "/list",
            templateUrl: "views/orders/list.html",
        })
		
        .state('orders.orderslist10', {//订单列表>未支付
            url: "/orderslist10",
            templateUrl: "views/orders/list10.html",
        })

        .state('orders.orderslist20', {//订单列表>已支付
            url: "/orderslist20",
            templateUrl: "views/orders/list20.html",
        })

        .state('orders.orderslist30', {//订单列表>已收货
            url: "/orderslist30",
            templateUrl: "views/orders/list30.html",
        })

        .state('orders.orderslist40', {//订单列表>已评价
            url: "/orderslist40",
            templateUrl: "views/orders/list40.html",
        })

        .state('orders.orderslist0', {//订单列表>已取消
            url: "/orderslist0",
            templateUrl: "views/orders/list0.html",
        })
        
        .state('orders.orderslist_fenxiaoall', {//分销订单列表全部
            url: "/list_fx",
            templateUrl: "views/orders/list_fx.html",
            cache:'false',
        })
		.state('orders.orderslist_fenxiao10', {//分销订单>未支付
            url: "/list_fx",
            templateUrl: "views/orders/list10_fx.html",
        })
		.state('orders.orderslist_fenxiao20', {//分销订单>已支付
            url: "/list_fx",
            templateUrl: "views/orders/list20_fx.html",
        })
		.state('orders.orderslist_fenxiao30', {//分销订单>已收货
            url: "/list_fx",
            templateUrl: "views/orders/list30_fx.html",
        })
		.state('orders.orderslist_fenxiao40', {//分销订单>已评价
            url: "/list_fx",
            templateUrl: "views/orders/list40_fx.html",
        })
		.state('orders.orderslist_fenxiao0', {//分销列表>已取消
            url: "/orderslist0",
            templateUrl: "views/orders/list0_fx.html",
        })



        .state('orders.detail', {
            url: "/detail/:tab",
            templateUrl: "views/orders/detail.html",
        })

        .state('store', {
            abstract: true,
            url: "/store",
            templateUrl: "views/layout/common.html",
        })

        .state('store.list', {
            url: "/list",
            templateUrl: "views/store/list.html",
        })

        .state('store.detail', {
            url: "/detail/:id",
            templateUrl: "views/store/detail.html",
        })

        .state('store.divide', {
            url: "/divide",
            templateUrl: "views/store/divide.html",
        })
		 .state('store.add', {
            url: "/add",
            templateUrl: "views/store/add.html",
            params:{
            	'data':null
            }
        })

        .state('goods', {
            abstract: true,
            url: "/goods",
            templateUrl: "views/layout/common.html",
        })

        .state('goods.list', {//商品分类
            url: "/list",
            templateUrl: "views/goods/list.html",
        })

         .state('goods.detail', {//商品详情
            url: "/detail/:id/:page",
            templateUrl: "views/goods/detail.html",
        })

         .state('goods.classify', {//分类管理
            url: "/classify",
            templateUrl: "views/goods/classify.html",
        })

        .state('goods.brand', {//品牌管理
            url: "/brand",
            templateUrl: "views/goods/brand.html",
        })

        .state('goods.brandDetail', {//品牌管理
            url: "/brandDetail/:id/:page",
            templateUrl: "views/goods/brandDetail.html",
        })

         .state('goods.addBrand', {//品牌管理
            url: "/addBrand/",
            templateUrl: "views/goods/addBrand.html",
        })
          .state('goods.upGoodsList', {
            url: "/upList/",
            templateUrl: "views/goods/goodsList_up.html",
            params: {'data': null},
        })

        .state('comment', {
            abstract: true,
            url: "/comment",
            templateUrl: "views/layout/common.html",
        })

        .state('comment.list', {//评论管理
            url: "/list",
            templateUrl: "views/comment/list.html",
        })

        .state('comment.detail', {//评论详情
            url: "/detail",
            templateUrl: "views/comment/detail.html",
        })


        .state('admin', {
            abstract: true,
            url: "/admin",
            templateUrl: "views/layout/common.html",
        })

        .state('admin.list', {
            url: "/list",
            templateUrl: "views/admin/list.html",
        })

        .state('admin.detail', {
            url: "/detail/:id/:page",
            templateUrl: "views/admin/detail.html",
        })
         .state('admin.add', {
            url: "/add",
            templateUrl: "views/admin/add.html",
        })

        .state('finance', {
            abstract: true,
            url: "/finance",
            templateUrl: "views/layout/common.html",
        })

        .state('finance.list', {
            url: "/list",
            templateUrl: "views/finance/list.html",
        })

        .state('finance.audit', {//财务+待审核
            url: "/audit",
            templateUrl: "views/finance/audit.html",
        })

        .state('finance.cashier', {//财务+出纳
            url: "/cashier",
            templateUrl: "views/finance/cashier.html",
        })

        .state('finance.income', {//收入明细+详情
            url: "/income",
            templateUrl: "views/finance/income.html",
        })

        .state('service', {//服务上门
            url: "/service",
            templateUrl: "views/service/list.html",
        })
        

        .state('knowledge', {
            abstract: true,
            url: "/knowledge",
            templateUrl: "views/layout/common.html",
        })
        .state('knowledge.list', {
            url: "/list",
            templateUrl: "views/knowledge/list.html",
        })
        .state('knowledge.type', {
            url: "/type",
            templateUrl: "views/knowledge/type.html",
        })


        .state('coupon', {
            abstract: true,
            url: "/coupon",
            templateUrl: "views/layout/common.html",
        })
        .state('coupon.list', {
            url: "/list",
            templateUrl: "views/coupon/list.html",
        })

         .state('serve', {
            abstract: true,
            url: "/serve",
            templateUrl: "views/layout/common.html",
        })
         
        .state('serve.service', {
            url: "/service",
            templateUrl: "views/serve/service.html",
        })

         .state('serve.provider', {
            url: "/provider",
            templateUrl: "views/serve/provider.html",
        })

         .state('serve.store', {
            url: "/store",
            templateUrl: "views/serve/store.html",
        })

        .state('serve.orders', {
            url: "/orders",
            templateUrl: "views/serve/orders.html",
        })

}
angular
    .module('neuboard')
    .config(config)
    .constant('API', {
//        "bast_path":"http://192.168.109.118:8080/zwhs_syl_api/",
//      "bast_path":"http://10.0.60.5:8088/zwhs_syl_api/",
        "bast_path":"http://o2oadmin-st.syisy.com/zwhs_syl_api/",
//      "bast_path":"http://o2oadmin.syisy.com/zwhs_syl_api/",
        "upload":"http://fileproxy.syisy.com/",
//      "login":"http://o2ostore.syisy.com/zwhs_syl_api/",
        "login":"http://o2oadmin-st.syisy.com/zwhs_syl_api/",
        "profile":"/account/profile",
        "users":"/users/",
        "products":"products/"
    })
    .constant('DEFAULT',{
        "placeholder" : "G01/M00/00/01/CgA8BFZs-i-AAhIAAAASE08FkaM745.gif",
    })