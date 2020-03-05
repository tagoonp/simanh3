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
  $strSQL = "SELECT ind_id, status FROM s6x_patient WHERE hn = '$hn' AND hos_id = '$hos_id' AND status IN ('0', '1')";
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
      echo json_encode($return);
    }
  }else{
    // echo $strSQL;
  }

  mysqli_close($conn); die();
}

if($stage == 'check_inprogress_list'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = get_hospcode($conn, $uid);
  $strSQL = "SELECT hn, dateadm, timeadm FROM s6x_patient WHERE status = '0' AND hos_id = '$hos_id'";
  $result = mysqli_query($conn, $strSQL);
  if(($result) && (mysqli_num_rows($result) > 0)){
    while ($row = mysqli_fetch_array($result)) {
      $buf = array();
      foreach ($row as $key => $value) {
          if(!is_int($key)){
            if($key == 'hn'){
              $buf['rc_hn'] = base64_decode($value);
            }
            $buf[$key] = $value;
          }
      }
      $return[] = $buf;
    }
  }
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'check_inprogress_num'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = get_hospcode($conn, $uid);
  $strSQL = "SELECT COUNT(*) cn FROM s6x_patient WHERE status = '0' AND hos_id = '$hos_id'";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $cn = $data['cn'];
    echo $cn;
  }
  mysqli_close($conn); die();
}

if($stage == 'check_prev_newborn_info'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  //Get ind_id (Petient record id)
  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_newbornchar WHERE nb_ind_id = '$pat_ind_id'";
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
    }else{
      // echo $strSQL;
    }
  }
  echo json_encode($return);
  mysqli_close($conn); die();
}

if($stage == 'check_prev_info'){

  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $strSQL = "SELECT * FROM s6x_patient a LEFT JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             LEFT JOIN s6x_complication c ON a.ind_id = c.comp_ind_id
             LEFT JOIN s6x_mode_delivery d ON b.moddel = d.mod_id
             LEFT JOIN s6x_batype e ON b.typa = e.ba_id
             WHERE a.hn = '$hn' AND a.status IN ('0', '1')
             AND a.hos_id = '$hos_id'
             ORDER BY a.ind_id DESC LIMIT 1 ";
  $resultCheck = mysqli_query($conn, $strSQL);

  if($resultCheck){
    while($row = mysqli_fetch_array($resultCheck)){
      $b = array();
      foreach ($row as $key => $value) {
        if(!is_int($key)){
          if($key == 'idno'){
            $b[$key] = base64_decode($value);
          }else{
            $b[$key] = $value;
          }
        }
      }
      $return[] = $b;
    }
  }

  echo json_encode($return);
  mysqli_close($conn);
  die();

}

if($stage == 'confirm_entry'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $strSQL = "SELECT * FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1 ";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "UPDATE s6x_patient SET status = '1', user_confirm_enter_datetime = '$sysdatetime' WHERE ind_id = '$pat_ind_id' AND hos_id = '$hos_id'";
    $resultUpdate = mysqli_query($conn, $strSQL);
    if($resultUpdate){
      echo "Y";
    }
  }
  mysqli_close($conn); die();
}

