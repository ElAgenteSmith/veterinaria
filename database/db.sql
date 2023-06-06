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
  PRIMARY KEY (MascotaID)
);

-- Crear tabla AtencionPrestada
CREATE TABLE AtencionPrestada (
  AtencionID INT AUTO_INCREMENT,
  Fecha DATE,
  VeterinarioID INT,
  UsuarioID INT,
  MascotaID INT,
  Descripcion VARCHAR(100),
  Servicio ENUM('Salud', 'Limpieza'),
  PRIMARY KEY (AtencionID),
  FOREIGN KEY (VeterinarioID) REFERENCES Veterinarios(VeterinarioID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
  FOREIGN KEY (MascotaID) REFERENCES Mascotas(MascotaID)
);

-- Crear tabla RelacionVeterinarioMascota
CREATE TABLE RelacionVeterinarioMascota (
  VeterinarioID INT,
  MascotaID INT,
  PRIMARY KEY (VeterinarioID, MascotaID),
  FOREIGN KEY (VeterinarioID) REFERENCES Veterinarios(VeterinarioID),
  FOREIGN KEY (MascotaID) REFERENCES Mascotas(MascotaID)
);

-- Crear tabla RelacionUsuarioMascota
CREATE TABLE RelacionUsuarioMascota (
  UsuarioID INT,
  MascotaID INT,
  PRIMARY KEY (UsuarioID, MascotaID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
  FOREIGN KEY (MascotaID) REFERENCES Mascotas(MascotaID)
);

-- Crear tabla UsuariosAutenticacion
CREATE TABLE UsuariosAutenticacion (
  UsuarioID INT AUTO_INCREMENT,
  NombreUsuario VARCHAR(50),
  Password VARCHAR(50),
  Rol ENUM('Administrador', 'Usuario'),
  PRIMARY KEY (UsuarioID)
);