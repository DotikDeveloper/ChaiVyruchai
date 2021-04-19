<?php
class Controller_Xml extends Controller
{
	function __construct()
	{
		$this->model = new Model_Xml();
		// $this->view = new View();
	}

	function action_index()
	{
		echo $this->model->xml_exec($xml_str = '');
		exit;
	}
}
