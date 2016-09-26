var app = angular.module('neuboard', [
	'ui.router',
	'ui.bootstrap',
    'ngCookies',
	'datatables',
	'ngResource',
    'ui.sortable',
    'ng.ueditor',
    'ngMessages'
    
])


app.config(function($httpProvider){
   $httpProvider.interceptors.push('UserInterceptor');
});