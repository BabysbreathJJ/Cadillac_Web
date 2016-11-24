/**
 * Created by Lijingjing on 16/11/20.
 */

'use strict';

angular.module('myApp.management')
    .controller('LineCtrl', LineCtrl)
    .factory('LineService', LineService);


function LineService($http, BaseUrl) {


    var getLinesRequest = function () {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/lines',
            crossDomain: true
        });
    };


    var postLine = function (data) {
        return $http({
            method: 'POST',
            url: BaseUrl + '/CarPlatform/lines',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
            crossDomain: true,
            data: data
        });
    };


    var deleteLine = function (id) {
        return $http({
            method: 'DELETE',
            url: BaseUrl + '/CarPlatform/lines/' + id,
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImRlYWxlciIsImlhdCI6MTQ3NjE1MTc5MTg1M30.g-A_CRjPy3pkQJFfAVHPhRc1SH-Cu1DyR4OhhorP-eA'},
        });
    };


    return {
        getLines: function () {
            return getLinesRequest();
        },

        postLine: function (data) {
            return postLine(data);
        },

        deleteLine: function (id) {
            return deleteLine(id);
        }
    }

}


/** @ngInject */
function LineCtrl($scope, $filter, editableOptions, editableThemes, LineService, $uibModal, $document) {

    var parentElem = angular.element($document[0].querySelector('.data'));
    $scope.lines = [];

    $scope.openWnd = function (index, id) {
        $uibModal.open({
            animation: true,
            templateUrl: 'deleteInfo.html',
            size: 'sm',
            appendTo: parentElem,
            windowClass: 'center-modal',
            resolve: {
                lines: function () {
                    return $scope.lines;
                }
            },
            controller: function ($scope, lines, LineService, $uibModalInstance) {
                $scope.deleteItem = function () {
                    console.log(lines);
                    lines.splice(index, 1);
                    console.log(lines);
                    console.log(id);
                    LineService.deleteLine(id).success(function (data, status) {
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

    $scope.open = function ($event, elementOpened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };


    $scope.getLines = function () {
        LineService.getLines().success(function (data, status) {
            $scope.lines = data.data;
        });
    };

    $scope.getLines();


    $scope.removeLine = function (index, id) {
        $scope.lines.splice(index, 1);
        console.log($scope.lines);
        console.log(id);
        LineService.deleteLine(id).success(function (data, status) {
            //alert(status);
            //$scope.getCounts();
            $scope.pageChanged();
        }).error(function (data, status) {
            //alert(status);
        });

        //    之后要和后台交互
    };

    $scope.addLine = function () {
        //$scope.clearConfigsColors();
        if ($scope.addnow === 1)
            return;
        $scope.addnow = 1;

        $scope.inserted = {
            id: null,
            name: ''
        };
        $scope.lines.unshift($scope.inserted);
    };


    $scope.checkLineName = function (data) {
        if (data == null)
            return "车系不能为空!";
    };


    $scope.saveLine = function (lineData) {

        console.log(lineData["line.name"]);

        $scope.addnow = 0;
        var d = {
            data: {
                name: lineData["line.name"]
            }
        };

        console.log(d);


        LineService.postLine(JSON.stringify(d)).success(function (data, status) {
            $scope.getLines();
        }).error(function (data, stauts) {
            alert('添加失败');
        });


    };

    $scope.cancelAdding = function (index) {
        console.log(index);
        $scope.addnow = 0;
        $scope.cars.splice(index, 1);
    };


    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

}