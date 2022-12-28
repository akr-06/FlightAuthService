const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success : true,
            data : {},
            message : "Something went wrong",
            err : "Email or password missing"
        })
    }
    next();
}

const validateIsAdminRequest = async (req,res) => {
    if(!req.body.id){
        return res.status(400).json({
            success : false,
            data : {},
            err : "User Id is not present",
            message : "Something went wrong"
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}