const { getGymAdvice } = require('../utils/geminiUtil');

exports.chat = async (req, res) => {
    try {
        const { message } = req.body;
        const reply = await getGymAdvice(message);
        res.json({ reply });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
