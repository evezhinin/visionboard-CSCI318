// PostVisionBoardModal.jsx
import React from 'react';
import './PostVisionBoardModal.css';

const PostVisionBoardModal = ({ isOpen, onClose, caption, setCaption, selectedVisionBoard, setSelectedVisionBoard, onPost }) => {
  const visionBoards = [
    { id: 1, title: 'My Travel Vision Board' },
    { id: 2, title: 'Fitness Goals 2024' },
    { id: 3, title: 'Career Achievements' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Post Your Vision Board</h2>
          <button className="close-modal" onClick={onClose}>✖️</button>
        </div>
        <div className="modal-body">
          <textarea
            className="caption-input"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="dropdown-container">
            <label className="dropdown-label">Select the vision board you want to post:</label>
            <select
              value={selectedVisionBoard}
              onChange={(e) => setSelectedVisionBoard(e.target.value)}
            >
              <option value="">Select your vision board</option>
              {visionBoards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.title}
                </option>
              ))}
            </select>
          </div>
          <button className="post-modal-button" onClick={onPost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostVisionBoardModal;
