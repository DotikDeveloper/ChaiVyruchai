<?php
class Model_Registration extends Model
{
    public function get_data(int $id=0)
	{
        global $dbname, $pass, $user, $host;
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
            header('Location: /');
    }

     public function send_request()
	{
        $to= "Alexandr <smolyakov.alexandr@gmail.com>" . ", " ;
        $to .= "Sergey <sergey@example.com>";

        $subject = "Заявка на добавление организации";

        $message = '
        <html>
        <head>
        <title>Заявка на добавление организации</title>
        </head>
        <body>
        <p>Заявка на добавление организации</p>
        <table>
        <tr>
        <th></th><th></th>
        <tr>
        <td>Название организации</td><td>'.$_POST['org_name'].'(</td>
        </tr>
        <tr>
        <td>Адрес организации</td><td>'.$_POST['org_address'].'</td>
        </tr>
        <tr>
        <td>Телефон</td><td>'.$_POST['org_phone'].'</td>
        </tr>
        <tr>
        <td>Email</td><td>'.$_POST['org_mail'].'</td>
        </tr>
        </table>
        </body>
        </html>
        ';

        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

        mail($to, $subject, $message, $headers);
        header('Location: /');
    }
}
