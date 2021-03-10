const express = require('express');
const socket = require('socket.io')
const path = require('path')
const app = express();
const server = app.listen((process.env.PORT, ()=> console.log("listening port 3000")))
const io = socket(server)
const fs = require('fs')
const {userjoin,getcurrentuser, userleave,users} = require('./user');
const e = require('express');
const { globalEval } = require('jquery');

const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb+srv://abdu:abdu4532@cluster0.zdkrf.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true}, (err, client)=>{
    
    if(err){
        throw err
    }
    
    console.log('MongoDB connected.....')

    io.on("connect", function(socket){

        const db = client.db('test')
        let post_collection = db.collection('posts') 
        
        //post_collection.remove()
            post_collection.find().limit(100).sort({_id:1}).toArray(function(err,res){    
                socket.emit('chat', res);
                
            })  

            connections.push(socket)
            console.log("Connected: %s sockets connected", connections.length)
            
            socket.on('chat', function(data){

                const user = getcurrentuser(socket.id)
                let messagechat = data.msg
                let usersname = data.name

                post_collection.insertOne({msg:messagechat, name:usersname},()=>{
                    console.log([data])
                    io.emit('chat',[data])                })
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
                    setTimeout(() => {

                        if(disconnectss == false){
                            
                            console.log("33333333333333333333")
                            post_collection.insertOne({leftuser:user.username}, () => {
                                 io.emit('userdisconnected',user)
                             })
                        }

                    }, 2000);
                
            })

            socket.on("user_joined", (data)=>{
                const user = userjoin(socket.id,data)
                //io.emit('userjoinedmessage', user)
            })

            disconnectss = true
            
        })
})

let disconnectss = false

connections = []
    

app.use(express.static(path.join(__dirname, 'public')));

function formatmessage(name,msg){
    return {
        name,
        msg
    }
}

