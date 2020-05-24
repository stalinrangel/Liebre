<?PHP
	//function sendMessage(){
	$postdata = file_get_contents("php://input");
	$header= $_SERVER['HTTP_XFOO'];
	$headers= '$_SERVER';
		$content = array(
			"en" => 'English Message'
			);
		
		$fields = array(
			'app_id' => "50d18a75-3b82-42eb-8902-f38821e86990",
			'included_segments' => array('All'),
	      'data' => array("foo" => "bar"),
	      'url'=> 'https://www.kensetsuingenieros.com/Liebre/#/tracking',
			'contents' => $content
		);
		
		$fields = json_encode($fields);
    print("\nJSON sent:\n");
    print($header);
    
    $file='resultado.php';
  	$datos= utf8_encode($header.' hola: o'.$postdata->longitude);
  	file_put_contents($file, $datos);
	/*	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic OWY3ZDllODItODE4MC00OGU5LWIwZjAtNGU5M2Q2MjU2YmM0'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  print("\n\nJSON received:\n");
	print($return);
  print("\n");*/
?>