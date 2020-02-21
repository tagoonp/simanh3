var iw = {
  get_province(){
      var jxr = $.post(conf.api + 'core/province?stage=get', function(){}, 'json')
                 .always(function(snap){
                   // console.log(snap);
                   if(fnc.json_exist(snap)){
                       snap.forEach(i=>{
                         $('.txtProvince').append('<option value="' + i.Changwat + '">' + i.Name + '</option>')
                       })
                   }
                 })
  },
  get_province2(){
      var jxr = $.post(conf.api + 'core/province?stage=get', function(){}, 'json')
                 .always(function(snap){
                   // console.log(snap);
                   if(fnc.json_exist(snap)){
                       snap.forEach(i=>{
                         $('.txtProvince').append('<option value="' + i.Changwat + '">' + i.Name + '</option>')
                       })
                   }
                 })
  },
  get_district(){
    var param = {
      prov: $('#txtProvince').val()
    }
    $('#txtSubdistrict').html('<option value="" class="text-center">-- เลือกตำบล --</option>')
    var jxr = $.post(conf.api + 'core/district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                  if(fnc.json_exist(snap)){
                      $('#txtDistrict').html('<option value="" class="text-center">-- เลือกอำเภอ --</option>')
                      snap.forEach(i=>{
                          $('#txtDistrict').append('<option value="' + i.Ampur + '">' + i.Name + '</option>')
                      })
                  }
              })
  },
  get_district2(prov, next_ele){
    var param = {
      prov: prov
    }
    $('.txtSubDistrict').html('<option value="" class="text-center">-- เลือกตำบล --</option>')
    var jxr = $.post(conf.api + 'core/district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                  if(fnc.json_exist(snap)){
                      $('#' + next_ele).html('<option value="" class="text-center">-- เลือกอำเภอ --</option>')
                      snap.forEach(i=>{
                          $('#' + next_ele).append('<option value="' + i.Ampur + '">' + i.Name + '</option>')
                      })
                  }
              })
  },
  get_subdistrict(){
    var param = {
      prov: $('#txtProvince').val(),
      dist: $('#txtDistrict').val()
    }
    var jxr = $.post(conf.api + 'core/sub_district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                // console.log(snap);
                $('#txtSubdistrict').html('<option value="" class="text-center">-- เลือกตำบล --</option>')
                if(fnc.json_exist(snap)){
                    snap.forEach(i=>{
                        $('#txtSubdistrict').append('<option value="' + i.Tumbon + '">' + i.Name + '</option>')
                    })
                }
              })
  },
  get_subdistrict2(prov, dist, next_ele){
    var param = {
      prov: prov,
      dist: dist
    }
    var jxr = $.post(conf.api + 'core/sub_district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                // console.log(snap);
                $('#' + next_ele).html('<option value="" class="text-center">-- เลือกตำบล --</option>')
                if(fnc.json_exist(snap)){
                    snap.forEach(i=>{
                        $('#' + next_ele).append('<option value="' + i.Tumbon + '">' + i.Name + '</option>')
                    })
                }
              })
  }
}

var fnc = {
    json_exist(snap){
      if((snap != '') && (snap.length > 0)){
          return true;
      }else{
          return false;
      }
    },
    setDateInput(ele){
        for($i = 1; $i <= 31 ; $i++){
            if($i < 10){
                $(ele).append('<option value="' + '0' + $i + '">' + $i + '</option>')
            }else{
                $(ele).append('<option value="' + $i + '">' + $i + '</option>')
            }
        }
    },
    setMonthInput(ele){
        $c = 0
        thmonth.forEach(element => {
            if($c != 0){
                $i = $c
                if($c < 10){
                    $i = '0' + $c ;
                }
                $(ele).append('<option value="' + $i + '">' + element + '</option>')
            }
            $c++
        });

    },
    setYearInput(ele){
        $cyear = parseInt(this.get_current_year() - 10)

        for($i = $cyear; $i >= ($cyear - 100) ; $i--){
            $(ele).append('<option value="' + $i + '">' + ($i + 543) + '</option>')
        }
    },
    setHourInput(ele){
      for($i = 0; $i <= 23 ; $i++){
        $data = $i
        if($i < 10){
          $data = '0' + $i
        }
          $(ele).append('<option value="' + $data + '">' + $data + '</option>')
      }
    },
    setMinInput(ele){
      for($i = 0; $i <= 59 ; $i++){
        $data = $i
        if($i < 10){
          $data = '0' + $i
        }
          $(ele).append('<option value="' + $data + '">' + $data + '</option>')
      }
    },
    get_current_datetime(){
        var cdatetime = new Date().YYYYMMDDHHMMSS();
        return cdatetime;
    },
    get_current_date(){
        var cdate = new Date().YYYYMMDD();
        return cdate;
    },
    get_current_year(){
        var cyear = new Date().YYYY();
        return cyear;
    }
}

let app = {
    takephoto: function(){

      let opts = {
          quality: 60,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          mediaType: Camera.MediaType.PICTURE,
          encodingType: Camera.EncodingType.JPEG,
          cameraDirection: Camera.Direction.BACK,
          targetWidth: 400,
          targetHeight: 400,
          allowEdit: true
      };

      navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function(imgURI){
      var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imgURI.substr(imgURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;

            options.params = {
                uid: current_user
            }

      var ft = new FileTransfer();
      ft.upload(imgURI, encodeURI(conf.api + "upload_profile"), win, fail, options);
    },
    wtf: function(msg){
        swal("ขออภัย!", "ไม่สามารถใช้งานฟังก์ชันนี้ได้", "error")
    }
};

$(function(){
  $('#btnDocument').click(function(){
    // window.open('https://iw.in.th/documentation/iw_p2_documentation.pdf', target="_blank")
    if(conf.os == 'android'){
      navigator.app.loadUrl("https://iw.in.th/documentation/iw_p2_documentation.pdf", {openExternal : true});
    }

  })
})

function win(r) {
    // iw.get_form_status(2, current_cid)
    // iw.getPhoto(current_cid)
    // alert(JSON.stringify(r))
    authen.user()
    // swal("สำเร็จ", "ภาพถ่ายได้ถูกบันทึกแล้ว", "success")
}

function fail(error) {
    // alert("An error has occurred: Code = " + error.code);
    // alert(JSON.stringify(error))
    // alert("upload error source " + error.source);
    // alert("upload error target " + error.target);
    swal("ขออภัย!", "ไม่สามารถบันทึกภาพได้", "error")
}

function active_footer(ft){
  console.log(ft);
  $('.btnFootermenu').removeClass('text-primary')
  $('.btnFootermenu').addClass('text-dark')
  $('#btnFooter-' + ft).removeClass('text-dark')
  $('#btnFooter-' + ft).addClass('text-primary')
}

function slide2(div, reversetrue){
  var reverse = false;
  if(reversetrue != null){
    reverse = reversetrue
  }
  $.mobile.changePage( "#" + div, {
    transition: "slide",
    reverse: reverse,
    changeHash: false
  });
}
