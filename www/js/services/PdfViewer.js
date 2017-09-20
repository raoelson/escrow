(function() {
    'use strict';
	
	angular.module("app").factory("PdfViewer", Service);

	function Service($cordovaFileTransfer, $cordovaFileOpener2){
		var factory = {
			display : display
		}
		
		function display(url){
			if (window.cordova) {
				downloadFile(url).then(function(result) {
					 $cordovaFileOpener2.open(
						result.nativeURL,
						'application/pdf'
					).then(function() {
					  
					}, function(err) {
						if(err.status == "9"){
							alert("Veuillez installer une application permettant de lire un pdf");
						}else{
							alert(JSON.stringify(err));
						}
					});
				  }, function(err) {
					  alert("error");
					alert(JSON.stringify(err));
				  }, function (progress) {
					$timeout(function () {
					  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
					});
				});
			}else{
				alert("cette fonction n'est disponible que sur un device");
			}
		}
		
		function downloadFile(url){
			var targetPath = cordova.file.externalRootDirectory + "transaction_signer_vnd_87.pdf";
			var trustHosts = true;
			var options = {};	
			return $cordovaFileTransfer.download(url, targetPath, options, trustHosts);
		}
		
		return factory;
	}
})();