import userQueryModel, { UserQuery } from "../models/users";

class UserService {
  //signup service 
  async addUser(data: UserQuery) {
    try {
      let result = await userQueryModel.create(data);
      return result;
    } catch (e) {
      return false;
    }
  }

  //login user
  async loginUser(data: any): Promise<UserQuery> {
    try {
      let result = await userQueryModel.findOne({ email: data });
      return result;
    } catch (e) {
      return e;
    }
  }

  //find user service
  async findUserQuery(data: any): Promise<UserQuery> {
    try {
      let result: any = await userQueryModel.findOne(data);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new UserService();
