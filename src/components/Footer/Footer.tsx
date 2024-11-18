import React from "react";
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";
import footerLogoText from "../../images/footer/3KLogo.png";
import scss from "./Footer.module.scss";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";

interface FooterProps {
  isWigiliaOpen: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isWigiliaOpen }) => {
  return (
    <footer className={scss["footer"]}>
      <div className={scss["footer-container"]}>
        <div className={scss["footer-logo"]}>
          <img src={footerLogoImage} alt="logoImage" width="24" />
          <img src={footerLogoText} alt="logoText" />
        </div>
        {isWigiliaOpen ? (
          <MusicPlayer />
        ) : (
          <div className={scss["footer-container-text"]}>
            <p className={scss["footer-text"]}>Wesołych Świąt!!!</p>
          </div>
        )}
      </div>
    </footer>
  );
};
