import { useRef, useState } from "react";
import axios from "axios";

const Getdata = () => {
  const fwallet = useRef();
  const [walletData, setWalletdata] = useState("");
  const [isData, setIsData] = useState(false);
  const [isResponse, setIsResponse] = useState(false);

  const API = import.meta.env.VITE_APP_URI_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let wallet = fwallet.current.value;

    setIsData(true);
    setWalletdata(wallet);
    const response = await axios.post(`${API}/data/service`, {
      hashdata: wallet,
    });

    response && setIsResponse(response.data);

    fwallet.current.value = "";
  };

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Wallet" className="label">
          Wallet Address:
        </label>
        <br />
        <input type="text" id="wallet" className="input" ref={fwallet} />
        <button className="btn submit">Check Wallet Status</button>
      </form>

      {isData && (
        <div className="card">
          <div>
            <span className="data bold ">Wallet No: </span>
            <span className="data ">{walletData}</span>
          </div>
          <br />
          <div>
            <span className="data bold">Wallet Status: </span>
            <span className="data">
              {isResponse ? "Wallet registered." : "Wallet not registered."}
            </span>
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default Getdata;
