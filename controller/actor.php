<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'delete_complication_icd'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['comp_id']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $comp_id = mysqli_real_escape_string($conn, $_POST['comp_id']);

  $strSQL = "DELETE FROM s6x_complication_causes WHERE ID = '$comp_id'";
  $resultDelete = mysqli_query($conn, $strSQL);
  echo "Y";
  mysqli_close($conn);
  die();
}

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

if($stage == 'set_action_draft'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['complication_group']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $complication = mysqli_real_escape_string($conn, $_POST['complication_group']);

  if($complication == '6'){
    $dod = mysqli_real_escape_string($conn, $_POST['dod']);
    $tod = mysqli_real_escape_string($conn, $_POST['tod']);
    $q1 = mysqli_real_escape_string($conn, $_POST['q1']);
    $q2 = mysqli_real_escape_string($conn, $_POST['q2']);
    $q3 = mysqli_real_escape_string($conn, $_POST['q3']);
    $q4 = mysqli_real_escape_string($conn, $_POST['q4']);
    $q5 = mysqli_real_escape_string($conn, $_POST['q5']);
    $q6 = mysqli_real_escape_string($conn, $_POST['q6']);
    $q7 = mysqli_real_escape_string($conn, $_POST['q7']);
    $q8 = mysqli_real_escape_string($conn, $_POST['q8']);
    $q9 = mysqli_real_escape_string($conn, $_POST['q9']);
    $q10 = mysqli_real_escape_string($conn, $_POST['q10']);
    $q11 = mysqli_real_escape_string($conn, $_POST['q11']);
    $q12 = mysqli_real_escape_string($conn, $_POST['q12']);
    $q13 = mysqli_real_escape_string($conn, $_POST['q13']);
    $q14 = mysqli_real_escape_string($conn, $_POST['q14']);
    $q15 = mysqli_real_escape_string($conn, $_POST['q15']);
    $q16 = mysqli_real_escape_string($conn, $_POST['q16']);
    $q17 = mysqli_real_escape_string($conn, $_POST['q17']);
    $q18 = mysqli_real_escape_string($conn, $_POST['q18']);
    $q19 = mysqli_real_escape_string($conn, $_POST['q19']);
    $q20 = mysqli_real_escape_string($conn, $_POST['q20']);
    $q21 = mysqli_real_escape_string($conn, $_POST['q21']);
    $q22 = mysqli_real_escape_string($conn, $_POST['q22']);
    $q23 = mysqli_real_escape_string($conn, $_POST['q23']);
    $q24 = mysqli_real_escape_string($conn, $_POST['q24']);
    $q25 = mysqli_real_escape_string($conn, $_POST['q25']);
    $q26 = mysqli_real_escape_string($conn, $_POST['q26']);
    $q27 = mysqli_real_escape_string($conn, $_POST['q27']);
    $q28 = mysqli_real_escape_string($conn, $_POST['q28']);
    $q29 = mysqli_real_escape_string($conn, $_POST['q29']);
    $q30 = mysqli_real_escape_string($conn, $_POST['q30']);
    $q31 = mysqli_real_escape_string($conn, $_POST['q31']);

    //Get ind_id (Petient record id)
    $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '1' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
    $resultCheck = mysqli_query($conn, $strSQL);
    if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
      $data = mysqli_fetch_assoc($resultCheck);
      $pat_ind_id = $data['ind_id'];

      $strSQL = "SELECT * FROM s6x_act_maternal_death WHERE mda_ind_id = '$pat_ind_id'";
      $resultCheck2 = mysqli_query($conn, $strSQL);
      if(($resultCheck2) && (mysqli_num_rows($resultCheck2) > 0)){
        $strSQL = "UPDATE s6x_act_maternal_death
                   SET
                   mda_date = '$dod',
                   mda_time = '$tod',
                   mda_antibiotic = '$q1',
                   mda_oxytocics = '$q2',
                   mda_anticonvulsant = '$q3',
                   mda_rpcp = '$q4',
                   mda_rp = '$q5',
                   mda_vaginal_delivery = '$q6',
                   mda_cesarean = '$q7',
                   mda_blood_trans = '$q8',
                   mda_hysterectomy = '$q9',
                   mda_other_surgeries = '$q10',
                   mda_intubation = '$q11',
                   mda_cardiopulmonary = '$q12',
                   mda_diagnosis_1 = '$q13',
                   mda_diagnosis_2 = '$q14',
                   mda_diagnosis_3 = '$q15',
                   mda_diagnosis_4 = '$q16',
                   mda_diagnosis_5 = '$q17',
                   mda_diagnosis_6 = '$q18',
                   mda_diagnosis_7 = '$q19',
                   mda_diagnosis_8 = '$q20',
                   mda_diagnosis_9 = '$q21',
                   mda_limit_1 = '$q22',
                   mda_limit_2 = '$q23',
                   mda_limit_3 = '$q24',
                   mda_limit_4 = '$q25',
                   mda_action_1 = '$q26',
                   mda_action_2 = '$q27',
                   mda_action_3 = '$q28',
                   mda_action_4 = '$q29',
                   mda_action_5 = '$q30',
                   mda_action_6 = '$q31',
                   mda_udatetime = '$sysdatetime',
                   mda_uid = '$uid'
                   WHERE
                   mda_ind_id = '$pat_ind_id'
                  ";
        $resultUpdate = mysqli_query($conn, $strSQL);
        if($resultUpdate){ echo "Success"; }else{ echo "Fail"; }
      }else{
        $strSQL = "INSERT INTO s6x_act_maternal_death
                   (
                     mda_date, mda_time, mda_antibiotic, mda_oxytocics, mda_anticonvulsant, mda_rpcp, mda_rp, mda_vaginal_delivery, mda_cesarean, mda_blood_trans,
                     mda_hysterectomy, mda_other_surgeries, mda_intubation, mda_cardiopulmonary, mda_diagnosis_1, mda_diagnosis_2, mda_diagnosis_3, mda_diagnosis_4, mda_diagnosis_5, mda_diagnosis_6,
                     mda_diagnosis_7, mda_diagnosis_8, mda_diagnosis_9, mda_limit_1, mda_limit_2, mda_limit_3, mda_limit_4, mda_action_1, mda_action_2, mda_action_3,
                     mda_action_4, mda_action_5, mda_action_6, mda_udatetime, mda_uid, mda_ind_id
                   )
                   VALUES
                   (
                     '$dod', '$tod', '$q1', '$q2', '$q3', '$q4', '$q5', '$q6', '$q7', '$q8',
                     '$q9', '$q10', '$q11', '$q12', '$q13', '$q14', '$q15', '$q16', '$q17', '$q18',
                     '$q19', '$q20', '$q21', '$q22', '$q23', '$q24', '$q25', '$q26', '$q27', '$q28',
                     '$q29', '$q30', '$q31', '$sysdatetime', '$uid', '$pat_ind_id'
                   )
                  ";
        $resultInsert = mysqli_query($conn, $strSQL);
        if($resultInsert){ echo "Success"; }else{ echo "Fail"; }
      }
    }
  }

  mysqli_close($conn);
  die();
}


