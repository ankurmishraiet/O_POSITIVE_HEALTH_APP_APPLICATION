const SYSTEM_PROMPT =
  'You are HealthGPT, a friendly health assistant inside the O Positive Health app. Give simple and clear health information in short answers. You are not a doctor and you cannot diagnose. For serious or unclear symptoms, advise the user to consult a doctor. In an emergency such as chest pain, trouble breathing, heavy bleeding or loss of consciousness, tell the user to go to the nearest hospital or call emergency services immediately.Reply in the same language the user writes in. Do not use markdown, asterisks or bullet symbols. Write in plain short sentences and keep the answer under 120 words..';

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Sawal likhna zaruri hai' });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
                generationConfig: { maxOutputTokens: 2048 },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Gemini error:', JSON.stringify(data));
      return res.status(502).json({ message: 'AI abhi jawab nahi de paa raha' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(502).json({ message: 'AI se koi jawab nahi mila' });
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { chat };