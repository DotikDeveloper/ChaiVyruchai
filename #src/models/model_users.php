<?php
class Model_Users extends Model
{
	public function get_data(int $id=0)
	{
            global $dbname, $pass, $user, $host;
        if ($id){
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sth = $dbh->prepare("SELECT * FROM `users` WHERE `user_id` = :id");
                $sth->execute(array('id' => $id));
                $array = $sth->fetch(PDO::FETCH_ASSOC);

                $sth = $dbh->prepare("SELECT * FROM `role` ORDER BY `name`");
                $sth->execute();
                $array_role = $sth->fetchAll(PDO::FETCH_ASSOC);

                $sth = $dbh->prepare("SELECT * FROM `organizations` ORDER BY `name`");
                $sth->execute();
                $array_org = $sth->fetchAll(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return [$array, $array_role, $array_org];
        } else {
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, users.phone, users.mail, role.name as role, organizations.name AS organization, users.date
                FROM users
                LEFT JOIN role ON users.role_id = role.role_id
                LEFT JOIN organizations ON users.organization_id = organizations.organization_id;");
                $sth->execute();
                $array = $sth->fetchAll(PDO::FETCH_ASSOC);

                $sth = $dbh->prepare("SELECT * FROM `role` ORDER BY `name`");
                $sth->execute();
                $array_role = $sth->fetchAll(PDO::FETCH_ASSOC);

                $sth = $dbh->prepare("SELECT * FROM `organizations` ORDER BY `name`");
                $sth->execute();
                $array_org = $sth->fetchAll(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return [$array, $array_role, $array_org];
        }

    }
	public function get_moderations()
	{
        global $dbname, $pass, $user, $host;
        try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // $sth = $dbh->prepare("SELECT * FROM `users` WHERE role_id = 3 AND checked = 0");

            $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, organizations.name AS organization, users.ava, users.date
            FROM users
            LEFT JOIN organizations ON users.organization_id = organizations.organization_id
            WHERE users.role_id = 3 and users.checked = 0;");

            $sth->execute();
            $array = $sth->fetchAll(PDO::FETCH_ASSOC);

            }
        catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
        $dbh = null;
        return $array;


    }
	public function add_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $dbh->prepare("INSERT INTO users (first_name, last_name, phone, password, mail, role_id, organization_id, date)
            VALUES (:first_name, :last_name, :phone, :password, :mail, :role_id, :organization_id, :date)");
            $stmt->bindParam(':first_name', $first_name);
            $stmt->bindParam(':last_name', $last_name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':role_id', $role_id);
            $stmt->bindParam(':organization_id', $organization_id);
            $stmt->bindParam(':date', $date);

            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $phone = $_POST['phone'];
            $password = $_POST['password'];
            $mail = $_POST['mail'];
            $role_id = $_POST['role'];
            $organization_id = $_POST['org'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            header('Location: /users');
    }
    public function update_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `users` SET `first_name` = :first_name, `last_name` = :last_name, `phone` = :phone, `mail` = :mail, `role_id` = :role_id, `organization_id` = :organization_id, `date` = :date WHERE `user_id` = :edit_id");
            $stmt->bindParam(':first_name', $first_name);
            $stmt->bindParam(':last_name', $last_name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':role_id', $role_id);
            $stmt->bindParam(':organization_id', $organization_id);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':edit_id', $user_id);

            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $phone = $_POST['phone'];
            $mail = $_POST['mail'];
            $role_id = $_POST['role'];
            $user_id = $_POST['user_id'];
            $organization_id = $_POST['org'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            // header('Location: /users');
    }
    public function moderate_ok()
	{
            global $dbname, $pass, $user, $host;
            $params = $this->get_data($_POST['moderate_ok'])[0];
            $pay = new Payapi;
            $answer = $pay->user_register($params);
            $result=new SimpleXMLElement($answer);
            // $params['client_ref'] = $result->client_ref[0]->__toString();
            // $result2=new SimpleXMLElement($pay->set_phone_service($params));
            // $result2=$pay->set_phone_service($params);

            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `users` SET `checked` = :checked, `client_ref` = :client_ref WHERE `user_id` = :edit_id");
            $stmt->bindParam(':checked', $checked);
            $stmt->bindParam(':client_ref', $client_ref);
            $stmt->bindParam(':edit_id', $user_id);

            $checked = 1;
            $client_ref = $result->client_ref;
            // $client_ref = $result->client_ref[0]->__toString();
            $user_id = $_POST['moderate_ok'];
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
	public function moderate_failure()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $del_id = $_POST['moderate_failure'];
            $dbh->exec("DELETE FROM `users` WHERE `user_id` = $del_id");
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
	// public function registr()
	// {
    //     $url = 'https://test.best2pay.net/webapi/b2puser/Register';
    //     $sector = 2391;
    //     $password = 'test';
    //     // $client_ref = '000004';
    //     $first_name = 'Иван';
    //     $last_name = 'Ивашкин';
    //     $email = 'no@mail.ru';
    //     // $str = $sector.$client_ref.$first_name.$last_name.$email.$password;
    //     $str = $sector.$first_name.$last_name.$email.$password;
    //     $str=md5($str);
    //     $signature=base64_encode($str);

    //     // массив для переменных, которые будут переданы с запросом
    //     $paramsArray = array(
    //         'sector' => $sector,
    //         // 'client_ref' => $client_ref,
    //         'first_name' => $first_name,
    //         'last_name' => $last_name,
    //         'email' => $email,
    //         'signature' => $signature
    //     );
    //     // преобразуем массив в URL-кодированную строку
    //     $vars = http_build_query($paramsArray);
    //     // создаем параметры контекста
    //     $options = array(
    //         'http' => array(
    //                     'method'  => 'POST',  // метод передачи данных
    //                     'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
    //                     'content' => $vars,  // переменные
    //                 )
    //     );
    //     $context  = stream_context_create($options);  // создаём контекст потока
    //     $result = file_get_contents($url, false, $context); //отправляем запрос

    //     return $result;
    //     // return $vars;

    // }
	public function del_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $del_id = $_POST['del_id'];
            $dbh->exec("DELETE FROM `users` WHERE `user_id` = $del_id");
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            header('Location: /users');
    }
	public function check_phone()//взаимодействие с платежным сервисом для привязки номера телефона
	{
        $params = $this->get_data($_SESSION['user_id'])[0];
        $pay = new Payapi;
        // $result2=new SimpleXMLElement($pay->set_phone_service($params));
        $info = $pay->info($params);
        // $phone = $pay->set_phone($params);

        $result=$pay->check_phone_service($params);

        // return false;
        // return 'ok';

        return $result;
    }
	public function set_phone()//взаимодействие с платежным сервисом для привязки номера телефона
	{
        $params = $this->get_data($_SESSION['user_id'])[0];
        $pay = new Payapi;
        // $result2=new SimpleXMLElement($pay->set_phone_service($params));
        // $info = $pay->info($params);
        // $phone = $pay->set_phone($params);
        $result=$pay->set_phone_service($params, $_POST['sms']);
        // return false;
        return 'ok';
        // return $phone;
    }
}
