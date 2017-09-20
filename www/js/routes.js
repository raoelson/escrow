angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('main', {
   cache: false,
   url: '/main',
   templateUrl: 'templates/main.html',
   controller: 'MainCtrl'
 })
  .state('connexion', {
   cache: false,
   url: '/login',
   templateUrl: 'templates/connexion.html',
   controller: 'LoginCtrl'
 })
  .state('signup', {
   cache: false,
   url: '/singup',
   templateUrl: 'templates/signup.html',
   controller: 'InscriptionCtrl'
 })
  .state('validation', {
   cache: false,
   url: '/validation-incription',
   templateUrl: 'templates/validation-incription.html',
   controller : 'ValidationController'
 })
  .state('escrow', {
   url: "/escrow",
   abstract: true,
   templateUrl: "templates/layout.html",
   resolve:{
     Auth:  function($rootScope, $state){
       return true;
       if(!$rootScope.logged){
         setTimeout(function(){
           $state.go('connexion');
         },1);
       }else{
         return true;
       }
     }
   },
   controller: 'AppCtrl'
 })
  .state('escrow.dashboard', {
   cache: false,
   url: "/dashboard",
   templateUrl: "templates/dashboard.html",
   controller : "DashboardCtrl"
 }).state('escrow.dossiers', {
  url: "/dossiers",
  cache: false,
  templateUrl: "templates/dossiers.html",
  controller : "DossierCtrl"
})
 .state('escrow.profil', {
   cache: false,
   url: "/profil",
   templateUrl: "templates/profil.html",
   controller : "ProfilController"
 })
 .state('escrow.docs', {
   cache: false,
   url: "/documents",
   templateUrl: "templates/documents.html",
   controller : "DocumentController"
 })
 .state('escrow.messages', {
   cache: false,
   url: "/messages",
   templateUrl: "templates/messages.html",
   controller: 'MessageCtrl'
 })
 .state('escrow.creermessage', {
  url: "/creer-message",
  cache: false,
  templateUrl: "templates/creerNouveauMessage.html",
  controller: 'MessageCtrl'
})
 .state('escrow.fildiscussion', {
   cache: false,
   url: "/fil-discussion/:id",
   templateUrl: "templates/fildediscussion.html",
   controller: 'FilCtrl'
 })
 .state('escrow.denied',{
   cache: false,
   url: '/denied',
   templateUrl: "templates/denied.html"
 })
 .state('escrow.transaction', {
   cache: false,
   url: "/transaction/:id",
   abstract: true,
   templateUrl: "templates/transaction.html",
   controller: 'TransactionCtrl'
 })
 .state('escrow.transaction.details', {
  cache: false,
  url: "/details",
  templateUrl: "templates/details.html",
  controller: 'DetailsCtrl'
})
 .state('escrow.transaction.etape1', {
   cache: false,
   url: "/etape-1",  
   templateUrl: "templates/transaction/etape1.html",
   controller : "etape1Controller"
 }).state('escrow.transaction.etape2', {
   cache: false,
   url: "/etape-2",  
   templateUrl: "templates/transaction/etape2.html",
   controller : "etape2Controller"
 }).state('escrow.transaction.etape3', {
   cache: false,
   url: "/etape-3",  
   templateUrl: "templates/transaction/etape3.html",
   controller : "etape3Controller"
 }).state('escrow.transaction.etape4', {
   cache: false,
   url: "/etape-4",  
   templateUrl: "templates/transaction/etape4.html",
   controller : "etape4Controller"
 }).state('escrow.transaction.etape5', {
   url: "/etape-5",  
   templateUrl: "templates/transaction/etape5.html",
 });

 $urlRouterProvider.otherwise("/");

});