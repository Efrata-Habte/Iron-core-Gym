# 07. AI Chatbot

## Purpose
An intelligent assistant powered by Google Gemini AI. It answers user questions about workouts, nutrition, and gym plans.

## Frontend Components
- **`home/Chatbot.jsx`**: A floating chat interface.
  - Handles opening/closing the chat window.
  - Maintains the list of messages (User vs. AI).
  - Sends the user's message to the backend.

## Backend Endpoints (`routes/aiRoutes.js`)

### 1. Chat with AI
- **Endpoint**: `POST /api/ai/chat`
- **Controller**: `aiChatbotController.chat`
- **Input**: `{ "message": "How do I build muscle?" }`
- **Logic**:
  1.  Calls `geminiUtil.getGymAdvice(message)`.
  2.  **Gemini Utils**:
      - Initializes `GoogleGenerativeAI` with the API Key.
      - Uses model `gemini-1.5-flash` (or configured fallback).
      - Sends a prompt: "You are a professional gym trainer... User asks: [message]".
      - Returns the AI's text response.
- **Output**: `{ "reply": "To build muscle, focus on hypertrophy..." }`

## External Service: Google Gemini
- We use the `@google/generative-ai` library.
- **API Key**: Stored in `.env` as `GEMINI_API_KEY`.
- **Model Fallback**: The utility has a list of models it tries in order if one fails (e.g., due to quota).

## Flow: Asking a Question
1.  **User** types "Best protein for weight loss?" and hits Send.
2.  **Frontend** shows the user's message instantly.
3.  **API**: Frontend POSTs the message to `/api/ai/chat`.
4.  **Backend**:
    - Wraps the question in a specific "Persona Prompt" (Training/Nutrition context).
    - Calls Google's API.
5.  **Response**: Google responds with advice.
6.  **UI**: Backend sends the text back, and the Frontend displays the AI's reply bubble.
