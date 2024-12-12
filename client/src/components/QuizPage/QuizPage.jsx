
import React from 'react';
import QuizComponent from '../QuizComponent/QuizComponent';
import { useNavigate } from 'react-router-dom';
import './QuizPage.css';

const QuizPage = () => {
  const navigate = useNavigate();

  const categories = ["Education", "Career", "Travel","Health"];

  // Handle category selection and navigate to Vision Board Page
  const handleQuizSubmit = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    navigate('/questions', { state: { categories: selectedCategories } });
  };

  return (
    <div className='quiz-page-container'>
        <div className='quiz-content'>
            <h1 className='quiz-content-title'>Let's Create Your Vision Board</h1>
            <h3 className='quiz-content-heading'>What is your Vision's Category?</h3>
            <QuizComponent categories={categories} onQuizSubmit={handleQuizSubmit} />
        </div>
    </div>
  );
};

export default QuizPage;

