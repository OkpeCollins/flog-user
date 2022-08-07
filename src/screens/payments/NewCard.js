import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import CardInput from './components/CardInput';
import creditcardutils from 'creditcardutils';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import { addNewCard, verifyOTP } from './actions/payments.action';
import ContentHeader from '../../components/ContentHeader';
import Input from '../../components/Input';

function NewCard({navigation}) {
  const [cCNumIcon, setCCNumIcon] = React.useState();
  const [cardNum, setCardNum] = React.useState();
  const [expiryDate, setExpiryDate] = React.useState();
  const [CVV, setCVV] = React.useState();
  const [cardPin, setCardPin] = React.useState();
  const [formattedExpiryDate, setFormattedExpiryDate] = React.useState();
  const [cardType, setCardType] = React.useState();
  const [OTP, setOTP] = React.useState();
  const [error, setError] = React.useState(null);

  const inputOTPRef = React.useRef();

  const user = useSelector(state => state.login.user);
  const paymentState = useSelector(state => state.payment);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (paymentState.toEnterOTP) {
      inputOTPRef.current.snapTo(1);
    } else {
      inputOTPRef.current.snapTo(0);
      setOTP(null);
      setCardNum(null);
      setExpiryDate(null);
      setCardPin(null);
      setCardType(null);
      setCVV(null);
    }
  }, [paymentState.toEnterOTP])

  //haandle credit card number input
  const onChangeCCNum = (text) => {
    setCCNumIcon('close')
    setCardType(creditcardutils.parseCardType(text));
    setCardNum(creditcardutils.formatCardNumber(text))
  }

  //haandle expiry date input
  const onChangeExpiryDate = (text) => {
    if (text.length === 2 && text.includes('/') === false) {
      setExpiryDate(text + '/');
    } else {
      setExpiryDate(text)
    }
    setFormattedExpiryDate(creditcardutils.parseCardExpiry(text));
  }

  //haandle expiry date input
  const onChangeCVV = (text) => {
    setCVV(text);
  }

  const bottomSheetHeader = () => {
    return (
      <View style={ bottomSheetStyles.draggerHeader}>
        <View style={bottomSheetStyles.dragger} />
      </View>
    );
  }

  const otpBottomSheet = () => {
    return (
      <View style={bottomSheetStyles.main}>
        <Text style={bottomSheetStyles.contentHeader}>Enter OTP Sent To your Phone</Text>
        {/* <ContentHeader title={'Change Your Password'} height={hp(48)} /> */}
        <View style={bottomSheetStyles.formContainer}>
          <Input
            placeholder={'Enter OTP'}
            width={wp(335)}
            onChangeText={(text) => setOTP(text)}
            keyboardType={'numeric'}
          />
          <View style={bottomSheetStyles.btnContainer}>
            <Button title={'Comfirm OTP'} width={wp(335)} onPress={() => handleOTP()} loading={paymentState.loading} />
          </View>
        </View>
      </View>
    );
  }

  const handleAddNewCard = () => {
    if (creditcardutils.validateCardNumber(cardNum) === false) {
      setError('Please enter a valid credit card number');
      return;
    } else {
      setError(null)
    }

    if (creditcardutils.validateCardExpiry(formattedExpiryDate) === false) {
      setError('Please enter a valid expiry date');
      return;
    } else {
      setError(null)
    }

    if (creditcardutils.validateCardCVC(CVV) === false) {
      setError('Please enter a valid expiry date in format of month/year');
      return;
    } else {
      setError(null)
    }

    if (cardPin === null) {
      setError('Card pin is required for validation purpose');
      return;
    } else {
      setError(null)
    }

    let data = {
      cardDetails: {
        name: user.name,
        email: user.email.value,
        mobile: user.mobile.value,
        card: cardNum.replace(/\s/g, ''),
        cvv: CVV,
        expiry_year: formattedExpiryDate.year,
        expiry_month: formattedExpiryDate.month,
        pin: cardPin,
      },
        authorization:`bearer ${user.tokens.accessToken}`,
    }
    dispatch(addNewCard(data));
  }

  const handleOTP = () => {
    let data = {
      details: {
        otp: OTP,
        userId: user.id,
        flw_ref: paymentState.paymentRes.message.data.flw_ref,
      },
        authorization:`bearer ${user.tokens.accessToken}`,
    }
    // console.log(data);
    dispatch(verifyOTP(data));
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'New Card', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.creditCardContainer}>
            {error && <Text style={styles.errorHint}>{error}</Text>}
            <CardInput 
              cardType={cardType}
              iconName={'card-outline'}
              placeholder={'Please enter credit card number'}
              onChangeText={(text) => onChangeCCNum(text)}
              value={cardNum}
              rightIconName={cCNumIcon}
              keyboardType={'numeric'}
            />
            <View style={styles.creditCardBottom}>
              <CardInput
                placeholder={'expiry date'}
                width={wp(147)}
                onChangeText={(text) => onChangeExpiryDate(text)}
                value={expiryDate}
                maxLength={5}
                keyboardType={'numeric'}
                />
              <CardInput
                placeholder={'CVV'}
                width={wp(147)}
                onChangeText={(text) => onChangeCVV(text)}
                value={CVV}
                maxLength={3}
                keyboardType={'numeric'}
              />
            </View>
            <CardInput
              placeholder={'Please enter credit card Pin'}
              onChangeText={(text) => setCardPin(text)}
              value={cardPin}
              marginTop={hp(16)}
              keyboardType={'numeric'}
            />
          </View>
          <View  style={styles.buttonTop}>
            <Text style={styles.buttonTopText}>Flog may charge a small amount to confirm you card details. This is immediately refunded</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Add Card'}
              onPress={() => handleAddNewCard()}
              loading={paymentState.loading}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={inputOTPRef}
        snapPoints={[hp(0), hp(720)]}
        overdragResistanceFactor={10}
        renderHeader={bottomSheetHeader}
        renderContent={otpBottomSheet}
        enabledContentTapInteraction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: wp(360),
    height: hp(720)  + StatusBar.currentHeight,
    backgroundColor: colors.blackBg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(46),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(5),
    marginRight: wp(5),
    marginBottom: wp(10),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  creditCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(16)
  },
  buttonTop: {
    marginTop: hp(197),
    marginLeft: wp(26),
    marginRight: wp(30),
  },
  buttonTopText: {
    fontSize: hp(16),
    textAlign: 'left',
    color: colors.text.white,
    lineHeight: hp(18.75),
  },
  buttonContainer: {
    marginTop: hp(16),
  },
});

const bottomSheetStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    height: hp(675),
    width: wp(360),
    paddingHorizontal: wp(20),
    backgroundColor: colors.blackBg,
  },
  draggerHeader: {
    width: wp(360),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: colors.blackBg
  },
  dragger: {
    marginTop: hp(9),
    width: wp(50),
    height: hp(6),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  contentHeader: {
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.white,
    marginTop: hp(30),
  },
  formContainer: {
    alignItems: 'center',
    // flex: 1,
    // width: wp(335),
    marginTop: hp(16),
  },
  btnContainer: {
    marginTop: hp(45)
  }
});

export default NewCard;
