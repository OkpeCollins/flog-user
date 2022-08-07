import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Onboarding, PasswordReset, SignUp, VerifyNum, Welcome } from '../screens';
import { useSelector } from 'react-redux';

//animation
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AuthNav = createStackNavigator();

function AuthNavigator() {
  const state = useSelector(state => state.signUp);
  const onBoardingState = useSelector(state => state.onboard);
  return (
    <AuthNav.Navigator headerMode={'none'}>
      {!onBoardingState.onboared ? (
        <AuthNav.Screen component={Onboarding} name={'Onboarding'} options={{ cardStyleInterpolator: forFade }} />
      ) : (
        <>
            <AuthNav.Screen component={Welcome} name={'Welcome'} options={{ cardStyleInterpolator: forFade }} />
            <AuthNav.Screen component={Login} name={'Login'} options={{ cardStyleInterpolator: forFade }} />
            <AuthNav.Screen component={PasswordReset} name={'PasswordReset'} options={{ cardStyleInterpolator: forFade }} />
            <AuthNav.Screen component={SignUp} name={'SignUp'} options={{ cardStyleInterpolator: forFade }} />
            <AuthNav.Screen component={VerifyNum} name={'VerifyNum'} options={{ cardStyleInterpolator: forFade }} />
        </>
      )}
      
     
    </AuthNav.Navigator>
  );
}

export default AuthNavigator;