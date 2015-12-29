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
//header区域结束

//导航条区域开始
var navNav = document.getElementById("nav-div2");
var nav = document.getElementById("nav");
var contactInformation = document.getElementById("contactInformation");
var contact = document.getElementById("contact");
document.onmouseover = function (e) {
    e = e || window.event;//处理事件兼容性；
    var tar = e.target || e.srcElement;//事件源；
    var ch = dom.setCss(navNav,"height");
    var broszhu = tar.getAttribute("broszhu");//监听的对象；
    if (broszhu === "true") {//以属性来判断；
        if (ch <= 200) {
            move.call(navNav, 200);
            navNav.style.display="block";
        }
    } else {
        if (ch > 0) {
            move.call(navNav, 0);
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
            if (start - 10 <= target) {
                dom.setCss(that, "height", target);
                navNav.style.display="none";
                clearTimeout(that.timer);
                return;
            }
        } else if (start < target) {
            dom.setCss(that,"height", start + 10);
            if (start + 10 >= target) {
                dom.setCss(that, "height", target);
                clearTimeout(that.timer);
                return;
            }
        } else {
            return;
        }
    }
}
//下面是导航条上的联系方式
contact.onmouseover=function(){contactInformation.style.display="block";};
contact.onmouseout=function(){contactInformation.style.display="none";};
//导航条区域结束

//商品介绍区域开始
//      下面是选项卡
var displayHeader=document.getElementById("displayHeader");
var displayBody=document.getElementById("displayBody");
var displayHeaderLi=displayHeader.getElementsByTagName("li");
var displayBodyDiv=displayBody.getElementsByTagName("li");
for(var i= 0,len=displayHeaderLi.length;i<len;i++){
    displayHeaderLi[i].index=i;
    displayHeaderLi[i].onmouseover=function(){
        tabChange(this.index)
    }
}
function tabChange(index){
    for(var i=0;i<displayHeaderLi.length;i++){
        displayHeaderLi[i].className="";
        displayBodyDiv[i].className="";
    }
    displayHeaderLi[index].className="select";
    displayBodyDiv[index].className="select"
}

//  下面是放大镜效果区域
var oTab = document.getElementById("tab");
//获取鼠标滚动掉的像素;鼠标滚动的时候，强制刷新winTop;
var winTop =getWin("scrollTop");
window.onscroll=function(){
    winTop =getWin("scrollTop");
}
//获得oDiv本身的高和宽；获得oDiv距离浏览器左上角的位移；
var offset = offset.call(oTab);
var tabT = offset.top;
var tabL = offset.left;
var tabW = oTab.offsetWidth;
var tabH = oTab.offsetHeight;
//onmouseenter限制冒泡机制
oTab.onmouseenter = function (e) {
    //创建大图容器
    var container = document.createElement("div");
    container.id = "container";
    this.appendChild(container);

    var bigImg=document.createElement("img");
    bigImg.src="img/peony.jpg";
    bigImg.id="bigImg";
    container.appendChild(bigImg);

    //当鼠标移近来的时候，动态创建一个DIV元素，id是mark
    var mark = document.createElement("div");
    mark.id = "mark";
    this.appendChild(mark);//像oTab里添加mark；

    //执行setMark
    setMark(mark, container, e);
};

oTab.onmousemove = function (e) {
    var mark = document.getElementById("mark");
    if (mark) {
        //先判断mark是否存在，如果存在，执行setMark
        setMark(mark, container, e);
    }
};

//onmouseleave也可以显示冒泡机制;
oTab.onmouseleave = function () {
    var mark = document.getElementById("mark");
    if (mark) {
        //当离开的时候移除mark节点；
        this.removeChild(mark);
        this.removeChild(container);
    }
};

var jiance=document.getElementById("jiance");
function setMark(mark,container,e) {
    e = e || window.event;
    //上面是绑定事件的标配；
    //获取mark这个div的宽度和高度；并且让mark这个DIV显示在鼠标出现位置的正中间；
    var markW = mark.offsetWidth;
    var markH = mark.offsetHeight;
    var l = e.clientX - tabL - (mark.offsetWidth / 2);
    var t = e.clientY+ winTop- tabT - (mark.offsetHeight / 2);//因为鼠标滚动的时候，需要加上滚动出的距离；否则mark的这个镜片位置就不对了
    //console.log("e.clientX:"+e.clientX +"tabL:"+ tabL +"winTop:"+ winTop);

    mark.style.left = l + "px";
    mark.style.top = t + "px";
    container.style.left=tabW+10+"px";
    container.style.top=0;
//        bigImg.style.left="-"+(l/tabW*bigImg.width)+"px";
//        bigImg.style.top="-"+(t/tabH*bigImg.height)+"px";
    //如果样式用上面的写，在IE678的时候有兼容性问题，应该改为下面的
    if(l<=0){
        bigImg.style.left=="0px";
    }else{
        bigImg.style.left="-"+l/tabW*bigImg.width+"px";
    }
    if(t<=0){
        bigImg.style.top=="0px";
    }else{
        bigImg.style.top="-"+(t/tabH*bigImg.height)+"px";
    }
    //下面是判断边界，当鼠标移到左边界和右边界的判断；
    if (l < 0) {
        mark.style.left = 0;
    } else if (l > (tabW - markW)) {
        mark.style.left = tabW - markW + "px";
        bigImg.style.left="-"+(tabW-markW)/tabW*bigImg.width+"px";
    }
    //当鼠标移到上边界和下边界的判断；
    if (t < 0) {
        mark.style.top = 0 + "px";
    } else if (t > (tabH - markH)) {
        mark.style.top = tabH - markH + "px";
        bigImg.style.top="-"+(tabH-markH)/tabH*bigImg.height+"px";
    }
};
    //下面的函数可以算出元素的距离浏览器顶部的绝对位置,
function offset() {
    var left = this.offsetLeft, top = this.offsetTop, par = this.offsetParent;
    while (par) {
        left += par.offsetLeft;
        top += par.offsetTop;
        if (window.navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
            left += par.clientLeft;
            top += par.clientTop;
        }
        par = par.offsetParent;
    }
    return {
        left: left,
        top: top
    };
}
    //获取元素的属性clientHeight+scrollTop
function getWin(attr) {
    return document.documentElement[attr] || document.body[attr];
}
//省市区三级
addressInit('province', 'city', 'area', '上海', '市辖区', '浦东新区');
//鼠标悬停提示
var rent=document.getElementById("rent");
var distributionTime=document.getElementById("distributionTime");
var xiaoxi1=document.getElementById("xiaoxi1");
var xiaoxi2=document.getElementById("xiaoxi2");
rent.onmouseover=function(){show(xiaoxi1)};
rent.onmouseout=function(){none(xiaoxi1)};
distributionTime.onmouseover=function(){show(xiaoxi2)};
distributionTime.onmouseout=function(){none(xiaoxi2)};
function show(ele){
    ele.style.display="block";
};
function none(ele){
    ele.style.display="none";
}
//商品数量增加
var mallNum=document.getElementById("mallNum");
var flag=document.getElementById("flag");
var reduce=dom.getElementsByClassName(mallNum,"reduce")[0];
var plus=dom.getElementsByClassName(mallNum,"plus")[0];
var content=dom.getElementsByClassName(mallNum,"content")[0];
reduce.onclick=function() {
    if(content.innerText<2) return;
    content.innerText--;
    if(content.innerText==1){
        flag.className="right-right";
    };
};
plus.onclick=function(){
    content.innerText++;
    flag.className="right-right flag";
};
//商品介绍区域结束
