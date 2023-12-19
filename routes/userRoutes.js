import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.use(responseMiddleware)

router.get('/', function(req, res){
  let result = userService.getAll()
  if(result){
    res.status(200).json(result)
  } else {
    res.status(404).json({error: true, message:"Failed to fetch users"})
  }
})

router.get('/:id', function(req, res){
  let result = userService.search(req.params.id)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(404).json({error: true, message:"User not found"})
  }
})

router.post('/', createUserValid, function(req, res){
  let allUsers = userService.getAll()

  for(let user of allUsers){
    if(user.email.toLowerCase() === req.body.email.toLowerCase()){
      return res.status(400).json({error: true, message:"User with this email already exist"})
    }
    if(user.phoneNumber === req.body.phoneNumber){
      return res.status(400).json({error: true, message:"User with this phone number already exist"})
    }
  }

  let result = userService.create(req.body)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to create user"})
  }
})

router.put('/:id', updateUserValid, function(req, res){
  let user = userService.search(req.params.id)
  if(!user){
    return res.status(404).json({error: true, message:"User not found"})
  }

  let result = userService.update(req.params.id, req.body)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to update user"})
  }
})

router.delete('/:id', function(req, res){
  let result = userService.delete(req.params.id)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to delete user"})
  }
})

export { router };
