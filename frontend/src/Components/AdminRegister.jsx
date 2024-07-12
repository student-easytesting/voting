import { useRef, useState, useEffect } from "react";

const AdminRegister = ({ handleRegister }) => {
  const fusername = useRef();
  const fpassword = useRef();

  const registerHandle = (e) => {
    const data = {
      username: fusername.current.value,
      password: fpassword.current.value,
    };
    handleRegister(e, data);
    fusername.current.value = "";
    fusername.current.value = "";
  };
  return (
    <>
      {" "}
      <form className="form" onSubmit={(e) => registerHandle(e)}>
        <label htmlFor="username" className="label">
          Username:
        </label>
        <br />
        <input id="username" type="text" className="input" ref={fusername} />
        <br />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <br />
        <input
          id="password"
          type="password"
          className="input"
          ref={fpassword}
        />
        <br />
        <button className="btn submit">Register</button>
      </form>
    </>
  );
};

export default AdminRegister;
