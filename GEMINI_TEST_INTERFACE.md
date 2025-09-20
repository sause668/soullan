# 🤖 Gemini AI Test Interface

A comprehensive frontend interface for testing all Gemini AI endpoints in your Soullan application.

## 🚀 Quick Start

1. **Access the Interface**: Navigate to `/gemini-test` in your application
2. **Set up Environment**: Ensure your `GOOGLE_API_KEY` is configured
3. **Start Testing**: Use the interactive tabs to test different AI features

## 📋 Features

### **6 Test Tabs Available:**

1. **💬 Chat** - General conversation with Gemini
2. **🎓 Educational** - Educational assistance for students
3. **📊 Grade Feedback** - AI-generated grade feedback
4. **👥 Behavior Analysis** - Student behavior pattern analysis
5. **📋 Structured** - JSON-formatted responses
6. **⚙️ Custom Template** - Custom prompt templates

### **System Features:**
- **Health Check** - Test API connectivity
- **Template Browser** - View available prompt templates
- **Real-time Responses** - Live AI responses
- **Error Handling** - Comprehensive error display
- **Responsive Design** - Works on all devices

## 🎯 How to Use

### **1. Basic Chat Testing**
```
1. Go to the "💬 Chat" tab
2. Enter your message in the text area
3. Optionally add a system prompt for context
4. Click "Send Message"
5. View the AI response in real-time
```

### **2. Educational Assistant**
```
1. Go to the "🎓 Educational" tab
2. Enter a student question
3. Click "Get Educational Help"
4. Receive educational guidance from AI
```

### **3. Grade Feedback**
```
1. Go to the "📊 Grade Feedback" tab
2. Fill in:
   - Student Work Description
   - Grade Received
   - Assignment Name
3. Click "Generate Feedback"
4. Get AI-generated feedback
```

### **4. Behavior Analysis with Grades**
```
1. Go to the "👥 Behavior Analysis" tab
2. Enter behavior observations
3. Set time period
4. Enter academic performance (grades) data
5. Click "Analyze Behavior & Grades"
6. Get comprehensive AI insights on behavior and academic patterns
```

### **5. Structured Responses**
```
1. Go to the "📋 Structured" tab
2. Enter your analysis prompt
3. Click "Get Structured Response"
4. Receive JSON-formatted analysis
```

### **6. Custom Templates**
```
1. Go to the "⚙️ Custom Template" tab
2. Enter system prompt
3. Enter human prompt template
4. Add variables in JSON format
5. Click "Test Custom Template"
```

## 🔧 API Endpoints Tested

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/gemini/chat` | POST | General chat |
| `/api/gemini/educational-assistant` | POST | Educational help |
| `/api/gemini/grade-feedback` | POST | Grade feedback |
| `/api/gemini/behavior-analysis` | POST | Behavior analysis |
| `/api/gemini/structured-response` | POST | Structured responses |
| `/api/gemini/custom-template` | POST | Custom templates |
| `/api/gemini/health` | GET | Health check |
| `/api/gemini/templates` | GET | Available templates |

## 🛠️ Development Features

### **API Utility Functions**
Located in `src/utils/geminiAPI.js`:

```javascript
// Basic usage
import { chatWithGemini, getEducationalHelp } from '../utils/geminiAPI';

// Chat with AI
const response = await chatWithGemini("Hello, how are you?");

// Get educational help
const help = await getEducationalHelp("How do I solve quadratic equations?");

// Batch testing
const results = await testAllEndpoints();
```

### **Available Functions:**
- `chatWithGemini(message, systemPrompt)`
- `getEducationalHelp(question)`
- `getGradeFeedback(studentWork, grade, assignmentName)`
- `analyzeBehavior(behaviorData, timePeriod)`
- `getStructuredResponse(prompt, responseFormat)`
- `useCustomTemplate(systemPrompt, humanPrompt, variables)`
- `testAllEndpoints()`
- `checkGeminiHealth()`
- `getAvailableTemplates()`

## 🎨 Styling

The interface uses a modern gradient design with:
- **Responsive layout** for all screen sizes
- **Tabbed interface** for easy navigation
- **Real-time feedback** with loading states
- **Error handling** with clear error messages
- **Clean typography** and intuitive UI

## 🔍 Testing Scenarios

### **Educational Use Cases:**
```
1. "Explain photosynthesis to a 5th grader"
2. "Help me understand quadratic equations"
3. "What are the causes of World War II?"
4. "How do I solve this math problem: 2x + 5 = 13?"
```

### **Grade Feedback Examples:**
```
Student Work: "Student completed algebra homework with some errors"
Grade: "B+"
Assignment: "Algebra Chapter 5"
```

### **Behavior Analysis with Grades:**
```
Behavior Data: "Student was attentive during math class, participated in group work, but seemed distracted during reading time"
Time Period: "This week"
Grades Data: "Math: B+, Science: A-, English: C+, History: B"
```

## 🚨 Troubleshooting

### **Common Issues:**

1. **"Error: GOOGLE_API_KEY not found"**
   - Set your Google API key in environment variables
   - Restart your Flask application

2. **"Network Error"**
   - Check if Flask server is running
   - Verify API endpoints are accessible

3. **"Authentication Error"**
   - Ensure you're logged in to the application
   - Check Flask-Login configuration

4. **"Invalid JSON"**
   - Check your custom template variables format
   - Ensure proper JSON syntax

### **Debug Steps:**
1. Click "Test Health" to check API connectivity
2. Check browser console for detailed errors
3. Verify all required fields are filled
4. Test with simple messages first

## 📱 Mobile Support

The interface is fully responsive and works on:
- **Desktop** - Full feature set
- **Tablet** - Optimized layout
- **Mobile** - Touch-friendly interface

## 🔒 Security Notes

- All endpoints require authentication
- API keys are server-side only
- No sensitive data is stored in the frontend
- All requests are logged for debugging

## 🚀 Next Steps

1. **Test all endpoints** with the interface
2. **Integrate AI features** into your main application
3. **Customize prompts** for your specific use cases
4. **Monitor API usage** and performance
5. **Add more specialized templates** as needed

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your API key is correct
3. Test with the health check endpoint
4. Review the backend logs for detailed error messages

---

**Happy Testing! 🎉** Use this interface to explore all the AI capabilities of your Soullan application.
