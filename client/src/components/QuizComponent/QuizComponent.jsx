import { useState } from 'react';
import './QuizComponent.css';

const QuizComponent = ({ categories, onQuizSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className='quiz-component'>
      {categories.map((category) => (
        <div className="category-item" key={category}>
          <input
            id={category}
            type="checkbox"
            value={category}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
      <button className="next-button" onClick={() => onQuizSubmit(selectedCategories)}>Next</button>
    </div>
  );
};

export default QuizComponent;


