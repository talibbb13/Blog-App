import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 shadow-lg bg-[#3e3e42]">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Logo
                width="70px"
                className="hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className={`inline-block px-6 py-2 duration-200 bg-[#007acc] text-[#000000] font-semibold hover:bg-[#052659] hover:text-[#c1e8ff] rounded-lg shadow-md transform hover:scale-105 ${
                        item.name === "Login" &&
                        "bg-green-600 hover:bg-green-400 hover:text-black"
                      }
                    ${
                      item.name === "Signup" &&
                      "bg-lime-600 hover:bg-lime-400 hover:text-black"
                    }`}
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
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
