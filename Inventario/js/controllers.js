angular.module('starter.controllers', [])

.controller('indexCtrl', function($scope,$http,userService){

})

.controller('sidevar', function ($scope, $log,$mdSidenav,$interval,userService,$http,$filter) {

  $scope.items = [
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

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
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
  if ($remember('username_inv') && $remember('password_inv') ) {
      $scope.remember = true;
      $scope.user.username = $remember('username_inv');
      $scope.user.password = $remember('password_inv');
  }
  $scope.rememberMe = function() {
      if ($scope.remember) {
          $remember('username_inv', $scope.user.username);
          $remember('password_inv', $scope.user.password);
      } else {
          $remember('username_inv', '');
          $remember('password_inv', '');
      }
  };

  setTimeout(function() {
    var reqHora = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/auth/getHour?token='+userService.getCurrentToken(),
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
    //CONFIG.ROL_CURRENT_USER = 1;
    //$location.path("/inventario");
    userService.login(
      $scope.user.username, $scope.user.password,
      function(response){
        if (response.data.user.tipo_usuario == 0 || response.data.user.tipo_usuario == 5) {
          CONFIG.ROL_CURRENT_USER = 1;
          $location.path("/dashboard");
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

.controller('DashboardCtrl', function($scope,$http,userService){
   $scope.loading3 = true;
   var req = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/inventario_bajo?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.productos = response.data;
      $scope.loading3 = false;
    }, function(){
      console.log('ha ocurrido un error');
    });
})

.controller('Productos_devueltosCtrl', function($scope,$timeout,userService,$http,$filter,$location,CONFIG,Excel) {

  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.tracking = [];
  $scope.pendientes = [];
  $scope.loading3 = true;
  $scope.devueltosFecha = $filter('date')(new Date(),'yyyy-MM-dd');
  var req = {
    method: 'GET',
    url: '../api/token4/Laravel/public/api/productos_pedido_fechas/'+$scope.devueltosFecha+'?token='+userService.getCurrentToken(),
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
      $scope.loading3 = false;
    }
  }, function(){
    console.log('ha ocurrido un error');
    $scope.loading3 = false;
  });

  $scope.devueltos_fecha=function(fecha){
    $scope.ver_datos=false;
    fecha = $filter('date')(fecha,'yyyy-MM-dd');
    $scope.pagedItems = [];
    $scope.tracking=[];
    $scope.loading3 = true;
    var req = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/productos_pedido_fechas/'+fecha+'?token='+userService.getCurrentToken(),
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
        $scope.loading3 = false;
      }
    }, function(){
      console.log('ha ocurrido un error');
      $scope.loading3 = false;
    });
  }

  $scope.ver_datos=false;
  $scope.ver_dia = function(fecha) {
    console.log(fecha);
    CONFIG.FECHA = fecha;
    //$location.path('/informacion_devueltos');

    var req = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/por_fechas?fecha='+fecha+'&token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.productos_dia = response.data;
      //$scope.groupToPages();
      $scope.ver_datos=true;
    }, function(){
      console.log('ha ocurrido un error');
    });
  }
  $scope.buscar_id='';
  $scope.ver_id = function(fecha) {
    $scope.ver_datos=false;
    var req = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/buscar_productos_pedidos/'+$scope.buscar_id+'?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req).then(function(response){
      console.log(response.data);
      $scope.productos_dia = response.data;
      //$scope.groupToPages();
      $scope.ver_datos=true;
    }, function(){
      console.log('ha ocurrido un error');
    });
  }

  $scope.volver_dia = function() {
    $scope.ver_datos=false;
  }

  $scope.reponer = function(item) {
    console.log('123');
    console.log(item);
    item.reponer = 0;
    $scope.datos = {
      id_producto_pedido: item.id,
      cantD: item.cantD,
      producto_id:item.producto_id,
      color_id:item.color_id,
      atributo_id:item.atributo_id,
      destino_id:item.destino_id,
      pedido_id:item.pedido_id
    };
    if (true) {
      item.check = false;
      $scope.loading4 = true;
      var req2 = {
        method: 'PUT',
        url: '../api/token4/Laravel/public/api/agregar_devueltos/'+item.atributo_id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.datos
      }
      $http(req2).then(function(response){
        console.log(response.data);
        item.reponer = 0;
        $scope.loading4 = false;
        alert('Productos devueltos con éxito');
        /*$mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Productos devueltos con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );*/
      }, function(error){
        console.log(error);
        $scope.loading4 = false;
        item.reponer = 1;
      });
    }
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
  $scope.loading4 = false;

  var fecha = CONFIG.FECHA;

  var req = {
    method: 'GET',
    url: '../api/token4/Laravel/public/api/por_fechas?fecha='+fecha+'&token='+userService.getCurrentToken(),
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
    item.reponer = 0;
    console.log(item);
    $scope.datos = {
      id_producto_pedido: item.id,
      cantD: item.cantD,
      producto_id:item.producto_id,
      color_id:item.color_id,
      atributo_id:item.atributo_id,
      cantidad:item.cantD,
      destino_id:item.destino_id,
      pedido_id:item.pedido_id
    };
    if (item.check) {
      item.check = false;
      $scope.loading4 = true;
      var req2 = {
        method: 'PUT',
        url: '../api/token4/Laravel/public/api/agregar_devueltos/'+item.atributo_id+'?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.datos
      }
      $http(req2).then(function(response){
        console.log(response.data);
        item.reponer = 0;
        $scope.loading4 = false;
        alert('Producto devuelto con éxito');
        /*$mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Productos devueltos con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );*/
      }, function(error){
        console.log(error);
        $scope.loading4 = false;
        item.reponer = 1;
        alert('Error al devolver el producto devuelto con éxito');
      });
    }
  }

  // calculate page in place
  $scope.groupToPages = function () {
      $scope.pagedItems = [];
      
      for (var i = 0; i < $scope.tracking.length; i++) {
          $scope.tracking[i].check = true;
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

.controller('addGuiaCtrl', function($scope,$http,userService,$filter,$mdDialog){

  $scope.guias = {
    'guia':'',
    'cliente': '',
    'fecha1': new Date(),
    'fecha': '',
    'remitente': '',
    'receptor': '',
    'productos': ''
  };

  $scope.productos = [{
    'id': '',
    'cantidad': '',
    'producto': '',
    'nombre': ''
  }];

  $scope.productos_ecommerce = [];

  $scope.addproducto = function() {
    $scope.productos.push({
      'id': '',
      'cantidad': '',
      'producto': '',
      'nombre': ''
    });
  };
    
  $scope.removeproducto = function() {
    var lastItem = $scope.productos.length-1;
    $scope.productos.splice(lastItem);
  };

  var req = {
    method: 'GET',
    url: '../api/token4/Laravel/public/api/get_ecommerce?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req).then(function(response){
    $scope.ori = response.data.users;
    for(var i=0; i<$scope.ori.length; i++){
      $scope.ori[i].nombrecompleto = $scope.ori[i].name +' '+ $scope.ori[i].apellidos;
    }
  }, function(){
    console.log('ha ocurrido un error');
  });

  $scope.selec = function(DirOrigen){
    console.log(DirOrigen);
    for(var i = 0; i < $scope.ori.length; i++){
      if($scope.DirOrigen.id==$scope.ori[i].id){ 
        $scope.guias.cliente = $scope.ori[i].name +' '+ $scope.ori[i].apellidos;
        var req1 = {
          method: 'GET',
          url: '../api/token4/Laravel/public/api/producto/'+$scope.ori[i].id+'?token='+userService.getCurrentToken(),
          headers: {
            'Authorization' : 'Bearer ' + userService.getCurrentToken()
          }
        }

        $http(req1).then(function(response){
          console.log(response.data);
          $scope.productos_ecommerce = response.data;
        }, function(){
          console.log('ha ocurrido un error');
        });
      }
    }
  };

  function limpiar() {
    $scope.guias = {
      'guia':'',
      'cliente': '',
      'fecha1': new Date(),
      'fecha': '',
      'remitente': '',
      'receptor': '',
      'productos': ''
    };

    $scope.productos = [{
      'id': '',
      'cantidad': '',
      'producto': '',
      'nombre': ''
    }];

    $scope.productos_ecommerce = [];
    $scope.direcciones = null;
    $scope.DirOrigen = '';
  };

  $scope.change_producto = function(producto) {
    producto.id = producto.producto.id;
    producto.nombre = producto.producto.producto;
  }


  $scope.guardar = function() {
    $scope.guias.productos = JSON.stringify($scope.productos);
    $scope.guias.fecha = $filter('date')(new Date($scope.guias.fecha1),'yyyy-MM-dd');

    var confirm = $mdDialog.confirm()
    .title('Courier Liebre Express | Administrativo')
    .textContent('¿Desea agregar la guía?')
    .ariaLabel('Lucky day')
    .ok('SI')
    .cancel('NO');

    $mdDialog.show(confirm).then(function() {

      var req2 = {
        method: 'POST',
        url: '../api/token4/Laravel/public/api/guias/store?token='+userService.getCurrentToken(),
        headers: {
          'Authorization' : 'Bearer ' + userService.getCurrentToken()
        },
        data: $scope.guias
      }

      $http(req2).then(function(response){
        limpiar();
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Guía guardada con éxito')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      }, function(error){
        console.log(error);
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Courier Liebre Express | Administrativo')
            .textContent('Ha ocurrido un error al guardar la guía')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
        );
      });
    }, function() {
      
    });
  }
})

.controller('listadoGuiaCtrl', function($scope,$http,userService,$filter,$mdDialog){

  $scope.tracking = [];
  $scope.tracking2 = [];
  $scope.groupedItems = [];
  $scope.itemsPerPage = 50;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  $scope.loading3 = true;
  $scope.fecha_guia=new Date();
  $scope.guia_cliente='';
  var req1 = {
    method: 'GET',
    url: '../api/token4/Laravel/public/api/guias?token='+userService.getCurrentToken(),
    headers: {
      'Authorization' : 'Bearer ' + userService.getCurrentToken()
    }
  }

  $http(req1).then(function(response){
    $scope.tracking = response.data.guias;
    $scope.tracking2 = $scope.tracking;
    $scope.tracking.sort(function(a,b) {
     return b.id - a.id; 
    })
    $scope.groupToPages();
    $scope.loading3 = false;
  }, function(){
    scope.loading3 = false;
    console.log('ha ocurrido un error');
  });

  $scope.cliente = function () {
    
    console.log($scope.guia_cliente);
    var req1 = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/guias_cliente?cliente='+$scope.guia_cliente+'&token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req1).then(function(response){
      console.log(response);
      $scope.tracking = response.data;
      $scope.tracking2 = $scope.tracking;
      $scope.tracking.sort(function(a,b) {
       return b.id - a.id; 
      })
      $scope.groupToPages();
      $scope.loading3 = false;
    }, function(){
      scope.loading3 = false;
      console.log('ha ocurrido un error');
    });
  }

  $scope.fecha = function (fecha) {
    
    fecha=$filter('date')(new Date(fecha),'yyyy-MM-dd');
    console.log(fecha);
    var req1 = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/guias_fechas?fecha='+fecha+'&token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }

    $http(req1).then(function(response){
      console.log(response);
      $scope.tracking = response.data;
      $scope.tracking2 = $scope.tracking;
      $scope.tracking.sort(function(a,b) {
       return b.id - a.id; 
      })
      $scope.groupToPages();
      $scope.loading3 = false;
    }, function(){
      scope.loading3 = false;
      console.log('ha ocurrido un error');
    });
  }

  $scope.filtrar = function () {
    console.log($scope.search);
     if($scope.search != ""){
        $scope.tracking=[];
        for (var i = 0; i < $scope.tracking2.length; i++) {
          if ($scope.tracking2[i].guia.indexOf($scope.search.toUpperCase())>=0) {
             $scope.tracking.push($scope.tracking2[i]);
          }else if ($scope.tracking2[i].cliente.toUpperCase().indexOf($scope.search.toUpperCase())>=0) {
             $scope.tracking.push($scope.tracking2[i]);
          }
        }
        $scope.groupToPages();
      }else{
        $scope.tracking = $scope.tracking2;
        $scope.groupToPages();
      }
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

  $scope.ver_guia = function(item) {
    $scope.guias = item;
    $scope.productos = JSON.parse(item.productos);
  }
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
    url: '../api/token4/Laravel/public/api/get_ecommerce?token='+userService.getCurrentToken(),
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
    url: '../api/token4/Laravel/public/api/users?token='+userService.getCurrentToken(),
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
          url: '../api/token4/Laravel/public/api/update_users/'+ pedido.id+'?token='+userService.getCurrentToken(),
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
          url: '../api/token4/Laravel/public/api/update_users/'+ pedido.id+'?token='+userService.getCurrentToken(),
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

  $scope.verTienda=function(id,nombre){
    console.log(nombre);
    CONFIG.ECOMMERCE=id;
    CONFIG.ECOMMERCE_NOMBRE=nombre;
    $location.path( "/productos" );
  }  
})

