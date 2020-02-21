$(function(){



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

    if($check != 0){ return ; }

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

function gotoAddnewData(){
  window.localStorage.setItem(conf.prefix + 'hn', $('#txtHn1').val())
  window.location = 'core_entry.html'
}
