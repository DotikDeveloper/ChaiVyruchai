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
                    return $array;
                } else {
                    return null;
                }

    }

}
