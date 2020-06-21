<?php

// NOTE: Only fetches the first 300 devices.
//       Will need to add looping with offset to get all devices.
function getDevices(){ 
  $app_id = "50d18a75-3b82-42eb-8902-f38821e86990";
  $ch = curl_init(); 
  curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/players?app_id=" . $app_id); 
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 
                                             'Authorization: Basic OWY3ZDllODItODE4MC00OGU5LWIwZjAtNGU5M2Q2MjU2YmM0')); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
  curl_setopt($ch, CURLOPT_HEADER, FALSE);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  $response = curl_exec($ch); 
  curl_close($ch); 
  return $response; 
}

$response = getDevices(); 
$return["allresponses"] = $response; 
$return = json_encode( $return); 
print("\n\nJSON received:\n"); 
print($return); 
print("\n") 
?>