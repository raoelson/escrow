app.factory('UtilisateursService', function($rootScope, $http, authService) {
  var service = {
    updateUser: function(user) {
      return $http.put($rootScope.baseUrl+"/user.json", $rootScope.user)
      .success(function (data, status, headers, config) {
       console.log(data);
     })
      .error(function (data, status, headers, config) {
        
      });
    }
  };
  return service;
})
.factory('TelephoneService', function($rootScope, $http) {
  var service = {
    sendTelephone: function(user) {
      var data = { telephone : $rootScope.user.username};
      return $http.post($rootScope.baseUrl+"/telephones.json", data)
      .success(function (data, status, headers, config) {
       console.log(data);
     })
      .error(function (data, status, headers, config) {
        
      });
    }
  };
  return service;
});