if($stage == 'add_complication'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $normal = mysqli_real_escape_string($conn, $_POST['normal']);
  $eclampsia = mysqli_real_escape_string($conn, $_POST['eclampsia']);
  $pph = mysqli_real_escape_string($conn, $_POST['pph']);
  $sepsis = mysqli_real_escape_string($conn, $_POST['sepsis']);
  $obl = mysqli_real_escape_string($conn, $_POST['obl']);
  $cesarean = mysqli_real_escape_string($conn, $_POST['cesarean']);
  $md = mysqli_real_escape_string($conn, $_POST['md']);
  $preterm = mysqli_real_escape_string($conn, $_POST['preterm']);
  $lbw = mysqli_real_escape_string($conn, $_POST['lbw']);
  $stillbirth = mysqli_real_escape_string($conn, $_POST['stillbirth']);
  $neonatal = mysqli_real_escape_string($conn, $_POST['neonatal']);

  $strSQL = "SELECT * FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1 ";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "DELETE FROM s6x_complication WHERE comp_ind_id = '$pat_ind_id'";
    $resultDel = mysqli_query($conn, $strSQL);

    if($normal == '0'){ // Have any complication
      $strSQL = "INSERT INTO s6x_complication
                (
                  eclampsia, pph, sepsis, obl, cesarean, maternaldeath, preterm, lbw, stillbirth, neonataldeath,
                  comp_uid, comp_udatetime, comp_ind_id
                )
                VALUES
                (
                  '$eclampsia', '$pph', '$sepsis', '$obl', '$cesarean', '$md', '$preterm', '$lbw', '$stillbirth', '$neonatal',
                  '$uid', '$sysdatetime', '$pat_ind_id'
                )";
      $resultInsert = mysqli_query($conn, $strSQL);
      if($resultInsert){
        if($md == '1'){
          $strSQL = "UPDATE s6x_comp_maternal_death SET md_status = '1' WHERE md_ind_id = '$pat_ind_id'";
          $resultUpdate = mysqli_query($conn, $strSQL);
        }

        if($stillbirth == '1'){
          $strSQL = "UPDATE s6x_comp_stillbirth SET stl_status = '1' WHERE stl_ind_id = '$pat_ind_id'";
          $resultUpdate = mysqli_query($conn, $strSQL);
        }
        echo "Y";
      }else{
        echo $strSQL;
      }
    }else{ // This case is normal
      $strSQL = "INSERT INTO s6x_complication (comp_uid, comp_udatetime, comp_ind_id) VALUES ('$uid', '$sysdatetime', '$pat_ind_id')";
      $resultInsert = mysqli_query($conn, $strSQL);
      if($resultInsert){
        echo "Y";
      }
    }
  }else{
    echo "N1";
  }
  mysqli_close($conn);
  die();
}

