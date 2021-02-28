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
		if (isset($_POST['valueTips'])){
			$data = $this->model->get_chai();
			header('Content-Type: application/json');
			echo json_encode($data);
			die();
		}
		if (isset($_POST['id-waiters'])){
			$data=$this->model->get_data_user();
			if ($data['checked']==1) {
				$pay = new Payapi;
				$data['query'] = $pay->pay_in($data, "");
				$this->view->generate('pay_view.php', 'template_view.php', $data);
			} else {
				header('Location: /');
			}
		}
		if (isset($_POST['get_balance'])){
			$data=$this->model->get_balance();
			header('Content-Type: application/json');
			echo json_encode($data);
			die();

		}
		if (isset($_POST['idUser'])){
			$data=$this->model->get_out_link();
			header('Content-Type: application/json');
			echo json_encode($data);
			die();

		}
		if (!$_POST) header('Location: /');
	}

}
