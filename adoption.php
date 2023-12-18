<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $reason = htmlspecialchars($_POST['reason']);
    $selectedCat = json_decode($_POST['selectedCat'], true);

    $catName = htmlspecialchars($selectedCat['name']);
    $catDetails = htmlspecialchars($selectedCat['description']);
    $catImage = htmlspecialchars($selectedCat['photos'][0]['medium']);

    $contact_email = htmlspecialchars($selectedCat['contact']['email']);
    $contect_phone = htmlspecialchars($selectedCat['contact']['phone']);
    $moreInfo = htmlspecialchars($selectedCat['url']);
    $to = $email;
    $subject = "Cat Adoption Submission";
    $message = "
    <html>
    <head>
        <title>Adopt a Cat: Confirmation</title>
        <style>
            body {font-family: 'Roboto', sans-serif; margin: 0; padding: 0; background-color: #f2f2f2;}
            .container {max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}
            h1 {color: #004d40;}
            p {color: #333333;}
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>Thank You for Your Adoption Inquiry, $name</h1>
            <p>Thank you for your interest in adopting a cat. Here are the details of your selected cat:</p>
            <img src='$catImage' alt='Selected Cat' style='width:100%; height:auto;'>
            <p><b>Cat Name:</b> $catName</p>
            <p><b>About:</b> $catDetails</p>
            <p>Your stated reason for adoption: $reason</p>
            <p><b>We will review your submission and contact you soon.</b></p>
            <p>Contact: $contact_email | Phone: $contect_phone</p>
            <a class=’button‘ href= $moreInfo target=‘_blank’>Learn More</a>
        </div>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <teamBaker@SaveStrayCat.com>' . "\r\n";

    mail($to, $subject, $message, $headers);

    echo "Receipt: Your submission has been received.";
}
?>
