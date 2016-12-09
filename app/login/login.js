/**
 * Created by Lijingjing on 16/9/9.
 */
'use strict';

angular.module('myApp.login', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');


        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl',
            resolve: {
                loadMyFiles: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'login',
                        files: [
                            'login/login.js',
                            'login/login.css'
                        ]
                    });
                }]
            }
        });

    }])
    .controller('LoginCtrl', function ($scope, $state, $http, BaseUrl) {

        $scope.userInfo = {
            username:'',
            password:''
        };
        $scope.login = function () {
            if($scope.userInfo.username === '' || $scope.userInfo.password === ''){
                alert("请正确输入用户名和密码");
                return;
            }
            var data = JSON.stringify({
                    username : $scope.userInfo.username,
                    password : $scope.userInfo.password
                });
            $http({
                method:"POST",
                url:BaseUrl + '/CarPlatform/account/login',
                crossDomain:true,
                data:data
            }).success(function(data, status){
                if($.isEmptyObject(data)){
                    alert("用户名或密码错误");
                    return;
                }
                window.localStorage.setItem("authorization", data.authorization);
                window.localStorage.setItem("type", data.type);
                if(data.type === 0)
                    $state.go('content.homepage.total');
                else if(data.type === 3)
                    $state.go('content.config');
            }).error(function(data, status){
                alert("连接失败");
            });
        };


    });