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
       

  $idUsuario = $request->idUsuario;
       $result = array();
          $inde = 0;
          $stmt = $this->db->prepare('SELECT idPedido,lugar,numero,dpto,referencia,formaPago,comprobante,ruc,razonSocial,domicilioFiscal,lat,lng,montoCancela, nombreCliente, telefonoCliente, fechaCreacion, comentarios FROM pedidos  WHERE estado = 1 ORDER BY idPedido ASC');
          $stmt->execute();
          $stmt->bind_result($idPedido, $lugar,$numero,$dpto,$referencia,$formaPago,$comprobante,$ruc,$razonSocial,$domicilioFiscal,$lat,$lng,$montoCancela,$nombreCliente, $telefonoCliente, $fechaCreacion, $comentarios);
          while ($stmt->fetch()) {
              $value=array();
              $value['idPedido']=$idPedido;
              $value['lugar']=$lugar;
              $value['numero']=$numero;
              $value['dpto']=$dpto;
              $value['referencia']=$referencia;
              $value['formaPago']=$formaPago;
              $value['comprobante']=$comprobante;
              $value['ruc']=$ruc;
              $value['razonSocial']=$razonSocial;
              $value['domicilioFiscal']=$domicilioFiscal;
              $value['lat']=$lat;
              $value['lng']=$lng;
              $value['montoCancela']=$montoCancela;
              $value['nombreCliente']=$nombreCliente;
              $value['telefonoCliente']=$telefonoCliente;
              $value['fechaCreacion']=strtotime($fechaCreacion);
               $value['comentarios']=$comentarios;
              
              $result[$inde]=$value;
              $inde++;
  
          }
           $stmt->close();
          sendResponse(200, json_encode($result));
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