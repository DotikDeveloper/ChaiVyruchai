<?php
class Controller_Api extends Controller
{
	function __construct()
	{
		$this->model = new Model_Api();
		$this->view = new View();
	}

	function action_index()
	{


		// $this->view->generate('main_view.php', 'template_view.php', $user);
	}

	function action_user_register()
	{
		if($_SESSION['user_role']!=1) header('Location: /');
		$answer=$this->model->registr();
		echo($answer);
		echo('<br>');
		$xml = new SimpleXMLElement($answer);

		var_dump($xml);
		exit;

	}
}
