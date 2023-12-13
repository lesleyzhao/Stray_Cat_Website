<?php
session_start();

function validateUser($username, $password) {
    $filename = "user.txt";
    $users = file($filename);

    foreach ($users as $user) {
        list($storedUser, $storedPass) = explode(',', trim($user));
        if ($username === $storedUser && $password === $storedPass) {
            return true;
        }
    }
    return false;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (validateUser($username, $password)) {
        $_SESSION['username'] = $username;
        header("Location: user.html"); // Redirect to user.html
    } else {
        echo "Invalid username or password.";
    }
}
?>
