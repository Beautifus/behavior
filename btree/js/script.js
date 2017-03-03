var v=new view();
var leftcon=document.getElementById("left");

var con=document.createElement("div");
con.className="composite";
con.innerHTML="composite";
var conChild=document.createElement("ul"); 
conChild.className="comchild";
conChild.id="conul";
var checked;
conChild.innerHTML="<li>sequence</li><li>dom</li>";
con.appendChild(conChild);
var addcus=document.getElementById("addcus");
var rightcon=document.getElementById("right");
var src="";
var lineIn="lineIn",lineOut="lineOut";
var treejs={};
var e1=document.getElementById("exports");
var e2=document.getElementById("imports");
var headers=document.getElementsByClassName("header")[0];
var edite=document.getElementById("edit");
var editeFlag=1;
var body=document.getElementById("body");
var tips=document.getElementById("tips");
var myform=document.getElementById("myform");
var nodes={};
function registerNode(node){
	var b=node.prototype.name;
	nodes[b]=node;
	nodes[b].prototype.title=nodes[b].title;
	//||nodes[b].prototype.name;
}
registerNode(b3.Sequence);
registerNode(b3.Priority);
registerNode(b3.MemPriority);
registerNode(b3.Inverter);
registerNode(b3.Repeater);
var b3=this.b3;
(function(){
	var newdiv=document.createElement("div");//最外层
	newdiv.className="appends";
	newdiv.style.display="none";
	var newp=document.createElement("div");//第一层
	newp.innerHTML="Add Nodes";
	newp.style.textAlign="center";
	newp.style.height="30px";
	newp.style.lineHeight="30px";
	newdiv.appendChild(newp);

	var newdiv2=document.createElement("div");//第二层中
	newdiv2.className="adda";
	newdiv2.id="addnodes";

	var newli1=document.createElement("div");//第二层中的第一层
	newli1.style.width="100%";
	newli1.style.height="30px";
	newli1.style.marginBottom="10px";
	
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
	body.appendChild(newdiv);
	addcus.onclick=function(event){
		var event=event||window.srcElement;
		event.stopPropagation();
		var mydiv=document.getElementsByClassName("appends")[0];
		mydiv.style.display="block";
		var parent=mydiv.querySelectorAll("div")[1];
		var onenodes=document.getElementsByClassName("onenode");
		if(onenodes.length){
			for(var i=0;i<onenodes.length;i++){
				parent.removeChild(onenodes[i]);
			}
		}
		mydiv.style.display="block";
		addcho(event);

	}
})();
function addcho(event){
	var event=event||window.event;
	event.stopPropagation();
	var mydiv=document.getElementById("addnodes");
	var newdiv=document.createElement("div");
	newdiv.style.margin="0px auto 0px auto";
	newdiv.className="onenode";
	newdiv.innerHTML='<input class="addcho" type="text" placeholder="Node name"><input type="text" class="addcho" placeholder="Node title"><select class="addcho"><option value="Composite">Composite</option><option value="Decorator">Decorator</option><option value="Condition">Condition</option><option value="Action">Action</option></select><input type="button"  class="operator" style="background:#f0320b" onclick="operationAdd(event)" id="cancelnode" value="-">';
	mydiv.appendChild(newdiv);
}
function operationAdd(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			event.stopPropagation();
			if(target.value.trim()=="-"){
				var parentdiv=target.parentNode;
				parentdiv.parentNode.removeChild(parentdiv);
			}
}
function addCaclick(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			event.stopPropagation();
				var onenodes=document.getElementsByClassName("onenode");
				if(target.value=="add"){
					if(onenodes.length){
						for(var i=0;i<onenodes.length;i++){
							var name=onenodes[i].querySelectorAll("input")[0].value;
							if(name){
								var title=onenodes[i].querySelectorAll("input")[1].value;
								var category=onenodes[i].querySelector("select").value;
								var cates=document.getElementsByClassName("conul");
								var categ=category.toLowerCase();
								one:for(var j=0;j<cates.length;j++){
									if(cates[j].previousSibling.firstChild.innerHTML==categ){
										for(var k=0;k<cates[j].children.length;k++){
										//alert(cates[j].children[k].innerHTML+" "+name)
										if(cates[j].children[k].firstChild.innerHTML==name){
											alert("此节点已经存在");
											break one;
										}
									}
									var newli=document.createElement("li");
									newli.innerHTML="<label>"+name+'</label><input type="button" value="编辑"  class="editadd" onclick="editadd(event)">';
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
										//alert(title);
										b.title=title;
										b._BaseNode_initialize=b.initialize;
										b.initialize=function(a){
											this._BaseNode_initialize()
										},
										b3[name]=a;
									}();
								//alert(b3[name].title);
								registerNode(b3[name]);
								/*
								function registerNode(node){
									var b=node.prototype.name;
									nodes[b]=node;
									nodes[b].prototype.title=nodes[b].title||nodes[b].prototype.name;
								}

								*/
								
								break;
							}
						}
						}else{
							alert("请输入节点名字");
						}
					
					}
				}
					var parent=target.parentNode.parentNode;
					parent.style.display="none";
					//parentNode.removeChild(parent);//<div><div><div><input>  </div></div></div>
				}else if(target.value=="cancel"){
					
					var appends=document.getElementsByClassName("appends")[0];
					appends.style.display="none";
				}
}
(function(){
	var div=document.createElement("div");//最外层
	div.className="appends";
	div.style.display="none";
	div.id="reedit";
	var newp=document.createElement("div");//第一层
	newp.innerHTML="Add Nodes";
	newp.style.textAlign="center";
	newp.style.height="30px";
	newp.style.lineHeight="30px";
	div.appendChild(newp);

	var newdiv1=document.createElement("div");//第二层中
	newdiv1.className="adda";
	newdiv1.id="editnodes";
	newdiv1.style.height="40px";
	newdiv1.style.display="flex";
	newdiv1.style.justifyContent="space-around";
	newinput1=document.createElement("input");
	newinput1.type="text";
	newinput1.placeholder="Node name";
	newinput1.onkeyup=function(event){
		var event=event||window.event;
		var tar=event.target||window.srcElement;
		newinput1.value=tar.value;
	}
	newinput1.className="addnodes-input";
	newinput2=document.createElement("input");
	newinput2.type="text";
	newinput2.placeholder="Node title";
	newinput2.onkeyup=function(event){
		var event=event||window.event;
		var tar=event.target||window.srcElement;
		newinput2.value=tar.value;
	}
	newinput2.className="addnodes-input";
	newdiv1.appendChild(newinput1);
	newdiv1.appendChild(newinput2);

	div.appendChild(newdiv1);

	var newdiv2=document.createElement("div");//第二层中
	newdiv2.className="adda";
	newdiv2.id="recanadd";
	newdiv2.style.height="30px";
	var newip1=document.createElement("input");
	newip1.type="button";
	newip1.value="Remove";
	newip1.className="edit-remove";
	
	newdiv2.appendChild(newip1);

	var newip2=document.createElement("input");
	newip2.type="button";
	newip2.value="cancel";
	newip2.className="edit-cancel";
	newip2.onclick=function(event){
		var reedit=document.getElementById("reedit");
		reedit.style.display="none";
	}
	var newip3=document.createElement("input");
	newip3.type="button";
	newip3.value="sure";
	newip3.className="edit-add";
	
		
	newdiv2.appendChild(newip3);
	newdiv2.appendChild(newip2);

	div.appendChild(newdiv2)
	body.appendChild(div);
})();
function createEdit(name,parentli,parentul){
	//alert(name+"  ff");
	//alert(title);
	var title=nodes[name].title;
	var editnodes=document.getElementsByClassName("addnodes-input");
	editnodes[0].value=name;
	editnodes[1].value=title;
	var recanadd=document.getElementById("recanadd");
	var childrens=recanadd.children;
	//for(var i=0;i<children.length;i++){
		childrens[0].onclick=function(event){
			delete nodes[name];
			parentul.removeChild(parentli);
			var reedit=document.getElementById("reedit");
			reedit.style.display="none";
		}
		childrens[1].onclick=function(event){
				var editnodes=document.getElementsByClassName("addnodes-input");
				var va=editnodes[0].value;
				if(va==name){
					for(var key in nodes){
						if(nodes[key].prototype.name==name){
							nodes[key].prototype.title=editnodes[1].value;
						
							break;
						}

					}
				}else{
					for(var key in nodes){
						if(nodes[key].prototype.name==name){
							var kk=key;
							nodes[kk].prototype.name=va;
							nodes[kk].prototype.title=editnodes[1].value;
							nodes[va]=nodes[kk];
							delete nodes[kk];
							alert(nodes[va]);
							break;
						}

					}
				}
				
				parentli.firstChild.innerHTML=editnodes[0].value;
				var reedit=document.getElementById("reedit");

				reedit.style.display="none";
			}

	//}
	
}
function editadd(event){
	var event=event||window.event;
	var target=event.target||window.srcElement;
	event.stopPropagation();
	var name=target.previousSibling.innerHTML;
	var parentli=target.parentNode;//li
	var parentul=parentli.parentNode;//ul
	var reedit=document.getElementById("reedit");
	reedit.style.display="block";
	createEdit(name,parentli,parentul);
}


