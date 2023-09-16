const express = require('express');
const jwt = require('jsonwebtoken');

const { User, Admin, Course } = require('../db/index');
const { authenticateJwt, SECRET } = require('../middleware/auth');

const router = express.Router();

//GET "/ME" ROUTE
router.get("/me", authenticateJwt, async (req, res) => {

    const admin = await Admin.findOne({ username : req.user.username });

    if(!admin){
        res.status(403).json({ msg : "Admin doesn't exist"});
        return;
    }

    res.json({
        username : admin.username
    });
});

//POST "/SIGNUP" ROUTE
router.post("/signup", async (req, res) => {
    try{
        const { username, password } = req.body;
        const existingAdmin = await Admin.findOne( {username});
    
        if(existingAdmin){
            res.status(403).json({ message : "Admin alreadt exists"});
        }
        else{
            const obj = { username : username, password : password};
            const newAdmin = new Admin(obj);
            await newAdmin.save();
    
            const token = jwt.sign({username, role: 'admin'}, SECRET, { expiresIn: '1h'});
            res.json({ message : 'Admin created successfully', token});
        }
    }
    catch(error){
        console.log('Error', error);
        res.status(500).json( { message : 'Internal server error'});
    }
});

//POST "LOGIN" ROUTE
router.get("/signin", async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password});

    if(admin){
        const token = jwt.sign({ username, role: admin}, SECRET, { expiresIn: '1h'});
        res.json( { message : "Logged In successfully", token});
    }
    else{
        res.status(403).json( { message : "Invalid username or password"});
    }
});

//POST "/COURSE" ROUTE
router.post("/courses", authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json( { message: "Course created successfully", courseId : course.id});
});

//PUT "COURSEID" ROUTE
router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new : true});
    if(course){
        res.json({ message : "Course updated successfully"});
    }
    else{
        res.status(404).json({message : "Course Not Found"});
    }
});

//GET "COURSES" ROUTE
router.get("/courses", async (req, res) => {
    const courses = await Course.find({});
    res.json( { courses });
});

//GET COURSEBYID Route
router.get("/courses/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});

module.exports = router;

