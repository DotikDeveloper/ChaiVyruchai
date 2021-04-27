<?php //test
class chdb
{
	public function create_bd($dbname)
	{
		global $dbh, $pass, $user;
		try {
			$query = "CREATE DATABASE `$dbname`;
                    CREATE USER '$user'@'localhost' IDENTIFIED BY '$pass';
                    GRANT ALL ON `$dbname`.* TO '$user'@'localhost';
                    FLUSH PRIVILEGES;";
			$dbh->exec($query);
		} catch (PDOException $e) {
			echo "Ошибка выполнения запроса: " . $e->getMessage();
		}

		try {
			$query = "USE `$dbname`;
                    CREATE TABLE organizations (
                    organization_id INT(11) NOT NULL AUTO_INCREMENT,
                    name TINYTEXT NOT NULL,
                    address TINYTEXT NOT NULL,
                    mail TINYTEXT NOT NULL,
                    phone TINYTEXT NOT NULL,
                    PRIMARY KEY (organization_id));";
			$dbh->exec($query);
		} catch (PDOException $e) {
			echo "Ошибка выполнения запроса: " . $e->getMessage();
		}
	}
}

class Route
{
	static function start()
	{
		//need_make: в боевом режиме включить обработку исключений
		// set_exception_handler(function (Throwable $exception) {
		// 	// Функция будет вызвана, если исключение не будет
		// 	// поймано и завершит программу.
		// 	//
		// 	// Она может записать исключение в журнал и вывести
		// 	// страницу ошибки.
		// 	error_log($exception->__toString());

		// 	header("HTTP/1.0 503 Temporary unavailable");
		// 	header("Content-type: text/plain; charset=utf-8");
		// 	echo "Извините, на сайте произошла ошибка.\n";
		// 	echo "Попробуйте перезагрузить страницу.\n";
		// });

		//Проверка наличия Get запроса

		// if (isset($_GET) and !empty($_GET)) {
		// 	print_r($_GET);
		// 	die;
		// }

		if ($_SERVER["CONTENT_TYPE"] == 'application/xml') {
		    header("HTTP/1.0 200 OK");
			$controller_name = 'Xml';
		}

		if(!$controller_name) $controller_name = 'Main';
		$action_name = 'index';

		$routes = explode('?', $_SERVER['REQUEST_URI']); // убераем все переменные в запросе
		$routes = explode('/', $routes[0]);

		// получаем имя контроллера
		if (!empty($routes[1])) {
			$controller_name = ($routes[1] == 'pay') ? 'pay' : $routes[1];
		}

		// получаем имя экшена
		if (!empty($routes[2])) {
			$action_name = $routes[1] == 'pay'?'waiter':$routes[2];
			$_POST['id-waiters'] = $routes[2];
		}



		// добавляем префиксы
		$model_name = 'Model_' . $controller_name;
		$controller_name = 'Controller_' . $controller_name;
		$action_name = 'action_' . $action_name;

		// подцепляем файл с классом модели (файла модели может и не быть)

		$model_file = strtolower($model_name) . '.php';
		$model_path = "models/" . $model_file;


		if (file_exists($model_path)) {
			include $model_path;
		}

		// подцепляем файл с классом контроллера
		$controller_file = strtolower($controller_name) . '.php';
		$controller_path = "controllers/" . $controller_file;
		if (file_exists($controller_path)) {
			include $controller_path;
		} else {
			/*
			правильно было бы кинуть здесь исключение,
			но для упрощения сразу сделаем редирект на страницу 404
			*/
			Route::ErrorPage404();
			// echo($controller_file);
			// exit;
		}

		// создаем контроллер
		$controller = new $controller_name();
		$action = $action_name;

		if (method_exists($controller, $action)) {
			// вызываем действие контроллера
			$controller->$action($routes);
		} else {
			// здесь также разумнее было бы кинуть исключение need_make
			Route::ErrorPage404();
		}
	}

	static function ErrorPage404()
	{
		// echo($_SERVER['HTTP_HOST']);

		$host = 'https://' . $_SERVER['HTTP_HOST'] . '/';
		// $host = $_SERVER['HTTP_HOST'].'/';
		header('HTTP/1.1 404 Not Found');
		// 		header("Status: 404 Not Found");
		header('Location: /404');
	}
}

