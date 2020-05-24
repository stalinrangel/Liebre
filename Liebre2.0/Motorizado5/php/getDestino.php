<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {  
              header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
              header('Access-Control-Allow-Credentials: true');  
              header('Access-Control-Max-Age: 86400');   
         }  
  
      if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  
  
          if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))  
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
  
          if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))  
           header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
                                                    }

  $jsonCliente = file_get_contents("php://input");
  $objetoCliente = json_decode($jsonCliente);
  //$objetoCliente->email='e.rangel@gmail.com';
  //$objetoCliente->id='8';
  require 'administracion.php';
  /*$servidorbd = "localhost";
  $nombrebd = "rattios_segmed";
  $usuariobd = "root";
  $clavebd = "";*/
  $bandera=0;
  $outp = "";
  $conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
    or die("Error connection DB");
  $objetoCliente->id='576';

    $sql = "SELECT * FROM destino where idPedido=:idPedido";
  $resultado=$conn->prepare($sql);
  $resultado->execute(array(
    'idPedido'=>$objetoCliente->id
    ));
  while($registro=$resultado->fetch(PDO::FETCH_ASSOC)){
    //echo  $registro['email'] . $registro['clave'];
    //echo  $objetoCliente->email . $objetoCliente->clave;
  
      if (isset($registro["id"])){
          if ($outp != "") {$outp .= ",";}
            $outp .= '{"origen":"'  . $registro["origen"] . '",';
            $outp .= '"idPedido":"'  . $registro["idPedido"] . '",';
            $outp .= '"departamentoOrigen":"'  . $registro["departamentoOrigen"] . '",';
            $outp .= '"nombreOrigen":"'  . $registro["nombreOrigen"] . '",';
            $outp .= '"telefonoOrigen":"'  . $registro["telefonoOrigen"] . '",';
            $outp .= '"lat":"'  . $registro["lat"] . '",';
            $outp .= '"lng":"'  . $registro["lng"] . '",';
            $outp .= '"myDate":"'  . $registro["myDate"] . '",';
            $outp .= '"recojo":"'  . $registro["recojo"] . '",';
            $outp .= '"comentarios":"'  . $registro["comentarios"] . '",';
            $outp .= '"destino":"'  . $registro["destino"] . '",';
            $outp .= '"departamentoDestino":"'  . $registro["departamentoDestino"] . '",';
            $outp .= '"nombreDestino":"'  . $registro["nombreDestino"] . '",';
            $outp .= '"telefonoDestino":"'  . $registro["telefonoDestino"] . '",';
            $outp .= '"lat2":"'  . $registro["lat2"] . '",';
            $outp .= '"lng2":"'  . $registro["lng2"] . '",';
            $outp .= '"comentarios2":"'  . $registro["comentarios2"] . '",';
            $outp .= '"myDate2":"'  . $registro["myDate2"] . '",';
            $outp .= '"entrega":"'  . $registro["entrega"] . '",';
            $outp .= '"estado":"'  . $registro["estado"] . '"}'; 

      }    
  }

$outp ='[ '.$outp.' ]';

echo(utf8_encode($outp));

?>