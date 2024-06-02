import { useEffect, useState } from "react"
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from 'react-redux'
import {Header, Footer} from "./components"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  
  return loading ? null : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Outlet/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
