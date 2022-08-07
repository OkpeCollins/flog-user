import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import Illustration from './components/Illustration';

function FreeTrips({ navigation }) {
  const loggedIn = useSelector(state => state.login.loggedIn);
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Okpecollins333',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Offers', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Want Free deliveries?</Text>
            <Text style={styles.desc}>Get a free delivery worth up to N1000 when you refer a friend.</Text>
          </View>
          <View style={styles.illustrationContainer}>
            <Illustration />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <View style={styles.formInfoContainer}>
                <Text style={styles.formInfo}>Share your invite code</Text>
              </View>
              <View style={styles.refererInfoContainer}>
                <Text style={styles.refererCode}>Okpecollins333</Text>
                <TouchableOpacity onPress={() => onShare()}>
                  <Feather name={'upload'} size={hp(24)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button title={'Invite Friends'} />
            </View>
            <View style={styles.feedbackBottom}>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
  contentContainer: {
    flex: 1,
    width: wp(360),
    alignItems: 'center',
  },
  textContainer: {
    // flex: 1,
    marginTop: hp(14),
    marginHorizontal: hp(22),
    width: wp(360),
    // backgroundColor: '#ffffff50'
  },
  title: {
    fontSize: hp(22),
    fontWeight: '500',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  desc: {
    fontSize: hp(14),
    fontWeight: '300',
    textAlign: 'center',
    color: colors.white,
    marginTop: hp(8),
    lineHeight: hp(16.41),
    marginHorizontal: hp(42),
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: hp(42),
    width: wp(289),
    height: hp(235),
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(69),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
  },
  formInfoContainer: {
    alignSelf: 'flex-start',
  },
  formInfo: {
    textAlign: 'left',
    color: colors.white,
    marginLeft: wp(9),
  },
  refererInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(12),
    paddingRight: wp(16),
    marginTop: hp(4),
    width: wp(315),
    height: hp(48),
    borderRadius: wp(6),
    backgroundColor: colors.white,
  },
  refererCode: {
    fontSize: hp(16),
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(22),
    // backgroundColor: '#ffffff50'
  },
  qusContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
    // backgroundColor: '#ffffff50'
  },
})

export default FreeTrips;
