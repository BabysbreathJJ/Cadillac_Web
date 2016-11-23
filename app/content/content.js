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
                            name: 'done',
                            files: [
                                'content/homepage/done/done.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.normal', {
                url: '/normal',
                templateUrl: 'content/homepage/normal/normal.html',
                controller: 'NormalCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'normal',
                            files: [
                                'content/homepage/normal/normal.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.request', {
                url: '/request',
                templateUrl: 'content/homepage/request/request.html',
                controller: 'RequestCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'request',
                            files: [
                                'content/homepage/request/request.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.selfdeleted', {
                url: '/selfdeleted',
                templateUrl: 'content/homepage/selfdeleted/selfdeleted.html',
                controller: 'SelfDeletedCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'selfdeleted',
                            files: [
                                'content/homepage/selfdeleted/selfdeleted.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.homepage.deleted', {
                url: '/deleted',
                templateUrl: 'content/homepage/deleted/deleted.html',
                controller: 'DeletedCtrl',
                resolve: {
                    loadTotalFiles: ["$ocLazyLoad", "loadHomepageFiles", function ($ocLazyLoad, loadHomepageFiles) {
                        return $ocLazyLoad.load({
                            name: 'deleted',
                            files: [
                                'content/homepage/deleted/deleted.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.config', {
                url: '/config',
                templateUrl: 'content/config/config.html',
                controller: 'ConfigCtrl',
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
            .state('content.management', {
                url: '/management',
                templateUrl: 'content/management/management.html',
                controller: 'ManagementCtrl',
                resolve: {
                    loadManagementFiles: ["$ocLazyLoad", "loadContentFiles", function ($ocLazyLoad, loadContentFiles) {
                        return $ocLazyLoad.load({
                            name: 'management',
                            files: [
                                'content/management/management.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.management.line', {
                url: '/management/line',
                templateUrl: 'content/management/line/line.html',
                controller: 'LineCtrl',
                resolve: {
                    loadLineFiles: ["$ocLazyLoad", "loadManagementFiles", function ($ocLazyLoad, loadManagementFiles) {
                        return $ocLazyLoad.load({
                            name: 'line',
                            files: [
                                'content/management/line/line.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.management.config', {
                url: '/management/config',
                templateUrl: 'content/management/config/config.html',
                controller: 'ConfigCtrl',
                resolve: {
                    loadConfigFiles: ["$ocLazyLoad", "loadManagementFiles", function ($ocLazyLoad, loadManagementFiles) {
                        return $ocLazyLoad.load({
                            name: 'config',
                            files: [
                                'content/management/config/config.js'
                            ]
                        });
                    }]
                }
            })
            .state('content.management.color', {
                url: '/management/color',
                templateUrl: 'content/management/color/color.html',
                controller: 'ColorCtrl',
                resolve: {
                    loadLineFiles: ["$ocLazyLoad", "loadManagementFiles", function ($ocLazyLoad, loadManagementFiles) {
                        return $ocLazyLoad.load({
                            name: 'color',
                            files: [
                                'content/management/color/color.js'
                            ]
                        });
                    }]
                }
            })

            //.state('content.statistic.publish', {
            //    url: '/publish',
            //    templateUrl: 'content/statistic/publish/publish.html',
            //    controller: 'PublishCtrl',
            //    resolve: {
            //        loadStatisticFiles: ["$ocLazyLoad", "loadStatisticFiles", function ($ocLazyLoad, loadStatisticFiles) {
            //            return $ocLazyLoad.load({
            //                name: 'publish',
            //                files: [
            //                    'content/statistic/publish/publish.js'
            //                ]
            //            });
            //        }]
            //    }
            //});


    }])
    .controller('ContentCtrl', function () {

    });