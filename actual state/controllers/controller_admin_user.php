<?php
class Controller_Admin_User extends Controller
{
	function __construct()
	{
		// $this->model = new Model_Admin();
		$this->view = new View();
	}
	function action_index()
	{
		$this->view->generate('admin_user_view.php', 'template_admin_view.php');
	}
}
