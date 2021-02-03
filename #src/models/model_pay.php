<?php
class Model_Pay extends Model
{
	public function get_data_user()
	{
        $db = Db::getConnection();
        $sql = 'SELECT users.user_id, users.first_name, users.last_name, users.phone, users.mail, users.ava, users.card, users.checked, users.client_ref, organizations.name AS organization, organizations.organization_id, organizations.logo
        FROM users
        LEFT JOIN organizations ON users.organization_id = organizations.organization_id
        WHERE user_id=?';
        $result = $db->prepare($sql);
        $result->execute([$_POST['id-waiters']]);
        return $result->fetchAll(PDO::FETCH_ASSOC)[0];
    }
	public function get_chai()
	{
        $params = $this->get_data_user();
        $pay = new Payapi;
        // $result2=new SimpleXMLElement($pay->set_phone_service($params));
        $info = $pay->info($params);
        // $phone = $pay->set_phone($params);

        $result=$pay->pay_in($params, $_POST['valueTips']);

        // return false;
        return $result;
        // return $phone;
    }
}
