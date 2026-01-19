# Iron Core Gym API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Full Name",
    "email": "email@example.com",
    "password": "password",
    "phone": "+251...",
    "paymentMethod": "telebirr",
    "membershipPlan": "PlanID"
  }
  ```

### Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "email@example.com",
    "password": "password"
  }
  ```

## Plans

### Get All Plans
- **Endpoint**: `GET /plans`

## Trainers

### Get All Trainers
- **Endpoint**: `GET /trainers`

## Gallery

### Get All Images
- **Endpoint**: `GET /gallery`

### Upload Image
- **Endpoint**: `POST /gallery`
- **Body**: Multipart/form-data
  - `image`: File
  - `title`: String
  - `category`: String

## Contact

### Send Message
- **Endpoint**: `POST /contact`
- **Body**:
  ```json
  {
    "name": "Name",
    "email": "email",
    "msg": "Message"
  }
  ```

## AI Chatbot

### Get Fitness Advice
- **Endpoint**: `POST /ai/chat`
- **Body**:
  ```json
  {
    "message": "How to lose weight?"
  }
  ```
