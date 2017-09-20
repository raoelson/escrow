function ExpertVeoController($rootScope, TypeFormule, $q) {
	ctrl = this;
	ctrl.user = $rootScope.user;
        ctrl.transaction.experveo_date_heure_rdv = new Date(ctrl.transaction.experveo_date_heure_rdv);
        TypeFormule.query(function(data){
					ctrl.typeFormules = data;
					resolve();
				});
        
	ctrl.setTarif = function(formule){
		if(ctrl.transaction.experveo_lieu_rdv == "agc"){
			ctrl.transaction.experveo_tarif = formule.tarif_en_agence;
		}else{
			ctrl.transaction.experveo_tarif = formule.tarif_endroit_choisi;
		}
		if(ctrl.transaction.experveo_etude_marche){
			ctrl.transaction.experveo_tarif = ctrl.transaction.experveo_tarif + formule.tarif_etude;
		}
	}
}

angular.module('app').component('expertVeo', {
  templateUrl: 'js/components/expert_veo.html',
  controller: ExpertVeoController,
  bindings: {
    transaction: '=',
    expv : '='

  }
});