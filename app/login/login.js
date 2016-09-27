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
    .controller('LoginCtrl', function ($scope, $state) {
        $scope.login = function () {
            $state.go('content.homepage.total');
        };


    });