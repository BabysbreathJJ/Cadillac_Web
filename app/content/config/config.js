+/**
 * Created by Lijingjing on 16/9/13.
 */

    angular.module('myApp.config', ['ui.router'])
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

            $locationProvider.hashPrefix('!');

        }])
        .controller('ConfigCtrl', ConfigInfoCtrl)
        .factory('ConfigInfoService', ConfigInfoService)
        .directive('container', containerFunc)
        .directive('configinfo', configinfoFunc)
        .directive('carline', carlineFunc)
        .directive('configs', configsFunc)
        .directive('config', configFunc)
        .directive('color', colorFunc);


//directives
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
                if (selectedCarline == undefined) {
                    angular.forEach(carlines, function (carline) {

                        carline.$broadcast('showConfig', false);
                        carline.showConfigs = false;

                    });
                }
                else {
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
                }

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
        '<i class="ion-chevron-left addIcon config-icon" ng-show="showConfig&&edit" ng-transclude ng-click="toggle()"></i>' +
        '</div>',
        link: function (scope, element, attrs, containerController) {
            scope.showConfig = false;

            scope.$on('edit', function (d, data) {
                scope.edit = data;
                scope.showConfig = false;
                containerController.gotConfigOpened(undefined);
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
            //scope.on('edit',function(d,data){
            //    scope.showColor = data;
            //});
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


//services
function ConfigInfoService($http, BaseUrl) {
    var getLinesRequest = function () {
        var lines = [{
            name: 'XT5',
            id: 1,
            checked: true
        }, {
            name: 'CT6',
            id: 2,
            checked: false
        }];
        return lines;
    };

    var getConfigsRequest = function (lineId) {
        //return $http({
        //    method: 'GET',
        //    url: BaseUrl + '/CarPlatform/cars/search?page=' + pageNo,
        //    crossDomain: true
        //});
        var configs = [{
            name: '25T技术型',
            id: 1,
            checked: true
        }, {
            name: '25T豪华型',
            id: 2,
            checked: false
        }, {
            name: '25T豪华型',
            id: 3,
            checked: false
        }, {
            name: '25T豪华型',
            id: 4,
            checked: true
        }, {
            name: '25T豪华型',
            id: 5,
            checked: true
        }, {
            name: '25T豪华型',
            id: 6,
            checked: true
        }];
        //console.log("lineId is : " + lineId);
        return configs;
    };

    var getColorsRequest = function (configId) {
        var colors = [{
            name: '白色',
            id: 1,
            checked: true
        }, {
            name: '红色',
            id: 2,
            checked: false
        }, {
            name: '红色',
            id: 3,
            checked: false
        }, {
            name: '红色',
            id: 4,
            checked: true
        }, {
            name: '红色',
            id: 5,
            checked: true
        }];
        //console.log("configId is : "+ configId);
        return colors;
    };


    return {
        getLines: function () {
            return getLinesRequest();
        },
        getConfigs: function (lineId) {
            return getConfigsRequest(lineId);
        },
        getColors: function (configId) {
            return getColorsRequest(configId);
        }
    }

}

//ctrl
function ConfigInfoCtrl($scope, $filter, ConfigInfoService) {

    //ConfigInfoService.getLines().success(function(data){
    //    $scope.lines = data.data;
    //    console.log("test");
    //});

    $scope.lines = ConfigInfoService.getLines();

    $scope.$on('configs', function (d, data) {

        $scope.configs = ConfigInfoService.getConfigs(data);

    });

    $scope.$on('colors', function (d, data) {
        //console.log('colors start');
        $scope.colors = ConfigInfoService.getColors(data);
    });

    $scope.edit = false;

    $scope.startEdit = function () {
        $scope.edit = true;
        $scope.$broadcast('edit', true);
    };

    $scope.cancelEdit = function () {
        $scope.edit = false;
        $scope.$broadcast('edit', false);
    };


}
