<?php

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
  $count=0;
  $outp = "";
  $conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
    or die("Error connection DB");
  //$objetoCliente->id='1152';

    $sql = "SELECT * FROM pedido where id_cliente=:id_cliente";
  $resultado=$conn->prepare($sql);
  $resultado->execute(array(
    'id_cliente'=>$objetoCliente->id
    ));
  while($registro=$resultado->fetch(PDO::FETCH_ASSOC)){
    //echo  $registro['email'] . $registro['clave'];
    //echo  $objetoCliente->email . $objetoCliente->clave;
    $count = $count + 1;
    
      if (isset($registro["id"])){
          if ($outp != "") {$outp .= ",";}

            $outp .= '{"id":"'  . $registro["id"] . '",';
            $outp .= '"count":"'  . $count . '",';
            $outp .= '"tipo_retorno":"'  . $registro["tipo_retorno"] . '",';
            $outp .= '"comentario":"'  . $registro["comentario"] . '",';
            if ($registro["estado"] == 0) {
                $outp .= '"estado":"POR ASIGNAR",';
            }
            if ( $registro["id_servicio"] == 1) {
                $outp .= '"id_servicio":"URGENTE",';
            }
            if ($registro["id_servicio"] == 2) {
                $outp .= '"id_servicio":"PROGRAMADO",';
            }
            $outp .= '"tipo_registrado":"'  . $registro["tipo_registrado"] . '",';
            $outp .= '"fecha_servicio":"'  . $registro["fecha_servicio"] . '",';
            $outp .= '"id_cliente":"'  . $registro["id_cliente"] . '",';
            $outp .= '"fecha_registro":"'  . $registro["fecha_registro"] . '",';
            $outp .= '"pedido_dni_ruc":"'  . $registro["pedido_dni_ruc"] . '",';
            $outp .= '"pedido_nombres_razonsocial":"'  . $registro["pedido_nombres_razonsocial"] . '",';
            $outp .= '"pedido_telefono":"'  . $registro["pedido_telefono"] . '",';
            $outp .= '"costo_total":"'  . $registro["costo_total"] . '"}'; 
      }    
  }

$outp ='[ '.$outp.' ]';

echo(utf8_encode($outp));

?>