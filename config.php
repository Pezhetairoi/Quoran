<?php 
	header("Content-Type: text/html; charset=utf-8");
	
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PWD', '');
	define('DB_NAME', 'quoran');
	
	$conn = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    if(mysqli_connect_errno()){
        printf("Connection failed: %s\n", mysqli_connect_error());
        exit();
    }
?>