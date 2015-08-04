<?php 
	require "config.php";
	$result = $conn->query("SELECT user 
							FROM user
							WHERE user = '{$_POST["user"]}'
							") or die($conn->error);
	
	//return false if user exists
	if($result->fetch_assoc()){
		echo "false";
	}else{
		echo "true";
	}
	 $conn->close();
	
?>