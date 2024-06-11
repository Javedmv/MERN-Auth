const asyncHandler = require('express-async-handler');

// @desc POST registerUser
// @ POST /api/

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({message:'post register'})
})

const userLogin = asyncHandler(async (req,res) => {
    res.status(200).json({message:'post login'})
})

module.exports = {
    registerUser,
    userLogin
}