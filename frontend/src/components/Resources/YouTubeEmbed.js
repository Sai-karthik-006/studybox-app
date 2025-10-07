import React, { useState } from 'react';
import { FaPlay, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';

const YouTubeEmbed = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    if (!url) return null;
    
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(video.url);
  
  if (!videoId) {
    return (
      <div className="youtube-error">
        <FaYoutube className="error-icon" />
        <p>Invalid YouTube URL</p>
        <button 
          className="external-link-btn"
          onClick={() => window.open(video.url, '_blank')}
        >
          <FaExternalLinkAlt />
          Open Link
        </button>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOpenYouTube = () => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="youtube-embed">
      {!isPlaying ? (
        <div className="youtube-preview" onClick={handlePlay}>
          <img 
            src={thumbnailUrl} 
            alt="YouTube thumbnail" 
            onError={(e) => {
              e.target.src = '/default-video-thumbnail.jpg';
            }}
          />
          <div className="play-overlay">
            <FaPlay className="play-icon" />
          </div>
          <div className="video-info">
            <h4>YouTube Tutorial {video.rank ? `#${video.rank}` : ''}</h4>
            <p>Click to play</p>
          </div>
        </div>
      ) : (
        <div className="youtube-player">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="315"
              src={`${embedUrl}?autoplay=1&rel=0`}
              title={`YouTube video ${video.rank}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="player-actions">
            <button onClick={handleOpenYouTube} className="action-btn">
              <FaExternalLinkAlt />
              Watch on YouTube
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;