import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import QusOpt from '../signUp/components/QusOpt';

const STAR_LENGTH = new Array(5).fill(false);

function Star({ color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={'star'} size={hp(20)} color={color} style={{ marginHorizontal: wp(5), }} />
    </TouchableOpacity>
  )
}

function Feedback({ navigation }) {
  const [rate, setRate] = React.useState(STAR_LENGTH);
  const [ratingReRender, setRatingReRender] = React.useState(1);
  const loggedIn = useSelector(state => state.login.loggedIn);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Feedback', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.desc}>Rate your last delivery with Okpe Collins</Text>
        </View>
        <View style={styles.driverImage}>
          <View style={styles.imageBase}>
            <Image />
          </View>
          <View style={styles.driverNameContainer}>
            <Text style={styles.driverName}>Okpe Collins</Text>
          </View>
          <View style={styles.driverRating}>
            {STAR_LENGTH.map((value, index) => {
              const onPressStar = () => {
                let newRate = rate;
                newRate = newRate.fill(true, 0, index + 1);
                newRate = newRate.fill(false, index + 1, rate.length);
                setRate(newRate);
                //rerendering the rating container to reflect the rating
                setRatingReRender(ratingReRender + 1);
                console.log(rate);
              }
              return (
                <Star key={index} color={rate[index] === true ? colors.gold : colors.historyBorder} onPress={() => onPressStar()} />
              )
            })}
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              backgroundColor={colors.white} iconName={'mail-outline'}
              iconColor={colors.text.grey} placeholder={'Feedback'}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button title={'Submiit Feedback'} />
          </View>
          <View style={styles.feedbackBottom}>
            <TouchableOpacity>
              <Text style={styles.feedbackSkip}>Skip feedback</Text>
            </TouchableOpacity>
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
    marginTop: hp(23),
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
  desc: {
    fontSize: hp(14),
    fontWeight: '300',
    textAlign: 'center',
    color: colors.white,
    marginTop: hp(4),
  },
  driverImage: {
    alignItems: 'center',
    marginTop: hp(49),
  },
  imageBase: {
    width: wp(94),
    height: wp(94),
    borderRadius: wp(94) / 2,
    backgroundColor: colors.grey,
  },
  driverNameContainer: {
    marginTop: hp(14.19),
  },
  driverName: {
    fontSize: hp(18),
    fontWeight: '400',
    color: colors.white,
  },
  driverRating: {
    flexDirection: 'row',
    marginTop: hp(10),
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(109),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
  feedbackBottom: {
    // flex: 1,
    alignItems: 'center',
    marginTop: hp(56),
    // backgroundColor: '#ffffff50'
  },
  feedbackSkip: {
    fontSize: hp(13),
    fontWeight: '400',
    color: colors.text.white,
  },
})

export default Feedback;
