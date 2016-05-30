angular.module('stocker', [
  'ionic',
  'nvd3',
  'nvChart',
  'stocker.controllers',
  'stocker.services',
  'stocker.filters',
  'stocker.directives',
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    })
  .state('app.stocklist', {
      url: '/stocks',
      views: {
        'menuContent': {
          templateUrl: 'templates/stocklist.html',
          controller: 'StockListCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/stocks/:ticker',
    views: {
      'menuContent': {
        templateUrl: 'templates/Stock.html',
        controller: 'StockCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/stocks');
});
