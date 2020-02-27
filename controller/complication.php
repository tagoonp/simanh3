<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'add_mothernal_death'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $dod = mysqli_real_escape_string($conn, $_POST['dod']);
  $tod = mysqli_real_escape_string($conn, $_POST['tod']);
  $c1 = mysqli_real_escape_string($conn, $_POST['c1']);
  $c2 = mysqli_real_escape_string($conn, $_POST['c2']);
  $c3 = mysqli_real_escape_string($conn, $_POST['c3']);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "UPDATE s6x_patient SET indicator_status = '0' WHERE ind_id = '$pat_ind_id'";
    $resultUpdate = mysqli_query($conn, $strSQL);

    $strSQL = "DELETE FROM s6x_comp_maternal_death WHERE md_ind_id = '$pat_ind_id'";
    $resultDelete = mysqli_query($conn, $strSQL);

    $strSQL = "INSERT INTO s6x_comp_maternal_death (md_dod, md_tod, md_q1, md_q2, md_q3, md_ind_id)
               VALUES
               ('$dod', '$tod', '$c1', '$c2', '$c3', '$pat_ind_id')
              ";
    $resultInsert = mysqli_query($conn, $strSQL);
    if($resultInsert){
      echo "Y";
    }else{
      echo "N";
    }
  }else{
    echo "N1";
  }
  mysqli_close($conn);
  die();
}

