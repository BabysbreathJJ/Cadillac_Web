/**
 * Created by Lijingjing on 16/9/2.
 */

(function () {
    'use strict';

    angular.module('myApp.config',['ui-router'])
        .controller('ConfigInfoCtrl', ConfigInfoCtrl);

    /** @ngInject */
    function ConfigInfoCtrl($scope, $filter, CarConfigService) {

         CarConfigService.getLines().success(function(data){
             $scope.lines = data.data;
         });


        $scope.$on('configs', function (d, data) {

            $scope.configs = CarConfigService.getConfigs(data);

        });

        $scope.$on('colors', function (d, data) {
            //console.log('colors start');
            $scope.colors = CarConfigService.getColors(data);
        });

        $scope.edit = false;

        $scope.startEdit = function(){
            $scope.edit = true;
            $scope.$broadcast('edit', true);
        };

        $scope.cancelEdit = function(){
            $scope.edit = false;
            $scope.$broadcast('edit', false);
        };


    }

})();
