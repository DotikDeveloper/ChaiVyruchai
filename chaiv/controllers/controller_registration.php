<?php
class Controller_Registration extends Controller
{
	function __construct()
	{
		$this->model = new Model_Registration();
		$this->view = new View();
	}

	function action_index()
	{
		If(isset($_POST['user_add'])){
			$this->model->add_data();
		}
		If(isset($_POST['org_add'])){
			$this->model->send_request();
		}
		$data = $this->model->get_data();
		$this->view->generate('registration_view.php', 'template_view.php', $data);
	}
}
