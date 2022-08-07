import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { showFlashMsg } from '../../redux/rootAction';
import { userService } from '../../services/user.service';

function Promo({ navigation }) {
  const [promoCode, setPromoCode] = React.useState(null);
  const [promo, setPromo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const user = useSelector(state => state.login.user);

  const dispatch = useDispatch();

  // const handleChangeText = (text) => {
  //   setPromoCode(text);
  // }

  React.useEffect(() => {
    let data = {
      userId: user.id
    };

    userService.checkCoupon(data)
      .then(response => {
        console.log(response.data)
        console.log(response.status)
        if(response.status === 201) {
          setPromo(response.data.data);
        }
        setPageLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const handleActivateCoupon = () => {
    let data = {
      couponDetails: {
        code: promoCode,
        userId: user.id
      },
    }

    setLoading(true);

    userService.activateCoupon(data)
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        setLoading(false);
        dispatch(showFlashMsg(response.data.message))
        // if(response.status === 403)
      })
      .catch(error => {
        console.log(error);
        dispatch(showFlashMsg(error.data.message))
        setLoading(false);
      })
  }

  return (
    <View flex={1} style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Offers', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        {pageLoading && (
          <View style={{flex: 1, height: hp(600), justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={hp(40)} color={colors.mainColor} />
          </View>
        )}
        {promo && !pageLoading && (
          <View style={{alignItems: 'center'}}>
            <View style={styles.couponDesign}>
              <Text style={styles.couponCode}>
                {promo.code}
              </Text>
              <Text style={styles.percentText}>
                {promo.percentage}%
              </Text>
              <Text style={[styles.percentText, {fontSize: wp(20), marginTop: -hp(15)}]}>
                Discount off your next trip
              </Text>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>
                  {promo.status}
                </Text>
              </View>
            </View>
            <View style={{marginHorizontal: wp(29)}}>
              <Text style={{fontSize: wp(14), marginTop: hp(15), color: colors.text.grey, fontWeight: '400', textAlign: 'center'}}>
                Please note that you can only have one coupon at a time and it will be used for the next trip after you have activated the coupon
              </Text>
            </View>
          </View>
        )}
        {!promo && !pageLoading && (
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Enter Promo Code</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <View style={styles.formInfoContainer}>
                  <Text style={styles.formInfo}>Enter your promo code</Text>
                </View>
                <View>
                  <Input
                    placeholder={'Enter Promo Code'}
                    marginTop={16}
                    onChangeText={(text) => setPromoCode(text)}
                    value={promoCode}/>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <Button title={'Activate Promo'} onPress={() => handleActivateCoupon()} loading={loading} />
              </View>
              <View style={styles.feedbackBottom}>
              </View>
            </View>
          </View>
        )}
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
  couponDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(310),
    marginTop: hp(20),
    height: hp(300),
    borderRadius: wp(10),
    marginHorizontal: hp(22),
    marginHorizontal: hp(22),
    padding: hp(22),
    backgroundColor: colors.contentHeader,
  },
  percentText: {
    fontSize: hp(100),
    fontWeight: '700',
    color: colors.text.white,
    // textAlign: 'center',
    // marginBottom: hp(1),
  },
  statusContainer: {
    marginTop: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(70),
    height: hp(25),
    borderRadius: wp(15),
    backgroundColor: colors.mainColor + 50
  },
  couponCode: {
    marginTop: hp(10),
    fontSize: hp(18),
    fontWeight: '500',
    color: colors.text.white,
    // textAlign: 'center',
  },
  status: {
    fontSize: hp(15),
    fontWeight: '500',
    color: colors.mainColor,
    // textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    width: wp(360),
    alignItems: 'center',
  },
  textContainer: {
    // flex: 1,
    marginTop: hp(229),
    marginHorizontal: hp(22),
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
    marginTop: hp(8),
    lineHeight: hp(16.41),
    marginHorizontal: hp(42),
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(82),
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

export default Promo;
