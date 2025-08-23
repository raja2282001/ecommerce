const UserSchema = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");


const registerUser = (req, res) => {
    const user=new UserSchema({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    user.save((error,data)=>{
        if(error){
            res.status(404).json({
                message:"User registration failed",
                error:error.message
            })
        }else{
            res.status(201).json({
                message:"User registered successfully",
                data:data
            })
        }
    })
}


const loginuser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "email and password are required" });
    }
    UserSchema.findOne({ email, password }, (error, user) => {
        if (error) {
            return res.status(404).json({ message: "error in user login" });
        }
        if (!user) {
            return res.status(404).json({ message: "invalid email or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(202).json({
            message: "successfully login",
            token,
            data: user
        });
    });
}



const listalluser=(req,res)=>{
    UserSchema.find((error,data)=>{
        if(error){
            res.status(404).json({
                message:"error for listing users"
            })
        }else{
            if(data.length==0 || data == undefined || data == null){
                res.status(404).json({
                    message:"No users found"
                })
            }else{
                res.status(200).json({
                    message:"List of all users",
                    data:data
                })
            }
        }
    })
}


const userdetail=(req,res)=>{
    const id=req.params.id;

    UserSchema.findById(id,(error,data)=>{
        if(error){
            res.status(404).json({
                message:"User not found",
                error:error.message
            })
        }else{
            res.status(200).json({
                message:"User details",
                data:data
            })
        }
    })
}

const deleteuser=(req,res)=>{
    const id=req.params.id;

    UserSchema.findByIdAndDelete(id,(error,data)=>{
        if(error){
            res.status(404).json({
                message:"User not found",
                error:error.message
            })
        }else{
            res.status(200).json({
                message:"User deleted successfully",
                data:data
            })
        }
    })
}

const updateuser=(req,res)=>{
    id=req.params.id;

    UserSchema.findByIdAndUpdate(id,req.body,(error,data)=>{
        if(error){
            res.status(404).json({
                message:"User not found",
                error:error.message
            })
        }else{
            res.status(200).json({
                message:"User updated successfully",
                data:data
            })
        }
    })
}


module.exports = {
    registerUser,
    loginuser,
    listalluser,
    userdetail,
    deleteuser,
    updateuser
};