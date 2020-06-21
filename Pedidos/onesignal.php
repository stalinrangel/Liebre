<?PHP


	function sendMessage(){

		$postdata = file_get_contents("php://input");
		$ID= $_SERVER['HTTP_ID'];





		$url='http://liebreexpress.com/api/token4/Laravel/public/api/auth/adminpusher';
	  	$ch = curl_init($url);

		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$server_output = curl_exec ($ch);
		$server_output = json_decode($server_output);
		curl_close ($ch);
		$tam = sizeof($server_output);
		$pushes='';
		echo $tam;

		echo $server_output;
		for($i = 0; $i < $tam; $i++){

			$content = array(
				"en" => 'Se ha realizado un nuevo pedido con el id: '. $ID
				);
			
			$fields = array(
				//'app_id' => "50d18a75-3b82-42eb-8902-f38821e86990",
				'app_id' => "6b319f69-bd12-4450-9cd7-36fcd6399adb",
				//'included_segments' => array('All'),
				//'include_player_ids' => array("604d3c7a-d607-41ec-b47e-73e4fef730d1","91bdb8a8-c1e8-4118-87a3-54c878fd0a87"),
				//'include_player_ids' => array($pushes),
				'include_player_ids' => array($server_output[$i]->push),
	      		'data' => array("foo" => $ID),
	      		'url'=> 'https://www.liebreexpress.com/Liebre/#/tracking',
				'contents' => $content
			);
			
			$fields = json_encode($fields);
	    	print("\nJSON sent:\n");
	    	print($fields);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
														'Authorization: Basic MjAyNmE4NmItNTBhNC00ZDA4LWFiZDctZWIxOTNlZjA0ZDdi'));
													   // 'Authorization: Basic OWY3ZDllODItODE4MC00OGU5LWIwZjAtNGU5M2Q2MjU2YmM0'));

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

			$response = curl_exec($ch);
			curl_close($ch);
			$pushes=$pushes.'"'.$server_output[$i]->push.'",';
		//}
		$pushes=substr($pushes, 0,-1);
		echo $pushes;
		}




		
		
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  print("\n\nJSON received:\n");
	print($return);
  print("\n");
?>