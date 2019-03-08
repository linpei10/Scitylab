(function(d,c){
'$:nomunge';
var a=d.jQuery||d.Cowboy||(d.Cowboy={}),b;
a.throttle=b=function(g,i,e,f){
var j,h=0;
if(typeof i!=='boolean')
{
f=e;
e=i;
i=c;
}
function k()
{
var p=this,n=+new Date()-h,l=arguments;
function o()
{
h=+new Date();
e.apply(p,l);
}
function m()
{
j=c;
}
if(f&&!j)
{
o();
}
j&&clearTimeout(j);
if(f===c&&n>g)
{
o();
}
else if(i!==true)
{
j=setTimeout(f?m:o,f===c?g-n:g);
}
}
if(a.guid)
{
k.guid=e.guid=e.guid||a.guid++;
}
return k;
};
a.debounce=function(g,e,f){
return f===c?b(g,e,false):b(g,f,e!==false);
};
})(this);
function setPlaceholderEvent(b,a)
{
b.on('input propertychange',function(){
if($(this).val())
{
a.hide();
}
}).on('blur',function(){
if($(this).val())
{
a.hide();
}
else{
a.show();
}
});
a.on('click',function(){
b.trigger('focus');
});
}
function checkTipsDom()
{
if($('#tipsContainer').length==0)
{
var a='<div id="tipsContainer" style="display:none;"><div id="tipsTop" class="tipsWrap topPos size14" style="display:none;"><span class="msg"></span></div><div id="tipsMsg" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg"></span></div><div id="tipsProcess" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg" style="background-color:gray;"></span></div><div id="tipsError" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg" style="background-color:#FEA500;"></span></div></div>';
$('body').append(a);
}
}
function showErr(b,a)
{
checkTipsDom();
showTips($('#tipsError'),b,a);
}
function showMsg(b,a)
{
checkTipsDom();
showTips($('#tipsMsg'),b,a);
}
function showTips(c,d,b)
{
var a=$('#tipsContainer');
a.show();
c.show().find('span').html(d);
setTimeout(function(){
a.hide();
c.hide();
},b||2000);
return this;
}
function showingTips(b,c,d)
{
var a=$('#tipsContainer');
if(c)
{
a.show();
b.show().find('span').html(d);
}
else{
a.hide();
b.hide();
}
return this;
}
function showTipsTop(a,b)
{
checkTipsDom();
showingTips($('#tipsTop'),a,b);
}
function generateTimer(e,b,c)
{
if(isNaN(e))
{
return false;
}
var f=e,d=c.processHandler,a=c.endHandler;
var g=setInterval(function(){
f=f-1000;
if(f<0)
{
typeof a=='function'&&a(Math.floor(f/1000));
clearInterval(g);
return false;
}
typeof d=='function'&&d(Math.floor(f/1000));
},b||1000);
$(window).on('hashchange',function(){
clearInterval(g);
});
return g;
}
function doIndexStatistic()
{
$(document).on('click','[data-statistics-item]',function(c){
var a=$(this);
if(a.attr('data-extra-statistics'))
{
var b=a.attr('data-extra-statistics').split(',');
if(b.length===3)
{
logKvEx({type:b[0]||'nosession_statistics',businame:b[1]||'new_index',item:b[2]});
}
}
logKvEx({type:a.attr('session_type')||'nosession_statistics',businame:a.attr('data-statistics-business')||'new_index',item:a.attr('data-statistics-item')});
});
}
function logKvEx(c)
{
var b={type:'session_statistics'};
c||(c={});
for(var a in c)
{
b[a]=c[a];
}
if(!b.item||(b.type=='nosession_statistics'&&!b.businame)||((b.type=='session_statistics'||b.type=='session_str_statistics')&&!b.sid))
{
return false;
}
new Image().src=['/cgi-bin/sellonlinestatic?type=',b.type,b.businame?'&businame='+b.businame:'','&item='+b.item,'&r='+Math.random(),(b.sid?'&sid='+b.sid:'')].join('');
}
function setItem(b,a)
{
if(!localStorage)
{
return false;
}
if(b&&Object.prototype.toString.call(a)=='[object Object]')
{
var c=JSON.stringify(a);
localStorage.setItem(b,c);
}
}
function getItem(a)
{
if(!localStorage)
{
return false;
}
if(a)
{
var b=localStorage.getItem(a);
return JSON.parse(b)||{};
}
}
function safeGetXmlData(a)
{
if(typeof a=='string')
{
return a;
}
else if(a&&a[0]&&a[0].DATA!=undefined)
{
return a[0].DATA;
}
else{
return a;
}
}
function getUrlParam(a)
{
var c=new RegExp("(^|&)"+a+"=([^&]*)(&|$)");
var b=window.location.search.substr(1).match(c);
if(b!=null)
{
if(/^[\u4e00-\u9fa5]+$/.test(decodeURIComponent(b[2])))
{
return b[2];
}
else{
return $("<div/>").text(b[2]).html();
}
}
return null;
}
$.fn.basetool={showErr:showErr,showMsg:showMsg,showTipsTop:showTipsTop,generateTimer:generateTimer,doIndexStatistic:doIndexStatistic,logKvEx:logKvEx,setPlaceholderEvent:setPlaceholderEvent,setItem:setItem,getItem:getItem,safeGetXmlData:safeGetXmlData,getUrlParam:getUrlParam};
var basetool=$.fn.basetool;
function initPriceSeach()
{
var b=$('#buy_amount'),c=$('#buy_result'),a=$('#lookupErrorInfo');
var f=function(j){
if(j!==undefined)
{
a.html(j).show();
c.html('0');
}
else{
a.hide();
}
};
var h;
var e=function(k,j){
h&&clearTimeout(h);
h=setTimeout(function(){
j();
},k);
};
var d='';
var g=null;
var i='/cgi-bin/bizmail_portal?tt=pricejson&t=bizmail_charges_introduce_v3&action=getprice&s=address_listall&count=';
b.on('input propertychange',function(j){
f('');
e(500,function(){
d=$.trim(b.val());
if(d=='')
{
f('\u8BF7\u8F93\u5165\u9700\u8981\u8D2D\u4E70\u7684\u7528\u6237\u6570');
}
else if(!/^[0-9]*[1-9][0-9]*$/.test(d))
{
f('\u8BF7\u8F93\u5165\u6B63\u6574\u6570');
}
else if(d<5)
{
f('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u7528\u6237');
}
else if(d>100000)
{
f('\u7528\u6237\u6570\u8FC7\u5927\uFF0C\u8BF7\u76F4\u63A5\u8054\u7CFB\u7ECF\u9500\u5546');
}
else{
if(g!=null)
{
g.abort();
}
g=$.ajax(i+d,{success:function(k){
if(k.errorcode==0)
{
basetool.logKvEx({type:"nosession_statistics",businame:"new_index",item:"price|show|index_middle"});
c.html(k.price);
}
else{
f('\u67E5\u8BE2\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u5C1D\u8BD5');
}
g=null;
},error:function(k){
g=null;
},dataType:'json'});
}
if(d<=5)
{
$('.js_minus_icon').attr('disabled','disabled');
}
else{
$('.js_minus_icon').removeAttr('disabled');
}
});
});
}
function initBuyStep1Price()
{
var c='',f=null,g='/cgi-bin/bizmail_portal?tt=pricejson&t=bizmail_charges_introduce_v3&action=getprice&s=address_listall&count=';
var e=function(j){
var h=$('#buy_result');
var i=$('#lookupErrorInfo');
if(j!==undefined)
{
i.html(j).show();
h.html('0');
}
else{
i.hide();
}
};
function a()
{
c=$.trim($("#buy_account_amount").val());
if(c=='')
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
return;
}
var h=parseInt($.trim($("#buy_account_amount").val()));
if(c!=""+h)
{
$("#buy_account_amount").val(parseInt($.trim($("#buy_account_amount").val())));
}
if(c=="0")
{
$("#buy_account_amount").val(5);
c=5;
}
else if(c<5)
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
return;
}
else if(c>100000)
{
basetool.showErr('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
$("#buy_account_amount").val(100000);
c=100000;
}
var j=$.trim($("#buy_year").val());
if(j=='')
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E701\u5E74');
return;
}
else if(j=="0")
{
$("#buy_year").val(1);
j=1;
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E701\u5E74');
}
else if(j<1)
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E701\u5E74');
return;
}
else if(j>10)
{
basetool.showErr('\u6700\u591A\u8D2D\u4E7010\u5E74');
$("#buy_year").val(10);
j=10;
}
var i=parseInt($.trim($("#buy_year").val()));
if(c!=""+i)
{
$("#buy_year").val(parseInt($.trim($("#buy_year").val())));
}
if(f!=null)
{
f.abort();
}
f=$.ajax(g+c,{success:function(k){
if(k.errorcode==0)
{
basetool.logKvEx({type:"nosession_statistics",businame:"new_index",item:"price|show|index_middle"});
$('.js_price_num').html(parseInt(k.price)*parseInt($("#buy_year").val()));
}
else{
basetool.showErr('\u67E5\u8BE2\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u5C1D\u8BD5');
}
f=null;
},error:function(k){
f=null;
},dataType:'json'});
}
$('.js_minus_icon').on('click',function(i){
if($('.js_minus_icon').attr('disabled'))
{
return;
}
var h=$('#buy_amount');
i.preventDefault();
var j=parseInt(h.val())-1;
if(isNaN(j))
{
j=5;
}
if(j<5)
{
j=5;
e('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
}
else if(j>100000)
{
j=100000;
e('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
}
h.val(j);
d();
if(j<=5)
{
$('.js_minus_icon').attr('disabled','disabled');
}
else{
$('.js_minus_icon').removeAttr('disabled');
}
});
$('.js_plus_icon').on('click',function(i){
var h=$('#buy_amount');
i.preventDefault();
var j=parseInt(h.val())+1;
if(isNaN(j))
{
j=5;
}
if(j<5)
{
j=5;
e('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
}
else if(j>100000)
{
j=100000;
e('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
}
h.val(j);
d();
if(j<=5)
{
$('.js_minus_icon').attr('disabled','disabled');
}
else{
$('.js_minus_icon').removeAttr('disabled');
}
});
function d(j)
{
var h=$('#buy_amount');
c=$.trim(h.val());
if(c=='')
{
e('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
return;
}
var i=parseInt($.trim(h.val()));
if(c!=""+i)
{
h.val(parseInt($.trim(h.val())));
}
if(c=="0")
{
h.val(5);
c=5;
}
else if(c<5)
{
e('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
h.val(5);
c=5;
}
else if(c>100000)
{
e('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
h.val(100000);
c=100000;
}
else{
e('');
}
if(f!=null)
{
f.abort();
}
f=$.ajax(g+c,{dataType:'json',success:function(k){
if(k.errorcode==0)
{
if(j!==true)
{
basetool.logKvEx({type:"nosession_statistics",businame:"new_index",item:"price|show|index_middle"});
}
$('#buy_result').html(parseInt(k.price));
}
else{
basetool.showErr('\u67E5\u8BE2\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u5C1D\u8BD5');
}
f=null;
},error:function(k){
f=null;
}});
}
(function(){
d(true);
var h=$.trim($('#buy_amount').val());
if(h<=5)
{
$('.js_minus_icon').attr('disabled','disabled');
}
else{
$('.js_minus_icon').removeAttr('disabled');
}
})();
$(document).delegate('.js_minus_account','click',function(h){
h.preventDefault();
var i=parseInt($("#buy_account_amount").val())-1;
if(isNaN(i))
{
i=5;
}
if(i<5)
{
i=5;
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
}
$("#buy_account_amount").val(i);
a();
});
$(document).delegate('.js_add_account','click',function(h){
h.preventDefault();
var i=parseInt($("#buy_account_amount").val())+1;
if(isNaN(i))
{
i=5;
}
if(i>100000)
{
i=100000;
basetool.showErr('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
}
$("#buy_account_amount").val(i);
a();
});
$(document).delegate('.js_add_year','click',function(h){
h.preventDefault();
var i=parseInt($("#buy_year").val())+1;
if(isNaN(i))
{
i=1;
}
$("#buy_year").val(i);
a();
});
$(document).delegate('.js_minus_year','click',function(h){
h.preventDefault();
var i=parseInt($("#buy_year").val())-1;
if(isNaN(i))
{
i=1;
}
if(i<1)
{
i=1;
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E701\u5E74');
}
$("#buy_year").val(i);
a();
});
var b=new RegExp("^[0-9]*$");
$(document).delegate('#buy_year','keyup',function(h){
if(!b.test($("#buy_year").val()))
{
$("#buy_year").val($("#buy_year").val().replace(/\D/g,''));
}
a();
});
$(document).delegate('#buy_account_amount','keyup',function(h){
if(!b.test($("#buy_account_amount").val()))
{
$("#buy_account_amount").val($("#buy_account_amount").val().replace(/\D/g,''));
}
a();
});
$("input[name='is_had_domain']").change(function(){
if($("input[name='is_had_domain']:checked").val()==="1")
{
$("#domain").removeAttr("disabled");
}
else{
$("#domain").attr("disabled","disabled");
}
});
$("#domain").bind('focus',function(){
var h=$("#domain").val();
var i=/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
$(".js_domain_input_tips").css("visibility","");
if(i.test(h)||h=="")
{
$(".valid_tip").css("color","");
}
else{
$(".valid_tip").css("color","#FF0000");
}
});
$("#domain").bind('blur',function(){
if($(".valid_tip").css("color")=="rgb(255, 0, 0)")
{
}
else{
$(".js_domain_input_tips").css("visibility","hidden");
}
});
$("#domain").bind('keyup',function(){
var h=$("#domain").val();
var i=/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
if(i.test(h)||h=="")
{
$(".valid_tip").css("color","");
}
else{
$(".valid_tip").css("color","#FF0000");
}
});
$(".company_name").bind('focus',function(){
$(".ent_name_tip").css("display","");
});
$(".company_name").bind('blur',function(){
$(".ent_name_tip").css("display","none");
});
$(".js_buy_now").click(function(l){
var h=$(l.currentTarget);
var i=(h.attr('class').indexOf('js_bd_index_buy_now')!=-1)?'&origin=bds':'';
var j=$.trim($("#domain").val());
if($.trim($("#buy_account_amount").val())==="")
{
basetool.showErr('\u8BF7\u8F93\u5165\u8D2D\u4E70\u5E10\u53F7\u6570');
return;
}
if(!/^[0-9]\d*$/.test($.trim($("#buy_account_amount").val())))
{
basetool.showErr('\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5E10\u53F7\u6570');
return;
}
if(parseInt($.trim($("#buy_account_amount").val()))<5)
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E705\u4E2A\u5E10\u53F7');
return;
}
if(parseInt($.trim($("#buy_account_amount").val()))>100000)
{
basetool.showErr('\u6700\u591A\u8D2D\u4E70100000\u4E2A\u5E10\u53F7');
return;
}
if($.trim($("#buy_year").val())==="")
{
basetool.showErr('\u8BF7\u8F93\u5165\u8D2D\u4E70\u5E74\u9650');
return;
}
if(!/^[0-9]\d*$/.test($.trim($("#buy_year").val())))
{
basetool.showErr('\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5E74\u9650');
return;
}
if(parseInt($.trim($("#buy_year").val()))<1)
{
basetool.showErr('\u6700\u5C11\u9700\u8981\u8D2D\u4E701\u5E74');
return;
}
if(parseInt($.trim($("#buy_year").val()))>10)
{
basetool.showErr('\u6700\u591A\u8D2D\u4E7010\u5E74');
return;
}
var m=0;
if($("#is_get_dp_coupon").is(':checked'))
{
m=1;
}
if($("input[name='is_had_domain']:checked").val()==="1")
{
var k=/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
if(j==="")
{
basetool.showErr('\u8BF7\u586B\u5199\u57DF\u540D');
$("#domain").focus();
return;
}
if(!k.test(j))
{
basetool.showErr('\u8BF7\u586B\u5199\u6B63\u786E\u7684\u57DF\u540D');
$("#domain").focus();
return;
}
if($(".company_name").val()=="")
{
basetool.showErr('\u8BF7\u586B\u5199\u4F01\u4E1A\uFF08\u7EC4\u7EC7\uFF09\u540D\u79F0');
$(".company_name").focus();
return;
}
basetool.logKvEx({"type":"nosession_statistics","businame":"sell_online","item":"HasDomain"});
basetool.logKvEx({"type":"nosession_activity_statistics","item":"paid_version_register_has_domain"});
location.href="/cgi-bin/bizmail_portal?t=bizmail_onlinesell&refer=intro&account_amount="+$.trim($("#buy_account_amount").val())+"&year_amount="+$.trim($("#buy_year").val())+"&company_name="+$(".company_name").val()+"&domain_name="+j+"&act=popUp"+i;
}
else{
if($(".company_name").val()=="")
{
basetool.showErr('\u8BF7\u586B\u5199\u4F01\u4E1A\uFF08\u7EC4\u7EC7\uFF09\u540D\u79F0');
$(".company_name").focus();
return;
}
basetool.logKvEx({"type":"nosession_statistics","businame":"sell_online","item":"HasNoDomain"});
basetool.logKvEx({"type":"nosession_activity_statistics","item":"paid_version_register_has_no_domain"});
location.href="/cgi-bin/bizmail_portal?t=bizmail_onlinesell&refer=intro&account_amount="+$.trim($("#buy_account_amount").val())+"&year_amount="+$.trim($("#buy_year").val())+"&company_name="+$(".company_name").val()+"&act=popUp"+i;
}
});
}
$.fn.price_helper={initPriceSeach:initPriceSeach,initBuyStep1Price:initBuyStep1Price};
;(function(a){
if(navigator.userAgent.indexOf('MSIE 9')===-1)
{
return;
}
a.addEventListener('selectionchange',function(){
var b=a.activeElement;
if(b.tagName==='TEXTAREA'||(b.tagName==='INPUT'&&b.type==='text'))
{
var c=a.createEvent('CustomEvent');
c.initCustomEvent('input',true,true,{});
b.dispatchEvent(c);
}
});
})(document);
function initAdvantageAnimaite()
{
var a=$(window);
window.renderTimeHandle="";
a.scroll(function(b){
_renderAnimate(a.scrollTop());
});
_addAnimateEvent();
_renderAnimate(a.scrollTop());
}
function _addAnimateEvent()
{
$(".advantage_logo_inbox").on("webkitAnimationEnd",function(a){
$(".advantage_item_wechat").removeClass("advantage_annimates");
});
$(".advantage_logo_inbox").on("mozAnimationEnd",function(a){
$(".advantage_item_wechat").removeClass("advantage_annimates");
});
$(".advantage_logo_inbox").on("MSAnimationEnd",function(a){
$(".advantage_item_wechat").removeClass("advantage_annimates");
});
$(".advantage_logo_inbox").on("oanimationend",function(a){
$(".advantage_item_wechat").removeClass("advantage_annimates");
});
$(".advantage_logo_inbox").on("animationend",function(a){
$(".advantage_item_wechat").removeClass("advantage_annimates");
});
$(".advantage_logo_mail_card_list").on("webkitAnimationEnd",function(a){
$(".advantage_item_combine").removeClass("advantage_annimates");
});
$(".advantage_logo_mail_card_list").on("mozAnimationEnd",function(a){
$(".advantage_item_combine").removeClass("advantage_annimates");
});
$(".advantage_logo_mail_card_list").on("MSAnimationEnd",function(a){
$(".advantage_item_combine").removeClass("advantage_annimates");
});
$(".advantage_logo_mail_card_list").on("oanimationend",function(a){
$(".advantage_item_combine").removeClass("advantage_annimates");
});
$(".advantage_logo_mail_card_list").on("animationend",function(a){
$(".advantage_item_combine").removeClass("advantage_annimates");
});
$(".advantage_logo_nju").on("webkitAnimationEnd",function(a){
$(".advantage_item_professional").removeClass("advantage_annimates");
});
$(".advantage_logo_nju").on("mozAnimationEnd",function(a){
$(".advantage_item_professional").removeClass("advantage_annimates");
});
$(".advantage_logo_nju").on("MSAnimationEnd",function(a){
$(".advantage_item_professional").removeClass("advantage_annimates");
});
$(".advantage_logo_nju").on("oanimationend",function(a){
$(".advantage_item_professional").removeClass("advantage_annimates");
});
$(".advantage_logo_nju").on("animationend",function(a){
$(".advantage_item_professional").removeClass("advantage_annimates");
});
$(".advantage_logo_mail").on("webkitAnimationEnd",function(a){
$(".advantage_item_safe").removeClass("advantage_annimates");
});
$(".advantage_logo_mail").on("mozAnimationEnd",function(a){
$(".advantage_item_safe").removeClass("advantage_annimates");
});
$(".advantage_logo_mail").on("MSAnimationEnd",function(a){
$(".advantage_item_safe").removeClass("advantage_annimates");
});
$(".advantage_logo_mail").on("oanimationend",function(a){
$(".advantage_item_safe").removeClass("advantage_annimates");
});
$(".advantage_logo_mail").on("animationend",function(a){
$(".advantage_item_safe").removeClass("advantage_annimates");
});
}
if(document.getElementById("baiduPromote")&&document.getElementById("baiduPromote").value=='1')
{
var triggerBound=[980,1587,2084,2647];
}
else{
var triggerBound=[0,400,700,1100];
}
function _renderAnimate(a)
{
if(a>=triggerBound[0]&&a<triggerBound[1])
{
$(".advantage_item_wechat").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
window.renderTimeHandle&&clearInterval(window.renderTimeHandle);
window.renderTimeHandle=setInterval(function(){
if($(window).scrollTop()>=triggerBound[0]&&$(window).scrollTop()<triggerBound[1])
{
$(".advantage_item_wechat").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
}
},5500);
}
if(a>=triggerBound[1]&&a<=triggerBound[2])
{
$(".advantage_item_combine").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
window.renderTimeHandle&&clearInterval(window.renderTimeHandle);
window.renderTimeHandle=setInterval(function(){
if($(window).scrollTop()>=triggerBound[1]&&$(window).scrollTop()<=triggerBound[2])
{
$(".advantage_item_combine").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
}
},5500);
}
if(a>triggerBound[2]&&a<triggerBound[3])
{
$(".advantage_item_professional").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
window.renderTimeHandle&&clearInterval(window.renderTimeHandle);
window.renderTimeHandle=setInterval(function(){
if($(window).scrollTop()>triggerBound[2]&&$(window).scrollTop()<triggerBound[3])
{
$(".advantage_item_professional").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
}
},2300);
}
if(a>triggerBound[3])
{
$(".advantage_item_safe").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
window.renderTimeHandle&&clearInterval(window.renderTimeHandle);
window.renderTimeHandle=setInterval(function(){
if($(window).scrollTop()>triggerBound[3])
{
$(".advantage_item_safe").find(".advantage_logo,.mouse_focus").show().end().addClass("advantage_annimates");
}
},2300);
}
}
$.fn.animate_util={initAdvantageAnimaite:initAdvantageAnimaite};
function adaptBodyWidth()
{
$(window).resize(function(){
var a=$('body'),b='screen_1920',c=a.hasClass(b),d=$(window).width();
if(d>=1440&&!c)
{
a.addClass(b);
}
if(d<1440&&c)
{
a.removeClass(b);
}
});
}
function adaptHeader()
{
var d=$(window).scrollTop();
var b=$("#indexTopSlide"),a=$("#indexTop");
var g=d;
var e=0;
var c=$('#index_banner_wrap').height();
if(d>c)
{
b.css({top:"0px",visibility:'visible'});
}
$(window).scroll(function(){
var h=$(window).scrollTop();
if(d<c&&c<h)
{
d=h;
b.css({visibility:'visible'});
b.animate({top:"0px"},100);
return;
}
if(h<c&&c<d)
{
d=h;
b.animate({top:"-360px"},{duration:100,complete:function(){
b.css({visibility:'hidden'});
}});
return;
}
});
var f;
$('.index_nav_item').hover(function(){
var h=$(this).children('.menu_pop');
if(h.length>0)
{
f=setTimeout(function(){
h.slideDown(200);
},100);
}
if($(this).find(".js_onliesell_hover_icon").length!=0)
{
$(this).find(".js_onliesell_hover_icon").removeClass("icon_tri_down").addClass("icon_tri_up");
}
},function(){
var h=$(this).children('.menu_pop');
if(h.length>0)
{
clearTimeout(f);
h.slideUp(200);
if($(this).find(".js_onliesell_hover_icon").length!=0)
{
$(this).find(".js_onliesell_hover_icon").removeClass("icon_tri_up").addClass("icon_tri_down");
}
}
});
}
$.fn.adapt_helper={adaptBodyWidth:adaptBodyWidth,adaptHeader:adaptHeader};
var citydata=[{province:'\u5317\u4EAC',city:['\u5317\u4EAC'],provid:4},{province:'\u5929\u6D25',city:['\u5929\u6D25','\u5858\u6CBD\u533A'],provid:5},{province:'\u6CB3\u5317',city:["\u77F3\u5BB6\u5E84","\u90AF\u90F8","\u8861\u6C34","\u90A2\u53F0","\u5F20\u5BB6\u53E3","\u627F\u5FB7","\u79E6\u7687\u5C9B","\u5ECA\u574A","\u5510\u5C71","\u4FDD\u5B9A","\u6CA7\u5DDE"],provid:6},{province:'\u5C71\u897F',city:["\u592A\u539F","\u957F\u6CBB","\u664B\u4E2D","\u6714\u5DDE","\u5927\u540C","\u5415\u6881","\u5FFB\u5DDE","\u9633\u6CC9","\u4E34\u6C7E","\u8FD0\u57CE","\u664B\u57CE","\u4E94\u53F0\u5C71"],provid:8},{province:'\u5185\u8499\u53E4',city:["\u547C\u548C\u6D69\u7279","\u547C\u4F26\u8D1D\u5C14","\u5174\u5B89\u76DF","\u9521\u6797\u90ED\u52D2\u76DF","\u5DF4\u5F66\u6DD6\u5C14\u76DF","\u5305\u5934","\u9521\u6797\u6D69\u7279","\u901A\u8FBD","\u8D64\u5CF0","\u4E4C\u6D77","\u9102\u5C14\u591A\u65AF","\u4E4C\u5170\u5BDF\u5E03\u5E02"],provid:10},{province:'\u8FBD\u5B81',city:["\u6C88\u9633","\u846B\u82A6\u5C9B","\u76D8\u9526","\u8FBD\u9633","\u94C1\u5CAD","\u961C\u65B0","\u671D\u9633","\u9526\u5DDE","\u978D\u5C71","\u672C\u6EAA","\u629A\u987A","\u8425\u53E3","\u4E39\u4E1C","\u74E6\u623F\u5E97","\u5927\u8FDE"],provid:3},{province:'\u5409\u6797',city:["\u5409\u6797\u5E02","\u8FBD\u6E90","\u901A\u5316","\u767D\u57CE","\u677E\u539F","\u957F\u6625","\u6866\u7538","\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE","\u96C6\u5B89","\u767D\u5C71","\u56DB\u5E73"],provid:2},{province:'\u9ED1\u9F99\u6C5F',city:["\u54C8\u5C14\u6EE8","\u5927\u5174\u5B89\u5CAD","\u9ED1\u6CB3","\u9F50\u9F50\u54C8\u5C14","\u7EE5\u5316","\u9E64\u5C97","\u4F73\u6728\u65AF","\u4F0A\u6625","\u53CC\u9E2D\u5C71","\u9E21\u897F","\u6F20\u6CB3","\u5927\u5E86","\u4E03\u53F0\u6CB3","\u7261\u4E39\u6C5F","\u7EE5\u82AC\u6CB3"],provid:1},{province:'\u4E0A\u6D77',city:['\u4E0A\u6D77'],provid:23},{province:'\u6C5F\u82CF',city:["\u5357\u4EAC","\u65E0\u9521","\u82CF\u5DDE","\u76F1\u7719","\u8D63\u6986","\u4E1C\u53F0","\u9AD8\u90AE","\u9547\u6C5F","\u6CF0\u5DDE","\u5BBF\u8FC1","\u5F90\u5DDE","\u8FDE\u4E91\u6E2F","\u6DEE\u5B89","\u626C\u5DDE","\u76D0\u57CE","\u5357\u901A","\u5E38\u5DDE"],provid:22},{province:'\u6D59\u6C5F',city:["\u676D\u5DDE","\u6E56\u5DDE","\u5D4A\u5DDE","\u5E73\u6E56","\u77F3\u6D66","\u5B81\u6D77","\u6D1E\u5934","\u821F\u5C71","\u5609\u5174","\u5B9A\u6D77","\u91D1\u534E","\u7ECD\u5174","\u5B81\u6CE2","\u8862\u5DDE","\u4E3D\u6C34","\u53F0\u5DDE","\u6E29\u5DDE"],provid:24},{province:'\u5B89\u5FBD',city:["\u9A6C\u978D\u5C71","\u6DEE\u5357","\u6DEE\u5317","\u94DC\u9675","\u6EC1\u5DDE","\u5DE2\u6E56","\u6C60\u5DDE","\u5BA3\u57CE","\u4EB3\u5DDE","\u5BBF\u5DDE","\u961C\u9633","\u516D\u5B89","\u868C\u57E0","\u5408\u80A5","\u829C\u6E56","\u5B89\u5E86","\u9EC4\u5C71"],provid:21},{province:'\u798F\u5EFA',city:["\u798F\u5DDE","\u8386\u7530","\u6D66\u57CE","\u5357\u5E73","\u5B81\u5FB7","\u9F99\u5CA9","\u4E09\u660E","\u6CC9\u5DDE","\u6F33\u5DDE","\u53A6\u95E8"],provid:27},{province:'\u6C5F\u897F',city:["\u5357\u660C","\u5E90\u5C71","\u7389\u5C71","\u8D35\u6EAA","\u5E7F\u660C","\u840D\u4E61","\u65B0\u4F59","\u5B9C\u6625","\u8D63\u5DDE","\u4E5D\u6C5F","\u666F\u5FB7\u9547","\u9E70\u6F6D","\u4E0A\u9976","\u629A\u5DDE"],provid:26},{province:'\u5C71\u4E1C',city:["\u6D4E\u5357","\u5FB7\u5DDE","\u6EE8\u5DDE","\u70DF\u53F0","\u804A\u57CE","\u6CF0\u5B89","\u6DC4\u535A","\u6F4D\u574A","\u9752\u5C9B","\u6D4E\u5B81","\u65E5\u7167","\u6CF0\u5C71","\u67A3\u5E84","\u4E1C\u8425","\u5A01\u6D77","\u83B1\u829C","\u4E34\u6C82","\u83CF\u6CFD"],provid:7},{province:'\u6CB3\u5357',city:["\u90D1\u5DDE","\u5B89\u9633","\u4E09\u95E8\u5CE1","\u5357\u9633","\u5468\u53E3","\u9A7B\u9A6C\u5E97","\u4FE1\u9633","\u5F00\u5C01","\u6D1B\u9633","\u5E73\u9876\u5C71","\u7126\u4F5C","\u9E64\u58C1","\u65B0\u4E61","\u6FEE\u9633","\u8BB8\u660C","\u6F2F\u6CB3","\u5546\u4E18","\u6D4E\u6E90"],provid:19},{province:'\u6E56\u5317',city:["\u6B66\u6C49","\u8944\u6A0A","\u5B9C\u660C","\u8346\u95E8","\u8346\u5DDE","\u9EC4\u5188","\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","\u9EC4\u77F3","\u9102\u5DDE","\u5B5D\u611F","\u54B8\u5B81","\u968F\u5DDE","\u4ED9\u6843","\u5929\u95E8","\u6F5C\u6C5F","\u795E\u519C\u67B6"],provid:18},{province:'\u6E56\u5357',city:["\u957F\u6C99","\u5F20\u5BB6\u754C","\u5CB3\u9633","\u6000\u5316","\u90B5\u9633","\u76CA\u9633","\u90F4\u5DDE","\u6851\u690D","\u6C85\u9675","\u5357\u5CB3","\u682A\u6D32","\u6E58\u6F6D","\u8861\u9633","\u5A04\u5E95","\u5E38\u5FB7"],provid:25},{province:'\u5E7F\u4E1C',city:["\u5E7F\u5DDE","\u5357\u96C4","\u97F6\u5173","\u6E05\u8FDC","\u6885\u5DDE","\u8087\u5E86","\u60E0\u5DDE","\u6CB3\u6E90","\u6C55\u5934","\u6DF1\u5733","\u6C55\u5C3E","\u6E5B\u6C5F","\u9633\u6C5F","\u8302\u540D","\u4F5B\u5188","\u6885\u53BF","\u7535\u767D","\u9AD8\u8981","\u73E0\u6D77","\u4F5B\u5C71","\u6C5F\u95E8","\u4E1C\u839E","\u4E2D\u5C71","\u6F6E\u5DDE","\u63ED\u9633","\u4E91\u6D6E"],provid:30},{province:'\u5E7F\u897F',city:["\u5357\u5B81","\u6842\u6797","\u6CB3\u6C60","\u67F3\u5DDE","\u767E\u8272","\u8D35\u6E2F","\u68A7\u5DDE","\u94A6\u5DDE","\u5317\u6D77","\u9632\u57CE\u6E2F","\u7389\u6797","\u8D3A\u5DDE","\u6765\u5BBE","\u5D07\u5DE6"],provid:31},{province:'\u6D77\u5357',city:["\u6D77\u53E3","\u4E09\u4E9A","\u5C6F\u660C","\u743C\u6D77","\u510B\u5DDE","\u6587\u660C","\u4E07\u5B81","\u4E1C\u65B9","\u6F84\u8FC8","\u5B9A\u5B89","\u4E34\u9AD8","\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF\u660C","\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF","\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF","\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"],provid:32},{province:'\u91CD\u5E86',city:["\u91CD\u5E86","\u5949\u8282","\u6DAA\u9675"],provid:17},{province:'\u56DB\u5DDD',city:["\u6210\u90FD","\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE","\u7EF5\u9633","\u96C5\u5B89","\u5CE8\u7709\u5C71","\u4E50\u5C71","\u5B9C\u5BBE","\u5DF4\u4E2D","\u8FBE\u5DDE","\u9042\u5B81","\u5357\u5145","\u6CF8\u5DDE","\u81EA\u8D21","\u6500\u679D\u82B1","\u5FB7\u9633","\u5E7F\u5143","\u5185\u6C5F","\u5E7F\u5B89","\u7709\u5C71","\u8D44\u9633","\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE"],provid:16},{province:'\u8D35\u5DDE',city:["\u8D35\u9633","\u6BD5\u8282","\u9075\u4E49","\u94DC\u4EC1","\u5B89\u987A","\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","\u516D\u76D8\u6C34"],provid:28},{province:'\u4E91\u5357',city:["\u6606\u660E","\u662D\u901A","\u4E3D\u6C5F","\u66F2\u9756","\u4FDD\u5C71","\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE","\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE","\u745E\u4E3D","\u7389\u6EAA","\u4E34\u6CA7","\u601D\u8305","\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE","\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE","\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE","\u6012\u6C5F\u50F3\u50F3\u65CF\u81EA\u6CBB\u533A"],provid:29},{province:'\u897F\u85CF',city:["\u62C9\u8428","\u90A3\u66F2","\u65E5\u5580\u5219","\u5C71\u5357","\u963F\u91CC","\u660C\u90FD","\u6797\u829D"],provid:15},{province:'\u9655\u897F',city:["\u897F\u5B89","\u6986\u6797","\u5EF6\u5B89","\u6E2D\u5357","\u6C49\u4E2D","\u5546\u6D1B","\u5B89\u5EB7","\u94DC\u5DDD","\u5B9D\u9E21","\u54B8\u9633"],provid:9},{province:'\u7518\u8083',city:["\u5170\u5DDE","\u5F20\u6396","\u91D1\u660C","\u6B66\u5A01","\u767D\u94F6","\u5B9A\u897F","\u5E73\u51C9","\u5E86\u9633","\u7518\u5357","\u4E34\u590F","\u5929\u6C34","\u5609\u5CEA\u5173","\u9152\u6CC9","\u9647\u5357"],provid:12},{province:'\u9752\u6D77',city:["\u897F\u5B81","\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE","\u6D77\u4E1C"],provid:13},{province:'\u5B81\u590F',city:["\u94F6\u5DDD","\u77F3\u5634\u5C71","\u5434\u5FE0","\u56FA\u539F"],provid:11},{province:'\u65B0\u7586',city:["\u4E4C\u9C81\u6728\u9F50","\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE","\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE","\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE","\u963F\u62C9\u5C14","\u514B\u62C9\u739B\u4F9D","\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE","\u5410\u9C81\u756A","\u963F\u514B\u82CF","\u77F3\u6CB3\u5B50","\u5580\u4EC0","\u548C\u7530","\u54C8\u5BC6","\u5947\u53F0"],provid:14},{province:'\u53F0\u6E7E',city:['\u53F0\u6E7E'],provid:20},{province:'\u9999\u6E2F',city:['\u9999\u6E2F'],provid:48},{province:'\u6FB3\u95E8',city:['\u6FB3\u95E8'],provid:49}];
function initProvCity(b,a)
{
if(citydata&&$.isArray(citydata))
{
var c={province:'\u56FD\u5916',city:['\u56FD\u5916'],provid:9998};
citydata.push(c);
}
var d=function(i){
var f=[],h='',g='';
$.each(citydata,function(j,k){
if(k.province==i)
{
f=k.city;
h=k.provid;
return;
}
});
$('#provid').val(h);
$.each(f,function(j,k){
if(k==a.attr("v"))
{
g+='<option value="'+k+'" selected>'+k+'</option>';
}
else{
g+='<option value="'+k+'">'+k+'</option>';
}
});
a.html(g);
};
var e=function(){
if(undefined!==citydata&&citydata.length>0)
{
var f='';
var g=null;
$.each(citydata,function(h,j){
if(j.provid==b.attr("v"))
{
g=j.province;
f+='<option value="'+j.province+'" selected>'+j.province+'</option>';
}
else{
f+='<option value="'+j.province+'">'+j.province+'</option>';
}
});
b.html(f);
d(g||citydata[0].province);
}
};
e();
b.on('change',function(f){
d(b.val());
});
}
;$.fn.city_data={initProvCity:initProvCity};
function nano(b,a)
{
return b.replace(/\{([\w\.]*)\}/g,function(g,d){
var e=d.split("."),h=a[e.shift()];
for(var c=0,f=e.length;c<f;c++)
h=h[e[c]];
return (typeof h!=="undefined"&&h!==null)?h:"";
});
}
$.fn.nano=nano;
var nano=$.fn.nano;
function dropDownTpl(b)
{
var d;
var c=['<a class="qui_btn qy_btn {dropDownClass}" href="javascript:;">','<span class="{labelClass}">{label}</span>','<span class="qy_btn_Dropdown_arrow"></span>','</a>','<div class="qui_dropdownMenu {dropDownMenuClass}">','<ul>'].join('');
d=nano(c,b);
var a=['<li data-value="{value}" data-index="{index}" class="qui_dropdownMenu_item {menuItemClass}">','<a href="javascript:;" class="qui_dropdownMenu_itemLink {menuItemLinkClass}">','<span class="qy_commonImg qy_commonImg_TimePickerChecked"></span>','<span class="qy_dropdownMenu_itemLink_text">{name}</span>','</a>','</li>'].join('');
$.each(b.data,function(e,f){
f.index=e;
d+=nano(a,f);
});
d+=['</ul>','</div>'];
return d;
}
$.fn.dropDownTpl=dropDownTpl;
var nano=$.fn.nano;
function dropDownTpl2(b)
{
var d;
var c=['<a class="em_btn {dropDownClass}" href="javascript:;">','<span class="{labelClass}">{label}</span>','<span class="em_btn_Dropdown_arrow"></span>','</a>','<div class="em_dropdownMenu {dropDownMenuClass}">','<ul>'].join('');
d=nano(c,b);
var a=['<li data-value="{value}" data-index="{index}" class="em_dropdownMenu_item {menuItemClass}">','<a href="javascript:;" class="em_dropdownMenu_itemLink {menuItemLinkClass}">','<span class="em_commonImg em_commonImg_Chosen"></span>','<span class="em_dropdownMenu_itemLink_text">{name}</span>','</a>','</li>'].join('');
$.each(b.data,function(e,f){
f.index=e;
d+=nano(a,f);
});
d+=['</ul></div>'];
return d;
}
$.fn.dropDownTpl2=dropDownTpl2;
var nano=$.fn.nano;
function corpIndustryTpl(c)
{
var g;
g='<ul class="register_industry_cnt">';
var b=['<li data-value="{id}" data-name="{name}" class="em_dropdownMenu_item js_register_industry_maintype_item register_industry_maintype_item">','<a href="javascript:;" class="em_dropdownMenu_itemLink register_industry_maintype_item_link">','{name} <span class="em_icon em_commonImg_ArrowMediumRight register_industry_maintype_icon_Pos js_register_industry_maintype_icon"></span>','</a>'].join('');
var f=['<div class="register_industry_subtype_cnt js_register_industry_subtype_cnt">','<ul>'].join('');
var e=['<li data-value="{id}" data-name="{name}" class="em_dropdownMenu_item register_industry_subtype_item js_register_industry_subtype_item">','<a href="javascript:;" class="em_dropdownMenu_itemLink">{name}</a>','</li>'].join('');
var d='</ul></div>';
var a='</li>';
$.each(c,function(h,i){
g+=nano(b,i);
if(i.children&&i.children.length)
{
g+=f;
$.each(i.children,function(j,k){
g+=nano(e,k);
});
g+=d;
}
g+=a;
});
g+='</ul>';
return g;
}
$.fn.corpIndustryTpl=corpIndustryTpl;
var nano=$.fn.nano;
function dropDownItemTpl(b)
{
var c=['<ul>'].join('');
var a=['<li data-value="{value}" data-index="{index}" class="qui_dropdownMenu_item '+b.menuItemClass+'">','<a href="javascript:;" class="qui_dropdownMenu_itemLink '+b.menuItemLinkClass+'">','<span class="qy_commonImg qy_commonImg_TimePickerChecked"></span>','<span class="qy_dropdownMenu_itemLink_text">{name}</span>','</a>','</li>'].join('');
$.each(b.data,function(d,e){
e.index=d;
c+=nano(a,e);
});
c+=['</ul>'];
return c;
}
$.fn.dropDownItemTpl=dropDownItemTpl;
var tpl=$.fn.dropDownTpl;
var listTpl=$.fn.dropDownItemTpl;
var _opt={label:'\u8BF7\u9009\u62E9',data:[],callback:$.noop,render:$.noop,delay:500,disabled:false,dropDownClass:'qy_btn_Dropdown',dropDownMenuClass:'qy_dropdownMenu',menuItemClass:'qy_dropdownMenu_item',menuItemLinkClass:'qy_dropdownMenu_itemLink',menuItemLinkLabelClass:'qy_dropdownMenu_itemLink_text',labelClass:'qy_btn_Dropdown_label',selectedClass:'qy_dropdownMenu_item_Curr',className:'qy_btnWithMenu'};
function Dropdown(a)
{
this.opt=$.extend(true,{tpl:tpl,listTpl:listTpl},_opt,a);
this.initialize(this.opt);
return this;
}
Dropdown.prototype={initialize:function(e){
var f=this;
f.container=$(e.container);
f.container.addClass(e.className);
if(e.render&&typeof e.render)
{
e.renderHtml='';
$.each(e.data,function(g,h){
e.renderHtml+=e.render(h);
});
}
var c='.'+this.getSplitClass(e.dropDownClass);
var d='.'+this.getSplitClass(e.dropDownMenuClass);
var a=f.container.find(c);
var b=f.container.find(d);
if(!a.length||!b.length)
{
f.container.html(e.tpl(e));
a=f.container.find(c);
b=f.container.find(d);
}
f.$dropDown=a;
f.$dropdownMenu=b;
if(e.data.length>0)
{
f.renderList(e.data);
}
if(e.disabled)
{
f.$dropDown.attr('disabled','disabled');
}
f._data={};
this.bindData(f.opt);
this.bindEvent(f.opt);
},setDataValue:function(a){
if(!a||typeof a!='object')
a={name:a};
if(a.value===undefined)
{
a.value=a.name;
}
if(isNaN(a.index))
{
a.index=-1;
}
this._data=a;
this.$dropDown.find('.'+this.opt.labelClass).text(a.name);
},bindBaseEvent:function(a){
var c=this;
var b=false;
c.$dropDown.on('click',function(){
if(c.$dropDown.attr('disabled')=='disabled')
{
return;
}
c.$dropdownMenu.toggle();
if(c.$dropdownMenu.is(':hidden'))
{
c._onHide();
}
else{
c._onShow();
}
b=true;
});
this._id='dropdown_'+Math.floor(Math.random()*10000)+1;
$(document).on('click.'+this._id,function(d){
if(!b)
{
c.hideDropdowns();
}
b=false;
});
c.$dropdownMenu.on('click','.'+this.getSplitClass(a.menuItemClass),function(g,h){
if($(g.target).attr('disabled')=='disabled'||$(g.target).parents('.'+a.menuItemClass).attr('disabled')=='disabled')
{
b=true;
return;
}
var d=$(this);
var f={value:d.data('value'),name:d.find('.'+a.menuItemLinkLabelClass).text()||d.text().trim(),index:d.data('index')};
if(f.value==undefined)
{
f.value=f.name;
}
if(c._data.value==undefined||(c._data.value!=undefined&&c._data.value!==f.value))
{
c.$dropdownMenu.find('.'+a.selectedClass).removeClass(a.selectedClass);
d.addClass(a.selectedClass);
c.setDataValue(f);
if(a.onChange&&typeof a.callback=='function'&&(!h||h.silent!=true))
{
a.onChange.call($(this),f);
}
}
b=false;
c.hideDropdowns();
g.stopPropagation();
});
c.$dropdownMenu.on('mouseover',function(f){
if(c.isScrolling)
{
c.isScrolling=false;
return;
}
c.$dropdownMenu.find('.qy_dropdownMenu_item_Hover').removeClass('qy_dropdownMenu_item_Hover');
var d=$(f.target).parents('.qy_dropdownMenu_item');
if(d.hasClass('qy_dropdownMenu_item'))
{
d.addClass('qy_dropdownMenu_item_Hover');
}
});
c.$dropdownMenu.on('mouseout',function(f){
var d=$(f.target).parents('.qy_dropdownMenu_item');
if(d.hasClass('qy_dropdownMenu_item'))
{
d.removeClass('qy_dropdownMenu_item_Hover');
}
});
c.$dropDown.on('keydown',$.debounce(100,true,function(d,f){
if(d.which==40||d.which==38||d.which==13)
{
d.preventDefault();
c.processkeyborad(d.which);
return;
}
}));
c.$dropDown.on('keyup',function(d,f){
if(d.which==13)
{
d.stopPropagation();
}
});
c.$dropDown.on('keydown',function(d,f){
if(d.which==13)
{
d.stopPropagation();
}
});
},bindData:function(){
var b=this;
if(this.$dropdownMenu.length>0)
{
var a=0;
this.$dropdownMenu.find('.'+this.getSplitClass(this.opt.menuItemClass)).each(function(e){
var c=$(this);
c.data('index',a);
c.attr('data-index',a);
var d=c.find('.'+b.opt.menuItemLinkLabelClass).text()||c.text().trim();
if(c.hasClass(b.opt.selectedClass))
{
b._data.value=c.data('value');
b._data.index=a;
b._data.name=d;
}
if(c.attr('data-value')==undefined)
{
c.attr('data-value',d);
}
a++;
});
}
},bindEvent:function(){
},renderList:function(a){
this.opt.data=a;
this.$dropdownMenu.html(this.opt.listTpl(this.opt));
},processkeyborad:function(c){
var a=this.$dropdownMenu.find('.qy_dropdownMenu_item_Hover:visible');
if(a.length==0)
{
a=this.$dropdownMenu.find('.'+this.opt.selectedClass+':visible');
}
if(c==13&&a.length==0)
{
var i=this.getText(),d=[],h=this.$dropdownMenu.find('.'+this.opt.menuItemClass+':visible');
if(h.length==1)
{
d=[h];
}
else{
h.each(function(){
if($(this).attr('data-value')==i)
{
d.push($(this));
}
});
}
if(d.length==1)
{
a=d[0];
}
else{
return;
}
}
var b=[];
switch(c)
{case 38:
if(a.length==0)
{
b=a=this.$dropdownMenu.find('.'+this.opt.menuItemClass+':visible:last');
}
else{
b=a.prevAll().filter(':visible:eq(0)');
}
break;
case 40:
if(this.$dropdownMenu.is(':hidden'))
{
this.$dropdownMenu.show();
a=this.$dropdownMenu.find('.'+this.opt.selectedClass+':visible');
break;
}
if(a.length==0)
{
b=a=this.$dropdownMenu.find('.'+this.opt.menuItemClass+':visible:eq(0)');
}
else{
b=a.nextAll().filter(':visible:eq(0)');
}
break;
case 13:
a.trigger('click');
this.$dropDown.blur();
return;
}if(b.length==0&&a.length!=0)
{
b=a;
}
if(b.length!=0)
{
a.removeClass('qy_dropdownMenu_item_Hover');
b.addClass('qy_dropdownMenu_item_Hover');
var e=b.position();
var g=this.$dropdownMenu.scrollTop();
var f=this.$dropdownMenu.height();
if(e.top+b.height()-5>f||e.top<-5)
{
this.$dropdownMenu.scrollTop(g+e.top-100);
this.isScrolling=true;
}
}
},hideDropdowns:function(){
var a=this;
if(!a.$dropdownMenu.is(':hidden'))
{
a.$dropdownMenu.hide();
a._onHide();
}
},scrollToSelectedItem:function(){
if(!this.$dropdownMenu.length)
{
return;
}
this.$dropdownMenu.css('visibility','hidden');
this.$dropdownMenu.show();
var a=this.$dropdownMenu.find('.'+this.opt.selectedClass).position();
if(!a)
{
this.$dropdownMenu.hide();
this.$dropdownMenu.css('visibility','inherit');
return;
}
var c=this.$dropdownMenu.scrollTop();
var b=this.$dropdownMenu.height();
if(a.top>b||a.top<0)
{
this.$dropdownMenu.scrollTop(c+a.top-100);
}
this.$dropdownMenu.hide();
this.$dropdownMenu.css('visibility','inherit');
},reset:function(){
this.$dropdownMenu.find('.'+this.opt.selectedClass).removeClass(this.opt.selectedClass);
this.$dropDown.find('.'+this.opt.labelClass).text(this.opt.label);
this._data={};
},select:function(a,b){
this.$dropdownMenu.find('.'+this.getSplitClass(this.opt.menuItemClass)+"[data-index='"+a+"']").trigger('click',b);
this.scrollToSelectedItem();
},selectByValue:function(b,a){
this.$dropdownMenu.find('.'+this.getSplitClass(this.opt.menuItemClass)+"[data-value='"+b+"']").trigger('click',a);
this.scrollToSelectedItem();
},selectByName:function(c,b){
var a;
this.$dropdownMenu.find('.'+this.getSplitClass(this.opt.menuItemClass)+' .'+this.opt.menuItemLinkLabelClass).each(function(){
if(this.innerText==c)
{
a=$(this);
}
});
a&&a.trigger('click',b);
this.scrollToSelectedItem();
},getValue:function(){
return this._data;
},getSplitClass:function(a){
return (a||'').split(/\s+/)[0];
},setLabel:function(a){
this.$dropDown.find('.'+this.opt.labelClass).text(a);
},destroy:function(){
$(document).off('click.'+this._id);
},enable:function(){
this.opt.disabled=false;
this.$dropDown.removeAttr('disabled');
return this;
},disable:function(){
this.opt.disabled=true;
this.$dropDown.attr('disabled','disabled');
return this;
},_onHide:function(){
var a=this;
this.opt.onHide&&this.opt.onHide();
a.container.removeClass('qy_btnWithMenu_Open');
setTimeout(function(){
a.scrollToSelectedItem();
a.$dropdownMenu.find('.qy_dropdownMenu_item_Hover').removeClass('qy_dropdownMenu_item_Hover');
},0);
},_onShow:function(){
this.container.addClass('qy_btnWithMenu_Open');
this.opt.onShow&&this.opt.onShow();
},extend:function(){
this.opt=$.extend(true,{tpl:tpl,listTpl:listTpl},this,opt);
this.initialize(this.opt);
}};
Dropdown.extend=function(a){
this.prototype=$.extend(true,{tpl:tpl,listTpl:listTpl},this.prototype,a);
return this;
};
$.fn.Dropdown=Dropdown;
var countryCodeMap=[{name:'\u963F\u66FC',code:'968',rules:[9],sort:'A'},{name:'\u963F\u585E\u62DC\u7586',code:'994',rules:[9],sort:'A'},{name:'\u963F\u68EE\u677E',code:'247',rules:[4],sort:'A'},{name:'\u57C3\u53CA',code:'20',rules:[8],sort:'A'},{name:'\u57C3\u585E\u4FC4\u6BD4\u4E9A',code:'251',rules:[7],sort:'A'},{name:'\u963F\u9C81\u5DF4',code:'297',rules:[7],sort:'A'},{name:'\u7231\u6C99\u5C3C\u4E9A',code:'372',rules:[7,8],sort:'A'},{name:'\u5B89\u9053\u5C14',code:'376',rules:[6],sort:'A'},{name:'\u5B89\u54E5\u62C9',code:'244',rules:[6],sort:'A'},{name:'\u5B89\u572D\u62C9',code:'1264',rules:[7],sort:'A'},{name:'\u5B89\u63D0\u74DC\u548C\u5DF4\u5E03\u8FBE',code:'1268',rules:[7],sort:'A'},{name:'\u963F\u62C9\u4F2F\u8054\u5408\u914B\u957F\u56FD',code:'971',rules:[11],sort:'A'},{name:'\u5965\u5730\u5229',code:'43',rules:[8],sort:'A'},{name:'\u963F\u6839\u5EF7',code:'54',rules:[7],sort:'A'},{name:'\u6FB3\u5927\u5229\u4E9A',code:'61',rules:[10],sort:'A'},{name:'\u963F\u5BCC\u6C57',code:'93',rules:[6],sort:'A'},{name:'\u963F\u5C14\u53CA\u5229\u4E9A',code:'213',rules:[6],sort:'A'},{name:'\u7231\u5C14\u5170',code:'353',rules:[9],sort:'A'},{name:'\u963F\u5C14\u5DF4\u5C3C\u4E9A',code:'355',rules:[7],sort:'A'},{name:'\u5DF4\u5E03\u4E9A\u65B0\u51E0\u5185\u4E9A',code:'675',rules:[7],sort:'B'},{name:'\u767E\u6155\u5927',code:'1441',rules:[7],sort:'B'},{name:'\u4FDD\u52A0\u5229\u4E9A',code:'359',rules:[7],sort:'B'},{name:'\u8D1D\u5B81',code:'229',rules:[8],sort:'B'},{name:'\u6BD4\u5229\u65F6',code:'32',rules:[8],sort:'B'},{name:'\u767D\u4FC4\u7F57\u65AF',code:'375',rules:[9],sort:'B'},{name:'\u6CE2\u591A\u9ECE\u5404',code:'1',rules:[10],sort:'B'},{name:'\u6CE2\u5170',code:'48',rules:[10],sort:'B'},{name:'\u73BB\u5229\u7EF4\u4E9A',code:'591',rules:[7],sort:'B'},{name:'\u4F2F\u5229\u5179',code:'501',rules:[7],sort:'B'},{name:'\u535A\u8328\u74E6\u7EB3',code:'267',rules:[7],sort:'B'},{name:'\u5DF4\u897F',code:'55',rules:[8],sort:'B'},{name:'\u5317\u9A6C\u91CC\u4E9A\u7EB3\u7FA4\u5C9B',code:'1670',rules:[9],sort:'B'},{name:'\u5DF4\u62FF\u9A6C',code:'507',rules:[7],sort:'B'},{name:'\u5E03\u57FA\u7EB3\u6CD5\u7D22',code:'226',rules:[6],sort:'B'},{name:'\u5DF4\u6797',code:'973',rules:[8],sort:'B'},{name:'\u5E03\u9686\u8FEA',code:'257',rules:[8],sort:'B'},{name:'\u5DF4\u57FA\u65AF\u5766',code:'92',rules:[11],sort:'B'},{name:'\u5DF4\u62C9\u572D',code:'595',rules:[9],sort:'B'},{name:'\u5DF4\u5DF4\u591A\u65AF',code:'1246',rules:[7],sort:'B'},{name:'\u79D8\u9C81',code:'51',rules:[9],sort:'B'},{name:'\u51B0\u5C9B',code:'354',rules:[7],sort:'B'},{name:'\u6CE2\u65AF\u5C3C\u4E9A\u548C\u9ED1\u585E\u54E5\u7EF4\u90A3',code:'387',rules:[9],sort:'B'},{name:'\u5DF4\u54C8\u9A6C',code:'1242',rules:[7],sort:'B'},{name:'\u4E0D\u4E39',code:'975',rules:[5],sort:'B'},{name:'\u671D\u9C9C',code:'850',rules:[9],sort:'C'},{name:'\u8D64\u9053\u51E0\u5185\u4E9A',code:'240',rules:[9],sort:'C'},{name:'\u591A\u7C73\u5C3C\u52A0\u5171\u548C\u56FD',code:'1809',rules:[9],sort:'D'},{name:'\u4E1C\u5E1D\u6C76',code:'670',rules:[9],sort:'D'},{name:'\u4E39\u9EA6',code:'45',rules:[8],sort:'D'},{name:'\u5FB7\u56FD',code:'49',rules:[11],sort:'D'},{name:'\u4E1C\u8428\u6469\u4E9A(\u7F8E)',code:'1684',rules:[7],sort:'D'},{name:'\u591A\u7C73\u5C3C\u52A0',code:'1767',rules:[7],sort:'D'},{name:'\u591A\u54E5',code:'228',rules:[7],sort:'D'},{name:'\u5384\u7ACB\u7279\u91CC\u4E9A',code:'291',rules:[9],sort:'E'},{name:'\u5384\u74DC\u591A\u5C14',code:'593',rules:[7],sort:'E'},{name:'\u4FC4\u7F57\u65AF',code:'7',rules:[10],sort:'E'},{name:'\u6CD5\u56FD',code:'33',rules:[10],sort:'F'},{name:'\u798F\u514B\u5170\u7FA4\u5C9B',code:'500',rules:[9],sort:'F'},{name:'\u68B5\u8482\u5188',code:'39',rules:[9],sort:'F'},{name:'\u6CD5\u5C5E\u6CE2\u5229\u5C3C\u897F\u4E9A',code:'689',rules:[6],sort:'F'},{name:'\u6CD5\u7F57\u7FA4\u5C9B',code:'298',rules:[9],sort:'F'},{name:'\u4F5B\u5F97\u89D2',code:'238',rules:[9],sort:'F'},{name:'\u82AC\u5170',code:'358',rules:[7],sort:'F'},{name:'\u6590\u6D4E',code:'679',rules:[7],sort:'F'},{name:'\u83F2\u5F8B\u5BBE',code:'63',rules:[11],sort:'F'},{name:'\u6CD5\u5C5E\u572D\u4E9A\u90A3',code:'594',rules:[10],sort:'F'},{name:'\u572D\u4E9A\u90A3',code:'592',rules:[12],sort:'G'},{name:'\u683C\u9675\u5170',code:'299',rules:[9],sort:'G'},{name:'\u5173\u5C9B',code:'1671',rules:[7],sort:'G'},{name:'\u53E4\u5DF4',code:'53',rules:[7],sort:'G'},{name:'\u683C\u6797\u7EB3\u8FBE',code:'1473',rules:[7],sort:'G'},{name:'\u54E5\u65AF\u8FBE\u9ECE\u52A0',code:'506',rules:[8],sort:'G'},{name:'\u54E5\u4F26\u6BD4\u4E9A',code:'57',rules:[10],sort:'G'},{name:'\u521A\u679C\uFF08\u5E03\uFF09',code:'242',rules:[7],sort:'G'},{name:'\u5188\u6BD4\u4E9A',code:'220',rules:[7],sort:'G'},{name:'\u683C\u9C81\u5409\u4E9A',code:'995',rules:[8],sort:'G'},{name:'\u521A\u679C\uFF08\u91D1\uFF09',code:'243',rules:[8],sort:'G'},{name:'\u9ED1\u5C71\u5171\u548C\u56FD',code:'382',rules:[9],sort:'H'},{name:'\u8377\u5C5E\u5B89\u7684\u5217\u65AF\u7FA4\u5C9B',code:'599',rules:[9],sort:'H'},{name:'\u97E9\u56FD',code:'82',rules:[11],sort:'H'},{name:'\u6D2A\u90FD\u62C9\u65AF',code:'504',rules:[7],sort:'H'},{name:'\u6D77\u5730',code:'509',rules:[8],sort:'H'},{name:'\u8377\u5170',code:'31',rules:[9],sort:'H'},{name:'\u54C8\u8428\u514B\u65AF\u5766',code:'7',rules:[10],sort:'H'},{name:'\u5409\u5E03\u63D0',code:'253',rules:[6],sort:'J'},{name:'\u5409\u5C14\u5409\u65AF\u65AF\u5766',code:'996',rules:[9],sort:'J'},{name:'\u51E0\u5185\u4E9A',code:'224',rules:[6],sort:'J'},{name:'\u52A0\u62FF\u5927',code:'1',rules:[7],sort:'J'},{name:'\u52A0\u7EB3',code:'233',rules:[10],sort:'J'},{name:'\u52A0\u84EC',code:'241',rules:[6],sort:'J'},{name:'\u51E0\u5185\u4E9A\u6BD4\u7ECD',code:'245',rules:[9],sort:'J'},{name:'\u67EC\u57D4\u5BE8',code:'855',rules:[9],sort:'J'},{name:'\u6377\u514B',code:'420',rules:[9],sort:'J'},{name:'\u57FA\u91CC\u5DF4\u65AF',code:'686',rules:[9],sort:'J'},{name:'\u6D25\u5DF4\u5E03\u97E6',code:'263',rules:[9],sort:'J'},{name:'\u5580\u9EA6\u9686',code:'237',rules:[8],sort:'K'},{name:'\u79D1\u7279\u8FEA\u74E6',code:'225',rules:[8],sort:'K'},{name:'\u79D1\u5A01\u7279',code:'965',rules:[8],sort:'K'},{name:'\u79D1\u6469\u7F57',code:'269',rules:[9],sort:'K'},{name:'\u80AF\u5C3C\u4E9A',code:'254',rules:[7],sort:'K'},{name:'\u5E93\u514B\u7FA4\u5C9B',code:'682',rules:[5],sort:'K'},{name:'\u5361\u5854\u5C14',code:'974',rules:[7],sort:'K'},{name:'\u79D1\u79D1\u65AF\u7FA4\u5C9B',code:'61',rules:[9],sort:'K'},{name:'\u5F00\u66FC\u7FA4\u5C9B',code:'1345',rules:[7],sort:'K'},{name:'\u514B\u7F57\u5730\u4E9A',code:'385',rules:[9],sort:'K'},{name:'\u8001\u631D',code:'856',rules:[10],sort:'L'},{name:'\u9ECE\u5DF4\u5AE9',code:'961',rules:[7],sort:'L'},{name:'\u7ACB\u9676\u5B9B',code:'370',rules:[5],sort:'L'},{name:'\u5229\u6BD4\u91CC\u4E9A',code:'231',rules:[7,8],sort:'L'},{name:'\u5229\u6BD4\u4E9A',code:'218',rules:[10],sort:'L'},{name:'\u5217\u652F\u6566\u58EB\u767B',code:'423',rules:[7],sort:'L'},{name:'\u9A6C\u7EA6\u7279',code:'262',rules:[6],sort:'L'},{name:'\u83B1\u7D22\u6258',code:'266',rules:[8],sort:'L'},{name:'\u62C9\u8131\u7EF4\u4E9A',code:'371',rules:[8],sort:'L'},{name:'\u7F57\u9A6C\u5C3C\u4E9A',code:'40',rules:[9],sort:'L'},{name:'\u5362\u68EE\u5821',code:'352',rules:[9],sort:'L'},{name:'\u9A6C\u8FBE\u52A0\u65AF\u52A0',code:'261',rules:[7],sort:'M'},{name:'\u58A8\u897F\u54E5',code:'52',rules:[8],sort:'M'},{name:'\u83AB\u6851\u6BD4\u514B',code:'258',rules:[9],sort:'M'},{name:'\u9A6C\u62C9\u7EF4',code:'265',rules:[9],sort:'M'},{name:'\u9A6C\u8033\u4ED6',code:'356',rules:[8],sort:'M'},{name:'\u66FC\u5C9B',code:'44',rules:[9],sort:'M'},{name:'\u6469\u5C14\u591A\u74E6',code:'373',rules:[5],sort:'M'},{name:'\u9A6C\u5176\u987F',code:'389',rules:[9],sort:'M'},{name:'\u9A6C\u7ECD\u5C14\u7FA4\u5C9B',code:'692',rules:[9],sort:'M'},{name:'\u5B5F\u52A0\u62C9\u56FD',code:'880',rules:[7],sort:'M'},{name:'\u6BDB\u91CC\u5854\u5C3C\u4E9A',code:'222',rules:[9],sort:'M'},{name:'\u7F8E\u5C5E\u8428\u6469\u4E9A',code:'1684',rules:[7],sort:'M'},{name:'\u9A6C\u5C14\u4EE3\u592B',code:'960',rules:[7],sort:'M'},{name:'\u7F8E\u56FD',code:'1',rules:[10],sort:'M'},{name:'\u6469\u6D1B\u54E5',code:'212',rules:[9],sort:'M'},{name:'\u6BDB\u91CC\u6C42\u65AF',code:'230',rules:[7],sort:'M'},{name:'\u8499\u53E4',code:'976',rules:[9],sort:'M'},{name:'\u9A6C\u63D0\u5C3C\u514B',code:'596',rules:[10],sort:'M'},{name:'\u8499\u585E\u62C9\u7279\u7FA4\u5C9B',code:'1664',rules:[9],sort:'M'},{name:'\u9A6C\u91CC\u4E9A\u90A3\u7FA4\u5C9B',code:'596',rules:[10],sort:'M'},{name:'\u7F8E\u5C5E\u7EF4\u4EAC\u7FA4\u5C9B',code:'1340',rules:[10],sort:'M'},{name:'\u9A6C\u91CC',code:'223',rules:[8],sort:'M'},{name:'\u5BC6\u514B\u7F57\u5C3C\u897F\u4E9A\u8054\u90A6',code:'691',rules:[9],sort:'M'},{name:'\u9A6C\u6765\u897F\u4E9A',code:'60',rules:[10],sort:'M'},{name:'\u6469\u7EB3\u54E5',code:'377',rules:[8],sort:'M'},{name:'\u7F05\u7538',code:'95',rules:[6],sort:'M'},{name:'\u7EB3\u7C73\u6BD4\u4E9A',code:'264',rules:[9],sort:'N'},{name:'\u5C3C\u52A0\u62C9\u74DC',code:'505',rules:[9],sort:'N'},{name:'\u5357\u975E',code:'27',rules:[9],sort:'N'},{name:'\u7459\u9C81',code:'674',rules:[7],sort:'N'},{name:'\u5357\u6781\u6D32',code:'672',rules:[9],sort:'N'},{name:'\u7EBD\u57C3',code:'683',rules:[9],sort:'N'},{name:'\u5C3C\u65E5\u5229\u4E9A',code:'234',rules:[11],sort:'N'},{name:'\u5C3C\u6CCA\u5C14',code:'977',rules:[9],sort:'N'},{name:'\u632A\u5A01',code:'47',rules:[8],sort:'N'},{name:'\u5C3C\u65E5\u5C14',code:'227',rules:[6],sort:'N'},{name:'\u8461\u8404\u7259',code:'351',rules:[9],sort:'P'},{name:'\u5E15\u52B3',code:'680',rules:[9],sort:'P'},{name:'\u745E\u5178',code:'46',rules:[6],sort:'R'},{name:'\u745E\u58EB',code:'41',rules:[10],sort:'R'},{name:'\u65E5\u672C',code:'81',rules:[11],sort:'R'},{name:'\u8428\u5C14\u74E6\u591A',code:'503',rules:[7],sort:'S'},{name:'\u5723\u8BDE\u5C9B',code:'61',rules:[9],sort:'S'},{name:'\u82CF\u4E39',code:'249',rules:[9],sort:'S'},{name:'\u585E\u820C\u5C14\u7FA4\u5C9B',code:'248',rules:[6],sort:'S'},{name:'\u6C99\u7279\u963F\u62C9\u4F2F',code:'966',rules:[9],sort:'S'},{name:'\u585E\u5185\u52A0\u5C14',code:'221',rules:[7],sort:'S'},{name:'\u5723\u591A\u7F8E\u548C\u666E\u6797\u897F\u6BD4',code:'239',rules:[6],sort:'S'},{name:'\u5723\u76AE\u57C3\u5C14\u548C\u5BC6\u514B\u9686',code:'508',rules:[9],sort:'S'},{name:'\u5723\u5362\u897F\u4E9A',code:'1758',rules:[7],sort:'S'},{name:'\u7D22\u9A6C\u91CC',code:'252',rules:[7],sort:'S'},{name:'\u5723\u9A6C\u529B\u8BFA',code:'378',rules:[10],sort:'S'},{name:'\u585E\u62C9\u5229\u6602',code:'232',rules:[6],sort:'S'},{name:'\u5723\u8D6B\u52D2\u62FF',code:'290',rules:[9],sort:'S'},{name:'\u6240\u7F57\u95E8\u7FA4\u5C9B',code:'677',rules:[7],sort:'S'},{name:'\u65AF\u91CC\u5170\u5361',code:'94',rules:[7,8],sort:'S'},{name:'\u585E\u5C14\u7EF4\u4E9A',code:'381',rules:[9],sort:'S'},{name:'\u65AF\u6D1B\u4F10\u514B',code:'421',rules:[7],sort:'S'},{name:'\u82CF\u91CC\u5357',code:'597',rules:[6],sort:'S'},{name:'\u65AF\u6D1B\u6587\u5C3C\u4E9A',code:'386',rules:[7],sort:'S'},{name:'\u5723\u5DF4\u6CF0\u52D2\u7C73',code:'590',rules:[9],sort:'S'},{name:'\u65AF\u5A01\u58EB\u5170',code:'268',rules:[7],sort:'S'},{name:'\u5723\u57FA\u8328\u548C\u5C3C\u7EF4\u65AF',code:'1869',rules:[9],sort:'S'},{name:'\u5723\u9A6C\u4E01',code:'1599',rules:[9],sort:'S'},{name:'\u585E\u6D66\u8DEF\u65AF',code:'357',rules:[6],sort:'S'},{name:'\u5723\u6587\u68EE\u7279\u548C\u683C\u6797\u7EB3\u4E01\u65AF',code:'1784',rules:[7],sort:'S'},{name:'\u7279\u514B\u65AF\u548C\u51EF\u79D1\u65AF\u7FA4\u5C9B',code:'1649',rules:[9],sort:'T'},{name:'\u6258\u514B\u52B3',code:'690',rules:[9],sort:'T'},{name:'\u56FE\u74E6\u5362',code:'688',rules:[9],sort:'T'},{name:'\u571F\u5E93\u66FC\u65AF\u5766',code:'993',rules:[6],sort:'T'},{name:'\u571F\u8033\u5176',code:'90',rules:[10],sort:'T'},{name:'\u7A81\u5C3C\u65AF',code:'216',rules:[8],sort:'T'},{name:'\u7279\u7ACB\u5C3C\u8FBE\u548C\u591A\u5DF4\u54E5',code:'1868',rules:[7],sort:'T'},{name:'\u6C64\u52A0',code:'676',rules:[7],sort:'T'},{name:'\u5854\u5409\u514B\u65AF\u5766',code:'992',rules:[6],sort:'T'},{name:'\u6CF0\u56FD',code:'66',rules:[10],sort:'T'},{name:'\u5766\u6851\u5C3C\u4E9A',code:'255',rules:[11],sort:'T'},{name:'\u4E4C\u5179\u522B\u514B\u65AF\u5766',code:'998',rules:[7],sort:'W'},{name:'\u59D4\u5185\u745E\u62C9',code:'58',rules:[7],sort:'W'},{name:'\u4E4C\u5E72\u8FBE',code:'256',rules:[9],sort:'W'},{name:'\u74E6\u52AA\u963F\u56FE',code:'678',rules:[9],sort:'W'},{name:'\u74E6\u5229\u65AF\u548C\u5BCC\u56FE\u7EB3',code:'681',rules:[9],sort:'W'},{name:'\u6587\u83B1',code:'673',rules:[7],sort:'W'},{name:'\u5371\u5730\u9A6C\u62C9',code:'502',rules:[8],sort:'W'},{name:'\u4E4C\u62C9\u572D',code:'598',rules:[7],sort:'W'},{name:'\u4E4C\u514B\u5170',code:'380',rules:[10],sort:'W'},{name:'\u65B0\u5580\u91CC\u591A\u5C3C\u4E9A',code:'687',rules:[9],sort:'X'},{name:'\u5E0C\u814A',code:'30',rules:[10],sort:'X'},{name:'\u65B0\u52A0\u5761',code:'65',rules:[8],sort:'X'},{name:'\u53D9\u5229\u4E9A',code:'963',rules:[9],sort:'X'},{name:'\u65B0\u897F\u5170',code:'64',rules:[8],sort:'X'},{name:'\u8428\u6469\u4E9A',code:'685',rules:[7],sort:'X'},{name:'\u5308\u7259\u5229',code:'36',rules:[9],sort:'X'},{name:'\u897F\u73ED\u7259',code:'34',rules:[9],sort:'X'},{name:'\u82F1\u56FD',code:'44',rules:[10],sort:'Y'},{name:'\u4EE5\u8272\u5217',code:'972',rules:[9],sort:'Y'},{name:'\u4F0A\u6717',code:'98',rules:[8],sort:'Y'},{name:'\u5370\u5EA6',code:'91',rules:[10],sort:'Y'},{name:'\u7EA6\u65E6',code:'962',rules:[7],sort:'Y'},{name:'\u4E9A\u7F8E\u5C3C\u4E9A',code:'374',rules:[8],sort:'Y'},{name:'\u7259\u4E70\u52A0',code:'1876',rules:[7],sort:'Y'},{name:'\u8D8A\u5357',code:'84',rules:[10],sort:'Y'},{name:'\u5370\u5EA6\u5C3C\u897F\u4E9A',code:'62',rules:[10,11,12],sort:'Y'},{name:'\u4F0A\u62C9\u514B',code:'964',rules:[8],sort:'Y'},{name:'\u82F1\u5C5E\u7EF4\u4EAC\u7FA4\u5C9B',code:'1284',rules:[10],sort:'Y'},{name:'\u610F\u5927\u5229',code:'39',rules:[10],sort:'Y'},{name:'\u4E5F\u95E8',code:'967',rules:[6],sort:'Y'},{name:'\u4E2D\u975E\u5171\u548C\u56FD',code:'236',rules:[6],sort:'Z'},{name:'\u8D5E\u6BD4\u4E9A',code:'260',rules:[9],sort:'Z'},{name:'\u4E4D\u5F97',code:'235',rules:[7],sort:'Z'},{name:'\u76F4\u5E03\u7F57\u9640',code:'350',rules:[8],sort:'Z'},{name:'\u667A\u5229',code:'56',rules:[7],sort:'Z'},{name:'\u4E2D\u56FD\u9999\u6E2F',code:'852',rules:[8],sort:'Z'},{name:'\u4E2D\u56FD\u53F0\u6E7E',code:'886',rules:[10],sort:'Z'},{name:'\u4E2D\u56FD\u6FB3\u95E8',code:'853',rules:[8],sort:'Z'},{name:'\u4E2D\u56FD\u5927\u9646',code:'86',rules:[11],sort:'Z'}];
$.fn.countryCodeMap=countryCodeMap;
var i18nCodeData=$.fn.countryCodeMap,Dropdown=$.fn.Dropdown;
var I18nCodeSelect={initialize:function(d){
var c=JSON.parse(JSON.stringify(i18nCodeData));
var e=this;
e.container=$(d.container);
e.container.addClass(d.className);
if(d.render&&typeof d.render)
{
d.renderHtml='';
$.each(d.data,function(f,g){
d.renderHtml+=d.render(g);
});
}
d.dropdownInputClass=d.dropdownInputClass||'qy_inputText';
if(d.data.length>0)
{
e.container.html(d.tpl(d));
}
var a=e.container.find('.'+this.getSplitClass(d.dropDownClass));
var b=e.container.find('.'+this.getSplitClass(d.dropDownMenuClass));
this.$dropDownInput=this.container.find('.'+this.getSplitClass(d.dropdownInputClass));
this.$dropDownInput.attr('autocomplete','off');
e.$dropDown=a;
e.$dropdownMenu=b;
if(d.disabled)
{
e.$dropDown.attr('disabled','disabled');
}
e._data={};
this.bindData(e.opt);
this.bindEvent(e.opt);
$.map(c,function(f){
f.value=f.code;
f.text=f.name;
f.name=f.text+' +'+f.code;
return f;
});
this.renderList(c);
},bindEvent:function(a){
var b=this;
this.$dropDownInput.on('keyup',$.debounce(100,true,function(c,f){
if(c.which==40||c.which==38||c.which==13||b.$dropdownMenu.is(':hidden'))
{
c.preventDefault();
return;
}
if(!f)
{
f=b.getText().trim();
}
if(!f)
{
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).show();
return;
}
var d=false;
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).each(function(g){
var e=$(this);
if(e.find('.qy_dropdownMenu_itemLink_text').text().indexOf(f)!=-1)
{
e.show();
d=true;
}
else{
e.hide();
}
});
if(!d)
{
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).show();
}
}));
this.$dropDownInput.on('click',function(c){
if(!b.$dropdownMenu.is(':hidden'))
{
c.stopPropagation();
}
});
this.bindBaseEvent.apply(this,arguments);
},setText:function(a){
this.$dropDownInput.val(a);
},getText:function(){
return this.$dropDownInput.val();
},isValidCode:function(a){
var b=false;
this.opt.data.forEach(function(c){
if(c.code==a)
{
b=true;
}
});
return b;
},isValidMobile:function(a,b){
if(a.value==86)
{
return b.length==11;
}
return true;
},_onShow:function(){
this.$dropDownInput.focus();
this.opt.onShow&&this.opt.onShow();
},_onHide:function(){
var a=this;
this.opt.onHide&&this.opt.onHide();
setTimeout(function(){
a.$dropdownMenu.find('.'+a.getSplitClass(a.opt.menuItemClass)).show();
a.scrollToSelectedItem();
a.$dropdownMenu.find('.qy_dropdownMenu_item_Hover').removeClass('qy_dropdownMenu_item_Hover');
},0);
}};
$.fn.countryCodeDropdown=I18nCodeSelect;
var Dropdown=$.fn.Dropdown;
var scaleDropdown={initialize:function(c){
var d=this;
d.container=$(c.container);
d.container.addClass(c.className);
if(c.render&&typeof c.render)
{
c.renderHtml='';
$.each(c.data,function(e,f){
c.renderHtml+=c.render(f);
});
}
c.dropdownInputClass=c.dropdownInputClass||'qy_inputText';
if(c.data.length>0)
{
d.container.html(c.tpl(c));
}
var a=d.container.find('.'+this.getSplitClass(c.dropDownClass));
var b=d.container.find('.'+this.getSplitClass(c.dropDownMenuClass));
this.$dropDownInput=this.container.find('.'+this.getSplitClass(c.dropdownInputClass));
this.$dropDownInput.attr('autocomplete','off');
d.$dropDown=a;
d.$dropdownMenu=b;
if(c.disabled)
{
d.$dropDown.attr('disabled','disabled');
}
d._data={};
this.bindData(d.opt);
this.bindEvent(d.opt);
},bindEvent:function(a){
var b=this;
this.$dropDownInput.on('keyup',$.debounce(100,true,function(c,f){
if(c.which==40||c.which==38||c.which==13||b.$dropdownMenu.is(':hidden'))
{
c.preventDefault();
return;
}
if(!f)
{
f=b.getText().trim();
}
if(!f)
{
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).show();
return;
}
var d=false;
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).each(function(g){
var e=$(this);
if(e.find('.qy_dropdownMenu_itemLink_text').text().indexOf(f)!=-1)
{
e.show();
d=true;
}
else{
e.hide();
}
});
if(!d)
{
b.$dropdownMenu.find('.'+b.getSplitClass(a.menuItemClass)).show();
}
}));
this.$dropDownInput.on('click',function(c){
if(!b.$dropdownMenu.is(':hidden'))
{
c.stopPropagation();
}
});
this.bindBaseEvent.apply(this,arguments);
b.$dropdownMenu.on('mouseover',function(d){
d.stopPropagation();
d.preventDefault();
if(b.isScrolling)
{
b.isScrolling=false;
return;
}
b.$dropdownMenu.find('.em_dropdownMenu_item_Hover').removeClass('em_dropdownMenu_item_Hover');
var c=$(d.target).parents('.em_dropdownMenu_item');
if(c.hasClass('em_dropdownMenu_item'))
{
c.addClass('em_dropdownMenu_item_Hover');
}
});
b.$dropdownMenu.on('mouseout',function(d){
var c=$(d.target).parents('.em_dropdownMenu_item');
if(c.hasClass('em_dropdownMenu_item'))
{
c.removeClass('em_dropdownMenu_item_Hover');
}
});
},setText:function(a){
this.$dropDownInput.val(a);
},getText:function(){
return this.$dropDownInput.val();
},isValidCode:function(a){
var b=false;
this.opt.data.forEach(function(c){
if(c.code==a)
{
b=true;
}
});
return b;
},isValidMobile:function(a,b){
if(a.value==86)
{
return b.length==11;
}
return true;
},_onShow:function(){
this.$dropDownInput.focus();
this.opt.onShow&&this.opt.onShow();
},_onHide:function(){
var a=this;
this.opt.onHide&&this.opt.onHide();
setTimeout(function(){
a.$dropdownMenu.find('.'+a.getSplitClass(a.opt.menuItemClass)).show();
a.scrollToSelectedItem();
a.$dropdownMenu.find('.qy_dropdownMenu_item_Hover').removeClass('qy_dropdownMenu_item_Hover');
},0);
}};
$.fn.scaleDropdown=scaleDropdown;
;(function(a,d){
var b=a(window);
var c={};
a.fn.MNDialog=function(g){
var v={sId:"",nDlgType:1,sClass:"new_index_dlg",oContentHtml:"",nContainerHeight:127,nContainerWidth:0,bMaskClickClose:false,nAutoClose:0,oRules:{},fLoadedCallback:null,fOpenCallback:null,fCloseCallback:null,fWillCloseCallback:null};
var w='<div class="new_index_dlg dialog" style="z-index: 3000;">'+'<div class="new_index_dlg_contaner">'+'<div>'+'{content}'+'</div>'+'</div>'+'</div>';
var q=this,e=a(this);
window.openTime=0;
this.oConfig=a.extend(v,g),this.sId="__dialog__"+this.oConfig.sId+"__";
e.attr("id",this.sId);
var k=function(){
if(c)
{
a.each(c,function(y,x){
a("#"+_sId).remove();
});
a(".new_index_mask").remove();
c={};
}
l();
n();
m();
};
var l=function(){
q._sTemplate=a.fn.nano(w,{"content":q.oConfig.oContentHtml});
q._oTemplate$=a(q._sTemplate);
e.hide();
q._oMaskDom$=a("<div class='new_index_mask mask'></div>").hide();
e.append(q._oTemplate$);
a("body").append(e);
a("body").append(q._oMaskDom$);
q._oContainer$=e.find(".new_index_dlg");
q._oContentContainer$=e.find(".new_index_dlg_contaner");
if(q.oConfig.nDlgType==2)
{
q._oContainer$.find(".left_btn_box").show();
}
};
var n=function(){
b.on('hashchange',j);
b.on('resize',t);
q._oMaskDom$.click(function(){
if(q.oConfig.bMaskClickClose)
{
i();
}
});
};
var m=function(){
s();
o();
e.show();
q._oMaskDom$.show();
f();
h();
};
var p={tap:"D_tap",click:"D_ck",dblclick:"D_dbl",mousedown:"D_md",mouseup:"D_mu",mouseover:"D_mor",mousemove:"D_mm",mouseout:"D_mot",keydown:"D_kd",keypress:"D_kp",keyup:"D_ku"};
var h=function(){
if(q.oConfig.oRules)
{
var y=q.oConfig.oRules;
for(var x in y)
{
q._oContainer$.delegate("["+p[x]+"]",x+".dialog",function(z){
var B=a(this),C=B.attr(p[x]),A=y[x][C];
if(C&&A)
{
A.call(q,z,B);
}
});
}
}
};
var u=function(){
if(q.oConfig.oRules)
{
q._oContainer$.undelegate(".dialog");
}
b.off('hashchange',j);
b.off('resize',t);
};
var i=function(){
q.oConfig.fWillCloseCallback&&q.oConfig.fWillCloseCallback.call(q,q._oContainer$);
e.hide();
e.remove();
q._oMaskDom$.remove();
q.oConfig.fCloseCallback&&q.oConfig.fCloseCallback.call(q,q._oContainer$);
clearTimeout(q._oAutoCloseSetTimeOut);
delete c[q.sId];
u();
};
var j=function(){
i();
};
var t=function(){
s();
o();
};
var o=function(){
var x=r();
q._oMaskDom$.css({height:"100%",width:"100%"});
};
var s=function(){
var z=r(),y,x;
y=(z.height()-q.oConfig.nContainerHeight)/2;
y=y<0?0:y;
if(q.oConfig.nContainerWidth)
{
x=(z.width()-q.oConfig.nContainerWidth)/2;
x=x+q.oConfig.nContainerWidth/2;
x=x<0?0:x;
q._oContainer$.css({top:y,left:x,margin_left:0});
q._oContainer$.find(".dialog").css({left:x,margin_left:0});
}
else{
q._oContainer$.css({top:y});
}
};
var r=function(){
return {top:function(){
return document.documentElement.scrollTop||document.body.scrollTop;
},width:function(){
return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
},height:function(){
return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
},total:function(y){
var x=document.body,z=document.documentElement;
return y?Math.max(Math.max(x.scrollHeight,z.scrollHeight),Math.max(x.clientHeight,z.clientHeight)):Math.max(Math.max(x.scrollWidth,z.scrollWidth),Math.max(x.clientWidth,z.clientWidth));
}};
};
var f=function(){
c[q.sId]=q;
if(q.oConfig.nAutoClose)
{
q._oAutoCloseSetTimeOut=setTimeout(function(){
i();
},1e3*q.oConfig.nAutoClose);
}
q.oConfig.fOpenCallback&&q.oConfig.fOpenCallback.call(q,q._oContainer$);
};
this.close=function(){
i();
};
k();
return this;
};
})(jQuery);
function initMpQrcode(e)
{
e=e||{};
var b=e.$dom;
var a=$(document);
var d=e.id||Math.random();
var f=['<div class="index_foot_contact_qrCode js_mp_qr_code" style="display: none;">','<div class="index_foot_contact_qrCode_title">\u4F01\u4E1A\u90AE\u7BB1\u516C\u4F17\u53F7</div>','<div class="index_foot_contact_qrCode_img"></div>','</div>'].join('');
if(b.size()>0)
{
var c=b.find('.js_mp_qr_code');
b.off('.mpQrcodeShow'+d);
b.on('mouseenter.mpQrcodeShow'+d,function(){
if(c.size()==0)
{
b.append($(f));
c=b.find('.js_mp_qr_code');
}
c.show();
var g=$.fn.basetool;
g.logKvEx({type:"nosession_statistics",businame:"new_index",item:"wechat|click|index_bottom"});
}).on('mouseleave.mpQrcodeShow'+d,function(){
c.hide();
});
}
}
$.fn.qrcode={initMpQrcode:initMpQrcode};
function changeimg()
{
$('#vfcode').attr('src',$('#vfcode').attr('src')+'0');
}
function safeGetXmlData(b,a)
{
a=a||'DATA';
if(typeof b=='string')
{
return b;
}
else if(b&&b[0]&&b[0][a]!=undefined)
{
return b[0][a];
}
else{
return b;
}
}
function adminItemTpl(a,b)
{
return ['<div class="weixin_choose_list_item weixin_choose_list_item_admin" '+(b||'data-phone-uin')+'="'+safeGetXmlData(a.alias)+'" data-type="admin">','<div class="weixin_choose_list_item_icon">','<div class="weixin_choose_admin_icon"></div>','</div>','<div class="weixin_choose_list_item_content">','<div class="weixin_choose_list_item_title">\u7BA1\u7406\u5458</div>','<div class="weixin_choose_list_item_text">'+(safeGetXmlData(a.corpname)||safeGetXmlData(a.alias))+'</div>','</div>','</div>'].join('');
}
function memberItemTpl(a,b)
{
return ['<div class="weixin_choose_list_item weixin_choose_list_item_admin" '+(b||'data-phone-uin')+'="'+safeGetXmlData(a.alias)+'" data-type="member">','<div class="weixin_choose_list_item_icon">','<div class="weixin_choose_member_icon"></div>','</div>','<div class="weixin_choose_list_item_content">','<div class="weixin_choose_list_item_title">\u6210\u5458</div>','<div class="weixin_choose_list_item_alias">'+safeGetXmlData(a.alias)+'</div>','<div class="weixin_choose_list_item_text">'+safeGetXmlData(a.corpname)+'</div>','</div>','</div>'].join('');
}
function getBindAccountListTpl(d,e)
{
e=e||{};
var a=[];
for(var b=0;b<d.length;b++)
{
var c=d[b];
if(c.owner=='0')
{
a.push(memberItemTpl(c,e.key));
}
else if(c.owner=='1')
{
a.push(adminItemTpl(c,e.key));
}
}
if(e.needHeader)
{
return '<div id="phone_bind_account_list_wrap" data-panel="accountlist" class="login_scan_panel" style="margin-top: 0px;height:400px;">'+'<h1 class="weixin_choose_list_title">\u8BF7\u9009\u62E9\u8981\u767B\u5F55\u7684\u5E10\u53F7</h1>'+'<div class="weixin_choose_list" id="phone_bind_account_list">'+a.join('')+'</div>'+'</div>';
}
else{
return a.join('');
}
}
function init(S)
{
S=S||{};
var D=$.fn.countryCodeDropdown;
var G=86;
var p=$('#loginForm div[data-panel=qrcode]');
var o=$('#loginForm div[data-panel=pwd]');
var h=$('.js_show_pwd_panel');
var i=$('.js_show_qrcode_panel');
var q=$('.login_content_wrap[data-content-type=qrcode]');
var y=$('.login_content_wrap[data-content-type=verifycode]');
var z=$('.js_verify_item');
var r=$('#btn_sms');
var k=$('#mobile');
var c=$('#area');
var t=$('#sms_token');
var u=$('#sms_token2');
var s=$('#sms_login_btn');
var B=$('#wx_token');
var x=$('#vc');
var w=$('#token');
var g=$('#inputuin');
var n=$('#pp');
var a=$('#VerifyArea');
var v=$('#sms_token2_login');
var C=$('#wx_token_login');
var f=$('#get_verify_code_btn');
var X=0;
var H=null;
v.on('click',function(Y){
var Z=$.trim(u.val());
if(Z==="")
{
U(u);
return false;
}
if(document.form1.domain.value==="")
{
document.form1.domain.value="biz.mail.qq.com";
}
if(location.host=='mail.exmail.qq.com')
{
document.form1.domain_bak.value='1';
}
document.form1.submit();
});
C.on('click',function(Y){
var Z=$.trim(B.val());
if(Z==="")
{
U(B);
return false;
}
document.form1.submit();
});
u.on('focus',function(){
J(u);
});
var P=I('logintype')||'wechat';
if(P==='account')
{
p.hide();
o.show();
}
n.on('focus',function(){
J($(this));
});
a.on('focus',function(){
J($(this));
});
h.click(function(Y){
V('pwd');
H=null;
O('WwBizmailLogin','password_page');
});
i.click(function(Y){
z.removeClass('curr');
z.eq(0).addClass('curr');
q.show();
y.hide();
H=null;
V('qrcode');
});
z.click(function(Z){
var Y=$(this);
z.removeClass('curr');
Y.addClass('curr');
if(Y.attr('data-type')==='wechat')
{
q.show();
y.hide();
H=null;
}
else if(Y.attr('data-type')==='phone')
{
q.hide();
y.show();
K();
O('WwBizmailLogin','mobile_page');
}
});
k.on('input propertychange',function(){
if(M())
{
r.removeClass('disabled');
}
else{
r.addClass('disabled');
}
});
function L(Y)
{
var Z=Y.parents('.signup_item_content');
Z.on('mouseenter',function(){
Z.removeClass('input_normal').removeClass('input_focus').addClass('input_hover');
}).on('mouseleave',function(){
if(!Y.is(':focus'))
{
Z.removeClass('input_hover').removeClass('input_focus').addClass('input_normal');
}
});
Y.on('focus',function(aa){
Z.removeClass('input_hover').removeClass('input_normal').addClass('input_focus');
J(Y);
}).on('blur',function(){
Z.removeClass('input_hover').removeClass('input_focus').addClass('input_normal');
if(!M())
{
U(Y);
}
});
}
L(k);
L(B);
L(t);
L(x);
r.click(function(){
if(r.hasClass('disabled'))
{
return;
}
var Z=$.trim(k.val());
var Y=$.trim(c.val());
if(!M())
{
U(k);
return;
}
F(60);
$.ajax({url:'/cgi-bin/bizmail_portal?action=send_sms&type=11&t=biz_rf_portal_mgr&ef=jsnew&resp_charset=UTF8',data:{area:Y,mobile:Z},dataType:"JSON",success:function(aa){
console.log('sms json = ',aa);
if(aa.retcode=='0')
{
}
else if(aa.retcode=='-2')
{
U(r,'\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\uFF0C\u65E0\u6CD5\u53D1\u9001\u9A8C\u8BC1\u7801');
}
else if(aa.retcode=='-101')
{
U(r,'\u64CD\u4F5C\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u8BF71\u5206\u949F\u540E\u91CD\u65B0\u5C1D\u8BD5');
}
else{
U(r,'\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25');
}
},complete:function(){
}});
});
$(document).on('click','[data-phone-uin]',function(Y){
R($(this).attr('data-phone-uin'));
});
var l=$('#phone_bind_account_list');
var Q=false;
s.click(function(){
var Z=$.trim(k.val());
var Y=$.trim(c.val());
var aa=$.trim(t.val());
if(Q)
{
return;
}
if(!M())
{
U(k);
return;
}
if($.trim(aa)==='')
{
U(t);
return;
}
Q=true;
$.ajax({url:'/cgi-bin/bizmail_portal?action=auth_sms&type=11&resp_charset=UTF8',method:'POST',data:{area:Y,mobile:Z,phone_vc:aa,f:'json'},success:function(ad){
var ac=safeGetXmlData(ad.errorcode);
if(ac=='0')
{
if(ad.phone_login&&ad.phone_login[0]&&ad.phone_login[0].phone_alias)
{
var ae=ad.phone_login[0].phone_alias;
if(ae.length===0)
{
U(k,'\u8BE5\u624B\u673A\u6682\u65E0\u7ED1\u5B9A\u5E10\u53F7');
F(0);
O('WwBizmailLogin','mobile_noresult');
}
else{
var ab=getBindAccountListTpl(ae);
l.html(ab);
V('accountlist');
}
}
else{
U(k,'\u8BE5\u624B\u673A\u6682\u65E0\u7ED1\u5B9A\u5E10\u53F7');
F(0);
O('WwBizmailLogin','mobile_noresult');
}
}
else if(ac=='-98')
{
U(r,'\u53C2\u6570\u9519\u8BEF');
}
else if(ac=='-99')
{
U(r,'\u9A8C\u8BC1\u7801\u9519\u8BEF');
}
else if(ac=='-101'||ac=='-201'||ac=='-202')
{
U(r,'\u64CD\u4F5C\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u8BF71\u5206\u949F\u540E\u91CD\u65B0\u5C1D\u8BD5');
}
else if(ac=='-300')
{
U(r,'\u7CFB\u7EDF\u5931\u8D25');
}
else{
U(r,'\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25');
}
},complete:function(){
Q=false;
}});
return false;
});
var b=$('#accountList');
var j=$("#login_choose_acc");
$(document).on('click','[data-uin]',function(ab){
var Y=$(ab.currentTarget);
var ag=Y.attr('data-uin');
var af=Y.attr('data-type');
var ac=$('[name="login_from"]').val();
j.find('[name=uin]').val(ag);
if(ac=='feedback'&&af=='admin')
{
T("\u8BF7\u4F7F\u7528\u6210\u5458\u90AE\u7BB1\u5E10\u53F7\u8FDB\u884C\u53CD\u9988");
return false;
}
if(af==='admin')
{
j.find('[name=fun]').val('bizmail_admin');
j.find('[name=domain]').val('biz.mail.qq.com');
}
else{
j.find('[name=fun]').val('');
if(ag.indexOf('@')>-1)
{
j.find('[name=uin]').val(ag);
j.find('[name=domain]').val(ag.split('@')[1]);
}
}
var ae=Y.attr('data-verify');
if(ae=='1')
{
var ad=Y.attr('data-mobile');
var aa=Y.attr('data-area');
var Z=$('#verify_phone_item');
$('#show_phone').html('+'+aa+' '+ad);
j.append('<input type="hidden" id="mobile" name="mobile" value="'+ad+'">');
j.append('<input type="hidden" id="area" name="area" value="'+aa+'">');
$('#verify_phone_btn').attr('data-type',af);
b.hide();
Z.show();
F(60,A);
$.ajax({url:'/cgi-bin/bizmail_portal?action=send_sms&type=11&t=biz_rf_portal_mgr&ef=jsnew&resp_charset=UTF8',data:{area:aa,mobile:ad},dataType:"JSON",success:function(ah){
console.log('sms json = ',ah);
if(ah.retcode=='0')
{
}
else if(ah.retcode=='-2')
{
U(r,'\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\uFF0C\u65E0\u6CD5\u53D1\u9001\u9A8C\u8BC1\u7801');
}
else if(ah.retcode=='-101')
{
U(r,'\u64CD\u4F5C\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u8BF71\u5206\u949F\u540E\u91CD\u65B0\u5C1D\u8BD5');
}
else{
U(r,'\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25');
}
},complete:function(){
}});
return false;
}
$.ajax('/cgi-bin/login',{type:'post',dataType:'json',data:j.serialize(),success:function(ai){
ai.sid=safeGetXmlData(ai.sid);
if(ai.RetCode==0&&ai.sid!="")
{
var ah='biz_rf_home';
if(ai.isWwBizmail=='true')
{
ah='qy_rf_home';
}
if(ac=='feedback')
{
location.href='/cgi-bin/loginpage?sid='+ai.sid+'&t=new_index/feedback';
}
else if(ai.target==="BIZMAIL_ONLINESELL_FREE_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&onlinesell_index_tip=1#onlineorder/confirm/"+ai.order_num;
}
else if(ai.target==="BIZMAIL_ONLINESELL_ONLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&onlinesell_index_tip=3";
}
else if(ai.target==="BIZMAIL_ONLINESELL_OFFLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&onlinesell_index_tip=2";
}
else if(ai.target==="BIZMAIL_ONLINESELL_OFFLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&onlinesell_index_tip=4#onlineorder/confirm/"+ai.order_num;
}
else if(ai.target==="BIZMAIL_ONLINESELL_ONLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&onlinesell_index_tip=5#onlineorder/confirm/"+ai.order_num;
}
else{
if(af==='admin')
{
location.href="/cgi-bin/bizmail?sid="+ai.sid+"&t="+ah+"&init=1&r="+Math.random();
}
else{
location.href="/cgi-bin/frame_html?sid="+ai.sid+"&r="+Math.random();
}
}
}
else if(ai.RetCode=='-60')
{
T("\u4F60\u7684\u4F01\u4E1A\u90AE\u7BB1\u5E10\u53F7\u88AB\u7981\u7528\uFF0C\u8BF7\u8054\u7CFB\u4F01\u4E1A\u90AE\u7BB1\u7BA1\u7406\u5458\u3002");
}
else{
T("\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5\u3002\u9519\u8BEF\u7801\uFF1A"+ai.data.errcode);
}
},error:function(ah){
T("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}});
});
var A=$('#verify_phone_sms_btn');
A.click(function(){
if(A.hasClass('disabled'))
{
return;
}
var Y=$('#mobile');
var aa=$.trim(Y.val());
var Z=$.trim($('#area').val());
if(!N(Z,aa))
{
U(Y);
return;
}
F(60,A);
$.ajax({url:'/cgi-bin/bizmail_portal?action=send_sms&type=11&t=biz_rf_portal_mgr&ef=jsnew&resp_charset=UTF8',data:{area:Z,mobile:aa},dataType:"JSON",success:function(ab){
console.log('sms json = ',ab);
if(ab.retcode=='0')
{
}
else if(ab.retcode=='-2')
{
U(r,'\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\uFF0C\u65E0\u6CD5\u53D1\u9001\u9A8C\u8BC1\u7801');
}
else if(ab.retcode=='-101')
{
U(r,'\u64CD\u4F5C\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u8BF71\u5206\u949F\u540E\u91CD\u65B0\u5C1D\u8BD5');
}
else{
U(r,'\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25');
}
},complete:function(){
}});
});
$('#verify_phone_btn').on('click',function(Y){
if(d.hasClass('login_btn_disabled'))
{
return;
}
var Z=$.trim(t.val());
if(Z==="")
{
U(t);
return false;
}
var aa=$(this).attr('data-type');
$.ajax('/cgi-bin/login',{type:'post',dataType:'json',data:j.serialize(),success:function(ac){
d.addClass('login_btn_disabled');
d.text('\u9A8C\u8BC1\u4E2D...');
if(ac.data.errcode===""&&ac.data.sid!="")
{
var ab='biz_rf_home';
if(ac.data.isWwBizmail=='true')
{
ab='qy_rf_home';
}
if(ac.data.target==="BIZMAIL_ONLINESELL_FREE_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&onlinesell_index_tip=1#onlineorder/confirm/"+ac.data.order_num;
}
else if(ac.data.target==="BIZMAIL_ONLINESELL_ONLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&onlinesell_index_tip=3";
}
else if(ac.data.target==="BIZMAIL_ONLINESELL_OFFLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&onlinesell_index_tip=2";
}
else if(ac.data.target==="BIZMAIL_ONLINESELL_OFFLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&onlinesell_index_tip=4#onlineorder/confirm/"+ac.data.order_num;
}
else if(ac.data.target==="BIZMAIL_ONLINESELL_ONLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&onlinesell_index_tip=5#onlineorder/confirm/"+ac.data.order_num;
}
else{
if(aa==='admin')
{
location.href="/cgi-bin/bizmail?sid="+ac.data.sid+"&t="+ab+"&init=1&r="+Math.random();
}
else{
location.href="/cgi-bin/frame_html?sid="+ac.data.sid+"&r="+Math.random();
}
}
}
else if(ac.data.errcode=="-99")
{
U($('#sms_token'),'\u9A8C\u8BC1\u7801\u9519\u8BEF');
}
else{
U($('#sms_token'),'\u9A8C\u8BC1\u5931\u8D25');
}
},error:function(ab){
d.removeClass('login_btn_disabled');
d.text('\u4E0B\u4E00\u6B65');
}});
});
$("#btn_phone_login").click(function(Y){
$.ajax('/cgi-bin/login',{type:'post',dataType:'json',data:$("#login_choose_acc").serialize(),success:function(Z){
if(Z.data.errcode=="-24"||Z.data.errcode=="-25")
{
$("#acc_vc_img").attr("src",$("#acc_vc_img").attr("src")+"0");
}
else if(Z.data.errcode===""&&Z.data.sid!="")
{
var aa='biz_rf_home';
if(json.data.isWwBizmail=='true')
{
aa='qy_rf_home';
}
if(Z.data.target==="BIZMAIL_ONLINESELL_FREE_TIP")
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&onlinesell_index_tip=1#onlineorder/confirm/"+Z.data.order_num;
}
else if(Z.data.target==="BIZMAIL_ONLINESELL_ONLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&onlinesell_index_tip=3";
}
else if(Z.data.target==="BIZMAIL_ONLINESELL_OFFLINEVIP_TIP")
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&onlinesell_index_tip=2";
}
else if(Z.data.target==="BIZMAIL_ONLINESELL_OFFLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&onlinesell_index_tip=4#onlineorder/confirm/"+Z.data.order_num;
}
else if(Z.data.target==="BIZMAIL_ONLINESELL_ONLINETRIAL_TIP")
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&onlinesell_index_tip=5#onlineorder/confirm/"+Z.data.order_num;
}
else{
if($("[name='alias']").val().indexOf("@")<0)
{
location.href="/cgi-bin/bizmail?sid="+Z.data.sid+"&t="+aa+"&init=1&r="+Math.random();
}
else{
location.href="/cgi-bin/frame_html?sid="+Z.data.sid+"&r="+Math.random();
}
}
}
else if(Z.data.errcode==="-75")
{
}
else{
}
},error:function(Z){
}});
});
$(".js_login_btn").click(function(ac){
if($.trim(g.val())==='')
{
U(g,'\u8BF7\u586B\u5199\u4F01\u4E1A\u90AE\u7BB1\u7684\u5B8C\u6574\u90AE\u7BB1\u5E10\u53F7');
return false;
}
if($.trim(g.val()).indexOf('@')==-1)
{
U(g,'\u8BF7\u4F7F\u7528\u6210\u5458\u90AE\u7BB1\u5E10\u53F7\u8FDB\u884C\u53CD\u9988');
return false;
}
else{
J(g);
}
if($.trim(n.val())==='')
{
U(n,'\u8BF7\u8F93\u5165\u5BC6\u7801');
return false;
}
if(a.is(":visible"))
{
if($.trim(x.val())==='')
{
U(x,'\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801');
return false;
}
}
var Y="CF87D7B4C864F4842F1D337491A48FFF54B73A17300E8E42FA365420393AC0346AE55D8AFAD975DFA175FAF0106CBA81AF1DDE4ACEC284DAC6ED9A0D8FEB1CC070733C58213EFFED46529C54CEA06D774E3CC7E073346AEBD6C66FC973F299EB74738E400B22B1E7CDC54E71AED059D228DFEB5B29C530FF341502AE56DDCFE9";
var aa=new RSAKey();
aa.setPublic(Y,"10001");
var Z=Math.floor((new Date().getTime())/1000);
$("#loginForm [name='ts']").val(Z);
var ab=aa.encrypt($("#loginForm [name='pp']").val()+'\n'+Z+'\n');
$("#loginForm [name='p']").val(hex2b64(ab));
var ad=$("#loginForm [name='inputuin']").val();
$("#loginForm [name='uin']").val(ad.split('@')[0]);
$("#loginForm [name='domain']").val(ad.split('@')[1]);
$.ajax('/cgi-bin/login',{type:'post',dataType:'json',data:$("#loginForm").serialize(),success:function(af){
var ah;
var ae;
var ag;
if(af.Xml)
{
var ai=af.Xml;
ah=safeGetXmlData(ai,'target');
ae=safeGetXmlData(ah,'errtype');
}
else if(af.target)
{
ae=safeGetXmlData(af.target,'errtype');
}
if(af.sid&&safeGetXmlData(af.sid))
{
ag=safeGetXmlData(af.sid);
}
if(ag)
{
S.beforeLoginSucc&&S.beforeLoginSucc();
location.href=location.href+'&sid='+ag;
}
else if(ae==1)
{
U(n,'\u5E10\u53F7\u6216\u5BC6\u7801\u9519\u8BEF');
}
else if(ae==2)
{
U(x,'\u9A8C\u8BC1\u7801\u9519\u8BEF');
changeimg();
}
else if(ae==3)
{
$('#VerifyArea').show();
}
else if(ae==19)
{
U(g,'\u5E10\u53F7\u5DF2\u88AB\u7981\u7528\uFF0C\u8BF7\u8054\u7CFB\u4F01\u4E1A\u90AE\u7BB1\u7BA1\u7406\u5458');
}
else if(ae==20)
{
U(g,'\u767B\u5F55\u5931\u8D25\u3002\u4F60\u57DF\u540D\u7684MX\u8BB0\u5F55\u672A\u901A\u8FC7\u9A8C\u8BC1\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458');
}
},error:function(ae){
}});
return false;
});
var e=$('#complete_phone_container');
var d=$('#complete_phone_btn');
var m=$('#phone_bind_account_list_wrap');
if(e.size()>0)
{
K();
d.on('click',function(Z){
if(d.hasClass('login_btn_disabled'))
{
return;
}
var aa=$.trim(k.val());
var Y=$.trim(c.val());
var ab=$.trim(t.val());
if(!M())
{
U(k);
return;
}
if($.trim(ab)==='')
{
U(t);
return;
}
d.addClass('login_btn_disabled');
d.text('\u9A8C\u8BC1\u4E2D...');
$.ajax({url:'https://exmail.qq.com/cgi-bin/loginpage?action=wx_login_choose&f=json&r='+Math.random(),type:'POST',dataType:'json',data:{mobile:aa,area:Y,phone_vc:ab,wx_login_code:I('code')},success:function(ad){
d.removeClass('login_btn_disabled');
d.text('\u4E0B\u4E00\u6B65');
var af=safeGetXmlData(ad.wx_login_ret);
if(af=='0')
{
if(ad.wx_login&&ad.wx_login[0]&&ad.wx_login[0].wx_alias)
{
var ae=ad.wx_login[0].wx_alias;
if(ae.length===0)
{
U(k,'\u8BE5\u624B\u673A\u6682\u65E0\u7ED1\u5B9A\u5E10\u53F7');
F(0);
}
else{
var ac=getBindAccountListTpl(ae);
l.html(ac);
e.hide();
m.show();
O('WwBizmailLogin','scan_addmobile_login');
}
}
else{
U(k,'\u8BE5\u624B\u673A\u6682\u65E0\u7ED1\u5B9A\u5E10\u53F7');
F(0);
}
}
else if(af=='-98')
{
U(r,'\u53C2\u6570\u9519\u8BEF');
}
else if(af=='-99')
{
U(r,'\u9A8C\u8BC1\u7801\u9519\u8BEF');
}
else if(af=='-101'||af=='-201'||af=='-202')
{
U(r,'\u64CD\u4F5C\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u8BF71\u5206\u949F\u540E\u91CD\u65B0\u5C1D\u8BD5');
}
else if(af=='-300')
{
U(r,'\u7CFB\u7EDF\u5931\u8D25');
}
else if(af=='-121')
{
e.hide();
$('#no_mail_found_wrap').show();
O('WwBizmailLogin','scan_addmobile_noresult');
}
else if(af=='-603')
{
e.hide();
$('#mobile_bind_fail_wrap').show();
O('WwBizmailLogin','wx_binding_fail');
}
else if(af=='-1')
{
U(r,'\u5FAE\u4FE1\u626B\u7801\u4FE1\u606F\u5DF2\u8FC7\u671F');
}
else{
U(r,'\u9A8C\u8BC1\u5931\u8D25');
}
},error:function(){
d.removeClass('login_btn_disabled');
d.text('\u4E0B\u4E00\u6B65');
}});
return false;
});
O('WwBizmailLogin','scan_addmobile');
}
function O(Z,Y)
{
new Image().src='https://exmail.qq.com/qy_mng_logic/reportKV?type='+Z+'&itemName='+Y+'&r='+Math.random();
}
function M()
{
if(k&&H)
{
var Y=$.trim(k.val());
return H.isValidMobile(H.getValue(),Y)&&/^[0-9]+$/.test(Y);
}
else{
return true;
}
}
function N(Y,Z)
{
if(Y==86)
{
return Z.length==11&&/^[0-9]+$/.test(Z);
}
return /^[0-9]+$/.test(Z);
}
function F(ab,Y)
{
Y=Y||r;
if(ab>0)
{
wait=true;
var Z=ab-1;
var aa='\u91CD\u65B0\u53D1\u9001('+Z+'S)';
Y.addClass('disabled');
Y.text(aa);
X=setTimeout(function(){
F(Z,Y);
},1000);
}
else{
wait=false;
Y.removeClass('disabled');
Y.text('\u83B7\u53D6\u9A8C\u8BC1\u7801');
clearTimeout(X);
}
}
function K()
{
H=new Dropdown({container:'.js_countryCode_dropdown',dropDownClass:'qy_telInput_zipCode_input ',dropdownInputClass:'qy_inputText_Big',onChange:function(Y){
H.setText(Y.value);
G=+Y.value;
},onHide:function(){
if(!H.isValidCode(H.getText()))
{
H.setText(G);
}
else if(G!=H.getText())
{
H.setText(G);
}
}});
$.extend(H,D);
H.initialize(H.opt);
H.selectByValue(G);
H.scrollToSelectedItem();
}
function I(Y)
{
var aa=new RegExp("(^|&)"+Y+"=([^&]*)(&|$)");
var Z=window.location.search.substr(1).match(aa);
if(Z!=null)
{
return unescape(Z[2]);
}
return null;
}
function U(Y,aa)
{
var Z=Y.closest('.signup_item');
Z.addClass('signup_item_error');
if(aa)
{
Z.find('.signup_item_content_tips_error').text(aa);
}
}
function J(Y)
{
Y.closest('.signup_item').removeClass('signup_item_error');
}
function R(Y)
{
document.form1.fun.value='';
document.form1.vt.value='mobilecode';
document.form1.uin.value=Y;
document.form1.inputuin.value='';
document.form1.ppp.value='';
document.form1.pp.value='';
document.form1.submit();
}
function V(Y)
{
$('[data-panel]').hide();
$('[data-panel='+Y+']').show();
}
function E()
{
if($('#tipsContainer').length==0)
{
var Y='<div id="tipsContainer" style="display:none;"><div id="tipsTop" class="tipsWrap topPos size14" style="display:none;"><span class="msg"></span></div><div id="tipsMsg" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg"></span></div><div id="tipsProcess" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg" style="background-color:gray;"></span></div><div id="tipsError" class="tipsWrap tipsCenter size14" style="display:none;"><span class="msg" style="background-color:orange;"></span></div></div>';
$('body').append(Y);
}
}
function T(Z,Y)
{
E();
W($('#tipsError'),Z,Y);
}
function W(aa,ab,Z)
{
var Y=$('#tipsContainer');
Y.show();
aa.show().find('span').html(ab);
setTimeout(function(){
Y.hide();
aa.hide();
},Z||2000);
return this;
}
}
function renderList(a)
{
a=a||{};
if(a.wx_login_code)
{
$.ajax({url:'/cgi-bin/loginpage?action=wx_login_choose&f=json&wx_login_code='+a.wx_login_code,success:function(c){
var d=c.wx_login[0].wx_alias;
var b=getBindAccountListTpl(d,{needHeader:true,key:'data-uin'});
$('.login_scan_panel').html(b);
$('[name="wx_login_code"]').val(a.wx_login_code);
}});
}
}
$.fn.loginEvent={init:init,renderList:renderList};
var basetool=$.fn.basetool;
function initNavBar()
{
var a=$(document);
a.off("click",".introduce_nav_item");
a.on("click",".introduce_nav_item",function(c){
var b=$(c.currentTarget),d=b.attr("data-url");
location.href=d;
});
}
function initFooter()
{
$('.frame_foot_contact_item_WeChat').on('mouseenter',function(a){
$(".index_foot_contact_qrCode").show();
});
$('.frame_foot_contact_item_WeChat').on('mouseleave',function(a){
$(".index_foot_contact_qrCode").hide();
});
}
$.fn.nav={initNavBar:initNavBar,initFooter:initFooter};