if($stage == 'add_new_patient'){

  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $date_adm = mysqli_real_escape_string($conn, $_POST['date_adm']);
  $time_adm = mysqli_real_escape_string($conn, $_POST['time_adm']);
  $refer = mysqli_real_escape_string($conn, $_POST['refer']);
  $refer_status = mysqli_real_escape_string($conn, $_POST['refer_status']);
  $refer_facility = mysqli_real_escape_string($conn, $_POST['refer_facility']);
  $cid = mysqli_real_escape_string($conn, $_POST['cid']);
  $cid = base64_encode($cid);

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
  $adm_ga = mysqli_real_escape_string($conn, $_POST['adm_ga']);
  $pr = mysqli_real_escape_string($conn, $_POST['pr']);
  $bt = mysqli_real_escape_string($conn, $_POST['bt']);
  $fhr = mysqli_real_escape_string($conn, $_POST['fhr']);
  $lbstage = mysqli_real_escape_string($conn, $_POST['lbstage']);
  $date_labor_start = mysqli_real_escape_string($conn, $_POST['date_labor_start']);
  $time_labor_start = mysqli_real_escape_string($conn, $_POST['time_labor_start']);
  $date_membranes_ruptured = mysqli_real_escape_string($conn, $_POST['date_membranes_ruptured']);
  $time_membranes_ruptured = mysqli_real_escape_string($conn, $_POST['time_membranes_ruptured']);

  if($anc == 0){
    $ga1anc = '';
    $num_anc = '';
    $tls = '';
    $hiv = '';
    $syp = '';
    $hep = '';
    $anc_sys = '';
    $anc_dia = '';
    $urine = '';
  }else{
    if($ga1anc == ''){
      $ga1anc = '99';
    }

    if($num_anc == ''){
      $num_anc = '99';
    }
  }

  if($adm_ga == ''){
    $adm_ga = '99';
  }
  $strSQL = "SELECT * FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1 ";
  $resultCheck = mysqli_query($conn, $strSQL);

  $refer_in_facility = ''; $refer_out_facility = '';
  if($refer_status == 'in'){
    $refer_in_facility = $refer_facility;
  }else if($refer_status == 'out'){
    $refer_out_facility = $refer_facility;
  }

  $dd = ''; $mm = ''; $yy = '';
  if(($date_dob != null) && ($date_dob != '')){
    $b = explode('-', $date_dob);
    $dd = $b[2];
    $mm = $b[1];
    $yy  = $b[0];
  }

  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $dataCheck = mysqli_fetch_assoc($resultCheck);
    if($dataCheck['status'] == 0){
      $strSQL = "UPDATE s6x_patient
                 SET
                   dateadm = '$date_adm', timeadm = '$time_adm', refer = '$refer', refer_status = '$refer_status', refer_f = '$refer_in_facility', refer_t = '$refer_out_facility', p_province = '$province',
                   idno = '$cid', p_district = '$district', datebr = '$date_dob', datebr_d = '$dd', datebr_m = '$mm', datebr_y = '$yy', age_e = '$age', rel = '$rel', edu = '$edu', dm = '$dm', ht = '$ht',
                   hd = '$hd', grav = '$gravid', para = '$parity', abor = '$abortion', anc = '$anc', ga1st = '$ga1anc', noanc = '$num_anc', tyl = '$tls', hiv = '$hiv', syp = '$syp',
                   hep = '$hep', sbp = '$anc_sys', dbp = '$anc_dia', prot = '$urine', sbpad = '$adm_sys', dbpad = '$adm_dia', pr = '$pr', bt = '$bt', fhr = '$fhr', labora = '$lbstage',
                   date_lbstart = '$date_labor_start', time_lbstart = '$time_labor_start', date_mbrup = '$date_membranes_ruptured', time_mbrup = '$time_membranes_ruptured', gaadm = '$adm_ga',
                   user_edit = '$uid', user_editdatetime = '$sysdatetime'
                 WHERE
                   hn = '$hn' AND status = '0' AND hos_id = '$hos_id'
                ";
      $resultUpdate = mysqli_query($conn, $strSQL);
      if($resultUpdate){
        echo "Y";
      }
    }else{
      $strSQL = "UPDATE s6x_patient
                 SET
                   dateadm = '$date_adm', timeadm = '$time_adm', refer = '$refer', refer_status = '$refer_status', refer_f = '$refer_in_facility', refer_t = '$refer_out_facility', p_province = '$province',
                   idno = '$cid', p_district = '$district', datebr = '$date_dob', datebr_d = '$dd', datebr_m = '$mm', datebr_y = '$yy', age_e = '$age', rel = '$rel', edu = '$edu', dm = '$dm', ht = '$ht',
                   hd = '$hd', grav = '$gravid', para = '$parity', abor = '$abortion', anc = '$anc', ga1st = '$ga1anc', noanc = '$num_anc', tyl = '$tls', hiv = '$hiv', syp = '$syp',
                   hep = '$hep', sbp = '$anc_sys', dbp = '$anc_dia', prot = '$urine', sbpad = '$adm_sys', dbpad = '$adm_dia', pr = '$pr', bt = '$bt', fhr = '$fhr', labora = '$lbstage',
                   date_lbstart = '$date_labor_start', time_lbstart = '$time_labor_start', date_mbrup = '$date_membranes_ruptured', time_mbrup = '$time_membranes_ruptured', gaadm = '$adm_ga',
                   user_edit_final = '$uid', user_edit_finaldatetime = '$sysdatetime'
                 WHERE
                   hn = '$hn' AND status = '0' AND hos_id = '$hos_id'
                ";
      $resultUpdate = mysqli_query($conn, $strSQL);
      if($resultUpdate){
        echo "Y";
      }
    }

  }else{

    $strSQL = "SELECT * FROM s6x_patient WHERE hn = '$hn' AND status IN ('1','2') AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1 ";
    $resultCheck2 = mysqli_query($conn, $strSQL);

    if(($resultCheck2) && (mysqli_num_rows($resultCheck2) > 0)){

    }else{
      $strSQL = "INSERT INTO s6x_patient
                 (
                   datetimeent, dateadm, timeadm, refer, refer_status, refer_f, refer_t, hn, idno, p_province,
                   p_district, datebr, datebr_d, datebr_m, datebr_y, age_e, rel, edu, dm, ht,
                   hd, grav, para, abor, anc, ga1st, noanc, tyl, hiv, syp,
                   hep, sbp, dbp, prot, sbpad, dbpad, pr, bt, fhr, labora,
                   date_lbstart, time_lbstart, date_mbrup, time_mbrup, gaadm, user_add, hos_id
                 )
                 VALUES
                 (
                   '$sysdatetime', '$date_adm', '$time_adm', '$refer', '$refer_status', '$refer_in_facility', '$refer_out_facility', '$hn', '$cid', '$province',
                   '$district', '$date_dob', '$dd', '$mm', '$yy', '$age', '$rel', '$edu', '$dm', '$ht',
                   '$hd', '$gravid', '$parity', '$abortion', '$anc', '$ga1anc', '$num_anc', '$tls', '$hiv', '$syp',
                   '$hep', '$anc_sys', '$anc_dia', '$urine', '$adm_sys', '$adm_dia', '$pr', '$bt', '$fhr', '$lbstage',
                   '$date_labor_start', '$time_labor_start', '$date_membranes_ruptured', '$time_membranes_ruptured', '$adm_ga', '$uid', '$hos_id'
                 )
                ";
      $resultInsert = mysqli_query($conn, $strSQL);
      if($resultInsert){
        echo "Y";
      }
    }


  }

  mysqli_close($conn); die();

}

