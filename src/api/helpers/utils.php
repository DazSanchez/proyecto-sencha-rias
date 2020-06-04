<?php
    function es_metodo($metodo) {
        if($_SERVER['REQUEST_METHOD'] != $metodo) {
            http_response_code(405);
            echo json_encode([
                "codigo" => 405,
                "mensaje" => "El verbo http no es aceptado."
            ]);
            exit();
        }
    }

    function obtener_query() {
        $query = $_SERVER["QUERY_STRING"];
        if(empty($query)) {
            return [];
        }

        $explodedQuery = explode("&", $query);
        $mappedQuery = array_map(function ($q) {
            return explode("=", $q);
        }, $explodedQuery);
        $parsedQuery = array_reduce($mappedQuery, function ($prev, $curr) {
            $next = $prev;

            if(count($curr) != 2) {
                $next[$curr[0]] = NULL;
            } else {
                $next[$curr[0]] = $curr[1];
            }

            return $next;
        }, []);
        return $parsedQuery;
    }
?>