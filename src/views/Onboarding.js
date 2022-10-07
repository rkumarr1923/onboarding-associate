import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../components/core";
import { tabSelected, appStore } from "../store";

export default function Onboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const isTabActive = (label) => (activeTab === label ? "active-tab" : "");
  const tabClicked = (tab) => dispatch(tabSelected({ tab }));

  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === "ROLE_ONBOARDING_REVIEWER" ||
            user.role === "ROLE_ONBOARDING_MANAGER") && (
            <>
              <li className={isTabActive("New User")}>
                <Link to="/auth/register">
                  <Button
                    label="New User"
                    clickHandler={() => tabClicked("New User")}
                  />
                </Link>
              </li>
              <li className={isTabActive("All Associates")}>
                <Link to="/allAssociates">
                  <Button
                    label="All Associates"
                    clickHandler={() => tabClicked("All Associates")}
                  />
                </Link>
              </li>
              <li className={isTabActive("Taining Links")}>
                <Link to="/trainingLinks">
                  <Button
                    label="Taining Links"
                    clickHandler={() => tabClicked("Taining Links")}
                  />
                </Link>
              </li>
              <li className={isTabActive("Comment")}>
                <Link to="/comment">
                  <Button
                    label="Comment"
                    clickHandler={() => tabClicked("Comment")}
                  />
                </Link>
              </li>
              <li className={isTabActive("Recordings")}>
                <Link to="/recording">
                  <Button
                    label="Recordings"
                    clickHandler={() => tabClicked("Recordings")}
                  />
                </Link>
              </li>
              <li className={isTabActive("Sample Documents")}>
              <Link to="/sampleDocuments">
                <Button
                  label="Sample Documents"
                  clickHandler={() => tabClicked("Sample Documents")}
                />
              </Link>
            </li>
            <li className={isTabActive("Upload Documents")}>
              <Link to="/uploadDocuments" state={{ forAssociate: {} }}>
                <Button
                  label="Upload Documents"
                  clickHandler={() => tabClicked("Upload Documents")}
                />
              </Link>
            </li>
            <li className={isTabActive('BackGround Check')}>
              <Link to="/bgCheck">
                <Button label="BackGround Check" clickHandler={() => tabClicked('BackGround Check')} />
              </Link>
            </li>
            </>
          )}
        {user && user.role === "ROLE_ASSOCIATE" && (
          <>
            <li className={isTabActive("On-boarding Checklist")}>
              <Link to="/onBoardingCheckList">
                <Button
                  label="On-boarding Checklist"
                  clickHandler={() => tabClicked("On-boarding Checklist")}
                />
              </Link>
            </li>
            <li className={isTabActive("Sample Documents")}>
              <Link to="/sampleDocuments">
                <Button
                  label="Sample Documents"
                  clickHandler={() => tabClicked("Sample Documents")}
                />
              </Link>
            </li>
            <li className={isTabActive("Upload Documents")}>
              <Link to="/uploadDocuments" state={{ forAssociate: {} }}>
                <Button
                  label="Upload Documents"
                  clickHandler={() => tabClicked("Upload Documents")}
                />
              </Link>
            </li>
            <li className={isTabActive("Comment")}>
              <Link to="/comment">
                <Button
                  label="Comment"
                  clickHandler={() => tabClicked("Comment")}
                />
              </Link>
            </li>
            <li className={isTabActive("Recordings")}>
              <Link to="/recording">
                <Button
                  label="Recordings"
                  clickHandler={() => tabClicked("Recordings")}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          {user && loginFormRender()}
          <div className="onboarding-body">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
