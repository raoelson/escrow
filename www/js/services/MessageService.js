app.factory('MessageService', function($rootScope, $http, authService) {
    var service = {
        sendMessage: function(message) {
            var urlMsg = $rootScope.baseUrl + '/messages.json';
            var data = {msg: message};
            $http.post(
                    urlMsg,
                    data
//                    {ignoreAuthModule: false, withCredentials: false, "content-type": "application/json"}
            )
            .success(function(data, status, headers, config) {
                $rootScope.$broadcast('event:send-message-success', data)
    })
                    .error(function(data, status, headers, config) {
                        console.log('aucun envoi');
                    });
        },
    };
    return service;
});


