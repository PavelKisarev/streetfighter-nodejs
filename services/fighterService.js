import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  
  getAll(){
    const users = fighterRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data){
    const item = fighterRepository.create({ ...{health: 100}, ...data});
    if (!item) {
      return null;
    }
    return item;
  }

  update(id, data){
    const result = fighterRepository.update(id, data);
    if (!result) {
      return null;
    }
    return result;
  }

  delete(id){
    const result = fighterRepository.delete(id);
    if (!result) {
      return null;
    }
    return result;
  }
}

const fighterService = new FighterService();

export { fighterService };
