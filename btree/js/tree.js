var storage=window.localStorage;
var data={
	
};
//changedata(0);
function changedata(a){
	if(a==0&&storage.data){
		data=JSON.parse(storage.data);
	}else if(a==1){
		storage.data=JSON.stringify(data);
	}else if(a==0 && !storage.data){
		storage.data=JSON.stringify(data);
	}
}
