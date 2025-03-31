// Deploy trigger comment
// טוען את משתני הסביבה
require('dotenv').config();

// ייבוא ספריות
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// הגדרות כלליות
app.use(cors());
app.use(express.json());

// נקודת קצה (API Endpoint) שמדברת עם הבינה המלאכותית
app.post('/ask-ai', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // אפשר להחליף ל-gpt-3.5-turbo אם אין לך הרשאות ל-4
        messages: [
          { role: 'system', content: 'You are a helpful and organized personal assistant helping users schedule and prioritize tasks for the week.' },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error('Error calling OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

// הפעלת השרת על פורט דינמי ל-Render או ברירת מחדל ל-localhost
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
