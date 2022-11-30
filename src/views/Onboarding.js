import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { tabSelected, appStore } from "../store";
//import { Tab, Tabs } from "@material-ui/core";
import { Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Button, Stack, Col, Container } from "react-bootstrap";
//import "./styles.css";

export default function Onboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const [currentTab, setCurrentTab] = React.useState(0); 
 
  const routes = ["auth/register","/allAssociates","/trainingLinks","/comment","/recording","/sampleDocuments","/bgCheck"]
  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === 'ROLE_ONBOARDING_REVIEWER' ||
            user.role === 'ROLE_ONBOARDING_MANAGER') && (
 	    <>
         
         <Tabs  variant='scrollable'>
 
                <Tab
                  value={routes[0]}
                  eventKey={0}
                  label="New User"
                  component={Link}
                  to={routes[0]}
                  disabled={currentTab !== 0}
                />

              <Tab
                  value={routes[1]}
                  label="All Associates"
                  component={Link}
                  to={routes[1]}
                />
              <Tab
                  value={routes[2]}
                  label="Training Links"
                  component={Link}
                  to={routes[2]}
                />
              <Tab
                  value={routes[3]}
                  label="Comment"
                  component={Link}
                  to={routes[3]}
                />
              <Tab
                  value={routes[4]}
                  label="Recordings"
                  component={Link}
                  to={routes[4]}
                />
              <Tab
                  value={routes[5]}
                  label="Sample Documents"
                  component={Link}
                  to={routes[5]}
                />
              <Tab
                  value={routes[6]}
                  label="Background Check"
                  component={Link}
                  to={routes[6]}
                />
          </Tabs>
         
	
          <Stack gap={6} direction="horizontal" className="mt-3">
        <Button
          className="success"
          disabled={currentTab === 0}
          onClick={() => setCurrentTab((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Button
          className="success"
          disabled={currentTab === 6}
          onClick={() => setCurrentTab((prev) => prev + 1)}
        >
          Next
        </Button>
      </Stack>
      <p>Current tab index is {currentTab}</p>
        
      </>
          )}
        {user && user.role === 'ROLE_ASSOCIATE' && (
          <>
            
                 <Tab
                  value={routes[2]}
                  label="OnBoardingCheckList"
                  component={Link}
                  to={routes[2]}
                />
              
              <Tab
                  value={routes[3]}
                  label="UploadDocument"
                  component={Link}
                  to={routes[3]}
                />
             
              <Tab
                  value={routes[4]}
                  label="Comment"
                  component={Link}
                  to={routes[4]}
                />
             <Stack gap={3} direction="horizontal" className="mt-3">
        <Button
          className="success"
          disabled={currentTab === 0}
          onClick={() => setCurrentTab((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Button
          className="success"
          disabled={currentTab === 2}
          onClick={() => setCurrentTab((prev) => prev + 1)}
        >
          Next
        </Button>
      </Stack>
      <p>Current tab index is {currentTab}</p>
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