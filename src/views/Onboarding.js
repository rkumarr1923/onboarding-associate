import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { tabSelected, appStore } from "../store";
import { Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Row, Button, Stack, Col, Container } from "react-bootstrap";
import AllAssociates from '../components/associate/AllAssociates';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const [currentTab, setCurrentTab] = React.useState(0); 
  const navigate = useNavigate();

 
  const routes = ["auth/register","/allAssociates","/trainingLinks","/comment","/recording","/sampleDocuments","/bgCheck"]
  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === 'ROLE_ONBOARDING_REVIEWER' ||
            user.role === 'ROLE_ONBOARDING_MANAGER') && (
 	    <>
         
         <Tabs activeKey={currentTab} id="controlled-tab-example" variant='scrollable'>
 
                <Tab
                  eventKey={0}            
                  title="New User"
                  href={routes[0]}
                  value={routes[0]}
                  component={Link}
                  to={routes[0]}
                  disabled={currentTab !== 0}
                />

              <Tab
                  eventKey={1}
                  title="All Associates"
                  value={routes[1]}
                  component={Link}
                  to={routes[1]}
                  disabled={currentTab !== 1}
                />
              <Tab
                  eventKey={2}
                  title="Training Links"
                  value={routes[2]}
                  component={Link}
                  to={routes[2]}
                  disabled={currentTab !== 2}
                />
              <Tab
                  eventKey={3}
                  title="Comment"
                  component={Link}
                  value={routes[3]}
                  to={routes[3]}
                  disabled={currentTab !== 3}
                />
              <Tab
                  eventKey={4}
                  title="Recordings"
                  component={Link}
                  value={routes[4]}
                  to={routes[4]}
                  disabled={currentTab !== 4}
                />
              <Tab
                  eventKey={5}
                  title="Sample Documents"
                  value={routes[5]}
                  component={Link}
                  to={routes[5]}
                  disabled={currentTab !== 5}
                />
              <Tab
                  eventKey={6}
                  title="Background Check"
                  value={routes[6]}
                  component={Link}
                  to={routes[6]}
                  disabled={currentTab !== 6}
                />
          </Tabs>
         
	
          <Stack gap={6} direction="horizontal" className="mt-3">
        <Button
          className="success"
          disabled={currentTab === 0}
          onClick={(event) => setCurrentTab((prev) => {
            let tabIndex = prev-1;
            navigate(routes[tabIndex]);
            return tabIndex;
          })
          }
        >
          Prev
        </Button>
        <Button
          className="success"
          disabled={currentTab === 6}
          onClick={(event) => setCurrentTab((prev) => {
            let tabIndex = prev+1;
            navigate(routes[tabIndex]);
            return tabIndex;
          })
          }
        >
          Next
        </Button>
      </Stack>
      </>
          )}
        {user && user.role === 'ROLE_ASSOCIATE' && (
          <>
            
                 <Tab
                  value={routes[2]}
                  title="OnBoardingCheckList"
                  component={Link}
                  to={routes[2]}
                />
              
              <Tab
                  value={routes[3]}
                  title="UploadDocument"
                  component={Link}
                  to={routes[3]}
                />
             
              <Tab
                  value={routes[4]}
                  title="Comment"
                  component={Link}
                  to={routes[4]}
                />
             <Stack gap={3} direction="horizontal" className="mt-3">
        <Button
          className="success"
          disabled={currentTab === 0}
          onClick={() => setCurrentTab((prev) => {
            let tabIndex = prev-1;
            navigate(routes[tabIndex]);
            return tabIndex;
          })}
        >
          Prev
        </Button>
        <Button
          className="success"
          disabled={currentTab === 2}
          onClick={() => setCurrentTab((prev) => {
            let tabIndex = prev+1;
            navigate(routes[tabIndex]);
            return tabIndex;
          })}
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