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
}
