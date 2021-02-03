<?php
class Controller_Pay extends Controller
{
	function __construct()
	{
		$this->model = new Model_Pay();
		$this->view = new View();
	}

	function action_index()
	{
		if (isset($_POST['id-waiters'])){
			$data=$this->model->get_data_user();
			if ($data['checked']==1) {
				$this->view->generate('pay_view.php', 'template_view.php', $data);
			} else {
				header('Location: /');
			}
		}
		if (isset($_POST['valueTips'])){
			// $data=$this->model->get_data_user();

			$data = $this->model->get_chai();
			$this->view->generate('', 'template_pay.php', $data);
			// header('Location: /');
		}
		if (!$_POST) header('Location: /');
	}

}
