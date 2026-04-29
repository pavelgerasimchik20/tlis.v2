<?php
/**
 * Дописывает одну строку в leads-feed.txt (рядом с этим файлом).
 * Вызывается из tlis-home-scripts.js после успешной отправки в Telegram.
 *
 * Настройка:
 * 1. Задайте секрет ниже (длинная случайная строка).
 * 2. В src/assets/tlis-home-scripts.js задайте тот же секрет в TLIS_LEADS_LOG_SECRET.
 * 3. Загрузите эту папку marketing/ на сервер с PHP.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$TLIS_LEADS_SECRET = 'ЗАМЕНИТЕ_НА_СЛУЧАЙНУЮ_ДЛИННУЮ_СТРОКУ';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method'], JSON_UNESCAPED_UNICODE);
    exit;
}

$hdr = $_SERVER['HTTP_X_TLIS_LEADS_SECRET'] ?? '';
if ($TLIS_LEADS_SECRET === '' || $TLIS_LEADS_SECRET === 'ЗАМЕНИТЕ_НА_СЛУЧАЙНУЮ_ДЛИННУЮ_СТРОКУ' || !hash_equals($TLIS_LEADS_SECRET, $hdr)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'json'], JSON_UNESCAPED_UNICODE);
    exit;
}

$line = isset($data['line']) ? (string) $data['line'] : '';
$line = str_replace(["\r", "\n", "\x00"], ' ', $line);
$line = trim($line);
if ($line === '' || strlen($line) > 4000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'line'], JSON_UNESCAPED_UNICODE);
    exit;
}

$path = __DIR__ . DIRECTORY_SEPARATOR . 'leads-feed.txt';
$written = @file_put_contents($path, $line . "\n", FILE_APPEND | LOCK_EX);
if ($written === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
