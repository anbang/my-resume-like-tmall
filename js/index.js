//下面是header区域的JS文件
var dom=new Tool();
var explain=document.getElementById('explain');
var headerList=dom.getElementsByClassName(explain,'header-list');
for(var i=0;i<headerList.length;i++){
    headerList[i].onmouseover=function(e){
        e=e||window.event;
        goodE(e);
        var tooltip= document.createElement("div");
        tooltip.id="tooltip";
        var oImg= document.createElement("img");
        oImg.src=this.href;
        tooltip.appendChild(oImg);
        tooltip.style.left= e.clientX+10+"px";
        tooltip.style.top= e.clientY+20+"px";
        document.body.appendChild(tooltip);//在全局里面加的，
        tooltip.style.display="block";

    };
    headerList[i].onmousemove=function(e){
        e=e||window.event;
        goodE(e);
        var tooltip=document.getElementById("tooltip");
        if(tooltip){
            tooltip.style.left= e.clientX+10+"px";
            tooltip.style.top= e.clientY+20+"px";
        }
    };
    headerList[i].onmouseout=function(e){
        e=e||window.event;
        goodE(e);
        document.body.removeChild(tooltip);
    }
}
//处理IE事件的
function goodE(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.stopPropagation=function(){e.cancelBubble=true;}//阻止事件传播;
        e.preventDefault=function(){e.returnValue=false;}//阻止事件默认行为;
    }
    return e;
}

//下面是导航条区域的JS文件
var navNav = document.getElementById("nav-div2");
document.onmouseover = function (e) {
    e = e || window.event;//处理事件兼容性；
    var tar = e.target || e.srcElement;//事件源；
    var ch = dom.setCss(navNav,"height");
    var broszhu = tar.getAttribute("broszhu");//监听的对象；
    if (broszhu === "true") {//以属性来判断；
        navNav.style.display="block";
        if (ch <= 200) {
            move.call(navNav, 200);
        }
    } else {
        if (ch > 0) {
            move.call(navNav, 0);
        }
        if(navNav.style.lineHeight=''){
            navNav.style.display="none";
        }
    }
};

function move(target) {
    var that = this;
    _move();
    function _move() {
        var start = dom.setCss(that,"height");//要在内部，不能写在外面
        clearTimeout(that.timer);
        that.timer = setTimeout(_move, 10);
        if (start >= target) {
            dom.setCss(that, "height", start - 10);
            if (start - 10 < target) {
                dom.setCss(that, "height", target);
                return;
            }
        } else if (start < target) {
            dom.setCss(that,"height", start + 10);
            if (start + 10 >= target) {
                dom.setCss(that, "height", target);
                return;
            }
        } else {
            return;
        }
    }
}



