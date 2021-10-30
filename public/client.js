const socket=io();
let Name;
let textarea=document.querySelector('#textarea');
let messagearea=document.querySelector('.message_area');

do {
    Name = prompt('enter your name:')
} while (!Name);


textarea.addEventListener('keyup',(e)=>{
  
         if(e.key ==='Enter')
         {
             sendmessage(e.target.value);
         }
})


function sendmessage(message){
     let msg={
  user:Name,
  message:message.trim()


    }
  appendMessage(msg,'outgoing');
  textarea.value="";
  scrolltobottom();

  socket.emit('message',msg);

}

function appendMessage(msg,type){

     let maindiv=document.createElement('div')
     let className=type;

     maindiv.classList.add(className,'message');

     let markup=`
     <h4>${msg.user}</h4>
     <p>${msg.message} </p>
     
     
     `
     

     maindiv.innerHTML=markup;
  messagearea.appendChild(maindiv)

}

//sending

socket.on('message',(msg)=>{
  appendMessage(msg,'incoming');
  scrolltobottom();
})



function scrolltobottom()
{

messagearea.scrollTop=messagearea.scrollHeight

}



