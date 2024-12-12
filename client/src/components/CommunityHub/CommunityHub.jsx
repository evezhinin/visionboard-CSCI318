// CommunityHub.jsx
import React, { useState } from 'react';
import { useToken } from '../../context/TokenContext';
import VisionBoardItem from '../VisionBoardItem/VisionBoardItem'; 
import PostVisionBoardModal from '../PostVisionBoardModal/PostVisionBoardModal';
import './CommunityHub.css';

const CommunityHub = () => {
  const { tokenContext } = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedVisionBoard, setSelectedVisionBoard] = useState('');

  const visionBoards = [
    {
      id: 1,
      username: '@tanha',
      date: 'December 4, 2024',
      time: '10:30 AM',
      title: 'My Travel Vision Board',
      caption: 'This year, I am manifesting my dream vacation to Europe!',
      imageUrl: '/communityVisionPic.png',
      comments: [
        { id: 1, username: '@chelsea', text: 'I love your vision!' },
      ],
    },
    {
      id: 2,
      username: '@tanha',
      date: 'December 3, 2024',
      time: '9:00 PM',
      title: 'Fitness & Travel Goals 2025',
      caption: 'Focusing on a healthy lifestyle and fitness goals.',
      imageUrl: '/Visionpic2.png',
      comments: [
        { id: 1, username: 'chelsea', text: 'Great goals, keep going!' },
      ],
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePost = () => {
    if (selectedVisionBoard) {
      // Add logic to add new vision board post
      console.log('Posted:', caption, selectedVisionBoard);
      handleCloseModal();
    } else {
      alert('Please select a vision board to post.');
    }
  };

  return (
    <div className="community-hub">
      <div className="community-hub-header">
        {tokenContext && (
          <button className="post-button" onClick={handleOpenModal}>Post Your Vision Board ✨</button>
        )}
      </div>

      <div className="vision-board-list">
        {visionBoards.map((board) => (
          <VisionBoardItem key={board.id} board={board} tokenContext={tokenContext} />
        ))}
      </div>

      <PostVisionBoardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caption={caption}
        setCaption={setCaption}
        selectedVisionBoard={selectedVisionBoard}
        setSelectedVisionBoard={setSelectedVisionBoard}
        onPost={handlePost}
      />
    </div>
  );
};

export default CommunityHub;
