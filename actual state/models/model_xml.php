<?php
class Model_Xml extends Model
{

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
    public function xml_exec()
    {
        $input = file_get_contents("php://input");
        $xml = new SimpleXMLElement($input);
        $xml_str = $xml->order_id . $xml->order_state . $xml->reference . $xml->id . $xml->date . $xml->type . $xml->state . $xml->reason_code . $xml->message . $xml->name . $xml->pan . $xml->pan2 . $xml->amount . $xml->fee . $xml->currency . $xml->approval_code . $xml->to_client_ref;
        $pay = new Payapi;
        $new_signature = $pay->get_signature($xml_str . $pay->get_pass());

        $numt = rand();
        if($new_signature == $xml->signature){
            $result = $pay->webapi_registr($xml->amount, $xml->id);
            $xml2 = new SimpleXMLElement($result);

            $result_p = $pay->user_purchase($xml->to_client_ref, $xml2->id);

            $file_request = $_SERVER["DOCUMENT_ROOT"] . "/modules/log/request.log";
            $fw = fopen($file_request, "a");
            // fwrite($fw, "PHP:INPUT " . $input . '|new signature: ' . $new_signature);
            // fwrite($fw, "PHP:INPUT " . "ID" . $xml2->id . "Result" . $result_p);
            fwrite($fw, "\nPHP:INPUT !!!!!!!!!!!!!!!!!" . $input . "!!!!!!!!!!! \n Register result" . $result . "\nID" . $xml2->id . "\nResult" . $result_p);
            fclose($fw);
            return 'ok';
        } return 'fault';
    }
}
