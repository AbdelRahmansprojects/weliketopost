var socket = io.connect()
let btn = document.getElementById('button')
let message = document.getElementById('message')
let output = document.querySelector('.output')
let submit = document.getElementById('submit')
let handle = document.getElementById('handle')
let mainchat = document.getElementById('mainchat')
let chatwindow = document.getElementById('chatwindow')
let userlist = document.getElementById('users')
let feedback = document.getElementById('feedback')
let numberoftimes = 0
let allusers = []
let typing = false
let test = document.getElementById('test')
let dates = []
let cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({
    ...accumulator,[key.trim()]:decodeURIComponent(value)
}), {});

let name = cookies.username
if(name =="qazi101"){
    name = "QAZI(VIP)"
}
if(name =="50cent101"){
    name = "50CENT(VIP)(WISH DEATH UPON ME)"
}
if(name =="owner1011"){
    name = "OWNER"
}
        
if(name == null){
    location.replace("https://weliketopost.herokuapp.com/")
}

    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "randomnumber =; expires=Thu, 01 Jan 1970 00:00:00 UTC;"

    socket.emit('user_joined',name)
    socket.emit('usercounter', name)

// message.addEventListener('keypress',()=>{
    
//     typing = true
    
    
//     socket.emit('typing',name)
//     clearTimeout(mytest)
// })

message.addEventListener("keyup", function(){
    // typing = false
    // mytest = setTimeout(()=>{
    //     if(testing == false){
    //         socket.emit('typing',"stop")
    //     }
      
    // },3000)
    // if(typing ==true){
    //     clearTimeout(mytest)
    // }
    // console.log("keyup")

    if(typing ==false){
        typing =true
        socket.emit('typing',name)
        timeout = setTimeout(()=>{
            typing = false;
            socket.emit('typing',"stop")
        },3000)
    } else{
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            typing = false;
            socket.emit('typing',"stop")
        }, 3000);
    }
});
//i think cuz set timeout does the timer just once it dosent reset the timer something like that


test.addEventListener('submit', e=>{
    e.preventDefault();
    
    let name = cookies.username
    let color = "black"
   

        if(name != null){
            define = true
        }

    // Get message text
    const msg = e.target.elements.message.value
    if(name == "qazi101"){
        color = "rainbow"
        name = "QAZI(VIP)"
    }
    if(name == "50cent101"){
        color = "rainbow"
        name = "50CENT(VIP🐐)"
    }
    if(name == "owner1011"){
        color="red"
        name = "OWNER"
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var time = date+"      |      "+time;
        
        //alert(dateTime)
        

        socket.emit('chat',{

            msg,name,color,time
        })
    
    message.value = ""

})

socket.on('chat', function(message){ 
    feedback.innerHTML="";
    outputmessage(message)
    // chatwindow.scrollTop = chatwindow.scrollHeight
})

socket.on('typing',(data)=>{
    if(data=="stop"){
        feedback.innerHTML =""
    } else{
        feedback.innerHTML +='<p style = "color:white;  padding: 14px 0px; margin: 0 20px; border-bottom: black; text-align: left;"><em>' +data + ' is typing a message....' + '</em></p>'
        chatwindow.scrollTop = chatwindow.scrollHeight
    }
    
})




socket.on('usercounter',(data)=>{

    //alert(data.users)
    outputusers(data.users)

})

function outputusers(users) {
    
    userlist.innerHTML = `
      ${users.map(user => `<li style = "color:white;">${user.username}</li>`).join('')}`;
    
      for(var x =0; x <users.length-1; x++){
        if(users[x].username == cookies.username){
        
        }
      }
    
  }

  function outputmessage(message){
    
    let messageslength = message.length -1
    if(message.length){
        for(var x = 0;x < message.length;x++){
            
            let div = output
             if(message[x].color == "rainbow"){
                div.innerHTML += `<p style = " font-size:20px; padding: 14px 0px; margin: 0 20px; border-bottom: black; text-align: left; color:white; "><strong  class="rainbow rainbow_text_animated">` + message[x].name+` : </strong>` + message[x].msg +  ` <strong style = "text-align:right; font-size:10px;color:grey;">` + message[x].time+ `  </strong> </p>`
             } else if(message[x].color=="red"){
                div.innerHTML += `<p style = " font-size:20px; padding: 14px 0px; margin: 0 20px; border-bottom: black; text-align: left; color:white; "><strong style = "color:orange;">` + message[x].name+` : </strong>` + message[x].msg +  ` <strong style = "text-align:right; font-size:10px;color:grey;">` + message[x].time+ `  </strong> </p>`
            }else if(message[x].name !== undefined){
                div.innerHTML+= `<p style = " font-size:20px; padding: 14px 0px; margin: 0 20px; color: white;" ><strong  style = " color: #575ed8;">` + message[x].name+` : </strong>` + message[x].msg + ` <strong style = "text-align:right; font-size:10px; color:grey;">` + message[x].time+ `  </strong> </p>`
            } 
        }
    }
    
  }


// socket.on("testing", function(users){
//     for(var x = 0; x<users.length;x++){
        
//         if(name == users[x].username && socket.id != users[x].id){
//             socket.disconnect() 
//             //if this didnt happen then we can call "userjoin()"
//             window.location.replace("http://localhost:3000/test.html")
//             // socket.on("confirmation", (data)=>{
//             //     data = true
//             //     io.emit("confirmation",data)
//             // })
//             socket.disconnect()           
//         } 
//     }
    
// })

// my messages to show in the right but other user messages show in the left
// cant find persons id right after he sends message