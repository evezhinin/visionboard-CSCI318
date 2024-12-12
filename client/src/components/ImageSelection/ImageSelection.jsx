import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './ImageSelection.css';

const MAX_IMAGE_SELECTION = 10;
const IMAGES_PER_PAGE = 15;

const ImageSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, answers, layout } = location.state || {};
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [fetchedImages, setFetchedImages] = useState([]); 

  useEffect(() => {
    fetchImages();
  }, [answers]);

  const generateKeywords = (category, answers) => {
    const userAnswers = answers[category] || {};
    let keywords = [];

    Object.values(userAnswers).forEach((answer) => {
      if (typeof answer === 'string') {
        const splitKeywords = answer.split(/[,\s]+/).map((kw) => kw.trim());
        keywords.push(...splitKeywords);
      }
    });

    return keywords.slice(0, 5);
  };

  const fetchImages = async () => {
    try {
      const allPromises = [];

      categories.forEach((category) => {
        const keywords = generateKeywords(category, answers);

        keywords.forEach((keyword) => {
          const promise = axios.get(`http://localhost:5001/api/unsplash/images`, {
            params: { query: keyword, per_page: IMAGES_PER_PAGE * 2 }, 
          });
          allPromises.push(promise);
        });
      });

      const results = await Promise.all(allPromises);
      const fetchedImagesData = results.flatMap((res) => res.data.results);

      // Add only unique images
      const uniqueImages = [
        ...new Map(fetchedImagesData.map((img) => [img.id, img])).values(),
      ];

      setFetchedImages(uniqueImages);
      setImages(uniqueImages.slice(0, IMAGES_PER_PAGE));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageSelect = (image) => {
    if (selectedImages.length < MAX_IMAGE_SELECTION) {
      setSelectedImages((prev) => [...prev, image]);
      setImages((prevImages) => prevImages.filter((img) => img.id !== image.id));
    }
  };

  const handleImageDeselect = (image) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    setImages((prevImages) => [image, ...prevImages]);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;

    if (startIndex < fetchedImages.length) {
      setImages(fetchedImages.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    } else {
      alert('No more images available.');
    }
  };

  const handleGenerate = () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to generate your vision board.');
      return;
    }
    navigate('/vision-board', { state: { layout, selectedImages } });
  };

  return (
    <div className="image-selection-container">
      <h1>Select Images for Your Vision Board</h1>
      <div className="selected-images">
        <h3>Selected Images ({selectedImages.length}/{MAX_IMAGE_SELECTION})</h3>
        <div className="selected-images-list">
          {selectedImages.map((image) => (
            <div key={`selected-${image.id}`} className="selected-image">
              <img src={image.urls.small} alt={image.alt_description} />
              <button onClick={() => handleImageDeselect(image)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
      <div className="available-images">
        <h3>Available Images</h3>
        <div className="available-images-list">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={`available-${image.id}`} className="available-image">
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  onClick={() => handleImageSelect(image)}
                />
              </div>
            ))
          ) : (
            <p>No more images could be found.</p>
          )}
        </div>
      </div>
      <button
        disabled={selectedImages.length === 0}
        className="generate-vision-board-button"
        onClick={handleGenerate}
      >
        Generate Vision Board
      </button>
      {fetchedImages.length > (currentPage + 1) * IMAGES_PER_PAGE && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More Images
        </button>
      )}
    </div>
  );
};

export default ImageSelection;