(function headerListen(){
	var headerFlag=[1,1,1,1,1];
	var navs=["查询","File","Edit","View","Selection"];
	var k=-1;
		document.onclick=function(event){
			var event=event||window.event;
			var target=event.target||event.srcElement;
			event.stopPropagation();
			//alert(k);	
			for(var i=0;i<navs.length;i++){
				if(target.innerHTML==navs[i]){
					
					k=i;
					var node=target.parentNode.parentNode.children;
					for(var j=1;j<node.length;j++){
						if(j!=k){
							headerFlag[j]=headerFlag[j]?headerFlag[j]:!headerFlag[j];
						}
					
						if(node[j].getElementsByTagName("ul")[0].style.display){
							node[j].getElementsByTagName("ul")[0].style.display="none";
						}
					
					}
					//alert(headerFlag[k]);
					if(headerFlag[k]){
						//alert(target.nextSibling);
						target.nextSibling.style.display="block";
						headerFlag[k]=!headerFlag[k];

					}else if(!headerFlag[k]){
						//alert("fa");
						target.nextSibling.style.display="none";
						headerFlag[k]=!headerFlag[k];
					}	
				}
			}
			if(k==-1){
				var node=headers.children;
				for(var j=1;j<node.length;j++){
					headerFlag[j]=headerFlag[j]?headerFlag[j]:!headerFlag[j];			
					if(node[j].getElementsByTagName("ul")[0]&&node[j].getElementsByTagName("ul")[0].style.display){
						node[j].getElementsByTagName("ul")[0].style.display="none";
					}			
				}
			}
			k=-1;
		}

})();
inits();
	var cate=["composite","decorator","condition","action"];
