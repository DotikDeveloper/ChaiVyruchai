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
			echo json_encode($data[1]);
			if($_POST['id_waiters']||$_POST['rating']||$_POST['valueTips']||$_POST['review-text']) $this->model->fix_review();
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
		if (isset($_POST['get_reviews'])){
			$data=$this->model->get_reviews();
			header('Content-Type: application/json');
			echo json_encode($data);
			die();
		}
		if (isset($_POST['get_statement'])){
			$data=$this->model->get_statement();
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
		if (isset($_POST['card_enroll'])){
			$data=$this->model->card_enroll();
			header('Content-Type: application/json');
			echo json_encode($data);
			die();

		}
		if (!$_POST) header('Location: /');
	}
	function action_waiter($r)
	{

		if (isset($_POST['id-waiters'])){
			$data=$this->model->get_data_user();
			if ($data['checked']==1) {
				$pay = new Payapi;
				$data['query'] = $pay->pay_in($data, "");
				$this->view->generate('pay_view_w.php', 'template_view_w.php', $data);
			} else {
				header('Location: /');
			}
		}
	}

}
