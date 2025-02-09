const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve the frontend (HTML file)
app.use(express.static(path.join(__dirname, "public"))); // Make sure your index.html is in the "public" folder

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "saparyadey2019@gmail.com",
        pass: "vijh ocmq rrsj sutj"
    }
});

app.post("/send-email", (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: "saparyadey2019@gmail.com",
        to: email,
        subject: "Voice Sent Email",
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ status: "Error", error });
        }
        res.json({ status: "Success", info });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





