<?php
class Controller_Admin_Org extends Controller
{
	function __construct()
	{
		// $this->model = new Model_Admin();
		$this->view = new View();
	}
	function action_index()
	{
		$this->view->generate('admin_org_view.php', 'template_admin_view.php');
	}
}
