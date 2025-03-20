<?php
header('Content-Type: application/json');

// Get user inputs
$pair = $_GET['pair'] ?? 'USDBDT_otc';
$time = $_GET['time'] ?? date('H:i');
$timezone = $_GET['timezone'] ?? 'UTC: +06:00';

// Generate 10 days of candle data
$data = [];

for ($i = 0; $i < 10; $i++) {
    $date = date('Y-m-d', strtotime("-$i days"));

    // Generate random OHLC values
    $open = round(mt_rand(127500, 127600) / 1000, 3);
    $high = round($open + mt_rand(1, 5) / 1000, 3);
    $low = round($open - mt_rand(1, 5) / 1000, 3);
    $close = round($low + (mt_rand(0, 100) / 100) * ($high - $low), 3);
    $volume = mt_rand(50, 200);
    
    // Determine direction
    $direction = ($close > $open) ? 'call' : 'put';

    // Store candle data
    $data[] = [
        "asset" => $pair,
        "date" => $date,
        "time" => $time,
        "timezone" => $timezone,
        "open" => $open,
        "close" => $close,
        "high" => $high,
        "low" => $low,
        "volume" => $volume,
        "direction" => $direction
    ];
}

// Output JSON response
echo json_encode($data, JSON_PRETTY_PRINT);
?>
