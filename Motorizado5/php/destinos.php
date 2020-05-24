<?php

	$jsonCliente = file_get_contents("php://input");

	$objetoCotizar = json_decode($jsonCliente);

require 'administracion.php';
	/*$servidorbd = "localhost";
	$nombrebd = "dbcourier";
	$usuariobd = "adminliebre2016";
	$clavebd = "Liebre2016";*/
			$objetoCotizar->origen=0;
			$objetoCotizar->departamentoOrigen=0;
			$objetoCotizar->nombreOrigen=0;
			$objetoCotizar->telefonoOrigen=0;
			$objetoCotizar->lat=0;
			$objetoCotizar->lng=0;
			$objetoCotizar->myDate='';
			$objetoCotizar->recojo=0;
			$objetoCotizar->comentarios=0;

			$objetoCotizar->origen_direccion='0';
			$objetoCotizar->origen_distrito ='0';
			$objetoCotizar->origen_contacto='0';
			$objetoCotizar->origen_contacto_telefono='0';
			$objetoCotizar->rango_origen='0';
			$objetoCotizar->destino_direccion='0';
			$objetoCotizar->destino_distrito='0';
			$objetoCotizar->id_pedido='0';
			$objetoCotizar->id_cliente='0';
			$objetoCotizar->costo_por_destino ='0';
			$objetoCotizar->rango_destino='0';
			$objetoCotizar->retorno_destino='0';
			$objetoCotizar->porcentaje_de_retorno='0';
	
	$bandera=0;
	$conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
		or die("Error connection DB");

$sql = "INSERT INTO destinos (origen_direccion, origen_distrito, origen_contacto, origen_contacto_telefono, rango_origen,	destino_direccion, destino_distrito, id_pedido, id_cliente, costo_por_destino,  rango_destino, retorno_destino, porcentaje_de_retorno) values (:origen_direccion, :origen_distrito, :origen_contacto, :origen_contacto_telefono, :rango_origen, :destino_direccion, :destino_distrito, :id_pedido, :id_cliente, :costo_por_destino,  :rango_destino, :retorno_destino, :porcentaje_de_retorno)";
		$q = $conn->prepare($sql);

				$q->execute(array(
			':origen_direccion'=>utf8_decode($objetoCotizar->origen_direccion),
			':origen_distrito'=>$objetoCotizar->origen_distrito, 
			':origen_contacto'=>utf8_decode($objetoCotizar->origen_contacto), 
			':origen_contacto_telefono'=>$objetoCotizar->origen_contacto_telefono, 
			':rango_origen'=>$objetoCotizar->rango_origen, 
			':destino_direccion'=>utf8_decode($objetoCotizar->destino_direccion), 
			':destino_distrito'=>$objetoCotizar->destino_distrito, 
			':id_pedido'=>$objetoCotizar->id_pedido, 
			':id_cliente'=>$objetoCotizar->id_cliente, 
			':costo_por_destino'=>$objetoCotizar->costo_por_destino, 
			':rango_destino'=>$objetoCotizar->rango_destino, 
			':retorno_destino'=>$objetoCotizar->retorno_destino, 
			':porcentaje_de_retorno'=>$objetoCotizar->porcentaje_de_retorno
			));

	
		$conn = NULL;

		echo "Nuevo Usuario";
	?>