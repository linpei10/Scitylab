let cssdropdown={
disappeardelay: 250, 
disablemenuclick: false, 
enableswipe: 1, 
enableiframeshim: 1, 
dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, swipetimer: undefined, bottomclip:0,

getposOffset:function(what, offsettype){
let totaloffset=(offsettype==="left")? what.offsetLeft : what.offsetTop;
let parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype==="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
},

swipeeffect:function(){
if (this.bottomclip<parseInt(this.dropmenuobj.offsetHeight)){
this.bottomclip+=10+(this.bottomclip/10) ;
this.dropmenuobj.style.clip="rect(0 auto "+this.bottomclip+"px 0)"
}
else
return;
this.swipetimer=setTimeout("cssdropdown.swipeeffect()", 10)
},

showhide:function(obj, e){
if (this.ie || this.firefox)
this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px";
if (e.type==="click" && obj.visibility===hidden || e.type==="mouseover"){
if (this.enableswipe===1){
if (typeof this.swipetimer!="undefined")
clearTimeout(this.swipetimer);
obj.clip="rect(0 auto 0 0)" ;
this.bottomclip=0;
this.swipeeffect()
}
obj.visibility="visible"
}
else if (e.type==="click")
obj.visibility="hidden"
},

iecompattest:function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
},

clearbrowseredge:function(obj, whichedge){
let edgeoffset=0
if (whichedge==="rightedge"){
let windowedge=this.ie && !window.opera? this.iecompattest().scrollLeft+this.iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth;
if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  
edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
let topedge=this.ie && !window.opera? this.iecompattest().scrollTop : window.pageYOffset;
let windowedge=this.ie && !window.opera? this.iecompattest().scrollTop+this.iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight;
if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ 
edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight;
if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) 
edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
},

dropit:function(obj, e, dropmenuID){
if (this.dropmenuobj!=null) 
	this.dropmenuobj.style.visibility="hidden" ;
this.clearhidemenu();
if (this.ie||this.firefox){
obj.onmouseout=function(){cssdropdown.delayhidemenu()};
obj.onclick=function(){return !cssdropdown.disablemenuclick} ;
this.dropmenuobj=document.getElementById(dropmenuID);
if(!this.dropmenuobj) return;
this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu()};
this.dropmenuobj.onmouseout=function(e){cssdropdown.dynamichide(e)};
this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()};
this.showhide(this.dropmenuobj.style, e);
this.dropmenuobj.x=this.getposOffset(obj, "left");
this.dropmenuobj.y=this.getposOffset(obj, "top");
this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px";
this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px";
this.positionshim() 
}
},

positionshim:function(){ 
if (this.enableiframeshim && typeof this.shimobject!="undefined"){
if (this.dropmenuobj.style.visibility==="visible"){
this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px";
this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px";
this.shimobject.style.left=this.dropmenuobj.style.left;
this.shimobject.style.top=this.dropmenuobj.style.top
}
this.shimobject.style.display=(this.dropmenuobj.style.visibility==="visible")? "block" : "none"
}
},

hideshim:function(){
if (this.enableiframeshim && typeof this.shimobject!="undefined")
this.shimobject.style.display='none'
},

contains_firefox:function(a, b) {
while (b.parentNode)
if ((b = b.parentNode) === a)
return true;
return false;
},

dynamichide:function(e){
let evtobj=window.event? window.event : e;
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu();
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu()
},

delayhidemenu:function(){
this.delayhide=setTimeout("cssdropdown.dropmenuobj.style.visibility='hidden'; cssdropdown.hideshim()",this.disappeardelay) 
},

clearhidemenu:function(){
if (this.delayhide!="undefined")
clearTimeout(this.delayhide)
},

