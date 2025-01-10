<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include_once "../conexionDB/conexion.php";
include "./user.php";
include "./userSession.php";
// Conectar a base de datos
$objDb = new DbConnection();
$conn = $objDb->connect();
$method = $_SERVER["REQUEST_METHOD"];
//Usuario y estado de la sesion
$user = new User($conn);
$userSession = new UserSession();
// print_r(json_decode(file_get_contents("php://input")));
// $res = $user->register();
// $res = $user->exist();

$input = json_decode(file_get_contents("php://input"), true);
$action = $input["action"];
if (isset($_SESSION["username"])) {
    echo "Sesión activa para el usuario: " . $_SESSION["username"];
} else {
    if ($action === "login") {
        $res = $user->exist();
       if(isset($res["data"]["nombre"]))
            $userSession->setSession($res["data"]["nombre"], $input["email"]);
        echo json_encode($res);
    } else {
        $user->register();
    }
}
// echo print_r(isset($_SESSION["nombre"]));
// print_r($_SESSION);
