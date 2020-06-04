<?php
    include_once("../helpers/utils.php");
    include_once("../modelos/producto.php");

    header("Content-Type: applicacion/json");

    es_metodo('GET'); // Si no es el metodo especificado, regresa un error

    sleep(1); // Simular peticion tardada

    $query = obtener_query();

    if(empty($query) || is_null($query["filter"]) || is_null($query["q"])) {
        http_response_code(400);
        echo json_encode([
            "codigo" => 400,
            "mensaje" => "Faltan parametros en la peticion."
        ]);
        exit();
    }

    $producto = new Producto();

    $resultado = $producto->obtener_productos($query);

    echo json_encode($resultado);

    exit();
?>