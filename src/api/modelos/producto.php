<?php 
    include_once("../helpers/mysql_helper.php");

    class Producto {
        private $pdo;

        function __construct() {
            $this->pdo = conectar();
        }
        
        function obtener_productos($filtro) {

            $sql = "SELECT DESCRIPCION as title, PRECIO as price, IMG_URL as url FROM MUEBLE ";

            if($filtro["filter"] == 1) {
                $sql = $sql."WHERE ID_TIPO = {$filtro["q"]}";
            } else {
                $sql = $sql."WHERE ID_ESTILO = {$filtro["q"]}";
            }

            $query = $this->pdo->prepare($sql);

            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        }

        public function crear_producto($producto) {
            $sql_medidas = 'INSERT INTO MEDIDA_MUEBLE(ALTO, ANCHO, LARGO, PESO) VALUES(:alto, :ancho, :largo, :peso)';

            $query = $this->pdo->prepare($sql_medidas);

            $query->execute([
                ":alto" => $producto["alto"],
                ":ancho" => $producto["ancho"],
                ":largo" => $producto["largo"],
                ":peso" => $producto["peso"]
            ]);

            $id_medida = $this->pdo->lastInsertId();

            $sql_producto = 'INSERT INTO MUEBLE (MODELO, PRECIO, DESCRIPCION, ACTIVO, ID_TIPO, ID_ESTILO, ID_MEDIDAS, ID_MATERIAL, EXISTENCIAS, IMG_URL)'.
                    'VALUES (:modelo, :precio, :descripcion, 1, :tipo, :estilo, :medidas, :material, :cantidad, :imagen)';

            $query2 = $this->pdo->prepare($sql_producto);
            
            $query2->execute([
                ":modelo" => $producto["modelo"],
                ":precio" => $producto["precio"],
                ":descripcion" => $producto["descripcion"],
                ":tipo" => $producto["tipo"],
                ":estilo" => $producto["estilo"],
                ":medidas" => $id_medida,
                ":material" => $producto["material"],
                ":cantidad" => $producto["cantidad"],
                ":imagen" => $producto["imagen"]
            ]);

            return $this->pdo->lastInsertId();
        }
    }
?>