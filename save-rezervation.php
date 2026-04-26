<?php
$conn = new mysqli("localhost", "root", "", "kalendar");

$date = $_POST['date'];

// kontrola
$check = $conn->query("SELECT * FROM reservations WHERE date = '$date'");

if ($check->num_rows > 0) {
    echo json_encode(["success" => false]);
    exit;
}

//uložení
$stmt = $conn->prepare("
    INSERT INTO reservations (name, surname, email, phone, note, date) VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssss",
    $_POST['name'],
    $_POST['surname'],
    $_POST['email'],
    $_POST['phone'],
    $_POST['note'],
    $date
);

$stmt->execute();

echo json_encode(["success" => true]);