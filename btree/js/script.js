var v=new view();
var leftcon=document.getElementById("left");
var con=document.createElement("div");
con.className="composite";
con.innerHTML="composite";
var conChild=document.createElement("ul");
conChild.className="comchild";
conChild.id="conul";
conChild.innerHTML="<li>sequence</li><li>dom</li>";
con.appendChild(conChild);
var addcus=document.getElementById("addcus");

var src="";
var lineIn="lineIn",lineOut="lineOut";
var treejs={};
var e1=document.getElementById("exports");
var e2=document.getElementById("imports");
var headers=document.getElementsByClassName("header")[0];
var edite=document.getElementById("edit");
var editeFlag=1;
var body=document.getElementById("body");
var b3=this.b3;
(function(){
	var newdiv=document.createElement("div");//最外层
	newdiv.className="appends";
	
	var newp=document.createElement("div");//第一层
	newp.innerHTML="Add Nodes";
	newp.style.textAlign="center";

	newdiv.appendChild(newp);

	var newdiv2=document.createElement("div");//第二层中
	newdiv2.className="adda";
	newdiv2.id="addnodes";

	var newli1=document.createElement("div");//第二层中的第一层
	newli1.style.width="100%";
	newli1.style.height="30px";
	
	var newinput=document.createElement("input");
	newinput.value="+";
	newinput.type="button";
	newinput.onclick=addcho;
	newinput.className="operator";
	newli1.appendChild(newinput);
	newdiv2.appendChild(newli1);

	var newdiv3=document.createElement("div");//第三层
	newdiv3.style.float="right";
	newdiv3.className="cadd";
	newdiv3.id="addCancel";
	newdiv3.innerHTML='<input type="button" onclick="addCaclick(event)" value="cancel"><input type="button"  onclick="addCaclick(event)" value="add">';

	newdiv.appendChild(newdiv2);
	newdiv.appendChild(newdiv3);
	
	addcus.onclick=function(){

	var mydiv=document.getElementsByClassName("appends")[0];
	if(!mydiv){
			body.appendChild(newdiv);
			addcho();
	}else{
			var mydiv=document.getElementsByClassName("appends")[0];
			var parent=mydiv.querySelectorAll("div")[1];
			var onenodes=document.getElementsByClassName("onenode");
				//alert(onenodes.length)
			if(onenodes.length){
					for(var i=0;i<onenodes.length;i++){
						parent.removeChild(onenodes[i]);
					}
			}
			mydiv.style.display="block";
			addcho();

	}
};
})();
function addcho(){
	var mydiv=document.getElementById("addnodes");
	var newdiv=document.createElement("div");
	newdiv.style.margin="0px auto 0px auto";
	newdiv.className="onenode";
	newdiv.innerHTML='<input type="text" placeholder="Node name"><input type="text" placeholder="Node title"><select ><option value="Composite">Composite</option><option value="Decorator">Decorator</option><option value="Condition">Condition</option><option value="Action">Action</option></select><input type="button"  class="operator" style="background:#f0320b" onclick="operationAdd(event)" id="cancelnode"value="-">';
	mydiv.appendChild(newdiv);
}
function operationAdd(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			if(String.trim(target.value)=="-"){
				var parentdiv=target.parentNode;
				parentdiv.parentNode.removeChild(parentdiv);
			}
}
function addCaclick(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
				var onenodes=document.getElementsByClassName("onenode");
				if(target.value=="add"){
					if(onenodes.length){
						for(var i=0;i<onenodes.length;i++){
							var name=onenodes[i].querySelectorAll("input")[0].value;
							var title=onenodes[i].querySelectorAll("input")[1].value;
							var category=onenodes[i].querySelector("select").value;

							var cates=document.getElementsByClassName("conul");
							var categ=String.toLowerCase(category);
							one:for(var j=0;j<cates.length;j++){
								if(cates[j].previousSibling.innerHTML==categ){
									for(var k=0;k<cates[j].children.length;k++){
										//alert(cates[j].children[k].innerHTML+" "+name)
										if(cates[j].children[k].innerHTML==name){
											break one;
										}
									}
									var newli=document.createElement("li");
									newli.innerHTML=name;
									newli.id=name;
									cates[j].appendChild(newli);
									clickListen(newli);

									this.b3=this.b3||{},function(){
										var a;
										switch(category){
											case "Composite":
												a=b3.class(b3.Composite);
												break;
											case "Decorator":
												a=b3.class(b3.Decorator);
												break;
											case "Condition":
												a=b3.class(b3.Condition);
												break;
											case "Action":
												a=b3.class(b3.Action);
												break;
										}
										var b=a.prototype;
										b.name=name;
										b.title=title;
										b._BaseNode_initialize=b.initialize;
										b.initialize=function(a){
											this._BaseNode_initialize()
										},
										b3[name]=a;
									}();

								registerNode(b3[name]);

								break;
							}
						}	
					}
				}else{
					alert("请输入参数");
				}
					
				}else if(target.value=="cancel"){
					
					var appends=document.getElementsByClassName("appends")[0];
					appends.style.display="none";
				}
}
(function headerListen(){
	var headerFlag=[1,1,1,1,1];
	for(var i=0;i<headers.children.length;i++){
		let k=i;
		headers.children[i].children[0].onclick=function(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			var node=target.parentNode.parentNode.children;
			for(var j=0;j<node.length;j++){
				if(j!=k){headerFlag[j]=headerFlag[j]?headerFlag[j]:!headerFlag[j]}
				if(node[j].getElementsByTagName("ul")[0]){
					node[j].getElementsByTagName("ul")[0].style.display=null;
				}
				
			}
			if(headerFlag[k]){
				target.nextSibling.style.display="block";
				headerFlag[k]=!headerFlag[k];
			}else if(!headerFlag[k]){
				target.nextSibling.style.display=null;
				headerFlag[k]=!headerFlag[k];
			}	
			

		}

		}
})();
inits();
var nodes={};


