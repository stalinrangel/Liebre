angular.module('starter.controllers', [])

.constant('PUSH', {
       SINLOGIN: 'sss'
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


.directive('myDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
                //console.log('value changed, new value is: ' + v);
              
            });
        }
    };
})
.controller('devolucionesCtrl', function($scope,userService,$http,$mdDialog){
  var req = {
        method: 'GET',
        url: '../api/public/api/productos_pedido2?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.productos_pedidos);
        $scope.productos=response.data.productos_pedidos;
      }, function(){
        //alert('ha ocurrido un error');
      });

      $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Advertencia')
              .textContent('¿Esta seguro de querer realizar esta acción?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('SI')
              .cancel('NO');

        $mdDialog.show(confirm).then(function() {
          $scope.status = 'You decided to get rid of your debt.';
          console.log('si');
        }, function() {
          $scope.status = 'You decided to keep your debt.';
          console.log('no');
        });
      };
})
.controller('indexCtrl', function($scope,PUSH){
  $scope.banderaPush=PUSH.SINLOGIN;

  $scope.change=function(variables){
    //alert('$scope.banderaPush '+ variables);
    console.log($scope.banderaPush);
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


  /*var OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
      appId: "6b319f69-bd12-4450-9cd7-36fcd6399adb",
      autoRegister: true, /* Set to true to automatically prompt visitors */
      //subdomainName: 'https://liebreexpress.os.tc',
      //subdomainName: 'kensetsuingenieros.onesignal.com',
      /*
      subdomainName: Use the value you entered in step 1.4: http://imgur.com/a/f6hqN
      */
      /*httpPermissionRequest: {
        enable: true,
        modalTitle: 'Liebre Courier Express',
        modalMessage: 'Gracias por suscribirse a las notificaciones!',
        modalButtonText:'OK'

      },
      welcomeNotification:{
        //disable:true
         "title": "Liebre Courier Express",
        "message": "Gracias por suscribirse a las notificaciones!"
      },
      notifyButton: {
          enable: false /* Set to false to hide */
      //}
    //}]);

    /*OneSignal.push(function() {
      /* These examples are all valid */
      //OneSignal.getUserId(function(userId) {
        //console.log("OneSignal User ID:", userId);
        //PUSH.SINLOGIN='4444';

        //document.getElementById("peso_campo_1").value = "userId";
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
      /*});
                   
      OneSignal.getUserId().then(function(userId) {
        console.log("OneSignal User ID:", userId);
        if(userId == null){
          console.log('entro');
        //OneSignal.registerForPushNotifications();
        //OneSignal.setSubscription(true); 
         OneSignal.registerForPushNotifications({
                modalPrompt: true
            });
      }
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
      });

      OneSignal.on('notificationDisplay', function (event) {
      //alert('OneSignal notification displayed:');
      console.log(event);
      console.log(event.data.foo);
      //$scope.banderaPush = "mensaje";
      angular.element(document.getElementById('indexController')).scope().change('hola');
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
      /*});
    });*/
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

.controller('loginCtrl', function($scope, $remember,$mdDialog, $mdToast, $http, $q, $sce, CONFIG, $location,userService,Upload,$timeout,localStorageService) {

  $scope.user = {
    username: '',
    password: ''
  }

  $scope.remember = false;
        if ($remember('username') && $remember('password') ) {
            $scope.remember = true;
            $scope.user.username = $remember('username');
            $scope.user.password = $remember('password');
        }
        $scope.rememberMe = function() {
            if ($scope.remember) {
                $remember('username', $scope.user.username);
                $remember('password', $scope.user.password);
            } else {
                $remember('username', '');
                $remember('password', '');
            }
        };



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
          'foto':'images/user.png',
          'img':'images/user.png',
          'foto_moto': 'images/user.png',
          'activo': '1',
          'carnet':'',
          'antecedente': '',
          'soat': '',
          'revision': ''
        }

        $scope.signup_check = function(){
          $scope.check_email=false;
          var bienvenido = {
             method: 'POST',
             url: '../api/public/api/auth/signup_check?token='+userService.getCurrentToken(),
             headers: {
               'Authorization' : 'Bearer ' + userService.getCurrentToken()
             },
             data: $scope.motorizado
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
          url: '../api/public/api/auth/signup_motorizado?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.motorizado
        }


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
                $scope.veh = '';
                $scope.con = '';
                $scope.lic = '';
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
            url: '../api/public/api/update_moto_admin/'+ idC+'?token='+userService.getCurrentToken(),
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

        $scope.imagenConductor = '';
        $scope.imagenVehiculo = '';
        $scope.imagenLicencia = '';
        $scope.imagenAntecedente = '';
        $scope.imagenSoat = '';
        $scope.imagenRevision = '';
        $scope.updatearchivo = false;
        var conductor='';
        var vehiculo = '';
        var licencia='';
        var antecedente = '';
        var soat = '';
        var revision = '';
        $scope.antd = 0;
        $scope.soa = 0;

        $scope.changeConductor=function(data){
          $scope.imagenConductor=data;
          $scope.loading = true;
          conductor = new Date().getTime();
          uploadTemp(conductor, data, 6);
        };
        $scope.changeVehiculo=function(data){
          $scope.imagenVehiculo=data;
          $scope.loading = true;
          vehiculo = new Date().getTime();
          uploadTemp(vehiculo, data, 5);
        };

        $scope.changeLicencia=function(data){
          $scope.imagenLicencia=data;
          $scope.loading = true;
          licencia = new Date().getTime();
          uploadTemp(licencia, data, 1);
        };

        $scope.changeAntecedente=function(data){
          $scope.imagenAntecedente=data;
          $scope.loading = true;
          antecedente = new Date().getTime();
          uploadTemp(antecedente, data, 2);
        };

        $scope.changeSoat=function(data){
          $scope.imagenSoat = data;
          $scope.loading = true;
          soat = new Date().getTime();
          uploadTemp(soat, data, 3);
        };

        $scope.changeRevision=function(data){
          $scope.imagenRevision = data;
          $scope.loading = true;
          revision = new Date().getTime();
          uploadTemp(revision, data, 4);
        };
        $scope.deleteVehiculo=function(data){
          $scope.imagenVehiculo = '';
          $scope.motorizado.vehiculo = '';
          $scope.veh = '';
          $scope.loading = false;
          vehiculo = '';
        };
        $scope.deleteConductor=function(data){
          $scope.imagenConductor = '';
          $scope.motorizado.conductor = '';
          $scope.con = '';
          $scope.loading = false;
          conductor = '';
        };
        $scope.deleteLicencia=function(data){
          $scope.imagenLicencia = '';
          $scope.motorizado.licencia = '';
          $scope.lic = '';
          $scope.loading = false;
          licencia = '';
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
                $scope.lic = file.result;
              } else if (i == 2) {
                $scope.ant = file.result;
              } else if (i == 3) {
                $scope.st = file.result;
              } else if (i == 4) {
                $scope.rv = file.result;
              } else if (i == 5) {
                $scope.veh = file.result;
              } else if (i == 6) {
                $scope.con = file.result;
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

        var uploadVehiculo = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirVehiculo.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.foto_moto = file.result;
              //$scope.setTab(3);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };
        
        var uploadConductor = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirConductor.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.foto = file.result;
              //$scope.setTab(3);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };
        
        var uploadLicencia = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          file.upload = Upload.upload({
            url: 'php/subirLicencia.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.motorizado.carnet = file.result;
              //$scope.setTab(3);    
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
              //$scope.setTab(3);    
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
              //$scope.setTab(4);    
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
            url: '../api/public/api/auth/signup_motorizado?token='+userService.getCurrentToken(),
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
                  if (response.data.status=='ok') {

                    $scope.conductor=undefined;
                    $scope.vehiculo=undefined;
                    $scope.licencia=undefined;
                    $scope.antecedente=undefined;
                    $scope.soat=undefined;
                    $scope.imagenSoat=undefined;
                    $scope.revision=undefined;

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
                    $scope.lic = '';
                    $scope.ant = '';
                    $scope.st = '';
                    $scope.rv = '';

                  }else if (response.data.status=='Usuario ya registrado') {

                    $scope.conductor=undefined;
                    $scope.vehiculo=undefined;
                    $scope.licencia=undefined;
                    $scope.antecedente=undefined;
                    $scope.soat=undefined;
                    $scope.imagenSoat=undefined;
                    $scope.revision=undefined;

                    $mdDialog.hide();
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Courier Liebre Express | Administrativo')
                        .textContent('Usuario ya registrado')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    )
                    $rootScope.$emit("ActualizarTabla", {});
                    $scope.lic = '';
                    $scope.ant = '';
                    $scope.st = '';
                    $scope.rv = '';
                  }
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

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
          sanitizePosition();

          return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };

        function sanitizePosition() {
          var current = $scope.toastPosition;

          if ( current.bottom && last.top ) current.top = false;
          if ( current.top && last.bottom ) current.bottom = false;
          if ( current.right && last.left ) current.left = false;
          if ( current.left && last.right ) current.right = false;

          last = angular.extend({},current);
        }

        $scope.siguiente1=function(){
          console.log($scope.motorizado);
          if ($scope.motorizado.name == '' || $scope.motorizado.apellidos == '' || $scope.motorizado.dni == '' || $scope.motorizado.email == '' || $scope.motorizado.telefono == '' || $scope.motorizado.password == '')  {
                //alert('Complete los campos');
                var pinTo = $scope.getToastPosition();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Complete los campos')
                    .position(pinTo )
                    .hideDelay(3000)
                );

          }
          else{
          
            var req2 = {
                   method: 'POST',
                   url: '../api/public/api/auth/signup_check',
                  data: $scope.motorizado
            }

            $http(req2).then(function(response){
              console.log(response);     

              if (response.data.status=='ok') {

                if ($scope.motorizado.password != $scope.motorizado.rpassword) {
                    //alert('Las contraseñas no coinciden');
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Las contraseñas no coinciden')
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                  if ($scope.motorizado.name == '' || $scope.motorizado.apellidos == '' || $scope.motorizado.dni == '' || $scope.motorizado.email == '' || $scope.motorizado.telefono == '' || $scope.motorizado.password == '')  {
                    //alert('Complete los campos');
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Complete los campos')
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                  }
                  else{
                    $scope.setTab(2);
                  }
                }

                

              }else if (response.data.status=='Usuario ya registrado') {
                //alert('Usuario ya registrado');
                var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Usuario ya registrado')
                        .position(pinTo )
                        .hideDelay(3000)
                    );
              } 

            },function(response){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Ha ocurrido un error al momento de validad el Email')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }) 
          }
        };

        $scope.agregar2 = function(data1,data2){
          console.log(data1);
          console.log(data2);
          console.log($scope.motorizado);
          
          if($scope.motorizado.tipo_auto =='' || $scope.motorizado.modelo_moto =='' ||  $scope.motorizado.ano =='' || $scope.motorizado.placa =='' || data2 ==undefined || data1 ==undefined){
            //alert('Complete los campos');
            var pinTo = $scope.getToastPosition();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Complete los campos')
                    .position(pinTo )
                    .hideDelay(3000)
                );
          }else{
            console.log(data1);
            console.log(data2);
            uploadVehiculo(vehiculo,data2);
            uploadConductor(conductor,data1);
            $scope.setTab(3); 

            console.log('entro2');
          }
        };

        $scope.agregar3 = function(data){
          console.log(data);
          if (data != '') {
            uploadLicencia(licencia,data);
            $scope.setTab(4); 
            //$scope.antd = 1;
            console.log('entro3');
          } else {
            $scope.setTab(4); 
            console.log('else3');
          }
        };

        $scope.agregar4 = function(data){
          console.log(data);
          if (data != '') {
            console.log(data);
            uploadAntecedente(antecedente,data);
            $scope.setTab(5); 
            $scope.antd = 1;
            console.log('entro4');
          } else {
            $scope.setTab(5);
            console.log('else4'); 
          }
        };

        $scope.agregar5 = function(data){
          console.log(data);
          if (data != '' && $scope.soa == 0) {
            uploadSoat(soat,data);
            $scope.setTab(6); 
            $scope.soa = 1;
            console.log('entro5');
          } else {
            $scope.setTab(6); 
            console.log('else5');
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

        $scope.atras5 = function() {
          $scope.setTab(4);
        }

        $scope.atras6 = function() {
          $scope.setTab(5);
        }
        $scope.cancel = function() {
          $mdDialog.hide();
        }

        $scope.update = function() {
          //alert('asdasd');
          console.log($scope.motorizado);

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup_motorizado?token='+userService.getCurrentToken(),
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
                 //alert('a');
                var bienvenido = {
                       method: 'POST',
                       url: '../api/public/api/auth/bienvenido/'+$scope.motorizado.email+'?token='+userService.getCurrentToken(),
                       headers: {
                         'Authorization' : 'Bearer ' + userService.getCurrentToken()
                       },
                       data: $scope.motorizado
                      }

                      $http(bienvenido).then(function(response){
                        console.log('correo si');
                        //alert('b');
                        //envio correo
                      }, function(){
                        console.log('correo no');
                      });
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


  

  $scope.login = function(){
    userService.login(
            $scope.user.username, $scope.user.password,
            function(response){
              if (response.data.user.tipo_usuario==4) {
                CONFIG.ROL_CURRENT_USER=1;
                $location.path( "/home" );

                var req = {
                  method: 'POST',
                  url: '../api/public/api/pedido?token='+userService.getCurrentToken(),
                  headers: {
                   'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.enviarPedido
                }

                $http(req).then(function(response){
                  CONFIG.NOMBRE = response.data.user.name+ ' ' + response.data.user.apellidos;
                  CONFIG.ID = response.data.user.id;
                  localStorageService.set('idLiebre', response.data.user.id);
                  CONFIG.PICTURE = response.data.user.img + '?' + new Date().getTime();
                  CONFIG.ROL_CURRENT_USER=1;
                }, function(){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Courier Liebre Express')
                      .textContent('Ha ocurrido un error al obtener los datos del motorizado')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('OK')
                  );
                });
              } else {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Usuario no permitido')
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
                  .textContent('Por favor, verifique el usuario o contraseña')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
        );
  }

  $scope.users = {};
  
  
  
  var userIsConnected = false;
    

    
  $scope.IntentLogin = function() {
    //if(!userIsConnected) {
      $scope.loginFace();
    //} else {
     // $window.location.href = 'pedidos.html';
    //}
  };

  $scope.loginFace = function() {
  
  };
     
  $scope.me = function() {
   
      $scope.users.email = response.email;
      $scope.users.name = response.first_name;
      $scope.users.apellidos = response.last_name;
      $scope.users.password = response.id;
      $scope.users.tipo_registrado = 'WEB';
      $scope.users.tipo_usuario = 1;
      $scope.users.picture = response.picture.data.url;
      CONFIG.PICTURE = response.picture.data.url;
      console.log($scope.users);

  };

  $scope.registro = function() {
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
      tipo_usuario:''
    };

    $scope.guardar = function(tipo_registrado) {
      
      $scope.registro.tipo_usuario=tipo_registrado;
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
                  .textContent('Motorizado registrado con éxito')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
                $location.path('/');
            },
            function(response){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Courier Liebre Express')
                  .textContent('Ha ocurrido un error, por favor intente mas tarde')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('OK')
              );
            }
        );
    };
  };   
})

.controller('passwordCtrl', function($scope,$http,$mdDialog){
  $scope.email={
    email: 'e.rangeld@hotmail.com',
    estado: 0
  };

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
      console.log($scope.email);
      var req = {
           method: 'POST',
           url: '../api/public/api/auth/password?token='+userService.getCurrentToken(),
           headers: {
             //'Authorization' : 'Bearer ' + userService.getCurrentToken()
           },
           data: $scope.email
        }

        $http(req).then(function(response){
          console.log(response);
          $scope.email.id= response.data.id;
          console.log($scope.email.id);
          console.log($scope.email.email);
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
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Revise su correo electrónico para reestarurar la contraseña')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                );  
              },function(response){
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Courier Liebre Express')
                    .textContent('Ha ocurrido un error al enviar el correo de restauración a su dirección de correo electrónico')
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
              .textContent('Correo o Usuario no registrado')
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
  console.log($scope.id);

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
                    .textContent('Ha ocurrido un error al momento de obtener los datos para validad el usuario y reestaurar la contraseña')
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
                    .textContent('Su contraseña se ha reestaurado con éxito')
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

.controller('ListadoPedidosCtrl', function (userService,$scope, $filter, $compile, DTOptionsBuilder, DTColumnBuilder,$http,$sce,$q,$timeout,$rootScope, CONFIG, $mdDialog){
})

.controller('homeCtrl', function (userService, $scope, $filter, CONFIG, $http, $mdDialog){

  var OneSignal = window.OneSignal || [];

    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        console.log("OneSignal User ID:", userId);
        console.log(CONFIG.ID);
        $scope.push={
          push: userId
        };
        setTimeout(function() {
        console.log(CONFIG.ID);
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
      }, 1000); 
        
      });
    });
})

.controller('trackingCtrl', function($scope,localStorageService,$mdDialog,$window,$cookieStore,$sce,CONFIG,userService,$location,$http,$timeout) {

  $scope.loading = true;

  var OneSignal = window.OneSignal || [];

    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        console.log("OneSignal User ID:", userId);
        console.log(CONFIG.ID);
        $scope.push={
          push: userId
        };
        setTimeout(function() {
        console.log(CONFIG.ID);
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
      }, 1000); 
        
      });
    });

  /*$scope.var="Av Guillermo Dansey 1097, Distrito de Lima 15082, Perú";
  $scope.distritos=JSON.parse('{"distritos":[{"id":1,"distrito":"CERCADO DE LIMA- Li","distritoscodigos":[{"id":1,"codigo":15001,"distrito_id":1},{"id":2,"codigo":15003,"distrito_id":1},{"id":3,"codigo":15004,"distrito_id":1},{"id":4,"codigo":15006,"distrito_id":1},{"id":5,"codigo":15018,"distrito_id":1},{"id":6,"codigo":15046,"distrito_id":1},{"id":7,"codigo":15079,"distrito_id":1},{"id":8,"codigo":15081,"distrito_id":1},{"id":9,"codigo":15082,"distrito_id":1},{"id":10,"codigo":15083,"distrito_id":1},{"id":11,"codigo":15088,"distrito_id":1}]},{"id":2,"distrito":"ANC\u00d3N- Lima 02","distritoscodigos":[{"id":12,"codigo":15123,"distrito_id":2}]},{"id":3,"distrito":"ATE VITARTE- Lima 0","distritoscodigos":[{"id":13,"codigo":15022,"distrito_id":3},{"id":14,"codigo":15026,"distrito_id":3},{"id":15,"codigo":15483,"distrito_id":3}]},{"id":4,"distrito":"BARRANCO- Lima 04","distritoscodigos":[{"id":16,"codigo":15063,"distrito_id":4}]},{"id":5,"distrito":"BRE\u00d1A- Lima 05","distritoscodigos":[{"id":17,"codigo":15082,"distrito_id":5},{"id":18,"codigo":15083,"distrito_id":5}]},{"id":6,"distrito":"CARABAYLLO- Lima 06","distritoscodigos":[{"id":19,"codigo":15121,"distrito_id":6}]},{"id":7,"distrito":"CIENEGUILLA- Lima 4","distritoscodigos":[{"id":20,"codigo":15593,"distrito_id":7},{"id":21,"codigo":15594,"distrito_id":7}]},{"id":8,"distrito":"COMAS- Lima 07","distritoscodigos":[{"id":22,"codigo":15324,"distrito_id":8}]},{"id":9,"distrito":"CHACLACAYO- Lima 08","distritoscodigos":[{"id":23,"codigo":15472,"distrito_id":9}]},{"id":10,"distrito":"CHORRILLOS- Lima 09","distritoscodigos":[{"id":24,"codigo":15056,"distrito_id":10},{"id":25,"codigo":15063,"distrito_id":10},{"id":26,"codigo":15067,"distrito_id":10}]},{"id":11,"distrito":"EL AGUSTINO- Lima 1","distritoscodigos":[{"id":27,"codigo":15003,"distrito_id":11},{"id":28,"codigo":15004,"distrito_id":11}]},{"id":12,"distrito":"INDEPENDENCIA- Lima","distritoscodigos":[{"id":29,"codigo":15311,"distrito_id":12},{"id":30,"codigo":15332,"distrito_id":12},{"id":31,"codigo":15333,"distrito_id":12}]},{"id":13,"distrito":"JES\u00daS MAR\u00cdA- Lima 1","distritoscodigos":[{"id":32,"codigo":15072,"distrito_id":13},{"id":33,"codigo":15076,"distrito_id":13}]},{"id":14,"distrito":"LA MOLINA- Lima 12","distritoscodigos":[{"id":34,"codigo":15023,"distrito_id":14},{"id":35,"codigo":15026,"distrito_id":14}]},{"id":15,"distrito":"LA VICTORIA- Lima 1","distritoscodigos":[{"id":36,"codigo":15018,"distrito_id":15},{"id":37,"codigo":15019,"distrito_id":15},{"id":38,"codigo":15033,"distrito_id":15}]},{"id":16,"distrito":"LINCE- Lima 14","distritoscodigos":[{"id":39,"codigo":15046,"distrito_id":16},{"id":40,"codigo":15073,"distrito_id":16}]},{"id":17,"distrito":"LOS OLIVOS- Lima 39","distritoscodigos":[{"id":41,"codigo":15302,"distrito_id":17},{"id":42,"codigo":15304,"distrito_id":17},{"id":43,"codigo":15306,"distrito_id":17},{"id":44,"codigo":15307,"distrito_id":17},{"id":45,"codigo":15311,"distrito_id":17},{"id":46,"codigo":15314,"distrito_id":17}]},{"id":18,"distrito":"LURIGANCHO (CHOSICA","distritoscodigos":[{"id":47,"codigo":15457,"distrito_id":18},{"id":48,"codigo":15461,"distrito_id":18},{"id":49,"codigo":15468,"distrito_id":18},{"id":50,"codigo":15472,"distrito_id":18}]},{"id":19,"distrito":"LUR\u00cdN- Lima 16","distritoscodigos":[{"id":51,"codigo":15841,"distrito_id":19},{"id":52,"codigo":15842,"distrito_id":19}]},{"id":20,"distrito":"MAGDALENA DEL MAR- ","distritoscodigos":[{"id":53,"codigo":15076,"distrito_id":20},{"id":54,"codigo":15086,"distrito_id":20}]},{"id":21,"distrito":"MIRAFLORES- Lima 18","distritoscodigos":[{"id":55,"codigo":15046,"distrito_id":21},{"id":56,"codigo":15048,"distrito_id":21},{"id":57,"codigo":15074,"distrito_id":21}]},{"id":22,"distrito":"PACHAC\u00c1MAC- Lima 19","distritoscodigos":[{"id":58,"codigo":15594,"distrito_id":22}]},{"id":23,"distrito":"PUCUSANA- Lima 20","distritoscodigos":[{"id":59,"codigo":15865,"distrito_id":23},{"id":60,"codigo":15866,"distrito_id":23}]},{"id":24,"distrito":"PUEBLO LIBRE- Lima ","distritoscodigos":[{"id":61,"codigo":15084,"distrito_id":24},{"id":62,"codigo":15086,"distrito_id":24}]},{"id":25,"distrito":"PUENTE PIEDRA- Lima","distritoscodigos":[{"id":63,"codigo":15117,"distrito_id":25},{"id":64,"codigo":15121,"distrito_id":25},{"id":65,"codigo":15122,"distrito_id":25}]},{"id":26,"distrito":"PUNTA NEGRA- Lima 2","distritoscodigos":[{"id":66,"codigo":15851,"distrito_id":26}]},{"id":27,"distrito":"PUNTA HERMOSA- Lima","distritoscodigos":[{"id":67,"codigo":15845,"distrito_id":27},{"id":68,"codigo":15846,"distrito_id":27}]},{"id":28,"distrito":"RICARDO PALMA (HUAR","distritoscodigos":[{"id":69,"codigo":15536,"distrito_id":28},{"id":70,"codigo":15537,"distrito_id":28}]},{"id":29,"distrito":"R\u00cdMAC- Lima 25","distritoscodigos":[{"id":71,"codigo":15093,"distrito_id":29},{"id":72,"codigo":15094,"distrito_id":29},{"id":73,"codigo":15096,"distrito_id":29},{"id":74,"codigo":15333,"distrito_id":29}]},{"id":30,"distrito":"SAN BARTOLO- Lima 2","distritoscodigos":[{"id":75,"codigo":15855,"distrito_id":30},{"id":76,"codigo":15856,"distrito_id":30}]},{"id":31,"distrito":"SAN BORJA- Lima 41","distritoscodigos":[{"id":77,"codigo":15021,"distrito_id":31},{"id":78,"codigo":15034,"distrito_id":31},{"id":79,"codigo":15036,"distrito_id":31},{"id":80,"codigo":15037,"distrito_id":31}]},{"id":32,"distrito":"SAN ISIDRO- Lima 27","distritoscodigos":[{"id":81,"codigo":15036,"distrito_id":32},{"id":82,"codigo":15046,"distrito_id":32},{"id":83,"codigo":15047,"distrito_id":32},{"id":84,"codigo":15073,"distrito_id":32},{"id":85,"codigo":15076,"distrito_id":32}]},{"id":33,"distrito":"SAN JUAN DE LURIGAN","distritoscodigos":[{"id":86,"codigo":15401,"distrito_id":33},{"id":87,"codigo":15404,"distrito_id":33},{"id":88,"codigo":15408,"distrito_id":33},{"id":89,"codigo":15412,"distrito_id":33},{"id":90,"codigo":15416,"distrito_id":33},{"id":91,"codigo":15419,"distrito_id":33},{"id":92,"codigo":15423,"distrito_id":33},{"id":93,"codigo":15427,"distrito_id":33},{"id":94,"codigo":15431,"distrito_id":33},{"id":95,"codigo":15434,"distrito_id":33},{"id":96,"codigo":15438,"distrito_id":33},{"id":97,"codigo":15442,"distrito_id":33},{"id":98,"codigo":15446,"distrito_id":33},{"id":99,"codigo":15449,"distrito_id":33},{"id":100,"codigo":15453,"distrito_id":33},{"id":101,"codigo":15457,"distrito_id":33}]},{"id":34,"distrito":"SAN JUAN DE MIRAFLO","distritoscodigos":[{"id":102,"codigo":15801,"distrito_id":34},{"id":103,"codigo":15803,"distrito_id":34},{"id":104,"codigo":15804,"distrito_id":34},{"id":105,"codigo":15806,"distrito_id":34},{"id":106,"codigo":15824,"distrito_id":34},{"id":107,"codigo":15828,"distrito_id":34},{"id":108,"codigo":15842,"distrito_id":34}]},{"id":35,"distrito":"SAN LUIS- Lima 30","distritoscodigos":[{"id":109,"codigo":15019,"distrito_id":35},{"id":110,"codigo":15021,"distrito_id":35},{"id":111,"codigo":15022,"distrito_id":35}]},{"id":36,"distrito":"SAN MART?N DE PORRE","distritoscodigos":[{"id":112,"codigo":15102,"distrito_id":36},{"id":113,"codigo":15103,"distrito_id":36},{"id":114,"codigo":15107,"distrito_id":36},{"id":115,"codigo":15108,"distrito_id":36},{"id":116,"codigo":15109,"distrito_id":36},{"id":117,"codigo":15112,"distrito_id":36},{"id":118,"codigo":15113,"distrito_id":36}]},{"id":37,"distrito":"SAN MIGUEL- Lima 32","distritoscodigos":[{"id":119,"codigo":15086,"distrito_id":37},{"id":120,"codigo":15087,"distrito_id":37},{"id":121,"codigo":15088,"distrito_id":37}]},{"id":38,"distrito":"SANTA ANITA- Lima 4","distritoscodigos":[{"id":122,"codigo":15007,"distrito_id":38},{"id":123,"codigo":15008,"distrito_id":38},{"id":124,"codigo":15009,"distrito_id":38},{"id":125,"codigo":15011,"distrito_id":38}]},{"id":39,"distrito":"SANTA EULALIA (HUAR","distritoscodigos":[{"id":126,"codigo":15500,"distrito_id":39},{"id":127,"codigo":15501,"distrito_id":39}]},{"id":40,"distrito":"SANTA MAR?A DEL MAR","distritoscodigos":[{"id":128,"codigo":15861,"distrito_id":40}]},{"id":41,"distrito":"SANTA ROSA- Lima 38","distritoscodigos":[{"id":129,"codigo":15123,"distrito_id":41}]},{"id":42,"distrito":"SANTIAGO DE SURCO- ","distritoscodigos":[{"id":130,"codigo":15023,"distrito_id":42},{"id":131,"codigo":15038,"distrito_id":42},{"id":132,"codigo":15039,"distrito_id":42},{"id":133,"codigo":15048,"distrito_id":42},{"id":134,"codigo":15049,"distrito_id":42},{"id":135,"codigo":15054,"distrito_id":42},{"id":136,"codigo":15056,"distrito_id":42},{"id":137,"codigo":15063,"distrito_id":42}]},{"id":43,"distrito":"SURQUILLO- Lima 34","distritoscodigos":[{"id":138,"codigo":15036,"distrito_id":43},{"id":139,"codigo":15038,"distrito_id":43},{"id":140,"codigo":15047,"distrito_id":43},{"id":141,"codigo":15048,"distrito_id":43}]},{"id":44,"distrito":"VILLA EL SALVADOR- ","distritoscodigos":[{"id":142,"codigo":15816,"distrito_id":44},{"id":143,"codigo":15828,"distrito_id":44},{"id":144,"codigo":15829,"distrito_id":44},{"id":145,"codigo":15831,"distrito_id":44},{"id":146,"codigo":15836,"distrito_id":44},{"id":147,"codigo":15837,"distrito_id":44},{"id":148,"codigo":15834,"distrito_id":44},{"id":149,"codigo":15841,"distrito_id":44},{"id":150,"codigo":15842,"distrito_id":44}]},{"id":45,"distrito":"VILLA MAR?A DEL TRI","distritoscodigos":[{"id":151,"codigo":15809,"distrito_id":45},{"id":152,"codigo":15811,"distrito_id":45},{"id":153,"codigo":15812,"distrito_id":45},{"id":154,"codigo":15817,"distrito_id":45},{"id":155,"codigo":15818,"distrito_id":45},{"id":156,"codigo":15822,"distrito_id":45},{"id":157,"codigo":15828,"distrito_id":45}]},{"id":46,"distrito":"CERCADO DEL CALLAO-","distritoscodigos":[{"id":158,"codigo":7001,"distrito_id":46},{"id":159,"codigo":7006,"distrito_id":46},{"id":160,"codigo":7021,"distrito_id":46},{"id":161,"codigo":7026,"distrito_id":46},{"id":162,"codigo":7031,"distrito_id":46},{"id":163,"codigo":7036,"distrito_id":46},{"id":164,"codigo":7041,"distrito_id":46},{"id":165,"codigo":7046,"distrito_id":46}]},{"id":47,"distrito":"BELLAVISTA- Callao ","distritoscodigos":[{"id":166,"codigo":7001,"distrito_id":47},{"id":167,"codigo":7006,"distrito_id":47},{"id":168,"codigo":7011,"distrito_id":47},{"id":169,"codigo":7016,"distrito_id":47},{"id":170,"codigo":7021,"distrito_id":47}]},{"id":48,"distrito":"CARMEN DE LA LEGUA ","distritoscodigos":[{"id":171,"codigo":7006,"distrito_id":48}]},{"id":49,"distrito":"LA PERLA- Callao 04","distritoscodigos":[{"id":172,"codigo":7011,"distrito_id":49},{"id":173,"codigo":7016,"distrito_id":49}]},{"id":50,"distrito":"LA PUNTA- Callao 05","distritoscodigos":[{"id":174,"codigo":7021,"distrito_id":50}]},{"id":51,"distrito":"VENTANILLA- Callao ","distritoscodigos":[{"id":175,"codigo":7046,"distrito_id":51},{"id":176,"codigo":7051,"distrito_id":51},{"id":177,"codigo":7056,"distrito_id":51},{"id":178,"codigo":7061,"distrito_id":51},{"id":179,"codigo":7066,"distrito_id":51},{"id":180,"codigo":7071,"distrito_id":51},{"id":181,"codigo":7076,"distrito_id":51}]}]}');
  console.log($scope.distritos.distritos);
  for (var i = 0; i < $scope.distritos.distritos.length; i++) {
    for (var j = 0; j < $scope.distritos.distritos[i].distritoscodigos.length; j++) {
      //console.log($scope.distritos.distritos[i].distritoscodigos[j].codigo);
      if($scope.var.search($scope.distritos.distritos[i].distritoscodigos[j].codigo)!=-1){
        //str.search("W3Schools");
        console.log($scope.distritos.distritos[i].distritoscodigos[j].codigo);
        console.log($scope.distritos.distritos[i].distrito);
      }
    }
  }*/

  $scope.botones=false;

  $scope.reload=function(){
    $window.location.reload();
    $scope.loading=true;
  }

  $scope.showAnular=function(id){
    for (var i = 0; i < $scope.pedidos.length; i++) {   
        if($scope.pedidos[i].id==id && $scope.pedidos[i].show==false){
           $scope.pedidos[i].show = true;
        }else if($scope.pedidos[i].id==id && $scope.pedidos[i].show==true){
           $scope.pedidos[i].show = false;
        }
    }
  }

  $scope.anularDestinoObj={
    motivo:'',
    estado_destino:4
  }
  $scope.anularDestino=function(id){
    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/destino/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.anularDestinoObj
      }

      $http(req3).then(function(response){

        console.log(response);
        for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if($scope.pedidos[i].destinos[j].id==id){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloAnulado;
                 $scope.pedidos[i].destinos[j].estado_destino = 4;
              }
              
            }
          }
      }, function(error){
        console.log(error);
      });
  }
    $scope.anular={
      estado_destino:4,
      motivo:'Fue anulado todo el pedido'
    }
  $scope.anularPedido=function(id){
    var pos=0;
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if($scope.pedidos[i].id==id){
        pos=i;
        console.log($scope.pedidos[i]);
      }
    }

    for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
      console.log($scope.pedidos[pos].destinos[i].id);

      if($scope.pedidos[pos].destinos[i].estado_destino!=4){
        var req3 = {
            method: 'PUT',
            //url: '../api/public/api/get_users/'+CONFIG.ID,
            url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id+'?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.update
        }

        $http(req3).then(function(response){
            console.log(response);
        }, function(error){
            console.log(error);
        });
      }

    }
    

    $scope.updatePedido={
      estado:4
    }
    var req4 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedido/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.updatePedido
      }

      $http(req4).then(function(response){
        console.log(response);
        CONFIG.PEDIDO=id;
         $location.path( "/anulados" );
      }, function(error){
        console.log(error);
      });
  }

  $scope.rechazar=function(id,ev){
    /*var pos=0;
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if($scope.pedidos[i].id==id){
        pos=i;
        console.log($scope.pedidos[i]);
      }
    }

    for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
      console.log($scope.pedidos[pos].destinos[i].id);

      if($scope.pedidos[pos].destinos[i].estado_destino!=4){
        var req3 = {
            method: 'PUT',
            //url: '../api/public/api/get_users/'+CONFIG.ID,
            url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.update
        }

        $http(req3).then(function(response){
            console.log(response);
        }, function(error){
            console.log(error);
        });
      }

    }*/

    var confirm = $mdDialog.confirm()
              .title('Advertencia')
              .textContent('¿Esta seguro de querer rechazar el pedido?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('SI')
              .cancel('NO');

        $mdDialog.show(confirm).then(function() {

           $scope.updatePedido={
              estado:6
            }
            var req4 = {
                method: 'PUT',
                //url: '../api/public/api/get_users/'+CONFIG.ID,
                url: '../api/public/api/pedido/'+id+'?token='+userService.getCurrentToken(),
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.updatePedido
              }

              $http(req4).then(function(response){
                console.log(response);
                 $window.location.reload();
              }, function(error){
                console.log(error);
              });
        }, function() {
          
        });
    

   
  }

  $scope.aceptarPedido=function(id,ev){

    var acepPedido = {
        method: 'GET',
        url: '../api/public/api/encamino/'+localStorageService.get('idLiebre')+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(acepPedido).then(function(response){
        console.log(response);
        if(response.data==1){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Advertencia')
              .textContent('¡Tienes que terminar primero el pedido que tienes en camino!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
              .targetEvent(ev)
          );
        }else{
          /*$scope.aceptarPedido={
            estado:2
          }
            var acepPedido = {
              method: 'PUT',
              url: '../api/public/api/pedido/'+id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.aceptarPedido
            }
            $http(acepPedido).then(function(response){
              console.log(response);
              CONFIG.PEDIDO=id;
              $location.path( "/encamino" );
            }, function(error){
              console.log(error);
            });
            $scope.update={
              estado_destino:2
            }
            var pos=0;
            for (var i = 0; i < $scope.pedidos.length; i++) {
              if($scope.pedidos[i].id==id){
                pos=i;
                console.log($scope.pedidos[i]);
              }
            }
            for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
              console.log($scope.pedidos[pos].destinos[i].id);
                var req3 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.update
                }

                $http(req3).then(function(response){
                    console.log(response);
                }, function(error){
                    console.log(error);
                });
            }*/
            /*------------------------------------------------------------------------------------------------------------------*/
            var acepPedido = {
              method: 'PUT',
              url: '../api/public/api/aceptarPedido/'+id+'?token='+userService.getCurrentToken(),
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              }
            }
            $http(acepPedido).then(function(response){
              console.log(response);
              CONFIG.PEDIDO=id;
              $location.path( "/encamino" );
            }, function(error){
              console.log(error);
            });

            /*------------------------------------------------------------------------------------------------------------------*/

      }
    });
  }    
  

  $scope.marcarEntregado=function(id){
    $scope.update={
      estado_destino:1
    }
    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/destino/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.update
      }

      $http(req3).then(function(response){

        console.log(response);
      }, function(error){
        console.log(error);
      });
  }
  $scope.pedidoEntregado=function(id,ev){

    var confirm = $mdDialog.confirm()
    .title('Advertencia')
    .textContent('¿Esta seguro de querer realizar esta acción?')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('SI')
    .cancel('NO');
    $mdDialog.show(confirm).then(function() {
      
      var pos=0;
      
      for (var i = 0; i < $scope.pedidos.length; i++) {
        if($scope.pedidos[i].id==id){
          pos=i;
          console.log($scope.pedidos[i]);
        }
      }
      
      for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
        console.log($scope.pedidos[pos].destinos[i].id);
        $scope.update={
          estado_destino:1
        }
        var req3 = {
          method: 'PUT',
          url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.update
        }

        $http(req3).then(function(response){
          console.log(response);
        }, function(error){
          console.log(error);
        });
      }
    
      $scope.updatePedido={
        estado:1
      }
      var req4 = {
        method: 'PUT',
        url: '../api/public/api/pedido/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.updatePedido
      }

      $http(req4).then(function(response){
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if($scope.pedidos[i].id==id){
            $scope.pedidos[i].cancelado=1;
          }
        } 
      }, function(error){
        console.log(error);
      });
    
    }, function() {

    });  
  }

  
  $scope.verPedido=function(id){
    //console.log(id);
    for (var i = 0; i < $scope.pedidos.length; i++) {
      //console.log($scope.pedidos[i].admin_id);
      if($scope.pedidos[i].id==id){
        if($scope.pedidos[i].admin_id==false){
          $scope.pedidos[i].admin_id=true;
        }else{
          $scope.pedidos[i].admin_id=false;
        }
      }
    }
  }

  $timeout(function() {
     var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
        $scope.pedidos=[];
        $scope.historial=[];

        setTimeout(function() {
         // console.log($scope.ped.length);
         $scope.sinDatos=false;
         $scope.banderaLoading=false;
        for (var i = 0; i < $scope.ped.length; i++) {
         // console.log('san');
          if($scope.ped[i].estado==1){
            $scope.banderaLoading=true;
            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
        }, 150);
        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            console.log('entro');
            $scope.loading=false;
            $scope.sinDatos=true;
            $scope.$apply();
          }
        },200);

        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
         
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=false;
            $scope.pedidos[i].show=false;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              //console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
             // console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
             // console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
          
        }, 300);
        setTimeout(function() {
          
          /*$scope.pedidos.sort(function(a, b){
            return a.id - b.id;
          })*/
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].fecha=new Date($scope.pedidos[i].fecha);
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              $scope.pedidos[i].destinos[j].fecha_origen=new Date($scope.pedidos[i].destinos[j].fecha_origen);
              $scope.pedidos[i].destinos[j].fecha_destino=new Date($scope.pedidos[i].destinos[j].fecha_destino);
              if ($scope.pedidos[i].destinos[j].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
              $scope.pedidos[i].costoEcommerce=parseFloat($scope.pedidos[i].destinos[j].cobrarecommerce)+parseFloat($scope.pedidos[i].destinos[j].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
                 $scope.pedidos[i].destinos[j].show = false;
              }
          }
           //$scope.costoEcommerce=parseFloat($scope.pedidos[0].destinos[0].cobrarecommerce)+parseFloat($scope.pedidos[0].destinos[0].subtotal);
          //console.log($scope.costoEcommerce);
          $scope.entregados=0;
          $scope.devolucion=0;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                   if ($scope.pedidos[i].destinos[j].admin_id[k].estado==1) {
                    $scope.entregados+=1;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==2) {
                    $scope.devolucion+=1;
                   }
                 }
                 $scope.pedidos[i].destinos[j].entregados=$scope.entregados;
                 $scope.pedidos[i].destinos[j].devolucion=$scope.devolucion;
                 $scope.entregados=0;
                 $scope.devolucion=0;
              }   
            }
          }
         // console.log($scope.pedidos);
          $scope.loading = false; 
          $scope.$apply();
        }, 500);
        //$scope.destinos = $scope.pedidos.destinos;
        //console.log($scope.pedidos);
      }, function(error){
        console.log(error);
        $location.path('/login');
      });
      }, 1000);


  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {
    $timeout(function() {
      var req = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/get_users/'+100+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(error){
        console.log(error);
      });

    }, 1000);




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
              $scope.toggle = true;
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

