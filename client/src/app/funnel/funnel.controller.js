(function() {
    'use strict';

    angular
        .module('funnel')
        .controller('FunnelController', FunnelController);

    function FunnelController($log, $state, $rootScope, $stateParams, $location, applicationRepository, REDIRECT, Session, funnelService) {

        var vm = this;
        var params = {
            start_date: $location.search().start_date || '2014-12-01',
            end_date: $location.search().end_date || '2014-12-28'
        }
        $location.path('/funnels').search(params);
        (function init() {
            var query = {
                start_date: $location.search().start_date,
                end_date: $location.search().end_date
            };
            funnelService.retrieveFunnelData(query).then(function(response) {

                vm.funnelData = response.data;
                vm.prettyJSON = JSON.stringify(vm.funnelData, undefined, 2);

                var series = [{
                    name: 'applied',
                    data: [],
                }, {
                    name: 'quiz_started',
                    data: [],
                }, {
                    name: 'quiz_completed',
                    data: [],
                }, {
                    name: 'onboarding_requested',
                    data: [],
                }, {
                    name: 'onboarding_completed',
                    data: [],
                }, {
                    name: 'hired',
                    data: [],
                }, {
                    name: 'rejected',
                    data: [],
                }];

                Object.keys(response.data).forEach(function(week, index) {
                    if(response.data[week].applied) {
                        series[0].data.push(response.data[week].applied);
                    } else {
                        series[0].data.push(0);
                    }
                    if(response.data[week].quiz_started) {
                        series[1].data.push(response.data[week].quiz_started);
                    } else {
                        series[1].data.push(0);
                    }
                    if(response.data[week].quiz_completed) {
                        series[2].data.push(response.data[week].quiz_completed);
                    } else {
                        series[2].data.push(0);
                    }
                    if(response.data[week].onboarding_requested) {
                        series[3].data.push(response.data[week].onboarding_requested);
                    } else {
                        series[3].data.push(0);
                    }
                    if(response.data[week].onboarding_completed) {
                        series[4].data.push(response.data[week].onboarding_completed);
                    } else {
                        series[4].data.push(0);
                    }
                    if(response.data[week].hired) {
                        series[5].data.push(response.data[week].hired);
                    } else {
                        series[5].data.push(0);
                    }
                    if(response.data[week].rejected) {
                        series[6].data.push(response.data[week].rejected);
                    } else {
                        series[6].data.push(0);
                    }
                });

                $(function () {
                    Highcharts.chart('funnel-graph', {
                        width:900,
                        credits: {
                            enabled: false
                        },
                        chart: {
                            type: 'column'
                        },

                        title: {
                            text: 'Applicant status, grouped by week'
                        },

                        xAxis: {
                            categories: Object.keys(vm.funnelData)
                        },

                        yAxis: {
                            allowDecimals: false,
                            min: 0,
                            title: {
                                text: 'Number of applicants'
                            }
                        },

                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.x + '</b><br/>' +
                                    this.series.name + ': ' + this.y + '<br/>' +
                                    'Total: ' + this.point.stackTotal;
                            }
                        },

                        plotOptions: {
                            column: {
                                stacking: 'normal'
                            }
                        },

                        series: series.reverse()
                    });
                });
            })
        })();



    }

})();
