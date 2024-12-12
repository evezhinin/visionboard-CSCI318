import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuestionsPage.css';

const questionsByCategory = {
  Education: [
    "What academic goals are you working toward (e.g., degrees, certifications)?",
    "What kind of learning environment inspires you (e.g., libraries, online classes)?",
    "Are there any books or subjects you want to explore?",
  ],
  Career: [
    "What is your dream job or career field?",
    "What professional skills do you want to improve?",
    "Is there a particular workspace that motivates you (e.g., home office, corporate office)?",
  ],
  Travel: [
    "What places do you want to visit?",
    "What type of scenery do you enjoy most (e.g., beaches, mountains, cities)?",
    " What type of travel experiences do you enjoy (e.g., adventure, relaxation, cultural)?",
  ],
  Health: [
    "What kind of exercise do you enjoy (e.g., running, yoga)?",
    "What health goals are you focusing on (e.g., nutrition, strength)?",
    "Are there any specific fitness challenges you want to take on?",
  ],
};

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = location.state || {};
  const [answers, setAnswers] = useState({});

  const handleInputChange = (category, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [question]: value,
      },
    }));
  };

  const handleNext = () => {

    // Check if there are any unanswered questions
  for (const category of categories) {
    for (const question of questionsByCategory[category]) {
      if (!answers[category] || !answers[category][question] || answers[category][question].trim() === "") {
        alert('Please answer all questions before proceeding.');
        return; // Stop further execution if any question is unanswered
      }
    }
  }
  // If all questions are answered, navigate to the next page
    navigate('/layout-selection', { state: { categories, answers } });
  };

  return (
    <div className="questions-container">
    <h1>Answer Questions for Your Selected Categories</h1>
    <div className="categories-container">
      {categories.map((category) => (
        <div className="category-section" key={category}>
          <h2>{category}</h2>
          {questionsByCategory[category]?.map((question, index) => (
            <div className="question-item" key={index}>
              <label>{question}</label>
              <input
                type="text"
                placeholder='Type Your Answer Here! '
                className="answer-input"
                onChange={(e) =>
                  handleInputChange(category, question, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    <button className="the-next-button" onClick={handleNext}>
      Next
    </button>
  </div>
  );
};

export default QuestionsPage;
