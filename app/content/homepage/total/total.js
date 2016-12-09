/**
 * Created by Lijingjing on 16/9/13.
 */
'use strict';

angular.module('myApp.homepage')
    .controller('TotalCtrl', TotalCtrl)
    .factory('CarConfigService', CarConfigService)
    .filter('price', function() {
        var filter = function(input) {
            return input + '万';
        };
        return filter;
    });


function CarConfigService($http, BaseUrl) {

    var getCarsRequest = function(pageNo) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/cars/page/all?page=' + pageNo,
            headers: {Authorization: window.localStorage.getItem("authorization")},
            crossDomain: true
        });
    };

    var getLinesRequest = function() {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/lines',
            crossDomain: true
        });
    };

    var getConfigRequest = function(lineNo) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/configurations/byline?line=' + lineNo,
            crossDomain: true
        });
    };

    var postCar = function(data) {
        return $http({
            method: 'POST',
            url: BaseUrl + '/CarPlatform/cars',
            headers: {Authorization: window.localStorage.getItem("authorization")},
            crossDomain: true,
            data: data
        });
    };

    var changeCar = function(data, id){
        return $http({
            method:'PATCH',
            url: BaseUrl + '/CarPlatform/cars/' + id,
            headers: {Authorization: window.localStorage.getItem("authorization")},
            data: data
        });
    };

    var deleteCar = function(id){
        return $http({
            method: 'DELETE',
            url: BaseUrl + '/CarPlatform/cars/' + id,
            headers: {Authorization: window.localStorage.getItem("authorization")},
        });
    };
    return {
        getCars: function(pageNo) {
            return getCarsRequest(pageNo);
        },
        getLines: function() {
            return getLinesRequest();
        },
        getConfig: function(lineNo) {
            return getConfigRequest(lineNo);
        },
        postCar: function(data) {
            return postCar(data);
        },
        changeCar: function(data, id){
            return changeCar(data, id);
        },
        deleteCar: function(id){
            return deleteCar(id);
        }
    }

}


/** @ngInject */
function TotalCtrl($scope, $filter, editableOptions, editableThemes, CarConfigService) {
    Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    $scope.smartTablePageSize = 10;
    $scope.pagination = { currentPage: 1 };

    $scope.getCars = function(pageNo) {
        CarConfigService.getCars(pageNo).success(function(data, status) {
            $scope.cars = data.data;
            $scope.pagination.totalItems = data.count;
            $scope.getCounts();
        });
    };

    $scope.getCars(1);


    $scope.opened = {};

    $scope.open = function($event, elementOpened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

    CarConfigService.getLines().success(function(data, status) {
        $scope.lines = data.data;
    });

    $scope.getConfigs = function(lineNo) {
        CarConfigService.getConfig(lineNo).success(function(data, status) {
            $scope.configs = data.data;
        });

    };

    $scope.editRow = function(rowform, lineId) {
        //$scope.clearConfigsColors();
        rowform.$show();
        $scope.getConfigs(lineId);
        //    之后添加获得颜色的函数

    };

    $scope.clearConfigsColors = function() {
        $scope.configs = [];
        $scope.colors = [];
    };

    $scope.colors = [
        { name: '红' },
        { name: '白' },
        { name: '金' },
        { name: '黑' },
        { name: '粉' },
        { name: '蓝' }
    ];

    $scope.showAddTime = function(car) {
        if ((typeof car.addTime == 'string') && car.addTime !== "") {
            var myDate = car.addTime.split('-');
            var year = myDate[0];
            var month = myDate[1];
            var day = myDate[2];
            car.addTime = new Date(year, month - 1, day);
        }
        return car.addTime;

    };

    $scope.removeCar = function(index, id) {
        //$scope.clearConfigsColors();
        $scope.cars.splice(index, 1);
        CarConfigService.deleteCar(id).success(function(data, status){
            alert(status);
            
            $scope.pageChanged();
        }).error(function(data,status){
            alert(status);
        });
        
        //    之后要和后台交互
    };

    $scope.addCar = function() {
        //$scope.clearConfigsColors();
        $scope.inserted = {
            id: null,
            name: '',
            serial: null,
            configuration: { id: null, name: null },
            interiorColor: null,
            addTime: '',
            price: "",
            dealer: { id: 2 }
        };
        $scope.cars.unshift($scope.inserted);
    };

    $scope.formatDate = function(myDate) {

        var year = myDate.getFullYear();
        var tempMonth = myDate.getMonth() + 1;
        var month = tempMonth > 9 ? tempMonth : '0' + tempMonth;
        var tempDay = myDate.getDate();
        var day = tempDay > 9 ? tempDay : '0' + tempDay;
        var formatDate = year + '-' + month + '-' + day;
        return formatDate;


    };

    $scope.checkSerial = function(data) {
        if (data == null)
            return "车辆编号不能为空!";
    };
    $scope.checkLineId = function(data) {
        if (data == null)
            return "车系不能为空!";
    };
    $scope.checkConfig = function(data) {
        if (data == null)
            return "配置不能为空!";
    };
    $scope.checkColor = function(data) {
        if (data == null)
            return "颜色不能为空!";
    };
    $scope.checkPrice = function(data) {
        if (isNaN(data) || data === '') {
            return "价格必须为数字!";
        }
    };
    $scope.checkAddTime = function(data) {
        if (data == null || data === '')
            return "请正确选择时间";
    };

    $scope.saveCar = function(data, id) {

        var d = {
            data: {
                color: data['color.name'],
                price: data.number,

                addTime: data.addTime.Format('yyyy-MM-dd'),
                line:{
                    id: data['line.id']
                },
                configuration:{
                    id: data['configuration.id']
                }
            }
        };
        if(id == null){
            CarConfigService.postCar(JSON.stringify(d)).success(function(data, status){
                $scope.getCars($scope.pagination.currentPage);
            }).error(function(data, stauts){
                alert('添加失败');
            });
        }else{
            CarConfigService.changeCar(JSON.stringify(d), id).success(function(data, status){
                $scope.cars = $scope.cars.map(function(x){
                    if(x.id === id)
                        return data.data;
                    return x;
                });
            }).error(function(data, status){
                alert('修改失败');
            });
        }


    };

    $scope.cancelAdding = function(index){
        $scope.cars.splice(index, 1);
    }
    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


    //    分页逻辑

    $scope.setPage = function(pageNo) {
        $scope.pagination.currentPage = pageNo;
    };

    $scope.itemNum = 10;

    $scope.pageChanged = function() {
        $scope.getCars($scope.pagination.currentPage);
    };

    $scope.getReport = function(report){
        if(report === 1)
            return "是";
        else return "否";
    };

    $scope.getType = function(type){
        if(type === 0)
            return '良好';
        else if(type === 1)
            return '一般';
        else return '差';
    };

}
