import React from 'react';
import './ActionStep.css';

const ActionStep = ({ step, isEditing, onInputChange }) => {
  const formatTo12HourTime = (datetime) => {
    const date = new Date(datetime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    return `${date.toISOString().split('T')[0]} ${formattedTime}`;
  };

  return (
    <div className="action-step">
      <div className="action-step-title-container">
        <div className='action-step-checkbox-container'>
            <input type="checkbox" className="action-step-checkbox" />
        </div>
        <div>
        <span className="action-step-number">Step {step.id}:</span>
        {!isEditing ? (
          <span>{step.title}</span>
        ) : (
          <input
            type="text"
            className="action-step-input"
            value={step.title}
            onChange={(e) => onInputChange(e, step.id)}
            name="title"
          />
        )}

        </div>
        
      </div>

      <div className="action-due-date-container">
        <span className="action-due-date-label">Due Date and Time:</span>
        {!isEditing ? (
          <span className="action-due-date-time">{formatTo12HourTime(step.dueDateTime)}</span>
        ) : (
          <input
            type="datetime-local"
            className="action-due-date-input"
            value={step.dueDateTime}
            onChange={(e) => onInputChange(e, step.id)}
            name="dueDateTime"
          />
        )}
      </div>
    </div>
  );
};

export default ActionStep;
