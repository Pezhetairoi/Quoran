<?php 
	sleep(3);
	require "config.php";
	
	$conn->query("INSERT INTO user (user, pass, email, gender, dob, reg_date)
				VALUES ('{$_POST['user']}', 
						sha1('{$_POST['pass']}'),
						'{$_POST['email']}',
						'{$_POST['gender']}',
						'{$_POST['dob']}',
						NOW()
						)
				") or die($conn->error);
	echo $conn->affected_rows;
	
	$conn->close();
	
?>