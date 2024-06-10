
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Setting up constants for the API key, SMS URL, and sender ID used for
// sending SMS messages. 
const API_KEY = process.env.SMS_API_KEY;
const SMS_URL = "https://api.smsonlinegh.com/v5/message/sms/send";
const SENDER_ID = process.env.SENDER_ID || "Soap & More";

// In-memory storage for simplicity. Replace with a database in a real application.
const deliveryStatuses = {};

//  This section of code sets up an Express server that handles sending
// SMS messages, receiving delivery callbacks, and checking delivery statuses. 

app.post('/send-sms', async (req, res) => {
    const { message, phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            message: 'Recipient phone number is required',
        });
    }

//     The `headers` constant is setting up the necessary headers for the HTTP request that will be sent
//    to the SMS API endpoint. 

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Host': 'api.smsonlinegh.com',
        'Authorization': `key ${API_KEY}`,
    };

    // The `payload` constant is creating an object that contains the necessary data for sending an SMS
    // message.

    const payload = {
        text: message,
        type: 0,
        sender: SENDER_ID,
        destinations: [{ to: phoneNumber }],
        callback: {
            url: 'http://localhost:5000/delivery-callback',
            accept: 'application/json'
        }
    };

// This block of code is responsible for sending an SMS message using the axios library to make a POST
// request to the SMS_URL endpoint. 
    try {
        const response = await axios.post(SMS_URL, payload, { headers });

        const responseData = response.data;
        const { handshake, data } = responseData;

        if (handshake.id === 0) {
            // Save initial status
            deliveryStatuses[phoneNumber] = 'Sent';
            res.json({
                success: true,
                data,
                message: 'SMS sent successfully',
            });
        } else {
            res.status(400).json({
                success: false,
                error: handshake.label,
                message: 'Failed to send SMS',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal Server Error',
        });
    }
});

app.post('/delivery-callback', (req, res) => {
    console.log('Delivery callback received:', req.body);
    
  
    const { phoneNumber, status } = req.body;
    
    // Update delivery status
    if (phoneNumber && status) {
        deliveryStatuses[phoneNumber] = status;
    }
    
    res.status(200).json({ message: 'Callback received' });
});

app.get('/delivery-status/:phoneNumber', (req, res) => {
    const { phoneNumber } = req.params;
    const status = deliveryStatuses[phoneNumber];

    if (status) {
        res.json({ phoneNumber, status });
    } else {
        res.status(404).json({ message: 'Status not found for this phone number' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
