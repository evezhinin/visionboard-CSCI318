// VisionBoardItem.jsx
import React, { useState } from 'react';
import './VisionBoardItem.css';

const VisionBoardItem = ({ board, tokenContext }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentToggle = () => {
    setShowComments((prev) => !prev);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Here you would typically update the comments with an API call
      board.comments.push({ id: board.comments.length + 1, username: '@currentUser', text: newComment });
      setNewComment('');
    }
  };

  return (
    <div className="vision-board-item-item">
      <div className="user-info">
        <img src="/nealimg.jpeg" alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <p className="username">{board.username}</p>
          <p className="post-date">Posted on {board.date} at {board.time}</p>
        </div>
      </div>

      <div className="vision-board-content-content">
        <div className="caption">
          <p>{board.caption}</p>
        </div>
        <div className="vision-board-image">
          <img src={board.imageUrl} alt={board.title} />
          <p className="vision-board-title">{board.title}</p>
        </div>
      </div>

      <div className="interaction-section">
        {tokenContext ? (
          <>
            <button className="like-button">💖</button>
            <button className="comment-button" onClick={handleCommentToggle}>💬</button>
          </>
        ) : (
          <p className="interaction-disabled">Log in to like or comment 🌸</p>
        )}
      </div>

      {showComments && (
        <div className="comments-section">
          {board.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-user">
                <img src="/user2profileimg.jpeg" alt="User Avatar" className="user-avatar-small" />
                <p className="username">{comment.username}</p>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}

          {tokenContext && (
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Post</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisionBoardItem;
