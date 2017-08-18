<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
include("config.php");
include("functions.php");

if(isset($_POST['username']) && isset($_POST['marka_type']) && isset($_POST['model_type']) && isset($_POST['kategorija_type'])  && isset($_POST['price'])&& isset($_POST['numberofdays'])){
    $username = $_POST['username'];
    $marka_type = ($_POST['marka_type']);
    $model_type = ($_POST['model_type']);
    $kategorija_type = ($_POST['katgorija_type']);
    $price = ($_POST['price']);
    $numberofdays = ($_POST['numberofdays']);

    $stmt = $conn->prepare("INSERT INTO reservation (username, marka_type, model_type, kategorija_type, price, numberofdays) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssdi", $username, $marka_type, $model_type, $kategorija_type, $price, $numberofdays);
    $stmt->execute();
    echo "ok";
	//echo reservation($username, $marka_type, $model_type, $kategorija_type, $price, $numberofdays);
}


?>