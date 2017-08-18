<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");

if(isset($_POST['marka_id']) && isset($_POST['model_id']) && isset($_POST['kategorija_id'])  && isset($_POST['price']) && isset($_POST['options'])){
$marka_id = $_POST['marka_id'];
$model_id = $_POST['model_id'];
$kategorija_id = $_POST['kategorija_id'];
$price = $_POST['price'];
$options = $_POST['options'];

echo addBikes($marka_id, $model_id, $kategorija_id, $price, $options);

}
?>