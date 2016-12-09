/**
 * Created by Lijingjing on 16/11/20.
 */

'use strict';

angular.module('myApp.management')
    .controller('ColorCtrl', ColorCtrl)
    .factory('ColorService', ColorService);


function ColorService($http, BaseUrl) {


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


    var getColorsRequest = function (id) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/configurations/' + id + '/colors',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
            crossDomain: true
        });
    };


    var postColorRequest = function (data) {
        return $http({
            method: 'POST',
            url: BaseUrl + '/CarPlatform/configcolors',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
            crossDomain: true,
            data: data
        });
    };


    var deleteColorRequest = function (id) {
        return $http({
            method: 'DELETE',
            url: BaseUrl + '/CarPlatform/configcolors/' + id,
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
        });
    };


    return {
        getLines: function () {
            return getLinesRequest();
        },

        getConfig: function (lineId) {
            return getConfigRequest(lineId);
        },

        getColor: function (id) {
            return getColorsRequest(id);
        },

        postColor: function (data) {
            return postColorRequest(data);
        },

        deleteColor: function (id) {
            return deleteColorRequest(id);
        }
    }

}


/** @ngInject */
function ColorCtrl($scope, $filter, editableOptions, editableThemes, ColorService, $uibModal, $document) {

    var parentElem = angular.element($document[0].querySelector('.data'));
    $scope.colors = [];

    $scope.openWnd = function (index, id) {
        $uibModal.open({
            animation: true,
            templateUrl: 'deleteInfo.html',
            size: 'sm',
            appendTo: parentElem,
            windowClass: 'center-modal',
            resolve: {
                colors: function () {
                    return $scope.colors;
                }
            },
            controller: function ($scope, colors, ColorService, $uibModalInstance) {
                $scope.deleteItem = function () {
                    colors.splice(index, 1);
                    ColorService.deleteColor(id).success(function (data, status) {
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

    ColorService.getLines().success(function (data, status) {
        $scope.lines = data.data;
        $scope.selectedLine = $scope.lines[0];
        $scope.getConfigs($scope.selectedLine.id);
    });

    $scope.getConfigs = function (lineNo) {
        ColorService.getConfig(lineNo).success(function (data, status) {
            $scope.configs = data.data;
            $scope.selectedConfig = $scope.configs[0];
            //$scope.getColors($scope.selectedConfig.id);
        });
    };

    $scope.getColors = function (configId) {
        if (configId == null)
            return;
        ColorService.getColor(configId).success(function (data, status) {
            $scope.colors = data.data;
            if($scope.colors.length == 0)
            {
                alert("所查询的信息为空!");
            }
        });
    };


    $scope.queryColors = function () {
        $scope.showAdd = true;
        $scope.getColors($scope.selectedConfig.id);
    };

    $scope.updateConfigs = function () {

        $scope.configs = [];
        $scope.colors = [];
        $scope.showAdd = false;
        $scope.getConfigs($scope.selectedLine.id);
    };

    $scope.updateColors = function(){
        $scope.colors = [];
        $scope.showAdd = false;
    };

    $scope.editRow = function (rowform, lineId) {
        //$scope.clearConfigsColors();
        rowform.$show();
    };


    $scope.removeColor = function (index, id) {
        $scope.colors.splice(index, 1);
        ColorService.deleteColor(id).success(function (data, status) {
            //alert(status);
            //$scope.getCounts();
        }).error(function (data, status) {
            //alert(status);
        });

        //    之后要和后台交互
    };

    $scope.addColor = function () {
        //$scope.clearConfigsColors();
        if ($scope.addnow === 1)
            return;

        if($scope.colors == undefined)
        {
            alert("请选择车系和配置进行查询后进行添加!");
            return;
        }
        $scope.addnow = 1;

        $scope.inserted = {
            id: null,
            name: ''
        };
        $scope.colors.unshift($scope.inserted);
    };


    $scope.checkColorId = function (data) {
        if (data == null)
            return "颜色不能为空!";
    };


    $scope.saveColor = function (data) {

        $scope.addnow = 0;
        var d = {
            data: {
                configuration: {
                    id: $scope.selectedConfig.id
                },
                name: data["color.name"]
            }
        };

        ColorService.postColor(JSON.stringify(d)).success(function (data, status) {
            $scope.getColors($scope.selectedConfig.id);
        }).error(function (data, stauts) {
            alert('添加失败');
        });


    };

    $scope.cancelAdding = function (index) {
        $scope.addnow = 0;
        $scope.colors.splice(index, 1);
    };


    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


}