registerNode(b3.Sequence);
registerNode(b3.Priority);
registerNode(b3.MemPriority);
registerNode(b3.Inverter);
registerNode(b3.Repeater);
function registerNode(node){
	var b=node.prototype.name;
	nodes[b]=node;


}
	var cate=["composite","decorator","condition","action"];
for(var i=0;i<cate.length;i++){
	var newlis=document.createElement("li");
	newlis.className="category";
	var newdiv=document.createElement("div");
	newdiv.className="cate";

	newdiv.innerHTML=cate[i];

	var newul=createCategory(cate[i]);
	for(var j=0;j<newul.children.length;j++){
		clickListen(newul.children[j]);
	}
	newlis.appendChild(newdiv);
	newlis.appendChild(newul);
	leftcon.appendChild(newlis);
}
function createCategory(a){
	var newul=document.createElement("ul");
	newul.className="conul";
	
	var str="";
	for(var k in nodes){
		if(nodes[k].prototype.category==a){
			str+='<li id="'+k+'">'+k+'</li>';
		}
	}
	//alert(str);
	newul.innerHTML=str;
	return newul;
}
function clickListen(a){
	//alert(conChilds[i].innerHTML);
	a.onmousedown=function(event){
		var e=event||window.event;
		var targetEle=e.target||e.srcElement;
		var inhtml=targetEle.parentNode.parentNode.firstChild.innerHTML;
		var src=targetEle.innerHTML;
		type=inhtml;
		var pos=getPos(e);
		divX=pos.x;
		divY=pos.y;
		var posx,posy;
		var newdiv=document.createElement("div");
		var newcanvas=document.createElement("canvas");
		newdiv.appendChild(newcanvas);
		contt=newcanvas.getContext("2d");
		//v.
		var id=createUUID();
		if(divX<0){
			divX=0;
		}
		if(divY<0){
			divY=0;
		}
		//alert(divX+" "+divY);
		var d=v.drawCicle(cont,type,src,divX,divY); 
		 draws.push({id:id,display:{x:posx,y:posy},src:src,type:type,children:[],});
            d.redraw();
            var len=draws.length-1;
		document.onmousemove=function(event){
			var e=event||window.event;
			var po=getPos(event);
			 posx=po.x
			 posy=po.y
			 draws[len].display.x=posx;
			 draws[len].display.y=posy;
			 d.redraw();
		}
		document.onmouseup=function(ev){
			document.onmousemove=null; //将move清除
            document.onmouseup=null;
            var po=getPos(ev);
			 posx=po.x;
			 posy=po.y;
			}
		return false;
	};	
}
function createUUID(){
	for(var a=[],b="0123456789abcdef",c=0;c<36;c++){
		a[c]=b.substr(Math.floor(16*Math.random()),1);
	}
	a[14]="4",a[19]=b.substr(3&a[19]|8,1),a[8]=a[13]=a[18]=a[23]="-";
	var d=a.join("");
	return d;
}
function inits(){
	v.drawCicle(cont,"init",0,300,200);
	draws.push({title:"btree",display:{x:300,y:200},src:"init",type:"init",root:"",children:[]});
}
e1.onclick=function(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	var dat={
			"type":"init",
			"title":draws[0].title,
			"root":draws[0].root,
			"display":{
				"x":draws[0].display.x,
				"y":draws[0].display.y
				},
			"node":{

			}
		};
	var ids=draws[0].root;
	if(draws[1])
		dat.node[ids]=exportJSON(dat,draws[1]);
		var newdiv=document.createElement("div");
		newdiv.className="exports";
		var newd=document.createElement("div");
		newd.innerHTML=JSON.stringify(dat);
		newd.contentEditable=true;
		newd.className="Jsond";

		newdiv.appendChild(newd);
		

		newdivs=document.createElement("div");
		//newdivs.style.background="red";
		newdivs.className="exsure";
		newinput1=document.createElement("input");
		newinput1.type="button";
		newinput1.value="确定";
		newinput1.onclick=function(event){
			var event=event||window.event;
			target=event.target||event.srcElement;
			target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		}

		newdivs.appendChild(newinput1);

		newdiv.appendChild(newdivs);

		body.appendChild(newdiv);
		
		//alert(JSON.stringify(dat));
		data=dat;
		target.parentNode.parentNode.style.display=null;
}
function exportJSON(dat,node){
	var childrens=[];
	var node=node;
	var id=node.id;
	for(var i=0;i<node.children.length;i++){
		var child=exportJSON(dat,draws[node.children[i]]);
		var ids=child.id;
		dat.node[ids]=child;
		childrens.push(child.id);
	}
	return {
			"id":id,
			"src":node.src,
			"type":node.type,
			"display":{
				"x":node.display.x,
				"y":node.display.y
			},
			"children":childrens
		};
}
e2.onclick=function(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	cont.clearRect(0,0,mycanvas.width,mycanvas.height);
	//alert(JSON.stringify(data));
	draws=[];
	lines=[];


	var newdiv=document.createElement("div");
		newdiv.className="exports";
		var newd=document.createElement("div");
		newd.contentEditable=true;
		newd.className="Jsond";
		newdiv.appendChild(newd);

		newdivs=document.createElement("div");
		newdivs.className="exsure";
		newinput1=document.createElement("input");
		newinput1.type="button";
		newinput1.value="确定";
		newinput1.onclick=function(eve){
			var eve=eve||window.event;
			tart=eve.target||eve.srcElement;
			tart.parentNode.parentNode.parentNode.removeChild(tart.parentNode.parentNode);
			var da=JSON.parse(tart.parentNode.previousSibling.innerText);
			//alert(da);
			//alert(da["display"])
			importJSON(da,0,0,0,da["display"].x,da["display"].y);
		}
		newdivs.appendChild(newinput1);
		newdiv.appendChild(newdivs);
		body.appendChild(newdiv);		
		//data=dat;
		target.parentNode.parentNode.style.display=null;

	
	target.parentNode.parentNode.style.display=null;
}
function importJSON(dat,k1,lx,ly,x,y){
    imjs(dat,k1,lx,ly,x,y);
    var childrens=[];
    var id=dat.id;
    var len=draws.length-1;
    if(dat["children"]){
    	 for(var i=0;i<dat["children"].length;i++){
    	 	var idd=dat["children"][i];
    	 	var node=data.node[idd];
        	var child=importJSON(node,len,dat["display"].x,dat["display"].y,node["display"].x,node["display"].y);
        	childrens.push(child.id);
        }
        return {id:id,"type":dat["type"],display:{"x":dat["display"].x,"y":dat["display"].y},"children":childrens};
    }else if(dat["root"]){
    	var idt=dat["root"];
    	var n=data.node[idt];
    	var nx=importJSON(n,len,dat["display"].x,dat["display"].y,n["display"].x,n.display.y);
    	var nll={root:idt,"type":dat["type"],display:{"x":dat.display.x,"y":dat.display.y,"node":{}}};
    	nll["node"]=nx;
    	//return 
    	return nll;

   
}
}
function imjs(data,k1,lx,ly,x,y){
    var t=data["src"];
    var type=data["type"];
    var id=data["id"];
    if(id){
    	draws.push({id:id,display:{x:parseInt(x),y:parseInt(y)},src:t,type:type,children:[]});
    }else{
    	draws.push({title:data.title,src:t,type:type,root:data["root"],display:{x:x,y:y},children:[]});
    }
    if(lx&&ly){
    	var k2=draws.length-1;
       // draws[k1].lineOut.push({lx:parseInt(lx)+50,ly:parseInt(ly)+20,x:parseInt(x)-10,y:parseInt(y)+20,k:k2});
        lines.push({lx:parseInt(lx)+50,ly:parseInt(ly)+20,x:parseInt(x)-10,y:parseInt(y)+20,k1:k1,k2:k2});
      //  draws[k2].lineIn={lx:parseInt(lx)+50,ly:parseInt(ly)+20,x:parseInt(x)-10,y:parseInt(y)+20,k:k1}
        v.drawCicle(cont,type,t,parseInt(x),parseInt(y));
        v.drawLine(cont,parseInt(lx)+45,parseInt(ly)+20,parseInt(x)-5,parseInt(y)+20);
    }else{
        v.drawCicle(cont,type,t,parseInt(x),parseInt(y));
    }
}

