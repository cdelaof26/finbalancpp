<?php

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once "./userSession.php";
include_once "../conexionDB/conexion.php";

// Iniciar la sesión
$userSession = new UserSession();

// Obtener solo el id de la sesión
$sessionId = $userSession->getSession();

// Mostrar el id en formato JSON
echo json_encode(['id' => $sessionId]);

?>
