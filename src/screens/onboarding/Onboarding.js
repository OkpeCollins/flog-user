import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { hp, wp } from '../../constants/dimension';
import { onboardingdata } from '../../constants/staticData';
import logoWhite from '../../assets/logoWhite.png';
import BgSVG from './components/BgSVG';
import OnboardingText from './components/OnboardingText';
import { userService } from '../../services/user.service';

function Steps() {
  return (
    <View style={styles.stepsContainer} >
      {onboardingdata.map((item, index) => {
        return (
          <View key={item.id} style={styles.steps} />
        )
      })}
    </View>
  )
};

function Onboarding({ navigation }) {
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const onboardingRef = useRef();

  const onboardingSkip = () => {
    onboardingRef.current.scrollToEnd({ animated: true });
  };

  const onboardingNext = () => {
    onboardingRef.current.scrollToIndex({ animated: true, index: onboardingIndex + 1 });
    // console.log(onboardingRef.current.index())
    setOnboardingIndex(onboardingIndex + 1);
  };
  
  return (
    <View style={styles.main}>
      <StatusBar translucent barStyle={'light-content'} />
      <View style={styles.logoContainer}>
        <Image source={logoWhite} style={styles.logo} />
      </View>
      <View style={styles.sub}>
        <Image source={require('../../assets/Rectangle2.png')} style={styles.subBgImg} />
        {/* <BgSVG /> */}
        <View style={styles.subContent}>
          <FlatList
            ref={onboardingRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={onboardingdata}
            scrollEnabled
            pagingEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.content}
            renderItem={({ item }) => (
              <OnboardingText id={item.id} title={item.title} desc={item.desc} navigation={navigation} />
            )}
          />
        </View>
        {onboardingIndex === 2 ? null : (
          <View style={styles.subBottom}>
            <TouchableOpacity style={styles.subButton} onPress={() => onboardingSkip()}>
              <Text>Skip</Text>
            </TouchableOpacity>
            <Steps />
            <TouchableOpacity style={styles.subButtom} onPress={() => onboardingNext()} >
              <Text>Next</Text>
            </TouchableOpacity>
            <View />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(360),
    height: hp(720),
    backgroundColor: '#000000',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(204),
  },
  logo: {
    height: wp(99),
    width: wp(109)
  },
  sub: {
    width: wp(360),
    height: hp(327.5),
    // position: 'absolute',
    bottom: 0,
  },
  subBgImg: {
    flex: 1,
    width: wp(360),
    height: hp(327.5),
  },
  subContent: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
  },
  content: {
    flex: 1,
    // marginTop: hp(144.5),
    width: wp(360),
    height: hp(327.5),
  },
  subBottom: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    width: wp(360),
    paddingLeft: wp(25.5),
    paddingRight: wp(25.5),
    bottom: hp(20.5),
    // backgroundColor: '#00000060'
  },
  subButtom: {
    // flex: 0.25,
  },
  stepsContainer: {
    // display: 'none',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  steps: {
    backgroundColor: '#000000',
    flex: 0,
    width: wp(5),
    height: hp(5),
    borderRadius: wp(5),
    marginHorizontal: wp(5),
  },
})

export default Onboarding;
