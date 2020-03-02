<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'get_admission'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $buf = array();

  $buf['adm_1'] = '0';
  // Get yesterday non-act
  $a_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE hos_id = '$hos_id' AND status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $a_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $a_non_act = '0';
      }
  }
  $buf['adm_1'] = $a_non_act;
  // Get yesterday non-act
  $yesterday = date("Y-m-d", strtotime( '-1 days' ));
  $y_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE hos_id = '$hos_id' AND dateadm = '$yesterday' AND status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $y_non_act = '0';
      }
  }
  $y_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE hos_id = '$hos_id' AND dateadm = '$yesterday' AND status in ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_act = $data['cn'];
      }else{
        $y_act = '0';
      }
  }
  $buf['adm_2'] = $y_non_act . ' / ' . $y_act;

  // Get today non-act
  $t_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE hos_id = '$hos_id' AND dateadm = '$sysdate' AND status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $t_non_act = '0';
      }
  }
  $t_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE hos_id = '$hos_id' AND dateadm = '$sysdate' AND status in ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_act = $data['cn'];
      }else{
        $t_act = '0';
      }
  }
  $buf['adm_3'] = $t_non_act . ' / ' . $t_act;

  // Get this month confirmed
  $m_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient
             WHERE hos_id = '$hos_id'
             AND YEAR(dateadm) = YEAR(CURRENT_DATE())
             AND MONTH(dateadm) = MONTH(CURRENT_DATE())
             AND status in ('2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $m_act = $data['cn'];
      }else{
        $m_act = '0';
      }
  }
  $buf['adm_4'] = $m_act;

  $return[] = $buf;
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'get_delivery'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $buf = array();

  $buf['adm_1'] = '0';
  // Get yesterday non-act
  $a_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id' AND a.status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $a_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $a_non_act = '0';
      }
  }
  $buf['del_1'] = $a_non_act;
  // Get yesterday non-act
  $yesterday = date("Y-m-d", strtotime( '-1 days' ));
  $y_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$yesterday' AND a.status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $y_non_act = '0';
      }
  }
  $y_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$yesterday' AND a.status in ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_act = $data['cn'];
      }else{
        $y_act = '0';
      }
  }
  $buf['del_2'] = $y_non_act . ' / ' . $y_act;

  // Get today non-act
  $t_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient  a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$sysdate' AND a.status = '1'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }else{
        $t_non_act = '0';
      }
  }
  $t_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$sysdate' AND a.status in ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_act = $data['cn'];
      }else{
        $t_act = '0';
      }
  }
  $buf['del_3'] = $t_non_act . ' / ' . $t_act;

  // Get this month confirmed
  $m_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hos_id'
             AND YEAR(a.dateadm) = YEAR(CURRENT_DATE())
             AND MONTH(a.dateadm) = MONTH(CURRENT_DATE())
             AND a.status in ('2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $m_act = $data['cn'];
      }else{
        $m_act = '0';
      }
  }
  $buf['del_4'] = $m_act;

  $return[] = $buf;
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'get_birth'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $buf = array();

  $buf['birth_1'] = '-';

  // Get yesterday non-act
  $yesterday = date("Y-m-d", strtotime( '-1 days' ));
  $y_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$yesterday' AND a.status in ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_birth = $data['cn'];
      }else{
        $y_birth = '0';
      }
  }
  $buf['birth_2'] = '- / ' . $y_birth;

  // Get today non-act
  $t_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient  a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE a.hos_id = '$hos_id' AND a.dateadm = '$sysdate' AND a.status IN ('1','2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_birth = $data['cn'];
      }
  }

  $buf['birth_3'] = '- / ' . $t_birth;

  // Get this month confirmed
  $m_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE a.hos_id = '$hos_id'
             AND YEAR(a.dateadm) = YEAR(CURRENT_DATE())
             AND MONTH(a.dateadm) = MONTH(CURRENT_DATE())
             AND a.status in ('1', '2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $m_birth = $data['cn'];
      }
  }
  $buf['birth_4'] = $m_birth;

  $return[] = $buf;
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'get_livebirth'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $buf = array();

  $buf['lbirth_1'] = '-';

  // Get yesterday non-act
  $yesterday = date("Y-m-d", strtotime( '-1 days' ));
  $y_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE
             a.hos_id = '$hos_id'
             AND a.dateadm = '$yesterday'
             AND a.status in ('1','2')
             AND c.nb_sov = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_birth = $data['cn'];
      }else{
        $y_birth = '0';
      }
  }
  $buf['lbirth_2'] = '- / ' . $y_birth;

  // Get today non-act
  $t_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient  a INNER JOIN s6x_delivery b  ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE
              a.hos_id = '$hos_id'
              AND a.dateadm = '$sysdate'
              AND a.status IN ('1','2')
              AND c.nb_sov = '1'
            ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_birth = $data['cn'];
      }
  }

  $buf['lbirth_3'] = '- / ' . $t_birth;

  // Get this month confirmed
  $m_birth = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE a.hos_id = '$hos_id'
             AND YEAR(a.dateadm) = YEAR(CURRENT_DATE())
             AND MONTH(a.dateadm) = MONTH(CURRENT_DATE())
             AND c.nb_sov = '1'
             AND a.status in ('1', '2')";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $m_birth = $data['cn'];
      }
  }
  $buf['lbirth_4'] = $m_birth;

  $return[] = $buf;
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'get_complication_dashboard'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['complication']))){   mysqli_close($conn); die(); }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $complication = mysqli_real_escape_string($conn, $_POST['complication']);
  $buf = array();

  // Get yesterday non-act
  $a_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE
             a.hos_id = '$hos_id'
             AND b.$complication = '1'
             AND a.status = '1'
            ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $a_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }
  }
  $buf['resp_1'] = $a_non_act;

  // Get yesterday non-act
  $yesterday = date("Y-m-d", strtotime( '-1 days' ));
  $y_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE
             a.hos_id = '$hos_id'
             AND a.dateadm = '$yesterday'
             AND a.status = '1'
             AND b.$complication = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }
  }
  $y_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE a.hos_id = '$hos_id'
             AND a.dateadm = '$yesterday'
             AND a.status in ('1','2')
             AND b.$complication = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $y_act = $data['cn'];
      }
  }
  $buf['resp_2'] = $y_non_act . ' / ' . $y_act;

  // Get today non-act
  $t_non_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE
             a.hos_id = '$hos_id'
             AND a.dateadm = '$sysdate'
             AND a.status = '1'
             AND b.$complication = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_non_act = '<span class="badge badge-danger" style="font-size: 1em;">'.$data['cn'].'</span>';
      }
  }
  $t_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE
             a.hos_id = '$hos_id'
             AND a.dateadm = '$sysdate'
             AND a.status in ('1','2')
             AND b.$complication = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $t_act = $data['cn'];
      }
  }
  $buf['resp_3'] = $t_non_act . ' / ' . $t_act;

  // Get this month confirmed
  $m_act = '0';
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient a INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
             WHERE a.hos_id = '$hos_id'
             AND YEAR(a.dateadm) = YEAR(CURRENT_DATE())
             AND MONTH(a.dateadm) = MONTH(CURRENT_DATE())
             AND a.status in ('2')
             AND b.$complication = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
      $data = mysqli_fetch_assoc($result);
      if($data['cn'] != 0){
        $m_act = $data['cn'];
      }
  }
  $buf['resp_4'] = $m_act;

  $return[] = $buf;
  echo json_encode($return);
  mysqli_close($conn); die();
}
