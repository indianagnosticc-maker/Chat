require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/verify-token', async (req, res) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    res.json({ success: true, user: ticket.getPayload() });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Backend running on port', process.env.PORT || 3000)
);
