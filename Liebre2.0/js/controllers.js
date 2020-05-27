angular.module('starter.controllers', [])

.constant('PUSH', {
  SINLOGIN: 'sss'
})

.directive('myDirective', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.ngModel, function (v) {
      });
    }
  };
})

.controller('indexCtrl', function($scope,PUSH){
  $scope.banderaPush=PUSH.SINLOGIN;

  $scope.change=function(variables){
    $scope.banderaPush=variables;

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



  }

  $scope.$watch(function() { return $scope.banderaPush; },
              function() {
              }
             );


  // var OneSignal = window.OneSignal || [];
  //   OneSignal.push(["init", {
  //     appId: "50d18a75-3b82-42eb-8902-f38821e86990",
  //     autoRegister: true, /* Set to true to automatically prompt visitors */
  //     subdomainName: 'kensetsuingenieros.onesignal.com',
  //     /*
  //     subdomainName: Use the value you entered in step 1.4: http://imgur.com/a/f6hqN
  //     */
  //     httpPermissionRequest: {
  //       enable: true
  //     },
  //     welcomeNotification:{
  //       //disable:true
  //        "title": "Liebre Courier Express",
  //       "message": "Gracias por suscribirse a las notificaciones!"
  //     },
  //     notifyButton: {
  //         enable: false /* Set to false to hide */
  //     }
  //   }]);

  //   OneSignal.push(function() {
  //     /* These examples are all valid */
  //     OneSignal.getUserId(function(userId) {
  //       console.log("OneSignal User ID:", userId);
  //       //PUSH.SINLOGIN='4444';

  //       document.getElementById("peso_campo_1").value = "userId";
  //       // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
  //     });
                   
  //     OneSignal.getUserId().then(function(userId) {
  //       console.log("OneSignal User ID:", userId);
  //       if(userId == null){
  //         console.log('entro');
  //       //OneSignal.registerForPushNotifications();
  //       //OneSignal.setSubscription(true); 
  //        OneSignal.registerForPushNotifications({
  //               modalPrompt: true
  //           });
  //     }
  //       // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
  //     });

  //     OneSignal.on('notificationDisplay', function (event) {
  //     //alert('OneSignal notification displayed:');
  //     console.log(event);
  //     console.log(event.data.foo);
  //     //$scope.banderaPush = "mensaje";
  //     angular.element(document.getElementById('indexController')).scope().change('hola');
  //     //llamar();
  //       /*
  //       {
  //           "id": "ce31de29-e1b0-4961-99ee-080644677cd7",
  //           "heading": "OneSignal Test Message",
  //           "content": "This is an example notification.",
  //           "url": "https://onesignal.com?_osp=do_not_open",
  //           "icon": "https://onesignal.com/images/notification_logo.png"
  //       }
  //       */
  //     });
  //   });
})

.controller('loginCtrl', function($window,$scope, localStorageService, $remember, Facebook, $mdDialog, $http, $q, $sce, CONFIG, $location,userService,$timeout) {

   var userAgent = $window.navigator.userAgent;
   console.log(userAgent);
    var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

    for(var key in browsers) {
        if (browsers[key].test(userAgent)) {
             console.log(key);
        }
   };

  CONFIG.ROL_CURRENT_USER=0;
  CONFIG.CLIENTE = '';
  CONFIG.NOMBRE = '';
  CONFIG.ID = '';
  CONFIG.PICTURE = 'images/user-black.png';

  localStorageService.remove('Liebre-Token');
  userService.logout();

  $scope.user = {
    username: '',
    password: ''
  }

  $scope.login = function(){
    userService.login(
      $scope.user.username, $scope.user.password,
      function(response){
        CONFIG.ROL_CURRENT_USER=1;
        
        var req = {
           method: 'POST',
           url: '../api/public/api/pedido?token='+userService.getCurrentToken(),
           headers: {
             'Authorization' : 'Bearer ' + userService.getCurrentToken()
           },
           data: $scope.enviarPedido
          }

          $http(req).then(function(response){
            if (response.data.user.name != null) {
              CONFIG.NOMBRE = response.data.user.name;
            }
            if (response.data.user.apellidos != null) {
              CONFIG.NOMBRE = response.data.user.name+ ' ' + response.data.user.apellidos;
            }
            CONFIG.ID = response.data.user.id;
            CONFIG.PICTURE = response.data.user.img + '?' + new Date().getTime();
            CONFIG.ROL_CURRENT_USER=1;
            $timeout(function() {
              if (response.data.user.validado == 1) {
                $location.path( "/pedido" );
              } else{
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Debes verificar tu correo par activar tu cuenta')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
            }, 1500);
          }, function(error){
            console.log(error);
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('Ha ocurrido un error al obtener los datos del usuario')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
      },
      function(response){
        console.log(response);
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('Por favor, verifique el usuario o contraseña')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }
    );
  }

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      console.log(response.data);
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 50);

  $scope.remember = false;
  if ($remember('username_cliente') && $remember('password_cliente') ) {
      $scope.remember = true;
      $scope.user.username = $remember('username_cliente');
      $scope.user.password = $remember('password_cliente');
  }
  $scope.rememberMe = function() {
      if ($scope.remember) {
          $remember('username_cliente', $scope.user.username);
          $remember('password_cliente', $scope.user.password);
      } else {
          $remember('username_cliente', '');
          $remember('password_cliente', '');
      }
  };

  $scope.users = {
    email: '',
    name: '',
    apellidos: '',
    password: '',
    tipo_registrado: 'WEB',
    tipo_usuario: 1,
    picture: ''
  };
  
  $scope.$watch(
    function() {
      return Facebook.isReady();
    },
    function(newVal) {
      if (newVal)
        $scope.facebookReady = true;
    }
  );
  
  var userIsConnected = false;
    
  Facebook.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      userIsConnected = true;
    }
  });
    
  $scope.IntentLogin = function() {
    //if(!userIsConnected) {
      $scope.loginFace();
    //} else {
     // $window.location.href = 'pedidos.html';
    //}
  };

  $scope.loginFace = function() {
   Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.me();
      }
    }, {scope: 'email'});
  };
     
  $scope.me = function() {
    Facebook.api('/me?fields=email,first_name,last_name,picture.width(100).height(100)', function(response) {
      $scope.users.email = response.email;
      $scope.users.name = response.first_name;
      $scope.users.apellidos = response.last_name;
      $scope.users.password = response.id;
      $scope.users.tipo_registrado = 'WEB';
      $scope.users.tipo_usuario = 1;
      $scope.users.picture = response.picture.data.url;
      CONFIG.PICTURE = response.picture.data.url;

      if ($scope.users.name == null) {
        $scope.users.name = 'Usuario';
      }

      if ($scope.users.apellidos == null) {
        $scope.users.apellidos = '';
      }
    
      userService.login_facebook(
            $scope.users.email, $scope.users.password, $scope.users.name, $scope.users.apellidos, $scope.users.picture, $scope.users.tipo_usuario, $scope.users.tipo_registrado,
            function(response){
                 CONFIG.ROL_CURRENT_USER=1;

                  var req = {
                     method: 'POST',
                     url: '../api/public/api/pedido?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.enviarPedido
                    }

                    $http(req).then(function(response){
                    if (response.data.user.name != null) {
                      CONFIG.NOMBRE = response.data.user.name;
                    }
                    if (response.data.user.apellidos != null) {
                      CONFIG.NOMBRE = response.data.user.name+ ' ' + response.data.user.apellidos;
                    }
                    CONFIG.ID = response.data.user.id;
                    CONFIG.ROL_CURRENT_USER=1;
                    $timeout(function() {
                      $location.path( "/pedido" );
                    }, 1500);
                    }, function(){
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Courier Liebre Express')
                          .textContent('Ha ocurrido un error al obtener los datos del usuario')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('OK')
                      );
                    });
            },
            function(response){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Ha ocurrido un error al momento de hacer login')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
      );
    });
  };

  $scope.registro_modal = function() {
    showTabDialog();
  };

  var showTabDialog = function(ev) {
    $mdDialog.show({
      templateUrl: 'templates/registro.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:true,                
      controller: mdDialogCtrl
    })
  };

  var mdDialogCtrl = function ($scope,$timeout,$http,$q,$sce) {

    $scope.tab = 3;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }; 

    $scope.cancelar = function() {
      $mdDialog.cancel();
    };

    $scope.user = {
      name: '',
      lastname: '',
      ruc: '',
      dni: '',
      email: '',
      number: '',
      password: '',
      rpassword: '',
      tipo_registrado: 'WEB'
    }

    $scope.registro={
      name:'', 
      email:'',
      password:'',
      rpassword:'',
      apellidos:'', 
      dni:'', 
      razon_social:'',
      ruc:'', 
      telefono:'', 
      tipo_usuario:'',
      img: ''
    };

    $scope.signup_check = function(){
      $scope.check_email=false;
      var bienvenido = {
         method: 'POST',
         url: '../api/public/api/auth/signup_check?token='+userService.getCurrentToken(),
         headers: {
           'Authorization' : 'Bearer ' + userService.getCurrentToken()
         },
         data: $scope.registro
      }

      $http(bienvenido).then(function(response){
        $scope.check_email=false;
        if (response.data.status=='Usuario ya registrado') {
          //alert(response.data.status);  
          $scope.check_email=true;
        }
        if (response.data.status=='ok') {
          //alert(response.data.status); 
          $scope.check_email=false; 
        }    
      }, function(){
        console.log('no');
      });
    }
    $scope.guardar = function(tipo_registrado) {
      
      $scope.registro.tipo_usuario=tipo_registrado;

      if ($scope.userForm.$valid) {
        userService.signup(
              $scope.registro.name, $scope.registro.email, $scope.registro.password, $scope.registro.apellidos, $scope.registro.dni, $scope.registro.razon_social, $scope.registro.ruc, $scope.registro.telefono, $scope.registro.tipo_usuario,
              function(response){
                if (response.data.status=='ok') {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Usuario registrado con éxito! Revisa tu correo para activar tu cuenta')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                    var bienvenido = {
                       method: 'POST',
                       url: '../api/public/api/auth/bienvenido/'+$scope.registro.email+'?token='+userService.getCurrentToken(),
                       headers: {
                         'Authorization' : 'Bearer ' + userService.getCurrentToken()
                       },
                       data: $scope.registro
                      }

                      $http(bienvenido).then(function(response){
                        console.log('correo si');
                      }, function(){
                        console.log('correo no');
                      });
                  $location.path('/');
                }else if (response.data.status=='Usuario ya registrado') {
                    $mdDialog.hide();
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Usuario ya registrado')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                  }
              },
              function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error en el registro, intente más tarde!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
        );
      }
    };

    $scope.guardar1 = function(tipo_registrado) {
      
      $scope.registro.tipo_usuario=tipo_registrado;

      if ($scope.userForm2.$valid) {

        if($scope.registro.name==''){
          $scope.registro.name=$scope.registro.razon_social;
        }

        userService.signup(
              $scope.registro.name, $scope.registro.email, $scope.registro.password, $scope.registro.apellidos, $scope.registro.dni, $scope.registro.razon_social, $scope.registro.ruc, $scope.registro.telefono, $scope.registro.tipo_usuario,
              function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Usuario registrado con éxito! Revisa tu correo para activar tu cuenta')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
                var bienvenido = {
                       method: 'POST',
                       url: '../api/public/api/auth/bienvenido/'+$scope.registro.email+'?token='+userService.getCurrentToken(),
                       headers: {
                         'Authorization' : 'Bearer ' + userService.getCurrentToken()
                       },
                       data: $scope.registro
                      }

                      $http(bienvenido).then(function(response){
                        console.log('correo si');
                      }, function(){
                        console.log('correo no');
                      });
                $location.path('/');
              },
              function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error en el registro, intente más tarde!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
        );
      }
    };

    $scope.guardar2 = function(tipo_registrado) {
      
      $scope.registro.tipo_usuario=tipo_registrado;

      if ($scope.userForm3.$valid) {

        if($scope.registro.name==''){
          $scope.registro.name=$scope.registro.razon_social;
        }

        userService.signup(
              $scope.registro.name, $scope.registro.email, $scope.registro.password, $scope.registro.apellidos, $scope.registro.dni, $scope.registro.razon_social, $scope.registro.ruc, $scope.registro.telefono, $scope.registro.tipo_usuario,
              function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Usuario registrado con éxito! Revisa tu correo para activar tu cuenta')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
                var bienvenido = {
                       method: 'POST',
                       url: '../api/public/api/auth/bienvenido/'+$scope.registro.email+'?token='+userService.getCurrentToken(),
                       headers: {
                         'Authorization' : 'Bearer ' + userService.getCurrentToken()
                       },
                       data: $scope.registro
                      }

                      $http(bienvenido).then(function(response){
                        console.log('correo si');
                      }, function(){
                        console.log('correo no');
                      });
                $location.path('/');
              },
              function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error en el registro, intente más tarde!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }
        );
      }
    };
  };   
})

.controller('passwordCtrl', function($scope,$http,$mdDialog,userService){
  $scope.email={
    email: '',
    estado: 0
  };
  $scope.enviando = false;

  $scope.resetPassword= function(){
    if($scope.email.email==''){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Debe ingresar su correo para reestaurar su contraseña')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    }else{
      $scope.enviando = true;
      var req = {
         method: 'POST',
         url: '../api/public/api/auth/password?token='+userService.getCurrentToken(),
         headers: {
           //'Authorization' : 'Bearer ' + userService.getCurrentToken()
         },
         data: $scope.email
      }

      $http(req).then(function(response){
        $scope.email.id= response.data.id;

           var req2 = {
               method: 'POST',
               url: '../api/public/api/auth/resetpassword/'+$scope.email.email+'?token='+userService.getCurrentToken(),
               headers: {
                 //'Authorization' : 'Bearer ' + userService.getCurrentToken()
               },
               data: $scope.email
            }

            $http(req2).then(function(response){
              console.log(response);
              $scope.enviando = false;
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Revise su correo electrónico para restaurar la contraseña')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );      
            },function(response){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Ha ocurrido un error al enviar el correo de restauración a su dirección de correo electrónico.')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );  
              console.log(response);
            }) 

      },function(response){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('Correo o Usuario no registrado.')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );  
        console.log(response);
      })
    }
  }
})

.controller('emailpasswordCtrl', function($scope,$http,$routeParams,$location,$mdDialog){
  $scope.id=$routeParams.id;
  $scope.user={
    email:'',
    password1:'',
    password2:''
  };

  setTimeout(function() {
    var req2 = {
                 method: 'GET',
                 url: '../api/public/api/auth/password/'+$scope.id
              }

              $http(req2).then(function(response){
                console.log(response);      
                $scope.user.email=response.data.password.email;
              },function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Ha ocurrido un error al momento de obtener los datos para validad el usuario y reestaurar la contraseña.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );  
                console.log(response);
              }) 
  }, 200);

  $scope.reestaurar= function(){
    if(($scope.user.password1==$scope.user.password2)&&$scope.user.password2!=''){
      $scope.user.password=$scope.user.password1;
      var req2 = {
                 method: 'PUT',
                 url: '../api/public/api/auth/password',
                 data: $scope.user
              }

              $http(req2).then(function(response){
                console.log(response);  
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Su contraseña se ha restaurado con éxito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );  
                $location.path("/login");  
              },function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Ha ocurrido un error al momento de reestaurar la contraseña')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );  
                console.log(response);
              }) 


    }else{
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Verifica las contraseñas')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );  
    }
  }         
})