startchrome:function(){
for (let ids=0; ids<arguments.length; ids++){
let menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a");
for (let i=0; i<menuitems.length; i++){
if (menuitems[i].getAttribute("rel")){
let relvalue=menuitems[i].getAttribute("rel");
menuitems[i].onmouseover=function(e){
let event=typeof e!="undefined"? e : window.event;
cssdropdown.dropit(this,event,this.getAttribute("rel"))
}
}
}
}
if (window.createPopup && !window.XmlHttpRequest){ 
document.write('<IFRAME id="iframeshim"  src="" style="display: none; left: 0; top: 0; z-index: 90; position: absolute; filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
this.shimobject=document.getElementById("iframeshim") 
}
}

};


    




$(function () {
	$("#opff").css("display","none");
	$(".opff").click(function () {
		let txt = $(this).text();
		if (txt === "展开") {
			$("#opff").show();
			$(this).text("收起");
		}else {
			$("#opff").hide();
			$(this).text("展开");
		}

	});



	// 轮播图
	$(".outer .num li").mouseover(function () {
		$(this).addClass("current_1").siblings().removeClass("current_1");
		let index = $(this).index();
		i = index;
		$(".outer .imgs li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
	});

	let time = setInterval(move,2500);
	let i = 0;
	function move() {
		if (i === 4) {
			i = -1
		}
		i++;
		$(".outer .num li").eq(i).addClass("current_1").siblings().removeClass("current_1");
		$(".outer .imgs li").eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);

	}

		function moveL() {

		if (i === 0) {
			i = 4
		}
		i--;
		$(".outer .num li").eq(i).addClass("current_1").siblings().removeClass("current_1");
		$(".outer .imgs li").eq(i).stop().fadeIn(1000).siblings().stop().fadeOut(1000);

	}

	$(".outer").hover(function () {
		clearInterval(time);
	},function () {
		time = setInterval(move,2500);
		});

	$(".right_btn").click(function () {
		move()
	});

	$(".left_btn").click(function () {
        moveL()
	});


	// 回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() > 562) {
            $(".pm6_con_foot").show();
            let $height1 = $(window).scrollTop() + $(window).height();
            if ($height1 > ($(document).height()-185)) {
                let $now_height = 185 - ($(document).height() - $height1);
                $(".pm6_con_foot").css("bottom",$now_height + 'px')
            } else {
                $(".pm6_con_foot").css("bottom","100px")
            }
        }else {
            $(".pm6_con_foot").hide();
        }
    });

    
	$(".pm6_con_foot").click(function () {
		$(window).scrollTop(200);
	});

	$(".pmc_con_foot").click(function () {
		$(window).scrollTop(200);
	});

		// 滚动菜单
            });


