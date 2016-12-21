/**
 * Created by Lijingjing on 16/9/13.
 */


angular.module('myApp.homepage', ['ui.router', 'xeditable', 'ui.bootstrap'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');

    }])
    .controller('HomepageCtrl', function ($scope, $http, BaseUrl) {
    	$scope.allcount = 0;
    	$scope.donecount = 0;
    	$scope.waitcount = 0;
    	$scope.requestcount = 0;
    	$scope.deletecount = 0;
    	$scope.deletedcount = 0;
    	$scope.getCounts = function(){
    		$http({
            method : 'GET',
            headers: {Authorization: window.localStorage.getItem("authorization")},
            url : BaseUrl + '/CarPlatform/cars/count',
            crossDomain:true
        	}).success(function(data, status){
        		$scope.allcount = data.data[0];
		    	$scope.donecount = data.data[1];
		    	$scope.waitcount = data.data[2];
		    	$scope.requestcount = data.data[3];
		    	$scope.deletecount = data.data[4];
		    	$scope.deletedcount = data.data[5];
        	}).error(function(data, status){
        		alert('获取失败');
        	});
    	};
    	
    });