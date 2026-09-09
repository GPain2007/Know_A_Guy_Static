import { useCallback, useEffect, useRef, useState } from "react";
import "./Splash.css";

// Drop your intro video at: public/splash.mp4
// (optionally also public/splash.webm for better compression / browser support)
const VIDEO_SRC = `${process.env.PUBLIC_URL}/splash.mp4`;
const VIDEO_SRC_WEBM = `${process.env.PUBLIC_URL}/splash.webm`;

export const Splash = () => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const videoRef = useRef(null);
  const hasStartedRef = useRef(false);

  const dismiss = useCallback(() => {
    setLeaving(true);
    // Match the CSS fade-out duration before unmounting.
    window.setTimeout(() => setVisible(false), 600);
  }, []);

  // Once the browser reports it can play the whole clip without stalling,
  // start it from the beginning.
  const startPlayback = useCallback(() => {
    setReady(true);
    const video = videoRef.current;
    if (!video) return;
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const tryPlay = video.play();
    if (tryPlay && typeof tryPlay.catch === "function") {
      tryPlay.catch(() => {
        hasStartedRef.current = false;
        setNeedsGesture(true);
      });
    }
  }, []);

  const handleManualPlay = useCallback(() => {
    setNeedsGesture(false);
    startPlayback();
  }, [startPlayback]);

  useEffect(() => {
    if (!visible) return;
    // Lock scroll while the splash is up.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Safety timeout: always leave splash even if media events do not fire.
    const fallbackTimer = window.setTimeout(() => {
      dismiss();
    }, 3500);

    return () => {
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = overflow;
    };
  }, [dismiss, visible]);

  if (!visible) return null;

  return (
    <div
      className={`splash ${leaving ? "splash--leaving" : ""}`}
      role="dialog"
      aria-label="Intro"
    >
      <video
        ref={videoRef}
        className="splash__video"
        muted
        playsInline
        preload="auto"
        autoPlay
        onCanPlayThrough={startPlayback}
        onCanPlay={startPlayback}
        onEnded={dismiss}
        onError={dismiss}
      >
        <source src={VIDEO_SRC_WEBM} type="video/webm" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {!ready && <div className="splash__loading" aria-label="Loading" />}

      {needsGesture && (
        <button
          type="button"
          className="splash__play"
          onClick={handleManualPlay}
        >
          Tap to Play Intro
        </button>
      )}

      <button type="button" className="splash__skip" onClick={dismiss}>
        Skip
      </button>
    </div>
  );
};
