<?php
class User
{
    private $conn;
    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function register()
    {
        try {
            // Obtener datos JSON del input
            $user = json_decode(file_get_contents("php://input"));
            // Hashear la contraseña para mayor seguridad
            $hashedPassword = password_hash($user->password, PASSWORD_BCRYPT);
            // Consulta SQL para insertar el nuevo usuario
            $sql =
                "INSERT INTO Usuarios (nombre, correo, contraseña) VALUES (:username, :email, :password)";
            // Preparar la consulta
            $stmt = $this->conn->prepare($sql);
            // Enlazar los parámetros
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("password", $hashedPassword);
            // Ejecutar la consulta
            if ($stmt->execute()) {
                $response = [
                    "status" => 1,
                    "message" => "Usuario registrado exitosamente.",
                ];
            } else {
                throw new Exception("Error al registrar el usuario.");
            }
        } catch (PDOException $e) {
            // Manejo de errores de base de datos
            $response = [
                "status" => 0,
                "message" => "Error de base de datos: " . $e->getMessage(),
            ];
        } catch (Exception $e) {
            // Manejo de otros errores generales
            $response = [
                "status" => 0,
                "message" => $e->getMessage(),
            ];
        }
        // Retornar la respuesta en formato JSON
        return json_encode($response);
    }

    public function exist()
    {
        try {
            // Obtener datos JSON del input
            $user = json_decode(file_get_contents("php://input"));
            // Consulta SQL para verificar si el usuario existe
            $sql =
                "SELECT correo contraseña FROM Usuarios WHERE correo = :email";
            // Preparar la consulta
            $stmt = $this->conn->prepare($sql);
            // Enlazar el parámetro de correo
            $stmt->bindParam("email", $user->email);
            // Ejecutar la consulta
            $stmt->execute();
            // Verificar si el usuario fue encontrado
            if ($stmt->rowCount() > 0) {
                // Obtener los datos del usuario
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                // Verificar la contraseña usando password_verify
                if (password_verify($user->password, $result["contraseña"])) {
                    $response = [
                        "status" => 1,
                        "message" => "Usuario encontrado",
                        "data" => [
                            "id_usuario" => $result["id_usuario"],
                            "nombre" => $result["nombre"],
                            "correo" => $result["correo"],
                        ],
                    ];
                } else {
                    $response = [
                        "status" => 0,
                        "message" => "Contraseña incorrecta",
                    ];
                }
            } else {
                $response = [
                    "status" => 0,
                    "message" => "Usuario no encontrado",
                ];
            }
        } catch (PDOException $e) {
            // Manejo de errores de base de datos
            $response = [
                "status" => 0,
                "message" => "Error en la base de datos: " . $e->getMessage(),
            ];
        } catch (Exception $e) {
            // Manejo de otros errores generales
            $response = [
                "status" => 0,
                "message" => $e->getMessage(),
            ];
        }
        // Retornar la respuesta en formato JSON
        return json_encode($response);
    }

    public function addIngreso()
    {
    }
    public function addAdeudo()
    {
    }
    public function addDeuda()
    {
    }
    public function addTarjetaCredito()
    {
    }
    public function addInversiones()
    {
    }
}
