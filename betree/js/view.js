//this.view=this.view || {},
function view(){
}

view.prototype.redraw=function(x,y,w,z){
	cont.clearRect(0,0,mycanvas.width,mycanvas.height);
			for(var i=0;i<draws.length;i++){
				var poss=draws[i];
				v.drawCicle(cont,poss.type,poss.src,poss.display.x,poss.display.y);
			} 
			for(var i=0;i<draws.length;i++){
				var ps=draws[i];
				//alert(ps[lineIn].length);
				if(ps.lineIn){
					v.drawLine(cont,ps.lineIn.lx,ps.lineIn.ly,ps.lineIn.x,ps.lineIn.y);
				}
				if(ps.lineOut.length){
					for(var j=0;j<ps.lineOut.length;j++){
						var pp=ps.lineOut[j];
						v.drawLine(cont,pp.lx,pp.ly,pp.x,pp.y);
					}
					
				}
			}
		
	//alert(draws.length);
}
view.prototype.drawCicle=function(v,src,type,x,y){
	if(src!="init"){
		v.fillStyle="white";
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,15);
		v.arcTo(x+40,y+40,x,y+40,15);
		v.arcTo(x,y+40,x,y,15);
		v.arcTo(x,y,x+40,y,15);
		v.fill();
		v.closePath();
		//this.drawPic(v,x,y);
		this.drawleft(v,x,y);
		this.drawRight(v,x,y);
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
		v.fillStyle="white";
		v.beginPath();
		v.moveTo(x+10,y);
		v.arcTo(x+40,y,x+40,y+40,10);
		v.arcTo(x+40,y+40,x,y+40,10);
		v.arcTo(x,y+40,x,y,10);
		v.arcTo(x,y,x+40,y,10);
		v.fill();
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
		this.drawRight(v,x,y);
	}
		
		return this;
	}
	view.prototype.drawComposite=function(v,type,x,y){
		//alert(type);
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
		/*v.beginPath();
		v.strokeStyle="red";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();*/
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
	view.prototype.drawDecorator=function(v,x,y){
		v.beginPath();
		v.strokeStyle="black";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawCondition=function(v,x,y){
		v.beginPath();
		v.strokeStyle="blue";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawCondition=function(v,x,y){
		v.beginPath();
		v.strokeStyle="green";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawAction=function(v,x,y){
		v.beginPath();
		v.strokeStyle="green";
		v.lineTo(x+4,y+19);
		v.lineTo(x+35,y+19);
		v.stroke();
		v.closePath();
	}
	view.prototype.drawleft=function(v,x,y){
		v.fillStyle="white";
		v.beginPath();
		v.arc(x-5,y+20,10,Math.PI/180*300,Math.PI/180*60,true);
		v.fill();
		v.closePath();
	}
	view.prototype.drawRight=function(v,x,y){
		v.fillStyle="white";
		v.beginPath();
		v.arc(x+45,y+20,10,Math.PI/180*240,Math.PI/180*160,false);
		v.fill();
		v.closePath();
	}
	view.prototype.drawLine=function(v,x,y,w,z){
		//alert("ha");
		v.strokeStyle="blue";
		v.beginPath();
		v.moveTo(x,y);
		v.lineTo(w,z);
		v.stroke();
		v.closePath();
	}
var v=new view();
var wid=document.getElementById("content").offsetLeft;
var hei=document.getElementById("content").offsetTop;
var contents=document.getElementById("content");


