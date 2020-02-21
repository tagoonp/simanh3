$(function(){
  $('.registerForm').submit(function(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.btn').blur()
    if($('#txtUsername1').val() == ''){
      $check++; $('#txtUsername1').addClass('is-invalid')
    }
    if($('#txtPassword1').val() == ''){
      $check++; $('#txtPassword1').addClass('is-invalid')
    }
    if($('#txtFname').val() == ''){
      $check++; $('#txtFname').addClass('is-invalid')
    }
    if($('#txtLname').val() == ''){
      $check++; $('#txtLname').addClass('is-invalid')
    }
    if($('#txtInstitution').val() == ''){
      $check++; $('#txtInstitution').addClass('is-invalid')
    }
    if($('#txtProvince').val() == ''){
      $check++; $('#txtProvince').addClass('is-invalid')
    }
    if($('#txtDistrict').val() == ''){
      $check++; $('#txtDistrict').addClass('is-invalid')
    }
    if($('#txtSubdistrict').val() == ''){
      $check++; $('#txtSubdistrict').addClass('is-invalid')
    }
    if($check != 0){
      return ;
    }
    var param = {
      username: $('#txtUsername1').val(),
      password: $('#txtPassword1').val(),
      fname: $('#txtFname').val(),
      lname: $('#txtLname').val(),
      institution: $('#txtInstitution').val(),
      province: $('#txtProvince').val(),
      district: $('#txtDistrict').val(),
      subdistrict: $('#txtSubdistrict').val()
    }
    var jxr = $.post(conf.api + 'authen?stage=register', param, function(){}, 'json')
               .always(function(snap){
                 if((snap != '') && (snap.length > 0)){
                   snap.forEach(i=>{
                     if(i.status = 'Success'){
                       window.localStorage.setItem(conf.prefix + 'uid', i.uid)
                       window.localStorage.setItem(conf.prefix + 'role', i.role)
                       window.localStorage.setItem(conf.prefix + 'province', $('#txtProvince').val())
                       window.location = './' + i.role + '/index.html'
                     }else{
                       preload.hide()
                       $('#notifyRegisterfailModal').modal()
                     }
                   })
                 }else{
                   preload.hide()
                   $('#notifyRegisterfailModal').modal()
                 }
               })
  })
})
