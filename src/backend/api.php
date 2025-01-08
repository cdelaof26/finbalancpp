<?php
header("Content-Type: application/json");

// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'tu_base_de_datos';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error al conectar con la base de datos."]);
    exit;
}

// Leer datos del cuerpo de la solicitud
$input = json_decode(file_get_contents("php://input"), true);
if (!$input || !isset($input['action'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Solicitud inválida."]);
    exit;
}

// Procesar acción
$action = $input['action'];
switch ($action) {
    case 'register':
        registerUser($input, $pdo);
        break;
    case 'login':
        loginUser($input, $pdo);
        break;
    default:
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Acción no reconocida."]);
        break;
}

// Función para registrar un usuario
function registerUser($data, $pdo) {
    if (!isset($data['username'], $data['email'], $data['password'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos para registrar."]);
        exit;
    }

    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    try {
        // Verificar si el usuario o correo ya existen
        $query = $pdo->prepare("SELECT id FROM users WHERE email = :email OR username = :username");
        $query->execute(['email' => $email, 'username' => $username]);
        if ($query->rowCount() > 0) {
            echo json_encode(["success" => false, "message" => "El usuario o correo ya están registrados."]);
            return;
        }

        // Insertar nuevo usuario
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);

        echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al registrar el usuario."]);
    }
}

// Función para iniciar sesión
function loginUser($data, $pdo) {
    if (!isset($data['email'], $data['password'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos para iniciar sesión."]);
        exit;
    }

    $email = $data['email'];
    $password = $data['password'];

    try {
        // Verificar credenciales
        $stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user['password'])) {
            echo json_encode(["success" => false, "message" => "Credenciales inválidas."]);
            return;
        }

        // Devolver respuesta de éxito
        echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error al iniciar sesión."]);
    }
}
?>Z`