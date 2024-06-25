import { useEffect, useState } from "react";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    !loading && (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 to-gray-900 text-[#c1e8ff]">
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex-grow">
            <Outlet />
            <hr />
          </div>
          <Footer />
        </div>
      </div>
    )
  );
}

export default App;
