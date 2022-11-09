import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { Tab } from "@material-ui/core";
import { Route} from "react-router-dom";
import { tabSelected, appStore } from '../store';

export default function Onboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const isTabActive = label => activeTab === label ? 'active-tab' : '';
  const tabClicked = tab => dispatch(tabSelected({ tab }));
  const routes = ["auth/register","/allAssociates","/onBoardingCheckList","/uploadDocuments","/trainingLinks","/comment","/bgCheck"]
  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === 'ROLE_ONBOARDING_REVIEWER' ||
            user.role === 'ROLE_ONBOARDING_MANAGER') && (
            <>
              <li className={isTabActive('New User')}>
	TabIndicatorProps={{style: {background:'white'}}}
              <Link to="/auth/register">
                <Tab
                  value={routes[0]}
                  label="New User"
                  textColor='black'
                  component={Link}
                  to={routes[0]}
                />
              </Link>
            </li>
            <li className={isTabActive('All Associates')} style={{ color: 'black',fontWeight: 'bold' }}>
              <Link to="/allAssociates">
              <Tab
                  value={routes[1]}
                  label="Associates"
                  component={Link}
                  to={routes[1]}
                />
              </Link>
            </li>
            <li className={isTabActive('OnBoardingCheckList')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/onBoardingCheckList">
              <Tab
                  value={routes[2]}
                  label="OnBoardingCheckList"
                  component={Link}
                  to={routes[2]}
                />
              </Link>
            </li>
            <li className={isTabActive('Upload Document')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/uploadDocuments">
              <Tab
                  className="Arati"
                  value={routes[3]}
                  label="UploadDocument"
                  component={Link}
                  to={routes[3]}
                />
              </Link>
            </li>
            <li className={isTabActive('TrainingLinks')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/trainingLinks">
              <Tab
                  value={routes[4]}
                  label="TrainingLinks"
                  component={Link}
                  to={routes[4]}
               
             />
              </Link>
            </li>
            <li className={isTabActive('CommentComponent')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/comment">
              <Tab
                  value={routes[5]}
                  label="CommentComponent"
                  component={Link}
                  to={routes[5]}
                />
              </Link>
            </li>
            
            <li className={isTabActive('BackgroundCheck')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/bgCheck">
              <Tab
                  value={routes[6]}
                  label="BackgroundCheck"
                  component={Link}
                  to={routes[6]}

                  />
                </Link>
              </li>
            </>
          )}
        {user && user.role === 'ROLE_ASSOCIATE' && (
          <>
            <li className={isTabActive('OnBoardingCheckList')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/onBoardingCheckList">
              <Tab
                  value={routes[2]}
                  label="OnBoardingCheckList"
                  component={Link}
                  to={routes[2]}
                />
              </Link>
            </li>
            <li className={isTabActive('Upload Document')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/uploadDocuments">
              <Tab
                  value={routes[3]}
                  label="UploadDocument"
                  component={Link}
                  to={routes[3]}
                />
              </Link>
            </li>
            <li className={isTabActive('Comment')} style={{ color: 'red',fontWeight: 'bold' }}>
              <Link to="/comment">
              <Tab
                  value={routes[4]}
                  label="Comment"
                  component={Link}
                  to={routes[4]}
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