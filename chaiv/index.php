<?php
ini_set('display_errors', 1);

// require_once (__DIR__ . "/models/connect_bd.php");
require_once ("./settings.php");
require_once ("core.php");
session_start();
Route::start(); // запускаем маршрутизатор

// $chdb = new chdb;
// $chdb -> create_bd($dbname);
