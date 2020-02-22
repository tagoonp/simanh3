<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'check_1'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $strSQL = "SELECT ind_id, status FROM s6x_inddata WHERE hn = '$hn' AND hos_id = '$hos_id' AND status IN ('0', '1')";$result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
    while ($row = mysqli_fetch_array($result)) {
      $buf = array();
      foreach ($row as $key => $value) {
          if(!is_int($key)){
            $buf[$key] = $value;
          }
      }
      $return[] = $buf;
      echo json_encode($return);
    }
  }

  mysqli_close($conn); die();
}

if($stage == 'add_new_patient'){
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);

  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);

  $date_adm = mysqli_real_escape_string($conn, $_POST['date_adm']);
  $time_adm = mysqli_real_escape_string($conn, $_POST['time_adm']);
  $refer = mysqli_real_escape_string($conn, $_POST['refer']);
  $refer_status = mysqli_real_escape_string($conn, $_POST['refer_status']);
  $refer_facility = mysqli_real_escape_string($conn, $_POST['refer_facility']);
  $cid = mysqli_real_escape_string($conn, $_POST['cid']);
  $province = mysqli_real_escape_string($conn, $_POST['province']);
  $district = mysqli_real_escape_string($conn, $_POST['district']);
  $date_dob = mysqli_real_escape_string($conn, $_POST['date_dob']);
  $age = mysqli_real_escape_string($conn, $_POST['age']);
  $rel = mysqli_real_escape_string($conn, $_POST['rel']);
  $edu = mysqli_real_escape_string($conn, $_POST['edu']);
  $dm = mysqli_real_escape_string($conn, $_POST['dm']);
  $ht = mysqli_real_escape_string($conn, $_POST['ht']);
  $hd = mysqli_real_escape_string($conn, $_POST['hd']);
  $gravid = mysqli_real_escape_string($conn, $_POST['gravid']);
  $parity = mysqli_real_escape_string($conn, $_POST['parity']);
  $abortion = mysqli_real_escape_string($conn, $_POST['abortion']);
  $anc = mysqli_real_escape_string($conn, $_POST['anc']);
  $ga1anc = mysqli_real_escape_string($conn, $_POST['ga1anc']);
  $num_anc = mysqli_real_escape_string($conn, $_POST['num_anc']);
  $tls = mysqli_real_escape_string($conn, $_POST['tls']);
  $hiv = mysqli_real_escape_string($conn, $_POST['hiv']);
  $syp = mysqli_real_escape_string($conn, $_POST['syp']);
  $hep = mysqli_real_escape_string($conn, $_POST['hep']);
  $anc_sys = mysqli_real_escape_string($conn, $_POST['anc_sys']);
  $anc_dia = mysqli_real_escape_string($conn, $_POST['anc_dia']);
  $urine = mysqli_real_escape_string($conn, $_POST['urine']);
  $adm_sys = mysqli_real_escape_string($conn, $_POST['adm_sys']);
  $adm_dia = mysqli_real_escape_string($conn, $_POST['adm_dia']);
  $pr = mysqli_real_escape_string($conn, $_POST['pr']);
  $bt = mysqli_real_escape_string($conn, $_POST['bt']);
  $fhr = mysqli_real_escape_string($conn, $_POST['fhr']);
  $lbstage = mysqli_real_escape_string($conn, $_POST['lbstage']);
  $date_labor_start = mysqli_real_escape_string($conn, $_POST['date_labor_start']);
  $time_labor_start = mysqli_real_escape_string($conn, $_POST['time_labor_start']);
  $date_membranes_ruptured = mysqli_real_escape_string($conn, $_POST['date_membranes_ruptured']);
  $time_membranes_ruptured = mysqli_real_escape_string($conn, $_POST['time_membranes_ruptured']);

  $strSQL = "SELECT * FROM  s6x_patient WHERE hn = '$hn' AND status = '' AND hos_id = ''"


}
