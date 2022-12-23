const UserRepository = require('../repository/user-repository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Error in service layer in create");
            throw {error};
        }
    }
}

module.exports = UserService;