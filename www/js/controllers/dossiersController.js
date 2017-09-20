app.controller('DossierCtrl', function ($http, $mdEditDialog, $q, $timeout, $scope, $rootScope, PdfViewer,$mdDialog,InvitationService,$state) {
  $scope.$parent.title = "Dossiers";
  
  // $rootScope.transactionEncours

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
  $scope.selectedTerminer = [];
  $scope.limitOptions = [5, 10, 15, {
    label: 'All',
    value: function () {
      return $scope.transactions ? $scope.transactions.count : 0;
    }
  }];

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  $scope.queryTerminer = {
    order: 'name',
    limit: 5,
    page: 1
  };
  
  $scope.filterEnCours = function (item) { 
   return (item.etat_transaction && item.etat_transaction.code === 'CM'); 
 };

 $scope.filterTransactionTerminer = function (item) { 
   return (item.etat_transaction && item.etat_transaction.code === 'FN'); 
 };

 $scope.preview = preview;

 $scope.inviteAcheteur = inviteAcheteur;

 $scope.detail = detail;

 
 //$scope.transactions = {count: $rootScope.transactionEncours.length, data: $rootScope.transactionEncours};


 
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
  console.log(item.id, 'was deselected');
};

$scope.log = function (item) {
  console.log(item.id, 'was selected');
};

$scope.loadStuff = function () {
  $scope.promise = $timeout(function () {

  }, 2000);
};

$scope.onReorder = function(order) {

  console.log('Scope Order: ' + $scope.query.order);
  console.log('Order: ' + order);

  $scope.promise = $timeout(function () {

  }, 2000);
};

function detail(trans){
  $rootScope.transaction = trans;
  $state.go("escrow.transaction.details", {id : trans.id});
}

function preview(){
  PdfViewer.display(ASSETS_URL+"/uploads/transaction/"
   +($rootScope.user.nom.trim()+$rootScope.user.prenom.trim()+$scope.selected[0].id).toUpperCase()
   +$scope.selected[0].id+"/transaction_signer_vnd_"+$scope.selected[0].id+".pdf");
}
function inviteAcheteur(){
  console.log("mande");
}

function openModal(){
  console.log($scope.selected);
}

$scope.status = ' BOL TSY MIS';
$scope.customFullscreen = false;
$scope.invitePrompt = function(ev) {

  $mdDialog.show({
    locals:{ transaction : $scope.selected , InvitationService : InvitationService},
    controller: InvitationController,
    templateUrl: 'templates/invitation.tmpl.html',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:false,
    fullscreen: $scope.customFullscreen
  })
  .then(function(answer) {
    console.log(answer);
    $scope.status = 'You said the information was "' + answer + '".';
  }, function() {
    $scope.status = 'You cancelled the dialog.';
  });
};
function InvitationController($scope, $mdDialog,transaction,$filter,InvitationService) {
    $scope.loading = false;
    $scope.transaction = transaction[0]; // récuprération transaction selectionner
    $scope.sendMail = sendMail;
    console.log($scope.transaction);
    $scope.libelle = "";
    $scope.afficher = true;
// adresse_email_acheteur
if($scope.transaction.hasOwnProperty("adresse_email_acheteur")){
  $scope.libelle = "Vous avez déjà envoyé une invitation à un acheteur.";
  $scope.afficher = false;
}
if($scope.transaction.hasOwnProperty("adresse_email_vendeur")){
  $scope.libelle = "Vous avez déjà envoyé une invitation à un vendeur.";
  $scope.afficher = false;
}

if($scope.transaction.hasOwnProperty('invitations') && $scope.transaction.invitations.length > 0){
  $scope.dateEnvoie = $filter('date')($scope.transaction.invitations[0].date_envoi, "dd/MM/yyyy"); 
  $scope.invite = $scope.transaction.invitations[0].invite_temporaire.email;
}

function sendMail(email){
  $scope.loading = true;
  var invitation = { 'adresse_email' : email, "idTransaction" : $scope.transaction.id };
  InvitationService.send(invitation).success(function(data, status, headers, config){
      $scope.transaction = data;
      $scope.loading = false;
      $rootScope.showSimpleToast('L\'invitation envoiée');  
  }).error(function(data, status, headers, config){
      if(data == "invite"){
        $rootScope.showSimpleToast('Invitation déjà envoyée à '+ email);  
        return false;
      }
      $rootScope.showSimpleToast('L\'invitation à échouer');  
      $scope.loading = false;
  });
   
 }

 $scope.hide = function() {
  $mdDialog.hide();
};

$scope.cancel = function() {
  $mdDialog.cancel();
};

$scope.answer = function(answer) {
  $mdDialog.hide(answer);
};

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
    return date;
  }
  return date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
}
}

});




