$(function () {
            $("form .dow_block").click(function () {
                let $next = $(this).parent().next();
                if (!$next.is(":animated")){
                    if ($(this).text() === "展开") {
                    $(this).text("收起");
                    $next.stop().slideDown(1000);
                    }else {
                        $(this).text("展开");
                        $next.stop().slideUp(1000);
                    }
                }
                return false
            });



        $(".pmc_mue1 li").mouseover(function () {
            $(this).addClass("backco").siblings().removeClass("backco");
            let index = $(this).index();
            // alert(index);
            $(".pmc").children().eq(index).show().siblings().hide();
        });


        $(".pmc_wind").click(function () {
            $(".art_2 #pmc_home").hide();
            $(".pmc_mue1").removeClass("hides");
            $(document).scrollTop(600);
            $(window).scrollTop(600);
            $(".pmc").children().eq(0).show().siblings().hide();
        });

        $(".pmc_water").click(function () {
            $(".art_2 #pmc_home").hide();
            $(".pmc_mue1").removeClass("hides");
            $(".pmc").children().eq(1).show().siblings().hide();

        });
        $(".pmc_conta").click(function () {
            $(".art_2 #pmc_home").hide();
            $(".pmc_mue1").removeClass("hides");
            $(".pmc").children().eq(2).show().siblings().hide();

        });

        // $(".dow_download").click(function () {
        //     let win_height = $(this).height();
        //     let height = $(window).scrollTop();
        //     $(".dow_info").show();
        //     $(".dow_info_con").show().css("top",height+win_height+350);
        //     $(".dow_info_con p:first").css({"font-size":"25px","text-align":"center"})
        //     return false
        // });
        //
        // $(".dow_info_con .dow_info_but").eq(1).click(function () {
        //     $(".dow_info").hide();
        //     $(".dow_info_con").hide();
        // });



});
        $(function () {
            all_cleck();
        });

        function all_cleck() {

            $(".dow_list1 input").click(function () {
                let  checked = $(this).parent().children("div").children("input");

                if ($(this).is(":checked")) {
                    checked.prop("checked",true)
                }else {
                    checked.prop("checked",false)
                }
            });
        }

        // $(function () {
        //     $("form input[name=name]").blur(function () {
        //         let $parent = $(this).parent();
        //         $parent.find("#success").remove();
        //         $parent.find("#error").remove();
        //             if (this.value === "" || 6 < this.value.trim().replace(/\s/g,"").length || this.value.trim().replace(/\s/g,"").length < 2) {
        //                 let errorMsg = "请填写您的真实名字";
        //                 $parent.append("<div id='error'>" + errorMsg + "</div>")
        //             }else {
        //                 let okMsg = "OK";
        //                 $parent.append("<div id='success'>" + okMsg + "</div>")
        //             };
        //     });
        //
        //     $("form input[name=post]").blur(function () {
        //         let $parent = $(this).parent();
        //         $parent.find("#success").remove();
        //         $parent.find("#error").remove();
        //             if (this.value === "" || this.value.trim().replace(/\s/g,"").length <3) {
        //                 let errorMsg = "请填写您的真实职务";
        //                 $parent.append("<div id='error'>" + errorMsg + "</div>")
        //             }else {
        //                 let okMsg = "OK";
        //                 $parent.append("<div id='success'>" + okMsg + "</div>")
        //             }
        //     });
        //
        //     $("form input[name=comp]").blur(function () {
        //         let $parent = $(this).parent();
        //         $parent.find("#success").remove();
        //         $parent.find("#error").remove();
        //         // .trim() 去掉空格  replace(/\s/g,"") 去掉中间的空格
        //             if (this.value === "" || this.value.trim().replace(/\s/g,"").length < 5) {
        //                 let errorMsg = "公司名称长度不符合要求";
        //                 $parent.append("<div id='error'>" + errorMsg + "</div>")
        //             }else {
        //                 let okMsg = "OK";
        //                 $parent.append("<div id='success'>" + okMsg + "</div>")
        //             }
        //     });
        //
        //     $("form input[name=phone]").blur(function () {
        //         let $parent = $(this).parent();
        //         $parent.find("#success").remove();
        //         $parent.find("#error").remove();
        //             if (this.value === "" || this.value != "" && !/[0-9]{7,15}$/.test(this.value) ) {
        //                 let errorMsg = "电话格式不符合要求";
        //                 $parent.append("<div id='error'>" + errorMsg + "</div>")
        //             }else {
        //                 let okMsg = "OK";
        //                 $parent.append("<div id='success'>" + okMsg + "</div>")
        //             }
        //     });
        //
        //     $("form input[name=email]").blur(function () {
        //         let $parent = $(this).parent();
        //         $parent.find("#success").remove();
        //         $parent.find("#error").remove();
        //             if (this.value === "" || this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) {
        //                 let errorMsg = "请输入正确格式的邮箱";
        //                 $parent.append("<div id='error'>" + errorMsg + "</div>")
        //             }else {
        //                 let okMsg = "OK";
        //                 $parent.append("<div id='success'>" + okMsg + "</div>")
        //             }
        //     });




            $(".dow_info_but input").eq(0).click(function () {
                $("form input").trigger("blur");
                let numError = $("form #error").length;
                if (numError) {
                    return false
                };
                alert("感谢您的支持，已发送邮件，请查收！！");
                $(".dow_info,.dow_info_con").hide();
            });

            $(".dow_info_but input").eq(1).click(function () {
                $(".dow_info,.dow_info_con").hide();
            });



