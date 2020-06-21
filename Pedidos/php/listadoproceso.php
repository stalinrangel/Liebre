<?php
   if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }



function getStatusCodeMessage($status)
{
    // these could be stored in a .ini file and loaded
    // via parse_ini_file()... however, this will suffice
    // for an example
    $codes = Array(
        100 => 'Continue',
        101 => 'Switching Protocols',
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => '(Unused)',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported'
    );
 
    return (isset($codes[$status])) ? $codes[$status] : '';
}
 
// Helper method to send a HTTP response code/message
function sendResponse($status = 200, $body = '', $content_type = 'text/html')
{
    $status_header = 'HTTP/1.1 ' . $status . ' ' . getStatusCodeMessage($status);
    header($status_header);
    header('Content-type: ' . $content_type);

    echo $body;
}


class RedeemAPI {
    private $db;
 
    // Constructor - open DB connection
    function __construct() {
      require_once("bd.php");
       $this->db = new mysqli('localhost', $bar2meadminBD, $Bar2me2016, $b2mBD);
        $this->db->autocommit(FALSE);
    }
 
    // Destructor - close DB connection
    function __destruct() {
        $this->db->close();
    }
 
    // Main method to redeem a code
    function redeem() {
 $postdata = file_get_contents("php://input");

 if (isset($postdata))

  { 

    $request = json_decode($postdata);
    $outp = "";   
    $inde = 1;
    $stmt = $this->db->prepare('SELECT pedido.id,pedido.estado,pedido.fecha_registro, pedido.pedido_nombres_razonsocial, pedido.tipo_registrado, pedido.fecha_servicio, pedido.id_servicio, pedido.pedido_dni_ruc, pedido.tipo_retorno, pedido.id_cliente, pedido.id_usuario, pedido.forma_pago, pedido.tipo_comprobante, pedido.costo_total, pedido.pedido_direccion, pedido.pedido_telefono, pedido.pagara_con, pedido.vuelto, cliente.email, cliente.dni, cliente.telefono, cliente.nombres, cliente.apellido_paterno, cliente.apellido_materno FROM pedido INNER JOIN cliente ON pedido.id_cliente=cliente.id /*WHERE pedido.estado=0*/ ORDER BY pedido.id DESC');
    $stmt->execute();
    $stmt->bind_result($id,$estado, $fecha_registro, $pedido_nombres_razonsocial, $tipo_registrado, $fecha_servicio, $id_servicio, $dni, $tipo_retorno, $id_cliente, $id_usuario, $forma_pago, $tipo_comprobante, $costo_total,$pedido_direccion, $pedido_telefono, $pagara_con, $vuelto,$email, $dnicliente, $telefono_cliente, $nombre_cliente, $apellido_paterno, $apellido_materno);

    while ($stmt->fetch()) {

      if ($outp != "") {$outp .= ",";}
      $outp .= '{"id":"'  . $id . '",';
      $outp .= '"count":"'  . $inde++ . '",';
      $outp .= '"estado":"'  . $estado . '",';
      if ($id_servicio == 1) {
          $outp .= '"id_servicio":"URGENTE",';
      }
      if ($id_servicio == 2) {
          $outp .= '"id_servicio":"PROGRAMADO",';
      } 
      $fecha_reg = new DateTime($fecha_registro);
      $fecha_registro = $fecha_reg->format('d/m/Y h:m:s');
      $outp .= '"fecha_registro":"'  . $fecha_registro . '",';
      $outp .= '"nombre":"'  . $pedido_nombres_razonsocial . '",';
      $outp .= '"telefono":"'  . $pedido_telefono . '",';
      $outp .= '"dni":"'  . $dni . '",';
      $outp .= '"email":"'  . $email . '",';
      $outp .= '"dnicliente":"'  . $dnicliente . '",';
      $outp .= '"tlfcliente":"'  . $telefono_cliente . '",';
      $outp .= '"nombre_cliente":"'  . $nombre_cliente.' '. $apellido_paterno.' '.$apellido_materno. '",';
      $outp .= '"tipo_registrado":"'  . $tipo_registrado . '",';
      $outp .= '"tipo_retorno":"'  . $tipo_retorno . '",';
      $outp .= '"id_cliente":"'  . $id_cliente . '",';
      $outp .= '"id_usuario":"'  . $id_usuario . '",';
      $outp .= '"forma_pago":"'  . $forma_pago . '",';
      $outp .= '"tipo_comprobante":"'  . $tipo_comprobante . '",';
      $outp .= '"costo_total":"'  . $costo_total . '",';
      $outp .= '"pedido_direccion":"'  . $pedido_direccion . '",';
      $outp .= '"pedido_telefono":"'  . $pedido_telefono . '",';
      $outp .= '"pagara_con":"'  . $pagara_con . '",';
      $outp .= '"vuelto":"'  . $vuelto . '",';
      $outp .= '"fecha_servicio":"'  . $fecha_servicio . '"}';
    }
    $outp ='['.$outp.']';
    $stmt->close();
    sendResponse(200, utf8_encode($outp));
    return true;
  }else{
    sendResponse(400, 'Invalid request');
    return false;
  }

       
    }
}
 
// This is the first thing that gets called when this page is loaded
// Creates a new instance of the RedeemAPI class and calls the redeem method
$api = new RedeemAPI;
$api->redeem();
 
?>