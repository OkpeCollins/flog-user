import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, StatusBar, TouchableNativeFeedback, TouchableOpacity, ScrollView, BackHandler, Platform} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Star from '../../components/Star';
import SupportOpt from '../../components/SupportOpt';
import SupportOptSeperator from '../../components/SupportOptSeperator';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { completedTripHelpData } from '../../constants/staticData';
import { getDate } from '../../services/date.service';
import PayOptCard from '../payments/components/PayOptCard';
import { supportDetails } from '../support/actions/support.action';
import { rateRider, resetRating, triggerHistoryGet } from './actions/rideHistory.action';
import HistoryCard from './components/HistoryCard';

const STAR_LENGTH = new Array(5).fill(false);

function CompleteDetails({ navigation }) {
  const [rate, setRate] = React.useState(STAR_LENGTH);
  const [ratingReRender, setRatingReRender] = React.useState(1);
  const [feedback, setFeedback] = React.useState(null);

  const [feedbackLoading, setFeedbackLoading] = React.useState(false);

  const dispatch = useDispatch();
  const support = useSelector((state) => state.support);
  const user = useSelector((state) => state.login.user);

  const singleCompletedHistory = useSelector(state => state.rideHistory.singleCompletedHistory);
  const historyData = useSelector(state => state.rideHistory);

  const feedBackBottomSheetRef = React.useRef()

  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    if (singleCompletedHistory.rate.digit === undefined) {
      feedBackBottomSheetRef.current.snapTo(1)
    }
  }, [singleCompletedHistory])

  React.useEffect(() => {
    if (historyData.rateRiderSuccessfull) {
      setFeedback(null);
      setRate(new Array(5).fill(false))
      setFeedbackLoading(false)
      feedBackBottomSheetRef.current.snapTo(0)
      dispatch(triggerHistoryGet());
      dispatch(resetRating());
    }
  }, [historyData.rateRiderSuccessfull])

  const handleSupportNavigation = (details) => {
    dispatch(supportDetails(details))
    navigation.navigate('SupportNav', {screen: 'SupportDetails'})
  }

  const handleCloseFeedBack = () => {
    feedBackBottomSheetRef.current.snapTo(0);
  }

  const handleSubmitFeedback = () => {
    setFeedbackLoading(true);
    let feedbackData = {
      details: {
        userId: user.id,
        tripId: singleCompletedHistory.id,
        first: rate[0],
        second: rate[1],
        third: rate[2],
        fourth: rate[3],
        fifth: rate[4],
        text: feedback,
      }
    }
    dispatch(rateRider(feedbackData))
  }

  const bottomSheetHeader = () => {
    return (
      <View style={ bottomSheetStyles.draggerHeader}>
        <TouchableOpacity onPress={() => handleCloseFeedBack()}>
          <View style={bottomSheetStyles.dragger}>
            <Ionicons name={'close'} size={wp(28)} color={colors.grey} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const feedbackBottomSheet = () => {
    return (
      <View style={bottomSheetStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={bottomSheetStyles.textContainer}>
            <Text style={bottomSheetStyles.title}>Welcome Back</Text>
            <Text style={bottomSheetStyles.desc}>Rate your last delivery with {singleCompletedHistory.riderData.name}</Text>
          </View>
          <View style={bottomSheetStyles.driverImage}>
            <View style={bottomSheetStyles.imageBase}>
              <Image />
            </View>
            <View style={bottomSheetStyles.driverNameContainer}>
              <Text style={bottomSheetStyles.driverName}>{singleCompletedHistory.riderData.name}</Text>
            </View>
            <View style={bottomSheetStyles.driverRating}>
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
                  <Star key={index} size={wp(20)} color={rate[index] === true ? colors.gold : colors.historyBorder} onPress={() => onPressStar()} />
                )
              })}
            </View>
          </View>
          <View style={bottomSheetStyles.formContainer}>
            <View style={bottomSheetStyles.form}>
              <Input
                backgroundColor={colors.white} iconName={'mail-outline'}
                iconColor={colors.text.grey} placeholder={'Feedback (optional)'}
                onChangeText={(text) => setFeedback(text)}
                value={feedback}
              />
            </View>
            <View style={bottomSheetStyles.btnContainer}>
              <Button
                title={'Submiit Feedback'}
                onPress={() => handleSubmitFeedback()}
                loading={feedbackLoading}
              />
            </View>
            <View style={bottomSheetStyles.feedbackBottom}>
              <TouchableOpacity onPress={() => handleCloseFeedBack()}>
                <Text style={bottomSheetStyles.feedbackSkip}>Skip feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Trip Detail', color: colors.text.white }}
      />
      <View style={styles.contentHeaderContainer}>
        <ContentHeader title={'Showing Trip Details'} height={hp(45)} />
      </View>
      <View style={styles.historyContainer}>
        <HistoryCard
          location={singleCompletedHistory.origin.text}
          destination={singleCompletedHistory.destination.text}
          status={singleCompletedHistory.status}
          stars={singleCompletedHistory.rate.value}
          price={singleCompletedHistory.price}
          date={singleCompletedHistory.createdAt}
          paymentStatus={singleCompletedHistory.paymentStatus}
        />
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.driverImageBase}>
          <Image />
        </View>
        <View style={styles.driverRating}>
          <Text style={styles.driverName}>Your Trip With {singleCompletedHistory.riderData.name}</Text>
          <Text style={styles.date}>{getDate(singleCompletedHistory.createdAt)}</Text>
          <View style={styles.rightStar}>
            {singleCompletedHistory.rate.value.map(( item, index ) => {
              return (
                <Star key={index} color={item === 'true' ? colors.gold : colors.historyBorder} disabled />
              )
            })}
          </View>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Payment</Text>
        </View>
        <View style={styles.paymentOptionContainer}>
          <PayOptCard
            width={wp(335)}
            title={singleCompletedHistory.paymentType}
            type={singleCompletedHistory.paymentType}
            paymentStatus={singleCompletedHistory.paymentStatus}
            price={singleCompletedHistory.price}
            titleSize={wp(16)}
            disabled
          />
      </View>
      </View>
      <View style={styles.needHelpContainer}>
        <ContentHeader title={'Need Help'} height={hp(45)} />
        <View style={styles.helpData}>
          <FlatList
            data={completedTripHelpData}
            style={styles.data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={SupportOptSeperator}
            renderItem={({ item }) => (
              <SupportOpt key={item.id} title={item.title} onPress={() => handleSupportNavigation(item)} />
            )}
          />
        </View>
      </View>
      <BottomSheet
        ref={feedBackBottomSheetRef}
        snapPoints={[hp(0), hp(720)]}
        // overdragResistanceFactor={10}
        renderHeader={bottomSheetHeader}
        renderContent={feedbackBottomSheet}
        enabledContentTapInteraction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    height: hp(720) + StatusBar.currentHeight,
    width: wp(360),
    alignItems: 'center',
    backgroundColor: colors.blackBg,
  },
  historyContainer: {
    marginTop: hp(16),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(16),
    width: wp(360),
    height: hp(96),
    marginTop: hp(16),
    backgroundColor: colors.contentHeader,
  },
  driverImageBase: {
    width: hp(52),
    height: hp(52),
    backgroundColor: colors.grey,
    borderRadius: hp(52) /2,
  },
  driverRating: {
    // alignSelf: 'flex-start',
    marginLeft: hp(10),
  },
  driverName: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.white,
  },
  date: {
    fontSize: hp(9),
    fontWeight: '700',
    color: colors.mainColor,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(3),
  },
  paymentContainer: {
    // alignItems: 'center',
    marginTop: hp(8),
    // width: wp(360),
  },
  titleContainer: {
    // paddingHorizontal: wp(16),
    // backgroundColor: 'red',
  },
  title: {
    fontSize: hp(14),
    fontWeight: '400',
    color: colors.text.white,
  },
  paymentOptionContainer: {
    marginTop: hp(8), 
  },
  needHelpContainer: {
    flex: 1,
    marginTop: hp(8),
    alignItems: 'center',
  },
  helpData: {
    alignItems: 'center',
    width: wp(360),
  },
  data: {
    marginTop: hp(8),
  },
})

const bottomSheetStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    height: hp(720),
    width: wp(360),
    backgroundColor: colors.blackBg,
  },
  draggerHeader: {
    width: wp(360),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: wp(20),
    marginTop: Platform.select({ios: 40}),
    height: hp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: colors.blackBg
  },
  dragger: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(9),
    width: wp(35),
    height: wp(35),
    borderRadius: wp(35) / 2,
    backgroundColor: colors.contentHeader,
  },
  contentHeader: {
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.white,
    marginTop: hp(30),
  },
  btnContainer: {
    marginTop: hp(45)
  },
  // main: {
  //   flex: 1,
  //   alignItems: 'center',
  //   width: wp(360),
  //   height: hp(720),
  //   paddingBottom: hp(15),
  //   backgroundColor: colors.blackBg,
  // },
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
    marginTop: hp(99),
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
    marginTop: hp(15),
    // backgroundColor: '#ffffff50'
  },
  feedbackSkip: {
    fontSize: hp(13),
    fontWeight: '400',
    color: colors.text.white,
  },
})

export default CompleteDetails;