if($stage == 'get_mothernal_death'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_comp_maternal_death WHERE md_ind_id = '$pat_ind_id' ORDER BY ID DESC LIMIT 1";
    $resultSelect = mysqli_query($conn, $strSQL);

    if(($resultSelect) && (mysqli_num_rows($resultSelect) > 0)){
      $data = mysqli_fetch_assoc($resultSelect);
      ?>
      <table class="table table-sm table-striped">
        <tbody>
          <tr>
            <td style="width: 40%;">Date and Time of diagnosis</td>
            <td><?php echo $data['md_dod']." ".$data['md_tod']; ?></td>
          </tr>
          <tr>
            <td>Clinical status at first admission</td>
            <td>
              <?php
              if($data['md_q1'] == '1'){ echo "Full conscious healthy"; }
              else if($data['md_q1'] == '2'){ echo "Not fully consciousness"; }
              else if($data['md_q1'] == '3'){ echo "Severe conditions"; }
              else if($data['md_q1'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Died at which stage</td>
            <td>
              <?php
              if($data['md_q2'] == '1'){ echo "Antepartum"; }
              else if($data['md_q2'] == '2'){ echo "Intrapartum"; }
              else if($data['md_q2'] == '3'){ echo "Postpartum"; }
              else if($data['md_q2'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Newborn status</td>
            <td>
              <?php
              if($data['md_q3'] == '1'){ echo "Live birth"; }
              else if($data['md_q3'] == '2'){ echo "Stillbirth"; }
              else if($data['md_q3'] == '3'){ echo "Intrapartum fetal death"; }
              else if($data['md_q3'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
        </tbody>
      </table>
      <?php
    }

  }
  mysqli_close($conn);
  die();
}

if($stage == 'add_stillbirth'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $dod = mysqli_real_escape_string($conn, $_POST['dod']);
  $tod = mysqli_real_escape_string($conn, $_POST['tod']);
  $stillga = mysqli_real_escape_string($conn, $_POST['stillga']);
  $c1 = mysqli_real_escape_string($conn, $_POST['c1']);
  $c2 = mysqli_real_escape_string($conn, $_POST['c2']);
  $c3 = mysqli_real_escape_string($conn, $_POST['c3']);
  $c4 = mysqli_real_escape_string($conn, $_POST['c4']);
  $c5 = mysqli_real_escape_string($conn, $_POST['c5']);
  $c6 = mysqli_real_escape_string($conn, $_POST['c6']);
  $c7 = mysqli_real_escape_string($conn, $_POST['c7']);
  $c8 = mysqli_real_escape_string($conn, $_POST['c8']);
  $c9 = mysqli_real_escape_string($conn, $_POST['c9']);
  $c10 = mysqli_real_escape_string($conn, $_POST['c10']);
  $c11 = mysqli_real_escape_string($conn, $_POST['c11']);
  $c12 = mysqli_real_escape_string($conn, $_POST['c12']);
  $c13 = mysqli_real_escape_string($conn, $_POST['c13']);
  $c14 = mysqli_real_escape_string($conn, $_POST['c14']);
  $c15 = mysqli_real_escape_string($conn, $_POST['c15']);
  $c16 = mysqli_real_escape_string($conn, $_POST['c16']);
  $c17 = mysqli_real_escape_string($conn, $_POST['c17']);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "UPDATE s6x_patient SET indicator_status = '0' WHERE ind_id = '$pat_ind_id'";
    $resultUpdate = mysqli_query($conn, $strSQL);

    $strSQL = "DELETE FROM s6x_comp_stillbirth WHERE stl_ind_id = '$pat_ind_id'";
    $resultDelete = mysqli_query($conn, $strSQL);

    $strSQL = "INSERT INTO s6x_comp_stillbirth
                (
                  stl_dod, stl_tod, stl_ga, stl_q1, stl_q2, stl_q3, stl_q4, stl_q5,
                  stl_q6, stl_q7, stl_q8, stl_q9, stl_q10, stl_q11, stl_q12, stl_q13, stl_q14, stl_q15, stl_q16, stl_q17, stl_ind_id
                )
               VALUES
               ('$dod', '$tod', '$stillga', '$c1', '$c2', '$c3', '$c3', '$c3',
                '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3', '$c3','$pat_ind_id')
              ";
    $resultInsert = mysqli_query($conn, $strSQL);
    if($resultInsert){
      echo "Y";
    }else{
      echo "N";
    }
  }else{
    echo "N1";
  }
  mysqli_close($conn);
  die();
}

if($stage == 'get_stillbirth'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_comp_stillbirth WHERE stl_ind_id = '$pat_ind_id' ORDER BY ID DESC LIMIT 1";
    $resultSelect = mysqli_query($conn, $strSQL);

    if(($resultSelect) && (mysqli_num_rows($resultSelect) > 0)){
      $data = mysqli_fetch_assoc($resultSelect);
      ?>
      <table class="table table-sm table-striped">
        <tbody>
          <tr>
            <td style="width: 40%;">Date and Time of diagnosis</td>
            <td><?php echo $data['stl_dod']." ".$data['stl_tod']; ?></td>
          </tr>
          <tr>
            <td style="width: 40%;">Gestational age when stillbirth detection</td>
            <td><?php echo $data['stl_ga']." weeks"; ?></td>
          </tr>
          <tr>
            <td>Diabetes</td>
            <td>
              <?php
              if($data['stl_q1'] == '1'){ echo "Yes"; }
              else if($data['stl_q1'] == '0'){ echo "No"; }
              else if($data['stl_q1'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Hypertensive disorders in pregnancy</td>
            <td>
              <?php
              if($data['stl_q2'] == '1'){ echo "Yes"; }
              else if($data['stl_q2'] == '0'){ echo "No"; }
              else if($data['stl_q2'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Systemic lupus erythematosus</td>
            <td>
              <?php
              if($data['stl_q3'] == '1'){ echo "Yes"; }
              else if($data['stl_q3'] == '0'){ echo "No"; }
              else if($data['stl_q3'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Other autoimmune diseases</td>
            <td>
              <?php
              if($data['stl_q4'] == '1'){ echo "Yes"; }
              else if($data['stl_q4'] == '0'){ echo "No"; }
              else if($data['stl_q4'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Renal disease</td>
            <td>
              <?php
              if($data['stl_q5'] == '1'){ echo "Yes"; }
              else if($data['stl_q5'] == '0'){ echo "No"; }
              else if($data['stl_q5'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Thyroid disorders</td>
            <td>
              <?php
              if($data['stl_q6'] == '1'){ echo "Yes"; }
              else if($data['stl_q6'] == '0'){ echo "No"; }
              else if($data['stl_q6'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Poor nutrition (BMI <18.5 or >30)</td>
            <td>
              <?php
              if($data['stl_q7'] == '1'){ echo "Yes"; }
              else if($data['stl_q7'] == '0'){ echo "No"; }
              else if($data['stl_q7'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Placental abnormalities</td>
            <td>
              <?php
              if($data['stl_q8'] == '1'){ echo "Yes"; }
              else if($data['stl_q8'] == '0'){ echo "No"; }
              else if($data['stl_q8'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>HIV infection</td>
            <td>
              <?php
              if($data['stl_q9'] == '1'){ echo "Yes"; }
              else if($data['stl_q9'] == '0'){ echo "No"; }
              else if($data['stl_q9'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Infections such as syphilis, virus, streptococcal</td>
            <td>
              <?php
              if($data['stl_q10'] == '1'){ echo "Yes"; }
              else if($data['stl_q10'] == '0'){ echo "No"; }
              else if($data['stl_q10'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td colspan="2"><strong>Fetal conditions</strong></td>
          </tr>
          <tr>
            <td>Multiple gestation</td>
            <td>
              <?php
              if($data['stl_q11'] == '1'){ echo "Yes"; }
              else if($data['stl_q11'] == '0'){ echo "No"; }
              else if($data['stl_q11'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Congenital anomalies</td>
            <td>
              <?php
              if($data['stl_q12'] == '1'){ echo "Yes"; }
              else if($data['stl_q12'] == '0'){ echo "No"; }
              else if($data['stl_q12'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Chromosome abnormalities</td>
            <td>
              <?php
              if($data['stl_q13'] == '1'){ echo "Yes"; }
              else if($data['stl_q13'] == '0'){ echo "No"; }
              else if($data['stl_q13'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Growth restriction</td>
            <td>
              <?php
              if($data['stl_q14'] == '1'){ echo "Yes"; }
              else if($data['stl_q14'] == '0'){ echo "No"; }
              else if($data['stl_q14'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Oligohydramnios</td>
            <td>
              <?php
              if($data['stl_q15'] == '1'){ echo "Yes"; }
              else if($data['stl_q15'] == '0'){ echo "No"; }
              else if($data['stl_q15'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Syphilis infections</td>
            <td>
              <?php
              if($data['stl_q16'] == '1'){ echo "Yes"; }
              else if($data['stl_q16'] == '0'){ echo "No"; }
              else if($data['stl_q16'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
          <tr>
            <td>Viral or bacterial infections</td>
            <td>
              <?php
              if($data['stl_q17'] == '1'){ echo "Yes"; }
              else if($data['stl_q17'] == '0'){ echo "No"; }
              else if($data['stl_q17'] == '99'){ echo "No data"; }
              ?>
            </td>
          </tr>
        </tbody>
      </table>
      <?php
    }

  }
  mysqli_close($conn);
  die();
}

if($stage == 'get_stillbirth_data'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hn']))){
    mysqli_close($conn);
    die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hn = mysqli_real_escape_string($conn, $_POST['hn']);
  $hn = base64_encode($hn);
  $hos_id = get_hospcode($conn, $uid);

  $strSQL = "SELECT ind_id FROM s6x_patient WHERE hn = '$hn' AND status = '0' AND hos_id = '$hos_id' ORDER BY ind_id DESC LIMIT 1";
  $resultCheck = mysqli_query($conn, $strSQL);
  if(($resultCheck) && (mysqli_num_rows($resultCheck) > 0)){
    $data = mysqli_fetch_assoc($resultCheck);
    $pat_ind_id = $data['ind_id'];

    $strSQL = "SELECT * FROM s6x_comp_stillbirth WHERE stl_ind_id = '$pat_ind_id' ORDER BY ID DESC LIMIT 1";
    $resultSelect = mysqli_query($conn, $strSQL);

    if(($resultSelect) && (mysqli_num_rows($resultSelect) > 0)){
      while ($row = mysqli_fetch_array($resultSelect)) {
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
?>