if($stage == 'add_delivery_info'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn); die();
  }

  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $mod = mysqli_real_escape_string($conn, $_POST['mod']);
  $gadel = mysqli_real_escape_string($conn, $_POST['gadel']);
  $date_del = mysqli_real_escape_string($conn, $_POST['date_del']);
  $time_del = mysqli_real_escape_string($conn, $_POST['time_del']);
  $ba_name = mysqli_real_escape_string($conn, $_POST['ba_name']);
  $ba_type = mysqli_real_escape_string($conn, $_POST['ba_type']);
  $bloodloss = mysqli_real_escape_string($conn, $_POST['bloodloss']);

  //Get ind_id (Petient record id)
  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_delivery WHERE pat_ind_id = '$pat_ind_id'";
    $resultCheck2 = mysqli_query($conn, $strSQL);

    if(($resultCheck2) && (mysqli_num_rows($resultCheck2) > 0)){
      // Update previous record
      $strSQL = "UPDATE s6x_delivery
                 SET
                  gadel = '$gadel',
                  moddel = '$mod',
                  datedel = '$date_del',
                  timedel = '$time_del',
                  nameba = '$ba_name',
                  typa = '$ba_type',
                  bll2h = '$bloodloss',
                  del_uid = '$uid',
                  del_udatetime = '$sysdatetime'
                 WHERE
                  pat_ind_id = '$pat_ind_id'
                ";
      $resultUpdateDel = mysqli_query($conn, $strSQL);
      if($resultUpdateDel){

        $strSQL = "DELETE FROM s6x_newbornchar WHERE nb_ind_id = '$pat_ind_id'";
        $resultDeleteNb = mysqli_query($conn, $strSQL);

        $nb1_bw = mysqli_real_escape_string($conn, $_POST['nb1_bw']);
        $nb1_score = mysqli_real_escape_string($conn, $_POST['nb1_score']);
        $nb1_apgar1 = mysqli_real_escape_string($conn, $_POST['nb1_apgar1']);
        $nb1_apgar5 = mysqli_real_escape_string($conn, $_POST['nb1_apgar5']);

        if($nb1_bw != ''){
          $strSQL = "INSERT INTO s6x_newbornchar
                    (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                    VALUES
                    (
                      '$nb1_bw', '$nb1_score', '$nb1_apgar1', '$nb1_apgar5', '$pat_ind_id'
                    )
                    ";
          $resultInsert1 = mysqli_query($conn, $strSQL);
        }

        $nb2_bw = mysqli_real_escape_string($conn, $_POST['nb2_bw']);
        $nb2_score = mysqli_real_escape_string($conn, $_POST['nb2_score']);
        $nb2_apgar1 = mysqli_real_escape_string($conn, $_POST['nb2_apgar1']);
        $nb2_apgar5 = mysqli_real_escape_string($conn, $_POST['nb2_apgar5']);

        if($nb2_bw != ''){
          $strSQL = "INSERT INTO s6x_newbornchar
                    (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                    VALUES
                    (
                      '$nb2_bw', '$nb2_score', '$nb2_apgar1', '$nb2_apgar5', '$pat_ind_id'
                    )
                    ";
          $resultInsert2 = mysqli_query($conn, $strSQL);
        }

        $nb3_bw = mysqli_real_escape_string($conn, $_POST['nb3_bw']);
        $nb3_score = mysqli_real_escape_string($conn, $_POST['nb3_score']);
        $nb3_apgar1 = mysqli_real_escape_string($conn, $_POST['nb3_apgar1']);
        $nb3_apgar5 = mysqli_real_escape_string($conn, $_POST['nb3_apgar5']);

        if($nb3_bw != ''){
          $strSQL = "INSERT INTO s6x_newbornchar
                    (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                    VALUES
                    (
                      '$nb3_bw', '$nb3_score', '$nb3_apgar1', '$nb3_apgar5', '$pat_ind_id'
                    )
                    ";
          $resultInsert3 = mysqli_query($conn, $strSQL);
        }

        $nb4_bw = mysqli_real_escape_string($conn, $_POST['nb4_bw']);
        $nb4_score = mysqli_real_escape_string($conn, $_POST['nb4_score']);
        $nb4_apgar1 = mysqli_real_escape_string($conn, $_POST['nb4_apgar1']);
        $nb4_apgar5 = mysqli_real_escape_string($conn, $_POST['nb4_apgar5']);

        if($nb4_bw != ''){
          $strSQL = "INSERT INTO s6x_newbornchar
                    (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                    VALUES
                    (
                      '$nb4_bw', '$nb4_score', '$nb4_apgar1', '$nb4_apgar5', '$pat_ind_id'
                    )
                    ";
          $resultInsert4 = mysqli_query($conn, $strSQL);
        }

        echo "Y";
      }else{
        echo "N3";
      }
    }else{
      // Add new record
      $strSQL = "INSERT INTO s6x_delivery
                 (gadel, moddel, datedel, timedel, nameba, typa, bll2h, del_uid, del_udatetime, pat_ind_id)
                 VALUES
                 ('$gadel', '$mod', '$date_del', '$time_del', '$ba_name', '$ba_type', '$bloodloss', '$uid', '$sysdatetime', '$pat_ind_id')
                ";
     $resultInsertDel = mysqli_query($conn, $strSQL);
     if($resultInsertDel){

       $strSQL = "DELETE FROM s6x_newbornchar WHERE nb_ind_id = '$pat_ind_id'";
       $resultDeleteNb = mysqli_query($conn, $strSQL);

       $nb1_bw = mysqli_real_escape_string($conn, $_POST['nb1_bw']);
       $nb1_score = mysqli_real_escape_string($conn, $_POST['nb1_score']);
       $nb1_apgar1 = mysqli_real_escape_string($conn, $_POST['nb1_apgar1']);
       $nb1_apgar5 = mysqli_real_escape_string($conn, $_POST['nb1_apgar5']);

       if(($nb1_bw != '') && ($nb1_bw != '0')){
         $strSQL = "INSERT INTO s6x_newbornchar
                   (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                   VALUES
                   (
                     '$nb1_bw', '$nb1_score', '$nb1_apgar1', '$nb1_apgar5', '$pat_ind_id'
                   )
                   ";
         $resultInsert1 = mysqli_query($conn, $strSQL);
       }

       $nb2_bw = mysqli_real_escape_string($conn, $_POST['nb2_bw']);
       $nb2_score = mysqli_real_escape_string($conn, $_POST['nb2_score']);
       $nb2_apgar1 = mysqli_real_escape_string($conn, $_POST['nb2_apgar1']);
       $nb2_apgar5 = mysqli_real_escape_string($conn, $_POST['nb2_apgar5']);

       if(($nb2_bw != '') && ($nb2_bw != '0')){
         $strSQL = "INSERT INTO s6x_newbornchar
                   (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                   VALUES
                   (
                     '$nb2_bw', '$nb2_score', '$nb2_apgar1', '$nb2_apgar5', '$pat_ind_id'
                   )
                   ";
         $resultInsert2 = mysqli_query($conn, $strSQL);
       }

       $nb3_bw = mysqli_real_escape_string($conn, $_POST['nb3_bw']);
       $nb3_score = mysqli_real_escape_string($conn, $_POST['nb3_score']);
       $nb3_apgar1 = mysqli_real_escape_string($conn, $_POST['nb3_apgar1']);
       $nb3_apgar5 = mysqli_real_escape_string($conn, $_POST['nb3_apgar5']);

       if(($nb3_bw != '') && ($nb3_bw != '0')){
         $strSQL = "INSERT INTO s6x_newbornchar
                   (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                   VALUES
                   (
                     '$nb3_bw', '$nb3_score', '$nb3_apgar1', '$nb3_apgar5', '$pat_ind_id'
                   )
                   ";
         $resultInsert3 = mysqli_query($conn, $strSQL);
       }

       $nb4_bw = mysqli_real_escape_string($conn, $_POST['nb4_bw']);
       $nb4_score = mysqli_real_escape_string($conn, $_POST['nb4_score']);
       $nb4_apgar1 = mysqli_real_escape_string($conn, $_POST['nb4_apgar1']);
       $nb4_apgar5 = mysqli_real_escape_string($conn, $_POST['nb4_apgar5']);

       if(($nb4_bw != '') && ($nb4_bw != '0')){
         $strSQL = "INSERT INTO s6x_newbornchar
                   (nb_bw, nb_sov, nb_apg1, nb_apg5, nb_ind_id)
                   VALUES
                   (
                     '$nb4_bw', '$nb4_score', '$nb4_apgar1', '$nb4_apgar5', '$pat_ind_id'
                   )
                   ";
         $resultInsert4 = mysqli_query($conn, $strSQL);
       }

       echo "Y";
     }else{
       echo "N2";
     }
    }
  }else{
    echo "N1";
  }


  mysqli_close($conn); die();
}
