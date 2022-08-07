import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { showFlashMsg } from '../../../redux/rootAction';
import { saveToStorage } from '../../../services/localStorage.service';
import { onboard } from '../actions/onboarding.actions';

function OnboardingText({ id, title, desc, navigation }) {
  const dispatch = useDispatch();

  const onBoarding = () => {
    saveToStorage('onBoarded', JSON.stringify(true))
      .then(() => dispatch(onboard()))
      .catch((error) => dispatch(showFlashMsg(error.message)))
  }
  return (
    <View style={styles.main}>
      { id !== '3' ?
        <>
          <View style={styles.textMain}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
          </View>
        </>
        :
        <>
          <View style={styles.btnMain}>
            <Button title={'Get Started'} onPress={() => onBoarding()} />
          </View>
        </>}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(360),
    // marginHorizontal: wp(50.5),
    marginTop: hp(144.5),
    // height: hp(70),
  },
  textMain: {
    flex: 1,
    width: wp(261),
    marginHorizontal: wp(50.5),
    // marginTop: hp(144.5),
    height: hp(70),
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp(18),
    fontWeight: '700',
    color: colors.text.black,
    textAlign: 'center',
    marginBottom: hp(8),
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: hp(13),
    fontWeight: '700',
    lineHeight: hp(15),
    color: colors.text.black,
    textAlign: 'center',
  },
  btnMain: {
    flex: 1,
  },
})

export default OnboardingText;
