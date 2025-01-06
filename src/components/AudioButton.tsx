import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface AudioButtonProps {
    audioUrl: string;
  }
  

const AudioButton: React.FC<AudioButtonProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    useEffect(() => {
      // Initialize audio object only once
      if (!audioRef.current && audioUrl) {
        audioRef.current = new Audio(audioUrl);
  
        // Handle the end of playback to reset the button state
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
      return () => {
        // Cleanup audio object on component unmount
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
          audioRef.current = null;
        }
      };
    }, [audioUrl]);
  
    const togglePlayback = () => {
      if (!audioRef.current) return;
  
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    };
  
  
  return (
    <button onClick={togglePlayback}>
      {isPlaying ? (
        <Icon icon="noto:pause-button" width="36" height="36" />
      ) : (
        <Icon icon="noto:play-button" width="36" height="36" />
      )}
    </button>
  );
};

export default AudioButton;
