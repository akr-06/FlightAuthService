const {User, Role} = require('../models/index');

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("error in user repository");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where : {
                    id : userId
                }
            })
            return true;
        } catch (error) {
            console.log("Error in repository layer in destroy");
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes : ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Error in getById in repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            })
            return user;
        } catch (error) {
            console.log("Error in getByEmail in repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name : "ADMIN"
                }
            })

            return user.hasRole(adminRole);
            
        } catch (error) {
            console.log("Error in isAdmin user-repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;

