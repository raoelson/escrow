app.factory('AuthenticationService', function($rootScope, $http, authService) {
  var service = {
    login: function(user) {
      $http.post($rootScope.loginUrl, { _username : user.username, _password : user.pass }, { ignoreAuthModule: true })
      .success(function (data, status, headers, config) {
    	$http.defaults.headers.common.Authorization = data.authorizationToken;
		$http.defaults.headers.common.Authorization = "Bearer " + data.token;
        authService.loginConfirmed(data, function(config) {
          return config;
        });
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('event:auth-login-failed', status);
      });
    },
    logout: function(user) {
		$rootScope.$broadcast('event:auth-logout-complete');
		alert("bjr");
		user = null;
      /*$http.post('https://logout', {}, { ignoreAuthModule: true })
      .finally(function(data) {
        delete $http.defaults.headers.common.Authorization;
      });*/			
    },	
    loginCancelled: function() {
      authService.loginCancelled();
    }
  };
  return service;
})