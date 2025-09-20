# Gemini AI Integration with Langchain

This document explains how to set up and use the Gemini AI integration in your Soullan application.

## Overview

The Gemini integration provides AI-powered features using Google's Gemini 2.5 Flash model via Langchain. It includes:

- **GeminiService**: Core service for interacting with Gemini AI
- **API Routes**: RESTful endpoints for frontend integration
- **Prompt Templates**: Predefined templates for common use cases
- **Structured Responses**: JSON-formatted AI responses

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```bash
# Gemini AI Configuration
GOOGLE_API_KEY=your-google-api-key-here
GEMINI_MODEL=gemini-2.0-flash-exp
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048
```

### 2. Install Dependencies

The required dependencies are already added to `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 3. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

## API Endpoints

All endpoints are prefixed with `/api/gemini` and require authentication.

### 1. General Chat
**POST** `/api/gemini/chat`

```json
{
  "message": "Your question here",
  "system_prompt": "Optional system context"
}
```

### 2. Educational Assistant
**POST** `/api/gemini/educational-assistant`

```json
{
  "question": "How do I solve this math problem?"
}
```

### 3. Grade Feedback
**POST** `/api/gemini/grade-feedback`

```json
{
  "student_work": "Student's work description",
  "grade": "B+",
  "assignment_name": "Math Homework"
}
```

### 4. Behavior Analysis
**POST** `/api/gemini/behavior-analysis`

```json
{
  "behavior_data": "Student behavior observations",
  "time_period": "Last week",
  "grades_data": "Math: B+, Science: A-, English: C+"
}
```

### 5. Structured Response
**POST** `/api/gemini/structured-response`

```json
{
  "prompt": "Analyze this student's performance",
  "response_format": {
    "strengths": "string",
    "improvements": "string",
    "recommendations": "string"
  }
}
```

### 6. Custom Template
**POST** `/api/gemini/custom-template`

```json
{
  "system_prompt": "You are a helpful assistant",
  "human_prompt": "Answer this: {question}",
  "variables": {
    "question": "What is 2+2?"
  }
}
```

### 7. Health Check
**GET** `/api/gemini/health`

### 8. Available Templates
**GET** `/api/gemini/templates`

## Frontend Integration

### Example React Component

```jsx
import React, { useState } from 'react';

const GeminiChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Gemini anything..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {response && <div>{response}</div>}
    </div>
  );
};

export default GeminiChat;
```

### Example Educational Assistant

```jsx
const EducationalAssistant = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const res = await fetch('/api/gemini/educational-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    
    const data = await res.json();
    setAnswer(data.response);
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask an educational question..."
      />
      <button onClick={askQuestion}>Get Help</button>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
};
```

## Enhanced Behavior Analysis

The behavior analysis now includes academic performance data to provide more comprehensive insights:

### **Behavior Analysis with Grades:**
```json
{
  "behavior_data": "Student was attentive during math class, participated in group work, but seemed distracted during reading time",
  "time_period": "This week",
  "grades_data": "Math: B+, Science: A-, English: C+, History: B"
}
```

### **Grade Data Examples:**
- **Subject grades**: "Math: B+, Science: A-, English: C+"
- **Test scores**: "Recent tests: 85, 92, 78, 88"
- **Assignment grades**: "Homework: A, Quiz: B-, Project: A+"
- **Overall performance**: "Quarter 1: B+, Quarter 2: A-"

### **AI Analysis Includes:**
1. **Behavioral patterns** and trends
2. **Academic performance** patterns and correlations
3. **Potential concerns** or positive developments (both behavioral and academic)
4. **Recommendations** for educators based on both behavior and academic performance
5. **Student support suggestions** that address both behavioral and academic needs
6. **Correlations** between behavior and academic performance

## Service Usage

### Direct Service Usage

```python
from app.services.gemini_service import get_gemini_service, PromptTemplates

# Get the service instance
gemini_service = get_gemini_service()

# Simple chat
response = gemini_service.generate_response("Hello, how are you?")

# Using templates
template = PromptTemplates.get_educational_assistant_template()
response = gemini_service.generate_with_template(
    template, 
    question="How do I solve quadratic equations?"
)

# Structured response
format_spec = {
    "summary": "string",
    "key_points": "array",
    "recommendations": "array"
}
response = gemini_service.generate_structured_response(
    "Analyze this student's essay",
    format_spec
)
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": "error"
}
```

Common error scenarios:
- Missing API key
- Invalid request format
- Gemini API errors
- Network issues

## Best Practices

1. **Rate Limiting**: Implement rate limiting for production use
2. **Caching**: Cache responses for repeated queries
3. **Validation**: Validate input data before sending to Gemini
4. **Error Handling**: Always handle API errors gracefully
5. **Security**: Keep API keys secure and never expose them

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `GOOGLE_API_KEY` is set in environment
   - Check if the key is valid

2. **Import Errors**
   - Install all dependencies: `pip install -r requirements.txt`
   - Check Python version compatibility

3. **Authentication Errors**
   - Ensure user is logged in
   - Check Flask-Login configuration

4. **Template Errors**
   - Verify all required variables are provided
   - Check template syntax

## Development

### Adding New Templates

1. Add new template method to `PromptTemplates` class
2. Create corresponding API endpoint
3. Update documentation

### Testing

```python
# Test the service
from app.services.gemini_service import get_gemini_service

service = get_gemini_service()
response = service.generate_response("Test message")
print(response)
```

## Production Considerations

1. **Environment Variables**: Use secure environment variable management
2. **API Limits**: Monitor Google API usage and limits
3. **Logging**: Implement proper logging for debugging
4. **Monitoring**: Set up monitoring for API health
5. **Backup**: Have fallback responses for API failures
