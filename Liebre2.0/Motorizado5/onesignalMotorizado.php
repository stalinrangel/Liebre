<?PHP


	function sendMessage(){

		$postdata = file_get_contents("php://input");
		$ID= $_SERVER['HTTP_ID'];



			$content = array(
				"en" => '¡Se te ha asignado un pedido!'
				);
			
			$fields = array(
				'app_id' => "6b319f69-bd12-4450-9cd7-36fcd6399adb",
				//'included_segments' => array('All'),
				//'include_player_ids' => array("604d3c7a-d607-41ec-b47e-73e4fef730d1","91bdb8a8-c1e8-4118-87a3-54c878fd0a87"),
				//'include_player_ids' => array($pushes),
				'include_player_ids' => array($ID),
	      		'data' => array("foo" => $ID),
	      		'url'=> 'https://www.liebreexpress.com/Motorizado5/#/tracking',
				'contents' => $content
			);
			
			$fields = json_encode($fields);
	    	print("\nJSON sent:\n");
	    	print($fields);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
													   'Authorization: Basic MjAyNmE4NmItNTBhNC00ZDA4LWFiZDctZWIxOTNlZjA0ZDdi'));
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
	




		
		
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
  print("\n\nJSON received:\n");
	print($return);
  print("\n");
?>