angular.module('mainApp').component('pieChart', {
  template: '<div id="piechart" style="width:100%; height:400px;"></div>',
  bindings: {
    serie: '<'
  },
  controller: function pieChartController() {
    var createChart = function (series) {
      this.chart = Highcharts.chart('piechart', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Test'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              },
              connectorColor: 'silver'
            }
          }
        },
        series: [ { data : series }]
      });
    };

    this.$onChanges = function() {
      var series = this.serie;
      if(series){
        createChart(series);
      }
    };
  }
});
