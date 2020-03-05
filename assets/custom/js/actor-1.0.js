var actor = {
  confirm_record(){
    $('#modalConfirmsending').modal('hide')
    $complication = $('#txtSendComplication').val()
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      complication_group: $complication
    }
    preload.show()
    var jxr = $.post(conf.api + 'actor?stage=confirm_action', param , function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   preload.hide()
                   $('#modalConfirmsendingSuccess').modal({backdrop: 'static', keyboard: false})
                 }else{
                   preload.hide()
                   $('#notify1Modal').modal()
                 }
               })
  },
  saveDraft(group){
    if(group == 6){ actor.save_action_draft_6() }
  },
  save_action_draft_6(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      complication_group: '6',
      dod: $('#txtYY6').val() + '-' + $('#txtMM6').val() + '-' + $('#txtDD6').val(),
      tod: $('#txtHH6').val() + ':' + $('#txtMIN6').val() + ':00',
      q1: $("input[name='icon-input-act-md-1']:checked").val(),
      q2: $("input[name='icon-input-act-md-2']:checked").val(),
      q3: $("input[name='icon-input-act-md-3']:checked").val(),
      q4: $("input[name='icon-input-act-md-4']:checked").val(),
      q5: $("input[name='icon-input-act-md-5']:checked").val(),
      q6: $("input[name='icon-input-act-md-6']:checked").val(),
      q7: $("input[name='icon-input-act-md-7']:checked").val(),
      q8: $("input[name='icon-input-act-md-8']:checked").val(),
      q9: $("input[name='icon-input-act-md-9']:checked").val(),
      q10: $("input[name='icon-input-act-md-10']:checked").val(),
      q11: $("input[name='icon-input-act-md-11']:checked").val(),
      q12: $("input[name='icon-input-act-md-12']:checked").val(),
      q13: $("input[name='icon-input-act-md-13']:checked").val(),
      q14: $("input[name='icon-input-act-md-14']:checked").val(),
      q15: $("input[name='icon-input-act-md-15']:checked").val(),
      q16: $("input[name='icon-input-act-md-16']:checked").val(),
      q17: $("input[name='icon-input-act-md-17']:checked").val(),
      q18: $("input[name='icon-input-act-md-18']:checked").val(),
      q19: $("input[name='icon-input-act-md-19']:checked").val(),
      q20: $("input[name='icon-input-act-md-20']:checked").val(),
      q21: $("input[name='icon-input-act-md-21']:checked").val(),
      q22: $("input[name='icon-input-act-md-22']:checked").val(),
      q23: $("input[name='icon-input-act-md-23']:checked").val(),
      q24: $("input[name='icon-input-act-md-24']:checked").val(),
      q25: $("input[name='icon-input-act-md-25']:checked").val(),
      q26: $("input[name='icon-input-act-md-26']:checked").val(),
      q27: $("input[name='icon-input-act-md-27']:checked").val(),
      q28: $("input[name='icon-input-act-md-28']:checked").val(),
      q29: $("input[name='icon-input-act-md-29']:checked").val(),
      q30: $("input[name='icon-input-act-md-30']:checked").val(),
      q31: $("input[name='icon-input-act-md-31']:checked").val()
    }
    var jxr = $.post(conf.api + 'actor?stage=set_action_draft', param , function(){})
               .always(function(resp){ console.log(resp); })
  },
  save_action_6(){
    $check = 0
    $('.form-control').removeClass('dn')
    if($('#txtDD6').val() == ''){ $check++; $('#txtDD6').addClass('is-invalid')}
    if($('#txtMM6').val() == ''){ $check++; $('#txtMM6').addClass('is-invalid')}
    if($('#txtYY6').val() == ''){ $check++; $('#txtYY6').addClass('is-invalid')}
    if($('#txtHH6').val() == ''){ $check++; $('#txtHH6').addClass('is-invalid')}
    if($('#txtMIN6').val() == ''){ $check++; $('#txtMIN6').addClass('is-invalid')}
    if($check != 0){
      $('html,body').animate({ scrollTop: 0 }, 'slow'); return ;
      return ;
    }

    $('#modalConfirmsending').modal({backdrop: 'static', keyboard: false})
    $('#txtSendComplication').val('6')
  },
  getMaternalDeathCauseAll(group_id){
    preload.show()
    var param = {
      group_id: group_id
    }
    var jxr = $.post(conf.api + 'actor?stage=get_maternal_cause_all', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   $('#maternalGroup1').empty()
                   snap.forEach(i=>{
                     $select = ''
                     $bg = 'style="background: rgb(240, 240, 240);"'
                     if(i.ICDSelecable == '1'){
                       $bg = ''
                       $select = '<div class="form-group col-12 col-sm-6 mb-0">' +
                         '<label class="custom-switch mt-2 pl-0">' +
                           '<input type="checkbox" name="md-cause-' + i.ID + '" class="custom-switch-input" data-role="none" onclick="setMdCause(\'' + i.ID + '\', \'' + i.ICDcode + '\', \'' + i.ICDGroup + '\', \'' + i.ICDDesc + '\')">' +
                           '<span class="custom-switch-indicator"><i class="fas fa-check"></i></span>' +
                         '</label>' +
                       '</div>'

                       $('#maternalGroup1').append('<tr ' + $bg + '>' +
                         '<td style="width: 80px;">' +
                            $select +
                         '</td>' +
                         '<td>' +
                           '<div class="" style="font-weight: 400;">ICD : <span class="text-danger">' + i.ICDcode + '</span></div>' +
                           '<h5>' + i.ICDDesc + '</h5>' +
                         '</td>' +
                       '</tr>')
                     }

                   })

                   setTimeout(function(){
                     getMdCause(group_id)
                   }, 1000)
                 }
               })
  },
  getComplicationList(){
    // Element complication_action_list
    var param = { uid: current_user, role: current_role, hn: current_hn}
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_complication_action', param , function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   $('#complication_action_list').empty()
                   snap.forEach(i=>{
                     $('#complication_action_list').append(i.cmd)
                   })
                 }
               })
  },
  checkNumActor(){
    if(current_role == 'administrator'){

      actor.checkComplicationActor('maternaldeath', 'textMd')
      actor.checkComplicationActor('stillbirth', 'textStill')

      actor.checkAdmissionActor()
      actor.checkDeliveryActor()
      actor.checkBirthActor()
      actor.checkLiveActor()
    }
  },
  checkComplicationActor(comp, ele){
    var param = { uid: current_user, role: current_role, hn: current_hn, complication: comp }
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_complication_dashboard', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     $('#' + ele + '1').html(i.resp_1)
                     $('#' + ele + '2').html(i.resp_2)
                     $('#' + ele + '3').html(i.resp_3)
                     $('#' + ele + '4').html(i.resp_4)
                   })
                 }
               })
  },
  checkDeliveryActor(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_delivery', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   $c = 1;
                   snap.forEach(i=>{
                     $('#textDelivery1').html(i.del_1)
                     $('#textDelivery2').html(i.del_2)
                     $('#textDelivery3').html(i.del_3)
                     $('#textDelivery4').html(i.del_4)
                     $c++;
                   })
                 }
               })
  },
  checkAdmissionActor(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_admission', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   $c = 1;
                   snap.forEach(i=>{
                     $('#textAdmit1').html(i.adm_1)
                     $('#textAdmit2').html(i.adm_2)
                     $('#textAdmit3').html(i.adm_3)
                     $('#textAdmit4').html(i.adm_4)
                     $c++;
                   })
                 }
               })
  },
  checkBirthActor(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_birth', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   $c = 1;
                   snap.forEach(i=>{
                     $('#textBirth1').html(i.birth_1)
                     $('#textBirth2').html(i.birth_2)
                     $('#textBirth3').html(i.birth_3)
                     $('#textBirth4').html(i.birth_4)
                     $c++;
                   })
                 }
               })
  },
  checkLiveActor(){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn
    }
    var jxr = $.post(conf.api + 'actor_statistic?stage=get_livebirth', param , function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if(fnc.json_exist(snap)){
                   $c = 1;
                   snap.forEach(i=>{
                     $('#textLiveBirth1').html(i.lbirth_1)
                     $('#textLiveBirth2').html(i.lbirth_2)
                     $('#textLiveBirth3').html(i.lbirth_3)
                     $('#textLiveBirth4').html(i.lbirth_4)
                     $c++;
                   })
                 }
               })
  }
}

