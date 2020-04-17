var http_ip=(location.hostname=="websrv.local.tw")?"http://websrv.local.tw/SR2FB/":"https://"+location.hostname+"/SR2FB/";
var stg_root_node, stg_device, db, qur, dno, pars, tod;
pars=getUrlVars("sw"); var tod = show_today();	
/* ========================================================= */
  function displymsg(A,B)	{
    var msg="";var key="";
	  switch (pars)
		{
		case "d": {//刪除方式
        switch (B)
        {
		      case "0": { show_rec(A); break; } //單筆
          case "1": {//全部多筆
              var lno=0;               
            	db.on("value",function(data){
          		    $.each(data.val(),function(k,v){  lno++; key=k;  zno=(lno<10)?'0':'';
                  	 msg+='\t&emsp;'+'<input type="checkbox" id="k'+lno+'" name="'+v.Hpic+'" value="'+key+'"  />'
                        +"\t"+zno+lno+"\t&emsp;&emsp;"+v.Aidn+"\t&emsp;"+v.Bnam+"\t&emsp;"+v.Csex+"\t&emsp;"+v.Dbld+"\t&emsp;"+v.Ebir.substr(0,4)
                        +"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2)+"\t&emsp;"+v.Fsch+"\t&emsp;"+v.Gins+"<br\>";
              		 	});
              if (key=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#btd").val("確定刪除"); dno=lno; }      //alert(msg);
        		  }); 
              //if (key=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#btd").val("確定刪除"); }      //alert(msg);
           break;   }
           case "2": {//模糊多筆
              var lno=0;
              db.on("value",function(data){
          		    $.each(data.val(),function(k,v){
         			        likena=v.Bnam; len=v.Bnam.length;
             			    for (var i=0;i<len;i++) {
           			        if (likena.charAt(i)==A){ lno++; key=k;  zno=(lno<10)?'0':'';
                  	 msg+='\t&emsp;'+'<input type="checkbox" id="k'+lno+'" name="'+v.Hpic+'" value="'+key+'"  />'
                        +"\t"+zno+lno+"\t&emsp;&emsp;"+v.Aidn+"\t&emsp;"+v.Bnam+"\t&emsp;"+v.Csex+"\t&emsp;"+v.Dbld+"\t&emsp;"+v.Ebir.substr(0,4)
                        +"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2)+"\t&emsp;"+v.Fsch+"\t&emsp;"+v.Gins+"<br\>"; break; }
                      }
              		 	});
              if (key=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#btd").val("確定刪除"); dno=lno; }      //alert(msg);
        		  }); 
              //if (key=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#btd").val("確定刪除"); }      //alert(msg);
            break;  }
          }
			break; }
		case "m":   //修改方式
		case "q": { //查詢方式
        chr=(pars=="q")?"0":"m";
		    if(B == "0") { show_rec(A); } //單筆
        else if(B == "") {//姓名模糊/性別/血型/學歷 多筆 
              var lno=0; var item=""; var type=1; //1模糊
              if(pars=="m") { switch ($("#sem :selected").val()) {
                              case "姓名": { type=1; break; } case "性別": case "血型": case "學歷": { type=0; break; }  }  }
              if (type) {
              db.on("value",function(data){
              		  $.each(data.val(),function(k,v){ item=v.Bnam;                      
                  			likena=item; len=item.length;
                  			for (var i=0;i<len;i++) {
               			      if (likena.charAt(i)==A){ lno++; key=k;  zno=(lno<10)?'0':'';
                             msg+='\t&emsp;'+'<input type="checkbox" id="'+pars+lno+'" name="'+v.Aidn+'" value="'+key+'"  />'
                  			     +"\t"+zno+lno+"\t&emsp;&emsp;"+v.Aidn+"\t&emsp;"+v.Bnam+"\t&emsp;"+v.Csex+"\t&emsp;"+v.Dbld+"\t&emsp;"+v.Ebir.substr(0,4)
                                +"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2)+"\t&emsp;"+v.Fsch+"\t&emsp;"+v.Gins+"<br\>"; break; }  }
              		 	});
              if (msg=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#bt"+chr).val("單筆顯示"); dno=lno; }	      
        		  });
              }
              else  {
              db.on("value",function(data){
              		  $.each(data.val(),function(k,v){
                      if(pars=="m") { switch ($("#sem :selected").val()) { case "性別": { item=v.Csex; break; }
                                      case "血型": { item=v.Dbld; break; } case "學歷": { item=v.Fsch; break; }  }  }
         			        if (item==A){ lno++; key=k;  zno=(lno<10)?'0':'';
                          msg+='\t&emsp;'+'<input type="checkbox" id="'+pars+lno+'" name="'+v.Aidn+'" value="'+key+'"  />'
                  			     +"\t"+zno+lno+"\t&emsp;&emsp;"+v.Aidn+"\t&emsp;"+v.Bnam+"\t&emsp;"+v.Csex+"\t&emsp;"+v.Dbld+"\t&emsp;"+v.Ebir.substr(0,4)
                             +"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2)+"\t&emsp;"+v.Fsch+"\t&emsp;"+v.Gins+"<br\>"; }
              		 	});
              if (msg=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#bt"+chr).val("單筆顯示"); dno=lno; }	      
        		  });  
              }
        }
		    else { //區間 / 全部多筆
              var lno=0;  
            	db.on("value",function(data){	  
                  $.each(data.val(),function(k,v){
                			if ( (v.Aidn>=A && v.Aidn<=B) || (A=="1" && B=="1") ) { lno++; key=k;  zno=(lno<10)?'0':'';
                          msg+='\t&emsp;'+'<input type="checkbox" id="'+pars+lno+'" name="'+v.Aidn+'" value="'+key+'"  />'
                  			     +"\t"+zno+lno+"\t&emsp;&emsp;"+v.Aidn+"\t&emsp;"+v.Bnam+"\t&emsp;"+v.Csex+"\t&emsp;"+v.Dbld+"\t&emsp;"+v.Ebir.substr(0,4)
                                    +"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2)+"\t&emsp;"+v.Fsch+"\t&emsp;"+v.Gins+"<br\>"; }
                  });
             if (msg=="") alert("[查無資料]"); else { $("#dv4").html(msg); $("#bt"+chr).val("單筆顯示"); dno=lno; }	
       		    });
             //if (key=="") alert("[查無資料]"); else $("#dv4").html(msg);
             }
			break; }
		case "s": {//排序瀏覽
            var sno=0;//var C=new Array();
      		  db.orderByChild("Aidn").on("child_added",function(s){ sno++;  zno=(sno<10)?'0':'';
      		   //C=[s.val().Aidn,s.val().Bnam,s.val().Csex,s.val().Dbld,s.val().Ebir,s.val().Fsch,s.val().Gins];
      		   //fun1(C);
      			 msg+="\t&emsp;"+'<input type="checkbox" id="'+pars+sno+'" name="'+s.val().Aidn+'" value="'+s.val().Aidn+'"  />'+"\t"
             //msg+="\t&emsp;"+"\t&emsp;"
                +zno+sno+"\t&emsp;&emsp;"+s.val().Aidn+"\t&emsp;"+s.val().Bnam+"\t&emsp;"+s.val().Csex+"\t&emsp;"+s.val().Dbld+"\t&emsp;"
                +s.val().Ebir.substr(0,4)+"/"+s.val().Ebir.substr(4,2)+"/"+s.val().Ebir.substr(6,2)+"\t&emsp;"+s.val().Fsch+"\t&emsp;"
                +s.val().Gins+"<br\>";
     		    if (msg=="") alert("[查無資料]"); else $("#dv4").html(msg);	
             });
            //if (msg=="") alert("[查無資料]"); else $("#dv4").html(msg);					
			break; }
		default: {
			break; }
		}
}
// ----- //
function show_rec(Ano){
        $("#dkey").val("");
        db.on("value",function(data){
    		  $.each(data.val(),function(k,v){
     			    if (v.Aidn>=Ano && v.Aidn<=Ano)  { $("#dkey").val(k); 
     			        if(pars!="m") {
                    $("#lba").html(v.Aidn);$("#lbb").html(v.Dbld);$("#lbc").html(v.Bnam);$("#lbd").html(v.Ebir.substr(0,4)+"/"+v.Ebir.substr(4,2)+"/"+v.Ebir.substr(6,2));
                    $("#lbe").html(v.Csex);$("#lbf").html(v.Fsch);$("#lbg").html(v.Gins);$("#Hpic").val(v.Hpic); }
                  else {
                    $("#idn").val(v.Aidn); $("#na1").val(v.Bnam);
                    $("#se0 option[value="+v.Dbld+"]").prop("selected","selected");
                    $("#m_year  option[value="+v.Ebir.substr(0,4)+"]").prop("selected","selected");
                    $("#m_month option[value="+v.Ebir.substr(4,2)+"]").prop("selected","selected");
                    $("#m_date  option[value="+v.Ebir.substr(6,2)+"]").prop("selected","selected");
                    switch (v.Csex) { case "男": $("#rdm").prop("checked","checked"); break;
                                      case "女": $("#rdg").prop("checked","checked"); break; }
                    $("#se1 option[value="+v.Fsch+"]").prop("selected","selected");
                    var vins = v.Gins.split("/");
                    for (var i=0;i<vins.length;i++) { $("input:checkbox[name='ck[]'][value="+vins[i]+"]").prop("checked","checked"); }
                    $("#Hpic").val(v.Hpic); }
                  get_stg($("#Hpic").val());
             			}
                  });
         if ($("#dkey").val()=="") alert("[查無資料]"); else { if(pars=="d") $("#btd").val("確定刪除"); if(pars=="m") $("#btm").val("確定修改"); }    
       		    });   
    }
// ----- //
function push_stg(f){
      var path=Math.floor((Math.random() * 1000) + 1);      //var path=Math.uuid(3,16);
      var fn="chien1/p"+path+"/"+f.name;
      var realup=stg_root_node.child(fn).put(f);
      $("#jpg").val(fn);
      $("#Hpic").val(fn); 
      alert("檔案寫入FireBase storage成功！");
  }
// ----- //
function get_stg(f){
      if (f!="") {
      var starsRef=stg_root_node.child(f);           
      starsRef.getDownloadURL().then(function(url){
      $("#pic1").attr("src",url); $("#Hpic").val(f); }).catch(function(error) {alert(error);});  }
  }
// ----- //
function del_stg(f){        
      if (f!="") {
      var starsRef=stg_root_node.child(f);
      starsRef.delete().then(function(url){
          $("#jpg").val(""); $("#pic1").attr("src","image/photo.jpg"); $("#sp0").html("《未上傳》");})
      .catch(function(error)  {	alert(error);	}); }
   }
// ----- //  
function set_fb(k){
      var idn,nam,sex,bld,bir,sch,ins,pic="";
        idn=$("#idn").val();
        nam=$("#na1").val();
        sex=$("input:radio[name='mrd']:checked").val();
        bld=$("#se0 :selected").val();
        bir=$("#m_year :selected").val()+$("#m_month :selected").val()+$("#m_date :selected").val();
        sch=$("#se1 :selected").val();
        ins=$("input:checkbox[name='ck[]']:checked").map(function(){return $(this).val();}).get().join("/");
        pic=$("#Hpic").val();
      db.child(k).set({Aidn:idn,Bnam:nam,Csex:sex,Dbld:bld,Ebir:bir,Fsch:sch,Gins:ins,Hpic:pic });
	 			alert("資料編輯寫入Firebase成功！");
  }
// ----- //
function push_fb(){
      var idn,nam,sex,bld,bir,sch,ins,pic="";
      idn=$("#idn").val();
      nam=$("#na1").val();
      sex=$("input:radio[name='rd']:checked").val();
      bld=$("#se0 :selected").val();
      bir=$("#m_year :selected").val()+$("#m_month :selected").val()+$("#m_date :selected").val();
      sch=$("#se1 :selected").val();
      ins=$("input:checkbox[name='ck[]']:checked").map(function(){return $(this).val();}).get().join("/");
      pic=$("#jpg").val();
		 	db=new Firebase("https://chien1-9a5df.firebaseio.com");      
			db.push({Aidn:idn,Bnam:nam,Csex:sex,Dbld:bld,Ebir:bir,Fsch:sch,Gins:ins,Hpic:pic});
      alert("資料寫入Firebase成功！");
  }
// ----- //
function getUrlVars(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
//            產生民國xxx年xx月xx日星期X xx時xx分xx秒的資料
function show_today()
  {
    var today=new Date(); var weekday=["日","一","二","三","四","五","六"]; var wekc=["b4","u","-4","n0","n4","j3","xu.4"]; 
    var result_today = new Array();    
    result_today[0]=today.getFullYear();                                                    //西元年
    result_today[1]=today.getFullYear()-1911;                                               //民國年
    var Mon=today.getMonth()+1;
    result_today[2]=(Mon<10)?('0'+Mon):Mon;                                                 //月
    result_today[3]=(today.getDate()<10)?('0'+today.getDate()):today.getDate();             //日
    result_today[4]=weekday[today.getDay()];                                                //星期    
    result_today[5]=(today.getHours()<10)?('0'+today.getHours()):today.getHours();          //小時
    result_today[6]=(today.getMinutes()<10)?('0'+today.getMinutes()):today.getMinutes();    //分
    result_today[7]=(today.getSeconds()<10)?('0'+today.getSeconds()):today.getSeconds();    //秒
    result_today[8]=wekc[today.getDay()];
    return result_today;
  }
// ----------------------------------------------------------------------------------- //
/* =======================================Send_Recv=================================== */
function form_clr() {
      del_stg($('#jpg').val());
      $('#f1')[0].reset();
  }
// ----- //
function authchk(where) {
	  if ( $('#adm').val() ) var con = true;
	  else { var con = false;
	  var whois=prompt("請輸入『芝麻開門』的通關密語？",""); var pswd=String(tod[2])+String(tod[3])+tod[8];         //alert(pswd);
      if (whois==pswd) { whereA=where.toUpperCase(); con=true; $('#adm').val("1"); if (whereA!="A") top.location.href='SendRecv.html?sw='+where; }
		   }
      return con;
  }
// ----- //
function chkform(form) {
  var ans = authchk('a'); 
  if ( ans ) {
      if  ($("#jpg").val()=="") {alert("相片未選取與上傳"); return false;}
      if  (form.idn.value== "" || form.na1.value == ''||(!form.rd[0].checked && !form.rd[1].checked )||
          (form.m_year.value == ''||form.m_month.value == ''||form.m_date.value == '')||
          (!form.ck1.checked && !form.ck2.checked && !form.ck3.checked && !form.ck4.checked)  )
              {  alert("輸入不完全!"); return false;}
      alert("是這張相片嗎?"); push_fb();$("#jpg").val("");$("#pic1").attr("src","image/photo.jpg"); $("#sp0").html("《未上傳》"); form_clr();
	  ($("#f1").action("Send_Recv.html?sw='on'"))
    }  
      return false;
  }
/* =====================================SendRecv======================================= */
function nextstep(name) {
  $('#dvm table tr td span.sem').hide();
  switch ($("#sem :selected").val()) { case "姓名": { $("#spnam").show(); break; } case "性別": { $("#spsex").show(); break; }
                  case "血型": { $("#spbld").show(); break; } case "學歷": { $("#spsch").show(); break; } 
  }
}
// ----- //