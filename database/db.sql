-- Crear la base de datos
CREATE DATABASE Veterinaria;

-- Seleccionar la base de datos
USE Veterinaria;

-- Crear tabla Veterinarios
CREATE TABLE Veterinarios (
  VeterinarioID INT AUTO_INCREMENT,
  FechaRegistro DATE,
  Cedula VARCHAR(10),
  NombreCompleto VARCHAR(50),
  PRIMARY KEY (VeterinarioID)
);

-- Crear tabla Usuarios
CREATE TABLE Usuarios (
  UsuarioID INT AUTO_INCREMENT,
  Cedula VARCHAR(10),
  NombreCompleto VARCHAR(50),
  FechaIngreso DATE,
  Direccion VARCHAR(100),
  PRIMARY KEY (UsuarioID)
);

-- Crear tabla Mascotas
CREATE TABLE Mascotas (
  MascotaID INT AUTO_INCREMENT,
  Raza VARCHAR(50),
  Edad INT,
  Nombre VARCHAR(50),
  UsuarioID INT,
  PRIMARY KEY (MascotaID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

-- Crear tabla AtencionPrestada
CREATE TABLE AtencionPrestada (
  AtencionID INT AUTO_INCREMENT,
  Fecha DATE,
  Veterinario VARCHAR(50),
  Usuario VARCHAR(50),
  Mascota VARCHAR(50),
  Descripcion VARCHAR(100),
  Servicio ENUM('Salud', 'Limpieza'),
  PRIMARY KEY (AtencionID)
);

-- Crear tabla UsuariosAutenticacion
CREATE TABLE UsuariosAutenticacion (
  NombreUsuario VARCHAR(50),
  Password VARCHAR(50),
  Rol ENUM('Administrador', 'Usuario'),
  PRIMARY KEY (NombreUsuario)
);