function showNonactModal(comp, daystage){
  // $('#nonactRecordModal').modal()
  preload.show()
  var param = {
    uid: current_user,
    role: current_role,
    hn: current_hn,
    complication: comp,
    daystatus: daystage
  }
  var jxr = $.post(conf.api + 'actor_statistic?stage=get_nonact_record', param , function(){}, 'json')
             .always(function(snap){
               console.log(snap);
               if(fnc.json_exist(snap)){
                 $('#nonactRecordResult').empty()
                 snap.forEach(i=>{
                   $sta = 'Wait for response'
                   if(i.status == '2'){
                     $sta = 'Acted'
                   }
                   $data = '<tr>' +
                              '<td><strong>' + i.rc_hn + '</strong></td>' +
                              '<td>' +
                                '<div>' +
                                  'Admission : ' + i.dateadm + ' ' + i.timeadm +
                                '</div>' +
                              '</td>' +
                              '<td>' + $sta + '</td>' +
                              '<td><button class="btn btn-icon btn-secondary text-white btn-sm" type="button" onclick="gotoActorData(\'' + i.rc_hn + '\')"><i class="fas fa-search"></i></button></td>' +
                           '</tr>'
                   $('#nonactRecordResult').append($data)
                 })
                 $('#nonactRecordModal').modal()
                 preload.hide()
               }else{
                 $('#nonactRecordResult').html('<tr><td colspan="4" class="text-center">No record found.</td></tr>')
                 $('#nonactRecordModal').modal()
               }
             })
}

