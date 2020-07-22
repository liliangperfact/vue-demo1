import { v4 as uuidv4 } from 'uuid';


function getUserTempId(){
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  if(!userTempId){//如果临时ID不存在
    userTempId = uuidv4()//则让他等于生成的临时ID
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}
export{
  getUserTempId
}