app.factory('TransactionService', ['$http','$rootScope', function($http,$rootScope){
	var service = {
			save : function(transaction){
				transaction.userId = $rootScope.user.id;			
				return $http.post($rootScope.baseUrl+'/transactions.json', transaction);
			},
		};
		return service;
	}
]);