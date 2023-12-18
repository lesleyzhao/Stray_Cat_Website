<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fname = isset($_POST['fname']) ? $_POST['fname'] : "";
    $lname = isset($_POST['lname']) ? $_POST['lname'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $gender = isset($_POST['gender']) ? $_POST['gender'] : "";
    $message = isset($_POST['message']) ? $_POST['message'] : "";

    $formData = array(
        'first_name' => $fname,
        'last_name' => $lname,
        'email' => $email,
        'gender' => $gender,
        'message' => $message
    );

    $json_data = json_encode($formData, JSON_PRETTY_PRINT);

    $fileName = 'contact_data.json';

    if(file_exists($fileName)) {
        $existing_data = file_get_contents($fileName);
        $tempArray = json_decode($existing_data, true);
        array_push($tempArray, $formData);
        $jsonData = json_encode($tempArray, JSON_PRETTY_PRINT);
        file_put_contents($fileName, $jsonData);
    } else {
        file_put_contents($fileName, "[" . $json_data . "]");
    }

    echo 'Thank you for your submission!';
    header('Location: contact.html');
    
}
?>
