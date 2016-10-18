/**
 * Created by Lijingjing on 16/9/2.
 */

(function () {
    'use strict';

    angular.module('myApp.config', ['ui-router'])
        .factory('ConfigInfoService', ConfigInfoService);

    /** @ngInject */
    function ConfigInfoService($http, BaseUrl) {
        var getLinesRequest = function(){
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
            getLines: function(){
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


})();
