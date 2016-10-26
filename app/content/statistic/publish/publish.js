/**
 * Created by Lijingjing on 16/9/19.
 */

'use strict';

angular.module('myApp.statistic')
    .controller('PublishCtrl', PublishCtrl)
    .directive('saleTable', saleTableFunc)
    .directive('items', saleItemFunc)
    .directive('areas', areasFunc)
    .directive('sales', salesFunc)
    .factory('CarConfigService', CarConfigService)
    .filter('price', function () {
        var filter = function (input) {
            return input + '万';
        };
        return filter;
    });


function CarConfigService($http, BaseUrl) {

    var getCarsRequest = function (pageNo) {
        return $http({
            method: 'GET',
            url: BaseUrl + '/CarPlatform/cars/search?page=' + pageNo,
            crossDomain: true
        });
    };

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

    return {
        getCars: function (pageNo) {
            return getCarsRequest(pageNo);
        },
        getLines: function () {
            return getLinesRequest();
        },
        getConfig: function (lineNo) {
            return getConfigRequest(lineNo);
        }
    }

}

/** @ngInject */
function saleTableFunc() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<table class="data table table-bordered statistic-table" style="text-align: center;">' +
        '<tr class="table-header">' +
        '<th class="data-th" width="30%">大区</th>' +
        '<th class="data-th" width="10%">全部车系</th>' +
        '<th class="data-th" width="10%">SRX</th>' +
        '<th class="data-th" width="10%">XTS</th>' +
        '<th class="data-th" width="10%">ATS-L</th>' +
        '<th class="data-th" width="10%">CT6</th>' +
        '<th class="data-th" width="10%">XT5</th>' +
        '<th class="data-th" width="10%">CTS</th> </tr>' +
        '<tbody ng-transclude></tbody></table>',
        controller: function ($scope) {
            $scope.$on('getArea', function (d, data) {
                $scope.areas = data.areas;
                if ($scope.showArea == data.itemId) {
                    $scope.showArea = -1;
                    $scope.showSale = -1;
                }
                else
                    $scope.showArea = data.itemId;

                //$scope.$broadcast('receiveArea', data.itemId);
            });

            $scope.$on('getSale', function (d, data) {
                $scope.sales = data.sales;
                console.log(data.areaId);
                if ($scope.showSale == data.areaId)
                    $scope.showSale = -1;
                else
                    $scope.showSale = data.areaId;
            });

        }
    }
}

/** @ngInject */
function saleItemFunc() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?saleTable',
        scope: {
            item: '=item'
        },
        template: '<tr>' +
        '<td class="data-td left-text">' +
        '<div class="all-area" ng-click="showMiddleArea()">' +
        '{{item.area}}' +
        '<span class="ion-chevron-down"></span>' +
        '</div> </td>' +
        '<td class="data-td red-color">' +
        '{{item.lines}}</td>' +
        '<td class="data-td">' +
        '{{item.srx}}</td>' +
        '<td class="data-td">' +
        '{{item.xts}}</td>' +
        '<td class="data-td">' +
        '{{item.ats}}</td>' +
        '<td class="data-td">' +
        '{{item.ct6}}</td>' +
        '<td class="data-td">' +
        '{{item.xt5}}</td>' +
        '<td class="data-td">' +
        '{{item.cts}} </td> </tr>',
        link: function (scope, element, attrs, saleTableController) {
            scope.showMiddleArea = function () {
                scope.areas = [{
                    area: 'MAC1',
                    lines: 2744,
                    srx: 800,
                    xts: 345,
                    ats: 975,
                    ct6: 800,
                    xt5: 345,
                    cts: 975
                }, {
                    area: 'MAC2',
                    lines: 5856,
                    srx: 265,
                    xts: 235,
                    ats: 324,
                    ct6: 265,
                    xt5: 235,
                    cts: 324
                }, {
                    area: 'MAC3',
                    lines: 2344,
                    srx: 334,
                    xts: 235,
                    ats: 53,
                    ct6: 234,
                    xt5: 32,
                    cts: 123
                }, {
                    area: 'MAC4',
                    lines: 7356,
                    srx: 324,
                    xts: 221,
                    ats: 553,
                    ct6: 321,
                    xt5: 451,
                    cts: 763
                }, {
                    area: 'MAC5',
                    lines: 5356,
                    srx: 224,
                    xts: 323,
                    ats: 518,
                    ct6: 341,
                    xt5: 171,
                    cts: 623
                }];

                //console.log(scope.sale.area);

                scope.data = {itemId: scope.item.area, areas: scope.areas};

                scope.$emit('getArea', scope.data);

            };
        }
    }
}


