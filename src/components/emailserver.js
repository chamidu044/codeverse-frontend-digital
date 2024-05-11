const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route for feedback submission
app.post('/submit-feedback', (req, res) => {
  const { feedback } = req.body;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codeverse.official110@gmail.com', // your Gmail account
      pass: 'codeverse110' // your Gmail password
    }
  });

  // Email data
  const mailOptions = {
    from: 'codeverse.official110@gmail.com',
    to: 'codeverse.official110@gmail.com',
    subject: 'Feedback from CodeVerse Website',
    text: feedback
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Unable to send feedback');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Feedback submitted successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
