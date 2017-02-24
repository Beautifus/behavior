//this.view=this.view || {},
function view(){
}

view.prototype.redraw=function(checked,x,y,w,z){
		cont.clearRect(0,0,mycanvas.width,mycanvas.height);
			for(var i=0;i<draws.length;i++){
				var poss=draws[i];
				if(checked==i){
					v.fdrawCicle(cont,poss.type,poss.src,poss.display.x,poss.display.y);
				}else{
					v.drawCicle(cont,poss.type,poss.src,poss.display.x,poss.display.y);
				}
				
			} 
			for(var j=0;j<lines.length;j++){
				draws[lines[j].k1].childs=[];
			}
			for(var j=0;j<lines.length;j++){
				//alert(j)
				v.drawLine(cont,lines[j].lx,lines[j].ly,lines[j].x,lines[j].y);
				draws[lines[j].k1].childs.push(lines[j].k2);
			}
		
	//alert(draws.length);
}
view.prototype.fdrawCicle=function(v,src,type,x,y){
	v.shadowBlur=4;
	v.shadowColor="#00ccff";
	if(src!="init"){
		//alert(src);
		//this.drawPic(v,x,y);
		switch(src){
			case "composite":
				this.drawComposite(v,type,x,y);
				break;
			case "decorator":
				this.drawDecorator(v,type,x,y);
				break;
			case "condition":
				this.drawCondition(v,type,x,y);
				break;
			case "action":
				this.drawAction(v,type,x,y);
				break;
		}
	}else{
		this.drawRight(v,x,y,40,6,20,2);
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.stroke();
		v.closePath();
		v.beginPath();
		v.strokeStyle="black";
		v.lineWidth=3;
		v.moveTo(x+30,y+20);
		v.arc(x+20,y+20,10,0,2*Math.PI,true);
		v.moveTo(x+30,y+10);
		v.lineTo(x+10,y+30);
		v.stroke();
		v.closePath();
		
	}
		
		return this;
	}
