CREATE DATABASE finbalancpp;
USE finbalancpp;

-- Tabla: Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
);

-- Tabla: Adeudo
CREATE TABLE Adeudo (
    idAdeudo INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Deuda
CREATE TABLE Deuda (
    idDeuda INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Registro
CREATE TABLE Registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    monto FLOAT NOT NULL,
    fechaVencimiento DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Ingreso
CREATE TABLE Ingreso (
    idIngreso INT AUTO_INCREMENT PRIMARY KEY,
    montoIngreso FLOAT NOT NULL,
    fecha DATE NOT NULL,
    fuente VARCHAR(100) NOT NULL,
    categoriaIngreso VARCHAR(100) NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Tarjetas
CREATE TABLE Tarjetas (
    idTarjeta INT AUTO_INCREMENT PRIMARY KEY,
    numeroTarjeta BIGINT NOT NULL UNIQUE,
    fechaVencimiento DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Credito
CREATE TABLE Credito (
    idTarjeta INT PRIMARY KEY,
    limiteCredito DOUBLE NOT NULL,
    saldoDisponible DOUBLE NOT NULL,
    fechaCorte DATE NOT NULL,
    FOREIGN KEY (idTarjeta) REFERENCES Tarjetas(idTarjeta)
);

-- Tabla: Debito
CREATE TABLE Debito (
    idTarjeta INT PRIMARY KEY,
    saldo DOUBLE NOT NULL,
    FOREIGN KEY (idTarjeta) REFERENCES Tarjetas(idTarjeta)
);

-- Tabla: Presupuestos
CREATE TABLE Presupuestos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    montoTotal DOUBLE NOT NULL,
    montoGastado DOUBLE NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Simulacion
CREATE TABLE Simulacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado BOOLEAN NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: EducacionFinanciera
CREATE TABLE EducacionFinanciera (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    categoria VARCHAR(100) NOT NULL,
    fechaPublicacion DATE NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Transacciones
CREATE TABLE Transacciones (
    idTransaccion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    tipoTransaccion VARCHAR(50) NOT NULL,
    tarjetaAsociada INT,
    idUsuario INT NOT NULL,
    FOREIGN KEY (tarjetaAsociada) REFERENCES Tarjetas(idTarjeta),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Tabla: Inversiones
CREATE TABLE Inversiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    montoInvertido DOUBLE NOT NULL,
    rendimiento DOUBLE NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

-- Insertar datos en la tabla Usuario
INSERT INTO Usuario (nombre, correo, contrasena, loginStatus) VALUES
('Erick', 'erick@gmail.com', 'Erick123/'),
('Ivan', 'ivan@gmail.com', 'Ivan123/');

-- Insertar datos en la tabla Adeudo
INSERT INTO Adeudo (idUsuario) VALUES
(1),
(2);

-- Insertar datos en la tabla Deuda
INSERT INTO Deuda (idUsuario) VALUES
(1),
(2);

-- Insertar datos en la tabla Registro
INSERT INTO Registro (monto, fechaVencimiento, estado, categoria, idUsuario) VALUES
(500.00, '2025-01-15', 'Pendiente', 'Renta', 1),
(200.00, '2025-01-20', 'Pagado', 'Servicios', 2);

-- Insertar datos en la tabla Ingreso
INSERT INTO Ingreso (montoIngreso, fecha, fuente, categoriaIngreso, idUsuario) VALUES
(1500.00, '2025-01-01', 'Salario', 'Mensual', 1),
(1000.00, '2025-01-05', 'Freelance', 'Extra', 2);

-- Insertar datos en la tabla Tarjetas
INSERT INTO Tarjetas (numeroTarjeta, fechaVencimiento, tipo, idUsuario) VALUES
(1234567812345678, '2026-01-01', 'Credito', 1),
(8765432187654321, '2026-06-01', 'Debito', 2);

-- Insertar datos en la tabla Credito
INSERT INTO Credito (idTarjeta, limiteCredito, saldoDisponible, fechaCorte) VALUES
(1, 5000.00, 3000.00, '2025-01-25');

-- Insertar datos en la tabla Debito
INSERT INTO Debito (idTarjeta, saldo) VALUES
(2, 1500.00);

-- Insertar datos en la tabla Presupuestos
INSERT INTO Presupuestos (nombre, montoTotal, montoGastado, categoria, fechaInicio, fechaFin, idUsuario) VALUES
('Ahorro Vacaciones', 2000.00, 500.00, 'Ahorros', '2025-01-01', '2025-12-31', 1),
('Educacion', 1000.00, 300.00, 'Gastos', '2025-01-01', '2025-06-30', 2);

-- Insertar datos en la tabla Simulacion
INSERT INTO Simulacion (estado, idUsuario) VALUES
(TRUE, 1),
(FALSE, 2);

-- Insertar datos en la tabla EducacionFinanciera
INSERT INTO EducacionFinanciera (nombre, contenido, imagen, categoria, fechaPublicacion, idUsuario) VALUES
('Ahorro Inteligente', 'Contenido sobre ahorro...', NULL, 'Finanzas Personales', '2025-01-01', 1),
('Inversiones Básicas', 'Introducción a las inversiones...', NULL, 'Inversiones', '2025-01-05', 2);

-- Insertar datos en la tabla Transacciones
INSERT INTO Transacciones (fecha, tipoTransaccion, tarjetaAsociada, idUsuario) VALUES
('2025-01-10', 'Compra', 1, 1),
('2025-01-12', 'Deposito', 2, 2);

-- Insertar datos en la tabla Inversiones
INSERT INTO Inversiones (nombre, montoInvertido, rendimiento, fechaInicio, fechaFin, tipo, idUsuario) VALUES
('Fondos Mutuos', 1000.00, 5.00, '2025-01-01', '2025-12-31', 'Moderado', 1),
('Acciones', 2000.00, 10.00, '2025-01-01', '2025-12-31', 'Agresivo', 2);
