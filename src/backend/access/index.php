<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include_once "../conexionDB/conexion.php";
include "./user.php";
// Conectar a base de datos
$objDb = new DbConnection();
$conn = $objDb->connect();
$method = $_SERVER["REQUEST_METHOD"];
//Usuario y estado de la sesion
$user = new User($conn);
// $userSesion = new userSesion();
$res = $user->register();
// if(0){  //no se ha iniciado sesio
echo $res;
// }else{
//     $usua
// $i = json_decode(file_get_contents($res));
// echo $i;
// }
