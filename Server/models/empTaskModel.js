const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    priority: String,
    empid: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    status: String,
    completionday: Number,
    comment: String,
    tasksend: Boolean
});

module.exports = mongoose.model("emptask", taskSchema);