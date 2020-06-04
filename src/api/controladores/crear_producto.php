<?php
    include_once("../helpers/utils.php");
    include_once("../modelos/producto.php");

    header("Content-Type: applicacion/json");
    es_metodo('POST');

    $producto = json_decode(file_get_contents('php://input'), true);

    $validaciones = array(
        !isset($producto["modelo"]),
        !isset($producto["precio"]),
        !isset($producto["descripcion"]),
        !isset($producto["tipo"]),
        !isset($producto["estilo"]),
        !isset($producto["material"]),
        !isset($producto["cantidad"]),
        !isset($producto["imagen"]),
        !isset($producto["alto"]),
        !isset($producto["ancho"]),
        !isset($producto["largo"]),
        !isset($producto["peso"])
    );

    $es_invalido = array_reduce($validaciones, function($p, $n) {
        return $p || $n;
    });

    if($es_invalido) {
        http_response_code(400);
        echo json_encode([
            "codigo" => 400,
            "mensaje" => "Faltan parametros en la peticion."
        ]);
        exit();
    }

    $productoModelo = new Producto();

    $resultado = $productoModelo->crear_producto($producto);

    echo json_encode($resultado);
    exit();
?>