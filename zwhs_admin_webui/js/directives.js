/**
 * NEUBOARD - Responsive Admin Theme
 * Copyright 2014 Authentic Goods Co. http://authenticgoods.co
 *
 * TABLE OF CONTENTS
 * Use @ along with function name to search for the directive.
 *
 *  @pageTitle - Page Title Directive for page title name
 *  @toggleLeftSidebar - Left Sidebar Directive to toggle sidebar navigation
 *  @toggleProfile - Show/Hide Profile View
 *  @toggleRightSidebar - Right Sidebar Directive to toggle sidebar navigation
 *  @navToggleSub - Directive to toggle sub-menu down
 *
 */
/*
 * @pageTitle - Page Title Directive for page title name
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = '欢迎访问商易链管理后台';
                if (toState.data && toState.data.pageTitle) title = '欢迎访问商易链管理后台 | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/*
 * @toggleLeftSidebar - Left Sidebar Directive to toggle sidebar navigation
 */
function toggleLeftSidebar() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleLeft()" class="sidebar-toggle" id="toggle-left"><i class="fa fa-bars"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleLeft = function() {
                ($(window).width() > 768) ? $('#main-wrapper').toggleClass('sidebar-mini'): $('#main-wrapper').toggleClass('sidebar-opened');
            }
        }
    };
};


/*
 * @toggleRightSidebar - Right Sidebar Directive to toggle sidebar navigation
 */
function toggleRightSidebar() {
    return {
        restrict: 'A',
        template: '<button ng-click="toggleRight()" class="sidebar-toggle" id="toggle-right"><i class="fa fa-indent"></i></button>',
        controller: function($scope, $element) {
            $scope.toggleRight = function() {
                $('#sidebar-right').toggleClass("show");
                $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");
            }
        }
    };
};

/**
 * @navToggleSub - Directive to toggle sub-menu down
 */
function navToggleSub() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.navgoco({
                openClass: 'open',
                caretHtml: false,
                accordion:true
             //   accordion: true
			  
            });
		//$('.active').find("a").click();
       // $('.in').click();
        //alert('a');

			//element.navgoco('toggle', true);
        }


    };
};

function datePicker() {
    return {
        restrict: 'A',
        link : function (scope, element) {
            $(function(){
                element.datetimepicker({
                    format: 'yyyy-mm-dd',
                    autoclose:true,
                    language: 'zh-CN',
                    minView: 2

                });
            });
        }
    }
};


function dataTableLanguage(){
    return {
        restrict: 'A',
        link : function (scope, element) {

             //  element.dataTable({
                    /*  "searching":false,
                    "dom": '<"toolbar">frtip',
                    "sDom": '<"top">rt<"bottom" pfl><"clear">',
                    "language": {
                        "processing": "玩命加载中...",
                        "lengthMenu": "显示 _MENU_ 项结果",
                        "zeroRecords": "没有匹配结果",
                        "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                        "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
                        "infoFiltered": "(由 _MAX_ 项结果过滤)",
                        "infoPostFix": "",
                        "search": "搜索: ",
                        "url": "",
                        "paginate": {
                            "first":    "首页",
                            "previous": "上页",
                            "next":     "下页",
                            "last":     "末页"}} */
          // }) 
            //$("div.toolbar").html('<b style="color:red">自定义文字、图片等等</b>');
        }
    }
}

function uploadFile(){
     return {
        restrict: 'AE',
        scope: {
          link: '=link'
        },
        link:function(scope,element,attrs){
            element.on('click',function(){
                scope.open();
                return false;
            });
        },
        controller: function($scope,$modal,$attrs) {
            var hideMy = $attrs.hidemy=='true' ? true :false;
            $scope.open = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'views/common/uploadFile.html',
                    controller: 'common.uploadFile', 
                    size:"lg",           
                    resolve: {
                        data: function(){
                            ratio_array = $attrs.ratio.split("_");
                            return {
                                ratio:{
                                    width:ratio_array[0],
                                    height:ratio_array[1]  
                                },
                                hideMy:true
                            }
                        }
                    }
                });
                modalInstance.result.then(function (newlink) {
                    $scope.link = newlink;
                });
            }
        }
    };
}
function fileToBlob(){
    return {
        restrict: 'EA',
        link: function (scope, element, attributes) {
            element.find("#file").bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}
function imageCrop(){
    return {
        restrict: 'EA',
        scope: {
          filedata: '=',
          ratio: '=',
          priview:'='
        },
        link: function (scope, element, attributes) {
            var empty = true;
            scope.$watch('filedata',function(){
                element.attr("src",scope.filedata);
                if(empty){
                    $("#crop").cropper({
                        aspectRatio:  scope.ratio.width / scope.ratio.height,
                        crop: function (e) {
                            var imageData = $(this).cropper('getImageData');
                            var previewAspectRatio = e.width / e.height;

                            var $preview = $('.preview');
                            var previewWidth = $preview.width();
                            var previewHeight = previewWidth / previewAspectRatio;
                            var imageScaledRatio = e.width / previewWidth;

                            $("#crop_size").text(e.width.toFixed(0)+"x"+e.height.toFixed(0));

                            $preview.height(previewHeight).find('img').css({
                                width: imageData.naturalWidth / imageScaledRatio,
                                height: imageData.naturalHeight / imageScaledRatio,
                                marginLeft: -e.x / imageScaledRatio,
                                marginTop: -e.y / imageScaledRatio
                            });
                        }
                    });
                    empty = false;
                }else{
                   $("#crop").cropper('replace', scope.filedata);
                }
            })
        }
    }
}

/*
 * Pass functions to module
 */
angular
    .module('neuboard')
    .directive('pageTitle', pageTitle)
    .directive('toggleLeftSidebar', toggleLeftSidebar)
    .directive('toggleRightSidebar', toggleRightSidebar)
    .directive('navToggleSub', navToggleSub)
    .directive('datePicker', datePicker)
    .directive('uploadFile', uploadFile)
    .directive('fileToBlob', fileToBlob)
    .directive('imageCrop', imageCrop)
  //  .directive('datatable', dataTableLanguage)
	