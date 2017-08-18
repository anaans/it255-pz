<?php
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');
include("functions.php");

if(isset($_GET['lid'])){
	$lid = intval($_GET['lid']);
	echo deleteBike($lid);
}

?>