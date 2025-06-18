import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className='video-player'>
      {videoUrl ? (
        <iframe
          width='100%'
          height='500px'
          src={videoUrl} // Assuming direct embeddable link or logic to make it so
          title='Movie Player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Video URL not provided or invalid.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
