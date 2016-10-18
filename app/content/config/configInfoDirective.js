/**
 * Created by Lijingjing on 16/9/4.
 */


(function () {
    'use strict';

    angular.module('myApp.config', ['ui-router'])
        .directive('accordion', accordionFunc)
        .directive('expander', expanderFunc)
        .directive('container', containerFunc)
        .directive('configinfo', configinfoFunc)
        .directive('carline', carlineFunc)
        .directive('configs', configsFunc)
        .directive('config', configFunc)
        .directive('color', colorFunc);

    /** @ngInject */
    function accordionFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function () {
                var expanders = [];
                this.gotOpened = function (selectedExpander) {
                    angular.forEach(expanders, function (expander) {
                        if (selectedExpander != expander) {
                            expander.showMe = false;
                        }
                    });
                }
                this.addExpander = function (expander) {
                    expanders.push(expander);
                }
            }
        }

    }

    function expanderFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?accordion',
            scope: {
                title: '=expanderTitle'
            },
            template: '<div>' +
            '<div class="title" ng-click="toggle()">{{title}}</div>' +
            '<div class="body" ng-show="showMe" ng-transclude></div>' +
            '</div>',
            link: function (scope, element, attrs, accordionController) {
                scope.showMe = false;
                accordionController.addExpander(scope);
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                    accordionController.gotOpened(scope);
                };
            }
        }
    }

    function containerFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function () {
                var carlines = [];

                var colors = [];
                this.gotConfigOpened = function (selectedCarline) {
                    angular.forEach(carlines, function (carline) {
                        if (selectedCarline.lineid != carline.carline.id) {
                            carline.$broadcast('showConfig', false);
                            carline.showConfigs = false;
                        }
                        else {
                            carline.showConfigs = selectedCarline.showConfig;
                            console.log("macthed line id");
                            carline.$emit('configs', selectedCarline.lineid);
                        }
                    });
                };

                this.addCarLine = function (carline) {
                    carlines.push(carline);
                };

                this.addColor = function (color) {
                    colors.push(color);
                };

            }
        }
    }

    function configinfoFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?container',
            template: '<div class="row configinfo" ng-transclude></div>',
            link: function (scope, element, attrs, containerController) {
                containerController.addCarLine(scope);
                scope.$on('showColors', function (d, data) {
                    scope.showColors = data;
                });
            },
            controller: function () {
                var configs = [];
                this.addConfig = function (config) {
                    configs.push(config);
                };
                this.gotColorOpened = function (selectedConfig) {
                    angular.forEach(configs, function (config) {
                        if (selectedConfig.configid != config.config.id) {
                            config.$broadcast('showColor', false);
                            config.showColors = false;
                            config.$emit('showColors', false);
                        }
                        else {
                            config.showColors = selectedConfig.showColor;
                            config.$emit('showColors', selectedConfig.showColor);
                            config.$emit('colors', selectedConfig.configid);
                        }
                    });
                };
            }
        }

    }

    function configsFunc(ConfigInfoService) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?configinfo',
            template: '<div class="row configinfo" ng-transclude></div>',
            link: function (scope, element, attrs, configinfoController) {
                configinfoController.addConfig(scope);
            }
        }

    }

    function carlineFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?container',
            scope: {
                linename: '=lineName',
                lineid: '=lineId',
                carlineChecked: '=lineChecked'
            },
            template: '<div class="col-md-3 col-xs-6">' +
            '<div class="checkbox" ng-show="edit">' +
            '<label class="custom-checkbox">' +
            '<input type="checkbox"  ng-model="carlineChecked">' +
            '<span>{{linename}}</span></label> </div><span ng-show="!edit">{{linename}}</span>' +
            '<i class="ion-ios-plus-outline addIcon config-icon" ng-show="(!showConfig)&&edit" ng-transclude ng-click="toggle()"></i>' +
            '<i class="ion-chevron-left addIcon config-icon" ng-show="showConfig" ng-transclude ng-click="toggle()"></i>' +
            '</div>',
            link: function (scope, element, attrs, containerController) {
                scope.showConfig = false;

                scope.$on('edit', function (d, data) {
                    scope.edit = data;
                });

                scope.$on('showConfig', function (d, data) {
                    scope.showConfig = data;
                });

                scope.toggle = function toggle() {
                    scope.showConfig = !scope.showConfig;
                    containerController.gotConfigOpened(scope);
                };
            }
        }
    }

    function configFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?configinfo',
            scope: {
                configname: '=configName',
                configid: '=configId',
                carlineid: '=carlineId',
                configChecked: '=configChecked'
            },
            template: '<div class="config" ng-show="!showConfig">' +
            '<div class="checkbox">' +
            '<label class="custom-checkbox">' +
            '<input type="checkbox"  ng-model="configChecked">' +
            '<span>{{configname}}</span></label> </div>' +
            '<i class="ion-ios-plus-outline config-icon" ng-show="!showColor" ng-transclude ng-click="toggle()"></i>' +
            '<i class="ion-chevron-left config-icon" ng-show="showColor" ng-transclude ng-click="toggle()"></i>' +
            '</div>',
            link: function (scope, element, attrs, configinfoController) {
                scope.showColor = false;
                scope.$on('showColor', function (d, data) {
                    scope.showColor = data;
                });
                scope.toggle = function toggle() {
                    scope.showColor = !scope.showColor;
                    configinfoController.gotColorOpened(scope);
                };
            }
        }
    }

    function colorFunc() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?container',
            scope: {
                colorname: '=colorName',
                colorid: '=colorId',
                configid: '=configId',
                colorChecked: '=colorChecked'
            },
            template: '<div class="color">' +
            '<div class="checkbox">' +
            '<label class="custom-checkbox">' +
            '<input type="checkbox" id="checkboxWarning" ng-model="colorChecked">' +
            '<span>{{colorname}}</span>' +
            '</label> </div>',
            link: function (scope, element, attrs, containerController) {
                containerController.addColor(scope);
            }
        }
    }


})();
