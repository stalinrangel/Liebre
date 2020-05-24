// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'starter.services','ngRoute','ngResource','ui.bootstrap','ngMaterial', 'ngMessages', 'ngCookies','LocalStorageModule','restangular','ngFileUpload','ui.bootstrap'/*,'ngMdIcons'*/
    ])

.run(function() {

})


.config(function($routeProvider,CONFIG,ROLES) {

    $routeProvider.when('/', {
        redirectTo: "/login"
    })

  .when("/login", {
         templateUrl: CONFIG.TEMPLATE_DIR+'login.html',
         controller: 'loginCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL,ROLES.PERSONA.ROL,ROLES.EMPRESA.ROL,ROLES.ECOMMERCE.ROL]
         }
     })
  .when("/password", {
         templateUrl: CONFIG.TEMPLATE_DIR+'password.html',
         controller: 'passwordCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL,ROLES.PERSONA.ROL,ROLES.EMPRESA.ROL,ROLES.ECOMMERCE.ROL]
         }
     })
  .when("/emailpassword/:id", {
         templateUrl: CONFIG.TEMPLATE_DIR+'emailpassword.html',
         controller: 'emailpasswordCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL,ROLES.PERSONA.ROL,ROLES.EMPRESA.ROL,ROLES.ECOMMERCE.ROL]
         }
     })
  .when("/persona", {
         templateUrl: CONFIG.TEMPLATE_DIR+'persona.html',
         controller: 'personaCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
  .when("/home", {
         templateUrl: CONFIG.TEMPLATE_DIR+'home.html',
         controller: 'homeCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
  .when("/tracking", {
         templateUrl: CONFIG.TEMPLATE_DIR+'tracking.html',
         controller: 'trackingCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/encamino", {
         templateUrl: CONFIG.TEMPLATE_DIR+'encamino.html',
         controller: 'encaminoCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/anulados", {
         templateUrl: CONFIG.TEMPLATE_DIR+'anulados.html',
         controller: 'anuladosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/devoluciones", {
         templateUrl: CONFIG.TEMPLATE_DIR+'devoluciones.html',
         controller: 'devolucionesCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/historial", {
         templateUrl: CONFIG.TEMPLATE_DIR+'historial.html',
         controller: 'historialCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/borrador", {
         templateUrl: CONFIG.TEMPLATE_DIR+'borrador.html',
         controller: 'borradorCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
        }
     })
  .when("/personaborrador", {
         templateUrl: CONFIG.TEMPLATE_DIR+'personaborrador.html',
         controller: 'personaborradorCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
  .when("/perfil", {
         templateUrl: CONFIG.TEMPLATE_DIR+'perfil.html',
         controller: 'perfilCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })

    .when("/geopos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'geolocalizacion.html',
         controller: 'geoposCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL,ROLES.PERSONA.ROL,ROLES.EMPRESA.ROL,ROLES.ECOMMERCE.ROL]
        }
    })
    .when("/verpos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'vergeolocalizacion.html',
         controller: 'verposCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL,ROLES.PERSONA.ROL,ROLES.EMPRESA.ROL,ROLES.ECOMMERCE.ROL]
        }
    })
})

.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD-MM-YYYY');
  };

    // Example of a Spanish localization.
  $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;

  $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Semana ' + weekNumber;
  };
  
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
})

.config(function($mdThemingProvider) {
  var customBlueMap =       $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
})

.run(["$rootScope", "$location", "CONFIG", "ROLES", function($rootScope, $location, CONFIG, ROLES)
{
    $rootScope.$on('$routeChangeStart', function (event, next) 
    {
        if (next.data !== undefined) 
        {
            if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
            {
                //console.log("entra");
            }
            else if(CONFIG.ROL_CURRENT_USER == 0)
            {
                    $location.path(ROLES.SINLOGIN.PATH);
                    console.log("cero");
            }
        }
    });
}])
.run();

/*function initDT(DTDefaultOptions) {
    DTDefaultOptions.setLoadingTemplate('<div class="content_spin"><span>Liebre Express tu socio estratégico </span><img class="loader_spin" src="images/spina.svg"></div>');
}*/
