<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set("Asia/Bangkok");

$host = 'localhost';
$dbname = 'simanh3';

$user = 'root';
$password = 'mandymorenn';

$host = '157.230.46.106';
$user = 'rmis5';
$password = 'rmis5';
// $user = 'root';
// $password = 'mySsimanh#3';


$conn = mysqli_connect($host, $user, $password, $dbname);


if (!$conn) {

  echo "Can not connect datase";
  die();
}

$conn->set_charset("utf8");

$sysdate = date('Y-m-d');
$sysdatetime = date('Y-m-d H:i:s');
$sysdateu = date('U');
$ip = $_SERVER['REMOTE_ADDR'];
?>
