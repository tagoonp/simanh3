var report = {
  getSummaryByHosp(cat, is_hl){
    if(cat == 1){
      var param = {
        uid: current_user,
        role: current_role,
        hosp: current_hosp
      }
      var jxr = $.post(conf.api + 'report?stage=summary_by_hosp_1', param , function(){})
                 .always(function(resp){
                   if(resp != ''){
                     $('#tableCommonIndictorByHospInside').html(resp)
                   }
                 })
    }else if(cat == 2){
      var param = {
        uid: current_user,
        role: current_role,
        hosp: current_hosp
      }
      var jxr = $.post(conf.api + 'report?stage=summary_by_hosp_2', param , function(){})
                 .always(function(resp){
                   // console.log(resp);
                   if(resp != ''){
                     $('#tableComplicationIndictorByHospInside').html(resp)
                   }
                 })
    }
  },
  getSummary(cat, is_hl){
    if(cat == 1){
      var param = {
        uid: current_user,
        role: current_role
      }
      var jxr = $.post(conf.api + 'report?stage=summary_1', param , function(){})
                 .always(function(resp){
                   if(resp != ''){
                     $('#tableCommonIndictor').html(resp)
                   }
                 })
    }else if(cat == 2){
      var param = {
        uid: current_user,
        role: current_role
      }
      var jxr = $.post(conf.api + 'report?stage=summary_2', param , function(){})
                 .always(function(resp){
                   if(resp != ''){
                     $('#tableComplicationIndictor').html(resp)
                   }
                 })
    }
  }
}

function viewIndicatorStatInfo(comp_id, hcode){
  window.localStorage.setItem(conf.prefix + 'hosp', hcode)
  window.location = 'core_stat_info.html'
}
