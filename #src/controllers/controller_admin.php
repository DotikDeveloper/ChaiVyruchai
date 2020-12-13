<?php
class Controller_Admin extends Controller
{
	function __construct()
	{
		$this->model = new Model_Admin();
		$this->view = new View();
	}
	function action_index()
	{
		If(isset($_POST['create_base'])){
			$this->model->create_base();
		}
		$this->view->generate('admin_view.php', 'template_admin_view.php');
	}
}
