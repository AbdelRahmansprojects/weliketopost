const express = require('express');
const socket = require('socket.io')
const path = require('path')
const app = express();
let testing = false;
//var server = require('http').createServer(app);
const server = app.listen(process.env.PORT || 3000, ()=> console.log("listening port 3000"))
const io = socket(server)
const fs = require('fs')
const {userjoin,getcurrentuser, userleave,users} = require('./public/user');
const e = require('express');
const {v4: uuidV4} = require('uuid')
let testusers = []


//server.listen(process.env.PORT || 3000);

const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb+srv://abdu:abdu4532@cluster0.zdkrf.mongodb.net/test?retryWrites=true&w=majority' || process.env.MONGO_URL, {useUnifiedTopology: true}, (err, client)=>{
    
    if(err){
        throw err
    }

    app.set('view engine', 'ejs')

    app.get('/secretadminroom', (req, res) => {
        //res.sendFile(path.resolve(process.cwd(), 'public/videoroom.html'))
        res.redirect(`/secretadminroom/${uuidV4()}`)
    })

    app.get('/secretadminroom/:room', (req,res)=>{
        //used render instead of send file because used ejs(videoroom) and ejs is used for dynamic files like for video
        res.render('videoroom',{roomId: req.params.room})
    })
    
    console.log('MongoDB connected.....')

    // point of this server is to emit to ALL of the sockets io means everyone
    io.on("connect", function(socket){
        const db = client.db('test')
        let post_collection = db.collection('posts') 
        
        //post_collection.remove()
            post_collection.find().limit(300).sort({_id:1}).toArray(function(err,res){  
                //console.log(res)  
                // this for when the user first joins and we display everything in the database
                io.emit('chat', res);
                
            })  

            connections.push(socket)
            console.log("Connected: %s sockets connected", connections.length)
            
            socket.on('typing',(data)=>{
                socket.broadcast.emit('typing',data)
            })
            
            // this for when the user adds something
            socket.on('chat', function(data){

                const user = getcurrentuser(socket.id)  
                
                let messagechat = data.msg
                let usersname = data.name
                let userscolor= data.color
                let dateTime = data.time

                post_collection.insertOne({msg:messagechat, name:usersname, color:userscolor, time:dateTime},()=>{
                    console.log([data])
                    io.emit('chat',[data])                
                })
            })


            socket.on('usercounter',(data)=>{
                
                io.emit('usercounter',{
                    data,users
                })
                        
            })

            socket.on('disconnect', ()=> {
                
                const user= userleave(socket.id);
                
                io.emit('usercounter',{
                    users
                })

                connections.splice(connections.indexOf(socket), 1)
                console.log("Disconnected: " + connections.length + " sockets connected (NOW)")

                    disconnectss = false
                
            })

            socket.on("user_joined", (data)=>{
                // io.emit("testing", users)
                
                // want this to only happen if the testing above turns out to be false
                // io.emit("confirmation",testing)
                // socket.on("confirmation",(data)=>{
                //     console.log(data)
                // })
                
                    const user = userjoin(socket.id,data)
                
                //io.emit('userjoinedmessage', user)
            })

            socket.on("join-room", (roomid,id)=>{
                socket.join(roomid)
                socket.to(roomid).broadcast.emit('user-connected', id)
                socket.on('disconnect', () => {
                    socket.to(roomid).broadcast.emit('user-disconnected', id)
                })
            })

            disconnectss = true

        })
})

let disconnectss = false

connections = []
    

function formatmessage(name,msg){
    return {
        name,
        msg
    }
}

app.use(express.static(path.join(__dirname, 'public')))

//if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'public')))
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'public/test.html'))
    })
//}





  //WHAT I WANT TO DO: 
  // --video chat:
  //    - secretroom it shows everyone camera thats all
        

  // NUMBER 1 TIP: THINK LIKE A ROBOT EXACTLYYYYYYYYYYYYYYYYYYYYYYYYYY
  
  // main objective: get ahead coding career 
   