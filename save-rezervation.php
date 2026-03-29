<?php

$data = json_decode(file_get_contents("php://input"), true);

$file = 'reservations.json';

// načti existující data
if (file_exists($file)) {
    $current = json_decode(file_get_contents($file), true);
} else {
    $current = [];
}

// přidej novou rezervaci
$current[] = [
    "title" => "Obsazeno",
    "start" => $data["date"] . "T" . $data["time"],
    "end"   => date("Y-m-d\\TH:i:s", strtotime($data["date"] . " " . $data["time"] . " +1 hour")),
    "name"  => $data["name"],
    "surname" => $data["surname"],
    "email" => $data["email"],
    "tel" => $data["tel"],
    "notes" => $data["notes"]
];

// ulož zpět
file_put_contents($file, json_encode($current, JSON_PRETTY_PRINT));

echo json_encode(["status" => "ok"]);