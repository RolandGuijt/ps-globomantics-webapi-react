import logo from "./GloboLogo.png";

type Args = {
  subtitle: string;
};

const Header = ({ subtitle }: Args) => (
  <header className="row mb-4">
    <div className="col-md-5">
      <img src={logo} className="logo" alt="logo" />
    </div>
    <div className="col-md-7 mt-5 subtitle">{subtitle}</div>
  </header>
);

export default Header;
