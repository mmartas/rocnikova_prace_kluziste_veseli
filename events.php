<?php
require "assets/db.php";

header("Content-Type: application/json; charset=utf-8");

$conn = getDb();

$eventsRes = $conn->query("
    SELECT 
        `id`, 
        `title`, 
        `start`, 
        `end`, 
        `type`
    FROM `events`
");

if (!$eventsRes) {
    echo json_encode([
        "error" => "Chyba v dotazu na events",
        "message" => $conn->error
    ]);
    exit;
}

$reservationsRes = $conn->query("
    SELECT 
        `date`, 
        `surname`
    FROM `reservations`
");

$booked = [];

if ($reservationsRes) {
    while ($row = $reservationsRes->fetch_assoc()) {
        $booked[$row["date"]] = $row["surname"];
    }
}

$events = [];

while ($row = $eventsRes->fetch_assoc()) {
    $eventStartDb = $row["start"];
    $eventEndDb = $row["end"];

    $isBooked = isset($booked[$eventStartDb]);

    $color = "brown";

    if ($isBooked) {
        $color = "red";
    } elseif ($row["type"] === "rent") {
        $color = "orange";
    } elseif ($row["type"] === "public") {
        $color = "blue";
    } elseif ($row["type"] === "school") {
        $color = "goldenrod";
    } elseif ($row["type"] === "maintenance") {
        $color = "gray";
    }

    $events[] = [
        "id" => $row["id"],
        "title" => $isBooked
            ? "Obsazeno: " . $booked[$eventStartDb]
            : $row["title"],
        "start" => str_replace(" ", "T", $eventStartDb),
        "end" => str_replace(" ", "T", $eventEndDb),
        "extendedProps" => [
            "type" => $row["type"],
            "booked" => $isBooked
        ],
        "color" => $color
    ];
}

echo json_encode($events);
exit;

// vložení eventů do databáze
/**
*   INSERT INTO events (title, start, end, type)
*   VALUES ('Pronájem', '2026-04-27 10:00:00', '2026-04-27 11:00:00', 'rent');
*/