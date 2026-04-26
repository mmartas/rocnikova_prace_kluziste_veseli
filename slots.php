<?php

$conn = new mysqli("localhost", "root", "", "kalendar");

// rezervace
$res = $conn->query("SELECT date, surname FROM reservations");

$occupied = [];

while ($row = $res->fetch_assoc()) {
    $occupied[$row['date']] = $row['surname'];
}

$events = [];

echo json_encode($events);