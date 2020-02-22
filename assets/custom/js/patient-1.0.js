$(function(){

   $('#txtProvince').change(function(){
     core.get_district('txtProvince', 'txtDistrict')
   })

   $("input[name=icon-input-refer]").click(function(){
     $value = $("input[name='icon-input-refer']:checked").val();
     if($value == '0'){
       $('.referHidden').addClass('dn')
       $('input[name=icon-input-referstatus][value=na]').prop('checked', true)
       $('#txtFacility').val('')
     }else{
       $('.referHidden').removeClass('dn')
     }
   })

  $('.searchHnForm').submit(function(){
    if($('#txtHn1').val() == ''){
      console.log('a');
      $('#txtHn1').addClass('is-invalid')
      return ;
    }
    preload.show()

    var param = { hn: $('#txtHn1').val(), uid: current_user , role: current_role }
    var jxr = $.post(conf.api + 'patient?stage=check_1', param , function(){}, 'json')
              .always(function(snap){
                setTimeout(function(){
                  preload.hide()
                  $('#admissionModalCenter').modal('hide')
                  // alert(fnc.json_exist(snap))
                  if(fnc.json_exist(snap)){
                  // if((snap.length > 0) && (snap != '')){
                    snap.forEach(i=>{
                      if(i.status == '1'){
                        $('#admissionReviewstagecaseModal').modal()
                        preload.hide()
                      }else{
                        window.localStorage.setItem(conf.prefix + 'hn', $('#txtHn1').val())
                        window.location = 'core_entry.html'
                      }
                    })
                  }else{
                    $('#admissionNewcaseModal').modal()
                  }
                }, 1000)
              })

  })

  $('#txtAnc').change(function(){
    $data = $('#txtAnc').val()
    if($data == '0'){
      $('.ancHidden').addClass('dn')
      $('#txt1GA').val('')
      $('#txtNumAnc').val('')

      $('#txt1GA').val('')
      $('#txt1GA').slider('refresh');
      $('#txt1GA').val('')

      $('#txtNumAnc').val('')
      $('#txtNumAnc').slider('refresh');
      $('#txtNumAnc').val('')

      $('input[name=icon-input-tl][value=0]').prop('checked', true)
      $('input[name=icon-input-hiv][value=0]').prop('checked', true)
      $('input[name=icon-input-syp][value=0]').prop('checked', true)
      $('input[name=icon-input-hep][value=0]').prop('checked', true)
      $("#txtAncSys").val('')
      $("#txtAncDia").val('')
      $('input[name=icon-input-urine][value=99]').prop('checked', true)
    }else{
      $('.ancHidden').removeClass('dn')
    }
  })

  $('.age_input').change(function(){
    $dd = $('#txtDD2').val()
    $mm = $('#txtMM2').val()
    $yy = $('#txtYY2').val()
    if(($dd != '') && ($mm != '') && ($yy != '')){
        $dob = $yy + $mm + $dd;
        // console.log($dob);
        $age = moment().diff(moment($dob, 'YYYYMMDD'), 'years')
        // console.log($age);
        if(Number.isNaN($age)){
            $('#txtMM2').val('')
            $('#txtMM2').addClass('is-invalid')
            swal("เกิดข้อผิดพลาด!", "ท่านเลือกเดือนไม่ถูกต้อง!", "error")
            $('#txtAge').val('')
        }else{
            $('#txtMM2').removeClass('is-invalid')
            $('#txtAge').val($age)
        }
    }else{
      $('#txtAge').val('')
    }
  })

  $('.admForm').submit(function(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    if($('#txtHn2').val() == ''){ $check++; $('#txtHn2').addClass('is-invalid'); }
    if($('#txtDD1').val() == ''){ $check++; $('#txtDD1').addClass('is-invalid'); }
    if($('#txtMM1').val() == ''){ $check++; $('#txtMM1').addClass('is-invalid'); }
    if($('#txtYY1').val() == ''){ $check++; $('#txtYY1').addClass('is-invalid'); }
    if($('#txtHH1').val() == ''){ $check++; $('#txtHH1').addClass('is-invalid'); }
    if($('#txtMIN1').val() == ''){ $check++; $('#txtMIN1').addClass('is-invalid'); }
    if($('#txtCid').val() == ''){ $check++; $('#txtCid').addClass('is-invalid'); }
    if($('#txtDistrict').val() == ''){ $check++; $('#txtDistrict').addClass('is-invalid'); }
    if($('#txtDD2').val() == ''){ $check++; $('#txtDD2').addClass('is-invalid'); }
    if($('#txtMM2').val() == ''){ $check++; $('#txtMM2').addClass('is-invalid'); }
    if($('#txtYY2').val() == ''){ $check++; $('#txtYY2').addClass('is-invalid'); }
    if($('#txtAge').val() == ''){ $check++; $('#txtAge').addClass('is-invalid'); }
    if($('#txtProvince').val() == ''){ $check++; $('#txtProvince').addClass('is-invalid'); }
    if($('#txtDistrict').val() == ''){ $check++; $('#txtDistrict').addClass('is-invalid'); }

    if($check != 0){ $('html,body').animate({ scrollTop: 0 }, 'slow'); return ; }

    $gravid = parseInt($("#txtGravid").val())
    $parity = parseInt($("#txtParity").val())
    $abortion = parseInt($("#txtAbort").val())

    if($parity >= $gravid){

      swal({    title: "Error",
              text: "Parity must be less than gravidity.",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              closeOnConfirm: true },
              function(){
              $("body, html").animate({ scrollTop: $("#card3").position().top });
              });

      return ;
    }

    console.log($parity);
    console.log($abortion);
    console.log($parity + $abortion);
    console.log($gravid);

    if(($parity + $abortion) >= $gravid){
      swal({    title: "Error",
              text: "Parity + Abortion must be less than gravidity.",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              closeOnConfirm: true },
              function(){
              $("body, html").animate({ scrollTop: $("#card3").position().top });
              });
      return ;
    }

    preload.show()

    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      date_adm: $('#txtYY1').val() + '-' + $('#txtMM1').val() + '-' + $('#txtDD1').val(),
      time_adm: $('#txtHH1').val() + ':' + $('#txtMIN1').val() + ':00',
      refer: $("input[name='icon-input-refer']:checked").val(),
      refer_status: $("input[name='icon-input-referstatus']:checked").val(),
      refer_facility: $('#txtFacility').val(),
      cid: $('#txtCid').val(),
      province: $('#txtProvince').val(),
      district: $('#txtDistrict').val(),
      date_dob: $('#txtYY2').val() + '-' + $('#txtMM2').val() + '-' + $('#txtDD2').val(),
      age: $('#txtAge').val(),
      rel: $("input[name='icon-input-rel']:checked").val(),
      edu: $("input[name='icon-input-education']:checked").val(),
      dm: $("input[name='icon-input-dm']:checked").val(),
      ht: $("input[name='icon-input-ht']:checked").val(),
      hd: $("input[name='icon-input-hd']:checked").val(),
      gravid: $gravid,
      parity: $parity,
      abortion: $abortion,
      anc: $('#txtAnc').val(),
      ga1anc: $('#txt1GA').val(),
      num_anc: $('#txtNumAnc').val(),
      tls: $("input[name='icon-input-tl']:checked").val(),
      hiv: $("input[name='icon-input-hiv']:checked").val(),
      syp: $("input[name='icon-input-syp']:checked").val(),
      hep: $("input[name='icon-input-hep']:checked").val(),
      anc_sys: $('#txtAncSys').val(),
      anc_dia: $('#txtAncDia').val(),
      urine: $("input[name='icon-input-urine']:checked").val(),
      adm_sys: $('#txtAdmSts').val(),
      adm_dia: $('#txtAdmDia').val(),
      pr: $('#txtPr').val(),
      bt: $('#txtBt').val(),
      fhr: $('#txtFhr').val(),
      lbstage: $("input[name='icon-input-solb']:checked").val(),
      date_labor_start: $('#txtYY3').val() + '-' + $('#txtMM3').val() + '-' + $('#txtDD3').val(),
      time_labor_start: $('#txtHH3').val() + ':' + $('#txtMIN3').val() + ':00',
      date_membranes_ruptured : $('#txtYY4').val() + '-' + $('#txtMM4').val() + '-' + $('#txtDD4').val(),
      time_membranes_ruptured : $('#txtHH4').val() + ':' + $('#txtMIN4').val() + ':00'
    }

    preload.show()

    var jxr = $.post(conf.api + 'patient?stage=add_new_patient', param , function(){}, 'json')




  })
})

function confirm2Home(){
  $('#backtohomeModal').modal()
}

function backtomenu(stage){
  if(stage == 1){

  }else if(stage == 2){
    window.localStorage.removeItem(conf.prefix + 'hn')
    window.location = './index'
  }
}

function setNodataSlider(ele){
  $('#' + ele).val('')
  $('#' + ele).slider('refresh');
  $('#' + ele).val('')
}

function gotoAddnewData(){
  window.localStorage.setItem(conf.prefix + 'hn', $('#txtHn1').val())
  window.location = 'core_entry.html'
}
