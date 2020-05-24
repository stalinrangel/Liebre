
<?PHP


	function sendMessage(){

		$postdata = file_get_contents("php://input");
		$ID= $_SERVER['HTTP_ID'];



			$content = array(
				"en" => '¡Se te ha asignado un pedido!'
				);
			
			$fields = array("idUsuario"=> "900",
                    "idConductor"=>"72",
                    "Idioma"=> "esp");
			
			$fields = json_encode($fields);
	    	print("\nJSON sent:\n");
	    	print($fields);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://qat.exitum.us:9787/api/st_conductorVehiculoActivo_consulta");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8','
													   authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhdGltYWJvZXRAZ21haWwuY29tIiwiaWRVc3VhcmlvIjo5MDAsImlhdCI6MTU0MTAzMTY4MSwiZXhwIjoxNTQxMTE4MDgxfQ.0XEzFDlkvjsVv02z0CiWtGsqRv6M8KjySUyFVf9WPeo'));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

			$response = curl_exec($ch);
			curl_close($ch);
			//$pushes=$pushes.'"'.$server_output[$i]->push.'",';
		//}
		//$pushes=substr($pushes, 0,-1);
		//echo $pushes;
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  print("\n\nJSON received:\n");
	print($return);
  print("\n");
?>