function getp(event){
	var e=event||window.event;
		var scrollX=document.body.scrollLeft||document.documentElement.scrollLeft;
		var scrollY=document.body.scrollTop||document.documentElement.scrollTop;
		var x=e.clientX||e.clientX+scrollX;
		var y=e.clientY||e.clientY+scrollY;
		return {x:x,y:y};
}

function getPos(event){
		var e=event||window.event;
		var scrollX=document.body.scrollLeft||document.documentElement.scrollLeft;
		var scrollY=document.body.scrollTop||document.documentElement.scrollTop;
		var x=scrollX?e.clientX+scrollX:e.clientX;
		x=x-wid;
		//alert(scrollY+"scr");
		var y=scrollY?e.clientY+scrollY:e.clientY;
		y=y-hei;
		//alert(y);
		return {x:x,y:y};
}
/*画布点击 判断是移动图像还是划线*/
mycanvas.onmousedown=function(event){
	var event=event||window.event;
	//alert(hei+" w "+wid);
	//alert(draws[0].display.y);
	if(event.which==1){
		var pos=getPos(event);
		//alert(pos.y);
		var k=-1,x=0,y=0,lx=0,ly=0,flag=-1,key;
		for(var i=0;i<draws.length;i++){
			if(draws[i].type=="composite"||draws[i].type=="init"){
				//alert(pos.x>=draws[i].display.x&&pos.x<=draws[i].display.x+40&&pos.y>=draws[i].display.y&&pos.y<=draws[i].display.y+40);
				if(pos.x>=draws[i].display.x&&pos.x<=draws[i].display.x+40&&pos.y>=draws[i].display.y&&pos.y<=draws[i].display.y+40){
					
					k=i;
					//alert(k);
					x=draws[k].display.x;
					y=draws[k].display.y;
					break;
				}else if(pos.x>=draws[i].display.x-9&&pos.x<draws[i].display.x&&pos.y>=draws[i].display.y+14&&pos.y<=draws[i].display.y+26){
					flag=i;
					key="left";
					lx=draws[i].display.x-9;
					ly=draws[i].display.y+20;
					break;
				}else if(pos.x>draws[i].display.x+40&&pos.x<=draws[i].display.x+49&&pos.y>=draws[i].display.y+14&&pos.y<=draws[i].display.y+26){
					flag=i;
					key="right";
					lx=draws[i].display.x+49;
					ly=draws[i].display.y+20;
					break;
				}
			}else if(draws[i].type=="decorator"){
				if(pos.x>=draws[i].display.x-100&&pos.x<=draws[i].display.x+100&&pos.y>=draws[i].display.y-30&&pos.y<=draws[i].display.y+30){
					k=i;
					x=draws[k].display.x;
					y=draws[k].display.y;
					break;
				}else if(pos.x>=draws[i].display.x-109&&pos.x<draws[i].display.x-100&&pos.y>=draws[i].display.y-6&&pos.y<=draws[i].display.y+6){
					flag=i;
					key="left";
					lx=draws[i].display.x-109;
					ly=draws[i].display.y;
					break;
				}else if(pos.x>draws[i].display.x+100&&pos.x<=draws[i].display.x+109&&pos.y>=draws[i].display.y-6&&pos.y<=draws[i].display.y+6){
					flag=i;
					key="right";
					lx=draws[i].display.x+109;
					ly=draws[i].display.y;
					break;
				}
			}
		}
		mycanvas.onmousemove=function(event){
			var event=event||window.event;

			var poss=getPos(event);
				x=poss.x;
				y=poss.y;
				v.redraw();
				if(flag+1){
					v.drawLine(cont,lx,ly,x,y);
				}else if(k>=0){
					draws[k].display.x=x;
		        	draws[k].display.y=y;
		        	
		        	for(var j=0;j<lines.length;j++){
		        		if(lines[j].k2==k&&(draws[k].type=="composite"||draws[k].type=="init")){
		        			lines[j].x=draws[k].display.x-9;
		        			lines[j].y=draws[k].display.y+20;
		        		}else if(lines[j].k2==k&&(draws[k].type=="decorator")){
		        			lines[j].x=draws[k].display.x-109;
		        			lines[j].y=draws[k].display.y;
		        		}else if(lines[j].k1==k&&(draws[k].type=="composite"||draws[k].type=="init")){
		        			lines[j].lx=draws[k].display.x+49;
		        			lines[j].ly=draws[k].display.y+20;
		        		}else if(lines[j].k1==k&&(draws[k].type=="decorator")){
		        			lines[j].lx=draws[k].display.x+109;
		        			lines[j].ly=draws[k].display.y;
		        		}
		        	}
			}
		}
		mycanvas.onmouseup=function(event){
			mycanvas.onmousemove=null; //将move清除
			mycanvas.onmouseup=null;
			var event=event||window.event;
			var poss=getPos(event);
				x=poss.x;
				y=poss.y;
				var res=checkCate(x,y);
				var w=res.w;
				//alert(lx+"lx ly "+ly);
				if(w!=-1&&lx!=0&&ly!=0){
					v.redraw();
					var x=res.x;
					var y=res.y;
					if(draws[w].type=="composite"){
						v.drawLine(cont,lx,ly,draws[w].display.x-9,draws[w].display.y+20);
						lines.push({lx:lx,ly:ly,x:draws[w].display.x-9,y:draws[w].display.y+20,k1:flag,k2:w});

					}else{
						v.drawLine(cont,lx,ly,draws[w].display.x-109,draws[w].display.y);
						lines.push({lx:lx,ly:ly,x:draws[w].display.x-109,y:draws[w].display.y,k1:flag,k2:w});
					}
					if(flag>=-1)
						draws[flag].children.push(w);
					if(flag==0){
					draws[0].root=draws[w].id;
					}
				}else{	
					v.redraw();
				}
				
		}
	}else if(event.which==3){
		var event=event||window.event;
		var poss=getPos(event);
		x=poss.x;
		y=poss.y;
		var res=checkCate(x,y);
		var w=res.w;
		if(w!=-1){
			for(var i=0;i<lines.length;i++){
				if(lines[i].k1==w||lines[i].k2==w){
					lines.splice(i,1);
				}
			}
			draws.splice(w,1);
			v.redraw();
		}
	}
	
}
/*--------------------------*/
function checkCate(x,y){
	var w=-1;
	for(var i=0;i<draws.length;i++){
			if(draws[i].type=="composite"|| draws[i].type=="init"){
				if((x>=draws[i].display.x-9&&x<draws[i].display.x&&y>=draws[i].display.y+14&&y<=draws[i].display.y+26)||(x>=draws[i].display.x&&x<=draws[i].display.x+40&&y>=draws[i].display.y&&y<=draws[i].display.y+40)){
					x=draws[i].display.x-9;
					y=draws[i].display.y+20;
					w=i;
					break;
				}
			}else if(draws[i].type=="decorator"){
				if((x>=draws[i].display.x-109&&x<draws[i].display.x-100&&y>=draws[i].display.y-6&&y<=draws[i].display.y+6)||(x>=draws[i].display.x-100&&x<=draws[i].display.x+100&&y>=draws[i].display.y-30&&y<=draws[i].display.y+30)){
					x=draws[i].display.x-109;
					y=draws[i].display.y;
					w=i;
					break;
				}
			}
	}
	return {w:w,x:x,y:y}
}
