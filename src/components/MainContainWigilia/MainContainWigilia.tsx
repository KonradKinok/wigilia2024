import scss from "./MainContainWigilia.module.scss";
import Snowfall from "../Snowfall/Snowfall";
import { useEffect, useState } from "react";
import myPhoto from "../../images/mainWigilia/zdjecie.jpg";

export const MainContainWigilia: React.FC = () => {
  const [isTimeElapsed, setIsTimeElapsed] = useState(false); // Stan zmieniający się po 20s
  const [elapsedTime, setElapsedTime] = useState(0); // Czas upływający od otwarcia strony

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const secondsElapsed = Math.floor((currentTime - startTime) / 1000);

      setElapsedTime(secondsElapsed);

      if (secondsElapsed >= 20) {
        setIsTimeElapsed(true); // Zmiana stanu po 20s
        clearInterval(interval); // Zatrzymanie licznika po osiągnięciu 20s
        console.log({ elapsedTime });
      }
    }, 1000);

    // Czyszczenie interwału przy demontażu komponentu
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={scss["maincontain-container"]}>
      <div>
        <div className={scss["section1-img1-container"]}>
          <img
            className={scss["section1-img1-animation"]}
            src={myPhoto}
            alt="my photo"
          />
        </div>
        <div className={scss["section2-container"]}>
          <p className={scss["section2-text"]}>
            W domach ciepło, świątecznie, choinka wiruje światłami, stosy
            prezentów piętrzą się wokół, świat wypełniony jest życzeniami.
            Wesołych Świąt Bożego Narodzenia.
          </p>
        </div>
      </div>
      {!isTimeElapsed && <Snowfall />}
    </div>
  );
};
