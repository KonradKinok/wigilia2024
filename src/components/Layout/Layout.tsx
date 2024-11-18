import scss from "./Layout.module.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useState } from "react";
import { MainContain } from "../MainContain/MainContain";
export const Layout: React.FC = () => {
  const [isWigiliaOpen, setIsWigiliaOpen] = useState<boolean>(false);

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
