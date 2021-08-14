const users = [];

function userjoin(id,username){
  const user = {id,username}

  users.push(user);
  
  return user
}

function getcurrentuser(id){
  return users.find(user=>user.id == id)
}

function userleave(id){
  const index = users.findIndex(user => user.id === id);
  
  if(index !== -1){
    return users.splice(index,1)[0]
  }

}

module.exports ={
  userjoin,
  getcurrentuser,
  userleave,
  users

}     
