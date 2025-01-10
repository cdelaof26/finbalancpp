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
    // echo "Sesión activa para el usuario: " . $_SESSION["username"];
} else {
    $res;
    if ($action === "login") {
        $res = $user->exist();
    } else {
        $res = $user->register();
    }
    echo $res;
}
// echo print_r(isset($_SESSION["nombre"]));
// print_r($_SESSION);
