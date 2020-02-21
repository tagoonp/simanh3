<?php
function get_hospcode($conn, $uid){
  $strSQL = "SELECT hoscode FROM s6x_useraccount WHERE UID = '$uid'";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    return $data['hoscode'];
  }
}
?>
