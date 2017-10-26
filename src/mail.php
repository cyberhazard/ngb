<? echo $_POST["user_name"]; ?>
<? echo $_POST["user_phone"]; ?>
<? echo $_POST; ?>


<?php
$to      = 'zolotukhinwebpr@mail.ru';
$subject = 'Заявка с сайта';
$message = 'Заявка.  Имя: ' . $_POST["user-name"] . ' Телефон: ' . $_POST["user-phone"] . ' Сообщение: ' . $_POST["user-text"];
$headers = 'From: admin@legpos-auto.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: admin@ngb.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>

