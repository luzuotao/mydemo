//定义全局变量
var check = {
	'username':{
		preg:/^[\w]{8,20}$/i,
		empty:'用户名不能为空11',
		error:'用户名长度不适',
	},
	'password':{
		preg:/^[\w]{6,20}$/i,
		empty:'密码不能为空',
		error:'密码格式错误',
	},
	'compass':{
		empty:'密码不能为空',
		error:'两次密码不一致',
	},
	'email':{
		preg:/^[a-z0-9\.]+@[a-z0-9]+\.[a-z]+$/,
		empty:'邮箱不能为空',
		error:'邮箱格式错误',
	},
	'reallyName':{
		preg: /^[0-9\u4e00-\u9faf]{2,4}$/,
		empty:'请填写你的名字',
		error:'请填写真实姓名',
	},
	'phone':{
		preg:/^1[3|5|6|8|9][0-9]\d{8}$/,
		empty:'号码不能为空',
		error:'号码不正确',
	},
	'code':{
		empty:'验证码不能为空',
		error:'验证码错误',
	}
	
}
var oInput = document.getElementsByTagName("input");
var oBtn = document.getElementById("btn");
var reg = document.getElementById("register");
var oPassword = document.getElementById("password");
var oCode = document.getElementById("codestr");
var code = "";

//遍历input节点
for(var i=0;i<oInput.length;i++){
	//遍历初始化status 控制表单提交状态
	oInput[i].status = false;
	//当表单获得焦点的时候验证表单的值
	oInput[i].onfocus = function(){
		if(this.parentNode.lastChild.nodeType == 1&& this.parentNode.lastChild.nodeName == "SPAN"){
			this.parentNode.removeChild(this.parentNode.lastChild);
		}
	}
	//当表单失去焦点的时候验证表单的值
	oInput[i].onblur = function(){
		//共享定义域
		checkForm.call(this);
	}
}

//表填提交验证
reg.onsubmit = function(){
	for(var i=0;i<oInput.length-1;i++){
		//根据初始化的值，如果还是false 的话证明还存在错误数据，禁止提交
		if(oInput[i].status == false){
			return false;
		}
	}
}

//控制密码安全的状态程度,展示安全级别
oPassword.onkeyup = function showSecClass(){
	var val = oPassword.value;
	var lows = document.getElementsByClassName("low")[0];
	var mids = document.getElementsByClassName("mid")[0];
	var heis = document.getElementsByClassName("hei")[0];
	//判断只存在一种情况
	if( val.match(/[\d]/g) ||val.match(/[a-zA-z]/g) || val.match(/[^0-9a-zA-Z]/g)){	
		lows.style.opacity=1;
	}else{
		lows.style.opacity=0.1;
	}
	//判断两种情况
	if( val.match(/[\d]/g)&&val.match(/[a-zA-z]/g)||val.match(/[\d]/g)&&val.match(/[^0-9a-zA-Z]/g) ||val.match(/[a-zA-z]/g)&&val.match(/[^0-9a-zA-Z]/g) ){
		mids.style.opacity=1;
	}else{
		mids.style.opacity=0.1;
	}
	//判断三种情况
	if(val.match(/[\d]/g)&& val.match(/[a-zA-z]/g) && val.match(/[^0-9a-zA-Z]/g)){
		heis.style.opacity=1;
	}else{
		heis.style.opacity=0.1;
	}
}
//验证表单元素
function checkForm(){
	//判断表单框的内容是否为空
	if(this.value == ""){
		showEmpty.call(this,check[this.name]['empty']);
		return false;
	}
	if(this.name == "compass"){
		//判断两次密码是否一致
		if(this.value != oPassword.value){
			showError.call(this,check[this.name]["error"]);
			return false;
		}
		//正则表达判断
	}else if(this.name == "code"){
		if(this.value.toLowerCase() != code.toLowerCase()){
			showError.call(this,check[this.name]["error"]);
			return false;
		}
	}else{
		//正则判断
		var preg = check[this.name]["preg"];
		if(!preg.test(this.value)){
			showError.call(this,check[this.name]["error"]);
			return false;
		}
	}
	showSuccess.call(this);
	return this.status = true;
	
}


//将信息显示在input隔壁
function showEmpty(msg){
	//创建一个span 标签
	var oSpan = document.createElement("span");
	//创建文本节点
	var oText = document.createTextNode(msg);
	//创建一个i标签
	var oI = document.createElement("i");
	oI.innerHTML = "&#xe649;";
	oI.className = " iconfont "
	oSpan.appendChild(oI);
	oSpan.appendChild(oText);
	oSpan.className = "empty";
	this.parentNode.appendChild(oSpan);
}
function showError(msg){
	//创建一个span 标签
	var oSpan = document.createElement("span");
	//创建文本节点
	var oText = document.createTextNode(msg);
	//创建一个i标签
	var oI = document.createElement("i");
	oI.innerHTML = "&#xe6ed;";
	oI.className = " iconfont "
	oSpan.appendChild(oI);
	oSpan.appendChild(oText);
	oSpan.className = "error";
	this.parentNode.appendChild(oSpan);
}

function showSuccess(msg){
	//创建一个span 标签
	var oSpan = document.createElement("span");
	//创建一个i标签
	var oI = document.createElement("i");
	oI.innerHTML = "&#xe6a7;";
	oI.className = " iconfont "
	oSpan.appendChild(oI);
	oSpan.className = "success";
	this.parentNode.appendChild(oSpan);
}
//验证码
function createCode(){
	code = "";
	var str = "ABDEFGHJLMNQRTYabdefghjlmnqrty123456789";
	for(var i=0;i<=3;i++){
		code += str[parseInt(Math.random()*(str.length-1))];
	}
	oCode.innerHTML = code;
}
//初始化验证码
createCode();

//跟换验证码
oCode.onclick = function (){
	oCode.innerHTML = "";
	createCode();
	oCode.innerHTML = code;
}



















