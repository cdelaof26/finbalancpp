<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
include "./user.php";
include "./userSession.php";
$input = json_decode(file_get_contents("php://input"), true);
$objDb = new DbConnection();
$conn = $objDb->connect();
$userSession = new UserSession();
$user = new User($conn);
echo $input;
//Usuario y estado de la sesion
// $action = $input["action"];
// echo "Conecte";
// session_start();
// if (isset($_SESSION["id"])) {
//     echo "Ya existe";
// } else {
//     $_SESSION["id"] = "login";
//     echo $_SESSION["id"];
// }
