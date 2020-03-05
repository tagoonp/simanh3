<?php
include "config.class.php";
include "function.class.php";
$return = array();

if(!isset($_GET['stage'])){ mysqli_close($conn); die(); }
$stage = mysqli_real_escape_string($conn, $_GET['stage']);

if($stage == 'summary_by_hosp_1'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hosp']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = mysqli_real_escape_string($conn, $_POST['hosp']);

  ?>
  <tr>
    <td>Total admitted</td>
    <td><?php echo getTotalAdm($conn, $hos_id); ?></td>
  </tr>
  <tr>
    <td>Total delivery</td>
    <td><?php echo getTotalDel($conn, $hos_id); ?></td>
  </tr>

  <tr>
    <td>Total birth</td>
    <td><?php echo getTotalBirth($conn, $hos_id); ?></td>
  </tr>
  <tr>
    <td>Total livebirth</td>
    <td><?php echo getTotalLbirth($conn, $hos_id); ?></td>
  </tr>
  <tr>
    <td>Total refer case</td>
    <td><?php echo getTotalRefer($conn, $hos_id); ?></td>
  </tr>
  <?php
}


if($stage == 'summary_by_hosp_2'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role'])) || (!isset($_POST['hosp']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = mysqli_real_escape_string($conn, $_POST['hosp']);

  ?>
  <tr>
    <td>Severe Preeclampsia/Eclampsia</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 1); ?></td>
  </tr>
  <tr>
    <td>Postpartum hemorrhage</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 2); ?></td>
  </tr>

  <tr>
    <td>Sepsis</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 3); ?></td>
  </tr>
  <tr>
    <td>Obstructed labor</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 4); ?></td>
  </tr>
  <tr>
    <td>Cesarean delivery</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 5); ?></td>
  </tr>
  <tr>
    <td>Maternal death</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 6); ?></td>
  </tr>
  <tr>
    <td>Preterm birth</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 7); ?></td>
  </tr>
  <tr>
    <td>Low birth weight</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 8); ?></td>
  </tr>
  <tr>
    <td>Stillbirth</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 9); ?></td>
  </tr>
  <tr>
    <td>Neonatal death</td>
    <td><?php echo getTotalComplication($conn, $hos_id, 10); ?></td>
  </tr>
  <?php
}

if($stage == 'summary_1'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = get_hospcode($conn, $uid);
  if($role == 'administrator'){
    $strSQL = "SELECT * FROM s6x_active_chospital a LEFT JOIN s6x_chospital b ON a.hoscode = b.hoscode AND a.hos_active_status = 'Y' ";
    $resultHos = mysqli_query($conn, $strSQL);
    if(($resultHos) && (mysqli_num_rows($resultHos) > 0)){
      while($rowHos = mysqli_fetch_array($resultHos)){
        ?>
        <tr>
          <td><?php echo $rowHos['hosname']; ?></td>
          <td><?php echo getTotalAdm($conn, $rowHos['hoscode']); ?></td>
          <td><?php echo getTotalDel($conn, $rowHos['hoscode']); ?></td>
          <td><?php echo getTotalBirth($conn, $rowHos['hoscode']); ?></td>
          <td><?php echo getTotalLbirth($conn, $rowHos['hoscode']); ?></td>
          <td><?php echo getTotalRefer($conn, $rowHos['hoscode']); ?></td>
        </tr>
        <?php
      }
    }
  }
  mysqli_close($conn); die();
}

if($stage == 'summary_2'){
  if((!isset($_POST['uid'])) || (!isset($_POST['role']))){
    mysqli_close($conn); die();
  }
  $uid = mysqli_real_escape_string($conn, $_POST['uid']);
  $role = mysqli_real_escape_string($conn, $_POST['role']);
  $hos_id = get_hospcode($conn, $uid);
  if($role == 'administrator'){
    $strSQL = "SELECT * FROM s6x_active_chospital a LEFT JOIN s6x_chospital b ON a.hoscode = b.hoscode AND a.hos_active_status = 'Y' ";
    $resultHos = mysqli_query($conn, $strSQL);
    if(($resultHos) && (mysqli_num_rows($resultHos) > 0)){
      while($rowHos = mysqli_fetch_array($resultHos)){
        ?>
        <tr>
          <td style="width: 7.5%;"><?php echo $rowHos['hosname']; ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 1); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 2); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 3); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 4); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 5); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 6); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 7); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 8); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 9); ?></td>
          <td style="width: 7.5%;"><?php echo getTotalComplication($conn, $rowHos['hoscode'], 10); ?></td>
        </tr>
        <?php
      }
    }
  }
  mysqli_close($conn); die();
}

