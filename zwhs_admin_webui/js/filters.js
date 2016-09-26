app.filter('asImage',function(API,DEFAULT){
      return function(file_id,param){
        if(!file_id){
            file_id = DEFAULT.placeholder;
        }

        url = API.upload+file_id;
        /*if(param){
        	ext = /\.[^\.]+/.exec(file_id);
        	file_name = file_id.replace(ext,'');
        	param = param.replace("_","x");
        	url = API.upload+file_name+ "," + param+ext;
        }*/
        return url;
    }
});


app.filter('orderstype',function(){
      return function(typeid){
            switch(typeid) 
            { 
            case 0: 
                return "已取消";
                break; 
            case 10: 
                return "未支付";
                break;
            case 20: 
                return "已支付";
                break; 
            case 30: 
                return "已收货";
                break;
            case 40: 
                return "已评价";
                break;

            default: 
            return "订单异常";
                break;
          
            } 
     
    }
});

app.filter('seversorderstype',function(){
      return function(typeid){
            switch(typeid) 
            { 
            case 0: 
                return "已取消";
                break; 
            case 10: 
                return "未支付";
                break;
            case 20: 
                return "已支付";
                break; 
            case 30: 
                return "已接单";
                break;
            case 40: 
                return "已使用";
                break;
            case 50: 
                return "已评价";
                break;

            default: 
            return "订单异常";
                break;
          
            } 
     
    }
});


app.filter('providertype',function(){
      return function(typeid){
            switch(typeid) 
            { 
            case 0: 
                return "待审核";
                break; 
            case 1: 
                return "已审核";
                break;
            case 2: 
                return "驳回";
                break; 
            case 3: 
                return "冻结";
                break;
          
            default: 
            return "店铺状态异常";
                break;
          
            } 
     
    }
});

app.filter('fx_status',function(){
      return function(typeid){
            switch(typeid) 
            { 
            case 0: 
                return "待审核";
                break; 
            case 1: 
                return "已审核";
                break;
            case 2: 
                return "驳回";
                break; 
            case 3: 
                return "冻结";
                break;
          
            default: 
            return "分销状态异常";
                break;
          
            } 
     
    }
});
app.filter('fxgoodsstatus',function(){
      return function(typeid){
            switch(typeid) 
            { 
            case 1: 
                return "上架";
                break;
            case 2: 
                return "下架";
                break;
          
            default: 
            return "分销商品状态异常";
                break;
          
            } 
     
    }
});
app.filter('goodsState',function(){
      return function(typeid){
            switch(typeid) 
            { 
        	  case 0: 
                return "下架";
                break;
            case 1: 
                return "正常";
                break;
            case 10: 
                return "违规";
                break;
          
            default: 
            return "状态异常";
                break;
          
            } 
     
    }
});
app.filter('goodsVerify',function(){
      return function(typeid){
            switch(typeid) 
            { 
        	  case 0: 
                return "未审核";
                break;
            case 1: 
                return "已审核";
                break;
            default: 
            return "状态异常";
                break;
          
            } 
     
    }
});