<?php
class Controller_Organizations extends Controller
{
	function __construct()
	{
		$this->model = new Model_Organizations();
		$this->view = new View();
	}

	function action_index()
	{
		If(isset($_POST['org_add'])){
			$this->model->add_data();
		}
		If(isset($_POST['del_id'])){
			$this->model->del_data();
		}
		If(isset($_POST['org_edit'])){
			$this->model->update_data();
		}
		$data = $this->model->get_data();
		$this->view->generate('organizations_view.php', 'template_view.php', $data);
	}
	function action_edit()
	{
		$data = $this->model->get_data($_POST['organization_id']);
		$this->view->generate('organizations_edit_view.php', 'template_view.php', $data);
	}
}