if($stage == 'confirm_action'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['complication_group']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $complication = mysqli_real_escape_string($conn, $_POST['complication_group']);

  //Get ind_id (Petient record id)
  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '1' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    if($complication == '6'){
      $strSQL = "UPDATE s6x_patient SET status = '2' WHERE hn = '$hn' AND status = '1' AND hos_id = '$hos_id'";
      $resultUpdate1 = mysqli_query($conn, $strSQL);
      if($resultUpdate1){
        echo "Y";
        $strSQL = "UPDATE s6x_act_maternal_death SET mda_status = '1' WHERE mda_ind_id = '$pat_ind_id'";
        $resultUpdate2 = mysqli_query($conn, $strSQL);

        $strSQL = "SELECT * FROM s6x_act_maternal_death WHERE mda_ind_id = '$pat_ind_id' ORDER BY ID LIMIT 1";
        $resultCheck2 = mysqli_query($conn, $strSQL);
        if(($resultCheck2) && (mysqli_num_rows($resultCheck2) > 0)){
          $comp_data = mysqli_fetch_assoc($resultCheck2);
          if($comp_data['mda_diagnosis_1'] != '1'){
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '1' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);

            if($comp_data['mda_diagnosis_2'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '2' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_3'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '3' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_4'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '4' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_5'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '5' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_6'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '6' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_7'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '7' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_8'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '8' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
            if($comp_data['mda_diagnosis_9'] != '1'){
              $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '9' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            }
          }else{
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '2' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '3' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '4' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '5' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);
            $strSQL = "DELETE FROM s6x_complication_causes WHERE cmp_group = '6' AND cmp_major_group = '6' AND cmp_ind_id = '$pat_ind_id'"; mysqli_query($conn, $strSQL);

            $strSQL = "UPDATE s6x_act_maternal_death SET mda_diagnosis_2 = 'na',  mda_diagnosis_3 = 'na',  mda_diagnosis_4 = 'na',  mda_diagnosis_5 = 'na',  mda_diagnosis_6 = 'na'"; mysqli_query($conn, $strSQL);
          }

        }
      }
    }
  }

  mysqli_close($conn);
  die();
}

if($stage == 'get_action_info'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn'])) || (!isset($_POST['complication']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);
  $complication = mysqli_real_escape_string($conn, $_POST['complication']);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '1' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    if($complication == '6'){
      $strSQL = "SELECT * FROM s6x_act_maternal_death WHERE mda_ind_id = '$pat_ind_id'";
      $resultCheck2 = mysqli_query($conn, $strSQL);
      if(($resultCheck2) && (mysqli_num_rows($resultCheck2) > 0)){
        while($row = mysqli_fetch_array($resultCheck2)){
          $b = array();
          foreach ($row as $key => $value) {
            if(!is_int($key)){
              $b[$key] = $value;
            }
          }
          $return[] = $b;
        }
      }
    }
  }
  echo json_encode($return);
  mysqli_close($conn);
  die();
}
