const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        })
        return res.status(201).json({
            success : true,
            message : "Succesfuly created a new user",
            data : response,
            err : {}
        })
    } catch (error) {
        console.log("Error in user controller in create");
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            data : {},
            err : error
        })
        
    }

}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success : true,
            message : "Successfully signed in",
            data : response,
            err : {}
        });
    } catch (error) {
        console.log("Error in signIn in controller");
        return res.status(500).json({
            success : false,
            message : "Unable to sign in",
            data : {},
            err : error
        });
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            err : {},
            data : response,
            message : 'User is authenticated'
        })
    } catch (error) {
        return res.status(200).json({
            success : false,
            err : error,
            data : {},
            message : 'User cannot be authenticated'
        })
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.Id);
        return res.status(200).json({
            data : response,
            err : {},
            success : true,
            message : "Successfully fetched whether the user is admin or not"
        })
    } catch (error) {
        console.log("Error in isAdmin controller layer");
        res.status(500).json({
            data : {},
            err : error,
            success : false,
            message : "Unable to fetch"
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}