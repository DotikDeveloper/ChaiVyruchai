<?php
class Controller_Main extends Controller
{
	function __construct()
	{
		$this->model = new Model_Main();
		$this->view = new View();
	}

	function action_index()
	{
		$user = null;
		// $_SESSION['user_role'] = 0;
		if(isset($_POST['load_messages'])){
			header('Content-Type: application/json');
			echo json_encode($this->model->get_messages());
			exit;
		}

		If(isset($_POST['message_ok'])){
			$this->model->message_ok();

			header('Content-Type: application/json');
			echo json_encode(array('answer' => 'ok'));
			exit;
		}

		if(isset($_POST['get_data_user'])){
			echo json_encode($this->model->get_user_current()); //отправляем json ответ с данными текущего юзера
			exit;
		}

		if(isset($_POST['get_data_org'])){
			echo json_encode($this->model->get_org_current()); //отправляем json ответ с данными текущего юзера
			exit;
		}

		if(isset($_POST['firstNameAdm'])){
			$this->model->update_data();
			header('Content-Type: application/json');
			echo json_encode(array('answer' => 'ok'));
			exit;
		}

		if(isset($_POST['req_message'])){
			$this->model->write_message();
			header('Content-Type: application/json');
			echo json_encode(array('answer' => 'ok'));
			exit;
		}

		if(isset($_POST['login'])){
			$user = $this->model->get_user($_POST['phone'], $_POST['password']);
			// $this->view->generate('main_view.php', 'template_view.php', $user);
			// switch ($_SESSION['user_role']) {
			// 	case 1:
			// 		header('Location: /admin');
			// 	break;
			// 	case 2:
			// 		header('Location: /admin_org');
			// 	break;
			// 	case 3:
			// 		header('Location: /admin_user');
			// 	break;
			// }
			header('Location: /');
		}
		if (isset($_SESSION['user_role'])){
			switch ($_SESSION['user_role']) {
				case 1:
					header('Location: /admin');
				break;
				case 2:
					header('Location: /admin_org');
				break;
				case 3:
					header('Location: /admin_user');
				break;
			}
		}

		if (!empty($_FILES['file_attach']['tmp_name'])) {
			// $path = __DIR__ . "/media/" . $_FILES['file_attach']['name'];
			if( ! is_dir( $_SERVER['DOCUMENT_ROOT'] . "/media" ) ) mkdir(  $_SERVER['DOCUMENT_ROOT'] . "/media", 0777 );
			// $path = "./" . $_FILES['file_attach']['name'];
			$ext = substr($_FILES['file_attach']['name'], strpos($_FILES['file_attach']['name'],'.'), strlen($_FILES['file_attach']['name'])-1); // В переменную $ext заносим расширение загруженного файла.
			$path =  "/media/user_avatar_" . $_SESSION['user_id'] . $ext;
			if (copy($_FILES['file_attach']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . $path)) $file_attach = $_SERVER['DOCUMENT_ROOT'] . $path;

			$this->model->update_ava($_SESSION['user_id'], $path);
		}

		if (!empty($_FILES['logo_attach']['tmp_name'])) {
			if( ! is_dir( $_SERVER['DOCUMENT_ROOT'] . "/media" ) ) mkdir(  $_SERVER['DOCUMENT_ROOT'] . "/media", 0777 );
			$ext = substr($_FILES['logo_attach']['name'], strpos($_FILES['logo_attach']['name'],'.'), strlen($_FILES['logo_attach']['name'])-1); // В переменную $ext заносим расширение загруженного файла.
			$path =  "/media/org_logo_" . $_SESSION['organization_id'] . $ext;
			if (copy($_FILES['logo_attach']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . $path)) $logo_attach = $_SERVER['DOCUMENT_ROOT'] . $path;

			$this->model->update_logo($_SESSION['organization_id'], $path);
		}

		if(isset($_POST['get_data'])){
			// $user = $this->model->get_user($_POST['phone'], $_POST['password']);
			// mkdir('./rest');
			// echo 'test string';
			header('Content-Type: application/json');
			echo json_encode(array('success' => 1));
			exit;

			// switch ($_POST['get_data']) {
			// 	case 'ava':
			// 		// $array = $this->model->get_ava();
			// 		// echo ($this->model->get_ava());
			// 		// echo json_encode(array('success' => 1));
			// 		echo 'тестовоя строка';
			// 		exit;
			// 	break;
			// 	case 2:
			// 		header('Location: /admin_org');
			// 	break;
			// 	case 3:
			// 		header('Location: /admin_user');
			// 	break;
			// }
		}

		$this->view->generate('main_view.php', 'template_view.php', $user);
	}

	function action_logout()
		{
			session_unset();
			session_destroy();
			header('Location: /');
		}
}