.controller('ProductosCtrl', function($scope,$location,$timeout,userService,$http,$filter,$mdDialog,CONFIG,Upload,FileSaver) {

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
  $scope.stock = [];
  $timeout(function() {
    var req2 = {
      method: 'GET',
      url: '../api/token4/Laravel/public/api/inventario/'+CONFIG.ECOMMERCE+'?token='+userService.getCurrentToken(),
      headers: {
        'Authorization' : 'Bearer ' + userService.getCurrentToken()
      }
    }
    $http(req2).then(function(response){
      if (response.data != '') {
        $scope.inventarios = response.data.productos;
        
        for (var i = 0; i < $scope.inventarios.length; i++) {
          $scope.inventarios[i].admin_id=false;
          if ($scope.inventarios[i].imagen == '') {
            $scope.inventarios[i].imagen = 'images/no-image.png';
          }  
        }
        for (var i = 0; i < $scope.inventarios.length; i++) {
          $scope.inventarios[i].cantidad=0; 
          
          for (var j = 0; j < $scope.inventarios[i].colores.length; j++) {
            
            for (var z = 0; z < $scope.inventarios[i].colores[j].atributos.length; z++) {
              
              $scope.inventarios[i].cantidad=$scope.inventarios[i].cantidad+parseInt($scope.inventarios[i].colores[j].atributos[z].cantidad);
              $scope.stock.push({
                nombre:$scope.inventarios[i].nombre,
                color:$scope.inventarios[i].colores[j].nombrecolor,
                atributo:$scope.inventarios[i].colores[j].atributos[z].atributo,
                stock:$scope.inventarios[i].colores[j].atributos[z].cantidad,
                precio:$scope.inventarios[i].colores[j].atributos[z].precio
              });
              
            }
          }
        }
        console.log($scope.inventarios);
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

  $scope.exportar=function(){
    console.log('exportar');
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
         FileSaver.saveAs(blob, CONFIG.ECOMMERCE_NOMBRE+".xls");
  }
  $scope.exportar2=function(nombre){
    console.log('exportar2');
    var blob = new Blob([document.getElementById('exportable2').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
         FileSaver.saveAs(blob, nombre+".xls");
  }

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
            url: '../api/token4/Laravel/public/api/producto/'+producto_id+'?token='+userService.getCurrentToken(),
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
                  url: '../api/token4/Laravel/public/api/color/'+color_id+'?token='+userService.getCurrentToken(),
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

  $scope.guardar=function(idi,idj,idk){
    $scope.enviar={
      atributo:'',
      cantidad:'',
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
                    url: '../api/token4/Laravel/public/api/atributo/'+id_atributo+'?token='+userService.getCurrentToken(),
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
                      url: '../api/token4/Laravel/public/api/atributo/'+id_atributo+'?token='+userService.getCurrentToken(),
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
      cantidad:0,
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
        url: '../api/token4/Laravel/public/api/atributo/store?token='+userService.getCurrentToken(),
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
        url: '../api/token4/Laravel/public/api/color/store?token='+userService.getCurrentToken(),
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
        url: '../api/token4/Laravel/public/api/color/store?token='+userService.getCurrentToken(),
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
          url: '../api/token4/Laravel/public/api/producto/store?token='+userService.getCurrentToken(),
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
          url: '../api/token4/Laravel/public/api/producto/'+$scope.producto.id+'?token='+userService.getCurrentToken(),
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

.directive('loading3', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div style="text-align:center;padding:2% 0% 5% 0%;display:block"><img src="images/spina.svg" style="width:35px !important;height:35px !important; display:block !important;margin:auto !important;"/></div>',
    link: function (scope, element, attr) {
      scope.$watch('loading3', function (val) {
          if (val)
              $(element).show();
          else
              $(element).hide();
      });
    }
  }
})

.directive('loading4', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div style="text-align:center;padding-top:30%;position:fixed;left:0;right:0;bottom:0;top:0;background-color: rgba(0, 0, 0, 0.7);z-index: 999;"><img src="images/spina.svg" style="width:60px !important;height:60px !important;"/></div>',
    link: function (scope, element, attr) {
      scope.$watch('loading4', function (val) {
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

