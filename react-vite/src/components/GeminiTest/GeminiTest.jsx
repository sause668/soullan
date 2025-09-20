import React, { useState } from 'react';
import './GeminiTest.css';

const GeminiTest = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});

  // State for different test types
  const [chatMessage, setChatMessage] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [educationalQuestion, setEducationalQuestion] = useState('');
  const [studentWork, setStudentWork] = useState('');
  const [grade, setGrade] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [behaviorData, setBehaviorData] = useState('');
  const [timePeriod, setTimePeriod] = useState('Last week');
  const [gradesData, setGradesData] = useState('');
  const [structuredPrompt, setStructuredPrompt] = useState('');
  const [customSystemPrompt, setCustomSystemPrompt] = useState('');
  const [customHumanPrompt, setCustomHumanPrompt] = useState('');
  const [customVariables, setCustomVariables] = useState('');

  // API call function
  const callGeminiAPI = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gemini/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setResponses(prev => ({
          ...prev,
          [endpoint]: result.response
        }));
      } else {
        setResponses(prev => ({
          ...prev,
          [endpoint]: `Error: ${result.error || 'Unknown error'}`
        }));
      }
    } catch (error) {
      setResponses(prev => ({
        ...prev,
        [endpoint]: `Network Error: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  // Test functions for each endpoint
  const testChat = () => {
    const data = { message: chatMessage };
    if (systemPrompt) data.system_prompt = systemPrompt;
    callGeminiAPI('chat', data);
  };

  const testEducationalAssistant = () => {
    callGeminiAPI('educational-assistant', { question: educationalQuestion });
  };

  const testGradeFeedback = () => {
    callGeminiAPI('grade-feedback', {
      student_work: studentWork,
      grade: grade,
      assignment_name: assignmentName
    });
  };

  const testBehaviorAnalysis = () => {
    callGeminiAPI('behavior-analysis', {
      behavior_data: behaviorData,
      time_period: timePeriod,
      grades_data: gradesData || 'No grade data provided'
    });
  };

  const testStructuredResponse = () => {
    const responseFormat = {
      summary: "Brief summary",
      strengths: "List of strengths",
      improvements: "Areas for improvement",
      recommendations: "Actionable recommendations"
    };
    callGeminiAPI('structured-response', {
      prompt: structuredPrompt,
      response_format: responseFormat
    });
  };

  const testCustomTemplate = () => {
    let variables = {};
    try {
      if (customVariables.trim()) {
        variables = JSON.parse(customVariables);
      }
    } catch (e) {
      alert('Invalid JSON in variables field');
      return;
    }

    callGeminiAPI('custom-template', {
      system_prompt: customSystemPrompt,
      human_prompt: customHumanPrompt,
      variables: variables
    });
  };

  const testHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/health');
      const result = await response.json();
      setResponses(prev => ({
        ...prev,
        health: JSON.stringify(result, null, 2)
      }));
    } catch (error) {
      setResponses(prev => ({
        ...prev,
        health: `Error: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const testTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/templates');
      const result = await response.json();
      setResponses(prev => ({
        ...prev,
        templates: JSON.stringify(result, null, 2)
      }));
    } catch (error) {
      setResponses(prev => ({
        ...prev,
        templates: `Error: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = (endpoint) => {
    setResponses(prev => {
      const newResponses = { ...prev };
      delete newResponses[endpoint];
      return newResponses;
    });
  };

  const clearAllResponses = () => {
    setResponses({});
  };

  return (
    <div className="gemini-test-container">
      <div className="gemini-test-header">
        <h1>🤖 Gemini AI Test Interface</h1>
        <p>Test all Gemini API endpoints with this interactive interface</p>
        <div className="test-controls">
          <button onClick={testHealth} disabled={loading} className="test-btn health-btn">
            Test Health
          </button>
          <button onClick={testTemplates} disabled={loading} className="test-btn templates-btn">
            Get Templates
          </button>
          <button onClick={clearAllResponses} className="test-btn clear-btn">
            Clear All
          </button>
        </div>
      </div>

      <div className="gemini-test-tabs">
        <button 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
        <button 
          className={`tab-btn ${activeTab === 'educational' ? 'active' : ''}`}
          onClick={() => setActiveTab('educational')}
        >
          🎓 Educational
        </button>
        <button 
          className={`tab-btn ${activeTab === 'grade' ? 'active' : ''}`}
          onClick={() => setActiveTab('grade')}
        >
          📊 Grade Feedback
        </button>
        <button 
          className={`tab-btn ${activeTab === 'behavior' ? 'active' : ''}`}
          onClick={() => setActiveTab('behavior')}
        >
          👥 Behavior Analysis
        </button>
        <button 
          className={`tab-btn ${activeTab === 'structured' ? 'active' : ''}`}
          onClick={() => setActiveTab('structured')}
        >
          📋 Structured
        </button>
        <button 
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          ⚙️ Custom Template
        </button>
      </div>

      <div className="gemini-test-content">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="test-section">
            <h3>General Chat</h3>
            <div className="input-group">
              <label>Message:</label>
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows="3"
              />
            </div>
            <div className="input-group">
              <label>System Prompt (optional):</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Optional system context..."
                rows="2"
              />
            </div>
            <button onClick={testChat} disabled={loading || !chatMessage} className="test-btn">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {responses.chat && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('chat')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">{responses.chat}</div>
              </div>
            )}
          </div>
        )}

        {/* Educational Tab */}
        {activeTab === 'educational' && (
          <div className="test-section">
            <h3>Educational Assistant</h3>
            <div className="input-group">
              <label>Question:</label>
              <textarea
                value={educationalQuestion}
                onChange={(e) => setEducationalQuestion(e.target.value)}
                placeholder="Ask an educational question..."
                rows="3"
              />
            </div>
            <button onClick={testEducationalAssistant} disabled={loading || !educationalQuestion} className="test-btn">
              {loading ? 'Processing...' : 'Get Educational Help'}
            </button>
            {responses['educational-assistant'] && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('educational-assistant')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">{responses['educational-assistant']}</div>
              </div>
            )}
          </div>
        )}

        {/* Grade Feedback Tab */}
        {activeTab === 'grade' && (
          <div className="test-section">
            <h3>Grade Feedback</h3>
            <div className="input-group">
              <label>Student Work:</label>
              <textarea
                value={studentWork}
                onChange={(e) => setStudentWork(e.target.value)}
                placeholder="Describe the student's work..."
                rows="3"
              />
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Grade:</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g., B+, 85, A-"
                />
              </div>
              <div className="input-group">
                <label>Assignment Name:</label>
                <input
                  type="text"
                  value={assignmentName}
                  onChange={(e) => setAssignmentName(e.target.value)}
                  placeholder="e.g., Math Homework"
                />
              </div>
            </div>
            <button onClick={testGradeFeedback} disabled={loading || !studentWork || !grade || !assignmentName} className="test-btn">
              {loading ? 'Generating...' : 'Generate Feedback'}
            </button>
            {responses['grade-feedback'] && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('grade-feedback')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">{responses['grade-feedback']}</div>
              </div>
            )}
          </div>
        )}

        {/* Behavior Analysis Tab */}
        {activeTab === 'behavior' && (
          <div className="test-section">
            <h3>Behavior Analysis with Grades</h3>
            <div className="input-group">
              <label>Behavior Data:</label>
              <textarea
                value={behaviorData}
                onChange={(e) => setBehaviorData(e.target.value)}
                placeholder="Enter behavior observations..."
                rows="3"
              />
            </div>
            <div className="input-group">
              <label>Time Period:</label>
              <input
                type="text"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="e.g., Last week, This month"
              />
            </div>
            <div className="input-group">
              <label>Academic Performance (Grades):</label>
              <textarea
                value={gradesData}
                onChange={(e) => setGradesData(e.target.value)}
                placeholder="Enter grade information, e.g., 'Math: B+, Science: A-, English: C+, History: B' or 'Recent test scores: 85, 92, 78, 88'"
                rows="3"
              />
            </div>
            <div className="info-box">
              <p><strong>Grade Data Examples:</strong></p>
              <ul style={{margin: '10px 0', paddingLeft: '20px'}}>
                <li>Subject grades: "Math: B+, Science: A-, English: C+"</li>
                <li>Test scores: "Recent tests: 85, 92, 78, 88"</li>
                <li>Assignment grades: "Homework: A, Quiz: B-, Project: A+"</li>
                <li>Overall performance: "Quarter 1: B+, Quarter 2: A-"</li>
              </ul>
            </div>
            <button onClick={testBehaviorAnalysis} disabled={loading || !behaviorData} className="test-btn">
              {loading ? 'Analyzing...' : 'Analyze Behavior & Grades'}
            </button>
            {responses['behavior-analysis'] && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('behavior-analysis')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">{responses['behavior-analysis']}</div>
              </div>
            )}
          </div>
        )}

        {/* Structured Response Tab */}
        {activeTab === 'structured' && (
          <div className="test-section">
            <h3>Structured Response</h3>
            <div className="input-group">
              <label>Prompt:</label>
              <textarea
                value={structuredPrompt}
                onChange={(e) => setStructuredPrompt(e.target.value)}
                placeholder="Enter your prompt for structured analysis..."
                rows="3"
              />
            </div>
            <div className="info-box">
              <p><strong>Response Format:</strong> summary, strengths, improvements, recommendations</p>
            </div>
            <button onClick={testStructuredResponse} disabled={loading || !structuredPrompt} className="test-btn">
              {loading ? 'Processing...' : 'Get Structured Response'}
            </button>
            {responses['structured-response'] && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('structured-response')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">
                  <pre>{JSON.stringify(JSON.parse(responses['structured-response']), null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Template Tab */}
        {activeTab === 'custom' && (
          <div className="test-section">
            <h3>Custom Template</h3>
            <div className="input-group">
              <label>System Prompt:</label>
              <textarea
                value={customSystemPrompt}
                onChange={(e) => setCustomSystemPrompt(e.target.value)}
                placeholder="You are a helpful assistant..."
                rows="2"
              />
            </div>
            <div className="input-group">
              <label>Human Prompt Template:</label>
              <textarea
                value={customHumanPrompt}
                onChange={(e) => setCustomHumanPrompt(e.target.value)}
                placeholder="Answer this: {question}"
                rows="2"
              />
            </div>
            <div className="input-group">
              <label>Variables (JSON):</label>
              <textarea
                value={customVariables}
                onChange={(e) => setCustomVariables(e.target.value)}
                placeholder='{"question": "What is 2+2?"}'
                rows="2"
              />
            </div>
            <button onClick={testCustomTemplate} disabled={loading || !customSystemPrompt || !customHumanPrompt} className="test-btn">
              {loading ? 'Processing...' : 'Test Custom Template'}
            </button>
            {responses['custom-template'] && (
              <div className="response-section">
                <div className="response-header">
                  <h4>Response:</h4>
                  <button onClick={() => clearResponse('custom-template')} className="clear-response-btn">×</button>
                </div>
                <div className="response-content">{responses['custom-template']}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global Response Display */}
      {(responses.health || responses.templates) && (
        <div className="global-responses">
          <h3>System Responses</h3>
          {responses.health && (
            <div className="response-section">
              <div className="response-header">
                <h4>Health Check:</h4>
                <button onClick={() => clearResponse('health')} className="clear-response-btn">×</button>
              </div>
              <div className="response-content">
                <pre>{responses.health}</pre>
              </div>
            </div>
          )}
          {responses.templates && (
            <div className="response-section">
              <div className="response-header">
                <h4>Available Templates:</h4>
                <button onClick={() => clearResponse('templates')} className="clear-response-btn">×</button>
              </div>
              <div className="response-content">
                <pre>{responses.templates}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiTest;
