import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { user } from '../../constants/staticData';
import { validateEmail, validatePassword } from '../../services/validation.service';
import QusOpt from '../signUp/components/QusOpt';
import { logIn } from './actions/login.actions';

function Login({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const state = useSelector(state => state.login);

  const dispatch = useDispatch();

  const handleTextChange = (type, text) => {
    switch (type) {
      case 'email':
        setEmail(text)
        break;
      case 'password':
        setPassword(text)
          break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    if (email != '' && password !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password])

  const handleLogin = () => {
    if (validateEmail(email) === false) {
      setErrorEmail('That is not a valid e mail')
      return;
    } else {
      setErrorEmail(null)
    }

    let data = {email, password}
    dispatch(logIn(data));
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Log In', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} >
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logoWhite.png')} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white} iconName={'mail-outline'}
              iconColor={colors.text.grey} placeholder={'Email'}
              onChangeText={(text) => handleTextChange('email', text)}
            />
            {errorEmail && <Text style={styles.errorHint}>{errorEmail}</Text>}
            <Input
              backgroundColor={colors.white} iconName={'lock-closed-outline'}
              iconColor={colors.text.grey} placeholder={'Password'}
              marginTop={hp(20)}
              secureTextEntry={true}
              onChangeText={(text) => handleTextChange('password', text)}
            />
          </View>
          <View style={styles.forgotPassContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
              <Text style={styles.forgotPasstext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title={'Log In'}
              loading={state.loading}
              onPress={() => handleLogin()}
              disabled={buttonDisabled}
            />
          </View>
          <View style={styles.qusContainer}>
            <QusOpt question={'New user'} option={'Sign Up for a new account'} onPress={() => navigation.navigate('SignUp')} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    height: hp(720),
    paddingBottom: hp(15),
    backgroundColor: colors.blackBg,
  },
  logoContainer: {
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(28),
    // backgroundColor: '#ffffff30'
    // marginBottom: hp(160 - StatusBar.currentHeight),
  },
  logo: {
    width: wp(76),
    height: hp(73)
  },
  textContainer: {
    // flex: 1,
    width: wp(360),
    // backgroundColor: '#ffffff50'
  },
  title: {
    fontSize: hp(22),
    fontWeight: '700',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(153),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
  },
  errorHint: {
    alignSelf: 'flex-start',
    // marginLeft: wp(21),
    // marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  forgotPassContainer: {
    width: wp(315),
    alignItems: 'flex-end',
    marginTop: hp(8),
    // backgroundColor: '#ffffff50'
  },
  forgotPasstext: {
    fontSize: hp(16),
    fontWeight: '300',
    color: colors.text.grey,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(56),
    // backgroundColor: '#ffffff50'
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
})

export default Login;
