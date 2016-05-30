angular.module('stocker.services', [])
.factory('encodeURIFactory', function(){
  return {
    encode: function(string){
      return encodeURIComponent(string).replace(/\""/g,"%22").replace(/\ /g, "%20").replace(/[!''()]/g, escape);
    }
  };
})
.factory('dateFactory', function($filter){

  var currentDate = function(){
    var date = $filter('date')(new Date(), 'yyyy-MM-dd');
    return date;
  };

  var yearDate = function(){
    var oneYearAgo = new Date( new Date().setDate(new Date().getDate()-366));
    var date = $filter('date')(oneYearAgo, 'yyyy-MM-dd');
    return date;
  };

  return {
    currentDate:currentDate,
    yearDate: yearDate
  };
})
.factory('stockDataFactory', function($q, $http, encodeURIFactory){
   var getDetailData = function(ticker){
    var deferred = $q.defer();
    var query = 'select * from yahoo.finance.quotes where symbol IN ( "'+ticker+'" )';
    var url = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIFactory.encode(query)+'&format=json&env=http://datatables.org/alltables.env';

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
