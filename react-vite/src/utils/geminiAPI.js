/**
 * Gemini API utility functions
 * Provides easy-to-use functions for calling Gemini endpoints
 */

const GEMINI_BASE_URL = '/api/gemini';

/**
 * Generic API call function
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - Request data
 * @returns {Promise<Object>} API response
 */
const callGeminiAPI = async (endpoint, data = {}) => {
  try {
    const response = await fetch(`${GEMINI_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error(`Gemini API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Health check for Gemini service
 * @returns {Promise<Object>} Health status
 */
export const checkGeminiHealth = async () => {
  try {
    const response = await fetch(`${GEMINI_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

/**
 * Get available templates
 * @returns {Promise<Object>} Available templates
 */
export const getAvailableTemplates = async () => {
  try {
    const response = await fetch(`${GEMINI_BASE_URL}/templates`);
    return await response.json();
  } catch (error) {
    console.error('Templates fetch error:', error);
    throw error;
  }
};

/**
 * General chat with Gemini
 * @param {string} message - User message
 * @param {string} systemPrompt - Optional system prompt
 * @returns {Promise<string>} AI response
 */
export const chatWithGemini = async (message, systemPrompt = null) => {
  const data = { message };
  if (systemPrompt) data.system_prompt = systemPrompt;
  
  const result = await callGeminiAPI('chat', data);
  return result.response;
};

/**
 * Educational assistant
 * @param {string} question - Student question
 * @returns {Promise<string>} Educational response
 */
export const getEducationalHelp = async (question) => {
  const result = await callGeminiAPI('educational-assistant', { question });
  return result.response;
};

/**
 * Generate grade feedback
 * @param {string} studentWork - Description of student work
 * @param {string} grade - Grade received
 * @param {string} assignmentName - Name of assignment
 * @returns {Promise<string>} Feedback response
 */
export const getGradeFeedback = async (studentWork, grade, assignmentName) => {
  const result = await callGeminiAPI('grade-feedback', {
    student_work: studentWork,
    grade: grade,
    assignment_name: assignmentName
  });
  return result.response;
};

/**
 * Analyze behavior patterns with academic performance
 * @param {string} behaviorData - Behavior observations
 * @param {string} timePeriod - Time period for analysis
 * @param {string} gradesData - Academic performance data
 * @returns {Promise<string>} Analysis response
 */
export const analyzeBehavior = async (behaviorData, timePeriod = 'Recent period', gradesData = null) => {
  const data = {
    behavior_data: behaviorData,
    time_period: timePeriod
  };
  
  if (gradesData) {
    data.grades_data = gradesData;
  }
  
  const result = await callGeminiAPI('behavior-analysis', data);
  return result.response;
};

/**
 * Get structured JSON response
 * @param {string} prompt - User prompt
 * @param {Object} responseFormat - Expected response format
 * @returns {Promise<Object>} Structured response
 */
export const getStructuredResponse = async (prompt, responseFormat) => {
  const result = await callGeminiAPI('structured-response', {
    prompt,
    response_format: responseFormat
  });
  return result.response;
};

/**
 * Use custom template
 * @param {string} systemPrompt - System prompt
 * @param {string} humanPrompt - Human prompt template
 * @param {Object} variables - Variables to fill template
 * @returns {Promise<string>} Generated response
 */
export const useCustomTemplate = async (systemPrompt, humanPrompt, variables = {}) => {
  const result = await callGeminiAPI('custom-template', {
    system_prompt: systemPrompt,
    human_prompt: humanPrompt,
    variables
  });
  return result.response;
};

/**
 * Batch API calls for testing multiple endpoints
 * @param {Array} requests - Array of request objects
 * @returns {Promise<Array>} Array of responses
 */
export const batchGeminiRequests = async (requests) => {
  const promises = requests.map(async (request) => {
    try {
      const result = await callGeminiAPI(request.endpoint, request.data);
      return {
        endpoint: request.endpoint,
        success: true,
        response: result.response,
        error: null
      };
    } catch (error) {
      return {
        endpoint: request.endpoint,
        success: false,
        response: null,
        error: error.message
      };
    }
  });

  return Promise.all(promises);
};

/**
 * Test all Gemini endpoints
 * @returns {Promise<Object>} Test results
 */
export const testAllEndpoints = async () => {
  const testRequests = [
    {
      endpoint: 'chat',
      data: { message: 'Hello, this is a test message.' }
    },
    {
      endpoint: 'educational-assistant',
      data: { question: 'What is 2+2?' }
    },
    {
      endpoint: 'grade-feedback',
      data: {
        student_work: 'Student completed math homework',
        grade: 'B+',
        assignment_name: 'Math Homework'
      }
    },
    {
      endpoint: 'behavior-analysis',
      data: {
        behavior_data: 'Student was attentive and participated well',
        time_period: 'Today',
        grades_data: 'Math: B+, Science: A-, English: C+'
      }
    }
  ];

  const results = await batchGeminiRequests(testRequests);
  
  return {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results
  };
};

/**
 * Create a conversation context for multiple related questions
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<string>} Contextual response
 */
export const contextualChat = async (messages) => {
  // Convert messages to a single conversation prompt
  const conversationPrompt = messages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n\n');
  
  return await chatWithGemini(conversationPrompt, 'You are having a conversation. Respond naturally to the context provided.');
};

/**
 * Generate educational content for specific subjects
 * @param {string} subject - Subject area
 * @param {string} topic - Specific topic
 * @param {string} level - Difficulty level
 * @returns {Promise<string>} Educational content
 */
export const generateEducationalContent = async (subject, topic, level = 'beginner') => {
  const prompt = `Create educational content about ${topic} in ${subject} for ${level} level students. Include explanations, examples, and key concepts.`;
  
  return await getEducationalHelp(prompt);
};

/**
 * Analyze student performance across multiple assignments
 * @param {Array} assignments - Array of assignment data
 * @returns {Promise<Object>} Performance analysis
 */
export const analyzeStudentPerformance = async (assignments) => {
  const assignmentData = assignments.map(a => 
    `${a.name}: ${a.grade} (${a.type})`
  ).join('\n');
  
  const prompt = `Analyze this student's performance across these assignments:\n${assignmentData}`;
  
  const responseFormat = {
    overall_performance: 'string',
    strengths: 'array',
    areas_for_improvement: 'array',
    recommendations: 'array',
    trend_analysis: 'string'
  };
  
  return await getStructuredResponse(prompt, responseFormat);
};

export default {
  checkGeminiHealth,
  getAvailableTemplates,
  chatWithGemini,
  getEducationalHelp,
  getGradeFeedback,
  analyzeBehavior,
  getStructuredResponse,
  useCustomTemplate,
  batchGeminiRequests,
  testAllEndpoints,
  contextualChat,
  generateEducationalContent,
  analyzeStudentPerformance
};
