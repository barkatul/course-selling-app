const express = require('express');
const jwt = require('jsonwebtoken')

const { User, Admin, Course } = require("../db/index");
const { authenticateJwt, SECRET } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(user){
        res.status(403).json({ message : "User Already Exists"});
    }
    else{
        const tempUser = { username, password };
        const newUser = new User(tempUser);
        await newUser.save();

        const token = jwt.sign({username, role: 'user'}, SECRET, { expiresIn: '1h'});
        res.json({ message: "User created successfully", token});
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});

    if(user){
        const token = jwt.sign({username, role : 'user'}, SECRET, { expiresIn: '1h'});
        res.json({ message : "Logged In Successfully", token});
    }
    else{
        res.status(403).json({ message : "Invalid Username or Password"});
    }
});

router.get("/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    
    if(course){
        const user = await User.findOne({ username : req.user.username });

        if(user){
            user.purchasedCourses.push(course);
            await user.save();
        }
        else{
            res.status(403).json({ message : "User Not Found"});
        }
    }
    else{
        res.status(404).json({ message: "Course Not Found"})
    }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username : req.user.username }).populate('purchasedCourses');
    if(user){
        res.json({ purchasedCourses : user.purchasedCourses || [] });
    }
    else{
        res.status(403).json( { message: 'User not found'});
    }
});

module.exports = router;
