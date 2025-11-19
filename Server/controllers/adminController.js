const adminModel = require("../models/adminModel");
const empModel = require("../models/empModel");
const EmpPass = require("../utils/userPassword");
const emptaskModel = require("../models/empTaskModel");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email: email, password: password });
        if (!admin) {
            return res.status(401).send({ msg: "Invalid Admin Email " });
        }
        if (admin.password != password) {
            return res.status(401).send({ msg: "Invalid Admin Password " });
        }
        res.status(200).send({ msg: "Admin Login Successful", admin: admin });
    } catch (error) {
        console.log("Error in Admin Login:", error);
        res.status(500).send({ msg: "Server error during admin login", error: error.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, role } = req.body;
    const userPassword = EmpPass.UserPassword();

    try {
        const newUser = new empModel({
            name: name,
            email: email,
            designation: role,
            password: userPassword
        });
        await newUser.save();

        // Send email after user is created
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rishu272018@gmail.com',
                pass: 'uqlp otnl vjjo hcfj'
            }
        });

        const mailOptions = {
            from: 'rishu272018@gmail.com',
            to: email,
            subject: "Employee Task Management Password",
            text: `Welcome ${name}! \n Your Task Management Password is : ${userPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error occurred:", error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).send({ msg: "User Created Successfully", user: newUser });
    } catch (error) {
        res.status(500).send({ msg: "Error in creating user", error: error.message });
    }
}

const empDataList = async (req, res) => {
    try {
        const empdata = await empModel.find();
        res.status(200).send(empdata);
    } catch (error) {
        console.log("error in emp data fetching", error);
        res.status(500).send({ msg: "Error fetching employee data", error: error.message });
    }
}

const assignTask = async (req, res) => {
    const { title, description, duration, priority, empid } = req.body;

    if (!title || !description || !duration || !priority || !empid) {
        return res.status(400).send({ msg: "All fields are required" });
    }

    try {
        console.log("Assigning task with data:", { title, description, duration, priority, empid });
        
        // Convert empid to ObjectId
        const objectId = new mongoose.Types.ObjectId(empid);
        
        const emptask = new emptaskModel({
            title: title,
            description: description,
            duration: parseInt(duration),
            priority: priority,
            empid: objectId,
            tasksend: false,  // false = assigned but not completed
            status: "Assigned"  // Initial status
        });
        
        await emptask.save();
        console.log("Task saved successfully:", emptask);
        res.status(201).send({ msg: "Task assigned successfully", task: emptask });
    } catch (error) {
        console.log("Error in assign task:", error);
        res.status(500).send({ msg: "Error assigning task", error: error.message });
    }
}

const seeReport = async (req, res) => {
    try {
        console.log("Fetching reports...");
        // ✅ Only get tasks that have been reported (tasksend: true)
        const task = await emptaskModel.find({ tasksend: true }).populate("empid");
        console.log("Reports found:", task.length);
        res.status(200).send(task);
    } catch (error) {
        console.log("Error in seeReport:", error);
        res.status(500).send({ msg: "Error fetching reports", error: error.message });
    }
}

const taskReassign = async (req, res) => {
    const { tid } = req.query;
    try {
        const task = await emptaskModel.findByIdAndUpdate(tid, {
            tasksend: false,
            status: "Reassigned"
        });
        res.status(200).send("Task Reassigned Successfully!");
    } catch (error) {
        console.log("Error in taskReassign:", error);
        res.status(500).send({ msg: "Error reassigning task", error: error.message });
    }
}

const removeEmployee = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find and delete employee
        const employee = await empModel.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).send({ msg: "Employee not found" });
        }
        // Also delete all tasks assigned to this employee
        await emptaskModel.deleteMany({ empid: id });

        res.status(200).send({ msg: "Employee removed successfully" });
    } catch (error) {
        console.log("Error in removeEmployee:", error);
        res.status(500).send({ msg: "Error removing employee", error: error.message });
    }
};

module.exports = {
    adminLogin,
    createUser,
    empDataList,
    assignTask,
    seeReport,
    taskReassign,
    removeEmployee
};