function getTotalAdm($conn, $hcode){
  $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient WHERE hos_id = '$hcode' AND status IN ('1', '2')";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    if($data['cn'] != 0){
      return '<strong class="text-dark">'.$data['cn']."</strong>";
    }else{
      return '<span class="text-muted">0</span>';
    }
  }else{
    return '<span class="text-muted">0</span>';
  }
}

function getTotalDel($conn, $hcode){
  $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient a
             INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             WHERE a.hos_id = '$hcode' AND a.status IN ('1', '2')";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    if($data['cn'] != 0){
      return '<strong class="text-dark">'.$data['cn']."</strong>";
    }else{
      return '<span class="text-muted">0</span>';
    }
  }else{
    return '<span class="text-muted">0</span>';
  }
}

function getTotalBirth($conn, $hcode){
  $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient a
             INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE a.hos_id = '$hcode' AND a.status IN ('1', '2')";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    if($data['cn'] != 0){
      return '<strong class="text-dark">'.$data['cn']."</strong>";
    }else{
      return '<span class="text-muted">0</span>';
    }
  }else{
    return '<span class="text-muted">0</span>';
  }
}

function getTotalLbirth($conn, $hcode){
  $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient a
             INNER JOIN s6x_delivery b ON a.ind_id = b.pat_ind_id
             INNER JOIN s6x_newbornchar c ON a.ind_id = c.nb_ind_id
             WHERE
             a.hos_id = '$hcode'
             AND a.status IN ('1', '2')
             AND c.nb_sov = '1'
             ";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    if($data['cn'] != 0){
      return '<strong class="text-dark">'.$data['cn']."</strong>";
    }else{
      return '<span class="text-muted">0</span>';
    }
  }else{
    return '<span class="text-muted">0</span>';
  }
}

function getTotalRefer($conn, $hcode){
  $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient WHERE hos_id = '$hcode' AND status IN ('1', '2') AND refer = '1'";
  $result = mysqli_query($conn, $strSQL);
  if($result){
    $data = mysqli_fetch_assoc($result);
    if($data['cn'] != 0){
      return '<strong class="text-dark">'.$data['cn']."</strong>";
    }else{
      return '<span class="text-muted">0</span>';
    }
  }else{
    return '<span class="text-muted">0</span>';
  }
}

function getTotalComplication($conn, $hcode, $comp_id){
  $comp_table = array(
                '',
                's6x_comp_spe',
                '',
                '',
                '',
                '',
                's6x_comp_maternal_death',
                '',
                '',
                '',
                ''
              );

    $comp_index = array(
                  '',
                  'eclampsia',
                  '',
                  '',
                  '',
                  '',
                  'maternaldeath',
                  '',
                  '',
                  '',
                  ''
                );
   if($comp_table[$comp_id] == ''){
     return "0";
   }else{
     $ikey = $comp_index[$comp_id];
     $strSQL = "SELECT COUNT(ind_id) cn FROM s6x_patient a
                INNER JOIN s6x_complication b ON a.ind_id = b.comp_ind_id
                WHERE
                a.hos_id = '$hcode'
                AND a.status IN ('1', '2')
                AND b.$ikey = '1'
                ";
     $result = mysqli_query($conn, $strSQL);
     if($result){
       $data = mysqli_fetch_assoc($result);
       if($data['cn'] != 0){
         return '<strong class="text-danger" style="cursor: pointer;" onclick="viewIndicatorStatInfo(\''.$comp_id.'\', \''.$hcode.'\')">'.$data['cn']."</strong>";
       }else{
         return '<span class="text-muted">0</span>';
       }
     }else{
       return '<span class="text-muted">0</span>';
     }
   }
}
?>
