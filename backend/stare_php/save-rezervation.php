<?php
require "db.php";

header("Content-Type: application/json; charset=utf-8");

$conn = getDb();

$date = $_POST["date"] ?? "";
$name = $_POST["name"] ?? "";
$surname = $_POST["surname"] ?? "";
$email = $_POST["email"] ?? "";
$phone = $_POST["phone"] ?? "";
$note = $_POST["note"] ?? "";

$date = str_replace("T", " ", $date);

if ($date === "" || $name === "" || $surname === "" || $email === "" || $phone === "") {
    echo json_encode([
        "success" => false,
        "message" => "Chybí povinné údaje."
    ]);
    exit;
}

$check = $conn->prepare("SELECT `id` FROM `reservations` WHERE `date` = ? LIMIT 1");

if (!$check) {
    echo json_encode([
        "success" => false,
        "message" => "Chyba prepare kontroly: " . $conn->error
    ]);
    exit;
}

$check->bind_param("s", $date);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Tento termín už je obsazený."
    ]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO `reservations` 
    (`name`, `surname`, `email`, `phone`, `note`, `date`)
    VALUES (?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Chyba prepare insertu: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "ssssss",
    $name,
    $surname,
    $email,
    $phone,
    $note,
    $date
);

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Chyba při ukládání rezervace: " . $stmt->error
    ]);
    exit;
}

echo json_encode([
    "success" => true
]);
exit;