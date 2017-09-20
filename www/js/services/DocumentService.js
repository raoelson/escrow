app.factory('DocumentService', ['$http','$rootScope', function($http,$rootScope){
	var service = {
		sendDocument : function(user){
			if(user.pp_base64){
				var data  = {idUser : user.id, passeport : user.pp_base64,rib : user.rib_base64,domicile : user.jd_base64,isIdcheck: user.verifIdCheck};
			}else{
				var data  = {idUser : user.id, cin: user.cin_base64,rib : user.rib_base64,domicile : user.jd_base64,isIdcheck: user.verifIdCheck};	
			}
			$http.post(
				$rootScope.baseUrl+'/documents.json', 
				data, 
				{ "content-type" : "application/json" }
				).success(function (data, status, headers, config) {
					$rootScope.$broadcast('event:send-document-success', data);
				})
				.error(function (data, status, headers, config) {
					$rootScope.$broadcast('event:send-document-failed', data);
				});
			},
		};

		return service;
	}]);