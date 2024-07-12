import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "./store/store";
function App() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Outlet />
      </ContextProvider>
    </>
  );
}

export default App;
