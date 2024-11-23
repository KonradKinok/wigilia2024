import scss from "./Layout.module.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { MainContain } from "../MainContain/MainContain";
export const Layout: React.FC = () => {
  const [isWigiliaOpen, setIsWigiliaOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number | null>(null); // Zmieniono nazwę na windowSize

  useEffect(() => {
    setWindowSize(window.innerWidth); // Ustawianie rozmiaru okna
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth); // Ustawianie rozmiaru okna na zmianę szerokości
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize !== null) {
    console.log({ windowSize });
    if (windowSize > 645) {
      return (
        <h1>
          Ups! Na tym ekranie nic nie zobaczysz. Zobacz na telefonie komórkowym.
        </h1>
      );
    }
  }

  return (
    <div className={scss["body-container"]}>
      <Header />
      <MainContain
        isWigiliaOpen={isWigiliaOpen}
        setIsWigiliaOpen={setIsWigiliaOpen}
      />
      <Footer isWigiliaOpen={isWigiliaOpen} />
    </div>
  );
};
