import { useRef } from "react";
const Login = ({ handleLogin }) => {
  const fusername = useRef();
  const fpassword = useRef();

  const loginHandle = (e) => {
    const data = {
      username: fusername.current.value,
      password: fpassword.current.value,
    };
    handleLogin(e, data);
    fusername.current.value = "";
    fusername.current.value = "";
  };
  return (
    <>
      {" "}
      <form className="form" onSubmit={(e) => loginHandle(e)}>
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
        <button className="btn submit">Login</button>
      </form>
    </>
  );
};

export default Login;