.controller('personaCtrl', function($scope,$filter,$sce,$location,$timeout,$filter,$cookieStore,$http,CONFIG,userService,Facebook,$mdDialog) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  var OneSignal = window.OneSignal || [];

    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        $scope.push={
          push: userId
        };
        var req = {
           method: 'PUT',
           url: '../api/public/api/update_push/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
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

  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.date = CONFIG.DATE;
  $scope.daten = new Date(CONFIG.DATE);
  $scope.current = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');

  $scope.loadingwait2 = false;
  $scope.loadingwait = false;
  $scope.confirm_pedido = false;
  $scope.confirm_pedido2 = false;
  $scope.confirm_pedido3 = false;
  $scope.disponible = false;
  var currentTime= moment($scope.current);
  var startTime = moment('00:00 am', "HH:mm a");
  var endTime = moment('07:00 pm', "HH:mm a");

  amIBetween = currentTime.isBetween(startTime , endTime);

  $scope.user = '';
  $scope.costos = [];
  $scope.costoe = 0;
  
  $scope.origen= {
    origen:'',
    departamentoOrigen:'',
    nombreOrigen:'',
    telefonoOrigen:'',
    distrito_origen: '',
    zona_origen: '',
    lat:'',
    lng:'',
    myDate:'',
    fecha_origen: '',
    recojo:'',
    comentarios:'',
    star: false
  };

  var tomorrow =  new Date($scope.date);
  var n = tomorrow.getDay();

  $scope.pruebaFecha= function() {
     console.log($scope.pedidos);
     //$scope.pedidos.fecha_destino1=new Date();
  };

  if (n != 6) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  } else {
    tomorrow.setDate(tomorrow.getDate() + 2);
  }
  if (n == 5) {
    $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
  }

  $scope.distritos = [];
  $scope.seleccionarHoraeO = [{'ids': 0, 'value':0, 'hora':'19-23'}];
  $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;

        if (!amIBetween && $scope.user.almacen == 0) {
          $scope.disponible = true;
        }
        
        if ($scope.user.almacen == 1) {
          $scope.origen.lat = -12.0501823;
          $scope.origen.lng = -76.97248680000001;
          $scope.origen.origen = 'Almacenes Liebre Courier Express';
          $scope.origen.nombreOrigen = 'Operador Liebre';
          $scope.origen.departamentoOrigen = '-';
          $scope.origen.telefonoOrigen = 3558888;
          $scope.fecha_origen = new Date($scope.date);
          $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
          $scope.horaPedido2_origen= 2;
          $scope.horaPedido3_origen= $scope.seleccionarHorae[2];
          $scope.horaPedido_origen = '09-19';
          $scope.horario_origen= '2';
          $scope.origen.comentarios= '-';
          $scope.origen.distrito_origen='Santa Anita'; 
          $scope.origen.zona_origen = '2';
          for (var i = 0; i < $scope.distritos.length; i++) {
            if ($scope.distritos[i].nombre == $scope.origen.distrito_origen){
              $scope.origen.distrito = $scope.distritos[i];
            }
          }
        }
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $timeout(function() {
      $scope.user = CONFIG.CLIENTE;
      $scope.distritos = CONFIG.DISTRITOS;

      if (!amIBetween && $scope.user.almacen == 0) {
        $scope.disponible = true;
      }

      if ($scope.user.almacen == 1) {
        $scope.origen.lat = -12.0501823;
        $scope.origen.lng = -76.97248680000001;
        $scope.origen.origen = 'Almacenes Liebre Courier Express';
        $scope.origen.nombreOrigen = 'Operador Liebre';
        $scope.origen.departamentoOrigen = '-';
        $scope.origen.telefonoOrigen = 3558888;
        $scope.fecha_origen = new Date($scope.date);
        $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
        $scope.horaPedido2_origen= 2;
        $scope.horaPedido3_origen= $scope.seleccionarHorae[2];
        $scope.horaPedido_origen = '09-19';
        $scope.horario_origen= '2';
        $scope.origen.comentarios= '-';
        $scope.origen.distrito_origen='Santa Anita';
        $scope.origen.zona_origen = '2';
        for (var i = 0; i < $scope.distritos.length; i++) {
          if ($scope.distritos[i].nombre == $scope.origen.distrito_origen){
            $scope.origen.distrito = $scope.distritos[i];
          }
        }
      }
    }, 300);
  }

  if (CONFIG.COSTOS == '') {
    setTimeout(function() {
      var reqcosto = {
        method: 'GET',
        url: '../api/public/api/costo?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqcosto).then(function(response){
          console.log(response.data.costos);
          CONFIG.COSTOS = response.data.costos;
          $scope.costos = response.data.costos;
      }, function(){
          console.log('No se ha podido obtener las variables del sistema');
      });
    }, 800);
  } else {
    $scope.costos = CONFIG.COSTOS;
  }

  if (CONFIG.DISTRITOS == '') {
    setTimeout(function() {
      var reqdistrito = {
        method: 'GET',
        url: '../api/public/api/distritos?token='+userService.getCurrentToken(),
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
        CONFIG.DISTRITOS = $scope.distritos; 
      }, function(){
          console.log('No se ha podido obtener los distritos');
      });
    }, 200);
  } else {
    $scope.distritos = CONFIG.DISTRITOS;
  }

  /*-----------------------------------*/

  $scope.gPlace;

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
  var distance_min=6378137;
  var distance=0;
  var duration=0;
  $scope.duracion=0;
  $scope.km=0;
  $scope.ori='';
  $scope.dest='';
  $scope.costo=0;
  $scope.sobre=0;
  $scope.cajaMediana=0;
  $scope.cajaGrande=0;
  $scope.myDate=new Date($scope.date);
  $scope.stado=0;
  $scope.formaPago = 0;
  $scope.costo_recojo = 0;
  $scope.medio = 0;
  $scope.cancelado = 0;
  $scope.fecha_origen = new Date($scope.date);
    
  if ($scope.medio == 0) {
    $scope.sobre = 1;
    $scope.cajaMediana = 0;
    $scope.cajaGrande = 0;
  } else if ($scope.medio == 1) {
    $scope.sobre = 0;
    $scope.cajaMediana = 1;
    $scope.cajaGrande = 0;
  } else if ($scope.medio == 2) {
    $scope.sobre = 0;
    $scope.cajaMediana = 0;
    $scope.cajaGrande = 1;
  }

  /************************* FIN Definición de las Variables **********************/

  /************************* Inicio de declaracion de horarios **********************/

  var circle = new google.maps.Circle({
    center: {lat:  -12.1056553, lng: -77.0369909},
    radius: 10*1000
  });

  $scope.autocompleteOptions = {
    bounds: circle.getBounds(),
    componentRestrictions: {country: 'pe'}
  };
  
  var lima={
    lat: -12.046374,
    lng: -77.042793
  };

  $scope.pedidos = [{   
    'id_pedido':1,
    'destino':'',
    'departamentoDestino':'',
    'nombreDestino':'',
    'telefonoDestino':'',
    'distrito_destino':'',
    'zona_destino':'',
    'distrito':'',
    'comentarios':'',
    'myDate2':'',
    'entrega':'',
    'km':'',
    'min':'',
    'cobrarecommerce': parseFloat(0),
    'descuento': parseFloat(0),
    'selected':false,
    'star': false,
    'cancelado':'',
    'costo':1,
    'cantidad': '',
    'detalle': '',
    'subtotal': parseFloat(0),
    'total': parseFloat(0),
    'fecha_destino': tomorrow,
    'turno_destino': '',
    'hora_destino': '', 
    'fecha_destino1': tomorrow,
    'horario_destino': 5,
    'hora_destino1': '',
    'productos': [],
    'forma': 0
  }];

  /************************* FUNCION INICIALIZACIÓN DEL MAPA **********************/    
  
  initMap= function(){
    $timeout(function() {
      var mapDiv=document.getElementById('mapo');
      
      var mapOptions={
        center: lima,
        zoom:14
        //styles: styles
      }

      $scope.map= new google.maps.Map(mapDiv,mapOptions);
    }, 300);
  }

  initMap1= function(){
    $timeout(function() {
      var mapDiv=document.getElementById('mapo');
      
      var mapOptions={
        center: lima,
        zoom:14,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        //styles: styles
      }

      $scope.map= new google.maps.Map(mapDiv,mapOptions);
    }, 300);
  }

  /*if (!amIBetween && $scope.user.almacen == 0) {
    initMap1();
  } else{
    initMap();
  }*/
  
  initMap();

  /************************* FIN FUNCION INICIALIZACIÓN DEL MAPA **********************/   


  /************************* FUNCION GEOLOCALIZACIÓN **********************/ 

  $scope.locateMe=function(){
      navigator.geolocation.getCurrentPosition(function(pos){

          miUbicacion.lat= pos.coords.latitude;
          miUbicacion.lng= pos.coords.longitude;
          $scope.origen.lat=miUbicacion.lat;
          $scope.origen.lng=miUbicacion.lng;
          $scope.map.setCenter(miUbicacion);
          geocoder.geocode({'location': $scope.origen}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  $scope.origen.departamentoOrigen=results[0].formatted_address;
                } else {
                  console.log('No results found');
                }
              } else {
                console.log('Geocoder failed due to: ' + status);
              }
            });
          addMarker(miUbicacion,0);
      },function(error){
        console.log('ha ocurrido un error');
      })
  }

  /************************* FIN FUNCION GEOLOCALIZACIÓN **********************/  

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
              console.log(results);
              console.log(results[0].address_components[2].long_name);
              $scope.origen.origen=results[0].formatted_address;                  
              $scope.origen.lat=drag.lat;
              $scope.origen.lng=drag.lng;

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
        //alert('entre en 15 '+ marker.icon.length);
        var val=marker.icon;
        var subVal=val.substring(7,8);

        drag.lat=marker.getPosition().lat();  
        drag.lng=marker.getPosition().lng();

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $scope.pedidos[subVal-1].destino=results[0].formatted_address;       
              $scope.pedidos[subVal-1].lat=drag.lat;
              $scope.pedidos[subVal-1].lng=drag.lng;
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
              $scope.pedidos[subVal-1].destino=results[0].formatted_address;               
              $scope.pedidos[subVal-1].lat=drag.lat;
              $scope.pedidos[subVal-1].lng=drag.lng;

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

  /************************* FIN FUNCION MARCADORES **********************/    
   
  /************************* FUNCION TRAZADO DE RUTAS **********************/  
    traceRoute= function(rutas){

        if(rutas){
            for (var i = 0; i < directionsDisplays.length; i++) {
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
              departureTime: new Date(),
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
            }
          }
          request.optimizeWaypoints = true;
  
          directionsService.route(request,function(response,status){
            if(status==google.maps.DirectionsStatus.OK){
              directionsDisplay.setOptions({ suppressMarkers: true });
              directionsDisplay.setDirections(response);
              for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                duration=duration+response.routes[0].legs[i].duration.value;
              }
              for (var i = 0 ; i < $scope.pedidos.length ; i++) {
                $scope.pedidos[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
              }                   
            }
          })     
        }, 500);
    }
  /************************* FIN FUNCION TRAZADO DE RUTAS **********************/  

  /************************* FUNCIONES INTERCAMBIAR POSICIÓN **********************/   
    $scope.nextId=function(id){
      var Nid='';

      for ( i=0; i < $scope.pedidos.length; i++) {  
        if($scope.pedidos[i].id_pedido==id){
          Nid=$scope.pedidos[i+1].id_pedido;
        }
      }
      return Nid;
    };

    $scope.subir = function(id){
      var Nid=$scope.nextId(id);
      var subir='';
      var bajar='';

      var length = $scope.pedidos.length;
      for ( i=0; i < length; i++) {  
        if($scope.pedidos[i].id_pedido==Nid){
          subir=i;
        }
      };

      for ( j=0; j < length; j++) {  
        if($scope.pedidos[j].id_pedido==id){
          bajar=j;
        }
      };

      $timeout(function() {
        $scope.pedidos[subir].id_pedido=id;
        $scope.pedidos[bajar].id_pedido=id+1;}
      , 100);
      
      $timeout(function() {$scope.consola();}, 300);
    };

    $scope.bajar = function(id){
      var Nid=$scope.nextId(id);
      var subir='';
      var bajar='';
      var length = $scope.pedidos.length;

      for ( i=0; i < length; i++) {  
        if($scope.pedidos[i].id_pedido==id){
          subir=i;
        }
      };

      for ( j=0; j < length; j++) {  
        if($scope.pedidos[j].id_pedido==Nid){
          bajar=j;
        }
      };

      $timeout(function() {
        $scope.pedidos[subir].id_pedido=id+1;
        $scope.pedidos[bajar].id_pedido=id;}
      , 100);
      
      $timeout(function() {$scope.consola();}, 300);
    };
    
  /************************* FIN FUNCIONES INTERCAMBIAR POSICIÓN **********************/ 
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  $scope.$watch(
    function($scope) { 
        return $scope.origen.origen 
    }, function() {
        if(angular.isObject($scope.origen.origen)){
          setTimeout(function() {
            $scope.ruta=[{}];
            $scope.consola();}, 2500);
        }
    });

  $scope.$watchCollection(
    function($scope) { 
      return $scope.pedidos.destino
    }, function() {
      setTimeout(function() {
        $scope.ruta=[{}];
        $scope.consola();
      }, 1500);
    });

  $scope.change=function(id){
    for (var i = 0; i<$scope.pedidos.length; i++) {
      if(id==$scope.pedidos[i].id_pedido){
        if(angular.isObject($scope.pedidos[i].destino)){
        setTimeout(function() {
          $scope.ruta=[{}];
          $scope.consola();}, 1500);
        } 
      }
    }
  };

  /************************* FUNCION MOSTRAR RUTAS **********************/ 

  $scope.consola = function(){
    duration=0;
    $scope.pedidos.sort(function(a, b){
        return a.id_pedido - b.id_pedido;
    });

    if(angular.isObject($scope.origen.origen.geometry)){
      $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
      $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
      $scope.ruta.push({
        'lat':$scope.origen.origen.geometry.location.lat(),
        'lng':$scope.origen.origen.geometry.location.lng()
      });  
    }else{
      $scope.ruta.push({
        'lat':$scope.origen.lat,
        'lng':$scope.origen.lng
      });
    }

    if($scope.pedidos[0].destino==''){
      clearMarkers();
      $timeout(function() {for (var i = 1; i < $scope.ruta.length+1; i++) {
        $scope.map.setCenter($scope.ruta[i]);
        addMarker($scope.ruta[i],0);
      }}, 200);
      
      $timeout(function() {$scope.ruta=[{}]; /*console.log('borro rutas');*/}, 1400);    
    }else{
      if(angular.isObject($scope.pedidos[0].destino.geometry)){
        marcador.lat=$scope.pedidos[0].destino.geometry.location.lat();
        marcador.lng=$scope.pedidos[0].destino.geometry.location.lng();
        //console.log(marcador);
        $scope.ruta.push({
          'lat':marcador.lat,
          'lng':marcador.lng
        });
      }else{
        marcador.lat=$scope.pedidos[0].lat;
        marcador.lng=$scope.pedidos[0].lng;
        //console.log(marcador);
        $scope.ruta.push({
          'lat':marcador.lat,
          'lng':marcador.lng
        });
      }
                
      for (var i = 1; i < $scope.pedidos.length; i++) {
        if(angular.isObject($scope.pedidos[i].destino.geometry)){
          marcador.lat=$scope.pedidos[i].destino.geometry.location.lat();
          marcador.lng=$scope.pedidos[i].destino.geometry.location.lng();
          
          $scope.ruta.push({
            'lat':marcador.lat,
            'lng':marcador.lng
          });
        }else{
          marcador.lat=$scope.pedidos[i].lat;
          marcador.lng=$scope.pedidos[i].lng;

          $scope.ruta.push({
            'lat':marcador.lat,
            'lng':marcador.lng
          });
        }
      }
                
      var tam='';
      
      $timeout(function() {
        $scope.km =0;
        $scope.costo = 0;
        var tam=$scope.ruta.length;

        for (var i = 1; i < $scope.ruta.length; i++) {

          $scope.ori= new google.maps.LatLng($scope.ruta[i]);
          $scope.dest= new google.maps.LatLng($scope.ruta[i+1]);

          if (i < tam-1 && $scope.user.tipo_usuario != 3) {
            $scope.pedidos[i-1].costo = ((google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest)*parseFloat($scope.costos[0].costokm))/1000).toFixed(2);
          }
          console.log(isNaN(google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest)));
           /*if (isNaN(google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest))) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('!Ha ocurrido un Error al calcular su dirección¡ Por favor, vuela a intentar o pruebe con otra dirección')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }*/

          if(i<tam-1){
            $scope.km = $scope.km + google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest);
            $scope.pedidos[i-1].km = google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest);
          }
        }
      }, 200);

      $timeout(function() {
          $scope.duracion=parseInt( duration / 60);
      }, 1700);

      $timeout(function() {
        if ($scope.user.tipo_usuario != 3) {
          $scope.costo = $scope.km*parseFloat($scope.costos[0].costokm);
        }
      }, 1500);

      $timeout(function() {
          $scope.km= ((parseInt( $scope.km / 100 ) ) / 10).toFixed(2);
      }, 300);

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

  $scope.consola2=function(id){
    var miUbicacion= {
      lat:'',
      lng:''
    }

    if (id==0) {
      if(angular.isObject($scope.origen.origen.geometry)){
        $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
        $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
        $scope.origen.origen=$scope.origen.origen.formatted_address;
            miUbicacion.lat= $scope.origen.lat;
            miUbicacion.lng= $scope.origen.lng;
            
            $scope.map.setCenter(miUbicacion);  
            addMarker(miUbicacion,0);

            setTimeout(function() {
               miUbicacion.lat= 0;
               miUbicacion.lng= 0;
            }, 100);
      }else{
        geocoder.geocode({'address': $scope.origen.origen + 'lima Perú'}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
              $scope.origen.lat=results[0].geometry.location.lat();
              $scope.origen.lng=results[0].geometry.location.lng();
              miUbicacion.lat= results[0].geometry.location.lat();
              miUbicacion.lng= results[0].geometry.location.lng();
              
              $scope.map.setCenter(miUbicacion);  
              addMarker(miUbicacion,0);

              setTimeout(function() {
                 miUbicacion.lat= 0;
                 miUbicacion.lng= 0;
              }, 100);
          }else{
            //alert('Geocode address was not successful for the following reason: ' + status);
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            $scope.origen.origen='';
          }
        });
      }
    } else {
      console.log(id);
      console.log($scope.pedidos);
      var pos='';
      for (var i = 0; i < $scope.pedidos.length; i++) {
        if ($scope.pedidos[i].id_pedido==id){
          pos=i;
        }
      }
      console.log($scope.pedidos[pos].destino.geometry);
      if(angular.isObject($scope.pedidos[pos].destino.geometry)){
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if($scope.pedidos[i].id_pedido==id){
            $scope.pedidos[i].lat=results[0].geometry.location.lat();
            $scope.pedidos[i].lng=results[0].geometry.location.lng();
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
        geocoder.geocode({'address': $scope.pedidos[pos].destino + 'lima Perú'}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
              for (var i = 0; i < $scope.pedidos.length; i++) {
                if($scope.pedidos[i].id_pedido==id){

                  $scope.pedidos[i].lat=results[0].geometry.location.lat();
                  $scope.pedidos[i].lng=results[0].geometry.location.lng();
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
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );$scope.pedidos[pos].destino='';
          }
        });
      }
    }
  };

  /************************* FUNCION COTIZAR **********************/ 
  $scope.cotizacion=[];

  $scope.enviarPedido= {
    'tipo':'URGENTE',
    'fecha':$filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss'),
    'hora':'',
    'horario': '',
    'estado':$scope.stado,
    'nombre':CONFIG.NOMBRE,
    'forma_pago': $scope.formaPago, 
    'costo_recojo': '',
    'costo':1,
    'km':'',
    'min':'',
    'cajap':'',
    'cajam':'',
    'cajag':'',
    'cancelado': $scope.cancelado,
    'reprogramado': 0,
    'tipo_usuario': CONFIG.CLIENTE.tipo_usuario
  };

  $scope.Pago_persona = function(ev) {
    var puedeCotizar=0;
    var con=0;

    if($scope.origen.origen==''||$scope.origen.nombreOrigen==''||$scope.origen.telefonoOrigen==''||$scope.origen.lat==''||$scope.origen.lng==''||$scope.origen.distrito_origen=='' || $scope.origen.comentarios==''){

      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, complete los campos del origen.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }

    if($scope.pedidos.length>1){
      for (var i = 0; i < $scope.pedidos.length; i++) {
         if($scope.pedidos[i].destino==''||$scope.pedidos[i].nombreDestino==''||$scope.pedidos[i].telefonoDestino==''||$scope.pedidos[i].lat==''||$scope.pedidos[i].lng==''||$scope.pedidos[i].distrito_destino==''||$scope.pedidos[i].comentarios==''){
          con=i+1;
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del destino: '+con)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
         }
      }
    }

    if($scope.pedidos.length==1){
      if($scope.pedidos[0].destino==''||$scope.pedidos[0].nombreDestino==''||$scope.pedidos[0].telefonoDestino==''||$scope.pedidos[0].lat==''||$scope.pedidos[0].lng==''||$scope.pedidos[0].distrito_destino==''||$scope.pedidos[0].comentarios==''){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del destino: '+1)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
         }
    }

    if($scope.sobre == 0 && $scope.cajaMediana == 0 && $scope.cajaGrande == 0){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, seleccione un medio de envío.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }

    if (puedeCotizar == 0) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/pagos.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: Pagos_personaCtrl
      })
    }
  };

  var Pagos_personaCtrl = function ($scope,data,$timeout,$rootScope) { 

    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }; 

    $scope.cancelar = function() {
      $mdDialog.cancel();
    };

    $scope.guardar = function(tipo) {
      $scope.formaPago = tipo;
      $scope.loadingwait = true;
      $scope.confirm_pedido2 = true;
      $scope.cotizar();
    }

    $scope.api_pago = function(tipo) {
      $scope.formaPago = tipo;
      //$scope.cotizar();
    }
  }

  $scope.cotizar = function(){

    if(angular.isObject($scope.origen.origen.geometry)){
       $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
       $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
       $scope.origen.origen=$scope.origen.origen.formatted_address;
    }
    
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if(angular.isObject($scope.pedidos[i].destino.geometry)){
        $scope.pedidos[i].lat=$scope.pedidos[i].destino.geometry.location.lat();
        $scope.pedidos[i].lng=$scope.pedidos[i].destino.geometry.location.lng();
        $scope.pedidos[i].destino=$scope.pedidos[i].destino.formatted_address; 
      }
    }
  
    $scope.enviarPedido= {
      'tipo':$scope.tipoPedido,
      'fecha':$filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
      'hora':$scope.horaPedido,
      'horario':$scope.horario_e,
      'estado':$scope.stado,
      'nombre':CONFIG.NOMBRE,
      'forma_pago': $scope.formaPago, 
      'costo':$scope.costo,
      'costo_recojo': $scope.costo_recojo,
      'km':$scope.km,
      'min':$scope.duracion,
      'cajap':$scope.sobre,
      'cajam':$scope.cajaMediana,
      'cajag':$scope.cajaGrande,
      'cancelado': $scope.cancelado,
      'reprogramado': 0,
      'tipo_usuario': CONFIG.CLIENTE.tipo_usuario
    };

    $scope.enviarDestino={
      'pedido_id': '',
      'origen': '',
      'departamento_origen': '',
      'nombre_origen': '',
      'telefono_origen': '',
      'comentarios': '',
      'lat': '',
      'lng': '',
      'destino': '',
      'departamento_destino':'',
      'nombre_destino': '',
      'telefono_destino': '',
      'comentarios2': '',
      'lat2': '',
      'lng2': '',
      'n_marcador':'',
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0),
      'cantidad': '',
      'detalle': '',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'forma': 0
    }

    setTimeout(function() {
      if($scope.horaPedido==''){
        $scope.horaPedido='';
      }

      if($scope.horario_e==''){
        $scope.horario_e='';
      }
       

      var req = {
        method: 'POST',
        url: '../api/public/api/pedido/store?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.enviarPedido
      }

      $http(req).then(function(response){console.log(response.data);
        $scope.pedido_id= response.data.id;
        $scope.validadPedido=$scope.pedidos.length;
        $scope.contadorPedido=0;
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if(i==0){
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.origen.origen,
                'departamento_origen':$scope.origen.departamentoOrigen,
                'nombre_origen':$scope.origen.nombreOrigen,
                'telefono_origen':$scope.origen.telefonoOrigen,
                'distrito_origen': $scope.origen.distrito_origen,
                'zona_origen': $scope.origen.zona_origen,
                'comentarios':$scope.origen.comentarios,
                'lat':$scope.origen.lat,
                'lng':$scope.origen.lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino
            });

            var req = {
               method: 'POST',
               url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
               headers: {
                 'Authorization' : 'Bearer ' + userService.getCurrentToken()
                 //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
               },
               data: $scope.cotizacion[i]
              }
              console.log($scope.cotizacion[i]);
              $http(req).then(function(response){
                console.log(response.data);
                $scope.contadorPedido=$scope.contadorPedido+1;
                if($scope.validadPedido==$scope.contadorPedido){
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Su pedido se ha enviado exitosamente!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                   var re = {
                     method: 'GET',
                     url: 'onesignal.php',
                     headers: {
                       'ID' : $scope.pedido_id
                       //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                     },
                     data: ''
                  }
                  $http(re).then(function(response){
                      console.log(response.data);
                  }, function(){
                      console.log('ha ocurrido un error al enviar el push');
                  });
                  setTimeout(function() {
                    $scope.borrar();
                  }, 400);
                }
              }, function(){
                var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                    data: JSON.stringify($scope.enviarPedido),
                    pos:1,
                    user_id:CONFIG.ID
                    }
                  }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });

                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                var reqDel = {
                  method: 'DELETE',
                  url: '../api/public/api/pedido/'+$scope.pedido_id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(reqDel).then(function(response){
                  var reqtest = {
                    method: 'POST',
                    url: '../api/public/api/test?token='+userService.getCurrentToken(),
                    headers: {
                     'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:2,
                      user_id:CONFIG.ID
                    }
                  }
                  $http(reqtest).then(function(response){
                    alert('!se ha registrado este error con soporte, te responderemos en breve!');
                  }, function(){
                    
                  });
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $scope.pedido_id= '';
                  $scope.borrar();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta de nuevo!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                }, function(){
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $scope.pedido_id= '';
                  $scope.borrar();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta mas tarde!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
                var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:3,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
              });
          }else{
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.pedidos[i-1].destino,
                'departamento_origen':$scope.pedidos[i-1].departamentoDestino,
                'nombre_origen':$scope.pedidos[i-1].nombreDestino,
                'telefono_origen':$scope.pedidos[i-1].telefonoDestino,
                'distrito_origen':$scope.pedidos[i-1].distrito_destino,
                'zona_origen': $scope.pedidos[i-1].zona_destino,
                'comentarios':$scope.pedidos[i-1].comentarios,
                'lat':$scope.pedidos[i-1].lat,
                'lng':$scope.pedidos[i-1].lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino
            });
            console.log($scope.cotizacion);
            var req = {
             method: 'POST',
             url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: $scope.cotizacion[i]
            }

            $http(req).then(function(response){
              console.log(response.data);
              $scope.contadorPedido=$scope.contadorPedido+1;
              if($scope.validadPedido==$scope.contadorPedido){
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Su pedido se ha enviado exitosamente!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
                var re = {
                   method: 'GET',
                   url: 'onesignal.php',
                   headers: {
                     'ID' : $scope.pedido_id
                     //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                   },
                   data: ''
                }
                $http(re).then(function(response){
                    console.log(response.data);
                }, function(){
                    console.log('ha ocurrido un error al enviar el push');
                });
                setTimeout(function() {
                  $scope.borrar();
                }, 400);
              }
              //$scope.pedidos= response.data.pedidos[0];
              //alert(response.data.id);
            }, function(){
              var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:4,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
              $scope.loadingwait = false;
              $scope.confirm_pedido2 = false;
              $scope.pedido_id= '';
              $scope.validadPedido='';
              $scope.contadorPedido='';
              var reqDel = {
                method: 'DELETE',
                url: '../api/public/api/pedido/'+$scope.pedido_id+'?token='+userService.getCurrentToken(),
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                }
              }

              $http(reqDel).then(function(response){
                var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:5,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta de nuevo!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }, function(){
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta mas tarde!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
            });
          }
        }  
      }, function(){
        var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:6,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
        $scope.loadingwait = false;
        $scope.confirm_pedido2 = false;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al enviar el pedido!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }); 
    }, 50);
  };

  $scope.Pago_ecommerce = function(ev) {
    $scope.loadingwait2 = true;
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      if (response.data != '') {
        $scope.loadingwait2 = false;
        CONFIG.DATE = response.data;
        var origen = $filter('date')(new Date($scope.diaPedido_origen),'yyyy-MM-dd');
        var current = $filter('date')(new Date(response.data),'yyyy-MM-dd');
        var puedeCotizar=0;
        var con=0;
      
        if (moment(origen).isSame(current, 'day')) {
          puedeCotizar=0;
        } else {
          $scope.actualizar_fecha(response.data);
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, verifique las fechas de origen y destino')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
        }

        if(angular.isObject($scope.origen.origen.geometry)){
          $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
          $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
          $scope.origen.origen=$scope.origen.origen.formatted_address;
        }
        
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if(angular.isObject($scope.pedidos[i].destino.geometry)){
            $scope.pedidos[i].lat=$scope.pedidos[i].destino.geometry.location.lat();
            $scope.pedidos[i].lng=$scope.pedidos[i].destino.geometry.location.lng();
            $scope.pedidos[i].destino=$scope.pedidos[i].destino.formatted_address; 
            if ($scope.pedidos[i].cobrarecommerce == null) {
              $scope.pedidos[i].cobrarecommerce = 0;
            }
            if (angular.isUndefined($scope.pedidos[i].cobrarecommerce)) {
              $scope.pedidos[i].cobrarecommerce = 0;
            }
            if ($scope.pedidos[i].descuento == null) {
              $scope.pedidos[i].descuento = 0;
            }
            if (angular.isUndefined($scope.pedidos[i].descuento)) {
              $scope.pedidos[i].cobrarecommerce = 0;
            }
          }
          console.log(isNaN(($scope.pedidos[i].km/1000).toFixed(2)));
          console.log($scope.pedidos[i]);
          if(isNaN(($scope.pedidos[i].km/1000).toFixed(2))){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un Error al calcular su dirección! Por favor, vuela a intentar o pruebe con otra dirección')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            puedeCotizar=1;
          }
        }

        if($scope.origen.origen==''||$scope.origen.nombreOrigen==''||$scope.origen.telefonoOrigen==''||$scope.origen.lat==''||$scope.origen.lng==''||$scope.origen.comentarios==''||$scope.origen.distrito_origen==''||$scope.origen.departamentoOrigen==''){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del origen')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
        }

        if($scope.pedidos.length>1){
          for (var i = 0; i < $scope.pedidos.length; i++) {
            console.log($scope.pedidos[i]);
            if($scope.pedidos[i].destino==''||$scope.pedidos[i].departamentoDestino==''||$scope.pedidos[i].nombreDestino==''||$scope.pedidos[i].telefonoDestino==''||$scope.pedidos[i].telefonoDestino==null||$scope.pedidos[i].lat==''||$scope.pedidos[i].lng==''||$scope.pedidos[i].distrito_destino==''||$scope.pedidos[i].comentarios==''||$scope.pedidos[i].subtotal==0){
              con=i+1;
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Por favor, complete los campos del Destino '+con)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
              puedeCotizar=1;
            }
            if($scope.pedidos[i].fecha_destino=='' || $scope.pedidos[i].fecha_destino== null){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Por favor, verifique la fecha de destino del pedido:'+con)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
              puedeCotizar=1;
            }
          }
        }


        if($scope.pedidos.length==1){
          console.log('entro donde no es');
           
          console.log($scope.pedidos[0]);
          if ($scope.pedidos[0].destino=='') {
            console.log('destino');
          }
          if ($scope.pedidos[0].departamentoDestino=='') {
            console.log('departamentoDestino');
          }
          if ($scope.pedidos[0].nombreDestino=='') {
            console.log('nombreDestino');
          }
          if ($scope.pedidos[0].telefonoDestino=='') {
            console.log('telefonoDestino');
          }
          if ($scope.pedidos[0].lat=='') {
            console.log('lat');
          }
          if ($scope.pedidos[0].lng=='') {
            console.log('lng');
          }
          if ($scope.pedidos[0].distrito_destino=='') {
            console.log('distrito_destino');
          }
          if ($scope.pedidos[0].comentarios=='') {
            console.log('comentarios');
          }
          if ($scope.pedidos[0].subtotal=='') {
            console.log('subtotal');
          }
          if($scope.pedidos[0].destino==''||$scope.pedidos[0].departamentoDestino==''||$scope.pedidos[0].nombreDestino==''||$scope.pedidos[0].telefonoDestino==''||$scope.pedidos[0].telefonoDestino==null||$scope.pedidos[0].lat==''||$scope.pedidos[0].lng==''||$scope.pedidos[0].distrito_destino==''||$scope.pedidos[0].comentarios==''||$scope.pedidos[0].subtotal==0){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('Por favor, complete los campos del Destino 1!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            puedeCotizar=1;
          }

          if($scope.pedidos[0].fecha_destino=='' || $scope.pedidos[0].fecha_destino== null){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('Por favor, verifique la fecha de destino del pedido')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            puedeCotizar=1;
          }
        }

        if($scope.sobre == 0 && $scope.cajaMediana == 0 && $scope.cajaGrande == 0){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, seleccione un medio de envío')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
        }
        
        if (puedeCotizar == 0) {
          $mdDialog.show({
            locals:{data: $scope.pedido}, 
            templateUrl: 'templates/confirmar_ecommerce.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose:true,                
            controller: Pagos_ecommerceCtrl
          })
        }
      } else {
        $scope.loadingwait2 = false;
      }
    }, function(){
        console.log('ERROR HORA');
        $scope.loadingwait2 = false;
    });
  };

  var Pagos_ecommerceCtrl = function ($scope,data,$timeout,$rootScope,$filter) { 

    $scope.forigen = $filter('date')(new Date($scope.diaPedido_origen),'dd-MM-yyyy');

    for (var i = 0; i < $scope.pedidos.length; i++) {
      $scope.pedidos[i].fdestino = $filter('date')(new Date($scope.pedidos[i].fecha_destino),'dd-MM-yyyy');
    }

    $scope.cancelar = function() {
      $mdDialog.cancel();
    };

    $scope.guardar = function() {
      $scope.cotizar_ecommerce();
      $scope.loadingwait = true;
      $scope.confirm_pedido = true;
    }
  }

  $scope.cotizar_ecommerce = function(){
    $scope.stado=0;

    if($scope.horaPedido==''){
      $scope.horaPedido='';
    }

    if($scope.horario_e==''){
      $scope.horario_e='';
    }


    if ($scope.horaPedido_origen=='') {
      $scope.horaPedido_origen='';
    }

    $scope.validadPedido=$scope.pedidos.length;
    $scope.contadorPedido=0;
    //$scope.contadorPedido2=0;
    $scope.pedido_id = [];
    //$scope.destino_id = [];
    $scope.invent = [];
    $scope.productos = [];
    $scope.pedidos_productos = [];
    $scope.enviarPedido = [];

    for (var i = 0; i < $scope.pedidos.length; i++) {
      
      $scope.enviarPedido.push({
        'tipo':'PROGRAMADO',
        'fecha':$filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
        'fecha_origen':$filter('date')(new Date($scope.diaPedido_origen),'yyyy-MM-dd HH:mm:ss'),
        'turno_origen': $scope.horario_origen,
        'hora_origen': $scope.horaPedido_origen,
        'hora':$scope.horaPedido,
        'horario': $scope.horario_e,
        'estado':$scope.stado,
        'nombre':CONFIG.NOMBRE,
        'forma_pago': $scope.pedidos[i].forma, 
        'costo': $scope.pedidos[i].costo,
        'costo_recojo': $scope.costo_recojo,
        'km':($scope.pedidos[i].km/1000).toFixed(2),
        'min': $scope.pedidos[i].min,
        'cajap':$scope.sobre,
        'cajam':$scope.cajaMediana,
        'cajag':$scope.cajaGrande,
        'cancelado': $scope.cancelado,
        'reprogramado': 0,
        'tipo_usuario': CONFIG.CLIENTE.tipo_usuario,
        'origen':$scope.origen.origen,
        'departamento_origen':$scope.origen.departamentoOrigen,
        'nombre_origen':$scope.origen.nombreOrigen,
        'telefono_origen':$scope.origen.telefonoOrigen,
        'distrito_origen':$scope.origen.distrito_origen,
        'zona_origen': $scope.origen.zona_origen,
        'comentarios':$scope.origen.comentarios,
        'lat':$scope.origen.lat,
        'lng':$scope.origen.lng,
        'destino':$scope.pedidos[i].destino,
        'departamento_destino':$scope.pedidos[i].departamentoDestino,
        'nombre_destino':$scope.pedidos[i].nombreDestino,
        'telefono_destino':$scope.pedidos[i].telefonoDestino,
        'distrito_destino':$scope.pedidos[i].distrito_destino,
        'zona_destino':$scope.pedidos[i].zona_destino,
        'comentarios2':$scope.pedidos[i].comentarios,
        'lat2':$scope.pedidos[i].lat,
        'lng2':$scope.pedidos[i].lng,
        'km':($scope.pedidos[i].km/1000).toFixed(2),
        'min': $scope.pedidos[i].min,
        'n_marcador':i+1,
        'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
        'descuento': $scope.pedidos[i].descuento,
        'costo': $scope.pedidos[i].costo,
        'cantidad': $scope.pedidos[i].cantidad,
        'detalle': $scope.pedidos[i].detalle,
        'subtotal': parseFloat($scope.pedidos[i].subtotal),
        'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
        'turno_destino': $scope.pedidos[i].turno_destino,
        'hora_destino': $scope.pedidos[i].hora_destino,
        'productos': $scope.pedidos[i].productos
      });     
    } 

    console.log($scope.enviarPedido);   
    console.log($scope.pedidos);

    console.log(JSON.stringify($scope.enviarPedido));

    var send={
      pedido: JSON.stringify($scope.enviarPedido)
    };

    var req = {
        method: 'POST',
        url: '../api/public/api/pedido2/store?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: send
      }

    $http(req).then(function(response){
      console.log(response);
              $scope.loadingwait = false;
              $scope.confirm_pedido = false;
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('¡Su pedido se ha enviado exitosamente!')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
                        if ($scope.user.almacen == 1) {
                          $scope.origen.lat = -12.0501823;
                          $scope.origen.lng = -76.97248680000001;
                          $scope.origen.origen = 'Almacenes Liebre Courier Express';
                          $scope.origen.nombreOrigen = 'Operador Liebre';
                          $scope.origen.departamentoOrigen = '-';
                          $scope.origen.telefonoOrigen = 3558888;
                          $scope.fecha_origen = new Date($scope.date);
                          $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
                          $scope.horaPedido2_origen= 2;
                          $scope.horaPedido3_origen= $scope.seleccionarHorae[2];
                          $scope.horaPedido_origen = '09-19';
                          $scope.horario_origen= '2';
                          $scope.origen.comentarios= '-';
                          $scope.origen.distrito_origen= 'Santa Anita';
                          $scope.origen.zona_origen = '2';
                          for (var i = 0; i < $scope.distritos.length; i++) {
                            if ($scope.distritos[i].nombre == $scope.origen.distrito_origen){
                              $scope.origen.distrito = $scope.distritos[i];
                            }
                          }
                        }
                        setTimeout(function() {
                            $scope.borrar();
                          }, 900); 
    }, function(error){
      console.log(error);
                var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:7,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!, IMPORTANTE: Antes de volver a realizar este pedido, verifica si se realizó en la pantalla de pedidos en curso y que este todo en orden.');
                }, function(){
                  
                });
    });
  };

  $scope.actualizar_fecha = function (date) {
    $scope.date = date;
    $scope.fecha_origen = new Date(date);
    $scope.ajusteFecha_origen(date);
    $scope.ajusteFecha(date);
  }

  /************************* FIN FUNCION COTIZAR **********************/ 

  /************************* FUNCION CREAR BORRADOR **********************/ 

  $scope.crearBorrador = function(){

    if(angular.isObject($scope.origen.origen.geometry)){
      $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
      $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
      $scope.origen.origen=$scope.origen.origen.formatted_address;
    }

    for (var i = 0; i < $scope.pedidos.length; i++) {
      if(angular.isObject($scope.pedidos[i].destino.geometry)){
        $scope.pedidos[i].lat=$scope.pedidos[i].destino.geometry.location.lat();
        $scope.pedidos[i].lng=$scope.pedidos[i].destino.geometry.location.lng();
        $scope.pedidos[i].destino=$scope.pedidos[i].destino.formatted_address; 
      }
    }

    $scope.loadingwait2 = true;
    $scope.confirm_pedido3 = true;

    if ($scope.user.tipo_usuario == 3) {
      $scope.tipoPedido = 'PROGRAMADO';
    }

    $scope.enviarPedido= {
      'tipo':$scope.tipoPedido,
      'fecha': $filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
      'fecha_origen':$filter('date')(new Date($scope.diaPedido_origen),'yyyy-MM-dd HH:mm:ss'),
      'hora':$scope.horaPedido,
      'turno_origen': $scope.horario_origen,
      'hora_origen': $scope.horaPedido_origen,
      'estado':$scope.stado,
      'nombre':CONFIG.NOMBRE,
      'forma_pago': $scope.formaPago, 
      'costo':$scope.costo,
      'costo_recojo': $scope.costo_recojo,
      'km':$scope.km,
      'min':$scope.duracion,
      'cajap':$scope.sobre,
      'cajam':$scope.cajaMediana,
      'cajag':$scope.cajaGrande,
      'horario': $scope.horario_e,
      'cancelado': $scope.cancelado,
      'reprogramado': 0,
      'tipo_usuario': CONFIG.CLIENTE.tipo_usuario
    };

    $scope.enviarDestino={
      'pedido_id': '',
      'origen': '',
      'departamento_origen': '',
      'nombre_origen': '',
      'telefono_origen': '',
      'comentarios': '',
      'lat': '',
      'lng': '',
      'destino': '',
      'departamento_destino':'',
      'nombre_destino': '',
      'telefono_destino': '',
      'comentarios2': '',
      'lat2': '',
      'lng2': '',
      'n_marcador':'',
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0),
      'cantidad': '',
      'detalle': '',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'forma': 0
    }

    setTimeout(function() {
      if($scope.horaPedido==''){
        $scope.horaPedido='';
      }

      if($scope.horario_e==''){
        $scope.horario_e='';
      }

      if ($scope.horario_origen=='') {
        $scope.horario_origen='';
      }

      if ($scope.horaPedido_origen=='') {
        $scope.horaPedido_origen= '';
      }

      var req = {
        method: 'POST',
        url: '../api/public/api/pedido/store?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.enviarPedido
      }

      $scope.destino_id = [];
      $scope.pedidos_productos = [];

      $http(req).then(function(response){console.log(response.data);
        $scope.pedido_id= response.data.id;
        $scope.validadPedido=$scope.pedidos.length;
        $scope.contadorPedido=0;
    
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if(i==0){
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.origen.origen,
                'departamento_origen':$scope.origen.departamentoOrigen,
                'nombre_origen':$scope.origen.nombreOrigen,
                'telefono_origen':$scope.origen.telefonoOrigen,
                'distrito_origen':$scope.origen.distrito_origen,
                'zona_origen': $scope.origen.zona_origen,
                'comentarios':$scope.origen.comentarios,
                'lat':$scope.origen.lat,
                'lng':$scope.origen.lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino,
                'forma_pago': $scope.pedidos[i].forma
            });
            console.log($scope.cotizacion);
            var req = {
               method: 'POST',
               url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
               headers: {
                 'Authorization' : 'Bearer ' + userService.getCurrentToken()
                 //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
               },
               data: $scope.cotizacion[i]
              }
              console.log($scope.cotizacion[i]);
              $http(req).then(function(response){
                console.log(response.data);
                $scope.destino_id.push({ data: response.data.id});
                $scope.contadorPedido=$scope.contadorPedido+1;

                if($scope.validadPedido==$scope.contadorPedido){
                  $scope.loadingwait2 = false;
                  $scope.confirm_pedido3 = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Su pedido se ha guardado exitosamente como borrador!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                  $scope.borrar();
                }
              }, function(){
                console.log('ha ocurrido un error al enviar el destino');
              });
          }else{
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.pedidos[i-1].destino,
                'departamento_origen':$scope.pedidos[i-1].departamentoDestino,
                'nombre_origen':$scope.pedidos[i-1].nombreDestino,
                'telefono_origen':$scope.pedidos[i-1].telefonoDestino,
                'distrito_origen':$scope.pedidos[i-1].distrito_destino,
                'zona_origen': $scope.pedidos[i-1].zona_destino,
                'comentarios':$scope.pedidos[i-1].comentarios,
                'lat':$scope.pedidos[i-1].lat,
                'lng':$scope.pedidos[i-1].lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino
            });
            console.log($scope.cotizacion);
            var req = {
               method: 'POST',
               url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
               headers: {
                 'Authorization' : 'Bearer ' + userService.getCurrentToken()
                 //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
               },
               data: $scope.cotizacion[i]
              }

              $http(req).then(function(response){
                console.log(response.data);
                $scope.destino_id.push({ data: response.data.id});
                $scope.contadorPedido=$scope.contadorPedido+1;
                if($scope.validadPedido==$scope.contadorPedido){
                  $scope.loadingwait2 = false;
                  $scope.confirm_pedido3 = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Su pedido se ha guardado exitosamente como borrador!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                  $scope.borrar();
                }
              }, function(){
                console.log('ha ocurrido un error al enviar el destino');
              });
          }
        }
      }, function(){
        var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:8,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
          console.log('ha ocurrido un error al enviar el pedido');
      }); 
    }, 50);
  };

  /************************* FIN FUNCION CREAR BORRADOR **********************/ 

   /************************* FUNCION PROGRAMAR PEDIDO **********************/ 
  $scope.tipoPedido='URGENTE';
  $scope.horaPedido='';
  $scope.horario_e='';
  $scope.diaPedido= $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
  $scope.showProgramar=false;
  $scope.myDate = new Date($scope.date);
  $scope.minDate = new Date($scope.date);
  $scope.selectHora=[{'hora':'09'},{'hora':'10'},{'hora':'11'},{'hora':'12'},{'hora':'13'},{'hora':'14'},{'hora':'15'},{'hora':'16'},{'hora':'17'},{'hora':'18'},{'hora':'19'}]; 
  $scope.seleccionarHorarioO = [{'id': 0, 'horario':'Nocturno'}];
  $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];

  $scope.fecha_origen = new Date($scope.date);
  $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
  $scope.horario_origen = '';
  $scope.horaPedido_origen = '';
  $scope.horaPedido3_origen = '';

  var tomorrow2 = new Date($scope.date);
  var n = tomorrow2.getDay();

  if (n != 6) {
    tomorrow2.setDate(tomorrow2.getDate() + 1);
  } else {
    tomorrow2.setDate(tomorrow2.getDate() + 2);
  }
  if (n == 5) {
    $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
  }

  $scope.minDate2 = tomorrow2;

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6;
  };

  $scope.programar=function(){
    if(!$scope.showProgramar){
      $scope.diaPedido= $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
      $scope.tipoPedido='PROGRAMADO';
      $scope.showProgramar=true;
      $scope.horaPedido='';
      $scope.horario_e='';
    }else{
      $scope.tipoPedido='URGENTE';
      $scope.showProgramar=false;
      $scope.horaPedido='';
      $scope.horaProgramada = '';
      $scope.horario_e='';
      $scope.diaPedido= $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
    }
  }

  $scope.borrador=function(){
    $scope.stado = 5;
    $scope.crearBorrador();
  }

  $scope.ajusteFecha=function(myDate){
    $scope.diaPedido = $filter('date')(new Date(myDate),'yyyy-MM-dd HH:mm:ss');
    SwitchFuction($scope.horaPedido);
  }

  $scope.ajusteFecha_origen=function(fecha_origen){
    $scope.diaPedido_origen = $filter('date')(new Date(fecha_origen),'yyyy-MM-dd HH:mm:ss');
    if ($scope.horaPedido3_origen != '') { 
      if ($scope.user.almacen == 1) {
        SwitchFuction1_origen($scope.horaPedido3_origen.value);
      }
      if ($scope.user.almacen == 0) {
        SwitchFuction1_origenO($scope.horaPedido3_origen.value); 
      }
    }

    var d = new Date(fecha_origen);
    var n = d.getDay();

    if (n != 6) {
      tomorrow2.setDate(new Date(fecha_origen).getDate() + 1);
    } else {
      tomorrow2.setDate(new Date(fecha_origen).getDate() + 2);
    }
    if (n == 5) {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
    }

    for (var i = 0; i < $scope.pedidos.length; i++) {
      $scope.pedidos[i].fecha_destino1 = new Date(tomorrow2);
      $scope.pedidos[i].fecha_destino = $filter('date')(new Date(tomorrow2),'yyyy-MM-dd HH:mm:ss');
      if ($scope.pedidos[i].horario_destino != '') {
        SwitchFuction1_destino($scope.seleccionarHorae[$scope.pedidos[i].horario_destino].value,$scope.pedidos[i]);
      }
    }    
  }

  $scope.ajusteFecha_destino=function(pedido){
    var d = new Date(pedido.fecha_destino1).getDay();
    console.log(pedido.fecha_destino1);
    if (d == 6) {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
    } else {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];
    }
    pedido.fecha_destino = $filter('date')(new Date(pedido.fecha_destino1),'yyyy-MM-dd HH:mm:ss');
    SwitchFuction1_destino($scope.seleccionarHorae[pedido.horario_destino].value,pedido);
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
  }

  $scope.ajusteHora2=function(data){
    $scope.horaPedido= data.hora;
    SwitchFuction1(data.value);
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

  var SwitchCosto_destino = function (sno,pedido) {
    console.log('SwitchCosto_destino');
    $scope.costoe = 0;

    if ($scope.user.almacen == 0 && $scope.user.tipo_usuario == 3) {
      $scope.costoe = parseFloat($scope.costos[0].costossinalmacen);
      $scope.costo_recojo = parseFloat($scope.costos[0].costossinalmacen);
    }

    if ($scope.user.tipo_usuario == 3) {
      console.log($scope.costos);
      switch (sno) {
        case 0:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_manana);
          break;
        case 1:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_tarde);
          break;
        case 2:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_completo);
          break;
        case 3:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_horas);
          break;
        default:
          pedido.costo = 0;
      }
    }

    for (var i = 0; i < $scope.pedidos.length; i++) {
      $scope.costoe += $scope.pedidos[i].costo;
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

  var SwitchFuction1_origen = function (sno) {
    if ($scope.user.tipo_usuario == 3) {
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
    if ($scope.user.tipo_usuario == 3) {
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

  /************************* FIN FUNCION MOSTRAR RUTAS **********************/ 

  $scope.borrar=function(){
    $scope.contador=1;
    var miUbicacion={};
    var misDestinos={};
    $scope.ruta=[{}];
    $scope.cotizacion=[];
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
    $scope.costo=0;
    $scope.stado=0;
    $scope.costoe=0;
    $scope.medio = 0;
     $scope.cancelado = 0;
    $scope.sobre=1;
    $scope.cajaMediana=0;
    $scope.cajaGrande=0;
    $scope.tipoPedido='URGENTE';
    $scope.horaPedido='';
    $scope.horaProgramada = '';
    $scope.horaPedido1='';
    $scope.horaPedido2='';
    $scope.horaPedido3='';
    $scope.horario_e='';
    $scope.horaPedido2_origen='';
    $scope.horaPedido3_origen='';
    $scope.horario_origen='';
    $scope.horaPedido_origen='';
    $scope.showProgramar=false;
    $scope.pedidos = [{   
      'id_pedido':1,
      'destino':'',
      'departamentoDestino':'',
      'nombreDestino':'',
      'telefonoDestino':'',
      'distrito_destino':'',
      'zona_destino':'',
      'distrito':'',
      'comentarios':'',
      'myDate2':'',
      'entrega':'',
      'km':'',
      'min':'',
      'selected':false,
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0), 
      'costo':1,
      'cantidad':'',
      'detalle':'',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'fecha_destino': tomorrow,
      'fecha_destino1': tomorrow,
      'turno_destino': '',
      'hora_destino': '',
      'productos': [],
      'forma': 0
    }];
    initMap();

    $scope.inventario = [];
    $scope.productos = [];
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      if (response.data != '') {
        $scope.loadingwait2 = false;
        CONFIG.DATE = response.data;
        $scope.date = CONFIG.DATE;
        $scope.myDate=new Date($scope.date);
        var val =new Date($scope.date);
        $scope.CurrentHora = new Date($scope.date);
        $scope.diaPedido = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
        $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
        $scope.fecha_origen = new Date($scope.date);

        $scope.origen= {
          origen:'',
          departamentoOrigen:'',
          nombreOrigen:'',
          telefonoOrigen:'',
          distrito_origen: '',
          zona_origen: '',
          lat:'',
          lng:'',
          myDate:new Date($scope.date),
          fecha_origen:new Date($scope.date),
          recojo:''
        }

        if ($scope.user.almacen == 1) {
          $scope.origen.lat = -12.0501823;
          $scope.origen.lng = -76.97248680000001;
          $scope.origen.origen = 'Almacenes Liebre Courier Express';
          $scope.origen.nombreOrigen = 'Operador Liebre';
          $scope.origen.departamentoOrigen = '-';
          $scope.origen.telefonoOrigen = 3558888;
          $scope.fecha_origen = new Date($scope.date);
          $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
          $scope.horaPedido2_origen= 2;
          $scope.horaPedido3_origen= $scope.seleccionarHorae[2];
          $scope.horaPedido_origen = '09-19';
          $scope.horario_origen= '2';
          $scope.origen.comentarios= '-';
          $scope.origen.distrito_origen= 'Santa Anita';
          $scope.origen.zona_origen = '2';
          for (var i = 0; i < $scope.distritos.length; i++) {
            if ($scope.distritos[i].nombre == $scope.origen.distrito_origen){
              $scope.origen.distrito = $scope.distritos[i];
            }
          }
        }
      } 
      var reqprd = {
        method: 'GET',
        url: '../api/public/api/producto?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqprd).then(function(response){
        if (response.data != '') {
          $scope.productos=response.data.productos;
        }
      }, function(){
          //alert('No se ha podido obtener favoritos');
      });
    }, function(){
        console.log('ERROR HORA');
        $scope.loadingwait2 = false;
    });
  };

  $scope.borrarPedido= function(pedido){
    var id = pedido.id_pedido;

    for (var m = 0; m < $scope.inventario.length; m++) {
      for (var i = 0; i < pedido.productos.length; i++) {
        for (var j = 0; j < pedido.productos[i].colores.length; j++) {
          for (var k = 0; k < pedido.productos[i].colores[j].atributos.length; k++) {
            if ($scope.inventario[m].id_atributo == pedido.productos[i].colores[j].atributos[k].id) {
              $scope.inventario[m].cantidad = $scope.inventario[m].cantidad + pedido.productos[i].colores[j].atributos[k].cant;
              bc = 1;
            };
          };
        };
      };
    };

    for (var i = 0; i<$scope.pedidos.length; i++) {
      if(id==$scope.pedidos[i].id_pedido){
         $scope.pedidos[i].selected=true;
         $scope.pedidos.splice(i,1);
         $scope.remove();
         $timeout(function() {$scope.consola();}, 200);
      };
    };

    if ($scope.user.tipo_usuario == 3) {
      $scope.costoe = 0

      if ($scope.user.almacen == 0) {
        $scope.costoe = parseFloat($scope.costos[0].costossinalmacen);
      }

      for (var i = 0; i < $scope.pedidos.length; i++) {
        $scope.costoe += $scope.pedidos[i].costo;
      };
    }
  };

  var favorito = {
    method: 'GET',
    url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
    headers: {
     'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(favorito).then(function(response){
    $scope.lista_favorito=response.data.favoritos;
  }, function(){
      console.log('No se ha podido obtener favoritos');
  });

  /****************** fin seccion de favoritos******************/
  $scope.fav = function(origin){

    var id = 0;
    var origen = origin.nombreOrigen;
    var departamento = origin.departamentoOrigen;
    var telefono = origin.telefonoOrigen;
    var comentarios = origin.comentarios;
    var distrito = origin.distrito_origen;
    
    $scope.favorito={
      'direccion': '',
      'lat': '',
      'lng': '',
      'departamento': departamento,
      'nombre': origen,
      'telefono': telefono, 
      'comentarios': comentarios,
      'distrito_origen': distrito
    }

    origin.star = !origin.star;
    
    if (origin.star) {
      if(id>0){
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
            }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
              $http(favorito).then(function(response){
                $scope.lista_favorito=response.data.favoritos;
              }, function(){
              });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        
        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          origin.star = false;
        }
      }else{
        if($scope.origen.origen.formatted_address){
          $scope.favorito.direccion=$scope.origen.origen.formatted_address;
          $scope.favorito.lat=$scope.origen.origen.geometry.location.lat();
          $scope.favorito.lng=$scope.origen.origen.geometry.location.lng();

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });

        }else if($scope.origen.origen){
          $scope.favorito.direccion=$scope.origen.origen;
          $scope.favorito.lat=$scope.origen.lat;
          $scope.favorito.lng=$scope.origen.lng;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          origin.star = false;
        }
      }    
    } else {
      var req = {
        method: 'DELETE',
        url: '../api/public/api/favorito/'+CONFIG.IDFAVORITO+'?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $http(favorito).then(function(response){
          $scope.lista_favorito=response.data.favoritos;
          console.log($scope.lista_favorito);
        }, function(){
        });
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al eliminar el favorito!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }      
  };

  $scope.fav1 = function(pedido){
    
    var id = pedido.id_pedido;
    var origen = pedido.nombreDestino;
    var departamento = pedido.departamentoDestino;
    var telefono = pedido.telefonoDestino;
    var comentarios = pedido.comentarios;
    var distrito = pedido.distrito_origen;

    $scope.favorito={
      'direccion': '',
      'lat': '',
      'lng': '',
      'departamento': departamento,
      'nombre': origen,
      'telefono': telefono, 
      'comentarios': comentarios,
      'distrito_origen': distrito
    }

    pedido.star = !pedido.star;
    
    if (pedido.star) {
      if(id>0){
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        
        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          pedido.star = false;
        }
      }else{
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });

        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          pedido.star = false;
        }
      }    
    } else {
      var req = {
       method: 'DELETE',
       url: '../api/public/api/favorito/'+CONFIG.IDFAVORITO+'?token='+userService.getCurrentToken(),
       headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
       }
      }

      $http(req).then(function(response){
        $http(favorito).then(function(response){
          $scope.lista_favorito=response.data.favoritos;
        }, function(){
        });
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al eliminar el favorito!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }      
  };

  //ORIGEN
  $scope.select_fav = function(item, id){
      console.log(item);
      console.log(id);
      if(id==0){
        CONFIG.IDFAVORITO = item.id;
        $scope.origen.star = true;
        $scope.origen.id_favorito = item.id;
        $scope.origen.origen = item.direccion;
        $scope.origen.departamentoOrigen = item.departamento;
        $scope.origen.nombreOrigen = item.nombre;
        $scope.origen.telefonoOrigen = item.telefono;
        $scope.origen.lat = parseFloat(item.lat);
        $scope.origen.lng = parseFloat(item.lng);
        $scope.origen.comentarios = item.comentarios;
        $scope.origen.myDate = new Date($scope.date);
        $scope.origen.fecha_origen = new Date($scope.date);
        $scope.origen.recojo = '';
        $scope.origen.distrito_origen=item.distrito_origen;

        for (var i = 0; i < $scope.distritos.length; i++) {
          if ($scope.distritos[i].nombre == $scope.origen.distrito_origen) {
            $scope.origen.distrito = $scope.distritos[i];
            $scope.origen.zona_origen = $scope.distritos[i].zona;
          }
        }
      }else{
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if($scope.pedidos[i].id_pedido==id){
            CONFIG.IDFAVORITO = item.id;
            $scope.pedidos[i].star = true;
            $scope.pedidos[i].id_favorito = item.id;
            $scope.pedidos[i].destino = item.direccion;
            $scope.pedidos[i].departamentoDestino = item.departamento;
            $scope.pedidos[i].nombreDestino = item.nombre;
            $scope.pedidos[i].telefonoDestino = item.telefono;
            $scope.pedidos[i].lat = parseFloat(item.lat);
            $scope.pedidos[i].lng = parseFloat(item.lng);
            $scope.pedidos[i].comentarios = item.comentarios;
            $scope.pedidos[i].myDate = new Date($scope.date);
            $scope.pedidos[i].recojo = '';
            $scope.pedidos[i].min = item.min;
            $scope.pedidos[i].distrito_destino=item.distrito_origen;

            for (var j = 0; j < $scope.distritos.length; j++) {
              if ($scope.distritos[j].nombre == $scope.pedidos[i].distrito_destino) {
                $scope.pedidos[i].distrito = $scope.distritos[j];
                $scope.pedidos[i].zona_destino = $scope.distritos[j].zona;
              }
            }
          }
        }    
      }
    
      setTimeout(function() {
        console.log($scope.origen);
        $scope.consola();
      }, 600);
  };

  setTimeout(function() {
      var requ = {
        method: 'GET',
        url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(requ).then(function(response){
        $scope.favoritos=response;
      }, function(){
          console.log('No se ha podido obtener favoritos');
      });
  }, 1000);
    
  /****************** fin seccion de favoritos******************/
  
  $scope.retorno = function(personalDetail){
    $scope.contador=$scope.contador+1;

    $scope.pedidos.push({ 
      'id_pedido':$scope.contador,
      'destino':$scope.origen.origen,
      'departamentoDestino':$scope.origen.departamentoOrigen,
      'nombreDestino':$scope.origen.nombreOrigen,
      'telefonoDestino':$scope.origen.telefonoOrigen,
      'distrito_destino':$scope.origen.distrito_origen,
      'zona_destino': $scope.origen.zona_origen,
      'distrito':$scope.origen.distrito,
      'comentarios':$scope.origen.comentarios,
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0),
      'min': '',
      'costo': 1,
      'cantidad': '',
      'detalle': '',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'fecha_destino': new Date($scope.date),
      'turno_destino': '',
      'hora_destino': '',
      'productos': [],
      'forma': 0,
      'lat':$scope.origen.lat,
      'lng':$scope.origen.lng
    });

    setTimeout(function() {
      $scope.consola();
    }, 250);
  };

  /************************* FUNCIONES AGREGAR Y REMOVER **********************/ 
  $scope.addNew = function(personalDetail){
    alert('Esta opción esta en mantenimiento.')
  };
 /*$scope.addNew = function(personalDetail){
    //if ($scope.contador+1<3) {
    $scope.contador=$scope.contador+1;
    $scope.pedidos.push({ 
        'id_pedido':$scope.contador,
        'destino':'',
        'departamentoDestino':'',
        'nombreDestino':'',
        'telefonoDestino':'',
        'distrito_destino':'',
        'zona_destino':'',
        'distrito':'',
        'comentarios':'',
        'km':'',
        'min': '',
        'cobrarecommerce': parseFloat(0),
        'descuento': parseFloat(0),
        'costo': '',
        'cantidad': '',
        'detalle': '',
        'subtotal': parseFloat(0),
        'total': parseFloat(0),
        'fecha_destino': tomorrow2,
        'fecha_destino1': tomorrow2,
        'turno_destino': '',
        'hora_destino': '',
        'horario_destino': 5,
        'hora_destino1': '',
        'productos': [],
        'forma': 0
    });
  //}else{
    //alert('Esta opción esta en mantenimiento, ¡pronto la habilitaremos!');
  //}
  };
   */ 
  $scope.remove = function(){
    var newDataList=[];
      $scope.selectedAll = false;
      angular.forEach($scope.pedidos, function(selected){
          if(!selected.selected){
              newDataList.push(selected);
          }
      }); 
    $scope.pedidos = newDataList;
  };
    
  $scope.checkAll = function () {
    if (!$scope.selectedAll) {
        $scope.selectedAll = true;
    } else {
        $scope.selectedAll = false;
    }
    angular.forEach($scope.pedidos, function(personalDetail) {
        personalDetail.selected = $scope.selectedAll;
    });
  }; 

  /************************* FIN FUNCIONES AGREGAR Y REMOVER **********************/   

  /************************* FUNCIONES CAJAS **********************/  

  $scope.change_medio = function () {
    console.log($scope.medio);
    if ($scope.medio == 0) {
      $scope.sobre = 1;
      $scope.cajaMediana = 0;
      $scope.cajaGrande = 0;
    } else if ($scope.medio == 1) {
      $scope.sobre = 0;
      $scope.cajaMediana = 1;
      $scope.cajaGrande = 0;
    } else if ($scope.medio == 2) {
      $scope.sobre = 0;
      $scope.cajaMediana = 0;
      $scope.cajaGrande = 1;
    }
  }

  /************************* FIN FUNCIONES CAJAS **********************/

  /************************* PRODUCTOS MODAL **********************/

  $scope.inventario = [];
  $scope.productos = [];

  setTimeout(function() {
    var reqprd = {
      method: 'GET',
      url: '../api/public/api/producto?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqprd).then(function(response){
      if (response.data != '') {
        $scope.productos=response.data.productos;
      }
    }, function(){
        //alert('No se ha podido obtener favoritos');
    });
  }, 1000);

  $scope.productos_modal = function(pedido,inventario) {
    showTabDialog(pedido,inventario);
  };

  var showTabDialog = function(pedido,inventario) {

    $scope.color_first = [];
    pedido.detalle = '';
    pedido.cantidad = parseInt(0);
    pedido.subtotal = parseFloat(0);
    pedido.total = parseFloat(0);

    $mdDialog.show({
      locals:{data: $scope.productos, data1: pedido,data3: inventario}, 
      templateUrl: 'templates/productos.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:false,                
      controller: mdDialogCtrl
    })
  };

  var mdDialogCtrl = function ($scope,$timeout,data,data1,data3,$rootScope,$filter) {

    var reqprd = {
      method: 'GET',
      url: '../api/public/api/producto?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $scope.isOpen = false;
    $scope.productos = [];
    $scope.productos_select = [];
    $scope.pedido = data1;
    console.log($scope.pedido);
    $scope.bandera = 0;
    $scope.bandera1 = 0;
    $scope.inventario = data3;

    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'
    };

    $scope.productos = data;
    $scope.color_first = [];
    $scope.talla_select = [];
    $scope.color_select = [];
    $scope.bp = 0;
    for (var i = 0; i < $scope.productos.length; i++) {
      $scope.color_first.push($scope.productos[i].colores[0]); 
      $scope.color_first[i].precio = parseFloat($scope.productos[i].colores[0].atributos[0].precio);
      $scope.color_first[i].cantidad_disp = parseInt($scope.productos[i].colores[0].atributos[0].cantidad);
      $scope.color_first[i].id_atributo = $scope.productos[i].colores[0].atributos[0].id;
      $scope.color_first[i].atributo = $scope.productos[i].colores[0].atributos[0].atributo;
      $scope.talla_select[i] = $scope.productos[i].colores[0].atributos[0].id;
      $scope.color_select[i] = $scope.productos[i].colores[0].id;
      $scope.color_first[i].nombre = $scope.productos[i].nombre;
      $scope.color_first[i].descripcion = $scope.productos[i].descripcion;
      $scope.color_first[i].cant = 0;
      $scope.color_first[i].subtotal = 0;

      for (var m = 0; m < $scope.color_first[i].atributos.length; m++) {
        $scope.color_first[i].atributos[m].cant = parseInt(0);
      }

      for (var j = 0; j < $scope.pedido.productos.length; j++) {
        if ($scope.color_first[i].producto_id == $scope.pedido.productos[j].producto_id) {
          for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
            if ($scope.color_first[i].id == $scope.pedido.productos[j].colores[k].id) {
              $scope.color_first[i] = $scope.pedido.productos[j].colores[k];
              $scope.color_select[i] = $scope.pedido.productos[j].colores[k].id;
              for (var l = 0; l < $scope.pedido.productos[j].colores[k].atributos.length; l++) {
                if ($scope.color_first[i].id_atributo == $scope.pedido.productos[j].colores[k].atributos[l].id) {
                  $scope.color_first[i].cantidad_disp = parseInt($scope.pedido.productos[j].colores[k].atributos[l].cantidad);
                  $scope.color_first[i].id_atributo = $scope.pedido.productos[j].colores[k].atributos[l].id;
                  $scope.color_first[i].atributo = $scope.pedido.productos[j].colores[k].atributos[l].atributo;
                  $scope.talla_select[i] = $scope.pedido.productos[j].colores[k].atributos[l].id;
                  $scope.color_first[i].cant = parseInt($scope.pedido.productos[j].colores[k].atributos[l].cant);
                  $scope.color_first[i].subtotal = parseFloat($scope.pedido.subtotal);
                };
              };
            };
          };
        };
      };

      for (var k = 0; k < $scope.inventario.length; k++) {
        if ( $scope.color_first[i].id_atributo == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };
    };

    for (var j = 0; j < $scope.pedido.productos.length; j++) {
      for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
        for (var l = 0; l < $scope.pedido.productos[j].colores[k].atributos.length; l++) {
          if ($scope.pedido.productos[j].colores[k].atributos[l].cant != 0) {
            $scope.productos_select.push({
              detalle: $scope.pedido.productos[j].colores[k].atributos[l].cant + ' ' + $scope.pedido.productos[j].colores[k].nombre + ' / Talla ' + $scope.pedido.productos[j].colores[k].atributos[l].atributo + ' / Color ' + $scope.pedido.productos[j].colores[k].nombrecolor,
              id_atributo: $scope.pedido.productos[j].colores[k].atributos[l].id,
              cantidad: parseInt($scope.pedido.productos[j].colores[k].atributos[l].cant),
              subtotal: parseFloat($scope.pedido.productos[j].colores[k].atributos[l].precio*$scope.pedido.productos[j].colores[k].atributos[l].cant),
              cantidad_disponible: parseInt($scope.pedido.productos[j].colores[k].atributos[l].cantidad)
            });
          };
        };
      };
    };

    $scope.select_color = function(color,i,producto) {
      $scope.color_first[i] = color;
      $scope.color_first[i].nombre = producto.nombre;
      $scope.color_first[i].descripcion = producto.descripcion;
      $scope.color_first[i].precio = parseFloat(color.atributos[0].precio);
      $scope.color_first[i].cantidad_disp = parseInt(color.atributos[0].cantidad);
      $scope.color_first[i].id_atributo = color.atributos[0].id;
      $scope.talla_select[i] = color.atributos[0].id;
      $scope.color_select[i] = color.id;
      $scope.color_first[i].cant = parseInt(color.atributos[0].cant);
      $scope.color_first[i].atributo = color.atributos[0].atributo;

      for (var k = 0; k < $scope.inventario.length; k++) {
        if ( $scope.color_first[i].id_atributo == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };

      for (var m = 0; m < color.atributos.length; m++) {
        color.atributos[m].cant = parseInt(color.atributos[m].cant);
      };
      
      for (var j = 0; j < $scope.pedido.productos.length; j++) {
        if ($scope.color_first[i].producto_id == $scope.pedido.productos[j].producto_id) {
          for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
            if ($scope.color_first[i].id == $scope.pedido.productos[j].colores[k].id) {
              $scope.color_first[i].atributos = $scope.pedido.productos[j].colores[k].atributos;
              $scope.color_first[i].cant = parseInt($scope.pedido.productos[j].colores[k].atributos[0].cant);
            };
          };
        };
      };
    };


    $scope.select_talla = function(talla,i) {
      $scope.talla_select[i] = talla.id;
      $scope.color_first[i].precio = parseFloat(talla.precio);
      $scope.color_first[i].atributo = talla.atributo;
      $scope.color_first[i].cantidad_disp = parseInt(talla.cantidad);
      $scope.color_first[i].id_atributo = talla.id;
      $scope.color_first[i].cant = parseInt(talla.cant);

      for (var k = 0; k < $scope.inventario.length; k++) {
        if (talla.id == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };
    };

    $scope.add_product = function(producto) {
      $scope.band = 0;

      if (producto.cantidad_disp > 0 && producto.cant >= 0 ) {
        $scope.bandera = true;

        for (var i = 0; i < producto.atributos.length; i++) {

          if(producto.atributos[i].id == producto.id_atributo){
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                producto.atributos[i].cantidad = $scope.inventario[j].cantidad;
              };
            };

            producto.atributos[i].cant += 1;
            producto.cant = parseInt(producto.atributos[i].cant);
            producto.atributos[i].cantidad = producto.atributos[i].cantidad - 1;
            producto.cantidad_disp = parseInt(producto.atributos[i].cantidad);

            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                $scope.inventario[j].cantidad = producto.cantidad_disp;
                $scope.band = 1;
              };
            };

            if ($scope.band == 0) {
              $scope.inventario.push({
                id_atributo: producto.id_atributo,
                cantidad: parseInt(producto.cantidad_disp)
              });
            };
          };
        };

        var b1 = 0;
        var b2 = 0;

        for (var i = 0; i < $scope.pedido.productos.length; i++) {
          if ($scope.pedido.productos[i].producto_id == producto.producto_id) {
            for (var j = 0; j < $scope.pedido.productos[i].colores.length; j++) {
              if ($scope.pedido.productos[i].colores[j].id == producto.id) {
                $scope.pedido.productos[i].colores[j] = producto;
                b1 = 1;
              };
            };
            if (b1 == 0) {
              $scope.pedido.productos[i].colores.push(producto);
              b1 = 0;
            }; 
            b2 = 1;
          };
        };

        if (b2 == 0) {
          $scope.pedido.productos.push({
            producto_id: producto.producto_id,
            colores: [producto]
          })
        };

        for (var i = 0; i < $scope.productos_select.length; i++) {
          if ($scope.productos_select[i].id_atributo == producto.id_atributo) {
            $scope.productos_select[i].detalle = producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor;
            $scope.productos_select[i].cantidad += 1;
            $scope.productos_select[i].subtotal = parseFloat($scope.productos_select[i].subtotal) + parseFloat(producto.precio);
            $scope.bandera = false;
          };
        };

        if ($scope.bandera) {
          $scope.productos_select.push({
            detalle: producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor,
            id_atributo: producto.id_atributo,
            cantidad: parseInt(producto.cant),
            subtotal: parseFloat(producto.precio),
            cantidad_disponible: parseInt(producto.cantidad_disp)
          });
        };
      };
    };

    $scope.remove_product = function(producto) {

      if (producto.cantidad_disp >= 0 && producto.cant > 0 ) {
        for (var i = 0; i < producto.atributos.length; i++) {

          if(producto.atributos[i].id == producto.id_atributo){
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                producto.atributos[i].cantidad = $scope.inventario[j].cantidad;
              };
            };

            producto.atributos[i].cant -= 1;
            producto.cant = parseInt(producto.atributos[i].cant);
            producto.atributos[i].cantidad +=1;
            producto.cantidad_disp = parseInt(producto.atributos[i].cantidad);
            
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                $scope.inventario[j].cantidad = producto.cantidad_disp;
              };
            };
          };
        };

        var br = 0;

        if (producto.cant == 0) {
          var index=$scope.productos_select.indexOf(producto);
          $scope.productos_select.splice(index,1);
          br = 1;
        };

        if (br == 0) {
          for (var i = 0; i < $scope.productos_select.length; i++) {
            if ($scope.productos_select[i].id_atributo == producto.id_atributo) {
              $scope.productos_select[i].detalle = producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor;
              $scope.productos_select[i].cantidad -= 1;
              $scope.productos_select[i].subtotal = parseFloat($scope.productos_select[i].subtotal) - parseFloat(producto.precio);
              $scope.productos_select[i].cantidad_disponible += 1;
            };
          };
        };
      };
    };

    $scope.cerrar_productos = function() {
      $mdDialog.cancel();      
    }

    $scope.cancelar = function() {
      var tam = $scope.productos_select.length;

      if ($scope.bandera1 == 0) {
        for (var i = 0; i < $scope.productos_select.length; i++) {          
          if (i == tam-1) {
            $scope.pedido.detalle += $scope.productos_select[i].detalle;
          } else{
            $scope.pedido.detalle += $scope.productos_select[i].detalle + ' - ';
          };
          $scope.pedido.cantidad += parseInt($scope.productos_select[i].cantidad);
          $scope.pedido.subtotal = (parseFloat($scope.pedido.subtotal) + parseFloat($scope.productos_select[i].subtotal)).toFixed(2);
          $scope.pedido.subtotal = parseFloat($scope.pedido.subtotal);
        }
        console.log($scope.pedido.cobrarecommerce);
        console.log($scope.pedido.descuento);
        $scope.pedido.total = parseFloat($scope.pedido.subtotal) + parseFloat($scope.pedido.cobrarecommerce) - parseFloat($scope.pedido.descuento);
        $scope.pedido.total = Number(($scope.pedido.total).toFixed(2));
        $scope.costo_envio($scope.pedido);
        
        $scope.bandera1 = 1;

        $http(reqprd).then(function(response){
          if (response.data != '') {
            $scope.productos=response.data.productos;
            $mdDialog.cancel();
          } else{
            $mdDialog.cancel();
          }
        }, function(){
          $mdDialog.cancel();
        });
      };
    };
  };

  $scope.costo_envio = function(pedido) { 
    if (pedido.cobrarecommerce == null && pedido.descuento != null) {
      pedido.total = parseFloat(pedido.subtotal) - parseFloat(pedido.descuento);
      pedido.total = Number((pedido.total).toFixed(2));
      console.log(pedido.total);
    } 
    if (pedido.descuento == null && pedido.cobrarecommerce != null) {
      pedido.total = parseFloat(pedido.subtotal) + parseFloat(pedido.cobrarecommerce);
      pedido.total = Number((pedido.total).toFixed(2));
      console.log(pedido.total);
    } 
    if (pedido.cobrarecommerce == null && pedido.descuento == null) {
      pedido.total = parseFloat(pedido.subtotal);
      pedido.total = Number((pedido.total).toFixed(2));
      console.log(pedido.total);
    } 
    if (pedido.cobrarecommerce != null && pedido.descuento != null) {
      pedido.total = parseFloat(pedido.subtotal) + parseFloat(pedido.cobrarecommerce) - parseFloat(pedido.descuento);
      pedido.total = Number((pedido.total).toFixed(2));
      console.log(pedido.total);
    }
  };


  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
    userService.logout();
    $location.path( "/login" );
  }
})

