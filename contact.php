<style>
@import url('https://fonts.googleapis.com/css?family=Muli');

    body {
        background-color: #008598;
        margin: 0 auto;
    }
    
    img {
        display: block;
        margin: auto;
    }
    
    .alert {
        font-family: 'Muli', sans-serif;
        font-weight: 900;
        font-size: 25px;
        text-align: center;
        padding-top: 100px;
        color: #fff;
    }
    
    .back_to_site {
        font-family: 'Muli', sans-serif;
        font-weight: 900;
        font-size: 25px;
        text-align: center;
        color: #fff;
        padding-top: 70px;
    }
    
    a:hover {
        text-decoration: none;
    }
    
    
</style>

<img src="assets/img/sent-mail.png">

<?php
	$site_owners_email = 'gfodor85@gmail.com'; // Replace this with your own email address
	$site_owners_name = 'George Fodor'; // replace with your name
	$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
	
	$error = "";
	if (strlen($name) < 2) {
		$error['name'] = "Please enter your name.";
	}
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address";
	}
	
	if (strlen($message) < 2) {
		$error['message'] = "Please leave a message.";
	}
	if (!$error) {
		require_once('assets/php/phpmailer/class.phpmailer.php');
		$mail = new PHPMailer();
        
		$mail->AddAddress($site_owners_email, $site_owners_name);
		$mail->IsHTML(true);
		$mail->From = 'gfodor85@gmail.com';
		$mail->FromName = $name;
		$mail->Body = '<b>Sender Name:</b> '. $name .'<br/><b>Sender E-mail:</b> '. $email . '<br/><br/><b>Sender Message:</b><br/>' . $message;
		$mail->Send();
		echo "<div class='alert alert-success' role='alert'>Thanks " . $name . ". Your message has been sent. You will get a reply soon.</div>";
	} # end if no error
	else {
		$response = (isset($error['name'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['name'] . "</div> \n" : null;
		$response .= (isset($error['email'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['email'] . "</div> \n" : null;
		$response .= (isset($error['message'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['message'] . "</div>" : null;
		echo $response;
	} # end if there was an error sending
?>

<div class="back_to_site">
    <a  class="back_to_site" href="http://www.georgefodor.com">
        Back to the site
    </a>
</div>