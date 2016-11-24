/**
 * Created by Lijingjing on 16/11/20.
 */

'use strict';

angular.module('myApp.management')
    .controller('ConfigCtrl', ConfigCtrl)
    .factory('ConfigService', ConfigService);


function ConfigService($http, BaseUrl) {


    var getLinesRequest = function () {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/lines',
            crossDomain: true
        });
    };

    var getConfigRequest = function (lineNo) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/configurations/byline?line=' + lineNo,
            crossDomain: true
        });
    };


    var postConfigRequest = function (data) {
        return $http({
            method: 'POST',
            url: BaseUrl + '/CarPlatform/configurations',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
            crossDomain: true,
            data: data
        });
    };


    var deleteConfig = function (id) {
        return $http({
            method: 'DELETE',
            url: BaseUrl + '/CarPlatform/configurations/' + id,
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
        });
    };


    return {
        getLines: function () {
            return getLinesRequest();
        },

        getConfig: function (lineNo) {
            return getConfigRequest(lineNo);
        },

        postConfig: function (data) {
            return postConfigRequest(data);
        },

        deleteConfig: function (id) {
            return deleteConfig(id);
        }
    }

}


/** @ngInject */
function ConfigCtrl($scope, $filter, editableOptions, editableThemes, ConfigService, $document, $uibModal) {

    var parentElem = angular.element($document[0].querySelector('.data'));
    $scope.configs = [];

    $scope.openWnd = function (index, id) {
        $uibModal.open({
            animation: true,
            templateUrl: 'deleteInfo.html',
            size: 'sm',
            appendTo: parentElem,
            windowClass: 'center-modal',
            resolve: {
                configs: function () {
                    return $scope.configs;
                }
            },
            controller: function ($scope, configs, ConfigService, $uibModalInstance) {
                $scope.deleteItem = function () {
                    configs.splice(index, 1);

                    ConfigService.deleteConfig(id).success(function (data, status) {
                        $uibModalInstance.dismiss();
                    }).error(function (data, status) {
                        //alert(status);
                    });

                };

                $scope.cancelDelete = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    };


    $scope.addnow = 0;

    $scope.opened = {};

    $scope.showAdd = false;

    $scope.open = function ($event, elementOpened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

    ConfigService.getLines().success(function (data, status) {
        $scope.lines = data.data;
        $scope.selectedLine = $scope.lines[0];
        //$scope.getConfigs($scope.selectedLine.id);
    });

    $scope.getConfigs = function (lineNo) {
        ConfigService.getConfig(lineNo).success(function (data, status) {
            $scope.configs = data.data;
        });
    };


    $scope.editRow = function (rowform, lineId) {
        //$scope.clearConfigsColors();
        rowform.$show();
    };


    $scope.removeConfig = function (index, id) {
        $scope.configs.splice(index, 1);
        console.log($scope.lines);
        ConfigService.deleteConfig(id).success(function (data, status) {
        }).error(function (data, status) {
            //alert(status);
        });

        //    之后要和后台交互
    };

    $scope.queryByLine = function () {
        $scope.getConfigs($scope.selectedLine.id);
        $scope.showAdd = true;
    };

    $scope.addConfig = function () {

        if ($scope.addnow === 1)
            return;

        if ($scope.configs == undefined) {
            alert("请选择一个车系进行查询后添加!");
            return;
        }
        $scope.addnow = 1;

        $scope.inserted = {
            id: null,
            name: ''
        };
        $scope.configs.unshift($scope.inserted);
    };


    $scope.checkConfigId = function (data) {
        if (data == null)
            return "车系不能为空!";
    };

    $scope.updateConfigs = function () {
        $scope.configs = [];
        $scope.showAdd = false;
    };


    $scope.saveConfig = function (data) {
        console.log(data);
        $scope.addnow = 0;
        var d = {
            data: {
                line: {
                    id: $scope.selectedLine.id
                },
                name: data["config.name"]
            }

        };
        ConfigService.postConfig(JSON.stringify(d)).success(function (data, status) {
            $scope.getConfigs($scope.selectedLine.id);
        }).error(function (data, stauts) {
            alert('添加失败');
        });


    };

    $scope.cancelAdding = function (index) {
        console.log(index);
        $scope.addnow = 0;
        $scope.configs.splice(index, 1);
    };


    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


}