<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include_once "../conexionDB/conexion.php";
include "./user.php";
include "./userSession.php";
/* // Conectar a base de datos
$objDb = new DbConnection();
$conn = $objDb->connect();
//Usuario y estado de la sesion
$user = new User($conn);
$userSession = new UserSession();

// $user->getEarnings();
 */
//funcional
$input = json_decode(file_get_contents("php://input"), true);
$objDb = new DbConnection();
$conn = $objDb->connect();
//Usuario y estado de la sesion
$user = new User($conn);
//$userSession = new UserSession();
$action = $input["action"];

echo ($action);

if ($_SESSION["id"] === null){
    echo "NO HAY DATO GUARDADO";
}


if (isset($_SESSION["username"])) {
    echo "Sesión activa para el usuario: " . $_SESSION["username"];
} else {
    
    if ($action === "login") {
        $res = $user->exist();
        if (isset($res["data"]["nombre"])) {
            $userSession->setSession(
                $res["data"]["nombre"],
                $input["email"],
                $res["data"]["id"]
            );
        }
        //echo json_encode($res);
        echo json_encode("IDSESION----- ");
        echo json_encode($userSession->getSession());

    } else {
        $user->register();
    }
    echo $_SERVER["REQUEST_URI"];
}
