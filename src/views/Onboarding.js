import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../components/core";
import { userDetails } from "../store";

export default function Onboarding() {
  const user = useSelector(userDetails);
  return (
    <div className="onboarding-wrapper">
      <ul className="nav-links">
        {user && (user.role === "Reviewer" || user.role === "Manager") && (
          <>
            <li>
              <Link to="/auth/register">
                <Button label="New User" />
              </Link>
            </li>
            <li>
              <Link to="/allAssociates">
                <Button label="All Associates" />
              </Link>
            </li>
            <li>
              <Link to="/trainingLinks">
                <Button label="Taining Links" />
              </Link>
            </li>
            <li>
              <Link to="/comment">
                <Button label="Comment" />
              </Link>
            </li>
          </>
        )}
        {user && user.role === "Associate" && (
          <>
            <li>
              <Link to="/onBoardingCheckList">
                <Button label="On-boarding Checklist" />
              </Link>
            </li>
            <li>
              <Link to="/uploadDocuments">
                <Button label="Upload Documents" />
              </Link>
            </li>
            <li>
              <Link to="/comment">
                <Button label="Comment" />
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="onboarding-container">
        <Outlet />
      </div>
    </div>
  );
}
