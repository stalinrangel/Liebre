<?php

	$jsonCliente = file_get_contents("php://input");

	$objetoCotizar = json_decode($jsonCliente);

	require 'administracion.php';
	date_default_timezone_set('America/Lima');
	$date=new DateTime();
	$objetoCotizar->fecha_servicio=$date->format('Y-m-d');
	$objetoCotizar->fecha_registro=$date->format('Y-m-d H:i:s');

	$bandera=0;
	$conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
		or die("Error connection DB");

			//$objetoCotizar->fecha_servicio=0;
			//$objetoCotizar->id_cliente=1152;
			//$objetoCotizar->fecha_registro='00-00-0000';
			$objetoCotizar->pedido_dni_ruc=0;
			$objetoCotizar->pedido_nombres_razonsocial=0;
			$objetoCotizar->pedido_telefono=0;
			$objetoCotizar->costo_total=0;

		$sql = "INSERT INTO pedido (tipo_retorno, comentario, estado, id_servicio, tipo_registrado,fecha_servicio,id_cliente,fecha_registro,pedido_dni_ruc,pedido_nombres_razonsocial,pedido_telefono,costo_total) values (:tipo_retorno, :comentario, :estado, :id_servicio, :tipo_registrado,:fecha_servicio,:id_cliente,:fecha_registro,:pedido_dni_ruc,:pedido_nombres_razonsocial,:pedido_telefono,:costo_total)";
		$q = $conn->prepare($sql);

		$q->execute(array(
			':tipo_retorno'=>'0',
			':comentario'=>'',
			':estado'=>'0',
			':id_servicio'=>'2',
			':tipo_registrado'=>"APP",
			':fecha_servicio'=>$objetoCotizar->fecha_servicio,
			':id_cliente'=>$objetoCotizar->id_cliente,
			':fecha_registro'=>$objetoCotizar->fecha_registro,
			':pedido_dni_ruc'=>$objetoCotizar->pedido_dni_ruc,
			':pedido_nombres_razonsocial'=>$objetoCotizar->pedido_nombres_razonsocial,
			':pedido_telefono'=>$objetoCotizar->pedido_telefono,
			':costo_total'=>$objetoCotizar->costo_total
			));


		$conn = NULL;


	
	$conn = new mysqli($servidorbd,$usuariobd,$clavebd,$nombrebd)
		or die("Error connection DB");

		
		$sql = "SELECT * FROM pedido ORDER BY fecha_registro DESC";
	$resultado=$conn->query($sql);
	
	
	$cont=0;

	$idcliente=$objetoCotizar->id_cliente;

	while($registro=$resultado->fetch_array(MYSQLI_ASSOC)){
		//echo  $registro['id']. ' ' . $registro['id_cliente'] . '=' . $idcliente . '\n';
		if($registro['id_cliente']==$idcliente){
			//echo'iguales';
			$cont=1+$cont;
		
			if($cont===1){
				echo  $registro['id'];
			}
		}
	}

	//echo 'sdsd';
	

		$conn = NULL;
		
	?>