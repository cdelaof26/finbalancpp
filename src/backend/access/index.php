<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include_once ("../conexionDB/conexion.php");
    $connection = new DbConnection();
    echo "hola";
?>