/**
 * Created by Lijingjing on 16/9/13.
 */
angular.module('myApp.statistic', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.hashPrefix('!');

    }])
    .factory('StatisticService', function ($http, BaseUrl) {
        var getFilesRequest = function (param) {
            return $http({
                method: 'POST',
                url: BaseUrl + '/CarPlatform/orders/files',
                //url: 'http://192.168.0.104:8080/CarPlatform/orders/files',
                crossDomain: true,
                data: param
            });
        };

        return {
            getFiles: function (param) {
                return getFilesRequest(param);
            }
        }
    })
    .controller('StatisticCtrl', function ($scope, StatisticService, $filter, BaseUrl) {
        //datepicker (month picker)
        $scope.today = function () {
            $scope.startTime = new Date();
            $scope.endTime = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };


        $scope.setDate = function (year, month, day) {
            $scope.startTime = new Date(year, month, day);
            $scope.endTime = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };


        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.showInfo = true;

        $scope.result = "请选择日期查询信息!";

        $scope.search = function () {

            if ($scope.startTime > $scope.endTime) {
                alert("开始时间必须早于结束时间!");
                return;
            }
            $scope.showInfo = true;
            $scope.result = '正在查询结果,请耐心等待...';

            var param = {
                start: $filter('date')($scope.startTime, 'yyyy-MM-dd'),
                end: $filter('date')($scope.endTime, 'yyyy-MM-dd')
            };


            StatisticService.getFiles(JSON.stringify(param)).success(function (data) {
                $scope.showInfo = false;
                $scope.name = data.name;
                $scope.url = BaseUrl + '/CarPlatform' + data.url;
            });
        };


    });