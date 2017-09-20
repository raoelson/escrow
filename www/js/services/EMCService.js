app.factory('EMCService', ['$http','$rootScope', function($http,$rootScope){
	var service = {
			send : function(data){		
				return $http.post($rootScope.baseUrl+'/quotations.json', data);
			},
			passerCommand : function(data){
				return $http.post($rootScope.baseUrl+'/orders.json', data);	
			}
		};
		return service;
	}
]);