angular.module('starter.controllers', [])

.directive('myDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
                //console.log('value changed, new value is: ' + v);
                console.log('value change: ');
            });
        }
    };
})

.constant('PUSH', {
       SINLOGIN: 'sss'
})

.controller('sidevar', function ($scope, $log,$mdSidenav,$interval,userService,$http,$filter) {


 /* $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      console.log('entro');
      $mdSidenav(componentId).toggle();
    };
  }

  moment.updateLocale('en', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    weekdays : [
      "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ]
  })

  $scope.day = moment().format("DD"); 
  $scope.year = moment().format("YYYY");
  $scope.month = moment().format("MMMM");
  $scope.day_text = moment().format("dddd");
  
  var tick = function() {
    $scope.clock = Date.now();
  }
  
  //tick();
  //$interval(tick, 1000);

  /*var req = {
    method: 'GET',
    url: '../api/public/api/admin',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.pedidos = [];
  $scope.count_pendientes = 0;
  $scope.count_encurso = 0;
  $scope.count_finalizados = 0;
  $scope.count_anulados = 0;

  var today = $filter('date')(new Date(),'yyyy-MM-dd');
  var fecha = '';
  var compare = '';

  $http(req).then(function(response){
    if (response.data != '') {
      $scope.pedidos = response.data.pedidos;
      for (var i = 0; i < $scope.pedidos.length; i++) {
        fecha = $filter('date')(new Date($scope.pedidos[i].created_at),'yyyy-MM-dd');
        compare = moment(fecha).isSame(today);
        if ($scope.pedidos[i].estado == 0 && compare) {
          $scope.count_pendientes += 1;
        }
        if (($scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2) && compare) {
          $scope.count_encurso += 1;
        }
        if ($scope.pedidos[i].estado == 3 && compare) {
          $scope.count_finalizados += 1;
        }
        if ($scope.pedidos[i].estado == 4 && compare) {
          $scope.count_anulados += 1;
        }
      }
    }
  }, function(){

  })*/

  /*$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
      isopen: false
  };

  $scope.toggled = function (open) {
      $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));*/
})

.controller('indexCtrl', function($scope,PUSH,$http,userService){
  $scope.banderaPush=PUSH.SINLOGIN;
  $scope.distancias = [];
  $scope.pedidos = [];

  $scope.change=function(variables){
    //alert('$scope.banderaPush '+ variables);
    //console.log($scope.banderaPush);
    $scope.banderaPush=variables;
    console.log($scope.banderaPush);
    /*navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(position);
      alert(pos.lat);
    }, function() {
      alert('error');
    });*/
    /*var re = {
        method: 'GET',
        url: '../api/public/api/motorizado',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(re).then(function(response){
        console.log(response.data);
        $scope.motori=response.data.motoriz;
      }, function(){
        alert('ha ocurrido un error en obtener los motorizados');
      });

    var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          //'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        var motos = response.data;
        var j=0;
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].estado == 0) {
            $scope.distancias.push(motos[i]);
          }
          j=j+1;  
        }
        if(motos.length==j){
          setTimeout(function() {
            $scope.calcDistancia();
          }, 500);
          
        }
      }, function(){
        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
      });

      var req = {
        method: 'GET',
        url: '../api/public/api/get_pedidos/'+ $scope.banderaPush,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }*/
  }

  $scope.$watch(function() { return $scope.banderaPush; },
              function() {
                console.log($scope.banderaPush);
              }
             );


  var OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
      appId: "6b319f69-bd12-4450-9cd7-36fcd6399adb",
      autoRegister: true, /* Set to true to automatically prompt visitors */
      subdomainName: 'https://liebreexpress.os.tc',
      /*
      subdomainName: Use the value you entered in step 1.4: http://imgur.com/a/f6hqN
      */
      httpPermissionRequest: {
        enable: true,
        modalTitle: 'Liebre Courier Express',
        modalMessage: '¡Gracias por suscribirse a las notificaciones!',
        modalButtonText:'OK'
      },
      notifyButton: {
          enable: false /* Set to false to hide */
      }
    }]);

    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        console.log("OneSignal User ID:", userId);
        //PUSH.SINLOGIN='4444';

        document.getElementById("peso_campo_1").value = "userId";
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
      });
                   
      OneSignal.getUserId().then(function(userId) {
        console.log("OneSignal User ID:", userId);
        if(userId == null){
          OneSignal.registerForPushNotifications({
            modalPrompt: true
          });
        }
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
      });

      OneSignal.on('notificationDisplay', function (event) {
      //alert('OneSignal notification displayed:');
      // console.log(event);
      // console.log(event.data.foo);
      // var id=event.data.foo;
      //$scope.banderaPush = "mensaje";
      //angular.element(document.getElementById('indexController')).scope().change(id);
      //llamar();
        /*
        {
            "id": "ce31de29-e1b0-4961-99ee-080644677cd7",
            "heading": "OneSignal Test Message",
            "content": "This is an example notification.",
            "url": "https://onesignal.com?_osp=do_not_open",
            "icon": "https://onesignal.com/images/notification_logo.png"
        }
        */
      });
    });
})

.controller('loginCtrl', ['$scope','$location', "CONFIG", '$http', '$sce','$timeout','userService','$mdDialog','$remember' , function ($scope, $location, CONFIG , $http, $sce,$timeout,userService,$mdDialog,$remember) { 

  var defaultHTTPHeaders = {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  };

  $scope.user =
  {
    username:'',
    password:''
  };

  $scope.remember = false;
  if ($remember('username_admin') && $remember('password_admin') ) {
      $scope.remember = true;
      $scope.user.username = $remember('username_admin');
      $scope.user.password = $remember('password_admin');
  }
  $scope.rememberMe = function() {
      if ($scope.remember) {
          $remember('username_admin', $scope.user.username);
          $remember('password_admin', $scope.user.password);
      } else {
          $remember('username_admin', '');
          $remember('password_admin', '');
      }
  };

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour',
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 100);

  $scope.login=function(){
    userService.login(
      $scope.user.username, $scope.user.password,
      function(response){
        if (response.data.user.tipo_usuario == 0) {
          CONFIG.ROL_CURRENT_USER = 1;
          $location.path("/pendientes");
        } else {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('¡Usuario no permitido!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }
      },
      function(response){
        console.log(response);
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Verifique usuario o contraseña')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }
    );
  }
}])

.controller('PedidosCtrl', function($scope,$timeout,$mdSidenav,$http,userService,$rootScope,$filter,$mdDialog,$window,$cookieStore,CONFIG) {

  var OneSignal = window.OneSignal || [];

    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        console.log("OneSignal User ID:", userId);
        //console.log(CONFIG.ID);
        $scope.push={
          push: userId
        };
        var req = {
           method: 'POST',
           url: '../api/public/api/adminpush/store',
           headers: {
             'Authorization' : 'Bearer ' + userService.getCurrentToken()
           },
           data: $scope.push
        }

        $http(req).then(function(response){
          console.log(response.data);
        },function(response){
          console.log(response.data);
        })
        
      });
    });

  setTimeout(function() {
    var reqcosto = {
      method: 'GET',
      url: '../api/public/api/costo',
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqcosto).then(function(response){
      CONFIG.COSTOS = response.data.costos;
      $scope.costos = response.data.costos;
          console.log(response);
      }, function(){
          console.log('No se ha podido obtener las variables del sistema');
      });
  }, 300);

  setTimeout(function() {
    var reM = {
      method: 'GET',
      url: '../api/public/api/motorizado',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reM).then(function(response_moto){
      if (response_moto.data != '') {
        CONFIG.MOTORIZADOS = response_moto.data.motorizados;
        $scope.motos = response_moto.data.motorizados;
        var reqHora = {
          method: 'GET',
          url: '../api/public/api/auth/getHour',
          headers: {
           'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(reqHora).then(function(response){
          CONFIG.DATE = response.data;
          console.log(response.data);
        }, function(){
            console.log('ERROR HORA');
        });
      } 
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('No se pudo obtener información del motorizado')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  }, 500);

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("pendientes") != null){
      var pedidos = document.getElementById("pendientes").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><style>@page{size:landscape;}</style><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  $scope.asignar_listado = function() {

    if($rootScope.list_pedidos == ''){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Debe seleccionar mas de un pedido para poder asignar el motorizado')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      return true;
    }

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/select_vmotorizados.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
    
    function DialogController($scope, $mdDialog, $rootScope) {
      $scope.pedidos = $rootScope.list_pedidos;
      $scope.distancias = [];
      
      var req = {
        method: 'GET',
        url: '../api/public/api/motorizado',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data);
        $scope.motori=response.data.motorizados;
        for (var j = 0; j < $scope.motori.length; j++) {
          if ($scope.motori[j].tipo_auto == 1) {
            $scope.motori[j].tipo = 'Moto';
          } else if ($scope.motori[j].tipo_auto == 2) {
            $scope.motori[j].tipo = 'Auto';
          } else if ($scope.motori[j].tipo_auto == 3) {
            $scope.motori[j].tipo = 'Furgoneta';
          }
          $scope.distancias.push({
            nombre: $scope.motori[j].name + ' ' + $scope.motori[j].apellidos,
            telefono: $scope.motori[j].telefono,
            img: $scope.motori[j].foto,
            tipo: $scope.motori[j].tipo,
            motorizado_id: $scope.motori[j].id,
            push: $scope.motori[j].push
          })
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error en obtener los motorizados')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      /*var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        var motos = response.data;
        var j=0;
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].estado == 0) {
            $scope.distancias.push(motos[i]);
          }
          j=j+1;  
        }
        if(motos.length==j){
          $scope.calcDistancia();
        }
      }, function(){
        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
      });

      $scope.calcDistancia=function(){

          for (var i = 0; i < $scope.distancias.length; i++) {
            for (var j = 0; j < $scope.motori.length; j++) {
              if($scope.motori[j].id==$scope.distancias[i].motorizado_id){
                $scope.distancias[i].nombre=$scope.motori[j].name + ' ' + $scope.motori[j].apellidos;
                $scope.distancias[i].telefono=$scope.motori[j].telefono;
                $scope.distancias[i].img=$scope.motori[j].foto;
                if ($scope.motori[j].tipo_auto == 1) {
                  $scope.distancias[i].tipo = 'Moto';
                } else if ($scope.motori[j].tipo_auto == 2) {
                  $scope.distancias[i].tipo = 'Auto';
                } else if ($scope.motori[j].tipo_auto == 3) {
                  $scope.distancias[i].tipo = 'Furgoneta';
                }
              }
            }
          }
          setTimeout(function() {
            $scope.$apply();
          }, 400);
      }*/

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.select_moto = function(item) {
        console.log(item);
        $scope.estado = {
          estado: 1,
          motorizado_id: item.motorizado_id
        }

        /*$scope.estado2 = {
          estado: 1
        }*/

        $scope.estado_destino = {
          estado_destino: 1,
          motorizado_id: item.motorizado_id
        }

        var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea asignar los pedidos al motorizado '+ item.nombre +'?')
          .ariaLabel('Lucky day')
          .ok('SI')
          .cancel('NO');

        $mdDialog.show(confirm).then(function() {

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + item.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado2
          }*/

          var re_push = {
             method: 'GET',
             url: '../Motorizado5/onesignalMotorizado.php',
             headers: {
               'ID' : item.push
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: ''
          }

          $scope.count2 = 0;
          var destinos_id = [];

          for (var i = 0; i < $scope.pedidos.length; i++) {
            var req = {
              method: 'PUT',
              url: '../api/public/api/update_pedidos/' + $scope.pedidos[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado
            }

            $http(req).then(function(response){
              $scope.count2 = $scope.count2 + 1;
              destinos_id = $scope.pedidos[$scope.count2-1].destinos;

              for (var j = 0; j < destinos_id.length; j++) {
                console.log(destinos_id[j].id);
                var reqD = {
                  method: 'PUT',
                  url: '../api/public/api/update_destinos/' + destinos_id[j].id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.estado_destino
                }

                $http(reqD).then(function(response){            
                  destinos_id = [];
                }, function(){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              }

              if($scope.count2 == $scope.pedidos.length){
                $rootScope.$emit("ActualizarTabla", {});
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Los pedidos fueron asignados con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
                $http(re_push).then(function(response){
                  console.log(response.data);
                }, function(){
                  alert('ha ocurrido un error al enviar el push');
                });
                /*$http(reqE).then(function(response){
                  if(response.data == ''){
                    $rootScope.$emit("ActualizarTabla", {});
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Los pedidos fueron asignados con éxito')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  }
                }, function(){
                  $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                });*/
              }
            }, function(){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }
        }, function() {
          
        });
      };
    }
  }
})

.controller('enCursoCtrl', function($scope,$timeout,$http,CONFIG,userService,$filter) {

  $scope.date = CONFIG.DATE;
  $scope.fecha_actual = $filter('date')(new Date($scope.date),'dd/MM/yyyy HH:mm:ss');

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("encurso") != null){
      var pedidos = document.getElementById("encurso").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><style>@page{size:landscape;}</style><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
    }, 500);
  }
})

.controller('FinalizadosCtrl', function($scope,$timeout) {

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("finalizados") != null){
      var pedidos = document.getElementById("finalizados").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><style>@page{size:landscape;}</style><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
    }, 500);
  }
})

.controller('AnuladosCtrl', function($scope,$timeout,$mdSidenav) {

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("anulados") != null){
      var pedidos = document.getElementById("anulados").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><style>@page{size:landscape;}</style><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
    }, 500);
  }
})

.controller('ListadoProcesoCtrl', function ($scope,$compile, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService,$mdDialog,$interval,$rootScope, $routeParams) {

  $scope.date = CONFIG.DATE;
  var param = '';
  param= $routeParams.param;

  var req = {
    method: 'GET',
    url: '../api/public/api/pedido0',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  setTimeout(function() {
    var reD = {
      method: 'GET',
      url: '../api/public/api/distritos',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $scope.distritos = [];

    $http(reD).then(function(response){
      if (response.data != '') {
        $scope.distritos = response.data.distritos;
        $scope.distritos.push({
          id:0,
          nombre: 'Todos',
          zona: 'Todos'
        })
        $scope.catFilter2 = $scope.distritos[$scope.distritos.length - 1];
        $scope.catFilter3 = $scope.distritos[$scope.distritos.length - 1];
      } 
    }, function(){
      console.log('error');
    });
  }, 200);

  $scope.rangos = [
    {"id":1,'hora':'09-19'},
    {"id":2,'hora':'09-14'},
    {"id":3,'hora':'14-19'},
    {"id":4,'hora':'09-11'},
    {"id":5,'hora':'10-12'},
    {"id":6,'hora':'11-13'},
    {"id":7,'hora':'12-14'},
    {"id":8,'hora':'13-15'},
    {"id":9,'hora':'14-16'},
    {"id":10,'hora':'15-17'},
    {"id":11,'hora':'16-18'},
    {"id":12,'hora':'17-19'},
    {"id":13,'hora':'Todos'}
  ]
 
  $scope.tipo = 4;
  $scope.rango = 13;
  $scope.catFilter = $scope.rangos[12];
  $scope.zona = 0;
  $scope.distrito = 0;
  $scope.select_button = 4;
  $scope.filternumber = '';
  $scope.typenumber = 0;
  $scope.fecha_filtro = new Date($scope.date);
  $scope.fecha_filtro1 = $filter('date')($scope.fecha_filtro,'yyyy-MM-dd');

  $scope.change_number = function(number) {
    $scope.filternumber = number;
    $scope.typenumber = 1;
    reloadData();
  }

  $scope.change_tipo = function(tipo) {
    $scope.tipo = tipo;
    $scope.select_button = tipo;
    $scope.typenumber = 0;
    reloadData();
  }

  $scope.change_zona = function(zona) {
    $scope.zona = zona.zona;
    $scope.typenumber = 0;
    if (zona.zona == 'Todos') {
      $scope.zona = 0;
      $scope.catFilter3 = $scope.distritos[$scope.distritos.length - 1];
    }
    $scope.distrito = 0;
    reloadData();
  }

  var string= false;

  $scope.change_rango = function(rango) {
    $scope.typenumber = 0;
    $scope.rango = rango.hora;
    if (rango.id == 13) {
      $scope.rango = 13;
    }
    reloadData();
  }

  $scope.change_distrito = function(distrito) {
    $scope.distrito = distrito.nombre;
    $scope.typenumber = 0;
    if (distrito.nombre == 'Todos') {
      $scope.distrito = 0;
    }
    reloadData();
  }

  $scope.limpiar = function() {
    $scope.tipo = 4;
    $scope.rango = 13;
    $scope.catFilter = $scope.rangos[12];
    $scope.zona = 0;
    $scope.distrito = 0;
    $scope.select_button = 4;
    $scope.catFilter2 = $scope.distritos[$scope.distritos.length - 1];
    $scope.catFilter3 = $scope.distritos[$scope.distritos.length - 1];
    $scope.fecha_filtro = new Date($scope.date);
    $scope.fecha_filtro1 = $filter('date')($scope.fecha_filtro,'yyyy-MM-dd');
    $scope.typenumber = 0;
    $scope.filternumber = '';
    $scope.tracking = [];
    $scope.pedidos = [];
    reloadData();
  }

  $scope.change_date = function(fecha) {
    $scope.fecha_filtro1 = $filter('date')(new Date(fecha),'yyyy-MM-dd');
    $scope.typenumber = 0;
    reloadData();
  }

  if($routeParams && $routeParams.param) {
    var day = new Date(param);
    day.setDate(day.getDate() + 1);
    $scope.fecha_filtro = day;
    $scope.fecha_filtro1 = $filter('date')(new Date( $scope.fecha_filtro),'yyyy-MM-dd');
  }

  var vm = this;
  vm.view = view;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.reloadData = reloadData;
  vm.dtInstance = {};
  vm.persons = {};
  vm.selected = {};
  vm.selectAll = false;
  vm.toggleAll = toggleAll;
  vm.toggleOne = toggleOne;

  var titleHtml = '<input type="checkbox" ng-model="showCase.selectAll" ng-click="showCase.toggleAll(showCase.selectAll, showCase.selected)">';

  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      var length = 0;
      $scope.tracking = [];
      $scope.pedidos = [];

      if ($scope.typenumber == 0) {
        $http(req).then(function(response){
          if (response.data == '') {
            defer.resolve($scope.tracking);
          } else {
            $scope.pedidos = response.data.pedidos;

            for (var i = 0; i < $scope.pedidos.length; i++) {

              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].destinos[0].descuento = 0;
              }
              $scope.pedidos[i].destinos[0].total = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
              
              if ($scope.pedidos[i].destinos.length > 0) {
                if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3 && $scope.fecha_filtro1 == $filter('date')(new Date($scope.pedidos[i].created_at),'yyyy-MM-dd')) {
                  if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }

                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {

                    // tipo variable, rango variable, zona fija, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 12) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino  && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                  }              
                }

                if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3 && $scope.fecha_filtro1 == $filter('date')(new Date($scope.pedidos[i].fecha),'yyyy-MM-dd')) {
                  if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }

                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {

                    // tipo variable, rango variable, zona fija, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 12) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino  && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].reprogramado != 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                  }
                }

                if ($scope.pedidos[i].tipo_usuario == 3 && $scope.fecha_filtro1 == $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'yyyy-MM-dd')) {
                  if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }
                  if ($scope.tipo == 3 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 1) {
                    $scope.tracking.push($scope.pedidos[i]);
                  }

                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {

                    // tipo variable, rango variable, zona fija, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == 12 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == 0 && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito fijo
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0  && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == 0 && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango variable, zona fija, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == 0 && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == $scope.pedidos[i].destinos[j].hora_destino) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }

                    // tipo variable, rango fijo, zona variable, distrito variable
                    if ($scope.tipo == 4 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 1 && $scope.pedidos[i].tipo_usuario != 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino  && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 2 && $scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].reprogramado == 0 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13 && $scope.pedidos[i].estado_reprogramado == 0) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                    if ($scope.tipo == 3 && $scope.pedidos[i].estado_reprogramado == 1 && $scope.zona == $scope.pedidos[i].destinos[j].zona_destino && $scope.distrito == $scope.pedidos[i].destinos[j].distrito_destino && $scope.rango == 13) {
                      $scope.tracking.push($scope.pedidos[i]);
                    }
                  }
                }
              }

              count = count + 1;
            }
          }
          if (count == $scope.pedidos.length) {
            defer.resolve($scope.tracking);
          }
        }, function(){
          console.log('error');
        })
      } else {
        $http(req).then(function(response){
          if (response.data == '') {
            defer.resolve($scope.tracking);
          } else {
            $scope.pedidos = response.data.pedidos;

            for (var i = 0; i < $scope.pedidos.length; i++) {
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].destinos[0].descuento = 0;
              }
              $scope.pedidos[i].destinos[0].total = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);

              if ($scope.pedidos[i].id == $scope.filternumber) {
                $scope.tracking.push($scope.pedidos[i]);
                defer.resolve($scope.tracking);
              }
            }
          }
        }, function(){
          console.log('error');
        })
      }
      
      return defer.promise;
    }).withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Pedido:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')

      .withOption('order', [0, 'desc'])
      .withOption('rowCallback', rowCallback)
      .withOption('createdRow', createdRow)
      .withOption('headerCallback', function(header) {
            if (!vm.headerCompiled) {
                vm.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        });
  vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(multiHtml),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(checkHtml),
        DTColumnBuilder.newColumn(null).withTitle('Orden').renderWith(ordenHtml),
        DTColumnBuilder.newColumn('nombre').withTitle('Cliente'),
        DTColumnBuilder.newColumn(null).withTitle('Horario de recojo').renderWith(horaOrigenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Medio').notSortable().renderWith(medioHtml),
        DTColumnBuilder.newColumn(null).withTitle('Cliente Final').renderWith(origenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Destino').renderWith(destinoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Distrito').renderWith(distritoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Zona').renderWith(zonaHtml),
        DTColumnBuilder.newColumn(null).withTitle('Fecha de Entrega').renderWith(horaHtml),
        DTColumnBuilder.newColumn(null).withTitle('Hora Programada').renderWith(horaprogHtml),
        DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
    ];

  function checkHtml(data, type, full, meta) {
    vm.selected[full.id] = false;
    return '<input type="checkbox" ng-model="showCase.selected[' + data.id + ']" ng-click="showCase.toggleOne(' + data.id +',showCase.selected)">';
  }

  $scope.date = CONFIG.DATE;
  $scope.fecha_actual = $filter('date')(new Date($scope.date),'dd/MM/yyyy HH:mm:ss');
  $rootScope.list_pedidos = [];

  function toggleAll (selectAll, selectedItems) {
    
    $rootScope.list_pedidos = [];

    if (selectAll) {
      for (var i = 0; i < $scope.tracking.length; i++) {
        $rootScope.list_pedidos.push($scope.tracking[i]);
        console.log($rootScope.list_pedidos);
      }
    }
    
    for (var id in selectedItems) {
        if (selectedItems.hasOwnProperty(id)) {
            selectedItems[id] = selectAll;
        }
    }
  }

  $rootScope.$on("ActualizarTabla", function(){ 
    reloadData();
  });

  function toggleOne (selected, selectedItems) {

    $scope.bandera = 0;

    for (var j = 0; j < $rootScope.list_pedidos.length; j++) {
      if ($rootScope.list_pedidos[j].id == selected) {
        var index = $rootScope.list_pedidos.indexOf($rootScope.list_pedidos[j]);
        $rootScope.list_pedidos.splice(index, 1);
        console.log($rootScope.list_pedidos);
        $scope.bandera = 1;
      }
    }

    if ($scope.bandera == 0) {
      for (var i = 0; i < $scope.tracking.length; i++) {
        if($scope.tracking[i].id == selected){
          $rootScope.list_pedidos.push($scope.tracking[i]);
          console.log($rootScope.list_pedidos);
        }
      }
    }
    
    for (var id in selectedItems) {
        if (selectedItems.hasOwnProperty(id)) {
            if(!selectedItems[id]) {
                vm.selectAll = false;
                return;
            }
        }
    }
    vm.selectAll = true;
  }

  function medioHtml(data, type, full, meta) {

    if (data.cajap == 1) {
      $variable = '<md-tooltip md-direction="top">Moto</md-tooltip><i class="fa fa-motorcycle medio_table" id="plus5" aria-hidden="true"></i>';
    }
    if (data.cajam == 1) {
      $variable = '<md-tooltip md-direction="top">Auto</md-tooltip><i class="fa fa-car medio_table" id="plus6" aria-hidden="true"></i>';
    }
    if (data.cajag == 1) {
      $variable = '<md-tooltip md-direction="top">Furgoneta</md-tooltip><i class="fa fa-truck medio_table" id="plus7" aria-hidden="true"></i>';
    } 
    return $variable;
  }

  function view(pedido) {  
    CONFIG.PEDIDO = pedido;
    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      CONFIG.CLIENTE = response.data.user;
      $timeout(function() {$location.path("/detalle_pedido").search({param: $scope.fecha_filtro1});}, 500); 
    }, function(){
      console.log('error');
    });
  }

  function reloadData() {  
    var resetPaging = true;
    $rootScope.list_pedidos = [];
    vm.dtInstance.reloadData(null, resetPaging);
  }

  $interval(reloadData, 120000);
    
  function edit(person) {

    $mdDialog.show({
      controller: DialogController,
      locals:{data: person}, 
      templateUrl: 'templates/select_motorizado.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
    
    function DialogController($scope, $mdDialog,data) {
      $scope.pedidos = data;
      $scope.distancias = [];

      var req = {
        method: 'GET',
        url: '../api/public/api/motorizado',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data);
        $scope.motori=response.data.motorizados;
        for (var j = 0; j < $scope.motori.length; j++) {
          if ($scope.motori[j].tipo_auto == 1) {
            $scope.motori[j].tipo = 'Moto';
          } else if ($scope.motori[j].tipo_auto == 2) {
            $scope.motori[j].tipo = 'Auto';
          } else if ($scope.motori[j].tipo_auto == 3) {
            $scope.motori[j].tipo = 'Furgoneta';
          }
          $scope.distancias.push({
            nombre: $scope.motori[j].name + ' ' + $scope.motori[j].apellidos,
            telefono: $scope.motori[j].telefono,
            img: $scope.motori[j].foto,
            tipo: $scope.motori[j].tipo,
            motorizado_id: $scope.motori[j].id,
            push: $scope.motori[j].push
          })
          CONFIG.MOTORIZADOS = $scope.motori;
        }
      }, function(){
        console.log('error');
      });

      /*var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        var motos = response.data;
        var j=0;
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].estado == 0) {
            $scope.distancias.push(motos[i]);
          }
          j=j+1;  
        }
        if(motos.length==j){
          $scope.calcDistancia();
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      $scope.calcDistancia=function(){
          var lat= parseFloat($scope.pedidos.destinos[0].lat);
          var lng= parseFloat($scope.pedidos.destinos[0].lng);

          var R = 6371; // Radio tierra en Km
          var dLat = '';
          var dLon = '';
          var a = '';
          var c = ''; 
          var d = '';
          for (var i = 0; i <=$scope.distancias.length-1; i++) {
            R = 6371; // Radio tierra en Km
            dLat = 0;
            dLon = 0;
            a = 0;
            c = 0; 
            d = 0;
            dLat = ($scope.distancias[i].lat-lat) * Math.PI / 180;
            dLon = ($scope.distancias[i].lng-lng) * Math.PI / 180;
            lat1 = lat * Math.PI / 180;
            lat2 = $scope.distancias[i].lat* Math.PI / 180;
            a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            d = R * c;
            $scope.distancias[i].distancia=d;
            for (var j = 0; j < $scope.motori.length; j++) {
              if($scope.motori[j].id==$scope.distancias[i].motorizado_id){
                $scope.distancias[i].nombre=$scope.motori[j].name + ' ' + $scope.motori[j].apellidos;
                $scope.distancias[i].telefono=$scope.motori[j].telefono;
                $scope.distancias[i].img=$scope.motori[j].foto;
                if ($scope.motori[j].tipo_auto == 1) {
                  $scope.distancias[i].tipo = 'Moto';
                } else if ($scope.motori[j].tipo_auto == 2) {
                  $scope.distancias[i].tipo = 'Auto';
                } else if ($scope.motori[j].tipo_auto == 3) {
                  $scope.distancias[i].tipo = 'Furgoneta';
                }
              }
            }
          }
          setTimeout(function() {
            $scope.distancias.sort(function(a, b) {
              return a.distancia - b.distancia;
            });
          }, 300);
          setTimeout(function() {
            $scope.$apply();
          }, 400);
      }*/

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.select_moto = function(item) {
        console.log(item);
        $scope.estado = {
          estado: 1,
          motorizado_id: item.motorizado_id
        }

        /*$scope.estado2 = {
          estado: 1
        }*/

        $scope.estado_destino = {
          estado_destino: 1,
          motorizado_id: item.motorizado_id
        }

        var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea asignar el pedido al motorizado '+ item.nombre +'?')
          .ariaLabel('Lucky day')
          .ok('SI')
          .cancel('NO');

        $mdDialog.show(confirm).then(function() {
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedidos.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + item.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado2
          }*/

          var re_push = {
             method: 'GET',
             url: '../Motorizado5/onesignalMotorizado.php',
             headers: {
               'ID' : item.push
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: ''
          }
                  
          var destinos_id = $scope.pedidos.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      reloadData();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('El pedido fue asignado con éxito')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                      $http(re_push).then(function(response){
                        console.log(response.data);
                      }, function(){
                        console.log('ha ocurrido un error al enviar el push');
                      });
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue asignado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        }, function() {
          
        });
      };
    }
  }

  function deleteRow(person) {

    $scope.pedidos = person;
    $scope.estado_pedido = {
      motivo: '',
      costo: 0
    }
    $scope.estado = {
      costo: 0
    }

    var reqA = {
      method: 'PUT',
      url: '../api/public/api/update_pedidos/' + $scope.pedidos.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: $scope.estado
    }

    var confirm = $mdDialog.prompt()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea anular el pedido de '+ $scope.pedidos.nombre +'?')
      .placeholder('Por favor, ingrese el motivo...')
      .ariaLabel('Dog name')
      .initialValue(' ')
      .ok('Rechazar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {

      $scope.estado_pedido.motivo = result;
      console.log($scope.estado_pedido.motivo);
      if ($scope.estado_pedido.motivo === 'undefined') {
        $scope.estado_pedido.motivo = '';
      }

      var req = {
        method: 'GET',
        url: '../api/public/api/devolucion/' + $scope.pedidos.id+'?motivo='+$scope.estado_pedido.motivo,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.estado_pedido
      }

      $http(req).then(function(response){
        console.log(response.data);
        if(response.data == ''){
          $http(reqA).then(function(response){
            console.log(response.data);
            if(response.data == ''){
              reloadData();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El pedido fue anulado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }

  $scope.destinos = '';
  $scope.pedidos = '';
  $scope.idpedido = '';
  $scope.cliente = '';
  $scope.destinos2 = '';

  function rowCallback(tabRow, data, dataIndex) {

    $(tabRow).unbind('click');
    $(tabRow).on('click', '#plus', function () {
        $(this).find('.fa-plus').toggleClass('fa-rotate-180');
        $scope.tr = $(tabRow);
        $scope.table = vm.dtInstance.DataTable;
        $scope.row = $scope.table.row($scope.tr);

        if ( $scope.row.child.isShown() ) {
            $scope.row.child.hide();
            $scope.tr.removeClass('shown');
        }
        else {
            $scope.row.child( format($scope.row.data()) ).show();
            $scope.tr.addClass('shown');
        }
    });

    $('.tabla_pendiente tbody').unbind('click');
    $('.tabla_pendiente tbody').on('click', '.button_print', function (e) {
      $scope.destinos = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      console.log(rowData);
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.pedidos = rowData;
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.costo = parseFloat(rowData.costo);
      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.dest = rowData.destinos;
      
      $scope.dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest.length; i++) {
        if(i == id){
          $scope.destinos = $scope.dest[i];
          $scope.$apply();
        }
      }

      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+rowData.user_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $scope.cliente = response.data.user;
        setTimeout(function() {$scope.imprimir();}, 900);
      }, function(){
        console.log('error');
      });
    });

    $('.tabla_pendiente tbody').on('click', '.button_moto', function (e) {
      $scope.destinos2 = '';
      $scope.contador = 0;

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      $scope.dest2 = rowData.destinos;
      
      $scope.dest2.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest2.length; i++) {
        if(i == id){
          $scope.destinos2 = $scope.dest2[i];
        }
        if ($scope.dest2[i].estado_destino == 0) {
          $scope.contador += 1;
        }
      }

      $mdDialog.show({
        controller: DialogController,
        locals:{data: $scope.destinos2, data2: rowData.id}, 
        templateUrl: 'templates/select_motorizado.html',
        parent: angular.element(document.body),
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
      
      }, function() {
        
      });

      function DialogController($scope, $mdDialog,data,data2) {

        $scope.pedidos = data;
        $scope.distancias = [];
        $scope.id_pedido = data2;

        var req = {
          method: 'GET',
          url: '../api/public/api/motorizado',
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data);
          $scope.motori=response.data.motorizados;
          for (var j = 0; j < $scope.motori.length; j++) {
            if ($scope.motori[j].tipo_auto == 1) {
              $scope.motori[j].tipo = 'Moto';
            } else if ($scope.motori[j].tipo_auto == 2) {
              $scope.motori[j].tipo = 'Auto';
            } else if ($scope.motori[j].tipo_auto == 3) {
              $scope.motori[j].tipo = 'Furgoneta';
            }
            $scope.distancias.push({
              nombre: $scope.motori[j].name + ' ' + $scope.motori[j].apellidos,
              telefono: $scope.motori[j].telefono,
              img: $scope.motori[j].foto,
              tipo: $scope.motori[j].tipo,
              motorizado_id: $scope.motori[j].id,
              push: $scope.motori[j].push
            })
          }
        }, function(){
          console.log('error');
        });

        /*var reqP = {
          method: 'GET',
          url: '../api/public/api/posicion',
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(reqP).then(function(response){
          var motos = response.data;
          var j=0;
          for (var i = 0; i < motos.length; i++) {
            if (motos[i].estado == 0) {
              $scope.distancias.push(motos[i]);
            }
            j=j+1;  
          }
          if(motos.length==j){
            $scope.calcDistancia();
          }
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }); 

        $scope.calcDistancia=function(){
            var lat= parseFloat($scope.pedidos.lat);
            var lng= parseFloat($scope.pedidos.lng);

            var R = 6371; // Radio tierra en Km
            var dLat = '';
            var dLon = '';
            var a = '';
            var c = ''; 
            var d = '';
            for (var i = 0; i <=$scope.distancias.length-1; i++) {
              R = 6371; // Radio tierra en Km
              dLat = 0;
              dLon = 0;
              a = 0;
              c = 0; 
              d = 0;
              dLat = ($scope.distancias[i].lat-lat) * Math.PI / 180;
              dLon = ($scope.distancias[i].lng-lng) * Math.PI / 180;
              lat1 = lat * Math.PI / 180;
              lat2 = $scope.distancias[i].lat* Math.PI / 180;
              a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
              c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              d = R * c;
              $scope.distancias[i].distancia=d;
              for (var j = 0; j < $scope.motori.length; j++) {
                if($scope.motori[j].id==$scope.distancias[i].motorizado_id){
                  $scope.distancias[i].nombre=$scope.motori[j].name + ' ' + $scope.motori[j].apellidos;
                  $scope.distancias[i].telefono=$scope.motori[j].telefono;
                  $scope.distancias[i].img=$scope.motori[j].foto;
                  if ($scope.motori[j].tipo_auto == 1) {
                    $scope.distancias[i].tipo = 'Moto';
                  } else if ($scope.motori[j].tipo_auto == 2) {
                    $scope.distancias[i].tipo = 'Auto';
                  } else if ($scope.motori[j].tipo_auto == 3) {
                    $scope.distancias[i].tipo = 'Furgoneta';
                  }
                }
              }
            }
            setTimeout(function() {
              $scope.distancias.sort(function(a, b) {
                return a.distancia - b.distancia;
              });
            }, 300);
            setTimeout(function() {
              $scope.$apply();
            }, 400);
        }*/

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.select_moto = function(item) {
          console.log(item);

          $scope.estado = {
            estado_destino: 1,
            motorizado_id: item.motorizado_id
          }

          /*$scope.estado2 = {
            estado: 1
          }*/

          $scope.estado_pedido = {
            estado: 1,
            motorizado_id: item.motorizado_id
          }

          var confirm = $mdDialog.confirm()
            .title('Courier Liebre Express | Administrativo')
            .textContent('¿Desea asignar el subpedido al motorizado '+ item.nombre +'?')
            .ariaLabel('Lucky day')
            .ok('SI')
            .cancel('NO');

          $mdDialog.show(confirm).then(function() {
            var req = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + $scope.pedidos.id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado
            }

            var reqP = {
              method: 'PUT',
              url: '../api/public/api/update_pedidos/' + $scope.id_pedido,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_pedido
            }

            var re_push = {
               method: 'GET',
               url: '../Motorizado5/onesignalMotorizado.php',
               headers: {
                 'ID' : item.push
                 //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
               },
               data: ''
            }
            /*var reqE = {
              method: 'PUT',
              url: '../api/public/api/update_posicion/' + item.id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado2
            }*/

            $http(req).then(function(response){
              console.log(response.data);
              if(response.data == ''){
                //$http(reqE).then(function(response){
                  //if(response.data == ''){
                    if ($scope.contador == 1) {
                      $http(reqP).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue asignado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                          $http(re_push).then(function(response){
                            console.log(response.data);
                          }, function(){
                            alert('ha ocurrido un error al enviar el push');
                          });
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });
                    } else {
                      reloadData();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('El subpedido fue asignado con éxito')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                      $http(re_push).then(function(response){
                        console.log(response.data);
                      }, function(){
                        console.log('error');
                      });
                    }
                  //}
                //}, function(){
                  /*$mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );*/
                //});
              }
            }, function(){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('ha ocurrido un error al asignar el motorizado')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }, function() {
            
          });
        };
      }
    });

    $('.tabla_pendiente tbody').on('click', '.button_delete', function (e) {
      $scope.destinos2 = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      $scope.dest2 = rowData.destinos;
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.contador = 0;
      $scope.id_pedido = rowData.id;
      
      $scope.dest2.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest2.length; i++) {
        if(i == id){
          $scope.destinos2 = $scope.dest2[i];
        }
        if ($scope.dest2[i].estado_destino == 0) {
          $scope.contador += 1;
        }
      }

      $scope.estado_destino = {
        estado_destino: 4,
        motivo: ''
      }

      $scope.estado_pedido = {
        estado: 4
      }

      var confirm = $mdDialog.prompt()
        .title('Courier Liebre Express | Administrativo')
        .textContent('¿Desea anular el subpedido '+ $scope.idpedido +'?')
        .placeholder('Por favor, ingrese el motivo...')
        .ariaLabel('Dog name')
        .initialValue('')
        .ok('Rechazar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {

        $scope.estado_destino.motivo = result;

        var req = {
          method: 'PUT',
          url: '../api/public/api/update_destinos/' + $scope.destinos2.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_destino
        }

        var reqP = {
          method: 'PUT',
          url: '../api/public/api/update_pedidos/' + $scope.id_pedido,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_pedido
        }

        $http(req).then(function(response){
          console.log(response.data);
          if(response.data == ''){
            console.log($scope.contador);
            if ($scope.contador == 1) {
              $http(reqP).then(function(response){
                if(response.data == ''){
                  reloadData();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El subpedido fue rechazado con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                }
              }, function(){
                $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
              });
            } else {
              reloadData();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El subpedido fue rechazado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
          }
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      })
    });  
  }

  function format (d) {
    var html = '<table cellpadding="5" id="isrctable" ng-controller="ListadoProcesoCtrl" cellspacing="0" border="0" style="padding-left:50px;" width="100%">';
    var letter = 'A'.charCodeAt(0);
    $scope.dest = d.destinos;

    $scope.dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    for(var i = 0; i < $scope.dest.length; i++) {
      console.log($scope.dest[i]);
      if ($scope.dest[i].estado_destino == 0) {
        console.log('2378');
        if (d.cajap == 1) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:5% !important"></td><td class="ng-scope" style="width: 11%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 10%;"></td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 5%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 14%;">'+$scope.dest[i].estado_destino+'</td><td class="ng-scope" style="width: 13%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-motorcycle"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
        }
        if (d.cajam == 1) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:5% !important"></td><td class="ng-scope" style="width: 11%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 10%;"></td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 5%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 14%;">'+$scope.dest[i].estado_destino+'</td><td class="ng-scope" style="width: 13%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-car"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
        }
        if (d.cajag == 1) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:5% !important"></td><td class="ng-scope" style="width: 11%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 10%;"></td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 11%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 5%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 14%;">'+$scope.dest[i].estado_destino+'</td><td class="ng-scope" style="width: 13%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-truck"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
        }
      }
      letter += 1;
    }
    html += '</table>';
    
    return html;
  }

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("detalle_pedido2") != null){
      var pedidos = document.getElementById("detalle_pedido2").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function createdRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT

    if (data.tipo == 'URGENTE') {
      if (moment(data.created_at).add(5, 'minutes').isBefore(/*now*/)){
        angular.element(row).addClass('green');
      } 

      if (moment(data.created_at).add(10, 'minutes').isBefore(/*now*/)){
        angular.element(row).addClass('red');
      } 
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      if (moment(data.fecha).add(5, 'minutes').isBefore()){
        angular.element(row).addClass('green');
      } 

      if (moment(data.fecha).add(10, 'minutes').isBefore()){
        angular.element(row).addClass('red');
      } 
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      if (moment(data.destinos[0].fecha_destino).add(5, 'minutes').isBefore()){
        angular.element(row).addClass('green');
      } 

      if (moment(data.destinos[0].fecha_destino).add(10, 'minutes').isBefore()){
        angular.element(row).addClass('red');
      } 
    }
    $compile(angular.element(row).contents())($scope);
  }
  
  function origenHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest[0].nombre_destino != 'undefined') {
      return dest[0].nombre_destino;
    } else { 
      return ' ';
    }
  }

  function destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].destino;
    } else {
      return dest[dest.length - 1].destino;
    }
  }

  function distritoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1 && dest[0].distrito_destino != null) {
      return dest[0].distrito_destino;
    } else if (dest[dest.length - 1].distrito_destino != null) {
      return dest[dest.length - 1].distrito_destino;
    } else {
      return '';
    }
  }

  function zonaHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1 && dest[0].zona_destino != null) {
      return dest[0].zona_destino;
    } else if (dest[dest.length - 1].zona_destino != null) {
      return dest[dest.length - 1].zona_destino;
    } else {
      return '';
    }
  }

  function ordenHtml(data, type, full, meta) {
    $variable = 'LIE000' + data.id;
    return $variable;
  }

  function multiHtml(data, type, full, meta) {
    if (data.destinos.length > 1) {
      return '<md-tooltip md-direction="top">Ver Destinos</md-tooltip><i class="fa fa-plus" id="plus" aria-hidden="true"></i>';
    } else{
      return '';
    } 
  }

  function horaHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.created_at),'HH:mm:ss');
    
    if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
      $variable = $filter('date')(new Date(data.created_at),'dd/MM/yyyy HH:mm:ss');
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      $variable = $filter('date')(new Date(data.fecha),'dd/MM/yyyy');
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      $variable = $filter('date')(new Date(data.destinos[0].fecha_destino),'dd/MM/yyyy');
    } 
    return $variable;
  }

  function horaOrigenHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.fecha_origen),'dd/MM/yyyy');
    return $variable;
  }

  function horaprogHtml(data, type, full, meta) {

    if (data.tipo_usuario != 3) {
      $variable = data.hora;
      if (data.tipo == 'URGENTE') {
        $variable = '-';
      } 
    }

    if (data.tipo_usuario == 3) {
      $variable = data.destinos[0].hora_destino;
    }
    return $variable;
  }


  function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
     
      if (data.cajap == 1) {
        $variable = '<div style="min-width: 150px;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
          '</button>' +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Asignar Motorizado</md-tooltip><i class="fa fa-motorcycle"></i>' +
          '</button>'  +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Rechazar Pedido</md-tooltip><i class="fa fa-times"></i>' +
          '</button></div>' ;
      }
      if (data.cajam == 1) {
        $variable = '<div style="min-width: 150px;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
          '</button>' +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Asignar Auto</md-tooltip><i class="fa fa-car"></i>' +
          '</button>'  +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Rechazar Pedido</md-tooltip><i class="fa fa-times"></i>' +
          '</button></div>' ;
      }
      if (data.cajag == 1) {
        $variable = '<div style="min-width: 150px;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
          '</button>' +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Asignar Furgoneta</md-tooltip><i class="fa fa-truck"></i>' +
          '</button>'  +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Rechazar Pedido</md-tooltip><i class="fa fa-times"></i>' +
          '</button></div>' ;
        } 

      return $variable;
    }
})

.controller('ListadoenCursoCtrl', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService,$mdDialog,$interval,$rootScope) {

  $scope.pedidos = [];
  $scope.tracking = [];
  $scope.ctn = 0;
  $scope.motos = CONFIG.MOTORIZADOS;
  $scope.costos = CONFIG.COSTOS;

  $scope.motos.push({id:0,name:'Todos',apellidos:'', motorizado_nombre:'Todos'});
  $scope.motorizado_select = $scope.motos[$scope.motos.length - 1].motorizado_nombre;

  setTimeout(function() {
    var reqcosto = {
      method: 'GET',
      url: '../api/public/api/costo',
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqcosto).then(function(response){
      CONFIG.COSTOS = response.data.costos;
      $scope.costos = response.data.costos;
          console.log(response);
      }, function(){
        console.log('error');
      });
  }, 300);
  
  $scope.motorizado = 0;

  var req = {
    method: 'GET',
    url: '../api/public/api/pedido12',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.change_moto = function(moto) {
    $scope.motorizado = moto.motorizado_nombre;
    if ($scope.motorizado == 'Todos ') {
      $scope.motorizado = 0;
    }
    reloadData();
  }

  var vm = this;
  vm.view = view;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.review = review;
  vm.reasig = reasig;
  vm.reloadData = reloadData;
  vm.dtInstance = {};
  vm.selected = selected;
  vm.persons = {};
  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.tracking = [];
      $scope.pedidos = [];

     $timeout(function() {
       $http(req).then(function(response){
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          $scope.pedidos = response.data.pedidos;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].motorizado_nombre = '-';
            for (var j = 0; j < $scope.motos.length; j++) {
              $scope.motos[j].motorizado_nombre = $scope.motos[j].name + ' ' + $scope.motos[j].apellidos;
              if ($scope.motos[j].id == $scope.pedidos[i].motorizado_id) {
                $scope.pedidos[i].motorizado_nombre = $scope.motos[j].name + ' ' + $scope.motos[j].apellidos;
              }
            }
            if ($scope.pedidos[i].destinos[0].subtotal == 0) {
              $scope.pedidos[i].destinos[0].descuento = 0;
            }
            $scope.pedidos[i].destinos[0].total = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
            if ($scope.pedidos[i].estado != 0 && $scope.motorizado == 0) {
              $scope.tracking.push($scope.pedidos[i]);
            }
            if ($scope.pedidos[i].estado == 0 && $scope.motorizado == 0) {
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                if ($scope.pedidos[i].destinos[j].estado_destino == 1 || $scope.pedidos[i].destinos[j].estado_destino == 2) {
                  $scope.ctn = 1;
                }  
              }
              if ($scope.ctn == 1) {
                $scope.tracking.push($scope.pedidos[i]);
                $scope.ctn = 0;
              }
            }
            if ($scope.pedidos[i].estado != 0 && $scope.motorizado === $scope.pedidos[i].motorizado_nombre) {
              $scope.tracking.push($scope.pedidos[i]);
            } 
            if ($scope.pedidos[i].estado == 0 && $scope.motorizado == $scope.pedidos[i].motorizado_nombre) {
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                if ($scope.pedidos[i].destinos[j].estado_destino == 1 || $scope.pedidos[i].destinos[j].estado_destino == 2) {
                  $scope.ctn = 1;
                }  
              }
              if ($scope.ctn == 1) {
                $scope.tracking.push($scope.pedidos[i]);
                $scope.ctn = 0;
              }
            }
            count = count + 1;
          }
        }
        if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
          console.log($scope.tracking);
        }
      }, function(){
        console.log('error');
      })
    }, 1000);
      return defer.promise;
    
    })
    .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Pedido:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')
      .withOption('order', [0, 'desc'])
      .withOption('rowCallback', rowCallback)
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').notVisible(),
    DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(multiHtml),
    DTColumnBuilder.newColumn(null).withTitle('Orden de Despacho').notSortable().renderWith(ordenHtml),
    DTColumnBuilder.newColumn('nombre').withTitle('Cliente'),
    DTColumnBuilder.newColumn(null).withTitle('Horario de recojo').notSortable().renderWith(horaOrigenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Cliente Final').notSortable().renderWith(origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Fecha de Entrega').notSortable().renderWith(horaHtml),
    DTColumnBuilder.newColumn(null).withTitle('Hora Programada').notSortable().renderWith(horaprogHtml),
    DTColumnBuilder.newColumn(null).withTitle('Motorizado').notSortable().renderWith(motoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Estado').notSortable().renderWith(estadoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml),
    DTColumnBuilder.newColumn(null).withTitle('Activar Reprogramar').notSortable().renderWith(reprogramarHtml)
  ];

  function reloadData() {  
    var resetPaging = true;
    vm.dtInstance.reloadData(null, resetPaging);
  }

  $interval(reloadData, 90000);
  
  function view(pedido) {  
    
    $scope.pedido = pedido;
    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      CONFIG.CLIENTE = response.data.user;
      showTabDialog();       
    }, function(){
      console.log('error');
    });

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/pedido.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope) { 

      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.pedidos_detalle = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;
      $scope.destinos = $scope.pedidos_detalle.destinos;
      $scope.destinos.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if ($scope.pedidos_detalle.reprogramado > 0) {
        $scope.pedidos_detalle.tipo = 'REPROGRAMADO';
      }

      if ($scope.pedidos_detalle.tipo == 'PROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'REPROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'URGENTE') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy HH:mm:ss');
      }

      if ($scope.pedidos_detalle.estado == 0) {
        $scope.pedidos_detalle.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos_detalle.estado == 1) {
        $scope.pedidos_detalle.estado = 'ASIGNADO';
      }
      if ($scope.pedidos_detalle.estado == 2) {
        $scope.pedidos_detalle.estado = 'EN CAMINO';
      }
      if ($scope.pedidos_detalle.estado == 3) {
        $scope.pedidos_detalle.estado = 'FINALIZADO';
      }
      if ($scope.pedidos_detalle.estado == 4) {
        $scope.pedidos_detalle.estado = 'ANULADO';
      }

      if ($scope.pedidos_detalle.forma_pago == 0) {
        $scope.pedidos_detalle.forma_pago = 'EFECTIVO';
      }
      if ($scope.pedidos_detalle.forma_pago == 1) {
        $scope.pedidos_detalle.forma_pago = 'TRANSFERENCIA';
      }
      if ($scope.pedidos_detalle.forma_pago == 2) {
        $scope.pedidos_detalle.forma_pago = 'POS VISA';
      }

      if ($scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
        $scope.pedidos_detalle.fecha_origen1 = $filter('date')(new Date($scope.pedidos_detalle.fecha_origen),'dd/MM/yyyy');
        $scope.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
      }

      $scope.costo = parseFloat($scope.pedidos_detalle.costo) + parseFloat($scope.pedidos_detalle.costo_recojo);
      $scope.costoe = parseFloat($scope.pedidos_detalle.costo);
    
      if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.costo_recojo = 0;

        if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
        } else {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
        }
        $scope.costo = parseFloat($scope.costoe) + parseFloat($scope.pedidos_detalle.costo_recojo);
      }

      for (var i = 0; i < $scope.destinos.length; i++) {
        $scope.destinos[i].costo1 = parseFloat($scope.destinos[i].costo);
        if ($scope.destinos[i].subtotal == 0) {
          $scope.destinos[i].descuento = 0;
        }
        $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
        if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
          if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
          } else {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
          }
        }     
      }

      $scope.imprimir = function(pedido) {  
        if(document.getElementById("detalle_pedidos") != null){
          var pedidos = document.getElementById("detalle_pedidos").innerHTML;  
        }  

        $timeout(function() {     
          var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
          popupWinindow.document.close();
          }, 500);
      }

      $scope.getLetter = function(index) {
        return String.fromCharCode(65+index);
      };

      $scope.cancelar = function() {
        $mdDialog.cancel();
      };

      $scope.gPlace;

      $timeout(function() {
          $scope.consola();
      }, 500);

      /************************* Definición de las Variables **********************/
      $scope.contador=1;
      var miUbicacion={};
      var misDestinos={};
      $scope.ruta=[{}];
      $scope.rutaG=[];
      var geocoder= new google.maps.Geocoder();
      var markers = [];
      directionsDisplays=[];
      var marcador={};

      /************************* FIN Definición de las Variables **********************/

      var circle = new google.maps.Circle({
              center: {lat:  -12.1056553, lng: -77.0369909},
              radius: 10*1000
      });
      $scope.autocompleteOptions = {
              bounds: circle.getBounds(),
              componentRestrictions: {country: 'pe'}
      }
    
      var lima={
          lat: -12.046374,
          lng: -77.042793
      }

      /************************* FUNCION INICIALIZACIÓN DEL MAPA **********************/    
      
      initMap= function(){
            $timeout(function() {
            var mapDiv=document.getElementById('map2');
            
            var mapOptions={
            center: lima,
            zoom:14,
            //styles: styles
            }
        $scope.map= new google.maps.Map(mapDiv,mapOptions);
        }, 300);
        
    
        //searchPlace();
      } 
      
      initMap();

      /************************* FIN FUNCION INICIALIZACIÓN DEL MAPA **********************/   

      /************************* FUNCION MARCADORES **********************/ 

      addMarker= function(ubicacion,i){
        var pin = ["images/0.png",
                   "images/1.png",
                   "images/2.png",
                   "images/3.png",
                   "images/4.png",
                   "images/5.png",
                   "images/6.png",
                   "images/7.png",
                   "images/8.png",
                   "images/9.png",
                   "images/10.png",
                   "images/11.png",
                   "images/12.png",
                   "images/13.png",
                   "images/14.png",
                   "images/15.png"
        ];
        var marker= new google.maps.Marker({
            map: $scope.map,
            position: ubicacion,
            icon: pin[i],
            draggable: true
            //animation: google.maps.Animation.DROP
        })

        markers.push(marker);
      }
      
      /************************* FIN FUNCION MARCADORES **********************/    
   
      /************************* FUNCION TRAZADO DE RUTAS **********************/  
      traceRoute= function(rutas){

        if(rutas){
            for (var i = 0; i < directionsDisplays.length; i++) {
                //console.log(directionsDisplays[i]);
            directionsDisplays[i].setMap(null);
            }
        }   

        var directionsDisplay= new google.maps.DirectionsRenderer({
                polylineOptions: {strokeColor: "#029ed1"},
            });
        directionsDisplays.push(directionsDisplay);
        var directionsService= new google.maps.DirectionsService();   
        var npoints = rutas.length;
        
        $timeout(function() {
            directionsDisplay.setMap($scope.map);
            
            var request={
              destination: rutas[npoints-1],
              origin: rutas[1],
              travelMode: google.maps.TravelMode.DRIVING, 
              drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: google.maps.TrafficModel.PESSIMISTIC,
              }
            }

            if ( npoints > 2 ){
              request.waypoints = [];

              for ( i = 1; i < npoints - 1 ;i++){
                request.waypoints.push({
                  location: rutas[i],
                  stopover: true
                });
                // console.log("ORDER WAYPOINTS", request.waypoints);
              }
            }
            // console.log(request);
            request.optimizeWaypoints = true;
      
            directionsService.route(request,function(response,status){
              if(status==google.maps.DirectionsStatus.OK){
                directionsDisplay.setOptions({ suppressMarkers: true });
                directionsDisplay.setDirections(response);
                // console.log(response.routes[0].legs.length);
                for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                 // duration=duration+response.routes[0].legs[i].duration.value;
                }
                for (var i = 0 ; i < $scope.pedidos_detalle.length ; i++) {
                  $scope.pedidos_detalle[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
                }                
              }
            })     
          }, 500);
        }
      /************************* FIN FUNCION TRAZADO DE RUTAS **********************/  


    
      /************************* FIN FUNCIONES INTERCAMBIAR POSICIÓN **********************/ 
      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      /************************* FUNCION MOSTRAR RUTAS **********************/ 

      $scope.consola = function(){
        //alert('me llamo');

        $scope.ruta.push({
            'lat':parseFloat($scope.destinos[0].lat),
            'lng':parseFloat($scope.destinos[0].lng)
        });

        for (var i = 0; i < $scope.destinos.length; i++) {
          console.log($scope.destinos[i].lat2);
          console.log($scope.destinos[i].lng2);
            marcador.lat=parseFloat($scope.destinos[i].lat2);
            marcador.lng=parseFloat($scope.destinos[i].lng2);
            $scope.ruta.push({
              'lat':marcador.lat,
              'lng':marcador.lng
            });
        }
        for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
        }
        $timeout(function() {
          console.log($scope.ruta);
          traceRoute($scope.ruta);
          for (var i = 1; i < $scope.ruta.length+1; i++) {
            addMarker($scope.ruta[i],i-1);
          }
        }, 200);
        $timeout(function() {
          $scope.ruta=[{}]; 
        }, 1400);
        
      };
    };
  }

  function edit(person) {

    $scope.estado_pedido = {
      estado: 3
    }

    /*$scope.estado_motorizado = {
      estado: 0
    }*/

    $scope.estado_destino = {
      estado_destino: 3
    }

    /*var reqM = {
      method: 'GET',
      url: '../api/public/api/posicion',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }*/

    $scope.id_posicion = '';
    $scope.id_motorizados = [];


    /*$http(reqM).then(function(response){
      var motos = response.data;
      console.log(motos);
      for (var i = 0; i < motos.length; i++) {
        if (motos[i].motorizado_id == person.motorizado_id) {
          $scope.id_motorizados.push(motos[i].id);
        }
      }
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });*/

    var confirm = $mdDialog.prompt()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea finalizar el pedido de '+ person.nombre +'?')
      .placeholder('Observaciones...')
      .ariaLabel('Dog name')
      .initialValue('')
      .ok('SI')
      .cancel('NO');

    $mdDialog.show(confirm).then(function(result) {

      $scope.estado_pedido.motivo = result;

      var req = {
        method: 'PUT',
        url: '../api/public/api/update_pedidos/' + person.id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.estado_pedido
      }

      $scope.count2 = 0;
      $scope.bandera2 = 0;
      var destinos_id = person.destinos;
      $scope.count = 0;
      $scope.bandera = 0;

      for (var j = 0; j < destinos_id.length; j++) {
        var reqD = {
          method: 'PUT',
          url: '../api/public/api/update_destinos/' + destinos_id[j].id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_destino
        }

        $http(reqD).then(function(response){
          $scope.count = $scope.count + 1;
          if ($scope.count == destinos_id.length) {
            $http(req).then(function(response){
              console.log(response.data);
              if(response.data == ''){
                reloadData();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El pedido fue finalizado con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
            }, function(){
              $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
            });
          }
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }

      /*for (var i = 0; i < $scope.id_motorizados.length; i++) {
        var reqE = {
          method: 'PUT',
          url: '../api/public/api/update_posicion/' + $scope.id_motorizados[i],
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_motorizado
        }

        $http(reqE).then(function(response){
          $scope.count2 += 1;
          if ($scope.count2 == $scope.id_motorizados.length) {
            for (var j = 0; j < destinos_id.length; j++) {
              var reqD = {
                method: 'PUT',
                url: '../api/public/api/update_destinos/' + destinos_id[j].id,
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.estado_destino
              }

              $http(reqD).then(function(response){
                  $scope.count = $scope.count + 1;
                  if ($scope.count == destinos_id.length) {
                    $http(req).then(function(response){
                      console.log(response.data);
                      if(response.data == ''){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido fue finalizado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      }
                    }, function(){
                      $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                    });
                  }
                }, function(){
                  $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                });
            }
          }
        }, function(){
          $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
        });
      }*/

    }, function() {
      
    });
  }

  function review(pedido) {

    $scope.pedido = pedido;
    $scope.pedido.costo_mostrar1 = '';
    $scope.pedido.costo_mostrar2 = '';

    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      var user = response.data.user;
      showTabDialog(user);       
    }, function(){
      console.log('error');
    });
   
    var showTabDialog = function(user) {
      $mdDialog.show({
        locals:{data: $scope.pedido, data1: user}, 
        templateUrl: 'templates/reprogramar.html',
        parent: angular.element(document.body),
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,data1, $timeout,$rootScope,$filter) { 

      $scope.pedido = data;
      $scope.user = data1;
      $scope.pedido.costo_mostrar1 =  $scope.pedido.costo;
      $scope.info = $scope.pedido;

      if ($scope.pedido.reprogramado > 0 && $scope.user.tipo_usuario == 3) {
        if (parseFloat($scope.pedido.costo) > parseFloat($scope.pedido.costo_reprogramacion)) {
          $scope.pedido.costo_mostrar1 = $scope.pedido.costo - $scope.pedido.costo_reprogramacion;
        } else {
          $scope.pedido.costo_mostrar1 = $scope.pedido.costo_reprogramacion - $scope.pedido.costo;
        }
      }

      $scope.Motivo = [{'id': 0, 'motivo':'No contesta Cliente Final ni E-commerce'},{'id': 1,'motivo':'E-commerce Reprogramó'},{'id': 2,'motivo':'Liebre Programa'},{'id': 3,'motivo':'Otros'}];
      $scope.selectHora=[{'hora':'09'},{'hora':'10'},{'hora':'11'},{'hora':'12'},{'hora':'13'},{'hora':'14'},{'hora':'15'},{'hora':'16'},{'hora':'17'},{'hora':'18'},{'hora':'19'}]; 
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'},{'id': 3,'horario':'2 Horas'}];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'},{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}];
      $scope.date = CONFIG.DATE;
      $scope.minDate = new Date($scope.date);
      $scope.pedido.observacion = '';
      $scope.hora2 = '';
      $scope.motivo = $scope.Motivo[2].motivo;

      var SwitchFuction = function (sno) {
        switch (sno) {
          case '09':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,9)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '10':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,10)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '11':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,11)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '12':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,12)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '13':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,13)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '14':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,14)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '15':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,15)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '16':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,16)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '17':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,17)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '18':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,18)),'yyyy-MM-dd HH:mm:ss');
            break;
          case '19':
            $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,19)),'yyyy-MM-dd HH:mm:ss');
            break;
          default:
        }
      }

      var SwitchFuction1 = function (sno) {
        if ($scope.user.tipo_usuario == 3) {
          switch (sno) {
            case 0:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,14)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 1:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,19)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 2:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,19)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 3:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,11)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 4:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,12)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 5:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,13)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 6:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,14)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 7:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,15)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 8:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,16)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 9:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,17)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 10:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,18)),'yyyy-MM-dd HH:mm:ss');
              break;
            case 11:
              $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,19)),'yyyy-MM-dd HH:mm:ss');
              break;
            default:

          }
        }
      }

      var SwitchCosto = function (sno,pedido) {

        if ($scope.user.tipo_usuario == 3) {
          switch (sno) {
            case 0:
              pedido.costor = parseFloat($scope.costos[0].ecommerce_manana);
              console.log(pedido.costor);
              break;
            case 1:
              pedido.costor = parseFloat($scope.costos[0].ecommerce_tarde);
              console.log(pedido.costo);
              break;
            case 2:
              pedido.costor = parseFloat($scope.costos[0].ecommerce_completo);
              console.log(pedido.costor);
              break;
            case 3:
              pedido.costor = parseFloat($scope.costos[0].ecommerce_horas);
              console.log(pedido.costor);
              break;
            default:
          }

          if (parseFloat($scope.pedido.costo_mostrar1) > parseFloat($scope.pedido.costor)){
            $scope.pedido.costo_mostrar2 = $scope.pedido.costo_mostrar1 - $scope.pedido.costor; 
          } else {
            $scope.pedido.costo_mostrar2 = $scope.pedido.costor - $scope.pedido.costo_mostrar1;
          }
        }
      }

      if ($scope.pedido.tipo_usuario == 3) {
        $scope.myDate = new Date($scope.pedido.destinos[0].fecha_destino);
        $scope.pedido.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.pedido.destinos[0].fecha_destino),'dd/MM/yyyy');
        $scope.diaPedido = $filter('date')(new Date($scope.pedido.destinos[0].fecha_destino),'yyyy-MM-dd HH:mm:ss');
        $scope.horaPedido2 = $scope.seleccionarHorario[$scope.pedido.destinos[0].turno_destino].id;
        $scope.horario_e = $scope.seleccionarHorario[$scope.pedido.destinos[0].turno_destino].id;
        SwitchCosto($scope.horario_e,$scope.pedido);
        for (var i = 0; i < $scope.seleccionarHorae.length; i++) {
          if ($scope.seleccionarHorae[i].hora == $scope.pedido.destinos[0].hora_destino){
            $scope.horaPedido3 = $scope.seleccionarHorae[i];
            SwitchFuction1($scope.horaPedido3.value);
            $scope.horaPedido = $scope.seleccionarHorae[i].hora;
          }
        }
      }
      if ($scope.pedido.tipo_usuario != 3) {
        if ($scope.pedido.tipo == 'URGENTE') {
          $scope.myDate = new Date($scope.pedido.created_at);
          $scope.pedido.fecha1 = $filter('date')(new Date($scope.pedido.created_at),'dd/MM/yyyy');
          $scope.diaPedido = $filter('date')(new Date($scope.pedido.created_at),'yyyy-MM-dd HH:mm:ss');
          $scope.horaPedido = '';
        }
        if ($scope.pedido.tipo == 'PROGRAMADO') {
          $scope.myDate = new Date($scope.pedido.fecha);
          $scope.pedido.fecha1 = $filter('date')(new Date($scope.pedido.fecha),'dd/MM/yyyy');
          $scope.diaPedido = $filter('date')(new Date($scope.pedido.fecha),'yyyy-MM-dd HH:mm:ss');
          for (var i = 0; i < $scope.selectHora.length; i++) {
            if ($scope.selectHora[i].hora == $scope.pedido.hora){
              $scope.horaPedido1 = $scope.selectHora[i];
              $scope.horaPedido = $scope.selectHora[i].hora;
              SwitchFuction($scope.horaPedido);
            }
          }
        }
      }
      
      $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6;
      };

      $scope.ajusteFecha=function(myDate){
        $scope.diaPedido = $filter('date')(new Date(myDate),'yyyy-MM-dd HH:mm:ss');
        if ($scope.user.tipo_usuario != 3) {
          SwitchFuction($scope.horaPedido);
        }else{
          SwitchFuction1($scope.horaPedido3.value);
        }
      }

      $scope.cambiaMotivo=function(motivo){
        $scope.motivo = motivo.motivo;
      }
      
      $scope.$watch(
        function($scope) { 
            return $scope.horaPedido 
        }, function() {

        });

      $scope.ajusteHora=function(data){
        $scope.horaPedido= data.hora;
        SwitchFuction(data.hora);
      }

      $scope.ajusteHora1=function(data){
        $scope.horario_e = data;
        $scope.horaPedido3 = $scope.seleccionarHorae[data];
        $scope.horaPedido = $scope.seleccionarHorae[data].hora;
        SwitchFuction1($scope.seleccionarHorae[data].value);
        SwitchCosto(data,$scope.pedido);
      }

      $scope.ajusteHora2=function(data){
        $scope.horaPedido= data.hora;
        SwitchFuction1(data.value);
      }

      function getFormattedDate(dateString,hour) {
        var date = new Date(dateString);
        date.setHours(hour, 0, 0);  
        return date.toString();
      }

      $scope.imprimir = function(pedido) {  
        if(document.getElementById("datos") != null){
          var pedidos = document.getElementById("datos").innerHTML;  
        }  

        $timeout(function() {     
          var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
          popupWinindow.document.close();
          }, 500);
      }

     /* var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        $scope.moto = response.data;
        for (var i = 0; i < $scope.moto.length; i++) {
          if ($scope.moto[i].motorizado_id == $scope.pedido.motorizado_id) {
            $scope.pedido.posicion = $scope.moto[i].id;
          }
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });*/

      $scope.reprogramar = function() {
        if ($scope.horaPedido == '') {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Debe seleccionar el horario a reprogramar')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          return true;
        }
        if ($scope.pedido.reprogramado == 0) {

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            hora: $scope.horaPedido,
            tipo: 'PROGRAMADO',
            reprogramado: 1
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            estado_destino: 0
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramar_pedido
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + $scope.pedido.posicion,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado_motorizado
          }*/

          var destinos_id = $scope.pedido.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          $scope.info.cancelado = 0;
          $scope.info.tipo = 'PROGRAMADO';
          $scope.info.reprogramado = 1;
          $scope.info.tabla = 1;
          $scope.info = JSON.stringify($scope.pedido);

          $scope.reprogramados = {
            fecha: $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'),
            info: $scope.info,
            n_reprogramado: 1,
            pedido_id: $scope.pedido.id
          }

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      $http(reqR).then(function(response){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido fue reprogramado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      }, function(){
                        console.log('error');
                      });
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue reprogramado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        } else if ($scope.pedido.reprogramado > 0) {

          $scope.pedido.costo = parseFloat($scope.pedido.costo) + parseFloat(parseFloat($scope.pedido.costo)*parseFloat($scope.costos[0].reprog_persona));

          var reprog = parseFloat(parseFloat($scope.pedido.costo)*parseFloat($scope.costos[0].reprog_persona));

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            cancelado: 0,
            hora: $scope.horaPedido,
            tipo: 'PROGRAMADO',
            reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            costo: $scope.pedido.costo,
            costo_reprogramacion: reprog
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            estado_destino: 0
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramar_pedido
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + $scope.pedido.posicion,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado_motorizado
          }*/

          var destinos_id = $scope.pedido.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          $scope.info.cancelado = 0;
          $scope.info.tipo = 'PROGRAMADO';
          $scope.info.reprogramado = parseInt($scope.pedido.reprogramado) + 1;
          $scope.info.costo = $scope.pedido.costo;
          $scope.info.costo_reprogramacion = $scope.pedido.costor;
          $scope.info.tabla = 1;
          $scope.info = JSON.stringify($scope.pedido);

          $scope.reprogramados = {
            fecha: $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'),
            info: $scope.info,
            n_reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            pedido_id: $scope.pedido.id
          }

          var reqR = {
            method: 'POST',
            url: '../api/public/api/reprogramados/store',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }
          

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      $http(reqR).then(function(response){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido fue reprogramado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      }, function(){
                        console.log('error');
                      });
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue reprogramado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        }
      };

      $scope.reprogramar_ecommerce = function() {

        if ($scope.horaPedido == '') {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Debe seleccionar el horario a reprogramar')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          return true;
        }

        if ($scope.pedido.reprogramado == 0) {

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            tipo: 'PROGRAMADO',
            reprogramado: 1,
            motivo: $scope.motivo + ': ' + $scope.pedido.observacion,
            costo: $scope.pedido.costo,
            costo_reprogramacion: $scope.pedido.costor
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            estado_destino: 0,
            fecha_destino: $scope.diaPedido,
            turno_destino: $scope.horario_e,
            hora_destino: $scope.horaPedido,
            costo: $scope.pedido.costo
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramar_pedido
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + $scope.pedido.posicion,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado_motorizado
          }*/

          var destinos_id = $scope.pedido.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          $scope.info.cancelado = 0;
          $scope.info.reprogramado = 1;
          $scope.info.motivo = $scope.motivo + ': ' + $scope.pedido.observacion;
          $scope.info.costo = $scope.pedido.costo;
          $scope.info.costo_reprogramacion = $scope.pedido.costor;
          $scope.info.tabla = 1;
          $scope.info = JSON.stringify($scope.pedido);

          $scope.reprogramados = {
            fecha: $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'),
            info: $scope.info,
            n_reprogramado: 1,
            pedido_id: $scope.pedido.id
          }

          var reqR = {
            method: 'POST',
            url: '../api/public/api/reprogramados/store',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      $http(reqR).then(function(response){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido fue reprogramado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      },function(response){
                        console.log(response.data);
                      })
                      
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue reprogramado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                   }
                  }, function(){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        } 

        else if ($scope.pedido.reprogramado > 0) {

          if (parseFloat($scope.pedido.costo) > parseFloat($scope.pedido.costo_reprogramacion)){
            $scope.pedido.costo = $scope.pedido.costo - $scope.pedido.costo_reprogramacion; 
          } else {
            $scope.pedido.costo = $scope.pedido.costo_reprogramacion - $scope.pedido.costo;
          }

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            cancelado: 0,
            tipo: 'PROGRAMADO',
            reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            motivo: $scope.motivo + ': ' + $scope.pedido.observacion,
            costo: $scope.pedido.costo,
            costo_reprogramacion: $scope.pedido.costor
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            fecha_destino: $scope.diaPedido,
            turno_destino: $scope.horario_e,
            hora_destino: $scope.horaPedido,
            estado_destino: 0,
            costo: $scope.pedido.costo
          }

          $scope.info.cancelado = 0;
          $scope.info.reprogramado = parseInt($scope.pedido.reprogramado) + 1;
          $scope.info.motivo = $scope.motivo + ': ' + $scope.pedido.observacion;
          $scope.info.costo = $scope.pedido.costo;
          $scope.info.costo_reprogramacion = $scope.pedido.costor;
          $scope.info.tabla = 1;
          $scope.info = JSON.stringify($scope.pedido);

          $scope.reprogramados = {
            fecha: $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'),
            info: $scope.info,
            n_reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            pedido_id: $scope.pedido.id
          }

          var reqR = {
            method: 'POST',
            url: '../api/public/api/reprogramados/store',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramar_pedido
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + $scope.pedido.posicion,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado_motorizado
          }*/

          var destinos_id = $scope.pedido.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      $http(reqR).then(function(response){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido fue reprogramado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      },function(response){
                        console.log(response.data);
                      })
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue reprogramado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
            }, function(){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }
        }
      }

      $scope.cancelar = function() {
        $mdDialog.cancel();
      };
    }
  }

  function reasig(person) {

    $mdDialog.show({
      controller: DialogController,
      locals:{data: person}, 
      templateUrl: 'templates/select_motorizado.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
    
    function DialogController($scope, $mdDialog,data) {
      $scope.pedidos = data;
      $scope.distancias = [];

      var req = {
        method: 'GET',
        url: '../api/public/api/motorizado',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data);
        $scope.motori=response.data.motorizados;
        for (var j = 0; j < $scope.motori.length; j++) {
          if ($scope.motori[j].tipo_auto == 1) {
            $scope.motori[j].tipo = 'Moto';
          } else if ($scope.motori[j].tipo_auto == 2) {
            $scope.motori[j].tipo = 'Auto';
          } else if ($scope.motori[j].tipo_auto == 3) {
            $scope.motori[j].tipo = 'Furgoneta';
          }
          $scope.distancias.push({
            nombre: $scope.motori[j].name + ' ' + $scope.motori[j].apellidos,
            telefono: $scope.motori[j].telefono,
            img: $scope.motori[j].foto,
            tipo: $scope.motori[j].tipo,
            motorizado_id: $scope.motori[j].id,
            push: $scope.motori[j].push
          })
          CONFIG.MOTORIZADOS = $scope.motori;
        }
      }, function(){
        console.log('error');
      });

      /*var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        var motos = response.data;
        var j=0;
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].estado == 0) {
            $scope.distancias.push(motos[i]);
          }
          j=j+1;  
        }
        if(motos.length==j){
          $scope.calcDistancia();
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      $scope.calcDistancia=function(){
          var lat= parseFloat($scope.pedidos.destinos[0].lat);
          var lng= parseFloat($scope.pedidos.destinos[0].lng);

          var R = 6371; // Radio tierra en Km
          var dLat = '';
          var dLon = '';
          var a = '';
          var c = ''; 
          var d = '';
          for (var i = 0; i <=$scope.distancias.length-1; i++) {
            R = 6371; // Radio tierra en Km
            dLat = 0;
            dLon = 0;
            a = 0;
            c = 0; 
            d = 0;
            dLat = ($scope.distancias[i].lat-lat) * Math.PI / 180;
            dLon = ($scope.distancias[i].lng-lng) * Math.PI / 180;
            lat1 = lat * Math.PI / 180;
            lat2 = $scope.distancias[i].lat* Math.PI / 180;
            a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            d = R * c;
            $scope.distancias[i].distancia=d;
            for (var j = 0; j < $scope.motori.length; j++) {
              if($scope.motori[j].id==$scope.distancias[i].motorizado_id){
                $scope.distancias[i].nombre=$scope.motori[j].name + ' ' + $scope.motori[j].apellidos;
                $scope.distancias[i].telefono=$scope.motori[j].telefono;
                $scope.distancias[i].img=$scope.motori[j].foto;
                if ($scope.motori[j].tipo_auto == 1) {
                  $scope.distancias[i].tipo = 'Moto';
                } else if ($scope.motori[j].tipo_auto == 2) {
                  $scope.distancias[i].tipo = 'Auto';
                } else if ($scope.motori[j].tipo_auto == 3) {
                  $scope.distancias[i].tipo = 'Furgoneta';
                }
              }
            }
          }
          setTimeout(function() {
            $scope.distancias.sort(function(a, b) {
              return a.distancia - b.distancia;
            });
          }, 300);
          setTimeout(function() {
            $scope.$apply();
          }, 400);
      }*/

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.select_moto = function(item) {
        console.log(item);
        $scope.estado = {
          estado: 1,
          motorizado_id: item.motorizado_id
        }

        /*$scope.estado2 = {
          estado: 1
        }*/

        $scope.estado_destino = {
          estado_destino: 1,
          motorizado_id: item.motorizado_id
        }

        var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea asignar el pedido al motorizado '+ item.nombre +'?')
          .ariaLabel('Lucky day')
          .ok('SI')
          .cancel('NO');

        $mdDialog.show(confirm).then(function() {
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedidos.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + item.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado2
          }*/

          var re_push = {
             method: 'GET',
             url: '../Motorizado5/onesignalMotorizado.php',
             headers: {
               'ID' : item.push
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: ''
          }
                  
          var destinos_id = $scope.pedidos.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      reloadData();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('El pedido fue reasignado con éxito')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                      $http(re_push).then(function(response){
                        console.log(response.data);
                      }, function(){
                        console.log('ha ocurrido un error al enviar el push');
                      });
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue asignado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        }, function() {
          
        });
      };
    }
  }

  function horaOrigenHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.fecha_origen),'dd/MM/yyyy');
    return $variable;
  }

  function horaprogHtml(data, type, full, meta) {

    if (data.tipo_usuario != 3) {
      $variable = data.hora;
      if (data.tipo == 'URGENTE') {
        $variable = '-';
      } 
    }

    if (data.tipo_usuario == 3) {
      $variable = data.destinos[0].hora_destino;
    }
    return $variable;
  }

  function deleteRow(person) {

    $scope.pedidos = person;
    $scope.estado_pedido = {
      motivo: ''
    }

    $scope.estado = {
      costo: 0
    }

    var reqEs = {
      method: 'PUT',
      url: '../api/public/api/update_destinos/' + $scope.pedidos.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: $scope.estado
    }


    var confirm = $mdDialog.prompt()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea anular el pedido de '+ $scope.pedidos.nombre +'?')
      .placeholder('Por favor, ingrese el motivo...')
      .ariaLabel('Dog name')
      .initialValue('')
      .ok('Rechazar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {

      $scope.estado_pedido.motivo = result;

      var req = {
        method: 'GET',
        url: '../api/public/api/devolucion/' + $scope.pedidos.id+'?motivo='+$scope.estado_pedido.motivo,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.estado_pedido
      }

      $http(req).then(function(response){
        console.log(response.data);
        if(response.data == ''){
          $http(reqEs).then(function(response){
            console.log(response.data);
            if(response.data == ''){
              reloadData();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El pedido fue anulado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }

  function createdRow(row, data, dataIndex) {

    //ASIGNADO
    if (data.tipo == 'PROGRAMADO' && data.estado != 2 && data.tipo_usuario != 3) {
      if (moment(data.fecha).subtract(10, 'minutes').isBefore() && moment().isBefore(data.fecha, 'minutes')){
        angular.element(row).addClass('orange');
      }
      if (moment(data.fecha).isBefore() && data.estado != 2) {
        angular.element(row).addClass('red');
      } 
    }

    if (data.tipo == 'PROGRAMADO' && data.estado != 2 && data.tipo_usuario == 3) {
      if (moment(data.destinos[0].fecha_destino).subtract(10, 'minutes').isBefore() && moment().isBefore(data.destinos[0].fecha_destino, 'minutes')){
        angular.element(row).addClass('orange');
      }
      if (moment(data.destinos[0].fecha_destino).isBefore() && data.estado != 2) {
        angular.element(row).addClass('red');
      }
    }

    if (data.tipo == 'URGENTE' && data.estado != 2) {
      if (moment(data.created_at).add(10, 'minutes').isBefore() && data.estado != 2) {
        angular.element(row).addClass('red');
      } else if (moment(data.created_at).add(5, 'minutes').isBefore() && data.estado != 2) {
        angular.element(row).addClass('orange');
      }
    }

    // EN CAMINO
    if (data.tipo == 'PROGRAMADO' && data.estado == 2 && data.tipo_usuario != 3) {
      if (moment(data.fecha).subtract(10, 'minutes').isBefore() && moment().isBefore(data.fecha, 'minutes')){
        angular.element(row).addClass('celeste');
      }
      if (moment(data.fecha).isBefore() && data.estado == 2) {
        angular.element(row).addClass('red');
      } 
    }

    if (data.tipo == 'PROGRAMADO' && data.estado == 2 && data.tipo_usuario == 3) {
      if (moment(data.destinos[0].fecha_destino).subtract(10, 'minutes').isBefore() && moment().isBefore(data.destinos[0].fecha_destino, 'minutes')){
        angular.element(row).addClass('celeste');
      }
      if (moment(data.destinos[0].fecha_destino).isBefore() && data.estado == 2) {
        angular.element(row).addClass('red');
      }
    }

    if (data.tipo == 'URGENTE' && data.estado == 2) {
      if (moment(data.created_at).add(90, 'minutes').isBefore() && data.estado == 2) {
        angular.element(row).addClass('red');
      }
    }

    if (data.estado == 6) {
      angular.element(row).addClass('red');
    }
    
    $compile(angular.element(row).contents())($scope); 
  }

  $scope.destinos = '';
  $scope.pedidos = '';
  $scope.idpedido = '';
  $scope.cliente = '';
  $scope.destinos2 = '';

  function rowCallback(tabRow, data, dataIndex) {

    $(tabRow).unbind('click');
    $(tabRow).on('click', '#plus2', function () {
        console.log('entro');
        $(this).find('.fa-plus').toggleClass('fa-rotate-180');
        $scope.tr = $(tabRow);
        $scope.table = vm.dtInstance.DataTable;
        $scope.row = $scope.table.row($scope.tr);

        if ( $scope.row.child.isShown() ) {
            $scope.row.child.hide();
            $scope.tr.removeClass('shown');
        }
        else {
            $scope.row.child( format($scope.row.data()) ).show();
            $scope.tr.addClass('shown');
        }
    });

    $('.tabla_encurso tbody').unbind('click');
    $('.tabla_encurso tbody').on('click', '.button_print2', function (e) {
      $scope.destinos = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      console.log(rowData);
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.pedidos = rowData;
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.costo = parseFloat(rowData.costo);
      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.dest = rowData.destinos;
      
      $scope.dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest.length; i++) {
        if(i == id){
          $scope.destinos = $scope.dest[i];
          $scope.$apply();
        }
      }

      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+rowData.user_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $scope.cliente = response.data.user;
        console.log($scope.cliente.dnis);
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      setTimeout(function() {$scope.imprimir();console.log($scope.destinos);}, 500);
    });

    $('.tabla_encurso tbody').on('click', '.button_moto', function (e) {
      $scope.destinos2 = '';
      $scope.contador = 0;
      $scope.bandera = 0;

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      $scope.dest2 = rowData.destinos;
      
      $scope.dest2.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest2.length; i++) {
        if(i == id){
          $scope.destinos2 = $scope.dest2[i];
          $scope.bandera = 1;
        }
        if ($scope.dest2[i].estado_destino == 2) {
          $scope.contador += 1;
        }
      }

      /*var reqM = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }*/

      $scope.id_posicion = '';
      $scope.id_motorizados = '';

      /*$http(reqM).then(function(response){
        var motos = response.data;
        console.log(motos);
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].motorizado_id == $scope.destinos2.motorizado_id) {
            $scope.id_motorizados = motos[i].id;
          }
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      })*/

      $scope.estado = {
        estado_destino: 3
      }

      /*$scope.estado2 = {
        estado: 0
      }*/

      $scope.estado_pedido = {
        estado: 3
      }

      if ($scope.bandera == 1) {

        var confirm = $mdDialog.prompt()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea finalizar el pedido de '+ rowData.nombre +'?')
          .placeholder('Observaciones...')
          .ariaLabel('Dog name')
          .initialValue('')
          .ok('SI')
          .cancel('NO');

        $mdDialog.show(confirm).then(function(result) {

          $scope.estado_pedido.motivo = result;

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_destinos/' + $scope.destinos2.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado
          }

          var reqP = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + rowData.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado_pedido
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + $scope.id_motorizados,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado2
          }*/

          $http(req).then(function(response){
            console.log(response.data);
            if(response.data == ''){
              //$http(reqE).then(function(response){
                //if(response.data == ''){
                  if ($scope.contador == 1) {
                    $http(reqP).then(function(response){
                      if(response.data == ''){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El subpedido fue finalizado con éxito')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      }
                    }, function(){
                      $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                    });
                  } else {
                    reloadData();
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('El subpedido fue finalizado con éxito')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  }
                //}
              /*}, function(){
                $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
              });*/
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        })
      };
    });

    $('.tabla_encurso tbody').on('click', '.button_delete', function (e) {
      $scope.destinos2 = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      $scope.dest2 = rowData.destinos;
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.contador = 0;
      $scope.id_pedido = rowData.id;
      
      $scope.dest2.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest2.length; i++) {
        if(i == id){
          $scope.destinos2 = $scope.dest2[i];
        }
        if ($scope.dest2[i].estado_destino == 2) {
          $scope.contador += 1;
        }
      }

      $scope.estado_destino = {
        estado_destino: 4,
        motivo: ''
      }

      $scope.estado_pedido = {
        estado: 4
      }

      /*$scope.estado_motorizado = {
        estado: 0
      }*/

      /*var reqM = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $scope.id_motorizados = '';

      $http(reqM).then(function(response){
        var motos = response.data;
        console.log(motos);
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].destino_id == $scope.destinos2.id) {
            $scope.id_motorizados = motos[i].id;
          }
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      })*/

      var confirm = $mdDialog.prompt()
        .title('Courier Liebre Express | Administrativo')
        .textContent('¿Desea anular el subpedido '+ $scope.idpedido +'?')
        .placeholder('Por favor, ingrese el motivo...')
        .ariaLabel('Dog name')
        .initialValue('')
        .ok('Rechazar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {

        $scope.estado_destino.motivo = result;

        var req = {
          method: 'PUT',
          url: '../api/public/api/update_destinos/' + $scope.destinos2.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_destino
        }

        var reqP = {
          method: 'PUT',
          url: '../api/public/api/update_pedidos/' + $scope.id_pedido,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_pedido
        }

        /*var reqE = {
          method: 'PUT',
          url: '../api/public/api/update_posicion/' + $scope.id_motorizados,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.estado_motorizado
        }*/

        $http(req).then(function(response){
          console.log(response.data);
          if(response.data == ''){
            //$http(reqE).then(function(response){
              //if(response.data == ''){
                if ($scope.contador == 1) {
                  $http(reqP).then(function(response){
                    if(response.data == ''){
                      reloadData();
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('El subpedido fue anulado con éxito')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                    }
                  }, function(){
                    $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                  });
                } else {
                  reloadData();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El subpedido fue anulado con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                }
              //}
            /*}, function(){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });*/
          }
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, al anular el pedido')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      })
    }); 

    $(tabRow).on('click', '#select', function () {
        $scope.tr2 = $(tabRow);
        $scope.table2 = vm.dtInstance.DataTable;
        $scope.row2 = $scope.table2.row($scope.tr2);
        var rowData = $scope.row2.data();
        $scope.id_update = rowData.id;
        $scope.dest_update = rowData.destinos;
        
        if (rowData.estado_reprogramado == 0) {
          var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea permitir reprogramar el pedido LIE000'+ rowData.id +'?')
          .ariaLabel('Dog name')
          .ok('Permitir')
          .cancel('Cancelar');

          $mdDialog.show(confirm).then(function() {

            $scope.estado_update = {
              estado_reprogramado: 1,
              estado: 0
            }

            $scope.estado_destino = {
              estado_destino: 0
            }            
            var count_dest = 0;
            var req = {
              method: 'PUT',
              url: '../api/public/api/update_pedidos/' + $scope.id_update,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_update
            }

            for (var i = 0; i < $scope.dest_update.length; i++) {
              var req_destinos = {
                method: 'PUT',
                url: '../api/public/api/update_destinos/' + $scope.dest_update[i].id,
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.estado_destino
              }

              $http(req_destinos).then(function(response){
                console.log(response);
                if(response.data == ''){
                  count_dest = count_dest + 1;
                  if (count_dest == $scope.dest_update.length) {
                    $http(req).then(function(response){
                      if(response.data == ''){
                        reloadData();
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('El pedido se encuentra activo para reprogramar')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      }
                    }, function(){
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                    });
                  }  
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
            }
          }, function() {
            reloadData();
          }); 
        } /*else {
          var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea quitar el permiso para reprogramar el pedido LIE000'+ rowData.id +'?')
          .ariaLabel('Dog name')
          .ok('Quitar')
          .cancel('Cancelar');

          $mdDialog.show(confirm).then(function() {

            $scope.estado_update = {
              estado_reprogramado: 0
            }

            var req = {
              method: 'PUT',
              url: '../api/public/api/update_pedidos/' + $scope.id_update,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_update
            }

            $http(req).then(function(response){
              console.log(response.data);
              if(response.data == ''){
                reloadData();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El pedido se encuentra inactivo para reprogramar')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
            }, function(){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }, function() {
            
          }); 
        } */
        
    });
  }

  function format (d) {
    var html = '<table cellpadding="5" id="isrctable" ng-controller="ListadoenCursoCtrl" cellspacing="0" border="0" style="padding-left:50px;" width="100%">';
    var letter = 'A'.charCodeAt(0);
    $scope.dest = d.destinos;

    $scope.dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

      var motorizado = '';
      var estado = '';
    if (d.estado == 0) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.motos != '') {
          for (var j = 0; j < $scope.motos.length; j++) {
            if ($scope.motos[j].id == $scope.dest[i].motorizado_id) {
              motorizado = $scope.motos[j].name + ' ' + $scope.motos[j].apellidos;
            }
          }      
          if ($scope.dest[i].estado_destino == 1 || $scope.dest[i].estado_destino == 2) {

            if ($scope.dest[i].estado_destino == 1) {
              estado = 'ASIGNADO';
            }
            if ($scope.dest[i].estado_destino == 2) {
              estado = 'EN CAMINO';
            }
            console.log('5298');
            html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:1% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 5%;"></td><td class="ng-scope" style="width: 14%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 16%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 8%;"></td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 6%;">'+ motorizado +'</td><td class="ng-scope" style="width: 6%;">'+estado+'</td><td class="ng-scope" style="width: 12%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print2" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-check"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
          }
          letter += 1;
        }
      }
    }
    if (d.estado == 1) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 1) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:1% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 7%;"><td class="ng-scope" style="width: 13%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 15%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 8%;"><td class="ng-scope" style="width: 8%;"><td class="ng-scope" style="width: 7%;"><td class="ng-scope" style="width: 6%;"><td class="ng-scope" style="width: 12%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print2" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-check"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }

    if (d.estado == 2) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 2) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:1% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 7%;"><td class="ng-scope" style="width: 13%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 15%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 8%;"><td class="ng-scope" style="width: 8%;"><td class="ng-scope" style="width: 7%;"><td class="ng-scope" style="width: 6%;"><td class="ng-scope" style="width: 12%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print2" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_moto" itemId="'+i+'">' + '<i class="fa fa-check"></i>' + '</button><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_delete" itemId="'+i+'">' + '<i class="fa fa-times"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    html += '</table>';
    
    return html;
  }

  $scope.imprimir = function(pedido) {
  
    if(document.getElementById("detalle_pedido3") != null){
      var pedidos = document.getElementById("detalle_pedido3").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }
  
  function origenHtml(data, type, full, meta) {
    //console.log(data)
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest[0].nombre_destino != 'undefined') {
      return dest[0].nombre_destino;
    } else { 
      return ' ';
    }
  }

  function destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].destino;
    } else {
      return dest[dest.length - 1].destino;
    }
  }

  function ordenHtml(data, type, full, meta) {
    $variable = 'LIE000' + data.id;
    return $variable;
  }

  function motoHtml(data, type, full, meta) {
    if (data.motorizado_id == null) {
      return '-';
    } else {
      return data.motorizado_nombre;
    }
  }

  function estadoHtml(data, type, full, meta) {
    if (data.estado == 0) {
      return '';
    }
    if (data.estado == 1) {
      return 'ASIGNADO';
    } 
    if (data.estado == 2) {
      return 'EN CAMINO';
    }
    if (data.estado == 6) {
      return 'MOTORIZADO NO TOMO EL PEDIDO';
    }  
  }

  function multiHtml(data, type, full, meta) {
    if (data.destinos.length > 1) {
      return '<md-tooltip md-direction="top">Ver Destinos</md-tooltip><i class="fa fa-plus" id="plus2" aria-hidden="true"></i>';
    } else{
      return '';
    } 
  }

  function horaHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.created_at),'HH:mm:ss');
    
    if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
      $variable = $filter('date')(new Date(data.created_at),'dd/MM/yyyy HH:mm:ss');
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      $variable = $filter('date')(new Date(data.fecha),'dd/MM/yyyy');
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      $variable = $filter('date')(new Date(data.destinos[0].fecha_destino),'dd/MM/yyyy');
    }
    return $variable;
  }

  function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      if (data.estado == 0) {
        return '';
      }
      if (data.estado == 1 || data.estado == 2 || data.estado == 6) {
        if (data.tipo_usuario != 3) {
          return '<div style="width:170px"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
          '</button>'  + 
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.reasig(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Reasignar Motorizado</md-tooltip><i class="fa fa-motorcycle" aria-hidden="true"></i>' +
          '</button>'  + 
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.review(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Reprogramar</md-tooltip><i class="fa fa-refresh" aria-hidden="true"></i>' +
          '</button>'  + 
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Finalizar Pedido</md-tooltip><i class="fa fa-check"></i>' +
          '</button>' +
          '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Anular Pedido</md-tooltip><i class="fa fa-times"></i>' +
          '</button></div>' ;
        }

        if (data.tipo_usuario == 3) {
          return '<div style="width:80px"><button style="width:30px" class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
          '</button>'  + 
          '<button style="width:30px" class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.reasig(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Reasignar Motorizado</md-tooltip><i class="fa fa-motorcycle" aria-hidden="true"></i>' +
          '</button>'  + 
          '<button style="width:30px" class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.review(showCase.persons[' + data.id + '])">' +
          '   <md-tooltip md-direction="top">Reprogramar</md-tooltip><i class="fa fa-refresh" aria-hidden="true"></i>' +
          '</button>'  + 
          '<button style="width:30px" class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
          '   <md-tooltip md-direction="top">Anular Pedido</md-tooltip><i class="fa fa-times"></i>' +
          '</button></div>' ;
        }
      }    
  }

  function selected(data) {  
    if (data.estado != 0 &&  data.estado != 4 && data.estado != 3) {
      if (data.tipo_usuario != 3) {
        return '' ;
      }

      if (data.tipo_usuario == 3) {
        if (data.estado_reprogramado == 0) {
          data.estado_reprogramado = false;
        } else {
          data.estado_reprogramado = true;
        }
        console.log(data.estado_reprogramado);
        return data.estado_reprogramado;
        
      }
    } 
  }

  function reprogramarHtml(data, type, full, meta, dataIndex) {
      vm.persons[data.id] = data;
      if (data.estado == 0) {
        return '';
      }
      if (data.estado != 0 &&  data.estado != 4 && data.estado != 3) {
        if (data.tipo_usuario != 3) {
          return '' ;
        }

        if (data.tipo_usuario == 3) {
          if (data.estado_reprogramado == 0) {
            data.estado_reprogramado1 = false;
            data.estado_reprogramado2 ='No Permitido';
            return '<div style="width:80px"><md-switch id="select" ng-model="showCase.persons[' + data.id + '].estado_reprogramado1" aria-label="Switch 1" class="switch_almacen md-warn"><p class="text_almacen">{{showCase.persons[' + data.id + '].estado_reprogramado2}}</p></md-switch></div>' ;
          } else {
            data.estado_reprogramado1 = true;
            data.estado_reprogramado2 = 'Permitido';
            return '<div style="width:80px"><md-switch id="select" ng-model="showCase.persons[' + data.id + '].estado_reprogramado1" aria-label="Switch 1" class="switch_almacen md-warn"><p class="text_almacen">{{showCase.persons[' + data.id + '].estado_reprogramado2}}</p></md-switch></div>' ;
          }          
        }
      }    
  }
})

.controller('ListadoFinalizadosCtrl', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService,$mdDialog,$interval,$rootScope) {
  
  var req = {
    method: 'GET',
    url: '../api/public/api/adminFinalizados',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  var vm = this;
  vm.view = view;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.reloadData = reloadData;
  vm.dtInstance = {};
  vm.persons = {};
  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.ctn = 0;
      $scope.tracking = [];
      $scope.pedidos = [];

      $http(req).then(function(response){
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          $scope.pedidos = response.data.pedidos;
          defer.resolve($scope.pedidos);
          /*for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.pedidos[i].estado == 3) {
              $scope.tracking.push($scope.pedidos[i]);
            }
            if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2) {
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                if ($scope.pedidos[i].destinos[j].estado_destino == 3) {
                  $scope.ctn = 1;
                }  
              }
              if ($scope.ctn == 1) {
                $scope.tracking.push($scope.pedidos[i]);
                $scope.ctn = 0;
              }
            }
            count = count + 1;
          }*/
        }
        /*if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
        }*/
      }, function(response){
        console.log('error');
        console.log(response);
      })
      return defer.promise;
    })
    .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Pedido:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')
      .withOption('order', [0, 'desc'])
      .withOption('rowCallback', rowCallback)
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').notVisible(),
    DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(multiHtml),
    DTColumnBuilder.newColumn(null).withTitle('Orden de Despacho').notSortable().renderWith(ordenHtml),
    DTColumnBuilder.newColumn('nombre').withTitle('Cliente'),
    DTColumnBuilder.newColumn(null).withTitle('Horario de recojo').notSortable().renderWith(horaOrigenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Cliente Final').notSortable().renderWith(origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Distrito Origen').notSortable().renderWith(dist_origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Distrito Destino').notSortable().renderWith(dist_destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Fecha de Entrega').notSortable().renderWith(horaHtml),
    DTColumnBuilder.newColumn(null).withTitle('Hora Programada').notSortable().renderWith(horaprogHtml),
    DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
  ];

  function reloadData() {  
    var resetPaging = true;
    vm.dtInstance.reloadData(null, resetPaging);
  }

  //$interval(reloadData, 90000);
  
  function view(pedido) {  
    
    $scope.pedido = pedido;
    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      CONFIG.CLIENTE = response.data.user;
      showTabDialog();       
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/pedido.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope) {

      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.pedidos_detalle = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;
      $scope.costoe = '';

      $scope.destinos = $scope.pedidos_detalle.destinos;

      if ($scope.pedidos_detalle.reprogramado > 0) {
        $scope.pedidos_detalle.tipo = 'REPROGRAMADO';
      }
      if ($scope.pedidos_detalle.tipo == 'PROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'REPROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'URGENTE') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy HH:mm:ss');
      }

      if ($scope.pedidos_detalle.estado == 0) {
        $scope.pedidos_detalle.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos_detalle.estado == 1) {
        $scope.pedidos_detalle.estado = 'ASIGNADO';
      }
      if ($scope.pedidos_detalle.estado == 2) {
        $scope.pedidos_detalle.estado = 'EN CAMINO';
      }
      if ($scope.pedidos_detalle.estado == 3) {
        $scope.pedidos_detalle.estado = 'FINALIZADO';
      }
      if ($scope.pedidos_detalle.estado == 4) {
        $scope.pedidos_detalle.estado = 'ANULADO';
      }

      if ($scope.pedidos_detalle.forma_pago == 0) {
        $scope.pedidos_detalle.forma_pago = 'EFECTIVO';
      }
      if ($scope.pedidos_detalle.forma_pago == 1) {
        $scope.pedidos_detalle.forma_pago = 'TRANSFERENCIA';
      }
      if ($scope.pedidos_detalle.forma_pago == 2) {
        $scope.pedidos_detalle.forma_pago = 'POS VISA';
      }

      if ($scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
        $scope.pedidos_detalle.fecha_origen1 = $filter('date')(new Date($scope.pedidos_detalle.fecha_origen),'dd/MM/yyyy');
        $scope.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
        if ($scope.destinos[0].subtotal == 0) {
          $scope.destinos[0].descuento = 0;
        }
        $scope.pedidos_detalle.total = parseFloat($scope.destinos[0].subtotal) + parseFloat($scope.destinos[0].cobrarecommerce) - parseFloat($scope.destinos[0].descuento);
      }

      if ($scope.pedidos_detalle.tipo_usuario != 3) {
        $scope.pedidos_detalle.total = parseFloat($scope.pedidos_detalle.costo);
      }

      $scope.costo = parseFloat($scope.pedidos_detalle.costo) + parseFloat($scope.pedidos_detalle.costo_recojo);
      $scope.costoe = parseFloat($scope.pedidos_detalle.costo);
    
      if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.costo_recojo = 0;

        if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
        } else {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
        }
        $scope.costo = parseFloat($scope.costoe) + parseFloat($scope.pedidos_detalle.costo_recojo);
      }

      for (var i = 0; i < $scope.destinos.length; i++) {
        $scope.destinos[i].costo1 = parseFloat($scope.destinos[i].costo);
        if ($scope.destinos[i].subtotal == 0) {
          $scope.destinos[i].descuento = 0;
        }
        $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
        if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
          if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
          } else {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
          }
        }     
      }


    $scope.pedidos_detalle.cantidad_almacen = $scope.pedidos_detalle.destinos[0].cantidad;

    if ($scope.pedidos_detalle.destinos[0].cantidad_devuelta != 0 || $scope.pedidos_detalle.destinos[0].cantidad_devuelta != null) {
      $scope.pedidos_detalle.cantidad_cliente = $scope.pedidos_detalle.cantidad_almacen - $scope.pedidos_detalle.destinos[0].cantidad_devuelta;
    }

    if  ($scope.pedidos_detalle.destinos[0].cantidad_devuelta == null || $scope.pedidos_detalle.destinos[0].cantidad_devuelta == 0) {
      $scope.pedidos_detalle.cantidad_cliente = $scope.pedidos_detalle.cantidad_almacen;
    }

    if ($scope.cliente.almacen == 1 && $scope.pedidos_detalle.destinos[0].admin_id != '0') {
       $scope.pedidos_detalle.cantidad_cliente = 0;
       $scope.pedidos_detalle.cantidad_devuelta = 0;
      for (var k = 0; k < $scope.pedidos_detalle.destinos[0].admin_id.length; k++) {
        $scope.pedidos_detalle.cantidad_cliente += parseInt($scope.pedidos_detalle.destinos[0].admin_id[k].cantE);
        $scope.pedidos_detalle.cantidad_devuelta += parseInt($scope.pedidos_detalle.destinos[0].admin_id[k].cantD);        
      }
    }


      $scope.imprimir = function(pedido) {  
        if(document.getElementById("detalle_pedidos") != null){
          var pedidos = document.getElementById("detalle_pedidos").innerHTML;  
        }  

        $timeout(function() {     
          var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
          popupWinindow.document.close();
          }, 500);
      }

      $scope.getLetter = function(index) {
        return String.fromCharCode(65+index);
      };

      $scope.cancelar = function() {
        $mdDialog.cancel();
      };

      $scope.gPlace;

      $timeout(function() {
          $scope.consola();
      }, 500);

      /************************* Definición de las Variables **********************/
      $scope.contador=1;
      var miUbicacion={};
      var misDestinos={};
      $scope.ruta=[{}];
      $scope.rutaG=[];
      var geocoder= new google.maps.Geocoder();
      var markers = [];
      directionsDisplays=[];
      var marcador={};

      /************************* FIN Definición de las Variables **********************/

      var circle = new google.maps.Circle({
              center: {lat:  -12.1056553, lng: -77.0369909},
              radius: 10*1000
      });
      $scope.autocompleteOptions = {
              bounds: circle.getBounds(),
              componentRestrictions: {country: 'pe'}
      }
    
      var lima={
          lat: -12.046374,
          lng: -77.042793
      }

      /************************* FUNCION INICIALIZACIÓN DEL MAPA **********************/    
      
      initMap= function(){
            $timeout(function() {
            var mapDiv=document.getElementById('map2');
            
            var mapOptions={
            center: lima,
            zoom:14,
            //styles: styles
            }
        $scope.map= new google.maps.Map(mapDiv,mapOptions);
        }, 300);
        
    
        //searchPlace();
      } 
      
      initMap();

      /************************* FIN FUNCION INICIALIZACIÓN DEL MAPA **********************/   

      /************************* FUNCION MARCADORES **********************/ 

      addMarker= function(ubicacion,i){
        var pin = ["images/0.png",
                   "images/1.png",
                   "images/2.png",
                   "images/3.png",
                   "images/4.png",
                   "images/5.png",
                   "images/6.png",
                   "images/7.png",
                   "images/8.png",
                   "images/9.png",
                   "images/10.png",
                   "images/11.png",
                   "images/12.png",
                   "images/13.png",
                   "images/14.png",
                   "images/15.png"
        ];
        var marker= new google.maps.Marker({
            map: $scope.map,
            position: ubicacion,
            icon: pin[i],
            draggable: true
            //animation: google.maps.Animation.DROP
        })

        markers.push(marker);
      }
      
      /************************* FIN FUNCION MARCADORES **********************/    
   
      /************************* FUNCION TRAZADO DE RUTAS **********************/  
      traceRoute= function(rutas){

        if(rutas){
            for (var i = 0; i < directionsDisplays.length; i++) {
                //console.log(directionsDisplays[i]);
            directionsDisplays[i].setMap(null);
            }
        }   

        var directionsDisplay= new google.maps.DirectionsRenderer({
                polylineOptions: {strokeColor: "#029ed1"},
            });
        directionsDisplays.push(directionsDisplay);
        var directionsService= new google.maps.DirectionsService();   
        var npoints = rutas.length;
        
        $timeout(function() {
            directionsDisplay.setMap($scope.map);
            
            var request={
              destination: rutas[npoints-1],
              origin: rutas[1],
              travelMode: google.maps.TravelMode.DRIVING, 
              drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: google.maps.TrafficModel.PESSIMISTIC,
              }
            }

            if ( npoints > 2 ){
              request.waypoints = [];

              for ( i = 1; i < npoints - 1 ;i++){
                request.waypoints.push({
                  location: rutas[i],
                  stopover: true
                });
                // console.log("ORDER WAYPOINTS", request.waypoints);
              }
            }
            // console.log(request);
            request.optimizeWaypoints = true;
      
            directionsService.route(request,function(response,status){
              if(status==google.maps.DirectionsStatus.OK){
                directionsDisplay.setOptions({ suppressMarkers: true });
                directionsDisplay.setDirections(response);
                // console.log(response.routes[0].legs.length);
                for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                 // duration=duration+response.routes[0].legs[i].duration.value;
                }
                for (var i = 0 ; i < $scope.pedidos_detalle.length ; i++) {
                  $scope.pedidos_detalle[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
                }                
              }
            })     
          }, 500);
        }
      /************************* FIN FUNCION TRAZADO DE RUTAS **********************/  


    
      /************************* FIN FUNCIONES INTERCAMBIAR POSICIÓN **********************/ 
      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      /************************* FUNCION MOSTRAR RUTAS **********************/ 

      $scope.consola = function(){
        //alert('me llamo');

        $scope.ruta.push({
            'lat':parseFloat($scope.destinos[0].lat),
            'lng':parseFloat($scope.destinos[0].lng)
        });

        for (var i = 0; i < $scope.destinos.length; i++) {
          console.log($scope.destinos[i].lat2);
          console.log($scope.destinos[i].lng2);
            marcador.lat=parseFloat($scope.destinos[i].lat2);
            marcador.lng=parseFloat($scope.destinos[i].lng2);
            $scope.ruta.push({
              'lat':marcador.lat,
              'lng':marcador.lng
            });
        }
        for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
        }
        $timeout(function() {
          console.log($scope.ruta);
          traceRoute($scope.ruta);
          for (var i = 1; i < $scope.ruta.length+1; i++) {
            addMarker($scope.ruta[i],i-1);
          }
        }, 200);
        $timeout(function() {
          $scope.ruta=[{}]; 
        }, 1400);
        
      };
    };
  }

  function edit(person) {

    if(document.getElementById("detalle_pedido4") != null){
      var pedidos = document.getElementById("detalle_pedido4").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function deleteRow(person) {

    $scope.pedidos = person;
    $scope.estado_pedido = {
      motivo: ''
    }

    var confirm = $mdDialog.prompt()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea anular el pedido de '+ $scope.pedidos.nombre +'?')
      .placeholder('Por favor, ingrese el motivo...')
      .ariaLabel('Dog name')
      .initialValue('')
      .ok('Rechazar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {

      $scope.estado_pedido.motivo = result;

      var req = {
        method: 'GET',
        url: '../api/public/api/devolucion/' + $scope.pedidos.id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.estado_pedido
      }

      $http(req).then(function(response){
        console.log(response.data);
        if(response.data == ''){
          reloadData();
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('El pedido fue anulado con éxito')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }

  function horaOrigenHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.fecha_origen),'dd/MM/yyyy');
    return $variable;
  }

  function horaprogHtml(data, type, full, meta) {

    if (data.tipo_usuario != 3) {
      $variable = data.hora;
      if (data.tipo == 'URGENTE') {
        $variable = '-';
      } 
    }

    if (data.tipo_usuario == 3) {
      $variable = data.destinos[0].hora_destino;
    }
    return $variable;
  }

  function createdRow(row, data, dataIndex) {
    
    $compile(angular.element(row).contents())($scope); 
  }

  $scope.destinos = '';
  $scope.pedidos = '';
  $scope.idpedido = '';
  $scope.cliente = '';
  $scope.destinos2 = '';

  function rowCallback(tabRow, data, dataIndex) {

    $(tabRow).unbind('click');
    $(tabRow).on('click', '#plus3', function () {
        console.log('entro');
        $(this).find('.fa-plus').toggleClass('fa-rotate-180');
        $scope.tr = $(tabRow);
        $scope.table = vm.dtInstance.DataTable;
        $scope.row = $scope.table.row($scope.tr);

        if ( $scope.row.child.isShown() ) {
            $scope.row.child.hide();
            $scope.tr.removeClass('shown');
        }
        else {
            $scope.row.child( format($scope.row.data()) ).show();
            $scope.tr.addClass('shown');
        }
    });

    $('.tabla_finalizados tbody').unbind('click');
    $('.tabla_finalizados tbody').on('click', '.button_print3', function (e) {
      $scope.destinos = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      console.log(rowData);
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.pedidos = rowData;
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.costo = parseFloat(rowData.costo);
      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.dest = rowData.destinos;
      
      $scope.dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest.length; i++) {
        if(i == id){
          $scope.destinos = $scope.dest[i];
          $scope.$apply();
        }
      }

      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+rowData.user_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $scope.cliente = response.data.user;
        console.log($scope.cliente.dnis);
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      setTimeout(function() {$scope.imprimir();console.log($scope.destinos);}, 500);
    }); 
  }

  function format (d) {
    var html = '<table cellpadding="5" id="isrctable" ng-controller="ListadoFinalizadosCtrl" cellspacing="0" border="0" style="padding-left:50px;" width="100%">';
    var letter = 'A'.charCodeAt(0);
    $scope.dest = d.destinos;

    $scope.dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });
    console.log('6166');
    if (d.estado == 1) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 3) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:3.7% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 15%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 6%;">'+$scope.dest[i].distrito_origen+'</td><td class="ng-scope" style="width: 14%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 12%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 8.2%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print3" itemId="'+i+'">' + '<i class="fa fa-print"></i></button></td></tr>';   
        }
        letter += 1;
      }
    }
    if (d.estado == 2) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 3) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:3.7% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 15%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 6%;">'+$scope.dest[i].distrito_origen+'</td><td class="ng-scope" style="width: 14%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 12%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 8.2%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print3" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    if (d.estado == 3) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 3) {
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:3.7% !important"></td><td class="ng-scope" style="width: 10%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 7%;"></td><td class="ng-scope" style="width: 15%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 6%;">'+$scope.dest[i].distrito_origen+'</td><td class="ng-scope" style="width: 14%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 12%;">'+$scope.dest[i].distrito_destino+'</td><td class="ng-scope" style="width: 8.2%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print3" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    html += '</table>';
    
    return html;
  }

  $scope.imprimir = function(pedido) {
    console.log('entroa');  
    if(document.getElementById("detalle_pedido4") != null){
      var pedidos = document.getElementById("detalle_pedido4").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      if (data.tipo == 'URGENTE' && (((Date.parse(data.fecha)-Date.now())/60000)*(-1)).toFixed(0) > 5) {
        //angular.element(row).addClass('green');
      }
      if (data.tipo == 'URGENTE' && (((Date.parse(data.fecha)-Date.now())/60000)*(-1)).toFixed(0) > 10) {
        //angular.element(row).addClass('red');
      }
      $compile(angular.element(row).contents())($scope);
  }
  
  function origenHtml(data, type, full, meta) {
    //console.log(data)
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest[0].nombre_destino != 'undefined') {
      return dest[0].nombre_destino;
    } else { 
      return ' ';
    }
  }

  function dist_origenHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    return dest[0].distrito_origen;
  }

  function destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].destino;
    } else {
      return dest[dest.length - 1].destino;
    }
  }

  function dist_destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].distrito_destino;
    } else {
      return dest[dest.length - 1].distrito_destino;
    }
  }

  function ordenHtml(data, type, full, meta) {
    $variable = 'LIE000' + data.id;
    return $variable;
  }

  function multiHtml(data, type, full, meta) {
    if (data.destinos.length > 1) {
      return '<md-tooltip md-direction="top">Ver Destinos</md-tooltip><i class="fa fa-plus" id="plus3" aria-hidden="true"></i>';
    } else{
      return '';
    } 
  }

  function horaHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.created_at),'HH:mm:ss');
    
    if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
      $variable = $filter('date')(new Date(data.created_at),'dd/MM/yyyy HH:mm:ss');
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      $variable = $filter('date')(new Date(data.fecha),'dd/MM/yyyy');
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      $variable = $filter('date')(new Date(data.destinos[0].fecha_destino),'dd/MM/yyyy');
    } 
    return $variable;
  }

  function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
  
      return '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
        '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
        '</button>'/*  + 
        '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
        '   <md-tooltip md-direction="top">Imprimir Pedido</md-tooltip><i class="fa fa-print"></i>' +
        '</button>'*/;
      
  }
})

.controller('ListadoAnuladosCtrl', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService,$mdDialog,$interval,$rootScope) {
 
  var req = {
    method: 'GET',
    url: '../api/public/api/admin',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  var vm = this;
  vm.view = view;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.reloadData = reloadData;
  vm.dtInstance = {};
  vm.persons = {};
  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.ctn = 0;
      $scope.tracking = [];
      $scope.pedidos = [];

      $http(req).then(function(response){
        console.log(response);
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          $scope.pedidos = response.data.pedidos;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.pedidos[i].estado == 4) {
              $scope.tracking.push($scope.pedidos[i]);
            }
            if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2 || $scope.pedidos[i].estado == 3) {
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                if ($scope.pedidos[i].destinos[j].estado_destino == 4) {
                  $scope.ctn = 1;
                }  
              }
              if ($scope.ctn == 1) {
                $scope.tracking.push($scope.pedidos[i]);
                $scope.ctn = 0;
              }
            }
            count = count + 1;
          }
        }
        if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
        }
      }, function(){
        console.log('error');
      })
      return defer.promise;
    })
    .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Pedido:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')
      .withOption('order', [0, 'desc'])
      .withOption('rowCallback', rowCallback)
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').notVisible(),
    DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(multiHtml),
    DTColumnBuilder.newColumn(null).withTitle('Orden de Despacho').notSortable().renderWith(ordenHtml),
    DTColumnBuilder.newColumn('nombre').withTitle('Cliente'),
    DTColumnBuilder.newColumn(null).withTitle('Horario de recojo').notSortable().renderWith(horaOrigenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Cliente Final').notSortable().renderWith(origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Distrito Origen').notSortable().renderWith(dist_origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Distrito Destino').notSortable().renderWith(dist_destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Fecha de Entrega').notSortable().renderWith(horaHtml),
    DTColumnBuilder.newColumn('motivo').withTitle('Motivo'),
    DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
  ];

  function reloadData() {  
    var resetPaging = true;
    vm.dtInstance.reloadData(null, resetPaging);
  }

  //$interval(reloadData, 90000);
  
  function view(pedido) {  
    
    $scope.pedido = pedido;
    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      CONFIG.CLIENTE = response.data.user;
      showTabDialog();       
    }, function(){
      alert('ha ocurrido un error');
    });

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/pedido.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope) { 

      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.pedidos_detalle = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;

      $scope.destinos = $scope.pedidos_detalle.destinos;
      $scope.destinos.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if ($scope.pedidos_detalle.reprogramado > 0) {
        $scope.pedidos_detalle.tipo = 'REPROGRAMADO';
      }

      if ($scope.pedidos_detalle.tipo == 'PROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'REPROGRAMADO') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy');
      }
      if ($scope.pedidos_detalle.tipo == 'URGENTE') {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.pedidos_detalle.fecha),'dd/MM/yyyy HH:mm:ss');
      }

      if ($scope.pedidos_detalle.estado == 0) {
        $scope.pedidos_detalle.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos_detalle.estado == 1) {
        $scope.pedidos_detalle.estado = 'ASIGNADO';
      }
      if ($scope.pedidos_detalle.estado == 2) {
        $scope.pedidos_detalle.estado = 'EN CAMINO';
      }
      if ($scope.pedidos_detalle.estado == 3) {
        $scope.pedidos_detalle.estado = 'FINALIZADO';
      }
      if ($scope.pedidos_detalle.estado == 4) {
        $scope.pedidos_detalle.estado = 'ANULADO';
      }

      if ($scope.pedidos_detalle.forma_pago == 0) {
        $scope.pedidos_detalle.forma_pago = 'EFECTIVO';
      }
      if ($scope.pedidos_detalle.forma_pago == 1) {
        $scope.pedidos_detalle.forma_pago = 'TRANSFERENCIA';
      }
      if ($scope.pedidos_detalle.forma_pago == 2) {
        $scope.pedidos_detalle.forma_pago = 'POS VISA';
      }

      if ($scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.fecha1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
        $scope.pedidos_detalle.fecha_origen1 = $filter('date')(new Date($scope.pedidos_detalle.fecha_origen),'dd/MM/yyyy');
        $scope.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.destinos[0].fecha_destino),'dd/MM/yyyy');
      }

      $scope.costo = parseFloat($scope.pedidos_detalle.costo) + parseFloat($scope.pedidos_detalle.costo_recojo);
      $scope.costoe = parseFloat($scope.pedidos_detalle.costo);
    
      if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
        $scope.pedidos_detalle.costo_recojo = 0;

        if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
        } else {
          $scope.costoe = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
        }
        $scope.costo = parseFloat($scope.costoe) + parseFloat($scope.pedidos_detalle.costo_recojo);
      }

      for (var i = 0; i < $scope.destinos.length; i++) {
        $scope.destinos[i].costo1 = parseFloat($scope.destinos[i].costo);
        if ($scope.destinos[i].subtotal == 0) {
          $scope.destinos[i].descuento = 0;
        }
        $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
        if ($scope.pedidos_detalle.reprogramado > 0 && $scope.pedidos_detalle.tipo_usuario == 3) {
          if (parseFloat($scope.pedidos_detalle.costo) > parseFloat($scope.pedidos_detalle.costo_reprogramacion)) {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo)- parseFloat($scope.pedidos_detalle.costo_reprogramacion);
          } else {
            $scope.destinos[i].costo1 = parseFloat($scope.pedidos_detalle.costo_reprogramacion) - parseFloat($scope.pedidos_detalle.costo);
          }
        }     
      }

      $scope.imprimir = function(pedido) {  
        if(document.getElementById("detalle_pedidos") != null){
          var pedidos = document.getElementById("detalle_pedidos").innerHTML;  
        }  

        $timeout(function() {     
          var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
          popupWinindow.document.close();
          }, 500);
      }

      $scope.getLetter = function(index) {
        return String.fromCharCode(65+index);
      };

      $scope.cancelar = function() {
        $mdDialog.cancel();
      };

      $scope.gPlace;

      $timeout(function() {
          $scope.consola();
      }, 500);

      /************************* Definición de las Variables **********************/
      $scope.contador=1;
      var miUbicacion={};
      var misDestinos={};
      $scope.ruta=[{}];
      $scope.rutaG=[];
      var geocoder= new google.maps.Geocoder();
      var markers = [];
      directionsDisplays=[];
      var marcador={};

      /************************* FIN Definición de las Variables **********************/

      var circle = new google.maps.Circle({
              center: {lat:  -12.1056553, lng: -77.0369909},
              radius: 10*1000
      });
      $scope.autocompleteOptions = {
              bounds: circle.getBounds(),
              componentRestrictions: {country: 'pe'}
      }
    
      var lima={
          lat: -12.046374,
          lng: -77.042793
      }

      /************************* FUNCION INICIALIZACIÓN DEL MAPA **********************/    
      
      initMap= function(){
            $timeout(function() {
            var mapDiv=document.getElementById('map2');
            
            var mapOptions={
            center: lima,
            zoom:14,
            //styles: styles
            }
        $scope.map= new google.maps.Map(mapDiv,mapOptions);
        }, 300);
        
    
        //searchPlace();
      } 
      
      initMap();

      /************************* FIN FUNCION INICIALIZACIÓN DEL MAPA **********************/   

      /************************* FUNCION MARCADORES **********************/ 

      addMarker= function(ubicacion,i){
        var pin = ["images/0.png",
                   "images/1.png",
                   "images/2.png",
                   "images/3.png",
                   "images/4.png",
                   "images/5.png",
                   "images/6.png",
                   "images/7.png",
                   "images/8.png",
                   "images/9.png",
                   "images/10.png",
                   "images/11.png",
                   "images/12.png",
                   "images/13.png",
                   "images/14.png",
                   "images/15.png"
        ];
        var marker= new google.maps.Marker({
            map: $scope.map,
            position: ubicacion,
            icon: pin[i],
            draggable: true
            //animation: google.maps.Animation.DROP
        })

        markers.push(marker);
      }
      
      /************************* FIN FUNCION MARCADORES **********************/    
   
      /************************* FUNCION TRAZADO DE RUTAS **********************/  
      traceRoute= function(rutas){

        if(rutas){
            for (var i = 0; i < directionsDisplays.length; i++) {
                //console.log(directionsDisplays[i]);
            directionsDisplays[i].setMap(null);
            }
        }   

        var directionsDisplay= new google.maps.DirectionsRenderer({
                polylineOptions: {strokeColor: "#029ed1"},
            });
        directionsDisplays.push(directionsDisplay);
        var directionsService= new google.maps.DirectionsService();   
        var npoints = rutas.length;
        
        $timeout(function() {
            directionsDisplay.setMap($scope.map);
            
            var request={
              destination: rutas[npoints-1],
              origin: rutas[1],
              travelMode: google.maps.TravelMode.DRIVING, 
              drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: google.maps.TrafficModel.PESSIMISTIC,
              }
            }

            if ( npoints > 2 ){
              request.waypoints = [];

              for ( i = 1; i < npoints - 1 ;i++){
                request.waypoints.push({
                  location: rutas[i],
                  stopover: true
                });
                // console.log("ORDER WAYPOINTS", request.waypoints);
              }
            }
            // console.log(request);
            request.optimizeWaypoints = true;
      
            directionsService.route(request,function(response,status){
              if(status==google.maps.DirectionsStatus.OK){
                directionsDisplay.setOptions({ suppressMarkers: true });
                directionsDisplay.setDirections(response);
                // console.log(response.routes[0].legs.length);
                for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                 // duration=duration+response.routes[0].legs[i].duration.value;
                }
                for (var i = 0 ; i < $scope.pedidos_detalle.length ; i++) {
                  $scope.pedidos_detalle[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
                }                
              }
            })     
          }, 500);
        }
      /************************* FIN FUNCION TRAZADO DE RUTAS **********************/  


    
      /************************* FIN FUNCIONES INTERCAMBIAR POSICIÓN **********************/ 
      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      /************************* FUNCION MOSTRAR RUTAS **********************/ 

      $scope.consola = function(){
        //alert('me llamo');

        $scope.ruta.push({
            'lat':parseFloat($scope.destinos[0].lat),
            'lng':parseFloat($scope.destinos[0].lng)
        });

        for (var i = 0; i < $scope.destinos.length; i++) {
          console.log($scope.destinos[i].lat2);
          console.log($scope.destinos[i].lng2);
            marcador.lat=parseFloat($scope.destinos[i].lat2);
            marcador.lng=parseFloat($scope.destinos[i].lng2);
            $scope.ruta.push({
              'lat':marcador.lat,
              'lng':marcador.lng
            });
        }
        for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
        }
        $timeout(function() {
          console.log($scope.ruta);
          traceRoute($scope.ruta);
          for (var i = 1; i < $scope.ruta.length+1; i++) {
            addMarker($scope.ruta[i],i-1);
          }
        }, 200);
        $timeout(function() {
          $scope.ruta=[{}]; 
        }, 1400);
        
      };
    };
  }

  function edit(person) {

    if(document.getElementById("detalle_pedido5") != null){
      var pedidos = document.getElementById("detalle_pedido5").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function deleteRow(person) {

    $scope.pedidos = person;
    $scope.estado_pedido = {
      motivo: ''
    }

    var confirm = $mdDialog.prompt()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea anular el pedido de '+ $scope.pedidos.nombre +'?')
      .placeholder('Por favor, ingrese el motivo...')
      .ariaLabel('Dog name')
      .initialValue('')
      .ok('Rechazar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {

      $scope.estado_pedido.motivo = result;

      var req = {
        method: 'GET',
        url: '../api/public/api/devolucion/' + $scope.pedidos.id+'?motivo='+$scope.estado_pedido.motivo,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.estado_pedido
      }

      $http(req).then(function(response){
        console.log(response.data);
        if(response.data == ''){
          reloadData();
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('El pedido fue anulado con éxito')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }

  function createdRow(row, data, dataIndex) {
    
    $compile(angular.element(row).contents())($scope); 
  }

  $scope.destinos = '';
  $scope.pedidos = '';
  $scope.idpedido = '';
  $scope.cliente = '';
  $scope.destinos2 = '';

  function rowCallback(tabRow, data, dataIndex) {

    $(tabRow).unbind('click');
    $(tabRow).on('click', '#plus4', function () {
        console.log('entro');
        $(this).find('.fa-plus').toggleClass('fa-rotate-180');
        $scope.tr = $(tabRow);
        $scope.table = vm.dtInstance.DataTable;
        $scope.row = $scope.table.row($scope.tr);

        if ( $scope.row.child.isShown() ) {
            $scope.row.child.hide();
            $scope.tr.removeClass('shown');
        }
        else {
            $scope.row.child( format($scope.row.data()) ).show();
            $scope.tr.addClass('shown');
        }
    });

    $('.tabla_anulados tbody').unbind('click');
    $('.tabla_anulados tbody').on('click', '.button_print4', function (e) {
      $scope.destinos = '';

      var id = $(this).attr('itemId');
      var rowData = $scope.row.data();
      console.log(rowData);
      var letter = 'A'.charCodeAt(0) + parseInt(id);
      $scope.pedidos = rowData;
      $scope.idpedido = 'LIE000'+ rowData.id + '-' + String.fromCharCode(letter);
      $scope.costo = parseFloat(rowData.costo);
      $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
      $scope.dest = rowData.destinos;
      
      $scope.dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      for (var i = 0; i < $scope.dest.length; i++) {
        if(i == id){
          $scope.destinos = $scope.dest[i];
          $scope.$apply();
        }
      }

      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+rowData.user_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $scope.cliente = response.data.user;
        console.log($scope.cliente.dnis);
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      setTimeout(function() {$scope.imprimir();console.log($scope.destinos);}, 500);
    }); 
  }

  function format (d) {
    var html = '<table cellpadding="5" id="isrctable" ng-controller="ListadoAnuladosCtrl" cellspacing="0" border="0" style="padding-left:50px;" width="100%">';
    var letter = 'A'.charCodeAt(0);
    $scope.dest = d.destinos;

    $scope.dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });


    if (d.estado == 1) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 4) {
          if ($scope.dest[i].motivo == null) { 
            $scope.dest[i].motivo = '';
          } 
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:4% !important"></td><td class="ng-scope" style="width: 15%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12.5%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 12%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 15%;"></td><td class="ng-scope">'+ $scope.dest[i].motivo +'</td><td class="ng-scope" style="width: 8.7%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print4" itemId="'+i+'">' + '<i class="fa fa-print"></i></button></td></tr>';   
        }
        letter += 1;
      }
    }
    if (d.estado == 2) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 4) {
          if ($scope.dest[i].motivo == null) { 
            $scope.dest[i].motivo = '';
          } 
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:4% !important"></td><td class="ng-scope" style="width: 15%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12.5%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 12%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 15%;"></td><td class="ng-scope">'+ $scope.dest[i].motivo +'</td><td class="ng-scope" style="width: 8.7%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print4" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    if (d.estado == 3) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 4) {
          if ($scope.dest[i].motivo == null) { 
            $scope.dest[i].motivo = '';
          } 
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:4% !important"></td><td class="ng-scope" style="width: 15%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12.5%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 12%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 15%;"></td><td class="ng-scope">'+ $scope.dest[i].motivo +'</td><td class="ng-scope" style="width: 8.7%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print4" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    if (d.estado == 4) {
      for(var i = 0; i < $scope.dest.length; i++) {
        if ($scope.dest[i].estado_destino == 4) {
          if ($scope.dest[i].motivo == null) { 
            $scope.dest[i].motivo = '';
          } 
          html += '<tr style="background-color:#f6f6f6"><td class="ng-scope" style="width:4% !important"></td><td class="ng-scope" style="width: 15%;">LIE000'+ d.id + '-'+ String.fromCharCode(letter) +'</td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12%;"></td><td class="ng-scope" style="width: 12.5%;">'+ $scope.dest[i].origen +'</td><td class="ng-scope" style="width: 12%;">'+ $scope.dest[i].destino +'</td><td class="ng-scope" style="width: 15%;"></td><td class="ng-scope">'+ $scope.dest[i].motivo +'</td><td class="ng-scope" style="width: 8.7%;"><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow button_print4" itemId="'+i+'">' + '<i class="fa fa-print"></i>' + '</button></td></tr>';   
        }
        letter += 1;
      }
    }
    html += '</table>';
    
    return html;
  }

  $scope.imprimir = function(pedido) {
    console.log('entroa');  
    if(document.getElementById("detalle_pedido5") != null){
      var pedidos = document.getElementById("detalle_pedido5").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function horaOrigenHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.fecha_origen),'dd/MM/yyyy');
    return $variable;
  }
  
  function origenHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest[0].nombre_destino != 'undefined') {
      return dest[0].nombre_destino;
    } else { 
      return ' ';
    }
  }

  function dist_origenHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    return dest[0].distrito_origen;
  }

  function destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].destino;
    } else {
      return dest[dest.length - 1].destino;
    }
  }

  function dist_destinoHtml(data, type, full, meta) {
    var dest = data.destinos;

    dest.sort(function(a, b){
      return a.n_marcador - b.n_marcador;
    });

    if (dest.length == 1) {
      return dest[0].distrito_destino;
    } else {
      return dest[dest.length - 1].distrito_destino;
    }
  }

  function ordenHtml(data, type, full, meta) {
    $variable = 'LIE000' + data.id;
    return $variable;
  }

  function multiHtml(data, type, full, meta) {
    if (data.destinos.length > 1) {
      return '<md-tooltip md-direction="top">Ver Destinos</md-tooltip><i class="fa fa-plus" id="plus4" aria-hidden="true"></i>';
    } else{
      return '';
    } 
  }

  function horaHtml(data, type, full, meta) {
    $variable = $filter('date')(new Date(data.created_at),'HH:mm:ss');
    
    if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
      $variable = $filter('date')(new Date(data.created_at),'dd/MM/yyyy HH:mm:ss');
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      $variable = $filter('date')(new Date(data.fecha),'dd/MM/yyyy');
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      $variable = $filter('date')(new Date(data.destinos[0].fecha_destino),'dd/MM/yyyy');
    } 
    return $variable;
  }

  function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
  
      return '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.view(showCase.persons[' + data.id + '])">' +
        '   <md-tooltip md-direction="top">Ver Pedido</md-tooltip><i class="fa fa-eye"></i>' +
        '</button>'/*  + 
        '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])" )"="">' +
        '   <md-tooltip md-direction="top">Imprimir Pedido</md-tooltip><i class="fa fa-print"></i>' +
        '</button>'*/;
      
  }
})

.controller('detallePedidoCtrl', function($scope,CONFIG,$sce,$http,$location,$timeout,$filter,userService,$mdDialog,$routeParams) {

  var param = '';
  param= $routeParams.param;
  $scope.pedidos = CONFIG.PEDIDO;
  $scope.destinos = $scope.pedidos.destinos;
  $scope.cliente = CONFIG.CLIENTE;
  $scope.distritos = [];

  var reqdistrito = {
    method: 'GET',
    url: '../api/public/api/distritos',
    headers: {
     'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(reqdistrito).then(function(response){
    $scope.distrito = response.data.distritos;
    for (var i = 0; i < $scope.distrito.length; i++) {
      if ($scope.distrito[i].estado == 1) {
        $scope.distritos.push($scope.distrito[i]);
      }
    } 
  }, function(){
      alert('No se ha podido obtener los distritos');
  });

  $scope.costosf = [];

  setTimeout(function() {
    var reqcosto = {
      method: 'GET',
      url: '../api/public/api/costo',
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqcosto).then(function(response){
        $scope.costosf = response.data.costos;
        console.log(response);
    }, function(){
        console.log('No se ha podido obtener las variables del sistema');
    });
  }, 1500);
  

  $scope.destinos.sort(function(a, b){
    return a.n_marcador - b.n_marcador;
  });

  $scope.horaPedido='';
  $scope.horario_e='';
  $scope.diaPedido=  $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
  $scope.date = CONFIG.DATE;
  $scope.myDate = new Date($scope.date);
  $scope.minDate = new Date($scope.date);

  $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
  $scope.fecha_origen = new Date($scope.date);
  $scope.diaPedido_origen = $scope.pedidos.fecha_origen;
  $scope.horario_origen = $scope.pedidos.turno_origen;
  $scope.horaPedido_origen = $scope.pedidos.hora_origen;
  $scope.myDate = new Date($scope.pedidos.fecha);
  $scope.horaPedido2_origen='';
  $scope.horaPedido3_origen='';
  $scope.diaPedido = $scope.pedidos.fecha;
  $scope.horaPedido = $scope.pedidos.hora;
  $scope.showProgramar = false;
  $scope.fecha_actual = $filter('date')(new Date(),'dd/MM/yyyy HH:mm:ss');
  $scope.costoe = parseFloat($scope.pedidos.costo);
  $scope.costoe2 = parseFloat($scope.pedidos.costo) + parseFloat($scope.pedidos.costo_recojo);
  $scope.pedidos.costo1 = parseFloat($scope.pedidos.costo);

  if ($scope.pedidos.reprogramado > 0 && $scope.pedidos.tipo_usuario == 3) {
    $scope.pedidos.costo_recojo = 0;
    if (parseFloat($scope.pedidos.costo) > parseFloat($scope.pedidos.costo_reprogramacion)) {
      $scope.costoe = parseFloat($scope.pedidos.costo)- parseFloat($scope.pedidos.costo_reprogramacion);
      $scope.pedidos.costo1 = parseFloat($scope.pedidos.costo)- parseFloat($scope.pedidos.costo_reprogramacion);
    } else {
      $scope.costoe = parseFloat($scope.pedidos.costo_reprogramacion) - parseFloat($scope.pedidos.costo);
      $scope.pedidos.costo1 = parseFloat($scope.pedidos.costo_reprogramacion) - parseFloat($scope.pedidos.costo);
    }
    $scope.costoe2 = parseFloat($scope.costoe) + parseFloat($scope.pedidos.costo_recojo);
  }

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6;
  };

  if ($scope.cliente.dni == '') {
    $scope.cliente.dnis = $scope.cliente.ruc;
  }
  if ($scope.cliente.ruc == '') {
    $scope.cliente.dnis = $scope.cliente.dni;
  }

  if ($scope.pedidos.estado == 0) {
    $scope.pedidos.estado1 = 'SOLICITUD ENVIADA';
  }
  if ($scope.pedidos.estado == 1) {
    $scope.pedidos.estado1 = 'ASIGNADO';
  }
  if ($scope.pedidos.estado == 2) {
    $scope.pedidos.estado1 = 'EN CAMINO';
  }
  if ($scope.pedidos.estado == 3) {
    $scope.pedidos.estado1 = 'FINALIZADO';
  }
  if ($scope.pedidos.estado == 4) {
    $scope.pedidos.estado1 = 'ANULADO';
  }


  if ($scope.pedidos.forma_pago == 0) {
    $scope.pedidos.forma_pago1 = 'EFECTIVO';
  }
  if ($scope.pedidos.forma_pago == 1) {
    $scope.pedidos.forma_pago1 = 'TRANSFERENCIA';
  }
  if ($scope.pedidos.forma_pago == 2) {
    $scope.pedidos.forma_pago1 = 'POS VISA';
  }

  $scope.destinos.origen = $scope.destinos[0].origen;
  $scope.destinos.departamento_origen = $scope.destinos[0].departamento_origen;
  $scope.destinos.nombre_origen = $scope.destinos[0].nombre_origen;
  $scope.destinos.telefono_origen = $scope.destinos[0].telefono_origen;
  $scope.destinos.comentarios = $scope.destinos[0].comentarios;
  $scope.destinos.distrito_origen = null;

  $scope.selectHora=[{'hora':'09'},{'hora':'10'},{'hora':'11'},{'hora':'12'},{'hora':'13'},{'hora':'14'},{'hora':'15'},{'hora':'16'},{'hora':'17'},{'hora':'18'},{'hora':'19'}];
  $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'},{'id': 3,'horario':'2 Horas'}];
  $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'},{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}];
  $scope.seleccionarHorarioO = [{'id': 0, 'horario':'Nocturno'}];
  $scope.seleccionarHoraeO = [{'ids': 0, 'value':0, 'hora':'19-23'}];

  if( $scope.pedidos.hora != '' && $scope.cliente.tipo_usuario != 3){
    $scope.showProgramar=true;
    for (var i = 0; i < $scope.selectHora.length; i++) {
      if ($scope.selectHora[i].hora == $scope.pedidos.hora){
        $scope.horaPedido1 = $scope.selectHora[i];
      }
    }
  }

  if( $scope.pedidos.fecha_origen != ''){
    $scope.fecha_origen = new Date($scope.pedidos.fecha_origen);
  }

  if ($scope.cliente.almacen == 0) {
    if($scope.pedidos.turno_origen != ''){
      for (var i = 0; i < $scope.seleccionarHorarioO.length; i++) {
        if ($scope.seleccionarHorarioO[i].id == $scope.pedidos.turno_origen){
          $scope.horaPedido2_origen = $scope.seleccionarHorarioO[i].id;
        }
      }
    }

    if( $scope.pedidos.hora_origen != ''){
      for (var i = 0; i < $scope.seleccionarHoraeO.length; i++) {
        if ($scope.seleccionarHoraeO[i].hora == $scope.pedidos.hora_origen){
          $scope.horaPedido3_origen = $scope.seleccionarHoraeO[i];
        }
      }
    }
  }

  if ($scope.cliente.almacen == 1) {
    if($scope.pedidos.turno_origen != ''){
      for (var i = 0; i < $scope.seleccionarHorario.length; i++) {
        if ($scope.seleccionarHorario[i].id == $scope.pedidos.turno_origen){
          $scope.horaPedido2_origen = $scope.seleccionarHorario[i].id;
        }
      }
    }

    if( $scope.pedidos.hora_origen != ''){
      for (var i = 0; i < $scope.seleccionarHorae.length; i++) {
        if ($scope.seleccionarHorae[i].hora == $scope.pedidos.hora_origen){
          $scope.horaPedido3_origen = $scope.seleccionarHorae[i];
        }
      }
    }
  }
  
  
  if ($scope.pedidos.tipo_usuario != 3) {
    $scope.pedidos.hora1 = $scope.pedidos.hora;
  }

  setTimeout(function() {
    for (var i = 0; i < $scope.destinos.length; i++) {
      $scope.destinos[i].cantidad = parseInt($scope.destinos[i].cantidad);
      $scope.destinos[i].subtotal = parseFloat($scope.destinos[i].subtotal);
      $scope.destinos[i].cobrarecommerce = parseFloat($scope.destinos[i].cobrarecommerce);
      $scope.destinos[i].descuento = parseFloat($scope.destinos[i].descuento);
      if ($scope.destinos[i].subtotal == 0) {
        $scope.destinos[i].descuento = 0;
      }
      $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
      $scope.destinos[i].total = Number(($scope.destinos[i].total).toFixed(2));
      $scope.destinos[i].costo1 = parseFloat($scope.destinos[i].costo);

      if ($scope.pedidos.reprogramado > 0 && $scope.pedidos.tipo_usuario == 3) {
        if (parseFloat($scope.pedidos.costo) > parseFloat($scope.pedidos.costo_reprogramacion)) {
          $scope.destinos[i].costo1 = parseFloat($scope.pedidos.costo)- parseFloat($scope.pedidos.costo_reprogramacion);
        } else {
          $scope.destinos[i].costo1 = parseFloat($scope.pedidos.costo_reprogramacion) - parseFloat($scope.pedidos.costo);
        }
      }

      if (i == 0) {
        for (var j = 0; j < $scope.distritos.length; j++) {
          if ($scope.distritos[j].nombre == $scope.destinos[0].distrito_origen){
            $scope.destinos.distrito = $scope.distritos[j];
            $scope.destinos.distrito_origen = $scope.distritos[j].nombre;
            $scope.destinos.zona_origen = $scope.distritos[j].zona;
          }
          if ($scope.distritos[j].nombre == $scope.destinos[i].distrito_destino){
            $scope.destinos[i].distrito = $scope.distritos[j];
            $scope.destinos[i].distrito_destino = $scope.distritos[j].nombre;
            $scope.destinos[i].zona_destino = $scope.distritos[j].zona;
          }
        }    
      }  

      if (i > 0){
        for (var j = 0; j < $scope.distritos.length; j++) {
          if ($scope.distritos[j].nombre == $scope.destinos[i].distrito_destino){
            $scope.destinos[i].distrito = $scope.distritos[j];
            $scope.destinos[i].distrito_destino = $scope.distritos[j].nombre;
            $scope.destinos[i].zona_destino = $scope.distritos[j].zona;
          }
        }
      }

      if( $scope.destinos[i].fecha_destino != null){
        $scope.destinos[i].fecha_destino1 = new Date($scope.destinos[i].fecha_destino);
        console.log($scope.destinos[i].fecha_destino1);
      }
      if( $scope.destinos[i].fecha_destino == null){
        $scope.destinos[i].fecha_destino1 = new Date(); 
      }

      if( $scope.destinos[i].turno_destino != ''){
        for (var j = 0; j < $scope.seleccionarHorario.length; j++) {
          if ($scope.seleccionarHorario[j].id == $scope.destinos[i].turno_destino){
            $scope.destinos[i].horario_destino = $scope.seleccionarHorario[j].id;
          }
        }
      }

      if( $scope.destinos[i].hora_destino != ''){
        for (var j = 0; j < $scope.seleccionarHorae.length; j++) {
          if ($scope.seleccionarHorae[j].hora == $scope.destinos[i].hora_destino){
            $scope.destinos[i].hora_destino1 = $scope.seleccionarHorae[j];
          }
        }
      }
      
      if ($scope.pedidos.tipo_usuario == 3) {
        $scope.pedidos.hora1 = $scope.destinos[i].hora_destino;
        $scope.pedidos.fecha_origen = $filter('date')(new Date($scope.pedidos.fecha_origen),'dd/MM/yyyy');
        $scope.pedidos.destinos[0].fecha_entrega = $filter('date')(new Date($scope.pedidos.destinos[0].fecha_destino),'dd/MM/yyyy');
      }
    }
  }, 1200);

  $scope.costo_envio = function(pedido) {
    if (pedido.subtotal == 0) {
      pedido.descuento = 0;
    }
    pedido.total = parseFloat(pedido.subtotal) + parseFloat(pedido.cobrarecommerce) - parseFloat(pedido.descuento);
    pedido.total = Number((pedido.total).toFixed(2));
  };

  $scope.getLetter = function(index) {
    return String.fromCharCode(65+index);
  };

  if ($scope.pedidos.reprogramado > 0) {
    $scope.pedidos.tipo = 'REPROGRAMADO';
  }

  if ($scope.pedidos.tipo == 'PROGRAMADO') {
    $scope.pedidos.fecha = $filter('date')(new Date($scope.pedidos.fecha),'dd/MM/yyyy');
    $scope.showProgramar = true;
  }
  if ($scope.pedidos.tipo == 'REPROGRAMADO') {
    $scope.pedidos.fecha = $filter('date')(new Date($scope.pedidos.fecha),'dd/MM/yyyy');
    $scope.showProgramar = true;
  }
  if ($scope.pedidos.tipo == 'URGENTE') {
    $scope.pedidos.fecha = $filter('date')(new Date($scope.pedidos.fecha),'dd/MM/yyyy HH:mm:ss');
    $scope.showProgramar = false;
  }

  $scope.ajusteFecha_origen=function(fecha_origen){
    $scope.diaPedido_origen = $filter('date')(new Date(fecha_origen),'yyyy-MM-dd HH:mm:ss');
    if ($scope.cliente.almacen == 1) {
      SwitchFuction1_origen($scope.seleccionarHorae[$scope.horario_origen].value);
    }
    if ($scope.cliente.almacen == 0) {
      SwitchFuction1_origenO($scope.seleccionarHoraeO[$scope.horario_origen].value); 
    }
  }

  $scope.ajusteFecha_destino=function(pedido){
    pedido.fecha_destino = $filter('date')(new Date(pedido.fecha_destino1),'yyyy-MM-dd HH:mm:ss');
    SwitchFuction1_destino($scope.seleccionarHorae[pedido.horario_destino].value,pedido);
  }

  $scope.ajusteHora=function(data){
    $scope.horaPedido= data.hora;
    SwitchFuction(data.hora);
  }

  $scope.ajusteHora1_origen=function(data){
    $scope.horario_origen = data;
    $scope.horaPedido3_origen = $scope.seleccionarHorae[data];
    $scope.horaPedido_origen= $scope.seleccionarHorae[data].hora;
    SwitchFuction1_origen($scope.seleccionarHorae[data].value);
  }

  $scope.ajusteHora2_origen=function(data){
    $scope.horaPedido_origen= data.hora;
    SwitchFuction1_origen(data.value);
  }

  $scope.ajusteHora1_origenO=function(data){
    $scope.horario_origen = data;
    $scope.horaPedido3_origen = $scope.seleccionarHoraeO[data];
    $scope.horaPedido_origen= $scope.seleccionarHoraeO[data].hora;
    SwitchFuction1_origenO($scope.seleccionarHoraeO[data].value);
  }

  $scope.ajusteHora2_origenO=function(data){
    $scope.horaPedido_origen= data.hora;
    SwitchFuction1_origenO(data.value);
  }

  $scope.ajusteHora1_destino=function(pedido){
    pedido.turno_destino = pedido.horario_destino;
    SwitchCosto_destino(pedido.horario_destino,pedido);
    pedido.hora_destino1 = $scope.seleccionarHorae[pedido.horario_destino];
    pedido.hora_destino = $scope.seleccionarHorae[pedido.horario_destino].hora;
    SwitchFuction1_destino($scope.seleccionarHorae[pedido.horario_destino].value,pedido);
  }

  $scope.ajusteHora2_destino=function(data,pedido){
    pedido.hora_destino= data.hora;
    SwitchFuction1_destino(data.value,pedido);
  }


  $scope.ajusteDistrito=function(origen){
    origen.distrito_origen = origen.distrito.nombre;
    origen.zona_origen = origen.distrito.zona;
  }

  $scope.ajusteDistrito2=function(pedido){
    pedido.distrito_destino = pedido.distrito.nombre;
    pedido.zona_destino = pedido.distrito.zona;
  }

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour, 0, 0);  
    return date.toString();
  }

  var SwitchFuction1_origen = function (sno) {
    if ($scope.cliente.tipo_usuario == 3) {
      switch (sno) {
        case 0:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,14)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 1:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 2:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 3:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,11)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 4:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,12)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 5:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,13)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 6:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,14)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 7:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,15)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 8:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,16)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 9:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,17)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 10:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,18)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 11:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        default:
      }
    }
  }

  var SwitchFuction1_origenO = function (sno) {
    if ($scope.user.tipo_usuario == 3) {
      switch (sno) {
        case 0:
          $scope.diaPedido_origen = $filter('date')(new Date(getFormattedDate($scope.diaPedido_origen,23)),'yyyy-MM-dd HH:mm:ss');
          break;
        default:
      }
    }
  }

  var SwitchFuction1_destino = function (sno,pedido) {
    if ($scope.cliente.tipo_usuario == 3) {
      switch (sno) {
        case 0:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,14)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 1:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 2:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 3:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,11)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 4:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,12)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 5:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,13)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 6:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,14)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 7:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,15)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 8:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,16)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 9:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,17)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 10:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,18)),'yyyy-MM-dd HH:mm:ss');
          break;
        case 11:
          pedido.fecha_destino = $filter('date')(new Date(getFormattedDate(pedido.fecha_destino,19)),'yyyy-MM-dd HH:mm:ss');
          break;
        default:
      }
    }
  }

  var SwitchCosto_destino = function (sno,pedido) {
    $scope.costoe = 0;
    $scope.pedidos.costo = 0;

    if ($scope.cliente.almacen == 0 && $scope.cliente.tipo_usuario == 3) {
      $scope.costoe = parseFloat($scope.costosf[0].costossinalmacen);
    }

    if ($scope.cliente.tipo_usuario == 3) {
      switch (sno) {
        case 0:
          pedido.costo = parseFloat($scope.costosf[0].ecommerce_manana);
          break;
        case 1:
          pedido.costo = parseFloat($scope.costosf[0].ecommerce_tarde);
          break;
        case 2:
          pedido.costo = parseFloat($scope.costosf[0].ecommerce_completo);
          break;
        case 3:
          pedido.costo = parseFloat($scope.costosf[0].ecommerce_horas);
          break;
        default:
          pedido.costo = 0;
      }
    }

    for (var i = 0; i < $scope.destinos.length; i++) {
      $scope.costoe += $scope.destinos[i].costo;
      $scope.pedidos.costo += $scope.destinos[i].costo;
    }
  }

  var SwitchFuction = function (sno) {
    switch (sno) {
      case '09':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,9)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '10':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,10)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '11':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,11)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '12':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,12)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '13':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,13)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '14':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,14)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '15':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,15)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '16':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,16)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '17':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,17)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '18':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,18)),'yyyy-MM-dd HH:mm:ss');
        break;
      case '19':
        $scope.diaPedido = $filter('date')(new Date(getFormattedDate($scope.diaPedido,19)),'yyyy-MM-dd HH:mm:ss');
        break;
      default:
    }
  }

  $scope.actualizar =  function(){

    if($scope.horaPedido==''){
      $scope.horaPedido='';
    }

    if ($scope.horario_origen=='') {
      $scope.horario_origen='';
    }

    if ($scope.horaPedido_origen=='') {
      $scope.horaPedido_origen= '';
    }

    if(angular.isObject($scope.destinos.origen.geometry)){
      $scope.destinos[0].lat=$scope.destinos.origen.geometry.location.lat();
      $scope.destinos[0].lng=$scope.destinos.origen.geometry.location.lng();
      $scope.destinos.origen=$scope.destinos.origen.formatted_address;
    }
    
    for (var i = 0; i < $scope.destinos.length; i++) {
      if(angular.isObject($scope.destinos[i].destino.geometry)){
        $scope.destinos[i].lat2=$scope.destinos[i].destino.geometry.location.lat();
        $scope.destinos[i].lng2=$scope.destinos[i].destino.geometry.location.lng();
        $scope.destinos[i].destino=$scope.destinos[i].destino.formatted_address; 
      }
    }

    $scope.validadPedido=$scope.destinos.length;
    $scope.contadorPedido=0;
    $scope.destino_actualizar = [];
    
    if ($scope.cliente.tipo_usuario == 3) {

      $scope.pedido_actualizar1= {
        'fecha_origen': $filter('date')(new Date($scope.diaPedido_origen),'yyyy-MM-dd HH:mm:ss'),
        'turno_origen': $scope.horario_origen,
        'hora_origen': $scope.horaPedido_origen,
        'costo': $scope.pedidos.costo,
        'forma_pago': $scope.pedidos.forma_pago
      };

      var req_pedido = {
        method: 'PUT',
        url: '../api/public/api/update_pedidos/' + $scope.destinos[0].pedido_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.pedido_actualizar1
      }

      $http(req_pedido).then(function(response){
        for (var i = 0; i < $scope.destinos.length; i++) {   
          $scope.destino_actualizar.push({
            'origen':$scope.destinos.origen,
            'lat': $scope.destinos[i].lat,
            'lng': $scope.destinos[i].lng,
            'departamento_origen':$scope.destinos.departamento_origen,
            'nombre_origen':$scope.destinos.nombre_origen,
            'telefono_origen':$scope.destinos.telefono_origen,
            'distrito_origen':$scope.destinos.distrito_origen,
            'zona_origen':$scope.destinos.zona_origen,
            'comentarios':$scope.destinos.comentarios,
            'destino':$scope.destinos[i].destino,
            'lat2': $scope.destinos[i].lat2,
            'lng2': $scope.destinos[i].lng2,
            'departamento_destino':$scope.destinos[i].departamento_destino,
            'nombre_destino':$scope.destinos[i].nombre_destino,
            'telefono_destino':$scope.destinos[i].telefono_destino,
            'distrito_destino':$scope.destinos[i].distrito_destino,
            'zona_destino':$scope.destinos[i].zona_destino,
            'comentarios2':$scope.destinos[i].comentarios2,
            'cobrarecommerce': $scope.destinos[i].cobrarecommerce,
            'descuento': $scope.destinos[i].descuento,
            'cantidad': $scope.destinos[i].cantidad,
            'detalle': $scope.destinos[i].detalle,
            'subtotal': parseFloat($scope.destinos[i].subtotal),
            'fecha_destino': $filter('date')(new Date($scope.destinos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
            'turno_destino': $scope.destinos[i].turno_destino,
            'hora_destino': $scope.destinos[i].hora_destino,
            'costo': $scope.destinos[i].costo
          })

          var req_destinos = {
            method: 'PUT',
            url: '../api/public/api/update_destinos/' + $scope.destinos[i].id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.destino_actualizar[i]
          }

          $http(req_destinos).then(function(response){
            console.log(response.data);
            $scope.contadorPedido=$scope.contadorPedido+1;
            if($scope.contadorPedido == $scope.destinos.length){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El pedido fue actualizado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('ha ocurrido un error al enviar el destino')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
       
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('ha ocurrido un error al enviar el pedido')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }

    if ($scope.cliente.tipo_usuario != 3) {

      $scope.pedido_actualizar= {
        'fecha': $filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
        'hora': $scope.horaPedido
      };

      var req_pedido = {
        method: 'PUT',
        url: '../api/public/api/update_pedidos/' + $scope.destinos[0].pedido_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.pedido_actualizar
      }

      $http(req_pedido).then(function(response){
        for (var i = 0; i < $scope.destinos.length; i++) {   
          
          $scope.destino_actualizar.push({
            'origen':$scope.destinos.origen,
            'departamento_origen':$scope.destinos.departamento_origen,
            'zona_origen':$scope.destinos.zona_origen,
            'nombre_origen':$scope.destinos.nombre_origen,
            'telefono_origen':$scope.destinos.telefono_origen,
            'distrito_origen':$scope.destinos.distrito_origen,
            'comentarios':$scope.destinos.comentarios,
            'destino':$scope.destinos[i].destino,
            'departamento_destino':$scope.destinos[i].departamento_destino,
            'nombre_destino':$scope.destinos[i].nombre_destino,
            'telefono_destino':$scope.destinos[i].telefono_destino,
            'distrito_destino':$scope.destinos[i].distrito_destino,
            'zona_destino':$scope.destinos[i].zona_destino,
            'comentarios2':$scope.destinos[i].comentarios2
          })

          var req_destinos = {
            method: 'PUT',
            url: '../api/public/api/update_destinos/' + $scope.destinos[i].id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.destino_actualizar[i]
          }

          $http(req_destinos).then(function(response){
            console.log(response.data);
            $scope.contadorPedido=$scope.contadorPedido+1;
            if($scope.contadorPedido == $scope.destinos.length){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El pedido fue actualizado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('ha ocurrido un error al enviar el destino')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
       
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('ha ocurrido un error al enviar el pedido')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }
  }

  $scope.imprimir = function(pedido) {
    
    if(document.getElementById("detalle_pedido_view") != null){
      var pedidos = document.getElementById("detalle_pedido_view").innerHTML;  
    }  
    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
    }, 500);
  }

  $scope.cancelar =  function(){
    $location.path("/pendientes").search({param: param});
  }

  $scope.asignarmoto =  function(person){
    $mdDialog.show({
      controller: DialogController,
      locals:{data: person}, 
      templateUrl: 'templates/select_motorizado.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
    
    function DialogController($scope, $mdDialog,data) {
      $scope.pedidos = data;
      $scope.distancias = [];

      console.log(data);

      var req = {
        method: 'GET',
        url: '../api/public/api/motorizado',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data);
        $scope.motori=response.data.motorizados;
        for (var j = 0; j < $scope.motori.length; j++) {
          if ($scope.motori[j].tipo_auto == 1) {
            $scope.motori[j].tipo = 'Moto';
          } else if ($scope.motori[j].tipo_auto == 2) {
            $scope.motori[j].tipo = 'Auto';
          } else if ($scope.motori[j].tipo_auto == 3) {
            $scope.motori[j].tipo = 'Furgoneta';
          }
          $scope.distancias.push({
            nombre: $scope.motori[j].name + ' ' + $scope.motori[j].apellidos,
            telefono: $scope.motori[j].telefono,
            img: $scope.motori[j].foto,
            tipo: $scope.motori[j].tipo,
            motorizado_id: $scope.motori[j].id,
            push: $scope.motori[j].push
          })
        }
      }, function(){
        alert('ha ocurrido un error en obtener los motorizados');
      });

      /*var reqP = {
        method: 'GET',
        url: '../api/public/api/posicion',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqP).then(function(response){
        var motos = response.data;
        var j=0;
        for (var i = 0; i < motos.length; i++) {
          if (motos[i].estado == 0) {
            $scope.distancias.push(motos[i]);
          }
          j=j+1;  
        }
        if(motos.length==j){
          $scope.calcDistancia();
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });

      $scope.calcDistancia=function(){
          var lat= parseFloat($scope.pedidos.destinos[0].lat);
          var lng= parseFloat($scope.pedidos.destinos[0].lng);

          var R = 6371; // Radio tierra en Km
          var dLat = '';
          var dLon = '';
          var a = '';
          var c = ''; 
          var d = '';
          for (var i = 0; i <=$scope.distancias.length-1; i++) {
            R = 6371; // Radio tierra en Km
            dLat = 0;
            dLon = 0;
            a = 0;
            c = 0; 
            d = 0;
            dLat = ($scope.distancias[i].lat-lat) * Math.PI / 180;
            dLon = ($scope.distancias[i].lng-lng) * Math.PI / 180;
            lat1 = lat * Math.PI / 180;
            lat2 = $scope.distancias[i].lat* Math.PI / 180;
            a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            d = R * c;
            $scope.distancias[i].distancia=d;
            for (var j = 0; j < $scope.motori.length; j++) {
              if($scope.motori[j].id==$scope.distancias[i].motorizado_id){
                $scope.distancias[i].nombre=$scope.motori[j].name + ' ' + $scope.motori[j].apellidos;
                $scope.distancias[i].telefono=$scope.motori[j].telefono;
                $scope.distancias[i].img=$scope.motori[j].foto;
                if ($scope.motori[j].tipo_auto == 1) {
                  $scope.distancias[i].tipo = 'Moto';
                } else if ($scope.motori[j].tipo_auto == 2) {
                  $scope.distancias[i].tipo = 'Auto';
                } else if ($scope.motori[j].tipo_auto == 3) {
                  $scope.distancias[i].tipo = 'Furgoneta';
                }
              }
            }
          }
          setTimeout(function() {
            $scope.distancias.sort(function(a, b) {
              return a.distancia - b.distancia;
            });
          }, 300);
          setTimeout(function() {
            $scope.$apply();
          }, 400);
      }*/

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.select_moto = function(item) {
        console.log(item);
        $scope.estado = {
          estado: 1,
          motorizado_id: item.motorizado_id
        }

        /*$scope.estado2 = {
          estado: 1,
          pedido_id: $scope.pedidos.id
        }*/

        $scope.estado_destino = {
          estado_destino: 1,
          motorizado_id: item.motorizado_id
        }

        var confirm = $mdDialog.confirm()
          .title('Courier Liebre Express | Administrativo')
          .textContent('¿Desea asignar el pedido al motorizado '+ item.nombre +'?')
          .ariaLabel('Lucky day')
          .ok('SI')
          .cancel('NO');

        $mdDialog.show(confirm).then(function() {
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedidos.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado
          }

          /*var reqE = {
            method: 'PUT',
            url: '../api/public/api/update_posicion/' + item.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.estado2
          }*/

          var re_push = {
             method: 'GET',
             url: '../Motorizado5/onesignalMotorizado.php',
             headers: {
               'ID' : item.push
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: ''
          }

          var destinos_id = $scope.pedidos.destinos;
          $scope.count = 0;
          $scope.bandera = 0;

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.estado_destino
            }

            $http(reqD).then(function(response){
                $scope.count = $scope.count + 1;
                if ($scope.count == destinos_id.length) {
                  $http(req).then(function(response){
                    console.log(response.data);
                    if(response.data == ''){
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('El pedido fue asignado con éxito')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                      $location.path('/pendientes');
                      $http(re_push).then(function(response){
                        console.log(response.data);
                      }, function(){
                        alert('ha ocurrido un error al enviar el push');
                      });
                      $location.path('pendientes');
                      /*$http(reqE).then(function(response){
                        if(response.data == ''){
                          reloadData();
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('El pedido fue asignado con éxito')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                          $location.path('pendientes');
                        }
                      }, function(){
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });*/
                    }
                  }, function(){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
              }, function(){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        }, function() {
          
        });
      };
    }
  }

  $timeout(function() {
      $scope.consola();
  }, 500);

  $scope.gPlace;

  /********* Definición de las Variables ********/
  $scope.contador=1;
  var miUbicacion={};
  var misDestinos={};
  $scope.ruta=[{}];
  $scope.rutaG=[];
  var geocoder= new google.maps.Geocoder();
  var markers = [];
  directionsDisplays=[];
  var marcador={};
  var distance_min=6378137;
  var distance=0;
  var duration=0;
  $scope.duracion=0;
  $scope.km=0;
  $scope.ori='';
  $scope.dest='';
    

  /********* FIN Definición de las Variables ********/

  var circle = new google.maps.Circle({
    center: {lat:  -12.1056553, lng: -77.0369909},
    radius: 10*1000
  });

  $scope.autocompleteOptions = {
    bounds: circle.getBounds(),
    componentRestrictions: {country: 'pe'}
  }

  var lima={
    lat: -12.046374,
    lng: -77.042793
  }

  /********* FUNCION INICIALIZACIÓN DEL MAPA ********/    
  
  initMap= function(){
    $timeout(function() {
      var mapDiv2=document.getElementById('map');
        
      var mapOptions2={
      center: lima,
      zoom:14
      /*scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false*/
      }
      $scope.map2= new google.maps.Map(mapDiv2,mapOptions2);
    }, 300);
  } 
  
  initMap();

  /********* FIN FUNCION INICIALIZACIÓN DEL MAPA ********/   

  /********* FUNCION MARCADORES ********/ 

  addMarker= function(ubicacion,i){

    var pin = ["images/0.png",
               "images/1.png",
               "images/2.png",
               "images/3.png",
               "images/4.png",
               "images/5.png",
               "images/6.png",
               "images/7.png",
               "images/8.png",
               "images/9.png",
               "images/10.png",
               "images/11.png",
               "images/12.png",
               "images/13.png",
               "images/14.png",
               "images/15.png"
    ];
    var marker= new google.maps.Marker({
        map: $scope.map2,
        position: ubicacion,
        icon: pin[i],
        draggable: true
        //scaleControl: false
        //animation: google.maps.Animation.DROP
    })

    google.maps.event.addListener( marker, "dragend", function(event){
      var drag={
        lat:'',
        lng:''
      }

      if(marker.icon=="images/0.png"){
        drag.lat=marker.getPosition().lat();  
        drag.lng=marker.getPosition().lng();

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $scope.destinos.origen=results[0].formatted_address;
              $scope.destinos[0].lat=drag.lat;
              $scope.destinos[0].lng=drag.lng;
              $timeout(function() {
                $scope.consola();
              }, 50);
              
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
      }

      if(marker.icon.length==12){
        var val=marker.icon;
        var subVal=val.substring(7,8);
        drag.lat=marker.getPosition().lat();
        drag.lng=marker.getPosition().lng();

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $scope.destinos[subVal-1].destino=results[0].formatted_address; 
              $scope.destinos[subVal-1].lat2=drag.lat;
              $scope.destinos[subVal-1].lng2=drag.lng;
              $timeout(function() {
                $scope.consola();
              }, 50);
              
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });

      }else if(marker.icon.length==13){
        var val=marker.icon;
        var subVal=val.substring(7,9);
        drag.lat=marker.getPosition().lat();  
        drag.lng=marker.getPosition().lng();

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $scope.destinos[subVal-1].destino=results[0].formatted_address;      
              $scope.destinos[subVal-1].lat2=drag.lat;
              $scope.destinos[subVal-1].lng2=drag.lng;
              $timeout(function() {
                $scope.consola();
              }, 50);
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
      }      
    });
    markers.push(marker);
  }
  
  /********* FIN FUNCION MARCADORES ********/    
  
  /********* FUNCION TRAZADO DE RUTAS ********/  
  traceRoute= function(rutas){
    var duration=0;
    //alert('trace');
    if(rutas){
        for (var i = 0; i < directionsDisplays.length; i++) {
            //console.log(directionsDisplays[i]);
        directionsDisplays[i].setMap(null);
        }
    }   

    var directionsDisplay= new google.maps.DirectionsRenderer({
            polylineOptions: {strokeColor: "#029ed1"},
        });
    directionsDisplays.push(directionsDisplay);
    var directionsService= new google.maps.DirectionsService();
       
      var npoints = rutas.length;
    
    $timeout(function() {
         directionsDisplay.setMap($scope.map2);
        
        var request={
            destination: rutas[npoints-1],
            origin: rutas[1],
            travelMode: google.maps.TravelMode.DRIVING, 
            drivingOptions: {
              departureTime: new Date(Date.now()),
              trafficModel: google.maps.TrafficModel.PESSIMISTIC,
            }
        }

        if ( npoints > 2 ){
          request.waypoints = [];

          for ( i = 1; i < npoints - 1 ;i++){
            request.waypoints.push({
              location: rutas[i],
              stopover: true
            });
            // console.log("ORDER WAYPOINTS", request.waypoints);
          }
        }
        // console.log(request);
        request.optimizeWaypoints = true;
  
        directionsService.route(request,function(response,status){
            if(status==google.maps.DirectionsStatus.OK){
                directionsDisplay.setOptions({ suppressMarkers: true });
            directionsDisplay.setDirections(response);
           // console.log(response.routes[0].legs.length);
            for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
              duration=duration+response.routes[0].legs[i].duration.value;
            }
                            
            }
          })     
        }, 500);
    }
  /********* FIN FUNCION TRAZADO DE RUTAS ********/  



  /********* FIN FUNCIONES INTERCAMBIAR POSICIÓN ********/ 
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  $scope.consola = function(){
    duration=0;

    if(angular.isObject($scope.destinos.origen.geometry)){
      console.log($scope.destinos.origen);
      $scope.destinos[0].lat=$scope.destinos.origen.geometry.location.lat();
      $scope.destinos[0].lng=$scope.destinos.origen.geometry.location.lng();
      $scope.ruta.push({
        'lat':$scope.destinos.origen.geometry.location.lat(),
        'lng':$scope.destinos.origen.geometry.location.lng()
      });  
    }else{
      $scope.ruta.push({
        'lat': parseFloat($scope.destinos[0].lat),
        'lng': parseFloat($scope.destinos[0].lng)
      });
    }

    if($scope.destinos==''){
      clearMarkers();
      $timeout(function() {for (var i = 1; i < $scope.ruta.length+1; i++) {
        $scope.map.setCenter($scope.ruta[i]);
        addMarker($scope.ruta[i],0);
      }}, 200);
      
      $timeout(function() {$scope.ruta=[{}]; /*console.log('borro rutas');*/}, 1400);    
    }else{
      if(angular.isObject($scope.destinos[0].destino.geometry)){
        marcador.lat=$scope.destinos[0].destino.geometry.location.lat();
        marcador.lng=$scope.destinos[0].destino.geometry.location.lng();

        $scope.ruta.push({
          'lat':marcador.lat,
          'lng':marcador.lng
        });
      }else{
        marcador.lat= parseFloat($scope.destinos[0].lat2);
        marcador.lng= parseFloat($scope.destinos[0].lng2);

        $scope.ruta.push({
          'lat':marcador.lat,
          'lng':marcador.lng
        });
      }
                
      for (var i = 1; i < $scope.destinos.length; i++) {
        if(angular.isObject($scope.destinos[i].destino.geometry)){
          marcador.lat=$scope.destinos[i].destino.geometry.location.lat();
          marcador.lng=$scope.destinos[i].destino.geometry.location.lng();
          
          $scope.ruta.push({
            'lat':marcador.lat,
            'lng':marcador.lng
          });
        }else{
          marcador.lat= parseFloat($scope.destinos[i].lat2);
          marcador.lng= parseFloat($scope.destinos[i].lng2);

          $scope.ruta.push({
            'lat':marcador.lat,
            'lng':marcador.lng
          });
        }
      }
      
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      
      $timeout(function() {
        traceRoute($scope.ruta);
        for (var i = 1; i < $scope.ruta.length+1; i++) {
          addMarker($scope.ruta[i],i-1);
        }
      }, 200);
      
      $timeout(function() {$scope.ruta=[{}];}, 1400);
    }
  };

  $scope.consola2=function(id,band){

    var miUbicacion= {
      lat:'',
      lng:''
    }

    if (band == 0) {
      geocoder.geocode({'address': $scope.destinos.origen + 'lima Perú'}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          $scope.destinos[0].lat=results[0].geometry.location.lat();
          $scope.destinos[0].lng=results[0].geometry.location.lng();
          miUbicacion.lat= results[0].geometry.location.lat();
          miUbicacion.lng= results[0].geometry.location.lng();
          
          $scope.map.setCenter(miUbicacion);  
          addMarker(miUbicacion,0);

          setTimeout(function() {
             miUbicacion.lat= 0;
             miUbicacion.lng= 0;
          }, 100);
        }
      });
    } else {
      for (var i = 0; i < $scope.destinos.length; i++) {
        if($scope.destinos[i].id==id){
          console.log($scope.destinos[i].destino);
          geocoder.geocode({'address': $scope.destinos[i].destino + 'lima Perú'}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {

                for (var i = 0; i < $scope.destinos.length; i++) {
                  if($scope.destinos[i].id==id){
                    $scope.destinos[i].lat2=results[0].geometry.location.lat();
                    $scope.destinos[i].lng2=results[0].geometry.location.lng();
                    miUbicacion.lat= results[0].geometry.location.lat();
                    miUbicacion.lng= results[0].geometry.location.lng();
                    
                    $scope.map.setCenter(miUbicacion);  
                    addMarker(miUbicacion,i);
                    $scope.consola();

                    setTimeout(function() {
                       miUbicacion.lat= 0;
                       miUbicacion.lng= 0;
                    }, 100);
                  }
                }
            } else {
              //alert('Geocode address was not successful for the following reason: ' + status);
            }
          });
        }
      }
    }
  };

  $scope.$watch(
    function($scope) { 
        return $scope.destinos.origen 
    }, function() {
        if(angular.isObject($scope.destinos.origen)){
          setTimeout(function() {
            $scope.ruta=[{}];
            $scope.consola();}, 2500);
        }
    });

  $scope.$watchCollection(
    function($scope) { 
      return $scope.destinos.destino
    }, function() {
      setTimeout(function() {
        $scope.ruta=[{}];
        $scope.consola();
      }, 1500);
    });

  $scope.change=function(id){
    for (var i = 0; i<$scope.destinos.length; i++) {
      if(id==$scope.destinos[i].id){
        if(angular.isObject($scope.destinos[i].destino)){
        setTimeout(function() {
          $scope.ruta=[{}];
          $scope.consola();}, 1500);
        } 
      }
    }
  };
})

.controller('ClientesCtrl', function($scope,$timeout,$mdDialog,$http,Upload,userService,$rootScope) {

  $scope.agregar = function() {
    $mdDialog.show({
      controller: DialogController, 
      templateUrl: 'templates/agregar_cliente.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
      
      function DialogController($scope, $mdDialog) {
        $scope.motorizado = {
          'name': '',
          'apellidos': '',
          'dni': '',
          'ruc': '',
          'email': '',
          'telefono': '',
          'tipo_usuario': 1,
          'password': '',
          'rpassword': '',
          'img': 'images/user.png' 
        }

        $scope.items = [
          { id: 1, name: 'Persona' },
          { id: 2, name: 'Empresa' },
          { id: 3, name: 'Ecommerce' }
        ];

        $scope.select_item = $scope.items[0];

        $scope.update_type = function(select) {
          $scope.motorizado.tipo_usuario = select.id;
        }

        $scope.imagenSubir = '';
        $scope.updateimage = false;

        $scope.changeImage=function(data){
          $scope.imagenSubir=data;
          $scope.updateimage = true;
        };

        var uploadPic = function(idC) {
          var file = $scope.imagenSubir;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirImagenCliente.php',
            data: obj
          });

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.motorizado.img =  file.result;

              $http(req).then(function(response){
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El cliente se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al agregar el cliente')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;

              $scope.motorizado.img =  'images/user.png';

              $http(req).then(function(response){
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El cliente se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al agregar el cliente')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.update = function() {

          if ($scope.motorizado.tipo_usuario == 2 || $scope.motorizado.tipo_usuario == 3  ) {
            console.log($scope.motorizado);
            $scope.motorizado.name = $scope.motorizado.razon_social; 
          }

          if ($scope.motorizado.password == '' || $scope.motorizado.name == '' || $scope.motorizado.email == '') {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Debe completar todos los campos')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            )
            return true;
          }

          if ($scope.motorizado.password != $scope.motorizado.rpassword) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Campos de contraseñas no coinciden')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            )
            return true;
          }

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          if ($scope.imagenSubir) {
            uploadPic(new Date().getTime());
          } else{
            $http(req).then(function(response){
              console.log(response.data);
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El cliente se agregó con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
              $rootScope.$emit("ActualizarTabla", {});
            }, function(){
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al agregar el cliente')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            });
          }
        }

        $scope.cancel = function() {
          $mdDialog.hide();
        }
      }
  }
})

.controller('ListadoClientesCtrl', function ($scope, $compile, $mdDialog, Upload, $rootScope, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService) {
 
  var req = {
    method: 'GET',
    url: '../api/public/api/users',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  var vm = this;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.dtInstance = {};
  vm.persons = {};
  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.tracking = [];
      $scope.pedidos = [];

      $http(req).then(function(response){
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          $scope.pedidos = response.data.pedidos;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.pedidos[i].tipo_usuario == 1 || $scope.pedidos[i].tipo_usuario == 2 || $scope.pedidos[i].tipo_usuario == 3) {
              $scope.tracking.push($scope.pedidos[i]);
            }
            count = count + 1;
          }
        }
        if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      })
      return defer.promise;
    })
    .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Pedido:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')
      .withOption('order', [0, 'desc'])
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Tipo Usuario').notSortable().renderWith(tipoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Nombres / Razón Social').notSortable().renderWith(nombreHtml),
        DTColumnBuilder.newColumn(null).withTitle('DNI / RUC').notSortable().renderWith(dniHtml),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('telefono').withTitle('Teléfono'),
        DTColumnBuilder.newColumn(null).withTitle('Acción').notSortable().renderWith(actionsHtml)
    ];

        
    $rootScope.$on("ActualizarTabla", function(){ 
      reloadData();
    });

    function reloadData() {  
      var resetPaging = true;
      vm.dtInstance.reloadData(null, resetPaging);
    }

    function edit(person) {
      $mdDialog.show({
        controller: DialogController,
        locals:{data: person}, 
        templateUrl: 'templates/edit_cliente.html',
        parent: angular.element(document.body),
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
      
      }, function() {
        
      });
      
      function DialogController($scope, $mdDialog,data,Upload) {
        $scope.motorizado = data;
        $scope.imagenSubir = '';
        $scope.updateimage = false;

        $scope.changeImage=function(data){
          $scope.imagenSubir=data;
          $scope.updateimage = true;
        };

        var uploadPic = function(idC) {
          var file = $scope.imagenSubir;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirImagenCliente.php',
            data: obj
          });

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_users/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.motorizado.img =  file.result + '?' + new Date().getTime();

              $http(req).then(function(response){
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El cliente fue modificado con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                reloadData();
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al editar el cliente')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;

              $scope.motorizado.img =  'images/user.png';

              $http(req).then(function(response){
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El cliente fue modificado con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                reloadData();
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al editar el cliente')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });

          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.update = function() {
          
          if ($scope.motorizado.tipo_usuario == 2 || $scope.motorizado.tipo_usuario == 3  ) {
            $scope.motorizado.name = $scope.motorizado.razon_social; 
          }

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_users/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          if ($scope.imagenSubir) {
            uploadPic($scope.motorizado.id);
          } else {
            $http(req).then(function(response){
              console.log(response.data);
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El cliente fue modificado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
              reloadData();
            }, function(){
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al editar el cliente')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            });
          }
        };

        $scope.cancel = function() {
          $mdDialog.hide();
        }
      }
    }

    function deleteRow(person) {

      console.log(person);
        
      var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea eliminar al cliente '+ person.name +'?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

      $mdDialog.show(confirm).then(function() {
        var req = {
          method: 'DELETE',
          url: '../api/public/api/destroy_users/'+ person.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data);
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('El cliente fue eliminado con éxito')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          )
          reloadData(); 
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error al eliminar el cliente')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          )
        });
      }, function() {
        
      });  
    }

    function createdRow(row, data, dataIndex) {

        $compile(angular.element(row).contents())($scope);
    }
    
    function dniHtml(data, type, full, meta) {
      
      if (data.tipo_usuario == 1) {
        $variable = data.dni;
      }
      if (data.tipo_usuario == 2 || data.tipo_usuario == 3) {
        $variable = data.ruc;
      } 
      return $variable;
    }

    function nombreHtml(data, type, full, meta) {
      
      if (data.tipo_usuario == 1) {
        if (data.apellidos != null) {
          $variable = data.name +' '+ data.apellidos ; 
        } else {
          $variable = data.name;
        }
      }
      if (data.tipo_usuario == 2 || data.tipo_usuario == 3) {
        $variable = data.razon_social;
      } 
      return $variable;
    }

    function tipoHtml(data, type, full, meta) {

      if (data.tipo_usuario == 1) {
        $variable = '<md-tooltip md-direction="top">Persona</md-tooltip><i class="fa fa-user medio_table" aria-hidden="true"></i>';
      }
      if (data.tipo_usuario == 2) {
        $variable = '<md-tooltip md-direction="top">Empresa</md-tooltip><i class="fa fa-building medio_table" aria-hidden="true"></i>';
      }
      if (data.tipo_usuario == 3) {
        $variable = '<md-tooltip md-direction="top">Ecommerce</md-tooltip><i class="fa fa-desktop medio_table" aria-hidden="true"></i>';
      } 
      return $variable;
    }

    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
        return '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
            '   <md-tooltip md-direction="top">Editar Cliente</md-tooltip><i class="fa fa-edit"></i>' +
            '</button>' + '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])">' +
            '   <md-tooltip md-direction="top">Eliminar Cliente</md-tooltip><i class="fa fa-times"></i>' +
            '</button>';
    }
})

.controller('MotorizadosCtrl', function($scope,$timeout,$mdDialog,$http,Upload,userService,$rootScope) {

  $scope.agregar = function() {
    $mdDialog.show({
      controller: DialogController, 
      templateUrl: 'templates/agregar_motorizado.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
    }, function() {
      
    });
      
      function DialogController($scope, $mdDialog) {
        $scope.motorizado = {
          'name': '',
          'apellidos': '',
          'dni': '',
          'email': '',
          'telefono': '',
          'tipo_usuario': '4',
          'password': '',
          'rpassword': '',
          'tipo_auto': '1',
          'modelo_moto': '',
          'ano': '',
          'placa': '',
          'carnet': '',
          'foto':'images/user.png',
          'img':'images/user.png',
          'foto_moto': 'images/user.png',
          'activo': '1',
          'antecedente': '',
          'soat': '',
          'revision': ''
        }

        $scope.tab = 1;

        $scope.setTab = function(newTab){
          $scope.tab = newTab;
        };

        $scope.isSet = function(tabNum){
          return $scope.tab === tabNum;
        };

        $scope.items = [
          { id: 1, name: 'Moto' },
          { id: 2, name: 'Auto' },
          { id: 3, name: 'Furgoneta' }
        ];

        $scope.select_item = $scope.items[0];

        $scope.update_type = function(select) {
          $scope.motorizado.tipo_auto = select.id;
        }

        $scope.imagenSubir = '';
        $scope.updateimage = false;
        $scope.imagenSubir1 = '';
        $scope.updateimage1 = false;
        $scope.upload = false;
        $scope.upload1 = false;
        $scope.id = '';

        $scope.changeImage=function(data){
          $scope.imagenSubir=data;
          $scope.updateimage = true;
        };

        $scope.changeImage1=function(data){
          $scope.imagenSubir1=data;
          $scope.updateimage1 = true;
        };

        var req = {
          method: 'POST',
          url: '../api/public/api/auth/signup_motorizado',
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.motorizado
        }

        $scope.siguiente1=function(){
          $scope.setTab(2);
        };

        var uploadPic = function(idC) {
          var file = $scope.imagenSubir;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirImagenConductor.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.motorizado.foto = file.result;
              $scope.motorizado.img =  file.result;
              $scope.upload = true;
              if ($scope.upload) {
              $http(req).then(function(response){
                console.log(response.data.token);
                $scope.id = response.data.token;
                if ($scope.updateimage1) {
                  uploadPic1($scope.id);
                }
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El motorizado se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
                $scope.ant = '';
                $scope.st = '';
                $scope.rv = '';
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al agregar el motorizado')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
            }
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
              $scope.upload = true;
              $scope.motorizado.foto = 'images/user.png';
              $scope.motorizado.img = 'images/user.png';
              if ($scope.upload) {
                $http(req).then(function(response){
                  console.log(response.data);
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El motorizado se agregó con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                  $rootScope.$emit("ActualizarTabla", {});
                }, function(){
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error al agregar el motorizado')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                });
              }
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadPic1 = function(idC) {
          var file = $scope.imagenSubir1;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          $scope.moto = {
            'foto_moto': 'images/user.png'
          }

          var reqM = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ idC,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.moto
          }

          file.upload = Upload.upload({
            url: 'php/subirImagenAuto.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.moto.foto_moto = response.data;
              $http(reqM).then(function(response){           
                $rootScope.$emit("ActualizarTabla", {});
              }, function(){
              });
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.imagenAntecedente = '';
        $scope.imagenSoat = '';
        $scope.imagenRevision = '';
        $scope.updatearchivo = false;
        var antecedente = '';
        var soat = '';
        var revision = '';
        $scope.antd = 0;
        $scope.soa = 0;

        $scope.changeAntecedente=function(data){
          $scope.imagenAntecedente=data;
          $scope.loading = true;
          antecedente = new Date().getTime();
          uploadTemp(antecedente, data, 1);
        };

        $scope.changeSoat=function(data){
          $scope.imagenSoat = data;
          $scope.loading = true;
          soat = new Date().getTime();
          uploadTemp(soat, data, 2);
        };

        $scope.changeRevision=function(data){
          $scope.imagenRevision = data;
          $scope.loading = true;
          revision = new Date().getTime();
          uploadTemp(revision, data, 3);
        };

        $scope.deleteAntecedente=function(data){
          $scope.imagenAntecedente = '';
          $scope.motorizado.antecedente = '';
          $scope.ant = '';
          $scope.loading = false;
          antecedente = '';
        };

        $scope.deleteSoat=function(data){
          $scope.imagenSoat = '';
          $scope.motorizado.soat = '';
          $scope.st = '';
          $scope.loading = false;
          soat = '';
        };

        $scope.deleteRevision=function(data){
          $scope.imagenRevision = '';
          $scope.motorizado.revision = '';
          $scope.rv = '';
          $scope.loading = false;
          revision = '';
        };

        var uploadTemp = function(idC,data,i) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirTemporal.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              if (i == 1) {
                $scope.ant = file.result;
              } else if (i == 2) {
                $scope.st = file.result;
              } else if (i == 3) {
                $scope.rv = file.result;
              }
              $scope.loading = false;    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadAntecedente = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirAntecedente.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.antecedente = file.result;
              $scope.setTab(3);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadSoat = function(idC,data) {
          var file = data;
          var name= idC;
          //console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirSoat.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.soat = file.result;
              $scope.setTab(4);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadRevision = function(idC,data) {
          var file = data;
          var name= idC;
          //console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup_motorizado',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload = Upload.upload({
            url: 'php/subirRevision.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.revision = file.result;
              if ($scope.updateimage) {
                uploadPic(new Date().getTime());
              } else {
                $http(req).then(function(response){           
                  console.log(response.data);
                  if ($scope.updateimage1) {
                    uploadPic1(response.data.token);
                  }
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El motorizado se agregó con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                  $rootScope.$emit("ActualizarTabla", {});
                  $scope.ant = '';
                  $scope.st = '';
                  $scope.rv = '';
                }, function(){
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error al agregar el motorizado')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                });
              }    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.agregar1 = function(data){
          if (data != '' && $scope.antd == 0) {
            uploadAntecedente(antecedente,data);
            $scope.setTab(3); 
            $scope.antd = 1;
            console.log('entro');
          } else {
            $scope.setTab(3); 
          }
        };

        $scope.agregar2 = function(data){
          if (data != '' && $scope.soa == 0) {
            uploadSoat(soat,data);
            $scope.setTab(4); 
            $scope.soa = 1;
            console.log('entro2');
          } else {
            $scope.setTab(4); 
          } 
        };

        $scope.atras2 = function() {
          $scope.setTab(1);
        }

        $scope.atras3 = function() {
          $scope.setTab(2);
        }

        $scope.atras4 = function() {
          $scope.setTab(3);
        }

        $scope.cancel = function() {
          $mdDialog.hide();
        }

        $scope.update = function() {

          console.log($scope.motorizado);

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup_motorizado',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          if ($scope.imagenRevision != '') {
            uploadRevision(revision,$scope.imagenRevision);
          } else {
            if ($scope.updateimage) {
              uploadPic(new Date().getTime());
            } else {
              $http(req).then(function(response){           
                console.log(response.data);
                if ($scope.updateimage1) {
                  uploadPic1(response.data.token);
                }
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El motorizado se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
                $scope.ant = '';
                $scope.st = '';
                $scope.rv = '';
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al agregar el motorizado')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
            }
          }
        }
      }
  }

})

.controller('ListadoMotorizadosCtrl', function ($scope, $mdDialog, $compile, DTOptionsBuilder, Upload, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService, $rootScope) {

  var req = {
    method: 'GET',
    url: '../api/public/api/motorizado',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  var vm = this;
  vm.edit = edit;
  vm.delete = deleteRow;
  vm.dtInstance = {};
  vm.persons = {};
  vm.dtOptions =  DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      $scope.tracking = [];
      $scope.pedidos = [];

      $http(req).then(function(response){
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          $scope.tracking = response.data.motorizados;
          defer.resolve($scope.tracking);
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      })
      return defer.promise;
    })
    .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Motorizado:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      })
      .withPaginationType('full_numbers')
      .withOption('order', [0, 'desc'])
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Tipo vehículo').notSortable().renderWith(autoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Nombres').notSortable().renderWith(nombreHtml),
        DTColumnBuilder.newColumn('dni').withTitle('DNI'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('telefono').withTitle('Teléfono'),
        DTColumnBuilder.newColumn('modelo_moto').withTitle('Modelo'),
        DTColumnBuilder.newColumn('ano').withTitle('Año'),
        DTColumnBuilder.newColumn('placa').withTitle('Placa'),
        //DTColumnBuilder.newColumn('carnet').withTitle('Carnet'),
        //DTColumnBuilder.newColumn(null).withTitle('Estado').notSortable().renderWith(tipoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Acción').notSortable().renderWith(actionsHtml)
    ];

    $rootScope.$on("ActualizarTabla", function(){ 
      reloadData();
    });

    function reloadData() {  
      var resetPaging = true;
      vm.dtInstance.reloadData(null, resetPaging);
    }

    function edit(person) {

      console.log(person);

      $mdDialog.show({
        controller: DialogController,
        locals:{data: person}, 
        templateUrl: 'templates/edit_motorizado.html',
        parent: angular.element(document.body),
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
      
      }, function() {
        
      });
      
      function DialogController($scope, $mdDialog,data, Upload) {

        $scope.tab = 1;

        $scope.setTab = function(newTab){
          $scope.tab = newTab;
        };

        $scope.isSet = function(tabNum){
          return $scope.tab === tabNum;
        };

        $scope.motorizado = data;

        $scope.motorizado.foto = $scope.motorizado.foto +'?'+ new Date().getTime();
        $scope.motorizado.foto_moto = $scope.motorizado.foto_moto +'?'+ new Date().getTime();

        $scope.items = [
          { id: 1, name: 'Moto' },
          { id: 2, name: 'Auto' },
          { id: 3, name: 'Furgoneta' }
        ];

        if ($scope.motorizado.tipo_auto == 1) {
          $scope.select_item = $scope.items[0];
        } else if ($scope.motorizado.tipo_auto == 2) {
          $scope.select_item = $scope.items[1];
        } else if ($scope.motorizado.tipo_auto == 3) {
          $scope.select_item = $scope.items[2];
        }

        $scope.update_type = function(select) {
          $scope.motorizado.tipo_auto = select.id;
        }

        $scope.imagenSubir = '';
        $scope.updateimage = false;
        $scope.imagenSubir1 = '';

        $scope.changeImage=function(data){
          $scope.imagenSubir=data;
          $scope.updateimage = true;
        };

        $scope.changeImage1=function(data){
          $scope.imagenSubir1=data;
          $scope.updateimage1 = true;
        };

        var uploadPic = function(idC) {
          var file = $scope.imagenSubir;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirImagenConductor.php',
            data: obj
          });

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_users/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          var reqM = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.motorizado.foto = file.result;
              $scope.motorizado.img =  file.result;

              $http(reqM).then(function(response){
                $http(req).then(function(response){
                console.log(response.data);
                  if ($scope.imagenSubir1) {
                    uploadPic1($scope.motorizado.id);
                  }
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El motorizado fue modificado con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                  reloadData();
                }, function(){
                  $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error al editar el motorizado')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                });
              }, function(){
                $mdDialog.hide();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error al editar el motorizado')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
              });
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadPic1 = function(idC) {
          var file = $scope.imagenSubir1;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirImagenAuto.php',
            data: obj
          });

          var reqM = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.motorizado.foto_moto = response.data;         
              $http(reqM).then(function(response){
                reloadData();
              }, function(){
              });
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        if ($scope.motorizado.antecedente != null) {
          var antecedentes = $scope.motorizado.antecedente.split('/');
          $scope.imagenAntecedente = {
            name: antecedentes[3] 
          };
        }
        if ($scope.motorizado.soat != null) {
          var soats = $scope.motorizado.soat.split('/');
          $scope.imagenSoat = {
            name: soats[3]
          };
        }
        if ($scope.motorizado.revision != null) {
          var revisiones = $scope.motorizado.revision.split('/'); 
          $scope.imagenRevision = {
            name: revisiones[3]
          };
        }

        $scope.updatearchivo = false;
        var antecedente = '';
        var soat = '';
        var revision = '';
        $scope.antd = 0;
        $scope.soa = 0;
        $scope.ant = $scope.motorizado.antecedente;
        $scope.st = $scope.motorizado.soat;
        $scope.rv = $scope.motorizado.revision;

        $scope.changeAntecedente=function(data){
          $scope.imagenAntecedente=data;
          $scope.loading = true;
          antecedente = new Date().getTime();
          uploadTemp(antecedente, data, 1);
        };

        $scope.changeSoat=function(data){
          $scope.imagenSoat = data;
          $scope.loading = true;
          soat = new Date().getTime();
          uploadTemp(soat, data, 2);
        };

        $scope.changeRevision=function(data){
          $scope.imagenRevision = data;
          $scope.loading = true;
          revision = new Date().getTime();
          uploadTemp(revision, data, 3);
        };

        $scope.deleteAntecedente=function(data){
          $scope.imagenAntecedente = '';
          $scope.motorizado.antecedente = '';
          $scope.ant = '';
          $scope.loading = false;
          antecedente = '';
        };

        $scope.deleteSoat=function(data){
          $scope.imagenSoat = '';
          $scope.motorizado.soat = '';
          $scope.st = '';
          $scope.loading = false;
          soat = '';
        };

        $scope.deleteRevision=function(data){
          $scope.imagenRevision = '';
          $scope.motorizado.revision = '';
          $scope.rv = '';
          $scope.loading = false;
          revision = '';
        };

        var uploadTemp = function(idC,data,i) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirTemporal.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              if (i == 1) {
                $scope.ant = file.result;
              } else if (i == 2) {
                $scope.st = file.result;
              } else if (i == 3) {
                $scope.rv = file.result;
              }
              $scope.loading = false;    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadAntecedente = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload = Upload.upload({
            url: 'php/subirAntecedente.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.antecedente = file.result;
              $http(req).then(function(response){           
                  console.log(response.data);
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('El antecedente penal se actualizó con éxito')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                  $rootScope.$emit("ActualizarTabla", {});
                }, function(){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error al actualizar el antecedente penal')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  )
                });    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadSoat = function(idC,data) {
          var file = data;
          var name= idC;
          //console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload = Upload.upload({
            url: 'php/subirSoat.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.soat = file.result;
              $http(req).then(function(response){           
                console.log(response.data);
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El SOAT se actualizó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al actualizar el SOAT')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        var uploadRevision = function(idC,data) {
          var file = data;
          var name= idC;
          //console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          file.upload = Upload.upload({
            url: 'php/subirRevision.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.revision = file.result;
              $http(req).then(function(response){           
                console.log(response.data);
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('La revisión técnica se actualizó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al actualizar el evisión técnica')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });   
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.agregar1 = function(data){
          if (data != '') {
            uploadAntecedente(antecedente,data);
            console.log('entro');
          } else {
            var reqM = {
              method: 'PUT',
              url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.motorizado
            }
            $scope.motorizado.antecedente = null;
            $http(reqM).then(function(response){           
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El antecedente penal se elimino con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
            }, function(){
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al eliminar el antecedente penal')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            }); 
          }
        };

        $scope.agregar2 = function(data){
          if (data != '') {
            uploadSoat(soat,data);
          } else {
            var reqM = {
              method: 'PUT',
              url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.motorizado
            }
            $scope.motorizado.soat = null;
            $http(reqM).then(function(response){           
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El SOAT se elimino con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
            }, function(){
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al eliminar el SOAT')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            }); 
          }
        };

        $scope.agregar3 = function(data){
          if (data != '') {
            uploadRevision(revision,data);
          } else {
            var reqM = {
              method: 'PUT',
              url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.motorizado
            }
            $scope.motorizado.revision= null;
            $http(reqM).then(function(response){           
                console.log(response.data);
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('La revisión técnica se elimino con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                $rootScope.$emit("ActualizarTabla", {});
            }, function(){
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al eliminar la revisión técnica')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            }); 
          }
        };

        $scope.siguiente1 = function(data){
          $scope.setTab(2);
        };

        $scope.siguiente2 = function(data){
          $scope.setTab(3);
        };

        $scope.siguiente3 = function(data){
          $scope.setTab(4);
        };

        $scope.atras1 = function(data){
          $scope.setTab(1);
        };

        $scope.atras2 = function(data){
          $scope.setTab(2);
        };

        $scope.atras3 = function(data){
          $scope.setTab(3);
        };

        $scope.update = function() {

          var req = {
            method: 'PUT',
            url: '../api/public/api/update_users/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          var reqM = {
            method: 'PUT',
            url: '../api/public/api/update_moto_admin/'+ $scope.motorizado.id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.motorizado
          }

          if ($scope.imagenSubir) {
            uploadPic($scope.motorizado.id);
          } else{
            $http(reqM).then(function(response){
              $http(req).then(function(response){
                console.log(response.data);
                if ($scope.imagenSubir1) {
                  uploadPic1($scope.motorizado.id);
                }
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El motorizado fue modificado con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
                reloadData();
              }, function(){
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al editar el motorizado')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              });
            }, function(){
              $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('Ha ocurrido un error al editar el motorizado')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
            });
          }
        }

        $scope.cancel = function() {
          $scope.imagenAntecedente = '';
          $scope.imagenSoat = '';
          $scope.imagenRevision = '';
          $mdDialog.hide();
        }
      }
    }

    function deleteRow(person) {

      console.log(person);
        
      var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea eliminar al motorizado '+ person.name +'?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

      $mdDialog.show(confirm).then(function() {
        var req = {
          method: 'DELETE',
          url: '../api/public/api/destroy_users/'+ person.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        var reqM = {
          method: 'DELETE',
          url: '../api/public/api/destroy_moto_admin/'+ person.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(reqM).then(function(response){
          $http(req).then(function(response){
            console.log(response.data);
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('El motorizado fue eliminado con éxito')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            )
            reloadData(); 
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error al eliminar el motorizado')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            )
          });          
        }, function(){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error al eliminar el motorizado')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          )
        });
      }, function() {
        
      });  
    }

    function createdRow(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
    }

    function nombreHtml(data, type, full, meta) {
      if (data.apellidos != null) {
        return $variable = data.name + ' ' + data.apellidos;
      } else { 
        return $variable = data.name;
      }
    }

    function tipoHtml(data, type, full, meta) {
      if (data.activo == 1) {
        $variable = 'Activo';
      }
      if (data.activo == 0) {
        $variable = 'Inactivo';
      } 
      return $variable;
    }

    function autoHtml(data, type, full, meta) {

      if (data.tipo_auto == 1) {
        $variable = '<md-tooltip md-direction="top">Moto</md-tooltip><i class="fa fa-motorcycle medio_table" aria-hidden="true"></i>';
      }
      if (data.tipo_auto == 2) {
        $variable = '<md-tooltip md-direction="top">Auto</md-tooltip><i class="fa fa-car medio_table" aria-hidden="true"></i>';
      }
      if (data.tipo_auto == 3) {
        $variable = '<md-tooltip md-direction="top">Furgoneta</md-tooltip><i class="fa fa-truck medio_table" aria-hidden="true"></i>';
      } 
      return $variable;
    }

    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
        return '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
            '   <md-tooltip md-direction="top">Editar Motorizado</md-tooltip><i class="fa fa-edit"></i>' +
            '</button>' + '<button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" ng-click="showCase.delete(showCase.persons[' + data.id + '])">' +
            '   <md-tooltip md-direction="top">Eliminar Motorizado</md-tooltip><i class="fa fa-times"></i>' +
            '</button>';
    }
})

/*.controller('ReportesCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 10;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
  var totalcobrar = 0;
  $scope.no_reporte = false;

  $scope.pagos = {
    total_cobrar: 0,
    total_servicios: 0,
    pagar_efect: 0,
    pagar_pos: 0,
    total_sinservicio: 0,
    total_serviciosolva: 0,
    costo_adicional: 0,
    total_depostirar: 0,
    count_servicios: 0,
    count_entregados: 0,
    count_anulados: 0,
    count_reprogramados: 0,
    total_pedientedepago: 0,
    costo_recojo: 0,
    pendiente: 0
  };

  var req = {
    method: 'GET',
    url: '../api/public/api/users',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.cambia = function(DirOrigen){
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pagedItems = [];
    $scope.pendientes = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.no_reporte = false;
  };

  $scope.cliente = {
    fechaInicio: new Date(),
    fechaFin: new Date()
  }

  $scope.fechaInicio = '';
  $scope.fechaFin = '';

  $scope.Consultar = function(){
    $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');

    $scope.tracking = [];
    $scope.selected = [];
    $scope.pendientes = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.cancelados = true;

    var req = {
      method: 'GET',
      url: '../api/public/api/admin',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.pedidos = response.data.pedidos;

      if ($scope.pedidos != '') {
        $scope.no_reporte = true;
        $scope.cancelados = true;
        for (var i = 0; i < $scope.pedidos.length; i++) {

          if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
            if ($scope.pedidos[i].estado == 3) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
            }
            if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
            }
          }

          if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
            if ($scope.pedidos[i].estado == 3) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
            }
            if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
            }
          }

          if ($scope.pedidos[i].tipo_usuario == 3) {
            if ($scope.pedidos[i].estado == 3) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
            }
            if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
            }
          }

          if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 3 && $scope.pedidos[i].estado != 4) {
            $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
          }

          if ($scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {

            $scope.no_reporte = false;
            $scope.pedidos[i].fecha_reprogramacion = '';

            $scope.pagos.costo_recojo += parseFloat($scope.pedidos[i].costo_recojo);

            if ($scope.pedidos[i].tipo_usuario != 3) {
              $scope.pagos.total_servicios += parseFloat($scope.pedidos[i].costo);
              totalcobrar = parseFloat($scope.pedidos[i].destinos[0].subtotal);
              $scope.pagos.total_cobrar += totalcobrar;
              
              if ($scope.pedidos[i].forma_pago == 0) {
                $scope.pagos.pagar_efect += parseFloat($scope.pedidos[i].destinos[0].subtotal);
              }

              if ($scope.pedidos[i].forma_pago == 2) {
                $scope.pagos.pagar_pos += parseFloat($scope.pedidos[i].destinos[0].subtotal);
              }

              $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos);
              $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - $scope.pagos.pendiente;  

              if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
                $scope.pedidos[i].horap = $scope.pedidos[i].hora;
              } 
              if ($scope.pedidos[i].tipo == 'URGENTE') {
                $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
                $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
              }
            } 

            if ($scope.pedidos[i].tipo_usuario == 3) {
              $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              $scope.pedidos[i].horap = $scope.pedidos[i].destinos[0].hora_destino;

              if ($scope.pedidos[i].destinos[0].turno_destino == 0) {
                $scope.pedidos[i].turno_destino1 = 'MAÑANA';
              } 
              if ($scope.pedidos[i].destinos[0].turno_destino == 1) {
                $scope.pedidos[i].turno_destino1 = 'TARDE';
              } 
              if ($scope.pedidos[i].destinos[0].turno_destino == 2) {
                $scope.pedidos[i].turno_destino1 = 'COMPLETO';
              } 
              if ($scope.pedidos[i].destinos[0].turno_destino == 3) {
                $scope.pedidos[i].turno_destino1 = '2 HORAS';
              } 
              
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].monto = parseFloat($scope.pedidos[i].destinos[0].subtotal);
                $scope.pedidos[i].costoenvio2 = parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce);
                $scope.pedidos[i].descuento = parseFloat($scope.pedidos[i].destinos[0].descuento);
                if ($scope.pedidos[i].reprogramado > 0) {
                  if (parseFloat($scope.pedidos[i].costo) > parseFloat($scope.pedidos[i].costo_reprogramacion)) {
                    $scope.pedidos[i].destinos[0].costo = $scope.pedidos[i].costo - $scope.pedidos[i].costo_reprogramacion;
                  } else {
                    $scope.pedidos[i].destinos[0].costo = $scope.pedidos[i].costo_reprogramacion - $scope.pedidos[i].costo;
                  }
                }
              }

              $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal);
              $scope.pedidos[i].sub = parseFloat($scope.pedidos[i].subtotal) + parseFloat($scope.pedidos[i].costoenvio2) - parseFloat($scope.pedidos[i].destinos[0].descuento);
              
              if ($scope.pedidos[i].estado != 3) {
                $scope.pedidos[i].monto = 0;
                $scope.pedidos[i].costoenvio2 = 0;
                $scope.pedidos[i].sub = 0;
                $scope.pedidos[i].descuento = 0;
              }
            }

            if ($scope.pedidos[i].forma_pago == 0) {
              $scope.pedidos[i].forma_pago = 'EFECTIVO';
            } 
            if ($scope.pedidos[i].forma_pago == 1) {
              $scope.pedidos[i].forma_pago = 'TRANSFERENCIA';
            }
            if ($scope.pedidos[i].forma_pago == 2) {
              $scope.pedidos[i].forma_pago = 'POS VISA';
            }

            if ($scope.pedidos[i].reprogramado > 0) {
              $scope.pedidos[i].tipo = 'REPROGRAMADO';
              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].tipo_usuario != 3) {
                 $scope.pedidos[i].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado != 'ENTREGADO' || $scope.pedidos[i].estado != 'ANULADO') {
                $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2 || $scope.pedidos[i].estado == 'ASIGNADO' || $scope.pedidos[i].estado == 'EN CAMINO') {
              $scope.pedidos[i].estado = 'REPROGRAMADO';
            }
            if ($scope.pedidos[i].estado == 3) {
              $scope.pedidos[i].estado = 'ENTREGADO';
            }
            if ($scope.pedidos[i].estado == 4) {
              $scope.pedidos[i].estado = 'ANULADO';
            }

            $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;

            if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0 || $scope.pedidos[i].destinos[0].cantidad_devuelta != null) {
              $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
            }

            if  ($scope.pedidos[i].destinos[0].cantidad_devuelta == null || $scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
              $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen;
            }

            if ($scope.pedidos[i].destinos[0].admin_id != '0') {
               $scope.pedidos[i].cantidad_cliente = 0;
              for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                $scope.pedidos[i].cantidad_cliente += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO') {
              $scope.pedidos[i].cantidad_cliente = 0;
            }

            if ($scope.pedidos[i].estado == 'ANULADO') {
              $scope.pedidos[i].cantidad_cliente = 0;
              $scope.pedidos[i].sub = 0;
            }

            console.log($scope.pedidos[i].sub);
            if ($scope.pedidos[i].tipo_usuario == 3) {
              $scope.tracking.push({
                id: $scope.pedidos[i].id,
                tipo_usuario: $scope.pedidos[i].tipo_usuario,
                fechad: $scope.pedidos[i].fechad,
                fechai: $scope.pedidos[i].created_at,
                horap: $scope.pedidos[i].destinos[0].hora_destino,
                nombre_cliente: $scope.pedidos[i].nombre,
                destino: $scope.pedidos[i].destinos[0].destino,
                distrito: $scope.pedidos[i].destinos[0].distrito_destino,
                nombre_destino: $scope.pedidos[i].destinos[0].nombre_destino,
                telefono: $scope.pedidos[i].destinos[0].telefono_destino,
                visitas: $scope.pedidos[i].reprogramado,
                detalle: $scope.pedidos[i].destinos[0].detalle,
                cantidad: $scope.pedidos[i].cantidad_cliente,
                turno_destino1: $scope.pedidos[i].turno_destino1,
                hora_destino: $scope.pedidos[i].destinos[0].hora_destino,
                forma_pago: $scope.pedidos[i].forma_pago,
                monto: parseFloat($scope.pedidos[i].monto),
                subtotal: $scope.pedidos[i].sub,
                costoenvio2: $scope.pedidos[i].costoenvio2,
                costoenvio: '',
                costo: parseFloat($scope.pedidos[i].destinos[0].costo),
                motivo: $scope.pedidos[i].motivo,
                fecha_reprogramacion: $scope.pedidos[i].fecha_reprogramacion,
                estado: $scope.pedidos[i].estado,
                tipo: $scope.pedidos[i].tipo,
                reprogramado: $scope.pedidos[i].reprogramado,
                cancelado: $scope.pedidos[i].cancelado,
                estadopago: $scope.pedidos[i].estadopago,
                destinos: $scope.pedidos[i].destinos
              })
            } 

            if ($scope.pedidos[i].tipo_usuario != 3) {
              var letter = 'A'.charCodeAt(0);
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                $scope.tracking.push({
                  id: $scope.pedidos[i].id + '-' + String.fromCharCode(letter),
                  id_parent: $scope.pedidos[i].id,
                  tipo_usuario: $scope.pedidos[i].tipo_usuario,
                  fechad: $scope.pedidos[i].fechad,
                  fechai: $scope.pedidos[i].created_at,
                  horap: $scope.pedidos[i].horap,
                  nombre_cliente: $scope.pedidos[i].nombre,
                  nombre_destino: $scope.pedidos[i].destinos[j].nombre_destino,
                  telefono: $scope.pedidos[i].destinos[j].telefono_destino,
                  destino: $scope.pedidos[i].destinos[j].destino,
                  v_destino: $scope.pedidos[i].destinos.length,
                  distrito: $scope.pedidos[i].destinos[j].distrito_destino,
                  fecha1: $scope.pedidos[i].fechad,
                  horap: $scope.pedidos[i].horap,
                  visitas: $scope.pedidos[i].reprogramado,
                  detalle: '',
                  forma_pago: $scope.pedidos[i].forma_pago,
                  monto: 0,
                  costoenvio2: '',
                  costoenvio: parseFloat($scope.pedidos[i].destinos[j].costo),
                  costo: parseFloat($scope.pedidos[i].destinos[j].costo),
                  motivo: $scope.pedidos[i].motivo,
                  fecha_reprogramacion: $scope.pedidos[i].fecha_reprogramacion,
                  estado: $scope.pedidos[i].estado,
                  tipo: $scope.pedidos[i].tipo,
                  reprogramado: $scope.pedidos[i].reprogramado,
                  cancelado: $scope.pedidos[i].cancelado,
                  estadopago: $scope.pedidos[i].estadopago,
                  destinos: $scope.pedidos[i].destinos
                }) 
                letter = letter + 1;   
              }  
            }
          }
        } 
        $scope.groupToPages();
      } else {
        $scope.no_reporte = true;
      }

    }, function(){
      alert('error');
    });
  };

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<style>@page{size:landscape;}</style><html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  $scope.selected = [];

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
    console.log(list);
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isIndeterminate = function() {
    if ($scope.pagedItems.length > 0) {
      return ($scope.selected.length !== 0 && $scope.selected.length !== $scope.pagedItems[$scope.currentPage].length);
    }
  };

  $scope.isChecked = function() {
    if ($scope.pagedItems.length > 0) {
      return ($scope.selected.length === $scope.pagedItems[$scope.currentPage].length);
    }
  };

  $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.pagedItems[$scope.currentPage].length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.pagedItems[$scope.currentPage].slice(0);
    }
  };

  var envio = true;

  $scope.liquidar = function() { 

    if (envio) {
      envio = false;
      CONFIG.SELECTED = $scope.selected;
      CONFIG.USUARIO = $scope.cliente; 

      for (var i = 0; i < $scope.selected.length; i++) {
        
        $scope.pagos.count_servicios += 1;

        if ($scope.selected[i].estado == 'REPROGRAMADO') {
          $scope.pagos.count_reprogramados += 1;
        }
        if ($scope.selected[i].estado == 'ENTREGADO') {
          $scope.pagos.count_entregados += 1;
        }
        if ($scope.selected[i].estado == 'ANULADO') {
          $scope.pagos.count_anulados += 1;
        }

        if ($scope.cliente.tipo_usuario == 3) {

          if ($scope.selected[i].estado == 'ENTREGADO') {
            totalcobrar = parseFloat($scope.selected[i].monto) + $scope.selected[i].costoenvio2;
            $scope.pagos.total_cobrar += totalcobrar;
            
            if ($scope.selected[i].forma_pago == 'EFECTIVO') {
              $scope.pagos.pagar_efect += parseFloat($scope.selected[i].monto) + $scope.selected[i].costoenvio2;
            }

            if ($scope.selected[i].forma_pago == 'POS VISA') {
              $scope.pagos.pagar_pos += parseFloat($scope.selected[i].monto) + $scope.selected[i].costoenvio2;
            }

            $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos)).toFixed(2);
          }

          if ($scope.selected[i].estado != 'ENTREGADO') {
            $scope.selected[i].monto = 0;
            $scope.selected[i].costoenvio2 = 0;
          }

          $scope.pagos.total_servicios += parseFloat($scope.selected[i].costo);
          $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + $scope.pagos.pendiente).toFixed(2);
        }
      }

      $scope.liquidacion = {
        user_id: $scope.cliente.id,
        nombre_ecommerce: $scope.cliente.nombre,
        fecha_inicio: $filter('date')(new Date($scope.cliente.fechaInicio),'yyyy-MM-dd'),
        fecha_fin: $filter('date')(new Date($scope.cliente.fechaInicio),'yyyy-MM-dd'),
        total_a_cobrar: $scope.pagos.total_cobrar,
        costo_total_servicios: $scope.pagos.total_servicios,
        total_servicios: $scope.pagos.count_servicios,
        entregados: $scope.pagos.count_entregados,
        anulados: $scope.pagos.count_anulados,
        reprogramados: $scope.pagos.count_reprogramados,
        efectivo: $scope.pagos.pagar_efect,
        pos: $scope.pagos.pagar_pos,
        servicios_olva: $scope.pagos.total_serviciosolva,
        servicios_adicionales: $scope.pagos.costo_adicional,
        total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
        depositado: 0,
        costo_recojo: $scope.pagos.costo_recojo,
        total_sinservicio: $scope.pagos.total_sinservicio
      }

      CONFIG.LIQUIDACION = $scope.liquidacion;

      console.log($scope.liquidacion);
      $scope.orden = [];
      var count = 0;
      var count2 = 0;

      var req_liquidacion = {
        method: 'POST',
        url: '../api/public/api/liquidaciones/store',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.liquidacion
      }

      $http(req_liquidacion).then(function(response){
        console.log(response.data.id);
        var id_liq = response.data.id;
        CONFIG.LIQ_ID = response.data.id;
        $scope.estado = {
          cancelado: 2
        };      

        for (var i = 0; i < $scope.selected.length; i++) {
          if ($scope.selected[i].tipo_usuario == 3) {
            $scope.orden.push({
              n_orden: $scope.selected[i].id,
              fecha_solicitud: $scope.selected[i].fechad,
              cliente: $scope.selected[i].nombre_destino,
              visitas: $scope.selected[i].visitas,
              estado: $scope.selected[i].estado,
              tipo: $scope.selected[i].tipo,
              costo_productos: $scope.selected[i].monto,
              costo_envio: $scope.selected[i].costoenvio2,
              forma_pago: $scope.selected[i].forma_pago,
              observacion: $scope.selected[i].motivo,
              fecha_reprogramacion: $scope.selected[i].fecha_reprogramacion,
              total_servicios: $scope.selected[i].costo,
              hora_envio: $scope.selected[i].horap,
              reprogramado: $scope.selected[i].reprogramado,
              id_liquidacion: id_liq
            })
          }
          if ($scope.selected[i].tipo_usuario != 3) {
            $scope.orden.push({
              n_orden: $scope.selected[i].id,
              fecha_solicitud: $scope.selected[i].fechad,
              cliente: $scope.selected[i].nombre_destino,
              visitas: $scope.selected[i].visitas,
              estado: $scope.selected[i].estado,
              tipo: $scope.selected[i].tipo,
              costo_productos: '0',
              costo_envio: $scope.selected[i].costoenvio,
              forma_pago: $scope.selected[i].forma_pago,
              observacion: $scope.selected[i].motivo,
              fecha_reprogramacion: $scope.selected[i].fecha_reprogramacion,
              total_servicios: $scope.selected[i].costo,
              hora_envio: $scope.selected[i].horap,
              reprogramado: $scope.selected[i].reprogramado,
              id_liquidacion: id_liq
            })
          }

          var req_orden = {
            method: 'POST',
            url: '../api/public/api/norden/store',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.orden[i]
          }

          var c_orden = [];

          $http(req_orden).then(function(response){
            count = count + 1;  
            c_orden.push(response.data.id);
            if (count == $scope.selected.length) {
              CONFIG.ORDENES = c_orden;
              for (var j = 0; j < $scope.selected.length; j++) {
                if ($scope.selected[j].tipo_usuario == 3) {
                  var req_cancelado = {
                    method: 'PUT',
                    url: '../api/public/api/update_pedidos/' + $scope.selected[j].id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.estado
                  }
                }
                if ($scope.selected[j].tipo_usuario != 3) {
                  var req_cancelado = {
                    method: 'PUT',
                    url: '../api/public/api/update_pedidos/' + $scope.selected[j].id_parent,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.estado
                  }
                }
                $http(req_cancelado).then(function(response){
                  count2 = count2 + 1;  
                  if (count2 == $scope.selected.length) {
                    $location.path('/liquidacion');
                  }
                }, function(){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              }
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId, $scope.cliente.nombre);
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $scope.fechaInicio + ' ' + $scope.cliente.nombre +'_'+ $scope.cliente.apellidos+ '.xls';
    a.click();
  }
})*/

.controller('ReportesCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel,$routeParams) {

  var param = '';
  param= $routeParams.param;

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.no_reporte = false;
  var consulta = true;
  $scope.loading1 = false;
  $scope.selectedorder = true;
  $scope.counttodo = 0;

  $scope.cambia = function(DirOrigen){
    $scope.tracking = [];
    $scope.filtrados = [];
    $scope.selected = [];
    $scope.pagedItems = [];
    $scope.no_reporte = false;
    consulta = true;
    $scope.loading1 = false;
    $scope.selectedorder = true;
  };

  $scope.cliente = {
    fechaInicio: new Date()
  }
  $scope.fechaInicio = '';

  $scope.Consultar = function(){

    if (consulta) {
      consulta = false;
      $scope.loading1 = true;
      $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
      $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
      $scope.tracking = [];
      $scope.empresas= [];
      $scope.filtrados = [];
      $scope.selectedorder = true;
      $scope.liquidaciones1 = [];

      var req = {
        method: 'GET',
        url: '../api/public/api/adminFechas/'+$filter('date')(new Date($scope.cliente.fechaInicio),'dd-MM-yyyy'),
        //url: '../api/public/api/admin',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $scope.loading1 = false;
        $scope.pedidos = response.data.pedidos;
        $scope.pedidos.sort(function(a, b){
          if(a.nombre < b.nombre) return -1;
          if(a.nombre > b.nombre) return 1;
          return 0;
        });

        if ($scope.pedidos != '') {
          $scope.no_reporte = true;
          for (var i = 0; i < $scope.pedidos.length; i++) {

            /*if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
            }*/

            if ($scope.pedidos[i].tipo_usuario == 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 3 && $scope.pedidos[i].estado != 4) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].estado_reprogramado == 1 && $scope.pedidos[i].estado != 3 && $scope.pedidos[i].estado != 4) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {

              $scope.no_reporte = false;
              $scope.pedidos[i].fechaI=$scope.cliente.fechaI;
              if ($scope.pedidos[i].tipo_usuario != 3) {
                if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                  $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].fecha),'yyyy-MM-dd');
                  $scope.pedidos[i].horap = $scope.pedidos[i].hora;
                } 
                if ($scope.pedidos[i].tipo == 'URGENTE') {
                  $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].created_at),'yyyy-MM-dd');
                  $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
                }
                $scope.pedidos[i].nombre_destino = $scope.pedidos[i].destinos[$scope.pedidos[i].destinos.length-1].nombre_destino;
                $scope.pedidos[i].destino = $scope.pedidos[i].destinos[$scope.pedidos[i].destinos.length-1].destino;
                $scope.pedidos[i].distrito = $scope.pedidos[i].destinos[$scope.pedidos[i].destinos.length-1].distrito_destino;
                $scope.pedidos[i].telefono = $scope.pedidos[i].destinos[$scope.pedidos[i].destinos.length-1].telefono_destino;
                $scope.pedidos[i].detalle = '-';
                $scope.pedidos[i].subtotal = 0;
                $scope.pedidos[i].cantidad = '-';
                $scope.pedidos[i].turno_destino1 = '-';
              } 

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].fechad = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'yyyy-MM-dd');
                $scope.pedidos[i].horap = $scope.pedidos[i].destinos[0].hora_destino;

                if ($scope.pedidos[i].destinos[0].turno_destino == 0) {
                  $scope.pedidos[i].turno_destino1 = 'MAÑANA';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 1) {
                  $scope.pedidos[i].turno_destino1 = 'TARDE';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 2) {
                  $scope.pedidos[i].turno_destino1 = 'COMPLETO';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 3) {
                  $scope.pedidos[i].turno_destino1 = '2 HORAS';
                } 

                $scope.pedidos[i].nombre_destino = $scope.pedidos[i].destinos[0].nombre_destino;
                $scope.pedidos[i].destino = $scope.pedidos[i].destinos[0].destino;
                $scope.pedidos[i].distrito = $scope.pedidos[i].destinos[0].distrito_destino;
                $scope.pedidos[i].telefono = $scope.pedidos[i].destinos[0].telefono_destino;
                $scope.pedidos[i].detalle = $scope.pedidos[i].destinos[0].detalle;
                                
                if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                  $scope.pedidos[i].destinos[0].descuento = 0;
                }

                $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);

                if ($scope.pedidos[i].estado != 3) {
                  $scope.pedidos[i].subtotal = 0;
                }
              }

              if ($scope.pedidos[i].forma_pago == 0) {
                $scope.pedidos[i].forma_pago = 'EFECTIVO';
              } 
              if ($scope.pedidos[i].forma_pago == 1) {
                $scope.pedidos[i].forma_pago = 'TRANSFERENCIA';
              }
              if ($scope.pedidos[i].forma_pago == 2) {
                $scope.pedidos[i].forma_pago = 'POS VISA';
              }

              if ($scope.pedidos[i].reprogramado > 0) {
                $scope.pedidos[i].tipo = 'REPROGRAMADO';
              }

              if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2 || $scope.pedidos[i].estado == 'ASIGNADO' || $scope.pedidos[i].estado == 'EN CAMINO') {
                $scope.pedidos[i].estado = 'REPROGRAMADO';
              }
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].estado = 'ENTREGADO';
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].estado = 'ANULADO';
              }
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].estado = 'RECHAZADO';
              }

              $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0 || $scope.pedidos[i].destinos[0].cantidad_devuelta != null) {
                $scope.pedidos[i].cantidad = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
              }

              if  ($scope.pedidos[i].destinos[0].cantidad_devuelta == null || $scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
                $scope.pedidos[i].cantidad = $scope.pedidos[i].cantidad_almacen;
              }

              if ($scope.pedidos[i].destinos[0].admin_id != '0') {
                 $scope.pedidos[i].cantidad = 0;
                for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                  $scope.pedidos[i].cantidad += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
                }
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO') {
                $scope.pedidos[i].cantidad = 0;
              }

              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pedidos[i].cantidad = 0;
                $scope.pedidos[i].subtotal = 0;
              }

              $scope.filtrados.push($scope.pedidos[i]);
            }
          } 
          var groups = $scope.filtrados.reduce(function(obj,item){
              obj[item.user_id] = obj[item.user_id] || [];
              obj[item.user_id].push(item);
              return obj;
          }, {});
          var myArray = Object.keys(groups).map(function(key){
              return {id: key, pedido: groups[key], nombre: groups[key][0].nombre, npedidos: groups[key].length};
          });
          $scope.empresas = myArray;
        } else {
          $scope.no_reporte = true;
        }
      }, function(){
        console.log('error');
        $scope.loading1 = false;
      });

      setTimeout(function() {
        var req_liquidados = {
          method: 'GET',
          url: '../api/public/api/liquidacionesFechas/'+$filter('date')(new Date($scope.cliente.fechaInicio),'dd-MM-yyyy'),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }
        $http(req_liquidados).then(function(response){
          if (response.data != '') {
             $scope.liquidaciones1 = response.data.liquidacions;
          }
        }, function(){
          console.log('error');
        });
      }, 700);      
    }
  };

  if($routeParams && $routeParams.param) {
    var day = new Date(param);
    day.setDate(day.getDate() + 1);
    $scope.cliente.fechaInicio = day;
    consulta = true;
    $scope.Consultar();
  }

  // calculate page in place
  $scope.groupToPages = function () {
    $scope.pagedItems = [];
    
    for (var i = 0; i < $scope.tracking.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
        } else {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
        }
    }
  };

  $scope.verPedido = function(item) {
    console.log(item);
    $scope.selectedorder = false;
    $scope.liquidaciones2 = [];
    $scope.tracking = [];
    for (var i = 0; i < item.pedido.length; i++) {
      if (item.pedido[i].cancelado != 2) {
        $scope.tracking.push(item.pedido[i]);
      }
    }
    $scope.groupToPages();
    for (var j = 0; j < $scope.liquidaciones1.length; j++) {
      if ($scope.liquidaciones1[j].user_id == item.pedido[0].user_id) {
        $scope.liquidaciones2.push($scope.liquidaciones1[j]);
      }
    }
  }

  $scope.verEmpresas = function() {
    $scope.selectedorder = true;
  }

  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<style>@page{size:landscape;}</style><html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }
 
  var envio = true;
  var envio1 = true;
  var envio2 = true;
  
  $scope.liquidarTodo = function() { 
    if (envio1) {
      envio1 = false;
      CONFIG.SELECTED = $scope.tracking;
      $location.path("/liquidacion");
    }
  }

  $scope.liquidar = function(pedido) { 
    if (envio) {
      $scope.selected = [];
      envio = false;
      $scope.selected.push(pedido);
      CONFIG.SELECTED = $scope.selected;
      $location.path("/liquidacion");
    }
  }

  $scope.liquidado = function(item) {
    if (envio2) {
      $scope.selected = [];
      envio2 = false;
      $scope.selected.push(item);
      CONFIG.SELECTED = $scope.selected;
      $location.path("/liquidacion");
    }
  }

  $scope.verLiquidado = function(item) {
    console.log(item);
    CONFIG.LIQUIDADOS = item;
    $location.path("/liquidados");
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId, 'REPORTE CLIENTES');
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $scope.fechaInicio + '-REPORTECLIENTES.xls';
    a.click();
  }
})

.controller('LiquidacionCtrl', function($scope,$timeout,userService,$http,$filter,CONFIG,$location,$mdDialog,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 10;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pedidos = [];
  $scope.pendientes = [];
  $scope.id_orden = [];
  $scope.id_liquidacion = [];
  $scope.id_ordenu = [];
  $scope.id_liquidacionu = 0;
  var totalcobrar = 0;
  $scope.despositado = false;
  $scope.no_liquidacion = false;
  var envio = true;
  $scope.liquidacion = false;
  $scope.liquidado = '';
  $scope.todoliquidado = false;

  $scope.pagos = {
    total_cobrar: 0,
    total_servicios: 0,
    pagar_efect: 0,
    pagar_pos: 0,
    total_sinservicio: 0,
    total_serviciosolva: 0,
    costo_adicional: 0,
    total_depostirar: 0,
    count_servicios: 0,
    count_entregados: 0,
    count_anulados: 0,
    count_reprogramados: 0,
    total_pedientedepago: 0,
    costo_recojo: 0,
    pendiente: 0,
    pendiente_total: 0
  };

  $scope.date = CONFIG.DATE;
  $scope.pedidos = CONFIG.SELECTED;
  var bandera = 0;

  var req_liqui = {
    method: 'GET',
    url: '../api/public/api/liquidaciones/'+ $scope.pedidos[0].user_id,
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req_liqui).then(function(response){
    $scope.liquidaciones = response.data.liquidacions;
    if (response.data != '') {
      for (var k = 0; k < $scope.pedidos.length; k++) {
        for (var i = 0; i < $scope.liquidaciones.length; i++) {
          for (var m = 0; m < $scope.liquidaciones[i].nordens.length; m++) {
            if ($scope.liquidaciones[i].depositado == 0 && $scope.liquidaciones[i].nordens[m].n_orden != $scope.pedidos[k].id) {              
              for (var j = 0; j < $scope.pendientes.length; j++) {
                if ($scope.pendientes[j].id == $scope.liquidaciones[i].id) {
                  bandera = 1;
                } 
              }

              if (bandera == 0) {
                $scope.pendientes.push($scope.liquidaciones[i]);
                $scope.pagos.pendiente += parseFloat($scope.liquidaciones[i].total_deposito_descuento_servicios);
                $scope.pagos.pendiente = parseFloat($scope.pagos.pendiente);
                $scope.pagos.total_pedientedepago += parseFloat($scope.liquidaciones[i].total_deposito_descuento_servicios);
              }
            }

            if ($scope.liquidaciones[i].nordens[m].n_orden == $scope.pedidos[k].id && $scope.liquidaciones[i].depositado == 1) {
              $scope.despositado = true;
            }
            if ($scope.liquidaciones[i].nordens[m].n_orden == $scope.pedidos[k].id && $scope.liquidaciones[i].depositado == 0) {
              $scope.liquidado = $scope.liquidaciones[i];
              $scope.id_liquidacionu = $scope.liquidaciones[i].id;
              for (var j = 0; j < $scope.liquidaciones[i].nordens.length; j++) {
                $scope.id_ordenu.push($scope.liquidaciones[i].nordens[j].id);
              }
            }
          }
        }

        if ($scope.pedidos[k].cancelado == 2) {
          $scope.liquidacion = true;
        }
        if ($scope.pedidos[k].cancelado != 2) {
          $scope.despositado = true;
        }
        $scope.pagos.count_servicios += 1;
        $scope.pedidos[k].fecha_reprogramacion = '';
        $scope.pagos.costo_recojo += parseFloat($scope.pedidos[k].costo_recojo);

        if ($scope.pedidos[k].tipo_usuario != 3) {
          $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].costo);
          totalcobrar += parseFloat($scope.pedidos[k].destinos[0].subtotal);
          $scope.pagos.total_cobrar = totalcobrar;
          
          if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
            $scope.pagos.pagar_efect += parseFloat($scope.pedidos[k].destinos[0].subtotal);
            $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
          }

          if ($scope.pedidos[k].forma_pago == 'POS VISA') {
            $scope.pagos.pagar_pos += parseFloat($scope.pedidos[k].destinos[0].subtotal)*0.95;
            $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
          }

          if ($scope.pedidos[k].tipo == 'PROGRAMADO') {
            $scope.pedidos[k].horap = $scope.pedidos[k].hora;
          } 
          if ($scope.pedidos[k].tipo == 'URGENTE') {
            $scope.pedidos[k].horap = $filter('date')(new Date($scope.pedidos[k].created_at),'HH:mm:ss');
          }
          $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos);
          $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - $scope.pagos.pendiente).toFixed(2);  
          $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva).toFixed(2);  
        } 

        if ($scope.pedidos[k].tipo_usuario == 3) {
          $scope.pedidos[k].horap = $scope.pedidos[k].destinos[0].hora_destino;

          if ($scope.pedidos[k].estado == 'ENTREGADO') {
            $scope.pedidos[k].monto = parseFloat($scope.pedidos[k].destinos[0].subtotal);
            $scope.pedidos[k].costoenvio2 = parseFloat($scope.pedidos[k].destinos[0].cobrarecommerce);
            $scope.pedidos[k].descuento = parseFloat($scope.pedidos[k].destinos[0].descuento);
            
            if ($scope.pedidos[k].monto == 0) {
              $scope.pedidos[k].descuento = 0;
            }

            totalcobrar += $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
            $scope.pagos.total_cobrar = totalcobrar;

            if ($scope.pedidos[k].reprogramado > 0) {
              if (parseFloat($scope.pedidos[k].costo) > parseFloat($scope.pedidos[k].costo_reprogramacion)) {
                $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo - $scope.pedidos[k].costo_reprogramacion;
              } else {
                $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo_reprogramacion - $scope.pedidos[k].costo;
              }
            }
            
            if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
              var efect = parseFloat($scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento);
              $scope.pagos.pagar_efect += efect;
              $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
            }

            if ($scope.pedidos[k].forma_pago == 'POS VISA') {
              var pos = $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
              $scope.pagos.pagar_pos += pos*0.95;
              $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
            }

            $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos)).toFixed(2);
          }

          $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].destinos[0].costo);
          $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + $scope.pagos.pendiente).toFixed(2);
          $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo).toFixed(2);   
          
          if ($scope.pedidos[k].estado != 'ENTREGADO') {
            $scope.pedidos[k].monto = 0;
            $scope.pedidos[k].costoenvio2 = 0;
            $scope.pedidos[k].descuento = 0;
            $scope.pedidos[k].destinos[0].descuento = 0;
          }
        }

        if ($scope.pedidos[k].reprogramado > 0) {
          $scope.pedidos[k].tipo = 'REPROGRAMADO';
          if ($scope.pedidos[k].tipo_usuario == 3) {
            $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].destinos[0].fecha_destino),'dd/MM/yyyy');
          }
          if ($scope.pedidos[k].tipo_usuario != 3) {
             $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].fecha),'dd/MM/yyyy');
          }
        }

        if ($scope.pedidos[k].estado == 'REPROGRAMADO') {
          $scope.pagos.count_reprogramados += 1;
        }
        if ($scope.pedidos[k].estado == 'ENTREGADO') {
          $scope.pagos.count_entregados += 1;
        }
        if ($scope.pedidos[k].estado == 'ANULADO') {
          $scope.pagos.count_anulados += 1;
        }

        if ($scope.pedidos[k].tipo_usuario == 3) {
          $scope.tracking.push({
            id: $scope.pedidos[k].id,
            tipo_usuario: $scope.pedidos[k].tipo_usuario,
            fechad: $scope.pedidos[k].fechad,
            horap: $scope.pedidos[k].destinos[0].hora_destino,
            nombre_destino: $scope.pedidos[k].destinos[0].nombre_destino,
            hora_destino: $scope.pedidos[k].destinos[0].hora_destino,
            forma_pago: $scope.pedidos[k].forma_pago,
            monto: parseFloat($scope.pedidos[k].monto),
            costoenvio2: $scope.pedidos[k].costoenvio2,
            costoenvio: 0,
            costo: parseFloat($scope.pedidos[k].destinos[0].costo),
            descuento: parseFloat($scope.pedidos[k].destinos[0].descuento),
            motivo: $scope.pedidos[k].motivo,
            fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
            estado: $scope.pedidos[k].estado,
            tipo: $scope.pedidos[k].tipo,
            reprogramado: $scope.pedidos[k].reprogramado,
            cancelado: $scope.pedidos[k].cancelado,
            destinos: $scope.pedidos[k].destinos
          })
        } 

        if ($scope.pedidos[k].tipo_usuario != 3) {
          var letter = 'A'.charCodeAt(0);
          for (var j = 0; j < $scope.pedidos[k].destinos.length; j++) {
            $scope.tracking.push({
              id: $scope.pedidos[k].id + '-' + String.fromCharCode(letter),
              id_parent: $scope.pedidos[k].id,
              tipo_usuario: $scope.pedidos[k].tipo_usuario,
              fechad: $scope.pedidos[k].fechad,
              horap: $scope.pedidos[k].horap,
              nombre_destino: $scope.pedidos[k].destinos[j].nombre_destino,
              horap: $scope.pedidos[k].horap,
              detalle: '',
              forma_pago: $scope.pedidos[k].forma_pago,
              monto: 0,
              descuento: 0,
              costoenvio2: '',
              costoenvio: parseFloat($scope.pedidos[k].destinos[j].costo),
              costo: parseFloat($scope.pedidos[k].destinos[j].costo),
              motivo: $scope.pedidos[k].motivo,
              fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
              estado: $scope.pedidos[k].estado,
              tipo: $scope.pedidos[k].tipo,
              reprogramado: $scope.pedidos[k].reprogramado,
              cancelado: $scope.pedidos[k].cancelado,
              destinos: $scope.pedidos[k].destinos
            }) 
            letter = letter + 1;   
          }  
        }
      }
    } else {
      for (var k = 0; k < $scope.pedidos.length; k++) { 
        
        if ($scope.pedidos[k].cancelado == 2) {
          $scope.liquidacion = true;
        }
        if ($scope.pedidos[k].cancelado != 2) {
          $scope.despositado = true;
        }
        $scope.pagos.count_servicios += 1;
        $scope.pedidos[k].fecha_reprogramacion = '';
        $scope.pagos.costo_recojo += parseFloat($scope.pedidos[k].costo_recojo);

        if ($scope.pedidos[k].tipo_usuario != 3) {
          $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].costo);
          totalcobrar += parseFloat($scope.pedidos[k].destinos[0].subtotal);
          $scope.pagos.total_cobrar = totalcobrar;
          
          if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
            $scope.pagos.pagar_efect += parseFloat($scope.pedidos[k].destinos[0].subtotal);
            $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
          }

          if ($scope.pedidos[k].forma_pago == 'POS VISA') {
            $scope.pagos.pagar_pos += parseFloat($scope.pedidos[k].destinos[0].subtotal)*0.95;
            $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
          }

          if ($scope.pedidos[k].tipo == 'PROGRAMADO') {
            $scope.pedidos[k].horap = $scope.pedidos[k].hora;
          } 
          if ($scope.pedidos[k].tipo == 'URGENTE') {
            $scope.pedidos[k].horap = $filter('date')(new Date($scope.pedidos[k].created_at),'HH:mm:ss');
          }
          $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos);
          $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - $scope.pagos.pendiente).toFixed(2);  
          $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva).toFixed(2);  
        } 

        if ($scope.pedidos[k].tipo_usuario == 3) {
          $scope.pedidos[k].horap = $scope.pedidos[k].destinos[0].hora_destino;

          if ($scope.pedidos[k].estado == 'ENTREGADO') {
            $scope.pedidos[k].monto = parseFloat($scope.pedidos[k].destinos[0].subtotal);
            $scope.pedidos[k].costoenvio2 = parseFloat($scope.pedidos[k].destinos[0].cobrarecommerce);
            $scope.pedidos[k].descuento = parseFloat($scope.pedidos[k].destinos[0].descuento);

            if ($scope.pedidos[k].monto == 0) {
              $scope.pedidos[k].descuento = 0;
            }
            
            totalcobrar += $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
            $scope.pagos.total_cobrar = totalcobrar;

            if ($scope.pedidos[k].reprogramado > 0) {
              if (parseFloat($scope.pedidos[k].costo) > parseFloat($scope.pedidos[k].costo_reprogramacion)) {
                $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo - $scope.pedidos[k].costo_reprogramacion;
              } else {
                $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo_reprogramacion - $scope.pedidos[k].costo;
              }
            }
            
            if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
              var efect = parseFloat($scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento);
              $scope.pagos.pagar_efect += efect;
              $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
            }

            if ($scope.pedidos[k].forma_pago == 'POS VISA') {
              var pos = $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
              $scope.pagos.pagar_pos += pos*0.95;
              $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
            }

            $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos)).toFixed(2);
          }

          $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].destinos[0].costo);
          $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + $scope.pagos.pendiente).toFixed(2);
          $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo).toFixed(2);   
          
          if ($scope.pedidos[k].estado != 'ENTREGADO') {
            $scope.pedidos[k].monto = 0;
            $scope.pedidos[k].costoenvio2 = 0;
            $scope.pedidos[k].descuento = 0;
          }
        }

        if ($scope.pedidos[k].reprogramado > 0) {
          $scope.pedidos[k].tipo = 'REPROGRAMADO';
          if ($scope.pedidos[k].tipo_usuario == 3) {
            $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].destinos[0].fecha_destino),'dd/MM/yyyy');
          }
          if ($scope.pedidos[k].tipo_usuario != 3) {
             $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].fecha),'dd/MM/yyyy');
          }
        }

        if ($scope.pedidos[k].estado == 'REPROGRAMADO') {
          $scope.pagos.count_reprogramados += 1;
        }
        if ($scope.pedidos[k].estado == 'ENTREGADO') {
          $scope.pagos.count_entregados += 1;
        }
        if ($scope.pedidos[k].estado == 'ANULADO') {
          $scope.pagos.count_anulados += 1;
        }

        if ($scope.pedidos[k].tipo_usuario == 3) {
          $scope.tracking.push({
            id: $scope.pedidos[k].id,
            tipo_usuario: $scope.pedidos[k].tipo_usuario,
            fechad: $scope.pedidos[k].fechad,
            horap: $scope.pedidos[k].destinos[0].hora_destino,
            nombre_destino: $scope.pedidos[k].destinos[0].nombre_destino,
            hora_destino: $scope.pedidos[k].destinos[0].hora_destino,
            forma_pago: $scope.pedidos[k].forma_pago,
            monto: parseFloat($scope.pedidos[k].monto),
            costoenvio2: $scope.pedidos[k].costoenvio2,
            costoenvio: 0,
            costo: parseFloat($scope.pedidos[k].destinos[0].costo),
            descuento: parseFloat($scope.pedidos[k].destinos[0].descuento),
            motivo: $scope.pedidos[k].motivo,
            fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
            estado: $scope.pedidos[k].estado,
            tipo: $scope.pedidos[k].tipo,
            reprogramado: $scope.pedidos[k].reprogramado,
            cancelado: $scope.pedidos[k].cancelado,
            destinos: $scope.pedidos[k].destinos
          })
        } 

        if ($scope.pedidos[k].tipo_usuario != 3) {
          var letter = 'A'.charCodeAt(0);
          for (var j = 0; j < $scope.pedidos[k].destinos.length; j++) {
            $scope.tracking.push({
              id: $scope.pedidos[k].id + '-' + String.fromCharCode(letter),
              id_parent: $scope.pedidos[k].id,
              tipo_usuario: $scope.pedidos[k].tipo_usuario,
              fechad: $scope.pedidos[k].fechad,
              horap: $scope.pedidos[k].horap,
              nombre_destino: $scope.pedidos[k].destinos[j].nombre_destino,
              horap: $scope.pedidos[k].horap,
              detalle: '',
              forma_pago: $scope.pedidos[k].forma_pago,
              monto: 0,
              descuento: 0,
              costoenvio2: '',
              costoenvio: parseFloat($scope.pedidos[k].destinos[j].costo),
              costo: parseFloat($scope.pedidos[k].destinos[j].costo),
              motivo: $scope.pedidos[k].motivo,
              fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
              estado: $scope.pedidos[k].estado,
              tipo: $scope.pedidos[k].tipo,
              reprogramado: $scope.pedidos[k].reprogramado,
              cancelado: $scope.pedidos[k].cancelado,
              destinos: $scope.pedidos[k].destinos
            }) 
            letter = letter + 1;   
          }  
        }
      }
    }
  }, function(){
    console.log('error al traer los pendientes');
    for (var k = 0; k < $scope.pedidos.length; k++) { 
        
      if ($scope.pedidos[k].cancelado == 2) {
        $scope.liquidacion = true;
      }
      if ($scope.pedidos[k].cancelado != 2) {
        $scope.despositado = true;
      }
      $scope.pagos.count_servicios += 1;
      $scope.pedidos[k].fecha_reprogramacion = '';
      $scope.pagos.costo_recojo += parseFloat($scope.pedidos[k].costo_recojo);

      if ($scope.pedidos[k].tipo_usuario != 3) {
        $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].costo);
        totalcobrar += parseFloat($scope.pedidos[k].destinos[0].subtotal);
        $scope.pagos.total_cobrar = totalcobrar;
        
        if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
          $scope.pagos.pagar_efect += parseFloat($scope.pedidos[k].destinos[0].subtotal);
          $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
        }

        if ($scope.pedidos[k].forma_pago == 'POS VISA') {
          $scope.pagos.pagar_pos += parseFloat($scope.pedidos[k].destinos[0].subtotal)*0.95;
          $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
        }

        if ($scope.pedidos[k].tipo == 'PROGRAMADO') {
          $scope.pedidos[k].horap = $scope.pedidos[k].hora;
        } 
        if ($scope.pedidos[k].tipo == 'URGENTE') {
          $scope.pedidos[k].horap = $filter('date')(new Date($scope.pedidos[k].created_at),'HH:mm:ss');
        }
        $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos);
        $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - $scope.pagos.pendiente).toFixed(2);  
        $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva).toFixed(2);  
      } 

      if ($scope.pedidos[k].tipo_usuario == 3) {
        $scope.pedidos[k].horap = $scope.pedidos[k].destinos[0].hora_destino;

        if ($scope.pedidos[k].estado == 'ENTREGADO') {
          $scope.pedidos[k].monto = parseFloat($scope.pedidos[k].destinos[0].subtotal);
          $scope.pedidos[k].costoenvio2 = parseFloat($scope.pedidos[k].destinos[0].cobrarecommerce);
          $scope.pedidos[k].descuento = parseFloat($scope.pedidos[k].destinos[0].descuento);
          if ($scope.pedidos[k].monto == 0) {
            $scope.pedidos[k].descuento = 0;
          }
          totalcobrar += $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
          $scope.pagos.total_cobrar = totalcobrar;

          if ($scope.pedidos[k].reprogramado > 0) {
            if (parseFloat($scope.pedidos[k].costo) > parseFloat($scope.pedidos[k].costo_reprogramacion)) {
              $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo - $scope.pedidos[k].costo_reprogramacion;
            } else {
              $scope.pedidos[k].destinos[0].costo = $scope.pedidos[k].costo_reprogramacion - $scope.pedidos[k].costo;
            }
          }
          
          if ($scope.pedidos[k].forma_pago == 'EFECTIVO') {
            var efect = parseFloat($scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento);
            $scope.pagos.pagar_efect += efect;
            $scope.pagos.pagar_efect = parseFloat($scope.pagos.pagar_efect.toFixed(2));
          }

          if ($scope.pedidos[k].forma_pago == 'POS VISA') {
            var pos = $scope.pedidos[k].monto + $scope.pedidos[k].costoenvio2 - $scope.pedidos[k].descuento;
            $scope.pagos.pagar_pos += pos*0.95;
            $scope.pagos.pagar_pos = parseFloat($scope.pagos.pagar_pos.toFixed(2));
          }

          $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect + $scope.pagos.pagar_pos)).toFixed(2);
        }

        $scope.pagos.total_servicios += parseFloat($scope.pedidos[k].destinos[0].costo);
        $scope.pagos.total_depostirar = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + $scope.pagos.pendiente).toFixed(2);
        $scope.pagos.pendiente_total = ($scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo).toFixed(2);   
        
        if ($scope.pedidos[k].estado != 'ENTREGADO') {
          $scope.pedidos[k].monto = 0;
          $scope.pedidos[k].costoenvio2 = 0;
          $scope.pedidos[k].descuento = 0;
        }
      }

      if ($scope.pedidos[k].reprogramado > 0) {
        $scope.pedidos[k].tipo = 'REPROGRAMADO';
        if ($scope.pedidos[k].tipo_usuario == 3) {
          $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].destinos[0].fecha_destino),'dd/MM/yyyy');
        }
        if ($scope.pedidos[k].tipo_usuario != 3) {
           $scope.pedidos[k].fecha_reprogramacion = $filter('date')(new Date($scope.pedidos[k].fecha),'dd/MM/yyyy');
        }
      }

      if ($scope.pedidos[k].estado == 'REPROGRAMADO') {
        $scope.pagos.count_reprogramados += 1;
      }
      if ($scope.pedidos[k].estado == 'ENTREGADO') {
        $scope.pagos.count_entregados += 1;
      }
      if ($scope.pedidos[k].estado == 'ANULADO') {
        $scope.pagos.count_anulados += 1;
      }

      if ($scope.pedidos[k].tipo_usuario == 3) {
        $scope.tracking.push({
          id: $scope.pedidos[k].id,
          tipo_usuario: $scope.pedidos[k].tipo_usuario,
          fechad: $scope.pedidos[k].fechad,
          horap: $scope.pedidos[k].destinos[0].hora_destino,
          nombre_destino: $scope.pedidos[k].destinos[0].nombre_destino,
          hora_destino: $scope.pedidos[k].destinos[0].hora_destino,
          forma_pago: $scope.pedidos[k].forma_pago,
          monto: parseFloat($scope.pedidos[k].monto),
          costoenvio2: $scope.pedidos[k].costoenvio2,
          costoenvio: 0,
          costo: parseFloat($scope.pedidos[k].destinos[0].costo),
          descuento: parseFloat($scope.pedidos[k].destinos[0].descuento),
          motivo: $scope.pedidos[k].motivo,
          fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
          estado: $scope.pedidos[k].estado,
          tipo: $scope.pedidos[k].tipo,
          reprogramado: $scope.pedidos[k].reprogramado,
          cancelado: $scope.pedidos[k].cancelado,
          destinos: $scope.pedidos[k].destinos
        })
      } 

      if ($scope.pedidos[k].tipo_usuario != 3) {
        var letter = 'A'.charCodeAt(0);
        for (var j = 0; j < $scope.pedidos[k].destinos.length; j++) {
          $scope.tracking.push({
            id: $scope.pedidos[k].id + '-' + String.fromCharCode(letter),
            id_parent: $scope.pedidos[k].id,
            tipo_usuario: $scope.pedidos[k].tipo_usuario,
            fechad: $scope.pedidos[k].fechad,
            horap: $scope.pedidos[k].horap,
            nombre_destino: $scope.pedidos[k].destinos[j].nombre_destino,
            horap: $scope.pedidos[k].horap,
            detalle: '',
            forma_pago: $scope.pedidos[k].forma_pago,
            monto: 0,
            descuento: 0,
            costoenvio2: '',
            costoenvio: parseFloat($scope.pedidos[k].destinos[j].costo),
            costo: parseFloat($scope.pedidos[k].destinos[j].costo),
            motivo: $scope.pedidos[k].motivo,
            fecha_reprogramacion: $scope.pedidos[k].fecha_reprogramacion,
            estado: $scope.pedidos[k].estado,
            tipo: $scope.pedidos[k].tipo,
            reprogramado: $scope.pedidos[k].reprogramado,
            cancelado: $scope.pedidos[k].cancelado,
            destinos: $scope.pedidos[k].destinos
          }) 
          letter = letter + 1;   
        }  
      }
    }
  });

  $scope.liquidar = function() {
    if (envio) {
      var fechaI=$scope.pedidos[0].fechaI;
      var parts = fechaI.split("/");
      var parts2 = new Date(parts[2], parts[1] - 1, parts[0]);
      envio = false;
      $scope.liquidacion = {
        user_id: $scope.pedidos[0].user_id,
        pedido_id: 0,
        nombre_ecommerce: $scope.pedidos[0].nombre,
        fecha_inicio: $filter('date')(parts2,'yyyy-MM-dd'),
        fecha_fin: $scope.pedidos[0].fechad,
        total_a_cobrar: $scope.pagos.total_cobrar,
        costo_total_servicios: $scope.pagos.total_servicios,
        total_servicios: $scope.pagos.count_servicios,
        entregados: $scope.pagos.count_entregados,
        anulados: $scope.pagos.count_anulados,
        reprogramados: $scope.pagos.count_reprogramados,
        efectivo: $scope.pagos.pagar_efect,
        pos: $scope.pagos.pagar_pos,
        servicios_olva: $scope.pagos.total_serviciosolva,
        servicios_adicionales: $scope.pagos.costo_adicional,
        total_deposito_descuento_servicios: parseFloat($scope.pagos.total_depostirar).toFixed(2),
        pendiente_total: $scope.pagos.pendiente,
        depositado: 0,
        costo_recojo: $scope.pagos.costo_recojo,
        total_sinservicio: $scope.pagos.total_sinservicio
      }

      console.log($scope.liquidacion);
      $scope.orden = [];
      var count = 0;
      var count1 = 0;
      var req_liquidacion = {
        method: 'POST',
        url: '../api/public/api/liquidaciones/store',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.liquidacion
      }

      $http(req_liquidacion).then(function(response){
        var id_liq = response.data.id;
        $scope.id_liquidacionu = response.data.id;      

        for (var i = 0; i < $scope.tracking.length; i++) {
          if ($scope.tracking[i].tipo_usuario == 3) {
            $scope.orden.push({
              n_orden: $scope.tracking[i].id,
              fecha_solicitud: $scope.pedidos.fechap,
              cliente: $scope.tracking[i].nombre_destino,
              visitas: $scope.tracking[i].reprogramado,
              estado: $scope.tracking[i].estado,
              tipo: $scope.tracking[i].tipo,
              costo_productos: $scope.tracking[i].monto,
              costo_envio: $scope.tracking[i].costoenvio2,
              descuento: $scope.tracking[i].descuento,
              forma_pago: $scope.tracking[i].forma_pago,
              observacion: $scope.tracking[i].motivo,
              fecha_reprogramacion: $scope.tracking[i].fecha_reprogramacion,
              total_servicios: $scope.tracking[i].costo,
              hora_envio: $scope.tracking[i].horap,
              reprogramado: $scope.tracking[i].reprogramado,
              id_liquidacion: id_liq
            })
          }
          if ($scope.tracking[i].tipo_usuario != 3) {
            $scope.orden.push({
              n_orden: $scope.tracking[i].id,
              fecha_solicitud: $scope.pedidos.fechap,
              cliente: $scope.tracking[i].nombre_destino,
              visitas: $scope.tracking[i].reprogramado,
              estado: $scope.tracking[i].estado,
              tipo: $scope.tracking[i].tipo,
              costo_productos: '0',
              costo_envio: $scope.tracking[i].costoenvio,
              descuento: $scope.tracking[i].descuento,
              forma_pago: $scope.tracking[i].forma_pago,
              observacion: $scope.tracking[i].motivo,
              fecha_reprogramacion: $scope.tracking[i].fecha_reprogramacion,
              total_servicios: $scope.tracking[i].costo,
              hora_envio: $scope.tracking[i].horap,
              reprogramado: $scope.tracking[i].reprogramado,
              id_liquidacion: id_liq
            })
          }

          var req_orden = {
            method: 'POST',
            url: '../api/public/api/norden/store',
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.orden[i]
          }

          $http(req_orden).then(function(response){
            count = count + 1;  
            $scope.id_ordenu.push(response.data.id);
            if (count == $scope.tracking.length) {
              for (var i = 0; i < $scope.pedidos.length; i++) {
                $scope.estado = {
                  cancelado: 2,
                  costo: $scope.pedidos[i].destinos[0].costo,
                  motivo: $scope.pedidos[i].motivo
                };
                var req_cancelado = {
                  method: 'PUT',
                  url: '../api/public/api/update_pedidos/' + $scope.pedidos[i].id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.estado
                }

                $http(req_cancelado).then(function(response){
                  count1 = count1 + 1; 
                  if (count1 == $scope.pedidos.length) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Liquidación guardada con éxito')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                    $scope.liquidacion = true;
                    $scope.despositado = false;
                  }
                }, function(){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              }
            }
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }
  }

  $scope.liquidar1 = function() { 
    $scope.liquidacion_final = []; 
    $scope.orden = [];

    if (parseFloat($scope.pagos.total_pedientedepago) == parseFloat($scope.pagos.pendiente) && parseFloat($scope.pagos.pendiente) != 0) {
      show_dialog(1);
    }
    if (parseFloat($scope.pagos.pendiente) === 0) {
      show_dialog(3);
    }
  }

  var show_dialog = function(tipo){
    $mdDialog.show({
      locals:{tipo: tipo},
      controller: DialogController2, 
      templateUrl: 'templates/detalles_pago.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController2($scope, $mdDialog, tipo) {

    $scope.tipo = tipo;

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.pagar = function(pago) { 

      $scope.liquidacion_final = []; 
      $scope.orden = [];
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;

      if (pago == 1) {
        $scope.liquidacion_final = {
          costo_total_servicios: $scope.pagos.total_servicios,
          efectivo: $scope.pagos.pagar_efect,
          pos: $scope.pagos.pagar_pos,
          servicios_olva: $scope.pagos.total_serviciosolva,
          servicios_adicionales: $scope.pagos.costo_adicional,
          total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
          depositado: 1,
          costo_recojo: $scope.pagos.costo_recojo
        };

        var req_despositado = {
          method: 'PUT',
          url: '../api/public/api/liquidaciones/' + $scope.id_liquidacionu,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.liquidacion_final
        }

        $http(req_despositado).then(function(response){
          for (var j = 0; j < $scope.id_ordenu.length; j++) {
            if ($scope.pedidos[0].tipo_usuario == 3) {
              $scope.orden.push({
                visitas: $scope.tracking[j].visitas,
                observacion: $scope.tracking[j].motivo,
                total_servicios: $scope.tracking[j].costo,
                reprogramado: $scope.tracking[j].reprogramado
              })
            }
            if ($scope.pedidos[0].tipo_usuario != 3) {
              $scope.orden.push({
                visitas: $scope.tracking[j].visitas,
                observacion: $scope.tracking[j].motivo,
                total_servicios: $scope.tracking[j].costo,
                reprogramado: $scope.tracking[j].reprogramado
              })
            }

            var req_orden = {
              method: 'PUT',
              url: '../api/public/api/norden/'+$scope.id_ordenu[j],
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.orden[j]
            }

            $http(req_orden).then(function(response){
              count2 = count2 + 1;  
              if (count2 == $scope.id_ordenu.length) {              
                var estado = {
                  depositado: 1
                }

                for (var k = 0; k < $scope.pendientes.length; k++) {
                  var req_despositado2 = {
                    method: 'PUT',
                    url: '../api/public/api/liquidaciones/' + $scope.pendientes[k].id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: estado
                  }

                  $http(req_despositado2).then(function(response){
                    count3 = count3 + 1;  
                    if (count3 == $scope.pendientes.length) {
                      $scope.despositado = true;
                      $mdDialog.show(
                        $mdDialog.alert()
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('La liquidacion se marco como depositada')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                    }
                  }, function(){
                    $scope.despositado = false;
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  });
                }
              }
            }, function(){
              $scope.despositado = false;
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }    
        }, function(){
          $scope.despositado = false;
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }

      if (pago == 3) {
        $scope.liquidacion_final = {
          costo_total_servicios: $scope.pagos.total_servicios,
          efectivo: $scope.pagos.pagar_efect,
          pos: $scope.pagos.pagar_pos,
          servicios_olva: $scope.pagos.total_serviciosolva,
          servicios_adicionales: $scope.pagos.costo_adicional,
          total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
          depositado: 1,
          costo_recojo: $scope.pagos.costo_recojo
        };

        var req_despositado = {
          method: 'PUT',
          url: '../api/public/api/liquidaciones/' + $scope.id_liquidacionu,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.liquidacion_final
        }

        $http(req_despositado).then(function(response){
          for (var j = 0; j < $scope.id_ordenu.length; j++) {
            if ($scope.tracking[j].tipo_usuario == 3) {
              $scope.orden.push({
                visitas: $scope.tracking[j].visitas,
                observacion: $scope.tracking[j].motivo,
                total_servicios: $scope.tracking[j].costo,
                reprogramado: $scope.tracking[j].reprogramado
              })
            }
            if ($scope.tracking[j].tipo_usuario != 3) {
              $scope.orden.push({
                visitas: $scope.tracking[j].visitas,
                observacion: $scope.tracking[j].motivo,
                total_servicios: $scope.tracking[j].costo,
                reprogramado: $scope.tracking[j].reprogramado
              })
            }

            var req_orden = {
              method: 'PUT',
              url: '../api/public/api/norden/'+$scope.id_ordenu[j],
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.orden[j]
            }

            $http(req_orden).then(function(response){
              count2 = count2 + 1;  
              if (count2 == $scope.id_ordenu.length) {              
                $scope.despositado = true;
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('La liquidacion se marco como depositada')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
            }, function(){
              $scope.despositado = false;
              $mdDialog.show(
                $mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            });
          }    
        }, function(){
          $scope.despositado = false;
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }
    }
  }

  $scope.finalizar = function() {
    $location.path('/reportes').search({param: $scope.tracking[0].fechad});  
  }

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour);  
    return date.toString();
  }

  $scope.change_sinservicio = function() {
    $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect) + parseFloat($scope.pagos.pagar_pos)).toFixed(2);
    $scope.pagos.total_sinservicio = parseFloat($scope.pagos.total_sinservicio);
    if ($scope.pedidos[0].tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.pendiente_total = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
    if ($scope.pedidos[0].tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.pendiente_total =  $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
    $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
  }

  $scope.change_totaldepositar = function() {
    if ($scope.pedidos[0].tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.pendiente_total = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
    if ($scope.pedidos[0].tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.pendiente_total = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
    $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
  }

  $scope.change_montoacobrar = function() {
    if ($scope.pedidos[0].tipo_usuario == 3) {
      $scope.pagos.total_servicios = 0;
      for (var i = 0; i < $scope.tracking.length; i++) {
        $scope.pagos.total_servicios += parseFloat($scope.tracking[i].costo);
      }
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
      $scope.pagos.pendiente_total = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
    if ($scope.pedidos[0].tipo_usuario != 3) {
      $scope.pagos.total_servicios = 0;
      for (var i = 0; i < $scope.tracking.length; i++) {
        $scope.tracking[i].costo = $scope.tracking[i].costoenvio;
        $scope.pagos.total_servicios += parseFloat($scope.tracking[i].costo);
      }
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
      $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
      $scope.pagos.pendiente_total = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva;
      $scope.pagos.pendiente_total = parseFloat($scope.pagos.pendiente_total);
    }
  }

  $scope.detalles_pendientes = function() {
    $mdDialog.show({
      controller: DialogController, 
      templateUrl: 'templates/detalles_pendiente.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }
  
  function DialogController($scope, $mdDialog) {

    for (var i = 0; i < $scope.pendientes.length; i++) {
      var day = new Date($scope.pendientes[i].fecha_inicio);
      day.setDate(day.getDate() + 1);
      $scope.pendientes[i].fecha1 = $filter('date')(new Date(day),'dd/MM/yyyy');
      $scope.pendientes[i].costo1 = $scope.pendientes[i].total_deposito_descuento_servicios;
      for (var j = 0; j < $scope.pendientes[i].nordens.length; j++) {
        $scope.pendientes[i].idpedido = $scope.pendientes[i].nordens[j].n_orden;
      }
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId,'REPORTE ENTREGA');
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $filter('date')(new Date(),'dd/MM/yyyy') + '-LIE000' + $scope.pedidos.id + '.xls';
    a.click();
  }
})

.controller('LiquidadosCtrl', function($scope,$timeout,userService,$http,$filter,CONFIG,$location,$mdDialog,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 10;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pedidos = [];
  $scope.pendientes = [];
  $scope.id_orden = [];
  $scope.id_liquidacion = [];
  $scope.id_ordenu = [];
  $scope.id_liquidacionu = 0;
  var totalcobrar = 0;
  $scope.despositado = false;
  $scope.no_liquidacion = false;
  var envio = true;
  $scope.liquidacion = false;
  $scope.liquidado = '';
  $scope.todoliquidado = false;

  $scope.pagos = {
    total_cobrar: 0,
    total_servicios: 0,
    pagar_efect: 0,
    pagar_pos: 0,
    total_sinservicio: 0,
    total_serviciosolva: 0,
    costo_adicional: 0,
    total_depostirar: 0,
    count_servicios: 0,
    count_entregados: 0,
    count_anulados: 0,
    count_reprogramados: 0,
    total_pedientedepago: 0,
    costo_recojo: 0,
    pendiente: 0,
    pendiente_total: 0
  };

  $scope.date = CONFIG.DATE;
  $scope.pedidos = CONFIG.LIQUIDADOS;
  var bandera = 0;

  $scope.pagos.total_cobrar = parseFloat($scope.pedidos.total_a_cobrar);
  $scope.pagos.total_servicios = parseFloat($scope.pedidos.costo_total_servicios);
  $scope.pagos.pagar_efect = parseFloat($scope.pedidos.efectivo);
  $scope.pagos.pagar_pos = parseFloat($scope.pedidos.pos);
  $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect) + parseFloat($scope.pagos.pagar_pos);
  $scope.pagos.total_sinservicio = $scope.pagos.total_sinservicio.toFixed(2);
  $scope.pagos.total_serviciosolva = parseFloat($scope.pedidos.servicios_olva);
  $scope.pagos.costo_adicional = parseFloat($scope.pedidos.servicios_adicionales);
  $scope.pagos.costo_recojo = parseFloat($scope.pedidos.costo_recojo);
  $scope.tracking = $scope.pedidos.nordens;  
  $scope.pagos.total_depostirar = parseFloat($scope.pedidos.total_deposito_descuento_servicios);
  $scope.pagos.count_servicios = $scope.pedidos.total_servicios;
  $scope.pagos.count_entregados = $scope.pedidos.entregados;
  $scope.pagos.count_anulados = $scope.pedidos.anulados;
  $scope.pagos.count_reprogramados = $scope.pedidos.reprogramados;
  $scope.pagos.costo_recojo = parseFloat($scope.pedidos.costo_recojo);
  $scope.pagos.total_serviciosolva = parseFloat($scope.pedidos.servicios_olva);
  $scope.pagos.costo_adicional = parseFloat($scope.pedidos.servicios_adicionales);
  $scope.pagos.pendiente_total = parseFloat($scope.pedidos.pendiente_total);
  $scope.id_liquidacionu = $scope.pedidos.id;
  if ($scope.pedidos.depositado == 1) {
    $scope.despositado = true;
  }
  $scope.id_ordenu = $scope.pedidos.nordens;

  $scope.liquidar1 = function() { 
    $scope.liquidacion_final = []; 
    $scope.orden = [];
    show_dialog();
  }
  
  var show_dialog = function(){
    $mdDialog.show({
      controller: DialogController2, 
      templateUrl: 'templates/detalles_pago.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController2($scope, $mdDialog) {

    $scope.tipo = 3;

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.pagar = function(pago) { 

      $scope.liquidacion_final = []; 
      $scope.orden = [];
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;

      if (pago == 3) {
        $scope.liquidacion_final = {
          costo_total_servicios: $scope.pagos.total_servicios,
          efectivo: $scope.pagos.pagar_efect,
          pos: $scope.pagos.pagar_pos,
          servicios_olva: $scope.pagos.total_serviciosolva,
          servicios_adicionales: $scope.pagos.costo_adicional,
          total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
          depositado: 1,
          costo_recojo: $scope.pagos.costo_recojo
        };

        var req_despositado = {
          method: 'PUT',
          url: '../api/public/api/liquidaciones/' + $scope.id_liquidacionu,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.liquidacion_final
        }

        $http(req_despositado).then(function(response){
          $scope.despositado = true;
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('La liquidacion se marco como depositada')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );    
        }, function(){
          $scope.despositado = false;
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }
    }
  }

  $scope.editar = function() {
    var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea editar el pedido?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      $scope.liquidacion_final = []; 
      $scope.orden = [];
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      
      $scope.liquidacion_final = {
        efectivo: $scope.pagos.pagar_efect,
        pos: $scope.pagos.pagar_pos,
        servicios_olva: $scope.pagos.total_serviciosolva,
        servicios_adicionales: $scope.pagos.costo_adicional,
        total_deposito_descuento_servicios: parseFloat($scope.pagos.total_depostirar).toFixed(2),
        pendiente_total: $scope.pagos.pendiente_total,
        costo_recojo: $scope.pagos.costo_recojo,
        costo_total_servicios: $scope.pagos.total_servicios
      };

      var req_liquidado = {
        method: 'PUT',
        url: '../api/public/api/liquidaciones/' + $scope.id_liquidacionu,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.liquidacion_final
      }

      $http(req_liquidado).then(function(response){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('La liquidacion se editó con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );    
      }, function(){
        $scope.despositado = false;
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error al editar la liquidacion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }

  $scope.finalizar = function() {
    $location.path('/reportes').search({param: $scope.tracking[0].fechad});  
  }

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour);  
    return date.toString();
  }

  $scope.change_sinservicio = function() {
    $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect) + parseFloat($scope.pagos.pagar_pos)).toFixed(2);
    $scope.pagos.total_sinservicio = parseFloat($scope.pagos.total_sinservicio);
    //if ($scope.pedidos[0].tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente_total);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    //}
    /*if ($scope.pedidos[0].tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }*/
    $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
  }

  $scope.change_totaldepositar = function() {
    //if ($scope.pedidos[0].tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente_total);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    //}
    /*if ($scope.pedidos[0].tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }*/
    $scope.pagos.total_depostirar = ($scope.pagos.total_depostirar).toFixed(2);
  }

  $scope.detalles_pendientes = function() {
    $mdDialog.show({
      controller: DialogController, 
      templateUrl: 'templates/detalles_pendiente.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }
  
  function DialogController($scope, $mdDialog) {

    for (var i = 0; i < $scope.pendientes.length; i++) {
      $scope.pendientes[i].fecha1 = $filter('date')(new Date($scope.pendientes[i].created_at),'dd/MM/yyyy');
      $scope.pendientes[i].costo1 = $scope.pendientes[i].total_deposito_descuento_servicios;
      for (var j = 0; j < $scope.pendientes[i].nordens.length; j++) {
        $scope.pendientes[i].idpedido = $scope.pendientes[i].nordens[j].n_orden;
      }
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId,'REPORTE ENTREGA');
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $filter('date')(new Date(),'dd/MM/yyyy') + '-LIE000' + $scope.pedidos.id + '.xls';
    a.click();
  }
})

.controller('ReportesMotoCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
  var totalcobrar = 0;
  $scope.no_reporte = false;
  $scope.mostrar_total = false;

  $scope.pagos = {
    total_cobrar: 0,
    total_servicios: 0,
    pagar_efect: 0,
    pagar_pos: 0,
    total_sinservicio: 0,
    total_serviciosolva: 0,
    costo_adicional: 0,
    total_depostirar: 0,
    count_servicios: 0,
    count_entregados: 0,
    count_anulados: 0,
    count_reprogramados: 0,
    total_pedientedepago: 0,
    costo_recojo: 0,
    pendiente: 0
  };

  var req = {
    method: 'GET',
    url: '../api/public/api/motorizado',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    $scope.init3 = function(){
      $scope.ori = response.data.motorizados;
      console.log($scope.ori);
      $scope.b0= [];
      $j = 0;
      $scope.b=[];;
      if(isNaN($scope.DirOrigen)){
        for(var i=0; i<$scope.ori.length; i++){
       
            console.log("cadena: "+$scope.DirOrigen);
            if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].name,$scope.DirOrigen.length,0))){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id});
              $scope.b0=$scope.b;
              $j = $j + 1;
            }else{
              if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].apellidos,$scope.DirOrigen.length,0))){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              $j = $j + 1;
            }
            }
        }
      }else{
        for(var i=0; i<$scope.ori.length; i++){
          if($scope.DirOrigen === ($filter('limitTo')($scope.ori[i].dni,$scope.DirOrigen.length,0))){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              $j = $j + 1;
            }
        }
      }
      $scope.direcciones = $scope.b0; 
    };
  }, function(){
    console.log('ha ocurrido un error');
  });

  $scope.reset_direccion = function(){
    $scope.direcciones = null;
  };

  $scope.cambiausuario = function(DirOrigen){
    $scope.DirOrigen = DirOrigen.nombre +' '+ DirOrigen.apellidos;
    $scope.DirOrigen2 = DirOrigen;
    selec();
    $scope.direcciones = null;
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pagedItems = [];
    $scope.pendientes = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.efectivo = 0;
    $scope.posvisa = 0;
    $scope.no_reporte = false;
    $scope.mostrar_total = false;
  };

  $scope.date = CONFIG.DATE;

  $scope.cliente = {
    nombre: '',
    dni: '',
    id:'',
    tipo_usuario: '',
    fechaInicio: new Date($scope.date),
    fechaFin: new Date($scope.date)
  }

  $scope.fechaInicio = '';
  $scope.fechaFin = '';

  function selec(){
    for(var i = 0; i < $scope.ori.length; i++){
      if($scope.DirOrigen2.id==$scope.ori[i].id){  
        $scope.cliente.nombre=$scope.ori[i].name;
        $scope.cliente.apellidos=$scope.ori[i].apellidos;
        $scope.cliente.id=$scope.ori[i].id;
        $scope.cliente.dni=$scope.ori[i].dni;
        $scope.cliente.telefono=$scope.ori[i].telefono;
        $scope.cliente.email=$scope.ori[i].email;
        $scope.cliente.tipo_usuario= $scope.ori[i].tipo_usuario;
        $scope.cliente.almacen= $scope.ori[i].almacen;
      }
    }
  };

  $scope.Consultar = function(){
    $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaIni = $filter('date')(new Date($scope.cliente.fechaInicio),'yyyy-MM-dd HH:mm:ss');

    $scope.tracking = [];
    $scope.selected = [];
    $scope.pendientes = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.efectivo = 0;
    $scope.posvisa = 0;
    $scope.total = 0;
    $scope.devueltos = 0;

    var req = {
      method: 'GET',
      url: '../api/public/api/admin',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    var reqR = {
      method: 'GET',
      url: '../api/public/api/reprogramados/'+$scope.fechaIni,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }


    $http(req).then(function(response){
      console.log(response.data);
      $scope.pedidos = response.data.pedidos;

      $http(reqR).then(function(response){
        var info = response.data;
        for (var i = 0; i < info.length; i++) {
          $scope.pedidos.push(JSON.parse(info[i].info));
        }      
        if ($scope.pedidos != '') {
          $scope.no_reporte = true;
          $scope.mostrar_total = false;
          for (var i = 0; i < $scope.pedidos.length; i++) {

            if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo_usuario == 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].tabla == 1) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].motorizado_id == $scope.cliente.id && $scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {

              $scope.no_reporte = false;
              $scope.mostrar_total = true;
              $scope.pagos.count_servicios += 1;
            
              if ($scope.pedidos[i].tipo_usuario != 3) {
                if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                  $scope.pedidos[i].horap = $scope.pedidos[i].hora;
                } 
                if ($scope.pedidos[i].tipo == 'URGENTE') {
                  $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
                }
              } 

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].horap = $scope.pedidos[i].destinos[0].hora_destino;

                if ($scope.pedidos[i].destinos[0].turno_destino == 0) {
                  $scope.pedidos[i].turno_destino1 = 'MAÑANA';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 1) {
                  $scope.pedidos[i].turno_destino1 = 'TARDE';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 2) {
                  $scope.pedidos[i].turno_destino1 = 'COMPLETO';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 3) {
                  $scope.pedidos[i].turno_destino1 = '2 HORAS';
                } 

                if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                  $scope.pedidos[i].destinos[0].descuento = 0;
                }

                $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);

                if ($scope.pedidos[i].estado != 3) {
                  $scope.pedidos[i].subtotal = 0;
                }
              }

              if ($scope.pedidos[i].forma_pago == 0) {
                if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].estado == 3) {
                  $scope.efectivo = parseFloat($scope.efectivo) + parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
                }
                if ($scope.pedidos[i].tipo_usuario != 3 && ($scope.pedidos[i].estado == 3 || $scope.pedidos[i].estado == 4)) {
                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.efectivo = parseFloat($scope.efectivo) + parseFloat($scope.pedidos[i].destinos[j].costo);
                  }
                }
                $scope.pedidos[i].forma_pago = 'EFECTIVO';
              } 
              if ($scope.pedidos[i].forma_pago == 1) {
                $scope.pedidos[i].forma_pago = 'TRANSFERENCIA';
              }
              if ($scope.pedidos[i].forma_pago == 2) {
                if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].estado == 3) {
                  $scope.posvisa = parseFloat($scope.posvisa) + parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
                }
                if ($scope.pedidos[i].tipo_usuario != 3 && ($scope.pedidos[i].estado == 3 || $scope.pedidos[i].estado == 4)) {
                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.posvisa = parseFloat($scope.posvisa) + parseFloat($scope.pedidos[i].destinos[j].costo);
                  }
                }
                $scope.pedidos[i].forma_pago = 'POS VISA';
              }

              if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2 || $scope.pedidos[i].estado == 'ASIGNADO' || $scope.pedidos[i].estado == 'EN CAMINO') {
                $scope.pedidos[i].estado = 'REPROGRAMADO';
              }
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].estado = 'ENTREGADO';
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].estado = 'ANULADO';
              }
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].estado = 'RECHAZADO';
              }

              if ($scope.pedidos[i].estado == 'ENTREGADO') {
                $scope.pagos.count_entregados += 1;
              }
              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pagos.count_anulados += 1;
              }

              $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;
              
              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == null) {
                $scope.pedidos[i].cantidad_devolucion = 0;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen;
              }
              
              if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].destinos[0].admin_id != 0) {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].cantidad_devolucion = 0;
                $scope.pedidos[i].detalle_devuelto = '';
                for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                  $scope.pedidos[i].cantidad_cliente += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
                  $scope.pedidos[i].cantidad_devolucion += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                  $scope.devueltos += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                  if ($scope.pedidos[i].destinos[0].admin_id[k].cantD > 0) {
                     $scope.pedidos[i].detalle_devuelto += $scope.pedidos[i].destinos[0].admin_id[k].cantD + ' ' + $scope.pedidos[i].destinos[0].admin_id[k].nombre + ' ';
                  }
                }
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ANULADO' && $scope.pedidos[i].estado != 'ENTREGADO') {
                $scope.pedidos[i].detalle_devuelto = '-';
                $scope.pagos.count_reprogramados += 1;
              }

              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].subtotal = 0;
              }

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.tracking.push({
                  id: $scope.pedidos[i].id,
                  tipo_usuario: $scope.pedidos[i].tipo_usuario,
                  horap: $scope.pedidos[i].destinos[0].hora_destino,
                  nombre_cliente: $scope.pedidos[i].nombre,
                  distrito: $scope.pedidos[i].destinos[0].distrito_destino,
                  nombre_destino: $scope.pedidos[i].destinos[0].nombre_destino,
                  detalle_devuelto: $scope.pedidos[i].detalle_devuelto,
                  cantidad_almacen: $scope.pedidos[i].cantidad_almacen,
                  cantidad_cliente: $scope.pedidos[i].cantidad_cliente,
                  cantidad_devuelta: $scope.pedidos[i].cantidad_devolucion,
                  forma_pago: $scope.pedidos[i].forma_pago,
                  subtotal: parseFloat($scope.pedidos[i].subtotal),
                  estado: $scope.pedidos[i].estado
                })
              } 

              if ($scope.pedidos[i].tipo_usuario != 3) {
                var letter = 'A'.charCodeAt(0);
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                  $scope.tracking.push({
                    id: $scope.pedidos[i].id + '-' + String.fromCharCode(letter),
                    id_parent: $scope.pedidos[i].id,
                    horap: $scope.pedidos[i].horap,
                    nombre_cliente: $scope.pedidos[i].nombre,
                    nombre_destino: $scope.pedidos[i].destinos[j].nombre_destino,
                    distrito: $scope.pedidos[i].destinos[j].distrito_destino,
                    horap: $scope.pedidos[i].horap,
                    detalle_devuelto: '-',
                    cantidad_almacen: '-',
                    cantidad_cliente: '-',
                    cantidad_devuelta: '-',
                    forma_pago: $scope.pedidos[i].forma_pago,
                    subtotal: parseFloat($scope.pedidos[i].destinos[j].costo),
                    estado: $scope.pedidos[i].estado
                  }) 
                  letter = letter + 1;   
                }  
              }
            }
          }
          $scope.total = parseFloat($scope.efectivo) + parseFloat($scope.posvisa); 
          $scope.groupToPages();
        }
      }, function(){
        if ($scope.pedidos != '') {
          $scope.no_reporte = true;
          $scope.mostrar_total = false;
          for (var i = 0; i < $scope.pedidos.length; i++) {

            if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo_usuario == 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].tabla == 1) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].motorizado_id == $scope.cliente.id && $scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {

              $scope.no_reporte = false;
              $scope.mostrar_total = true;
              $scope.pagos.count_servicios += 1;
            
              if ($scope.pedidos[i].tipo_usuario != 3) {
                if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                  $scope.pedidos[i].horap = $scope.pedidos[i].hora;
                } 
                if ($scope.pedidos[i].tipo == 'URGENTE') {
                  $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
                }
              } 

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].horap = $scope.pedidos[i].destinos[0].hora_destino;

                if ($scope.pedidos[i].destinos[0].turno_destino == 0) {
                  $scope.pedidos[i].turno_destino1 = 'MAÑANA';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 1) {
                  $scope.pedidos[i].turno_destino1 = 'TARDE';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 2) {
                  $scope.pedidos[i].turno_destino1 = 'COMPLETO';
                } 
                if ($scope.pedidos[i].destinos[0].turno_destino == 3) {
                  $scope.pedidos[i].turno_destino1 = '2 HORAS';
                } 

                if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                  $scope.pedidos[i].destinos[0].descuento = 0;
                }

                $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);

                if ($scope.pedidos[i].estado != 3) {
                  $scope.pedidos[i].subtotal = 0;
                }
              }

              if ($scope.pedidos[i].forma_pago == 0) {
                if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].estado == 3) {
                  $scope.efectivo = parseFloat($scope.efectivo) + parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
                }
                if ($scope.pedidos[i].tipo_usuario != 3 && ($scope.pedidos[i].estado == 3 || $scope.pedidos[i].estado == 4)) {
                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.efectivo = parseFloat($scope.efectivo) + parseFloat($scope.pedidos[i].destinos[j].costo);
                  }
                }
                $scope.pedidos[i].forma_pago = 'EFECTIVO';
              } 
              if ($scope.pedidos[i].forma_pago == 1) {
                $scope.pedidos[i].forma_pago = 'TRANSFERENCIA';
              }
              if ($scope.pedidos[i].forma_pago == 2) {
                if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].estado == 3) {
                  $scope.posvisa = parseFloat($scope.posvisa) + parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
                }
                if ($scope.pedidos[i].tipo_usuario != 3 && ($scope.pedidos[i].estado == 3 || $scope.pedidos[i].estado == 4)) {
                  for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.posvisa = parseFloat($scope.posvisa) + parseFloat($scope.pedidos[i].destinos[j].costo);
                  }
                }
                $scope.pedidos[i].forma_pago = 'POS VISA';
              }

              if ($scope.pedidos[i].estado == 0 || $scope.pedidos[i].estado == 1 || $scope.pedidos[i].estado == 2 || $scope.pedidos[i].estado == 'ASIGNADO' || $scope.pedidos[i].estado == 'EN CAMINO') {
                $scope.pedidos[i].estado = 'REPROGRAMADO';
              }
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].estado = 'ENTREGADO';
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].estado = 'ANULADO';
              }
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].estado = 'RECHAZADO';
              }
              if ($scope.pedidos[i].estado == 'ENTREGADO') {
                $scope.pagos.count_entregados += 1;
              }
              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pagos.count_anulados += 1;
              }

              $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;
              
              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == null) {
                $scope.pedidos[i].cantidad_devolucion = 0;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen;
              }
              
              if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].destinos[0].admin_id != 0) {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].cantidad_devolucion = 0;
                $scope.pedidos[i].detalle_devuelto = '';
                for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                  $scope.pedidos[i].cantidad_cliente += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
                  $scope.pedidos[i].cantidad_devolucion += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                  $scope.devueltos += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                  if ($scope.pedidos[i].destinos[0].admin_id[k].cantD > 0) {
                     $scope.pedidos[i].detalle_devuelto += $scope.pedidos[i].destinos[0].admin_id[k].cantD + ' ' + $scope.pedidos[i].destinos[0].admin_id[k].nombre + ' ';
                  }
                }
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ANULADO' && $scope.pedidos[i].estado != 'ENTREGADO') {
                $scope.pedidos[i].detalle_devuelto = '-';
                $scope.pagos.count_reprogramados += 1;
              }

              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].subtotal = 0;
              }

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.tracking.push({
                  id: $scope.pedidos[i].id,
                  tipo_usuario: $scope.pedidos[i].tipo_usuario,
                  horap: $scope.pedidos[i].destinos[0].hora_destino,
                  nombre_cliente: $scope.pedidos[i].nombre,
                  distrito: $scope.pedidos[i].destinos[0].distrito_destino,
                  nombre_destino: $scope.pedidos[i].destinos[0].nombre_destino,
                  detalle_devuelto: $scope.pedidos[i].detalle_devuelto,
                  cantidad_almacen: $scope.pedidos[i].cantidad_almacen,
                  cantidad_cliente: $scope.pedidos[i].cantidad_cliente,
                  cantidad_devuelta: $scope.pedidos[i].cantidad_devolucion,
                  forma_pago: $scope.pedidos[i].forma_pago,
                  subtotal: parseFloat($scope.pedidos[i].subtotal),
                  estado: $scope.pedidos[i].estado
                })
              } 

              if ($scope.pedidos[i].tipo_usuario != 3) {
                var letter = 'A'.charCodeAt(0);
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                  $scope.tracking.push({
                    id: $scope.pedidos[i].id + '-' + String.fromCharCode(letter),
                    id_parent: $scope.pedidos[i].id,
                    horap: $scope.pedidos[i].horap,
                    nombre_cliente: $scope.pedidos[i].nombre,
                    nombre_destino: $scope.pedidos[i].destinos[j].nombre_destino,
                    distrito: $scope.pedidos[i].destinos[j].distrito_destino,
                    horap: $scope.pedidos[i].horap,
                    detalle_devuelto: '-',
                    cantidad_almacen: '-',
                    cantidad_cliente: '-',
                    cantidad_devuelta: '-',
                    forma_pago: $scope.pedidos[i].forma_pago,
                    subtotal: parseFloat($scope.pedidos[i].destinos[j].costo),
                    estado: $scope.pedidos[i].estado
                  }) 
                  letter = letter + 1;   
                }  
              }
            }
          }
          $scope.total = parseFloat($scope.efectivo) + parseFloat($scope.posvisa); 
          $scope.groupToPages();
        }
      });
    }, function(){
      console.log('error');
    });
  };

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><style>@page{size:landscape;}</style><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId, $scope.cliente.nombre);
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $scope.fechaInicio + ' ' + $scope.cliente.nombre +'_'+ $scope.cliente.apellidos+ '.xls';
    a.click();
  }
})

/*.controller('LiquidacionCtrl', function($scope,$timeout,userService,$http,$filter,CONFIG,$location,$mdDialog,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 10;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
  var totalcobrar = 0;
  $scope.despositado = false;
  $scope.no_liquidacion = false;

  $scope.pagos = {
    total_cobrar: 0,
    total_servicios: 0,
    pagar_efect: 0,
    pagar_pos: 0,
    total_sinservicio: 0,
    total_serviciosolva: 0,
    costo_adicional: 0,
    total_depostirar: 0,
    count_servicios: 0,
    count_entregados: 0,
    count_anulados: 0,
    count_reprogramados: 0,
    total_pedientedepago: 0,
    costo_recojo: 0,
    pendiente: 0
  };

  var req = {
    method: 'GET',
    url: '../api/public/api/users',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    $scope.init3 = function(){
      $scope.ori = response.data.pedidos;
      console.log($scope.ori);
      $scope.b0= [];
      $j = 0;
      $scope.b=[];;
      if(isNaN($scope.DirOrigen)){
        for(var i=0; i<$scope.ori.length; i++){
       
            console.log("cadena: "+$scope.DirOrigen);
            if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].name,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }else{
              if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].apellidos,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }
            }
        }
      }else{
        for(var i=0; i<$scope.ori.length; i++){
          if($scope.DirOrigen === ($filter('limitTo')($scope.ori[i].dni,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }
        }
      }
      $scope.direcciones = $scope.b0; 
    };
  }, function(){
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Courier Liebre Express | Administrativo')
        .textContent('Ha ocurrido un error')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
    );
  });

  $scope.reset_direccion = function(){
    $scope.direcciones = null;
  };

  $scope.cambiausuario = function(DirOrigen){
    $scope.DirOrigen = DirOrigen.nombre +' '+ DirOrigen.apellidos;
    $scope.DirOrigen2 = DirOrigen;
    selec();
    $scope.direcciones = null;
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pagedItems = [];
    $scope.pendientes = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.despositado = false;
    $scope.no_liquidacion = false;
  };

  $scope.date = CONFIG.DATE;

  $scope.cliente = {
    nombre: '',
    dni: '',
    id:'',
    tipo_usuario: '',
    fechaInicio: new Date($scope.date),
    fechaFin: new Date($scope.date),
    almacen: ''
  }

  $scope.fechaInicio = '';
  $scope.fechaFin = '';
  $scope.id_liquidacion = [];
  $scope.id_orden = [];

  function selec(){
    for(var i = 0; i < $scope.ori.length; i++){
      if($scope.DirOrigen2.id==$scope.ori[i].id){  
        $scope.cliente.nombre=$scope.ori[i].name;
        $scope.cliente.id=$scope.ori[i].id;
        $scope.cliente.dni=$scope.ori[i].dni;
        $scope.cliente.telefono=$scope.ori[i].telefono;
        $scope.cliente.email=$scope.ori[i].email;
        $scope.cliente.tipo_usuario= $scope.ori[i].tipo_usuario;
        $scope.cliente.almacen= $scope.ori[i].almacen;
      }
    }
  };

  $scope.Consultar = function(){
    $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pendientes = [];
    $scope.liquidacion_final = [];
    $scope.id_liquidacion = [];
    $scope.id_orden = [];
    totalcobrar = 0;
    $scope.pagos.total_cobrar = 0;
    $scope.pagos.total_servicios = 0;
    $scope.pagos.pagar_efect = 0;
    $scope.pagos.pagar_pos = 0;
    $scope.pagos.total_sinservicio = 0;
    $scope.pagos.total_serviciosolva = 0,
    $scope.pagos.costo_adicional = 0;
    $scope.pagos.total_depostirar = 0;
    $scope.pagos.count_servicios = 0;
    $scope.pagos.count_entregados = 0;
    $scope.pagos.count_anulados = 0;
    $scope.pagos.count_reprogramados = 0;
    $scope.pagos.total_pedientedepago = 0;
    $scope.pagos.costo_recojo = 0;
    $scope.pagos.pendiente = 0;
    $scope.despositado = false;

    var req = {
      method: 'GET',
      url: '../api/public/api/liquidaciones/'+ $scope.cliente.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.liquidaciones = response.data.liquidacions;
      var hora_completa = [];
      var id = 0;
      $scope.no_liquidacion = true;

      if ($scope.liquidaciones != '') {
        for (var i = 0; i < $scope.liquidaciones.length; i++) {
          $scope.liquidaciones[i].fechap = $filter('date')(new Date($scope.liquidaciones[i].created_at),'dd/MM/yyyy');
          if ($scope.liquidaciones[i].user_id == $scope.cliente.id && $scope.liquidaciones[i].fechap == $scope.cliente.fechaI && $scope.liquidaciones[i].depositado == 0) {
            
            id = $scope.liquidaciones[i].id;
            $scope.id_liquidacion.push($scope.liquidaciones[i].id);
            $scope.no_liquidacion = false;

            for (var j = 0; j < $scope.liquidaciones[i].nordens.length; j++) {

              $scope.id_orden.push($scope.liquidaciones[i].nordens[j].id);

              if ($scope.cliente.tipo_usuario == 3) {
                $scope.tracking.push({
                  id: $scope.liquidaciones[i].nordens[j].n_orden,
                  tipo_usuario: $scope.cliente.tipo_usuario,
                  fechad: $scope.liquidaciones[i].nordens[j].fecha_solicitud,
                  fechai: $scope.liquidaciones[i].created_at,
                  horap: $scope.liquidaciones[i].nordens[j].hora_envio,
                  nombre_cliente: $scope.liquidaciones[i].nombre_ecommerce,
                  nombre_destino: $scope.liquidaciones[i].nordens[j].cliente,
                  visitas: $scope.liquidaciones[i].nordens[j].visitas,
                  forma_pago: $scope.liquidaciones[i].nordens[j].forma_pago,
                  monto: parseFloat($scope.liquidaciones[i].nordens[j].costo_productos),
                  costoenvio2: $scope.liquidaciones[i].nordens[j].costo_envio,
                  costoenvio: '',
                  costo: parseFloat($scope.liquidaciones[i].nordens[j].total_servicios),
                  motivo: $scope.liquidaciones[i].nordens[j].observacion,
                  fecha_reprogramacion: $scope.liquidaciones[i].nordens[j].fecha_reprogramacion,
                  estado: $scope.liquidaciones[i].nordens[j].estado,
                  tipo: $scope.liquidaciones[i].nordens[j].tipo,
                  reprogramado: $scope.liquidaciones[i].nordens[j].visitas
                })
              }

              if ($scope.cliente.tipo_usuario != 3) {
                $scope.tracking.push({
                  id: $scope.liquidaciones[i].nordens[j].n_orden,
                  tipo_usuario: $scope.cliente.tipo_usuario,
                  fechad: $scope.liquidaciones[i].nordens[j].fecha_solicitud,
                  fechai: $scope.liquidaciones[i].created_at,
                  horap: $scope.liquidaciones[i].nordens[j].hora_envio,
                  nombre_cliente: $scope.liquidaciones[i].nombre_ecommerce,
                  nombre_destino: $scope.liquidaciones[i].nordens[j].cliente,
                  visitas: $scope.liquidaciones[i].nordens[j].visitas,
                  forma_pago: $scope.liquidaciones[i].nordens[j].forma_pago,
                  monto: 0,
                  costoenvio2: '',
                  costoenvio: $scope.liquidaciones[i].nordens[j].costo_envio,
                  costo: parseFloat($scope.liquidaciones[i].nordens[j].total_servicios),
                  motivo: $scope.liquidaciones[i].nordens[j].observacion,
                  fecha_reprogramacion: $scope.liquidaciones[i].nordens[j].fecha_reprogramacion,
                  estado: $scope.liquidaciones[i].nordens[j].estado,
                  tipo: $scope.liquidaciones[i].nordens[j].tipo,
                  reprogramado: $scope.liquidaciones[i].nordens[j].visitas
                }) 
              }
            }

            $scope.pagos.total_cobrar += parseFloat($scope.liquidaciones[i].total_a_cobrar);
            $scope.pagos.total_servicios += parseFloat($scope.liquidaciones[i].costo_total_servicios);
            $scope.pagos.pagar_efect += parseFloat($scope.liquidaciones[i].efectivo);
            $scope.pagos.pagar_pos += parseFloat($scope.liquidaciones[i].pos);
            $scope.pagos.total_sinservicio = parseFloat($scope.pagos.pagar_efect) + parseFloat($scope.pagos.pagar_pos);
            $scope.pagos.total_serviciosolva += parseFloat($scope.liquidaciones[i].servicios_olva);
            $scope.pagos.costo_adicional += parseFloat($scope.liquidaciones[i].servicios_adicionales);
            $scope.pagos.count_servicios += parseInt($scope.liquidaciones[i].total_servicios);
            $scope.pagos.count_entregados += parseInt($scope.liquidaciones[i].entregados);
            $scope.pagos.count_anulados += parseInt($scope.liquidaciones[i].anulados);
            $scope.pagos.count_reprogramados += parseInt($scope.liquidaciones[i].reprogramados);
            $scope.pagos.costo_recojo += parseFloat($scope.liquidaciones[i].costo_recojo);   
          } 

          if ($scope.liquidaciones[i].user_id == $scope.cliente.id && $scope.liquidaciones[i].depositado == 0 && $scope.liquidaciones[i].id != id) {
            $scope.pendientes.push($scope.liquidaciones[i]);
            $scope.pagos.pendiente += parseFloat($scope.liquidaciones[i].total_deposito_descuento_servicios);
            $scope.pagos.pendiente = parseFloat($scope.pagos.pendiente);
            $scope.pagos.total_pedientedepago += parseFloat($scope.liquidaciones[i].total_deposito_descuento_servicios);
          }
          if ($scope.cliente.tipo_usuario == 3) {
            $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) - parseFloat($scope.pagos.total_servicios) - parseFloat($scope.pagos.costo_adicional) - parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.costo_recojo) + parseFloat($scope.pagos.pendiente);
            $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
          }
          if ($scope.cliente.tipo_usuario != 3) {
            $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) + parseFloat($scope.pagos.total_servicios) + parseFloat($scope.pagos.costo_adicional) + parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.pendiente);
            $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
          } 
        }
      }
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  };

  $scope.liquidar = function() { 
    $scope.liquidacion_final = []; 
    $scope.orden = [];

    if (parseFloat($scope.pagos.total_pedientedepago) === parseFloat($scope.pagos.pendiente) && parseFloat($scope.pagos.pendiente) != 0) {
      show_dialog(1);
    }
    if (parseFloat($scope.pagos.total_pedientedepago) > parseFloat($scope.pagos.pendiente)) {
      show_dialog(2);
    }
    if (parseFloat($scope.pagos.pendiente) === 0) {
      show_dialog(3);
    }
  }

  var show_dialog = function(tipo){
    $mdDialog.show({
      locals:{tipo: tipo},
      controller: DialogController2, 
      templateUrl: 'templates/detalles_pago.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController2($scope, $mdDialog, tipo) {

    $scope.tipo = tipo;

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.pagar = function(pago) { 

      console.log(pago);

      $scope.liquidacion_final = []; 
      $scope.orden = [];
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;

      if (pago == 1) {
        for (var i = 0; i < $scope.id_liquidacion.length; i++) {
          $scope.liquidacion_final.push({
            costo_total_servicios: $scope.pagos.total_servicios,
            efectivo: $scope.pagos.pagar_efect,
            pos: $scope.pagos.pagar_pos,
            servicios_olva: $scope.pagos.total_serviciosolva,
            servicios_adicionales: $scope.pagos.costo_adicional,
            total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
            depositado: 1,
            costo_recojo: $scope.pagos.costo_recojo
          })

          var req_despositado = {
            method: 'PUT',
            url: '../api/public/api/liquidaciones/' + $scope.id_liquidacion[i],
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.liquidacion_final[i]
          }

          $http(req_despositado).then(function(response){
            count1 = count1 + 1;  
            if (count1 == $scope.id_liquidacion.length) {
              for (var j = 0; j < $scope.id_orden.length; j++) {
                if ($scope.tracking[j].tipo_usuario == 3) {
                  $scope.orden.push({
                    visitas: $scope.tracking[j].visitas,
                    observacion: $scope.tracking[j].motivo,
                    total_servicios: $scope.tracking[j].costo,
                    reprogramado: $scope.tracking[j].reprogramado
                  })
                }
                if ($scope.tracking[j].tipo_usuario != 3) {
                  $scope.orden.push({
                    visitas: $scope.tracking[j].visitas,
                    observacion: $scope.tracking[j].motivo,
                    total_servicios: $scope.tracking[j].costo,
                    reprogramado: $scope.tracking[j].reprogramado
                  })
                }

                var req_orden = {
                  method: 'PUT',
                  url: '../api/public/api/norden/'+$scope.id_orden[j],
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.orden[j]
                }

                $http(req_orden).then(function(response){
                  count2 = count2 + 1;  
                  if (count2 == $scope.id_orden.length) {
                    
                    var estado = {
                      depositado: 1
                    }

                    for (var k = 0; k < $scope.pendientes.length; k++) {
                      var req_despositado2 = {
                        method: 'PUT',
                        url: '../api/public/api/liquidaciones/' + $scope.pendientes[k].id,
                        headers: {
                          'Authorization' : 'Bearer ' + userService.getCurrentToken()
                        },
                        data: estado
                      }

                      $http(req_despositado2).then(function(response){
                        count3 = count3 + 1;  
                        if (count3 == $scope.pendientes.length) {
                          $scope.despositado = true;
                          $mdDialog.show(
                            $mdDialog.alert()
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express | Administrativo')
                              .textContent('La liquidacion se marco como depositada')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                        $scope.despositado = false;
                        $mdDialog.show(
                          $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Courier Liebre Express | Administrativo')
                            .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        );
                      });
                    }
                  }
                }, function(){
                  $scope.despositado = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              }
            }
          }, function(){
            $scope.despositado = false;
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }

      if (pago == 2) {
        
      }

      if (pago == 3) {

        for (var i = 0; i < $scope.id_liquidacion.length; i++) {
          console.log($scope.id_liquidacion);
          $scope.liquidacion_final.push({
            costo_total_servicios: $scope.pagos.total_servicios,
            efectivo: $scope.pagos.pagar_efect,
            pos: $scope.pagos.pagar_pos,
            servicios_olva: $scope.pagos.total_serviciosolva,
            servicios_adicionales: $scope.pagos.costo_adicional,
            total_deposito_descuento_servicios: $scope.pagos.total_depostirar,
            depositado: 1,
            costo_recojo: $scope.pagos.costo_recojo
          })

          var req_despositado = {
            method: 'PUT',
            url: '../api/public/api/liquidaciones/' + $scope.id_liquidacion[i],
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.liquidacion_final[i]
          }

          $http(req_despositado).then(function(response){
            count1 = count1 + 1;  
            if (count1 == $scope.id_liquidacion.length) {
              for (var j = 0; j < $scope.id_orden.length; j++) {
                if ($scope.tracking[j].tipo_usuario == 3) {
                  $scope.orden.push({
                    visitas: $scope.tracking[j].visitas,
                    observacion: $scope.tracking[j].motivo,
                    total_servicios: $scope.tracking[j].costo,
                    reprogramado: $scope.tracking[j].reprogramado
                  })
                }
                if ($scope.tracking[j].tipo_usuario != 3) {
                  $scope.orden.push({
                    visitas: $scope.tracking[j].visitas,
                    observacion: $scope.tracking[j].motivo,
                    total_servicios: $scope.tracking[j].costo,
                    reprogramado: $scope.tracking[j].reprogramado
                  })
                }

                var req_orden = {
                  method: 'PUT',
                  url: '../api/public/api/norden/'+$scope.id_orden[j],
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.orden[j]
                }

                $http(req_orden).then(function(response){
                  count2 = count2 + 1;  
                  if (count2 == $scope.id_orden.length) {
                    $scope.despositado = true;
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('La liquidacion se marco como depositada')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  }
                }, function(){
                  $scope.despositado = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              }
            }
          }, function(){
            $scope.despositado = false;
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }
      }
    }
  }

  $scope.finalizar = function() {
    $location.path('/pendientes');  
  }

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos") != null){
      var pedidos = document.getElementById("articulos").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  $scope.selected = [];
  $scope.reporte = CONFIG.SELECTED;
  $scope.liquidacion = CONFIG.LIQUIDACION;

  if ($scope.reporte !== '') {

    $scope.tracking = CONFIG.SELECTED;
    $scope.cliente.tipo_usuario = CONFIG.USUARIO.tipo_usuario;
    $scope.cliente.nombre = CONFIG.USUARIO.nombre;
    $scope.cliente.id = CONFIG.USUARIO.id;
    $scope.cliente.almacen = CONFIG.USUARIO.almacen;
    var id_ped = 0;
    $scope.id_liquidacion = [];
    $scope.id_liquidacion[0] = CONFIG.LIQ_ID;
    $scope.id_orden = [];
    $scope.id_orden[0] = CONFIG.ORDENES;

    var req = {
      method: 'GET',
      url: '../api/public/api/liquidaciones/'+ $scope.cliente.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.pedidos = response.data.liquidacions;
      if ($scope.pedidos != '') {
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if ($scope.pedidos[i].user_id == $scope.cliente.id && $scope.pedidos[i].depositado == 0 && $scope.pedidos[i].id != $scope.id_liquidacion) {
            $scope.pendientes.push($scope.pedidos[i]);
            $scope.pagos.pendiente += parseFloat($scope.pedidos[i].total_deposito_descuento_servicios);
            $scope.pagos.pendiente = parseFloat($scope.pagos.pendiente);
            $scope.pagos.total_pedientedepago += parseFloat($scope.pedidos[i].total_deposito_descuento_servicios);
          }
        }
        if ($scope.cliente.tipo_usuario == 3) {
          $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) - parseFloat($scope.pagos.total_servicios) - parseFloat($scope.pagos.costo_adicional) - parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.costo_recojo) + parseFloat($scope.pagos.pendiente);
          $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
        }
        if ($scope.cliente.tipo_usuario != 3) {
          $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) + parseFloat($scope.pagos.total_servicios) + parseFloat($scope.pagos.costo_adicional) + parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.pendiente);
          $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
        } 
      }
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });

    $scope.pagos.total_cobrar = parseFloat($scope.liquidacion.total_a_cobrar);
    $scope.pagos.total_servicios = parseFloat($scope.liquidacion.costo_total_servicios);
    $scope.pagos.pagar_efect = parseFloat($scope.liquidacion.efectivo);
    $scope.pagos.pagar_pos = parseFloat($scope.liquidacion.pos);
    $scope.pagos.total_sinservicio = parseFloat($scope.liquidacion.total_sinservicio);
    $scope.pagos.total_serviciosolva = parseFloat($scope.liquidacion.servicios_olva);
    $scope.pagos.costo_adicional = parseFloat($scope.liquidacion.servicios_adicionales);
    $scope.pagos.count_servicios = $scope.liquidacion.total_servicios;
    $scope.pagos.count_entregados = $scope.liquidacion.entregados;
    $scope.pagos.count_anulados = $scope.liquidacion.anulados;
    $scope.pagos.count_reprogramados = $scope.liquidacion.reprogramados;
    $scope.pagos.costo_recojo = parseFloat($scope.liquidacion.costo_recojo);
    if ($scope.cliente.tipo_usuario == 3) {
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) - parseFloat($scope.pagos.total_servicios) - parseFloat($scope.pagos.costo_adicional) - parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.costo_recojo) + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
    if ($scope.cliente.tipo_usuario != 3) {
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_sinservicio) + parseFloat($scope.pagos.total_servicios) + parseFloat($scope.pagos.costo_adicional) + parseFloat($scope.pagos.total_serviciosolva) - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
  }

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour);  
    return date.toString();
  }

  $scope.change_sinservicio = function() {
    $scope.pagos.total_sinservicio = (parseFloat($scope.pagos.pagar_efect) + parseFloat($scope.pagos.pagar_pos)).toFixed(2);
    $scope.pagos.total_sinservicio = parseFloat($scope.pagos.total_sinservicio);
    if ($scope.cliente.tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
    if ($scope.cliente.tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
  }

  $scope.change_totaldepositar = function() {
    if ($scope.cliente.tipo_usuario == 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
    if ($scope.cliente.tipo_usuario != 3) {
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
  }

  $scope.change_montoacobrar = function() {
    if ($scope.cliente.tipo_usuario == 3) {
      $scope.pagos.total_servicios = 0;
      for (var i = 0; i < $scope.tracking.length; i++) {
        $scope.pagos.total_servicios += parseFloat($scope.tracking[i].costo);
      }
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio - $scope.pagos.total_servicios - $scope.pagos.costo_adicional - $scope.pagos.total_serviciosolva - $scope.pagos.costo_recojo + parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
    if ($scope.cliente.tipo_usuario != 3) {
      $scope.pagos.total_servicios = 0;
      for (var i = 0; i < $scope.tracking.length; i++) {
        $scope.tracking[i].costo = $scope.tracking[i].costoenvio;
        $scope.pagos.total_servicios += parseFloat($scope.tracking[i].costo);
      }
      $scope.pagos.total_depostirar = $scope.pagos.total_sinservicio + $scope.pagos.total_servicios + $scope.pagos.costo_adicional + $scope.pagos.total_serviciosolva + $scope.pagos.costo_recojo - parseFloat($scope.pagos.pendiente);
      $scope.pagos.total_depostirar = parseFloat($scope.pagos.total_depostirar);
    }
  }

  $scope.detalles_pendientes = function() {
    $mdDialog.show({
      controller: DialogController, 
      templateUrl: 'templates/detalles_pendiente.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }
  
  function DialogController($scope, $mdDialog) {

    for (var i = 0; i < $scope.pendientes.length; i++) {

      $scope.pendientes[i].fecha1 = $filter('date')(new Date($scope.pendientes[i].created_at),'dd/MM/yyyy');
      $scope.pendientes[i].costo1 = $scope.pendientes[i].total_deposito_descuento_servicios;
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId,'REPORTE ENTREGA');
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = $filter('date')(new Date(),'dd/MM/yyyy') + '-' + $scope.cliente.nombre + '.xls';
    a.click();
  }
})*/

.controller('Reporte_distribucionCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.no_reporte = false;
  $scope.date = CONFIG.DATE;

  $scope.cliente = {
    fechaInicio: new Date($scope.date),
    fechaFin: new Date($scope.date)
  }

  $scope.fechaInicio = '';
  $scope.fechaFin = '';
  $scope.motorizado = [];

  var req_motorizado = {
    method: 'GET',
    url: '../api/public/api/motorizado',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req_motorizado).then(function(response){
    $scope.motorizado = response.data.motorizados;
  }, function(){
    console.log('error');
  });

  $scope.Consultar = function(){
    $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaIni = $filter('date')(new Date($scope.cliente.fechaInicio),'yyyy-MM-dd HH:mm:ss');

    $scope.pedidos = [];
    $scope.tracking = [];

    var req = {
      method: 'GET',
      url: '../api/public/api/admin',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    var reqR = {
      method: 'GET',
      url: '../api/public/api/reprogramados/'+$scope.fechaIni,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }


    $http(req).then(function(response){

      $scope.pedidos = response.data.pedidos;

      $http(reqR).then(function(response){
        var info = response.data;
        for (var i = 0; i < info.length; i++) {
          $scope.pedidos.push(JSON.parse(info[i].info));
        }
        if ($scope.pedidos != '') {
          $scope.no_reporte = true;
          for (var i = 0; i < $scope.pedidos.length; i++) {

            if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo_usuario == 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
                console.log($scope.pedidos[i].fechap);
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].tabla == 1) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {
            
              $scope.no_reporte = false;
              $scope.pedidos[i].destinos[0].cantidad = parseInt($scope.pedidos[i].destinos[0].cantidad);

              for (var j = 0; j < $scope.motorizado.length; j++) {
                if ($scope.motorizado[j].id == $scope.pedidos[i].motorizado_id) {
                  $scope.pedidos[i].motorizado = $scope.motorizado[j].name + ' ' + $scope.motorizado[j].apellidos;
                }
              }

              if ($scope.pedidos[i].motorizado_id == '') {
                $scope.pedidos[i].motorizado = '-';
              }

              if ($scope.pedidos[i].forma_pago == 0) {
                $scope.pedidos[i].forma_pago1 = 'EFECTIVO';
              } 
              if ($scope.pedidos[i].forma_pago == 1) {
                $scope.pedidos[i].forma_pago1 = 'TRANSFERENCIA';
              }
              if ($scope.pedidos[i].forma_pago == 2) {
                $scope.pedidos[i].forma_pago1 = 'POS VISA';
              }

              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].estado = 'ENTREGADO';
              } 
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].estado = 'ANULADO';
              }
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].estado = 'RECHAZADO';
              }
              if ($scope.pedidos[i].reprogramado > 0) {
                $scope.pedidos[i].tipo = 'R';
              }

              if ($scope.pedidos[i].tipo_usuario !== 3) {
                if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                  $scope.pedidos[i].horap = $scope.pedidos[i].hora;
                  $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
                  $scope.pedidos[i].tipo = 'P';
                } else if ($scope.pedidos[i].tipo == 'URGENTE') {
                  $scope.pedidos[i].tipo = 'U';
                  $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
                  $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
                }
              }

              if ($scope.pedidos[i].tipo_usuario == 1) {
                $scope.pedidos[i].tipo_usuario1 = 'Persona';
                $scope.pedidos[i].subtotal = 0;
              }
              if ($scope.pedidos[i].tipo_usuario == 2) {
                $scope.pedidos[i].tipo_usuario1 = 'Empresa';
                $scope.pedidos[i].subtotal = 0;
              }
              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].tipo_usuario1 = 'Ecommerce';
                $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
                if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                  $scope.pedidos[i].destinos[0].descuento = 0;
                }
                $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO' && $scope.pedidos[i].estado != 'ANULADO' && $scope.pedidos[i].estado != 'RECHAZADO') {
                $scope.pedidos[i].estado = 'REPROGRAMADO';
                if ($scope.pedidos[i].tipo_usuario == 3) {
                  $scope.pedidos[i].subtotal = 0;
                }
              }

              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pedidos[i].subtotal = 0;
              }

              $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;
              
              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == null) {
                $scope.pedidos[i].cantidad_devolucion = 0;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen;
              }
              
              if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].destinos[0].admin_id != 0) {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].cantidad_devolucion = 0;
                for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                  $scope.pedidos[i].cantidad_cliente += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
                  $scope.pedidos[i].cantidad_devolucion += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                }
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO' && $scope.pedidos[i].estado != 'ANULADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
              }

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.tracking.push({
                  id: $scope.pedidos[i].id,
                  tipo_usuario: $scope.pedidos[i].tipo_usuario1,
                  fecha1: $scope.pedidos[i].fecha1,
                  horap: $scope.pedidos[i].destinos[0].hora_destino,
                  nombre_cliente: $scope.pedidos[i].nombre,
                  nombre_destino: $scope.pedidos[i].destinos[0].nombre_destino,
                  direccion: $scope.pedidos[i].destinos[0].destino,
                  distrito: $scope.pedidos[i].destinos[0].distrito_destino,
                  detalle: $scope.pedidos[i].destinos[0].detalle,
                  cantidad_almacen: $scope.pedidos[i].cantidad_almacen,
                  cantidad_cliente: $scope.pedidos[i].cantidad_cliente,
                  cantidad_devolucion: $scope.pedidos[i].cantidad_devolucion,
                  forma_pago1: $scope.pedidos[i].forma_pago1,
                  monto: $scope.pedidos[i].subtotal,
                  costo: $scope.pedidos[i].costo,
                  costo_recojo: $scope.pedidos[i].costo_recojo,
                  moto: $scope.pedidos[i].motorizado,
                  estado: $scope.pedidos[i].estado,
                  motivo: $scope.pedidos[i].motivo,
                  tipo: $scope.pedidos[i].tipo
                })
              }

              if ($scope.pedidos[i].tipo_usuario != 3) {
                var letter = 'A'.charCodeAt(0);
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                  $scope.tracking.push({
                    id: $scope.pedidos[i].id + '-' + String.fromCharCode(letter),
                    tipo_usuario: $scope.pedidos[i].tipo_usuario1,
                    fecha1: $scope.pedidos[i].fecha1,
                    horap: $scope.pedidos[i].horap,
                    nombre_cliente: $scope.pedidos[i].nombre,
                    nombre_destino: $scope.pedidos[i].destinos[j].nombre_destino,
                    direccion: $scope.pedidos[i].destinos[j].destino,
                    distrito: $scope.pedidos[i].destinos[j].distrito_destino,
                    detalle: '-',
                    cantidad_almacen: '-',
                    cantidad_cliente: '-',
                    cantidad_devolucion: '-',
                    forma_pago1: $scope.pedidos[i].forma_pago1,
                    monto: 0,
                    costo: $scope.pedidos[i].destinos[j].costo,
                    costo_recojo: 0,
                    moto: $scope.pedidos[i].motorizado,
                    estado: $scope.pedidos[i].estado,
                    motivo: $scope.pedidos[i].motivo,
                    tipo: $scope.pedidos[i].tipo
                  }) 
                  letter = letter + 1;   
                }  
              }

              console.log($scope.tracking);
            }
          } 
          $scope.groupToPages();
        } 
      }, function(){
        if ($scope.pedidos != '') {
          $scope.no_reporte = true;
          for (var i = 0; i < $scope.pedidos.length; i++) {

            if ($scope.pedidos[i].tipo == 'URGENTE' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo == 'PROGRAMADO' && $scope.pedidos[i].tipo_usuario != 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
              if ($scope.pedidos[i].estado == 4 && $scope.pedidos[i].motorizado_id != null) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].tipo_usuario == 3) {
              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
                console.log($scope.pedidos[i].fechap);
              }
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
              }
            }

            if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].tabla == 1) {
              $scope.pedidos[i].fechap = $filter('date')(new Date($scope.pedidos[i].updated_at),'dd/MM/yyyy');
            }

            if ($scope.pedidos[i].fechap == $scope.cliente.fechaI && $scope.pedidos[i].estado != 5) {
            
              $scope.no_reporte = false;
              $scope.pedidos[i].destinos[0].cantidad = parseInt($scope.pedidos[i].destinos[0].cantidad);

              for (var j = 0; j < $scope.motorizado.length; j++) {
                if ($scope.motorizado[j].id == $scope.pedidos[i].motorizado_id) {
                  $scope.pedidos[i].motorizado = $scope.motorizado[j].name + ' ' + $scope.motorizado[j].apellidos;
                }
              }

              if ($scope.pedidos[i].motorizado_id == '') {
                $scope.pedidos[i].motorizado = '-';
              }

              if ($scope.pedidos[i].forma_pago == 0) {
                $scope.pedidos[i].forma_pago1 = 'EFECTIVO';
              } 
              if ($scope.pedidos[i].forma_pago == 1) {
                $scope.pedidos[i].forma_pago1 = 'TRANSFERENCIA';
              }
              if ($scope.pedidos[i].forma_pago == 2) {
                $scope.pedidos[i].forma_pago1 = 'POS VISA';
              }

              if ($scope.pedidos[i].estado == 3) {
                $scope.pedidos[i].estado = 'ENTREGADO';
              } 
              if ($scope.pedidos[i].estado == 4) {
                $scope.pedidos[i].estado = 'ANULADO';
              }
              if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                $scope.pedidos[i].estado = 'RECHAZADO';
              }
              if ($scope.pedidos[i].reprogramado > 0) {
                $scope.pedidos[i].tipo = 'R';
              }

              if ($scope.pedidos[i].tipo_usuario !== 3) {
                if ($scope.pedidos[i].tipo == 'PROGRAMADO') {
                  $scope.pedidos[i].horap = $scope.pedidos[i].hora;
                  $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].fecha),'dd/MM/yyyy');
                  $scope.pedidos[i].tipo = 'P';
                } else if ($scope.pedidos[i].tipo == 'URGENTE') {
                  $scope.pedidos[i].tipo = 'U';
                  $scope.pedidos[i].horap = $filter('date')(new Date($scope.pedidos[i].created_at),'HH:mm:ss');
                  $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].created_at),'dd/MM/yyyy');
                }
              }

              if ($scope.pedidos[i].tipo_usuario == 1) {
                $scope.pedidos[i].tipo_usuario1 = 'Persona';
                $scope.pedidos[i].subtotal = 0;
              }
              if ($scope.pedidos[i].tipo_usuario == 2) {
                $scope.pedidos[i].tipo_usuario1 = 'Empresa';
                $scope.pedidos[i].subtotal = 0;
              }
              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.pedidos[i].tipo_usuario1 = 'Ecommerce';
                $scope.pedidos[i].fecha1 = $filter('date')(new Date($scope.pedidos[i].destinos[0].fecha_destino),'dd/MM/yyyy');
                if ($scope.pedidos[i].destinos[0].subtotal == 0) {
                  $scope.pedidos[i].destinos[0].descuento = 0;
                }
                $scope.pedidos[i].subtotal = parseFloat($scope.pedidos[i].destinos[0].subtotal) + parseFloat($scope.pedidos[i].destinos[0].cobrarecommerce) - parseFloat($scope.pedidos[i].destinos[0].descuento);
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO' && $scope.pedidos[i].estado != 'ANULADO' && $scope.pedidos[i].estado != 'RECHAZADO') {
                $scope.pedidos[i].estado = 'REPROGRAMADO';
                if ($scope.pedidos[i].tipo_usuario == 3) {
                  $scope.pedidos[i].subtotal = 0;
                }
              }

              if ($scope.pedidos[i].estado == 'ANULADO') {
                $scope.pedidos[i].subtotal = 0;
              }

              $scope.pedidos[i].cantidad_almacen = $scope.pedidos[i].destinos[0].cantidad;
              
              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == null) {
                $scope.pedidos[i].cantidad_devolucion = 0;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta != 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen - $scope.pedidos[i].destinos[0].cantidad_devuelta;
              }

              if ($scope.pedidos[i].destinos[0].cantidad_devuelta == 0) {
                $scope.pedidos[i].cantidad_cliente = $scope.pedidos[i].cantidad_almacen;
              }
              
              if ($scope.pedidos[i].tipo_usuario == 3 && $scope.pedidos[i].destinos[0].admin_id != 0) {
                $scope.pedidos[i].cantidad_cliente = 0;
                $scope.pedidos[i].cantidad_devolucion = 0;
                for (var k = 0; k < $scope.pedidos[i].destinos[0].admin_id.length; k++) {
                  $scope.pedidos[i].cantidad_cliente += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantE);
                  $scope.pedidos[i].cantidad_devolucion += parseInt($scope.pedidos[i].destinos[0].admin_id[k].cantD);
                }
              }

              if ($scope.pedidos[i].reprogramado > 0 && $scope.pedidos[i].estado != 'ENTREGADO' && $scope.pedidos[i].estado != 'ANULADO') {
                $scope.pedidos[i].cantidad_cliente = 0;
              }

              if ($scope.pedidos[i].tipo_usuario == 3) {
                $scope.tracking.push({
                  id: $scope.pedidos[i].id,
                  tipo_usuario: $scope.pedidos[i].tipo_usuario1,
                  fecha1: $scope.pedidos[i].fecha1,
                  horap: $scope.pedidos[i].destinos[0].hora_destino,
                  nombre_cliente: $scope.pedidos[i].nombre,
                  nombre_destino: $scope.pedidos[i].destinos[0].nombre_destino,
                  direccion: $scope.pedidos[i].destinos[0].destino,
                  distrito: $scope.pedidos[i].destinos[0].distrito_destino,
                  detalle: $scope.pedidos[i].destinos[0].detalle,
                  cantidad_almacen: $scope.pedidos[i].cantidad_almacen,
                  cantidad_cliente: $scope.pedidos[i].cantidad_cliente,
                  cantidad_devolucion: $scope.pedidos[i].cantidad_devolucion,
                  forma_pago1: $scope.pedidos[i].forma_pago1,
                  monto: $scope.pedidos[i].subtotal,
                  costo: $scope.pedidos[i].costo,
                  costo_recojo: $scope.pedidos[i].costo_recojo,
                  moto: $scope.pedidos[i].motorizado,
                  estado: $scope.pedidos[i].estado,
                  motivo: $scope.pedidos[i].motivo,
                  tipo: $scope.pedidos[i].tipo
                })
              }

              if ($scope.pedidos[i].tipo_usuario != 3) {
                var letter = 'A'.charCodeAt(0);
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                  $scope.tracking.push({
                    id: $scope.pedidos[i].id + '-' + String.fromCharCode(letter),
                    tipo_usuario: $scope.pedidos[i].tipo_usuario1,
                    fecha1: $scope.pedidos[i].fecha1,
                    horap: $scope.pedidos[i].horap,
                    nombre_cliente: $scope.pedidos[i].nombre,
                    nombre_destino: $scope.pedidos[i].destinos[j].nombre_destino,
                    direccion: $scope.pedidos[i].destinos[j].destino,
                    distrito: $scope.pedidos[i].destinos[j].distrito_destino,
                    detalle: '-',
                    cantidad_almacen: '-',
                    cantidad_cliente: '-',
                    cantidad_devolucion: '-',
                    forma_pago1: $scope.pedidos[i].forma_pago1,
                    monto: 0,
                    costo: $scope.pedidos[i].destinos[j].costo,
                    costo_recojo: 0,
                    moto: $scope.pedidos[i].motorizado,
                    estado: $scope.pedidos[i].estado,
                    motivo: $scope.pedidos[i].motivo,
                    tipo: $scope.pedidos[i].tipo
                  }) 
                  letter = letter + 1;   
                }  
              }

              console.log($scope.tracking);
            }
          } 
          $scope.groupToPages();
        }
      });
    }, function(){
      console.log('error');
    });
  };

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour);  
    return date.toString();
  }

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  $scope.imprimir = function(pedido) {  
    if(document.getElementById("articulos_reporte") != null){
      var pedidos = document.getElementById("articulos_reporte").innerHTML;  
    }  

    $timeout(function() {     
      var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<style>@page{size:landscape;}</style><html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
      popupWinindow.document.close();
      }, 500);
  }

  $scope.exportToExcel=function(tableId){
    var exportHref=Excel.tableToExcel(tableId,'REPORTE DE DISTRIBUCION');
    var a = document.createElement('a');
    a.href = exportHref;
    a.download = 'CONTROL POR MOTORIZADO ' + $scope.fechaInicio + '.xls';
    a.click();
  }
  
})

.controller('Listado_liquidacionCtrl', function($scope,$timeout,userService,$http,$filter,CONFIG,$mdDialog,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
  $scope.no_reporte = false;
  $scope.consultar = false; 

  var req = {
    method: 'GET',
    url: '../api/public/api/users',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    $scope.init3 = function(){
      $scope.ori = response.data.pedidos;
      console.log($scope.ori);
      $scope.b0= [];
      $j = 0;
      $scope.b=[];;
      if(isNaN($scope.DirOrigen)){
        for(var i=0; i<$scope.ori.length; i++){
       
            console.log("cadena: "+$scope.DirOrigen);
            if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].name,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }else{
              if($filter('lowercase')($scope.DirOrigen) === $filter('lowercase')($filter('limitTo')($scope.ori[i].apellidos,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }
            }
        }
      }else{
        for(var i=0; i<$scope.ori.length; i++){
          if($scope.DirOrigen === ($filter('limitTo')($scope.ori[i].dni,$scope.DirOrigen.length,0)) && ($scope.ori[i].tipo_usuario == 1 || $scope.ori[i].tipo_usuario == 2 || $scope.ori[i].tipo_usuario == 3)){
              $scope.b.push({ nombre:$scope.ori[i].name, dni:$scope.ori[i].dni, apellidos:$scope.ori[i].apellidos, id:$scope.ori[i].id });
              $scope.b0=$scope.b;
              console.log($scope.b0[$j]);
              $j = $j + 1;
            }
        }
      }
      $scope.direcciones = $scope.b0; 
    };
  }, function(){
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Courier Liebre Express | Administrativo')
        .textContent('Ha ocurrido un error')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
    );
  });

  $scope.reset_direccion = function(){
    $scope.direcciones = null;
  };

  $scope.cambiausuario = function(DirOrigen){
    $scope.DirOrigen = DirOrigen.nombre +' '+ DirOrigen.apellidos;
    $scope.DirOrigen2 = DirOrigen;
    selec();
    $scope.direcciones = null;
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pagedItems = [];
    $scope.pendientes = [];
    $scope.no_reporte = false;
    $scope.consultar = false;
  };

  $scope.date = CONFIG.DATE;

  $scope.cliente = {
    nombre: '',
    dni: '',
    id:'',
    tipo_usuario: '',
    fechaInicio: new Date($scope.date),
    fechaFin: new Date($scope.date),
    almacen: ''
  }

  $scope.fechaInicio = '';
  $scope.fechaFin = '';
  $scope.id_liquidacion = [];
  $scope.id_orden = [];

  function selec(){
    for(var i = 0; i < $scope.ori.length; i++){
      if($scope.DirOrigen2.id==$scope.ori[i].id){  
        $scope.cliente.nombre=$scope.ori[i].name;
        $scope.cliente.id=$scope.ori[i].id;
        $scope.cliente.dni=$scope.ori[i].dni;
        $scope.cliente.telefono=$scope.ori[i].telefono;
        $scope.cliente.email=$scope.ori[i].email;
        $scope.cliente.tipo_usuario= $scope.ori[i].tipo_usuario;
        $scope.cliente.almacen= $scope.ori[i].almacen;
      }
    }
  };

  $scope.Consultar = function(){
    $scope.cliente.fechaI = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    $scope.fechaInicio = $filter('date')(new Date($scope.cliente.fechaInicio),'dd/MM/yyyy');
    
    $scope.tracking = [];
    $scope.selected = [];
    $scope.pendientes = [];
    $scope.liquidacion_final = [];
    $scope.id_liquidacion = [];
    $scope.id_orden = [];

    var req = {
      method: 'GET',
      url: '../api/public/api/liquidaciones/'+ $scope.cliente.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.liquidaciones = response.data.liquidacions;
      var hora_completa = [];
      var id = 0;
      $scope.no_reporte = true;

      if ($scope.liquidaciones != '') {
        for (var i = 0; i < $scope.liquidaciones.length; i++) {
          if ($scope.liquidaciones[i].fecha_inicio != null) {
            var parts = $scope.liquidaciones[i].fecha_inicio.split("-");
            var parts2 = new Date(parts[0], parts[1] - 1, parts[2]);
            $scope.liquidaciones[i].fechap = $filter('date')(new Date(parts2),'dd/MM/yyyy');
          } else {
            $scope.liquidaciones[i].fechap = '';
          }
          if ($scope.liquidaciones[i].user_id == $scope.cliente.id) {
            $scope.tracking.push($scope.liquidaciones[i]);
            $scope.no_reporte = false;
            $scope.consultar = true;
          }
        }
        $scope.tracking.reverse();
        $scope.groupToPages();
      }
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  };

  function getFormattedDate(dateString,hour) {
    var date = new Date(dateString);
    date.setHours(hour);  
    return date.toString();
  }

    // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };

  $scope.pagar = function(item) {
    $scope.liquidacion_final = {
      depositado: 1
    }

    var req_despositado = {
      method: 'PUT',
      url: '../api/public/api/liquidaciones/' + item.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: $scope.liquidacion_final
    }

    $http(req_despositado).then(function(response){
      item.depositado = 1;
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('La liquidacion se marco como depositada')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  }
})

.controller('Productos_devueltosCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
 
  var req = {
    method: 'GET',
    url: '../api/public/api/productos_pedido_fechas',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    if (response.data != '') {
      console.log(response.data);
      $scope.tracking = response.data;
      for (var i = 0; i < $scope.tracking.length; i++) {
        console.log($scope.tracking[i].fecha);
        $scope.tracking[i].fecha1 = $scope.tracking[i].fecha;
      }
      $scope.tracking.reverse(); 
      $scope.groupToPages();
    }
  }, function(){
    console.log('ha ocurrido un error');
  });

  $scope.ver_dia = function(fecha) {
    console.log(fecha);
    CONFIG.FECHA = fecha;
    $location.path('/informacion_devueltos');
  }

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };
})

.controller('Informacion_devueltosCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel,$mdDialog) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];

  var fecha = CONFIG.FECHA;

  var req = {
    method: 'GET',
    url: '../api/public/api/por_fechas?fecha='+fecha,
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    console.log(response.data);
    $scope.tracking = response.data;
    $scope.groupToPages();
  }, function(){
    console.log('ha ocurrido un error');
  });

  $scope.reponer = function(item) {
    console.log(item);

    $scope.datos = {
      id_producto_pedido: item.id,
      cantD: item.cantD
    };

    $timeout(function() {
      var req2 = {
        method: 'PUT',
        url: '../api/public/api/agregar_devueltos/'+item.atributo_id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.datos
      }
      $http(req2).then(function(response){
        console.log(response.data);
        item.reponer = 0;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Productos devueltos con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }, function(error){
        console.log(error);
      });
    }, 300);
  }

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.tracking[i]];
          } else {
              $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tracking[i]);
          }
      }
  };
  
  $scope.range = function (start, end) {
      var ret = [];
      if (!end) {
          end = start;
          start = 0;
      }
      for (var i = start; i < end; i++) {
          ret.push(i);
      }
      return ret;
  };
  
  $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
          $scope.currentPage--;
      }
  };
  
  $scope.nextPage = function () {
      if ($scope.currentPage < $scope.tracking.length - 1) {
          $scope.currentPage++;
      }
  };
  
  $scope.setPage = function () {
      $scope.currentPage = this.n;
  };
})

.factory('Excel',function($window){
  var uri='data:application/vnd.ms-excel;base64,',
    template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>table{display:inline-block;page-break-after:auto;border-collapse: collapse;border-width: 1px 0 0 0px !important;}td,th{border: 1px solid #000 !important;}</style></head><body><table>{table}</table></body></html>',
    base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
    format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
  return {
    tableToExcel:function(tableId,worksheetName){
      var table=$(tableId),
        ctx={worksheet:worksheetName,table:table.html()},
        href=uri+base64(format(template,ctx));
      return href;
    }
  };
})

.controller('InventarioCtrl', function($scope,$location,$timeout,userService,$http,CONFIG,$mdDialog) {
  var atri = {
    method: 'GET',
    url: '../api/public/api/get_ecommerce',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(atri).then(function(response){
    console.log(response.data);
    $scope.ecommerce=response.data.users;
  }, function(error){
    console.log('error');
  });

  var req = {
    method: 'GET',
    url: '../api/public/api/users',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.usuarios = [];
  var count = 0;

  $timeout(function() {
    $http(req).then(function(response){
      console.log(response.data.pedidos);
      $scope.user = response.data.pedidos;

      for (var i = 0; i < $scope.user.length; i++) {
        if ($scope.user[i].tipo_usuario == 3) {
          $scope.usuarios.push($scope.user[i]); 
        }
        count = count + 1;
      }

      if (count == $scope.user.length) {
        for (var i = 0; i < $scope.usuarios.length; i++) {
          if ($scope.usuarios[i].almacen == 0) {
            $scope.usuarios[i].almacen1 = false;
            $scope.usuarios[i].almacen_text = 'NO';
          }
          if ($scope.usuarios[i].almacen == 1) {
            $scope.usuarios[i].almacen1 = true;
            $scope.usuarios[i].almacen_text = 'SI';
          }
        }
      }
    }, function(error){
      console.log('error');
    });  
  }, 700);

  $scope.onChange = function(pedido) {

    var confirm1 = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea eliminar el almacen de '+ pedido.name +'?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    var confirm2 = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea asignarle un almacen a '+ pedido.name +'?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    if (!pedido.almacen1) {
      
      $mdDialog.show(confirm1).then(function() {
        pedido.almacen = 0;
        pedido.almacen_text = 'NO';
        $scope.datos = {
          almacen: 0
        }

        var reqe = {
          method: 'PUT',
          url: '../api/public/api/update_users/'+ pedido.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.datos
        }

        $http(reqe).then(function(response){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Almacen eliminado con éxito')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          for (var i = 0; i < $scope.ecommerce.length; i++) {
            if($scope.ecommerce[i].id == pedido.id){ 
              $scope.ecommerce.splice(i, 1); 
            }
          }
        }, function(error){
          console.log('error');
          pedido.almacen1 = false;
        });
        
      }, function() {
        pedido.almacen1 = true;
      });
    }

    if (pedido.almacen1) {
      $mdDialog.show(confirm2).then(function() {
        pedido.almacen = 1;
        pedido.almacen_text = 'SI';     
        $scope.datos = {
          almacen: 1
        }

        var reqe = {
          method: 'PUT',
          url: '../api/public/api/update_users/'+ pedido.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.datos
        }

        $http(reqe).then(function(response){
          $scope.ecommerce.push(pedido);
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Almacen asignado con éxito')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }, function(error){
          console.log('error');
          pedido.almacen1 = false;
        });
      }, function() {
        pedido.almacen1 = false;
      });
    }
  };

  $scope.verTienda=function(id){
    CONFIG.ECOMMERCE=id;
    $location.path( "/productos" );
  }  
})

.controller('ProductosCtrl', function($scope,$location,$timeout,userService,$http,$filter,$mdDialog,CONFIG,Upload) {

  if(CONFIG.ECOMMERCE==''){
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Courier Liebre Express | Administrativo')
        .textContent('Debes ir a la pestaña anterior y seleccionar una tienda de nuevo')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
    );
  }
  console.log(CONFIG.ECOMMERCE);

  $scope.inventario = function() {
    $location.path('/inventario');
  }

  $scope.inventarios = [];

  $timeout(function() {
    var req2 = {
      method: 'GET',
      url: '../api/public/api/inventario/'+CONFIG.ECOMMERCE,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }
    $http(req2).then(function(response){
      if (response.data != '') {
        $scope.inventarios = response.data.productos;
        console.log($scope.inventarios);
        for (var i = 0; i < $scope.inventarios.length; i++) {
          $scope.inventarios[i].admin_id=false;
          if ($scope.inventarios[i].imagen == '') {
            $scope.inventarios[i].imagen = 'images/no-image.png';
          }  
        }
      }
    }, function(error){
      console.log(error);
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Debes ir a la pestaña anterior y seleccionar una tienda de nuevo')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  }, 300);

  $scope.verPedido=function(id){
    for (var i = 0; i < $scope.inventarios.length; i++) {
      if($scope.inventarios[i].id==id){
        if($scope.inventarios[i].admin_id==false){
          $scope.inventarios[i].admin_id=true;
        }else{
          $scope.inventarios[i].admin_id=false;
        }
      } else{
        $scope.inventarios[i].admin_id=false;
      }
    }
  }

  $scope.eliminarProducto=function(producto_id,nombre){
        
    var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea eliminar de manera permanente el producto '+ nombre +' y sus derivados?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      for (var i = 0; i < $scope.inventarios.length; i++) {
        if($scope.inventarios[i].id==producto_id){  
          var atri = {
            method: 'DELETE',
            url: '../api/public/api/producto/'+producto_id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            }
          }

          $http(atri).then(function(response){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('¡Producto eliminado con éxito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          }, function(error){
            console.log('error');
          });
          $scope.inventarios.splice(i, 1);
        };
      };
    }, function() {
      
    });
  };

  $scope.eliminarColor=function(pedido_id,color_id,nombre){

    var confirm = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea eliminar el color '+ nombre +'?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      for (var i = 0; i < $scope.inventarios.length; i++) {
        if($scope.inventarios[i].id==pedido_id){
          for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
            if($scope.inventarios[i].colores[j].id==color_id){
              $scope.inventarios[i].colores.splice(j, 1);
              $timeout(function() {
               var atri = {
                  method: 'DELETE',
                  url: '../api/public/api/color/'+color_id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(atri).then(function(response){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express | Administrativo')
                      .textContent('¡Color eliminado con éxito!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                }, function(error){
                  console.log('error');
                });
              }, 200);
            }  
          }
        }
      }
    }, function() {
      
    });     
  }

  $scope.mas=function(idi,idj,idk){
    for (var i = 0; i < $scope.inventarios.length; i++) {
      if($scope.inventarios[i].id==idi){
        for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
          if($scope.inventarios[i].colores[j].id==idj){
            for (var k = 0; k < $scope.inventarios[i].colores[j].atributos.length; k++) {
              if($scope.inventarios[i].colores[j].atributos[k].id==idk){
                $scope.inventarios[i].colores[j].atributos[k].cantidad=parseInt($scope.inventarios[i].colores[j].atributos[k].cantidad)+1;
              }
            }
          }  
        }
      }
    }
  }

  $scope.menos=function(idi,idj,idk){
    for (var i = 0; i < $scope.inventarios.length; i++) {
      if($scope.inventarios[i].id==idi){
        for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
          if($scope.inventarios[i].colores[j].id==idj){
            for (var k = 0; k < $scope.inventarios[i].colores[j].atributos.length; k++) {
              if($scope.inventarios[i].colores[j].atributos[k].id==idk){
                $scope.inventarios[i].colores[j].atributos[k].cantidad-=1;
              }
            }
          }  
        }
      }
    }
  }  

  $scope.guardar=function(idi,idj,idk){
    $scope.enviar={
      cantidad:'',
      atributo:'',
      precio:'',
      color_id:''
    };

    for (var i = 0; i < $scope.inventarios.length; i++) {
      if($scope.inventarios[i].id==idi){
        for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
          if($scope.inventarios[i].colores[j].id==idj){
            for (var k = 0; k < $scope.inventarios[i].colores[j].atributos.length; k++) {
              if($scope.inventarios[i].colores[j].atributos[k].id==idk){
                $scope.enviar.cantidad=$scope.inventarios[i].colores[j].atributos[k].cantidad;
                $scope.enviar.atributo=$scope.inventarios[i].colores[j].atributos[k].atributo;
                $scope.enviar.precio=$scope.inventarios[i].colores[j].atributos[k].precio;
                $scope.enviar.color_id=$scope.inventarios[i].colores[j].atributos[k].color_id;
                var id_atributo=$scope.inventarios[i].colores[j].atributos[k].id;
                $timeout(function() {
                 var atri = {
                    method: 'PUT',
                    url: '../api/public/api/atributo/'+id_atributo,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data:$scope.enviar
                  }

                  $http(atri).then(function(response){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('¡Cambios guardados con éxito!')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  }, function(error){
                    console.log('error');
                  });
                }, 200);
              }
            }
          }  
        }
      }
    }
  };

  $scope.eliminar=function(idi,idj,idk,atributo){
    
    var confirm = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea eliminar la medida '+ atributo +'?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      for (var i = 0; i < $scope.inventarios.length; i++) {
        if($scope.inventarios[i].id==idi){
          for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
            if($scope.inventarios[i].colores[j].id==idj){
              for (var k = 0; k < $scope.inventarios[i].colores[j].atributos.length; k++) {
                if($scope.inventarios[i].colores[j].atributos[k].id==idk){
                  var id_atributo=$scope.inventarios[i].colores[j].atributos[k].id;
                  $scope.inventarios[i].colores[j].atributos.splice(k, 1);
                  $timeout(function() {
                    var atri = {
                      method: 'DELETE',
                      url: '../api/public/api/atributo/'+id_atributo,
                      headers: {
                        'Authorization' : 'Bearer ' + userService.getCurrentToken()
                      }
                    }

                    $http(atri).then(function(response){
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express | Administrativo')
                          .textContent('¡Medida eliminada con éxito!')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );

                    }, function(error){
                      console.log('error');
                    });
                  }, 200);
                }
              }
            }  
          }
        }
      }
    }, function() {
      
    });
  }

  $scope.addAtributo=function(pedido_id,color_id){
    $mdDialog.show({
      locals:{pedido_id: pedido_id,color_id:color_id}, 
      controller: DialogController2, 
      templateUrl: 'templates/addAtributo.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController2($scope, $mdDialog, pedido_id, color_id) {
    $scope.crearAtributo = {
      cantidad:'',
      precio:'',
      atributo:'',
      pedido_id:pedido_id,
      color_id:color_id
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.guardarAtributo=function(){
      var atri = {
        method: 'POST',
        url: '../api/public/api/atributo/store',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.crearAtributo
      }

      $http(atri).then(function(response){
        for (var i = 0; i < $scope.inventarios.length; i++) {
          if($scope.inventarios[i].id==$scope.crearAtributo.pedido_id){
            for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
              if($scope.inventarios[i].colores[j].id==$scope.crearAtributo.color_id){
                $scope.crearAtributo.id=response.data.id;
                  $scope.inventarios[i].colores[j].atributos.push({
                    id:response.data.id,
                    cantidad:$scope.crearAtributo.cantidad,
                    precio:$scope.crearAtributo.precio,
                    atributo:$scope.crearAtributo.atributo,
                    color_id:$scope.crearAtributo.color_id,
                    atributos:[]
                  })
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('¡Cambios guardados con éxito!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }  
            }
          }
        }
      }, function(error){
        console.log('error');
      });
    }
  }

  $scope.addColor=function(id){
    $mdDialog.show({
      locals:{data: id}, 
      controller: DialogController, 
      templateUrl: 'templates/addColor.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController($scope, $mdDialog, data) {
    $scope.crearColor = {
      color:'',
      nombrecolor:'',
      imagen: '/Administrativo/images/no-image.png',
      producto_id:data,
    }

    $scope.guardarColor=function(){
      var atri = {
        method: 'POST',
        url: '../api/public/api/color/store',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.crearColor
      }

      if ($scope.crearColor.color == '') {
        $scope.crearColor.color = '#FFFFFF';
      }

      if ($scope.crearColor.nombrecolor == '') {
        $scope.crearColor.color = 'sin color';
      }

      if ($scope.imagenSubir) {
        uploadPic(new Date().getTime());
      } else{   
        $http(atri).then(function(response){
          for (var i = 0; i < $scope.inventarios.length; i++) {
            if($scope.inventarios[i].id==$scope.crearColor.producto_id){
              $scope.inventarios[i].colores.push({
                id:response.data.id,
                color:$scope.crearColor.color,
                nombrecolor:$scope.crearColor.nombrecolor,
                imagen:'images/no-image.png',
                producto_id:$scope.crearColor.producto_id,
                atributos:[]
              })
              $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('El color se agregó con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
            }
          }
        }, function(error){
           $mdDialog.hide();
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express | Administrativo')
                .textContent('Ha ocurrido un error al agregar el color')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            )
        });
      }
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.imagenSubir = '';
    $scope.updateimage = false;

    $scope.changeImage=function(data){
      $scope.imagenSubir=data;
      $scope.crearColor.imagen =  data;
      $scope.updateimage = true;
    };

    var uploadPic = function(idC) {
      var file = $scope.imagenSubir;
      var name= idC;
      console.log(file);
      var key = 'file,'+idC;
      var obj = {};
      obj[key] = file;

      file.upload = Upload.upload({
        url: 'php/subirImagenProducto.php',
        data: obj
      });

      var atri = {
        method: 'POST',
        url: '../api/public/api/color/store',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.crearColor
      }

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
          $scope.crearColor.imagen =  file.result;

          $http(atri).then(function(response){
            for (var i = 0; i < $scope.inventarios.length; i++) {
              if($scope.inventarios[i].id==$scope.crearColor.producto_id){
                $scope.inventarios[i].colores.push({
                  id:response.data.id,
                  color:$scope.crearColor.color,
                  nombrecolor:$scope.crearColor.nombrecolor,
                  imagen:$scope.crearColor.imagen,
                  producto_id:$scope.crearColor.producto_id,
                  atributos:[]
                })
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El color se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              }
            }
          }, function(error){
             $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al agregar el color')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
          });
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;

          $scope.crearColor.imagen = 'images/no-image.png';

          $http(atri).then(function(response){
            for (var i = 0; i < $scope.inventarios.length; i++) {
              if($scope.inventarios[i].id==$scope.crearColor.producto_id){
                $scope.inventarios[i].colores.push({
                  id:response.data.id,
                  color:$scope.crearColor.color,
                  nombrecolor:$scope.crearColor.nombrecolor,
                  imagen:$scope.crearColor.imagen,
                  producto_id:$scope.crearColor.producto_id,
                  atributos:[]
                })
                $mdDialog.hide();
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express | Administrativo')
                    .textContent('El color se agregó con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                )
              }
            }
          }, function(error){
             $mdDialog.hide();
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express | Administrativo')
                  .textContent('Ha ocurrido un error al agregar el color')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              )
          });
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      })
    };
  }

  $scope.agregar_Producto = function(){
    $mdDialog.show({
      locals: {data: $scope.inventarios},
      controller: DialogController3, 
      templateUrl: 'templates/addProducto.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController3($scope, $mdDialog,CONFIG,data) {

    console.log(data);

    $scope.inventarios= data;

    $scope.addProductos={
      nombre:'',
      descripcion:'',
      user_id:CONFIG.ECOMMERCE
    }

    console.log(CONFIG.ECOMMERCE);

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.addProducto=function(){
      if($scope.addProductos.nombre!='' && $scope.addProductos.descripcion!=''){
        var atri = {
          method: 'POST',
          url: '../api/public/api/producto/store',
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.addProductos
        }

        $http(atri).then(function(response){
          $scope.inventarios.push({
            id:response.data.id,
            admin_id:false,
            nombre:$scope.addProductos.nombre,
            descripcion:$scope.addProductos.descripcion,
            user_id:CONFIG.ECOMMERCE,
            colores:[]
          })
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('¡Producto agregado con éxito!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }, function(error){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }else{
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Debe completar los campos')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }
    }    
  } 

  $scope.editar_Producto = function(producto){
    $mdDialog.show({
      locals: {data: producto},
      controller: DialogController4, 
      templateUrl: 'templates/editProducto.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function(answer) {}, function() {});
  }

  function DialogController4($scope, $mdDialog,CONFIG,data) {

    $scope.producto= data;

    $scope.editProducto={
      nombre: $scope.producto.nombre,
      descripcion: $scope.producto.descripcion
    }

    $scope.cancelar = function() {
      $mdDialog.hide();
    }

    $scope.edit_Producto=function(){
      if($scope.editProducto.nombre !='' && $scope.editProducto.descripcion!=''){
        var atri = {
          method: 'PUT',
          url: '../api/public/api/producto/'+$scope.producto.id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.editProducto
        }

        $http(atri).then(function(response){
          for (var i = 0; i < $scope.inventarios.length; i++) {
            if ($scope.inventarios[i].id == $scope.producto.id) {
              $scope.inventarios[i].nombre = $scope.editProducto.nombre;
              $scope.inventarios[i].descripcion = $scope.editProducto.descripcion;
            }
          }
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('¡Producto editado con éxito!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }, function(error){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Ha ocurrido un error')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        });
      }else{
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Debe completar los campos')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }
    }    
  } 
   
})

.controller('VariablesCtrl', function($scope,$location,$timeout,userService,$http,$filter,$mdDialog,CONFIG) {

  $scope.costos = CONFIG.COSTOS;

  var reqcosto = {
    method: 'GET',
    url: '../api/public/api/costo',
    headers: {
     'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(reqcosto).then(function(response){
    CONFIG.COSTOS = response.data.costos;
    $scope.costos = response.data.costos;
    console.log(response);
  }, function(){
      console.log('No se ha podido obtener las variables del sistema');
  });

  $scope.actualizar = function() {
    console.log($scope.costos);
    var confirm = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea actualizar las variables del sistema?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    $mdDialog.show(confirm).then(function() {

      var req = {
        method: 'PUT',
        url: '../api/public/api/costo',
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.costos[0]
      }

      $http(req).then(function(response){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Variables del sistema actualizadas con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }
})

.controller('DistritosCtrl', function($scope,$location,$timeout,userService,$http,$filter,$mdDialog,CONFIG,$resource, DTOptionsBuilder, DTColumnDefBuilder) {    
})

.controller('AngularWayChangeDataCtrl', function($scope,$location,$timeout,userService,$http,$filter,$mdDialog,CONFIG,$resource, DTOptionsBuilder, DTColumnDefBuilder) {
  
  var req = {
    method: 'GET',
    url: '../api/public/api/distritos',
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  var vm = this;
  $scope.distritos = [];

  $http(req).then(function(response){
    if (response.data == '') {
    } else {
      $scope.distritos = response.data.distritos;
      vm.persons = $scope.distritos;
    }
  }, function(){
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Courier Liebre Express | Administrativo')
        .textContent('Ha ocurrido un error, vuelve a iniciar la sesion')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
    );
  })

  vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
  .withLanguage({
        "sEmptyTable":     "No hay información disponible",
        "sInfo":           "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado desde _MAX_ total de entradas)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Mostrar _MENU_ entradas",
        "sLoadingRecords": "Cargando...",
        "sProcessing":     "Procesando...",
        "sSearch":         "Buscar Distrito:",
        "sZeroRecords":    "No se encontraron coincidencias",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": activar para ordenar la columna ascendentemente",
            "sSortDescending": ": activar para ordenar la columna descendientemente"
        }
      }).withOption('paging', false);

  vm.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3).notSortable()
  ];
  vm.person2Add = _buildPerson2Add(1);
  vm.addPerson = addPerson;
  vm.modifyPerson = modifyPerson;
  vm.removePerson = removePerson;

  $scope.model = {};

  function _buildPerson2Add(id) {
      return {
          zona: 1,
          estado: 1
      };
  }

  function addPerson() {
    var persons = {
      nombre:  vm.person2Add.nombre,
      zona: vm.person2Add.zona,
      estado: 1
    }

    var req_add = {
      method: 'POST',
      url: '../api/public/api/distritos/store',
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: persons
    }

    $http(req_add).then(function(response){
      persons.id = response.data.id;
      vm.persons.push(angular.copy(persons));
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  }

  function modifyPerson(person) {
     $scope.model = angular.copy(person);
  }

  function removePerson(index,person) {
    var req_dlt = {
      method: 'DELETE',
      url: '../api/public/api/distritos/'+ person.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express | Administrativo')
      .textContent('¿Desea eliminar el distrito '+ person.nombre +'?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      $http(req_dlt).then(function(response){
        vm.persons.splice(index, 1);
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    })
  }

  $scope.getTemplate = function (contact) {
      if (contact.id ==$scope.model.id){
        return 'edit2';
      } else {
        return 'display2';
      }
  };

  $scope.saveContact = function (index) {
     
    var distrito = {
      nombre: $scope.model.nombre,
      zona: $scope.model.zona,
      estado: $scope.model.estado
    }

    var req_upd = {
      method: 'PUT',
      url: '../api/public/api/distritos/'+ $scope.model.id,
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: distrito
    }

    $http(req_upd).then(function(response){
      vm.persons.splice(index, 1, angular.copy($scope.model));
      $scope.reset();
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Courier Liebre Express | Administrativo')
          .textContent('Ha ocurrido un error, verifique los datos o inicie sesion nuevamente')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  };

  $scope.reset = function() {
    $scope.model = {};
  }

})
//------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------


.controller('LoginMotorizadoCtrl', ['$scope','$location', "CONFIG", '$http', '$sce','$timeout','userService', function ($scope, $location, CONFIG , $http, $sce,$timeout,userService) { 
  var defaultHTTPHeaders = {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'

    };

  $scope.user =
  {
    username:'e.rangeld@hotmail.com',
    password:'123456789'
  };

  $scope.login=function(){
    userService.login(
      $scope.user.username, $scope.user.password,
      function(response){
        console.log(response);
        $location.path("/pedidos");
      },
      function(response){
        console.log(response);
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error al momento de hacer login')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }
    );
  }
}])


.directive('navmenu', function ($parse) {
  return {
    restrict: 'E',
    templateUrl: 'templates/barrasuperior.html'   
  };
})

.directive('navfooter', function ($parse) {
  return {
    restrict: 'E',
    templateUrl: 'templates/footer.html'   
  };
})

.directive('loading', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="loading"><img src="images/spina.svg" width="50" height="50"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loading', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
})

.directive('loading1', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div><img src="images/spina.svg" style="width: 35px;margin: 20px auto;"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loading1', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
})

.directive('loading2', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="loading"><img src="images/spina.svg" width="20px" height="20px"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loading2', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
})

.factory('$remember', function() {
  function fetchValue(name) {
      var gCookieVal = document.cookie.split("; ");
      for (var i=0; i < gCookieVal.length; i++)
      {
          // a name/value pair (a crumb) is separated by an equal sign
          var gCrumb = gCookieVal[i].split("=");
          if (name === gCrumb[0])
          {
              var value = '';
              try {
                  value = angular.fromJson(gCrumb[1]);
              } catch(e) {
                  value = unescape(gCrumb[1]);
              }
              return value;
          }
      }
      // a cookie with the requested name does not exist
      return null;
  }
  return function(name, values) {
      if(arguments.length === 1) return fetchValue(name);
      var cookie = name + '=';
      if(typeof values === 'object') {
          var expires = '';
          cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
          if(values.expires) {
              var date = new Date();
              date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
              expires = date.toGMTString();
          }
          cookie += (!values.session) ? 'expires=' + expires + ';' : '';
          cookie += (values.path) ? 'path=' + values.path + ';' : '';
          cookie += (values.secure) ? 'secure;' : '';
      } else {
          cookie += values + ';';
      }
      document.cookie = cookie;
  }
})

.directive('showMore', [function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=',
            limit:'='
        },

        template: '<div><p ng-show="largeText"> {{ text | subString :0 :end }}.... <a href="javascript:;" ng-click="showMore()" ng-show="isShowMore" style="color: #029ed1;">Ver más</a><a href="javascript:;" ng-click="showLess()" ng-hide="isShowMore" style="color: #029ed1;">Ver menos</a></p><p ng-hide="largeText">{{ text }}</p></div> ',

        link: function(scope, iElement, iAttrs) {

            
            scope.end = scope.limit;
            scope.isShowMore = true;
            scope.largeText = true;

            if (scope.text.length <= scope.limit) {
                scope.largeText = false;
            };

            scope.showMore = function() {

                scope.end = scope.text.length;
                scope.isShowMore = false;
            };

            scope.showLess = function() {

                scope.end = scope.limit;
                scope.isShowMore = true;
            };
        }
    };
}])

.filter('subString', function() {
    return function(str, start, end) {
        if (str != undefined) {
            return str.substr(start, end);
        }
    }
})

.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
})

