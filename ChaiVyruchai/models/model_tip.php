<?php
class Model_Tip extends Model
{
	public function get_data_user()
	{
        $db = Db::getConnection();
        $sql = 'SELECT users.user_id, users.first_name, users.last_name, users.phone, users.mail, users.ava, users.card, users.checked, users.client_ref, organizations.name AS organization, organizations.organization_id, organizations.logo
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
        $params = $this->get_data_user_by_id($_POST['id-waiters']);
        $pay = new Payapi;
        $result=$pay->pay_in($params, $_POST['valueTips']);
        return $result;
    }
	public function get_balance()
	{
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result=$pay->info($params);
        $result = new SimpleXMLElement($result);
        return $result->available_balance/100;
    }
	public function get_out_link()
	{
        $params = $this->get_data_user_by_id($_SESSION['user_id']);
        $pay = new Payapi;
        $result=$pay->pay_out($params, $_POST['idUser']);
        return $result;
    }
}
