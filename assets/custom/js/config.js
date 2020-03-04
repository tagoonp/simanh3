// var conf = {
//     domain: 'http://localhost/simanh3/',
//     api: 'http://localhost/simanh3/controller/',
//     prefix: 'sm6xr_',
//     current_version: '1.0.0',
//     device: 'web',
//     // devide: 'mobile'
//     // mail_user: 'rmismedpsu@gmail.com',
//     // mail_key: 'cm1pc21lZHBzdUBnbWFpbC5jb20yMDE5LTEwLTIyIDIxOjU4OjU3MTI0LjEyMi40Mi4yNDU=',
// }

var conf = {
    domain: 'http://simanh.psu.ac.th/simanh3/',
    api: 'http://simanh.psu.ac.th/simanh3/controller/',
    prefix: 'sm6xr_',
    current_version: '1.0.0',
    device: 'web',
    // devide: 'mobile'
    // mail_user: 'rmismedpsu@gmail.com',
    // mail_key: 'cm1pc21lZHBzdUBnbWFpbC5jb20yMDE5LTEwLTIyIDIxOjU4OjU3MTI0LjEyMi40Mi4yNDU=',
}
var current_user = window.localStorage.getItem(conf.prefix + 'uid')
var current_role = window.localStorage.getItem(conf.prefix + 'role')
var current_hn = window.localStorage.getItem(conf.prefix + 'hn')

// checkVersion
// var versionJxr = $.post(conf.api + 'checkversion', function(){})
//                   .always(function(resp){
//                     if(resp != conf.current_version){
//                       $('#modalVersion').modal()
//                     }
//                   })

var thmonth = new Array ("", "มกราคม","กุมภาพันธ์","มีนาคม",
"เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
"ตุลาคม","พฤศจิกายน","ธันวาคม");

var thmonth_sh = new Array ("", "ม.ค.","ก.พ.","มี.ค.",
"เม.ย.","พ.ค.","มิ.ย.", "ก.ค.","ส.ค.","ก.ย.",
"ต.ค.","พ.ย.","ธ.ค.");

var enmonth = new Array ("", "January","February","March",
"April","May","June", "July","August","September",
"October","November","December");

var enmonth_sh = new Array ("", "Jan","Feb","Mar",
"Apr","May","Jun", "Jul","Aug","Sep",
"Oct","Nov","Dec");

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() + '-' +
               pad2(this.getMonth() + 1) + '-' +
               pad2(this.getDate()) + ' ' +
               pad2(this.getHours()) + ':' +
               pad2(this.getMinutes()) + ':' +
               pad2(this.getSeconds());
    }
});

Object.defineProperty(Date.prototype, 'YYYY', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear();
    }
});

Object.defineProperty(Date.prototype, 'YYYYMMDD', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() + '-' +
               pad2(this.getMonth() + 1) + '-' +
               pad2(this.getDate());
    }
});

function gotoUpdate(){
  window.location.replace('market://details?id=io.wisnior.dsrrconnect');
}
