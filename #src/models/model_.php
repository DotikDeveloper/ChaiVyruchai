<?php
class Model_Api extends Model
{

	// public function get_user_current()
	// {
    //         global $dbname, $pass, $user, $host;
    //         try {

    //             $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
    //             $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //             $sth = $dbh->prepare("SELECT * FROM `users` WHERE `user_id` = :id");
    //             $sth->execute(array('id' => $_SESSION['user_id']));
    //             $array = $sth->fetch(PDO::FETCH_ASSOC);

    //             }catch(PDOException $e){
    //             echo "Error: " . $e->getMessage();
    //             }
    //             $dbh = null;
    //             return $array;

    // }

	public function registr()
	{
        $url = 'https://test.best2pay.net/webapi/b2puser/Register';
        $sector = 2391;
        $password = 'test';
        // $client_ref = '000004';
        $first_name = 'Иван';
        $last_name = 'Ивашкин';
        $email = 'no@mail.ru';
        // $str = $sector.$client_ref.$first_name.$last_name.$email.$password;
        $str = $sector.$first_name.$last_name.$email.$password;
        $str=md5($str);
        $signature=base64_encode($str);

        // массив для переменных, которые будут переданы с запросом
        $paramsArray = array(
            'sector' => $sector,
            // 'client_ref' => $client_ref,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'signature' => $signature
        );
        // преобразуем массив в URL-кодированную строку
        $vars = http_build_query($paramsArray);
        // создаем параметры контекста
        $options = array(
            'http' => array(
                        'method'  => 'POST',  // метод передачи данных
                        'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
                        'content' => $vars,  // переменные
                    )
        );
        $context  = stream_context_create($options);  // создаём контекст потока
        $result = file_get_contents($url, false, $context); //отправляем запрос

        return $result;
        // return $vars;

    }

}
