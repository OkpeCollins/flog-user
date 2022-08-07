import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableNativeFeedback, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { validateEmail, validateMobile, validateName, validatePassword } from '../../services/validation.service';
import { sendCode, signUp, toVerify } from './actions/signUp.actions';
import QusOpt from './components/QusOpt';

function SignUp({ navigation }) {
  const [name, setName] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorName, setErrorName] = React.useState(null);
  const [errorMobile, setErrorMobile] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPassword, setErrorPassword] = React.useState(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [termsChecked, setTermsChecked] = React.useState(false);

  const dispatch = useDispatch();

  const state = useSelector(state => state.signUp)

  React.useEffect(() => {
    if (state.toVerify) {
      navigation.navigate('VerifyNum')
    }
  }, [state.toVerify])

  React.useEffect(() => {
    if (name !== null && email !== null && mobile !== null && password !== null && termsChecked === true) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, name, password, mobile, termsChecked])

  //handle form field tex change
  const handleChangeText = (value, type) => {
    switch (type) {
      case 'name':
        setName(value);
        break;
      case 'mobile':
        setMobile(value);
      break;
      case 'email':
        setEmail(value);
      break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  //handle terms and condition check
  const onPressTermsCheck = () => {
    if (termsChecked) {
      setTermsChecked(false)
    } else {
      setTermsChecked(true)
    }
  }

  //handle form submitting
  const handleSubmit = () => {
    if (validateName(name) === false) {
      setErrorName('Name must be more than three character');
      return;
    } else {
      setErrorName(null)
    }
    
    if (validateMobile(mobile) === false) {
      setErrorMobile('Please enter a valid mobile number')
      return;
    } else {
      setErrorMobile(null)
    }
    
    if (validateEmail(email) === false) {
      setErrorEmail('Please enter a valid email')
      return;
    } else {
      setErrorEmail(null)
    }
    
    if (validatePassword(password) === false) {
      setErrorPassword('Password must be atleast 6 letters containing uppercase, lower case')
      return;
    } else {
      setErrorPassword(null)
    }

    let formattedMobile = parseInt(mobile);
    formattedMobile = `+234${formattedMobile}`
    
    let userData = {
      name,
      mobile: formattedMobile,
      email,
      password
    };

    // dispatch(signUp(userData))
    dispatch(sendCode(userData))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Sign Up', color: colors.text.white }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logoWhite.png')} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Aboard!</Text>
          <Text style={styles.desc}>Sign up to get started</Text>
        </View>
        <View style={styles.form}>
          <Input
            backgroundColor={colors.white}
            iconName={'person-outline'}
            iconColor={colors.text.grey}
            placeholder={'Name'}
            onChangeText={(value) => handleChangeText(value, 'name')}
            value={name}
          />
          {errorName && <Text style={styles.errorHint}>{errorName}</Text>}
          <Input
            backgroundColor={colors.white}
            iconName={'call-outline'}
            iconColor={colors.text.grey}
            placeholder={'Phone Number'}
            keyboardType={'numeric'}
            marginTop={hp(20)}
            onChangeText={(value) => handleChangeText(value, 'mobile')}
            value={mobile}
          />
          {errorMobile && <Text style={styles.errorHint}>{errorMobile}</Text>}
          <Input
            backgroundColor={colors.white}
            iconName={'mail-outline'}
            iconColor={colors.text.grey}
            placeholder={'Email'}
            keyboardType={'email-address'}
            marginTop={hp(20)}
            onChangeText={(value) => handleChangeText(value, 'email')}
            value={email}
          />
          {errorEmail && <Text style={styles.errorHint}>{errorEmail}</Text>}
          <Input
            backgroundColor={colors.white}
            iconName={'lock-closed-outline'}
            iconColor={colors.text.grey}
            placeholder={'Password'}
            secureTextEntry={true}
            marginTop={hp(20)}
            onChangeText={(value) => handleChangeText(value, 'password')}
            value={password}
          />
          {errorPassword && <Text style={styles.errorHint}>{errorPassword}</Text>}
          <View style={styles.termsContainer}>
            <View style={styles.termsInfo}>
              <Text style={styles.termsTitle}>By signing up,  you accept our. Click to accept</Text>
              <TouchableNativeFeedback>
                <Text style={styles.terms}>Terms and Privacy Policy</Text>
              </TouchableNativeFeedback>
            </View>
            <TouchableNativeFeedback onPress={() => onPressTermsCheck()}>
              <View style={styles.checkBox}>
                <View style={termsChecked && styles.checked} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'Sign Up'}
            loading={state.loading}
            onPress={() => handleSubmit()}
            disabled={buttonDisabled}
          />
        </View>
        <View style={styles.qusContainer}>
          <QusOpt question={'Already a user'} option={'Log In'} onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: wp(360),
    height: hp(720) + StatusBar.currentHeight,
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
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(15),
  },
  title: {
    fontSize: hp(22),
    fontWeight: '700',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  desc: {
    fontSize: hp(16),
    fontWeight: '400',
    color: colors.text.grey,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    width: wp(360),
    // backgroundColor: '#ffffff50'
  },
  form: {
    flex: 6,
    width: wp(360),
    alignItems: 'center',
    marginTop: hp(41),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  termsContainer: {
    flexDirection: 'row',
    width: wp(315),
    justifyContent: 'space-between',
    marginTop: hp(16),
    marginHorizontal: wp(22),
  },
  termsInfo: {
    flex: 0.9,
  },
  termsTitle: {
    fontSize: wp(15),
    fontWeight: '400',
    color: colors.text.grey,
    textAlign: 'left',
  },
  terms: {
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  checkBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(21.33),
    height: hp(20),
    // borderRadius: 5,
    borderWidth: wp(1),
    borderColor: colors.white
  },
  checked: {
    width: wp(15.33),
    height: hp(15),
    // borderRadius: 5,
    backgroundColor: colors.mainColor
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(30),
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
  }, hp
})

export default SignUp;
