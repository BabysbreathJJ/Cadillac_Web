'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'myApp.login',
        'myApp.content',
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'myApp.version',
        'myApp.constants'
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/login');

    }])
    .directive('pageBackground', function () {
        return {
            restrict: 'EA',
            controller: function ($scope, $element, $attrs, $state) {
                if ($state.current.name == 'login') {
                    $element.addClass('login-background');
                }
                else {
                    $element.removeClass('login-background');
                }
            }
        }
    });

angular.module('myApp.constants', [])
    // .constant('BaseUrl', 'http://192.168.0.104:8080')
    //.constant('BaseUrl', 'http://115.159.78.97:8080')
    //.constant('BaseUrl', 'http://192.168.1.148:8080')
    .constant('BaseUrl', 'http://192.168.1.46:8080')
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        all: '*',
        sales: 'sales',
        provider: 'provider'
    });