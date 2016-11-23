/**
 * Created by Lijingjing on 16/11/20.
 */


angular.module('myApp.management', ['ui.router', 'xeditable', 'ui.bootstrap'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');

    }])
    .controller('ManagementCtrl', function ($scope, $http, BaseUrl) {

    });