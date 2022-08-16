import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, userDetails } from "../../store";
import "../styles/header.css";

/**
 * application header code
 */

const Header = () => {
  const user = useSelector(userDetails);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="app-header">
      <div>
        <Link to="/">
          <span className="app-title">Onboarding Application</span>
        </Link>
      </div>
      {user ? (
        <div>
          <Link to="/" onClick={handleLogout}>
            <span className="logout">Logout</span>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/auth/login">
            <span className="logout">Login</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
