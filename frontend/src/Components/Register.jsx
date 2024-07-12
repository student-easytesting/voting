import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useValue } from "../store/store";
import { toast } from "react-toastify";

const Register = () => {
  const { contract, wallet } = useValue();

  const API = import.meta.env.VITE_APP_URI_API;
  const fname = useRef();
  const fdob = useRef();
  const fvoter = useRef();
  const fcity = useRef();
  const fwallet = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = fname.current.value;
    const voter = fvoter.current.value;
    const dob = fdob.current.value;
    const city = fcity.current.value;
    const wallet = fwallet.current.value;

    const response = await axios.post(`${API}/auth/voter`, {
      name: name,
      voter: voter,
      dob: dob,
      city: city,
      wallet: wallet,
    });
    console.log(response.data);
    const cityid = response.data.cityid;

    if (response.data) {
      const tx = await contract.registerVoter(cityid);
      await tx.wait();
      toast.success("Success!");
    }

    fname.current.value = "";
    fvoter.current.value = "";
    fdob.current.value = "";
    fcity.current.value = "";
  };

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name" className="label">
          Name:
        </label>
        <br />
        <input id="name" type="text" className="input" ref={fname} />
        <br />
        <label htmlFor="voter" className="label">
          Voter No:
        </label>
        <br />
        <input id="voter" type="text" className="input" ref={fvoter} />
        <br />
        <label htmlFor="dob" className="label">
          DOB:{" "}
        </label>
        <br />
        <input id="dob" type="date" className="input" ref={fdob} />
        <br />

        <label htmlFor="city" className="label">
          City:
        </label>
        <br />
        <input type="text" className="input" ref={fcity} />
        <br />

        <label htmlFor="wallet" className="label">
          Wallet:
        </label>
        <br />
        <input
          id="wallet"
          readOnly
          type="text"
          className="input"
          ref={fwallet}
          value={wallet === "Connect Wallet" ? "" : wallet}
        />
        <br />

        <button className="btn submit">Register</button>
      </form>
    </>
  );
};

export default Register;
