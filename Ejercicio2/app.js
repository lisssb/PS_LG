var mainApp = angular.module('mainApp', []);

mainApp.controller('MainController', function MainController(seriesCall) {
  seriesCall.getSeriesData().then(() => {
    this.serie = seriesCall.getPieStructure();
    this.seriesDate = seriesCall.getSeriesStructure();
  });

});
