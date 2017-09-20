app.controller("etape3Controller", function($scope, $rootScope, $log, $q, $http, $state, CguService, TransactionService) {
    //window.localStorage.setItem('user', JSON.stringify($rootScope.user));
    if (!$rootScope.user) {
        $rootScope.user = JSON.parse(window.localStorage.getItem('user'));
    }
    $scope.$parent.back = back;
    $scope.valider = valider;
    $scope.$parent.descriptionEtape = "Etape 3 : ";
    function back() {
        $state.go("escrow.transaction.etape2");
    }
    $scope.infos = [
    {label: "Vous êtes", value: $rootScope.transaction.user == "VEND" ? "Vendeur" : "Acheteur"},
    {label: "Code postal d'origine", value: $rootScope.transaction.emc_origin_code_postal},
    {label: "Code postal de destination", value: $rootScope.transaction.emc_destination_code_postal},
    {label: "Type du bien", value: $rootScope.transaction.type_bien_emc},
    {label: "Poids estimé", value: $rootScope.transaction.emc_poids},
    {label: "Clause séquestre", value: $rootScope.transaction.sequestre},
    {label: "Description", value: $rootScope.transaction.bien.description},
    {label: "Date d'achat", value: formatDate($rootScope.transaction.bien.date_achat)},
    {label: "Date première mise en circulation", value: formatDate($rootScope.transaction.bien.date_premiere_mise_circulation)},
    {label: "Immatriculation", value: $rootScope.transaction.bien.immatriculation},
    {label: "Constructeur", value: $rootScope.transaction.bien.constructeur},
    {label: "Type", value: $rootScope.transaction.bien.type},
    {label: "Première main", value: $rootScope.transaction.bien.premiere_main == "1" ? "oui" : "non"},
    {label: "Dénomination commerciale", value: $rootScope.transaction.bien.denomination_commerciale},
    {label: "Vendeur", value: $rootScope.transaction.bien.vendeur == "1" ? "oui" : "non"},
    {label: "Prix ", value: $rootScope.transaction.bien.prix + " €"},
    {label: "Kilométrage", value: $rootScope.transaction.bien.km},
    ];

    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
            return date;
        }
        return date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
    }
    ;
    // $rootScope.transaction.conditions 
    //$rootScope.transaction.condition_generale = CguService.query()[0];
     //$scope.cgu = false;
     //$scope.cgv = false;
     if ($rootScope.transaction && $rootScope.transaction.conditions) {
        $scope.cgv = true;
        if ($rootScope.transaction.conditions == '1') {
            $scope.cgu = false;
        } else {
            $scope.cgu = true;
        }
        console.log("atou");
        console.log($scope.cgu);
        console.log($scope.cgv);
    }
    CguService.query(function(cond) {
        $rootScope.transaction.condition_generale = cond[0];
    }, function() {
        console.log("teste");
    });
    function valider(cgu) {
     $rootScope.transaction.conditions = "1";
     if (cgu) {
        $rootScope.transaction.conditions = "1,2";
    }
    $state.go("escrow.transaction.etape4");
}
$scope.setConditions = function(cgu) {
    console.log(cgu);
}

});