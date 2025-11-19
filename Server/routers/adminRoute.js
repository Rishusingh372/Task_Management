const express = require("express");
const route = express.Router();
const adminCortroller = require("../controllers/adminController");


route.post("/login" ,adminCortroller.adminLogin);
route.post("/createuser" , adminCortroller.createUser);
route.get("/empdatalist" , adminCortroller.empDataList);
route.post("/assigntask" ,adminCortroller.assignTask );
route.get("/seereport" ,adminCortroller.seeReport );
route.get("/taskreassign", adminCortroller.taskReassign);
route.delete("/removeemployee/:id", adminCortroller.removeEmployee);





module.exports = route;