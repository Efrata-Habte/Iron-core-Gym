const { GoogleGenerativeAI } = require('@google/generative-ai');

// Priority list of models based on earlier discovery
const MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-pro-latest"
];

const getModel = (modelName) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API key is not configured.');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: modelName });
};

exports.getGymAdvice = async (message) => {
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            const model = getModel(modelName);
            const prompt = `You are a professional gym trainer and nutritionist. Give concise and helpful advice about exercise and nutrition. 
            User asks: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (err) {
            lastError = err;
            console.error(`[GEMINI] Model ${modelName} failed:`, err.message);

            // If it's not a quota or model-not-found error, we might want to fail fast
            // but for safety we'll try the next model anyway.
            if (err.message.includes('API key not valid')) {
                throw new Error('Invalid Gemini API Key. Please check your .env file.');
            }
            continue; // Try next model
        }
    }

    // If we reach here, all models failed
    if (lastError && (lastError.message.includes('quota') || lastError.message.includes('429'))) {
        throw new Error('AI_QUOTA_EXHAUSTED');
    }
    throw new Error(lastError ? lastError.message : 'Failed to get advice from AI');
};
