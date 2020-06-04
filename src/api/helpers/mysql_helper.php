<?php
    function conectar() {
        $user = "db_user";
        $password = "user_password";
    
        $dns = "mysql:host=127.0.0.1;port=3306;dbname=muebleria_db;charset=utf8mb4";
        return new PDO($dns, $user, $password);
    }
?>