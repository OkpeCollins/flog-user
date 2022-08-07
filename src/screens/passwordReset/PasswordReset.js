import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';

function PasswordReset({ navigation }) {
  return (
    <SafeAreaView style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Log In', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={true} >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Password Reset Link</Text>
          <Text style={styles.desc}>Enter Email Address</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white} iconName={'mail-outline'}
              iconColor={colors.text.grey} placeholder={'Please Enter Email Address'}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button title={'Sign Up'} />
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
  textContainer: {
    // flex: 1,
    width: wp(360),
    marginTop: hp(44),
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
    color: colors.text.grey,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(337),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
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
    marginTop: hp(24),
    // backgroundColor: '#ffffff50'
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
})

export default PasswordReset;