.controller('personaborradorCtrl', function($scope,$sce,$filter,$mdDialog,$location,$timeout,$filter,$cookieStore,Facebook,$http,CONFIG,userService,$rootScope,$location) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.usuario = CONFIG.NOMBRE;

  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.date = CONFIG.DATE;
  $scope.current = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
  $scope.loadingwait = false;
  $scope.confirm_pedido = false;
  $scope.confirm_pedido2 = false;
  $scope.disponible = false;
  var currentTime= moment($scope.current);
  var startTime = moment('00:00 am', "HH:mm a");
  var endTime = moment('07:00 pm', "HH:mm a");

  amIBetween = currentTime.isBetween(startTime , endTime);

  $scope.user = '';
  $scope.costos = [];
  $scope.costoe = 0;

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
        if (!amIBetween && $scope.user.almacen == 0) {
          $scope.disponible = true;
        }
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
    if (!amIBetween && $scope.user.almacen == 0) {
      $scope.disponible = true;
    }
  }

  if (CONFIG.COSTOS == '') {
    setTimeout(function() {
      var reqcosto = {
        method: 'GET',
        url: '../api/public/api/costo?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(reqcosto).then(function(response){
        console.log(response.data.costos);
          CONFIG.COSTOS = response.data.costos;
          $scope.costos = response.data.costos;
          console.log(response);
      }, function(){
          console.log('No se ha podido obtener las variables del sistema');
      });
    }, 800);
  } else {
    $scope.costos = CONFIG.COSTOS;
  }

  if (CONFIG.DISTRITOS == '') {
    var reqdistrito = {
      method: 'GET',
      url: '../api/public/api/distritos?token='+userService.getCurrentToken(),
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
      CONFIG.DISTRITOS = $scope.distritos; 
    }, function(){
        console.log('No se ha podido obtener los distritos');
    });
  } else {
    $scope.distritos = CONFIG.DISTRITOS;
  }

  /*-----------------------------------*/

  $scope.gPlace;

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
    var distance_min=6378137;
    var distance=0;
    var duration=$rootScope.ped.min;
    $scope.duracion=0;
    $scope.km=$rootScope.ped.km;
    $scope.ori='';
    $scope.dest='';
    $scope.costo=parseFloat($rootScope.ped.costo);
    $scope.sobre=$rootScope.ped.cajap;
    $scope.cajaMediana=$rootScope.ped.cajam;
    $scope.cajaGrande=$rootScope.ped.cajag;
    $scope.myDate=new Date($rootScope.ped.fecha);
    $scope.stado=0;
    $scope.formaPago = 0;
    $scope.costo_recojo = 0;
    $scope.cancelado = 0;
    $scope.showProgramar=false;
    $scope.diaPedido=$rootScope.ped.fecha;
    $scope.horaPedido2 = '';
    $scope.horaPedido3 = '';
    $scope.horaPedido = $rootScope.ped.hora;
    $scope.tipoPedido=$rootScope.ped.tipo;
    $scope.horario_e=$rootScope.ped.horario;
    $scope.selectHora=[{'hora':'09'},{'hora':'10'},{'hora':'11'},{'hora':'12'},{'hora':'13'},{'hora':'14'},{'hora':'15'},{'hora':'16'},{'hora':'17'},{'hora':'18'},{'hora':'19'}];
    $scope.seleccionarHorarioO = [{'id': 0, 'horario':'Nocturno'}];
    $scope.seleccionarHoraeO = [{'ids': 0, 'value':0, 'hora':'19-23'}];

    var tomorr =  new Date($scope.date);
    var m = tomorr.getDay();
    if (m != 6) {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    } else {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    }

    $scope.fecha_origen = new Date($scope.date);
    $scope.diaPedido_origen = new Date($scope.date);
    $scope.horaPedido2_origen='';
    $scope.horaPedido3_origen='';
    $scope.horaPedido_origen = $rootScope.ped.hora_origen;
    $scope.horario_origen=$rootScope.ped.turno_origen;

    if( $rootScope.ped.hora != '' && $scope.user.tipo_usuario != 3){
      $scope.showProgramar=true;
      for (var i = 0; i < $scope.selectHora.length; i++) {
        if ($scope.selectHora[i].hora == $rootScope.ped.hora){
          $scope.horaPedido1 = $scope.selectHora[i];
        }
      }
    }

    if( $rootScope.ped.horario != ''){
      $scope.showProgramar=true;
      for (var i = 0; i < $scope.seleccionarHorario.length; i++) {
        if ($scope.seleccionarHorario[i].id == $rootScope.ped.horario){
          $scope.horaPedido2 = $scope.seleccionarHorario[i].id;
        }
      }
    }

    if( $rootScope.ped.hora != '' && $scope.horaPedido2 != ''){
      $scope.showProgramar=true;
      for (var i = 0; i < $scope.seleccionarHoraeO.length; i++) {
        if ($scope.seleccionarHoraeO[i].hora == $rootScope.ped.hora){
          $scope.horaPedido3 = $scope.seleccionarHoraeO[i];
        }
      }
    }

    if( $rootScope.ped.turno_origen != ''){
      for (var i = 0; i < $scope.seleccionarHorario.length; i++) {
        if ($scope.seleccionarHorario[i].id == $rootScope.ped.turno_origen){
          $scope.horaPedido2_origen = $scope.seleccionarHorario[i].id;
        }
      }
    }

    if( $rootScope.ped.hora_origen != ''){
      for (var i = 0; i < $scope.seleccionarHoraeO.length; i++) {
        if ($scope.seleccionarHoraeO[i].hora == $rootScope.ped.hora_origen){
          $scope.horaPedido3_origen = $scope.seleccionarHoraeO[i];
        }
      }
    }

    if ($scope.sobre == 1) {
      $scope.medio = 0;
    } else if ($scope.cajaMediana == 1) {
      $scope.medio = 1;
    } else if ($scope.cajaGrande == 1) {
      $scope.medio = 2;
    }
      
    $scope.change_medio = function () {
      if ($scope.medio == 0) {
        $scope.sobre = 1;
        $scope.cajaMediana = 0;
        $scope.cajaGrande = 0;
      } else if ($scope.medio == 1) {
        $scope.sobre = 0;
        $scope.cajaMediana = 1;
        $scope.cajaGrande = 0;
      } else if ($scope.medio == 2) {
        $scope.sobre = 0;
        $scope.cajaMediana = 0;
        $scope.cajaGrande = 1;
      }
    }

  var favorito = {
    method: 'GET',
    url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
    headers: {
     'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(favorito).then(function(response){
    $scope.lista_favorito=response.data.favoritos;
    console.log($scope.lista_favorito);
  }, function(){
      console.log('No se ha podido obtener favoritos');
  });

  /****************** fin seccion de favoritos******************/
  $scope.fav = function(origin){

    var id = 0;
    var origen = origin.nombreOrigen;
    var departamento = origin.departamentoOrigen;
    var telefono = origin.telefonoOrigen;
    var comentarios = origin.comentarios;
    var distrito = origin.distrito_origen;
    
    $scope.favorito={
      'direccion': '',
      'lat': '',
      'lng': '',
      'departamento': departamento,
      'nombre': origen,
      'telefono': telefono, 
      'comentarios': comentarios,
      'distrito_origen': distrito
    }

    origin.star = !origin.star;
    
    if (origin.star) {
      if(id>0){
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
            }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
              $http(favorito).then(function(response){
                $scope.lista_favorito=response.data.favoritos;
                console.log($scope.lista_favorito);
              }, function(){
              });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        
        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          origin.star = false;
        }
      }else{
        if($scope.origen.origen.formatted_address){
          $scope.favorito.direccion=$scope.origen.origen.formatted_address;
          $scope.favorito.lat=$scope.origen.origen.geometry.location.lat();
          $scope.favorito.lng=$scope.origen.origen.geometry.location.lng();

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });

        }else if($scope.origen.origen){
          $scope.favorito.direccion=$scope.origen.origen;
          $scope.favorito.lat=$scope.origen.lat;
          $scope.favorito.lng=$scope.origen.lng;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          origin.star = false;
        }
      }    
    } else {
      var req = {
        method: 'DELETE',
        url: '../api/public/api/favorito/'+CONFIG.IDFAVORITO+'?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        $http(favorito).then(function(response){
          $scope.lista_favorito=response.data.favoritos;
          console.log($scope.lista_favorito);
        }, function(){
        });
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al eliminar el favorito!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }      
  };

  $scope.fav1 = function(pedido){
    
    var id = pedido.id_pedido;
    var origen = pedido.nombreDestino;
    var departamento = pedido.departamentoDestino;
    var telefono = pedido.telefonoDestino;
    var comentarios = pedido.comentarios;
    var distrito = pedido.distrito_origen;

    $scope.favorito={
      'direccion': '',
      'lat': '',
      'lng': '',
      'departamento': departamento,
      'nombre': origen,
      'telefono': telefono, 
      'comentarios': comentarios,
      'distrito_origen': distrito
    }

    pedido.star = !pedido.star;
    
    if (pedido.star) {
      if(id>0){
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        
        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          pedido.star = false;
        }
      }else{
        if($scope.pedidos[id-1].destino.formatted_address){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino.formatted_address;
          $scope.favorito.lat=$scope.pedidos[id-1].destino.geometry.location.lat();
          $scope.favorito.lng=$scope.pedidos[id-1].destino.geometry.location.lng();
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });

        }else if($scope.pedidos[id-1].destino){
          $scope.favorito.direccion=$scope.pedidos[id-1].destino;
          $scope.favorito.lat=$scope.pedidos[id-1].lat;
          $scope.favorito.lng=$scope.pedidos[id-1].lng;
          $scope.favorito.distrito_origen=$scope.pedidos[id-1].distrito_destino;

          var req = {
             method: 'POST',
             url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.favorito
          }

          $http(req).then(function(response){
            console.log(response);
            CONFIG.IDFAVORITO=response.data.id;
            $http(favorito).then(function(response){
              $scope.lista_favorito=response.data.favoritos;
              console.log($scope.lista_favorito);
            }, function(){
            });
          }, function(){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al agregar el favorito!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });
        }else{
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('¡La dirección no puede estar vacia!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          pedido.star = false;
        }
      }    
    } else {
      var req = {
       method: 'DELETE',
       url: '../api/public/api/favorito/'+CONFIG.IDFAVORITO+'?token='+userService.getCurrentToken(),
       headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
       }
      }

      $http(req).then(function(response){
        $http(favorito).then(function(response){
          $scope.lista_favorito=response.data.favoritos;
          console.log($scope.lista_favorito);
        }, function(){
        });
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al eliminar el favorito!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }      
  };

  //ORIGEN
  $scope.select_fav = function(item, id){
      console.log(item);
      console.log(id);
      if(id==0){
        CONFIG.IDFAVORITO = item.id;
        $scope.origen.star = true;
        $scope.origen.id_favorito = item.id;
        $scope.origen.origen = item.direccion;
        $scope.origen.departamentoOrigen = item.departamento;
        $scope.origen.nombreOrigen = item.nombre;
        $scope.origen.telefonoOrigen = item.telefono;
        $scope.origen.lat = parseFloat(item.lat);
        $scope.origen.lng = parseFloat(item.lng);
        $scope.origen.comentarios = item.comentarios;
        $scope.origen.myDate = new Date($scope.date);
        $scope.origen.fecha_origen = new Date($scope.date);
        $scope.origen.recojo = '';
        $scope.origen.distrito_origen=item.distrito_origen;

        for (var i = 0; i < $scope.distritos.length; i++) {
          if ($scope.distritos[i].nombre == $scope.origen.distrito_origen) {
            $scope.origen.distrito = $scope.distritos[i];
            $scope.origen.zona_origen = $scope.distritos[i].zona;
          }
        }
      }else{
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if($scope.pedidos[i].id_pedido==id){
            CONFIG.IDFAVORITO = item.id;
            $scope.pedidos[i].star = true;
            $scope.pedidos[i].id_favorito = item.id;
            $scope.pedidos[i].destino = item.direccion;
            $scope.pedidos[i].departamentoDestino = item.departamento;
            $scope.pedidos[i].nombreDestino = item.nombre;
            $scope.pedidos[i].telefonoDestino = item.telefono;
            $scope.pedidos[i].lat = parseFloat(item.lat);
            $scope.pedidos[i].lng = parseFloat(item.lng);
            $scope.pedidos[i].comentarios = item.comentarios;
            $scope.pedidos[i].myDate = new Date($scope.date);
            $scope.pedidos[i].recojo = '';
            $scope.pedidos[i].min = item.min;
            $scope.pedidos[i].distrito_destino=item.distrito_origen;

            for (var j = 0; j < $scope.distritos.length; j++) {
              if ($scope.distritos[j].nombre == $scope.pedidos[i].distrito_destino) {
                $scope.pedidos[i].distrito = $scope.distritos[j];
                $scope.pedidos[i].zona_destino = $scope.distritos[j].zona;
              }
            }
          }
        }    
    }
    
    setTimeout(function() {
      $scope.consola();
    }, 600);
    
  };

    setTimeout(function() {
      var requ = {
        method: 'GET',
        url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(requ).then(function(response){
        $scope.favoritos=response;
        console.log(response);
      }, function(){
          console.log('No se ha podido obtener favoritos');
      });
    }, 1000);
    
  /****************** fin seccion de favoritos******************/
  $scope.retorno = function(personalDetail){
    $scope.contador=$scope.contador+1;

    $scope.pedidos.push({ 
      'id_pedido':$scope.contador,
      'destino':$scope.origen.origen,
      'departamentoDestino':$scope.origen.departamentoOrigen,
      'nombreDestino':$scope.origen.nombreOrigen,
      'telefonoDestino':$scope.origen.telefonoOrigen,
      'distrito_destino':$scope.origen.distrito_origen,
      'zona_destino': $scope.origen.zona_origen,
      'distrito':$scope.origen.distrito,
      'comentarios':$scope.origen.comentarios,
      'fecha_destino': $scope.origen.fecha_origen,
      'turno_destino': $scope.origen.turno_origen,
      'hora_destino': $scope.origen.hora_origen,
      'lat':$scope.origen.lat,
      'lng':$scope.origen.lng
    });

    setTimeout(function() {
      $scope.consola();
    }, 250);
  };

  /************************* FIN Definición de las Variables **********************/

  /************************* Inicio de declaracion de horarios **********************/

    var circle = new google.maps.Circle({
            center: {lat:  -12.1056553, lng: -77.0369909},
            radius: 10*1000
    });

    $scope.autocompleteOptions = {
            bounds: circle.getBounds(),
            componentRestrictions: {country: 'pe'}
    };
    
    var lima={
        lat: -12.046374,
        lng: -77.042793
    };

    $scope.origen= {
      origen:$rootScope.ped.destinos[0].origen,
      departamentoOrigen:$rootScope.ped.destinos[0].departamento_origen,
      nombreOrigen:$rootScope.ped.destinos[0].nombre_origen,
      telefonoOrigen:Number($rootScope.ped.destinos[0].telefono_origen),
      distrito_origen:$rootScope.ped.destinos[0].distrito_origen,
      lat:parseFloat($rootScope.ped.destinos[0].lat),
      lng:parseFloat($rootScope.ped.destinos[0].lng),
      myDate:new Date($scope.date),
      fecha_origen:new Date($scope.date),
      recojo: parseFloat($rootScope.ped.costo_recojo),
      comentarios:$rootScope.ped.destinos[0].comentarios,
      zona_origen: $rootScope.ped.destinos[0].zona_origen
    };

    $timeout(function() {
      if( $rootScope.ped.destinos[0].distrito_origen != ''){
        for (var i = 0; i < $scope.distritos.length; i++) {
          if ($scope.distritos[i].nombre == $rootScope.ped.destinos[0].distrito_origen){
            $scope.origen.distrito = $scope.distritos[i];
          }
        }
      }
    }, 1500);

    $scope.pedidos=[];

    for (var i = 0; i < $rootScope.ped.destinos.length; i++) {
      $scope.contador=i+1;
      $scope.pedidos.push({ 
        'id_pedido':$scope.contador,
        'destino':$rootScope.ped.destinos[i].destino,
        'departamentoDestino':$rootScope.ped.destinos[i].departamento_destino,
        'nombreDestino':$rootScope.ped.destinos[i].nombre_destino,
        'telefonoDestino':Number($rootScope.ped.destinos[i].telefono_destino),
        'distrito_destino':$rootScope.ped.destinos[i].distrito_destino,
        'comentarios':$rootScope.ped.destinos[i].comentarios2,
        'lat':parseFloat($rootScope.ped.destinos[i].lat2),
        'lng':parseFloat($rootScope.ped.destinos[i].lng2),
        'cobrarecommerce':parseFloat($rootScope.ped.destinos[i].cobrarecommerce),
        'descuento':parseFloat($rootScope.ped.destinos[i].descuento),
        'min': parseFloat($rootScope.ped.destinos[i].min),
        'costo': parseFloat($rootScope.ped.destinos[i].costo),
        'cantidad': 0,
        'detalle': '',
        'subtotal': 0,
        'fecha_destino': new Date($rootScope.ped.destinos[i].fecha_destino),
        'turno_destino': $rootScope.ped.destinos[i].turno_destino,
        'hora_destino': $rootScope.ped.destinos[i].hora_destino,
        'productos': [],
        'forma': parseInt($rootScope.ped.forma_pago)
      });

      if( $scope.pedidos[i].fecha_destino != ''){
        $scope.pedidos[i].fecha_destino1 = new Date($rootScope.ped.destinos[i].fecha_destino);
      }

      var tomorr =  $scope.pedidos[i].fecha_destino1;
      var m = tomorr.getDay();
      if (m != 6) {
        $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
        $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];
      } else {
        $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
        $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
      }

      if( $scope.pedidos[i].turno_destino != ''){
        for (var j = 0; j < $scope.seleccionarHorario.length; j++) {
          if ($scope.seleccionarHorario[j].id == $scope.pedidos[i].turno_destino){
            $scope.pedidos[i].horario_destino = $scope.seleccionarHorario[j].id;
          }
        }
      }

      $scope.costoe = $scope.costoe + parseFloat($scope.pedidos[i].costo) + parseFloat($rootScope.ped.costo_recojo);
    
      if ($scope.user.almacen == 0) {
        $scope.pedidos[i].cantidad = Number($rootScope.ped.destinos[i].cantidad);
        $scope.pedidos[i].detalle = $rootScope.ped.destinos[i].detalle;
        $scope.pedidos[i].subtotal = Number($rootScope.ped.destinos[i].subtotal);
      }

      $scope.pedidos[i].total = parseFloat($scope.pedidos[i].subtotal) + parseFloat($scope.pedidos[i].cobrarecommerce) - parseFloat($scope.pedidos[i].descuento);
      $scope.pedidos[i].total = Number(($scope.pedidos[i].total).toFixed(2));
    }

    $timeout(function() {
      for (var i = 0; i < $scope.pedidos.length; i++) {
        for (var j = 0; j < $scope.distritos.length; j++) {
          if ($scope.distritos[j].nombre == $scope.pedidos[i].distrito_destino){
            $scope.pedidos[i].distrito = $scope.distritos[j];
            $scope.pedidos[i].zona_destino = $scope.distritos[j].zona;
          }
        }

        if( $scope.pedidos[i].hora_destino != ''){
          for (var j = 0; j < $scope.seleccionarHorae.length; j++) {
            if ($scope.seleccionarHorae[j].hora == $scope.pedidos[i].hora_destino){
              $scope.pedidos[i].hora_destino1 = $scope.seleccionarHorae[j];
            }
          }
        }
      }
    }, 1200);

    
  /************************* FUNCION INICIALIZACIÓN DEL MAPA **********************/    
    initMap= function(){
      $timeout(function() {
        var mapDiv=document.getElementById('map');
        
        var mapOptions={
          center: lima,
          zoom:14,
          //styles: styles
        }
        $scope.map= new google.maps.Map(mapDiv,mapOptions);
      }, 300);
    } 
    
    initMap1= function(){
      $timeout(function() {
        var mapDiv=document.getElementById('map');
        
        var mapOptions={
          center: lima,
          zoom:14,
          styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
          //styles: styles
        }

        $scope.map= new google.maps.Map(mapDiv,mapOptions);
      }, 300);
    }

  /*if (!amIBetween) {
    initMap1();
  } else{
    initMap();
  }*/
  
  initMap();

  /************************* FIN FUNCION INICIALIZACIÓN DEL MAPA **********************/   

  /************************* FUNCION GEOLOCALIACIÓN **********************/ 

    $scope.locateMe=function(){
      navigator.geolocation.getCurrentPosition(function(pos){
        miUbicacion.lat= pos.coords.latitude;
        miUbicacion.lng= pos.coords.longitude;
        $scope.origen.lat=miUbicacion.lat;
        $scope.origen.lng=miUbicacion.lng;
        $scope.map.setCenter(miUbicacion);
        geocoder.geocode({'location': $scope.origen}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                //console.log(results[0].formatted_address);
                $scope.origen.departamentoOrigen=results[0].formatted_address;
                
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        addMarker(miUbicacion,0);
      },function(error){
        console.log('ha ocurrido un error');
      })
    }

  /************************* FIN FUNCION GEOLOCALIZACIÓN **********************/  

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

    google.maps.event.addListener( marker, "dragend", function(event){
      var drag={
        lat:'',
        lng:''
      }

      console.log(marker.icon);
      if(marker.icon=="images/0.png"){
        //alert('soy cero');
        //console.log(marker);
        drag.lat=marker.getPosition().lat();
        
         drag.lng=marker.getPosition().lng();
        //console.log(drag);

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              console.log(results);
              $scope.origen.origen=results[0].formatted_address;
              $scope.origen.lat=drag.lat;
              $scope.origen.lng=drag.lng;
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
        //alert('entre en 15 '+ marker.icon.length);
        var val=marker.icon;
        var subVal=val.substring(7,8);

        drag.lat=marker.getPosition().lat();
        drag.lng=marker.getPosition().lng();
        //console.log(drag);

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              //console.log(results);
              //console.log(results[0].formatted_address);
              $scope.pedidos[subVal-1].destino=results[0].formatted_address; 
              $scope.pedidos[subVal-1].lat=drag.lat;
              $scope.pedidos[subVal-1].lng=drag.lng;
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
        //console.log(marker);
        drag.lat=marker.getPosition().lat();  
        drag.lng=marker.getPosition().lng();
        //console.log(drag);

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              //console.log(results);
              //console.log(results[0].formatted_address);
              $scope.pedidos[subVal-1].destino=results[0].formatted_address;      
              $scope.pedidos[subVal-1].lat=drag.lat;
              $scope.pedidos[subVal-1].lng=drag.lng;
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
                departureTime: new Date(),
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
              for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                duration=duration+response.routes[0].legs[i].duration.value;
              }
              for (var i = 0 ; i < $scope.pedidos.length ; i++) {
                $scope.pedidos[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
              }              
            }
          })
        }, 600);
    }

  /************************* FIN FUNCION TRAZADO DE RUTAS **********************/  

  /************************* FUNCIONES INTERCAMBIAR POSICIÓN **********************/   
    $scope.nextId=function(id){
      var Nid='';
      for ( i=0; i < $scope.pedidos.length; i++) {  
        if($scope.pedidos[i].id_pedido==id){
          Nid=$scope.pedidos[i+1].id_pedido;
        }
      }
      return Nid;
    };

    $scope.subir = function(id){
      //alert(id);
      //alert('nextId: ' + $scope.nextId(id));
      var Nid=$scope.nextId(id);
      //console.log(id);
      var subir='';
      var bajar='';

      var length = $scope.pedidos.length;
          for ( i=0; i < length; i++) {  
              if($scope.pedidos[i].id_pedido==Nid){
                  subir=i;
              }
          };

          for ( j=0; j < length; j++) {  

              if($scope.pedidos[j].id_pedido==id){
                  bajar=j;
              }
          };
      $timeout(function() {
          $scope.pedidos[subir].id_pedido=id;
          $scope.pedidos[bajar].id_pedido=id+1;}
      , 100);
      
      $timeout(function() {$scope.consola();}, 300);
    };

    $scope.bajar = function(id){
      var Nid=$scope.nextId(id);
      //console.log(id);
      var subir='';
      var bajar='';

      var length = $scope.pedidos.length;
          for ( i=0; i < length; i++) {  
              if($scope.pedidos[i].id_pedido==id){
                subir=i;
              }
          };

          for ( j=0; j < length; j++) {  
              if($scope.pedidos[j].id_pedido==Nid){
                bajar=j;
              }
          };
      $timeout(function() {
          $scope.pedidos[subir].id_pedido=id+1;
          $scope.pedidos[bajar].id_pedido=id;}
      , 100);
      
      $timeout(function() {$scope.consola();}, 300);
    };
    
  /************************* FIN FUNCIONES INTERCAMBIAR POSICIÓN **********************/ 
    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setMapOnAll(null);
    }

    $scope.$watch(
      function($scope) { 
          return $scope.origen.origen 
      }, function() {
          if(angular.isObject($scope.origen.origen)){
            setTimeout(function() {
              $scope.ruta=[{}];
              $scope.consola();}, 2500);
          }
    });

    $scope.$watchCollection(
      function($scope) { 
          return $scope.pedidos.destino
      }, function() {
          setTimeout(function() {
              $scope.ruta=[{}];
              $scope.consola();}, 1500);
      });

    $scope.change=function(id){
      for (var i = 0; i<$scope.pedidos.length; i++) {
        if(id==$scope.pedidos[i].id_pedido){
          if(angular.isObject($scope.pedidos[i].destino)){
           setTimeout(function() {
            $scope.ruta=[{}];
            $scope.consola();}, 1500);
          } 
        }
      }     
    };

  /************************* FUNCION MOSTRAR RUTAS **********************/ 
  
    $scope.consola = function(){
        duration=0;

        $scope.pedidos.sort(function(a, b){
            return a.id_pedido - b.id_pedido;
        });

        if(angular.isObject($scope.origen.origen.geometry)){
          $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
          $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
          $scope.ruta.push({
            'lat':$scope.origen.origen.geometry.location.lat(),
            'lng':$scope.origen.origen.geometry.location.lng()
          });  
        }else{
          $scope.ruta.push({
            'lat':parseFloat($scope.origen.lat),
            'lng':parseFloat($scope.origen.lng)
          });
        }
        
        if($scope.pedidos[0].destino==''){
            clearMarkers();
            $timeout(function() {for (var i = 1; i < $scope.ruta.length+1; i++) {
                $scope.map.setCenter($scope.ruta[i]);
                addMarker($scope.ruta[i],0);
            }}, 200);
                
            $timeout(function() {$scope.ruta=[{}]; /*console.log('borro rutas');*/}, 1400);    
        }else{
          if(angular.isObject($scope.pedidos[0].destino.geometry)){
              marcador.lat=$scope.pedidos[0].destino.geometry.location.lat();
              marcador.lng=$scope.pedidos[0].destino.geometry.location.lng();
              //console.log(marcador);
              $scope.ruta.push({
                          'lat':marcador.lat,
                          'lng':marcador.lng
              });
          }else{
              marcador.lat=$scope.pedidos[0].lat;
              marcador.lng=$scope.pedidos[0].lng;
              //console.log(marcador);
              $scope.ruta.push({
                          'lat':marcador.lat,
                          'lng':marcador.lng
              });
          }
                    
          for (var i = 1; i < $scope.pedidos.length; i++) {
            if(angular.isObject($scope.pedidos[i].destino.geometry)){
                marcador.lat=$scope.pedidos[i].destino.geometry.location.lat();
                marcador.lng=$scope.pedidos[i].destino.geometry.location.lng();
                //console.log(marcador);
                $scope.ruta.push({
                            'lat':marcador.lat,
                            'lng':marcador.lng
                });
            }else{
                marcador.lat=$scope.pedidos[i].lat;
                marcador.lng=$scope.pedidos[i].lng;
                //console.log(marcador);
                $scope.ruta.push({
                            'lat':marcador.lat,
                            'lng':marcador.lng
                });
            }
          }
                    
          var tam='';
          // $scope.km = google.maps.geometry.spherical.computeDistanceBetween(_kCord, _pCord);
          $timeout(function() {
            $scope.km =0;
            $scope.costo = 0;
            var tam=$scope.ruta.length;
              
            for (var i = 1; i < $scope.ruta.length; i++) {
              $scope.ori= new google.maps.LatLng($scope.ruta[i]);
              $scope.dest= new google.maps.LatLng($scope.ruta[i+1]);

              if (i < tam-1 && $scope.user.tipo_usuario != 3) {
                $scope.pedidos[i-1].costo = ((google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest)*parseFloat($scope.costos[0].costokm))/1000).toFixed(2);
              }

              /*if (isNaN(google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest))) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('!Ha ocurrido un Error al calcular su dirección¡ Por favor, vuela a intentar o pruebe con otra dirección')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }*/

              if(i<tam-1){
                $scope.km = $scope.km + google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest);
                $scope.pedidos[i-1].km=google.maps.geometry.spherical.computeDistanceBetween($scope.ori, $scope.dest);
              }
            }
          }, 200);

          $timeout(function() {
              $scope.duracion = parseInt( duration / 60);
          }, 1600);

          $timeout(function() {
            if ($scope.user.tipo_usuario != 3) {
              $scope.costo = $scope.km*parseFloat($scope.costos[0].costokm);
            }
          }, 1500);

          $timeout(function() {
              $scope.km= ((parseInt( $scope.km / 100 ) ) / 10).toFixed(2);
          }, 300);

          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          //console.log($scope.ruta);
          $timeout(function() {
            traceRoute($scope.ruta);
            for (var i = 1; i < $scope.ruta.length+1; i++) {
              
            //  console.log($scope.ruta[i]);
              addMarker($scope.ruta[i],i-1);
            //distance = google.maps.geometry.spherical.computeDistanceBetween($scope.ruta[i+1], $scope.ruta[i]);
          }}, 200);
          //$timeout(function() {traceRoute();}, 200);
          $timeout(function() {$scope.ruta=[{}]; /*console.log('borro rutas');*/}, 1400);
        }
    };

    $scope.consola2=function(id){
      
      var miUbicacion= {
        lat:'',
        lng:''
      }
      
      if (id==0) {
        geocoder.geocode({'address': $scope.origen.origen + 'lima Perú'}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            $scope.origen.lat=results[0].geometry.location.lat();
            $scope.origen.lng=results[0].geometry.location.lng();
            miUbicacion.lat= results[0].geometry.location.lat();
            miUbicacion.lng= results[0].geometry.location.lng();
            
            $scope.map.setCenter(miUbicacion);  
            addMarker(miUbicacion,0);

            setTimeout(function() {
               miUbicacion.lat= 0;
               miUbicacion.lng= 0;
            }, 100);
        } else {
            //alert('Geocode address was not successful for the following reason: ' + status);
            //alert('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.');
            /*$mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            $scope.origen.origen='';*/
          }
        });

      } else {
        var pos='';
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if ($scope.pedidos[i].id_pedido==id){
            pos=i;
          }
        }
        console.log($scope.pedidos);
        geocoder.geocode({'address': $scope.pedidos[pos].destino + 'lima Perú'}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {

              for (var i = 0; i < $scope.pedidos.length; i++) {
                if($scope.pedidos[i].id_pedido==id){

                  $scope.pedidos[i].lat=results[0].geometry.location.lat();
                  $scope.pedidos[i].lng=results[0].geometry.location.lng();
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
            /*$mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
            $scope.pedidos[pos].destino='';*/
        }
      });
    } 
  };

  /************************* FUNCION COTIZAR **********************/ 
  $scope.cotizacion=[];

  $scope.enviarPedido= {
    'tipo':'URGENTE',
    'fecha': $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss'),
    'hora':'',
    'horario': '',
    'estado':$scope.stado,
    'nombre':CONFIG.NOMBRE,
    'forma_pago': $scope.formaPago, 
    'costo':1,
    'costo_recojo': '',
    'km':'',
    'min':'',
    'cajap':'',
    'cajam':'',
    'cajag':'',
    'cancelado': $scope.cancelado,
    'reprogramado': 0,
    'tipo_usuario': CONFIG.CLIENTE.tipo_usuario
  };

  $scope.Pago_persona = function(ev) {
    var puedeCotizar=0;
    var con=0;

    if($scope.origen.origen==''||$scope.origen.nombreOrigen==''||$scope.origen.telefonoOrigen==''||$scope.origen.lat==''||$scope.origen.lng==''||$scope.origen.distrito_origen==''||$scope.origen.comentarios==''){

      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, complete los campos del origen.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }

    if($scope.pedidos.length>1){
      for (var i = 0; i < $scope.pedidos.length; i++) {
         if($scope.pedidos[i].destino==''||$scope.pedidos[i].nombreDestino==''||$scope.pedidos[i].telefonoDestino==''||$scope.pedidos[i].lat==''||$scope.pedidos[i].lng==''||$scope.pedidos[i].distrito_destino==''||$scope.pedidos[i].comentarios==''){
          con=i+1;
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del destino: '+con)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
         }
      }
    }

    if($scope.pedidos.length==1){
      if($scope.pedidos[0].destino==''||$scope.pedidos[0].nombreDestino==''||$scope.pedidos[0].telefonoDestino==''||$scope.pedidos[0].lat==''||$scope.pedidos[0].lng==''||$scope.pedidos[0].distrito_destino==''||$scope.pedidos[0].comentarios==''){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del destino: '+1)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
         }
    }

    if($scope.sobre == 0 && $scope.cajaMediana == 0 && $scope.cajaGrande == 0){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, seleccione un medio de envío.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }

    if (puedeCotizar == 0) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/pagos.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: Pagos_personaCtrl
      })
    }
  };

  var Pagos_personaCtrl = function ($scope,data,$timeout,$rootScope) { 

    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    }; 

    $scope.cancelar = function() {
      $mdDialog.cancel();
    };

    $scope.guardar = function(tipo) {
      $scope.formaPago = tipo;
      $scope.loadingwait = true;
      $scope.confirm_pedido2 = true;
      $scope.cotizar();
    }

    $scope.api_pago = function(tipo) {
      $scope.formaPago = tipo;
      //$scope.cotizar();
    }
  }

  $scope.cotizar = function(){

    if(angular.isObject($scope.origen.origen.geometry)){
       $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
       $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
       $scope.origen.origen=$scope.origen.origen.formatted_address;
    }
    
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if(angular.isObject($scope.pedidos[i].destino.geometry)){
        $scope.pedidos[i].lat=$scope.pedidos[i].destino.geometry.location.lat();
        $scope.pedidos[i].lng=$scope.pedidos[i].destino.geometry.location.lng();
        $scope.pedidos[i].destino=$scope.pedidos[i].destino.formatted_address; 
      }
    }
  
    $scope.enviarPedido= {
      'tipo':$scope.tipoPedido,
      'fecha':$filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
      'hora':$scope.horaPedido,
      'horario':$scope.horario_e,
      'estado':$scope.stado,
      'nombre':CONFIG.NOMBRE,
      'forma_pago': $scope.formaPago, 
      'costo':$scope.costo,
      'costo_recojo': $scope.origen.recojo,
      'km':$scope.km,
      'min':$scope.duracion,
      'cajap':$scope.sobre,
      'cajam':$scope.cajaMediana,
      'cajag':$scope.cajaGrande,
      'cancelado': $scope.cancelado,
      'reprogramado': 0,
      'tipo_usuario': CONFIG.CLIENTE.tipo_usuario
    };

    $scope.enviarDestino={
      'pedido_id': '',
      'origen': '',
      'departamento_origen': '',
      'nombre_origen': '',
      'telefono_origen': '',
      'comentarios': '',
      'lat': '',
      'lng': '',
      'destino': '',
      'departamento_destino':'',
      'nombre_destino': '',
      'telefono_destino': '',
      'comentarios2': '',
      'lat2': '',
      'lng2': '',
      'n_marcador':'',
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0),
      'cantidad': '',
      'detalle': '',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'forma': 0
    }

    setTimeout(function() {
      if($scope.horaPedido==''){
        $scope.horaPedido='';
      }

      if($scope.horario_e==''){
        $scope.horario_e='';
      }

      var req = {
        method: 'POST',
        url: '../api/public/api/pedido/store?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.enviarPedido
      }

      $http(req).then(function(response){console.log(response.data);
        $scope.pedido_id= response.data.id;
        $scope.validadPedido=$scope.pedidos.length;
        $scope.contadorPedido=0;
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if(i==0){
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.origen.origen,
                'departamento_origen':$scope.origen.departamentoOrigen,
                'nombre_origen':$scope.origen.nombreOrigen,
                'telefono_origen':$scope.origen.telefonoOrigen,
                'distrito_origen': $scope.origen.distrito_origen,
                'zona_origen': $scope.origen.zona_origen,
                'comentarios':$scope.origen.comentarios,
                'lat':$scope.origen.lat,
                'lng':$scope.origen.lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino
            });
            console.log($scope.cotizacion);
            var req = {
               method: 'POST',
               url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
               headers: {
                 'Authorization' : 'Bearer ' + userService.getCurrentToken()
                 //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
               },
               data: $scope.cotizacion[i]
              }
              console.log($scope.cotizacion[i]);
              $http(req).then(function(response){
                console.log(response.data);
                $scope.contadorPedido=$scope.contadorPedido+1;
                if($scope.validadPedido==$scope.contadorPedido){
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Su pedido se ha enviado exitosamente!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                   var re = {
                     method: 'GET',
                     url: 'onesignal.php',
                     headers: {
                       'ID' : $scope.pedido_id
                       //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                     },
                     data: ''
                  }
                  $http(re).then(function(response){
                      console.log(response.data);
                  }, function(){
                      console.log('ha ocurrido un error al enviar el push');
                  });
                  setTimeout(function() {
                    $scope.borrar();
                  }, 400);
                }
              }, function(){
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                var reqDel = {
                  method: 'DELETE',
                  url: '../api/public/api/pedido/'+$scope.pedido_id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(reqDel).then(function(response){
                  var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.cotizacion[i]),
                      pos:9,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $scope.pedido_id= '';
                  $scope.borrar();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta de nuevo!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                }, function(){
                  $scope.loadingwait = false;
                  $scope.confirm_pedido2 = false;
                  $scope.pedido_id= '';
                  $scope.borrar();
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta mas tarde!')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              });
          }else{
            $scope.cotizacion.push({ 
                'pedido_id':$scope.pedido_id,
                'origen':$scope.pedidos[i-1].destino,
                'departamento_origen':$scope.pedidos[i-1].departamentoDestino,
                'nombre_origen':$scope.pedidos[i-1].nombreDestino,
                'telefono_origen':$scope.pedidos[i-1].telefonoDestino,
                'distrito_origen':$scope.pedidos[i-1].distrito_destino,
                'zona_origen': $scope.pedidos[i-1].zona_destino,
                'comentarios':$scope.pedidos[i-1].comentarios,
                'lat':$scope.pedidos[i-1].lat,
                'lng':$scope.pedidos[i-1].lng,
                'destino':$scope.pedidos[i].destino,
                'departamento_destino':$scope.pedidos[i].departamentoDestino,
                'nombre_destino':$scope.pedidos[i].nombreDestino,
                'telefono_destino':$scope.pedidos[i].telefonoDestino,
                'distrito_destino':$scope.pedidos[i].distrito_destino,
                'zona_destino':$scope.pedidos[i].zona_destino,
                'comentarios2':$scope.pedidos[i].comentarios,
                'lat2':$scope.pedidos[i].lat,
                'lng2':$scope.pedidos[i].lng,
                'km':($scope.pedidos[i].km/1000).toFixed(2),
                'min': $scope.pedidos[i].min,
                'n_marcador':i+1,
                'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
                'descuento': $scope.pedidos[i].descuento,
                'costo': $scope.pedidos[i].costo,
                'cantidad': $scope.pedidos[i].cantidad,
                'detalle': $scope.pedidos[i].detalle,
                'subtotal': parseFloat($scope.pedidos[i].subtotal),
                'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
                'turno_destino': $scope.pedidos[i].turno_destino,
                'hora_destino': $scope.pedidos[i].hora_destino
            });
            console.log($scope.cotizacion);
            var req = {
             method: 'POST',
             url: '../api/public/api/destino/store?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
               //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
             },
             data: $scope.cotizacion[i]
            }

            $http(req).then(function(response){
              console.log(response.data);
              $scope.contadorPedido=$scope.contadorPedido+1;
              if($scope.validadPedido==$scope.contadorPedido){
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Su pedido se ha enviado exitosamente!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
                var re = {
                   method: 'GET',
                   url: 'onesignal.php',
                   headers: {
                     'ID' : $scope.pedido_id
                     //"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                   },
                   data: ''
                }
                $http(re).then(function(response){
                    console.log(response.data);
                }, function(){
                    console.log('ha ocurrido un error al enviar el push');
                });
                setTimeout(function() {
                  $scope.borrar();
                }, 400);
              }
              //$scope.pedidos= response.data.pedidos[0];
              //alert(response.data.id);
            }, function(){
              $scope.loadingwait = false;
              $scope.confirm_pedido2 = false;
              $scope.pedido_id= '';
              $scope.validadPedido='';
              $scope.contadorPedido='';
              var reqDel = {
                method: 'DELETE',
                url: '../api/public/api/pedido/'+$scope.pedido_id+'?token='+userService.getCurrentToken(),
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                }
              }

              $http(reqDel).then(function(response){
                var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.cotizacion[i]),
                      pos:10,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta de nuevo!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }, function(){
                $scope.loadingwait = false;
                $scope.confirm_pedido2 = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta mas tarde!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
            });
          }
        }  
      }, function(){
        var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:11,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
        $scope.loadingwait = false;
        $scope.confirm_pedido2 = false;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al enviar el pedido!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }); 
    }, 50);
  };

  $scope.Pago_ecommerce = function(ev) {

    if(angular.isObject($scope.origen.origen.geometry)){
      $scope.origen.lat=$scope.origen.origen.geometry.location.lat();
      $scope.origen.lng=$scope.origen.origen.geometry.location.lng();
      $scope.origen.origen=$scope.origen.origen.formatted_address;
    }
    
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if(angular.isObject($scope.pedidos[i].destino.geometry)){
        $scope.pedidos[i].lat=$scope.pedidos[i].destino.geometry.location.lat();
        $scope.pedidos[i].lng=$scope.pedidos[i].destino.geometry.location.lng();
        $scope.pedidos[i].destino=$scope.pedidos[i].destino.formatted_address; 
      }
    }

    var puedeCotizar=0;
    var con=0;

    if($scope.origen.origen==''||$scope.origen.nombreOrigen==''||$scope.origen.telefonoOrigen==''||$scope.origen.lat==''||$scope.origen.lng==''||$scope.origen.comentarios==''||$scope.origen.distrito_origen==''||$scope.origen.comentarios==''){

      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, complete los campos del origen.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }

    if($scope.pedidos.length>1){
      for (var i = 0; i < $scope.pedidos.length; i++) {
         if($scope.pedidos[i].destino==''||$scope.pedidos[i].nombreDestino==''||$scope.pedidos[i].telefonoDestino==''||$scope.pedidos[i].telefonoDestino==null||$scope.pedidos[i].lat==''||$scope.pedidos[i].lng==''||$scope.pedidos[i].costo==0||$scope.pedidos[i].distrito_destino==''||$scope.pedidos[i].comentarios==''){
          con=i+1;
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express')
              .textContent('Por favor, complete los campos del destino: '+con)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          puedeCotizar=1;
         }
      }
    }

    if($scope.pedidos.length==1){
      if($scope.pedidos[0].destino==''||$scope.pedidos[0].nombreDestino==''||$scope.pedidos[0].telefonoDestino==''||$scope.pedidos[0].telefonoDestino==null||$scope.pedidos[0].lat==''||$scope.pedidos[0].lng==''||$scope.pedidos[0].costo==0||$scope.pedidos[0].distrito_destino==''||$scope.pedidos[0].comentarios==''){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('Por favor, complete los campos del destino: '+1)
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
        puedeCotizar=1;
      }
    }

    if($scope.sobre == 0 && $scope.cajaMediana == 0 && $scope.cajaGrande == 0){

      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('Por favor, seleccione un medio de envío.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
      puedeCotizar=1;
    }
    
    if (puedeCotizar == 0) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/confirmar_ecommerce.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: Pagos_ecommerceCtrl
      })
    }
  };

  var Pagos_ecommerceCtrl = function ($scope,data,$timeout,$rootScope,$filter) { 

    $scope.cancelar = function() {
      $mdDialog.cancel();
    };

    $scope.guardar = function() {
      $scope.loadingwait = true;
      $scope.confirm_pedido = true;
      $scope.cotizar_ecommerce();
    }

  }

  $scope.cotizar_ecommerce = function(){
      $scope.stado=0;
      setTimeout(function() {
        if($scope.horaPedido==''){
          $scope.horaPedido='';
        }

        if($scope.horario_e==''){
          $scope.horario_e='';
        }

        if ($scope.horario_origen=='') {
          $scope.horario_origen='';
        }

        if ($scope.horaPedido_origen=='') {
          $scope.horaPedido_origen='';
        }

        $scope.validadPedido=$scope.pedidos.length;
        $scope.contadorPedido=0;
        $scope.contadorPedido2=0;
        $scope.pedido_id = [];
        $scope.destino_id = [];
        $scope.invent = [];
        $scope.productos = [];
        $scope.pedidos_productos = [];
        $scope.enviarPedido = [];

        for (var i = 0; i < $scope.pedidos.length; i++) {
          $scope.enviarPedido.push({
            'tipo':'PROGRAMADO',
            'fecha':$filter('date')(new Date($scope.diaPedido),'yyyy-MM-dd HH:mm:ss'),
            'fecha_origen':$filter('date')(new Date($scope.diaPedido_origen),'yyyy-MM-dd HH:mm:ss'),
            'turno_origen': $scope.horario_origen,
            'hora_origen': $scope.horaPedido_origen,
            'hora':$scope.horaPedido,
            'horario': $scope.horario_e,
            'estado':$scope.stado,
            'nombre':CONFIG.NOMBRE,
            'forma_pago': $scope.pedidos[i].forma, 
            'costo': $scope.pedidos[i].costo,
            'costo_recojo': $scope.costo_recojo,
            'km':($scope.pedidos[i].km/1000).toFixed(2),
            'min': $scope.pedidos[i].min,
            'cajap':$scope.sobre,
            'cajam':$scope.cajaMediana,
            'cajag':$scope.cajaGrande,
            'cancelado': $scope.cancelado,
            'reprogramado': 0,
            'tipo_usuario': CONFIG.CLIENTE.tipo_usuario,
            'origen':$scope.origen.origen,
            'departamento_origen':$scope.origen.departamentoOrigen,
            'nombre_origen':$scope.origen.nombreOrigen,
            'telefono_origen':$scope.origen.telefonoOrigen,
            'distrito_origen':$scope.origen.distrito_origen,
            'zona_origen': $scope.origen.zona_origen,
            'comentarios':$scope.origen.comentarios,
            'lat':$scope.origen.lat,
            'lng':$scope.origen.lng,
            'destino':$scope.pedidos[i].destino,
            'departamento_destino':$scope.pedidos[i].departamentoDestino,
            'nombre_destino':$scope.pedidos[i].nombreDestino,
            'telefono_destino':$scope.pedidos[i].telefonoDestino,
            'distrito_destino':$scope.pedidos[i].distrito_destino,
            'zona_destino':$scope.pedidos[i].zona_destino,
            'comentarios2':$scope.pedidos[i].comentarios,
            'lat2':$scope.pedidos[i].lat,
            'lng2':$scope.pedidos[i].lng,
            'km':($scope.pedidos[i].km/1000).toFixed(2),
            'min': $scope.pedidos[i].min,
            'n_marcador':i+1,
            'cobrarecommerce': $scope.pedidos[i].cobrarecommerce,
            'descuento': $scope.pedidos[i].descuento,
            'costo': $scope.pedidos[i].costo,
            'cantidad': $scope.pedidos[i].cantidad,
            'detalle': $scope.pedidos[i].detalle,
            'subtotal': parseFloat($scope.pedidos[i].subtotal),
            'fecha_destino': $filter('date')(new Date($scope.pedidos[i].fecha_destino),'yyyy-MM-dd HH:mm:ss'),
            'turno_destino': $scope.pedidos[i].turno_destino,
            'hora_destino': $scope.pedidos[i].hora_destino
          });

          console.log($scope.enviarPedido[i]);

          var req = {
            method: 'POST',
            url: '../api/public/api/ecommerce/store?token='+userService.getCurrentToken(),
            headers: {
             'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.enviarPedido[i]
          }

          $mdDialog.cancel();

          $http(req).then(function(response){
            console.log(response.data);
            $scope.pedido_id.push({ 
              id_pedido: response.data.id_pedido,
              id_destino: response.data.id_destino,
              n_marcador: response.data.n_marcador
            });
            $scope.contadorPedido=$scope.contadorPedido+1;    
            if($scope.validadPedido==$scope.contadorPedido){
              var m = 0;
              var cnt = 0;
              var cont_productos = 0;

              if ($scope.user.almacen == 1) {
                for (var i = 0; i < $scope.pedidos.length; i++) {
                  cnt = i+1;
                  for (var j = 0; j < $scope.pedidos[i].productos.length; j++) {
                    for (var k = 0; k < $scope.pedidos[i].productos[j].colores.length; k++) {
                      for (var l = 0; l < $scope.pedidos[i].productos[j].colores[k].atributos.length; l++) {
                        if ($scope.pedidos[i].productos[j].colores[k].atributos[l].cant > 0) {
                          for (var n = 0; n < $scope.pedido_id.length; n++) {
                            if ($scope.pedido_id[n].n_marcador == cnt) {
                              $scope.pedidos_productos.push({
                                'pedido_id': $scope.pedido_id[n].id_pedido,
                                'destino_id': $scope.pedido_id[n].id_destino,
                                'producto_id': $scope.pedidos[i].productos[j].producto_id,
                                'color_id': $scope.pedidos[i].productos[j].colores[k].id,
                                'atributo_id': $scope.pedidos[i].productos[j].colores[k].atributos[l].id,
                                'nombre': $scope.pedidos[i].productos[j].colores[k].nombre + '/Talla ' + $scope.pedidos[i].productos[j].colores[k].atributos[l].atributo + '/Color ' + $scope.pedidos[i].productos[j].colores[k].nombrecolor,
                                'cantidad': $scope.pedidos[i].productos[j].colores[k].atributos[l].cant,
                                'precio': $scope.pedidos[i].productos[j].colores[k].atributos[l].precio,
                                'cantE': 0,
                                'cantD': 0             
                              })
                            }
                          }
                        }
                      }
                    }
                  }
                
                  m += 1;
                  if (m == $scope.pedidos.length) {
                    for (var z = 0; z < $scope.pedidos_productos.length; z++) {
                      var req_ped = {
                        method: 'POST',
                        url: '../api/public/api/productos_pedido/store?token='+userService.getCurrentToken(),
                        headers: {
                          'Authorization' : 'Bearer ' + userService.getCurrentToken()
                        },
                        data: $scope.pedidos_productos[z]
                      }

                      $http(req_ped).then(function(response){
                        cont_productos += 1;
                        if (cont_productos == $scope.pedidos_productos.length) {
                          $scope.loadingwait = false;
                          $scope.confirm_pedido = false;
                          $mdDialog.show(
                            $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title('Courier Liebre Express')
                              .textContent('¡Su pedido se ha enviado exitosamente!')
                              .ariaLabel('Alert Dialog Demo')
                              .ok('OK')
                          );
                        }
                      }, function(){
                          console.log('error');
                      });
                    }
                  }
                }
              } else {
                $scope.loadingwait = false;
                $scope.confirm_pedido = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('¡Su pedido se ha enviado exitosamente!')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              }

              for (var j = 0; j < $scope.pedidos.length; j++) {
                var re = {
                   method: 'GET',
                   url: 'onesignal.php',
                   headers: {
                     'ID' : $scope.pedido_id[j].id_pedido
                   },
                   data: ''
                }
                setTimeout(function() {
                  $http(re).then(function(response){
                      console.log(response.data);
                  }, function(){
                      console.log('ha ocurrido un error al enviar el push');
                  });
                }, 300);
              }

              setTimeout(function() {
                var reqprd = {
                  method: 'GET',
                  url: '../api/public/api/producto?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }
                $scope.inv=$scope.inventario.length;
                $scope.cont=0;

                for (var k = 0; k < $scope.inventario.length; k++) {

                  var reqinv = {
                    method: 'PUT',
                    url: '../api/public/api/atributo/'+$scope.inventario[k].id_atributo+'?token='+userService.getCurrentToken(),
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.inventario[k]
                  }

                  $http(reqinv).then(function(response){
                    console.log(response);
                    $scope.cont = $scope.cont+1;
                    if($scope.inv==$scope.cont){
                      $http(reqprd).then(function(response){
                        if (response.data != '') {
                          $scope.productos=response.data.productos;
                          console.log($scope.productos);
                          if ($scope.user.almacen == 1) {
                            $scope.origen.lat = -12.0501823;
                            $scope.origen.lng = -76.97248680000001;
                            $scope.origen.origen = 'Almacenes Liebre Courier Express';
                            $scope.origen.nombreOrigen = 'Operador Liebre';
                            $scope.origen.departamentoOrigen = '-';
                            $scope.origen.telefonoOrigen = 3558888;
                            $scope.fecha_origen = new Date($scope.date);
                            $scope.diaPedido_origen = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
                            $scope.horaPedido2_origen= 2;
                            $scope.horaPedido3_origen= $scope.seleccionarHorae[2];
                            $scope.horaPedido_origen = '09-19';
                            $scope.horario_origen= '2';
                            $scope.origen.comentarios= '-';
                            $scope.origen.distrito_origen= 'Santa Anita';
                            $scope.origen.zona_origen = '2';
                            for (var i = 0; i < $scope.distritos.length; i++) {
                              if ($scope.distritos[i].nombre == $scope.origen.distrito_origen){
                                $scope.origen.distrito = $scope.distritos[i];
                              }
                            }
                          } 
                        }
                      }, function(){
                          //alert('No se ha podido obtener favoritos');
                      });
                    }  
                  }, function(){
                      //alert('No se ha podido obtener favoritos');
                  });
                }
              }, 500);

              setTimeout(function() {
                $scope.borrar();
              }, 900);

              setTimeout(function() {
                var reqDel = {
                  method: 'DELETE',
                  url: '../api/public/api/pedido/'+ $rootScope.ped.id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(reqDel).then(function(response){

                  for (var i = 0; i < $rootScope.ped.destinos.length; i++) {
                    var reqDeld = {
                      method: 'DELETE',
                      url: '../api/public/api/destino/'+ $rootScope.ped.destinos[i].id+'?token='+userService.getCurrentToken(),
                      headers: {
                        'Authorization' : 'Bearer ' + userService.getCurrentToken()
                      }
                    }

                    $http(reqDeld).then(function(response){
                      $scope.borrar();
                      $scope.pedido_id = [];
                    }, function(){
                      $scope.borrar();
                      $scope.pedido_id = [];
                      console.log('error al eliminar borrador');
                    });
                  }
                }, function(){
                  $scope.borrar();
                  $scope.pedido_id = [];
                  console.log('error al eliminar borrador');
                });
              }, 1300); 
            }
          }, function(){
            var reqtest = {
                  method: 'POST',
                  url: '../api/public/api/test?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: {
                      data: JSON.stringify($scope.enviarPedido),
                      pos:12,
                      user_id:CONFIG.ID
                    }
                }
                $http(reqtest).then(function(response){
                  alert('!se ha registrado este error con soporte, te responderemos en breve!');
                }, function(){
                  
                });
            $scope.loadingwait = false;
            $scope.confirm_pedido = false;
            $scope.borrar();
            $scope.pedido_id = [];
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('¡Ha ocurrido un error al enviar el pedido, por favor intenta de nuevo!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          });  
        } 
      }, 50);
  };

  /************************* FIN FUNCION COTIZAR **********************/ 

  /************************* FUNCION PROGRAMAR PEDIDO **********************/ 
  
  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6;
  };

  $scope.programar=function(){
    if(!$scope.showProgramar){
      $scope.diaPedido= $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
      $scope.tipoPedido='PROGRAMADO';
      $scope.showProgramar=true;
      $scope.horaPedido='';
      $scope.horaProgramada = '';
      $scope.hora_e='';
    }else{
      $scope.tipoPedido='URGENTE';
      $scope.showProgramar=false;
      $scope.horaPedido='';
      $scope.horario_e='';
      $scope.horaProgramada = '';
      $scope.diaPedido= $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
    }
  }

  $scope.borrador=function(){
      $scope.stado=5;
      $scope.crearBorrador();
  }
  
  $scope.ajusteFecha=function(myDate){
    $scope.diaPedido = $filter('date')(new Date(myDate),'yyyy-MM-dd HH:mm:ss');
    SwitchFuction($scope.horaPedido);
  }

  var tomorrow2 = new Date($scope.date);
  var n = tomorrow2.getDay();

  if (n != 6) {
    tomorrow2.setDate(tomorrow2.getDate() + 1);
  } else {
    tomorrow2.setDate(tomorrow2.getDate() + 2);
  }
  if (n == 5) {
    $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
  }

  $scope.minDate2 = tomorrow2;
  $scope.minDate = new Date($scope.date);

  $scope.ajusteFecha_origen=function(fecha_origen){
    $scope.diaPedido_origen = $filter('date')(new Date(fecha_origen),'yyyy-MM-dd HH:mm:ss');
    if ($scope.horaPedido3_origen != '') {    
      if ($scope.user.almacen == 1) {
        SwitchFuction1_origen($scope.horaPedido3_origen.value);
      }
      if ($scope.user.almacen == 0) {
        SwitchFuction1_origenO($scope.horaPedido3_origen.value); 
      }
    }
    var d = new Date(fecha_origen);
    var n = d.getDay();

    if (n != 6) {
      tomorrow2.setDate(new Date(fecha_origen).getDate() + 1);
    } else {
      tomorrow2.setDate(new Date(fecha_origen).getDate() + 2);
    }
    if (n == 5) {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
    }

    for (var i = 0; i < $scope.pedidos.length; i++) {
      $scope.pedidos[i].fecha_destino1 = new Date(tomorrow2);
      $scope.pedidos[i].fecha_destino = $filter('date')(new Date(tomorrow2),'yyyy-MM-dd HH:mm:ss');
      if ($scope.pedidos[i].horario_destino != '') {
        SwitchFuction1_destino($scope.seleccionarHorae[$scope.pedidos[i].horario_destino].value,$scope.pedidos[i]);
      }
    } 
  }

  $scope.ajusteFecha_destino=function(pedido){
    var d = new Date(pedido.fecha_destino1).getDay();
    if (d == 6) {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
    } else {
      $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
      $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];
    }
    pedido.fecha_destino = $filter('date')(new Date(pedido.fecha_destino1),'yyyy-MM-dd HH:mm:ss');
    SwitchFuction1_destino($scope.seleccionarHorae[pedido.horario_destino].value,pedido);
  }
  
  $scope.$watch(
    function($scope) { 
        return $scope.horaPedido 
    }, function() {

    });

  $scope.ajusteHora=function(data){
    $scope.horaPedido = data.hora;
    SwitchFuction(data.hora);
  }

  $scope.ajusteHora1=function(data){
    $scope.horario_e = data;
  }

  $scope.ajusteHora2=function(data){
    $scope.horaPedido= data.hora;
    SwitchFuction1(data.value);
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
    console.log(origen.distrito_origen);
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

  var SwitchCosto_destino = function (sno,pedido) {
    $scope.costoe = 0;

    if ($scope.user.almacen == 0 && $scope.user.tipo_usuario == 3) {
      $scope.costoe = parseFloat($scope.costos[0].costossinalmacen);
      $scope.costo_recojo = parseFloat($scope.costos[0].costossinalmacen);
    }

    if ($scope.user.tipo_usuario == 3) {
      switch (sno) {
        case 0:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_manana);
          break;
        case 1:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_tarde);
          break;
        case 2:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_completo);
          break;
        case 3:
          pedido.costo = parseFloat($scope.costos[0].ecommerce_horas);
          break;
        default:
          pedido.costo = 0;
      }
    }

    for (var i = 0; i < $scope.pedidos.length; i++) {
      $scope.costoe += $scope.pedidos[i].costo;
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

  var SwitchFuction1_origen = function (sno) {
    if ($scope.user.tipo_usuario == 3) {
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
    if ($scope.user.tipo_usuario == 3) {
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
  /************************* FIN FUNCION MOSTRAR RUTAS **********************/ 

  var tomorrow = new Date($scope.date);
  var n = tomorrow.getDay();

  if (n != 6) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  } else {
    tomorrow.setDate(tomorrow.getDate() + 2);
  }
  if (n == 5) {
    $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
    $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
  }

  $scope.borrar=function(){
    $scope.contador=1;
    var miUbicacion={};
    var misDestinos={};
    $scope.ruta=[{}];
    $scope.cotizacion=[];
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
    $scope.costo=0;
    $scope.stado=0;
    $scope.costoe=0;
    $scope.medio=0;
    $scope.sobre=1;
    $scope.cajaMediana=0;
    $scope.cajaGrande=0;
    $scope.pedido_id=0;
    $scope.myDate=new Date($scope.date);
    var val = new Date($scope.date);
    $scope.CurrentHora = new Date($scope.date);
    $scope.Hora = 12;
    $scope.Horarios='';
    $scope.HorariosE='';
    $scope.SelectHorario='';
    $scope.SelectHorario1='';
    $scope.tipoPedido='URGENTE';
    $scope.showProgramar=false;
    $scope.horaPedido1='';
    $scope.horaPedido2='';
    $scope.horaPedido3='';
    $scope.diaPedido=$filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
    $scope.diaPedido_origen=$filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm:ss');
    $scope.fecha_origen = new Date($scope.date);
    $scope.horaPedido2_origen='';
    $scope.horaPedido3_origen='';
    $scope.origen= {
      origen:'',
      departamentoOrigen:'',
      nombreOrigen:'',
      telefonoOrigen:'',
      distrito_origen: '',
      zona_origen: '',
      lat:'',
      lng:'',
      myDate:new Date($scope.date),
      fecha_origen: new Date($scope.date),
      recojo:''
    }

    $scope.pedidos = [{   
      'id_pedido':1,
      'destino':'',
      'departamentoDestino':'',
      'nombreDestino':'',
      'telefonoDestino':'',
      'distrito_destino':'',
      'zona_destino':'',
      'distrito':'',
      'comentarios':'',
      'myDate2':'',
      'entrega':'',
      'km':'',
      'min':'',
      'selected':false,
      'cobrarecommerce': parseFloat(0),
      'descuento': parseFloat(0),
      'cancelado':0,
      'costo': 1,
      'cantidad': '',
      'detalle': '',
      'subtotal': parseFloat(0),
      'total': parseFloat(0),
      'fecha_destino': tomorrow,
      'fecha_destino1': tomorrow,
      'turno_destino': '',
      'hora_destino': '',
      'productos': [],
      'forma': 0
    }];
    initMap();
  };

  $scope.borrarPedido= function(pedido){
    var id = pedido.id_pedido;

    for (var m = 0; m < $scope.inventario.length; m++) {
      for (var i = 0; i < pedido.productos.length; i++) {
        for (var j = 0; j < pedido.productos[i].colores.length; j++) {
          for (var k = 0; k < pedido.productos[i].colores[j].atributos.length; k++) {
            if ($scope.inventario[m].id_atributo == pedido.productos[i].colores[j].atributos[k].id) {
              $scope.inventario[m].cantidad = $scope.inventario[m].cantidad + pedido.productos[i].colores[j].atributos[k].cant;
              bc = 1;
            };
          };
        };
      };
    };

    for (var i = 0; i<$scope.pedidos.length; i++) {
      if(id==$scope.pedidos[i].id_pedido){
         $scope.pedidos[i].selected=true;
         $scope.pedidos.splice(i,1);
         $scope.remove();
         $timeout(function() {$scope.consola();}, 200);
      };
    };

    if ($scope.user.tipo_usuario == 3) {
      $scope.costoe = 0

      if ($scope.user.almacen == 0) {
        $scope.costoe = parseFloat($scope.costos[0].costossinalmacen);
      }

      for (var i = 0; i < $scope.pedidos.length; i++) {
        $scope.costoe += $scope.pedidos[i].costo;
      };
    }
  };

  $scope.retorno = function(personalDetail){
    $scope.contador=$scope.contador+1;

    $scope.pedidos.push({ 
      'id_pedido':$scope.contador,
      'destino':$scope.origen.origen,
      'departamentoDestino':$scope.origen.departamentoOrigen,
      'nombreDestino':$scope.origen.nombreOrigen,
      'telefonoDestino':$scope.origen.telefonoOrigen,
      'distrito_destino':$scope.origen.distrito_origen,
      'zona_destino': $scope.origen.zona_origen,
      'distrito':$scope.origen.distrito,
      'comentarios':$scope.origen.comentarios,
      'lat':$scope.origen.lat,
      'lng':$scope.origen.lng
    });

    setTimeout(function() {
      $scope.consola();
    }, 250);
  };

  /************************* FUNCIONES AGREGAR Y REMOVER **********************/ 
  $scope.addNew = function(personalDetail){
    alert('Esta opción esta en mantenimiento.')
  };
  /*$scope.addNew = function(personalDetail){
    //if ($scope.contador+1<3) {
    $scope.contador=$scope.contador+1;
    $scope.pedidos.push({ 
        'id_pedido':$scope.contador,
        'destino':'',
        'departamentoDestino':'',
        'nombreDestino':'',
        'telefonoDestino':'',
        'distrito_destino':'',
        'zona_destino':'',
        'distrito':'',
        'comentarios':'',
        'km':'',
        'min':'',
        'cobrarecommerce': parseFloat(0),
        'descuento': parseFloat(0),
        'cancelado': '',
        'costo': '',
        'cantidad': '',
        'detalle': '',
        'subtotal': parseFloat(0),
        'total': parseFloat(0),
        'fecha_destino': tomorrow2,
        'fecha_destino1': tomorrow2,
        'turno_destino': '',
        'hora_destino': '',
        'horario_destino': 5,
        'hora_destino1': '',
        'productos': [],
        'forma': 0
    });
    //}else{
    //alert('Esta opción esta en mantenimiento, ¡pronto la habilitaremos!');
    //}
  };*/
    
  $scope.remove = function(){
    var newDataList=[];
      $scope.selectedAll = false;
      angular.forEach($scope.pedidos, function(selected){
          if(!selected.selected){
              newDataList.push(selected);
         // console.log($scope.pedidos);
          }
      }); 
    $scope.pedidos = newDataList;
  };
    
  $scope.checkAll = function () {
    if (!$scope.selectedAll) {
        $scope.selectedAll = true;
    } else {
        $scope.selectedAll = false;
    }
    angular.forEach($scope.pedidos, function(personalDetail) {
        personalDetail.selected = $scope.selectedAll;
    });
  };    
  /************************* FIN FUNCIONES AGREGAR Y REMOVER **********************/   

  /************************* FUNCIONES CAJAS **********************/  

  $scope.agregarSobre= function(){
    $scope.sobre=$scope.sobre+1;  
  };

  $scope.quitarSobre= function(){
    if($scope.sobre>0){
    $scope.sobre=$scope.sobre-1;
    }
  }; 

  $scope.agregarCajaMediana= function(){
    $scope.cajaMediana=$scope.cajaMediana+1;  
  };
  
  $scope.quitarCajaMediana= function(){
    if($scope.cajaMediana>0){
    $scope.cajaMediana=$scope.cajaMediana-1;
    }
  }; 

  $scope.agregarCajaGrande= function(){
    $scope.cajaGrande=$scope.cajaGrande+1;  
  };

  $scope.quitarCajaGrande= function(){
    if($scope.cajaGrande>0){
    $scope.cajaGrande=$scope.cajaGrande-1;
    }
  }; 

  /************************* FIN FUNCIONES CAJAS **********************/  

   /************************* PRODUCTOS MODAL **********************/

  $scope.inventario = [];
  $scope.productos = [];

  setTimeout(function() {
    var reqprd = {
      method: 'GET',
      url: '../api/public/api/producto?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqprd).then(function(response){
      if (response.data != '') {
        $scope.productos=response.data.productos;
      }
    }, function(){
        //alert('No se ha podido obtener favoritos');
    });
  }, 1000);

  $scope.productos_modal = function(pedido,inventario) {
    showTabDialog(pedido,inventario);
  };

  var showTabDialog = function(pedido,inventario) {

    $scope.color_first = [];
    pedido.detalle = '';
    pedido.cantidad = parseInt(0);
    pedido.subtotal = parseFloat(0);
    pedido.total = parseFloat(0);

    $mdDialog.show({
      locals:{data: $scope.productos, data1: pedido,data3: inventario}, 
      templateUrl: 'templates/productos.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose:false,                
      controller: mdDialogCtrl
    })
  };

  var mdDialogCtrl = function ($scope,$timeout,data,data1,data3,$rootScope,$filter) {

    var reqprd = {
      method: 'GET',
      url: '../api/public/api/producto?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $scope.isOpen = false;
    $scope.productos = [];
    $scope.productos_select = [];
    $scope.pedido = data1;
    $scope.bandera = 0;
    $scope.bandera1 = 0;
    $scope.inventario = data3;

    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'
    };

    $scope.productos = data;
    $scope.color_first = [];
    $scope.talla_select = [];
    $scope.color_select = [];
    $scope.bp = 0;

    for (var i = 0; i < $scope.productos.length; i++) {
      $scope.color_first.push($scope.productos[i].colores[0]); 
      $scope.color_first[i].precio = parseFloat($scope.productos[i].colores[0].atributos[0].precio);
      $scope.color_first[i].cantidad_disp = parseInt($scope.productos[i].colores[0].atributos[0].cantidad);
      $scope.color_first[i].id_atributo = $scope.productos[i].colores[0].atributos[0].id;
      $scope.color_first[i].atributo = $scope.productos[i].colores[0].atributos[0].atributo;
      $scope.talla_select[i] = $scope.productos[i].colores[0].atributos[0].id;
      $scope.color_select[i] = $scope.productos[i].colores[0].id;
      $scope.color_first[i].nombre = $scope.productos[i].nombre;
      $scope.color_first[i].descripcion = $scope.productos[i].descripcion;
      $scope.color_first[i].cant = 0;
      $scope.color_first[i].subtotal = 0;

      for (var m = 0; m < $scope.color_first[i].atributos.length; m++) {
        $scope.color_first[i].atributos[m].cant = parseInt(0);
      }

      for (var j = 0; j < $scope.pedido.productos.length; j++) {
        if ($scope.color_first[i].producto_id == $scope.pedido.productos[j].producto_id) {
          for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
            if ($scope.color_first[i].id == $scope.pedido.productos[j].colores[k].id) {
              $scope.color_first[i] = $scope.pedido.productos[j].colores[k];
              $scope.color_select[i] = $scope.pedido.productos[j].colores[k].id;
              for (var l = 0; l < $scope.pedido.productos[j].colores[k].atributos.length; l++) {
                if ($scope.color_first[i].id_atributo == $scope.pedido.productos[j].colores[k].atributos[l].id) {
                  $scope.color_first[i].cantidad_disp = parseInt($scope.pedido.productos[j].colores[k].atributos[l].cantidad);
                  $scope.color_first[i].id_atributo = $scope.pedido.productos[j].colores[k].atributos[l].id;
                  $scope.color_first[i].atributo = $scope.pedido.productos[j].colores[k].atributos[l].atributo;
                  $scope.talla_select[i] = $scope.pedido.productos[j].colores[k].atributos[l].id;
                  $scope.color_first[i].cant = parseInt($scope.pedido.productos[j].colores[k].atributos[l].cant);
                  $scope.color_first[i].subtotal = parseFloat($scope.pedido.subtotal);
                };
              };
            };
          };
        };
      };

      for (var k = 0; k < $scope.inventario.length; k++) {
        if ( $scope.color_first[i].id_atributo == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };
    };

    for (var j = 0; j < $scope.pedido.productos.length; j++) {
      for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
        for (var l = 0; l < $scope.pedido.productos[j].colores[k].atributos.length; l++) {
          if ($scope.pedido.productos[j].colores[k].atributos[l].cant != 0) {
            $scope.productos_select.push({
              detalle: $scope.pedido.productos[j].colores[k].atributos[l].cant + ' ' + $scope.pedido.productos[j].colores[k].nombre + ' / Talla ' + $scope.pedido.productos[j].colores[k].atributos[l].atributo + ' / Color ' + $scope.pedido.productos[j].colores[k].nombrecolor,
              id_atributo: $scope.pedido.productos[j].colores[k].atributos[l].id,
              cantidad: parseInt($scope.pedido.productos[j].colores[k].atributos[l].cant),
              subtotal: parseFloat($scope.pedido.productos[j].colores[k].atributos[l].precio*$scope.pedido.productos[j].colores[k].atributos[l].cant),
              cantidad_disponible: parseInt($scope.pedido.productos[j].colores[k].atributos[l].cantidad)
            });
          };
        };
      };
    };

    $scope.select_color = function(color,i,producto) {
      $scope.color_first[i] = color;
      $scope.color_first[i].nombre = producto.nombre;
      $scope.color_first[i].descripcion = producto.descripcion;
      $scope.color_first[i].precio = parseFloat(color.atributos[0].precio);
      $scope.color_first[i].cantidad_disp = parseInt(color.atributos[0].cantidad);
      $scope.color_first[i].id_atributo = color.atributos[0].id;
      $scope.talla_select[i] = color.atributos[0].id;
      $scope.color_select[i] = color.id;
      $scope.color_first[i].cant = parseInt(color.atributos[0].cant);
      $scope.color_first[i].atributo = color.atributos[0].atributo;

      for (var k = 0; k < $scope.inventario.length; k++) {
        if ( $scope.color_first[i].id_atributo == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };

      for (var m = 0; m < color.atributos.length; m++) {
        color.atributos[m].cant = parseInt(color.atributos[m].cant);
      };
      
      for (var j = 0; j < $scope.pedido.productos.length; j++) {
        if ($scope.color_first[i].producto_id == $scope.pedido.productos[j].producto_id) {
          for (var k = 0; k < $scope.pedido.productos[j].colores.length; k++) {
            if ($scope.color_first[i].id == $scope.pedido.productos[j].colores[k].id) {
              $scope.color_first[i].atributos = $scope.pedido.productos[j].colores[k].atributos;
              $scope.color_first[i].cant = parseInt($scope.pedido.productos[j].colores[k].atributos[0].cant);
            };
          };
        };
      };
    };

    $scope.select_talla = function(talla,i) {
      $scope.talla_select[i] = talla.id;
      $scope.color_first[i].precio = parseFloat(talla.precio);
      $scope.color_first[i].atributo = talla.atributo;
      $scope.color_first[i].cantidad_disp = parseInt(talla.cantidad);
      $scope.color_first[i].id_atributo = talla.id;
      $scope.color_first[i].cant = parseInt(talla.cant);

      for (var k = 0; k < $scope.inventario.length; k++) {
        if (talla.id == $scope.inventario[k].id_atributo) {
          $scope.color_first[i].cantidad_disp = parseInt($scope.inventario[k].cantidad);
        };
      };
    };

    $scope.add_product = function(producto) {
      console.log(producto);
      $scope.band = 0;

      if (producto.cantidad_disp > 0 && producto.cant >= 0 ) {
        $scope.bandera = true;

        for (var i = 0; i < producto.atributos.length; i++) {

          if(producto.atributos[i].id == producto.id_atributo){
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                producto.atributos[i].cantidad = $scope.inventario[j].cantidad;
              };
            };

            producto.atributos[i].cant += 1;
            producto.cant = parseInt(producto.atributos[i].cant);
            producto.atributos[i].cantidad = producto.atributos[i].cantidad - 1;
            producto.cantidad_disp = parseInt(producto.atributos[i].cantidad);

            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                $scope.inventario[j].cantidad = producto.cantidad_disp;
                $scope.band = 1;
              };
            };

            if ($scope.band == 0) {
              $scope.inventario.push({
                id_atributo: producto.id_atributo,
                cantidad: parseInt(producto.cantidad_disp)
              });
            };
          };
        };

        var b1 = 0;
        var b2 = 0;

        for (var i = 0; i < $scope.pedido.productos.length; i++) {
          if ($scope.pedido.productos[i].producto_id == producto.producto_id) {
            for (var j = 0; j < $scope.pedido.productos[i].colores.length; j++) {
              if ($scope.pedido.productos[i].colores[j].id == producto.id) {
                $scope.pedido.productos[i].colores[j] = producto;
                b1 = 1;
              };
            };
            if (b1 == 0) {
              $scope.pedido.productos[i].colores.push(producto);
              b1 = 0;
            }; 
            b2 = 1;
          };
        };

        if (b2 == 0) {
          $scope.pedido.productos.push({
            producto_id: producto.producto_id,
            colores: [producto]
          })
        };

        for (var i = 0; i < $scope.productos_select.length; i++) {
          if ($scope.productos_select[i].id_atributo == producto.id_atributo) {
            $scope.productos_select[i].detalle = producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor;
            $scope.productos_select[i].cantidad += 1;
            $scope.productos_select[i].subtotal = parseFloat($scope.productos_select[i].subtotal) + parseFloat(producto.precio);
            $scope.bandera = false;
          };
        };

        if ($scope.bandera) {
          $scope.productos_select.push({
            detalle: producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor,
            id_atributo: producto.id_atributo,
            cantidad: parseInt(producto.cant),
            subtotal: parseFloat(producto.precio),
            cantidad_disponible: parseInt(producto.cantidad_disp)
          });
        };
      };
    };

    $scope.remove_product = function(producto) {

      if (producto.cantidad_disp >= 0 && producto.cant > 0 ) {
        for (var i = 0; i < producto.atributos.length; i++) {

          if(producto.atributos[i].id == producto.id_atributo){
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                producto.atributos[i].cantidad = $scope.inventario[j].cantidad;
              };
            };

            producto.atributos[i].cant -= 1;
            producto.cant = parseInt(producto.atributos[i].cant);
            producto.atributos[i].cantidad +=1;
            producto.cantidad_disp = parseInt(producto.atributos[i].cantidad);
            
            for (var j = 0; j < $scope.inventario.length; j++) {
              if ($scope.inventario[j].id_atributo == producto.id_atributo) {
                $scope.inventario[j].cantidad = producto.cantidad_disp;
              };
            };
          };
        };

        var br = 0;

        if (producto.cant == 0) {
          var index=$scope.productos_select.indexOf(producto);
          $scope.productos_select.splice(index,1);
          br = 1;
        };

        if (br == 0) {
          for (var i = 0; i < $scope.productos_select.length; i++) {
            if ($scope.productos_select[i].id_atributo == producto.id_atributo) {
              $scope.productos_select[i].detalle = producto.cant + ' ' + producto.nombre + ' / Talla ' + producto.atributo + ' / Color ' + producto.nombrecolor;
              $scope.productos_select[i].cantidad -= 1;
              $scope.productos_select[i].subtotal = parseFloat($scope.productos_select[i].subtotal) - parseFloat(producto.precio);
              $scope.productos_select[i].cantidad_disponible += 1;
            };
          };
        };
      };
    };

    $scope.cerrar_productos = function() {
      $mdDialog.cancel();      
    }

    $scope.cancelar = function() {
      var tam = $scope.productos_select.length;

      if ($scope.bandera1 == 0) {
        for (var i = 0; i < $scope.productos_select.length; i++) {          
          if (i == tam-1) {
            $scope.pedido.detalle += $scope.productos_select[i].detalle;
          } else{
            $scope.pedido.detalle += $scope.productos_select[i].detalle + ' - ';
          };
          $scope.pedido.cantidad += parseInt($scope.productos_select[i].cantidad);
          $scope.pedido.subtotal = (parseFloat($scope.pedido.subtotal) + parseFloat($scope.productos_select[i].subtotal)).toFixed(2);
          $scope.pedido.subtotal = parseFloat($scope.pedido.subtotal);
        }

        $scope.pedido.total = parseFloat($scope.pedido.subtotal) + parseFloat($scope.pedido.cobrarecommerce) - parseFloat($scope.pedido.descuento);
        $scope.pedido.total = Number(($scope.pedido.total).toFixed(2));
        $scope.bandera1 = 1;

        $http(reqprd).then(function(response){
          if (response.data != '') {
            $scope.productos=response.data.productos;
            $mdDialog.cancel();
          } else{
            $mdDialog.cancel();
          }
        }, function(){
          $mdDialog.cancel();
        });
      };
    };
  };

  $scope.costo_envio = function(pedido) {
    pedido.total = parseFloat(pedido.subtotal) + parseFloat(pedido.cobrarecommerce) - parseFloat(pedido.descuento);
    pedido.total = Number((pedido.total).toFixed(2));
  };


  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
    userService.logout();
    $location.path( "/login" );
  }
})

