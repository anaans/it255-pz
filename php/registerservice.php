<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
include("functions.php");

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['address']) && isset($_POST['city']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['drivelicence'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $drivelicence = $_POST['drivelicence'];

 echo register($username,$password,$firstname,$lastname,$address,$city,$email,$phone,$drivelicence);
}
?>