import { useMemo } from "react";

export const useAudio = (audiopath:string): HTMLAudioElement => {
  return useMemo(() => new Audio(audiopath), [audiopath]);
}
