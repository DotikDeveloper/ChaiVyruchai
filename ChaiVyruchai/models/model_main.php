<?php
class Model_Main extends Model
{

    public function get_user($phone, $password)
	{
            global $dbname, $pass, $user, $host;
            try {
                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $query = 'SELECT * FROM users WHERE phone="'.$phone.'" AND password="'.$password.'"';
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

    }    public function update_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `users` SET `first_name` = :first_name, `last_name` = :last_name, `phone` = :phone, `mail` = :mail, `password` = :password, `date` = :date WHERE `user_id` = :edit_id");
            $stmt->bindParam(':first_name', $first_name);
            $stmt->bindParam(':last_name', $last_name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':mail', $mail);
            // $stmt->bindParam(':role_id', $role_id);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':edit_id', $user_id);

            $first_name = $_POST['firstNameAdm'];
            $last_name = $_POST['lastNameAdm'];
            $phone = $_POST['phone'];
            $mail = $_POST['mail'];
            // $role_id = $_POST['role'];
            $user_id = $_SESSION['user_id'];
            $password = $_POST['password'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            // header('Location: /users');
            $_SESSION['user'] = $_POST['firstNameAdm'];
    }

}
