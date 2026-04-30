<?php
// připojení do databáze
function getDb() {
    $conn = new mysqli("localhost", "root", "", "kalendar");

    if ($conn->connect_error) {
        die("Chyba připojení k DB: " . $conn->connect_error);
    }

    return $conn;
}