.controller('encaminoCtrl', function($scope,$window,$mdDialog,$cookieStore,$sce,CONFIG,userService,$location,$http,$timeout) {

  $scope.pedidoEntregado=function(tipo,id,estado,ev){

    if (tipo==0) {
      var confirm = $mdDialog.confirm()
                .title('Advertencia')
                .textContent('¿Esta seguro de querer realizar esta acción?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('SI')
                .cancel('NO');

          $mdDialog.show(confirm).then(function() {

            console.log('si');
            var req3 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/entregado/'+id+'?token='+userService.getCurrentToken(),
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: {
                entregado:estado
              }
            }
            $http(req3).then(function(response){
              console.log(response);
              if (estado==1) {alert('Se ha marcado como entregado');}
              if (estado==2) {alert('Se ha marcado como rechazado');}
              
            }, function(error){
              alert('error al marcar');
            });


           /*  var pos=0;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            if($scope.pedidos[i].id==id){
              pos=i;
              console.log($scope.pedidos[i]);
            }
          }

          for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
            console.log($scope.pedidos[pos].destinos[i].id);

            $scope.update={
            estado_destino:3
            }
            var req3 = {
                method: 'PUT',
                //url: '../api/public/api/get_users/'+CONFIG.ID,
                url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id,
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.update
            }

            $http(req3).then(function(response){
                console.log(response);
            }, function(error){
                console.log(error);
            });

          }
          

          $scope.updatePedido={
            estado:3
          }
          var req4 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/pedido/'+id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.updatePedido
            }

            $http(req4).then(function(response){
             // console.log(response);
             $location.path( "/tracking" );
            }, function(error){
              console.log(error);
            });

              $scope.updatePagar={
                cancelado:1
              }
              var req4 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/pedido/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.updatePagar
                }

                $http(req4).then(function(response){
                for (var i = 0; i < $scope.pedidos.length; i++) {
                  if($scope.pedidos[i].id==id){
                    $scope.pedidos[i].cancelado=1;
                  }
                }        
                  console.log(response);
                }, function(error){
                  console.log(error);
                });*/

                /*------------------------------------------------------------------------------------------------------------------*/
                var acepPedido = {
                  method: 'PUT',
                  url: '../api/public/api/finalizarPedido/'+id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }
                $http(acepPedido).then(function(response){
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    if($scope.pedidos[i].id==id){
                      $scope.pedidos[i].cancelado=1;
                    }
                  }   
                  $location.path( "/tracking" );
                }, function(error){
                  console.log(error);
                });
                /*------------------------------------------------------------------------------------------------------------------*/
              }, function() {

              });
    }else if(tipo==1) {
      console.log('entro en ecommerce');
      var bandera=0;
      var reponer=0;
      $scope.enviarDescuento=$scope.pedidos[0].destinos[0].descuento;
      $scope.enviarAdicional=$scope.pedidos[0].destinos[0].cobrarecommerce;
      for (var i = 0; i < $scope.pedidos[0].destinos[0].admin_id.length; i++) {
        if ($scope.pedidos[0].destinos[0].admin_id[i].cantE==0 && $scope.pedidos[0].destinos[0].admin_id[i].cantD==0) {
          bandera=1;
         // alert('hay uno que no se entro'+$scope.pedidos[0].destinos[0].admin_id[i].cantD+$scope.pedidos[0].destinos[0].admin_id[i].nombre);
        }   
      }
      for (var i = 0; i < $scope.pedidos[0].destinos[0].admin_id.length; i++) {
        if($scope.pedidos[0].destinos[0].admin_id[i].reponer==1){
          reponer=1;
          $scope.enviarDescuento=0;
          //alert('Se perdera el descuento');
        }
        if($scope.pedidos[0].destinos[0].subtotal==0) {
          $scope.enviarAdicional=0;
          //alert('Se perdera el adicional');
        }
      }
      console.log($scope.pedidos);
      //if ($scope.pedidos[0].destinos[0].admin_id[0].cantE!=0 || $scope.pedidos[0].destinos[0].admin_id[0].cantD!=0) {
      if (bandera==0) {
      //if (false) {
        var confirm = $mdDialog.confirm()
                  .title('Advertencia')
                  .textContent('¿Esta seguro de querer realizar esta acción?')
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('SI')
                  .cancel('NO');

            $mdDialog.show(confirm).then(function() {

              console.log('si');
            var req3 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/entregado/'+id+'?token='+userService.getCurrentToken(),
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: {
                entregado:estado
              }
            }
            $http(req3).then(function(response){
              console.log(response);
              if (estado==1) {alert('Se ha marcado como entregado');}
              if (estado==2) {alert('Se ha marcado como rechazado');}
              
            }, function(error){
              alert('error al marcar');
            });
        /*       var pos=0;
        for (var i = 0; i < $scope.pedidos.length; i++) {
          if($scope.pedidos[i].id==id){
            pos=i;
            console.log($scope.pedidos[i]);
          }
        }

        for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
          console.log($scope.pedidos[pos].destinos[i].id);

          $scope.update={
          estado_destino:3
          }
          var req3 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id,
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.update
          }

          $http(req3).then(function(response){
              console.log(response);
          }, function(error){
              console.log(error);
          });

        }
        

        $scope.updatePedido={
          estado:3
        }
        var req4 = {
            method: 'PUT',
            //url: '../api/public/api/get_users/'+CONFIG.ID,
            url: '../api/public/api/pedido/'+id,
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.updatePedido
          }

          $http(req4).then(function(response){
           // console.log(response);
           $location.path( "/tracking" );
          }, function(error){
            console.log(error);
          });

            $scope.updatePagar={
              cancelado:1
            }
            var req4 = {
                method: 'PUT',
                //url: '../api/public/api/get_users/'+CONFIG.ID,
                url: '../api/public/api/pedido/'+id,
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.updatePagar
              }

              $http(req4).then(function(response){
              for (var i = 0; i < $scope.pedidos.length; i++) {
                if($scope.pedidos[i].id==id){
                  $scope.pedidos[i].cancelado=1;
                }
              }        
                console.log(response);
              }, function(error){
                console.log(error);
              });*/

              /*------------------------------------------------------------------------------------------------------------------*/
                $scope.finalizarPedido={
                    cobrarecommerce:$scope.enviarAdicional,
                    descuento:$scope.enviarDescuento
                }

                console.log( $scope.finalizarPedido);
                var acepPedido = {
                  method: 'PUT',
                  url: '../api/public/api/finalizarPedido/'+id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.finalizarPedido
                }
                $http(acepPedido).then(function(response){
                  console.log(response);
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    if($scope.pedidos[i].id==id){
                      $scope.pedidos[i].cancelado=1;
                    }
                  }   
                  $location.path( "/tracking" );
                }, function(error){
                  console.log(error);
                });
                /*------------------------------------------------------------------------------------------------------------------*/
            }, function() {

            });
          }else if(bandera==1){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Advertencia')
                .textContent('¡Tienes que despachar o devolver TODOS los productos!')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
                .targetEvent(ev)
            );
          }
      }
    
   
  }

  $scope.entregado=function(estado,id,ev){

    console.log(id);
    var confirm = $mdDialog.confirm()
                .title('Advertencia')
                .textContent('¿Esta seguro de hacer esta acción?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('SI')
                .cancel('NO');

          $mdDialog.show(confirm).then(function() {
            console.log('si');
            var req3 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/entregado/'+id+'?token='+userService.getCurrentToken(),
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: {
                entregado:estado
              }
            }
            $http(req3).then(function(response){
              console.log(response);
              if (estado==1) {alert('Se ha marcado como entregado');}
              if (estado==2) {alert('Se ha marcado como rechazado');}
              
            }, function(error){
              alert('error al marcar');
            });
          },function() {
                console.log('No');

          });
   }

   $scope.editarPedido=function(id,cant,sub,pre,nom,dest_id,ev){

    console.log(id);
    var confirm = $mdDialog.confirm()
                .title('Advertencia')
                .textContent('¿Esta seguro de editar este artículo?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('SI')
                .cancel('NO');

          $mdDialog.show(confirm).then(function() {
            console.log('si');
            var req3 = {
              method: 'PUT',
              //url: '../api/public/api/get_users/'+CONFIG.ID,
              url: '../api/public/api/editArticulo/'+id+'?token='+userService.getCurrentToken(),
              headers: {
                'Authorization' : 'Bearer ' + userService.getCurrentToken()
              },
              data: $scope.productosOBJ
            }
            $http(req3).then(function(response){
              console.log(response);
              sub=response.data;
              
              /*if (cant==1) {
                $scope.loading=true;
                //if (true) {
                $scope.productosOBJ={
                  estado:1
                }
                var req3 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/productos_pedido/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.productosOBJ
                  }

                  $http(req3).then(function(response){
                    console.log(response);
                    setTimeout(function() {
                                  //$scope.calcularCantidad(dest_id);
                                  $window.location.reload();

                                }, 3000);
                }, function(error){
                  console.log(error);
                });
                  $scope.cantE={
                  cantE:cant,
                  reponer: 0
                }
                var req4 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/add/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantE
                  }

                  $http(req4).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });
              }else{*/
                $scope.modalCantidad(id,cant,sub,pre,nom,dest_id);
              /*}*/
            }, function(error){
              alert('error');
            });
          },function() {
                console.log('No');

          });
   }

  $scope.entregadosDescrip=[];
  $scope.devolucionesDescrip=[];
   $scope.entregadoSI=function(id,cant,sub,pre,nom,dest_id){
    

    if (cant==1) {
      $scope.loading=true;
      //if (true) {
      /*$scope.productosOBJ={
        estado:1
      }
      var req3 = {
          method: 'PUT',
          //url: '../api/public/api/get_users/'+CONFIG.ID,
          url: '../api/public/api/productos_pedido/'+id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.productosOBJ
        }

        $http(req3).then(function(response){
          console.log(response);
          setTimeout(function() {
                        //$scope.calcularCantidad(dest_id);
                        $window.location.reload();

                      }, 3000);
      }, function(error){
        console.log(error);
      });
        $scope.cantE={
        cantE:cant,
        reponer: 0
      }
      var req4 = {
          method: 'PUT',
          //url: '../api/public/api/get_users/'+CONFIG.ID,
          url: '../api/public/api/add/'+id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.cantE
        }

        $http(req4).then(function(response){
          console.log(response);
        }, function(error){
          console.log(error);
        });*/
        $scope.cantE={
          cantE:cant,
          reponer: 0
        }
        var req4 = {
          method: 'PUT',
          url: '../api/public/api/entregadoSi/'+id+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.cantE
        }

        $http(req4).then(function(response){
          console.log(response);
          setTimeout(function() {
                        //$scope.calcularCantidad(dest_id);
                        $window.location.reload();

                      }, 1000);
        }, function(error){
          console.log(error);
          alert('ha ocurrido un error');
        });
    }else{
      $scope.modalCantidad(id,cant,sub,pre,nom,dest_id);
    }
        
  }
  $scope.entregadoNO=function(id,cant,sub,pre,nom,dest_id){
    $scope.loading=true;
    // if (cant==1) {
    if (true) {
    /*$scope.productosOBJ={
      estado:2
    }
    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/productos_pedido/'+id,
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.productosOBJ
      }

      $http(req3).then(function(response){
        console.log(response);
        $scope.sub=sub-(cant*pre);
         $scope.productosOBJ={
                subtotal: $scope.sub
              }
              var req4 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/destino/'+dest_id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.productosOBJ
                }

                $http(req4).then(function(response){
                  setTimeout(function() {
                       // $scope.calcularCantidad(dest_id);
                        $window.location.reload();
                      }, 3000);
                }, function(error){
                  console.log(error);
                });
        

      }, function(error){
        console.log(error);
      });
      $scope.cantD={
        cantD:cant,
        reponer: 1
      }
      var req4 = {
          method: 'PUT',
          //url: '../api/public/api/get_users/'+CONFIG.ID,
          url: '../api/public/api/supr/'+id,
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.cantD
        }

        $http(req4).then(function(response){
          console.log(response);
        }, function(error){
          console.log(error);
        });*/
        $scope.sub=sub-(cant*pre);
        $scope.cantD={
          cantD:cant,
          reponer: 1,
          subtotal: $scope.sub
        }
        var req4 = {
          method: 'PUT',
          //url: '../api/public/api/get_users/'+CONFIG.ID,
          url: '../api/public/api/entregadoNo/'+id+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.cantD
        }

        $http(req4).then(function(response){
          console.log(response);
          setTimeout(function() {
                        //$scope.calcularCantidad(dest_id);
                        $window.location.reload();

                      }, 1000);
        }, function(error){
          console.log(error);
           alert('ha ocurrido un error');
        })
    }else{
      $scope.modalCantidad(id,cant,sub,pre,nom,dest_id);
    }    
  }

  $scope.modalCantidad=function(id,cant,sub,pre,nom,dest_id){
    $mdDialog.show({
        controller: DialogController, 
        templateUrl: 'templates/cantidad.html',
        parent: angular.element(document.body),
        scope: $scope,
        preserveScope: true,
        fullscreen: $scope.customFullscreen,
        locals : {
                    id : id, 
                    cant : cant,
                    sub : sub,
                    pre : pre,
                    nom : nom,
                    dest_id : dest_id
                } // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        console.log(answer);
        
        for (var i = 0; i < $scope.pedidos.length; i++) {
              for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                  for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                     if ($scope.pedidos[i].destinos[j].admin_id[k].id==answer.id) {
                      $scope.pedidos[i].destinos[j].subtotal=answer.sub;
                      //$scope.pedidos[i].destinos[j].cantidad-=answer.cantD;
                      //$scope.pedidos[i].destinos[j].admin_id[k].cantidad=answer.cant;
                      $scope.pedidos[i].destinos[j].admin_id[k].estado=answer.estado;
                      setTimeout(function() {
                        //$scope.calcularCantidad(answer.dest_id);
                        $window.location.reload();
                      }, 1000);
                      
                      /*if (answer.estado==1) {
                        if (answer.cantE>0) {
                          $scope.pedidos[i].destinos[j].entregados+=answer.cantE;
                          $scope.entregadosDescrip.push({
                            cantidad: answer.cantE,
                            nombre: answer.nom,
                            precio: answer.pre
                          });
                        }
                        if (answer.cantD>0) {
                          $scope.pedidos[i].destinos[j].devolucion+=answer.cantD;
                          $scope.devolucionesDescrip.push({
                            cantidad: answer.cantD,
                            nombre: answer.nom,
                            precio: answer.pre
                          });
                        }
    
                      }else if(answer.estado==2){

                        $scope.pedidos[i].destinos[j].devolucion+=answer.cantD;
                        $scope.devolucionesDescrip.push({
                          cantidad: answer.cantD,
                          nombre: answer.nom,
                          precio: answer.pre
                        });
                      }*/
                     }
                  }
                  if ($scope.pedidos[i].destinos[j].id==answer.dest_id){
                    $scope.pedidos[i].destinos[j].subtotal=answer.sub;
                  }
                }   
              }
            }
            $scope.actualizarPedido();
            $scope.loading=false;
      }, function() {
        $scope.loading=false;
      });
        
        function DialogController($scope, $mdDialog,id,cant,sub,pre,nom,dest_id,$http) {

          $scope.id=id;
          $scope.canti=parseInt(cant);
          $scope.cant=parseInt(cant);
          $scope.sub=parseFloat(sub);
          $scope.pre=parseFloat(pre);
          $scope.nom=nom;

          $scope.mas = function(c) {
            if(c>=0 && c<$scope.canti ){
              $scope.cant+=1;
              $scope.calcSubtotal(1,1);
            } 
          }
          $scope.menos = function(c) {
            if(c>0 && c<=$scope.canti){
              $scope.cant-=1;
              $scope.calcSubtotal(0,1);
            } 
          }
          $scope.calcSubtotal=function(op,c){
            if (op==1) {
               $scope.sub+=$scope.pre*c;
            }else if (op==0) {
               $scope.sub-=$scope.pre*c;
            }
           
          }
          $scope.enviar = function() {
            $scope.loading=true;
            
            if($scope.canti-$scope.cant>0){

            }

            if ($scope.cant==0) {

              /*$scope.estado=2;
              $scope.productosOBJ={
                estado:2,
              }
              var req3 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/productos_pedido/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.productosOBJ
                }

                $http(req3).then(function(response){
                  
                }, function(error){
                  console.log(error);
                });

                $scope.cantD={
                  cantD:$scope.canti
                }
                var req4 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/supr/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantD
                  }

                  $http(req4).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });*/

                $scope.cantD={
                  cantD:$scope.canti,
                  subtotal: $scope.sub
                }
                var req4 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/entregadoNo/'+id+'?token='+userService.getCurrentToken(),
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantD
                  }

                  $http(req4).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });

            }else if($scope.cant==$scope.canti){

              /*$scope.estado=1;
              $scope.productosOBJ={
                estado:1
              }
              var req3 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/productos_pedido/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.productosOBJ
                }

                $http(req3).then(function(response){
                  
                }, function(error){
                  console.log(error);
                });

                $scope.cantE={
                  cantE:$scope.cant
                }
                var req4 = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/add/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantE
                  }

                  $http(req4).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });*/
              $scope.cantE={
                  cantE:$scope.cant
              }
              var req4 = {
                method: 'PUT',
                url: '../api/public/api/entregadoSi/'+id+'?token='+userService.getCurrentToken(),
                headers: {
                  'Authorization' : 'Bearer ' + userService.getCurrentToken()
                },
                data: $scope.cantE
              }

              $http(req4).then(function(response){
                console.log(response);
              }, function(error){
                console.log(error);
              });

            }else if($scope.cant!=$scope.canti){

              /*$scope.estado=1;
              $scope.productosOBJ={
                estado:1
              }
              var req3 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/productos_pedido/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.productosOBJ
                }

                $http(req3).then(function(response){
                  
                }, function(error){
                  console.log(error);
                });

                $scope.cantE={
                  cantE:$scope.cant
                }
                var reqadd = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/add/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantE
                  }

                  $http(reqadd).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });

                $scope.cantD={
                  cantD:$scope.canti-$scope.cant
                }
                var reqsupr = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/supr/'+id,
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cantD
                  }

                  $http(reqsupr).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });*/

                $scope.cant={
                  cantD:$scope.canti-$scope.cant,
                  cantE:$scope.cant,
                  subtotal: $scope.sub
                }
                var reqsupr = {
                    method: 'PUT',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/entregadoSiNo/'+id+'?token='+userService.getCurrentToken(),
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    },
                    data: $scope.cant
                  }

                  $http(reqsupr).then(function(response){
                    console.log(response);
                  }, function(error){
                    console.log(error);
                  });
            }

              /*$scope.productosOBJ={
                subtotal: $scope.sub
              }
              var req3 = {
                  method: 'PUT',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/destino/'+dest_id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  },
                  data: $scope.productosOBJ
                }

                $http(req3).then(function(response){
                  
                }, function(error){
                  console.log(error);
                });*/

            $scope.return={
              sub:$scope.sub,
              cant: $scope.cant,
              cantE: $scope.cant,
              cantD: $scope.canti-$scope.cant,
              cantT: $scope.canti-($scope.canti-$scope.cant),
              id: id,
              dest_id : dest_id,
              estado: $scope.estado,
              nom: nom,
              pre: $scope.pre
            }
            $mdDialog.hide($scope.return);
          }

          $scope.cancel = function() {
            $mdDialog.hide();
            $scope.loading=false;
            $window.location.reload();
          }
        }
  }
  $scope.actualizarPedido=function(){

  };

  $scope.calcularCantidad=function(id){
    $scope.entregadosDescrip=[];
    $scope.devolucionesDescrip=[];
    for (var i = 0; i < $scope.pedidos.length; i++) {
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.pedidos[i].destinos[j].entregados=0;
                    $scope.pedidos[i].destinos[j].devolucion=0;
                  }
    }
    //$scope.iniciar();
      $timeout(function() {
              /*for (var i = 0; i < $scope.pedidos.length; i++) {
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                  if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                    for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                       if ($scope.pedidos[i].destinos[j].admin_id[k].cantE>0) {
                          $scope.pedidos[i].destinos[j].entregados+=parseInt($scope.pedidos[i].destinos[j].admin_id[k].cantE);
                          $scope.pedidos[i].destinos[j].admin_id[k].estado=1;
                          $scope.entregadosDescrip.push({
                              cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantE,
                              nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                              precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                          });

                       }
                       if ($scope.pedidos[i].destinos[j].admin_id[k].cantD>0) {
                          $scope.pedidos[i].destinos[j].devolucion+=parseInt($scope.pedidos[i].destinos[j].admin_id[k].cantE);
                          $scope.pedidos[i].destinos[j].admin_id[k].estado=2;
                          $scope.devolucionesDescrip.push({
                            cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantE,
                            nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                            precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                          });
                       }
                     }
                  }   
                }
              }*/
              /*var req3 = {
                  method: 'GET',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/cantE/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(req3).then(function(response){
                  console.log(response.data);
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                        $scope.pedidos[i].destinos[j].entregados=response.data;
                        if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                        for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                           if (response.data>0) {
                              $scope.entregadosDescrip.push({
                                  cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantE,
                                  nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                  precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                              });
                           }
                         }
                        }
                    }
                  }

                }, function(error){
                  console.log(error);
                });

              var req4 = {
                  method: 'GET',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/cantD/'+id,
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(req4).then(function(response){
                  console.log(response.data);
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                        $scope.pedidos[i].destinos[j].devolucion=response.data;
                        if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                        for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                           if (response.data>0) {
                              $scope.devolucionesDescrip.push({
                                cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantD,
                                nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                              });
                           }
                         }
                        }
                    }
                  }
                }, function(error){
                  console.log(error);
                });*/


                /*----------------------------------------------------------------------------------------------*/
                  var req4 = {
                    method: 'GET',
                    //url: '../api/public/api/get_users/'+CONFIG.ID,
                    url: '../api/public/api/cantED/'+id+'?token='+userService.getCurrentToken(),
                    headers: {
                      'Authorization' : 'Bearer ' + userService.getCurrentToken()
                    }
                  }

                  $http(req4).then(function(response){
                    console.log(response.data);

                    for (var i = 0; i < $scope.pedidos.length; i++) {
                      for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                          $scope.pedidos[i].destinos[j].entregados=response.data.cantE;
                          if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                          for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                             if (response.data.cantE>0) {
                                $scope.entregadosDescrip.push({
                                    cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantE,
                                    nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                    precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                                });
                             }
                           }
                          }
                      }
                    }

                    for (var i = 0; i < $scope.pedidos.length; i++) {
                      for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                          $scope.pedidos[i].destinos[j].devolucion=response.data.cantD;
                          if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                          for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                             if (response.data.cantD>0) {
                                $scope.devolucionesDescrip.push({
                                  cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantD,
                                  nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                  precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                                });
                             }
                           }
                          }
                      }
                    }


                    
                  }, function(error){
                    console.log(error);
                  });
                /*----------------------------------------------------------------------------------------------*/
            }, 100);
  }
  

  $scope.marcarEntregadoNoRecibio=function(id){

    for (var i = 0; i < $scope.pedidos.length; i++) {
      for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
        if($scope.pedidos[i].destinos[j].id==id && $scope.pedidos[i].destinos[j].showRecibido==false){
           $scope.pedidos[i].destinos[j].showRecibido = true;
        }else if($scope.pedidos[i].destinos[j].id==id && $scope.pedidos[i].destinos[j].showRecibido==true){
           $scope.pedidos[i].destinos[j].showRecibido = false;
        }
      }
    }
  }

  $scope.noRecibio={
    cantidad_devuelta:0,
    observacion_cantidad_devuelta:'',
    estado:3
  }

  $scope.noRecibioPedido=function(id,cantidad,observacion,pedido_id){
     //alert(id+observacion+cantidad);
  
     $scope.noRecibio.cantidad_devuelta=cantidad;
     $scope.noRecibio.observacion_cantidad_devuelta=observacion;

    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/destino/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.noRecibio
      }

      $http(req3).then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });

    $scope.motivo={
      motivo:observacion,
    }
    var req4 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedido/'+pedido_id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.motivo
      }

      $http(req4).then(function(response){
        console.log(response);
        
      }, function(error){
        console.log(error);
      });
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Advertencia')
          .textContent('¡Tu mensaje se ha registrado con éxito!')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
          .targetEvent(ev)
      );
  }

  $scope.loading = true;

  $scope.conEstiloEntregado = {
    "background-image" : 'url("http://mdprojects.com.ec/wp-content/uploads/2016/09/sello-entregado-2.png")',
    "background-repeat": "no-repeat",
    "background-position": "right"
    //"background-image" : 'url("http://st2.depositphotos.com/1575949/6487/v/950/depositphotos_64879147-stock-illustration-delivered-red-stamp-text.jpg")',
    //"background-color" : "#E6E6E6"
  }
  $scope.sinEstiloEntregado = {
    //"background-color" : "#E6E6E6"
  }

  $scope.estiloEntregado = $scope.sinEstiloEntregado;

  $scope.conEstiloAnulado = {
    "background-image" : 'url("https://iespedrodevaldivia.files.wordpress.com/2012/05/anulado.gif")',
    "background-repeat": "no-repeat",
    "background-position": "right"
  }


  $scope.showAnular=function(id){
    for (var i = 0; i < $scope.pedidos.length; i++) {
      for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
        if($scope.pedidos[i].destinos[j].id==id && $scope.pedidos[i].destinos[j].show==false){
           $scope.pedidos[i].destinos[j].show = true;
        }else if($scope.pedidos[i].destinos[j].id==id && $scope.pedidos[i].destinos[j].show==true){
           $scope.pedidos[i].destinos[j].show = false;
        }
      }
    }
  }
  $scope.anularDestinoObj={
    motivo:'',
    estado_destino:4
  }
  $scope.anularDestino=function(id){
    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/destino/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.anularDestinoObj
      }

      $http(req3).then(function(response){

        console.log(response);
        for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if($scope.pedidos[i].destinos[j].id==id){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloAnulado;
                 $scope.pedidos[i].destinos[j].estado_destino = 4;
              }
              
            }
          }
      }, function(error){
        console.log(error);
      });
  }
  $scope.update={
      estado_destino:4,
      motivo:'Fue anulado todo el pedido'
      }
  $scope.anularPedido=function(id){
    var pos=0;
    for (var i = 0; i < $scope.pedidos.length; i++) {
      if($scope.pedidos[i].id==id){
        pos=i;
        console.log($scope.pedidos[i]);
      }
    }

    for (var i = 0; i < $scope.pedidos[pos].destinos.length; i++) {
      console.log($scope.pedidos[pos].destinos[i].id);

      
      if($scope.pedidos[pos].destinos[i].estado_destino!=4){
        var req3 = {
            method: 'PUT',
            //url: '../api/public/api/get_users/'+CONFIG.ID,
            url: '../api/public/api/destino/'+$scope.pedidos[pos].destinos[i].id+'?token='+userService.getCurrentToken(),
            headers: {
              'Authorization' : 'Bearer ' + userService.getCurrentToken()
            },
            data: $scope.update
        }

        $http(req3).then(function(response){
            console.log(response);
        }, function(error){
            console.log(error);
        });
      }

    }
    

    $scope.updatePedido={
      estado:4
    }
    var req4 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedido/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.updatePedido
      }

      $http(req4).then(function(response){
        console.log(response);
        CONFIG.PEDIDO=id;
         $location.path( "/anulados" );
      }, function(error){
        console.log(error);
      });
  }

  $scope.pagarPedido=function(id,ev){
    //alert(id);
    var confirm = $mdDialog.confirm()
              .title('Advertencia')
              .textContent('¿Esta seguro de querer realizar esta acción?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('SI')
              .cancel('NO');

        $mdDialog.show(confirm).then(function() {
      $scope.updatePagar={
      cancelado:1
    }
    var req4 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedido/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.updatePagar
      }

      $http(req4).then(function(response){
      for (var i = 0; i < $scope.pedidos.length; i++) {
        if($scope.pedidos[i].id==id){
          $scope.pedidos[i].cancelado=1;
        }
      }        
        console.log(response);
        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Advertencia')
              .textContent('¡Se ha marcado como pagado el pedido!')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
              .targetEvent(ev)
          );
      }, function(error){
        console.log(error);
      });
        }, function() {

        });
    
  }


  $scope.marcarEntregado=function(id,ev){

    var confirm = $mdDialog.confirm()
              .title('Advertencia')
              .textContent('¿Esta seguro de querer realizar esta acción?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('SI')
              .cancel('NO');

        $mdDialog.show(confirm).then(function() {
          $scope.update={
      estado_destino:3
    }
    var req3 = {
        method: 'PUT',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/destino/'+id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.update
      }

      $http(req3).then(function(response){

        console.log(response);
        for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if($scope.pedidos[i].destinos[j].id==id){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloEntregado;
                 $scope.pedidos[i].destinos[j].estado_destino = 3;
              }
              
            }
          }
      }, function(error){
        console.log(error);
      });
        }, function() {
          $scope.status = 'You decided to keep your debt.';
          console.log('no');
        });
    
  }
  

  $scope.verPedido=function(id){
    //console.log(id);
    for (var i = 0; i < $scope.pedidos.length; i++) {
      //console.log($scope.pedidos[i].admin_id);
      if($scope.pedidos[i].id==id){
        if($scope.pedidos[i].admin_id==false){
          $scope.pedidos[i].admin_id=true;
        }else{
          $scope.pedidos[i].admin_id=false;
        }
      }
    }
  }

  $timeout(function() {
     var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto2?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
        $scope.pedidos=[];
        $scope.historial=[];
         $scope.sinDatos=false;
         $scope.banderaLoading=false;
        $timeout(function() {
          console.log($scope.ped.length);
         
        for (var i = 0; i < $scope.ped.length; i++) {

          if($scope.ped[i].estado==2){
            $scope.banderaLoading=true;
            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
        }, 80);
        $timeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            console.log('entro');
            $scope.loading=false;
            $scope.sinDatos=true;
            $scope.$apply();
          }
        },300);

        $timeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=true;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
              console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
              console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
        }, 400);
        $timeout(function() {
          
          $scope.pedidos.sort(function(a, b){
            return b.id - a.id;
          })
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          // console.log($scope.pedidos);
          // console.log(CONFIG.PEDIDO);
          for (var i = 0; i < $scope.pedidos.length; i++) {
            console.log($scope.pedidos[i].id);
            $scope.pedidos[i].fecha=new Date($scope.pedidos[i].fecha);
            if($scope.pedidos[i].id==CONFIG.PEDIDO){
              $scope.pedidos[i].admin_id=true;
              CONFIG.PEDIDO='';
            }
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
               $scope.pedidos[i].destinos[j].fecha_origen=new Date($scope.pedidos[i].destinos[j].fecha_origen);
               $scope.pedidos[i].destinos[j].fecha_destino=new Date($scope.pedidos[i].destinos[j].fecha_destino);
               $scope.pedidos[i].destinos[j].estilos = $scope.sinEstiloEntregado;
               $scope.pedidos[i].destinos[j].show = false;
               if($scope.pedidos[i].destinos[j].subtotal==0) {
                    //alert('el adicional se perdio');
                    $scope.pedidos[i].destinos[j].cobrarecommerce=0;
                  }
               console.log($scope.pedidos[i].destinos[j].admin_id);
               for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                  if($scope.pedidos[i].destinos[j].admin_id[k].reponer==1){
                   // alert('el descuento se perdio');
                    $scope.pedidos[i].destinos[j].descuento=0;
                  }
                  
                }
               if ($scope.pedidos[i].destinos[j].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
               $scope.pedidos[i].costoEcommerce=parseFloat($scope.pedidos[i].destinos[j].cobrarecommerce)+parseFloat($scope.pedidos[i].destinos[j].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
               $scope.pedidos[i].destinos[j].descuento2=$scope.pedidos[i].destinos[j].descuento;
               $scope.pedidos[i].destinos[j].cobrarecommerce2=$scope.pedidos[i].destinos[j].cobrarecommerce;

               $scope.pedidos[i].destinos[j].showRecibido = false;
              if($scope.pedidos[i].destinos[j].estado_destino==3){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloEntregado;
              }else if($scope.pedidos[i].destinos[j].estado_destino==4){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloAnulado;
              }
            }
          }
          //  $scope.costoEcommerce
          // console.log($scope.costoEcommerce);
          $scope.entregados=0;
          $scope.devolucion=0;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                   if ($scope.pedidos[i].destinos[j].admin_id[k].estado==1) {
                    //$scope.entregados+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==2) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==0) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                 }
                 $scope.pedidos[i].destinos[j].entregados=$scope.entregados;
                 $scope.pedidos[i].destinos[j].devolucion=$scope.devolucion;
                 $scope.entregados=0;
                 $scope.devolucion=0;
              }   
            }
          }
          $scope.loading = false;
          $scope.$apply();
          console.log($scope.pedidos);
        }, 600);
        $timeout(function() {
         $scope.calcularCantidad($scope.productos_id);
        }, 2200);
        //$scope.destinos = $scope.pedidos.destinos;
        //console.log($scope.pedidos);
      }, function(error){
        $location.path('/login');
        console.log(error);
      });
      }, 1000);


  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  if (CONFIG.CLIENTE == '') {
    $timeout(function() {
      var req = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/get_users/'+100+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
      }, function(error){
        console.log(error);
      });

    }, 1000);




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
              $scope.toggle = true;
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


    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }

  $scope.iniciar=function(){
    var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
        $scope.pedidos=[];
        $scope.historial=[];
        setTimeout(function() {
          console.log($scope.ped.length);
          $scope.sinDatos=false;
         $scope.banderaLoading=false;
        for (var i = 0; i < $scope.ped.length; i++) {

          if($scope.ped[i].estado==2){
            $scope.banderaLoading=true;
            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
        }, 150);
        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            console.log('entro');
            $scope.loading=false;
            $scope.sinDatos=true;
            $scope.$apply();
          }
        },200);

        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=true;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
              console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
              console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
        }, 300);
        setTimeout(function() {
          
          $scope.pedidos.sort(function(a, b){
            return b.id - a.id;
          })
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          // console.log($scope.pedidos);
          // console.log(CONFIG.PEDIDO);
          for (var i = 0; i < $scope.pedidos.length; i++) {
            console.log($scope.pedidos[i].id);
            $scope.pedidos[i].fecha=new Date($scope.pedidos[i].fecha);
            if($scope.pedidos[i].id==CONFIG.PEDIDO){
              $scope.pedidos[i].admin_id=true;
              CONFIG.PEDIDO='';
            }
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
               $scope.pedidos[i].destinos[j].fecha_origen=new Date($scope.pedidos[i].destinos[j].fecha_origen);
               $scope.pedidos[i].destinos[j].fecha_destino=new Date($scope.pedidos[i].destinos[j].fecha_destino);
               $scope.pedidos[i].destinos[j].estilos = $scope.sinEstiloEntregado;
               $scope.pedidos[i].destinos[j].show = false;
               $scope.pedidos[i].destinos[j].showRecibido = false;
               if ($scope.pedidos[i].destinos[j].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
               $scope.pedidos[i].costoEcommerce=parseFloat($scope.pedidos[i].destinos[j].cobrarecommerce)+parseFloat($scope.pedidos[i].destinos[j].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
              if($scope.pedidos[i].destinos[j].estado_destino==3){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloEntregado;
              }else if($scope.pedidos[i].destinos[j].estado_destino==4){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloAnulado;
              }
            }
          }
          //  $scope.costoEcommerce=parseFloat($scope.pedidos[0].destinos[0].cobrarecommerce)+parseFloat($scope.pedidos[0].destinos[0].subtotal);
          // console.log($scope.costoEcommerce);
          $scope.entregados=0;
          $scope.devolucion=0;
          for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                   if ($scope.pedidos[i].destinos[j].admin_id[k].estado==1) {
                    //$scope.entregados+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==2) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==0) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                 }
                 $scope.pedidos[i].destinos[j].entregados=$scope.entregados;
                 $scope.pedidos[i].destinos[j].devolucion=$scope.devolucion;
                 $scope.entregados=0;
                 $scope.devolucion=0;
              }   
            }
          }
          $scope.loading = false;
          $scope.$apply();
          console.log($scope.pedidos);
        }, 500);
        //$scope.destinos = $scope.pedidos.destinos;
        //console.log($scope.pedidos);
      }, function(error){
        $location.path('/login');
        console.log(error);
      });
  }
  
  /*-----------------------------------*/
})

