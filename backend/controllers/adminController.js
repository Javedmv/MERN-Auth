const Admin = require('../model/adminModel');
const asyncHandler = require('express-async-handler');
const userModal = require('../model/userModal');
const jwt = require('jsonwebtoken');

const adminLogin = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    
    if(admin && admin.password === password){
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getUser = asyncHandler(async(req,res) => {
    const users = await userModal.find();
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
        throw new Error('Users not found');
    }
});

const userBlock = asyncHandler(async(req,res) => {
    const userId = req.body.userId;
    const user = await userModal.findByIdAndUpdate(userId,{isBlock:true});
    const users = await userModal.find();
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
        throw new Error('Users not found')
    }
});

const userUnblock = asyncHandler(async(req,res) => {
    const userId = req.body.userId;
    const user = await userModal.findByIdAndUpdate(userId,{isBlock:true});
    const users = await userModal.find();
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
        throw new Error('Users not found')
    }
});

const editUser = asyncHandler(async (req,res) => {
    const {userId, name, email} = req.body;
    const user = user.findByIdAndUpdate(userId,{name,email},{new:true});
    const users = await userModal.find();
    if(users){
        res.status(200).json({users})
    }else{
        res.status(404)
        throw new Error('Users not found')
    }
})

const searchUser = asyncHandler(async(req,res)=>{
    const query = req.body.query;
    const regex = new RegExp(`^${query}`,'i');

    const users = await userModal.find({name:{ $regex: regex}})
    res.status(200).json(users)
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
}



module.exports = {
    adminLogin,
    getUser,
    userBlock,
    userUnblock,
    editUser,
    searchUser,
}