app.factory('InvitationService', ['$http','$rootScope', function($http,$rootScope){
	var service = {
			send : function(invitation){		
				return $http.post($rootScope.baseUrl+'/invitations.json', invitation);
			},
		};
		return service;
	}
]);