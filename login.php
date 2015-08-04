<?php 
	require "config.php";
	
	$_pass = sha1($_POST['login_pass']);
	$result = $conn->query("SELECT user, pass	
							FROM user
							WHERE user = '{$_POST['login_user']}' AND pass = '{$_pass}'
							") or die($conn->error);
	
	//return true if login credential is correct
	//print_r($_pass);
	if($result->fetch_assoc()){
		echo "true";
	}else{
		echo "false";
	}
	 $conn->close();
?>