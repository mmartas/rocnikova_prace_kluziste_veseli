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

        "color" => $isBooked
            ? "red"
            : match($row["type"] ?? null) {
                "rent" => "orange",
                "public" => "blue",
                "school" => "goldenrod",
                "maintenance" => "gray",
                default => "brown"
            }
    ];
}

echo json_encode($events);

// vložení eventů do databáze
/**
*   INSERT INTO events (title, start, end, type)
*   VALUES ('Pronájem', '2026-04-27 10:00:00', '2026-04-27 11:00:00', 'rent');
*/
