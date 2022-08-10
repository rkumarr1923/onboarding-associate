import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../components/core";

export default function Onboarding() {
  return (
    <div className="onboarding-wrapper">
      <ul className="nav-links">
        <li>
          <Link to="/newAssociate">
            <Button label="Add New Associate" />
          </Link>
        </li>
        <li>
          <Link to="/dateFilter">
            <Button label="Date Filter" />
          </Link>
        </li>
        <li>
          <Link to="/allAssociates">
            <Button label="All Associates" />
          </Link>
        </li>
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
          <Link to="/trainingLinks">
            <Button label="Taining Links" />
          </Link>
        </li>
        <li>
          <Link to="/comment">
            <Button label="Comment" />
          </Link>
        </li>
      </ul>
      <div className="onboarding-container">
        <Outlet />
      </div>
    </div>
  );
}
