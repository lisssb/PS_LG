angular.module('mainApp').factory('seriesCall', ['$http', '$q', function seriesCallFactory($http, $q){
  var series;
  var pieStructure;
  var categoryStructure = {};
  var seriesStructureAux;
  var seriesStructure;
  var dateStructure;
  var categoryList = [];
  var categoryListKeys = {};
  var pieData = {};


  /**
  seriesStructure -> get series data needed by seriesChart in the correct date order
  **/
  var generateSerieDataByCategory = function(){
    seriesStructureAux = {}; //get the seriesStructureAux that save the data by categories order by the dates
    dateStructure.forEach(function(key){
      categoryList.forEach(function(category){
        var currentCat = seriesStructureAux[category] || [];
        var currentValue = categoryStructure[key][category] || 0;
        currentCat.push(currentValue);
        seriesStructureAux[category] = currentCat;
      });
    });

    seriesStructure = [];
    categoryList.forEach(function(cat){
      seriesStructure.push({name : cat, data : seriesStructureAux[cat]});
    });
  };


  /**
  gererate the categories text for the serieChart
  **/
  var generateSerieCategory = function(){
    //Get dateCategories text
    var monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    dateStructure = dateStructure.map(function(currentDate){
      currentDate = new Date(Number(currentDate));
      return  currentDate.getDate() + " " + monthNames[currentDate.getMonth()];
    });
  };

  /**
  generate pie chart serie data
  **/
  var gerenatePieChartDate = function(){
    pieStructure = [];
    Object.keys(pieData).forEach(function(key){
      pieStructure.push({
        name: key,
        y: pieData[key]
      });
    });
  };


  /**
      categoryList -> List of categories
      pieData -> hashMap with the with the categories and the sum of all is value
      categoryStructure -> hashMap that save by date the categorues and its value-> {  date : { cat1: value } }
  **/
  var generateStructure = function(cat, value, date){
    var currentCategory;
    var categoryStructureAux;
    var currentCategoryCat;

    //append the categories that exist in all the dataset
    if(!categoryListKeys.hasOwnProperty(cat)){
      categoryListKeys[cat] = true;
      categoryList.push(cat);
    }
    //fill pie data
    currentCategory = pieData[cat] || 0;
    currentCategory += value;
    pieData[cat] = currentCategory;

    //fill series data
    categoryStructureAux = categoryStructure[date] || {};
    currentCategoryCat = categoryStructureAux[cat] || 0;
    categoryStructureAux[cat] = currentCategoryCat + value;
    categoryStructure[date] = categoryStructureAux;
  };

  var getSeriesData = function(){
    var serie1 = $http({
      url: "http://s3.amazonaws.com/logtrust-static/test/test/data1.json",
      method: "GET",
    });
    var serie2 = $http({
      url: "http://s3.amazonaws.com/logtrust-static/test/test/data2.json",
      method: "GET",
    });

    var serie3 =  $http({
      url: "http://s3.amazonaws.com/logtrust-static/test/test/data3.json",
      method: "GET",
    });

    return $q.all([serie1, serie2, serie3]).then((series) => {
      var c1 = series[0].data;
      var c2 = series[1].data;
      var c3 = series[2].data;
      var cat;
      var date;
      var value;
      var currentElement;


      var i;
      for(i = 0; i < c1.length; i += 1){
        currentElement = c1[i]
        cat = currentElement.cat.toUpperCase();
        date = currentElement.d;
        value = currentElement.value;
        generateStructure(cat, value, date);
      }
      for(i = 0; i < c2.length; i += 1){
        currentElement = c2[i];
        cat = currentElement.categ.toUpperCase();
        date = new Date(currentElement.myDate).getTime();
        value = currentElement.val;
        generateStructure(cat, value, date);
      }
      for(i = 0; i < c3.length; i += 1){
        currentElement = c3[i];
        var aux = currentElement.raw.match(/.*(\d{4}-\d{2}-\d{2}).*#(\w{3}\s\d)#.*/);
        cat = aux[2].toUpperCase();
        date = new Date(aux[1]).getTime();
        value = currentElement.val;
        generateStructure(cat, value, date);
      }


      dateStructure = Object.keys(categoryStructure).sort(); //get the dateCategoireies sorted
      generateSerieDataByCategory();
      generateSerieCategory();
      gerenatePieChartDate();
    });

  };

  var getPieStructure = function(){
    return pieStructure;
  };

  var getSeriesStructure = function(){
    return  {
      categories: dateStructure,
      series: seriesStructure
    }
  };

  return {
    getSeriesData : getSeriesData,
    getPieStructure: getPieStructure,
    getSeriesStructure: getSeriesStructure
  };

}]);