view.prototype.drawCicle=function(v,src,type,x,y){
	v.shadowBlur=0;
	//v.shadowColor="blue";
	if(src!="init"){
		//alert(src);
		//this.drawPic(v,x,y);
		switch(src){
			case "composite":
				this.drawComposite(v,type,x,y);
				break;
			case "decorator":
				this.drawDecorator(v,type,x,y);
				break;
			case "condition":
				this.drawCondition(v,type,x,y);
				break;
			case "action":
				this.drawAction(v,type,x,y);
				break;
		}
	}else{
		this.drawRight(v,x,y,40,6,20,2);
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.stroke();
		v.closePath();
		v.beginPath();
		v.strokeStyle="black";
		v.lineWidth=3;
		v.moveTo(x+30,y+20);
		v.arc(x+20,y+20,10,0,2*Math.PI,true);
		v.moveTo(x+30,y+10);
		v.lineTo(x+10,y+30);
		v.stroke();
		v.closePath();
		
	}
		
		return this;
	}
	view.prototype.drawComposite=function(v,type,x,y){
		//alert(type);
		this.drawleft(v,x,y,6,20,2);
		this.drawRight(v,x,y,40,6,20,2);
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.stroke();
		v.closePath();
		switch(type){
			case "sequence":
				this.drawSequence(v,x,y);
				break;
			case "Priority":
				this.drawPriority(v,x,y);
				break;
			case "MemPriority":
				this.drawMemPriority(v,x,y);
				break;
		}
	}
	view.prototype.drawSequence=function(v,x,y){
		v.beginPath();
		v.lineWidth=2;
		v.strokeStyle="black";
		v.fillStyle="black";
		v.moveTo(x+5,y+20);
		v.lineTo(x+35,y+20);
		v.lineTo(x+27,y+15);
		v.lineTo(x+27,y+25);
		v.lineTo(x+35,y+20);
		v.fill();
		v.stroke();
		v.closePath();
	}
	view.prototype.drawMemPriority=function(v,x,y){
		v.beginPath();
		v.lineWidth=2;
		v.strokeStyle="black";
		v.moveTo(x+20,y+15);
		v.arc(x+15,y+15,5,0,Math.PI,true);
		v.moveTo(x+20,y+15);
		v.arc(x+15,y+15,5,0,1/2*Math.PI,false);
		v.moveTo(x+15,y+20);
		v.lineTo(x+15,y+25);
		v.moveTo(x+15,y+28);
		v.arc(x+15,y+30,2,0,2*Math.PI,true);
		//v.moveTo(x+30,y+20);
		
		//v.lineTo(x+)
		v.stroke();
		v.closePath();
	}
	view.prototype.drawPriority=function(v,x,y){
		v.beginPath();
		v.lineWidth=2;
		v.strokeStyle="black";
		v.moveTo(x+25,y+15);
		v.arc(x+20,y+15,5,0,Math.PI,true);
		v.moveTo(x+25,y+15);
		v.arc(x+20,y+15,5,0,1/2*Math.PI,false);
		v.moveTo(x+20,y+20);
		v.lineTo(x+20,y+25);
		v.moveTo(x+20,y+28);
		v.arc(x+20,y+30,2,0,2*Math.PI,true);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawDecorator=function(v,type,x,y){
//n,m,p,
		
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.font="18px Arial";
		v.beginPath();
		v.moveTo(x-100,y);
		v.lineTo(x,y-30);
		v.lineTo(x+103,y);
		v.lineTo(x,y+30);
		v.lineTo(x-100,y);
		v.stroke();
		v.fill();
		v.stroke();
		v.closePath();
		v.beginPath();
		v.strokeStyle="black";
		v.fillStyle="black";
		//v.fill();
		v.fillText(type,x-50,y+5);
		v.fill();
		v.stroke();
		v.closePath();
		this.drawleft(v,x-100,y,6,0,2);
		this.drawRight(v,x,y,100,6,0,2);

	}
	view.prototype.drawCondition=function(v,type,x,y){
		//alert(type);
		this.drawleft(v,x,y,6,20,2);
		this.drawRight(v,x,y,40,6,20,2);
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.stroke();
		v.closePath();
	}

	view.prototype.drawAction=function(v,type,x,y){
		//alert(type);
		this.drawleft(v,x,y,6,20,2);
		this.drawRight(v,x,y,40,6,20,2);
		v.fillStyle="white";
		v.strokeStyle="#787372";
		v.lineWidth=2;
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.stroke();
		v.closePath();
	}
	view.prototype.drawleft=function(v,x,y,n,m,p){
		v.fillStyle="white";
		v.strokeStyle="#787372";//n=6,m=20,p=2
		v.beginPath();
		v.arc(x-n/2,y+m,n,Math.PI/180*300,Math.PI/180*60,true);
		v.fill();
		v.stroke();
		v.closePath();
		v.beginPath();
		v.fillStyle="silver";
		v.moveTo(x-(n/2-p),y+m);
		v.arc(x-n/2,y+m,p,0,Math.PI*2,true);
		v.fill();
		v.closePath();
	},
	view.prototype.drawRight=function(v,x,y,q,n,m,p){
		v.fillStyle="white";//q=40,n=6,m=20,p=2
		v.strokeStyle="#787372";
		v.beginPath();
		v.arc(x+q+n/2,y+m,n,Math.PI/180*240,Math.PI/180*160,false);
		v.fill();
		v.stroke();
		v.closePath();
		v.beginPath();
		v.fillStyle="silver";
		v.moveTo(x+q+n/2+p,y+m);
		v.arc(x+q+n/2,y+m,p,0,Math.PI*2,true);
		v.fill();
		v.closePath();
	}
	view.prototype.drawLine=function(v,x,y,w,z){
		//alert("ha");
		v.strokeStyle="#787372";
		v.beginPath();
		v.moveTo(x,y);
		v.lineTo(w,z);
		v.stroke();
		v.closePath();
		v.beginPath();
		v.fillStyle="#787372";
		v.lineTo(w-7,z-5);
		v.lineTo(w-7,z+5);
		v.lineTo(w,z);
		v.fill();
		v.closePath();
	}
var v=new view();
//var wid=document.getElementById("content").offsetLeft;
//var hei=document.getElementById("content").offsetTop;
//alert(document.getElementById("di").offsetTop);
//alert(hei);
//alert(wid+" "+hei);
var bbox=mycanvas.getBoundingClientRect();
//alert(bbox.left+" "+bbox.top);
var wid=bbox.left;
var hei=bbox.top;
var contents=document.getElementById("content");


