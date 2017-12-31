angular.module('mainApp').component('serieChart', {
  template: '<div id="container" style="width:100%; height:400px;"></div>',
  bindings: {
    serie: '<'
  },
  controller: function serieChartController() {
    var createChart = function(series){
      this.myChart = Highcharts.chart('container', {

        tooltip: {
          style: {
            color: 'blue',
            fontWeight: 'bold'
          }
        },

        legend: {
          layout: 'vertical',
          verticalAlign: 'middle',
          align: 'right',
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Fecha'
          }
        },
        yAxis: {
          title: {
            text: "Valor"
          }
        },
        series: series
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
