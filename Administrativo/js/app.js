// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'starter.services','ngRoute','ngResource','ui.bootstrap','ngMaterial','ngMdIcons','ngMessages','datatables', 'ngCookies', 'ngMap','xeditable','LocalStorageModule','google.places', 'ngFileUpload','md.data.table','colorpicker.module','ui'])

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
        redirectTo: "/login"
     })

    .when("/login", {
         templateUrl: CONFIG.TEMPLATE_DIR+'login.html',
         controller: 'loginCtrl',
         data: {
         authorized: [ROLES.SINLOGIN.ROL, ROLES.PERSONA.ROL]
         }
     })
     .when("/pendientes", {
         templateUrl: CONFIG.TEMPLATE_DIR+'dashboard.html',
         controller: 'PedidosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
     .when("/encurso", {
         templateUrl: CONFIG.TEMPLATE_DIR+'encurso.html',
         controller: 'enCursoCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
     .when("/finalizados", {
         templateUrl: CONFIG.TEMPLATE_DIR+'finalizados.html',
         controller: 'FinalizadosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
     .when("/anulados", {
         templateUrl: CONFIG.TEMPLATE_DIR+'anulados.html',
         controller: 'AnuladosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
     .when("/detalle_pedido", {
         templateUrl: CONFIG.TEMPLATE_DIR+'detalle_pedido.html',
         controller: 'detallePedidoCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/historial", {
         templateUrl: CONFIG.TEMPLATE_DIR+'historial.html',
         controller: 'HistorialCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/asignar_motorizado", {
         templateUrl: CONFIG.TEMPLATE_DIR+'asignar_motorizado.html',
         controller: 'MotorizadoCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/motorizados", {
         templateUrl: CONFIG.TEMPLATE_DIR+'motorizado.html',
         controller: 'MotorizadosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/clientes", {
         templateUrl: CONFIG.TEMPLATE_DIR+'clientes.html',
         controller: 'ClientesCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/reportes", {
         templateUrl: CONFIG.TEMPLATE_DIR+'reportes.html',
         controller: 'ReportesCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/reportes_motorizado", {
         templateUrl: CONFIG.TEMPLATE_DIR+'reportesmoto.html',
         controller: 'ReportesMotoCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/liquidacion", {
         templateUrl: CONFIG.TEMPLATE_DIR+'liquidacion.html',
         controller: 'LiquidacionCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/liquidados", {
         templateUrl: CONFIG.TEMPLATE_DIR+'liquidados.html',
         controller: 'LiquidadosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/listado_liquidacion", {
         templateUrl: CONFIG.TEMPLATE_DIR+'listado_liquidaciones.html',
         controller: 'Listado_liquidacionCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/reporte_distribucion", {
         templateUrl: CONFIG.TEMPLATE_DIR+'reporte_distribucion.html',
         controller: 'Reporte_distribucionCtrl',
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
      .when("/variables", {
         templateUrl: CONFIG.TEMPLATE_DIR+'variables.html',
         controller: 'VariablesCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/distritos", {
         templateUrl: CONFIG.TEMPLATE_DIR+'distritos.html',
         controller: 'DistritosCtrl',
         data: {
         authorized: [ROLES.PERSONA.ROL]
         }
     })
      .when("/login_motorizado", {
         templateUrl: CONFIG.TEMPLATE_DIR+'login_motorizado.html',
         controller: 'LoginMotorizadoCtrl',
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

.run(initDT);

function initDT(DTDefaultOptions) {
    DTDefaultOptions.setLoadingTemplate('<img class="loader_spin" src="images/spina.svg">');
}
