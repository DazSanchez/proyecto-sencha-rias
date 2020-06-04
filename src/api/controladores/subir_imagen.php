<?php
    include_once("../helpers/utils.php");

    header("Content-Type: applicacion/json");
    es_metodo('POST');

    $imagen = $_FILES["imagen"];
    $filename = basename($imagen["name"]);

    $newFilename = time().$filename;

    if(move_uploaded_file($imagen["tmp_name"], "../../tmp/".$newFilename)) {
        echo json_encode([
            "filename" => "/tmp/".$newFilename
        ]);
    } else {
        http_response_code(409);
        echo json_encode([
            "code" => 409,
            "mensaje" => "Error subiendo imagen"
        ]);
    }

    exit();
?>