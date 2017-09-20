app.controller('DetailsCtrl', function ($http, $q, $timeout, $scope, $rootScope,$stateParams,$state) {
  $scope.retour = retour;
  	function retour(){
  		$rootScope.transaction = {};
  		$state.go('escrow.dossiers');
  	}
  	$scope.ssv = 0;
  	$scope.tvassv = 0;
  	$scope.afficherssv = false;
  	if($rootScope.transaction.service_additionnels.length > 0){
  		$scope.afficherssv = true;
  		 angular.forEach($rootScope.transaction.service_additionnels, function(value, key){
               if(value.id_user == $rootScope.user.id){
               		$scope.ssv += value.prix_service;
               }
          }); 
  		 $scope.tvassv = ($scope.ssv * 20) / 100;
  	}
});