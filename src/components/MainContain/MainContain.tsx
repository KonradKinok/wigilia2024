import { MainContainHome } from "../MainContainHome/MainContainHome";
import { MainContainWigilia } from "../MainContainWigilia/MainContainWigilia";

interface MainContainProps {
  isWigiliaOpen: boolean;
  setIsWigiliaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContain: React.FC<MainContainProps> = ({
  isWigiliaOpen,
  setIsWigiliaOpen,
}) => {
  return (
    <>
      {!isWigiliaOpen ? (
        <MainContainHome setIsWigiliaOpen={setIsWigiliaOpen} />
      ) : (
        <MainContainWigilia />
      )}
    </>
  );
};
