app.controller("DashboardCtrl", function($http,$q,$scope, $rootScope, UtilisateursService, Auth,	$timeout, $log, $state){
	$scope.$parent.title = "Dashboard";
	  $scope.options = {
			rowSelection: true,
			multiSelect: false,
			autoSelect: true,
			decapitate: false,
			largeEditDialog: false,
			boundaryLinks: false,
			limitSelect: false,
			pageSelect: true
		  };

  $scope.selected = [];
  $scope.selectedAcht = [];
  $scope.editTransaction = editTransaction;
  
  $scope.selectedTerminer = [];
  $scope.limitOptions = [5, 10, 15, {
    label: 'All',
    value: function () {
      return $scope.desserts ? $scope.desserts.count : 0;
    }
  }];

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  
  $scope.filterEnCours = function (item) { 
	return item.etat_transaction.code === 'CM'; 
   };
   
   $scope.filterTransactionTerminer = function (item) { 
	return item.etat_transaction.code === 'FN'; 
   };
   
  function editTransaction(transaction){
	  $rootScope.transaction = transaction;
	  $state.go("escrow.transaction.etape1", {id : transaction.id});
  }
  
  //$scope.transactions = {count: $rootScope.user.transactions.length, data: $rootScope.user.transactions};

 
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.onPaginate = function(page, limit) {
    console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
    console.log('Page: ' + page + ' Limit: ' + limit);

    $scope.promise = $timeout(function () {

    }, 2000);
  };

  $scope.deselect = function (item) {
    console.log(item.name, 'was deselected');
  };

  $scope.log = function (item) {
    if(item.hasOwnProperty('acheteur_id') && Object.keys(item.acheteur_id).length >  0){
      $scope.isRattacher = true;
    }else{
      $scope.isRattacher = false;
    }

  };
  $scope.loading = false;
  $scope.rattachementTransaction = function(transaction){
      $scope.loading = true;
       // console.log("rat ", transaction);
    var data = { idTransaction : transaction.id, adresse_email : $rootScope.user.email}
    $http.post($rootScope.baseUrl+"/rattachers/transactions.json", data)
      .success(function (data, status, headers, config) {
        $scope.loading = false;
      })
      .error(function (data, status, headers, config) {
           console.log('error' + JSON.stringify(data));
           $scope.loading = false;
      });
  };

  $scope.loadTransactionVnd = function () {
   var deferred = $q.defer();
      $scope.promiseVnd = deferred.promise;
     $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/vendeur.json?_format=json")
          .success(function(data){
            console.log(data);
            $rootScope.transactionVendeur = data;
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("Failed to get transactions");

    });
  
  };

  $scope.loadTransactionAcht = function(){
    var deferred = $q.defer();
      $scope.promiseAcht = deferred.promise;
     $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/acheteur.json?_format=json")
          .success(function(data){
            console.log(data);
            $rootScope.transactionAcheteur = data;
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("Failed to get transactions");

    });
  }
  $scope.onReorder = function(order) {

    console.log('Scope Order: ' + $scope.query.order);
    console.log('Order: ' + order);

    $scope.promise = $timeout(function () {

    }, 2000);
  };

});