.controller('ListadoPedidosCtrl', function (userService,$scope, $filter, $compile, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog){
    
  var req = {
    method: 'GET',
    url: '../api/public/api/pedido_con_productos?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.user = '';
  var titleHtml = 'Origen';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
        if ($scope.user.tipo_usuario == 3) {
          titleHtml = 'Cliente Final';
        }
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
    if ($scope.user.tipo_usuario == 3) {
      titleHtml = 'Cliente Final';
    }
  }

    var vm = this;
    vm.edit = edit;
    vm.dtInstance = {};
    vm.persons = {};
    vm.reloadData = reloadData;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.pedidos = [];
      $scope.tracking = [];

      $http(req).then(function(response){
        $scope.pedidos = response.data.pedidos;
        console.log($scope.pedidos);
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.user.id == $scope.pedidos[i].user_id && $scope.pedidos[i].estado != 4 && $scope.pedidos[i].estado != 5 && $scope.pedidos[i].estado != 3 && $scope.pedidos[i].estado_reprogramado == 0) {
              $scope.tracking.push($scope.pedidos[i]);
            }
            if ( $scope.user.id == $scope.pedidos[i].user_id && (((Date.parse($scope.pedidos[i].updated_at)-Date.now())/60000)*(-1)).toFixed(0) < 720 && $scope.pedidos[i].estado == 3) {
              $scope.tracking.push($scope.pedidos[i]);
              console.log($scope.pedidos[i]);
            }
            count = count + 1;
          }
        }
        if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
          $scope.loadingwait3 = false;
        }
      }, function(){
        console.log('ha ocurrido un error');
      });

      return defer.promise;
    })
    .withLanguage({
          "sEmptyTable":     "No hay pedidos pendientes",
          "sInfo":           "Mostrando _START_ de _TOTAL_ entradas",
          "sInfoEmpty":      "Mostrando 0 de 0 entradas",
          "sInfoFiltered":   "(Filtrado de entradas _MAX_ en total)",
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
        .withOption('responsive', true)
        .withOption('order', [0, 'desc'])
        .withOption('createdRow', createdRow)
        .withOption('headerCallback', function(header) {
            if (!vm.headerCompiled) {
                vm.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        });
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Orden Solicitud').notSortable().renderWith(ordenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Tipo').renderWith(tipoHtml),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(origenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Fecha Envío').notSortable().renderWith(horaHtml),
        DTColumnBuilder.newColumn(null).withTitle('Hora Programada').renderWith(horaprogHtml),
        DTColumnBuilder.newColumn('motivo').withTitle('Observaciones'),
        DTColumnBuilder.newColumn(null).withTitle('Estado').notSortable().renderWith(estadoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Detalle').notSortable().renderWith(actionsHtml)   
    ];

  function horaHtml(data, type, full, meta) {
    //console.log(data);
    $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'HH:mm:ss');
    
    if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
      $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'dd/MM/yyyy HH:mm:ss');
    }
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
      $variable = $filter('date')(new Date(data.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
    } 
    if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
      if (data.destinos[0].fecha_destino != null) {
        $variable = $filter('date')(new Date(data.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
      }
    } 
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

    function origenHtml(data, type, full, meta) {
      var dest = data.destinos;

      dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if (data.tipo_usuario != 3) {
        if (dest[0].origen != 'undefined') {
          return dest[0].origen;
        } else { 
          return ' ';
        }
      }

      if (data.tipo_usuario == 3) {
        return dest[0].nombre_destino;
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

    function tipoHtml(data, type, full, meta) {
      var tipo = data.tipo;

      if (data.reprogramado > 0) {
        tipo = 'REPROGRAMADO';
      }
      return tipo;
    }

    $scope.update = function() {
      $scope.loadingwait3 = true;
      reloadData();
    }    

    function reloadData() {  
      var resetPaging = true;
      vm.dtInstance.reloadData(null, resetPaging);
    }

    function edit(person) {
      $scope.pedido = person;
      $scope.pedidos = {};
      showTabDialog();
    };

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/detalle_pedido.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope,$filter) { 

      $scope.pedidos = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;
      $scope.total = parseFloat(0);
      $scope.pedidos.costo1 = $scope.pedidos.costo;

      $scope.destinos = $scope.pedidos.destinos;
      $scope.destinos.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if ($scope.pedidos.reprogramado > 0) {
        $scope.pedidos.tipo = 'REPROGRAMADO';
      }

      if ($scope.pedidos.reprogramado == 1 && $scope.pedidos.tipo_usuario == 3 && $scope.pedidos.estado != 3) {
        $scope.pedidos.costo_recojo = 0;
        if (parseFloat($scope.pedidos.costo) > parseFloat($scope.pedidos.costo_reprogramacion)) {
          $scope.pedidos.costo1 = 0;
        } else {
          $scope.pedidos.costo1 = parseFloat($scope.pedidos.costo_reprogramacion) - parseFloat($scope.pedidos.costo);
        }
      }

      if ($scope.pedidos.tipo_usuario != 3) {
        if ($scope.pedidos.tipo == 'PROGRAMADO') {
          $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
        }
        if ($scope.pedidos.tipo == 'REPROGRAMADO') {
          $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
        }
        if ($scope.pedidos.tipo == 'URGENTE') {
          $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy HH:mm:ss');
        }
      }

      if ($scope.pedidos.tipo_usuario == 3) {
        $scope.pedidos.fecha1 = $filter('date')(new Date($scope.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
        $scope.pedidos.fecha_origen1 = $filter('date')(new Date($scope.pedidos.fecha_origen.replace(/-/g, "/")),'dd/MM/yyyy');
        $scope.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
      }

      if ($scope.pedidos.estado == 0) {
        $scope.pedidos.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos.estado == 1) {
        $scope.pedidos.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos.estado == 2) {
        $scope.pedidos.estado = 'EN CAMINO';
      }
      if ($scope.pedidos.estado == 3) {
        $scope.pedidos.estado = 'FINALIZADO';
        $scope.pedidos.estado1 = 3;
      }
      if ($scope.pedidos.estado == 4) {
        $scope.pedidos.estado = 'ANULADO';
        $scope.pedidos.estado1 = 4;
      }

      if ($scope.pedidos.forma_pago == 0) {
        $scope.pedidos.forma_pago = 'EFECTIVO';
      }
      if ($scope.pedidos.forma_pago == 1) {
        $scope.pedidos.forma_pago = 'TRANSFERENCIA';
      }
      if ($scope.pedidos.forma_pago == 2) {
        $scope.pedidos.forma_pago = 'POS VISA';
      }


      $scope.costo = parseFloat($scope.pedidos.costo1) + parseFloat($scope.pedidos.costo_recojo);

      for (var i = 0; i < $scope.destinos.length; i++) {
        $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
        $scope.destinos[i].costo = parseFloat($scope.pedidos.costo);
        if ($scope.pedidos.reprogramado == 1 && $scope.pedidos.tipo_usuario == 3 && $scope.pedidos.estado != 3) {
          $scope.pedidos.costo_recojo = 0;
          if (parseFloat($scope.pedidos.costo) > parseFloat($scope.pedidos.costo_reprogramacion)) {
            $scope.destinos[i].costo = 0;
          } else {
            $scope.destinos[i].costo = parseFloat($scope.pedidos.costo_reprogramacion) - parseFloat($scope.pedidos.costo);
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

      $timeout(function() {
          $scope.consola();
      }, 500);

      $scope.cancelar = function() {
        $mdDialog.cancel();
      };

      $scope.gPlace;

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
            var mapDiv2=document.getElementById('map2');
            
            var mapOptions2={
            center: lima,
            zoom:14,
            //styles: styles
            }
        $scope.map2= new google.maps.Map(mapDiv2,mapOptions2);
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
            map: $scope.map2,
            position: ubicacion,
            icon: pin[i],
            draggable: false
            //animation: google.maps.Animation.DROP
        })

        markers.push(marker);
      }
      
      /************************* FIN FUNCION MARCADORES **********************/    
      
      /************************* FUNCION TRAZADO DE RUTAS **********************/  
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

                for (var i = 0 ; i < response.routes[0].legs.length ; i++) {
                  duration=duration+response.routes[0].legs[i].duration.value;
                }
                for (var i = 0 ; i < $scope.pedidos.length ; i++) {
                  $scope.pedidos[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
                }                
              }
            })     
          }, 600);
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
    
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    };

    function ordenHtml(data, type, full, meta) {
      $variable = 'LIE000' + data.id;
      return $variable;
    }
    
    function estadoHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      if (data.estado == 0) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div></div>';
      }
      if (data.estado == 1) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div></div>';
      }
      if (data.estado == 2) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div><div class="progress-bar status_asignado"><md-tooltip md-direction="top">EN CAMINO</md-tooltip></div></div>';
     }
      if (data.estado == 3) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div><div class="progress-bar status_asignado"><md-tooltip md-direction="top">EN CAMINO</md-tooltip></div><div class="progress-bar status_entregado"><md-tooltip md-direction="top">FINALIZADO</md-tooltip></div></div>';
      }
    };

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<a class="link_order" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
        '<i class="fa fa-search" aria-hidden="true"></i> Ver Pedido' +
        '</a>';
    };
})

