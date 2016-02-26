angular.module('stocker.services', [])
.factory('stockDataFactory', function($q, $http){
   var getDetailData = function(ticker){
    var deferred = $q.defer();
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22"+ticker+"%22)&format=json&env=http://datatables.org/alltables.env";
    $http.get(url)
    .success(function(response){
      var data = response.query.results.quote;
      deferred.resolve(data);
    })
    .error(function(error){
      console.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
   };
   var getPriceData = function(ticker){
    var url = 'http://finance.yahoo.com/webservice/v1/symbols/'+ticker+'/quote?format=json&view=detail';
    var deferred = $q.defer();
    $http.get(url)
    .success(function(response){
      var data = response.list.resources[0].resource.fields;
      deferred.resolve(data);
    })
    .error(function(error){
      console.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
  };

    return {
      getPriceData: getPriceData,
      getDetailData: getDetailData
    };
 }
);
