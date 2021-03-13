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

		$file_get = $_SERVER["DOCUMENT_ROOT"] . "/modules/log/get.log";
		$file_post = $_SERVER["DOCUMENT_ROOT"] . "/modules/log/post.log";

		if (!empty($_GET)) {
			$fw = fopen($file_get, "a");
			fwrite($fw, "GET " . var_export($_GET, true));
			fclose($fw);
		}

		if (!empty($_POST)) {
			$fw = fopen($file_post, "a");
			fwrite($fw, "POST " . var_export($_POST, true));
			fclose($fw);
		}



		// $s=func_get_arg(0);
		if (func_get_arg(0)[1] == 'tip'){
			$data=$this->model->get_data_user(func_get_arg(0)[2]);
			if ($data['checked']==1) {
				$pay = new Payapi;
				$data['query'] = $pay->pay_in($data, "");
				$this->view->generate('pay_view.php', 'template_view.php', $data);
			} else {
				header('Location: /');
			}
		}
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
