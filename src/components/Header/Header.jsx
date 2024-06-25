import { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

return (
  <header className="py-4 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white">
    <Container>
      <nav className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Logo
              width="50px"
              className="hover:scale-110 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:bg-white hover:text-gray-800 transition-colors"
          >
            <svg
              className="fill-current h-5 w-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:space-x-6 lg:w-auto transition-all duration-300 ease-in-out`}
        >
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className="mt-4 lg:mt-0">
                  <button
                    className={`block w-full lg:inline-block lg:w-auto px-4  py-2 font-semibold rounded-lg shadow-lg transform hover:opacity-70 transition-transform duration-200 ${
                      item.name === "Login"
                        ? "bg-blue-600 text-white"
                        : item.name === "Signup"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-700 text-white"
                    }`}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li className="mt-4 lg:mt-0">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
);

}

export default Header;
