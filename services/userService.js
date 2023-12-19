import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAll(){
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data){
    const item = userRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  update(id, data){
    const result = userRepository.update(id, data);
    if (!result) {
      return null;
    }
    return result;
  }

  delete(id){
    const result = userRepository.delete(id);
    if (!result) {
      return null;
    }
    return result;
  }
}

const userService = new UserService();

export { userService };
