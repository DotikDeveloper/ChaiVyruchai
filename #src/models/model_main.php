<?php
class Model_Main extends Model
{

    public function get_user($phone, $password)
	{
            global $dbname, $pass, $user, $host;
            try {
                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // $query = "SELECT * FROM users WHERE phone=$phone AND password=$password";
                $query = "SELECT users.user_id, users.first_name, users.last_name, users.role_id, organizations.name AS organization, organizations.organization_id, organizations.logo, users.ava, users.date
                FROM users
                LEFT JOIN organizations ON users.organization_id = organizations.organization_id
                WHERE users.phone=$phone AND users.password=$password";

                // $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, users.role_id, organizations.name AS organization, users.ava, users.date
                // FROM users
                // LEFT JOIN organizations ON users.organization_id = organizations.organization_id
                // WHERE phone=$phone AND password=$password");



                $sth = $dbh->prepare($query);
                $sth->execute();
                $array = $sth->fetchAll(PDO::FETCH_ASSOC);



                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                if (!empty($array)){
                    $_SESSION['user'] = $array[0]['first_name'];
                    $_SESSION['user_role'] = $array[0]['role_id'];
                    $_SESSION['user_id'] = $array[0]['user_id'];
                    $_SESSION['user_ava'] = $array[0]['ava'];
                    $_SESSION['user_organization'] = $array[0]['organization'];
                    $_SESSION['organization_id'] = $array[0]['organization_id'];
                    $_SESSION['org_logo'] = $array[0]['logo'];
                    return $array;
                } else {
                    return null;
                }

    }
    public function update_ava($id, $path)
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `users` SET `ava` = :ava, `date` = :date WHERE `user_id` = :edit_id");
            $stmt->bindParam(':ava', $ava);
            $stmt->bindParam(':date', $date);
            // $stmt->bindParam(':edit_id', $user_id);
            $stmt->bindParam(':edit_id', $id);

            // $ava = $_POST['ava'];
            $ava = $path;
            $_SESSION['user_ava'] = $path;
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
    public function update_logo($id, $path)
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `organizations` SET `logo` = :logo, `date` = :date WHERE `organization_id` = :edit_id");
            $stmt->bindParam(':logo', $logo);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':edit_id', $id);

            $logo = $path;
            $_SESSION['org_logo'] = $path;
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
	public function get_user_current()
	{
            global $dbname, $pass, $user, $host;
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sth = $dbh->prepare("SELECT * FROM `users` WHERE `user_id` = :id");
                $sth->execute(array('id' => $_SESSION['user_id']));
                $array = $sth->fetch(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return $array;

    }
	public function get_org_current()
	{
            global $dbname, $pass, $user, $host;
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sth = $dbh->prepare("SELECT * FROM `organizations` WHERE `organization_id` = :id");
                $sth->execute(array('id' => $_SESSION['organization_id']));
                $array = $sth->fetch(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return $array;

    }
    public function update_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `users` SET `first_name` = :first_name, `last_name` = :last_name, `phone` = :phone, `mail` = :mail, `password` = :password, `date` = :date, `card` = :card WHERE `user_id` = :edit_id");
            $stmt->bindParam(':first_name', $first_name);
            $stmt->bindParam(':last_name', $last_name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':card', $card);
            $stmt->bindParam(':edit_id', $user_id);

            $first_name = $_POST['firstNameAdm'];
            $last_name = $_POST['lastNameAdm'];
            $phone = $_POST['phone'];
            $mail = $_POST['mail'];
            $user_id = $_SESSION['user_id'];
            $password = $_POST['password'];
            $date = date("YmdHis");
            if(isset($_POST['userCardSettings'])){
                $card = $_POST['userCardSettings'];
            }
            else {
                $card = '';
            }

            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            $_SESSION['user'] = $_POST['firstNameAdm'];
    }
	public function write_message()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $dbh->prepare("INSERT INTO messages (message, user_id, date)
            VALUES (:message, :user_id, :date)");
            $stmt->bindParam(':message', $message);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':date', $date);

            $message = $_POST['req_message'];
            $user_id = $_SESSION['user_id'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
	public function get_messages()
	{
        global $dbname, $pass, $user, $host;
        try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $org_id = $_SESSION['organization_id'];
            $id = $_SESSION['user_id'];

            switch ($_SESSION['user_role']) {
				case 1:
                    $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, organizations.name AS organization, organizations.organization_id , users.ava, messages.message, messages.date, messages.message_id
                    FROM users
                    LEFT JOIN organizations ON users.organization_id = organizations.organization_id
                    LEFT JOIN messages ON users.user_id = messages.user_id
                    WHERE messages.message != ''");
				break;
				case 2:
                    $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, organizations.name AS organization, organizations.organization_id , users.ava, messages.message, messages.date, messages.message_id
                    FROM users
                    LEFT JOIN organizations ON users.organization_id = organizations.organization_id
                    LEFT JOIN messages ON users.user_id = messages.user_id
                    WHERE organizations.organization_id = $org_id and messages.message != ''");
				break;
				case 3:
                    $sth = $dbh->prepare("SELECT users.user_id, users.first_name, users.last_name, organizations.name AS organization, organizations.organization_id , users.ava, messages.message, messages.date, messages.message_id
                    FROM users
                    LEFT JOIN organizations ON users.organization_id = organizations.organization_id
                    LEFT JOIN messages ON users.user_id = messages.user_id
                    WHERE users.user_id = $id");
				break;
			}



            $sth->execute();
            $array = $sth->fetchAll(PDO::FETCH_ASSOC);

            }
        catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
        $dbh = null;
        return $array;


    }
    public function message_ok()
	{
        global $dbname, $pass, $user, $host;
        try {

        $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $del_id = $_POST['message_ok'];
        $dbh->exec("DELETE FROM `messages` WHERE `message_id` = $del_id");
        }catch(PDOException $e){
        echo "Error: " . $e->getMessage();
        }
        $dbh = null;
    }
}
