var authen = {
  user(){
    var param = {
      uid: current_user
    }

    var jxr = $.post(conf.api + 'authen?stage=current_user', param , function(){}, 'json')
              .always(function(snap){
                console.log(snap);
                if(fnc.json_exist(snap)){
                  snap.forEach(i=>{
                    $('.textUserFullname').text(i.fname + ' ' + i.lname)
                    $('#txtFnameProfile').val(i.fname);
                    $('#txtLnameProfile').val(i.lname);
                    if(i.institution != null){ $('.textUserInstitution').text(i.institution); $('#txtInstitutionProfile').val(i.institution); }
                    if(i.primary_phone != null){ $('.textUserPhone').text(i.primary_phone); $('#txtPhoneProfile').val(i.primary_phone);}
                    if(i.primary_email != null){ $('.textUserEmail').text(i.primary_email); $('#txtEmailProfile').val(i.primary_email); }

                    if(i.province != null){ $('.textUserProvince').text(i.province) }
                    if(i.district != null){ $('.textUserDistrict').text(i.district) }
                    if(i.subdistrict != null){ $('.textUserSubdistrict').text(i.subdistrict) }
                    if(i.profile_img_url != null){ $('#profileImg').html('<img src="' + i.profile_img_url + '" alt="" class="img-fluid img-circle">') }



                    if(i.role == '4'){
                      $('.textUserRole').text('ผู้ใช้งานทั่วไป')
                    }else if(i.role == '3'){
                      $('.textUserRole').text('ผู้ใช้งานระดับจังหวัด')
                    }else if(i.role == '2'){
                      $('.textUserRole').text('ผู้ใช้งานส่วนกลาง')
                    }else if(i.role == '1'){
                      $('.textUserRole').text('ผู้ดูแลระบบ')
                    }

                    $('#txtProvince').val(i.primary_province)
                    iw.get_district()
                    setTimeout(function(){
                      $('#txtDistrict').val(i.primary_district)
                      iw.get_subdistrict()
                      setTimeout(function(){
                        $('#txtSubdistrict').val(i.primary_subdistrict)
                      }, 500)
                    }, 500)

                  })
                }
              })
  },
  updateEmail(){
    $('.form-control').removeClass('is-invalid')
    $check = 0
    if($('#txtEmailProfile').val() == ''){
      $check++
      $('#txtEmailProfile').addClass('is-invalid')
    }
    if($check != 0){
      return ;
    }
    var param = {
      uid: current_user,
      email: $('#txtEmailProfile').val()
    }
    $('.modal').modal('hide')
    preload.show()
    var jxr = $.post(conf.api + 'authen?stage=updateEmail', param , function(){})
              .always(function(resp){
                if(resp == 'Y'){
                  authen.user()
                  $('.form-control').removeClass('is-invalid')
                  setTimeout(function(){ preload.hide() }, 1000)
                }else if(resp == 'D'){
                  preload.hide()
                  $('#notify2Modal').modal()
                }else{
                  preload.hide()
                  $('#notify1Modal').modal()
                }
              })
  },
  updatePassword(){
    $('.form-control').removeClass('is-invalid')
    $check = 0
    if($('#txtNewpassword').val() == ''){
      $check++
      $('#txtNewpassword').addClass('is-invalid')
    }
    if($check != 0){
      return ;
    }
    var param = {
      uid: current_user,
      password: $('#txtNewpassword').val()
    }
    $('.modal').modal('hide')
    preload.show()
    var jxr = $.post(conf.api + 'authen?stage=updatePassword', param , function(){})
              .always(function(resp){
                console.log(resp);
                if(resp == 'Y'){
                  preload.hide()
                  $('#notifySuccessModal').modal()
                }else{
                  preload.hide()
                  $('#notify1Modal').modal()
                }
              })
  },
  updatePhone(){
    $('.form-control').removeClass('is-invalid')
    $check = 0
    if($('#txtPhoneProfile').val() == ''){
      $check++
      $('#txtPhoneProfile').addClass('is-invalid')
    }
    if($check != 0){
      return ;
    }
    var param = {
      uid: current_user,
      phone: $('#txtPhoneProfile').val()
    }
    $('.modal').modal('hide')
    preload.show()
    var jxr = $.post(conf.api + 'authen?stage=updatePhone', param , function(){})
              .always(function(resp){
                console.log(resp);
                if(resp == 'Y'){
                  authen.user()
                  $('.form-control').removeClass('is-invalid')
                  setTimeout(function(){ preload.hide() }, 1000)
                }else if(resp == 'D'){
                  preload.hide()
                  $('#notify2Modal').modal()
                }else{
                  preload.hide()
                  $('#notify1Modal').modal()
                }
              })
  },
  updateFullname(){
    $('.form-control').removeClass('is-invalid')
    $check = 0
    if($('#txtFnameProfile').val() == ''){
      $check++
      $('#txtFnameProfile').addClass('is-invalid')
    }

    if($('#txtLnameProfile').val() == ''){
      $check++
      $('#txtLnameProfile').addClass('is-invalid')
    }

    if($check != 0){
      return ;
    }

    var param = {
      uid: current_user,
      fname: $('#txtFnameProfile').val(),
      lname: $('#txtLnameProfile').val()
    }

    $('.modal').modal('hide')

    preload.show()

    var jxr = $.post(conf.api + 'authen?stage=updateFullname', param , function(){})
              .always(function(resp){
                console.log(resp);
                if(resp == 'Y'){
                  authen.user()
                  $('.form-control').removeClass('is-invalid')
                  setTimeout(function(){ preload.hide() }, 1000)
                }else{
                  preload.hide()
                  $('#notify1Modal').modal()
                }
              })
  },
  updateInstitution(){
    $('.form-control').removeClass('is-invalid')
    $check = 0
    if($('#txtInstitutionProfile').val() == ''){
      $check++
      $('#txtInstitutionProfile').addClass('is-invalid')
    }

    if($('#txtProvince').val() == ''){
      $check++
      $('#txtProvince').addClass('is-invalid')
    }

    if($('#txtDistrict').val() == ''){
      $check++
      $('#txtDistrict').addClass('is-invalid')
    }

    if($('#txtSubdistrict').val() == ''){
      $check++
      $('#txtSubdistrict').addClass('is-invalid')
    }

    if($check != 0){
      return ;
    }

    var param = {
      uid: current_user,
      insitution: $('#txtInstitutionProfile').val(),
      province: $('#txtProvince').val(),
      district: $('#txtDistrict').val(),
      subdistrict: $('#txtSubdistrict').val()
    }

    $('.modal').modal('hide')

    preload.show()

    var jxr = $.post(conf.api + 'authen?stage=updateInstitution', param , function(){})
              .always(function(resp){
                console.log(resp);
                if(resp == 'Y'){
                  authen.user()
                  $('.form-control').removeClass('is-invalid')
                  setTimeout(function(){ preload.hide() }, 1000)
                }else{
                  preload.hide()
                  $('#notify1Modal').modal()
                }
              })
  },
  signout(){
    window.localStorage.removeItem(conf.prefix + 'uid')
    window.localStorage.removeItem(conf.prefix + 'role')
    window.location = '../index'
  }
}
