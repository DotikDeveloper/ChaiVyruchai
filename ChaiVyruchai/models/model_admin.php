<?php
class Model_Admin extends Model
{

    public function get_user($phone, $password)
	{
            global $dbname, $pass, $user, $host;
            try {
                $dbh = new PDO("mysql:host=$host; dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $query = 'SELECT*FROM users WHERE login="'.$login.'" AND password="'.$password.'"';

                $sth = $dbh->prepare("SELECT * FROM users WHERE phone=".$phone." AND password=".$password.";");
                $sth->execute();
                $array = $sth->fetchAll(PDO::FETCH_ASSOC);

                }catch(PDOException $e){
                echo "Error: " . $e->getMessage();
                }
                $dbh = null;
                return $array;
    }

	public function create_base()
	{
            global $dbname, $pass, $user, $host;
            //Подключение с серверу базы данных
            try {
                $dbh = new PDO("mysql:host=$host", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            }
            catch(PDOException $e) {
                echo $e->getMessage();
            }
            //Создание базы данных
            try {
                $query = "CREATE DATABASE `$dbname` CHARACTER SET utf8 COLLATE utf8_general_ci";
                $dbh->exec($query);
            } catch (PDOException $e) {
                echo "Ошибка выполнения запроса: " . $e->getMessage();
            }
            //Создание таблицы organizations
            try {
                $query = "USE `$dbname`;
                    CREATE TABLE organizations (
                    organization_id INT(11) NOT NULL AUTO_INCREMENT,
                    name TINYTEXT NOT NULL,
                    address TINYTEXT NOT NULL,
                    mail TINYTEXT NOT NULL,
                    phone TINYTEXT NOT NULL,
                    date DATETIME NOT NULL,
                    PRIMARY KEY (organization_id));";
                $dbh->exec($query);
                } catch (PDOException $e) {
                echo "Ошибка выполнения запроса: " . $e->getMessage();
                }
            //Создание таблицы role
            try {
                $query = "USE `$dbname`;
                    CREATE TABLE role (
                    role_id INT(11) NOT NULL AUTO_INCREMENT,
                    name TINYTEXT NOT NULL,
                    description TINYTEXT NOT NULL,
                    PRIMARY KEY (role_id));";
                $dbh->exec($query);
                } catch (PDOException $e) {
                echo "Ошибка выполнения запроса: " . $e->getMessage();
                }
            //Создание таблицы users
            try {
                $query = "USE `$dbname`;
                    CREATE TABLE users (
                    user_id INT(11) NOT NULL AUTO_INCREMENT,
                    first_name TINYTEXT NOT NULL,
                    last_name TINYTEXT NOT NULL,
                    phone TINYTEXT NOT NULL,
                    password CHAR(10) NOT NULL,
                    mail TINYTEXT NOT NULL,
                    role_id INT(11) NOT NULL NOT NULL,
                    organization_id INT(11),
                    date DATETIME NOT NULL,
                    PRIMARY KEY (user_id));";
                $dbh->exec($query);
                } catch (PDOException $e) {
                echo "Ошибка выполнения запроса: " . $e->getMessage();
                }
            $dbh = null;
            header('Location: /admin');
    }
}
