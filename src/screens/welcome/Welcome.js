import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, SafeAreaView } from 'react-native';
import Button from '../../components/Button';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';

function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent barStyle={'light-content'} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logoWhite.png')} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome Aboard!</Text>
        <Text style={styles.desc}>Sign up if you are a new User.</Text>
        <Text style={styles.desc}>Have an account? Log in</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button outlined title={'Log in'} onPress={() => navigation.navigate('Login')} />
        <Button title={'Sign Up'} style={{ marginTop: hp(16) }} onPress={() => navigation.navigate('SignUp')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    height: hp(720),
    backgroundColor: colors.blackBg,
  },
  logoContainer: {
    flex: 2,
    marginTop: hp(160),
    // marginBottom: hp(160 - StatusBar.currentHeight),
  },
  logo: {
    width: wp(76),
    height: hp(73)
  },
  textContainer: {
    flex: 1,
    width: wp(360),
    // marginBottom: hp(80),
  },
  title: {
    fontSize: hp(26),
    fontWeight: '500',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(5),
  },
  desc: {
    fontSize: hp(14),
    fontWeight: '300',
    color: colors.text.grey,
    textAlign: 'center',
  },
  btnContainer: {
    flex: 1,
  },
})

export default Welcome;
