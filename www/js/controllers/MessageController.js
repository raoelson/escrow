app.controller('MessageCtrl', function($http, $scope, $rootScope, MessageService, $state,$stateParams,$timeout) {
    $scope.$parent.title = "Message";
    $scope.messages = $rootScope.user.messages;
    $scope.msg = {};
    $scope.msg.nom = $rootScope.user.nom+""+$rootScope.user.prenom;
    $scope.msg.email = $rootScope.user.email;
    $scope.msg.telephone = $rootScope.user.telephone;
    $scope.msg.objet = $scope.typeselected;
    $scope.CurrentDate = new Date();
    $scope.msg.date_envoi = $scope.CurrentDate;
    $scope.msg.contenu = $rootScope.user.message;
    $scope.options = {
        rowSelection: false,
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
            value: function() {
                return $scope.desserts ? $scope.desserts.count : 0;
            }
        }];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.toggleLimitOptions = function() {
        $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };

    $scope.onPaginate = function(page, limit) {
        console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);

        $scope.promise = $timeout(function() {

        }, 2000);
    };

    $scope.deselect = function(item) {
        console.log(item.name, 'was deselected');
    };

    $scope.log = function(item) {
        console.log(item.name, 'was selected');
    };

    $scope.loadStuff = function() {
        $scope.promise = $timeout(function() {

        }, 2000);
    };

    $scope.onReorder = function(order) {

        console.log('Scope Order: ' + $scope.query.order);
        console.log('Order: ' + order);

        $scope.promise = $timeout(function() {

        }, 2000);
    };
    
    $scope.user = $rootScope.user;
    
    $scope.typeDemandes = [
      {key:'1', value:'Commentaire général'},
      {key:'2', value:'Question technique'},
      {key:'3', value:'Devis et facturations'},
      {key:'4', value:'Problemes sur le site'},
      {key:'5', value:'Autres'}
    ];
    
    $scope.typeselected = $scope.typeDemandes[0];
    
    $scope.addMessage = function(){
        MessageService.sendMessage($scope.msg);
    };

    $scope.$on('event:send-message-success', function(event,data){
        $rootScope.user.messages = data.messages;
        $scope.messages = $rootScope.user.messages;
        $rootScope.user.client_fil_discussions = data.client_fil_discussions;
        $state.go('escrow.messages',{reload:true});
    });
    $scope.afficherFilDiscussion = function(id){
        console.log("client_fil_discussions="+$rootScope.user.client_fil_discussions);
    }
});


