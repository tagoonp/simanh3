<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'get_complication_icd'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['complication'])) || (!isset($_POST['icd_group']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $icd_group = mysqli_real_escape_string($conn, $_POST['icd_group']);
  $complication = mysqli_real_escape_string($conn, $_POST['complication']);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status IN ('1', '2') AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_complication_causes WHERE cmp_group = '$complication' AND cmp_major_group = '$icd_group' AND cmp_ind_id = '$pat_ind_id'";
    $result = mysqli_query($conn, $strSQL);
    if(($result) && (mysqli_num_rows($result) > 0)){
      while ($row = mysqli_fetch_array($result)) {
        $buf = array();
        foreach ($row as $key => $value) {
            if(!is_int($key)){
              $buf[$key] = $value;
            }
        }
        $return[] = $buf;
      }
    }
  }

  echo json_encode($return);
  mysqli_close($conn);
  die();
}

if($stage == 'set_complication_icd'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['icd_code'])) || (!isset($_POST['icd_group'])) || (!isset($_POST['status']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $icd_code = mysqli_real_escape_string($conn, $_POST['icd_code']);
  $icd_group = mysqli_real_escape_string($conn, $_POST['icd_group']);
  $status = mysqli_real_escape_string($conn, $_POST['status']);
  $complication = mysqli_real_escape_string($conn, $_POST['complication']);
  $name = mysqli_real_escape_string($conn, $_POST['name']);
  $id = mysqli_real_escape_string($conn, $_POST['id']);

  //Get ind_id (Petient record id)
  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '1' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    if($status == 'push'){
      $strSQL = "SELECT * FROM s6x_complication_causes WHERE cmp_icd = '$icd_code' AND cmp_group = '$complication' AND cmp_ind_id = '$pat_ind_id'";
      $result = mysqli_query($conn, $strSQL);
      if(($result) && (mysqli_num_rows($result) > 0)){
        echo "Y";
      }else{
        $strSQL = "INSERT INTO s6x_complication_causes (cmp_id, cmp_icd, comp_name, cmp_group, cmp_major_group, cmp_ind_id)
                   VALUES ('$id', '$icd_code', '$name', '$complication', '$icd_group', '$pat_ind_id')
                  ";
        $resultInsert = mysqli_query($conn, $strSQL);
        if($resultInsert){
          echo "Y";
        }
      }
    }else if($status == 'pop'){
      $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_icd = '$icd_code' AND cmp_group = '$complication' AND cmp_ind_id = '$pat_ind_id'";
      $resultDelete = mysqli_query($conn, $strSQL);
      if($resultDelete){
        echo "Y";
      }
    }
  }else{
    echo "N1";
  }


  mysqli_close($conn);
  die();
}

if($stage == 'get_maternal_cause_all'){
  if(!isset($_POST['group_id'])){
    mysqli_close($conn);
    die();
  }
  $group_id = mysqli_real_escape_string($conn, $_POST['group_id']);
  $strSQL = "SELECT * FROM s6x_icd10o WHERE ICDGroup = '$group_id' ORDER BY ID";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
    while ($row = mysqli_fetch_array($result)) {
      $buf = array();
      foreach ($row as $key => $value) {
          if(!is_int($key)){
            $buf[$key] = $value;
          }
      }
      $return[] = $buf;
    }
  }
  echo json_encode($return);
  mysqli_close($conn); die();
}
