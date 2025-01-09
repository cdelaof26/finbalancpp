<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include_once ("../conexionDB/conexion.php");
    $objDb = new DbConnection();
    $conn = $objDb->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method){
        case "POST":    //solicitud
            $user =json_decode(file_get_contents('php://input')) ;  //convertir datos en json
            $sql = "INSERT INTO Usuarios (nombre, correo, contraseña)  VALUES (:username, :email, :password)"; //preparar query
            $stmt = $conn->prepare( $sql); 
            $stmt->bindParam('username', $user->username); 
            $stmt->bindParam('email', $user->email);
            $stmt->bindParam('password', $user->password);
            if($stmt->execute()){
                $response = [ 'status'=> 1,"message"=> "Usuario registrado exitosamente."];
            }else {
                $response = [ 'status'=> 0,"message"=> "Error al registrar el usuario."];

            }
            break;
    }


