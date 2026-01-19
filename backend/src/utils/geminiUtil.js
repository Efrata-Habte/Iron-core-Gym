const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getGymAdvice = async (message) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a professional gym trainer and nutritionist. Give concise and helpful advice about exercise and nutrition. 
        User asks: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error('Gemini API Error:', err);
        throw new Error('Failed to get advice from AI');
    }
};
