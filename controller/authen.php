<?php
include "config.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'login'){
  if((!isset($_POST['username'])) || (!isset($_POST['password']))){
    mysqli_close($conn);
    die();
  }

  $username = mysqli_real_escape_string($conn, $_POST['username']);
  $password = mysqli_real_escape_string($conn, $_POST['password']);

  $strSQL = "SELECT a.UID uid, LOWER(c.utype_name) role, a.password password
             FROM s6x_useraccount a INNER JOIN s6x_userinfo b ON a.UID = b.info_uid
             INNER JOIN s6x_usertype c ON a.usertype_id = c.utype_id
             WHERE a.username = '$username' AND a.allow_status = 'Y' AND a.delete_status = 'N' LIMIT 1
            ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
    $data = mysqli_fetch_assoc($result);
    if (password_verify($password, $data['password'])) {
      $return[0]['status'] = 'Success';
      $return[0]['uid'] = $data['uid'];
      $return[0]['role'] = $data['role'];
    } else {
      $return[0]['status'] = 'Fail';
    }
  }else{
    $return[0]['status'] = 'Fail';
  }
  echo json_encode($return);
  mysqli_close($conn); die();
}


mysqli_close($conn); die();
?>
