const socket  = io();

let name;
let textarea;
do{
    name=prompt("Please enter your name");
   
}while(!name);
 console.log(name);
textarea=document.querySelector('#textarea');
let messageArea =document.querySelector('.message__area');
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
})
    let msg;
function sendMessage(message){
   
    msg = {
        user:name,
        message:message.trim()
    }
    // Append Message
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBotton();
    // send to server
    socket.emit('message',msg);

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className =type;
    mainDiv.classList.add(className,'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p> ${msg.message}  <p/>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}


// Recieve message

socket.on('message',(msg)=>{
        appendMessage(msg,'incoming');
        scrollToBotton();
})

function scrollToBotton(){
    messageArea.scrollTop = messageArea.scrollHeight;
}