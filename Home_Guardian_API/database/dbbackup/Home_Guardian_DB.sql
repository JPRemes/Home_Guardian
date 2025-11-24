-- Script limpio para crear la BD Home_Guardian

DROP DATABASE IF EXISTS Home_Guardian;
CREATE DATABASE Home_Guardian
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE Home_Guardian;

-- ------------------------------------------------------
-- Tablas
-- ------------------------------------------------------

DROP TABLE IF EXISTS alerta;
DROP TABLE IF EXISTS lecturas;
DROP TABLE IF EXISTS sensores;

CREATE TABLE sensores (
    id_sensor INT AUTO_INCREMENT PRIMARY KEY,
    nombre ENUM('temperatura', 'luz', 'gas') NOT NULL,
    unidad VARCHAR(20)    -- '°C', 'lux', 'bool', etc.
);

INSERT INTO sensores (nombre, unidad) VALUES
('temperatura', '°C'),
('luz', 'lux'),
('gas', 'bool');

CREATE TABLE lecturas (
    id_lectura INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor INT NOT NULL,
    valor FLOAT NOT NULL,
    hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sensor) REFERENCES sensores(id_sensor)
);

CREATE TABLE alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    id_lectura INT NOT NULL,          -- qué lectura la disparó
    FOREIGN KEY (id_lectura) REFERENCES lecturas(id_lectura)
);