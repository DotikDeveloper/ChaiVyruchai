<?php
class Model_Pay extends Model
{
    public function get_data_user()
    {
        $db = Db::getConnection();
        $sql = 'SELECT users.user_id, users.first_name, users.last_name, users.phone, users.slogan, users.mail, users.ava, users.card, users.checked, users.client_ref, organizations.name AS organization, organizations.organization_id, organizations.logo
        FROM users
        LEFT JOIN organizations ON users.organization_id = organizations.organization_id
        WHERE user_cod=?';
        $result = $db->prepare($sql);
        $result->execute([$_POST['id-waiters']]);
        return $result->fetchAll(PDO::FETCH_ASSOC)[0];
    }
    public function get_data_user_by_id($id)
    {
        $db = Db::getConnection();
        $sql = 'SELECT users.user_id, users.first_name, users.last_name, users.phone, users.mail, users.ava, users.card, users.checked, users.client_ref, organizations.name AS organization, organizations.organization_id, organizations.logo
        FROM users
        LEFT JOIN organizations ON users.organization_id = organizations.organization_id
        WHERE user_id=?';
        $result = $db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_ASSOC)[0];
    }
    public function get_chai()
    {
        $result[0] = $this->get_data_user_by_id($_POST['id-waiters']);
        $pay = new Payapi;
        $result[1] = $pay->pay_in($result[0], $_POST['valueTips']);
        return $result;
    }
    public function fix_review()
    {
        $db = Db::getConnection();

        $stmt = $db->prepare("INSERT INTO reviews (user_id, rating, amount, comment, date)
        VALUES (:user_id, :rating, :amount, :comment, :date)");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':rating', $rating);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':comment', $comment);
        $stmt->bindParam(':date', $date);

        $user_id = $_POST["id-waiters"];
        $rating = $_POST['rating'];
        $amount = $_POST['valueTips'];
        $comment = $_POST['review-text'];
        $date = date("YmdHis");
        $stmt->execute();
        $db = null;
    }
    public function get_balance()
    {
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result = $pay->info($params);
        $result = new SimpleXMLElement($result);
        return $result->available_balance / 100;
    }
    public function get_statement()
    {
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result = $pay->statement($params, $_POST['get_statement_start'], $_POST['get_statement_end']);
        $result = new SimpleXMLElement($result);
        return $result;
    }

    public function get_reviews()
    {
        switch ($_POST['get_reviews']) {
            case 1:
                $ingection = "AND  DATE(date) = CURRENT_DATE";
                break;
            case 2:
                $ingection = "AND DATE(date) >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)";
                break;

            default:
                $ingection = "AND DATE(date) >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)";
                break;
        }
        $db = Db::getConnection();
        $sql = 'SELECT rating, amount, comment, date
        FROM reviews
        WHERE user_id=?'.$ingection;
        $result = $db->prepare($sql);
        $result->execute([$_SESSION['user_id']]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
    public function get_out_link()
    {
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result = $pay->pay_out($params, $_POST['idUser']);
        return $result;
    }
    public function card_enroll()
    {
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result = $pay->card_enroll($params);
        return $result;
    }
}
