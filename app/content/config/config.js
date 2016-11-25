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
        controller: function ($scope) {
            var carlines = [];

            var colors = [];

            var tempConfig;

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
                            carline.$emit('configs', selectedCarline.lineid);
                            tempConfig = carline;
                        }
                    });
                }

                $scope.colors = [];
                $scope.$broadcast('showColor', false);
                $scope.showColors = false;
                $scope.$emit('showColors', false);

            };

            this.addCarLine = function (carline) {
                carlines.push(carline);
            };

            this.addColor = function (color) {
                colors.push(color);
            };

            $scope.saveItem = function () {
                tempConfig.showConfigs = false;
                tempConfig.$broadcast('showConfig', false);
            }


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
        controller: function ($scope) {
            var configs = [];
            this.addConfig = function (config) {
                configs.push(config);
            };

            var tempConfig;
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
                        tempConfig = config;
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
            carlineChecked: '=lineChecked',
            edit: '=edit'
        },
        template: '<div class="col-md-3 col-xs-6">' +
        '<div class="checkbox" ng-show="edit">' +
        '<label class="custom-checkbox">' +
        '<input type="checkbox"  ng-model="carlineChecked" ng-change="lineChange(carlineChecked,lineid)">' +
        '<span>{{linename}}</span></label> </div><span ng-show="!edit">{{linename}}</span>' +
        '<i class="ion-ios-plus-outline addIcon config-icon" ng-show="(!showConfig)&&edit" ng-transclude ng-click="toggle()"></i>' +
        '<i class="ion-chevron-left addIcon config-icon" ng-show="showConfig&&edit" ng-transclude ng-click="toggle()"></i>' +
        '</div>',
        link: function (scope, element, attrs, containerController) {
            scope.showConfig = false;

            console.log(scope.showConfig);
            scope.$on('edit', function (d, data) {
                scope.edit = data;
                scope.showConfig = false;
                console.log(scope.edit);
                containerController.gotConfigOpened(undefined);
            });

            scope.lineChange = function (carlineChecked, lineId) {
                var data = {id: lineId, flag: carlineChecked};
                scope.$emit('lineChange', data);
            };

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
        '<input type="checkbox"  ng-model="configChecked" ng-change="configChange(configChecked,configid)">' +
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

            scope.configChange = function (configChecked, configId) {
                var data = {id: configId, flag: configChecked};
                scope.$emit('configChange', data);
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
        '<input type="checkbox" id="checkboxWarning" ng-model="colorChecked" ng-change="colorChange(colorid,colorChecked)">' +
        '<span>{{colorname}}</span>' +
        '</label> </div>',
        link: function (scope, element, attrs, containerController) {
            containerController.addColor(scope);
            scope.colorChange = function (id, flag) {
                var data = {id: id, flag: flag};
                scope.$emit('colorChange', data);
            };
        }
    }
}


//services
function ConfigInfoService($http, BaseUrl) {
    var getLinesRequest = function () {

        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/lines/all',
            crossDomain: true
        });
    };

    var getConfigsRequest = function (lineId) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/configurations/byline/all?line=' + lineId,
            crossDomain: true
        });

    };

    var getColorsRequest = function (configId) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/configurations/' + configId + '/allcolors',
            crossDomain: true
        });
    };

    var updateConfigsRequest = function (params) {
        return $http({
            method: 'POST',
            url: BaseUrl + '/CarPlatform/admin/config',
            data: params,
            crossDomain: true
        });
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
        },
        updateConfigs: function (params) {
            return updateConfigsRequest(params);
        }
    }

}

//ctrl
function ConfigInfoCtrl($scope, $filter, ConfigInfoService, $state, $stateParams) {


    var submitLines = [];
    var submitConfigs = [];
    var submitColors = [];

    var tempConfigs = [];

    var tempColors = [];


    $scope.$on('configs', function (d, lineId) {
        if (tempConfigs[lineId] == null || tempConfigs[lineId] == undefined) {

            ConfigInfoService.getConfigs(lineId).success(function (data) {
                $scope.configs = data.data;
                tempConfigs[lineId] = data.data;
            });
        }
        else
            $scope.configs = tempConfigs[lineId];

    });

    $scope.$on('colors', function (d, configId) {
        console.log(tempColors[configId]);
        if (tempColors[configId] == null || tempColors[configId] == undefined) {
            ConfigInfoService.getColors(configId).success(function (data) {
                $scope.colors = data.data;
                tempColors[configId] = data.data;
            });
        }
        else {
            $scope.colors = tempColors[configId];
        }

    });

    ConfigInfoService.getLines().success(function (data) {
        $scope.lines = data.data;
        //$scope.initialData = angular.copy(data.data);
    });

    $scope.$on('lineChange', function (d, data) {
        submitLines.push(data);
    });

    $scope.$on('configChange', function (d, data) {
        submitConfigs.push(data);
    });

    $scope.$on('colorChange', function (d, data) {
        submitColors.push(data);
    });

    $scope.edit = false;

    $scope.startEdit = function () {
        $scope.edit = true;
        //$scope.$broadcast('edit', true);
    };


    $scope.cancelEdit = function () {


        submitLines = [];
        submitConfigs = [];
        submitColors = [];

        tempConfigs = [];

        tempColors = [];
        $scope.edit = false;
        ConfigInfoService.getLines().success(function (data) {
            $scope.lines = data.data;

        });



    };


    $scope.updateConfig = function () {
        console.log(submitLines);
        console.log(submitConfigs);
        console.log(submitColors);
        var params = {line: submitLines, configuration: submitConfigs, color: submitColors};
        console.log(params);
        ConfigInfoService.updateConfigs(JSON.stringify(params)).success(function (data) {
            $scope.edit = false;
            $scope.$broadcast('edit', false);
            alert("提交成功!");
        });
    };


}