.controller('trackingCtrl', function($scope,$cookieStore,$sce,CONFIG,Facebook,userService,$location,$http) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
  }

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 1500);

  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }
  
  /*-----------------------------------*/
})

.controller('historialCtrl', function($scope,$cookieStore,$sce,CONFIG,Facebook,userService,$location,$http) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
  }
  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 1500);

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }
  
  /*-----------------------------------*/
})

.controller('ListadoHistorialCtrl', function (userService,$scope, $compile, $filter, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog){
  $scope.fecha_filtro = new Date();
  $scope.fecha_filtro1 = $filter('date')($scope.fecha_filtro,'yyyy-MM-dd');

  $scope.change_date = function(fecha) {
    console.log(fecha);
    $scope.fecha_filtro1 = $filter('date')(new Date(fecha),'yyyy-MM-dd');
    console.log($scope.fecha_filtro1);
    $scope.req_historial = {
      method: 'GET',
      url: '../api/public/api/pedido_historial?fecha_destino='+$scope.fecha_filtro1+'&token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }
    reloadData();
  }

  $scope.req_historial = {
    method: 'GET',
    url: '../api/public/api/pedido_historial?fecha_destino='+$scope.fecha_filtro1+'&token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.user = '';
  var titleHtml = 'Origen';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
        if ($scope.user.tipo_usuario == 3) {
          titleHtml = 'Cliente Final';
        }
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
    if ($scope.user.tipo_usuario == 3) {
      titleHtml = 'Cliente Final';
    }
  }

  function reloadData() {  
    var resetPaging = true;
    vm.dtInstance.reloadData(null, resetPaging);
  }

  var vm = this;
  vm.edit = edit;
  vm.reloadData = reloadData;
  vm.dtInstance = {};
  vm.persons = {};
  vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
    var defer = $q.defer();
    var count = 0;
    $scope.tracking = [];
    $scope.pedidos = [];

    $http($scope.req_historial).then(function(response){
      if (response.data == '') {
        defer.resolve($scope.tracking);
      } else {
        $scope.pedidos = response.data.pedidos;
        $scope.pedidos.sort(function(a, b){
          return a.n_marcador - b.n_marcador;
        })
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if ($scope.user.id == $scope.pedidos[i].user_id && ($scope.pedidos[i].estado == 3 || $scope.pedidos[i].estado == 4)) {
            $scope.tracking.push($scope.pedidos[i]);
          }
          count = count + 1;
        }
      }
      if (count == $scope.pedidos.length) {
        defer.resolve($scope.tracking);
      }
    }, function(){
      $location.path("/login");
    })

    return defer.promise;
  })
  .withLanguage({
        "sEmptyTable":     "No hay historial de pedidos",
        "sInfo":           "Mostrando _START_ de _TOTAL_ entradas",
        "sInfoEmpty":      "Mostrando 0 de 0 entradas",
        "sInfoFiltered":   "(Filtrado de entradas _MAX_ en total)",
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
      .withOption('order', [0, 'desc'])
      .withPaginationType('full_numbers')
      .withOption('responsive', true)
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
      DTColumnBuilder.newColumn('id').notVisible(),
      DTColumnBuilder.newColumn(null).withTitle('Orden Solicitud').notSortable().renderWith(ordenHtml),
      DTColumnBuilder.newColumn(null).withTitle('Tipo').renderWith(tipoHtml),
      DTColumnBuilder.newColumn(null).withTitle(titleHtml).renderWith(origenHtml),
      DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
      DTColumnBuilder.newColumn(null).withTitle('Fecha de entrega').notSortable().renderWith(horaHtml),
      DTColumnBuilder.newColumn(null).withTitle('Hora Programada').renderWith(horaprogHtml),
      DTColumnBuilder.newColumn('motivo').withTitle('Observaciones'),
      DTColumnBuilder.newColumn(null).withTitle('Estado').notSortable().renderWith(estadoHtml),
      DTColumnBuilder.newColumn(null).withTitle('Detalle').notSortable().renderWith(actionsHtml)   
  ];

    $scope.user = '';

    if (CONFIG.CLIENTE == '') {

      $timeout(function() {
        var req = {
          method: 'GET',
          url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data.user);
          CONFIG.CLIENTE = response.data.user;
          $scope.user = response.data.user;
        }, function(){
          console.log('ha ocurrido un error');
        });
      }, 500);
    } else {
      $scope.user = CONFIG.CLIENTE;
    }

    function horaHtml(data, type, full, meta) {
      $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'HH:mm:ss');
      
      if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
        $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'dd/MM/yyyy HH:mm:ss');
      }
      if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
        $variable = $filter('date')(new Date(data.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
      } 
      if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
        if (data.destinos[0].fecha_destino != null) {
          $variable = $filter('date')(new Date(data.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
        }
      } 
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

    function ordenHtml(data, type, full, meta) {
      $variable = 'LIE000' + data.id;
      return $variable;
    }

    function origenHtml(data, type, full, meta) {
      var dest = data.destinos;

      dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if (data.tipo_usuario != 3) {
        if (dest[0].origen != 'undefined') {
          return dest[0].origen;
        } else { 
          return ' ';
        }
      }

      if (data.tipo_usuario == 3) {
        return dest[0].nombre_destino;
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

    function tipoHtml(data, type, full, meta) {
      var tipo = data.tipo;

      if (data.reprogramado > 0) {
        tipo = 'REPROGRAMADO';
      }
      return tipo;
    }

    function edit(person) {
      $scope.pedido = person;
      showTabDialog();
    };

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/detalle_pedido.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope) { 

      $scope.pedidos = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;

      $scope.destinos = $scope.pedidos.destinos;
      $scope.destinos.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if ($scope.pedidos.reprogramado > 0) {
        $scope.pedidos.tipo = 'REPROGRAMADO';
      }

      if ($scope.pedidos.tipo == 'PROGRAMADO') {
        $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
      }
      if ($scope.pedidos.tipo == 'REPROGRAMADO') {
        $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
      }
      if ($scope.pedidos.tipo == 'URGENTE') {
        $scope.pedidos.fecha1 = $filter('date')(new Date($scope.pedidos.fecha.replace(/-/g, "/")),'dd/MM/yyyy HH:mm:ss');
      }

      if ($scope.pedidos.estado == 0) {
        $scope.pedidos.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos.estado == 1) {
        $scope.pedidos.estado = 'SOLICITUD ENVIADA';
      }
      if ($scope.pedidos.estado == 2) {
        $scope.pedidos.estado = 'EN CAMINO';
      }
      if ($scope.pedidos.estado == 3) {
        $scope.pedidos.estado = 'FINALIZADO';
        $scope.pedidos.estado1 = 3;
      }
      if ($scope.pedidos.estado == 4) {
        $scope.pedidos.estado = 'ANULADO';
        $scope.pedidos.estado1 = 4;
      }

      if ($scope.pedidos.destinos[0].subtotal == 0) {
        $scope.pedidos.estado = 'RECHAZADO';
      }

      if ($scope.pedidos.forma_pago == 0) {
        $scope.pedidos.forma_pago = 'EFECTIVO';
      }
      if ($scope.pedidos.forma_pago == 1) {
        $scope.pedidos.forma_pago = 'TRANSFERENCIA';
      }
      if ($scope.pedidos.forma_pago == 2) {
        $scope.pedidos.forma_pago = 'POS VISA';
      }

      if ($scope.user.tipo_usuario == 3) {
        $scope.pedidos.fecha1 = $filter('date')(new Date($scope.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
        $scope.pedidos.fecha_origen1 = $filter('date')(new Date($scope.pedidos.fecha_origen.replace(/-/g, "/")),'dd/MM/yyyy');
        $scope.destinos[0].fecha_destino1 = $filter('date')(new Date($scope.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
      }

      $scope.pedidos.costo1 = parseFloat($scope.pedidos.costo);
      $scope.costo = parseFloat($scope.pedidos.costo) + parseFloat($scope.pedidos.costo_recojo);

      for (var i = 0; i < $scope.destinos.length; i++) {
        $scope.destinos[i].total = parseFloat($scope.destinos[i].subtotal) + parseFloat($scope.destinos[i].cobrarecommerce) - parseFloat($scope.destinos[i].descuento);
        $scope.destinos[i].costo = parseFloat($scope.pedidos.costo);
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
          }, 900);
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
      var duration=0;

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
                  duration=duration+response.routes[0].legs[i].duration.value;
                }
                for (var i = 0 ; i < $scope.pedidos.length ; i++) {
                  $scope.pedidos[i].min = parseInt(response.routes[0].legs[i+1].duration.value / 60);
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
    
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    };
    
    function estadoHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
        if (data.destinos[0].subtotal == 0) {
          return '<span style="color:#E53935">RECHAZADO</span>';
        }
        if (data.estado == 4) {
          return '<span style="color:#ff9800">ANULADO</span>';
        }
        if (data.estado == 3) {
          return '<span style="color:#4caf50">FINALIZADO</span>';
        }
    };

    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
          return '<a class="link_order" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
            '<i class="fa fa-search" aria-hidden="true"></i> Ver Pedido' +
            '</a>';
        
    };
})

.controller('borradorCtrl', function($scope,$cookieStore,$mdDialog,$sce,CONFIG,Facebook,userService,$location,$http) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
  }

  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 1500);

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }
  
  /*-----------------------------------*/
})

