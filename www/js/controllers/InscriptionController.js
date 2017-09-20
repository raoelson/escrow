app.controller('InscriptionCtrl', function($scope, InscriptionService, $rootScope, $state, $mdDialog) {
    $scope.inscrir = function(user){
        $scope.error = null;
        $scope.onRegister = true;
        InscriptionService.Inscrir(user).success(function(data){
			$rootScope.urlValidation = data.urlValidation;
			$scope.onRegister = false;
			$state.go('validation');
		}).error(function(data,  status, headers, config) {
			$scope.error = data[0];
			$scope.onRegister = false;
		});
    };

    /*$scope.$on('event:inscription-success', function(e, data) {
        $rootScope.urlValidation = data.urlValidation;
        $scope.onRegister = false;
        $state.go('validation');
    });*/
    /*$scope.$on('event:inscription-failed', function(e, data) {
        $scope.error = data[0];
        $scope.onRegister = false;
		alert($scope.error.message);
    });*/
    
    $scope.showCGU = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/cgu.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
//        .then(function(answer) {
//            $scope.status = 'You said the information was "' + answer + '".';
//        }, function() {
//            $scope.status = 'You cancelled the dialog.';
//        });
    };
})
.controller('ValidationController', function($scope, $state, $rootScope){
    $scope.valider = function(){
		if(window.cordova){
			var ref = cordova.InAppBrowser.open($rootScope.urlValidation, "_self", "location=yes");
		}
        $state.go('connexion');
    };
});