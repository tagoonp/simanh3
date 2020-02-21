<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$options = [
    'cost' => 12,
];
echo password_hash("1939900101359", PASSWORD_BCRYPT, $options);
?>
