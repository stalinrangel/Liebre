<?php

	$jsonCliente = file_get_contents("php://input");

	$objetoCotizar = json_decode($jsonCliente);

	date_default_timezone_set('America/Lima');
	$date=new DateTime();
	$objetoCotizar->myDate=$date->format('Y-m-d');
	$objetoCotizar->myDate2=$date->format('Y-m-d H:i:s');

require 'administracion.php';
		/*	$objetoCotizar->idPedido=799;
			$objetoCotizar->origen='Distrito de Lima, Perú';
			$objetoCotizar->departamentoOrigen='departamentoOrigen';
			$objetoCotizar->nombreOrigen='nombreOrigen';
			$objetoCotizar->telefonoOrigen='222222';
			$objetoCotizar->lat=-12.046374;
			$objetoCotizar->lng=-77.04279342017;
			//$objetoCotizar->myDate='01-01-2001';
			$objetoCotizar->recojo='';
			$objetoCotizar->comentarios=Comentariossss;
			$objetoCotizar->destino='Ramiro Priale, La Victoria 15034, Perú';
            $objetoCotizar->departamentoDestino='DepartamentoDestino';
            $objetoCotizar->nombreDestino='NombreDestino';
            $objetoCotizar->telefonoDestino='4444444';
            $objetoCotizar->lat2=-12.046374;
			$objetoCotizar->lng2=-77.04279342017;
            $objetoCotizar->comentarios='ComentariosDestino';
            //$objetoCotizar->myDate2='01-01-2001';
            $objetoCotizar->entrega='';
            $objetoCotizar->estado='';
/*
origen,departamentoOrigen,nombreOrigen,telefonoOrigen,lat,lng,myDate,recojo,comentarios,destino,departamentoDestino,nombreDestino,telefonoDestino,comentarios,myDate2,entrega,estado

:origen,:departamentoOrigen,:nombreOrigen,:telefonoOrigen,:lat,:lng,:myDate,:recojo,:comentarios,:destino,:departamentoDestino,:nombreDestino,:telefonoDestino,:comentarios,:myDate2,:entrega,:estado

':origen'=>$objetoCotizar->origen,
':departamentoOrigen'=>$objetoCotizar->departamentoOrigen,
':nombreOrigen'=>$objetoCotizar->nombreOrigen,
':telefonoOrigen'=>$objetoCotizar->telefonoOrigen,
':lat'=>$objetoCotizar->lat,
':lng'=>$objetoCotizar->lng,
':myDate'=>$objetoCotizar->myDate,
':recojo'=>$objetoCotizar->recojo,
':comentarios'=>$objetoCotizar->comentarios,
':destino'=>$objetoCotizar->destino,
':departamentoDestino'=>$objetoCotizar->departamentoDestino,
':nombreDestino'=>$objetoCotizar->nombreDestino,
':telefonoDestino'=>$objetoCotizar->telefonoDestino,
':comentarios'=>$objetoCotizar->comentarios,
':myDate2'=>$objetoCotizar->myDate2,
':entrega'=>$objetoCotizar->entrega,
':estado'=>$objetoCotizar->estado
	*/
	$bandera=0;
	$conn = new PDO("mysql:host=$servidorbd;dbname=$nombrebd",$usuariobd,$clavebd)
		or die("Error connection DB");

$sql = "INSERT INTO destino (n_marcador,origen,idPedido,departamentoOrigen,nombreOrigen,telefonoOrigen,lat,lng,myDate,recojo,comentarios,destino,departamentoDestino,nombreDestino,telefonoDestino,lat2,lng2,comentarios2,myDate2,entrega,estado) values (:n_marcador,:origen,:idPedido,:departamentoOrigen,:nombreOrigen,:telefonoOrigen,:lat,:lng,:myDate,:recojo,:comentarios,:destino,:departamentoDestino,:nombreDestino,:telefonoDestino,:lat2,:lng2,:comentarios2,:myDate2,:entrega,:estado)";
		$q = $conn->prepare($sql);

		$q =		$q->execute(array(
			':n_marcador'=>$objetoCotizar->n_marcador,
			':idPedido'=>$objetoCotizar->idPedido,
			':origen'=>utf8_decode($objetoCotizar->origen),
			':departamentoOrigen'=>utf8_decode($objetoCotizar->departamentoOrigen),
			':nombreOrigen'=>utf8_decode($objetoCotizar->nombreOrigen),
			':telefonoOrigen'=>$objetoCotizar->telefonoOrigen,
			':lat'=>$objetoCotizar->lat,
			':lng'=>$objetoCotizar->lng,
			':myDate'=>$objetoCotizar->myDate,
			':recojo'=>$objetoCotizar->recojo,
			':comentarios'=>utf8_decode($objetoCotizar->comentarios),
			':destino'=>utf8_decode($objetoCotizar->destino),
			':departamentoDestino'=>utf8_decode($objetoCotizar->departamentoDestino),
			':nombreDestino'=>utf8_decode($objetoCotizar->nombreDestino),
			':telefonoDestino'=>$objetoCotizar->telefonoDestino,
			':lat2'=>$objetoCotizar->lat2,
			':lng2'=>$objetoCotizar->lng2,
			':comentarios2'=>utf8_decode($objetoCotizar->comentarios2),
			':myDate2'=>$objetoCotizar->myDate2,
			':entrega'=>$objetoCotizar->entrega,
			':estado'=>$objetoCotizar->estado
			));

	
		$conn = NULL;

		echo $q;
			
	?>