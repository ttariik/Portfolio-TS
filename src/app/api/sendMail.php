<?php

$data = json_decode(file_get_contents("php://input"), true);
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$privacyPolicy = isset($data['privacyPolicy']) ? $data['privacyPolicy'] : false;

if ($name && $email && $message && $privacyPolicy) {
    $to = ""; 
    $subject = "Neue Kontaktanfrage von $name";
    $body = "Name: $name\nE-Mail: $email\nNachricht:\n$message";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Mail gesendet."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Fehler beim Senden der Mail."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Unvollständige oder fehlerhafte Daten."]);
}
?>
