<?php
include("config.php");

//proverava da li je u zahtev prosledjen token
function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM korisnik WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

//proverava da li su uneti podati ispravni za login
function login($username, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE korisnik SET token=? WHERE username=?");
        $result2->bind_param("ss",$id,$username);
        $result2->execute();
        $rarray['token'] = $id;
        } else{
        header('HTTP/1.1 401 Unauthorized');
            $rarray['error'] = "Invalid username/password";
        }
    return json_encode($rarray);
}

//preverava da li su podaci ispravni
function checkLogin($username, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM korisnik WHERE username=? AND password=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

//validira podatke za registraciju, ukoliko je ispravno registuje korisnika
function register($username, $password, $firstname, $lastname, $address, $city, $email, $phone, $drivelicence){
    global $conn;
    $rarray = array();
    $errors = "";
    if(checkIfUserExists($username)){
    $errors .= "Username already exists\r\n";
    }
    if(strlen($username) < 5){
    $errors .= "Username must have at least 5 characters\r\n";
    }
    if(strlen($password) < 5){
    $errors .= "Password must have at least 5 characters\r\n";
    }
    if(strlen($firstname) < 3){
    $errors .= "First name must have at least 3 characters\r\n";
    }
    if(strlen($lastname) < 3){
    $errors .= "Last name must have at least 3 characters\r\n";
    }
    if(strlen($address) < 3){
        $errors .= "Address must have at least 3 characters\r\n";
    }
    if(strlen($city) < 3){
         $errors .= "City must have at least 3 characters\r\n";
    }
    if(strlen($email) < 7){
         $errors .= "Email must have at least 7 characters\r\n";
     }
    if(strlen($phone) < 7){
         $errors .= "Phone must have at least 7 characters\r\n";
    }
    if(strlen($drivelicence) < 7){
             $errors .= "Drive licence must have at least 7 characters\r\n";
        }

    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO korisnik (username, password, firstname, lastname, address, city, email, phone, drivelicence) VALUES (?,?,?,?,?,?,?,?,?)");
        $pass =md5($password);
        $stmt->bind_param("ssssssssi", $username, $pass, $firstname, $lastname, $address, $city, $email, $phone, $drivelicence);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE korisnik SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error ";
            }
        }else{
             header('HTTP/1.1 400 Bad request');
             $rarray['error'] = json_encode($errors);
             }
            return json_encode($rarray);
        }


