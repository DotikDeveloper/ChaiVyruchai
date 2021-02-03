<?php //test
    class chdb {
        public function create_bd($dbname){
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

    class Route {
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

		// контроллер и действие по умолчанию
		$controller_name = 'Main';
		$action_name = 'index';

		$routes = explode('?', $_SERVER['REQUEST_URI']); // убераем все переменные в запросе
		$routes = explode('/', $routes[0]);

		// получаем имя контроллера
		if ( !empty($routes[1]) )
		{
			$controller_name = $routes[1];
		}

		// получаем имя экшена
		if ( !empty($routes[2]) )
		{
			$action_name = $routes[2];
		}


		// добавляем префиксы
		$model_name = 'Model_'.$controller_name;
		$controller_name = 'Controller_'.$controller_name;
		$action_name = 'action_'.$action_name;

		// подцепляем файл с классом модели (файла модели может и не быть)

		$model_file = strtolower($model_name).'.php';
		$model_path = "models/".$model_file;


		if(file_exists($model_path))
		{
            include $model_path;

		}

		// подцепляем файл с классом контроллера
		$controller_file = strtolower($controller_name).'.php';
		$controller_path = "controllers/".$controller_file;
		if(file_exists($controller_path))
		{
			include $controller_path;
		}
		else
		{
			/*
			правильно было бы кинуть здесь исключение,
			но для упрощения сразу сделаем редирект на страницу 404
			*/
			Route::ErrorPage404();
            // echo($controller_file);
            // exit;
		}

		// создаем контроллер
		$controller = new $controller_name;
		$action = $action_name;

		if(method_exists($controller, $action))
		{
			// вызываем действие контроллера
			$controller->$action();
		}
		else
		{
			// здесь также разумнее было бы кинуть исключение need_make
			Route::ErrorPage404();
		}

	}

	static function ErrorPage404()
	{
	   // echo($_SERVER['HTTP_HOST']);

        $host = 'https://'.$_SERVER['HTTP_HOST'].'/';
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

		include 'template/'.$template_view;
	}
}

class Controller {

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
	private $sector = 2391;
	private static $test_mode = true;
	private $params;

	public function __construct()
	{
		if (self::$test_mode){
			$this->params = [
				'password' => '',
				'sector' => '2391',
				'host' => 'https://pay.best2pay.net/'
			];
		} else {
			$this->params = [
				'password' => 'test',
				'sector' => '2391',
				'host' => 'https://test.best2pay.net/'
			];
		}
	}

	public static function set_test_mode(bool $mode)
	{
		self::$test_mode = $mode;
	}

	private function get_signature(string $str)
	{
		return base64_encode(md5($str));
	}


	public function user_register($user)
	{
		$signature=$this->get_signature($this->params['sector'].$user['first_name'].$user['last_name'].$user['mail'].$this->params['password']);
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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/Register', false, $context); //отправляем запрос

        return $result;

	}
	public function info($user)
	{
		$signature=$this->get_signature($this->params['sector'].$user['client_ref'].$this->params['password']);

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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/Info', false, $context); //отправляем запрос

        return $result;
	}
	public function set_phone($user)
	{
		$signature=$this->get_signature($this->params['sector'].$user['client_ref'].$this->params['password']);

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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/SetPhone', false, $context); //отправляем запрос

        return $result;
	}
	public function check_phone_service($user, $status='new')
	{
		$phone = $user['phone'];
		$phone = preg_replace('~\D+~','', $phone);
		$s=$this->params['sector'].$user['client_ref'].$this->params['password'];
		// $signature=$this->get_signature($this->params['sector'].$user['client_ref'].$user['phone'].$user['phone'].$this->params['sector'].$this->params['password']);
		$signature=$this->get_signature($s);

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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/CheckPhoneService', false, $context); //отправляем запрос

        return $result;

	}
	public function set_phone_service($user, $sms, $status='new')
	{
		$phone = $user['phone'];
		$phone = preg_replace('~\D+~','', $phone);
		$s=$this->params['sector'].$user['client_ref'].$this->params['password'];
		// $signature=$this->get_signature($this->params['sector'].$user['client_ref'].$user['phone'].$user['phone'].$this->params['sector'].$this->params['password']);
		$signature=$this->get_signature($s);

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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/SetPhoneService', false, $context); //отправляем запрос

        return $result;

	}
	public function pay_in($user, $amount)
	{
		$s=$this->params['sector'].$user['client_ref'].$amount.'643'.$this->params['password'];
		$signature=$this->get_signature($s);

        // массив для переменных, которые будут переданы с запросом
        $paramsArray = array(
			'sector' => $this->params['sector'],
			'to_client_ref' => $user['client_ref'],
			'amount' => $amount,
			'currency' => '643',
			'description' => 'Оплата чаевых',
			'signature' => $signature,
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
        $result = file_get_contents($this->params['host'].'webapi/b2puser/PayIn', false, $context); //отправляем запрос

        return $result;

	}
	public function pay_in2($user, $amount)
	{
		$s=$this->params['sector'].$user['client_ref'].$amount.'643'.$this->params['password'];
		$signature=$this->get_signature($s);

        // массив для переменных, которые будут переданы с запросом
        $paramsArray = array(
			'sector' => $this->params['sector'],
			'client_ref' => $user['client_ref'],
			'amount' => $amount,
			'currency' => '643',
			'description' => 'Оплата чаевых',
			'signature' => $signature,
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

		if( $curl = curl_init() ) {
			curl_setopt($curl, CURLOPT_URL, $this->params['host'].'webapi/b2puser/PayIn');
			curl_setopt($curl, CURLOPT_RETURNTRANSFER,false);
			curl_setopt($curl, CURLOPT_POST, true);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $vars);
			curl_exec($curl);
			// echo $out;
			curl_close($curl);
			exit;
		  }

        return $out;

	}

    // public static function createAdmin(string $name)
    // {
    //     return new self('admin', $name);
    // }
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
