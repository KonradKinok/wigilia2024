import { musicSource } from "./musicSource";
import scss from "./MusicPlayer.module.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useAudio } from "../hooks/useAudio";
// export const MusicPlayer: React.FC = () => {
//   const sourceMusic = musicSource(); // Pobiera losową ścieżkę

//   return (
//     <audio
//       controls
//       preload="auto"
//       autoPlay
//       className={scss["custom-audio-player"]}
//     >
//       <source src={sourceMusic} type="audio/mpeg" />
//       Your browser does not support the <code>audio</code> element.
//     </audio>
//   );
// };

const css = {
  player: {
    backgroundColor: "black",
    width: "100%",
  },
  row: {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  btn: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};

export const MusicPlayer = () => {
  const sourceMusic = musicSource();
  const audio = useAudio(sourceMusic);
  const ref = useRef(null);

  const play = audio.play.bind(audio);

  const pause = audio.pause.bind(audio);

  useEffect(() => {
    const updateTime = () => {
      const audioProgress = (
        (audio.currentTime / audio.duration) *
        100
      ).toFixed(2);
      console.log(`${audioProgress}%`);

      if (ref.current) {
        ref.current.style.background = `linear-gradient(90deg, orange 0%, orange ${audioProgress}%, black ${audioProgress}%, black 100%)`;
      }
    };

    const interval = setInterval(updateTime, 300);

    if (audio.paused) clearInterval(interval);

    return () => clearInterval(interval);
  }, [audio]);

  return (
    <section style={css.player} ref={ref}>
      <div style={css.row}>
        <button style={css.btn} className="hoverable" onClick={play}>
          <FaPlay size={24} />
        </button>

        <button style={css.btn} className="hoverable" onClick={pause}>
          <FaPause size={24} />
        </button>
      </div>
    </section>
  );
};
