INSERT INTO public.rol (id_rol, grupo)
VALUES 
(1, 'ADMIN'),
(2, 'USER');
INSERT INTO public.usuario (
    cod_persona, rol, nombre, apellido, fecha_nacimiento, email, 
    direccion, departamento, nro_casa, nacionalidad,
    barrio, ciudad, celular, password
)
VALUES 
('1234567', 1, 'Juan', 'Pérez', '1990-01-01', 'juan@example.com', 'Calle Falsa 123', 'Central', 45, 'Paraguaya', 'San Juan', 'Asunción', '0981123456', '$2a$12$k/KFSMkeGmBoUPOUlKdTj.DKiFgalWtdlRx.7xE8bKexhZwTkCnrO'),
('4843906', 2, 'Alejandro', 'Martínez', '2001-01-30', 'ale@example.com', 'Ignacio Ibañez c/ Boqueron', 'Central', 1152, 'Paraguaya', 'Villa Margarita', 'Mariano R. Alonso', '0984132195', '$2a$12$k/KFSMkeGmBoUPOUlKdTj.DKiFgalWtdlRx.7xE8bKexhZwTkCnrO'),
('P001', 2, 'Juan', 'Gomez', '1990-05-15', 'juan.perez@email.com', 'Calle Falsa 123', 'Montevideo', 123, 'Uruguaya', 'Pocitos', 'Montevideo', '099123456', '$2a$12$k/KFSMkeGmBoUPOUlKdTj.DKiFgalWtdlRx.7xE8bKexhZwTkCnrO'),
('P002', 2, 'María', 'Gómez', '1985-08-22', 'maria.gomez@email.com', 'Av. Siempre Viva 456', 'Canelones', 456, 'Argentina', 'Cordon', 'Montevideo', '098654321', '$2a$12$k/KFSMkeGmBoUPOUlKdTj.DKiFgalWtdlRx.7xE8bKexhZwTkCnrO'),
('P003', 2, 'Carlos', 'López', '1995-03-10', 'carlos.lopez@email.com', 'Ruta 1 Km 10', 'San José', 789, 'Paraguaya', 'Centro', 'San José', '097111222', '$2a$12$k/KFSMkeGmBoUPOUlKdTj.DKiFgalWtdlRx.7xE8bKexhZwTkCnrO');
