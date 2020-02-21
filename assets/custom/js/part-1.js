$(function(){
  $('input[name=icon-input-sex]').click(function(){
      if($(this).val() == 'F'){
          $('.hdSex').removeClass('dn')
      }else{
          $('.hdSex').addClass('dn')
          $('.hdQ2').addClass('dn')
          $('input[name=icon-input-preg][value=0]').prop('checked', true);
          $('#txtQ2').val('')

      }
  })

  $('.ageElement').change(function(){
      $dd = $('#txtDD').val()
      $mm = $('#txtMM').val()
      $yy = $('#txtYY').val()
      if(($dd != '') && ($mm != '') && ($yy != '')){
          $dob = $yy + $mm + $dd;
          // console.log($dob);
          $age = moment().diff(moment($dob, 'YYYYMMDD'), 'years')
          // console.log($age);
          if(Number.isNaN($age)){
              $('#txtMM').val('')
              $('#txtMM').addClass('is-invalid')
              swal("เกิดข้อผิดพลาด!", "ท่านเลือกเดือนไม่ถูกต้อง!", "error")
              $('#txtAge').val('')
          }else{
              $('#txtMM').removeClass('is-invalid')
              $('#txtAge').val($age)
          }
      }
  })

  $('input[name=icon-input-preg]').click(function(){
      if($(this).val() == '1'){
          $('.hdQ2').removeClass('dn')
          $('#txtQ2').focus()
      }else{
          $('.hdQ2').addClass('dn')
          $('#txtQ2').val('')

      }
  })

  $('input[name=icon-input-q5]').click(function(){
      if($(this).val() == '99'){
          $('.hdQ5').removeClass('dn')
          $('#txtQ5').focus()
      }else{
          $('.hdQ5').addClass('dn')
          $('#txtQ5').val('')

      }
  })


})
