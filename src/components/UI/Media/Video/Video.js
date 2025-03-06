// src/components/UI/Media/Video/Video.js
import React, { useRef, useState, useEffect } from 'react';
import styles from './Video.module.css';

/**
 * Video component - Player video
 * @param {string} src - Đường dẫn video
 * @param {string} poster - Đường dẫn hình poster
 * @param {boolean} controls - Hiển thị controls
 * @param {boolean} autoPlay - Tự động phát
 * @param {boolean} loop - Lặp lại video
 * @param {boolean} muted - Tắt âm thanh
 * @param {string} preload - Chế độ preload (auto, metadata, none)
 * @param {function} onPlay - Callback khi video chạy
 * @param {function} onPause - Callback khi video tạm dừng
 * @param {function} onEnded - Callback khi video kết thúc
 * @param {function} onTimeUpdate - Callback khi thời gian update
 * @param {function} onError - Callback khi lỗi
 * @param {string} className - Class bổ sung
 */
const Video = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  preload = 'metadata',
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onError,
  className = '',
  ...rest
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showCustomControls, setShowCustomControls] = useState(!controls);

  // Xử lý sự kiện metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Xử lý sự kiện time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (onTimeUpdate) onTimeUpdate(videoRef.current.currentTime);
    }
  };

  // Xử lý sự kiện play
  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlay) onPlay();
  };

  // Xử lý sự kiện pause
  const handlePause = () => {
    setIsPlaying(false);
    if (onPause) onPause();
  };

  // Xử lý sự kiện ended
  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  // Xử lý sự kiện waiting (buffering)
  const handleWaiting = () => {
    setIsBuffering(true);
  };

  // Xử lý sự kiện playing (sau khi buffering)
  const handlePlaying = () => {
    setIsBuffering(false);
  };

  // Xử lý sự kiện lỗi
  const handleError = (e) => {
    if (onError) onError(e);
  };

  // Custom controls - Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(handleError);
      }
    }
  };

  // Custom controls - Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Format time (seconds) to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Xử lý seek video
  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekPosition = e.target.value;
      videoRef.current.currentTime = seekPosition;
      setCurrentTime(seekPosition);
    }
  };

  // Custom controls hiện lên khi hover (nếu không có native controls)
  const showControls = () => {
    if (!controls) {
      setShowCustomControls(true);
    }
  };

  // Custom controls ẩn đi sau khi không hover (nếu không có native controls)
  const hideControls = () => {
    if (!controls && !isPlaying) {
      setShowCustomControls(false);
    }
  };

  return (
    <div 
      className={`${styles.videoContainer} ${className}`}
      onMouseEnter={showControls}
      onMouseLeave={hideControls}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        preload={preload}
        className={styles.video}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onError={handleError}
        playsInline
        {...rest}
      />
      
      {isBuffering && (
        <div className={styles.bufferingIndicator} aria-label="Loading video">
          <div className={styles.spinner}></div>
        </div>
      )}
      
      {showCustomControls && !controls && (
        <div className={styles.customControls}>
          <button 
            className={styles.playPauseButton}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          
          <div className={styles.progressContainer}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className={styles.progressBar}
              aria-label="Video progress"
            />
            <div className={styles.timeDisplay}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <button 
            className={styles.muteButton}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4zM23 9l-6 6M17 9l6 6"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;