class Model
{
	public function get_data()
	{
	}
}

class View
{
	//public $template_view; // здесь можно указать общий вид по умолчанию.

	function generate($content_view, $template_view, $data = null)
	{
		/*
		if(is_array($data)) {
			// преобразуем элементы массива в переменные
			extract($data);
		}
		*/

		include 'template/' . $template_view;
	}
}

class Controller
{

	public $model;
	public $view;

	function __construct()
	{
		$this->view = new View();
	}

	function action_index()
	{
	}
}

class Payapi
{
	private static $test_mode = true;
	private $params;

	public function __construct()
	{
		if (self::$test_mode === true) {
			$this->params = [
				'password' => 'test',
				'sector' => '2391',
				'host' => 'https://test.best2pay.net/'
			];
		} else {
			$this->params = [
				'password' => 'nz849Gt0',
				'sector' => '7083',
				'host' => 'https://pay.best2pay.net/'
			];
		}
	}

	public function get_pass(){
		return $this->params['password'];
	}

	public static function set_test_mode(bool $mode)
	{
		self::$test_mode = $mode;
	}

	public function get_signature(string $str)
	{
		return base64_encode(md5($str));
	}


	public function user_register($user)
	{
		$signature = $this->get_signature($this->params['sector'] . $user['first_name'] . $user['last_name'] . $user['mail'] . $this->params['password']);
		//со своим client_ref
		// $signature=$this->get_signature($this->params['sector'].$user['user_id'].'mutator'.$user['first_name'].$user['last_name'].$user['mail'].$this->params['password']);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			// 'client_ref' => $user['user_id'].'mutator',
			'first_name' => $user['first_name'],
			'last_name' => $user['last_name'],
			'email' => $user['mail'],
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/Register', false, $context); //отправляем запрос

		return $result;
	}
	public function info($user)
	{
		$signature = $this->get_signature($this->params['sector'] . $user['client_ref'] . $this->params['password']);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/Info', false, $context); //отправляем запрос

		return $result;
	}
	public function get_balance($user)
	{
		$signature = $this->get_signature($this->params['sector'] . $user['client_ref'] . $this->params['password']);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/GetBalance', false, $context); //отправляем запрос

		return $result;
	}
	public function statement($user, $start, $end)
	{
		$signature = $this->get_signature($this->params['sector'] . $user['client_ref'] . $start . $end . $this->params['password']);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'start' => $start,
			'end' => $end,
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/Statement', false, $context); //отправляем запрос

		return $result;
	}
	public function set_phone($user)
	{
		$signature = $this->get_signature($this->params['sector'] . $user['client_ref'] . $this->params['password']);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/SetPhone', false, $context); //отправляем запрос

		return $result;
	}
	public function check_phone_service($user, $status = 'new')
	{
		$phone = $user['phone'];
		$phone = preg_replace('~\D+~', '', $phone);
		$s = $this->params['sector'] . $user['client_ref'] . $this->params['password'];
		// $signature=$this->get_signature($this->params['sector'].$user['client_ref'].$user['phone'].$user['phone'].$this->params['sector'].$this->params['password']);
		$signature = $this->get_signature($s);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'phone' => $phone,
			'passphrase' => 'qwertyuio',
			'status' => $status,
			'signature' => $signature
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста

		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/CheckPhoneService', false, $context); //отправляем запрос

		return $result;
	}
	public function set_phone_service($user, $sms, $status = 'new')
	{
		$phone = $user['phone'];
		$phone = preg_replace('~\D+~', '', $phone);
		$s = $this->params['sector'] . $user['client_ref'] . $this->params['password'];
		// $signature=$this->get_signature($this->params['sector'].$user['client_ref'].$user['phone'].$user['phone'].$this->params['sector'].$this->params['password']);
		$signature = $this->get_signature($s);

		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'phone' => $phone,
			'passphrase' => 'qwertyuio',
			'status' => $status,
			'signature' => $signature,
			'smscode' => $sms
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);
		// создаем параметры контекста
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/b2puser/SetPhoneService', false, $context); //отправляем запрос

