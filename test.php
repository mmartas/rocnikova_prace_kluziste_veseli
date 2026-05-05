<?php
require "assets/db.php";

$conn = getDb();

$result = $conn->query("SELECT * FROM events");

if (!$result) {
    die("SQL chyba: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
    echo $row["title"] . "<br>";
}