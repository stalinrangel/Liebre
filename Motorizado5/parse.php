<?PHP


	function sendMessage(){
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://parseapi.back4app.com/1/classes/prueba");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
													   'X-Parse-Application-Id: bEHWkXF2tDbgpVcdJL33t5gItT0abLhEIkYIib5Y',
													   'X-Parse-REST-API-Key: nHZGAaafrmsFoOPY4HSggLQxZXmKHmyu6ja7WE8D'));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

			$response = curl_exec($ch);
			curl_close($ch);
			print($response);		
		
		return $response;
	}
	
	$response = sendMessage();
?>