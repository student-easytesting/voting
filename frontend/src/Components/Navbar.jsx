import { Link } from "react-router-dom";
import { useValue } from "../store/store";

const Navbar = () => {
  const { handleClick, wallet } = useValue();
  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          <span>Home</span>
        </Link>
        <Link className="link" to="/getdata">
          <span>Check Wallet</span>
        </Link>
        <Link className="link" to="/castvote">
          <span>Vote</span>
        </Link>
        <Link className="link" to="/result">
          <span>Result</span>
        </Link>
        <Link className="link" to="/admin">
          <span>Admin</span>
        </Link>
        <button className="btn submit wallet" onClick={(e) => handleClick(e)}>
          {wallet === "Connect Wallet"
            ? wallet
            : `${wallet.slice(0, 4)}...${wallet.slice(38)}`}
        </button>
      </div>
    </>
  );
};

export default Navbar;