function showRecordModal(comp){
  preload.show()
  var param = {
    uid: current_user,
    role: current_role,
    hn: current_hn,
    complication: comp
  }
  var jxr = $.post(conf.api + 'actor_statistic?stage=get_monthly_record', param , function(){}, 'json')
             .always(function(snap){
               console.log(snap);
               if(fnc.json_exist(snap)){
                 $('#allRecordResult').empty()
                 snap.forEach(i=>{
                   $sta = 'Wait for response'
                   if(i.status == '2'){
                     $sta = 'Acted'
                   }
                   $data = '<tr>' +
                              '<td><strong>' + i.rc_hn + '</strong></td>' +
                              '<td>' +
                                '<div>' +
                                  'Admission : ' + i.dateadm + ' ' + i.timeadm +
                                '</div>' +
                              '</td>' +
                              '<td>' + $sta + '</td>' +
                              '<td><button class="btn btn-icon btn-secondary text-white btn-sm" type="button" onclick="gotoActorData(\'' + i.rc_hn + '\')"><i class="fas fa-search"></i></button></td>' +
                           '</tr>'
                   $('#allRecordResult').append($data)
                 })
                 $('#allRecordModal').modal()
                 preload.hide()
               }else{
                 $('#allRecordResult').html('<tr><td colspan="4" class="text-center">No record found.</td></tr>')
                 $('#allRecordModal').modal()
               }
             })

}

function getPrevAction(x){
  if(x == 6){
    var param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      complication: x
    }
    var jxr = $.post(conf.api + 'actor?stage=get_action_info', param , function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     if((i.mda_date != null) && (i.mda_date != '0000-00-00')){
                       $b = i.mda_date.split('-')
                       $('#txtDD6').val($b[2]); $('#txtMM6').val($b[1]); $('#txtYY6').val($b[0])
                     }
                     if(i.mda_time != null){
                       $b = i.mda_time.split(':')
                       $('#txtHH6').val($b[0])
                       $('#txtMIN6').val($b[1])
                     }
                     $('input[name=icon-input-act-md-1][value=' + i.mda_antibiotic + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-2][value=' + i.mda_oxytocics + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-3][value=' + i.mda_anticonvulsant + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-4][value=' + i.mda_rpcp + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-5][value=' + i.mda_rp + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-6][value=' + i.mda_vaginal_delivery + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-7][value=' + i.mda_cesarean + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-8][value=' + i.mda_blood_trans + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-9][value=' + i.mda_hysterectomy + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-10][value=' + i.mda_other_surgeries + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-11][value=' + i.mda_intubation + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-12][value=' + i.mda_cardiopulmonary + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-13][value=' + i.mda_diagnosis_1 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-14][value=' + i.mda_diagnosis_2 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-15][value=' + i.mda_diagnosis_3 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-16][value=' + i.mda_diagnosis_4 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-17][value=' + i.mda_diagnosis_5 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-18][value=' + i.mda_diagnosis_6 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-19][value=' + i.mda_diagnosis_7 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-20][value=' + i.mda_diagnosis_8 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-21][value=' + i.mda_diagnosis_9 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-22][value=' + i.mda_limit_1 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-23][value=' + i.mda_limit_2 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-24][value=' + i.mda_limit_3 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-25][value=' + i.mda_limit_4 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-26][value=' + i.mda_action_1 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-27][value=' + i.mda_action_2 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-28][value=' + i.mda_action_3 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-29][value=' + i.mda_action_4 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-30][value=' + i.mda_action_5 + ']').prop('checked', true)
                     $('input[name=icon-input-act-md-31][value=' + i.mda_action_6 + ']').prop('checked', true)
                   })
                 }
               })
  }
}

