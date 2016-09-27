/**
 * Created by Lijingjing on 16/9/13.
 */
angular.module('myApp.statistic', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');

    }])
    .controller('StatisticCtrl', function () {

    });