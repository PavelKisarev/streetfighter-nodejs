import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.use(responseMiddleware)

router.get('/', function(req, res){
  let result = fighterService.getAll()
  if(result){
    res.status(200).json(result)
  } else {
    res.status(404).json({error: true, message:"Failed to fetch fighters"})
  }
})

router.get('/:id', function(req, res){
  let result = fighterService.search(req.params.id)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(404).json({error: true, message:"Fighter not found"})
  }
})

router.post('/', createFighterValid, function(req, res){
  let allFighters = fighterService.getAll()

  for(let fighter of allFighters){
    if(fighter.name.toLowerCase() === req.body.name.toLowerCase()){
      return res.status(400).json({error: true, message:"Fighter with this name already exist"})
    }
  }

  let result = fighterService.create(req.body)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to create fighter"})
  }
})

router.put('/:id', updateFighterValid, function(req, res){
  let fighter = fighterService.search(req.params.id)
  if(!fighter){
    return res.status(404).json({error: true, message:"Fighter not found"})
  }
  let result = fighterService.update(req.params.id, req.body)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to update fighter"})
  }
})

router.delete('/:id', function(req, res){
  let result = fighterService.delete(req.params.id)
  if(result){
    res.status(200).json(result)
  } else {
    res.status(400).json({error: true, message: "Failed to delete fighter"})
  }
})

export { router };
