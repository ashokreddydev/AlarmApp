angular.module('Alarm',['ngRoute'])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/',{
		templateUrl:'AlarmApp/views/home.html',
        controller:'homecontroller'
		
	})
	
	
	 .otherwise({
		
		redirectTo:'/'
	}) 
	
}])
 
 
 
 
 
 
 










