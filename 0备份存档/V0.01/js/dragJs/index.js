var dom=new Tool();
var photolist=document.getElementById("photolist");
var oLis=photolist.getElementsByTagName("li");
for(var i=oLis.length-1;i>=0;i--){
    var oLi=oLis[i];
    oLi.l=oLi.offsetLeft;
    oLi.t=oLi.offsetTop;
    oLi.style.left=oLi.l+"px";
    oLi.style.top=oLi.t+"px";
    oLi.style.position="absolute";
    oLi.style.margin=0;

    on(oLi,"mousedown",down);
    on(oLi,"selfDragStart",zIndexNum);
    on(oLi,"selfDragMove",getHitedEle);
    on(oLi,"selfDragEnd",changePosition);

}

var zIndex=1;
function zIndexNum(){
    this.style.zIndex=++zIndex;
    this.style.backgroundColor="#cb5c55"
}
function restore(){
    this.style.backgroundColor=""
}

function isHited(r,b){//判断是否判断
    if(r.offsetLeft+ r.offsetWidth< b.offsetLeft
        || r.offsetTop+ r.offsetHeight< b.offsetTop
        || r.offsetLeft> b.offsetLeft+ b.offsetWidth
        || r.offsetTop> b.offsetTop+ b.offsetHeight){
        return false;
    }else{
        return true;
    }
}

//*获取相交最近的li*//
function getHitedEle(){
    this["aHitedEle"]=[];
    var subs= dom.getSiblings(this);
    for(var i=0;i<subs.length;i++){
        var oLi=subs[i];
        oLi.style.backgroundColor="#FFF";
        if(isHited(this,oLi)){
            oLi.style.backgroundColor="#e1d05c";
            this["aHitedEle"].push(oLi);
        }
    }
}

/*交换w位置*/
function changePosition(){
    var ary= this["aHitedEle"];
    if(ary&&ary.length){
        var oMin={};
        for(var i=0;i< ary.length;i++){
            var oLi=ary[i];
            if(!oMin.ele){
                oMin.min=Math.sqrt(Math.pow(this.offsetLeft-oLi.offsetLeft,2)+Math.pow(this.offsetTop-oLi.offsetTop,2));
                oMin.ele=oLi;
            }else{
                var distance=Math.sqrt(Math.pow(this.offsetLeft-oLi.offsetLeft,2)+Math.pow(this.offsetTop-oLi.offsetTop,2));
                if(oMin.min>distance){
                    oMin.min=distance;
                    oMin.ele=oLi;
                }
            }
        }
        /*下面是加动画效果的*/
        starMove(oMin.ele,{left:this.l,top:this.t},600,8,restore);
        starMove(this,{left:oMin.ele.l,top:oMin.ele.t},600,8,restore);
        //*下面是更新交换后的位置*//*
        var objEle={l:this.l,t:this.t};
        this.l=oMin.ele.l;
        this.t=oMin.ele.t;
        oMin.ele.l=objEle.l;
        oMin.ele.t=objEle.t;
        this["aHitedEle"]=null;
    }else{
        starMove(this,{left:this.l,top:this.t},600,8,restore)
    }
    setTimeout(function(){
        for(var i=oLis.length-1;i>=0;i--){
            var oLi=oLis[i];
            oLi.style.background="#fff"
        }
    },500)

}