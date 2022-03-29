import { useNavigate } from "react-router-dom";
import logo from "./GloboLogo.png";

type Args = {
  subtitle: string;
};

const Header = ({ subtitle }: Args) => {
  const nav = useNavigate();
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className="logo" alt="logo" onClick={() => nav("/")} />
      </div>
      <div className="col-7 mt-5 subtitle">{subtitle}</div>
    </header>
  );
};

export default Header;
