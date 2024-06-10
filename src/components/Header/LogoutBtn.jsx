import { useDispatch } from "react-redux";
import authServices from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authServices.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 bg-red-600 text-white hover:bg-red-400 hover:text-black rounded-lg shadow-lg transform hover:scale-105 font-semibold"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
