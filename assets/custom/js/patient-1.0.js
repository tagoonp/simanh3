var patient = {
  getPrevData(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'patient?stage=check_prev_info', param , function(){}, 'json')
              .always(function(snap){
                if(fnc.json_exist(snap)){
                  snap.forEach(i=>{

                    if((i.dateadm != null) && (i.dateadm != '0000-00-00')){
                      $b = i.dateadm.split('-')
                      $('#txtDD1').val($b[2]); $('#txtMM1').val($b[1]); $('#txtYY1').val($b[0])
                    }

                    if(i.timeadm != null){
                      $b = i.timeadm.split(':')
                      $('#txtHH1').val($b[0])
                      $('#txtMIN1').val($b[1])
                    }

                    $('input[name=icon-input-refer][value=' + i.refer + ']').prop('checked', true)
                    if(i.refer == '1'){
                      $('.referHidden').removeClass('dn')
                      $('input[name=icon-input-referstatus][value=' + i.refer_status + ']').prop('checked', true)
                      if(i.refer_status == 'in'){
                        $('#txtFacility').val(i.refer_f)
                      }else if(i.refer_status == 'out'){
                        $('#txtFacility').val(i.refer_t)
                      }
                    }


                    $('#txtCid').val(i.idno)

                    if((i.datebr != null) && (i.datebr != '0000-00-00')){
                      $b = i.datebr.split('-')
                      $('#txtDD2').val($b[2]); $('#txtMM2').val($b[1]); $('#txtYY2').val($b[0])
                    }

                    $('#txtAge').val(i.age_e)
                    $('#txtProvince').val(i.p_province)
                    core.get_district('txtProvince', 'txtDistrict')
                    setTimeout(function(){
                      $('#txtDistrict').val(i.p_district)
                    }, 1000)

                    $('input[name=icon-input-rel][value=' + i.rel + ']').prop('checked', true)
                    $('input[name=icon-input-education][value=' + i.edu + ']').prop('checked', true)
                    $('input[name=icon-input-dm][value=' + i.dm + ']').prop('checked', true)
                    $('input[name=icon-input-ht][value=' + i.ht + ']').prop('checked', true)
                    $('input[name=icon-input-hd][value=' + i.hd + ']').prop('checked', true)

                    $('#txtGravid').val(i.grav)
                    $('#txtGravid').slider('refresh');

                    $('#txtParity').val(i.para)
                    $('#txtParity').slider('refresh');

                    $('#txtAbort').val(i.abor)
                    $('#txtAbort').slider('refresh');

                    $('#txtAnc').val(i.anc)
                    if(i.anc != '0'){
                      $('.ancHidden').removeClass('dn')

                      if(i.ga1st == '99'){
                        $('#txt1GA').val(''); $('#txt1GA').slider('refresh'); $('#txt1GA').val('');
                      }else{
                        $('#txt1GA').val(i.ga1st); $('#txt1GA').slider('refresh');
                      }

                      if(i.noanc == '99'){
                        $('#txtNumAnc').val(''); $('#txtNumAnc').slider('refresh'); $('#txtNumAnc').val('');
                      }else{
                        $('#txtNumAnc').val(i.noanc); $('#txtNumAnc').slider('refresh');
                      }

                      $('input[name=icon-input-tl][value=' + i.tyl + ']').prop('checked', true)
                      $('input[name=icon-input-hiv][value=' + i.hiv + ']').prop('checked', true)
                      $('input[name=icon-input-syp][value=' + i.syp + ']').prop('checked', true)
                      $('input[name=icon-input-hep][value=' + i.hep + ']').prop('checked', true);

                      $('#txtAncSys').val(i.sbp)
                      $('#txtAncDia').val(i.dbp)

                      $('input[name=icon-input-urine][value=' + i.prot + ']').prop('checked', true);
                    }

                    $('#txtAdmSts').val(i.sbpad)
                    $('#txtAdmDia').val(i.dbpad)
                    $('#txtPr').val(i.pr)
                    $('#txtBt').val(i.bt)
                    $('#txtFhr').val(i.fhr)

                    $('input[name=icon-input-solb][value=' + i.labora + ']').prop('checked', true);
                    if(i.labora != '0'){
                      $('.laborHidden').removeClass('dn')
                      if((i.date_lbstart != null) && (i.date_lbstart != '0000-00-00')){
                        $b = i.date_lbstart.split('-'); $('#txtDD3').val($b[2]); $('#txtMM3').val($b[1]); $('#txtYY3').val($b[0]);
                      }

                      if(i.time_lbstart != null){
                        $b = i.time_lbstart.split(':'); $('#txtHH3').val($b[0]); $('#txtMIN3').val($b[1])
                      }

                      if((i.date_mbrup != null) && (i.date_mbrup != '0000-00-00')){
                        $b = i.date_mbrup.split('-'); $('#txtDD4').val($b[2]); $('#txtMM4').val($b[1]); $('#txtYY4').val($b[0]);
                      }

                      if(i.time_mbrup != null){
                        $b = i.time_mbrup.split(':'); $('#txtHH4').val($b[0]); $('#txtMIN4').val($b[1])
                      }

                      if(i.gaadm == '99'){
                        $('#txtGaAdm').val(''); $('#txtGaAdm').slider('refresh'); $('#txtGaAdm').val('');
                      }else{
                        $('#txtGaAdm').val(i.gaadm); $('#txtGaAdm').slider('refresh');
                      }


                    }
                  })
                  preload.hide()
                }else{
                  preload.hide()
                }
                console.log(snap);
              })
  }
}
$(function(){

   $('#txtProvince').change(function(){
     core.get_district('txtProvince', 'txtDistrict')
   })

   $("input[name=icon-input-solb]").click(function(){
     $value = $("input[name='icon-input-solb']:checked").val();
     if($value == '0'){
       $('.laborHidden').addClass('dn')
       $('input[name=icon-input-referstatus][value=na]').prop('checked', true)
       $('#txtDD3').val('')
       $('#txtMM3').val('')
       $('#txtYY3').val('')
       $('#txtHH3').val('')
       $('#txtMIN3').val('')
       $('#txtDD4').val('')
       $('#txtMM4').val('')
       $('#txtYY4').val('')
       $('#txtHH4').val('')
       $('#txtMIN4').val('')
       setNodataSlider('txtGaAdm')
     }else{
       $('.laborHidden').removeClass('dn')
     }
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
      adm_ga: $('#txtGaAdm').val(),
      pr: $('#txtPr').val(),
      bt: $('#txtBt').val(),
      fhr: $('#txtFhr').val(),
      lbstage: $("input[name='icon-input-solb']:checked").val(),
      date_labor_start: $('#txtYY3').val() + '-' + $('#txtMM3').val() + '-' + $('#txtDD3').val(),
      time_labor_start: $('#txtHH3').val() + ':' + $('#txtMIN3').val() + ':00',
      date_membranes_ruptured : $('#txtYY4').val() + '-' + $('#txtMM4').val() + '-' + $('#txtDD4').val(),
      time_membranes_ruptured : $('#txtHH4').val() + ':' + $('#txtMIN4').val() + ':00'
    }

    // console.log(param); return ;

    preload.show()

    var jxr = $.post(conf.api + 'patient?stage=add_new_patient', param , function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   $.mobile.changePage( "#deliver_part", {
                     transition: "slide",
                     reverse: false,
                     changeHash: false
                   });
                   preload.hide()
                 }else{
                   preload.hide()
                   alert('Error')
                   $('#notifyError').modal()
                 }
               })
  })

  $('.deliveryForm').submit(function(){
    $.mobile.changePage( "#complication_part", {
      transition: "slide",
      reverse: false,
      changeHash: false
    });
  })
})

function confirm2mainapp(){
  $.mobile.changePage( "#app", {
    transition: "slide",
    reverse: true,
    changeHash: false
  });
}

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
