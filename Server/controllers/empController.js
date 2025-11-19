const empModel = require("../models/empModel")
const empTask = require("../models/empTaskModel")
const mongoose = require("mongoose")

const emptask = async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await empModel.findOne({ email: email });

        if (!employee) {
            return res.status(401).send({ msg: "Invalid Employee Email!" });
        }

        if (employee.password != password) {
            return res.status(401).send({ msg: "Invalid Employee Password!" });
        }
        
        // Store employee name in response for frontend
        res.status(200).send({ 
            employee: employee, 
            msg: "You are Successfully Login!",
            empname: employee.name 
        });
    } catch (error) {
         console.log("error in employee login " , error);
         res.status(500).send({ msg: "Server error during login", error: error.message });
    }
}

const showTask = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Fetching tasks for employee ID:", id);
        
        // Convert string ID to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        
        // Find tasks for this employee - removed tasksend filter to show all assigned tasks
        const task = await empTask.find({ empid: objectId }).populate("empid");
        
        console.log("Found tasks:", task);
        res.status(200).send(task);
    } catch (error) {
         console.log("error in fetch task data" , error);
         res.status(500).send({ msg: "Error fetching tasks", error: error.message });
    }
}

const sendReport = async (req, res) => {
    try {
        const { tid, status, completionday, comment } = req.body;
        console.log("Updating task report:", req.body);
        
        const updatedTask = await empTask.findByIdAndUpdate(
            tid, 
            {
                status: status,
                completionday: completionday,
                comment: comment,
                tasksend: true  // ✅ Important: Mark as reported
            },
            { new: true }  // ✅ Return updated document
        );

        console.log("Task updated successfully:", updatedTask);
        res.status(201).send("Report sent successfully");
    } catch (error) {
         console.log("error in report sending", error);
         res.status(500).send({ msg: "Error sending report", error: error.message });
    }
}

const showCompletedTask = async (req, res) => {
    const { id } = req.query;
    
    // ✅ Validate ID
    if (!id || id === 'null') {
        return res.status(400).send({ msg: "Employee ID is required" });
    }
    
    try {
        console.log("Fetching completed tasks for employee:", id);
        
        const objectId = new mongoose.Types.ObjectId(id);
        
        // ✅ Show tasks that have been reported (tasksend: true)
        const task = await empTask.find({ 
            $and: [
                { empid: objectId }, 
                { tasksend: true }
            ] 
        });
        
        console.log(`Found ${task.length} completed tasks for employee ${id}`);
        res.status(200).send(task);
    } catch (error) {
        console.log("Error in showCompletedTask:", error);
        res.status(500).send({ msg: "Error fetching completed tasks", error: error.message });
    }
}

  const getEmployeeProfile = async (req, res) => {
    const { id } = req.params;
    
    try {
        const employee = await empModel.findById(id);
        
        if (!employee) {
            return res.status(404).send({ msg: "Employee not found" });
        }
        
        res.status(200).send(employee);
    } catch (error) {
        console.log("Error in getEmployeeProfile:", error);
        res.status(500).send({ msg: "Error fetching employee profile", error: error.message });
    }
};

module.exports = {
    emptask,
    showTask,
    sendReport,
    showCompletedTask,
    getEmployeeProfile
}