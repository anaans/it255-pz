<?php
header('Access-Control-Allow-Methods: GET');
include("functions.php");

if(isset($_GET['rid'])){
	$rid = intval($_GET['rid']);
	echo deleteReservation($rid);
}


?>