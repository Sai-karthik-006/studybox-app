import React, { useState } from 'react';
import { FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

const YouTubeEmbed = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(video.url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOpenYouTube = () => {
    window.open(video.url, '_blank');
  };

  if (!videoId) {
    return (
      <div className="youtube-error">
        <p>Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="youtube-embed">
      {!isPlaying ? (
        <div className="youtube-preview" onClick={handlePlay}>
          <img src={thumbnailUrl} alt="YouTube thumbnail" />
          <div className="play-overlay">
            <FaPlay className="play-icon" />
          </div>
          <div className="video-info">
            <h4>YouTube Tutorial</h4>
            <p>Rank: #{video.rank}</p>
          </div>
        </div>
      ) : (
        <div className="youtube-player">
          <iframe
            width="100%"
            height="315"
            src={`${embedUrl}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          <div className="player-actions">
            <button onClick={handleOpenYouTube} className="action-btn">
              <FaExternalLinkAlt />
              Open in YouTube
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;