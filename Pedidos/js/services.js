angular.module('starter.services', [])

.constant('CONFIG', {
    TEMPLATE_DIR:"templates/",
    ROL_CURRENT_USER: 0,
    ID: '',
    NOMBRE: '',
    CLIENTE: '',
    IDFAVORITO: '',
    PICTURE: 'images/user-black.png',
    COSTOS: '',
    DISTRITOS: [],
    DATE: ''
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
      console.log(localStorageService.get('Liebre-Token'));
        if(localStorageService.get('Liebre-Token'))
            return true;
        else
            return false;

    }

    function signup(name, email, password, apellidos, dni, razon_social, ruc, telefono, tipo_usuario, onSuccess, onError) {

        $http.post('../api/public/api/auth/signup', 
        {
            name: name,
            email: email,
            password: password,
            apellidos: apellidos,
            dni: dni,
            razon_social: razon_social, 
            ruc: ruc, 
            telefono: telefono, 
            tipo_usuario: tipo_usuario,
            img: '/Liebre/images/user.png'
        }).
        then(function(response) {
            ///alert('usuario logueado con exito!');
            //localStorageService.set('token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){

        $http.post('../api/public/api/auth/login', 
        {
            email: email,
            password: password
        }).
        then(function(response) {

            localStorageService.set('Liebre-Token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login_facebook(email, password, name, apellidos, img, tipo_usuario, tipo_registrado,onSuccess, onError){
        console.log(email);
        console.log(password);
        console.log(name);
        
        $http.post('../api/public/api/auth/login_facebook', 
        {
            email: email,
            password: password,
            name: name,
            apellidos: apellidos,
            img: img,
            tipo_usuario: tipo_usuario,
            tipo_registrado: tipo_registrado

        }).
        then(function(response) {

            localStorageService.set('Liebre-Token', response.data.token);
            onSuccess(response);

        }, function(response) {
            //alert('errror');
            onError(response);

        });
    }

    var retorno ='';
    function getBooks( onSuccess, onError){
      var req = {
       method: 'GET',
       url: '../api/public/api/book',
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

      localStorageService.remove('Liebre-Token');

    }

    function getCurrentToken(){
        return localStorageService.get('Liebre-Token');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        login_facebook: login_facebook,
        getBooks: getBooks,
        logout: logout,
        getCurrentToken: getCurrentToken
    }

}])