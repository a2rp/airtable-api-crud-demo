const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1198;

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const airtableHeaders = {
    headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
    },
};

app.get("/", (req, res) => {
    res.send("Airtable CRUD API is running");
});

// Get all contacts
app.get("/api/contacts", async (req, res) => {
    try {
        const response = await axios.get(airtableUrl, airtableHeaders);

        const contacts = response.data.records.map((record) => ({
            id: record.id,
            name: record.fields.Name || "",
            email: record.fields.Email || "",
            phone: record.fields.Phone || "",
            status: record.fields.Status || "",
        }));

        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contacts",
        });
    }
});

// Create contact
app.post("/api/contacts", async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;

        const response = await axios.post(
            airtableUrl,
            {
                fields: {
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Status: status,
                },
            },
            airtableHeaders,
        );

        res.status(201).json({
            id: response.data.id,
            name: response.data.fields.Name || "",
            email: response.data.fields.Email || "",
            phone: response.data.fields.Phone || "",
            status: response.data.fields.Status || "",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create contact",
        });
    }
});

// Update contact
app.put("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status } = req.body;

        const response = await axios.patch(
            `${airtableUrl}/${id}`,
            {
                fields: {
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Status: status,
                },
            },
            airtableHeaders,
        );

        res.json({
            id: response.data.id,
            name: response.data.fields.Name || "",
            email: response.data.fields.Email || "",
            phone: response.data.fields.Phone || "",
            status: response.data.fields.Status || "",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update contact",
        });
    }
});

// Delete contact
app.delete("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await axios.delete(`${airtableUrl}/${id}`, airtableHeaders);

        res.json({
            message: "Contact deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete contact",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
