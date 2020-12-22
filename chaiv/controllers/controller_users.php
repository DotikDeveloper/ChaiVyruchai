<?php
class Controller_Users extends Controller
{
	function __construct()
	{
		$this->model = new Model_Users();
		$this->view = new View();
	}

	function action_index()
	{
		If(isset($_POST['user_add'])){
			$this->model->add_data();
		}
		If(isset($_POST['del_id'])){
			$this->model->del_data();
		}
		If(isset($_POST['user_edit'])){
			$this->model->update_data();
		}
		$data = $this->model->get_data();
		$this->view->generate('users_view.php', 'template_view.php', $data);
	}
	function action_edit()
	{
		$data = $this->model->get_data($_POST['user_id']);
		$this->view->generate('users_edit_view.php', 'template_view.php', $data);
	}
}
