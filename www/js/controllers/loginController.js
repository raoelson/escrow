app.controller('LoginCtrl', function($scope, $http, $state, AuthenticationService, $rootScope, $ionicSideMenuDelegate, $mdToast) {
	
  // DEBUT TOAST
  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
    .filter(function(pos) { return $scope.toastPosition[pos]; })
    .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $rootScope.showSimpleToast = function(text) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position(pinTo )
      .hideDelay(3000)
      );
  };

  // FIN TOAST
  
  
  
  $scope.message = "";
  $rootScope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $rootScope.user = {
    username: null,
    pass: null
  };

  $scope.loading = false;
  $scope.login = function() {
    $scope.loading = true;
    AuthenticationService.login($scope.user);
  };

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    $state.go('connexion');
  });

  $scope.$on('event:auth-loginConfirmed', function() {
    $scope.loading = true;
    $scope.username = null;
    $scope.pass = null;
    $http.get($rootScope.baseUrl+"/users/"+$scope.user.username+".json?_format=json")
    .success(function(data){
      // console.log(data[0]);
     $rootScope.logged = true;
     $scope.loading = false;
     data[0].date_naissance = new Date(data[0].date_naissance);
     $rootScope.user = data[0];
     var etape = $rootScope.user.etape;
     switch(etape){
      case 1 :
          $state.go('escrow.profil');
      break;
      case 2 : 
          $state.go('escrow.docs');
      default:
       $state.go('escrow.dashboard');
    }
  }).error(function(){
   $scope.loading = false;
 });
});

  $scope.$on('event:auth-login-failed', function(e, status) {
    $scope.loading = false;
    var error = "Login failed.";
    if (status == 401) {
      error = "Invalid Username or Password.";
    }
    $scope.message = error;
    $scope.showSimpleToast(error);
  });

  $rootScope.$on('event:auth-logout-complete', function() {
    $scope.loading = false;
    $rootScope.user = {};
    $rootScope.logged = false;
    $state.go('connexion', {}, {reload: true, inherit: false});
  });    	
})