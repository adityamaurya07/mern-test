import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { authSlice } = useSelector((res) => res);
  const navItems = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "Department", link: "/department" },
    { id: 3, label: "Employee", link: "/employee" },
    { id: 4, label: "Login", link: "/login" },
    { id: 5, label: "Signup", link: "/signup" },
    { id: 6, label: "Logout", link: "/logout" },
  ];

  // Filter navItems based on authentication status
  const filteredNavItems = authSlice.user
    ? navItems.filter(
        (item) => item.link !== "/login" && item.link !== "/signup"
      )
    : navItems.filter((item) => item.link !== "/logout");

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">Logo</div>

          <div className="flex space-x-4">
            {filteredNavItems.map((item) => (
              <div key={item.id}>
                {item.link === "/logout" ? (
                  <a
                    className="text-white hover:text-gray-300 hover:cursor-pointer "
                    onClick={() => dispatch(logout())}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.link}>
                    <a className="text-white hover:text-gray-300 hover:cursor-pointer">
                      {item.label}
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
