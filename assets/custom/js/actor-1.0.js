var actor = {
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
                     }
                     $('#maternalGroup1').append('<tr ' + $bg + '>' +
                       '<td style="width: 80px;">' +
                          $select +
                       '</td>' +
                       '<td>' +
                         '<div class="" style="font-weight: 400;">ICD : <span class="text-danger">' + i.ICDcode + '</span></div>' +
                         '<h5>' + i.ICDDesc + '</h5>' +
                       '</td>' +
                     '</tr>')
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
                   $('#textMdCauseList_' + group).append('<div><span class="badge badge-danger"><i class="fas fa-times"></i></span> <span class="badge badge-primary">' + i.cmp_icd + '</span> ' + i.comp_name + '</div>')
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
      $('.obstatricDiv').removeClass('dn')
      // $('input[name=icon-input-act-md-14][value=na]').prop('checked', true)
      // $('input[name=icon-input-act-md-15][value=na]').prop('checked', true)
      // $('input[name=icon-input-act-md-16][value=na]').prop('checked', true)
      // $('input[name=icon-input-act-md-17][value=na]').prop('checked', true)
      // $('input[name=icon-input-act-md-18][value=na]').prop('checked', true)
      // $('#txtQ21_40').val('')
    }
  })
})
