// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'starter.services','ngRoute','ngResource','ui.bootstrap','ngMaterial','ngMdIcons','ngMessages','datatables', 'ngCookies','xeditable','LocalStorageModule', 'ngFileUpload','md.data.table','colorpicker.module','ui','ngFileSaver'])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})

.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD/MM/YYYY');
  };

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'DD-MM-YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
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
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
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

.config(function($routeProvider,CONFIG,ROLES) {

  $routeProvider.when('/', {
        redirectTo: "/inventario"
     })

    .when("/login", {
         templateUrl: CONFIG.TEMPLATE_DIR+'login.html',
         controller: 'loginCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL, ROLES.PERSONA.ROL]
         }
     })
      .when("/dashboard", {
         templateUrl: CONFIG.TEMPLATE_DIR+'dashboard.html',
         controller: 'DashboardCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/inventario", {
         templateUrl: CONFIG.TEMPLATE_DIR+'inventario.html',
         controller: 'InventarioCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/productos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'productos.html',
         controller: 'ProductosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/productos_devueltos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'productos_devueltos.html',
         controller: 'Productos_devueltosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/informacion_devueltos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'informacion_devueltos.html',
         controller: 'Informacion_devueltosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/agregar_guia", {
         templateUrl: CONFIG.TEMPLATE_DIR+'addGuia.html',
         controller: 'addGuiaCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/listado_guia", {
         templateUrl: CONFIG.TEMPLATE_DIR+'listadoGuia.html',
         controller: 'listadoGuiaCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
})

.run(["$rootScope", "$location", "CONFIG", "ROLES", function($rootScope, $location, CONFIG, ROLES)
{
    $rootScope.$on('$routeChangeStart', function (event, next) 
    {
        if (next.data !== undefined) 
        {
            if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
            {
            }
            else if(CONFIG.ROL_CURRENT_USER == 0)
            {
                $location.path(ROLES.SINLOGIN.PATH);
            }
        }
    });
}])

.run(initDT);

function initDT(DTDefaultOptions) {
    DTDefaultOptions.setLoadingTemplate('<img class="loader_spin" src="images/spina.svg">');
}
