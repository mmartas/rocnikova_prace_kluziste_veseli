<?php
// připojení do databáze
function getDb() {
    $servername = "sql209.infinityfree.com";
    $username = "if0_41823991";
    $password = "suple2496";
    $dbname = "if0_41823991_kalendar";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Chyba připojení k DB: " . $conn->connect_error);
    }

    echo("vse je ok");
    return $conn;
}