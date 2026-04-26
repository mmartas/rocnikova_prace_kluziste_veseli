<?php

// header('Content-Type: application/json');

// $conn = new mysqli("localhost", "root", "", "kalendar");

// $result = $conn->query("SELECT * FROM reservations");

// $events = [];

// while ($row = $result->fetch_assoc()){
//     $events[] = [
//         "title" => "Obsazeno: " . $row['surname'],
//         "start" => $row['date'],
//         "color" => "red"
//     ];
// }

// echo json_encode($events);




header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "kalendar");

// načti rezervace
$res = $conn->query("SELECT date, surname FROM reservations");

$booked = [];

while ($row = $res->fetch_assoc()) {
    $booked[$row['date']] = $row['surname'];
}

$events = [];

// generování hodin (PŘÍKLAD DEN)
$date = date("Y-m-d");

for ($hour = 6; $hour <= 23; $hour++) {

    $start = $date . " " . str_pad($hour, 2, "0", STR_PAD_LEFT) . ":00:00";

    $isBooked = isset($booked[$start]);

    $events[] = [
        "title" => $isBooked ? "Obsazeno: " . $booked[$start] : "Volno",

        "start" => $start,
        "end" => date("Y-m-d H:i:s", strtotime($start . " +1 hour")),

        "extendedProps" => [
            "type" => $isBooked ? "rent" : "free"
        ],

        "color" => $isBooked ? "red" : "green"
    ];
}

echo json_encode($events);

