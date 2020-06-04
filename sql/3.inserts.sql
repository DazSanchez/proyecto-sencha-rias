INSERT INTO muebleria_db.CAT_ROLES(ID,NOMBRE)
VALUES  (1,'CLIENTE'),
        (2,'ADMIN');

INSERT INTO muebleria_db.CAT_TIPO_MUEBLE(ID, NOMBRE)
VALUES  (1,'SILLON'),
        (2,'MESA'),
        (3,'SILLA'),
        (4,'TABURETE'),
        (5,'ESCRITORIOS');

INSERT INTO muebleria_db.CAT_ESTILO_MUEBLE(ID,NOMBRE)
VALUES  (1,'Reproducción'),
        (2,'Contemporáneos'),
        (3,'Coloniales'),
        (4,'Art Noveu'); 

INSERT INTO muebleria_db.CAT_MATERIAL_MUEBLE(ID,NOMBRE)
VALUES  (1,'Madera'),
        (2,'Aluminio'),
        (3,'Metal'),
        (4,'Fibra'),
        (5,'Plástico y resina'),
        (6,'Barro esmaltado'),
        (7,'Cuero'),
        (8,'Vinil');

INSERT INTO muebleria_db.CAT_MENSAJERIA(NOMBRE ,TIEMPO, COSTO )
VALUES  ('DHL',3,90),
        ('FedEx',4,80),
        ('UPS',2,130);
    
INSERT INTO muebleria_db.TIENDA (RFC ,NOMBRE )
VALUES ('MUE900201XY3','Muebles S.A de C.V'),
		('REM911105AB3','Remates S.A'),
		('CON021202','Confort S.A');

-- Usuario cliente
INSERT INTO muebleria_db.USUARIO (NOMBRE_USUARIO ,CLAVE_ACCESO ,ID_ROL )
VALUES ('hsanchez', '1c7a92ae351d4e21ebdfb897508f59d6', 1);

-- Administrador
INSERT INTO muebleria_db.USUARIO (NOMBRE_USUARIO ,CLAVE_ACCESO ,ID_ROL )
VALUES ('admin', '1c7a92ae351d4e21ebdfb897508f59d6', 2);

-- Cliente
INSERT INTO muebleria_db.CLIENTES (NOMBRE ,PRIMER_APELLIDO ,SEGUNDO_APELLIDO ,TEL_OFICINA,EMAIL ,DIRECCION_FISCAL ,ID_USUARIO ,ID_TIENDA )
VALUES('Daniela', 'Rosales','Lopez', '712345','drosales@mediomelon.mx','Col. Centro, Av 2, Orizaba, Veracruz',2,1);

-- Medidas
INSERT INTO muebleria_db.MEDIDA_MUEBLE
VALUES 
    (1,30,40,30,10),
    (2,15,10,5,5),
    (5,100,10,10,50),
    (6,50,10,10,10),
    (7,5,5,5,5);

-- Muebles
INSERT INTO muebleria_db.MUEBLE VALUES
    (1,'Central Colonial', 11500,'Mesa de centro colonial',1,2,3,7,1,1,'/tmp/mesa-colonial-1.webp'),
    (2,'Central Contemporanea', 5500,'Mesa de centro',1,2,2,2,1,3,'/tmp/mesa-contemporanea-1.webp'),
    (3,'Cantinera', 950,'Silla estilo Cantina antigua',1,3,1,6,3,1,'/tmp/silla-reproduccion-1.jpg'),
    (4, 'TabArt', 5000, 'Taburete estilo Art Noveu', 1,4,4,1,1,2,'/tmp/taburete-artnoveu.jpg'),
    (5, 'SillCol',1828,'Sillón de Madera Colonial con tapicería azul',1,1,3,5,1,1,'/tmp/sillon-colonial-1.webp');
