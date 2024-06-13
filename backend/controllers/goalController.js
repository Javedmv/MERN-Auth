const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel');
const User = require('../model/userModal');


const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({userId: req.user.id});

    res.status(200).json(goals);
})

const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        userId: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoals = asyncHandler(async (req,res) => {
    const {id} = req.params
    const goal = await Goal.findById(id);
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(goal.userId);

    //check for the user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure that logged in user matches the goal user
    if(goal.userId.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updatedGoal)
})

const deleteGoals = asyncHandler(async (req,res) => {
    const {id} = req.params
    const goal = await Goal.findById(id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const user = await User.findById(goal.userId);

    //check for the user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure that logged in user matches the goal user
    if(goal.userId.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(id);
    res.status(200).json({ id });
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}