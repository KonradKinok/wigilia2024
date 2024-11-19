import { musicSource } from "./musicSource";
import scss from "./MusicPlayer.module.scss";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";

const sourceMusic = musicSource(); // Ustaw źródło muzyki
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [progress, setProgress] = useState(0);

  // Funkcja aktualizująca postęp
  const updateProgress = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setProgress((currentTime / duration) * 100 || 0);
      if (currentTime === duration) {
        setProgress(0);
        setIsPlaying(false);
      }
    }
  };

  // Funkcje sterujące
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMute;
      setIsMute(!isMute);
    }
  };
  // Obsługa efektów
  useEffect(() => {
    const audio = audioRef.current;
    let interval: number | null = null;

    if (audio) {
      if (isPlaying) {
        audio.play();
        // Ustaw interwał do aktualizacji postępu co 1 sekundę
        interval = setInterval(() => {
          updateProgress();
          console.log("useEffect");
        }, 1000);
      } else {
        audio.pause();
      }

      // Dodanie event listenera (opcjonalnie wciąż używamy dla precyzji aktualizacji)
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (interval) clearInterval(interval); // Usuń interwał po zakończeniu odtwarzania lub odmontowaniu komponentu
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [isPlaying]);

  return (
    <div className={scss["player-container"]}>
      <audio ref={audioRef} src={sourceMusic} autoPlay />
      <div className={scss["player-controls"]}>
        <button
          className={scss["player-btn"]}
          onClick={isPlaying ? pause : play}
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button className={scss["player-btn"]} onClick={stop}>
          <FaStop size={30} />
        </button>
        <button className={scss["player-btn"]} onClick={toggleMute}>
          {isMute ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} />}
        </button>
        <div>
          <span>
            {audioRef.current
              ? formatTime(audioRef.current.currentTime)
              : "00:00"}
          </span>
          <span>/</span>
          <span>
            {audioRef.current ? formatTime(audioRef.current.duration) : "00:00"}
          </span>
        </div>
      </div>
      <div className={scss["progressBarContainer"]}>
        <div
          className={scss["progressBar"]}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
          data-progress={progress}
        />
      </div>
    </div>
  );
};
