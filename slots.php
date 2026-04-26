<?php

$conn = new mysqli("localhost", "root", "", "kalendar");

// rezervace
$res = $conn->query("SELECT date, surname FROM reservations");

$occupied = [];

while ($row = $res->fetch_assoc()) {
    $occupied[$row['date']] = $row['surname'];
}

$events = [];

// příklad rozsahu
$day = "2026-01-10";

for ($hour = 6; $hour <= 22; $hour++) {

    $slot = $day . "T" . str_pad($hour, 2, "0", STR_PAD_LEFT) . ":00:00";

    if (isset($occupied[$slot])) {

        // 🟥 OBSAZENO
        $events[] = [
            "title" => "Obsazeno: " . $occupied[$slot],
            "start" => $slot,
            "color" => "red"
        ];

    } else {

        // 🟩 VOLNO
        $events[] = [
            "title" => "Pronájem kluziště",
            "start" => $slot,
            "extendedProps" => ["type" => "rent"],
            "color" => "green"
        ];
    }
}

echo json_encode($events);