<?php
    include_once("../helpers/mysql_helper.php");

    class Catalogos {
        private $pdo;

        function __construct() {
            $this->pdo = conectar();
        }

        public function obtener_tipos_mueble() {
            $query = $this->pdo->prepare("SELECT ID as id, NOMBRE as nombre FROM CAT_TIPO_MUEBLE");
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }

        public function obtener_estilos_mueble() {
            $query = $this->pdo->prepare("SELECT ID as id, NOMBRE as nombre FROM CAT_ESTILO_MUEBLE");
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }

        public function obtener_materiales_mueble() {
            $query = $this->pdo->prepare("SELECT ID as id, NOMBRE as nombre FROM CAT_MATERIAL_MUEBLE");
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>