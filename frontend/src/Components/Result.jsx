import { useRef, useState } from "react";
import { useValue } from "../store/store";
import axios from "axios";
import ReactTable from "./ReactTable";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_APP_URI_API;
const Result = () => {
  const { contract } = useValue();
  const fcity = useRef();
  const [resultData, setResultData] = useState("");

  const handleVoteCount = async () => {
    const tx = await contract.countOverallWinner();
    await tx.wait();
    toast.success("Success!");
  };

  const handleVoteCountbyCity = async (e) => {
    e.preventDefault();
    const city = fcity.current.value;
    const response = await axios.post(`${API}/auth/citypost`, {
      city: city,
    });
    console.log(response.data);
    const cityid = response.data.cityid;
    if (response.data) {
      const tx = await contract.countVotes(cityid);
      await tx.wait();
      const data = await contract.getCandidates(cityid);

      console.log(data);
      setResultData(data);
    }
    fcity.current.value = "";
  };
  return (
    <>
      <div className="btnsdiv">
        <input type="text" ref={fcity} />
        <button className="adminbtn" onClick={handleVoteCountbyCity}>
          Count Votes By City
        </button>
        <button className="adminbtn" onClick={handleVoteCount}>
          Count All Votes
        </button>
      </div>
      {resultData && (
        <div className="table">
          <ReactTable resultData={resultData} />
        </div>
      )}
    </>
  );
};

export default Result;
