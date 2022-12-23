const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig')

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
            throw error;
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn : 60*60});
            return token;

        } catch (error) {
            console.log("Error in createToken in service layer");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const verify = jwt.verify(token,JWT_KEY);
            return verify;
        } catch (error) {
            console.log("Error in verifyToken in service layer");
            throw error;
        }
    }
}

module.exports = UserService;