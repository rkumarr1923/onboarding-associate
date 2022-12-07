import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { appStore } from '../store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const store = useSelector(appStore);
  const { userDetails: user, currentTabState: tabState } = store || {};
  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  const routes = [
    'auth/register',
    '/allAssociates',
    '/recording',
    '/sampleDocuments',
    '/trainingLinks',
    '/bgCheck',
    '/comment',
  ];

  const associateRoutes = [
    '/recording',
    '/sampleDocuments',
    '/trainingLinks',
    '/bgCheck',
    '/comment',
  ];

  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === 'ROLE_ONBOARDING_REVIEWER' ||
            user.role === 'ROLE_ONBOARDING_MANAGER') && (
            <>
              <Tabs
                activeKey={currentTab}
                id="controlled-tab-example"
                variant="scrollable"
              >
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
                  title="Recordings"
                  component={Link}
                  value={routes[2]}
                  to={routes[2]}
                  disabled={currentTab !== 2}
                />
                <Tab
                  eventKey={3}
                  title="Sample Documents"
                  value={routes[3]}
                  component={Link}
                  to={routes[3]}
                  disabled={currentTab !== 3}
                />
                <Tab
                  eventKey={4}
                  title="Training Links"
                  value={routes[4]}
                  component={Link}
                  to={routes[4]}
                  disabled={currentTab !== 4}
                />
                <Tab
                  eventKey={5}
                  title="Background Check"
                  value={routes[5]}
                  component={Link}
                  to={routes[5]}
                  disabled={currentTab !== 5}
                />
                <Tab
                  eventKey={6}
                  title="Comment"
                  component={Link}
                  value={routes[6]}
                  to={routes[6]}
                  disabled={currentTab !== 6}
                />
              </Tabs>
            </>
          )}
        {user && user.role === 'ROLE_ASSOCIATE' && (
          <>
            <Tabs
              activeKey={currentTab}
              id="controlled-tab-example"
              variant="scrollable"
            >
              <Tab
                eventKey={0}
                title="Recordings"
                component={Link}
                value={associateRoutes[0]}
                to={associateRoutes[0]}
                disabled={currentTab !== 0}
              />
              <Tab
                eventKey={1}
                title="Sample Documents"
                value={associateRoutes[1]}
                component={Link}
                to={associateRoutes[1]}
                disabled={currentTab !== 1}
              />
              <Tab
                eventKey={2}
                title="Training Links"
                value={associateRoutes[2]}
                component={Link}
                to={associateRoutes[2]}
                disabled={currentTab !== 2}
              />
              <Tab
                eventKey={3}
                title="Background Check"
                value={associateRoutes[3]}
                component={Link}
                to={associateRoutes[3]}
                disabled={currentTab !== 3}
              />
              <Tab
                eventKey={4}
                title="Comment"
                component={Link}
                value={associateRoutes[4]}
                to={associateRoutes[4]}
                disabled={currentTab !== 4}
              />
            </Tabs>
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
          {user && (
            <div className="onboarding-body-nav">
              <Outlet />
            </div>
          )}
          {!user && (
            <div className="onboarding-body">
              <Outlet />
            </div>
          )}
          {user && (
            <div className="next-prev-navigation">
              <Button
                className="success"
                disabled={currentTab === 0}
                onClick={(event) =>
                  setCurrentTab((prev) => {
                    let tabIndex = prev - 1;
                    navigate(routes[tabIndex]);
                    return tabIndex;
                  })
                }
              >
                Prev
              </Button>
              <Button
                className="success"
                disabled={
                  user && user.role === 'ROLE_ASSOCIATE'
                    ? currentTab === 4
                    : currentTab === 6
                }
                onClick={(event) =>
                  setCurrentTab((prev) => {
                    let tabIndex = prev + 1;
                    navigate(routes[tabIndex]);
                    return tabIndex;
                  })
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
