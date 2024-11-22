import scss from "./MainContainHome.module.scss";
interface MainContainHomeProps {
  setIsWigiliaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContainHome: React.FC<MainContainHomeProps> = ({
  setIsWigiliaOpen,
}) => {
  const onClickHandler = () => {
    setIsWigiliaOpen(true);
  };

  return (
    <div className={scss["maincontain-home-container"]}>
      <button
        className={scss["maincontain-home-button"]}
        type="button"
        onClick={onClickHandler}
      >
        <span className={scss["maincontain-home-button-text"]}>Click!</span>
      </button>
    </div>
  );
};
