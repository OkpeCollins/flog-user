import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { resetToVerify, sendCode, signUp, verifyCode } from '../signUp/actions/signUp.actions';
import QusOpt from '../signUp/components/QusOpt';
import VerifyInput from './components/VerifyInput';

const CODE_LENGTH = new Array(4).fill(0);

function VerifyNum({ navigation }) {
  const [pinValue, setPinValue] = React.useState([]);
  const pinRef = React.useRef([])
  
  const boxOneRef = React.useRef();
  const boxTwoRef = React.useRef();
  const boxThreeRef = React.useRef();
  const boxFourRef = React.useRef();

  pinRef.current = CODE_LENGTH.map((_, i) => pinRef.current[i] || React.createRef());
  // pinRef.current = pinRef.current.slice(0, CODE_LENGTH.length);

  const dispatch = useDispatch();

  const state = useSelector(state => state.signUp)

  React.useEffect(() => {
    dispatch(resetToVerify())
  }, [])

  React.useEffect(() => {
    if (state.codeVerified) {
      dispatch(signUp(state.userData));
    }
  }, [state.codeVerified])

  React.useEffect(() => {
    if (state.signUpSuccessful) {
      navigation.navigate('Login')
    }
  }, [state.signUpSuccessful])

  const handleCodeVerify = () => {
    let data = {email: state.userData.email, mobile: state.userData.mobile, code: pinValue.join('')}
    console.log(data);
    dispatch(verifyCode(data))
  }

  const handleChange = (boxNum, value) => {
    switch (boxNum) {
      case 1:
        pinValue[boxNum - 1] = value;
        setPinValue(pinValue);
        if (pinValue[boxNum - 1] !== '') {
          boxTwoRef.current.focus();
        }
        break;
      case 2:
        pinValue[boxNum - 1] = value;
        setPinValue(pinValue);
        if (pinValue[boxNum - 1] !== '') {
          boxThreeRef.current.focus();
        }
        break;
      case 3:
        pinValue[boxNum - 1] = value;
        setPinValue(pinValue);
        if (pinValue[boxNum - 1] !== '') {
          boxFourRef.current.focus();
        }
        break;
      case 4:
        pinValue[boxNum - 1] = value;
        if (pinValue[boxNum - 1] !== '') {
          setPinValue(pinValue);
        }
        break;
      default:
        break;
    }
  }
  
  return (
    <SafeAreaView style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Verification', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={true} >
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logoWhite.png')} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>VERIFY YOUR ACCOUNT</Text>
          <Text style={styles.desc}>Please verify your account. enter the four digit code that was sent to your mobile number</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <View style={verifyInputstyles.main}>
              <TextInput
                ref={boxOneRef}
                style={[verifyInputstyles.textInput]}
                // value={value}
                keyboardType={'number-pad'}
                onChangeText={(value) => handleChange(1, value)}
                autoFocus={true}
                blurOnSubmit={false}
                returnKeyType={'next'}
                maxLength={1}
              />
            </View>
            <View style={verifyInputstyles.main}>
              <TextInput
                ref={boxTwoRef}
                style={[verifyInputstyles.textInput]}
                // value={value}
                keyboardType={'number-pad'}
                onChangeText={(value) => handleChange(2, value)}
                blurOnSubmit={false}
                returnKeyType={'next'}
                maxLength={1}
              />
            </View>
            <View style={verifyInputstyles.main}>
              <TextInput
                ref={boxThreeRef}
                style={[verifyInputstyles.textInput]}
                // value={value}
                keyboardType={'number-pad'}
                onChangeText={(value) => handleChange(3, value)}
                blurOnSubmit={false}
                returnKeyType={'next'}
                maxLength={1}
              />
            </View>
            <View style={verifyInputstyles.main}>
              <TextInput
                ref={boxFourRef}
                style={[verifyInputstyles.textInput]}
                // value={value}
                keyboardType={'number-pad'}
                onChangeText={(value) => handleChange(4, value)}
                blurOnSubmit={false}
                returnKeyType={'next'}
                maxLength={1}
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button title={'Verify'} onPress={() => handleCodeVerify()} loading={state.loading} />
          </View>
          <View style={styles.qusContainer}>
            <QusOpt question={'New user'} option={`Didn't get the code`} onPress={() => navigation.navigate('Resend')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(80),
    // backgroundColor: '#ffffff50'
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
    width: wp(273),
    color: colors.text.white,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(80),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(108),
    // backgroundColor: '#ffffff50'
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
})

const verifyInputstyles = StyleSheet.create({
  main: {
    // flex: 1,
    width: wp(40),
    height: hp(40),
    borderColor: colors.white,
    borderWidth: hp(1),
    marginHorizontal: wp(22)
  },
  textInput: {
    textAlign: 'center',
    color: colors.text.white,
    width: wp(40),
    height: hp(40),
  },
  text: {
    fontSize: hp(16),
    fontWeight: '300',
  },
})

export default VerifyNum;
