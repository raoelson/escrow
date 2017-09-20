angular.module('app.controllers', ['controller.intro'])

.controller('connexionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	//$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
	$scope.user = {
		telephone : '',
		password : ''    
	};  

	$scope.signIn = function(form) {
		if(form.$valid) {
			console.log("valide");
		}
	};  

}])

.controller('signupCtrl', ['$scope', '$stateParams',
  function ($scope, $stateParams) {


  }])
.controller('AppCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 'AuthenticationService', 'Auth', '$timeout', '$mdSidenav', '$log', '$mdMedia','$mdToast',
  function ($scope, $stateParams, $rootScope, $state, AuthenticationService, Auth, $timeout, $mdSidenav, $log, $mdMedia,$mdToast) {
   $scope.title = "Mysafedeal";
   $scope.toggleLeft = buildDelayedToggler('left');
   $rootScope.logged = true;
   $scope.logout = function(user){
    AuthenticationService.logout(user);
  }
  
  $scope.color = "deep-purple";
  
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
      args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 5);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    }, 100);
  }

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    }
  }

  // Les toast des bases

  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
    .filter(function(pos) { return $scope.toastPosition[pos]; })
    .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $rootScope.showSimpleToast = function(text) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position(pinTo )
      .hideDelay(3000)
      );
  };

  $scope.showActionToast = function() {
    var pinTo = $scope.getToastPosition();
    var toast = $mdToast.simple()
    .textContent('Marked as read')
    .action('UNDO')
    .highlightAction(true)
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position(pinTo);

      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          alert('You clicked the \'UNDO\' action.');
        }
      });
    };
  }])
.controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
    .then(function () {
      $log.debug("close LEFT is done");
    });

  };
  // $imgUser = $rootScope.user;
  $scope.menus = [
  {
    link : 'escrow.dashboard',
    title: 'Mon tableau de bord',
    icon: 'ion-ios-speedometer'
  },
  /*{
    link : 'escrow.transaction.etape1',
    title: 'Nouveau dossier',
    icon: 'ion-document'
  },*/
  {
    link : 'escrow.dossiers',
    title: 'Mes dossiers',
    icon: 'ion-ios-folder'
  },
  {
    link : 'escrow.profil',
    title: 'Mon profil',
    icon: 'ion-person'
  },
  {
    link : 'escrow.docs',
    title: 'Mes documents',
    icon: 'ion-briefcase'
  },
  {
    link : 'escrow.messages',
    title: 'Mes messages',
    icon: 'ion-social-twitch-outline'
  }
  ];
}).controller('ReferentielsController', function ($http,$scope, $rootScope,SituationsService, BudgetsService, CivilitesService, CguService, TypeTransaction, EtatTransaction,GrilleTarifaireService) {
  $scope.$on('event:auth-loginConfirmed', function() {
    $scope.groupes = SituationsService.query();
    $scope.budgets = BudgetsService.query();
    $scope.civilites = CivilitesService.query();
    $scope.transactionTypes = TypeTransaction.query();
    $scope.etatsTransaction = EtatTransaction.query();
    $scope.grilleTarifaire = GrilleTarifaireService.query();

     $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/acheteur.json")
          .success(function(data){
            $rootScope.transactionAcheteur = data;
          }).error(function(){
            $rootScope.transactionAcheteur = [];
    });   
     $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/vendeur.json")
          .success(function(data){
             $rootScope.transactionVendeur = data;
          }).error(function(){
            $rootScope.transactionVendeur = [];

    });
    $http.get($rootScope.baseUrl+"/transactions/"+$rootScope.user.username+"/encours.json")
          .success(function(data){
             $rootScope.transactionEncours = data;
          }).error(function(){
            $rootScope.transactionEncours = [];

    });
  });
})
.controller('BarMenuDroitController',function($mdDialog,$rootScope){
  var originatorEv;

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  this.deconnect = function(){
   $rootScope.user = null;
   $rootScope.$broadcast('event:auth-logout-complete');
 };
})
.controller('TitleController', function($scope,$rootScope,$state){
  $scope.descriptionEtape = '';
  $scope.stateBack = 'escrow.dossiers';
  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 
      $scope.showBarTitle = false;
    // do something
    switch(toState.name){
      case "escrow.transaction.etape1":
          $scope.descriptionEtape = "Etape 1 : Description du bien";
          $scope.showBarTitle = true;
          $scope.stateBack = 'escrow.dossiers';
      break;
      case "escrow.transaction.etape2":
          $scope.descriptionEtape = "Etape 2 : Informations relatives au bien vendu";
          $scope.showBarTitle = true;
          $scope.stateBack = 'escrow.transaction.etape1';
      break;      
      case "escrow.transaction.etape3":
          $scope.descriptionEtape =  "Etape 3 : ";
          $scope.showBarTitle = true;
          $scope.stateBack = 'escrow.transaction.etape2';
      break; 
      case "escrow.transaction.etape4":
          $scope.descriptionEtape =  "Etape 4 : ";
          $scope.showBarTitle = true;
          $scope.stateBack = 'escrow.transaction.etape3';
      break;
      default :
        $scope.showBarTitle = false;
    }
    if(fromState.name == "escrow.transaction.etape1" && toState.name == "escrow.dossiers"){
       $scope.showBarTitle = false;
    }

    $scope.back = function(){
      $state.go($scope.stateBack);
    }
  });
});

function DialogController($scope, $mdDialog,CguService) {
 $scope.cgu = CguService.query();
 $scope.hide = function() {
  $mdDialog.hide();
};

$scope.cancel = function() {
  $mdDialog.cancel();
};

$scope.answer = function(answer) {
  $mdDialog.hide(answer);
};
}

