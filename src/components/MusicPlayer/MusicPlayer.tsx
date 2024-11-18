import { musicSource } from "./musicSource";

export const MusicPlayer: React.FC = () => {
  const sourceMusic = musicSource(); // Pobiera losową ścieżkę

  return (
    <audio controls preload="auto" autoPlay>
      <source src={sourceMusic} type="audio/mpeg" />
      Your browser does not support the <code>audio</code> element.
    </audio>
  );
};
