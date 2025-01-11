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
                "INSERT INTO Usuario (nombre, correo, contrasena) VALUES (:username, :email, :password)";
            // Preparar la consulta
            $stmt = $this->conn->prepare($sql);
            // Enlazar los parámetros
            $stmt->bindParam("username", $user->username);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("password", $user->password); ////////Aqui se modifico el hash
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
        echo json_encode($response);
    }

    public function exist()
    {
        try {
            // Obtener datos JSON del input
            $user = json_decode(file_get_contents("php://input"));

            // Consulta SQL para verificar si el usuario existe
            $sql =
                "SELECT id,nombre,correo,contrasena FROM Usuario WHERE correo = :email";
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
                //if (password_verify($user->password, $result["contrasena"])) { ////////Aqui se modifico el hash
                if ($user->password == $result["contrasena"]) {
                    $response = [
                        "status" => 1,
                        "message" => "Usuario encontrado",
                        "data" => [
                            "id" => $result["id"],
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
        }
        // Retornar la respuesta en formato JSON
        return $response;
    }

    public function addEarnings()
    {
        // Peticion esperada
        //     const inputs = {
        //     caption: "Trabajo",
        //     value: "100.00",
        //     fecha: "2025-01-11", // Fecha de hoy
        //     color: "#0D4D19",
        //     user: 1, // ID del usuario
        //   };
        try {
            // Obtener datos JSON del input
            $reg = json_decode(file_get_contents("php://input"));
            // Consulta SQL para insertar el ingreso
            $sql =
                " INSERT INTO Ingreso (montoIngreso, fecha, fuente, categoriaIngreso, idUsuario) VALUES (:value, :fecha, :caption, :color, :user)";
            // Preparar la consulta
            $stmt = $this->conn->prepare($sql);
            // Enlazar los parámetros
            $stmt->bindParam("value", $reg->value);
            $stmt->bindParam("fecha", $reg->fecha);
            $stmt->bindParam("caption", $reg->caption);
            $stmt->bindParam("color", $reg->color);
            $stmt->bindParam("user", $reg->user);
            // Ejecutar la consulta
            if ($stmt->execute()) {
                $response = [
                    "status" => 1,
                    "message" => "Ingreso registrado exitosamente.",
                ];
            } else {
                throw new Exception("Error al registrar el ingreso.");
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
        echo json_encode($response);
    }

    public function getEarnings()
    {
        // peticion esperada
        // const inputs = {
        //   user: 1, // ID del usuario
        //   };
        try {
            // Obtener datos JSON del input
            $reg = json_decode(file_get_contents("php://input"));

            // Consulta SQL para verificar si el usuario existe
            $sql =
                "SELECT montoIngreso, fecha, fuente, categoriaIngreso FROM Ingreso WHERE idUsuario = :user";
            // Preparar la consulta
            $stmt = $this->conn->prepare($sql);
            // Enlazar el parámetro de correo
            $stmt->bindParam("user", $reg->user);
            // Ejecutar la consulta
            $stmt->execute();
            // Verificar si el ingreo fue encontrado
            if ($stmt->rowCount() > 0) {
                // Obtener los datos del usuario
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $data = [];
                foreach ($results as $result) {
                    $data[] = [
                        "caption" => $result["fuente"],
                        "value" => $result["montoIngreso"],
                        "color" => $result["categoriaIngreso"],
                    ];
                }
                $response = [
                    "status" => 1,
                    "message" => $stmt->rowCount() . " registros encontrados",
                    "records" => $stmt->rowCount(),
                    "data" => $data,
                ];
            } else {
                $response = [
                    "status" => 0,
                    "message" => "El usuario no tiene ingresos",
                ];
            }
        } catch (PDOException $e) {
            // Manejo de errores de base de datos
            $response = [
                "status" => 0,
                "message" => "Error en la base de datos: " . $e->getMessage(),
            ];
        }
        // Retornar la respuesta en formato JSON
        echo json_encode($response);
    }
    public function updateEarning()
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
