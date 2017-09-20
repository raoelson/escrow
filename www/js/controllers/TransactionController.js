
app.controller("TransactionCtrl", function($scope, $rootScope, $log, $q, $stateParams) {
    $scope.$parent.title = "Transaction";

    if (!$stateParams.id) {
        $rootScope.transaction = {};
        $rootScope.transaction.livraison = {};
    }
    /*$scope.$on('event:step-not-finish',function(){
     $scope.enabledStep = false;
     });
     $scope.$on('event:step-finish',function(){
     $scope.enabledStep = true;
     });
     if($scope.userEtape){
     $rootScope.$brao
     }else{
     
     }*/
 });
