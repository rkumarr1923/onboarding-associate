import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, userDetails, token, tabSelected, currentState } from '../../store';
import axios from 'axios';
import '../styles/header.css';

/**
 * application header code
 */

const Header = () => {
  const user = useSelector(userDetails);
  const userToken = useSelector(token);
  const dispatch = useDispatch();
  const handleLogout = () => {
   axios.post('http://localhost:9099/logout/token?token='+userToken).then((response) => {
    console.log("logout rsopn "+response);
  });
    dispatch(logout());
    // dispatch(currentState(0));
    dispatch(tabSelected('Default'));
  };

  // const handleRefresh = () => {
  //   dispatch(tabSelected('Default'));
  // };

  return (
    <header className="app-header">
      <div>
        {/* <Link to="/" onClick={handleRefresh}> */}
        <span className="app-title">Onboarding Associate</span>
        {/* </Link> */}
      </div>
      {user ? (
        <>
          <div>
            <Grid container>
              <Grid item>
                <Typography variant="span" style={{ paddingRight: '10px' }}>
                  Hi, {user.name}
                </Typography>
              </Grid>
              <Grid item>
                <Link to="/auth/login" onClick={handleLogout}>
                  <span className="logout">Logout</span>
                </Link>
              </Grid>
            </Grid>
          </div>
        </>
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