.controller('historialCtrl', function($scope,$filter,$cookieStore,$sce,CONFIG,userService,$location,$http,$timeout,$mdDialog) {

  $scope.loading = true;
  $scope.getPedidosFecha=function(fecha){
    $scope.loading = true;
    var repro = {
      method: 'GET',
      url: '../api/public/api/reprogramados/motorizado?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }
    $http(repro).then(function(response){
      console.log(response.data);
      //alert(JSON.stringify(response.data));
     $scope.pedidos=[];
     $scope.reprogra=response.data;
     for (var i = 0; i < $scope.reprogra.length; i++) {
      // alert(JSON.stringify($scope.reprogra[i]));
      $scope.reprogra[i].admin_id=false;
       $scope.pedidos.push($scope.reprogra[i]);
     }
     $scope.f=$filter('date')(new Date(), "yyyy-MM-dd")
     var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto33/'+fecha+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
       
        $scope.historial=[];
        setTimeout(function() {
          //console.log($scope.ped.length);
          $scope.sinDatos=false;
         $scope.banderaLoading=false;
        for (var i = 0; i < $scope.ped.length; i++) {
         // console.log('san');
          if($scope.ped[i].estado==3){
            $scope.banderaLoading=true;
            // alert(JSON.stringify($scope.ped[i]));
            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
        }, 150);
        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            console.log('entro');
            $scope.loading=false;
            $scope.sinDatos=true;
            $scope.$apply();
          }
        },200);

        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=false;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              //console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
              //console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
              //console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
        }, 300);
        setTimeout(function() {
          
          $scope.pedidos.sort(function(a, b){
            return a.id - b.id;
          })
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if ($scope.pedidos[i].destinos[j].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
               $scope.pedidos[i].costoEcommerce=parseFloat($scope.pedidos[i].destinos[j].cobrarecommerce)+parseFloat($scope.pedidos[i].destinos[j].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
              if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                   if ($scope.pedidos[i].destinos[j].admin_id[k].estado==1) {
                    //$scope.entregados+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==2) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==0) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                 }
                 $scope.pedidos[i].destinos[j].entregados=$scope.entregados;
                 $scope.pedidos[i].destinos[j].devolucion=$scope.devolucion;
                 $scope.entregados=0;
                 $scope.devolucion=0;
              }   
            }
          }
          $scope.loading = false;
          // alert(JSON.stringify($scope.pedidos));
          // console.log($scope.pedidos);
          $scope.$apply();
        }, 500);
      }, function(error){
        console.log(error);
        $location.path('/login');
      });
    }, function(error){
        console.log(error);
        //$location.path('/login');
        alert('error');
      });
  }
  $scope.fecha=function(){
    $scope.searchText=$filter('date')($scope.searchText, "yyyy-MM-dd");
    $scope.getPedidosFecha($scope.searchText);
  }

  $scope.calcularCantidad=function(id){
    $scope.entregadosDescrip=[];
    $scope.devolucionesDescrip=[];
    for (var i = 0; i < $scope.pedidos.length; i++) {
                for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                    $scope.pedidos[i].destinos[j].entregados=0;
                    $scope.pedidos[i].destinos[j].devolucion=0;
                  }
    }
      $timeout(function() {
             
              var req3 = {
                  method: 'GET',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/cantE/'+id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(req3).then(function(response){
                  console.log(response.data);
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                        $scope.pedidos[i].destinos[j].entregados=response.data;
                        if ($scope.pedidos[i].destinos[j].admin_id!=0 && $scope.pedidos[i].destinos[j].id==id) {
                        for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                           if (response.data>0) {
                              $scope.entregadosDescrip.push({
                                  cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantE,
                                  nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                  precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                              });
                           }
                         }
                        }
                    }
                  }

                }, function(error){
                  console.log(error);
                });

              var req4 = {
                  method: 'GET',
                  //url: '../api/public/api/get_users/'+CONFIG.ID,
                  url: '../api/public/api/cantD/'+id+'?token='+userService.getCurrentToken(),
                  headers: {
                    'Authorization' : 'Bearer ' + userService.getCurrentToken()
                  }
                }

                $http(req4).then(function(response){
                  console.log(response.data);
                  for (var i = 0; i < $scope.pedidos.length; i++) {
                    for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
                        $scope.pedidos[i].destinos[j].devolucion=response.data;
                        if ($scope.pedidos[i].destinos[j].admin_id!=0 && $scope.pedidos[i].destinos[j].id==id) {
                        for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                           if (response.data>0) {
                              $scope.devolucionesDescrip.push({
                                cantidad: $scope.pedidos[i].destinos[j].admin_id[k].cantD,
                                nombre: $scope.pedidos[i].destinos[j].admin_id[k].nombre,
                                precio: $scope.pedidos[i].destinos[j].admin_id[k].precio
                              });
                           }
                         }
                        }
                    }
                  }
                }, function(error){
                  console.log(error);
                });
            }, 100);
  }

  $scope.verPedido=function(id){
    //console.log(id);
    for (var i = 0; i < $scope.pedidos.length; i++) {
      //console.log($scope.pedidos[i].admin_id);
      if($scope.pedidos[i].id==id){
        console.log($scope.pedidos[i]);
        if($scope.pedidos[i].admin_id==false){
          $scope.pedidos[i].admin_id=true;
          //$scope.calcularCantidad($scope.pedidos[i].destinos[0].id);
        }else{
          $scope.pedidos[i].admin_id=false;
        }
      }
    }
  }

  $timeout(function() {
    var repro = {
      method: 'GET',
      url: '../api/public/api/reprogramados/motorizado?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }
    $http(repro).then(function(response){
      console.log(response.data);
      //alert(JSON.stringify(response.data));
     $scope.pedidos=[];
     $scope.reprogra=response.data;
     for (var i = 0; i < $scope.reprogra.length; i++) {
      // alert(JSON.stringify($scope.reprogra[i]));
      $scope.reprogra[i].admin_id=false;
       $scope.pedidos.push($scope.reprogra[i]);
     }
     $scope.f=$filter('date')(new Date(), "yyyy-MM-dd")
     var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto33/'+$scope.f+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
       
        $scope.historial=[];
        setTimeout(function() {
          //console.log($scope.ped.length);
          $scope.sinDatos=false;
         $scope.banderaLoading=false;
        for (var i = 0; i < $scope.ped.length; i++) {
         // console.log('san');
          if($scope.ped[i].estado==3){
            $scope.banderaLoading=true;
            // alert(JSON.stringify($scope.ped[i]));
            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
        }, 150);
        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            console.log('entro');
            $scope.loading=false;
            $scope.sinDatos=true;
            $scope.$apply();
          }
        },200);

        setTimeout(function() {
          console.log($scope.banderaLoading);
          if ($scope.banderaLoading==false) {
            $scope.loading=false;
            $scope.sinDatos=true;
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=false;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              //console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
              //console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
              //console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
        }, 300);
        setTimeout(function() {
          
          $scope.pedidos.sort(function(a, b){
            return a.id - b.id;
          })
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          for (var i = 0; i < $scope.pedidos.length; i++) {
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
              if ($scope.pedidos[i].destinos[j].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
               $scope.pedidos[i].costoEcommerce=parseFloat($scope.pedidos[i].destinos[j].cobrarecommerce)+parseFloat($scope.pedidos[i].destinos[j].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
              if ($scope.pedidos[i].destinos[j].admin_id!=0) {
                for (var k = 0; k < $scope.pedidos[i].destinos[j].admin_id.length; k++) {
                   if ($scope.pedidos[i].destinos[j].admin_id[k].estado==1) {
                    //$scope.entregados+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==2) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                   else if ($scope.pedidos[i].destinos[j].admin_id[k].estado==0) {
                    //$scope.devolucion+=1;
                    $scope.productos_id=$scope.pedidos[i].destinos[j].id;
                   }
                 }
                 $scope.pedidos[i].destinos[j].entregados=$scope.entregados;
                 $scope.pedidos[i].destinos[j].devolucion=$scope.devolucion;
                 $scope.entregados=0;
                 $scope.devolucion=0;
              }   
            }
          }
          $scope.loading = false;
          // alert(JSON.stringify($scope.pedidos));
          // console.log($scope.pedidos);
          $scope.$apply();
        }, 500);
      }, function(error){
        console.log(error);
        $location.path('/login');
      });
    }, function(error){
        console.log(error);
        //$location.path('/login');
        alert('error');
      });
  }, 1000);
  
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
              $scope.toggle = true;
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

