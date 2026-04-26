<?php

header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "kalendar");

$result = $conn->query("SELECT * FROM reservations");

$events = [];

while ($row = $result->fetch_assoc()){
    $events[] = [
        "title" => "Obsazeno: " . $row['surname'],
        "start" => $row['date'],
        "color" => "red"
    ];
}

echo json_encode($events);


