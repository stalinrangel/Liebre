<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {  
              header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
              header('Access-Control-Allow-Credentials: true');  
              header('Access-Control-Max-Age: 86400');   
         }  
  
      if ($_SERVER['objetoCliente_METHOD'] == 'OPTIONS') {  
  
          if (isset($_SERVER['HTTP_ACCESS_CONTROL_objetoCliente_METHOD']))  
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
  
          if (isset($_SERVER['HTTP_ACCESS_CONTROL_objetoCliente_HEADERS']))  
           header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_objetoCliente_HEADERS']}");  
                                                    }

  $jsonCliente = file_get_contents("php://input");
  $objetoCliente = json_decode($jsonCliente);

  require 'administracion.php';


   /*$objetoCliente->name='rigoberto';
    $objetoCliente->email='eas@as.com';
    $objetoCliente->lastname='gggggg';
    $objetoCliente->number='5555555';
    $objetoCliente->password='55555555';
    $objetoCliente->ruc='555555';
    $objetoCliente->dni='555555';*/
    $nombres = utf8_decode($objetoCliente->name);
    $email = $objetoCliente->email;
    $apellido_paterno = $objetoCliente->lastname;
    $telefono = $objetoCliente->number;
    $clave = $objetoCliente->password;
    $tipo_registrado='WEB';
    //$razon_social = $objetoCliente->razon_social;
    $ruc = $objetoCliente->ruc;

    date_default_timezone_set('America/Lima');
    $date=new DateTime();
    $fecha_registro=$date->format('Y-m-d H:i:s');



  $bandera=0;
  $outp = "";
  $conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
    or die("Error connection DB");


   // $sql = "SELECT * FROM cliente where email=:email OR nombre_usuario = :usuario";
    $sql = "SELECT * FROM cliente where email=:email";

    $resultado=$conn->prepare($sql);
    $resultado->execute(array(
      'email'=>$objetoCliente->email
      ));

    while($registro=$resultado->fetch(PDO::FETCH_ASSOC)){
      $bandera=1;
    }

    if($bandera==1){
      echo '0';
    }else{

    $sql = 'INSERT INTO cliente (nombres, apellido_paterno, email, telefono, clave, ruc,tipo_registrado,dni) VALUES  (:nombres, :apellido_paterno, :email, :telefono, :clave, :ruc,:tipo_registrado,:dni)';
    $resultado=$conn->prepare($sql);
    $resultado->execute(array(
    ':nombres'=>$objetoCliente->name,
     ':apellido_paterno'=>$objetoCliente->lastname,
     ':email'=>$objetoCliente->email,
     ':telefono'=>$objetoCliente->number,
     ':clave'=>$objetoCliente->password,
     ':ruc'=>$objetoCliente->ruc,
     ':tipo_registrado'=>$tipo_registrado,
     ':dni'=>$objetoCliente->dni

    ));
  
    echo '1';
  }




?>