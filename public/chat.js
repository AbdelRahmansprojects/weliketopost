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
let important = false
let allusers = []

let sendtrue = false
let test = document.getElementById('test')


let url_string = (window.location.href).toLowerCase()
let url = new URL(url_string)
let name = url.searchParams.get('username')
    

    //alert(location.href.split(name))

    if(location.href.split(name)!="http://localhost:3000/home.html?username=,"){
        
        //location.replace("https://geekprank.com/hacker/?fbclid=IwAR2pgfR_q75CIHCbfqrsrhuHSgE2APsg3lrA6uYN8fbCrbIG8F4gqCI3cvs")

    } 

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
        //alert(mycookie)
        
            
            let div = document.createElement('div')
            div.classList.add('output')
            div.innerHTML = '<p>' + user.username+ ' has joined the chat</p>'
            chatwindow.appendChild(div)
            //Cookies.set('ieat',true)
        
        
    })

    
    
    socket.on('usercounter',(data)=>{

            //console.log(data.users)
            
            outputusers(data.users)

    })

test.addEventListener('submit', e=>{
    e.preventDefault();
    numberoftimes +=1

    let url_string = (window.location.href).toLowerCase()
    let url = new URL(url_string)
    let name = url.searchParams.get('username')

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
if(socket !== undefined){
    socket.on('chat', function(message){ 
        console.log(message)
        if(message.length){
           
        }
        
        outputmessage(message)
        
        chatwindow.scrollTop = chatwindow.scrollHeight
    })
}

function outputusers(users) {
    
    userlist.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}`;
    
    
  }

  function outputmessage(message){
    let messageslength = message.length -1
    
    if(message.length){
        for(var x = 0;x < message.length;x++){
            console.log(message[x].username)
            let div = document.createElement('div')
                div.classList.add('output')
            
            if(message[x].name !== undefined){

                div.innerHTML = `<p><strong>` + message[x].name+` : </strong>` + message[x].msg + `</p>`
                chatwindow.appendChild(div)
            } else if(message[x].leftuser){
                
                // div.innerHTML = '<p>' + message[x].leftuser+ ' has left the chat</p>'
                // chatwindow.appendChild(div)
                //console.log(data.username)
            }
            
            //chatwindow.insertBefore(div, chatwindow.firstChild)
        }
    }
    
  }

  
socket.on("testing", function(users){
    for(var x = 0; x<users.length;x++){
        
        if(name == users[x].username && socket.id != users[x].id){
            window.location.replace("weliketopost.herokuapp.com")
            socket.disconnect()           
        }
    }
})