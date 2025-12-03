const { useState, useEffect } = React;

// SVG Icons as components
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const CheckCircle = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Download = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const GarboAISurvey = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [allResponses, setAllResponses] = useState([]);
  const [isAdminView, setIsAdminView] = useState(false);

  const sections = [
    {
      title: "AI Experience & Comfort Level",
      questions: [
        {
          id: "q1",
          question: "How would you rate your current comfort level with AI tools and technologies?",
          type: "scale",
          required: true,
          options: ["1 - Not comfortable at all", "2 - Slightly comfortable", "3 - Moderately comfortable", "4 - Very comfortable", "5 - Extremely comfortable"]
        },
        {
          id: "q2",
          question: "What is your present understanding of the benefits AI can bring to your role/division?",
          type: "radio",
          required: true,
          options: [
            "I have no idea how we can use AI today but am excited to learn in this session!",
            "I understand how we could drive value with AI but have not determined what it could specifically do in my role/division.",
            "I have a few ideas of where AI could drive value but am unsure how to implement/what to tackle first.",
            "I have several ideas and know which would be most impactful/should be implemented first.",
            "I have several ideas that are prioritized in order and have a plan to get them implemented in the near future."
          ]
        },
        {
          id: "q3",
          question: "How excited are you about using AI in your work at Garbo?",
          type: "scale",
          required: true,
          options: ["1 - Not excited at all", "2 - Slightly excited", "3 - Moderately excited", "4 - Very excited", "5 - Extremely excited"]
        },
        {
          id: "q3a",
          question: "Why did you give this rating?",
          type: "textarea",
          required: true,
          placeholder: "Please explain your level of excitement about using AI at Garbo..."
        },
        {
          id: "q4",
          question: "What AI tools have you used at work? (Select all that apply)",
          type: "checkbox",
          required: true,
          options: ["ChatGPT", "Microsoft Co-Pilot", "Claude", "Google Gemini", "Other AI tools", "I haven't used any AI tools at work"]
        },
        {
          id: "q4a_chatgpt_version",
          question: "Which version of ChatGPT do you use?",
          type: "radio",
          required: true,
          conditional: "q4",
          conditionalValue: "ChatGPT",
          options: ["Free version", "Paid version (Plus, Team, or Enterprise)"]
        },
        {
          id: "q4a_chatgpt_difficulty",
          question: "What is the most difficult or annoying thing you have encountered when working with ChatGPT?",
          type: "textarea",
          required: false,
          conditional: "q4",
          conditionalValue: "ChatGPT",
          placeholder: "Describe any challenges or frustrations you've experienced..."
        },
        {
          id: "q4b_copilot_version",
          question: "Which version of Microsoft Co-Pilot do you use?",
          type: "radio",
          required: true,
          conditional: "q4",
          conditionalValue: "Microsoft Co-Pilot",
          options: ["Free version", "Paid version (Pro or Enterprise)"]
        },
        {
          id: "q4b_copilot_difficulty",
          question: "What is the most difficult or annoying thing you have encountered when working with Microsoft Co-Pilot?",
          type: "textarea",
          required: false,
          conditional: "q4",
          conditionalValue: "Microsoft Co-Pilot",
          placeholder: "Describe any challenges or frustrations you've experienced..."
        },
        {
          id: "q4c_claude_version",
          question: "Which version of Claude do you use?",
          type: "radio",
          required: true,
          conditional: "q4",
          conditionalValue: "Claude",
          options: ["Free version", "Paid version (Pro or Team)"]
        },
        {
          id: "q4c_claude_difficulty",
          question: "What is the most difficult or annoying thing you have encountered when working with Claude?",
          type: "textarea",
          required: false,
          conditional: "q4",
          conditionalValue: "Claude",
          placeholder: "Describe any challenges or frustrations you've experienced..."
        },
        {
          id: "q4d_other_specify",
          question: "Please specify which other AI tools you use at work:",
          type: "text",
          required: true,
          conditional: "q4",
          conditionalValue: "Other AI tools",
          placeholder: "Enter tool name(s)..."
        },
        {
          id: "q5",
          question: "What work tasks have you used AI for to date? (Select all that apply)",
          type: "checkbox",
          required: true,
          options: [
            "Drafting emails",
            "Creating presentations",
            "Research and information gathering",
            "Data analysis",
            "Writing product descriptions",
            "Generating reports",
            "Meeting summaries",
            "Creative brainstorming",
            "Translation",
            "Code or technical documentation",
            "I haven't used AI at work yet",
            "Other"
          ]
        },
        {
          id: "q5a_other",
          question: "Please specify other work tasks:",
          type: "text",
          required: true,
          conditional: "q5",
          conditionalValue: "Other",
          placeholder: "Enter other tasks..."
        }
      ]
    },
    {
      title: "Organizational AI Maturity",
      questions: [
        {
          id: "q6",
          question: "How would you rate Garbo's current AI maturity and adoption?",
          type: "radio",
          required: true,
          options: [
            "No usage currently",
            "We are experimenting with pilots and tools",
            "We have deployed some tools that people are using",
            "We have multiple tools and projects running that actively make the organization more efficient",
            "We are leveraging AI at the core of our organization to make us better in every department"
          ]
        },
        {
          id: "q7",
          question: "How well set up is Garbo to leverage AI?",
          type: "scale",
          required: true,
          options: ["1 - Not at all", "2 - Minimally", "3 - Moderately well", "4 - Very well", "5 - Extremely well"]
        },
        {
          id: "q8",
          question: "In your view, what is the greatest potential benefit of AI for our organization?",
          type: "radio",
          required: true,
          options: [
            "Improving operational efficiency",
            "Reducing costs / waste",
            "Enhancing customer experience",
            "Driving innovation / new services",
            "Improving decision-making with better data insights",
            "Other"
          ]
        },
        {
          id: "q8a_other",
          question: "Please specify the greatest potential benefit:",
          type: "text",
          required: true,
          conditional: "q8",
          conditionalValue: "Other",
          placeholder: "Describe the greatest potential benefit..."
        },
        {
          id: "q9",
          question: "What barriers currently exist to using AI more effectively at Garbo? (Select all that apply)",
          type: "checkbox",
          required: true,
          options: [
            "Lack of training or knowledge",
            "Unclear use cases or applications",
            "No access to AI tools",
            "Time constraints",
            "Data security or privacy concerns",
            "Lack of leadership support",
            "Unclear ROI or business value",
            "Integration with existing systems",
            "Other"
          ]
        },
        {
          id: "q9a_other",
          question: "Please specify other barriers:",
          type: "text",
          required: true,
          conditional: "q9",
          conditionalValue: "Other",
          placeholder: "Describe other barriers..."
        }
      ]
    },
    {
      title: "Workflow and Operations Analysis",
      questions: [
        {
          id: "q10",
          question: "What are the most time-consuming and repetitive tasks in your role/department? Describe 2-3 tasks max in 1-2 sentences each.",
          type: "textarea",
          required: true,
          placeholder: "List 2-3 time-consuming repetitive tasks, each described in 1-2 sentences..."
        },
        {
          id: "q11",
          question: "For each of these tasks, outline what the impact would be on the organization if this bottleneck was to disappear:",
          type: "textarea",
          required: true,
          placeholder: "Describe the organizational impact if these bottlenecks were eliminated..."
        },
        {
          id: "q12",
          question: "Why do these bottlenecks still exist?",
          type: "textarea",
          required: true,
          placeholder: "Explain why these time-consuming tasks haven't been addressed yet..."
        }
      ]
    },
    {
      title: "Learning Objectives & Expectations",
      questions: [
        {
          id: "q13",
          question: "What would make this session successful for you?",
          type: "textarea",
          required: true,
          placeholder: "What outcomes, learnings, or takeaways would make this day valuable for you?"
        },
        {
          id: "q14",
          question: "What would make this session feel like a waste of time?",
          type: "textarea",
          required: true,
          placeholder: "What would disappoint you or make you feel the session wasn't worthwhile?"
        }
      ]
    },
    {
      title: "Personal Information",
      questions: [
        {
          id: "q15",
          question: "First Name",
          type: "text",
          required: true,
          placeholder: "Enter your first name"
        },
        {
          id: "q16",
          question: "Last Name",
          type: "text",
          required: true,
          placeholder: "Enter your last name"
        },
        {
          id: "q17",
          question: "Department/Function",
          type: "radio",
          required: true,
          options: [
            "Design",
            "Product Development",
            "Supply Chain/Operations",
            "Sales",
            "Marketing",
            "Finance",
            "IT",
            "HR",
            "Executive/Leadership",
            "Other"
          ]
        },
        {
          id: "q17a_other",
          question: "Please specify your department:",
          type: "text",
          required: true,
          conditional: "q17",
          conditionalValue: "Other",
          placeholder: "Enter your department..."
        },
        {
          id: "q18",
          question: "Seniority Level",
          type: "radio",
          required: true,
          options: [
            "Individual Contributor",
            "Team Lead/Supervisor",
            "Manager",
            "Senior Manager/Director",
            "VP/C-Suite"
          ]
        }
      ]
    }
  ];

  const updateResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;
    const conditionalResponse = responses[question.conditional];
    if (Array.isArray(conditionalResponse)) {
      return conditionalResponse.includes(question.conditionalValue);
    }
    return conditionalResponse === question.conditionalValue;
  };

  const renderQuestion = (question) => {
    if (!shouldShowQuestion(question)) return null;

    const commonClasses = "mt-2";

    switch (question.type) {
      case "scale":
      case "radio":
        return (
          <div className={commonClasses}>
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-start space-x-3 p-3 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => updateResponse(question.id, e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className={commonClasses}>
            {question.maxSelections && (
              <p className="text-sm text-gray-600 mb-2 italic">Select up to {question.maxSelections}</p>
            )}
            {question.options.map((option, idx) => {
              const currentSelections = responses[question.id] || [];
              const isChecked = currentSelections.includes(option);
              const maxReached = question.maxSelections && currentSelections.length >= question.maxSelections;
              
              return (
                <label 
                  key={idx} 
                  className={`flex items-start space-x-3 p-3 rounded cursor-pointer ${
                    maxReached && !isChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={isChecked}
                    disabled={maxReached && !isChecked}
                    onChange={(e) => {
                      const current = responses[question.id] || [];
                      if (e.target.checked) {
                        updateResponse(question.id, [...current, option]);
                      } else {
                        updateResponse(question.id, current.filter(v => v !== option));
                      }
                    }}
                    className="mt-1 h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              );
            })}
          </div>
        );

      case "text":
        return (
          <input
            type="text"
            value={responses[question.id] || ''}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case "textarea":
        return (
          <textarea
            value={responses[question.id] || ''}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      default:
        return null;
    }
  };

  const isQuestionAnswered = (question) => {
    if (!question.required) return true;
    if (!shouldShowQuestion(question)) return true;
    
    const answer = responses[question.id];
    if (question.type === "checkbox") {
      return answer && answer.length > 0;
    }
    return answer && answer.trim().length > 0;
  };

  const isSectionComplete = (sectionIndex) => {
    return sections[sectionIndex].questions
      .filter(q => shouldShowQuestion(q))
      .every(q => isQuestionAnswered(q));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      ...responses,
      submittedAt: new Date().toISOString()
    };
    
    const updatedResponses = [...allResponses, submissionData];
    setAllResponses(updatedResponses);
    
    try {
      const stored = JSON.parse(localStorage.getItem('garboSurveyResponses') || '[]');
      stored.push(submissionData);
      localStorage.setItem('garboSurveyResponses', JSON.stringify(stored));
    } catch (e) {
      console.error('Error storing response:', e);
    }
    
    console.log("Survey Responses:", submissionData);
    setSubmitted(true);
  };

  const downloadCSV = () => {
    let dataToExport = allResponses;
    try {
      const stored = JSON.parse(localStorage.getItem('garboSurveyResponses') || '[]');
      dataToExport = stored.length > 0 ? stored : allResponses;
    } catch (e) {
      console.error('Error loading responses:', e);
    }

    if (dataToExport.length === 0) {
      alert('No survey responses to download yet.');
      return;
    }

    const allKeys = new Set();
    dataToExport.forEach(response => {
      Object.keys(response).forEach(key => allKeys.add(key));
    });

    const headers = Array.from(allKeys);
    const csvRows = [headers.join(',')];

    dataToExport.forEach(response => {
      const values = headers.map(header => {
        const value = response[header] || '';
        const stringValue = Array.isArray(value) ? value.join('; ') : value;
        const escaped = stringValue.toString().replace(/"/g, '""');
        return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') 
          ? `"${escaped}"` 
          : escaped;
      });
      csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `garbo-ai-survey-results-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminView(true);
      try {
        const stored = JSON.parse(localStorage.getItem('garboSurveyResponses') || '[]');
        setAllResponses(stored);
      } catch (e) {
        console.error('Error loading responses:', e);
      }
    }
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4 text-green-500">
            <CheckCircle />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your responses have been submitted successfully. We look forward to seeing you at the AI Immersion Day!
          </p>
          <p className="text-gray-500">
            Your insights will help us tailor the session to meet everyone's needs and identify the most impactful AI use cases for Garbo Group.
          </p>
        </div>
      </div>
    );
  }

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Survey Administration</h1>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Total Responses</h3>
                  <p className="text-3xl font-bold text-blue-600">{allResponses.length}</p>
                </div>
                <button
                  onClick={downloadCSV}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
                >
                  <Download />
                  <span className="ml-2">Download CSV</span>
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Share the survey URL (without ?admin=true) with employees</li>
                  <li>Return to this admin page anytime by adding ?admin=true to the URL</li>
                  <li>Click "Download CSV" to export all responses</li>
                  <li>Responses are stored in browser localStorage</li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all responses? This cannot be undone.')) {
                      localStorage.removeItem('garboSurveyResponses');
                      setAllResponses([]);
                      alert('All responses have been cleared.');
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all"
                >
                  Clear All Responses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const visibleQuestions = currentSectionData.questions.filter(shouldShowQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-900">Garbo Group</h2>
            <span className="text-sm text-gray-500">
              Section {currentSection + 1} of {sections.length}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Immersion Day Pre-Survey
          </h1>
          <p className="text-gray-600">
            Help us understand your AI experience and identify opportunities for Garbo Group
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                  idx < currentSection
                    ? 'bg-green-500'
                    : idx === currentSection
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            {sections.map((section, idx) => (
              <span key={idx} className={idx === currentSection ? 'font-semibold' : ''}>
                {section.title}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentSectionData.title}
          </h2>
          
          <div className="space-y-8">
            {visibleQuestions.map((question, idx) => (
              <div key={question.id} className="pb-6 border-b border-gray-200 last:border-0">
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-gray-500 mr-3 mt-1">
                    {idx + 1}.
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                      {!question.required && <span className="text-gray-400 text-sm ml-2">(Optional)</span>}
                    </h3>
                    {renderQuestion(question)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <ChevronLeft />
            <span className="ml-2">Previous</span>
          </button>

          {currentSection < sections.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isSectionComplete(currentSection)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                isSectionComplete(currentSection)
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="mr-2">Next</span>
              <ChevronRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isSectionComplete(currentSection)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                isSectionComplete(currentSection)
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="mr-2">Submit Survey</span>
              <CheckCircle />
            </button>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Estimated completion time: 10-12 minutes</p>
          <p className="mt-1">All responses are confidential and will be used to improve the AI Immersion Day experience</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<GarboAISurvey />, document.getElementById('root'));
