<?php
    include_once("../helpers/mysql_helper.php");

    class Usuario {
        private $pdo;

        function __construct() {
            $this->pdo = conectar();
        }

        function buscar_usuario($usuario, $clave) {
            $query = $this->pdo->prepare("SELECT u.NOMBRE_USUARIO as username, r.NOMBRE as userRole FROM USUARIO u LEFT JOIN CAT_ROLES r ON u.ID_ROL = r.ID WHERE u.NOMBRE_USUARIO = ? AND u.CLAVE_ACCESO = ?");

            $query->execute([$usuario,$clave]);

            return $query->fetch(PDO::FETCH_ASSOC);
        }
    }
?>