/** @ngInject */
function areasFunc() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?saleTable',
        scope: {
            itemId: '=itemId',
            area: '=area'

        },
        template: '<tr><td class="data-td middle-text">' +
        '<div class="all-area" ng-click="showLastArea()">' +
        '{{area.area}}' +
        '<span class="ion-chevron-down"></span>' +
        '</div> </td>' +
        '<td class="data-td red-color">' +
        '{{area.lines}}</td>' +
        '<td class="data-td">' +
        '{{area.srx}}</td>' +
        '<td class="data-td">' +
        '{{area.xts}}</td>' +
        '<td class="data-td">' +
        '{{area.ats}}</td>' +
        '<td class="data-td">' +
        '{{area.ct6}}</td>' +
        '<td class="data-td">' +
        '{{area.xt5}}</td>' +
        '<td class="data-td">' +
        '{{area.cts}} </td></tr>',
        link: function (scope, element, attrs, saleTableController) {

            scope.showLastArea = function () {
                scope.sales = [{
                    area: '经销商一',
                    lines: 2744,
                    srx: 800,
                    xts: 345,
                    ats: 975,
                    ct6: 800,
                    xt5: 345,
                    cts: 975
                }, {
                    area: '经销商二',
                    lines: 5856,
                    srx: 265,
                    xts: 235,
                    ats: 324,
                    ct6: 265,
                    xt5: 235,
                    cts: 324
                }, {
                    area: '经销商三',
                    lines: 2344,
                    srx: 334,
                    xts: 235,
                    ats: 53,
                    ct6: 234,
                    xt5: 32,
                    cts: 123
                }, {
                    area: '经销商四',
                    lines: 7356,
                    srx: 324,
                    xts: 221,
                    ats: 553,
                    ct6: 321,
                    xt5: 451,
                    cts: 763
                }, {
                    area: '经销商五',
                    lines: 5356,
                    srx: 224,
                    xts: 323,
                    ats: 518,
                    ct6: 341,
                    xt5: 171,
                    cts: 623
                }];


                //console.log(scope.sale.area);

                scope.data = {areaId: scope.area.area, sales: scope.sales};

                scope.$emit('getSale', scope.data);

            };


        }
    }
}


/** @ngInject */
function salesFunc() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?saleTable',
        scope: {
            areaId: '=areaId',
            sale: '=sale'

        },
        template: '<tr class="gray-bg"><td class="data-td right-text">' +
        '<div class="all-area">' +
        '{{sale.area}}' +
            //'<span class="ion-chevron-right"></span>' +
        '</div> </td>' +
        '<td class="data-td red-color">' +
        '{{sale.lines}}</td>' +
        '<td class="data-td">' +
        '{{sale.srx}}</td>' +
        '<td class="data-td">' +
        '{{sale.xts}}</td>' +
        '<td class="data-td">' +
        '{{sale.ats}}</td>' +
        '<td class="data-td">' +
        '{{sale.ct6}}</td>' +
        '<td class="data-td">' +
        '{{sale.xt5}}</td>' +
        '<td class="data-td">' +
        '{{sale.cts}} </td></tr>',
        link: function (scope, element, attrs, saleTableController) {


        }
    }
}


/** @ngInject */
function PublishCtrl($scope, $filter, editableOptions, editableThemes, CarConfigService, $state) {
    $scope.smartTablePageSize = 10;
    $scope.pagination = {currentPage: 1};

    //    分页逻辑

    $scope.setPage = function (pageNo) {
        $scope.pagination.currentPage = pageNo;
    };

    $scope.itemNum = 5;

    $scope.pageChanged = function () {
        $scope.getCars($scope.pagination.currentPage);
    };


//    测试数据
    $scope.items = [{
        area: '一区',
        lines: 2744,
        srx: 800,
        xts: 345,
        ats: 975,
        ct6: 800,
        xt5: 345,
        cts: 975
    }, {
        area: '二区',
        lines: 5856,
        srx: 265,
        xts: 235,
        ats: 324,
        ct6: 265,
        xt5: 235,
        cts: 324
    }, {
        area: '三区',
        lines: 2344,
        srx: 334,
        xts: 235,
        ats: 53,
        ct6: 234,
        xt5: 32,
        cts: 123
    }, {
        area: '四区',
        lines: 7356,
        srx: 324,
        xts: 221,
        ats: 553,
        ct6: 321,
        xt5: 451,
        cts: 763
    }, {
        area: '五区',
        lines: 5356,
        srx: 224,
        xts: 323,
        ats: 518,
        ct6: 341,
        xt5: 171,
        cts: 623
    }];



    //console.log($state.current.name);


}