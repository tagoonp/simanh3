var labor = {
  addLocation(){
    var param = {
      cid: current_cid,
      uid: current_user,
      lat: $('#txtLat1').val(),
      lng: $('#txtLng1').val()
    }

    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')

    if($('#txtLat1').val() == ''){
       $check++;
       $('#txtLat1').addClass('is-invalid')
    }

    if($('#txtLng1').val() == ''){
        $check++;
        $('#txtLng1').addClass('is-invalid')
    }

    if($check != 0){
      $('#notify1Modal').modal()
      return ;
    }



  },
  getDataCompletely(cid){
    var param = {
      cid: cid,
      uid: current_user
    }
    var jxr = $.post(conf.api + 'labor?stage=get_complete', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     if(i.part_1_3_status == 'Y'){
                       $('#btnHomeplace').html('<img src="../img/homeplace-2.png" alt="" class="img-fluid">')
                     }
                   })
                 }
               })
  },
  getInfo(cid){
    var param = {
      cid: cid,
      uid: current_user
    }

    var jxr = $.post(conf.api + 'labor?stage=get_info', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     $('#textLaborFullname').text(i.lb_fname + ' ' + i.lb_lname)
                     $('#txtFname').val(i.lb_fname)
                     $('#txtLname').val(i.lb_lname)
                     $('#txtDD').val(i.lb_dob)
                     $('#txtMM').val(i.lb_mob)
                     $('#txtYY').val(i.lb_yob)
                     $('#txtAge').val(i.lb_current_age)
                     $('input[name=icon-input-sex][value=' + i.lb_gender + ']').prop('checked', true)

                     if(i.lb_gender == 'F'){
                       $('.hdSex').removeClass('dn')
                       $('input[name=icon-input-preg][value=' + i.lb_female_preg + ']').prop('checked', true)
                       if(i.lb_female_preg == '1'){
                         $('#hdQ2').removeClass('dn')
                         $('#txtQ2').val(i.lb_female_preg_i)
                       }
                       $('input[name=icon-input-feed][value=' + i.lb_female_feeding + ']').prop('checked', true)
                     }

                     $('input[name=icon-input-status][value=' + i.lb_mariage_status + ']').prop('checked', true)
                     $('input[name=icon-input-q5][value=' + i.lb_religion + ']').prop('checked', true)
                     if(i.lb_religion == '99'){
                       $('#hdQ5').removeClass('dn')
                       $('#txtQ5').val(i.lb_religion_o)
                     }

                     $('input[name=icon-input-q6][value=' + i.lb_income_status + ']').prop('checked', true)
                     if(i.lb_income_status == '3'){
                       $('input[name=icon-input-q6][value=2]').prop('checked', true)
                     }

                     $('input[name=icon-input-q7][value=' + i.lb_education + ']').prop('checked', true)
                     $('input[name=icon-input-q8][value=' + i.lb_health_privilede + ']').prop('checked', true)



                     $('#txtQ4').val(i.lb_person_number_in_family)
                     $('#txtQ4_1').val(i.lb_pnumberf_m)
                     $('#txtQ4_2').val(i.lb_pnumberf_f)

                     $('#txtQ5').val(i.lb_religion_o)

                     $('#txtQ9').val(i.lb_weight)
                     $('#txtQ10').val(i.lb_height)

                     console.log(i.lb_address_status);

                     if(i.lb_address_status == 'na'){
                       office_stage = 0
                       $('#workAddress').removeClass('dn')
                       $('#divBtnAddressStage_ifsame').removeClass('dn')
                       $('#divBtnAddressStage_ifnotsame').addClass('dn')
                     }else if(i.lb_address_status == '1'){
                       office_stage = 1
                       $('#workAddress').addClass('dn')
                       $('#divBtnAddressStage_ifsame').addClass('dn')
                       $('#divBtnAddressStage_ifnotsame').removeClass('dn')
                     }else{
                       office_stage = 0
                       $('#workAddress').removeClass('dn')
                       $('#divBtnAddressStage_ifsame').removeClass('dn')
                       $('#divBtnAddressStage_ifnotsame').addClass('dn')
                     }

                     $('#txtHomeNo').val(i.lb_home_no)
                     $('#txtHomeMoo').val(i.lb_home_moo)
                     $('#txtHomeRoad').val(i.lb_home_road)
                     if((i.lb_home_prov == null) || (i.lb_home_prov == '')){
                       $('#txtHomeProvince').val(current_province)
                       iw.get_district2(current_province, 'txtHomeDistrict')
                     }else{
                       $('#txtHomeProvince').val(i.lb_home_prov)
                       iw.get_district2(current_province, 'txtHomeDistrict')
                       setTimeout(function(){
                         $('#txtHomeDistrict').val(i.lb_home_dist)
                         iw.get_subdistrict2($('#txtHomeProvince').val(), $('#txtHomeDistrict').val(), 'txtHomeSubdistrict')
                         setTimeout(function(){
                           $('#txtHomeSubdistrict').val(i.lb_home_subdist)
                         }, 500)
                       }, 500)
                     }


                     $('#txtWorkNo').val(i.lb_work_no)
                     $('#txtWorkMoo').val(i.lb_work_moo)
                     $('#txtWorkRoad').val(i.lb_work_road)
                     if((i.lb_work_prov == null) || (i.lb_work_prov == '')){
                       $('#txtWorkProvince').val(current_province)
                       iw.get_district2(current_province, 'txtWorkDistrict')
                     }else{
                       $('#txtWorkProvince').val(i.lb_work_prov)
                       iw.get_district2(current_province, 'txtWorkDistrict')
                       setTimeout(function(){
                         $('#txtWorkDistrict').val(i.lb_work_dist)
                         iw.get_subdistrict2($('#txtWorkProvince').val(), $('#txtWorkDistrict').val(), 'txtWorkSubdistrict')
                         setTimeout(function(){
                           $('#txtWorkSubdistrict').val(i.lb_work_subdist)
                         }, 500)
                       }, 500)
                     }

                   })
                 }else{

                 }
               })
  },
  addNew(){
    $('.form-control').removeClass('is-invalid')
    if($('#txtSearchkey1').val() == ''){
      $('#txtSearchkey1').addClass('is-invalid')
      return ;
    }

    preload.show()

    var param = {
      cid: $('#txtSearchkey1').val(),
      uid: current_user,
      province: current_province
    }

    var jxr = $.post(conf.api + 'labor?stage=search_in_province', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   window.localStorage.setItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                   window.location = 'labor-dashboard.html'
                 }else{
                   preload.hide()
                   $('#modalAddnewNotify').modal()
                   current_cid = $('#txtSearchkey1').val()
                   window.localStorage.getItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                 }
               })
  },
  saveDemographic2(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')

    if($('#txtCid').val() == ''){
       $check++;
       $('#txtCid').addClass('is-invalid')
    }

    if($('#txtFname').val() == ''){
        $check++;
        $('#txtFname').addClass('is-invalid')
     }

     if($('#txtLname').val() == ''){
        $check++;
        $('#txtLname').addClass('is-invalid')
     }

     if($('#txtDD').val() == ''){
        $check++;
        $('#txtDD').addClass('is-invalid')
     }

     if($('#txtMM').val() == ''){
        $check++;
        $('#txtMM').addClass('is-invalid')
     }

     if($('#txtYY').val() == ''){
        $check++;
        $('#txtYY').addClass('is-invalid')
     }

     if($('#txtAge').val() == ''){
        $check++;
        $('#txtAge').addClass('is-invalid')
     }

     if($('#txtQ4').val() == ''){
        $check++;
        $('#txtQ4').addClass('is-invalid')
     }

     if($('#txtQ4_1').val() == ''){
        $check++;
        $('#txtQ4_1').addClass('is-invalid')
     }

     if($('#txtQ4_2').val() == ''){
        $check++;
        $('#txtQ4_2').addClass('is-invalid')
     }

     if($('#txtQ9').val() == ''){
        $check++;
        $('#txtQ9').addClass('is-invalid')
     }

     if($('#txtQ10').val() == ''){
        $check++;
        $('#txtQ10').addClass('is-invalid')
     }

     var sex = $("input[name='icon-input-sex']:checked").val();
     var preg = $("input[name='icon-input-preg']:checked").val();
     var feed = $("input[name='icon-input-feed']:checked").val();

     if(sex == null){
         $('#radiogroup-sex').addClass('text-danger'); $check++;
     }else if(sex == 'F'){
         console.log('a');

         if(preg == 1){
             console.log('aa');
             if($('#txtQ2').val() == ''){
                 $('#txtQ2').addClass('is-invalid')
                 $check++;
             }
         }else{
             console.log('ab');
         }
     }

     var edu = $("input[name='icon-input-status']:checked").val();
     var mariage = $("input[name='icon-input-status']:checked").val();
     if(mariage == null){ $('#radiogroup-status').addClass('text-danger'); $check++; }
     var q5 = $("input[name='icon-input-q5']:checked").val();
     if(q5 == null){
         $('#radiogroup-q5').addClass('text-danger'); $check++;
     }else if(q5 == 99){
         if($('#txtQ5').val() == ''){
            $('#txtQ5').addClass('is-invalid');
            $check++;
         }
     }

     var q6 = $("input[name='icon-input-q6']:checked").val();
     if(q6 == null){ $('#radiogroup-q6').addClass('text-danger'); $check++; }

     var q7 = $("input[name='icon-input-q7']:checked").val();
     if(q7 == null){ $('#radiogroup-q7').addClass('text-danger'); $check++; }

     var q8 = $("input[name='icon-input-q8']:checked").val();
     if(q8 == null){
         $('#radiogroup-q8').addClass('text-danger'); $check++;
     }else if(q8 == 99){
         if($('#txtQ8').val() == ''){
            $('#txtQ8').addClass('is-invalid');
            $check++;
         }
     }

     if($check != 0){
       return ;
     }

     preload.show()
     var param = {
         cid: $('#txtCid').val(),
         fname: $('#txtFname').val(),
         lname: $('#txtLname').val(),
         dd: $('#txtDD').val(),
         mm: $('#txtMM').val(),
         yy: $('#txtYY').val(),
         age: $('#txtAge').val(),
         sex: sex,
         preg: preg,
         preg_month: $('#txtQ2').val(),
         feeding: feed,
         status: mariage,
         family_num: $('#txtQ4').val(),
         family_num_m: $('#txtQ4_1').val(),
         family_num_f: $('#txtQ4_2').val(),
         rel: q5,
         rel_o: $('#txtQ5').val(),
         income: q6,
         edu: q7,
         privilege: q8,
         privilege_o: $('#txtQ8').val(),
         weight: $('#txtQ9').val(),
         height: $('#txtQ10').val(),
         province: current_province,
         uid: current_user
     }

     console.log(param);

     var jxr = $.post(conf.api + 'core/laborinfo.php?stage=add_part1', param, function(){})
                .always(function(resp){
                   if(resp == 'Y'){
                       labor.getInfo(current_cid)
                       slide2('app', true)
                       setTimeout(function(){
                         preload.hide()
                         $('#notifySuccessModal').modal()
                       }, 500)
                   }else{
                      preload.hide()
                      swal("ขออภัย", "ไม่สามารถบันทึกข้อมูลได้", "error")
                   }
                })
  },
  saveDemographic(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')

    if($('#txtCid').val() == ''){
       $check++;
       $('#txtCid').addClass('is-invalid')
    }

    if($('#txtFname').val() == ''){
        $check++;
        $('#txtFname').addClass('is-invalid')
     }

     if($('#txtLname').val() == ''){
        $check++;
        $('#txtLname').addClass('is-invalid')
     }

     if($('#txtDD').val() == ''){
        $check++;
        $('#txtDD').addClass('is-invalid')
     }

     if($('#txtMM').val() == ''){
        $check++;
        $('#txtMM').addClass('is-invalid')
     }

     if($('#txtYY').val() == ''){
        $check++;
        $('#txtYY').addClass('is-invalid')
     }

     if($('#txtAge').val() == ''){
        $check++;
        $('#txtAge').addClass('is-invalid')
     }

     if($('#txtQ4').val() == ''){
        $check++;
        $('#txtQ4').addClass('is-invalid')
     }

     if($('#txtQ4_1').val() == ''){
        $check++;
        $('#txtQ4_1').addClass('is-invalid')
     }

     if($('#txtQ4_2').val() == ''){
        $check++;
        $('#txtQ4_2').addClass('is-invalid')
     }

     if($('#txtQ9').val() == ''){
        $check++;
        $('#txtQ9').addClass('is-invalid')
     }

     if($('#txtQ10').val() == ''){
        $check++;
        $('#txtQ10').addClass('is-invalid')
     }

     var sex = $("input[name='icon-input-sex']:checked").val();
     var preg = $("input[name='icon-input-preg']:checked").val();
     var feed = $("input[name='icon-input-feed']:checked").val();

     if(sex == null){
         $('#radiogroup-sex').addClass('text-danger'); $check++;
     }else if(sex == 'F'){
         console.log('a');

         if(preg == 1){
             console.log('aa');
             if($('#txtQ2').val() == ''){
                 $('#txtQ2').addClass('is-invalid')
                 $check++;
             }
         }else{
             console.log('ab');
         }
     }

     var edu = $("input[name='icon-input-status']:checked").val();
     var mariage = $("input[name='icon-input-status']:checked").val();
     if(mariage == null){ $('#radiogroup-status').addClass('text-danger'); $check++; }
     var q5 = $("input[name='icon-input-q5']:checked").val();
     if(q5 == null){
         $('#radiogroup-q5').addClass('text-danger'); $check++;
     }else if(q5 == 99){
         if($('#txtQ5').val() == ''){
            $('#txtQ5').addClass('is-invalid');
            $check++;
         }
     }

     var q6 = $("input[name='icon-input-q6']:checked").val();
     if(q6 == null){ $('#radiogroup-q6').addClass('text-danger'); $check++; }

     var q7 = $("input[name='icon-input-q7']:checked").val();
     if(q7 == null){ $('#radiogroup-q7').addClass('text-danger'); $check++; }

     var q8 = $("input[name='icon-input-q8']:checked").val();
     if(q8 == null){
         $('#radiogroup-q8').addClass('text-danger'); $check++;
     }else if(q8 == 99){
         if($('#txtQ8').val() == ''){
            $('#txtQ8').addClass('is-invalid');
            $check++;
         }
     }

     if($check != 0){
       return ;
     }

     preload.show()
     var param = {
         cid: $('#txtCid').val(),
         fname: $('#txtFname').val(),
         lname: $('#txtLname').val(),
         dd: $('#txtDD').val(),
         mm: $('#txtMM').val(),
         yy: $('#txtYY').val(),
         age: $('#txtAge').val(),
         sex: sex,
         preg: preg,
         preg_month: $('#txtQ2').val(),
         feeding: feed,
         status: mariage,
         family_num: $('#txtQ4').val(),
         family_num_m: $('#txtQ4_1').val(),
         family_num_f: $('#txtQ4_2').val(),
         rel: q5,
         rel_o: $('#txtQ5').val(),
         income: q6,
         edu: q7,
         privilege: q8,
         privilege_o: $('#txtQ8').val(),
         weight: $('#txtQ9').val(),
         height: $('#txtQ10').val(),
         province: current_province,
         uid: current_user
     }

     console.log(param);

     var jxr = $.post(conf.api + 'core/laborinfo.php?stage=add_part1', param, function(){})
                .always(function(resp){
                   if(resp == 'Y'){
                      window.location = './labor-dashboard.html'
                   }else{
                      preload.hide()
                      swal("ขออภัย", "ไม่สามารถบันทึกข้อมูลได้", "error")
                   }
                })
  },
  savePart1_2(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')
  },
  savePart1_3(){
    console.log('aa');
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')
    if($('#txtHomeNo').val() == ''){
       $check++;
       $('#txtHomeNo').addClass('is-invalid')
    }
    if($('#txtHomeProvince').val() == ''){
       $check++;
       $('#txtHomeProvince').addClass('is-invalid')
    }
    if($('#txtHomeDistrict').val() == ''){
       $check++;
       $('#txtHomeDistrict').addClass('is-invalid')
    }
    if($('#txtHomeSubdistrict').val() == ''){
       $check++;
       $('#txtHomeSubdistrict').addClass('is-invalid')
    }

    if(office_stage == 0){
      if($('#txtWorkNo').val() == ''){
         $check++;
         $('#txtWorkNo').addClass('is-invalid')
      }
      if($('#txtWorkProvince').val() == ''){
         $check++;
         $('#txtWorkProvince').addClass('is-invalid')
      }
      if($('#txtWorkDistrict').val() == ''){
         $check++;
         $('#txtWorkDistrict').addClass('is-invalid')
      }
      if($('#txtWorkSubdistrict').val() == ''){
         $check++;
         $('#txtWorkSubdistrict').addClass('is-invalid')
      }
    }

    if($check != 0){
      return ;
    }
    preload.show()
    var param = {
        cid: $('#txtCid').val(),
        homeno: $('#txtHomeNo').val(),
        homemoo: $('#txtHomeMoo').val(),
        homeroad: $('#txtHomeRoad').val(),
        homeprov: $('#txtHomeProvince').val(),
        homedist: $('#txtHomeDistrict').val(),
        homesubdist: $('#txtHomeSubdistrict').val(),
        workno: $('#txtWorkNo').val(),
        workmoo: $('#txtWorkMoo').val(),
        workroad: $('#txtWorkRoad').val(),
        workprov: $('#txtWorkProvince').val(),
        workdist: $('#txtWorkDistrict').val(),
        worksubdist: $('#txtWorkSubdistrict').val(),
        address_status: office_stage,
        province: current_province,
        uid: current_user
    }

    var jxr = $.post(conf.api + 'core/laborinfo.php?stage=add_part1_3', param, function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                     labor.getInfo(current_cid)
                     slide2('app', true)
                     setTimeout(function(){
                       preload.hide()
                       $('#notifySuccessModal').modal()
                     }, 500)
                 }else{
                    preload.hide()
                    swal("ขออภัย", "ไม่สามารถบันทึกข้อมูลได้", "error")
                 }
               })
  },
  getLaborGallert(){
    preload.show()
    var param = {
      cid: current_cid,
      uid: current_user
    }
    var jxr = $.post(conf.api + 'core/laborinfo.php?stage=get_gallery', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     console.log(i);
                   })
                   setTimeout(function(){ preload.hide() }, 2000)
                 }
               })
  },
  addPhoto(){
    let opts = {
        quality: 60,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        targetWidth: 400,
        targetHeight: 400,
        allowEdit: true
    };

    navigator.camera.getPicture(labor.ftw, labor.wtf, opts);
  },
  ftw(imgURI){
    var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = imgURI.substr(imgURI.lastIndexOf('/')+1);
          options.mimeType = "image/jpeg";
          options.chunkedMode = false;

          options.params = {
              uid: current_user
          }

    var ft = new FileTransfer();
    ft.upload(imgURI, encodeURI(conf.api + "upload_profile"), LaborPlaceWin, LaborPlaceFail, options);
  },
  wtf(msg){
      swal("ขออภัย!", "ไม่สามารถใช้งานฟังก์ชันนี้ได้", "error")
  }
}

function LaborPlaceWin(r) {
  labor.getLaborGallert()
}

function LaborPlaceFail(error) {
    swal("ขออภัย!", "ไม่สามารถบันทึกภาพได้", "error")
}
