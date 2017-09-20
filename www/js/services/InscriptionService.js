app.factory('InscriptionService', function($rootScope, $http) {
  var service = {
    Inscrir: function(user) {
	  var save = this.saveUser;
      return $http.post(
			$rootScope.inscriptionUrl, 
			{ username : user.telephone, email: user.email, password : user.password }, 
			{ ignoreAuthModule: false, withCredentials : false, "content-type" : "application/json" }
	   ).success(function (data, status, headers, config) {
			if(data[0] && data[0].message){
				$rootScope.$broadcast('event:inscription-failed', data);
				return false;
			}
			//save(user);
			//$rootScope.$broadcast('event:inscription-success', data);
			return true;
      })
      .error(function (data, status, headers, config) {
		//alert("error inscription")
      });
    },
	saveUser : function(user){
		$rootScope.db.transaction(
			function (tx) {
				tx.executeSql('INSERT INTO utilisateur(telephone,email,password) VALUES(?,?,?)', 
				[
					user.telephone,
					user.email,
					user.password
				]);						
			}, function (e) {
				alert('Transaction error: '+ e.message);
			}, function () {
				
			}
		);
	}
  };
  return service;
})