		return $result;
	}
	public function pay_in($user, $amount)
	{
		$amount = (int)$amount * 100;
		$s = $this->params['sector'] . $user['client_ref'] . $amount . '643' . $this->params['password'];
		$signature = $this->get_signature($s);


		// массив для переменных, которые будут переданы с запросом
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'to_client_ref' => $user['client_ref'],
			'amount' => $amount,
			// 'fee_value' => $amount/100*5,
			'currency' => '643',
			'description' => 'Оплата чаевых',
			'signature' => $signature,
			// 'url' => $_SERVER['SERVER_NAME']
		);
		// преобразуем массив в URL-кодированную строку
		$vars = http_build_query($paramsArray);

		// // создаем параметры контекста
		// $options = array(
		//     'http' => array(
		//                 'method'  => 'POST',  // метод передачи данных
		//                 'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
		//                 'content' => $vars,  // переменные
		//             )
		// );
		// $context  = stream_context_create($options);  // создаём контекст потока
		// $result = file_get_contents($this->params['host'].'webapi/b2puser/PayIn', false, $context); //отправляем запрос

		return $this->params['host'] . 'webapi/b2puser/PayIn?' . $vars;
		// return $result;

	}
	public function pay_out($user, $amount)
	{
		$amount = (int)$amount * 100;
		$s = $this->params['sector'] . $user['client_ref'] . $amount . '643' . $this->params['password'];
		$signature = $this->get_signature($s);

		$paramsArray = array(
			'sector' => $this->params['sector'],
			'from_client_ref' => $user['client_ref'],
			'amount' => $amount,
			'currency' => '643',
			'description' => 'Вывод средств на карту',
			'signature' => $signature,
		);
		$vars = http_build_query($paramsArray);
		return $this->params['host'] . 'webapi/b2puser/PayOut?' . $vars;
	}
	public function card_enroll($user)
	{
		$s = $this->params['sector'] . $user['client_ref'] . $this->params['password'];
		$signature = $this->get_signature($s);
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'signature' => $signature,
			'client_ref' => $user['client_ref'],
			'mode' => 1,
			'url' => 'https://www.chaivyruchai.ru',
		);
		$vars = http_build_query($paramsArray);
		return $this->params['host'] . 'webapi/b2puser/CardEnroll?' . $vars;
	}

	public function webapi_registr($amount, $numt = '1')
	{
		$amount = (int)$amount / 100 * 5;
		$s = $this->params['sector'] . $amount . '643' . $this->params['password'];
		$signature = $this->get_signature($s);
		$paramsArray = array(
			'sector' => $this->params['sector'],
			'amount' => $amount,
			'currency' => '643',
			'reference' => $numt,
			'description' => 'Списание чаевых',
			'signature' => $signature,
		);
		$vars = http_build_query($paramsArray);
		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . '/webapi/Register', false, $context); //отправляем запрос
		return $result;
	}

	public function user_purchase($ref, $id)
	{
		$s = $this->params['sector'] . $id . $ref . $this->params['password'];
		$signature = $this->get_signature($s);

		$paramsArray = array(
			'sector' => $this->params['sector'],
			'id' => $id,
			'client_ref' => $ref,
			'signature' => $signature,
		);
		// $vars = http_build_query($paramsArray);
		// $vars = urldecode($vars);

		$paramsJoined = array();

		foreach($paramsArray as $param => $value) {
		$paramsJoined[] = "$param=$value";
		}

		$vars = implode('&', $paramsJoined);

		$options = array(
			'http' => array(
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок
				'content' => $vars,  // переменные
			)
		);
		$context  = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents($this->params['host'] . 'webapi/PurchaseByUser', false, $context); //отправляем запрос
		return $result;
	}

}

class Db
{
	public static function getConnection()
	{
		// Получаем параметры подключения из файла
		global $dbname, $pass, $user, $host;

		// Устанавливаем соединение
		$dsn = "mysql:host={$host};dbname={$dbname}";
		$db = new PDO($dsn, $user, $pass);
		// Задаем кодировку
		$db->exec("set names utf8");
		return $db;
	}
}
