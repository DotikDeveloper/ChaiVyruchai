<?php
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
		
// 		echo($model_path);
//         exit;
        
		if(file_exists($model_path))
		{
// 			include "models/".$model_file;
            include $model_path;
			
		}
// 		else
// 		{
// 		    echo($model_path);
// 		    exit;
// 		}

		// подцепляем файл с классом контроллера
		$controller_file = strtolower($controller_name).'.php';
		$controller_path = "controllers/".$controller_file;
		if(file_exists($controller_path))
		{
			include $controller_path;
            // echo($controller_file);
            // exit;
            // Route::ErrorPage404();
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
			// здесь также разумнее было бы кинуть исключение
			Route::ErrorPage404();
		}

	}

	function ErrorPage404()
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