.controller('ListadoBorradorCtrl', function (userService,$scope, $compile, $filter, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog,$rootScope,$location){
    
  var req = {
    method: 'GET',
    url: '../api/public/api/pedido_con_productos?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $scope.user = '';
  var titleHtml = 'Origen';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
        if ($scope.user.tipo_usuario == 3) {
          titleHtml = 'Cliente Final';
        }
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
    if ($scope.user.tipo_usuario == 3) {
      titleHtml = 'Cliente Final';
    }
  }

    var vm = this;
    vm.edit = edit;
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
          console.log($scope.pedidos);
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.pedidos[i].estado == 5 && $scope.user.id == $scope.pedidos[i].destinos[0].user_id) {
              $scope.tracking.push($scope.pedidos[i]);
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
          "sEmptyTable":     "No hay pedidos guardados",
          "sInfo":           "Mostrando _START_ de _TOTAL_ entradas",
          "sInfoEmpty":      "Mostrando 0 de 0 entradas",
          "sInfoFiltered":   "(Filtrado de entradas _MAX_ en total)",
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
        .withOption('order', [0, 'desc'])
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Orden Solicitud').notSortable().renderWith(ordenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Tipo').notSortable().renderWith(tipoHtml),
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().renderWith(origenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
        DTColumnBuilder.newColumn(null).withTitle('Fecha de entrega').notSortable().renderWith(horaHtml),
        DTColumnBuilder.newColumn(null).withTitle('Hora Programada').renderWith(horaprogHtml),
        DTColumnBuilder.newColumn(null).withTitle('Iniciar servicio').notSortable().renderWith(actionsHtml)    
    ];

    $scope.user = '';

    if (CONFIG.CLIENTE == '') {

      $timeout(function() {
        var req = {
          method: 'GET',
          url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data.user);
          CONFIG.CLIENTE = response.data.user;
          $scope.user = response.data.user;
        }, function(){
          console.log('ha ocurrido un error');
        });
      }, 500);
    } else {
      $scope.user = CONFIG.CLIENTE;
    }

    function horaHtml(data, type, full, meta) {
      $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'HH:mm:ss');
      
      if ((((Date.parse(data.created_at)-Date.now())/60000)*(-1)).toFixed(0) > 720) {
        $variable = $filter('date')(new Date(data.created_at.replace(/-/g, "/")),'dd/MM/yyyy HH:mm:ss');
      }
      if (data.tipo == 'PROGRAMADO' && data.tipo_usuario != 3) {
        $variable = $filter('date')(new Date(data.fecha.replace(/-/g, "/")),'dd/MM/yyyy');
      } 
      if (data.tipo == 'PROGRAMADO' && data.tipo_usuario == 3) {
        $variable = $filter('date')(new Date(data.destinos[0].fecha_destino.replace(/-/g, "/")),'dd/MM/yyyy');
      } 
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

    function ordenHtml(data, type, full, meta) {
      $variable = 'LIE000' + data.id;
      return $variable;
    }

    function origenHtml(data, type, full, meta) {
      var dest = data.destinos;

      dest.sort(function(a, b){
        return a.n_marcador - b.n_marcador;
      });

      if (data.tipo_usuario != 3) {
        if (dest[0].origen != 'undefined') {
          return dest[0].origen;
        } else { 
          return ' ';
        }
      }

      if (data.tipo_usuario == 3) {
        return dest[0].nombre_destino;
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

    function tipoHtml(data, type, full, meta) {
      var tipo = data.tipo;

      if (data.reprogramado > 0) {
        tipo = 'REPROGRAMADO';
      }
      return tipo;
    }

    function edit(person) {
      console.log(person);
      $rootScope.ped= person;
      $location.path("/pedido_guardado");
    };
    
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    };
    
    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
          return '<a class="link_order" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
            'Iniciar servicio' +
            '</a>';
        
    };
})

