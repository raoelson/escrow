app.controller('FilCtrl', function($http, $scope, $rootScope, MessageService, $state, $stateParams, $filter) {
    $scope.messages = $rootScope.user.messages;
    var found = $filter('filter')($rootScope.user.messages, {id: parseInt($stateParams.id)}, true);
    if (found.length) {
        $scope.fil = found[0];
    } else {
        $scope.fil = 'Not found';
    }

    $scope.msg = {};
    $scope.reponseFilDiscussionMessage = function() {
        $scope.msg.date_envoi = new Date();
        $scope.msg.idFil = $scope.fil.fil_discussion.id;
        $scope.msg.nom = $rootScope.user.nom+""+$rootScope.user.prenom;
        $scope.msg.email = $rootScope.user.email;
        $scope.msg.telephone = $rootScope.user.telephone;
        $scope.msg.objet = "Vous avez écrit : ";
        $scope.msg.typeDemande = $scope.fil.objet;
        console.log($scope.fil.fil_discussion.messages);
        //$scope.fil.fil_discussion.messages.push($scope.msg);
        MessageService.sendMessage($scope.msg);
    };
    
    $scope.$on('event:send-message-success',function(event,data){
        console.log(data);
        $scope.msg = {};
        $rootScope.user.messages = data.messages;
        $rootScope.user.client_fil_discussions = data.client_fil_discussions;
        $rootScope.showSimpleToast('Message envoyé.');
        $state.go('escrow.messages',{reload:true});
    });
});


