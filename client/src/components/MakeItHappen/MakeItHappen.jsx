import React, { useState, useEffect } from "react";
import ActionStep from "../ActionStep/ActionStep";
import { useToken } from '../../context/TokenContext';
import './MakeItHappen.css';

const MakeItHappen = () => {
  const { tokenContext } = useToken();
  const [selectedVisionBoard, setSelectedVisionBoard] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Mock vision boards data
  const visionBoards = [
    { id: 1, title: 'Vision Board Title #1' },
  ];

  useEffect(() => {
    if (selectedVisionBoard) {
      // Fetch AI-generated steps for the selected vision board
      const fetchActionableSteps = async () => {
        // Replace this with a call to an AI API to generate actionable steps
        const initialSteps = [
          { id: 1, title: "Set clear goals", dueDateTime: "2024-12-05T10:00" },
          { id: 2, title: "Develop a plan", dueDateTime: "2024-12-06T14:00" },
          { id: 3, title: "Review the plan", dueDateTime: "2024-12-07T11:00" },
          { id: 4, title: "Execute the plan", dueDateTime: "2024-12-08T16:00" },
        ];
        setSteps(initialSteps);
      };

      fetchActionableSteps();
    }
  }, [selectedVisionBoard]);

  const handleVisionBoardSelection = (visionBoard) => {
    setSelectedVisionBoard(visionBoard);
  };

  // Handle input change and update the step's title or date
  const handleInputChange = (e, stepId) => {
    const { name, value } = e.target;
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, [name]: value } : step
      )
    );
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  if (!tokenContext) {
    return (
      <div className="login-prompt">
        <p>Please log in / sign up to make your visions come to reality! <a href="/login">Log In / Sign up</a></p>
      </div>
    );
  }

  return (
    <div className="make-it-happen-container">
      {!selectedVisionBoard ? (
        <div className="vision-board-selection-container">
          <h1 className="vision-board-main-title-select">
            Don’t know where to start after generating your vision board?
          </h1>
          <h2 className="vision-board-subtitle-select">
            Select one of your current vision boards to receive action steps
          </h2>
          <div className="vision-board-options-select">
            {visionBoards.map((board) => (
              <button key={board.id} onClick={() => handleVisionBoardSelection(board)} className="vision-board-option">
                <h3 className="vision-board-title-select">{board.title}</h3>
                <div className="vision-board-thumbnail-select"></div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="main-title">LET'S MAKE IT HAPPEN!</h1>
          <h2 className="sub-title">
            Here, you will be given step-by-step guides on how to make your vision come to life:
          </h2>

          <div className="steps-vision-container">
            {/* Steps Container */}
            <div className="steps-container">
              <div className="steps-title">Steps and deadlines for {selectedVisionBoard.title}:</div>
              {steps.map((step) => (
                <ActionStep
                  key={step.id}
                  step={step}
                  isEditing={isEditing}
                  onInputChange={handleInputChange}
                />
              ))}
            </div>

            {/* Vision Board Container */}
            <div className="vision-board-container-content">
              <div className="vision-board-title-makeit">{selectedVisionBoard.title}</div>
              <div className="vision-board-makeit"></div>

              <div className="buttons-container-makeit">
                <button className="edit-steps-button-makeit" onClick={handleEditToggle}>
                  {isEditing ? "Cancel Changes" : "Edit Steps & Deadlines"}
                </button>

                {isEditing && (
                  <button className="save-steps-button-makeit" onClick={() => setIsEditing(false)}>
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MakeItHappen;
