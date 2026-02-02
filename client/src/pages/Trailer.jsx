import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "@videojs/themes/dist/sea/index.css";

function Trailer(props) {
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const { options, onReady, trailerURL } = props;

  useEffect(() => {
    // Initialized only on the first render
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      //
      const player = (playerRef.current = videojs(videoElement, {
        ...options,
      }));
    } else {
      player = playerRef.current;
      player.src = { type: "video/youtube", source: trailerURL };
    }
  }, [trailerURL]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered video-theme-sea"
      />
    </div>
  );
}

export default Trailer;