.controller('perfilCtrl', function($scope,$cookieStore,$http,$sce,$q,userService,CONFIG,Upload,$mdDialog,Facebook,$timeout,$location) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';
  $scope.distritos = CONFIG.DISTRITOS;
  $scope.origen = '';

  if (CONFIG.CLIENTE == '') {
    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
  }

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 1500);

  $scope.tab = 1;

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };

  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  }; 

  $scope.ajusteDistrito=function(origen){
    origen.distrito_origen = origen.distrito.nombre;
    origen.zona_origen = origen.distrito.zona;
    console.log(origen.distrito_origen);
  }

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
        var mapDiv=document.getElementById('mapfav');
        
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
  $scope.$watch(
    function($scope) { 
        return $scope.origen.direccion 
    }, function() {
      //alert('entro watch');
        if(angular.isObject($scope.origen.direccion)){
          setTimeout(function() {
            $scope.ruta=[{}];
            $scope.consola();}, 2500);
        }
    });

  addMarker= function(ubicacion,i){
        var pin = ["images/0.png",
                   "images/1.png",
                   "images/15.png"
        ];
    //alert('entro marker');
      var marker= new google.maps.Marker({
        map: $scope.map,
        position: ubicacion,
        icon: pin[i],
        draggable: true
        //animation: google.maps.Animation.DROP
    })

    google.maps.event.addListener( marker, "dragend", function(event){
      var drag={
        lat:'',
        lng:''
      }
      console.log(marker.icon);
      if(marker.icon=="images/0.png"){
        drag.lat=marker.getPosition().lat();
        drag.lng=marker.getPosition().lng();

        geocoder.geocode({'location': drag}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {

            if (results[1]) {
              console.log(results);
              console.log(results[0].address_components[2].long_name);
              $scope.origen.direccion=results[0].formatted_address;                  
              $scope.origen.lat=drag.lat;
              $scope.origen.lng=drag.lng;

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
      /************************* FIN FUNCION MARCADORES **********************/    
   

    
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
        console.log($scope.origen);

        if(angular.isObject($scope.origen.direccion.geometry)){
          //console.log($scope.origen);
           $scope.origen.lat=$scope.origen.direccion.geometry.location.lat();
           $scope.origen.lng=$scope.origen.direccion.geometry.location.lng();
           $scope.origen.direccion=$scope.origen.direccion.formatted_address;
           //alert(JSON.stringify($scope.origen));
        }

        $scope.ruta.push({
            'lat':parseFloat($scope.origen.lat),
            'lng':parseFloat( $scope.origen.lng)
        });

        
        for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
        }
        $timeout(function() {
          console.log($scope.ruta);
  //          traceRoute($scope.ruta);
          for (var i = 1; i < $scope.ruta.length+1; i++) {
            addMarker($scope.ruta[i],i-1);
          }
        }, 200);
        $timeout(function() {
          $scope.ruta=[{}]; 
        }, 1400);
        
      };

  $scope.consola2=function(id){

    var miUbicacion= {
      lat:'',
      lng:''
    }

    if (id==0) {
      geocoder.geocode({'address': $scope.origen.direccion + 'lima Perú'}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            $scope.origen.lat=results[0].geometry.location.lat();
            $scope.origen.lng=results[0].geometry.location.lng();
            miUbicacion.lat= results[0].geometry.location.lat();
            miUbicacion.lng= results[0].geometry.location.lng();
            
            $scope.map.setCenter(miUbicacion);  
            addMarker(miUbicacion,0);

            setTimeout(function() {
               miUbicacion.lat= 0;
               miUbicacion.lng= 0;
            }, 100);
      } else {
          //alert('Geocode address was not successful for the following reason: ' + status);
          /*$mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Courier Liebre Express')
                .textContent('No se ha podido ubicar esta dirección en el mapa, por favor intente con una calle o avenida cercana y arrastre el marcador hasta la posición deseada.')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
            );
          $scope.origen.direccion='';*/
        }
      });

    }
  };

  $scope.agregar = function() {

    $scope.origen.user_id = CONFIG.CLIENTE.id;

    console.log($scope.origen);

    var req = {
      method: 'POST',
      url: '../api/public/api/favorito/store?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      },
      data: $scope.origen
    }

    $http(req).then(function(response){
      console.log(response);
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('La dirección favorita se agregó con éxito')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    }, function(){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Courier Liebre Express')
          .textContent('¡Ha ocurrido un error al agregar el favorito!')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    });
  }

  $scope.persona = true;
  $scope.empresa = false;
  
  if ($scope.user.tipo_usuario == 2 || $scope.user.tipo_usuario == 3) {
    $scope.persona = false;
    $scope.empresa = true;
  }

  $scope.imagenSubir = '';
  $scope.updateimage = false;
  $scope.image_url = ''

  $scope.changeImage=function(data){
    $scope.imagenSubir=data;
    $scope.updateimage = true;
  };

  $scope.usuario = {
    'name': $scope.user.name,
    'apellidos': $scope.user.apellidos,
    'email': $scope.user.email,
    'dni':  $scope.user.dni,
    'razon_social':  $scope.user.razon_social,
    'ruc':  $scope.user.ruc,
    'telefono':  $scope.user.telefono,
    'img': $scope.user.img
  }

  console.log($scope.user);

 var req = {
    method: 'PUT',
    url: '../api/public/api/update_user?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    },
    data: $scope.usuario      
  }

  var uploadPic = function(idC) {
    var file = $scope.imagenSubir;
    var name= idC;
    console.log(file);
    var key = 'file,'+idC;
    var obj = {};
    obj[key] = file;

    file.upload = Upload.upload({
      url: 'php/subirImagen.php',
      data: obj
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        $scope.usuario.img = file.result;
        
        $http(req).then(function(response){
          console.log(response);
          CONFIG.PICTURE = $scope.usuario.img + '?' + new Date().getTime();
          $scope.profile.picture = $scope.usuario.img + '?' + new Date().getTime();
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Liebre Courier Express')
              .textContent('¡Tus datos han sido actualizados exitosamente!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        }, function(){
          console.log('ha ocurrido un error');
        });

      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    })
  };

  $scope.actualizar = function() {
    $scope.usuario.name = $scope.user.name;
    $scope.usuario.apellidos = $scope.user.apellidos;
    $scope.usuario.email = $scope.user.email;
    $scope.usuario.dni = $scope.user.dni;
    $scope.usuario.ruc = $scope.user.ruc;
    $scope.usuario.razon_social = $scope.user.razon_social;
    $scope.usuario.telefono = $scope.user.telefono;
    CONFIG.NOMBRE =  $scope.user.name +' '+ $scope.user.apellidos;
    var id = CONFIG.ID;

    if ($scope.updateimage) {
      uploadPic(id);
    } else {
      console.log($scope.usuario);
      $http(req).then(function(response){
        console.log(response);
        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Liebre Courier Express')
              .textContent('¡Tus datos han sido actualizados exitosamente!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
      }, function(){
        console.log('ha ocurrido un error');
      });
    }
  }

    /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }
})

.controller('ListadoFavoritosCtrl', function (userService,$scope, $compile, $filter, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog,$rootScope,$location){
    
  $scope.favoritos = [];

  var requ = {
    method: 'GET',
    url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
    headers: {
     'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(requ).then(function(response){
    if (response.data != '') {
      $scope.favoritos=response.data.favoritos;
    }
    console.log(response);
  }, function(){
      console.log('No se ha podido obtener favoritos');
  });

    var getTableData = function() {      
      var deferred = $q.defer();
      $timeout(function() {
      deferred.resolve($scope.favoritos);
      }, 2500);
      return deferred.promise;
    };

    var vm = this;
    vm.edit = edit;
    vm.dtInstance = {};
    vm.persons = {};
    vm.reloadData = reloadData;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(getTableData)
        .withLanguage({
          "sEmptyTable":     "No hay direcciones favoritas registradas",
          "sInfo":           "Mostrando _START_ de _TOTAL_ entradas",
          "sInfoEmpty":      "Mostrando 0 de 0 entradas",
          "sInfoFiltered":   "(Filtrado de entradas _MAX_ en total)",
          "sInfoPostFix":    "",
          "sInfoThousands":  ",",
          "sLengthMenu":     "Mostrar _MENU_ entradas",
          "sLoadingRecords": "Cargando...",
          "sProcessing":     "Procesando...",
          "sSearch":         "Buscar Dirección:",
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
        .withOption('order', [0, 'desc'])
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('#'),
        DTColumnBuilder.newColumn('direccion').withTitle('Dirección'),
        DTColumnBuilder.newColumn('departamento').withTitle('Departamento'),
        DTColumnBuilder.newColumn('nombre').withTitle('Contacto'),
        DTColumnBuilder.newColumn('telefono').withTitle('Teléfono'),
        DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(actionsHtml)   
    ];

    $scope.user = '';

    if (CONFIG.CLIENTE == '') {

      $timeout(function() {
        var req = {
          method: 'GET',
          url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data.user);
          CONFIG.CLIENTE = response.data.user;
          $scope.user = response.data.user;
        }, function(){
          console.log('ha ocurrido un error');
        });
      }, 500);
    } else {
      $scope.user = CONFIG.CLIENTE;
    }

  function reloadData() {  
    var resetPaging = true;
    $scope.favoritos = [];

    var requ = {
      method: 'GET',
      url: '../api/public/api/favorito?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(requ).then(function(response){
      $scope.favoritos=response.data.favoritos;
      console.log(response);
    }, function(){
        console.log('No se ha podido obtener favoritos');
    });

    var getTableData = function() {      
      var deferred = $q.defer();
      $timeout(function() {
      deferred.resolve($scope.favoritos);
      }, 2500);
      return deferred.promise;
    };

    vm.dtInstance.reloadData(getTableData, resetPaging);
  }



    function edit(person) {
      console.log(person);
      var confirm = $mdDialog.confirm()
      .title('Courier Liebre Express')
      .textContent('¿Desea eliminar la dirección favorita?')
      .ariaLabel('Lucky day')
      .ok('SI')
      .cancel('NO');

    $mdDialog.show(confirm).then(function() {
      var req = {
        method: 'DELETE',
        url: '../api/public/api/favorito/'+ person.id+'?token='+userService.getCurrentToken(),
        headers: {
         'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        reloadData();
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('La dirección favorita ha sido eliminada con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }, function(){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express')
            .textContent('¡Ha ocurrido un error al eliminar el favorito!')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
    };
    
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    };
    
    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
          return '<a class="link_order" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</a>';
        
    };
})

.controller('liquidacionesCtrl', function($scope,CONFIG,$location,userService,$cookieStore,$sce,$location,Facebook){

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){
    Facebook.logout(function() {
      $scope.user   = {};
    });

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
    userService.logout();
    $location.path( "/login" );
  }
})

.controller('LiquidacionesTableCtrl', function (userService,$scope, $filter, $compile, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog, Excel){
    
  var req = {
    method: 'GET',
    url: '../api/public/api/liquidaciones/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

    var vm = this;
    vm.edit = edit;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      var defer = $q.defer();
      var count = 0;
      $scope.pedidos = [];
      $scope.tracking = [];

      $http(req).then(function(response){
        $scope.pedidos = response.data.liquidacions;
        console.log($scope.pedidos);
        if (response.data == '') {
          defer.resolve($scope.tracking);
        } else {
          for (var i = 0; i < $scope.pedidos.length; i++) {

            $scope.pedidos[i].adicionales = parseFloat($scope.pedidos[i].servicios_adicionales) + parseFloat($scope.pedidos[i].servicios_olva);
            if ($scope.pedidos[i].fecha_inicio != null) {
              var parts = $scope.pedidos[i].fecha_inicio.split("-");
              var parts2 = new Date(parts[0], parts[1] - 1, parts[2])
              $scope.pedidos[i].fecha_inicio1 = $filter('date')(new Date(parts2),'dd/MM/yyyy');
            } else { 
              $scope.pedidos[i].fecha_inicio1 = '';
            }
            $scope.tracking.push($scope.pedidos[i]);
            
            count = count + 1;
          }
        }
        if (count == $scope.pedidos.length) {
          defer.resolve($scope.tracking);
        }
      }, function(){
        console.log('ha ocurrido un error');
      });

      return defer.promise;
    })
    .withLanguage({
          "sEmptyTable":     "No hay Liquidaciones",
          "sInfo":           "Mostrando _START_ de _TOTAL_ entradas",
          "sInfoEmpty":      "Mostrando 0 de 0 entradas",
          "sInfoFiltered":   "(Filtrado de entradas _MAX_ en total)",
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
        .withOption('responsive', true)
        .withOption('order', [0, 'desc'])
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').notVisible(),
        DTColumnBuilder.newColumn(null).withTitle('Liquidación').notSortable().renderWith(ordenHtml),
        //DTColumnBuilder.newColumn(null).withTitle('Nombre').notSortable().renderWith(origenHtml),
        DTColumnBuilder.newColumn(null).withTitle('Fecha Envío').notSortable().renderWith(fecha_inicioHtml),
        DTColumnBuilder.newColumn(null).withTitle('Pedidos').notSortable().renderWith(pedidosHtml),
        DTColumnBuilder.newColumn(null).withTitle('Detalle').notSortable().renderWith(actionsHtml)   
    ];

    $scope.user = '';

    if (CONFIG.CLIENTE == '') {

      $timeout(function() {
        var req = {
          method: 'GET',
          url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req).then(function(response){
          console.log(response.data.user);
          CONFIG.CLIENTE = response.data.user;
          $scope.user = response.data.user;
        }, function(){
          console.log('ha ocurrido un error');
        });
      }, 500);
    } else {
      $scope.user = CONFIG.CLIENTE;
    }

    function fecha_inicioHtml(data, type, full, meta) {
      if (data.fecha_inicio != null) {
        var parts = data.fecha_inicio.split("-");
        var parts2 = new Date(parts[0], parts[1] - 1, parts[2]);
        $variable = $filter('date')(new Date(parts2),'dd/MM/yyyy');
        return $variable;
      } else {
        return ' ';
      }
      
    }

    function origenHtml(data, type, full, meta) {
      var dest = data.nombre_ecommerce;
      return dest;
    }

    function pedidosHtml(data, type, full, meta) {
      console.log(data);
      var orden = '';
      for (var i = 0; i < data.nordens.length; i++) {
        orden +=  ' LIE000'+ data.nordens[i].n_orden +','; 
      }
      return orden;
    }

    function edit(person) {
      console.log(person);
      $scope.pedido = person;
      showTabDialog();
    };

    var showTabDialog = function(ev) {
      $mdDialog.show({
        locals:{data: $scope.pedido}, 
        templateUrl: 'templates/reporte-liquidaciones.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose:true,                
        controller: mdDialogCtrl
      })
    };

    var mdDialogCtrl = function ($scope,data,$timeout,$rootScope,$filter,$mdDialog) { 

      $scope.tracking = data;
      $scope.destinos = [];
      $scope.cliente = CONFIG.CLIENTE;
      if ($scope.tracking.fecha_inicio != null) {
        var parts = $scope.tracking.fecha_inicio.split("-");
        var parts2 = new Date(parts[0], parts[1] - 1, parts[2]);
        $scope.tracking.fecha_inicio = $filter('date')(new Date(parts2),'dd/MM/yyyy');
      } else { 
        $scope.tracking.fecha_inicio = '';
      }
      
      $scope.tracking.totalcobrar = parseFloat($scope.tracking.efectivo) + parseFloat($scope.tracking.pos);
      $scope.tracking.totalcobrar = parseFloat($scope.tracking.totalcobrar).toFixed(2);
      $scope.tracking.total = (parseFloat($scope.tracking.totalcobrar) - parseFloat($scope.tracking.costo_total_servicios) - parseFloat($scope.tracking.costo_recojo) - parseFloat($scope.tracking.servicios_olva) - parseFloat($scope.tracking.servicios_adicionales)).toFixed(2);
      $scope.tracking.pendiente = parseFloat($scope.tracking.total_deposito_descuento_servicios) - parseFloat($scope.tracking.total);
      $scope.tracking.pendiente = parseFloat($scope.tracking.pendiente).toFixed(2);

      $scope.cancelar = function() {
        $mdDialog.hide();
      }

      $scope.imprimir = function(pedido) {  
        if(document.getElementById("reporte_liquidacion") != null){
          var pedidos = document.getElementById("reporte_liquidacion").innerHTML;  
        }  

        $timeout(function() {     
          var popupWinindow = window.open('', '_blank', 'height=600,width=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' +pedidos+' </body></html>');
          popupWinindow.document.close();
          }, 500);
      }

      $scope.exportToExcel=function(tableId){
        var exportHref=Excel.tableToExcel(tableId, 'REPORTE LIQUIDACION');
        var a = document.createElement('a');
        a.href = exportHref;
        a.download = $scope.tracking.fecha_inicio + '-LIQUIDACION.xls';
        a.click();
      }

    };
    
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    };

    function ordenHtml(data, type, full, meta) {
      $variable = 'LIQ000' + data.id;
      return $variable;
    }
    
    function estadoHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      if (data.estado == 0) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div></div>';
      }
      if (data.estado == 1) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div></div>';
      }
      if (data.estado == 2) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div><div class="progress-bar status_asignado"><md-tooltip md-direction="top">EN CAMINO</md-tooltip></div></div>';
     }
      if (data.estado == 3) {
        return '<div class="font_status"><span style="margin-left:14%"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip><i class="fa fa-clock-o" aria-hidden="true"></i></span><span style="margin-left:28%"><md-tooltip md-direction="top">EN CAMINO</md-tooltip><i class="fa fa-road" aria-hidden="true"></i></span><span style="margin-left:25%"><md-tooltip md-direction="top">FINALIZADO</md-tooltip><i class="fa fa-check" aria-hidden="true"></i></span></div><div class="progress"><div class="progress-bar status_confirmar"><md-tooltip md-direction="top">SOLICITUD ENVIADA</md-tooltip></div><div class="progress-bar status_asignado"><md-tooltip md-direction="top">EN CAMINO</md-tooltip></div><div class="progress-bar status_entregado"><md-tooltip md-direction="top">FINALIZADO</md-tooltip></div></div>';
      }
    };

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<a class="link_order" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
        '<i class="fa fa-search" aria-hidden="true"></i> Ver Detalle' +
        '</a>';
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

