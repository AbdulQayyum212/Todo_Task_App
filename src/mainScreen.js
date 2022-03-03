import React from 'react';
import SignIn from './SignIn';
// import DNavigation from './DrawerNavi';
import Home from './Home';
import {connect, Provider} from 'react-redux';


const MainScreen = ({...props}) => {
  // console.log("Token <==========================================" , props.token);
  if (props.token) {
    return <Home />;
  } else return <SignIn />;
};
const mapStateToProps = state => {
  return {
    token: state.Reducers.Token,
  };
};
export default connect(mapStateToProps)(MainScreen);
