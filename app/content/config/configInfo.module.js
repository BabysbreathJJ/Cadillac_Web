/**
 * Created by Lijingjing on 16/9/2.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configInfo', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,USER_ROLES) {
        $stateProvider
            .state('configInfo', {
                url: '/configInfo',
                templateUrl: 'app/pages/configInfo/configInfo.html',
                controller: 'ConfigInfoCtrl',
                title: '车辆配置设置',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 50
                },
                data: {
                    authorizedRoles: [USER_ROLES.provider]
                }
            });
    }

})();