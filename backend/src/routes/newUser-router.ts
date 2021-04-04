import { Router } from "express";
import NewUser from "../model/newUser";

const newUserRouter = Router();

newUserRouter.post('/', function(req, res){
  const user = new NewUser({ 
    username: 'test',
    password: 'qwerty' 
  })

  user.save(function (){
    console.log("ye")
  });

})

export default newUserRouter;

