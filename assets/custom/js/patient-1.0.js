$ga_del = 0
var complication = {
  save_md(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    if($('#txtDD10').val() == ''){ $check++; $('#txtDD10').addClass('is-invalid'); }
    if($('#txtMM10').val() == ''){ $check++; $('#txtMM10').addClass('is-invalid'); }
    if($('#txtYY10').val() == ''){ $check++; $('#txtYY10').addClass('is-invalid'); }
    if($('#txtHH10').val() == ''){ $check++; $('#txtHH10').addClass('is-invalid'); }
    if($('#txtMIN10').val() == ''){ $check++; $('#txtMIN10').addClass('is-invalid'); }

    if($check != 0){
        $('#modalMotherDeath').animate({ scrollTop: 0 }, 'slow');
        return ;
    }

    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      dod: $('#txtYY10').val() + '-' + $('#txtMM10').val() + '-' + $('#txtDD10').val(),
      tod: $('#txtHH10').val() + ':' + $('#txtMIN10').val() + ':00',
      c1: $("input[name='icon-input-md-status-1']:checked").val(),
      c2: $("input[name='icon-input-md-status-2']:checked").val(),
      c3: $("input[name='icon-input-md-status-3']:checked").val()
    }

    preload.show()

    var jxr = $.post(conf.api + 'complication?stage=add_mothernal_death', param , function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   $('#modalMotherDeath').modal('hide')
                   complication.get_md('get_md')
                   patient.getPrevData()
                 }else{
                   preload.hide()
                   $('#notifyError').modal()
                 }
               })

  },
  get_md(is_hl){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'complication?stage=get_mothernal_death', param , function(){})
               .always(function(resp){
                 if(resp != ''){
                   $('input[name=icon-input-md][value=1]').prop('checked', true)
                   $('#complication_md').html(resp)
                   $('#complication_md').removeClass('dn')
                 }else{
                   $('#complication_md').empty()
                   $('#complication_md').addClass('dn')
                 }
                 if(is_hl == 'get_md'){
                   preload.hide()
                 }
               })
  },
  save_stillbirth(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    if($('#txtDD13').val() == ''){ $check++; $('#txtDD13').addClass('is-invalid'); }
    if($('#txtMM13').val() == ''){ $check++; $('#txtMM13').addClass('is-invalid'); }
    if($('#txtYY13').val() == ''){ $check++; $('#txtYY13').addClass('is-invalid'); }
    if($('#txtHH13').val() == ''){ $check++; $('#txtHH13').addClass('is-invalid'); }
    if($('#txtMIN13').val() == ''){ $check++; $('#txtMIN13').addClass('is-invalid'); }

    if($check != 0){
        $('#modalStillbirth').animate({ scrollTop: 0 }, 'slow');
        return ;
    }

    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      dod: $('#txtYY13').val() + '-' + $('#txtMM13').val() + '-' + $('#txtDD13').val(),
      tod: $('#txtHH13').val() + ':' + $('#txtMIN13').val() + ':00',
      stillga: $('#txtSillGa').val(),
      c1: $("input[name='icon-input-still-status-1']:checked").val(),
      c2: $("input[name='icon-input-still-status-2']:checked").val(),
      c3: $("input[name='icon-input-still-status-3']:checked").val(),
      c4: $("input[name='icon-input-still-status-4']:checked").val(),
      c5: $("input[name='icon-input-still-status-5']:checked").val(),
      c6: $("input[name='icon-input-still-status-6']:checked").val(),
      c7: $("input[name='icon-input-still-status-7']:checked").val(),
      c8: $("input[name='icon-input-still-status-8']:checked").val(),
      c9: $("input[name='icon-input-still-status-9']:checked").val(),
      c10: $("input[name='icon-input-still-status-10']:checked").val(),
      c11: $("input[name='icon-input-still-status-11']:checked").val(),
      c12: $("input[name='icon-input-still-status-12']:checked").val(),
      c13: $("input[name='icon-input-still-status-13']:checked").val(),
      c14: $("input[name='icon-input-still-status-14']:checked").val(),
      c15: $("input[name='icon-input-still-status-15']:checked").val(),
      c16: $("input[name='icon-input-still-status-16']:checked").val(),
      c17: $("input[name='icon-input-still-status-17']:checked").val()
    }

    preload.show()

    console.log(param);

    var jxr = $.post(conf.api + 'complication?stage=add_stillbirth', param , function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   $('#modalStillbirth').modal('hide')
                   complication.get_stillbirth('get_stillbirth')
                   patient.getPrevData()
                 }else{
                   preload.hide()
                   $('#notifyError').modal()
                 }
               })

  },
  get_stillbirth(is_hl){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'complication?stage=get_stillbirth', param , function(){})
               .always(function(resp){
                 if(resp != ''){
                   $('input[name=icon-input-still][value=1]').prop('checked', true)
                   $('#complication_stillbirth').html(resp)
                   $('#complication_stillbirth').removeClass('dn')

                   var jxr2 = $.post(conf.api + 'complication?stage=get_stillbirth_data', param , function(){}, 'json')
                               .always(function(snap){
                                 if(fnc.json_exist(snap)){
                                   snap.forEach(i=>{
                                     
                                     $('#txtYY13').val()
                                     $('#txtMM13').val()
                                     $('#txtDD13').val()

                                     $('#txtHH13').val()
                                     $('#txtMIN13').val()
                                     $('#txtSillGa').val(i.stl_ga)
                                     $('input[name=icon-input-still-status-1][value=' + i.stl_q1 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-2][value=' + i.stl_q2 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-3][value=' + i.stl_q3 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-4][value=' + i.stl_q4 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-5][value=' + i.stl_q5 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-6][value=' + i.stl_q6 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-7][value=' + i.stl_q7 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-8][value=' + i.stl_q8 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-9][value=' + i.stl_q9 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-10][value=' + i.stl_q10 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-11][value=' + i.stl_q11 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-12][value=' + i.stl_q12 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-13][value=' + i.stl_q13 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-14][value=' + i.stl_q14 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-15][value=' + i.stl_q15 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-16][value=' + i.stl_q16 + ']').prop('checked', true)
                                     $('input[name=icon-input-still-status-17][value=' + i.stl_q17 + ']').prop('checked', true)
                                   })
                                 }
                               })
                 }else{
                   $('#complication_stillbirth').empty()
                   $('#complication_stillbirth').addClass('dn')
                 }
                 if(is_hl == 'get_stillbirth'){
                   preload.hide()
                 }
               })
  }
}
var patient = {
  checkInprogressNum(){
    var param = {
      uid: current_user,
      role: current_role,
    }

    var jxr = $.post(conf.api + 'patient?stage=check_inprogress_num', param , function(){})
              .always(function(resp){
                if((resp != '') && (resp != 0)){
                  $('#nnumberofInprogress').html(' <span class="badge badge-danger" style="font-size: 1.2em;">' + resp + '</span>')
                }
              })
  },
  checkInprogressList(){
    var param = {
      uid: current_user,
      role: current_role,
    }

    var jxr = $.post(conf.api + 'patient?stage=check_inprogress_list', param , function(){}, 'json')
              .always(function(snap){
                if(fnc.json_exist(snap)){
                  $c = 1;
                  $('.non-record-list-card').empty()
                  snap.forEach(i=>{
                    $data = '<div class="card c-drop-shadow- mb-2" style="border:none;">' +
                              '<div class="card-body text-center pt-2 pb-2">' +
                                '<div class="row">' +
                                  '<div class="col-1">' + $c + '</div>' +
                                  '<div class="col-8 text-left">' +
                                    '<div>' +
                                      '<strong>HN </strong> : ' + i.rc_hn + '<br>' +
                                      '<strong>Admisstion </strong> : ' + i.dateadm + ' ' +  i.timeadm +
                                    '</div>' +
                                  '</div>' +
                                  '<div class="col-3 text-right pt-1">' +
                                    '<div>' +
                                      '<button class="btn btn-success ml-1" style="height: 40px; width: 40px;" type="button" data-role="none" onclick="setPatientHNforManage(\'' + i.rc_hn + '\')"><i class="fas fa-search"></i></button>' +
                                      '<button class="btn btn-danger ml-1" style="height: 40px; width: 40px;" type="button" data-role="none"><i class="fas fa-trash"></i></button>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                            '</div>'
                    $('.non-record-list-card').append($data)
                    $c++;
                  })
                }else{
                  $('.non-record-list-card').html('<div class="card c-drop-shadow-" style="border:none;">' +
                    '<div class="card-body text-center pt-3 pb-3">' +
                      '<h5>No reord found</h5>' +
                    '</div>' +
                  '</div>')
                }
              })
  },
  getPrevNewbornData(param){
    var jxr = $.post(conf.api + 'patient?stage=check_prev_newborn_info', param , function(){}, 'json')
              .always(function(snap){
                console.log(snap);
                if(fnc.json_exist(snap)){
                  $c = 1
                  snap.forEach(i=>{
                    $('#txtBwAdd' + $c).val(i.nb_bw)
                    $('input[name=icon-input-nbsign-add' + $c + '][value=' + i.nb_sov + ']').prop('checked', true)
                    $('input[name=icon-input-apgar1-nb' + $c + '][value=' + i.nb_apg1 + ']').prop('checked', true)
                    $('input[name=icon-input-apgar5-nb' + $c + '][value=' + i.nb_apg5 + ']').prop('checked', true)
                    $c++
                  })
                }
              })
  },
  getPrevComplicationData(){
    // var complist = ['s6x_comp_maternal_death'];
    // complist.forEach(i=>{
    //   var param = {
    //     uid: current_user,
    //     role: current_role,
    //     hn: current_hn,
    //     comp: i
    //   }
    //   console.log(param);
    // })
    complication.get_md()
    complication.get_stillbirth()
  },
  confirmRecordByEnter(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'patient?stage=confirm_enter', param , function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   preload.hide();
                   $.mobile.changePage( "#send_enter_success", {
                     transition: "slide",
                     reverse: true,
                     changeHash: false
                   });
                 }else{
                   preload.hide();

                 }
               })
  },
  getPrevData(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }

    this.getPrevNewbornData(param)
    this.getPrevComplicationData()

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
                    $('.textRefer').text('No')
                    if(i.refer == '1'){
                      $('.referHidden').removeClass('dn')
                      $('input[name=icon-input-referstatus][value=' + i.refer_status + ']').prop('checked', true)
                      if(i.refer_status == 'in'){
                        $('.textRefer').text('Yes (From ' + i.refer_f + ')')
                        $('#txtFacility').val(i.refer_f)
                      }else if(i.refer_status == 'out'){
                        $('.textRefer').text('Yes (To ' + i.refer_f + ')')
                        $('#txtFacility').val(i.refer_t)
                      }
                    }


                    $('#txtCid').val(i.idno)
                    $('.textCid').text(i.idno)

                    if((i.datebr != null) && (i.datebr != '0000-00-00')){
                      $b = i.datebr.split('-')
                      $('#txtDD2').val($b[2]); $('#txtMM2').val($b[1]); $('#txtYY2').val($b[0])
                    }

                    $('.textDob').text(i.datebr)

                    $('#txtAge').val(i.age_e)
                    $('.textAge').text(i.age_e)

                    $('#txtProvince').val(i.p_province)
                    core.get_district('txtProvince', 'txtDistrict')
                    setTimeout(function(){
                      $('#txtDistrict').val(i.p_district)
                    }, 1000)

                    $('input[name=icon-input-rel][value=' + i.rel + ']').prop('checked', true)

                    if(i.rel == '0'){ $('.textRelegion').text('No data')}
                    else if(i.rel == '1'){ $('.textRelegion').text('Buddhist  - พุทธ')}
                    else if(i.rel == '2'){ $('.textRelegion').text('Islam - อิสลาม')}
                    else if(i.rel == '3'){ $('.textRelegion').text('Christian - คริสต์')}
                    else if(i.rel == '4'){ $('.textRelegion').text('Hindu - ฮินดู')}

                    $('input[name=icon-input-education][value=' + i.edu + ']').prop('checked', true)
                    if(i.edu == '0'){ $('.textEducation').text('No data')}
                    else if(i.edu == '1'){ $('.textEducation').text('Primary school - ประถมศึกษา')}
                    else if(i.edu == '2'){ $('.textEducation').text('Secondary school - มัธยมศึกษา')}
                    else if(i.edu == '3'){ $('.textEducation').text('Technical - เชี่ยวชาญเฉพาะ')}
                    else if(i.edu == '4'){ $('.textEducation').text('Bachelor - ปริญญาตรี')}
                    else if(i.edu == '5'){ $('.textEducation').text('> Bachelor - สูงกว่าปริญญาตรี')}
                    else if(i.edu == '9'){ $('.textEducation').text('Illiterate - ไม่ได้ศึกษา')}

                    $('input[name=icon-input-dm][value=' + i.dm + ']').prop('checked', true)
                    if(i.dm == '1'){ $('.textDm').text('Yes') }else{ $('.textDm').text('No') }
                    $('input[name=icon-input-ht][value=' + i.ht + ']').prop('checked', true)
                    if(i.ht == '1'){ $('.textHt').text('Yes') }else{ $('.textHt').text('No') }
                    $('input[name=icon-input-hd][value=' + i.hd + ']').prop('checked', true)
                    if(i.hd == '1'){ $('.textHd').text('Yes') }else{ $('.textHd').text('No') }


                    $('.textGravid').text(i.grav)
                    $('#txtGravid').val(i.grav)
                    $('#txtGravid').slider('refresh');

                    $('.textParity').text(i.para)
                    $('#txtParity').val(i.para)
                    $('#txtParity').slider('refresh');

                    $('.textAbortion').text(i.abor)
                    $('#txtAbort').val(i.abor)
                    $('#txtAbort').slider('refresh');

                    $('#txtAnc').val(i.anc)

                    if(i.anc == '0'){ $('.textPlaceAnc').text('No ANC') }
                    else if(i.anc == '1'){ $('.textPlaceAnc').text('Private clinic')}
                    else if(i.anc == '2'){ $('.textPlaceAnc').text('Health Promotion Hospital')}
                    else if(i.anc == '3'){ $('.textPlaceAnc').text('District hospital')}
                    else if(i.anc == '4'){ $('.textPlaceAnc').text('Provincial/Regional hospital')}
                    else if(i.anc == '5'){ $('.textPlaceAnc').text('Teaching hospital')}

                    if(i.anc != '0'){
                      $('.ancHidden').removeClass('dn')
                      $('.anc_detail').removeClass('dn')

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

                      $('.textBpAnc').text(i.sbp + " / " + i.dbp)

                      $('input[name=icon-input-urine][value=' + i.prot + ']').prop('checked', true);

                      if(i.prot == '99'){ $('.textUtine').text('No ANC') }
                      else if(i.anc == '1'){ $('.textUtine').text('<1+')}
                      else if(i.anc == '2'){ $('.textUtine').text('1+')}
                      else if(i.anc == '3'){ $('.textUtine').text('2+')}
                      else if(i.anc == '4'){ $('.textUtine').text('>3+')}
                      else if(i.anc == '5'){ $('.textPlaceAnc').text('4+')}

                    }

                    $('.textBpAdm').text(i.sbpad + " / " + i.dbpad)
                    $('#txtAdmSts').val(i.sbpad)
                    $('#txtAdmDia').val(i.dbpad)
                    if(i.pr != ''){ $('.textPr').text(i.pr) }else{ $('.textPr').text("-") }
                    $('#txtPr').val(i.pr)
                    if(i.bt != ''){ $('.textBt').text(i.bt) }else{ $('.textBt').text("-") }
                    $('#txtBt').val(i.bt)
                    if(i.fhr != ''){ $('.textFhr').text(i.bt) }else{ $('.textFhr').text("-") }
                    $('#txtFhr').val(i.fhr)

                    $('input[name=icon-input-solb][value=' + i.labora + ']').prop('checked', true);
                    $('.textStageOfLabor').text('No labor')
                    console.log(i.labora);
                    if(i.labora != '0'){
                      if(i.labora == '1'){ $('.textStageOfLabor').text('Latent phase (cervical dilatation <3-4 cm.)')}
                      else if(i.labora == '2'){ $('.textStageOfLabor').text('Active phase')}
                      else if(i.labora == '3'){ $('.textStageOfLabor').text('2<sup>nd</sup> stage (After fully dilated cervix)')}
                      else if(i.labora == '4'){ $('.textStageOfLabor').text('3<sup>rd</sup> stage (After birth)')}

                      $('.laborHidden').removeClass('dn')
                      if((i.date_lbstart != null) && (i.date_lbstart != '0000-00-00')){
                        $b = i.date_lbstart.split('-'); $('#txtDD3').val($b[2]); $('#txtMM3').val($b[1]); $('#txtYY3').val($b[0]);
                        if(i.time_lbstart != null){
                          $b = i.time_lbstart.split(':'); $('#txtHH3').val($b[0]); $('#txtMIN3').val($b[1])
                        }
                      }
                      $('.textDateOfLabor').text(i.date_lbstart + ' ' + i.time_lbstart)
                      if((i.date_mbrup != null) && (i.date_mbrup != '0000-00-00')){
                        $b = i.date_mbrup.split('-'); $('#txtDD4').val($b[2]); $('#txtMM4').val($b[1]); $('#txtYY4').val($b[0]);
                        if(i.time_mbrup != null){
                          $b = i.time_mbrup.split(':'); $('#txtHH4').val($b[0]); $('#txtMIN4').val($b[1])
                        }
                      }
                      $('.textDateOfMembrane').text(i.date_mbrup + ' ' + i.time_mbrup)
                      if(i.gaadm == '99'){
                        $('#txtGaAdm').val(''); $('#txtGaAdm').slider('refresh'); $('#txtGaAdm').val('');
                        $('.textGaAdm').text('No data')
                      }else{
                        $('#txtGaAdm').val(i.gaadm); $('#txtGaAdm').slider('refresh');
                        $('.textGaAdm').text(i.gaadm + ' weeks')
                      }
                    }

                    if(i.gadel != null){
                      $('#btn-deli-next').removeClass('dn')
                      $ga_del = i.gadel
                    }

                    $('input[name=icon-input-moddel][value=' + i.moddel + ']').prop('checked', true);
                    console.log(i.gadel);
                    $('#txtGaDel').val(i.gadel);
                    if((i.datedel != null) && (i.datedel != '0000-00-00')){
                      $b = i.datedel.split('-'); $('#txtDD5').val($b[2]); $('#txtMM5').val($b[1]); $('#txtYY5').val($b[0]);
                    }
                    if(i.timedel != null){
                      $b = i.timedel.split(':'); $('#txtHH5').val($b[0]); $('#txtMIN5').val($b[1])
                    }
                    $('#txtBa').val(i.nameba)
                    $('input[name=icon-input-batype][value=' + i.typa + ']').prop('checked', true);
                    $('#txtBloodloss').val(i.bll2h)

                    if(i.indicator_status == '0'){
                      $('.abnormalHidden').removeClass('dn')
                    }
                  })
                  preload.hide()
                }else{
                  preload.hide()
                }
                console.log(snap);
              })
  },
  saveAdmDraft(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    if($('#txtHn2').val() == ''){ $check++; $('#txtHn2').addClass('is-invalid'); }
    if($('#txtDD1').val() == ''){ $check++; $('#txtDD1').addClass('is-invalid'); }
    if($('#txtMM1').val() == ''){ $check++; $('#txtMM1').addClass('is-invalid'); }
    if($('#txtYY1').val() == ''){ $check++; $('#txtYY1').addClass('is-invalid'); }
    if($('#txtHH1').val() == ''){ $check++; $('#txtHH1').addClass('is-invalid'); }
    if($('#txtMIN1').val() == ''){ $check++; $('#txtMIN1').addClass('is-invalid'); }
    if($('#txtCid').val() == ''){ $check++; $('#txtCid').addClass('is-invalid'); }

    if($check != 0){ return ;}

    $gravid = parseInt($("#txtGravid").val())
    $parity = parseInt($("#txtParity").val())
    $abortion = parseInt($("#txtAbort").val())

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

    var jxr = $.post(conf.api + 'patient?stage=add_new_patient', param , function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   console.log('Draft saved admission');
                 }
               })

  },
  saveDelDraft(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      mod: $("input[name='icon-input-moddel']:checked").val(),
      gadel: $('#txtGaDel').val(),
      date_del: $('#txtYY5').val() + '-' + $('#txtMM5').val() + '-' + $('#txtDD1').val(),
      time_del: $('#txtHH5').val() + ':' + $('#txtMIN5').val() + ':00',
      ba_name: $('#txtBa').val(),
      ba_type: $("input[name='icon-input-batype']:checked").val(),
      bloodloss: $('#txtBloodloss').val(),
      nb1_bw: $('#txtBwAdd1').val(),
      nb1_score: $("input[name='icon-input-nbsign-add1']:checked").val(),
      nb1_apgar1: $("input[name='icon-input-apgar1-nb1']:checked").val(),
      nb1_apgar5: $("input[name='icon-input-apgar5-nb1']:checked").val(),
      nb2_bw: $('#txtBwAdd2').val(),
      nb2_score: $("input[name='icon-input-nbsign-add2']:checked").val(),
      nb2_apgar1: $("input[name='icon-input-apgar1-nb2']:checked").val(),
      nb2_apgar5: $("input[name='icon-input-apgar5-nb2']:checked").val(),
      nb3_bw: $('#txtBwAdd3').val(),
      nb3_score: $("input[name='icon-input-nbsign-add3']:checked").val(),
      nb3_apgar1: $("input[name='icon-input-apgar1-nb3']:checked").val(),
      nb3_apgar5: $("input[name='icon-input-apgar5-nb3']:checked").val(),
      nb4_bw: $('#txtBwAdd4').val(),
      nb4_score: $("input[name='icon-input-nbsign-add4']:checked").val(),
      nb4_apgar1: $("input[name='icon-input-apgar1-nb4']:checked").val(),
      nb4_apgar5: $("input[name='icon-input-apgar5-nb4']:checked").val()
    }

    var jxr = $.post(conf.api + 'patient?stage=add_delivery_info', param , function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){
                   console.log('Draft saved delivery');
                   console.log(param);
                 }
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
    console.log(param);
    var jxr = $.post(conf.api + 'patient?stage=check_1', param , function(){}, 'json')
              .always(function(snap){
                // console.log(snap);
                // return ;
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

  $('.btnComplicationStatus').click(function(){
    $com_status = $("input[name='icon-input-comstatus']:checked").val()
    console.log($com_status);
    if($com_status == '0'){ // Abnormal
      $('.abnormalHidden').removeClass('dn')
    }
    else{ // Normal
      $('.abnormalHidden').addClass('dn')
    }
  })

  $('input[name=icon-input-eclampsia]').click(function(){
    $data = $("input[name='icon-input-eclampsia']:checked").val()
    if($data == '1'){
      $('#modalEclampsia').modal({backdrop: 'static', keyboard: false})
    }else{
      $('#modalEclampsia').modal('hide')
    }
  })

  $('input[name=icon-input-md]').click(function(){
    $data = $("input[name='icon-input-md']:checked").val()
    if($data == '1'){
      $('#modalMotherDeath').modal({backdrop: 'static', keyboard: false})
    }else{
      $('#modalMotherDeath').modal('hide')
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
                   $.mobile.changePage( "#delivery_part", {
                     transition: "slide",
                     reverse: false,
                     changeHash: false
                   });
                   if(($ga_del != 0) && ($ga_del != '')){
                     $('#txtGaDel').val($ga_del)
                   }else{
                     $('#txtGaDel').val($('#txtGaAdm').val())
                   }
                   $('#txtGaDel').slider('refresh');

                   preload.hide()
                 }else{
                   preload.hide()
                   alert('Error')
                   $('#notifyError').modal()
                 }
               })
  })

  $('.deliveryForm').submit(function(){

    $check = 0
    $('.form-control').removeClass('is-invalid')
    if($('#txtDD5').val() == ''){ $check++; $('#txtDD5').addClass('is-invalid'); }
    if($('#txtMM5').val() == ''){ $check++; $('#txtMM5').addClass('is-invalid'); }
    if($('#txtYY5').val() == ''){ $check++; $('#txtYY5').addClass('is-invalid'); }
    if($('#txtHH5').val() == ''){ $check++; $('#txtHH5').addClass('is-invalid'); }
    if($('#txtMIN5').val() == ''){ $check++; $('#txtMIN5').addClass('is-invalid'); }
    if(($('#txtBwAdd1').val() == '') || ($('#txtBwAdd1').val() == '0')){ $check++; $('#txtBwAdd1').addClass('is-invalid');}

    if($check != 0){
      swal({
        title: "Error",
        text: "Please enter all require field.",
        type: "error",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        closeOnConfirm: true },
        function(){
          $('html,body').animate({ scrollTop: 0 }, 'slow');
        });
      return ;
    }

    if($('#txtGaDel').val() < $('#txtGaAdm').val()){
      console.log($('#txtGaDel').val());
      console.log($('#txtGaAdm').val());
      swal({    title: "Error",
              text: "Invalid GA of Delivery. Must be greater than GA of admission ( >= '" + $('#txtGaAdm').val() + "')",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              closeOnConfirm: true },
              function(){
                $('#txtGaDel').val($('#txtGaAdm').val())
                $('#txtGaDel').slider('refresh');
                $('html,body').animate({ scrollTop: 0 }, 'slow'); return ;
              });
      return ;
    }

    if(($('#txtBwAdd1').val() == '') || ($('#txtBwAdd1').val() == '0')){ $check++; $('#txtBwAdd1').addClass('is-invalid');}

    if($check != 0){
      swal({
        title: "Error",
        text: "In case of Delivery. Must be enter at least 1 baby",
        type: "error",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        closeOnConfirm: true },
        function(){
          $("body, html").animate({ scrollTop: $("#cardNb1").position().top });
        });
      return ;
    }

    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      mod: $("input[name='icon-input-moddel']:checked").val(),
      gadel: $('#txtGaDel').val(),
      date_del: $('#txtYY5').val() + '-' + $('#txtMM5').val() + '-' + $('#txtDD1').val(),
      time_del: $('#txtHH5').val() + ':' + $('#txtMIN5').val() + ':00',
      ba_name: $('#txtBa').val(),
      ba_type: $("input[name='icon-input-batype']:checked").val(),
      bloodloss: $('#txtBloodloss').val(),
      nb1_bw: $('#txtBwAdd1').val(),
      nb1_score: $("input[name='icon-input-nbsign-add1']:checked").val(),
      nb1_apgar1: $("input[name='icon-input-apgar1-nb1']:checked").val(),
      nb1_apgar5: $("input[name='icon-input-apgar5-nb1']:checked").val(),
      nb2_bw: $('#txtBwAdd2').val(),
      nb2_score: $("input[name='icon-input-nbsign-add2']:checked").val(),
      nb2_apgar1: $("input[name='icon-input-apgar1-nb2']:checked").val(),
      nb2_apgar5: $("input[name='icon-input-apgar5-nb2']:checked").val(),
      nb3_bw: $('#txtBwAdd3').val(),
      nb3_score: $("input[name='icon-input-nbsign-add3']:checked").val(),
      nb3_apgar1: $("input[name='icon-input-apgar1-nb3']:checked").val(),
      nb3_apgar5: $("input[name='icon-input-apgar5-nb3']:checked").val(),
      nb4_bw: $('#txtBwAdd4').val(),
      nb4_score: $("input[name='icon-input-nbsign-add4']:checked").val(),
      nb4_apgar1: $("input[name='icon-input-apgar1-nb4']:checked").val(),
      nb4_apgar5: $("input[name='icon-input-apgar5-nb4']:checked").val()
    }

    preload.show()

    var jxr = $.post(conf.api + 'patient?stage=add_delivery_info', param , function(){})
               .always(function(resp){
                 console.log(resp);
                 if(resp == 'Y'){

                   $.mobile.changePage( "#complication_part", {
                     transition: "slide",
                     reverse: false,
                     changeHash: false
                   });

                   $('#txtGaDel').val($('#txtGaAdm').val())
                   $('#txtGaDel').slider('refresh');

                   preload.hide()
                 }else{
                   preload.hide()
                   alert('Error')
                   $('#notifyError').modal()
                 }
               })


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

function setPatientHNforManage(hn){
  window.localStorage.setItem(conf.prefix + 'hn', hn)
  window.location = 'core_entry.html'
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

function cancelStatus(ele_name){
  $('input[name=' + ele_name + '][value=0]').prop('checked', true)
}

function confirmRecordToActor(){
  $('#modalConfirmsending').modal()
}

function confirmRecordToActor2(){
  $('#modalConfirmsending').modal('hide')
  preload.show()
  patient.confirmRecordByEnter()
}

function showStillbirthModal(){
  $('#modalStillbirth').modal({backdrop: 'static', keyboard: false})
}
