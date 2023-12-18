<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $petName = $_POST['petName'];
    $yearOfAdoption = $_POST['yearOfAdoption'];
    $story = $_POST['story'];

    $target_dir = "catImg/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        
        $imgFile = $_FILES['img'];
        $fileExtension = strtolower(pathinfo($imgFile['name'], PATHINFO_EXTENSION));
        $target_file = $target_dir . uniqid() . '.' . $fileExtension;

        if (move_uploaded_file($imgFile['tmp_name'], $target_file)) {
            
            $imgUrl = $target_file;
        } else {
            echo "Failed to upload image.";
            exit;
        }
    } else {
        echo "Error in file upload: " . $_FILES['img']['error'];
        exit;
    }

   
    $newStory = [
        'petName' => $petName,
        'yearOfAdoption' => $yearOfAdoption,
        'imgUrl' => $imgUrl,
        'story' => $story
    ];

    
    $stories = json_decode(file_get_contents('stories.json'), true) ?: [];
    array_push($stories, $newStory);

    
    if (file_put_contents('stories.json', json_encode($stories, JSON_PRETTY_PRINT)) === false) {
        echo "Failed to write to stories.json";
    } else {
        
        header('Location: stories.html');
    }
} else {
    echo "Invalid request method.";
}
?>

