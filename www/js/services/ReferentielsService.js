app.factory('SituationsService', ['$resource','$rootScope',
  function($resource, $rootScope) {
    return $resource($rootScope.baseUrl+'/situations.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
  ]).factory('BudgetsService', ['$resource','$rootScope',
  function($resource, $rootScope) {
    return $resource($rootScope.baseUrl+'/budgets.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
  ]).factory('CivilitesService', ['$resource','$rootScope',
  function($resource, $rootScope) {
    return $resource($rootScope.baseUrl+'/civilites.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
  ])
  .factory('CguService', function($rootScope,$resource){
    return $resource($rootScope.cguUrl+'/conditions.json', {});
  })
  .factory('TypeTransaction', function($rootScope,$resource){
    return $resource($rootScope.baseUrl+'/transaction/types.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }).factory('EtatTransaction', function($rootScope,$resource){
    return $resource($rootScope.baseUrl+'/etats/transaction.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  })
  .factory('TypeFormule', function($rootScope,$resource){
    return $resource($rootScope.baseUrl+'/typeformules.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }).factory('GrilleTarifaireService', function($rootScope,$resource){
    return $resource($rootScope.baseUrl+'/grille/tarifaire.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  });