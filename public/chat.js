window.onload = function(){
	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
	
	
	socket.on('message',function(data){
		if(data.message){
			messages.push(data);
			var html = '';
			for(var i=0; i <messages.length;i++){
				html += messages[i].username +':'+ messages[i].message + '<br/>';
			}
			content.innerHTML = html;
		}
		else {
			console.log("problem"+data);
		}
	});
	
	sendButton.onclick = function(){
		if(name.value ==""){
			alert("Please type your name!");
		} else {
			var text = field.value;
			var namee = name.value;
			socket.emit('send', {message:text,username:namee});
		}
	};
}
