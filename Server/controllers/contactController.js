const Contact = require("../models/contactModel");

const submitContactForm = async (req, res) => {
    try {
        const { name, number, email, service } = req.body;

        // Basic validation
        if (!name || !number || !email || !service) {
            return res.status(400).send({ 
                success: false,
                msg: "All fields are required" 
            });
        }

        // Create new contact entry
        const newContact = new Contact({
            name,
            number,
            email,
            service
        });

        await newContact.save();

        res.status(201).send({ 
            success: true,
            msg: "Form submitted successfully!",
            data: newContact 
        });

    } catch (error) {
        console.log("Error in contact form submission:", error);
        res.status(500).send({ 
            success: false,
            msg: "Error submitting form", 
            error: error.message 
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.log("Error fetching contacts:", error);
        res.status(500).send({ 
            success: false,
            msg: "Error fetching contacts", 
            error: error.message 
        });
    }
};

module.exports = {
    submitContactForm,
    getAllContacts
};