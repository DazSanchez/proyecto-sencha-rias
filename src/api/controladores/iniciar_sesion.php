<?php
    include_once("../helpers/utils.php");
    include_once("../modelos/usuario.php");

    header("Content-Type: applicacion/json");
    es_metodo('POST');

    $credenciales = json_decode(file_get_contents('php://input'), true);
    
    if(!isset($credenciales["username"]) || !isset($credenciales["pwd"])) {
        http_response_code(400);
        echo json_encode([
            "codigo" => 400,
            "mensaje" => "Faltan parametros en la peticion."
        ]);
        exit();
    }

    $usuarioModelo = new Usuario();

    $resultado = $usuarioModelo->buscar_usuario($credenciales["username"],  md5($credenciales["pwd"]));

    if(empty($resultado)) {
        http_response_code(409);
        echo json_encode([
            "codigo" => 409,
            "mensaje" => "Las claves de acceso son incorrectas."
        ]);
        exit();
    }

    session_start();
    echo json_encode(["data" => $resultado, "success" => true,]);
    exit();
?>