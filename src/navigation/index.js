import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigation';
import { useSelector } from 'react-redux';
import MainNavigator from './MainNavigation';
import MainNavigationStack from './MainNavigation';

function Flog() {
  const loggedIn = useSelector(state => state.login.loggedIn)
  return (
    <NavigationContainer>
      {loggedIn ? <MainNavigationStack /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Flog;