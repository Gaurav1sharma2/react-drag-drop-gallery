import React, { useState } from 'react';
import '../styles/GalleryPage.css';

function GalleryPage({ onLogout }) {
  const [images, setImages] = useState([
    { id: 1, title: 'Mountain View', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop' },
    { id: 2, title: 'Ocean Sunset', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop' },
    { id: 3, title: 'Forest Path', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop' },
    { id: 4, title: 'City Lights', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=300&fit=crop' },
    { id: 5, title: 'Desert Dunes', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=300&fit=crop' },
    { id: 6, title: 'Starry Night', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=300&fit=crop' },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetIndex) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedItem];
    
    // Remove from old position
    newImages.splice(draggedItem, 1);
    // Insert at new position
    newImages.splice(targetIndex, 0, draggedImage);
    
    setImages(newImages);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-card">
        <div className="header">
          <h1>Drag & Drop Gallery</h1>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>

        <p className="instructions">Drag and drop images to reorder them</p>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${draggedItem === index ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <img src={image.url} alt={image.title} />
              <div className="image-title">{image.title}</div>
            </div>
          ))}
        </div>

        <div className="gallery-info">
          <h3>Gallery Info:</h3>
          <p>Total Images: {images.length}</p>
          <p>Try dragging images to reorder them in the gallery!</p>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
