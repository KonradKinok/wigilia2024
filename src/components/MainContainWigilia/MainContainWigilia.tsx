import scss from "./MainContainWigilia.module.scss";
import Snowfall from "../Snowfall/Snowfall";
import { useEffect, useState } from "react";
// import myPhoto from "../../images/mainWigilia/zdjecie.jpg";
import myPhoto from "../../images/mainWigilia/choinka.jpg";
import gifTree from "../../images/mainWigilia/tree.gif";
import gifBombka from "../../images/mainWigilia/ornament.gif";
import gifGift from "../../images/mainWigilia/gift.gif";
import gifStocking from "../../images/mainWigilia/stocking.gif";
import * as globalFunctions from "../../globalFunctions/functions";
import { tableOfWishes } from "./zyczeniaTable";

const zyczenia = globalFunctions.getRandomElement(tableOfWishes);
console.log({ zyczenia });
export const MainContainWigilia: React.FC = () => {
  const [isTimeElapsed, setIsTimeElapsed] = useState(false); // Stan zmieniający się po 20s
  const [elapsedTime, setElapsedTime] = useState(0); // Czas upływający od otwarcia strony

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const secondsElapsed = Math.floor((currentTime - startTime) / 1000);

      setElapsedTime(secondsElapsed);
      console.log({ secondsElapsed });
      if (secondsElapsed >= 30) {
        setIsTimeElapsed(true); // Zmiana stanu po 20s
        clearInterval(interval); // Zatrzymanie licznika po osiągnięciu 20s
        console.log({ elapsedTime });
      }
    }, 3000);

    // Czyszczenie interwału przy demontażu komponentu
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <p className={scss["section2-text"]}>{zyczenia}</p>
        </div>
        <div className={scss["section3-container"]}>
          <p className={scss["section3-text"]}>
            <span className={scss["section3-text-span1"]}>Wesołych Świąt</span>
            <span className={scss["section3-text-span2"]}>życzy</span>
            <span className={scss["section3-text-span3"]}>Konrad</span>
          </p>
        </div>
        <div
          className={`${scss["section-gif-all-container"]} ${scss["section4-gif-container"]}`}
        >
          <img
            className={scss["section4-gif-animation"]}
            src={gifStocking}
            alt="skarpeta"
          />
        </div>
        <div
          className={`${scss["section-gif-all-container"]} ${scss["section5-gif-container"]}`}
        >
          <img
            className={scss["section5-gif-animation"]}
            src={gifBombka}
            alt="bombka"
          />
        </div>
        <div
          className={`${scss["section-gif-all-container"]} ${scss["section6-gif-container"]}`}
        >
          <img
            className={scss["section6-gif-animation"]}
            src={gifGift}
            alt="prezent"
          />
        </div>
        <div
          className={`${scss["section-gif-all-container"]} ${scss["section7-gif-container"]}`}
        >
          <img
            className={scss["section7-gif-animation"]}
            src={gifTree}
            alt="choinka"
          />
        </div>
      </div>
      {isTimeElapsed && <Snowfall />}
    </div>
  );
};
