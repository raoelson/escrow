app.factory('CguService', function($rootScope,$resource){
	return $resource($rootScope.cguUrl+'conditions.json', {});
});