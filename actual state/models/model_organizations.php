<?php
class Model_Organizations extends Model
{
	public function get_data(int $id=0)
	{
            global $dbname, $pass, $user, $host;
        if ($id){
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sth = $dbh->prepare("SELECT * FROM `organizations` WHERE `organization_id` = :id");
                $sth->execute(array('id' => $id));
                $array = $sth->fetch(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return $array;
        } else {
            try {

                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sth = $dbh->prepare("SELECT * FROM `organizations` ORDER BY `name`");
                $sth->execute();
                $array = $sth->fetchAll(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return $array;
        }

    }
	public function add_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("INSERT INTO organizations (name, address, mail, phone, date)
            VALUES (:name, :address, :mail, :phone, :date)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':date', $date);

            $name = $_POST['org_name'];
            $address = $_POST['org_address'];
            $mail = $_POST['org_mail'];
            $phone = $_POST['org_phone'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
    }
    public function update_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE `organizations` SET `name` = :name, `address` = :address, `mail` = :mail, `phone` = :phone, `date` = :date  WHERE `organization_id` = :edit_id");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':edit_id', $edit_id);
            $stmt->bindParam(':date', $date);
            $name = $_POST['org_name'];
            $address = $_POST['org_address'];
            $mail = $_POST['org_mail'];
            $phone = $_POST['org_phone'];
            $edit_id = $_POST['organization_id'];
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            header('Location: /organizations');
    }
	public function del_data()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $del_id = $_POST['del_id'];
            $dbh->exec("DELETE FROM `organizations` WHERE `organization_id` = $del_id");
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }
            $dbh = null;
            header('Location: /organizations');
    }
	public function add_data_with_user()
	{
            global $dbname, $pass, $user, $host;
            try {

            $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("INSERT INTO organizations (name, address, mail, phone, date)
            VALUES (:name, :address, :mail, :phone, :date)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':date', $date);

            $name = $_POST['org_name'];
            $address = $_POST['org_address'];
            $mail = $_POST['org_mail'];
            $phone = $_POST['org_phone'];
            $date = date("YmdHis");
            $stmt->execute();
            $id = $dbh->lastInsertId();


            // echo $id;
            // exit();

            //запись данных ответственного лица...
            $stmt = $dbh->prepare("INSERT INTO users (first_name, last_name, phone, password, mail, role_id, organization_id, date)
            VALUES (:first_name, :last_name, :phone, :password, :mail, :role_id, :organization_id, :date)");
            $stmt->bindParam(':first_name', $first_name);
            $stmt->bindParam(':last_name', $last_name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':mail', $mail);
            $stmt->bindParam(':role_id', $role_id);
            $stmt->bindParam(':organization_id', $id);
            $stmt->bindParam(':date', $date);

            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $phone = $_POST['phone'];
            $password = $_POST['password'];
            $mail = $_POST['mail'];
            $role_id = $_POST['role'];
            $organization_id = $id;
            $date = date("YmdHis");
            $stmt->execute();
            }catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            }



            $dbh = null;
            // header('Location: /');

    }
}
