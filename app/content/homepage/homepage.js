/**
 * Created by Lijingjing on 16/9/13.
 */

angular.module('myApp.homepage', ['ui.router', 'xeditable', 'ui.bootstrap'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');

    }])
    .controller('HomepageCtrl', function () {
    });