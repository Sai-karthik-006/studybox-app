import React, { useState } from 'react';
import { FaDownload, FaExpand, FaTimes } from 'react-icons/fa';

const PDFViewer = ({ pdf, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.filename;
    link.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`pdf-viewer ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="pdf-viewer-header">
        <h3>{pdf.filename}</h3>
        
        <div className="pdf-actions">
          <button onClick={handleDownload} className="action-btn">
            <FaDownload />
            Download
          </button>
          
          <button onClick={toggleFullscreen} className="action-btn">
            <FaExpand />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          
          {onClose && (
            <button onClick={onClose} className="action-btn close">
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="pdf-container">
        <iframe
          src={pdf.url}
          title={pdf.filename}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>

      <div className="pdf-info">
        <p>
          <strong>File:</strong> {pdf.filename}
        </p>
        <p>
          <strong>Size:</strong> {pdf.size || 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default PDFViewer;