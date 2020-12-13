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
		if(isset($_POST['login'])){
			$user = $this->model->get_user($_POST['phone'], $_POST['password']);
			// $this->view->generate('main_view.php', 'template_view.php', $user);
			header('Location: /');
		}
		if (isset($_SESSION['user_role']))
		{
			switch ($_SESSION['user_role']) {
				case 1:
					header('Location: /admin');
				break;
				case 2:
					header('Location: /admin_org');
				break;
				case 3:
					header('Location: /admin_personal');
				break;
			}
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
