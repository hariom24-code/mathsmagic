const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: 'Error sending email' });
        }
        res.send({ success: true, message: 'Message sent successfully!' });
    });
});

// Registration form endpoint
app.post('/api/register', (req, res) => {
    const { studentName, studentClass, parentContact, timing } = req.body;

    // Save registration data to database (for simplicity, sending email)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: 'New Registration',
        text: `Student Name: ${studentName}\nClass: ${studentClass}\nParent's Contact: ${parentContact}\nPreferred Timing: ${timing}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: 'Error sending email' });
        }
        res.send({ success: true, message: 'Registration successful!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});