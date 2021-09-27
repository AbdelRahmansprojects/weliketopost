var socket = io.connect()
let btn = document.getElementById('button')
let message = document.getElementById('message')
let output = document.querySelector('.output')
let submit = document.getElementById('submit')
let handle = document.getElementById('handle')
let mainchat = document.getElementById('mainchat')
let chatwindow = document.getElementById('chatwindow')
let userlist = document.getElementById('users')
let numberoftimes = 0
let allusers = []
let sendtrue = false
let test = document.getElementById('test')

let cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({
    ...accumulator,[key.trim()]:decodeURIComponent(value)
}), {});

let name = cookies.username

    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "randomnumber =; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    //alert(document.cookie)

        socket.once('userdisconnected',function outputdisconnect(data){
            //  *********** HERE UNCOMMENT IF U WANT TO IMPLEMENT "LEFT FUNCTION"
            
            // let div = document.createElement('div')
            // div.classList.add('output')
            // div.innerHTML = '<p>' + data.username+ ' has left the chat</p>'
            // chatwindow.appendChild(div)
            // console.log(data.username)
        })
    
        
        //usersarray.push(name)
    socket.emit('user_joined',name)
    socket.emit('usercounter', name)
    
    
    

    socket.once('userjoinedmessage',(user)=>{
            let div = document.createElement('div')
            div.classList.add('output')
            div.innerHTML = '<p>' + user.username+ ' has joined the chat</p>'
            chatwindow.appendChild(div)
            //Cookies.set('ieat',true)
    })

    
    
    

test.addEventListener('submit', e=>{
    e.preventDefault();
    
    let name = cookies.username

        if(name != null){
            define = true
        }

    // Get message text
    const msg = e.target.elements.message.value

   
        socket.emit('chat',{

            msg,name
        })
    
    message.value = ""

})

    socket.on('chat', function(message){ 
        //alert(message[message.length-1].msg)
        outputmessage(message)
        
        chatwindow.scrollTop = chatwindow.scrollHeight
    })


socket.on('usercounter',(data)=>{

    //alert(data.users)
    outputusers(data.users)

})

function outputusers(users) {

    userlist.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}`;
    
      for(var x =0; x <users.length-1; x++){
        if(users[x].username == cookies.username){
        
        }
        //alert(users[x].username)
        //alert(users[x].username)
      }
    
  }

  function outputmessage(message){
    let messageslength = message.length -1
    if(message.length){
        for(var x = 0;x < message.length;x++){
            
            let div = document.createElement('div')
                div.classList.add('output')
            if(message[0].socketsid == socket.id){
                div.innerHTML = `<p style = "text-align:right; font-size:20px;"><strong>` + message[x].name+` : </strong>` + message[x].msg + `</p>`
                chatwindow.appendChild(div)

            } else 
             if(message[x].name !== undefined){

                div.innerHTML = `<p style = " font-size:20px"><strong>` + message[x].name+` : </strong>` + message[x].msg + `</p>`
                chatwindow.appendChild(div)
            } else if(message[x].leftuser){
                
                // div.innerHTML = '<p>' + message[x].leftuser+ ' has left the chat</p>'
                // chatwindow.appendChild(div)
                //console.log(data.username)
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