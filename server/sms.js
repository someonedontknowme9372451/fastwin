const twilio = require('twilio');
const accountSid = process.env.SID;
const authToken = process.env.AUTH;

const client = new twilio(accountSid, authToken);

// Endpoint to send SMS
app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;

  try {
    const message = await client.messages.create({
      body,
      from: 'your_twilio_phone_number',
      to,
    });

    console.log(`Message SID: ${message.sid}`);
    res.status(200).json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    res.status(500).json({ success: false, message: 'Error sending SMS' });
  }
});