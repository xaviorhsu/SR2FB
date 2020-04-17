$(document).ready(function(){
   var config = {
    apiKey: "AIzaSyCMxRE7-4pn5tSKdbYdcfTK62y6Sr6CS8c",
    authDomain: "chien1-9a5df.firebaseapp.com",
    databaseURL: "https://chien1-9a5df.firebaseio.com",
    projectId: "chien1-9a5df",
    storageBucket: "chien1-9a5df.appspot.com",
    messagingSenderId: "785767490185"
  };
  firebase.initializeApp(config);
/* ---var storageRef = firebase.storage().ref();---------- */	
	stg_device=firebase.storage();
  stg_root_node=stg_device.ref();
/* =====================Send_Recv=================================== */  
$("#btp").click(function() {
		   var ups1=document.getElementById("filep");	var f=ups1.files[0];      
       if (typeof f != "undefined") {
            push_stg(f);  $("#sp0").html("★上傳~成功"); get_stg($("#jpg").val());
        }
   });
/* =====================SendRecv=================================== */
$("#mbt").click(function() {
		   var ups1=document.getElementById("file1");	var f=ups1.files[0];      
       if (typeof f != "undefined") {
            var path=Math.floor((Math.random() * 1000) + 1);      //var path=Math.uuid(3,16);
            var fn="chien1/p"+path+"/"+f.name;
            if ($("#Hpic").val()!=fn) { del_stg($("#Hpic").val()); }
            push_stg(f);  $("#msp0").html("★上傳~成功"); get_stg(fn);
        }
   });
// ----- //  
  db=new Firebase("https://chien1-9a5df.firebaseio.com");
  var msg="",key=""; var likena,p1,p2;                           //alert(pars);
switch (pars) { 
		case "on": 	$('#adm').val("1");	 break;
		case "A":
		case "D":
		case "M": 	$('#ADM').val("1"); pars=pars.toLowerCase();	 break;
				   }
switch (pars)
		{ 
		case "d": {
			$("#dv0,#dvm,#dvq,#table1").hide(); $("#dvd,#table2,#recv,#back").show();
			break; }
		case "m": {
			$("#dv0,#dvd,#dvq,#table1").hide(); $("#dvm,#table2,#recv,#back").show();
			break; }
		case "q": {
			$("#dv0,#dvd,#dvm,#table1,#recv").hide(); $("#dvq,#table2,#back").show();
			break; }
		case "s": {
			$("#dv0").html("<label style='border: 1px solid red;box-shadow:5px 5px 5px yellow;'>排序瀏覽結果</label>"); $("#dvm,#dvq,#dvd,#table2").hide(); $("#table1,#dv0,#dv4,#back").show();  displymsg("0","0");
			break; }
		default : {
			break; }
		}
// ----- //
$('#rd7').click(function(){ $("#t7,#dkey").val(""); $('#f1')[0].reset();$("#pic1").attr("src","image/photo.jpg");$("#btm").val("查詢");
                            $('#dvm table tr td span.sem,#spm3,#table1,#dv4,#back').hide();$('#spm1,#table2').show(); });
$('#rd8').click(function(){ $("#t8").val("");$("#sem :selected").prop("selected",false);$("#dv4").html(""); $("#btm").val("查詢");
                            $('#spm1,#table2,#dvm table tr td span.sem').hide();$('#spm3,#table1,#dv4,#back').show(); });
$('#ck5').click(function(){ if ($("#ck5").is(':checked')) {$("#spd3 label").css("color","purple");$('#t6').show();}
                            else {$("#spd3 label").css("color","transparent");$('#t6').hide();} });
$('#btm').click(function(){
  qur=$("input:radio[name='rdm']:checked").val();  msg="";
  switch (qur)	{
      case "7": {
        switch ($("#btm").val()) {
            case "查詢"    : {  p1 = $("#t7").val(); p2 = "0" ; if (p1=="") alert("請輸入編號"); else displymsg(p1,p2);   break; }
            case "確定修改": {  set_fb($("#dkey").val()); $('#f1')[0].reset(); $("#pic1").attr("src","image/photo.jpg"); $("#msp0").html("《未上傳》");
                                $("#btm").val("查詢");  break; }
        }
      break; }    
      case "8": {
        switch ($("#btm").val()) {
            case "查詢"    : {          
              switch ($("#sem :selected").val())	{
                  case "姓名": { p1 = $("#t8").val(); p2 = "" ; if (p1=="") { msg="姓名欄位不可空白";}      break; }
                  case "性別": { p1 = $("#semx :selected").val(); p2 = "" ;     break; }
                  case "血型": { p1 = $("#semd :selected").val(); p2 = "" ;     break; }
                  case "學歷": { p1 = $("#semh :selected").val(); p2 = "" ;     break; }
                  default    : { p1 = "1" ;           p2 = "1" ;   break; }
                  }
            if (msg!="") alert(msg); else displymsg(p1,p2);      
            break; }
            case "單筆顯示": { var j=0;
              for (var i=1;i<=dno;i++) { if ($("#m"+i).is(':checked')) { $("#m"+i).prop('checked',false);
                $("#t7").val($("#m"+i).attr("name"));$('#dvm table tr td span.sem,#spm3,#table1,#dv4,#back').hide();
                $('#spm1,#table2').show();displymsg($("#m"+i).attr("name"),"0"); j++;  break;}  }         
            break; }
            case "確定修改": {
                 set_fb($("#dkey").val());$('#spm1,#table2').hide();displymsg(p1,p2); $('#spm3,#table1,#dv4,#back').show(); nextstep();                  
            break; }
        }
      break; }
   }
});
// ----- //
$('#rd1').click(function(){ $("#t0").val("");$("#table2 tr td.lb").html("");$("#pic1").attr("src","image/photo.jpg");
                            $('#spq2,#spq3,#table1,#back').hide(); $("#bt0").val("執行");$('#spq1,#dvq,#table2').show(); });
$('#rd2').click(function(){ $("#t1,#t2").val("");$("#dv4").html("");$('#spq1,#spq3,#table2').hide(); $("#bt0").val("執行");$('#spq2,#table1,#dv4,#back').show(); });
$('#rd3').click(function(){ $("#t3").val("");$("#dv4").html("");$('#spq1,#spq2,#table2').hide(); $("#bt0").val("執行");$('#spq3,#table1,#dv4,#back').show(); });
$('#rd4').click(function(){ $("#dv4").html("");$('#spq1,#spq2,#spq3,#table2').hide(); $("#bt0").val("執行");$('#table1,#dv4,#back').show(); });

$('#bt0').click(function(){ 
  qur=$("input:radio[name='rd']:checked").val();  msg="";
  switch ($("#bt0").val()) {
    case  "執行"    : {
        switch (qur)	{
          case "1": { p1 = $("#t0").val(); p2 = "0"; if (p1=="") { msg="請輸入編號";} else $("#bt0").val("回上頁");  break; }
          case "2": { p1 = $("#t1").val(); p2 = $("#t2").val(); if (p1==""||p2=="") { msg="請輸入起訖編號";} break; }
          case "3": { p1 = $("#t3").val(); p2 = "" ; if (p1=="") { msg="姓名欄位不可空白";}            break; }
          case "4": { p1 = "1" ;           p2 = "1";            break; }
          default : {                                           break; } 
          }   
        if (msg!="") alert(msg); else displymsg(p1,p2);
    break;}
    case  "單筆顯示": { var j=0;
        for (var i=1;i<=dno;i++) { if ($("#q"+i).is(':checked')) { $("#q"+i).prop('checked',false);
          $("#t0").val($("#q"+i).attr("name"));$("#table2 tr td.lb").html("");$("#pic1").attr("src","image/photo.jpg");$('#spq2,#spq3,#table1,#back').hide();
          $("#bt0").val("回上頁");$('#spq1,#dvq,#table2').show();displymsg($("#q"+i).attr("name"),"0"); j++; break; }  }         
    break;}
    case  "回上頁": {
          if (qur=="1") { $("#t0").val("");$("#table2 tr td.lb").html("");$("#pic1").attr("src","image/photo.jpg");
                            $('#spq2,#spq3,#table1,#back').hide(); $("#bt0").val("執行");$('#spq1,#dvq,#table2').show(); }
		  else { $('#spq1,#spq2,#spq3,#table2').hide(); $("#bt0").val("單筆顯示"); $('#table1,#dv4,#back').show();}
    break;}
  } 
});
// ----- //
$('#rd5').click(function(){ $("#t5,#dkey").val("");$("#table2 tr td.lb").html("");$("#pic1").attr("src","image/photo.jpg");$("#btd").val("查詢");
                            $('#spd3,#table1,#dv4,#back').hide();$('#spd1,#table2').show(); });
$('#rd6').click(function(){ $("#t6").val("");$("#dv4").html(""); $("#btd").val("查詢"); $('#spd1,#table2').hide();$('#spd3,#table1,#dv4,#back').show(); });

$('#ck5').click(function(){ if ($("#ck5").is(':checked')) {$("#spd3 label").css("color","purple");$('#t6').show();}
                            else {$("#spd3 label").css("color","transparent");$('#t6').hide();} });

$('#btd').click(function(){ 
    qur=$("input:radio[name='rdd']:checked").val();  msg=""; p1=""; p2="";
    switch ($("#btd").val()) {
      case "查詢"    : {  $("#dkey").val("");
          switch (qur)	{
            case "5": { p1 = $("#t5").val(); p2 = "0"; if (p1=="") { msg="請輸入編號";}   break; }
            case "6": { if ($("#ck5").is(':checked')) { if ($("#t6").val()!="") { p1 = $("#t6").val(); p2 = "2"; } else { msg="姓名欄位不可空白";} }
             else { p1 = "1" ; p2 = "1" ; } break; }
            default : {                                           break; } 
            }   
          if (msg!="") alert(msg); else displymsg(p1,p2);
      break; }
      case "確定刪除": {
          switch (qur)	{
            case "5": { del_stg($("#Hpic").val()); db.child($("#dkey").val()).remove(); alert("刪除完成");
                        $("#t5,#dkey").val(""); $("#table2 tr td.lb").html("");$("#pic1").attr("src","image/photo.jpg");$("#btd").val("查詢");
                        $('#spd3,#table1,#dv4,#back').hide();$('#spd1,#table2').show(); break; } 
            case "6": { var j=0;  for (var i=1;i<=dno;i++) {
                        if ($("#k"+i).is(':checked')) { del_stg($("#k"+i).attr("name")); db.child($("#k"+i).val()).remove(); j++; } } 
                        alert(j+"個資料完成刪除");$("#t6").val(""); $("#dv4").html("");$("#btd").val("查詢");
                        $('#spd1,#table2').hide();$('#spd3,#table1,#dv4,#back').show(); break; }
          }
      break; }
    }
});
/* =========================================================================== */
});