//proverava da li korisnik vec postoji u bazi
function checkIfUserExists($username){
    global $conn;
    $result = $conn->prepare("SELECT * FROM korisnik WHERE username=?");
    $result->bind_param("s",$username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function checkLoginAdmin($username, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM admin WHERE username=? AND password=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function loginAdmin($username, $password){
    global $conn;
    $rarray = array();
    if(checkLoginAdmin($username,$password)){
    $aid = sha1(uniqid());
    $result = $conn->prepare("UPDATE admin SET tokenadmin=? WHERE username=?");
    $result->bind_param("ss",$aid,$username);
    $result->execute();
    $rarray['tokenadmin'] = $aid;
    } else{
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Invalid username/password";
    }
        return json_encode($rarray);
}


function checkIfLoggedInAdmin(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $tokenadmin = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM admin WHERE tokenadmin=?");
        $result -> bind_param("s", $tokenadmin);
        $result -> execute();
        $result -> store_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0)
        {
        return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function addBikes($marka_id, $model_id, $kategorija_id, $price, $options)
{
    global $conn;
    $rarray = array();
    $stms=$conn->prepare("INSERT INTO bikes (marka_id, model_id, kategorija_id, price, options) VALUES (?,?,?,?,?)");
    $stms->bind_param("iiiis", $marka_id, $model_id, $kategorija_id, $price, $options);
    if($stms->execute()){
        $rarray['success'] = "ok";
    }else{
        $rarray['error'] = "Database connection error";
    }
    return json_encode($rarray);
}

function getBikes()
{
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT * FROM bikes");
        $num_rows=$result->num_rows;
        $bikes=array();
        if($num_rows>0)
        {
            $result2 = $conn->query("SELECT * FROM bikes");
            while($row=$result2->fetch_assoc()){
                $bike = array();
                $bike['lid'] = $row['lid'];
                $bike['marka_type']= getMarkaById($row['marka_id']);
                $bike['model_type']= getModelById($row['model_id']);
                $bike['kategorija_type']= getKategorijaById($row['kategorija_id']);
                $bike['price'] = $row['price'];
                $bike['options'] = $row['options'];
                array_push($bikes,$bike);
            }

        $rarray['bikes'] = $bikes;
        return json_encode($rarray);
}
}
function deleteBike($lid){
	global $conn;  
	$rarray = array();  
    if(checkIfLoggedInAdmin()){
		$result = $conn->prepare("DELETE FROM bikes WHERE lid=?");
		$result->bind_param("i",$lid);   
		$result->execute();   
		$rarray['success'] = "Deleted successfully";  
    } else {
    $rarray['error'] = "Please log in";
    header('HTTP/1.1 401 Unauthorized');
    }
	return json_encode($rarray); 
}


function getMarke()
{
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT * FROM marka");
        $num_rows = $result->num_rows;
        $marke = array();
        if($num_rows >0)
        {
            $result2=$conn->query("SELECT * FROM marka");
            while ($row = $result2->fetch_assoc()){
                array_push($marke,$row);
            }
        }
        $rarray['marke'] = $marke;
        return json_encode($rarray);
}

function getModeli()
{
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT * FROM model");
        $num_rows = $result->num_rows;
        $modeli = array();
        if($num_rows >0)
        {
            $result2=$conn->query("SELECT * FROM model");
            while ($row = $result2->fetch_assoc()){
                array_push($modeli,$row);
            }
        }
        $rarray['modeli'] = $modeli;
        return json_encode($rarray);
}




function getKategorija()
{
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT * FROM kategorija");
        $num_rows = $result->num_rows;
        $kategorija = array();
        if($num_rows >0)
        {
            $result2=$conn->query("SELECT * FROM kategorija");
            while ($row = $result2->fetch_assoc()){
                array_push($kategorija,$row);
            }
        }
        $rarray['kategorije'] = $kategorija;
        return json_encode($rarray);
}



function getModelById($model_id){
	global $conn;
	$rarray = array();
	$model_id = intval($model_id);
	$result = $conn->query("SELECT * FROM model WHERE model_id=".$model_id);
	$num_rows = $result->num_rows;
	$rowtoreturn = array();
	if($num_rows > 0)
	{
		$result2 = $conn->query("SELECT * FROM model WHERE model_id=".$model_id);
		while($row = $result2->fetch_assoc()) {
			$rowtoreturn = $row;
		}
	}
	return $rowtoreturn['model_type'];
}

function getKategorijaById($kategorija_id){
	global $conn;
	$rarray = array();
	$kategorija_id = intval($kategorija_id);
	$result = $conn->query("SELECT * FROM kategorija WHERE kategorija_id=".$kategorija_id);
	$num_rows = $result->num_rows;
	$rowtoreturn = array();
	if($num_rows > 0)
	{
		$result2 = $conn->query("SELECT * FROM kategorija WHERE kategorija_id=".$kategorija_id);
		while($row = $result2->fetch_assoc()) {
			$rowtoreturn = $row;
		}
	}
	return $rowtoreturn['kategorija_type'];
}



function getUserByToken($token){
	global $conn;
	$rarray = array();
	$token = mysqli_real_escape_string($conn,$token);
			$result2 = $conn->query("SELECT * FROM korisnik WHERE token = ".$token);
			while($row = $result2->fetch_assoc()) {
				$rarray['username'] = $row;
			}
		return json_encode($rarray);

}

function getAdminByToken($tokenadmin){
	global $conn;
	$rarray = array();
	$tokenadmin = mysqli_real_escape_string($conn,$tokenadmin);
			$result2 = $conn->query("SELECT * FROM admin WHERE tokenadmin = ".$tokenadmin);
			while($row = $result2->fetch_assoc()) {
				$rarray['username'] = $row;
			}
		return json_encode($rarray);

}

function getMarkaById($marka_id){
	global $conn;
	$rarray = array();
	$marka_id = intval($marka_id);
	$result = $conn->query("SELECT * FROM marka WHERE marka_id=".$marka_id);
	$num_rows = $result->num_rows;
	$rowtoreturn = array();
	if($num_rows > 0)
	{
		$result2 = $conn->query("SELECT * FROM marka WHERE marka_id=".$marka_id);
		while($row = $result2->fetch_assoc()) {
			$rowtoreturn = $row;
		}
	}
	return $rowtoreturn['marka_type'];
}

function getBikesById($lid){
	global $conn;
	$rarray = array();
    $lid = intval($lid);
        $result = $conn->query("SELECT bikes.lid, marka.marka_type, model.model_type, kategorija.kategorija_type, bikes.price, bikes.options FROM bikes
JOIN marka ON bikes.marka_id = marka.marka_id JOIN model ON bikes.model_id = model.model_id JOIN kategorija ON bikes.kategorija_id = kategorija.kategorija_id 
WHERE lid=".$lid);
        $num_rows=$result->num_rows;
        $bikes=array();
        if($num_rows>0)
        {
            $result2 = $conn->query("SELECT bikes.lid, marka.marka_type AS marka_type, model.model_type AS model_type, kategorija.kategorija_type AS kategorija_type, bikes.price, bikes.options FROM bikes
JOIN marka ON bikes.marka_id = marka.marka_id JOIN model ON bikes.model_id = model.model_id JOIN kategorija ON bikes.kategorija_id = kategorija.kategorija_id 
WHERE lid=".$lid);
            while($row=$result2->fetch_assoc()){
                $bike = array();
                $bike['lid'] = $row['lid'];
                $bike['marka_type']= $row['marka_type'];
                $bike['model_type']= $row['model_type'];
                $bike['kategorija_type']= $row['kategorija_type'];
                $bike['price'] = $row['price'];
                $bike['options'] = $row['options'];
                array_push($bikes,$bike);
            }
		}
        $rarray['bikes'] = $bikes;
        return json_encode($rarray);
}

function reservation($username, $marka_type, $model_type, $kategorija_type, $price, $numberofdays){
	global $conn;
	$rarray = array();
	$errors = "";

				$stmt = $conn->prepare("INSERT INTO reservation (username, marka_type, model_type, kategorija_type, price, numberofdays) VALUES (?,?,?,?,?,?)");
				$stmt->bind_param("ssssii", $username, $marka_type, $model_type, $kategorija_type, $price, $numberofdays);
				if($stmt->execute()){
					$rarray['success'] = "ok";
				}else{
					$rarray['error'] = "Database connection error";
				}
				return json_encode($rarray);

}

function getReservation(){
    global $conn;
    $rarray = array();
    $result = mysqli_query($conn, "SELECT * FROM reservation");
    $num_rows = mysqli_num_rows($result);
    $reservation = array();
    if($num_rows > 0)
        {
        while($row = mysqli_fetch_assoc($result)) {
        $res = array();
        $res['rid'] = $row['rid'];
        $res['username'] = $row['username'];
        $res['marka_type'] = $row['marka_type'];
        $res['model_type'] = $row['model_type'];
        $res['kategorija_type'] = $row['kategorija_type'];
        $res['numberofdays'] = $row['numberofdays'];
        $res['price'] = $row['price'];
        array_push($reservation,$res);
        }
    }
        $rarray['reservation'] = $reservation;
    return json_encode($rarray);

}

function deleteReservation($rid){
	global $conn;
	$rarray = array();
		$result = $conn->prepare("DELETE FROM reservation WHERE rid=?");
		$result->bind_param("i",$rid);
		$result->execute();
		$rarray['success'] = "Deleted successfully";
	return json_encode($rarray);
}

function getUsers(){
    global $conn;
    $rarray = array();

    $result = mysqli_query($conn, "SELECT * FROM korisnik");
    $num_rows = mysqli_num_rows($result);
    $listofusers = array();
    if($num_rows > 0)
    {
        while($row = mysqli_fetch_assoc($result)) {
        $user = array();
        $user['id'] = $row['id'];
        $user['firstname'] = $row['firstname'];
        $user['lastname'] = $row['lastname'];
        $user['username'] = $row['username'];
        $user['address'] = $row['address'];
        $user['city'] = $row['city'];
        $user['email'] = $row['email'];
        $user['phone'] = $row['phone'];
        $user['drivelicence'] = $row['drivelicence'];
        array_push($listofusers,$user);
    }
    }
        $rarray['listofusers'] = $listofusers;
    return json_encode($rarray);
 }


function deleteUser($id){
    global $conn;
  	$rarray = array();
  		$result = $conn->prepare("DELETE FROM korisnik WHERE id=?");
  		$result->bind_param("i",$id);
  		$result->execute();
  		$rarray['success'] = "Deleted successfully";
  	return json_encode($rarray);
  }




?>