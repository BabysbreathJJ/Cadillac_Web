/**
 * Created by Lijingjing on 16/9/12.
 */
'use strict';

angular.module('myApp.content', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');


        $stateProvider.state('content', {
                url: '/content',
                templateUrl: 'content/content.html',
                controller: 'ContentCtrl',
                resolve: {
                    loadContentFiles: ["$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'content',
                            files: [
                                'content/content.css',
                                'bower_components/ionicons/css/ionicons.min.css',
                                'bower_components/angular-xeditable/dist/css/xeditable.min.css',
                                'bower_components/angular-xeditable/dist/js/xeditable.min.js'

                            ]
                        });

                    }]
                }

            })
            .state('content.homepage', {
                url: '/homepage',
                templateUrl: 'content/homepage/homepage.html',
                controller: 'HomepageCtrl',
                resolve: {
                    loadHomepageFiles: ["$ocLazyLoad", "loadContentFiles", function ($ocLazyLoad, loadContentFiles) {
                        return $ocLazyLoad.load({
                            name: 'homepage',
                            files: [
                                'content/homepage/homepage.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.total', {
                url: '/total',
                templateUrl: 'content/homepage/total/total.html',
                controller: 'TotalCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'total',
                            files: [
                                'content/homepage/total/total.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.done', {
                url: '/done',
                templateUrl: 'content/homepage/done/done.html',
                controller: 'DoneCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'total',
                            files: [
                                'content/homepage/done/done.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.config', {
                url: '/config',
                templateUrl: 'content/config/config.html',
                resolve: {
                    loadConfigFiles: ["$ocLazyLoad", "loadContentFiles", function ($ocLazyLoad, loadContentFiles) {
                        return $ocLazyLoad.load({
                            name: 'config',
                            files: [
                                'content/config/config.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.statistic', {
                url: '/statistic',
                templateUrl: 'content/statistic/statistic.html',
                controller: 'StatisticCtrl',
                resolve: {
                    loadStatisticFiles: ["$ocLazyLoad", "loadContentFiles", function ($ocLazyLoad, loadContentFiles) {
                        return $ocLazyLoad.load({
                            name: 'statistic',
                            files: [
                                'content/statistic/statistic.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.statistic.publish', {
                url: '/publish',
                templateUrl: 'content/statistic/publish/publish.html',
                controller: 'PublishCtrl',
                resolve: {
                    loadStatisticFiles: ["$ocLazyLoad", "loadStatisticFiles", function ($ocLazyLoad, loadStatisticFiles) {
                        return $ocLazyLoad.load({
                            name: 'publish',
                            files: [
                                'content/statistic/publish/publish.js'
                            ]
                        });
                    }]
                }
            });


    }])
    .controller('ContentCtrl', function () {

    });