.controller('anuladosCtrl', function($scope,$cookieStore,$sce,CONFIG,userService,$location,$http,$timeout, $mdDialog) {

  $scope.loading = true;

  $scope.verPedido=function(id){
    //console.log(id);
    for (var i = 0; i < $scope.pedidos.length; i++) {
      //console.log($scope.pedidos[i].admin_id);
      if($scope.pedidos[i].id==id){
        if($scope.pedidos[i].admin_id==false){
          $scope.pedidos[i].admin_id=true;
        }else{
          $scope.pedidos[i].admin_id=false;
        }
      }
    }
  }

  $timeout(function() {
     var req2 = {
        method: 'GET',
        //url: '../api/public/api/get_users/'+CONFIG.ID,
        url: '../api/public/api/pedidomoto?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req2).then(function(response){
        $scope.ped = response.data.pedidos;
        $scope.pedidos=[];
        $scope.historial=[];
        setTimeout(function() {
         // console.log($scope.ped.length);
        for (var i = 0; i < $scope.ped.length; i++) {
          //console.log('san');
          if($scope.ped[i].estado==4){

            $scope.pedidos.push($scope.ped[i]);
          }
        }
         
        console.log($scope.pedidos);
      }, 150);

        setTimeout(function() {

          for (var i = 0; i < $scope.pedidos.length; i++) {
            $scope.pedidos[i].admin_id=false;
            if ($scope.pedidos[i].forma_pago==0) {
              $scope.pedidos[i].forma_pago='EFECTIVO';
            }else if ($scope.pedidos[i].forma_pago==1) {
              $scope.pedidos[i].forma_pago='TRANSFERENCIA'
            }else if ($scope.pedidos[i].forma_pago==2) {
              $scope.pedidos[i].forma_pago='POS VISA'
            }
            $scope.pedidos[i].calculoHora= $scope.pedidos[i].destinos[0].hora_destino;
            /*if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)==0){
              var nada= {txt: ''};
              console.log(nada);
              $scope.pedidos[i].calculoHora=nada.txt;
             // return nada;
            }

            if((((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0)>60){
              var horas= {txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/(3,6e+6))*(-1)).toFixed(0) + ' Horas'};
             // console.log(horas);
               $scope.pedidos[i].calculoHora=horas.txt;
              //return horas;
            }else{
              var minutos={txt:(((Date.parse($scope.pedidos[i].created_at)-Date.now())/60000)*(-1)).toFixed(0) + ' Minutos'};
              console.log(minutos);
              $scope.pedidos[i].calculoHora=minutos.txt;
              //return minutos
            }*/    
          }
        }, 300);
        setTimeout(function() {
          $scope.pedidos.sort(function(a, b){
            return b.id - a.id;
          })
          for (var i = 0; i <= $scope.pedidos.length; i++) {
            $scope.pedidos[0].destinos.sort(function(a, b){
              return a.n_marcador - b.n_marcador;
            })
          }
          // console.log($scope.pedidos);
          // console.log(CONFIG.PEDIDO);
         /* for (var i = 0; i < $scope.pedidos.length; i++) {
            console.log($scope.pedidos[i].id);
            if($scope.pedidos[i].id==CONFIG.PEDIDO){
              $scope.pedidos[i].admin_id=true;
              CONFIG.PEDIDO='';
            }
            for (var j = 0; j < $scope.pedidos[i].destinos.length; j++) {
               $scope.pedidos[i].destinos[j].estilos = $scope.sinEstiloEntregado;
               $scope.pedidos[i].destinos[j].show = false;
              if($scope.pedidos[i].destinos[j].estado_destino==1){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloEntregado;
              }else if($scope.pedidos[i].destinos[j].estado_destino==4){
                 $scope.pedidos[i].destinos[j].estilos = $scope.conEstiloAnulado;
              }
            }
          }*/
          if ($scope.pedidos[0].destinos[0].subtotal==0) { $scope.pedidos[i].destinos[j].descuento=0; }
           $scope.costoEcommerce=parseFloat($scope.pedidos[0].destinos[0].cobrarecommerce)+parseFloat($scope.pedidos[0].destinos[0].subtotal)-parseFloat($scope.pedidos[i].destinos[j].descuento);
          console.log($scope.costoEcommerce);
          $scope.loading = false;
          $scope.$apply();
         // console.log($scope.pedidos);
        }, 500);
        //$scope.destinos = $scope.pedidos.destinos;
        //console.log($scope.pedidos);
      }, function(error){
        console.log(error);
        $location.path('/login');
      });
      }, 1000);
  
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
              $scope.toggle = true;
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

.controller('perfilCtrl', function($scope,localStorageService,$cookieStore,$http,$sce,$q,userService,CONFIG,Upload,$mdDialog,$timeout,$location) {

  $scope.loading=true;
        $scope.con='images/user.png';
        $scope.motorizado = {
          'name': '',
          'apellidos': '',
          'dni': '',
          'email': '',
          'telefono': '',
          'tipo_usuario': '',
          'password': '',
          'rpassword': '',
          'tipo_auto': '',
          'modelo_moto': '',
          'ano': '',
          'placa': '',
          'foto':'',
          'img':'',
          'foto_moto': '',
          'activo': '',
          'carnet':'',
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
          url: '../api/public/api/auth/signup_motorizado?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          },
          data: $scope.motorizado
        }

        

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
                $scope.veh = '';
                $scope.con = '';
                $scope.lic = '';
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
            url: '../api/public/api/update_moto_admin/'+ idC+'?token='+userService.getCurrentToken(),
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

        $scope.imagenConductor = '';
        $scope.imagenVehiculo = '';
        $scope.imagenLicencia = '';
        $scope.imagenAntecedente = '';
        $scope.imagenSoat = '';
        $scope.imagenRevision = '';
        $scope.updatearchivo = false;
        var conductor='';
        var vehiculo = '';
        var licencia='';
        var antecedente = '';
        var soat = '';
        var revision = '';
        $scope.antd = 0;
        $scope.soa = 0;

        $scope.changeConductor=function(data){
          $scope.imagenConductor=data;
          $scope.loading = true;
          conductor = new Date().getTime();
          uploadTemp(conductor, data, 6);
        };
        $scope.changeVehiculo=function(data){
          $scope.imagenVehiculo=data;
          $scope.loading = true;
          vehiculo = new Date().getTime();
          uploadTemp(vehiculo, data, 5);
        };

        $scope.changeLicencia=function(data){
          $scope.imagenLicencia=data;
          $scope.loading = true;
          licencia = new Date().getTime();
          uploadTemp(licencia, data, 1);
        };

        $scope.changeAntecedente=function(data){
          $scope.imagenAntecedente=data;
          $scope.loading = true;
          antecedente = new Date().getTime();
          uploadTemp(antecedente, data, 2);
        };

        $scope.changeSoat=function(data){
          $scope.imagenSoat = data;
          $scope.loading = true;
          soat = new Date().getTime();
          uploadTemp(soat, data, 3);
        };

        $scope.changeRevision=function(data){
          $scope.imagenRevision = data;
          $scope.loading = true;
          revision = new Date().getTime();
          uploadTemp(revision, data, 4);
        };
        $scope.deleteVehiculo=function(data){
          $scope.imagenVehiculo = '';
          $scope.motorizado.vehiculo = '';
          $scope.veh = '';
          $scope.loading = false;
          vehiculo = '';
        };
        $scope.deleteConductor=function(data){
          $scope.imagenConductor = '';
          $scope.motorizado.conductor = '';
          $scope.con = '';
          $scope.loading = false;
          conductor = '';
        };
        $scope.deleteLicencia=function(data){
          $scope.imagenLicencia = '';
          $scope.motorizado.licencia = '';
          $scope.lic = '';
          $scope.loading = false;
          licencia = '';
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
                $scope.lic = file.result;
              } else if (i == 2) {
                $scope.ant = file.result;
              } else if (i == 3) {
                $scope.st = file.result;
              } else if (i == 4) {
                $scope.rv = file.result;
              } else if (i == 5) {
                $scope.veh = file.result;
              } else if (i == 6) {
                $scope.con = file.result;
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

        var uploadVehiculo = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;
           $scope.vehiculo = {
            foto_moto:''
          };

          file.upload = Upload.upload({
            url: 'php/subirVehiculo.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.vehiculo.foto_moto = file.result;
             
              var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.vehiculo
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
                    });
              //$scope.setTab(3);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };
        
        var uploadConductor = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;
          $scope.conductor = data;

          file.upload = Upload.upload({
            url: 'php/subirConductor.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.usuario.foto = file.result;
              $scope.usuario.img=file.result;
              console.log($scope.usuario);
              
              var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.usuario
                    }
              var req2 = {
                     method: 'PUT',
                     url: '../api/public/api/update_users/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.usuario
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(error){
                      console.log(error);
                      //alert('ha ocurrido un error al actualizar');
                    });
                    $http(req2).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
                    });
              //$scope.setTab(3);    
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };
        
        var uploadLicencia = function(idC,data) {
          var file = data;
          var name= idC;
          console.log(file);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;

          $scope.licencia = {
            carnet:''
          };

          file.upload = Upload.upload({
            url: 'php/subirLicencia.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.licencia.carnet = file.result;
              //$scope.setTab(3);  

              var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.licencia
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
                    });

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
          $scope.antecedente = {
            antecedente:''
          };

          file.upload = Upload.upload({
            url: 'php/subirAntecedente.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.antecedente.antecedente = file.result;
              //$scope.setTab(3);    

               var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.antecedente
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
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
          $scope.soat = {
            soat:''
          };

          file.upload = Upload.upload({
            url: 'php/subirSoat.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.soat.soat = file.result;

               var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.soat
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
                    });
              //$scope.setTab(4);    
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
          console.log(data);
          var key = 'file,'+idC;
          var obj = {};
          obj[key] = file;
          $scope.revision = {
            revision:''
          };

          file.upload = Upload.upload({
            url: 'php/subirRevision.php',
            data: obj
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              console.log(file.result);
              $scope.revision.revision = file.result;

               var req = {
                     method: 'PUT',
                     url: '../api/public/api/motorizado/'+ CONFIG.ID+'?token='+userService.getCurrentToken(),
                     headers: {
                       'Authorization' : 'Bearer ' + userService.getCurrentToken()
                     },
                     data: $scope.revision
                    }

                    $http(req).then(function(response){
                      console.log('exito');
                    }, function(){
                      console.log('ha ocurrido un error al actualizar');
                    });
              
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
        };

        $scope.adjVehiculo = function(data){
          console.log(data);
          uploadVehiculo(vehiculo,data);
            //uploadConductor(conductor,data1);
        };
        $scope.adjConductor = function(data){
          console.log(data);
          uploadConductor(conductor,data);
        };
      $scope.adjLicencia= function(data){
          console.log(data);
          uploadLicencia(licencia,data);
      };

        $scope.adjAntecedente = function(data){
            console.log(data);
            uploadAntecedente(antecedente,data);
        };

        $scope.adjSoat = function(data){
          console.log(data);
          uploadSoat(soat,data);

        };

        $scope.adjDeclaracion = function(data){
          console.log(data);
          uploadRevision(soat,data);
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

        $scope.atras5 = function() {
          $scope.setTab(4);
        }

        $scope.atras6 = function() {
          $scope.setTab(5);
        }
        $scope.cancel = function() {
          $mdDialog.hide();
        }

        $scope.update = function() {

          console.log($scope.motorizado);

          var req = {
            method: 'POST',
            url: '../api/public/api/auth/signup_motorizado?token='+userService.getCurrentToken(),
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
      
  

  //--------------------------------------------------------------------------------------------------------
  $scope.profile = {
    picture: $sce.trustAsResourceUrl(CONFIG.PICTURE),
    usuario: CONFIG.NOMBRE
  }

  $scope.user = '';

  //if (CONFIG.CLIENTE == '') {
    $timeout(function() {
      
      var req = {
        method: 'GET',
        url: '../api/public/api/get_users/'+localStorageService.get('idLiebre')+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        }
      }

      $http(req).then(function(response){
        console.log(response.data.user);
        CONFIG.CLIENTE = response.data.user;
        $scope.user = response.data.user;
          $scope.con=$scope.user.img;
          $scope.loading=false;
      }, function(){
        //alert('ha ocurrido un error');
      });
    }, 50);
  //} else {
  //  $scope.user = CONFIG.CLIENTE;
  //}

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
    $scope.usuario.foto = $scope.conductor;
    CONFIG.NOMBRE =  $scope.user.name +' '+ $scope.user.apellidos;
    var id = CONFIG.ID;
    $scope.adjConductor($scope.usuario);
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
              $scope.toggle = true;
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


    CONFIG.ROL_CURRENT_USER=0;
    CONFIG.CLIENTE = '';
    CONFIG.NOMBRE = '';
    CONFIG.ID = '';
    CONFIG.PICTURE = '';
      userService.logout();
      $location.path( "/login" );
  }
})


