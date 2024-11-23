import * as globalFunctions from "../../globalFunctions/functions";


export function musicSource() {
  const baseTrack = "/media/";
  const tableOFMusic = [
    "De_Su_ Kto_wie_czy_za_rogiem.mp3",
    "Jedzie Mikołaj.mp3",
    "Tupu tup po śniegu.mp3",
    "Wśród nocnej ciszy.mp3",
    "Kolęda Uciekali z musicalu Metro 2017.mp3",
    "Passeres Dei Dzwoneczków dźwięk.mp3",
    "Rokiczanka - Pastorałka od serca do ucha.mp3",
  ];

  const musicTrack = globalFunctions.getRandomElement(tableOFMusic);
  console.log("scieżka do mp3", baseTrack + musicTrack);
  return baseTrack + musicTrack;
}