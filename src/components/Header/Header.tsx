import scss from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={scss["header-container"]}>
      <h1 className={scss["header-text"]}>Wigilia 2024</h1>
    </div>
  );
};
