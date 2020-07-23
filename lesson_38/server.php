<?php
$_POST = json_decode(file_get_contents("php://input"), true); // декодирование json файлов
echo var_dump($_POST);