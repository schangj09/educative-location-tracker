import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="mx-1 lg:mx-5 font-monteserat ">
      <Header />
      <div className="mt-[80px]">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Layout;
