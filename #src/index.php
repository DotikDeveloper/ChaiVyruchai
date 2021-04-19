<?php
ini_set('display_errors', 1); //need_make: В боевом режиме нужно поменять на 0

// require_once (__DIR__ . "/models/connect_bd.php");
require_once ("./settings.php");
require_once ("core.php");
Payapi::set_test_mode(true);//Установка режима взаимодействия с платежным сервисом
session_start();
Route::start(); // запускаем маршрутизатор

// $chdb = new chdb;
// $chdb -> create_bd($dbname);
