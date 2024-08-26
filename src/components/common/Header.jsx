import LWSLogo from "../../assets/logo.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
   
    setAuth({});
   
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav className="container flex items-center flex-col md:flex-row justify-between md:p-4 py-2 md:py-6 gap-4 sticky top-0 min-h-[60px]">
          <div>
            <Link to="/">
              <img src={LWSLogo} alt="lws" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center space-x-5">
              <li>
                <Link
                  to="/CreateBlog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={SearchIcon} alt="Search" />
                  <span>Search</span>
                </Link>
              </li>
              {auth.authToken ? (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white/50 hover:text-white transition-all duration-200"
                    >
                      Logout
                    </button>
                  </li>
                  <li className="flex items-center">
                    <div className="avater-img bg-orange-600 text-white">
                      <span className="">
                        {auth.user?.firstName ? auth.user.firstName[0] : "U"}
                      </span>
                    </div>
                    <Link to="/profile">
                      <span className="text-white ml-2">
                        {auth.user?.firstName || "User"}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-yellow-500 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
