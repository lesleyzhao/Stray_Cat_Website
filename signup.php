<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $filename = "user.txt";
    $userString = $username . "," . $password . "\n";

    file_put_contents($filename, $userString, FILE_APPEND);
    echo "Thank you for registering, " . htmlspecialchars($username) . "!";
}
?>
