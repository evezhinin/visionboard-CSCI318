import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './VisionBoardPage.css';
import axios from 'axios';
import html2canvas from 'html2canvas';

const VisionBoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { boardId: paramsBoardId } = useParams(); // Extract boardId from URL params
  const { layout: initialLayout, selectedImages: initialImages } = location.state || {};

  const [layout, setLayout] = useState(initialLayout || "collage");
  const [selectedImages, setSelectedImages] = useState(initialImages || []);
  const [title, setTitle] = useState(paramsBoardId ? "Existing Vision Board" : "");
  const [boardId, setBoardId] = useState(paramsBoardId);

  // Load existing board data if we have a boardId
  useEffect(() => {
    if (!paramsBoardId) {
      console.error("Board ID is undefined. Ensure you are navigating to the page with a valid ID.");
      return;
    }

    const loadBoardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Please log in to access your vision board.");
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:5001/vision-boards/${paramsBoardId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const boardData = response.data;
        setLayout(boardData.boardData.layout);
        setSelectedImages(boardData.boardData.images);
        setTitle(boardData.title);
        setBoardId(paramsBoardId); // Update boardId in state to reflect the loaded board
      } catch (error) {
        console.error("Error loading vision board:", error);
      }
    };

    loadBoardData();
  }, [paramsBoardId, navigate]);

  // Handle saving a new or existing vision board
  const handleSaveVisionBoard = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title for your vision board.");
      return;
    }

    const boardData = {
      title,
      boardData: {
        layout,
        images: selectedImages.map((image) => ({
          url: image.urls?.regular || image.url,
          alt: image.alt_description,
        })),
      },
    };

    try {
      if (boardId) {
        // Update existing board
        await axios.put(`http://localhost:5001/vision-boards/${boardId}`, boardData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Vision board updated successfully!");
      } else {
        // Create a new board
        const response = await axios.post('http://localhost:5001/vision-boards', boardData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Vision board saved successfully!");
        const newBoardId = response.data.id;
        setBoardId(newBoardId); // Set the new boardId in state
        navigate(`/vision-board/${newBoardId}`, {
          state: {
            layout: boardData.boardData.layout,
            selectedImages: boardData.boardData.images,
          },
        });
      }
    } catch (error) {
      console.error("Error saving vision board:", error.response ? error.response.data : error.message);
      alert("Failed to save vision board");
    }
  };

  // Handle saving the image version of the vision board
  const handleSaveImageVersion = async () => {
    const boardElement = document.querySelector('.vision-board-page-back');
    if (!boardElement) {
      alert("Vision board is not available to capture.");
      return;
    }

    if (!boardId) {
      console.error("Cannot save image - Board ID is missing.");
      alert("Board ID missing. Cannot save image.");
      return;
    }

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(boardElement, { useCORS: true, allowTaint: true });
        const imageData = canvas.toDataURL('image/png');

        // Convert the base64 data URL to a Blob
        const blob = await fetch(imageData).then((res) => res.blob());
        const file = new File([blob], `${title}-vision-board.png`, { type: 'image/png' });

        // Create a FormData object to send to the server
        const formData = new FormData();
        formData.append('visionBoardImage', file);
        formData.append('boardId', boardId); // Ensure boardId is appended here

        console.log("Sending boardId:", boardId);

        const token = localStorage.getItem('token');
        if (!token) {
          alert("User not logged in");
          navigate("/login");
          return;
        }

        // Send the image to backend server
        const response = await axios.post(`http://localhost:5001/vision-boards/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          alert("Vision board image saved successfully!");
        } else {
          alert("Failed to save vision board image.");
        }
      } catch (error) {
        console.error("Error generating or saving vision board image:", error);
        alert("Failed to generate or save vision board image.");
      }
    }, 2000);
  };

  return (
    <div className="vision-board-page-container">
      <div className='vision-board-page-container-content'>
        <h1>Your Vision Board ({layout})</h1>
        <div className="vision-board-title-container">
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your vision board"
            className="vision-board-title-input"
          />
        </div>
        <div className='vision-board-page-container-content-buttons'>
          <button onClick={handleSaveVisionBoard}>Save Vision Board</button>
          <button onClick={handleSaveImageVersion}>Generate and Download Vision Board Image</button>
        </div>
        <div className="vision-board-page-back">
          <div className={`vision-board vision-board-${layout.toLowerCase()}`}>
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className={`vision-board-item vision-board-item-${index % 5}`}
                style={{
                  gridColumn: index % 2 === 0 ? 'span 2' : 'span 1',
                  gridRow: index % 3 === 0 ? 'span 2' : 'span 1', 
                  padding: '10px',
                }}
              >
                <img
                  src={image.urls?.regular || image.url}
                  alt={image.alt_description}
                  className="vision-board-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoardPage;

