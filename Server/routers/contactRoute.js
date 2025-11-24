const express = require("express");
const route = express.Router();
const contactController = require("../controllers/contactController");

// POST - Submit contact form
route.post("/contact", contactController.submitContactForm);

// GET - Get all contacts (for admin)
route.get("/contacts", contactController.getAllContacts);

module.exports = route;