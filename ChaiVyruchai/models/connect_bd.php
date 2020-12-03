<?php
require_once ("./settings.php");
try {
    // $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $dbh = new PDO("mysql:host=$host", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  }
  catch(PDOException $e) {
      echo $e->getMessage();
  }
