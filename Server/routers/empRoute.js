const express = require("express");
const route = express.Router();
const empCortroller = require("../controllers/empController");

route.post("/login" ,  empCortroller.emptask);
route.get("/showtask/:id" , empCortroller.showTask);
route.post("/sendreport" , empCortroller.sendReport);
route.get("/showcompletedtask" , empCortroller.showCompletedTask);
route.get("/profile/:id", empCortroller.getEmployeeProfile); 

module.exports = route;