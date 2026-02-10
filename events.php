<?php
header('Content-Type: application/json');

$events = [
    [
        'title' => 'Obsazeno',
        'start' => '2026-02-15T09:00:00',
        'end'   => '2026-02-15T10:00:00'
    ],
    [
        'title' => 'Obsazeno',
        'start' => '2026-02-15T14:00:00',
        'end'   => '2026-02-15T15:00:00'
    ]
];

echo json_encode($events);
