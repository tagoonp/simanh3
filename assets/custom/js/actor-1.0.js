var actor = {
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
                              '<td><button class="btn btn-icon btn-secondary text-white btn-sm" type="button"><i class="fas fa-search"></i></button></td>' +
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
                              '<td><button class="btn btn-icon btn-secondary text-white btn-sm" type="button"><i class="fas fa-search"></i></button></td>' +
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
