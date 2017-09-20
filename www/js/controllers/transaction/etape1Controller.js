app.controller("etape1Controller", function($scope, $rootScope, $log, $q, $http, $state, TransactionService, $filter, $cordovaFileOpener2, $cordovaFileTransfer){	

    $scope.$parent.back = back;
    $rootScope.transaction.clause_sequestre = 1;
    $scope.changeType = changeType;
    $scope.mustHave = false;

    $scope.verifIsAcheteur = function(){
        return ($rootScope.transaction.acheteur_id && (parseInt($rootScope.user.id) == parseInt($rootScope.transaction.acheteur_id.id)) ) ? true : false;
    };
    function changeType(obj){
        $scope.mustHave = true;
        $rootScope.transaction.acheteur = false;
        if(obj && (obj.code == 'AUTO' || obj.code == 'MOTO')){
            $scope.mustHave = false;
        }
    }
    if($rootScope.transaction.hasOwnProperty("type_transaction")){        
        $scope.changeType($rootScope.transaction.type_transaction);
    }
    function back() {
        $state.go("escrow.dashboard");
    }
    $rootScope.transaction.acheteur = $rootScope.transaction.adresse_email_acheteur ? false : true;

    if ($rootScope.transaction.date_remise_cle) {
        $rootScope.transaction.date_remise_cle = new Date($rootScope.transaction.date_remise_cle);
    }

    $scope.$parent.descriptionEtape = "Etape 1 : Description du bien";
    $scope.valider = valider;
    loadAll();

    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange = searchTextChange;    
    $scope.selectedItemOrigChange = selectedItemOrigChange;
    $scope.searchTextOrigChange = searchTextOrigChange;   
     $scope.selectedItemDestChange = selectedItemDestChange;
    $scope.searchTextDestChange = searchTextDestChange;
    if ($rootScope.transaction.code_postal_remise_cle) {
        $scope.selectedItem = [$rootScope.transaction.code_postal_remise_cle, $rootScope.transaction.ville_remise_cle];
    }
    if ($rootScope.transaction.code) {
        $scope.selectedItem = [$rootScope.transaction.code_postal_remise_cle, $rootScope.transaction.ville_remise_cle];
    }
    if ($rootScope.transaction.origin_code_postal_uship) {
        $scope.codePostalOrigine = [$rootScope.transaction.origin_code_postal_uship];

    }
    if ($rootScope.transaction.destination_code_postal_uship) {
        $scope.codePostalDest = [$rootScope.transaction.destination_code_postal_uship];

    }


    function valider() {
        console.log($rootScope.transaction);
        if ($rootScope.transaction.acheteur) {
            $rootScope.transaction.adresse_email_acheteur = null;
        }
        if ($rootScope.transaction.livraison) {
            $rootScope.transaction.adresse_remise_cle = null;
            $rootScope.transaction.ville_remise_cle = null;
            $rootScope.transaction.date_remise_cle = null;
            $rootScope.transaction.date_remise_cle = null;
            $rootScope.transaction.date_delai_retractation = null;
        } else {
            $rootScope.transaction.origin_code_postal_uship = null;
            $rootScope.transaction.destination_code_postal_uship = null;
            $rootScope.transaction.commodity_id_uship = null;
            $rootScope.transaction.poids_emc = null;
        }
        $rootScope.transaction.etat_transaction = {};
        $rootScope.transaction.etat_transaction.code = "CM";
        $rootScope.transaction.remise_cle_date_formated = $filter('date')($rootScope.transaction.date_remise_cle, 'yyyy-MM-dd HH:mm:ss');
        if ($rootScope.transaction.user == "ACHT") {       
            $scope.loading = true;          
            TransactionService.save($rootScope.transaction).success(function(data, status, headers, config) {
                $scope.loading = false;
              //  $rootScope.transaction.push($rootScope.transaction); 
              $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/vendeur.json?_format=json")
              .success(function(dataVnd){
                
                $rootScope.transactionVendeur = dataVnd;

            }).error(function(){
                console.log("Error vendeur etape 2");

            });
            $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/acheteur.json?_format=json")
              .success(function(dataAcht){
                
                $rootScope.transactionVendeur = dataAcht;

            }).error(function(){
                console.log("Error acheteur etape 2");

            });
            $rootScope.showSimpleToast('Transaction enregistrée.');
            $state.go('escrow.dashboard',{reload:true});  
        }).error(function(error){
            alert(JSON.stringify(error));
        });

    } else {
        if($scope.verifIsAcheteur() && $rootScope.transaction.bien.hasOwnProperty('id')){
            $state.go("escrow.transaction.etape4");
        }else{
            //$rootScope.transaction.adresse_email_vendeur = $rootScope.user.email;
            $state.go("escrow.transaction.etape2");
        }
    }
}
;

function querySearch(query) {
    var results = query ? $scope.states.filter(createFilterFor(query)) : $scope.states,
    deferred;
    if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function() {
            deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
    } else {
        return results;
    }
}

function searchTextChange(text) {
    $log.info('Text changed to ' + text);

}
function searchTextOrigChange(text) {
    $log.info('Text origine to ' + text);
}
function searchTextDestChange(text) {
    $log.info('Text destination to ' + text);
}

function selectedItemChange(item) {
    if (item) {
        $rootScope.transaction.code_postal_remise_cle = item[0];
        $rootScope.transaction.ville_remise_cle = item[1];
    }
    $log.info('Item changed to ' + JSON.stringify(item));
}

function selectedItemOrigChange(item) {
    if (item) {
        $rootScope.transaction.origin_code_postal_uship = item[0];
       // $rootScope.transaction.ville_remise_cle = item[1];
    }
    $log.info('Item Origine to ' + JSON.stringify(item));
}
function selectedItemDestChange(item) {
    if (item) {
        $rootScope.transaction.destination_code_postal_uship = item[0];
        // $rootScope.transaction.ville_remise_cle = item[1];
    }
    $log.info('Item Desitnation to ' + JSON.stringify(item));

}

$scope.startsWith = function(actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
}

function loadAll() {
    $http.get('data/villes.json').success(function(data) {
        $scope.states = data;
    });
}

    /**
     * Create filter function for a query string
     */
     function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state[0].indexOf(lowercaseQuery) === 0);
        };

    }
});