const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const { use } = require('../routes');

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

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordsMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log("Password doesn't match");
                throw error;
            }

            const newJWT = this.createToken({email : user.email,id: user.id});
            return newJWT;

        } catch (error) {
            console.log("Error in signIn in service layer");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error : "Invalid token"}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error : "No user with the corresponding token exists"};
            }
            return user.id;
        } catch (error) {
            console.log("Error in isauthenticated in servic layer");
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

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Error in checkPassword in service layer");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Error in isAdmin user-service layer");
            throw error;
        }
    }
}

module.exports = UserService;