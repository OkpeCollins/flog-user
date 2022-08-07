import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mockCard } from '../../constants/testData';
import { getUserCards, setDefaultPaymentMethod } from './actions/payments.action';
import PayOptCard from './components/PayOptCard';

function Payments({ navigation }) {
  const [rate, setRate] = React.useState([]);
  const [payOption, setPayOption] = React.useState('cash');

  const user = useSelector(state => state.login.user);
  const userCards = useSelector(state => state.payment.userCards);
  const paymentState = useSelector(state => state.payment);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      userId: user.id,
    }
    dispatch(getUserCards(data))
  }, [paymentState.toUpdate])

  const paymentMethodChange = (cardValue) => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      details: {
        userId: user.id,
        paymentId: cardValue.id,
      },
    }
    dispatch(setDefaultPaymentMethod(data))
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Payments', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Payment Methods</Text>
            <Text style={styles.desc}>Please check and confirm your payment method. Cash or Card?</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {userCards.map((value, index) => {
                return (
                  <PayOptCard
                    key={value.id}
                    type={value.type}
                    title={`${value.last_4digits}`}
                    option={true}
                    marginTop={index !== 0 ? hp(16) : 0}
                    optColor={value.default === true ? colors.green : colors.grey + 33}
                    onPress={() => paymentMethodChange(value)}
                  />
                )
              })}
              <PayOptCard
                type={'add-new'}
                title={'Add New Card'}
                marginTop={hp(16)}
                onPress={() => navigation.navigate('NewCard')}
                addCard
              />
            </View>
          </View>
          <View style={styles.promotionContainer}>
            <View style={styles.promotionTitleContainer}>
              <Text style={styles.promotionTitle}>Promotion</Text>
            </View>
            <View style={styles.promotionInfoContainer}>
              <Text style={styles.promotionInfoTitle}>10% Discount.</Text>
              <Text style={styles.promotionInfo}>get % discount on all trips from now till the 31st of June, 2021. This discount is avaialble for all card trips.</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(30),
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
    width: wp(275),
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(20),
    // backgroundColor: '#ffffff30'
  },
  form: {
    // flex: 1,
    alignItems: 'center',
  },
  promotionContainer: {
    alignItems: 'center',
    marginTop: hp(74),
    width: wp(311),
    borderWidth: wp(0.5),
    paddingBottom: hp(9.25),
    borderBottomColor: colors.borderGrey,
    // marginHorizontal: wp(21),
    // backgroundColor: '#ffffff50'
  },
  promotionTitleContainer: {
    width: wp(311),
    alignItems: 'flex-start',
    borderWidth: wp(0.5),
    paddingBottom: hp(9.25),
    borderBottomColor: colors.borderGrey,
  },
  promotionTitle: {
    fontSize: wp(14),
    fontWeight: '400',
    color: colors.white,
  },
  promotionInfoContainer: {
    width: wp(311),
    height: hp(125),
    marginTop: hp(11.75),
    borderRadius: wp(10),
    paddingHorizontal: wp(12),
    backgroundColor: colors.white,
  },
  promotionInfoTitle: {
    fontSize: hp(16),
    fontWeight: '700',
    marginTop: hp(16),
    color: colors.blackBg,
  },
  promotionInfo: {
    fontSize: hp(14),
    fontWeight: '400',
    marginTop: hp(4),
  },
})

export default Payments;
