var basetool=$.fn.basetool;
var nav=$.fn.nav,adapt_helper=$.fn.adapt_helper,CountryCodeDropdown=$.fn.countryCodeDropdown,CorpScaleDropdown=$.fn.scaleDropdown;
adapt_helper.adaptBodyWidth();
basetool.doIndexStatistic();
var qrCheckCount=0,refreshQrcode=false,actualTimes=parseInt($("[name='valid_time']").val())/2-5,code=$("[name='scan_code']").val();
var commPwd;
var commPwdMd5;
var lastCheckAlias;
var aliasConflict=false;
var needVerify=false;
var countryCode=86;
$.validator.addMethod('phone',function(b,a){
if(countryCode==86)
{
return this.optional(a)||/^1\d{10}$/.test(b);
}
else{
return this.optional(a)||/^[0-9]+$/.test(b);
}
},'\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801');
$.validator.addMethod('alias_char_rule',function(b,a){
return this.optional(a)||/^[0-9a-zA-Z\.\-_ ]*$/.test(b);
});
$.validator.addMethod('alias_headend_rule',function(b,a){
return this.optional(a)||(!/(^[\.\-_ ])/.test(b)&&!/([\.\-_ ]$)/.test(b));
});
$.validator.addMethod('corp_name_part',function(b,a){
return this.optional(a)||/^[a-zA-Z0-9\u4e00-\u9fa5\-_()\uFF08\uFF09]+$/.test(b);
});
$.validator.addMethod('alias_disable_phone',function(b,a){
return this.optional(a)||(!/^1\d{10}$/.test(b));
});
$.validator.addMethod('alias_repeat_rule',function(b,a){
return this.optional(a)||!/[\.\-_ ][\.\-_ ]/.test(b);
});
$.validator.addMethod('alias_unique',function(b,a){
return this.optional(a)||!aliasConflict;
});
$.validator.addMethod('pwd_custom_rule',function(b,a){
return this.optional(a)||validPwd($.trim(b));
});
$.validator.addMethod('pwd2_custom_rule',function(b,a){
return this.optional(a)||b==$('[name="pwd"]').val();
},'\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4');
$.validator.addMethod('mobile_verify',function(b,a){
return !needVerify||$('[id="img_vc"]').val();
},'\u8BF7\u8F93\u5165\u56FE\u7247\u9A8C\u8BC1\u7801');
function showErrorTips(a,d)
{
var c=d||'';
var b=a.parents(".signup_item");
c&&b.find('.js_error_msg').html(c);
b.addClass('signup_item_ShowErrorTip').find('.signup_item_right').addClass('qy_inputWithTips_WithErr');
}
function hideErrorTips(a)
{
a.parents('.signup_item').removeClass('signup_item_ShowErrorTip').find('.signup_item_right').removeClass('qy_inputWithTips_WithErr');
}
var $submitBtn=$('#submit_btn');
var $corpName=$('#corp_name');
var $corpIndustry=$('#corp_industry');
var $corpScale=$('#corp_scale_btn');
var $managerName=$('#manager_alias');
var $mobile=$('#mobile');
var $smscode=$('#smscode');
var $img_vc=$('#img_vc');
var $countryCode=$('#countryCode');
var $captcha=$('.js_mobile_captcha');
var $getVcodeBtn=$('#get_smscode');
var $iagree=$('#iagree');
var corpScale;
var corpIndustryOne;
var corpIndustryTwo;
var corpNameReg=/^[a-zA-Z0-9\u4e00-\u9fa5\-_()\uFF08\uFF09]+$/;
function isValidCorpName()
{
var a=$corpName.val();
if(1<=a.length&&a.length<=30&&corpNameReg.test(a))
{
hideErrorTips($corpName);
return true;
}
else{
showErrorTips($corpName,"\u4F01\u4E1A\u540D\u79F0\u75311-30\u4E2A\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6570\u5B57\u53CA\u5408\u6CD5\u5B57\u7B26\u7EC4\u6210");
return false;
}
}
function isSelectCorpIndustry()
{
if(!corpIndustryOne||!corpIndustryTwo)
{
showErrorTips($corpIndustry,'\u8BF7\u9009\u62E9\u6240\u5C5E\u884C\u4E1A');
return false;
}
else{
hideErrorTips($corpIndustry);
return true;
}
}
function isSelectCorpScale()
{
if(!corpScale)
{
showErrorTips($corpScale,'\u8BF7\u9009\u62E9\u4EBA\u5458\u89C4\u6A21');
return false;
}
else{
hideErrorTips($corpScale);
return true;
}
}
function isVaildManageName()
{
var a=$.trim($managerName.val());
if(!a||a.length>32)
{
showErrorTips($managerName,'\u7BA1\u7406\u5458\u59D3\u540D\u75311-32\u4E2A\u5B57\u7B26\u7EC4\u6210');
return false;
}
else{
return true;
}
}
function isMobile()
{
if(!this.isVaildTelHandler())
{
this.disableCaptcha($captcha);
showErrorTips($mobile,'\u624B\u673A\u683C\u5F0F\u4E0D\u6B63\u786E');
return false;
}
hideErrorTips($mobile);
return true;
}
function isSmscode()
{
if(!$smscode.length)
{
return true;
}
var a=$.trim($smscode.val());
if(!/^\d{6,6}$/.test(a))
{
showErrorTips($smscode,'\u8BF7\u586B\u5199\u6B63\u786E\u7684\u9A8C\u8BC1\u7801');
return false;
}
hideErrorTips($smscode);
return true;
}
function isImgcode()
{
}
function isScanCheck()
{
var a=$("[name='code']").val();
if(!$.trim(a))
{
basetool.showErr('\u8BF7\u626B\u7801\u7ED1\u5B9A\u5FAE\u4FE1');
return false;
}
else{
return true;
}
}
function isVaildTelHandler()
{
var a=this;
if(!$mobile.length)
{
return true;
}
var b=$.trim($mobile.val());
if(/^[0-9]+$/.test(b))
{
if($countryCode.val()==86)
{
return b.length==11;
}
else{
return true;
}
}
else{
a.disableCaptcha($captcha);
return false;
}
}
function disableCaptcha()
{
$getVcodeBtn.attr('disabled','disabled');
$smscode.attr('disabled','disabled');
}
function enableCaptcha()
{
var a=$getVcodeBtn.text();
if(a=='\u83B7\u53D6\u9A8C\u8BC1\u7801'||a=='\u91CD\u65B0\u83B7\u53D6')
{
$getVcodeBtn.removeAttr('disabled','disabled');
$smscode.removeAttr('disabled','disabled');
}
}
$('.js_signup_submit').click(function(a){
a.preventDefault();
var b=true;
b=isValidCorpName()&&b;
b=isVaildManageName()&&b;
b=isMobile()&&b;
b=isSmscode()&&b;
if(!b||($iagree.length&&!$iagree.is(':checked')))
{
return;
}
if(!isScanCheck())
{
return;
}
if($submitBtn.attr('disabled'))
{
return;
}
signupSubmit();
});
function signupSubmit(d,a)
{
$submitBtn.attr('disabled','disabled');
$submitBtn.html('\u6CE8\u518C\u4E2D...');
var b=$('#signup_form').serialize();
b=b+'&corpname='+$("#corp_name").val()+'&name='+$("#manager_alias").val()+'&phone_vc='+$("[id='smscode']").val()+'&area='+countryCode+'&mobile='+$("#mobile").val()+'&img_vc='+$("#img_vc").val()+'&smscode='+$("#smscode").val();
var c="sign_up_ww";
if(d=="reuseWw")
{
c="sign_up_wwcode";
b=b.replace("&code=","");
b=b+'&code='+a;
}
if(d=="notReuseWw")
{
b=b+'&createnew=1';
}
$("#signup_res_corpname").text($corpName.val());
$.ajax({url:'/cgi-bin/bizmail_portal?t=biz_rf_portal_mgr&action='+c+'&ef=jsnew&resp_charset=UTF8&version=2',data:b,type:'POST',dataType:'json',contentType:"application/x-www-form-urlencoded; charset=utf-8",success:function(e){
$submitBtn.removeAttr('disabled').html('\u6CE8\u518C');
if(e.retcode==0)
{
var h=e.data.sid;
$('.js_enter_mng').attr('sid',h);
$('.js_signup_form').hide();
$('.js_had_qywx').hide();
$('.js_signup_res').show();
if(d=="reuseWw")
{
$(".js_before_openqywx").hide();
$(".js_signup_res_title").html("\u817E\u8BAF\u4F01\u4E1A\u90AE\u5F00\u901A\u6210\u529F");
}
if(d=="reuseWw")
{
new Image().src="/cgi-bin/sellonlinestatic?type=nosession_statistics&businame=qywwRegReuse&item=regPage|regByReuseQywx&r="+Math.random();
}
if($("input[name='origin']")&&($("input[name='origin']").val()=='bds'||$("input[name='origin']").val()=='bdTab'))
{
basetool.logKvEx({type:'nosession_statistics',businame:'baidu_promote',item:'bd|index|'+$("input[name='signupType']").val()+'|sum'});
}
if($("input[name='origin']")&&$("input[name='origin']").val()=='bdTab')
{
basetool.logKvEx({type:'nosession_statistics',businame:'baidu_promote',item:'bdtab|index|'+$("input[name='signupType']").val()+'|sum'});
}
if(countryCode&&countryCode!=86)
{
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|reg|sendsms|foreign|succ'});
}
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|reg|sendsms|succ'});
}
else if(e.retcode==-99)
{
basetool.showErr('\u624B\u673A\u9A8C\u8BC1\u7801\u9519\u8BEF');
}
else if(e.retcode==-101)
{
basetool.showErr('\u5E10\u53F7\u683C\u5F0F\u9519\u8BEF');
}
else if(e.retcode==-102)
{
basetool.showErr('\u8BE5\u5E10\u53F7\u5DF2\u88AB\u6CE8\u518C\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165');
}
else if(e.retcode==-103)
{
basetool.showErr('\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5');
}
else if(e.retcode==-104)
{
basetool.showErr('\u8BE5\u624B\u673A\u53F7\u5DF2\u7ED1\u5B9A5\u4E2A\u5E10\u53F7');
}
else if(e.retcode==-106)
{
basetool.showErr('\u8BE5\u624B\u673A\u53F7\u5DF2\u6CE8\u518C\u8D85\u8FC75\u4E2A\u5E10\u53F7');
}
else if(e.retcode==-901)
{
basetool.showErr('\u4F01\u4E1A\u540D\u79F0\u4E0D\u5408\u6CD5');
}
else if(e.retcode==-902||e.retcode==-903)
{
basetool.showErr('\u4F01\u4E1A\u540D\u79F0\u5DF2\u88AB\u6CE8\u518C');
}
else if(e.retcode==-1000)
{
basetool.showErr('\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u8FD4\u56DE\u91CD\u65B0\u626B\u7801');
}
else if(e.retcode==104)
{
basetool.showErr('\u8BE5\u5FAE\u4FE1\u53F7\u5DF2\u6CE8\u518C\u8D85\u8FC75\u4E2A\u5E10\u53F7');
}
else if(e.retcode==105)
{
basetool.showErr('\u8BE5\u5FAE\u4FE1\u53F7\u5DF2\u7ED1\u5B9A5\u4E2A\u5E10\u53F7');
}
else if(e.retcode==-907)
{
var i='<div class="js_login_dialog dialog" style="width: 420px;">'+'<div class="dlg_header dlg_head">'+'<div class="dlg_header_cnt_title">\u63D0\u793A</div>'+'<a class="js_cancel_onlinesell_dialog dlg_close" D_ck="cancel">'+'<span class="qy_indexIcon qy_indexIcon_close_gray"></span>'+'</a>'+'</div>'+'<div class="dlg_content" style="min-height: 150px;">'+'<div class="dlg_content_main">'+'<div class="dlg_content_left">'+'<div class="qy_signupIcon qy_signupIcon_warn_62 dlg_content_left_icon"></div>'+'</div>'+'<div class="dlg_content_right">'+'<div class="dlg_content_right_desc" style="font-size: 14px;line-height: 20px;color: #2b2b2b;">\u4F60\u5DF2\u5F00\u901A\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u53EF\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1\u5F00\u901A\u817E\u8BAF\u4F01\u4E1A\u90AE\uFF0C\u540C\u6B65\u4F01\u4E1A\u4FE1\u606F\u548C\u901A\u8BAF\u5F55\u3002</div>'+'</div>'+'</div>'+'<div class="dlg_foot">'+'<a href="javascript:;" class="qy_btn qy_btn_Blue right" style="margin-right:10px;" D_ck="use">\u4F7F\u7528</a>'+'<a href="javascript:;" class="qy_btn right" D_ck="cancel">\u4E0D\u4F7F\u7528</a>'+'</div>'+'</div>'+'</div>';
var f=$('<div>').MNDialog({nContainerHeight:208,nContainerWidth:420,oContentHtml:i,nDlgType:1,oRules:{click:{use:function(j,k){
f.close();
$("#had_qywx_account").trigger('click');
},cancel:function(j,k){
f.close();
signupSubmit("notReuseWw");
}}},fOpenCallback:function(){
}});
}
else if(e.retcode==-904||e.retcode==-908||e.retcode==-909||e.retcode==-910||e.retcode==-911||e.retcode==-912||e.retcode==-914||e.retcode==-915||e.retcode==-916||e.retcode==-917||e.retcode==-10001)
{
var g={};
g[-904]="\u8BE5\u4F01\u4E1A\u5DF2\u7ECF\u5F00\u901A\u8FC7\u4F01\u4E1A\u90AE\u7BB1\uFF0C\u4E0D\u80FD\u91CD\u590D\u5F00\u901A";
g[-908]="\u6682\u65F6\u4E0D\u652F\u6301\u4ECE\u4F01\u4E1A\u53F7\u5347\u7EA7\u7684\u4F01\u4E1A\u5FAE\u4FE1";
g[-909]="\u6682\u65F6\u4E0D\u652F\u6301\u4ECE\u516C\u4F17\u5E73\u53F0\u5F00\u901A\u7684\u4F01\u4E1A\u5FAE\u4FE1";
g[-910]="\u6682\u65F6\u4E0D\u652F\u6301\u4ECE\u5C0F\u7A0B\u5E8F\u5F00\u901A\u7684\u4F01\u4E1A\u5FAE\u4FE1";
g[-911]="\u6682\u65F6\u4E0D\u652F\u6301\u4ECE\u5FAE\u4FE1\u652F\u4ED8\u5F00\u901A\u7684\u4F01\u4E1A\u5FAE\u4FE1";
g[-912]="\u6682\u65F6\u4E0D\u652F\u6301\u4ECE\u5FAE\u4FE1\u7FA4\u5F00\u901A\u7684\u4F01\u4E1A\u5FAE\u4FE1";
g[-914]="\u5F53\u524D\u4F01\u4E1A\u6B63\u901A\u8FC7RTX\u540C\u6B65\u901A\u8BAF\u5F55\uFF0C\u65E0\u6CD5\u5F00\u901A";
g[-915]="\u5F53\u524D\u4F01\u4E1A\u6B63\u901A\u8FC7API\u540C\u6B65\u901A\u8BAF\u5F55\uFF0C\u65E0\u6CD5\u5F00\u901A";
g[-916]="\u5F53\u524D\u4F01\u4E1A\u6B63\u901A\u8FC7\u7B2C\u4E09\u65B9\u5E94\u7528\u540C\u6B65\u901A\u8BAF\u5F55\uFF0C\u65E0\u6CD5\u5F00\u901A";
g[-917]="\u8BE5\u4F01\u4E1A\u5DF2\u7ECF\u5F00\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u90AE\uFF0C\u4E0D\u80FD\u91CD\u590D\u5F00\u901A";
g[-10001]="\u8BE5\u4F01\u4E1A\u5DF2\u7ECF\u5F00\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u90AE\uFF0C\u4E0D\u80FD\u91CD\u590D\u5F00\u901A";
var i='<div class="js_login_dialog dialog" style="width: 420px;">'+'<div class="dlg_header dlg_head">'+'<div class="dlg_header_cnt_title">\u63D0\u793A</div>'+'<a class="js_cancel_onlinesell_dialog dlg_close" D_ck="cancel">'+'<span class="qy_indexIcon qy_indexIcon_close_gray"></span>'+'</a>'+'</div>'+'<div class="dlg_content" style="min-height: 150px;">'+'<div class="dlg_content_main" style="padding:40px 0 20px;">'+'<div class="dlg_content_left">'+'<div class="qy_signupIcon qy_signupIcon_err_42 dlg_content_left_icon"></div>'+'</div>'+'<div class="dlg_content_right">'+'<div class="dlg_content_right_title">\u6CE8\u518C\u5931\u8D25</div>'+'<div class="dlg_content_right_desc">'+g[e.retcode]+'</div>'+'</div>'+'</div>'+'<div class="dlg_foot">'+'<a href="javascript:;" class="qy_btn right" D_ck="cancel">\u5173\u95ED</a>'+'</div>'+'</div>'+'</div>';
var f=$('<div>').MNDialog({nContainerHeight:210,nContainerWidth:420,oContentHtml:i,nDlgType:1,oRules:{click:{cancel:function(j,k){
f.close();
}}},fOpenCallback:function(){
}});
}
else{
basetool.showErr(e.errmsg||'\u6CE8\u518C\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\u4E3A'+e.retcode);
}
},error:function(e){
$submitBtn.removeAttr('disabled').html('\u6CE8\u518C');
basetool.showErr('\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5');
}});
}
$('.js_enter_mng').click(function(b){
var a=$(b.currentTarget);
if($("#js_open_qywx").prop("checked")==true)
{
$.ajax({type:"GET",url:"/cgi-bin/bizmail?action=newbizmail_open_wework&t=biz_rf_portal_mgr&ef=jsnew&sid="+a.attr('sid')+"&r="+Math.random(),dataType:"json",complete:function(d,e){
if(d.responseJSON.data.bizmailactivewework==0)
{
}
else{
}
},error:function(d){
}});
new Image().src="/cgi-bin/sellonlinestatic?type=session_statistics&businame=qywwOpenQywx&item=openQywx|regPage&sid="+a.attr('sid')+"&r="+Math.random();
}
var c=$('[name=signupType]').val();
new Image().src='/qy_mng_logic/reportKV?type=WwBizmailSell&itemName=wwbizmail|reg|'+c+'|clickgotoadmin';
location.href='/cgi-bin/bizmail?sid='+a.attr('sid')+'&t='+($('input[name="signupType"]').val()=='free'?'qy_rf_home':'biz_rf_home')+'&init=1';
});
$('.js_send_sms').click(function(e){
var $tar=$(e.currentTarget),$mobile=$("[id='mobile']"),$smscode=$("[id='smscode']"),$img_vc=$("[id='img_vc']");
if(!$.trim($mobile.val()))
{
$mobile.focus().blur();
return false;
}
else if($tar.attr('disabled')||$mobile.parents('.signup_item_right').eq(0).hasClass('error'))
{
return false;
}
else{
$tar.attr('disabled',true);
}
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms'});
if(countryCode!=86)
{
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms|foreign'});
}
$.ajax({url:'/cgi-bin/bizmail_portal?t=biz_rf_portal_mgr&ef=js',data:{action:'send_sms',type:7,mobile:$mobile.val(),img_vc:$("[id='img_vc']").val(),area:countryCode},type:'POST',dataType:'json',success:function(data){
$smscode.focus();
basetool.generateTimer(60*1000,1000,{processHandler:function(timeLeft){
$tar.text('\u91CD\u65B0\u83B7\u53D6 ('+timeLeft+'s)');
},endHandler:function(){
$tar.text('\u83B7\u53D6\u9A8C\u8BC1\u7801');
$tar.removeAttr('disabled');
}});
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms|succ'});
if(countryCode!=86)
{
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms|foreign|succ'});
}
},error:function(data){
var data=eval(data.responseText);
if(data.retcode==0)
{
$smscode.focus();
basetool.generateTimer(60*1000,1000,{processHandler:function(timeLeft){
$tar.text('\u91CD\u65B0\u83B7\u53D6 ('+timeLeft+'s)');
},endHandler:function(){
$tar.text('\u83B7\u53D6\u9A8C\u8BC1\u7801');
$tar.removeAttr('disabled');
}});
}
else if(data.retcode==-101)
{
basetool.showErr('\u8BE5\u624B\u673A\u53F7\u7801\u9A8C\u8BC1\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41');
$tar.removeAttr('disabled');
}
else if(data.retcode==-201)
{
$('.js_signup_item_vcode').show();
needVerify=true;
$tar.removeAttr('disabled');
$img_vc.focus();
$('.img_vcode').trigger('click');
new Image().src='/cgi-bin/sellonlinestatic?type=nosession_statistics&businame=exmail_official_website&item=register_show_vcode';
}
else if(data.retcode==-202)
{
basetool.showErr('\u56FE\u7247\u9A8C\u8BC1\u7801\u9519\u8BEF');
$tar.removeAttr('disabled');
$img_vc.focus();
}
else if(data.retcode==-106)
{
basetool.showErr('\u8BE5\u624B\u673A\u53F7\u5DF2\u6CE8\u518C\u8D85\u8FC75\u4E2A\u5E10\u53F7');
$tar.removeAttr('disabled');
$img_vc.focus();
}
else if(data.retcode==-104)
{
basetool.showErr('\u8BE5\u624B\u673A\u53F7\u5DF2\u7ED1\u5B9A5\u4E2A\u5E10\u53F7');
$tar.removeAttr('disabled');
$img_vc.focus();
}
else{
basetool.showErr('\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5');
$tar.removeAttr('disabled');
}
if(data.retcode!=0)
{
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms|fail'});
if(countryCode!=86)
{
basetool.logKvEx({type:'nosession_statistics',businame:'send_sms',item:'signup|click|sendsms|foreign|fail'});
}
}
}});
});
$('.js_chg_img').on('click',function(b){
var a=$('#js_chg_img');
var c=a.attr('src');
a.attr('src',c+'0');
});
$("#corp_name").on('blur',function(a){
isValidCorpName();
});
$("#manager_alias").on('blur',function(a){
isVaildManageName();
});
$("#smscode").on('blur',function(a){
isSmscode();
});
$("[id='mobile']").on('blur',function(a){
$(a.currentTarget).siblings('.js_num_input_tips').hide();
isMobile();
}).on('input propertychange focus keyup',function(c){
var a=$(c.currentTarget);
var g=a.val().replace(/\s+/g,'');
if(countryCode==86&&!/^1\d{10}$/.test(g))
{
$("[id='smscode']").attr('disabled',true);
$('.js_send_sms').attr('disabled',true);
}
else if(!/^[0-9]+$/.test(g))
{
$("[id='smscode']").attr('disabled',true);
$('.js_send_sms').attr('disabled',true);
}
else{
$("[id='smscode']").removeAttr('disabled');
$('.js_send_sms').removeAttr('disabled');
}
var b=a.siblings('.js_num_input_tips');
var d=[];
var f='';
if(!g.length)
{
b.hide();
return;
}
g.split('').forEach(function(h,e){
f+=h;
if(d.length===0)
{
if(e%3==2)
{
d.push(f);
f='';
}
}
else{
if((e-3)%4==3)
{
d.push(f);
f='';
}
}
});
if(f)
d.push(f);
b.html(d.join('<span class="ww_inputWithMagnifier_info_spacing"></span>')).show();
});
$('.js_signup_checkbox').on('click',function(b){
var a=$(b.currentTarget);
if(a.prop('checked'))
{
$('.js_signup_submit').removeAttr('disabled');
}
else{
$('.js_signup_submit').attr('disabled',true);
}
});
$('.signup_item_input').on('focus',function(b){
var a=$(b.currentTarget);
hideErrorTips(a);
});
$('.signup_item_input').on('blur',function(b){
var a=$(b.currentTarget);
});
setTimeout(qrcodeTimer,2000);
function qrcodeTimer()
{
refreshQrcode=++qrCheckCount>=actualTimes?true:false;
$.ajax('/cgi-bin/bizmail_portal?action=is_scan_qrcode_ww&ef=jsnew&t=biz_rf_portal_mgr&scan_code='+code,{dataType:'json',success:function(a){
if(a.retcode==='0'&&a.data.scaned=='1')
{
var c=$("[name='regType']").val(),b=$("[name='refer']").val();
if(c=='trail'&&b=='portal_promot')
{
new Image().src='/cgi-bin/sellonlinestatic?type=nosession_statistics&businame=guangdiantong&item=TrialScanPageSuccess';
new Image().src='/cgi-bin/sellonlinestatic?type=nosession_activity_statistics?item=trial_version_scan_weixin_success&r='+Math.random();
}
$("[name='code']").val(a.data.code);
$('.js_scan_tip').hide();
$('.js_scan_res').show();
$('.signup_qrcode_shadow').show();
}
else if(refreshQrcode)
{
generateQrcode();
}
else{
setTimeout(qrcodeTimer,2000);
}
}});
}
function generateQrcode()
{
$.ajax('/cgi-bin/bizmail_portal?action=get_qrcode_for_free_register&t=biz_rf_portal_mgr&ef=jsnew&resp_charset=UTF8&r='+Math.random(),{dataType:'json',success:function(a){
if(a.retcode==='0')
{
$('.signup_qrcode').find('img').attr('src','https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+a.data.ticket);
code=a.data.code;
actualTimes=parseInt(a.data.time_limit)/2-5;
qrCheckCount=0;
refreshQrcode=false;
setTimeout(qrcodeTimer,2000);
}
}});
}
function updatePopupItem(a,d,c,e)
{
var b=a.find('.signup_item_input_check_item').not('.signup_item_input_check_title');
b.removeClass('signup_item_input_check_item_fail').removeClass('signup_item_input_check_item_succ').removeClass('signup_item_input_check_item_uncheck');
d=d||[];
c=c||[];
e=e||[];
$.each(d,function(f,g){
b.eq(g).addClass('signup_item_input_check_item_succ');
});
$.each(c,function(f,g){
b.eq(g).addClass('signup_item_input_check_item_fail');
});
$.each(e,function(f,g){
b.eq(g).addClass('signup_item_input_check_item_uncheck');
});
}
function initDropdown()
{
var a=this;
this.countryCodeDropdown=new Dropdown({container:'.js_countryCode_dropdown',dropDownClass:'qy_telInput_zipCode_input ',dropdownInputClass:'qy_inputText_Big',onChange:function(b){
a.countryCodeDropdown.setText(b.value);
countryCode=+b.value;
},onHide:function(){
if(!a.countryCodeDropdown.isValidCode(a.countryCodeDropdown.getText()))
{
a.countryCodeDropdown.setText(countryCode);
}
else if(countryCode!=a.countryCodeDropdown.getText())
{
a.countryCodeDropdown.setText(countryCode);
}
}});
$.extend(this.countryCodeDropdown,CountryCodeDropdown);
this.countryCodeDropdown.initialize(this.countryCodeDropdown.opt);
a.countryCodeDropdown.selectByValue(countryCode);
a.countryCodeDropdown.scrollToSelectedItem();
}
initDropdown();
$(function(){
$('.js_footer_qywx').hover(function(){
$(".js_index_foot_qyww").show();
},function(){
$(".js_index_foot_qyww").hide();
});
});
var is_in_box=false;
$(document).on('mouseover','.js_footer_protocal_icon',function(){
setTimeout(function(){
$(".js_index_foot_potocal").show();
},100);
});
$(document).on('mouseout','.js_footer_protocal_icon',function(){
setTimeout(function(){
if(is_in_box==false)
{
$(".js_index_foot_potocal").hide();
}
},100);
});
$(document).on('mouseover','.js_index_foot_potocal',function(){
is_in_box=true;
$(".js_index_foot_potocal").show();
});
$(document).on('mouseout','.js_index_foot_potocal',function(){
is_in_box=false;
setTimeout(function(){
if(is_in_box==false)
{
$(".js_index_foot_potocal").hide();
}
},1500);
});
$(document).on('click',"#hongbaoProtocal",function(){
$('.js_rule_content').show();
return false;
});
$(document).on('click',".js_hongbao_confirm_cancel",function(){
$('.js_rule_content').hide();
return false;
});
$(function(){
var a;
var b='<div class="js_login_dialog dialog" style="width: 425px;margin-left:-212px;">'+'<div class="dlg_header">'+'<a class="js_cancel_onlinesell_dialog btn_close" D_ck="cancel">'+'<span class="qy_indexIcon qy_indexIcon_close_gray"></span>'+'</a>'+'</div>'+'<div class="login_content" style="min-height: 150px;">'+'<div class="hadqywx_login">'+'<div class="hadqywx_login_title">\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1\u626B\u7801\u786E\u8BA4\u521B\u5EFA\u4EBA\u8EAB\u4EFD</div>'+'<iframe src="/cgi-bin/readtemplate?t=new_index/qywx_qrcode" frameborder="no" border="0" scrolling="no" style="height:360px;"></iframe>'+'<div class="qy_signupIcon qy_signupIcon_qywx_logo" style="margin-bottom:-7px;"></div>'+'</div>';
'</div>'+'</div>';
$(document).on('click',"#had_qywx_account",function(){
new Image().src="/cgi-bin/sellonlinestatic?type=nosession_statistics&businame=qywwRegReuse&item=regPage|fastReg|click&r="+Math.random();
a=$('<div>').MNDialog({nContainerHeight:470,nContainerWidth:426,oContentHtml:b,nDlgType:1,oRules:{click:{cancel:function(c,d){
a.close();
}}},fOpenCallback:function(){
}});
});
window.addEventListener('message',function(c){
if(c.data)
{
a.close();
signupSubmit('reuseWw',c.data);
}
},false);
});
