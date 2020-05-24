angular.module('starter.services', [])

.constant('CONFIG', {
    TEMPLATE_DIR:"templates/",
    CLIENTE: [],
    PEDIDO: [],
    MOTORIZADOS: [],
    ECOMMERCE:'',
    SELECTED: [],
    LIQUIDADOS: [],
    USUARIO: '',
    COSTOS: [],
    DISTRITOS: [],
    LIQ_ID: '',
    LIQUIDACION: [],
    ORDENES: [],
    FECHA: '',
    ROL_CURRENT_USER: 0
})

.constant('ROLES', {
       SINLOGIN: {
       ROL:0,
       PATH:"/login"
       },
       PERSONA: {
       ROL:1,
       PATH:"/persona"
       },
       EMPRESA: {
       ROL:2,
       PATH:"/empresa"
       },
       ECOMMERCE: {
       ROL:3,
       PATH:"/ecommerce"
}
})

.factory('userService', ['$http', 'localStorageService', function($http, localStorageService) {

    function checkIfLoggedIn() {
      console.log(localStorageService.get('Administrativo-Token'));
        if(localStorageService.get('Administrativo-Token'))
            return true;
        else
            return false;

    }

    function signup(name, email, password, apellidos, dni, razon_social, ruc, telefono, tipo_usuario ,onSuccess, onError) {

        $http.post('../api/token4/Laravel/public/api/auth/signup', 
        {
            name: name,
            email: email,
            password: password,
            apellidos: apellidos,
            dni: dni,
            razon_social: razon_social, 
            ruc: ruc, 
            telefono: telefono, 
            tipo_usuario: tipo_usuario
        }).
        then(function(response) {
            ///alert('usuario logueado con exito!');
            //localStorageService.set('Administrativo-Token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){

        $http.post('../api/token4/Laravel/public/api/auth/login', 
        {
            email: email,
            password: password
        }).
        then(function(response) {

            localStorageService.set('Administrativo-Token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }
    var retorno ='';
    function getBooks( onSuccess, onError){
      var req = {
       method: 'GET',
       url: '../api/token4/Laravel/public/api/book',
       headers: {
         'Authorization' : 'Bearer ' + getCurrentToken()
       }
      }

      $http(req).then(function(response){console.log(response.data);
        retorno= response.data;
      }, function(){});

        return retorno;

    }

    function logout(){

        localStorageService.remove('Administrativo-Token');

    }

    function getCurrentToken(){
        return localStorageService.get('Administrativo-Token');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        getBooks: getBooks,
        logout: logout,
        getCurrentToken: getCurrentToken
    }

}])