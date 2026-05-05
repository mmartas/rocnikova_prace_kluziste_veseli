<?php

require "assets/db.php";

header('Content-Type: application/json');

$conn = getDb();

// načti eventy
$eventsRes = $conn->query("SELECT * FROM events");

// načti rezervace
$reservationsRes = $conn->query("SELECT date, surname FROM reservations");

$booked = [];
while ($row = $reservationsRes->fetch_assoc()) {
    $booked[$row['date']] = $row['surname'];
}

$events = [];

while ($row = $eventsRes->fetch_assoc()) {

    $isBooked = isset($booked[$row['start']]);

    $color = "brown";

    if ($isBooked) {
        $color = "red";
    } else {
        if ($row["type"] == "rent") $color = "orange";
        else if ($row["type"] == "public") $color = "blue";
        else if ($row["type"] == "school") $color = "goldenrod";
        else if ($row["type"] == "maintenance") $color = "gray";
    }

    $events[] = [
        "id" => $row["id"],
        "title" => $isBooked
            ? "Obsazeno: " . $booked[$row['start']]
            : $row["title"],
        "start" => $row["start"],
        "end" => $row["end"],
        "extendedProps" => [
            "type" => $row["type"],
            "booked" => $isBooked
        ],
        "color" => $color
    ];
}

echo json_encode($events);

// vložení eventů do databáze
/**
*   INSERT INTO events (title, start, end, type)
*   VALUES ('Pronájem', '2026-04-27 10:00:00', '2026-04-27 11:00:00', 'rent');
*/
