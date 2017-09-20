app.controller("etape4Controller", function($scope, $rootScope, $state, TransactionService,$filter,$http) {
    $scope.$parent.descriptionEtape = "Etape 4";
    $scope.$parent.back = back;
    $scope.expv = false; 
    if($rootScope.transaction.hasOwnProperty("id") && $rootScope.transaction.hasOwnProperty('experveo_type_formule')){
        $scope.expv = true;
    }
    
    function back() {
        $state.go("escrow.transaction.etape3");
    }
    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
            return date;
        }
        return date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
    };

    if(!$rootScope.transaction.hasOwnProperty('acheteur_temporaires')){
        $rootScope.transaction.acheteur_temporaires = [];
    }

    $scope.addAcheteur = addAcheteur;
    $scope.removeAcheteur = removeAcheteur;
    $scope.calculPaiement = calculPaiement;

    function addAcheteur(event){
      event.preventDefault();
      var newItemNo = $rootScope.transaction.acheteur_temporaires.length+1;
      $rootScope.transaction.acheteur_temporaires.push({'id':newItemNo});
  }  
  function removeAcheteur(index) {  
    $rootScope.transaction.acheteur_temporaires.splice(index);
};


function calculPaiement(price) {
 var grilleTrouve = false;
 angular.forEach($scope.grilleTarifaire, function(value, key){
        //    (gr.minPrix <= :prix AND gr.maxPrix >= :prix) OR (gr.maxPrix = 0 AND gr.minPrix <= :prix)
        if(grilleTrouve) return;
        if(
            (parseInt(value.min_prix) <= price 
                && parseInt(value.max_prix) >= price) 
            ||
            (parseInt(value.max_prix) == 0 && parseInt(value.min_prix) <= price))
        {

            var varPlus = (price * parseFloat(value.variable_plus)) / 100;
            console.log(value.variable_plus);
            console.log(value.min_fixe);
            $scope.prixSequestre =  varPlus + parseFloat(value.min_fixe);
            $scope.montantHt = price + $scope.prixSequestre;
            console.log(parseFloat(value.variable_plus));
            console.log(varPlus);
                // a voir si livraison
                // $transaction->setFraisLivraison($transaction->getTransporteurEmc()->getPrix());

                $scope.tva = (((price + parseFloat(value.min_fixe) + varPlus) * 20) / 100);
                console.log($scope.tva);
                $scope.montantTTC = $scope.montantHt + $scope.tva ;
                grilleTrouve = true;
            }
            
        });
}
  //  console.log($rootScope.transaction);
    /*$scope.infos = [
     {label : "Vous êtes", value : "Vendeur"},
     {label : "Code postal d'origine", value : "78100"},
     {label : "Code postal de destination", value : "78000"},
     {label : "Code postal de destination", value : "Voitures et camionnettes"},
     {label : "Type du bien", value : "Voitures et camionnettes"},
     {label : "Poids estimé", value : "47 kg"},
     {label : "Clause séquestre", value : "Le séquestre est payé par le vendeur"},
     {label : "Description", value : "Megan Z an.2013"},
     {label : "Date d'achat", value : "01-01-2013"},
     {label : "Date première mise en circulation", value : "01-01-2013"},
     {label : "Immatriculation", value : "7780-B8E"},
     {label : "Constructeur", value : "Renault"},
     {label : "Type", value : "Z"},
     {label : "Première main", value : "Oui"},
     {label : "Dénomination commerciale", value : "MZ"},
     {label : "Vendeur", value : "Particulier"},
     {label : "Prix ", value : "7740 €"},
     {label : "Kilométrage", value : "7889 km"},
     ];*/
     if($rootScope.transaction.type_transaction.code == 'AUTO' ||
        $rootScope.transaction.type_transaction.code == 'MOTO')
     {
        calculPaiement($rootScope.transaction.bien.prix);
        $scope.quiSuisJe = "Vendeur";
       if($rootScope.transaction.acheteur_id){
         if(parseInt($rootScope.user.id) == parseInt($rootScope.transaction.acheteur_id.id)){
           console.log("makato");
           $scope.quiSuisJe = "Acheteur";
            // $rootScope.transaction.user == "VEND" ? "Vendeur" : "Acheteur"
         }
       }
        $scope.infos = [
        {label: "Vous êtes", value: ($rootScope.transaction.acheteur_id && parseInt($rootScope.user.id) == parseInt($rootScope.transaction.acheteur_id.id)) ? "Acheteur" : "Vendeur" },
        {label: "Code postal d'origine", value: $rootScope.transaction.emc_origin_code_postal},
        {label: "Code postal de destination", value: $rootScope.transaction.emc_destination_code_postal},
        {label: "Type du bien", value: $rootScope.transaction.type_bien_emc},
        {label: "Poids estimé", value: $rootScope.transaction.emc_poids},
        {label: "Clause séquestre", value: $rootScope.transaction.sequestre},
        {label: "Description", value: $rootScope.transaction.bien.description},
        {label: "Date d'achat", value: $filter('date')($rootScope.transaction.bien.date_achat, 'dd/MM/yyyy') }, //formatDate($rootScope.transaction.bien.date_achat)
        {label: "Date première mise en circulation", value: $filter('date')($rootScope.transaction.bien.date_premiere_mise_circulation, 'dd/MM/yyyy')}, //formatDate($rootScope.transaction.bien.date_premiere_mise_circulation)
        {label: "Immatriculation", value: $rootScope.transaction.bien.immatriculation},
        {label: "Constructeur", value: $rootScope.transaction.bien.constructeur},
        {label: "Type", value: $rootScope.transaction.bien.type},
        {label: "Première main", value: $rootScope.transaction.bien.premiere_main == "1" ? "oui" : "non"},
        {label: "Dénomination commerciale", value: $rootScope.transaction.bien.denomination_commerciale},
        {label: "Vendeur", value: $rootScope.transaction.bien.vendeur == "1" ? "oui" : "non"},
        {label: "Kilométrage", value: $rootScope.transaction.bien.km},
        {label: "Adresse de remise des clés", value: $rootScope.transaction.adresse_remise_cle},
        {label: "Code postal de remise des clés", value: $rootScope.transaction.code_postal_remise_cle},
        {label: "Date de remise des clés", value: $filter('date')($rootScope.transaction.date_remise_cle, 'dd/MM/yyyy') },
        {label: "Prix ", value: $rootScope.transaction.bien.prix + " €"},
        ];
    }else{
       // getGrille($rootScope.transaction.prix);
       // if($rootScope.transaction.prix)
       calculPaiement($rootScope.transaction.prix);
   }



   $scope.valider = function(){
    console.log($rootScope.transaction);
    $scope.loading = true;
    TransactionService.save($rootScope.transaction).success(function(data, status, headers, config) {
     //    if($rootScope.transaction.hasOwnProperty("id")){
     //        var trans =  $filter('filter')($rootScope.user.transactions, {id: $rootScope.transaction.id}, true)[0];
     //        var index = $rootScope.user.transactions.indexOf(trans);
     //        $rootScope.user.transactions.splice(index,1);
     //        $rootScope.user.transactions.push(data); 
     //    }else{
     //        if(data.hasOwnProperty("bien")){
     //         data.bien.documents = $rootScope.transaction.bien.documents;
     //     }
     //     $rootScope.user.transactions.push(data); 
     // }
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

     $scope.loading = false; 
     $rootScope.showSimpleToast('Transaction enregistrée.');
     $state.go('escrow.dashboard',{reload:true});  
 }).error(function(error){
    alert(JSON.stringify(error));
});
};

});