$(function () {
    $(".password input[type=button]").click(function () {
        if ($(".password input[type=text]").val() === "1") {
            $(".password1").show();
            $(".password").hide();
        }else {
            alert("无权访问");
        }
    })
});


// 百度百科滚动条

    function baidu(func) {
        $(window).scroll(function () {
            // let $init_height = func.eq(0).offset().top;
            // if ($init_height) {
                if ($(window).scrollTop() > 600) {
                    if ($("#pmc_home").css("display") == "none" || $("#pmc_home").length == 0) {
                        $(".scroll_mue").show();
                        console.log($(".scroll").offset().top - $(window).scrollTop())
                    } else {
                        $(".scroll_mue").hide();
                    }
                    func.each(function () {
                        let $offset = $(this).offset().top - $(window).scrollTop();
                        let $height = $(this).height();
                        let $index = $(this).index();

                        if ($offset <= 0 && $offset > -$height) {

                            $(".right_arrow").animate({top: (348 + $index * 40) + "px"}, 50);

                            // if ($(document).height() == $(window).height() + $(window).scrollTop()) {
                            //     $(".right_arrow").animate({bottom:"400px"},30);
                            // }
                        }
                    })
                } else {
                    $(".scroll_mue").hide();
                }
            // }
        });


        $(".scroll_con span").mouseover(function () {
            let $index = $(this).parent().parent().index() - 1;
            $(".scroll a").eq($index).addClass("scroll_back");
        }).mouseout(function () {
            let $index = $(this).parent().parent().index() - 1;
            $(".scroll a").eq($index).removeClass("scroll_back");
        });


        $(".scroll a").click(function () {
            let $index = $(this).parent().index() - 1;
            console.log($index);
            let $height1 = func.eq($index).offset().top;
            console.log($height1);
            $(window).scrollTop($height1);
        });

        $(".scroll a").mouseover(function () {
            let $index = $(this).parent().index() - 1;
            $(".scroll_con em").eq($index).addClass("hover1")
        }).mouseout(function () {
            let $index = $(this).parent().index() - 1;
            $(".scroll_con em").eq($index).removeClass("hover1");
        })

    }
$(function () {

    let $left = (window.outerWidth -1040) / 2 + 65;
    $(".right_arrow").css("left",$left+"px");
    $(".scroll").css("left",$left+"px")

});



$(function () {
    $("button[class*=Button--link]").click(function () {
            $(".change_").fadeIn();
            $("html").style = 'overflow: hidden; margin-right: 17px;';
            $("body").addClass("Modal--open")
        });

    $("button[class*=plains]").click(function () {
        $(".change_").fadeOut();
        $("div[class=change_list]").hide();
    });
    $("button[class*=button_list]").click(function () {
        let $top = $(window).height() / 2 + 10;
        let $left = ($(window).width() - $(".Modal-inner").width())/ 2 + 10;
        $("div[class=change_list]").css({"position":"absolute","top":$top+"px","left":$left+"px"}).show()
    });


    $("button[class=Select-option]").click(function () {
        $("#Popover18-toggle").text($(this).text());
        $("div[class=change_list]").hide()
    });

    let countdown=60;
   $(".CountingDownButton").click(function () {
       let obj = $(this);
       settime(obj);
   });

    function settime(obj) { //发送验证码倒计时
    if (countdown === 0) {
        obj.attr('disabled',false);
        //obj.removeattr("disabled");
        obj.text("获取验证码");
        countdown = 60;
        return;
    } else {
        obj.attr('disabled',true);
        obj.text("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function() {
        settime(obj) }
        ,1000)
    }


    $(".Input").keyup(function () {
        if ($(this).val().length === 6){
            $(".VerificationDialogModal-button").removeAttr("disabled")
        }
    })
});


























