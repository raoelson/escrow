var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

angular.module('app.directives', [])

.directive("compareTo", compareTo)
.directive('errorTemplate', function() {
    return {
        restrict: 'AEC', // A = attribut E:Element , C classe
        templateUrl: function(elem, attr, scope) {
            return './templates/directives/error-template.html';
        }
    };
})
.directive('loading', function() {
    return {
        restrict: 'E', // A = attribut E:Element , C classe
        scope: {
          text: "@",
          vars: "=",
      },
      templateUrl: './templates/directives/loading.html',
  };
})
.directive('inputTelephone', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/input-telephone.html',
        replace: false,
        require: ['^form', 'ngModel'],
        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            isType: '='
        },
        link: function(scope, element, attrs, ctrls) {
            scope.form = ctrls[0];
            var ngModel = ctrls[1];
            if (attrs.required !== undefined) {
                // If attribute required exists
                // ng-required takes a boolean
                scope.required = true;
            }
            scope.telephone = "+261338489090";
            scope.$watch('telephone', function() {
                ngModel.$setViewValue(scope.telephone);
            });
        }
    };
})
.directive('inputPassword', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/input-password.html',
        replace: false,
        require: ['^form', 'ngModel'],
        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            showVerifPassword: '=verifpassword'
        },
        link: function(scope, element, attrs, ctrls) {
            scope.form = ctrls[0];
            var ngModel = ctrls[1];

            if (attrs.required !== undefined) {
                // If attribute required exists
                // ng-required takes a boolean
                scope.required = true;
            }
            scope.password = "Superadmin77";
            scope.$watch('password', function() {
                ngModel.$setViewValue(scope.password);
            });
        }
    };
})
.directive('messageError', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/error-message.html',
        replace: false,
        // require: ['ngModel'],

        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            typechamp: '=',
            istype: '@'
        },
        link: function(scope, element, attrs) {
            scope.istype = attrs.istype;
        }
    };
})
.directive('customOnChange',function(){
    return {
        restrict: 'A',
        link: function(scope,element,attrs){
          var onChangeFunc = scope.$eval(attrs.customOnChange);
          element.bind('change', onChangeFunc);
         // element.bind('click',onChangeFunc);
     } 
 };
})
.directive('uploadfile', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {

        element.bind('click', function(e) {
            console.log(e);
            angular.element(e.target).siblings('#filePhotoPdp').trigger('click');
        });
    }
};
})
.directive('menu',function(){
    return {
        restrict: 'E',
        templateUrl : './templates/directives/menu.html'

    }
})
.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
          }
      });
      }
  }
})
.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})
.directive('inputEmail', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/input-email.html',
        replace: false,
        require: ['^form', 'ngModel'],
        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            showVerifEmail: '=verifemail'
        },
        link: function(scope, element, attrs, ctrls) {
            scope.form = ctrls[0];
            var ngModel = ctrls[1];

            if (attrs.required !== undefined) {
                // If attribute required exists
                // ng-required takes a boolean
                scope.required = true;
            }

            scope.$watch('email', function() {
                ngModel.$setViewValue(scope.email);
            });
        }
    };
})
.directive('messageErrorProfil', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/error-message-profil.html',
        replace: false,
        // require: ['ngModel'],

        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            typechamp: '=',
            istype: '@'
        },
        link: function(scope, element, attrs) {
            scope.istype = attrs.istype;
        }
    };
})
.filter('tel', function() {
    return function(tel) {

        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
            city = value;
            break;

            default:
            console.log(value);
            city = value.slice(0, 2);
            console.log("city" + city)
            number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                console.log("number" + number)
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
                console.log("eto");
            }
            else {
                console.log("atou");
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else {
            return "(" + city;
        }

    };
})
.directive('ccm', function() {
    return {
        restrict: 'EA',
        templateUrl: './templates/directives/ccm.html',
        replace: false,
        // require: ['ngModel'],

        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            urlImg: '@',
            titleEtape: '@'
        }

    };
})
.directive('toolbarCustom', function() {
    return {
        restrict: 'EA',
        templateUrl: './templates/directives/toolbar.html',
        replace: false,
        scope: {
            // use the =? to denote the property as optional
            name: '=?'
        },
        controller: function($scope){
        // check if it was defined.  If not - set a default
             $scope.name = angular.isDefined($scope.name) ? 'style="position:absolute;width: 100%;z-index:999"' : '';
            // console.log("makao");
            // console.log($scope.name);
        }
        // style="position:absolute;width: 100%;z-index:999"
    };
})
.directive('recapTransaction', function() {
    return {
        restrict: 'E',
        templateUrl: './templates/directives/recap-transaction-etape4.html',
        replace: false,
        // require: ['ngModel'],

        // See Isolating the Scope of a Directive http://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive
        scope: {
            infos: '=',
        },
        // link: function(scope, element, attrs) {
        //     scope.istype = attrs.istype;
        // }
    };
})
.filter('adresse', function () {
  return function (input) {
      return input.replace(/@@/g, ' ');
  };
})
.filter('singleDecimal', function ($filter) {
    return function (input) {
        
        return parseFloat(input);
    };
});
;

