angular.module('stocker.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('StockListCtrl',['$scope',
    function($scope){

      $scope.userStocks = [
        {ticker:"AAPL"},
        {ticker:"GPRO"},
        {ticker:"FB"},
        {ticker:"NFLX"},
        {ticker:"TSLA"},
        {ticker:"BRK-A"},
        {ticker:"INTC"},
        {ticker:"MSFT"},
        {ticker:"GE"},
        {ticker:"BAC"},
        {ticker:"C"},
        {ticker:"T"},
      ];

    }
])

.controller('StockCtrl', ['$scope', '$stateParams','stockDataFactory',
  function($scope, $stateParams, stockDataFactory) {
    $scope.ticker = $stateParams.ticker;
    $scope.chartView = 1;

    $scope.$on("$ionicView.afterEnter", function(){
      getPriceData();
      getDetailData();
    });

    $scope.chartViewSelector = function(chartID){
      $scope.chartView = chartID;
    };

    var getPriceData = function(){
      var priceData = stockDataFactory.getPriceData($scope.ticker);
      priceData.then(function(data){
        console.log(data);
        $scope.priceData = data;
      });
    };
    var getDetailData = function(){
      var detailData = stockDataFactory.getDetailData($scope.ticker);
      detailData.then(function(data){
        console.log(data);
        $scope.detailData = data;
      });
    };
  }
]);