.controller('reprogramarCtrl', function($scope,$cookieStore,$sce,CONFIG,Facebook,userService,$location,$http) {

  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {

    $timeout(function() {
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+CONFIG.ID+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(){
        console.log('ha ocurrido un error');
      });
    }, 500);
  } else {
    $scope.user = CONFIG.CLIENTE;
  }
  /*------------- Menú --------------*/
  var mobileView = 992;

  $scope.getWidth = function() {
      return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
          if (angular.isDefined($cookieStore.get('toggle'))) {
              $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
          } else {
              $scope.toggle = false;
          }
      } else {
          $scope.toggle = false;
      }

  });

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/public/api/auth/getHour?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqHora).then(function(response){
      CONFIG.DATE = response.data;
    }, function(){
        console.log('ERROR HORA');
    });
  }, 1500);

  $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
      $scope.$apply();
  };

  $scope.cerrarS=function(){

    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
    userService.logout();
    $location.path( "/login" );
  }
  
  /*-----------------------------------*/
})

.controller('ListadoReprogramadoCtrl', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, $timeout,$location,$http,$q, $sce, $filter, CONFIG, userService,$mdDialog,$interval,$rootScope) {

  $scope.pedidos = [];
  $scope.tracking = [];
  $scope.user = CONFIG.CLIENTE;
  $scope.ctn = 0;

  var req = {
    method: 'GET',
    url: '../api/public/api/pedido_con_productos?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  setTimeout(function() {
    var reqcosto = {
      method: 'GET',
      url: '../api/public/api/costo?token='+userService.getCurrentToken(),
      headers: {
       'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(reqcosto).then(function(response){
      console.log(response.data.costos);
      CONFIG.COSTOS = response.data.costos;
      $scope.costos = response.data.costos;
    }, function(){
      console.log('error');
    });
  }, 300);

  var vm = this;
  vm.review = review;
  vm.reloadData = reloadData;
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
          console.log($scope.pedidos);
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if ($scope.user.id == $scope.pedidos[i].user_id && $scope.pedidos[i].estado != 3 && $scope.pedidos[i].estado != 4 && $scope.pedidos[i].estado_reprogramado == 1) {
              $scope.tracking.push($scope.pedidos[i]);
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
      .withOption('createdRow', createdRow);
  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').notVisible(),
    DTColumnBuilder.newColumn(null).withTitle('Orden Solicitud').notSortable().renderWith(ordenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Horario de recojo').renderWith(horaOrigenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Cliente Final').notSortable().renderWith(origenHtml),
    DTColumnBuilder.newColumn(null).withTitle('Destino').notSortable().renderWith(destinoHtml),
    DTColumnBuilder.newColumn(null).withTitle('Fecha de Entrega').renderWith(horaHtml),
    DTColumnBuilder.newColumn(null).withTitle('Hora Programada').renderWith(horaprogHtml),
    DTColumnBuilder.newColumn(null).withTitle('Forma Pago').notSortable().renderWith(formaHtml),
    DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)
  ];

  function reloadData() {  
    var resetPaging = true;
    vm.dtInstance.reloadData(null, resetPaging);
  }

  function review(pedido) {
    $scope.pedido = pedido;
    $scope.pedido.costo_mostrar1 = '';
    $scope.pedido.costo_mostrar2 = '';

    var req = {
      method: 'GET',
      url: '../api/public/api/get_users/'+pedido.user_id+'?token='+userService.getCurrentToken(),
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
        templateUrl: 'templates/detalle_reprogramar.html',
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

      $scope.selectHora=[{'hora':'09'},{'hora':'10'},{'hora':'11'},{'hora':'12'},{'hora':'13'},{'hora':'14'},{'hora':'15'},{'hora':'16'},{'hora':'17'},{'hora':'18'},{'hora':'19'}]; 
      $scope.date = CONFIG.DATE;
      var tomorrow2 = new Date($scope.date);
      var n = tomorrow2.getDay();
      if (n != 6) {
        tomorrow2.setDate(tomorrow2.getDate() + 1);
      } else {
        tomorrow2.setDate(tomorrow2.getDate() + 2);
      }
      $scope.minDate = tomorrow2;
      $scope.hora2 = '';

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
        $scope.myDate = new Date($scope.date);

        var d = new Date($scope.myDate).getDay();
        console.log(d);
        if (d == 6) {
          $scope.myDate.setDate($scope.myDate.getDate() + 2);
          $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
          $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
        } else {
          $scope.myDate.setDate($scope.myDate.getDate() + 1);
          $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
          $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];
        }
        $scope.diaPedido = $filter('date')(new Date($scope.myDate),'yyyy-MM-dd HH:mm:ss');
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
        var d = new Date(myDate).getDay();
        if (d == 6) {
          $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
          $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'}*/];
        } else {
          $scope.seleccionarHorario = [{'id': 0, 'horario':'Mañana'},{'id': 1,'horario':'Tarde'},{'id': 2,'horario':'Completo'}/*,{'id': 3,'horario':'2 Horas'}*/];
          $scope.seleccionarHorae = [{'ids': 0, 'value':0, 'hora':'09-14'},{'ids': 1, 'value':1, 'hora':'14-19'},{'ids': 2, 'value':2, 'hora':'09-19'}/*,{'ids': 3, 'value':3, 'hora':'09-11'},{'ids': 3, 'value':4, 'hora':'10-12'},{'ids': 3, 'value':5, 'hora':'11-13'},{'ids': 3, 'value':6, 'hora':'12-14'},{'ids': 3, 'value':7, 'hora':'13-15'},{'ids': 3, 'value':8, 'hora':'14-16'},{'ids': 3, 'value':9, 'hora':'15-17'},{'ids': 3, 'value':10, 'hora':'16-18'},{'ids': 3, 'value':11, 'hora':'17-19'}*/];
        }
        if ($scope.user.tipo_usuario != 3) {
          SwitchFuction($scope.horaPedido);
        }else{
          $scope.ajusteHora1($scope.horaPedido2);
          SwitchFuction1($scope.horaPedido3.value);
        }
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
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id+'?token='+userService.getCurrentToken(),
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
              url: '../api/public/api/update_destinos/' + destinos_id[i].id+'?token='+userService.getCurrentToken(),
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
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id+'?token='+userService.getCurrentToken(),
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
            url: '../api/public/api/reprogramados/store?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }
          

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/update_destinos/' + destinos_id[i].id+'?token='+userService.getCurrentToken(),
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

        if ($scope.horaPedido3 == '') {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Debe seleccionar el rango de entrega')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
          return true;
        }

        if ($scope.diaPedido == '' || $scope.diaPedido == null) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Courier Liebre Express | Administrativo')
              .textContent('Verifique la fecha de reprogramación')
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
            motivo: '',
            forma_pago: $scope.pedido.forma_pago,
            estado_reprogramado: 0,
            costo_reprogramacion: $scope.pedido.costor
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            estado_destino: 0,
            fecha_destino: $scope.diaPedido,
            turno_destino: $scope.horario_e,
            hora_destino: $scope.horaPedido
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/pedido/' + $scope.pedido.id+'?token='+userService.getCurrentToken(),
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
          $scope.info.motivo = '';
          $scope.info.costo = $scope.pedido.costo;
          $scope.info.forma_pago = $scope.pedido.forma_pago;
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
            url: '../api/public/api/reprogramados/store?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }

          for (var i = 0; i < destinos_id.length; i++) {
            var reqD = {
              method: 'PUT',
              url: '../api/public/api/destino/' + destinos_id[i].id+'?token='+userService.getCurrentToken(),
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
                            .title('Courier Liebre Express')
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
                        .title('Courier Liebre Express')
                        .textContent('Ha ocurrido un error al reprogramar el pedido')
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
                    .title('Courier Liebre Express')
                    .textContent('Ha ocurrido un error al reprogramar el pedido')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );
              });
          }
        } 
        else if ($scope.pedido.reprogramado == 1) {
          if (parseFloat($scope.pedido.costo) > parseFloat($scope.pedido.costo_reprogramacion)){
            $scope.pedido.costo_reprogramacion1 = 0; 
          } else {
            $scope.pedido.costo_reprogramacion1 = $scope.pedido.costo_reprogramacion - $scope.pedido.costo;
          }

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            cancelado: 0,
            tipo: 'PROGRAMADO',
            reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            motivo: $scope.motivo + ': ' + $scope.pedido.observacion,
            costo: $scope.pedido.costor,
            costo_reprogramacion: $scope.pedido.costo_reprogramacion1
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            fecha_destino: $scope.diaPedido,
            turno_destino: $scope.horario_e,
            hora_destino: $scope.horaPedido,
            estado_destino: 0,
            costo: $scope.pedido.costor
          }

          $scope.info.cancelado = 0;
          $scope.info.reprogramado = parseInt($scope.pedido.reprogramado) + 1;
          $scope.info.motivo = $scope.motivo + ': ' + $scope.pedido.observacion;
          $scope.info.costo = $scope.pedido.costor;
          $scope.info.costo_reprogramacion = $scope.pedido.costo_reprogramacion1;
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
            url: '../api/public/api/reprogramados/store?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/update_pedidos/' + $scope.pedido.id+'?token='+userService.getCurrentToken(),
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
              url: '../api/public/api/update_destinos/' + destinos_id[i].id+'?token='+userService.getCurrentToken(),
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
        else if ($scope.pedido.reprogramado > 1) {

          $scope.reprogramar_pedido = {
            fecha: $scope.diaPedido,
            estado: 0,
            cancelado: 0,
            tipo: 'PROGRAMADO',
            reprogramado: parseInt($scope.pedido.reprogramado) + 1,
            motivo: '',
            forma_pago: $scope.pedido.forma_pago,
            estado_reprogramado: 0,
            costo: $scope.pedido.costor,
            costo_reprogramacion: 0
          }

          /*$scope.estado_motorizado = {
            estado: 0
          }*/

          $scope.estado_destino = {
            fecha_destino: $scope.diaPedido,
            turno_destino: $scope.horario_e,
            hora_destino: $scope.horaPedido,
            estado_destino: 0,
            costo: $scope.pedido.costor
          }

          $scope.info.cancelado = 0;
          $scope.info.reprogramado = parseInt($scope.pedido.reprogramado) + 1;
          $scope.info.motivo = '';
          $scope.info.costo = $scope.pedido.costor;
          $scope.info.forma_pago = $scope.pedido.forma_pago;
          $scope.info.costo_reprogramacion = 0;
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
            url: '../api/public/api/reprogramados/store?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.reprogramados
          }
          
          var req = {
            method: 'PUT',
            url: '../api/public/api/pedido/' + $scope.pedido.id+'?token='+userService.getCurrentToken(),
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
              url: '../api/public/api/destino/' + destinos_id[i].id+'?token='+userService.getCurrentToken(),
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
                            .title('Courier Liebre Express')
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
                        .title('Courier Liebre Express')
                        .textContent('Ha ocurrido un error al reprogramar el pedido')
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
                  .title('Courier Liebre Express')
                  .textContent('Ha ocurrido un error al reprogramar el pedido')
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

  function formaHtml(data, type, full, meta) {
    if (data.forma_pago == 0) {
      return 'EFECTIVO';
    }
    if (data.forma_pago == 1) {
      return 'TRANSFERENCIA';
    } 
    if (data.forma_pago == 2) {
      return 'POS VISA';
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
      return '<div><button class="md-raised bottom_table md-button md-ink-ripple btn3 btn_yellow" style="min-width: 45px;color:#fff;" ng-click="showCase.review(showCase.persons[' + data.id + '])">' +
      '   <md-tooltip md-direction="top">Reprogramar Pedido</md-tooltip><i class="fa fa-refresh" aria-hidden="true"></i>' +
      '</button></div>' ;
  }
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

.directive('loadingwait', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="pull-right" style="margin-top: 3px;"><img src="images/spina.svg" width="30" height="30"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loadingwait', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
})

.directive('loadingwait2', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="pull-right" style="margin-top: 3px;margin-right:5px;"><img src="images/spina.svg" width="30" height="30"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loadingwait2', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
})

.directive('loadingwait3', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="pull-right" style="margin-top: 3px;"><img src="images/spina.svg" width="30" height="30"/></div>',
    link: function (scope, element, attr) {
          scope.$watch('loadingwait3', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
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

.directive('decimalPlaces',function(){
  return {
    link:function(scope,ele,attrs){
        ele.bind('keypress',function(e){
            var newVal=$(this).val()+(e.charCode!==0?String.fromCharCode(e.charCode):'');
            if($(this).val().search(/(.*)\.[0-9][0-9]/)===0 && newVal.length>$(this).val().length){
                e.preventDefault();
            }
        });
    }
  }
})

.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
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

