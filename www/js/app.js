//const ASSETS_URL = "http://192.168.8.227/escrow/web";
//const SERVEUR_URL = "http://192.168.8.227/escrow/web/app_dev.php";

const ASSETS_URL = "http://localhost/escrow/web";
//const SERVEUR_URL = "http://localhost/escrow/web/app_dev.php";
//const ASSETS_URL = "http://192.168.8.232/escrow/web";
//const SERVEUR_URL = "http://192.168.8.232/escrow/web/app_dev.php";
//const ASSETS_URL = "http://amd.eos.ss2i.pro/escrow/web";
const SERVEUR_URL = "http://amd.eos.ss2i.pro/escrow/web/app_dev.php";

const API_VERSION = "v1";

var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'http-auth-interceptor', 'ngMaterial', 'ngResource', 'ngMessages', 'md.data.table', 'ngCordova','angularMoment','uiGmapgoogle-maps' ])
// 'leaflet-directive'
.run(function($ionicPlatform,$rootScope, $state,$templateCache) {
  $rootScope.baseUrl = SERVEUR_URL+"/api/"+API_VERSION;

  $rootScope.loginUrl = SERVEUR_URL+"/api/login_check";
  $rootScope.inscriptionUrl = SERVEUR_URL+"/inscriptions.json";
  $rootScope.cguUrl = SERVEUR_URL+"/cgu";
	if (!window.cordova) {
		$rootScope.db = window.openDatabase("escrow.db", '1', 'auto', 1024 * 1024 * 100); // browser
		$rootScope.db.transaction(
			function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS utilisateur(id INTEGER PRIMARY KEY, nom CHAR(50), prenom CHAR(50), telephone CHAR(50), email CHAR(150), password CHAR(150));');						
			}, function (e) {
				alert('Transaction error: '+ e.message);
			}, function () {
				
			}
		);
    };
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.hide();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if($rootScope.user != undefined && (toState.name == 'escrow.transaction.etape1' && $rootScope.user.etape < 4) ){
        event.preventDefault();
        $state.go('escrow.denied', {}, {reload: true})
      }
  });

  $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