for(var i=0;i<cate.length;i++){
	var newlis=document.createElement("li");
	newlis.className="category";
	var newdiv=document.createElement("div");
	newdiv.className="cate";

	newdiv.innerHTML="<b>"+cate[i]+"</b>";

	var newul=createCategory(cate[i]);
	for(var j=0;j<newul.children.length;j++){
	//	alert(newul.children[j].innerHTML);
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
			str+='<li id="'+k+'"><label>'+k+'</label></li>';
		}
	}
	newul.innerHTML=str;
	return newul;
}

function clickListen(a){
	a.onmousedown=function(event){
		var e=event||window.event;

		var targetEle=e.target||e.srcElement;
		event.stopPropagation();
		var parent=targetEle.parentNode;
		var inhtml=parent.parentNode.previousSibling.firstChild.innerHTML;
		var src=targetEle.innerHTML||targetEle.parentNode.firstChild.innerHTML;
		//alert(src);
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
		 draws.push({id:id,display:{x:posx,y:posy},src:src,type:type,childs:[],title:nodes[src].prototype.title,description:"",Parameters:[],Properties:[]});
        checked=draws.length-1;
            d.redraw(checked);
            var len=draws.length-1;
            
		document.onmousemove=function(event){
			var e=event||window.event;
			var po=getPos(event);
			 posx=po.x;
			 posy=po.y;
			 draws[len].display.x=posx;
			 draws[len].display.y=posy;
			 d.redraw(checked);
		}
		document.onmouseup=function(ev){
			  tips.style.display="none";
         myform.style.display="block";
          myform["title"].value=nodes[src].prototype.title;
          myform["description"].value=nodes[src].prototype.description;
          
          parametersTable.innerHTML="";
          propertiesTable.innerHTML="";

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
	draws.push({title:"btree",display:{x:300,y:200},src:"init",type:"init",root:"",description:"",childs:[],Parameters:[],Properties:[]});
}
function titleChange(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	draws[checked].title=target.value;
}
e1.onclick=function(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	target.parentNode.parentNode.style.display=null;
	event.stopPropagation();
	var dat={
			"type":"init",
			"title":draws[0].title,
			"root":draws[0].root,
			"description":draws[0].description,
			"Properties":draws[0].Properties,
			"Parameters":draws[0].Parameters,
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
		newdivs.className="exsure";
		newinput1=document.createElement("input");
		newinput1.type="button";
		newinput1.value="确定";
		newinput1.onclick=function(event){
			var event=event||window.event;
			event.stopPropagation();
			target=event.target||event.srcElement;
			target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		}

		newdivs.appendChild(newinput1);
		newdiv.appendChild(newdivs);

		body.appendChild(newdiv);
		
}
function exportJSON(dat,node){
	var childrens=[];
	var id=node.id;

	for(var i=0;i<node.childs.length;i++){
		var child=exportJSON(dat,draws[node.childs[i]]);
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
			"childs":childrens,
			"title":node.title,
			"description":node.description,
			"Parameters":node.Parameters,
			"Properties":node.Properties
		};
}
e2.onclick=function(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	event.stopPropagation();
	target.parentNode.parentNode.style.display=null;
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
		var dat;


		newinput1.onclick=function(eve){
			var eve=eve||window.event;
			tart=eve.target||eve.srcElement;
			eve.stopPropagation();
			tart.parentNode.parentNode.parentNode.removeChild(tart.parentNode.parentNode);
			//var str='"'+tart.parentNode.previousSibling.innerHTML+'"';
			 dat=JSON.parse(tart.parentNode.previousSibling.innerText);
			 var data=dat;
			importJSON(data,dat,0,0,0,dat["display"].x,dat["display"].y);
		}
		newdivs.appendChild(newinput1);
		newdiv.appendChild(newdivs);
		body.appendChild(newdiv);		
}
function importJSON(data,dat,k1,lx,ly,x,y){
    imjs(dat,k1,lx,ly,x,y);
    var childrens=[];
    var id=dat.id;
    var len=draws.length-1;
    if(dat["childs"]){
    	 for(var i=0;i<dat["childs"].length;i++){
    	 	var idd=dat["childs"][i];
    	 	var node=data.node[idd];
        	var child=importJSON(data,node,len,dat["display"].x,dat["display"].y,node["display"].x,node["display"].y);
        	childrens.push(child.id);
        }
        return {id:id,"type":dat["type"],display:{"x":dat["display"].x,"y":dat["display"].y},"childs":childrens};
    }else if(dat["root"]){
    	var idt=dat["root"];
    	var n=dat.node[idt];
    	var nx=importJSON(data,n,len,dat["display"].x,dat["display"].y,n["display"].x,n.display.y);
    	var nll={title:dat["title"],description:dat["description"],root:idt,"type":dat["type"],display:{"x":dat.display.x,"y":dat.display.y,"node":{}}};
    	nll["node"]=nx;
    	return nll;

   
}
}
function imjs(data,k1,lx,ly,x,y){
    var t=data["src"];
    var type=data["type"];
    var id=data["id"];

    if(id){
    	draws.push({id:id,display:{x:parseInt(x),y:parseInt(y)},title:data["title"],src:t,type:type,title:data.title,description:data.description,childs:data.childs,Parameters:data.Parameters,Properties:data.Properties});
    }else{
    	draws.push({title:data.title,src:t,type:type,root:data["root"],display:{x:x,y:y},description:data.description,childs:data.childs,Parameters:data.Parameters,Properties:data.Properties});
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
function getPos(event){
		var e=event||window.event;
		var scrollX=document.body.scrollLeft||document.documentElement.scrollLeft;
		var scrollY=document.body.scrollTop||document.documentElement.scrollTop;
		var x=scrollX?e.clientX+scrollX:e.clientX;
		x=x-wid;
		//alert(scrollY+"scr");
		var y=scrollY?e.clientY+scrollY:e.clientY;
		y=y-hei;
		return {x:x,y:y};
}
function addParameter(type,target,key,value){
	//target.innerHTML="";
	var div=document.createElement("div");
	div.className="addpara";
    var newkey=document.createElement("input");
    newkey.placeholder="key";
    if(key){
    	newkey.value=key;
    }else{
    	newkey.value="";
    }
    newkey.className="key";
    
    var newvalue=document.createElement("input");
     if(value){
    	newvalue.value=value;
    }else{
    	newvalue.value="";
    } 
    newvalue.className="value";
    newvalue.placeholder="value";
    newkey.onchange=function(eve){
    	var eve=eve||window.event;
		var target=eve.target||eve.srcElement;
		newkey.value=target.value;
			
    }
   newvalue.onchange=function(eve){
    		var eve=eve||window.event;
			var targ=eve.target||eve.srcElement;
			newvalue.value=targ.value;
			switch(type){
				case "Parameters":
					draws[checked]["Parameters"].push({key:newkey.value,value:newvalue.value});
					//alert(checked+" "+draws[checked]["Parameters"].length);
					break;
				case "Properties":
					draws[checked]["Properties"].push({key:newkey.value,value:newvalue.value});
					break;
			}
   	 	}
    var newoper=document.createElement("input");
    newoper.className="operator";
    newoper.value="-";
    newoper.onclick=function(event){
		var event=event||window.event;
		var target=event.target||event.srcElement;
		event.stopPropagation();
		var parent=target.parentNode;
		parent.parentNode.removeChild(parent);
		switch(type){
			case "Parameters":
			//alert(draws[checked]["Parameters"].length);
			//alert(draws[checked]["Parameters"][0].key+"  "+draws[checked]["Parameters"][0].value)
				for(var p=0;p<draws[checked]["Parameters"].length;p++){
						if(draws[checked]["Parameters"][p].key==newkey.value&&draws[checked]["Parameters"][p].value==newvalue.value){
							draws[checked]["Parameters"].splice(p,1);
							//alert(draws[checked]["Parameters"].length)
							//draws[checked]["Parameters"].length
							//break;
						}
				}
				break;
			case "Properties":
					for(var p=0;p<draws[checked]["Properties"].length;p++){
						if(draws[checked]["Properties"][p].key==newkey.value&&draws[checked]["Properties"][p].value==newvalue.value){
							draws[checked]["Properties"].splice(p,1);
							break;
						}
				}
					break;
			}
			
	}
    div.appendChild(newkey);
    div.appendChild(newvalue);
    div.appendChild(newoper);
    //parametersTable.appendChild(div);
   target.appendChild(div);
}
function descriptionChange(event){
	var event=event||window.event;
	var target=event.target||event.srcElement;
	draws[checked].description=target.value;
}
/*画布点击 判断是移动图像还是划线*/
mycanvas.onmousedown=function(event){
	var event=event||window.event;
	if(event.which==1){
		var pos=getPos(event);
		//alert(pos.y);
		var k=-1,x=0,y=0,lx=0,ly=0,flag=-1,key;
		for(var i=0;i<draws.length;i++){
			if(draws[i].type=="composite"||draws[i].type=="init"){
				if(pos.x>=draws[i].display.x&&pos.x<=parseInt(draws[i].display.x)+40&&pos.y>=draws[i].display.y&&pos.y<=parseInt(draws[i].display.y)+40){
					
					k=i;
					x=draws[k].display.x;
					y=draws[k].display.y;
          			
					break;
				}else if(pos.x>=draws[i].display.x-9&&pos.x<draws[i].display.x&&pos.y>=parseInt(draws[i].display.y)+14&&pos.y<=parseInt(draws[i].display.y)+26){
					flag=i;
					key="left";
					lx=draws[i].display.x-9;
					ly=parseInt(draws[i].display.y)+20;
					break;
				}else if(pos.x>parseInt(draws[i].display.x)+40&&pos.x<=parseInt(draws[i].display.x)+49&&pos.y>=parseInt(draws[i].display.y)+14&&pos.y<=parseInt(draws[i].display.y)+26){
					flag=i;
					key="right";
					lx=parseInt(draws[i].display.x)+49;
					ly=parseInt(draws[i].display.y)+20;
					break;
				}
			}else if(draws[i].type=="condition"||draws[i].type=="action"){
				if(pos.x>=draws[i].display.x&&pos.x<=parseInt(draws[i].display.x)+140&&pos.y>=draws[i].display.y&&pos.y<=parseInt(draws[i].display.y)+40){
					
					k=i;
					x=draws[k].display.x;
					y=draws[k].display.y;
          			
					break;
				}else if(pos.x>=draws[i].display.x-9&&pos.x<draws[i].display.x&&pos.y>=parseInt(draws[i].display.y)+14&&pos.y<=parseInt(draws[i].display.y)+26){
					flag=i;
					key="left";
					lx=draws[i].display.x-9;
					ly=parseInt(draws[i].display.y)+20;
					break;
				}else if(pos.x>parseInt(draws[i].display.x)+140&&pos.x<=parseInt(draws[i].display.x)+149&&pos.y>=parseInt(draws[i].display.y)+14&&pos.y<=parseInt(draws[i].display.y)+26){
					flag=i;
					key="right";
					lx=parseInt(draws[i].display.x)+149;
					ly=parseInt(draws[i].display.y)+20;
					break;
				}

			}else if(draws[i].type=="decorator"){
				if(pos.x>=draws[i].display.x-100&&pos.x<=parseInt(draws[i].display.x)+100&&pos.y>=draws[i].display.y-30&&pos.y<=parseInt(draws[i].display.y)+30){
					k=i;
					x=draws[k].display.x;
					y=draws[k].display.y;
					break;
				}else if(pos.x>=draws[i].display.x-109&&pos.x<draws[i].display.x-100&&pos.y>=draws[i].display.y-6&&pos.y<=parseInt(draws[i].display.y)+6){
					flag=i;
					key="left";
					lx=draws[i].display.x-109;
					ly=draws[i].display.y;
					break;
				}else if(pos.x>parseInt(draws[i].display.x)+100&&pos.x<=parseInt(draws[i].display.x)+109&&pos.y>=draws[i].display.y-6&&pos.y<=parseInt(draws[i].display.y)+6){
					flag=i;
					key="right";
					lx=parseInt(draws[i].display.x)+109;
					ly=draws[i].display.y;
					break;
				}
			}
		}
			if(k+1){
				checked=k;
          		tips.style.display="none";
				myform.style.display="block";
				myform["title"].value=draws[checked].title;
       			myform["description"].value=draws[checked].description;
       			var parameter=draws[checked]["Parameters"];
       			parametersTable.innerHTML="";
       			propertiesTable.innerHTML="";
       			if(parameter.length){
       				for(var m=0;m<parameter.length;m++){
       					addParameter("Parameters",parametersTable,parameter[m].key,parameter[m].value);
          			}
          		}else{
          			parametersTable.innerHTML="";	
          		}
          		var properties=draws[checked]["Properties"];
          		if(properties.length){
         			for(var j=0;j<properties.length;j++){
          				addParameter("Properties",propertiesTable,properties[j].key,properties[j].value);
          			}
          		}else{
         			propertiesTable.innerHTML="";
          		}
			}else{
				tips.style.display="block";
				myform.style.display="none";
				checked=-1;
			}
				
		mycanvas.onmousemove=function(event){
			var event=event||window.event;
			var poss=getPos(event);
				x=poss.x;
				y=poss.y;
				v.redraw(checked);
				if(flag+1){
					v.drawLine(cont,lx,ly,x,y);
				}else if(k>=0){
					draws[k].display.x=x;
		        	draws[k].display.y=y;
		        	for(var j=0;j<lines.length;j++){
		        		if(lines[j].k2==k&&(draws[k].type=="composite"||draws[k].type=="condition"||draws[k].type=="action"||draws[k].type=="init")){
		        			lines[j].x=draws[k].display.x-9;
		        			lines[j].y=parseInt(draws[k].display.y)+20;
		        		}else if(lines[j].k2==k&&(draws[k].type=="decorator")){
		        			lines[j].x=draws[k].display.x-109;
		        			lines[j].y=draws[k].display.y;
		        		}else if(lines[j].k1==k&&(draws[k].type=="composite"||draws[k].type=="init")){
		        			lines[j].lx=parseInt(draws[k].display.x)+49;
		        			lines[j].ly=parseInt(draws[k].display.y)+20;
		        		}else if(lines[j].k1==k&&(draws[k].type=="decorator")){
		        			lines[j].lx=parseInt(draws[k].display.x)+109;
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
				if(w!=-1&&lx!=0&&ly!=0&& w!=flag){
					checked=-1;
					v.redraw(checked);
					var x=res.x;
					var y=res.y;
					//alert(""+x+" x y "+y);
					//alert(draws[w].display.x-9+" "+(parseInt(draws[w].display.y)+20))
					if(draws[w].type=="composite"||draws[w].type=="condition"||draws[w].type=="action"){
						//alert(draws[w].display.x-9+" "+(parseInt(draws[w].display.y)+20))
						v.drawLine(cont,lx,ly,draws[w].display.x-9,parseInt(draws[w].display.y)+20);
						lines.push({lx:lx,ly:ly,x:draws[w].display.x-9,y:parseInt(draws[w].display.y)+20,k1:flag,k2:w});
					}else{
						v.drawLine(cont,lx,ly,draws[w].display.x-109,draws[w].display.y);
						lines.push({lx:lx,ly:ly,x:draws[w].display.x-109,y:draws[w].display.y,k1:flag,k2:w});
					}
					if(flag>=-1){
						//alert(flag+" "+w);
						draws[flag].childs.push(w);
						if(flag==0){
							//alert("true");
						draws[0].root=draws[w].id;
						}
					}
				}else{	
					
					v.redraw(checked);
				}
				
		}

	}else if(event.which==3){
		//alert(draws[1].childs.length);
		var event=event||window.event;
		var poss=getPos(event);
		x=poss.x;
		y=poss.y;
		var res=checkCate(x,y);
		var w=res.w;
		var n=lines.length
		if(w!=-1){
			for(var i=0;i<n;i++){
				//alert(lines[i].k1+" "+lines[i].k2);
				if(lines[i].k1==w||lines[i].k2==w){
					lines.splice(i,1);
					i-=1;
					n-=1;
				}
			}
			draws.splice(w,1);
			v.redraw(checked);
		}
	}
	
}
/*--------------------------*/
function checkCate(x,y){
	var w=-1;
	for(var i=0;i<draws.length;i++){
			draws[i].display.x=parseInt(draws[i].display.x);
			draws[i].display.y=parseInt(draws[i].display.y);
			if(draws[i].type=="composite"||draws[i].type=="init"){
				
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
			}else if(draws[i].type=="condition"||draws[i].type=="action"){
				
				if((x>=draws[i].display.x-9&&x<draws[i].display.x&&y>=draws[i].display.y+14&&y<=draws[i].display.y+26)||(x>=draws[i].display.x&&x<=draws[i].display.x+140&&y>=draws[i].display.y&&y<=draws[i].display.y+40)){
					x=draws[i].display.x-9;
					y=draws[i].display.y+20;
					w=i;
					break;
				}
			}
	}
	return {w:w,x:x,y:y}
}
