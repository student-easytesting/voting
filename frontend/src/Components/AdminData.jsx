import { useRef } from "react";
import { useValue } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_APP_URI_API;
const AdminData = () => {
  const { contract } = useValue();

  const handleCandidateName = async () => {
    const response = await axios.get(`${API}/auth/candidates`);
    const candidates = response.data;
    console.log(candidates);

    const tx = await contract.initializeCandidatesAndTeams(candidates);
    await tx.wait();
    toast.success("Success!");
  };

  const handleCityName = async () => {
    const response = await axios.get(`${API}/auth/cities`);
    const cities = response.data;
    console.log(cities);

    const tx = await contract.initializeCities(cities);
    await tx.wait();
    toast.success("Success!");
  };

  const handleReset = async () => {
    const tx = await contract.resetContract();
    await tx.wait();
    toast.success("Success!");
  };

  return (
    <>
      <div className="btnsdiv">
        <button className="adminbtn" onClick={handleCityName}>
          City Names
        </button>
        <button className="adminbtn" onClick={handleCandidateName}>
          Candidate Names
        </button>

        <button className="adminbtn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
};
export default AdminData;