function getMdCause(group){
  var param = {
    uid: current_user,
    role: current_role,
    hn: current_hn,
    icd_group: group,
    complication: '6'
  }
  var jxr = $.post(conf.api + 'actor?stage=get_complication_icd', param , function(){}, 'json')
             .always(function(snap){
               if(fnc.json_exist(snap)){
                 $('#textMdCause_' + group).removeClass('dn')
                 $('#textMdCauseList_' + group).empty()
                 if(group == '1'){
                   $('input[name=icon-input-act-md-13][value=1]').prop('checked', true)
                   $('.obstatricDiv').addClass('dn')
                 }

                 snap.forEach(i=>{
                   $('#textMdCauseList_' + group).append('<div><span class="badge badge-danger" onclick="deleteMdCause(' + i.ID + ', \'' + group + '\')" style="cursor: pointer;"><i class="fas fa-times"></i></span> <span class="badge badge-primary">' + i.cmp_icd + '</span> ' + i.comp_name + '</div>')
                   $('input[name=md-cause-' + i.cmp_id + ']').prop('checked', true)
                 })
                 preload.hide()
               }else{
                 $('#textMdCauseList_' + group).empty()
                 $('#textMdCause_' + group).addClass('dn')
                 preload.hide()
               }
             })
}

function deleteMdCause(id, group){
  var param = {
    uid: current_user,
    role: current_role,
    comp_id: id
  }
  var jxr = $.post(conf.api + 'actor?stage=delete_complication_icd', param , function(){})
             .always(function(resp){
               console.log(resp);
               if(resp == 'Y'){
                 getMdCause(group)
               }
             })
}

function setMdCause(id, code, group, name){
  var param = {
    uid: current_user,
    role: current_role,
    hn: current_hn,
    complication: '6',
    name: name,
    icd_code: code,
    icd_group: group,
    status: 'pop',
    id: id
  }

  if($('input[name=md-cause-' + id + ']').is(":checked")){
    param = {
      uid: current_user,
      role: current_role,
      hn: current_hn,
      complication: '6',
      name: name,
      icd_code: code,
      icd_group: group,
      status: 'push',
      id: id
    }
  }

  var jxr = $.post(conf.api + 'actor?stage=set_complication_icd', param , function(){})
             .always(function(resp){
               console.log(resp);
               if(resp == 'Y'){
                 getMdCause(group)
               }
             })
}

$(function(){
  $('input[name=icon-input-act-md-13]').click(function(){
    if($(this).val() == '1'){
      $('.obstatricDiv').addClass('dn')
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(1)
    }else{
      $causeInfo = $('#textMdCauseList_1').html()
      if($causeInfo != ''){
        swal({
          title: "Are you sure?",
          text: "Your recorded cause will be delete.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          closeOnConfirm: true
        },
        function(isConfirm){
          if (isConfirm) {
              $('#textMdCause_1').addClass('dn')
              $('.obstatricDiv').removeClass('dn')
          }else{
              $('input[name=icon-input-act-md-13][value=1]').prop('checked', true)
              $('input[name=icon-input-act-md-13]').addClass('dn')
              setTimeout(function(){ $('input[name=icon-input-act-md-13]').removeClass('dn') }, 5000)
          }
        });
      }else{
        $('.obstatricDiv').removeClass('dn')
      }
    }
  })

  $('input[name=icon-input-act-md-14]').click(function(){
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(2)
    }else{
      $causeInfo = $('#textMdCauseList_2').html()
      console.log($causeInfo);
      if($causeInfo != ''){
        swal({
          title: "Are you sure?",
          text: "Your recorded cause will be delete.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          closeOnConfirm: true
        },
        function(isConfirm){
          if (isConfirm) {
              $('#textMdCause_2').addClass('dn')
          }else{
              $('input[name=icon-input-act-md-14][value=1]').prop('checked', true)
              $('input[name=icon-input-act-md-14]').addClass('dn')
              setTimeout(function(){ $('input[name=icon-input-act-md-14]').removeClass('dn') }, 5000)
          }
        });
      }
    }
  })

  $('input[name=icon-input-act-md-15]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(3)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-16]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(4)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-17]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(5)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-18]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(6)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-19]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(7)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-20]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(8)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })

  $('input[name=icon-input-act-md-21]').click(function(){
    console.log('a');
    if($(this).val() == '1'){
      $('#modalMaternalGroup1').modal({backdrop: 'static', keyboard: false})
      actor.getMaternalDeathCauseAll(9)
    }else{
      // $('.obstatricDiv').removeClass('dn')
    }
  })



})
